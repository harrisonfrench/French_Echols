import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ExternalLink } from "lucide-react"

const projects = [
  {
    name: "Milledgeville Fitness",
    category: "Local Gym",
    description: "Complete website redesign that increased membership inquiries by 150%.",
    beforeColor: "bg-gray-300",
    afterColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    stats: [
      { label: "More Inquiries", value: "+150%" },
      { label: "Load Time", value: "0.8s" },
    ],
  },
  {
    name: "Southern Cuts Barbershop",
    category: "Barbershop",
    description: "Modern booking system and sleek design doubled online appointments.",
    beforeColor: "bg-amber-200",
    afterColor: "bg-gradient-to-br from-slate-800 to-slate-900",
    stats: [
      { label: "Online Bookings", value: "2x" },
      { label: "Mobile Traffic", value: "+85%" },
    ],
  },
  {
    name: "Lake Country Realty",
    category: "Real Estate",
    description: "Property showcase website with lead capture increased buyer contacts.",
    beforeColor: "bg-green-200",
    afterColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    stats: [
      { label: "Lead Gen", value: "+200%" },
      { label: "Time on Site", value: "3.5min" },
    ],
  },
]

export function Portfolio() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Transformations That Speak
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped local businesses upgrade their online presence and drive real results.
          </p>
        </div>

        {/* Portfolio grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Before/After visual */}
              <div className="relative h-48 overflow-hidden">
                {/* "Before" state */}
                <div className={`absolute inset-0 ${project.beforeColor} flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full`}>
                  <div className="text-center opacity-60">
                    <div className="w-16 h-3 bg-gray-400 rounded mb-2 mx-auto" />
                    <div className="w-24 h-2 bg-gray-400 rounded mb-4 mx-auto" />
                    <div className="grid grid-cols-2 gap-2 px-8">
                      <div className="h-8 bg-gray-400 rounded" />
                      <div className="h-8 bg-gray-400 rounded" />
                    </div>
                    <p className="mt-4 text-xs text-gray-500 font-medium">BEFORE</p>
                  </div>
                </div>
                {/* "After" state */}
                <div className={`absolute inset-0 ${project.afterColor} flex items-center justify-center translate-y-full transition-transform duration-500 group-hover:translate-y-0`}>
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-xl mb-3 mx-auto flex items-center justify-center">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium">AFTER</p>
                  </div>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <p className="text-sm text-primary font-medium mb-1">{project.category}</p>
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                {/* Stats */}
                <div className="flex gap-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-lg font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-xl">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
