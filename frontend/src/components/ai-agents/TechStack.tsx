const tools = [
  "n8n",
  "Claude AI",
  "OpenAI",
  "Twilio",
  "Cal.com",
  "Airtable",
  "Slack",
  "Gmail",
  "Google Calendar",
  "Zapier",
  "Make.com",
  "Retell AI",
]

export function TechStack() {
  return (
    <section className="py-20 px-6" style={{ background: '#0f172a' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/30 mb-8">
          Built with industry-leading tools
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-full text-sm text-white/70 border border-white/10"
              style={{ background: '#1e293b' }}
            >
              {tool}
            </span>
          ))}
        </div>

        <p className="mt-8 text-white/30 text-sm">
          We choose the right stack for your specific use case — not a one-size-fits-all solution.
        </p>
      </div>
    </section>
  )
}
