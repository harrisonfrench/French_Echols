import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, RefreshCw, Zap, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Website Design",
    description: "Custom, modern websites built from the ground up. We create unique designs that capture your brand and convert visitors into customers.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description: "Transform your outdated website into a modern, professional online presence. Keep what works, fix what doesn't.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed matters. We optimize your site for lightning-fast load times and smooth user experience across all devices.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "Turn more visitors into leads and customers. We analyze user behavior and optimize every touchpoint.",
  },
]

export function Services() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Services That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to establish a powerful online presence and grow your business.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 bg-background"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
