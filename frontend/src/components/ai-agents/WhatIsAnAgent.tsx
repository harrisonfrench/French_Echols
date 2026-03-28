import { X, Check } from "lucide-react"

const comparisons = [
  {
    old: "Customer calls at 11pm → voicemail",
    new: "Agent answers instantly, takes a reservation",
  },
  {
    old: "Customer asks \"do you deliver?\" → waits for reply",
    new: "Agent replies in seconds with accurate info",
  },
  {
    old: "New lead fills out form → sits in inbox for hours",
    new: "Agent qualifies them, books a discovery call",
  },
  {
    old: "Staff manually follows up on every quote",
    new: "Agent sends follow-ups on a schedule automatically",
  },
  {
    old: "Appointment scheduling requires back-and-forth emails",
    new: "Agent books directly into your calendar, 24/7",
  },
]

export function WhatIsAnAgent() {
  return (
    <section className="py-24 px-6" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Think of It as Your Smartest Employee
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            One that never sleeps, never calls in sick, and handles your most repetitive tasks perfectly every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10">
          {/* Old Way column */}
          <div className="p-8" style={{ background: '#1e293b' }}>
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6">The Old Way</p>
            <div className="space-y-4">
              {comparisons.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#ef444420' }}>
                    <X className="h-3 w-3" style={{ color: '#ef4444' }} />
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.old}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With AI Agent column */}
          <div className="p-8 border-l-2" style={{ background: '#1e293b', borderColor: '#3b82f630' }}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: '#3b82f6' }}>
              With an AI Agent
            </p>
            <div className="space-y-4">
              {comparisons.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#22c55e20' }}>
                    <Check className="h-3 w-3" style={{ color: '#22c55e' }} />
                  </div>
                  <p className="text-white text-sm leading-relaxed">{item.new}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl border border-white/10 text-center" style={{ background: '#1e293b' }}>
          <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto">
            An AI agent is a custom-built assistant trained on <span className="text-white font-medium">your</span> business —
            your menu, your hours, your services, your tone. It talks to customers in real time,
            takes action, and connects to your existing tools.
          </p>
        </div>
      </div>
    </section>
  )
}
