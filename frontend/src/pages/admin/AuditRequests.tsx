import { useEffect, useState } from 'react'
import { api, type AuditRequest } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  ExternalLink, Mail, Search, Edit, X, Check, Loader2, Clock
} from 'lucide-react'

const statusOptions = ['pending', 'reviewed', 'contacted', 'closed'] as const

export function AuditRequestsPage() {
  const [requests, setRequests] = useState<AuditRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState<string>('')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    setIsLoading(true)
    try {
      const res = await api.admin.getAuditRequests()
      setRequests(res.data || [])
    } catch (error) {
      console.error('Failed to fetch audit requests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateRequest(id: number) {
    try {
      await api.admin.updateAuditRequest(id, {
        status: editStatus as AuditRequest['status'],
        notes: editNotes
      })
      setEditingId(null)
      fetchRequests()
    } catch (error) {
      console.error('Failed to update request:', error)
    }
  }

  const filteredRequests = requests.filter((req) =>
    req.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.website.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort by date (newest first) and pending status
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1
    if (a.status !== 'pending' && b.status === 'pending') return 1
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Audit Requests</h1>
        <p className="text-muted-foreground">Website audit requests from the contact form</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by business, email, or website..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Requests list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : sortedRequests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No audit requests yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Requests will appear here when visitors submit the audit form on your website.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedRequests.map((request) => (
            <Card key={request.id} className={`overflow-hidden ${
              request.status === 'pending' ? 'border-l-4 border-l-yellow-500' : ''
            }`}>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{request.business_name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        request.status === 'reviewed' ? 'bg-blue-100 text-blue-600' :
                        request.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(request.created_at)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {editingId === request.id ? (
                      <>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => handleUpdateRequest(request.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(request.id)
                          setEditStatus(request.status)
                          setEditNotes(request.notes)
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
                    href={request.website.startsWith('http') ? request.website : `https://${request.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {request.website.replace(/^https?:\/\//, '').slice(0, 40)}
                  </a>
                  <a
                    href={`mailto:${request.email}`}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="h-3 w-3" />
                    {request.email}
                  </a>
                </div>

                {/* Edit form or notes */}
                {editingId === request.id ? (
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
                ) : request.notes ? (
                  <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{request.notes}</p>
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
