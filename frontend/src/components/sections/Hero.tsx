import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-white -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Now accepting new clients
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-[1.1]">
          Your Website Should Be Your{" "}
          <span className="text-primary">Best Salesperson</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          We design modern, high-converting websites for growing businesses.
          Stand out from competitors and turn visitors into customers.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact">
            <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all w-full">
              Get a Free Website Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl w-full">
              View Our Work
            </Button>
          </a>
          <Link to="/ai-agents">
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 rounded-xl"
              style={{ borderColor: '#3b82f6', color: '#3b82f6' }}
            >
              Build an AI Agent
              <Bot className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted by local businesses</p>
          <div className="flex items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-foreground">50+</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm text-muted-foreground">Websites Delivered</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
