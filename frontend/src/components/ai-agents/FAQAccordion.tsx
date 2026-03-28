import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How quickly can an AI agent be deployed?",
    answer:
      "Most agents are live within 2–4 weeks of your kickoff call. Simpler setups can go live faster. We'll give you a realistic timeline after our discovery call.",
  },
  {
    question: "Do I need any technical knowledge to use it?",
    answer:
      "Not at all. We handle the entire build and setup. You provide your business knowledge — your menu, hours, policies, FAQs — and we do the rest.",
  },
  {
    question: "How is this different from a regular chatbot?",
    answer:
      "Traditional chatbots follow rigid scripts and break when asked unexpected questions. Our AI agents understand natural language, handle nuanced conversations, and take real actions — like booking appointments, sending follow-ups, or updating your CRM.",
  },
  {
    question: "What tools can the agent integrate with?",
    answer:
      "We can integrate with most common business tools: Google Calendar, Calendly, your POS system, CRM, email, SMS, Slack, and more. Ask us about your specific setup on the discovery call.",
  },
  {
    question: "What happens if the agent can't answer a question?",
    answer:
      "We configure a fallback — the agent either escalates to a human (with full context), collects the customer's info for you to follow up, or both. Nothing falls through the cracks.",
  },
  {
    question: "Can the agent make and receive phone calls?",
    answer:
      "Yes — with our Enterprise tier, we can deploy voice agents that answer and make calls using AI voice technology. This works for both inbound customer service and outbound follow-up calls.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "Monthly plans are month-to-month after your setup fee. No lock-in. Enterprise plans may have a minimum term — we'll discuss this on your discovery call.",
  },
  {
    question: "Can I make changes to the agent after launch?",
    answer:
      "All plans include the ability to request updates. Growth and Enterprise plans include regular optimization sessions built in. You're never stuck with a static agent.",
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-6" style={{ background: '#0f172a' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: '#1e293b' }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-base font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#3b82f6',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? '400px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="px-6 pb-5 text-white/50 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
