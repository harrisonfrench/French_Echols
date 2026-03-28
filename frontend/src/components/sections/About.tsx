import { MapPin, Zap, Heart } from "lucide-react"

const values = [
  {
    icon: MapPin,
    title: "Rooted in Georgia",
    description: "Based in Milledgeville, GA. We know what it takes to grow a business in the South.",
  },
  {
    icon: Zap,
    title: "Design-Obsessed",
    description: "We don't do average. Every pixel is intentional, every layout built to convert.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your success is our metric. We stay involved until you see real results.",
  },
]

export function About() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — story */}
          <div>
            <p className="text-primary font-medium mb-3">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-[1.1]">
              Built by Builders<br />Who Get It
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              Echols &amp; French is a web design and AI agency founded by two people who were tired
              of watching great local businesses get outcompeted online by inferior products with
              better websites.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combine elite-level design with practical technology — websites that actually
              convert, and AI agents that actually work — so you can focus on running your business
              instead of chasing leads.
            </p>
          </div>

          {/* Right — values */}
          <div className="space-y-6">
            {values.map((value) => (
              <div key={value.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
