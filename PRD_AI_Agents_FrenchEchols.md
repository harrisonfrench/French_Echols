# PRD: AI Agents Service — French & Echols Digital

**Document Type:** Product Requirements Document  
**Version:** 1.0  
**Date:** March 2026  
**Stack:** React / Next.js  
**Prepared for:** Claude Code / Cursor AI-assisted development  

---

## 1. Overview & Objective

French & Echols currently offers website design and development services. This PRD defines the requirements for adding a **second core service vertical: AI Agent development** — targeted initially at local businesses (restaurants, retail, service companies) and expanding into mid-size businesses (trucking, logistics, contractors, etc.).

The goal is a **website restructure** — not a full rebuild — that:
- Elevates AI Agents to a first-class service offering alongside web design
- Creates a dedicated `/ai-agents` page and supporting sub-sections
- Updates the navigation, homepage, and footer to reflect the new service
- Positions French & Echols as a modern, accessible AI partner (not an intimidating enterprise vendor)
- Drives qualified leads to a discovery call or intake form

---

## 2. Scope of Changes

### In Scope
- Updated global navigation
- Updated homepage (hero section, services section)
- New `/ai-agents` route and full page
- New `/ai-agents/[use-case]` dynamic routes (optional Phase 2)
- Updated footer
- New shared components (service cards, process steps, pricing tiers)
- New intake/contact form variant for AI inquiries

### Out of Scope (Phase 2)
- Client dashboard / portal
- Live agent demos embedded in site
- Blog / content section
- Case study detail pages (placeholder cards are fine for now)

---

## 3. Navigation Restructure

### Current (assumed)
```
Home | Services | Portfolio | Contact
```

### New Structure
```
Home | Services ▾ | Portfolio | About | Contact
         ├── Website Design
         └── AI Agents  ← NEW
```

**Implementation Notes:**
- Add a dropdown or mega-nav to the `Services` nav item
- On mobile: accordion-style expansion
- The "AI Agents" nav link should go to `/ai-agents`
- Highlight "AI Agents" with a subtle badge: `NEW` or a small lightning bolt icon to draw attention
- Active state should highlight the correct parent when on sub-pages

---

## 4. Homepage Updates

### 4a. Hero Section
Update the hero to reflect both services. Suggested approach: rotating/tabbed hero or two clear CTAs.

**Option A (Recommended) — Dual CTA Hero:**
```
Headline:    "We Build Websites. We Build AI Agents. We Build the Future of Your Business."
Subheadline: "From stunning websites to intelligent AI agents that answer phones, qualify 
              leads, and automate your busiest tasks — French & Echols does it all."

CTA Button 1: "Get a Website"  → /contact?service=website
CTA Button 2: "Build an AI Agent" → /ai-agents#get-started  [accent color, outlined]
```

### 4b. Services Section (Homepage)
Replace or augment the existing services section with two cards:

**Card 1 — Website Design**
- Icon: Globe or Layout icon
- Title: "Custom Website Design"
- Description: "Beautiful, fast, mobile-ready websites built to convert visitors into customers."
- CTA: "See Our Work" → /portfolio

**Card 2 — AI Agents** ← NEW
- Icon: Bot / Sparkles / CPU icon (Lucide: `Bot`, `Sparkles`, or `BrainCircuit`)
- Title: "AI Agents for Your Business"
- Description: "Custom AI agents that handle customer questions, book appointments, qualify leads, and automate repetitive tasks — 24/7, without adding headcount."
- CTA: "Learn More" → /ai-agents
- Badge: `NEW` or `Trending` tag

### 4c. Social Proof Bar (Homepage)
Add a simple stats bar below the hero or services section:

```
[Bot icon] 24/7 Availability  |  [Clock icon] Deployed in 2–4 Weeks  |  [Dollar icon] Starting at $150/mo  |  [Chart icon] 60%+ Reduction in Missed Inquiries
```

---

## 5. AI Agents Page — `/ai-agents`

This is the main deliverable. The page should flow top-to-bottom as a persuasive sales page.

---

### Section 1: Page Hero

```
Eyebrow text:  "AI Agents by French & Echols"
Headline:      "Your Business, Always On."
Subheadline:   "We build custom AI agents that handle customer questions, take reservations, 
                qualify leads, and automate your busiest workflows — even when you're closed."

CTA Primary:   "Book a Free Discovery Call"  → #get-started
CTA Secondary: "See What Agents Can Do"     → #use-cases (scroll anchor)
```

**Design notes:**
- Dark or gradient background to visually differentiate from the web design service
- Subtle animated element (floating chat bubble, pulsing bot icon, or looping typewriter effect showing sample agent replies)
- Mobile: stack CTAs vertically

---

### Section 2: The Problem (Pain Point Hook)

This section should resonate immediately with restaurant owners, trucking dispatchers, and local service businesses.

**Headline:** "You're Losing Business While You Sleep"

**Layout:** 3-column pain point cards

| Card | Icon | Headline | Body |
|------|------|----------|------|
| 1 | Phone (missed) | "Missed Calls = Missed Revenue" | "Customers call after hours, get voicemail, and call your competitor instead." |
| 2 | Clock | "Your Team Is Buried" | "Your staff spends hours answering the same questions over and over." |
| 3 | ChartBar (down) | "Manual Work Slows Growth" | "Scheduling, follow-ups, lead qualification — all done by hand. It doesn't have to be." |

---

### Section 3: What Is an AI Agent? (Education)

Many local business owners don't know what an AI agent is. This section demystifies it.

**Headline:** "Think of It as Your Smartest Employee — One That Never Sleeps"

**Layout:** Side-by-side comparison OR a simple 2-column explainer

```
OLD WAY                              WITH AN AI AGENT
─────────────────────────────────────────────────────
Customer calls at 11pm → voicemail   →  Agent answers instantly, takes a reservation
Customer asks "do you deliver?"      →  Agent replies in seconds with accurate info
New lead fills out contact form      →  Agent qualifies them, books a call automatically
Staff manually follows up on quotes  →  Agent sends follow-ups on a schedule
```

**Supporting copy:**
> "An AI agent is a custom-built software assistant trained on YOUR business — your menu, your hours, your services, your tone. It talks to customers in real time, takes action, and connects to your existing tools."

---

### Section 4: Use Cases — `id="use-cases"`

**Headline:** "What Can an AI Agent Do for Your Business?"

Display use case cards in a responsive grid (2 cols desktop, 1 col mobile). Each card is clickable (expand or route to a detail modal/page in Phase 2).

#### Use Case Cards:

**1. Restaurant & Hospitality**
- Icon: `UtensilsCrossed` (Lucide)
- Title: "AI Agent for Restaurants"
- Bullet points:
  - Answer menu questions 24/7 (ingredients, hours, specials)
  - Take reservations automatically
  - Handle delivery/pickup inquiries
  - Collect customer feedback after visits
- Tag: `Most Popular`

**2. Lead Qualification (Any Business)**
- Icon: `UserCheck`
- Title: "Lead Qualification Agent"
- Bullet points:
  - Engages website visitors the moment they land
  - Asks qualifying questions (budget, timeline, location)
  - Books discovery calls directly into your calendar
  - Sends follow-up messages automatically
- Tag: `High ROI`

**3. Trucking & Logistics**
- Icon: `Truck`
- Title: "Dispatch & Operations Agent"
- Bullet points:
  - Answer driver or client inquiries 24/7
  - Provide load status updates via text or chat
  - Intake new shipment requests
  - Route FAQs away from your dispatcher
- Tag: `Emerging`

**4. Appointment-Based Businesses**
- Icon: `CalendarCheck`
- Title: "Booking & Scheduling Agent"
- Bullet points:
  - Book, reschedule, and cancel appointments automatically
  - Send reminders to reduce no-shows
  - Collect intake information before appointments
  - Works for salons, clinics, contractors, HVAC, etc.

**5. Customer Support & FAQ**
- Icon: `MessageCircle`
- Title: "24/7 Customer Support Agent"
- Bullet points:
  - Answers your top 50 most common questions instantly
  - Escalates complex issues to a human (with full context)
  - Reduces support volume by 60%+ on average
  - Deployable on website chat, SMS, or WhatsApp

**6. E-commerce & Retail**
- Icon: `ShoppingBag`
- Title: "Retail & E-commerce Agent"
- Bullet points:
  - Product recommendations based on customer needs
  - Order status lookups
  - Returns and exchange guidance
  - Upsell and cross-sell prompts

---

### Section 5: Our Process

**Headline:** "How We Build Your AI Agent"
**Subheadline:** "We handle everything. You just show up for the kickoff call."

**4-Step Process — Horizontal stepper on desktop, vertical on mobile:**

```
Step 1                Step 2               Step 3               Step 4
────────────          ────────────         ────────────         ────────────
DISCOVERY             BUILD                DEPLOY               OPTIMIZE
────────────          ────────────         ────────────         ────────────
We learn your         We build and         Your agent goes      We monitor
business: your        train the            live on your         performance,
customers, your       agent on your        website, SMS,        tune responses,
FAQs, your            data, tone,          or wherever          and expand
goals.                and workflows.       your customers       capabilities
                                          already are.          over time.

1 Week                2–3 Weeks            Day 1                Ongoing
```

**Supporting note:**
> "Most agents are live within 2–4 weeks of your first call. No technical knowledge required from you."

---

### Section 6: Pricing Tiers — `id="pricing"`

**Headline:** "Simple, Transparent Pricing"
**Subheadline:** "No surprise invoices. No enterprise complexity. Just results."

Display 3 pricing cards. Recommended layout: center card ("Growth") is highlighted/elevated.

---

#### Tier 1 — Starter Agent
**Price:** $500 setup + $150/month  
**Best for:** Restaurants, small retailers, single-location service businesses

**Includes:**
- 1 AI agent (chat or SMS)
- Trained on up to 50 FAQs / knowledge items
- 1 integration (e.g., your booking system OR Google Calendar)
- Website chat widget deployment
- Up to 500 conversations/month
- Email support

---

#### Tier 2 — Growth Agent ⭐ MOST POPULAR
**Price:** $1,500 setup + $400/month  
**Best for:** Multi-location businesses, trucking companies, growing service businesses

**Includes everything in Starter, plus:**
- Multi-channel deployment (website chat + SMS)
- Trained on up to 200 FAQs / knowledge items
- Up to 3 integrations (CRM, calendar, email, Slack, etc.)
- Lead qualification workflow
- Automated follow-up sequences
- Up to 2,000 conversations/month
- Priority support + monthly performance report

---

#### Tier 3 — Enterprise Agent
**Price:** Custom (starting at ~$5,000 setup)  
**Best for:** Mid-size businesses, multi-department operations, companies with complex workflows

**Includes everything in Growth, plus:**
- Multi-agent system (e.g., separate sales + support agents)
- Custom integrations with your existing software
- Voice agent capability (phone AI)
- Unlimited conversations
- Dedicated account manager
- Quarterly strategy sessions
- SLA guarantee

---

**Pricing section footnote:**
> "Not sure which tier is right for you? Book a free 30-minute discovery call and we'll figure it out together — no pressure, no sales pitch."

**CTA below pricing:** "Book Your Free Discovery Call" → #get-started

---

### Section 7: Technology Stack (Brief) — Optional

**Headline:** "Built on Technology You Can Trust"

A simple logo/icon row showing the tools used. Even if the stack isn't finalized, showing these builds credibility:

**Recommended tools to display (and plan to use):**
- **n8n** — for workflow automation (open source, self-hostable, great for local biz integrations)
- **OpenAI / Claude API** — LLM backbone for conversational intelligence
- **Twilio** — SMS + voice capabilities
- **Cal.com or Calendly** — appointment booking integration
- **Zapier / Make.com** — no-code integrations for non-technical client setups

> Note: Don't need to show exact tools if not finalized — can use generic labels like "Leading LLM Providers", "Workflow Automation", "Voice & SMS", "Booking Systems".

---

### Section 8: Trust / Why Us

**Headline:** "Why Local Businesses Choose French & Echols"

**Layout:** 3 or 4 trust pillars

| Pillar | Icon | Title | Body |
|--------|------|-------|------|
| 1 | `MapPin` | "We Know Local Business" | "We're not a faceless enterprise vendor. We've built sites and tools for the same kinds of businesses you run." |
| 2 | `Wrench` | "We Handle Everything" | "From setup to training to deployment, we manage the whole process. You stay focused on your business." |
| 3 | `Shield` | "Your Data Stays Yours" | "We build agents that respect your customer data and comply with privacy best practices." |
| 4 | `PhoneCall` | "Real Humans Behind Every Agent" | "You'll always have a direct line to us. Not a ticket system. Not a chatbot." |

---

### Section 9: FAQ

**Headline:** "Common Questions"

Accordion-style FAQ component.

**Questions to include:**

1. **Do I need to be technical to use an AI agent?**  
   Not at all. We handle the entire build and setup. You provide your business knowledge (menu, hours, policies), and we do the rest.

2. **How is this different from a chatbot?**  
   Traditional chatbots follow rigid scripts. Our AI agents understand natural language, handle unexpected questions, and take real actions — like booking appointments or sending follow-ups.

3. **What tools does it connect to?**  
   We can integrate with most common business tools: Google Calendar, Calendly, your POS, CRM, email, SMS, Slack, and more. Ask us about your specific setup on the discovery call.

4. **How long does setup take?**  
   Most agents are live within 2–4 weeks of your kickoff call. Simpler setups can go live faster.

5. **What happens if the agent can't answer something?**  
   We configure a fallback — the agent either escalates to a human, collects the customer's info for you to follow up, or both. Nothing falls through the cracks.

6. **Can the agent make phone calls?**  
   Yes — with our Enterprise tier, we can deploy voice agents that answer and make calls. This uses AI voice technology and works for both inbound and outbound calls.

7. **Is there a contract?**  
   Monthly plans are month-to-month after your setup fee. Enterprise plans may have a minimum term — we'll discuss this on your discovery call.

8. **What if I want to make changes after launch?**  
   All plans include the ability to request updates. Growth and Enterprise plans include regular optimization sessions built in.

---

### Section 10: Get Started Form — `id="get-started"`

**Headline:** "Let's Build Your Agent"
**Subheadline:** "Tell us a little about your business and we'll reach out within 1 business day."

**Form Fields:**

```
Full Name *
Business Name *
Business Type * (dropdown)
  - Restaurant / Food Service
  - Trucking / Logistics
  - Retail / E-commerce
  - Appointment-Based Service (salon, clinic, HVAC, etc.)
  - Other (text field appears)

What's your biggest challenge right now? * (textarea, 3 rows)
  Placeholder: "e.g., We miss a lot of calls after hours and lose customers to competitors..."

Preferred contact method * (radio)
  ○ Email   ○ Phone call   ○ Text message

Email *
Phone (optional)

[Book My Free Discovery Call]  ← submit button
```

**On submit:**
- Show success message: "You're in! We'll reach out within 1 business day. In the meantime, feel free to check out what our agents can do."
- Send confirmation email (if email integration is wired up)
- Optional: redirect to Calendly/Cal.com to book immediately

**Form component:** Create as `AIAgentLeadForm.jsx` — reusable, can be embedded on homepage too.

---

## 6. Footer Updates

Add "AI Agents" as a navigation link in the footer under a "Services" column.

**Footer Services column (new):**
```
Services
────────
Website Design
AI Agents  ← NEW
```

---

## 7. File & Folder Structure

### New Files to Create:

```
/app
  /ai-agents
    page.jsx                   ← Main AI Agents service page
    layout.jsx                 ← (optional) shared layout for AI section

/components
  /ai-agents
    AIAgentsHero.jsx           ← Section 1: Hero
    PainPoints.jsx             ← Section 2: Problem cards
    WhatIsAnAgent.jsx          ← Section 3: Education / explainer
    UseCaseGrid.jsx            ← Section 4: Use case cards
    UseCaseCard.jsx            ← Individual use case card component
    ProcessSteps.jsx           ← Section 5: 4-step process
    PricingTiers.jsx           ← Section 6: Pricing cards
    PricingCard.jsx            ← Individual pricing card
    TechStack.jsx              ← Section 7: Technology logos/badges
    TrustPillars.jsx           ← Section 8: Why us
    FAQAccordion.jsx           ← Section 9: FAQ accordion
    AIAgentLeadForm.jsx        ← Section 10: Lead capture form

/components
  /shared
    ServiceCard.jsx            ← Used on homepage services section (update)
    StatsBar.jsx               ← New social proof bar for homepage
```

### Files to Modify:

```
/components/Navbar.jsx (or Header.jsx)    ← Add dropdown, "AI Agents" link, NEW badge
/app/page.jsx (or /pages/index.jsx)      ← Update hero, services section, add stats bar
/components/Footer.jsx                   ← Add AI Agents link to services column
```

---

## 8. Routing

Using Next.js App Router:

```
/                  → Homepage (updated)
/ai-agents         → AI Agents service page (NEW)
/ai-agents#use-cases    → Scroll anchor
/ai-agents#pricing      → Scroll anchor
/ai-agents#get-started  → Scroll anchor
/contact?service=ai-agent → Pre-filled contact form (optional)
```

---

## 9. Component Specs & UX Notes

### Navbar Dropdown
- Trigger: hover on desktop, tap on mobile
- Dropdown items: "Website Design" and "AI Agents"
- Add `NEW` badge next to "AI Agents" — small pill, accent color background
- Animate: fade + slight translateY drop

### Pricing Cards
- 3-column grid on desktop, stacked on mobile
- Middle card ("Growth") has elevated shadow, accent border, and `MOST POPULAR` badge
- Each card: header with tier name + price, feature list with checkmarks, CTA button
- CTA for Starter/Growth: "Get Started" → scrolls to #get-started
- CTA for Enterprise: "Contact Us" → /contact or opens mailto

### FAQ Accordion
- Closed by default, single item open at a time
- Smooth expand/collapse animation (CSS transition or Framer Motion)
- `+` / `−` indicator icon on right side

### Use Case Cards
- Hover state: slight lift (transform: translateY(-4px)), shadow increase
- Each card has: icon (Lucide), title, bullet list of capabilities, optional tag/badge
- Phase 2: make cards clickable → `/ai-agents/restaurants`, `/ai-agents/trucking`, etc.

### Lead Form
- Client-side validation before submit
- Show inline field errors (not alert popups)
- Submit state: button shows spinner
- Disable form after successful submit, show success message inline
- Use Next.js API route `/api/ai-agent-inquiry` to handle submission (email via Resend, Nodemailer, or forward to a CRM/Airtable)

---

## 10. SEO Metadata

Add to `/app/ai-agents/page.jsx`:

```jsx
export const metadata = {
  title: "AI Agents for Local Businesses | French & Echols",
  description:
    "Custom AI agents for restaurants, trucking companies, and local businesses. Handle customer questions, book appointments, and qualify leads 24/7. Built by French & Echols.",
  keywords: [
    "AI agents for restaurants",
    "AI agents for small business",
    "custom AI chatbot",
    "AI automation local business",
    "trucking AI agent",
    "lead qualification AI",
    "French Echols AI agents"
  ],
  openGraph: {
    title: "AI Agents for Local Businesses | French & Echols",
    description: "Always-on AI that answers questions, books appointments, and qualifies leads for your business.",
    type: "website",
  },
};
```

---

## 11. Recommended Tech Stack for Building Agents

*(For internal planning — not required on the website but inform how you respond to client questions)*

**Phase 1 — Local Businesses (Restaurants, Retail):**
- **n8n** (self-hosted or n8n Cloud) for workflow automation — drag and drop, great for connecting to booking systems, email, SMS
- **Claude API (Anthropic)** or **OpenAI GPT-4o** as the LLM backbone
- **Twilio** for SMS channel
- **Botpress** or **Voiceflow** for the chat widget layer (no-code frontend for the agent UI)
- **Cal.com** for open-source booking integration

**Phase 2 — Mid-size (Trucking, Multi-location):**
- **LangChain / LangGraph** for multi-step agent logic and memory
- **Supabase** or **PostgreSQL** for persistent agent memory / conversation history
- **Retell AI** or **Vapi** for voice agent capabilities
- **Make.com** for clients who already use other SaaS tools

**Positioning Note:**  
You don't need to pick one stack and lock in. Frame it to clients as: *"We choose the right tools for your specific use case."* This is more honest and actually a competitive advantage.

---

## 12. Design Tokens / Visual Identity Notes

To differentiate the AI Agents section from the web design section visually:

- **Primary color for AI section:** Use a distinct accent (electric blue `#3B82F6`, or a deep purple `#7C3AED`) vs. whatever color the web design section uses
- **Icon set:** Lucide React (already likely in use with Next.js projects)
- **Background:** Dark section backgrounds (`#0F172A` or `#111827`) for hero and pricing to create a "tech" feel
- **Typography:** Keep same font family but lean heavier (`font-bold`, larger `tracking-tight` headlines) in the AI section for energy
- **Animations (optional, non-blocking):** Framer Motion for card entrance animations (`fadeInUp`), accordion transitions, and the hero element

---

## 13. Phase 2 Roadmap (Out of Scope for Now)

The following features should be scoped after Phase 1 launches:

- `/ai-agents/[industry]` dynamic pages for SEO (restaurants, trucking, healthcare, etc.)
- Live agent demo embedded on the page (a real working example agent)
- Case studies section with metrics from real clients
- Client portal / dashboard for monitoring their agent's conversations
- Blog / content strategy around "AI for local business" keywords
- Affiliate or referral program for other agencies

---

## 14. Acceptance Criteria

The AI Agents section is complete when:

- [ ] `/ai-agents` page is live and accessible
- [ ] Navigation includes dropdown with "Website Design" and "AI Agents" links
- [ ] Homepage hero and services section updated with dual CTAs and AI Agents card
- [ ] All 10 page sections are rendered correctly on desktop and mobile
- [ ] Pricing tiers are displayed correctly with 3 cards; middle card is visually elevated
- [ ] FAQ accordion opens/closes with animation
- [ ] Lead capture form validates, submits, and shows success state
- [ ] Form submission is received (email, Airtable, or CRM — confirm destination before build)
- [ ] Page loads under 3 seconds on mobile (Lighthouse score > 85)
- [ ] All scroll anchors (`#use-cases`, `#pricing`, `#get-started`) work correctly
- [ ] SEO metadata is set on the `/ai-agents` page
- [ ] Footer updated with AI Agents link

---

*End of PRD — French & Echols AI Agents Service*  
*Questions? Add comments inline or reach out before starting implementation.*
