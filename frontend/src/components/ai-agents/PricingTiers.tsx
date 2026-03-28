import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter Agent",
    price: "$500",
    monthly: "$150/mo",
    bestFor: "Restaurants, small retailers, single-location service businesses",
    popular: false,
    features: [
      "1 AI agent (chat or SMS)",
      "Trained on up to 50 FAQs",
      "1 integration (booking or calendar)",
      "Website chat widget",
      "Up to 500 conversations/month",
      "Email support",
    ],
    cta: "Get Started",
    ctaHref: "#get-started",
  },
  {
    name: "Growth Agent",
    price: "$1,500",
    monthly: "$400/mo",
    bestFor: "Multi-location businesses, trucking companies, growing service businesses",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Multi-channel (website + SMS)",
      "Trained on up to 200 FAQs",
      "Up to 3 integrations",
      "Lead qualification workflow",
      "Automated follow-up sequences",
      "Up to 2,000 conversations/month",
      "Priority support + monthly report",
    ],
    cta: "Get Started",
    ctaHref: "#get-started",
  },
  {
    name: "Enterprise Agent",
    price: "Custom",
    monthly: "starting ~$5k setup",
    bestFor: "Mid-size businesses, multi-department operations, complex workflows",
    popular: false,
    features: [
      "Everything in Growth, plus:",
      "Multi-agent system",
      "Custom software integrations",
      "Voice agent (phone AI)",
      "Unlimited conversations",
      "Dedicated account manager",
      "Quarterly strategy sessions",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    ctaHref: "mailto:hello@echolsfrench.com",
  },
]

export function PricingTiers() {
  return (
    <section id="pricing" className="py-24 px-6" style={{ background: '#111827' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            No surprise invoices. No enterprise complexity. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative rounded-2xl p-8 border transition-all duration-300"
              style={{
                background: '#1e293b',
                borderColor: tier.popular ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                borderWidth: tier.popular ? '2px' : '1px',
                transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
                zIndex: tier.popular ? 1 : 0,
              }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
                  style={{ background: '#3b82f6' }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-white/40 text-sm mb-4">{tier.bestFor}</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-white/40 text-sm pb-1">setup + {tier.monthly}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {i === 0 && tier.features[0].includes('Everything') ? (
                      <span className="text-white/40 text-sm leading-relaxed">{feature}</span>
                    ) : (
                      <>
                        <div
                          className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#3b82f620' }}
                        >
                          <Check className="h-2.5 w-2.5" style={{ color: '#3b82f6' }} />
                        </div>
                        <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaHref}
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all"
                style={
                  tier.popular
                    ? { background: '#3b82f6', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-12 max-w-2xl mx-auto">
          Not sure which tier is right for you? Book a free 30-minute discovery call and we'll figure it out
          together — no pressure, no sales pitch.
        </p>
        <div className="text-center mt-4">
          <a
            href="#get-started"
            className="inline-flex items-center text-sm font-medium transition-colors"
            style={{ color: '#3b82f6' }}
          >
            Book Your Free Discovery Call →
          </a>
        </div>
      </div>
    </section>
  )
}
