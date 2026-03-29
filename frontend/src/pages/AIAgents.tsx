import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AIAgentsHero } from "@/components/ai-agents/AIAgentsHero"
import { PainPoints } from "@/components/ai-agents/PainPoints"
import { WhatIsAnAgent } from "@/components/ai-agents/WhatIsAnAgent"
import { UseCases } from "@/components/ai-agents/UseCases"
import { ProcessSteps } from "@/components/ai-agents/ProcessSteps"
import { PricingTiers } from "@/components/ai-agents/PricingTiers"
import { TechStack } from "@/components/ai-agents/TechStack"
import { TrustPillars } from "@/components/ai-agents/TrustPillars"
import { FAQAccordion } from "@/components/ai-agents/FAQAccordion"
import { AIAgentLeadForm } from "@/components/ai-agents/AIAgentLeadForm"
import { ChatDemo } from "@/components/ai-agents/ChatDemo"

export function AIAgentsPage() {
  return (
    <div style={{ background: '#0f172a' }}>
      <Header variant="dark" />
      <main className="pt-16">
        <AIAgentsHero />
        <PainPoints />
        <WhatIsAnAgent />
        <UseCases />
        <ProcessSteps />
        <ChatDemo />
        <PricingTiers />
        <TechStack />
        <TrustPillars />
        <FAQAccordion />
        <AIAgentLeadForm />
      </main>
      <Footer />
    </div>
  )
}
