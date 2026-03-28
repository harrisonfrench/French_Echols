import { PhoneOff, Users, Clock } from "lucide-react"

const painPoints = [
  {
    icon: PhoneOff,
    accentColor: '#ef4444',
    title: "Missed Calls = Missed Revenue",
    description:
      "Customers call after hours, get voicemail, and call your competitor instead. Every unanswered call is a lost sale.",
  },
  {
    icon: Users,
    accentColor: '#f97316',
    title: "Your Team Is Buried",
    description:
      "Your staff spends hours answering the same questions over and over. That time should go toward work that actually grows your business.",
  },
  {
    icon: Clock,
    accentColor: '#eab308',
    title: "Manual Work Slows Growth",
    description:
      "Scheduling, follow-ups, lead qualification — all done by hand. There's a better way, and it doesn't require hiring anyone new.",
  },
]

export function PainPoints() {
  return (
    <section className="py-24 px-6" style={{ background: '#111827' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            You're Losing Business While You Sleep
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Sound familiar? These are the problems AI agents were built to solve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="p-8 rounded-2xl border border-white/10"
              style={{ background: '#1e293b' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${point.accentColor}20` }}
              >
                <point.icon className="h-6 w-6" style={{ color: point.accentColor }} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{point.title}</h3>
              <p className="text-white/50 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
