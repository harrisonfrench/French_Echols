import { Search, Code2, Rocket, BarChart2 } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    timeline: "1 Week",
    description:
      "We learn your business — your customers, your FAQs, your goals, and the workflows you want automated.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Build",
    timeline: "2–3 Weeks",
    description:
      "We build and train your agent on your data, tone, and workflows. Connected to your existing tools.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deploy",
    timeline: "Day 1",
    description:
      "Your agent goes live on your website, SMS, or wherever your customers already are.",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Optimize",
    timeline: "Ongoing",
    description:
      "We monitor performance, tune responses, and expand capabilities as your business grows.",
  },
]

export function ProcessSteps() {
  return (
    <section className="py-24 px-6" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            How We Build Your AI Agent
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We handle everything. You just show up for the kickoff call.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden md:block"
            style={{ background: 'linear-gradient(to right, transparent, #3b82f640, #3b82f640, transparent)' }}
          />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Number + Icon circle */}
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-6 border border-white/10 relative z-10"
                style={{ background: '#1e293b' }}
              >
                <step.icon className="h-6 w-6 mb-1" style={{ color: '#3b82f6' }} />
                <span className="text-xs font-bold" style={{ color: '#3b82f6' }}>{step.number}</span>
              </div>

              <div
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ color: '#3b82f6', background: '#3b82f615' }}
              >
                {step.timeline}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-12">
          Most agents are live within 2–4 weeks of your first call. No technical knowledge required from you.
        </p>
      </div>
    </section>
  )
}
