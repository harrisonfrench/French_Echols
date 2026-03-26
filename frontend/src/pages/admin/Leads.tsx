import { useEffect, useState } from 'react'
import { api, type Lead } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  ExternalLink, Phone, Mail, MapPin, Search,
  Trash2, Edit, X, Check, Loader2
} from 'lucide-react'

const statusOptions = ['not_contacted', 'contacted', 'responded', 'closed'] as const

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState<string>('')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [statusFilter])

  async function fetchLeads() {
    setIsLoading(true)
    try {
      const res = await api.admin.getLeads({
        status: statusFilter || undefined,
        limit: 100
      })
      setLeads(res.data || [])
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateLead(id: number) {
    try {
      await api.admin.updateLead(id, { status: editStatus as Lead['status'], notes: editNotes })
      setEditingId(null)
      fetchLeads()
    } catch (error) {
      console.error('Failed to update lead:', error)
    }
  }

  async function handleDeleteLead(id: number) {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      await api.admin.deleteLead(id)
      fetchLeads()
    } catch (error) {
      console.error('Failed to delete lead:', error)
    }
  }

  const filteredLeads = leads.filter((lead) =>
    lead.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort by quality score (highest = worst website = best lead)
  const sortedLeads = [...filteredLeads].sort((a, b) => b.quality_score - a.quality_score)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Leads</h1>
        <p className="text-muted-foreground">Manage scraped business leads</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Leads list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : sortedLeads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No leads found. Run the scraper to find leads.</p>
            <pre className="mt-4 text-xs text-left bg-secondary p-4 rounded-lg max-w-md mx-auto">
              cd backend{'\n'}
              GOOGLE_PLACES_API_KEY=your_key \{'\n'}
              go run ./cmd/scraper --location "Milledgeville, GA"
            </pre>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedLeads.map((lead) => (
            <Card key={lead.id} className="overflow-hidden">
              <div className="flex">
                {/* Quality score badge */}
                <div className={`w-16 flex items-center justify-center text-2xl font-bold ${
                  lead.quality_score >= 7 ? 'bg-red-500 text-white' :
                  lead.quality_score >= 4 ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {lead.quality_score}
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{lead.business_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.location}
                        </span>
                        <span className="px-2 py-0.5 bg-secondary rounded text-xs">
                          {lead.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {editingId === lead.id ? (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateLead(lead.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(lead.id)
                              setEditStatus(lead.status)
                              setEditNotes(lead.notes)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-wrap gap-4 mt-3">
                    {lead.website && (
                      <a
                        href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {lead.website.replace(/^https?:\/\//, '').slice(0, 30)}
                      </a>
                    )}
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </a>
                    )}
                  </div>

                  {/* Edit form or status */}
                  {editingId === lead.id ? (
                    <div className="mt-4 flex gap-4">
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="Notes..."
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lead.status === 'not_contacted' ? 'bg-gray-100 text-gray-600' :
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-600' :
                        lead.status === 'responded' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                      {lead.notes && (
                        <span className="text-xs text-muted-foreground">{lead.notes}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
