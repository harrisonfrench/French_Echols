import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api, type Lead, type AuditRequest } from '@/lib/api'
import { Users, FileText, TrendingUp, Clock } from 'lucide-react'

export function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, auditsRes] = await Promise.all([
          api.admin.getLeads({ limit: 100 }),
          api.admin.getAuditRequests(),
        ])
        setLeads(leadsRes.data || [])
        setAuditRequests(auditsRes.data || [])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'not_contacted').length,
    contactedLeads: leads.filter((l) => l.status === 'contacted').length,
    closedLeads: leads.filter((l) => l.status === 'closed').length,
    pendingAudits: auditRequests.filter((a) => a.status === 'pending').length,
    totalAudits: auditRequests.length,
    highPriorityLeads: leads.filter((l) => l.quality_score >= 7).length,
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your leads and audit requests</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newLeads} not contacted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.highPriorityLeads}</div>
            <p className="text-xs text-muted-foreground">
              Score 7+ (worst websites)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Audit Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAudits}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingAudits} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Closed Deals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.closedLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.contactedLeads} in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet. Run the scraper to find leads.</p>
            ) : (
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      lead.quality_score >= 7 ? 'bg-red-100 text-red-600' :
                      lead.quality_score >= 4 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {lead.quality_score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lead.business_name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.category} • {lead.location}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === 'not_contacted' ? 'bg-gray-100 text-gray-600' :
                      lead.status === 'contacted' ? 'bg-blue-100 text-blue-600' :
                      lead.status === 'responded' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent audit requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audit Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {auditRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground">No audit requests yet.</p>
            ) : (
              <div className="space-y-4">
                {auditRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{request.business_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{request.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      request.status === 'reviewed' ? 'bg-blue-100 text-blue-600' :
                      request.status === 'contacted' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
