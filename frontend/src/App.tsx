import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

// Public pages
import { HomePage } from '@/pages/Home'
import { AIAgentsPage } from '@/pages/AIAgents'

// Admin pages
import { LoginPage } from '@/pages/admin/Login'
import { DashboardPage } from '@/pages/admin/Dashboard'
import { LeadsPage } from '@/pages/admin/Leads'
import { AuditRequestsPage } from '@/pages/admin/AuditRequests'
import { AIAgentInquiriesPage } from '@/pages/admin/AIAgentInquiries'
import { AdminLayout } from '@/components/admin/AdminLayout'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-agents" element={<AIAgentsPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="audit-requests" element={<AuditRequestsPage />} />
            <Route path="ai-agents" element={<AIAgentInquiriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
