import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface ScrapedLead {
  name: string
  place_id: string
  address: string
  phone: string
  website: string
  rating: number
  total_ratings: number
  category: string
  location: string
  WebsiteAnalysis?: {
    QualityScore: number
    QualityNotes: string[]
    HasSSL: boolean
    IsMobileFriendly: boolean
    LoadTime: number
  }
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Loader2, Save, ExternalLink, Phone, MapPin, Star, AlertTriangle, CheckCircle } from 'lucide-react'

export function ScraperPage() {
  const [location, setLocation] = useState('Milledgeville, GA')
  const [maxResults, setMaxResults] = useState(10)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['restaurant'])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [results, setResults] = useState<ScrapedLead[]>([])
  const [error, setError] = useState<string | null>(null)
  const [savedCount, setSavedCount] = useState<number | null>(null)

  // Use default categories (backend not required)
  useEffect(() => {
    setCategories([
      'restaurant', 'gym', 'barbershop', 'hair salon',
      'real estate agent', 'plumber', 'hvac', 'dentist',
      'lawyer', 'accountant'
    ])
  }, [])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleScrape = async () => {
    if (selectedCategories.length === 0) {
      setError('Please select at least one category')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])
    setSavedCount(null)

    try {
      const response = await api.admin.runScraper({
        location,
        categories: selectedCategories,
        max_results: maxResults,
      })

      if (response.leads) {
        // Sort by quality score (highest first = worst websites = best prospects)
        const sorted = [...response.leads].sort((a, b) => {
          const scoreA = a.WebsiteAnalysis?.QualityScore ?? 0
          const scoreB = b.WebsiteAnalysis?.QualityScore ?? 0
          return scoreB - scoreA
        })
        setResults(sorted)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scrape failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAll = async () => {
    if (results.length === 0) return

    setIsSaving(true)
    setError(null)

    try {
      const response = await api.admin.saveScrapedLeads(results)
      if (response.saved !== undefined) {
        setSavedCount(response.saved)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save leads')
    } finally {
      setIsSaving(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400 bg-green-400/10'
    if (score >= 5) return 'text-yellow-400 bg-yellow-400/10'
    return 'text-red-400 bg-red-400/10'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Hot Lead'
    if (score >= 5) return 'Good Prospect'
    return 'Low Priority'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Lead Scraper</h1>
        <p className="text-white/60">Find local businesses that need better websites</p>
      </div>

      {/* Configuration */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-medium text-white">Scrape Configuration</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Max Results Per Category</label>
            <Input
              type="number"
              value={maxResults}
              onChange={(e) => setMaxResults(parseInt(e.target.value) || 10)}
              min={1}
              max={50}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-cyan-400 text-black'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleScrape}
            disabled={isLoading || selectedCategories.length === 0}
            className="bg-cyan-400 text-black hover:bg-cyan-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Start Scrape
              </>
            )}
          </Button>

          {results.length > 0 && (
            <Button
              onClick={handleSaveAll}
              disabled={isSaving}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save All to Database
                </>
              )}
            </Button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        {savedCount !== null && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Saved {savedCount} leads to database
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-white/60">Scraping businesses... This may take a few minutes.</p>
          <p className="text-white/40 text-sm mt-2">Searching Google Maps and analyzing websites...</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">
              Results ({results.length} businesses)
            </h2>
            <p className="text-white/40 text-sm">
              Sorted by opportunity score (highest = needs website help most)
            </p>
          </div>

          <div className="grid gap-4">
            {results.map((lead, index) => {
              const score = lead.WebsiteAnalysis?.QualityScore ?? 0
              return (
                <div
                  key={lead.place_id || index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{lead.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getScoreColor(score)}`}>
                          Score: {score} - {getScoreLabel(score)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-white/60">
                        {lead.address && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {lead.address}
                          </span>
                        )}
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </span>
                        )}
                        {lead.rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            {lead.rating} ({lead.total_ratings} reviews)
                          </span>
                        )}
                      </div>

                      {lead.website ? (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 text-sm hover:underline flex items-center gap-1 mt-2"
                        >
                          {lead.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-orange-400 text-sm mt-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          No website found - Hot prospect!
                        </p>
                      )}

                      {lead.WebsiteAnalysis?.QualityNotes && lead.WebsiteAnalysis.QualityNotes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {lead.WebsiteAnalysis.QualityNotes.map((note, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-orange-400/10 text-orange-400 rounded"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-white/40 uppercase">{lead.category}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
