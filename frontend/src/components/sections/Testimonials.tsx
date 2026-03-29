import { useState, useEffect } from 'react'
import { Star, Send, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export interface Testimonial {
  id: number
  company_name: string
  reviewer_name: string
  reviewer_role: string
  rating: number
  message: string
  created_at: string
}

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || rating

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={onChange ? 'button' : undefined}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className="h-5 w-5"
            fill={star <= active ? '#f59e0b' : 'none'}
            stroke={star <= active ? '#f59e0b' : '#d1d5db'}
          />
        </button>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-7 flex flex-col gap-4">
      <StarRating rating={t.rating} />
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{t.message}"</p>
      <div>
        <p className="font-semibold text-foreground text-sm">{t.reviewer_name}</p>
        <p className="text-xs text-muted-foreground">{t.reviewer_role ? `${t.reviewer_role} · ` : ''}{t.company_name}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingList, setLoadingList] = useState(true)

  // Form state
  const [form, setForm] = useState({
    company_name: '',
    reviewer_name: '',
    reviewer_role: '',
    rating: 0,
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then((r) => r.json())
      .then((data) => setTestimonials(data.data ?? []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoadingList(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.rating === 0) {
      setFormError('Please select a star rating.')
      return
    }
    setFormError('')
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            What Companies Are Saying
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real feedback from businesses we've worked with. We let results — and our clients — speak for us.
          </p>
        </div>

        {/* Testimonials grid */}
        {loadingList ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        ) : (
          <div className="text-center py-14 mb-10">
            <Star className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No reviews yet — be the first to share your experience!</p>
          </div>
        )}

        {/* CTA to leave review */}
        {!showForm && !submitted && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowForm(true)} className="rounded-lg">
              Leave a Review
            </Button>
          </div>
        )}

        {/* Submit form */}
        {showForm && !submitted && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-border shadow-sm p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Your Rating *</label>
                <StarRating rating={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name *</label>
                  <Input
                    placeholder="Jane Smith"
                    value={form.reviewer_name}
                    onChange={(e) => setForm((f) => ({ ...f, reviewer_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Role</label>
                  <Input
                    placeholder="CEO, Marketing Director…"
                    value={form.reviewer_role}
                    onChange={(e) => setForm((f) => ({ ...f, reviewer_role: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name *</label>
                <Input
                  placeholder="Acme Co."
                  value={form.company_name}
                  onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Your Feedback *</label>
                <textarea
                  placeholder="Tell others about your experience working with Echols & French…"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {formError && (
                <p className="text-sm text-red-500">{formError}</p>
              )}

              <p className="text-xs text-muted-foreground">
                Reviews are reviewed before being published.
              </p>

              <div className="flex gap-3">
                <Button type="submit" className="rounded-lg" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Submit Review
                </Button>
                <Button type="button" variant="outline" className="rounded-lg" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {submitted && (
          <div className="max-w-xl mx-auto flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-6 text-green-700">
            <CheckCircle className="h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Thank you for your feedback!</p>
              <p className="text-sm text-green-600">Your review will be published after a quick review from our team.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
