import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { About as AboutSection } from "@/components/sections/About"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
