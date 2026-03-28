import { useState } from "react"
import { api } from "@/lib/api"
import { CheckCircle, Loader2 } from "lucide-react"

const businessTypes = [
  "Restaurant / Food Service",
  "Trucking / Logistics",
  "Retail / E-commerce",
  "Appointment-Based Service (salon, clinic, HVAC, etc.)",
  "Real Estate",
  "Healthcare / Medical",
  "Professional Services",
  "Other",
]

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 border border-white/10 outline-none focus:border-blue-500 transition-colors"
const inputStyle = { background: '#0f172a' }

export function AIAgentLeadForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    business_name: "",
    business_type: "",
    challenge: "",
    contact_method: "email",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await api.submitAIAgentInquiry({
        ...formData,
        phone: formData.phone || undefined,
      })
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="get-started" className="py-24 px-6" style={{ background: '#111827' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Let's Build Your Agent
          </h2>
          <p className="text-lg text-white/50">
            Tell us a little about your business and we'll reach out within 1 business day.
          </p>
        </div>

        <div className="rounded-2xl p-8 border border-white/10" style={{ background: '#1e293b' }}>
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-14 w-14 mx-auto mb-4" style={{ color: '#22c55e' }} />
              <h3 className="text-2xl font-semibold text-white mb-2">You're in!</h3>
              <p className="text-white/50 max-w-sm mx-auto">
                We'll reach out within 1 business day. In the meantime, feel free to explore what
                our agents can do.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    full_name: "",
                    business_name: "",
                    business_type: "",
                    challenge: "",
                    contact_method: "email",
                    email: "",
                    phone: "",
                  })
                }}
                className="mt-6 text-sm underline text-white/40 hover:text-white/60 transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Full Name <span style={{ color: '#3b82f6' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Business Name <span style={{ color: '#3b82f6' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    required
                    placeholder="Jane's Bistro"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Business Type <span style={{ color: '#3b82f6' }}>*</span>
                </label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="" disabled>Select your business type...</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  What's your biggest challenge right now? <span style={{ color: '#3b82f6' }}>*</span>
                </label>
                <textarea
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="e.g., We miss a lot of calls after hours and lose customers to competitors..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Preferred contact method <span style={{ color: '#3b82f6' }}>*</span>
                </label>
                <div className="flex gap-6">
                  {(['email', 'phone', 'either'] as const).map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contact_method"
                        value={method}
                        checked={formData.contact_method === method}
                        onChange={handleChange}
                        className="accent-blue-500"
                      />
                      <span className="text-sm text-white/70 capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Email <span style={{ color: '#3b82f6' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@janesbistro.com"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Phone <span className="text-white/30 text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(478) 555-0100"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: '#3b82f6' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Book My Free Discovery Call"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
