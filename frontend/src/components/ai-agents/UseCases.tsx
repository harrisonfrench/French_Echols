import { UtensilsCrossed, Filter, Truck, CalendarCheck, MessageCircle, ShoppingBag } from "lucide-react"

const useCases = [
  {
    icon: UtensilsCrossed,
    title: "AI Agent for Restaurants",
    tag: "Most Popular",
    tagColor: '#3b82f6',
    bullets: [
      "Answer menu questions 24/7 (ingredients, hours, specials)",
      "Take reservations automatically",
      "Handle delivery and pickup inquiries",
      "Collect customer feedback after visits",
    ],
  },
  {
    icon: Filter,
    title: "Lead Qualification Agent",
    tag: "High ROI",
    tagColor: '#22c55e',
    bullets: [
      "Engage website visitors the moment they land",
      "Ask qualifying questions (budget, timeline, location)",
      "Book discovery calls directly into your calendar",
      "Send automated follow-up messages",
    ],
  },
  {
    icon: Truck,
    title: "Dispatch & Operations Agent",
    tag: "Emerging",
    tagColor: '#f97316',
    bullets: [
      "Answer driver or client inquiries 24/7",
      "Provide load status updates via text or chat",
      "Intake new shipment requests automatically",
      "Route FAQs away from your dispatcher",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Booking & Scheduling Agent",
    tag: null,
    tagColor: null,
    bullets: [
      "Book, reschedule, and cancel appointments automatically",
      "Send reminders to reduce no-shows",
      "Collect intake information before appointments",
      "Works for salons, clinics, contractors, HVAC, and more",
    ],
  },
  {
    icon: MessageCircle,
    title: "24/7 Customer Support Agent",
    tag: null,
    tagColor: null,
    bullets: [
      "Answer your top 50 most common questions instantly",
      "Escalate complex issues to a human with full context",
      "Reduce support volume by 60%+ on average",
      "Deploy on website chat, SMS, or WhatsApp",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce Agent",
    tag: null,
    tagColor: null,
    bullets: [
      "Product recommendations based on customer needs",
      "Order status lookups in real time",
      "Returns and exchange guidance",
      "Upsell and cross-sell prompts",
    ],
  },
]

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6" style={{ background: '#111827' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            What Can an AI Agent Do for Your Business?
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We build agents for every type of local business. See which one fits yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                background: '#1e293b',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(59,130,246,0.15)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#3b82f620' }}
                >
                  <useCase.icon className="h-5 w-5" style={{ color: '#3b82f6' }} />
                </div>
                {useCase.tag && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ background: useCase.tagColor || '#3b82f6' }}
                  >
                    {useCase.tag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-white mb-3">{useCase.title}</h3>
              <ul className="space-y-2">
                {useCase.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/50">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#3b82f6' }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
