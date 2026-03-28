export function AIAgentsHero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center px-6 py-20"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm font-medium mb-8 bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          AI Agents by French &amp; Echols
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
          Your Business,{" "}
          <span style={{ color: '#3b82f6' }}>Always On.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          We build custom AI agents that answer questions, take reservations, qualify leads,
          and automate your busiest workflows — even when you're closed.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium text-white transition-all shadow-lg hover:shadow-xl"
            style={{ background: '#3b82f6' }}
          >
            Book a Free Discovery Call
          </a>
          <a
            href="#use-cases"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium text-white transition-all border border-white/20 hover:bg-white/10"
          >
            See What Agents Can Do
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-white/60">Availability</div>
          </div>
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">&lt;2s</div>
            <div className="text-sm text-white/60">Response Time</div>
          </div>
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">2–4 wks</div>
            <div className="text-sm text-white/60">To Deploy</div>
          </div>
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">60%+</div>
            <div className="text-sm text-white/60">Fewer Missed Inquiries</div>
          </div>
        </div>
      </div>
    </section>
  )
}
