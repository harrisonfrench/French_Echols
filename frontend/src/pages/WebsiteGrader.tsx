import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search, AlertTriangle, CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { api } from '@/lib/api'

interface GradeResults {
  url: string
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  fcp: string
  lcp: string
  tbt: string
  cls: string
}

function scoreColor(score: number): string {
  if (score >= 90) return '#22c55e'
  if (score >= 50) return '#f97316'
  return '#ef4444'
}

function scoreLabel(score: number): string {
  if (score >= 90) return 'Good'
  if (score >= 50) return 'Needs Work'
  return 'Poor'
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score)
  const r = 40
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold leading-none" style={{ color }}>{score}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs font-medium" style={{ color }}>{scoreLabel(score)}</p>
      </div>
    </div>
  )
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-secondary/50 rounded-xl px-5 py-3">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
      <span className="text-lg font-bold text-foreground">{value}</span>
    </div>
  )
}

export function WebsiteGraderPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<GradeResults | null>(null)
  const [error, setError] = useState('')

  // Lead capture state
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [leadSent, setLeadSent] = useState(false)
  const [leadLoading, setLeadLoading] = useState(false)

  const overallScore = results
    ? Math.round((results.performance + results.accessibility + results.bestPractices + results.seo) / 4)
    : null

  async function handleGrade(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setError('')
    setResults(null)
    setLeadSent(false)
    setLoading(true)

    let target = url.trim()
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target
    }

    try {
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo`
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Could not analyze that URL. Make sure it is publicly accessible.')
      const data = await res.json()

      const cats = data?.lighthouseResult?.categories
      const audits = data?.lighthouseResult?.audits
      if (!cats) throw new Error('Could not parse results. Make sure the URL is a live public website.')

      setResults({
        url: target,
        performance: Math.round((cats.performance?.score ?? 0) * 100),
        accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
        seo: Math.round((cats.seo?.score ?? 0) * 100),
        fcp: audits?.['first-contentful-paint']?.displayValue ?? '—',
        lcp: audits?.['largest-contentful-paint']?.displayValue ?? '—',
        tbt: audits?.['total-blocking-time']?.displayValue ?? '—',
        cls: audits?.['cumulative-layout-shift']?.displayValue ?? '—',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !businessName || !results) return
    setLeadLoading(true)
    try {
      await api.submitAuditRequest({
        business_name: businessName,
        website: results.url,
        email,
      })
      setLeadSent(true)
    } catch {
      // silently fail — don't block UX
      setLeadSent(true)
    } finally {
      setLeadLoading(false)
    }
  }

  const needsHelp = results && overallScore !== null && overallScore < 75

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" />
              Free Website Analysis
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-5">
              How Does Your Website Stack Up?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Enter your URL and get an instant grade on performance, accessibility, SEO, and best practices — powered by Google's PageSpeed Insights.
            </p>

            <form onSubmit={handleGrade} className="flex gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="yourwebsite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" className="h-12 px-6 rounded-lg" disabled={loading || !url.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Analyze'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 flex items-center gap-2 justify-center text-red-500 text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results && overallScore !== null && (
          <section className="pb-24 px-6">
            <div className="max-w-3xl mx-auto">

              {/* Overall banner */}
              <div className={`rounded-2xl p-8 mb-10 text-center border ${overallScore >= 90 ? 'bg-green-50 border-green-200' : overallScore >= 50 ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'}`}>
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Overall Score for {results.url}
                </p>
                <p className="text-7xl font-bold mb-2" style={{ color: scoreColor(overallScore) }}>
                  {overallScore}
                </p>
                <p className="text-base font-medium" style={{ color: scoreColor(overallScore) }}>
                  {overallScore >= 90 ? 'Your site is in great shape!' : overallScore >= 50 ? 'Your site has room for improvement.' : 'Your site needs significant work.'}
                </p>
              </div>

              {/* Score breakdown */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-8 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-8 text-center">Score Breakdown</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                  <ScoreRing score={results.performance} label="Performance" />
                  <ScoreRing score={results.accessibility} label="Accessibility" />
                  <ScoreRing score={results.bestPractices} label="Best Practices" />
                  <ScoreRing score={results.seo} label="SEO" />
                </div>
              </div>

              {/* Core metrics */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-8 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-6 text-center">Core Web Vitals</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MetricPill label="First Contentful Paint" value={results.fcp} />
                  <MetricPill label="Largest Contentful Paint" value={results.lcp} />
                  <MetricPill label="Total Blocking Time" value={results.tbt} />
                  <MetricPill label="Layout Shift (CLS)" value={results.cls} />
                </div>
              </div>

              {/* CTA / Lead capture */}
              {needsHelp && !leadSent && (
                <div className="bg-primary rounded-2xl p-8 text-white">
                  <div className="flex items-start gap-3 mb-6">
                    <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5 text-white/80" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Your site is costing you customers</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        A score of {overallScore} means visitors are bouncing before they ever read your pitch. We fix this — fast. Drop your info and we'll send you a free, personalized audit.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="Business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-white text-primary hover:bg-white/90 h-11 px-6 whitespace-nowrap"
                      disabled={leadLoading}
                    >
                      {leadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                        <>Get Free Audit <ArrowRight className="h-4 w-4 ml-1" /></>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {leadSent && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-3 text-green-700">
                  <CheckCircle className="h-6 w-6 flex-shrink-0" />
                  <p className="font-medium">We've got your info — expect to hear from us within 24 hours!</p>
                </div>
              )}

              {!needsHelp && results && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-800 mb-1">Nice work — your site scores well!</h3>
                  <p className="text-green-700 text-sm">
                    If you ever want a deeper look at conversions, copy, or AI automation, <a href="/#contact" className="underline font-medium">we're always here</a>.
                  </p>
                </div>
              )}

              {/* Re-analyze */}
              <div className="text-center mt-8">
                <button
                  onClick={() => { setResults(null); setUrl(''); setError(''); setLeadSent(false) }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Analyze a different site
                </button>
              </div>
            </div>
          </section>
        )}

        {/* How it works — shown when no results */}
        {!results && !loading && (
          <section className="pb-24 px-6">
            <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
              {[
                { step: '01', title: 'Enter Your URL', desc: 'Paste any publicly accessible website URL.' },
                { step: '02', title: 'We Run The Analysis', desc: "Google's PageSpeed engine audits your site across four categories." },
                { step: '03', title: 'Get Your Grade', desc: 'See your scores and what needs fixing — in seconds.' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center gap-3">
                  <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
