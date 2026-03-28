const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Types
export interface Lead {
  id: number
  business_name: string
  website: string
  email: string
  phone: string
  location: string
  category: string
  quality_score: number
  status: 'not_contacted' | 'contacted' | 'responded' | 'closed'
  notes: string
  created_at: string
  updated_at: string
}

export interface AuditRequest {
  id: number
  business_name: string
  website: string
  email: string
  status: 'pending' | 'reviewed' | 'contacted' | 'closed'
  notes: string
  created_at: string
  updated_at: string
}

interface AuditRequestData {
  business_name: string
  website: string
  email: string
}

interface ContactData {
  name: string
  email: string
  message: string
}

export interface AIAgentInquiry {
  id: number
  full_name: string
  business_name: string
  business_type: string
  challenge: string
  contact_method: 'email' | 'phone' | 'either'
  email: string
  phone?: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  notes: string
  created_at: string
  updated_at: string
}

interface AIAgentInquiryData {
  full_name: string
  business_name: string
  business_type: string
  challenge: string
  contact_method: string
  email: string
  phone?: string
}

interface ApiResponse<T> {
  message?: string
  data?: T
  error?: string
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  useAuth = false
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(useAuth ? getAuthHeaders() : {}),
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error')
  }
}

export const api = {
  // Public endpoints
  submitAuditRequest: (data: AuditRequestData) =>
    request('/audit-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitContact: (data: ContactData) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  healthCheck: () => request('/health'),

  submitAIAgentInquiry: (data: AIAgentInquiryData) =>
    request('/ai-agent-inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin endpoints (require auth)
  admin: {
    // Leads
    getLeads: (params?: { status?: string; location?: string; limit?: number; offset?: number }) => {
      const searchParams = new URLSearchParams()
      if (params?.status) searchParams.set('status', params.status)
      if (params?.location) searchParams.set('location', params.location)
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.offset) searchParams.set('offset', params.offset.toString())

      const query = searchParams.toString()
      return request<Lead[]>(`/admin/leads${query ? `?${query}` : ''}`, {}, true)
    },

    getLead: (id: number) => request<Lead>(`/admin/leads/${id}`, {}, true),

    updateLead: (id: number, data: Partial<Lead>) =>
      request(`/admin/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true),

    deleteLead: (id: number) =>
      request(`/admin/leads/${id}`, { method: 'DELETE' }, true),

    // Audit requests
    getAuditRequests: () => request<AuditRequest[]>('/admin/audit-requests', {}, true),

    updateAuditRequest: (id: number, data: Partial<AuditRequest>) =>
      request(`/admin/audit-requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true),

    // AI agent inquiries
    getAIAgentInquiries: () => request<AIAgentInquiry[]>('/admin/ai-agent-inquiries', {}, true),

    updateAIAgentInquiry: (id: number, data: Partial<AIAgentInquiry>) =>
      request(`/admin/ai-agent-inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, true),
  },
}
