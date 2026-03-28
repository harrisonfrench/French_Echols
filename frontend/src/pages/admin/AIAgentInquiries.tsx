import { useEffect, useState } from 'react'
import { api, type AIAgentInquiry } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Mail, Phone, Search, Edit, X, Check, Loader2, Clock, MessageSquare
} from 'lucide-react'

const statusOptions = ['new', 'contacted', 'qualified', 'closed'] as const

export function AIAgentInquiriesPage() {
  const [inquiries, setInquiries] = useState<AIAgentInquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState<string>('')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    setIsLoading(true)
    try {
      const res = await api.admin.getAIAgentInquiries()
      setInquiries(res.data || [])
    } catch (error) {
      console.error('Failed to fetch AI agent inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateInquiry(id: number) {
    try {
      await api.admin.updateAIAgentInquiry(id, {
        status: editStatus as AIAgentInquiry['status'],
        notes: editNotes,
      })
      setEditingId(null)
      fetchInquiries()
    } catch (error) {
      console.error('Failed to update inquiry:', error)
    }
  }

  const filteredInquiries = inquiries.filter((inq) =>
    inq.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.business_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    if (a.status === 'new' && b.status !== 'new') return -1
    if (a.status !== 'new' && b.status === 'new') return 1
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">AI Agent Inquiries</h1>
        <p className="text-muted-foreground">Leads from the AI Agents service page</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, business, email, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : sortedInquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No AI agent inquiries yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Inquiries will appear here when visitors submit the form on the AI Agents page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedInquiries.map((inq) => (
            <Card
              key={inq.id}
              className={`overflow-hidden ${inq.status === 'new' ? 'border-l-4 border-l-yellow-500' : ''}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{inq.full_name}</h3>
                      <span className="text-muted-foreground text-sm">— {inq.business_name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inq.status === 'new' ? 'bg-yellow-100 text-yellow-600' :
                        inq.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                        inq.status === 'qualified' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                        {inq.business_type}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(inq.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId === inq.id ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => handleUpdateInquiry(inq.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(inq.id)
                          setEditStatus(inq.status)
                          setEditNotes(inq.notes || '')
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Contact info */}
                <div className="flex flex-wrap gap-4 mt-3">
                  <a
                    href={`mailto:${inq.email}`}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="h-3 w-3" />
                    {inq.email}
                  </a>
                  {inq.phone && (
                    <a
                      href={`tel:${inq.phone}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Phone className="h-3 w-3" />
                      {inq.phone}
                    </a>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    Prefers: <strong>{inq.contact_method}</strong>
                  </span>
                </div>

                {/* Challenge */}
                {inq.challenge && (
                  <div className="mt-3 p-3 bg-secondary/50 rounded-lg flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{inq.challenge}</p>
                  </div>
                )}

                {/* Edit form */}
                {editingId === inq.id ? (
                  <div className="mt-4 flex gap-4">
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
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
                ) : inq.notes ? (
                  <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{inq.notes}</p>
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
