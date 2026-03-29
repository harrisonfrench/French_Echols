import { useEffect, useState } from 'react'
import { Star, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

interface Testimonial {
  id: number
  company_name: string
  reviewer_name: string
  reviewer_role: string
  rating: number
  message: string
  approved: boolean
  created_at: string
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="h-4 w-4"
          fill={s <= rating ? '#f59e0b' : 'none'}
          stroke={s <= rating ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </div>
  )
}

export function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)

  async function fetchAll() {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE}/admin/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setTestimonials(data.data ?? [])
    } catch {
      setTestimonials([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  async function setApproved(id: number, approved: boolean) {
    setUpdating(id)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API_BASE}/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approved }),
      })
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved } : t))
      )
    } finally {
      setUpdating(null)
    }
  }

  const pending = testimonials.filter((t) => !t.approved)
  const approved = testimonials.filter((t) => t.approved)

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
        <p className="text-muted-foreground">
          {pending.length} pending · {approved.length} published
        </p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
              {pending.length}
            </span>
            Pending Approval
          </h2>
          <div className="grid gap-4">
            {pending.map((t) => (
              <Card key={t.id} className="border-yellow-200 bg-yellow-50/40">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-base">{t.reviewer_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {t.reviewer_role ? `${t.reviewer_role} · ` : ''}{t.company_name}
                      </p>
                      <StarDisplay rating={t.rating} />
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={updating === t.id}
                        onClick={() => setApproved(t.id, true)}
                      >
                        {updating === t.id
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <><CheckCircle className="h-3.5 w-3.5 mr-1" />Approve</>
                        }
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">"{t.message}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Published</h2>
        {approved.length === 0 ? (
          <p className="text-sm text-muted-foreground">No published testimonials yet.</p>
        ) : (
          <div className="grid gap-4">
            {approved.map((t) => (
              <Card key={t.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-base">{t.reviewer_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {t.reviewer_role ? `${t.reviewer_role} · ` : ''}{t.company_name}
                      </p>
                      <StarDisplay rating={t.rating} />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updating === t.id}
                      onClick={() => setApproved(t.id, false)}
                    >
                      {updating === t.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <><XCircle className="h-3.5 w-3.5 mr-1" />Unpublish</>
                      }
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">"{t.message}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
