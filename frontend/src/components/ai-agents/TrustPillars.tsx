import { MapPin, Wrench, Shield, Users } from "lucide-react"

const pillars = [
  {
    icon: MapPin,
    title: "We Know Local Business",
    description:
      "We're not a faceless enterprise vendor. We've built sites and tools for the same kinds of businesses you run — right here in Georgia and the Southeast.",
  },
  {
    icon: Wrench,
    title: "We Handle Everything",
    description:
      "From setup to training to deployment, we manage the whole process. You stay focused on running your business — we handle the tech.",
  },
  {
    icon: Shield,
    title: "Your Data Stays Yours",
    description:
      "We build agents that respect your customer data and comply with privacy best practices. Your data never trains AI models.",
  },
  {
    icon: Users,
    title: "Real Humans Behind Every Agent",
    description:
      "You'll always have a direct line to us — not a ticket system, not a chatbot. Agents automate the routine; our team handles everything else.",
  },
]

export function TrustPillars() {
  return (
    <section className="py-24 px-6" style={{ background: '#111827' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Why Local Businesses Choose French &amp; Echols
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl border border-white/10"
              style={{ background: '#1e293b' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#3b82f615' }}
              >
                <pillar.icon className="h-5 w-5" style={{ color: '#3b82f6' }} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
