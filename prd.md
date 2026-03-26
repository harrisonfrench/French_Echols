# Echols & French — Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Echols & French  
**Type:** Website + Lead Generation Engine  
**Stage:** Early Startup (MVP → Scale)

Echols & French is a modern web design agency focused on helping small-to-mid-sized businesses upgrade their online presence. The platform will serve as both:

1. A **conversion-focused agency website**
2. A **lead generation engine** that identifies and targets businesses with poor or outdated websites

---

## 2. Vision

Build a system that:
- Identifies businesses that need better websites
- Presents Echols & French as the obvious upgrade
- Converts those businesses into paying clients

**Long-term:** Turn this into a repeatable, scalable product others could use.

---

## 3. Core Objectives

### Business Goals
- Acquire first 5–10 paying clients locally
- Build a repeatable outreach + conversion system
- Establish credibility through strong design + results

### Product Goals
- Showcase elite-level design capability
- Automate lead discovery (web scraping)
- Enable scalable outreach

---

## 4. Target Market

### Phase 1 (Local)
- Milledgeville, GA
- Small businesses:
  - Restaurants
  - Gyms
  - Barbershops
  - Real estate agents
  - Local services (plumbing, HVAC, etc.)

### Phase 2 (Expansion)
- Atlanta, GA
- Southeast region

### Phase 3 (Scale)
- Nationwide

---

## 5. Core Features

## 5.1 Lead Discovery Engine (Scraper)

### Purpose
Automatically identify businesses with weak or outdated websites.

### Inputs
- Location (default: Milledgeville → Atlanta → expand outward)
- Business categories (Google Maps / Yelp / directories)

### Outputs
- Business name
- Website URL
- Contact info (email, phone if available)
- Website quality score (basic heuristic)

### Website Quality Signals
- No website
- Outdated design
- Not mobile-friendly
- Slow load time
- Poor UX

### MVP Approach
- Use:
  - Google Maps scraping (via API or tools)
  - Yelp scraping
- Manual validation initially

---

## 5.2 Website (Agency Front-End)

### Goal
Make visitors instantly think:
> “These guys clearly design better websites than mine.”

### Design Principles
- Minimalist
- High contrast (light + blue accent)
- Fast and responsive
- Apple-level polish

### Key Sections

#### 1. Hero Section
- Strong headline:
  - "Your Website Should Be Your Best Salesperson"
- Subtext:
  - "We design modern, high-converting websites for growing businesses"
- CTA:
  - "Get a Free Website Audit"

#### 2. Portfolio (Even if mock projects)
- Before → After transformations
- Clean, modern UI examples

#### 3. Services
- Website Design
- Website Redesign
- Performance Optimization
- Conversion Optimization

#### 4. Social Proof
- Testimonials (real or early beta)
- Case-style breakdowns

#### 5. Free Audit Funnel
- Form:
  - Business name
  - Website
  - Email
- Output:
  - “We’ll review your site and send recommendations”

---

## 5.3 Outreach System

### Strategy
Use scraped leads to drive outbound outreach.

### Channels
- Email (primary)
- Instagram DM (local businesses)
- LinkedIn (for higher-end clients)

### Messaging Angle
- Personalized
- Value-first
- Short

Example:
> "Hey — I came across your site and noticed a few quick wins that could improve conversions. I’d be happy to send a quick audit if you're open to it."

---

## 5.4 Admin Dashboard (Future Phase)

### Purpose
Manage leads and outreach

### Features
- Lead list (scraped businesses)
- Status tracking:
  - Contacted
  - Responded
  - Closed
- Notes
- Export to CSV

---

## 6. User Flows

### Flow 1: Lead → Client
1. Scraper finds business
2. Add to lead list
3. Outreach message sent
4. Business visits site
5. Converts via audit form
6. Close deal

---

### Flow 2: Inbound Client
1. User lands on website
2. Views portfolio + value
3. Submits audit request
4. You follow up manually
5. Close deal

---

## 7. Tech Stack (MVP)

### Frontend
- Next.js (recommended)
- Tailwind CSS
- Vercel (hosting)

### Backend
- Node.js (API routes)
- Simple database (Firebase / Supabase)

### Scraping
- Python scripts OR Node tools
- APIs:
  - Google Places API
  - Yelp Fusion API

### Forms / CRM
- Simple DB or Airtable
- Email integration (Resend / SendGrid)

---

## 8. Security Considerations

- Protect API keys (env variables)
- Rate limit scraping to avoid bans
- Validate all form inputs
- Basic spam protection (captcha)
- Secure contact data storage

---

## 9. Metrics for Success

### Early Metrics
- # of leads scraped
- # of outreach messages sent
- Response rate
- Conversion rate

### Growth Metrics
- Clients closed per month
- Revenue per client
- Website conversion rate

---

## 10. Go-To-Market Strategy

### Phase 1 (Manual Hustle)
- Handpick local businesses
- Send personalized outreach
- Offer free audits

### Phase 2 (Semi-Automation)
- Use scraper to build lists
- Template outreach with light personalization

### Phase 3 (Scale)
- Expand geography
- Paid ads
- SEO

---

## 11. Differentiation

Echols & French wins by:
- Better design than competitors
- Faster turnaround
- Clear ROI messaging
- Personalized outreach vs generic spam

---

## 12. Roadmap

### Phase 1 (Week 1–2)
- Build website
- Create 2–3 mock portfolio pieces
- Manual outreach

### Phase 2 (Week 3–4)
- Build scraper MVP
- Build lead list
- Start scaling outreach

### Phase 3 (Month 2+)
- Add dashboard
- Improve automation
- Expand beyond Milledgeville

---

## 13. Future Opportunities

- Turn scraper into SaaS tool
- Subscription website maintenance plans
- Niche down (e.g., only gyms, only real estate)
- AI-generated website audits

---

## 14. Key Principle

> Start simple. Close deals. Improve system.

Don’t overbuild before revenue.
What you just built (important)

This is actually very strong for where you’re at:

You have a business model
A technical plan
A go-to-market strategy
And a scalable product idea

If you want next step, I’d go:

👉 “build me the actual website layout + components in Next.js”

or

👉 “build the scraper MVP step by step”

I’ll take you straight into execution.

tell it to use this tech stack "

Got it — I’ll upgrade your PRD to explicitly require this tech stack and make it Claude-ready.

Here’s your updated .md PRD with the exact stack enforced + slightly cleaned architecture so it actually works for your use case:

# Echols & French — Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Echols & French  
**Type:** Website + Lead Generation Platform  
**Stage:** MVP → Scalable Product

Echols & French is a modern web design agency platform that:
1. Showcases elite website design
2. Identifies businesses with poor websites
3. Converts them into paying clients

---

## 2. Vision

Create a system that:
- Automatically finds businesses that need better websites
- Positions Echols & French as the clear upgrade
- Scales into a repeatable lead generation + conversion engine

---

## 3. Tech Stack (MANDATORY)

This product MUST be built using the following stack:

### Backend
- **Language:** Go (1.22)
- **Framework:** Gin
- **Database:** MySQL 8.0
- **Query Layer:** sqlc (type-safe SQL)
- **Authentication:** JWT
- **Security:** bcrypt
- **Real-time (future):** gorilla/websocket

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix

### DevOps / Infra
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Reverse Proxy:** nginx
- **CI/CD:** GitHub Actions
- **Cloud:**
  - AWS ECR (image storage)
  - AWS Lightsail (hosting)
  - AWS S3 (file storage)

---

## 4. Core Features

---

## 4.1 Lead Discovery Engine (Scraper)

### Purpose
Automatically find businesses with weak or outdated websites.

### Functionality
- Scrape:
  - Google Maps
  - Yelp
  - Business directories
- Extract:
  - Business name
  - Website URL
  - Email / phone (if available)
  - Location

### Website Quality Scoring (MVP Rules)
- No website → HIGH PRIORITY
- Outdated UI → MEDIUM PRIORITY
- Not mobile responsive → HIGH PRIORITY
- Slow load → MEDIUM PRIORITY

### Backend Implementation (Go)
- Scheduled scraping jobs
- Store results in MySQL
- Use sqlc for safe queries

---

## 4.2 Agency Website (Frontend)

### Goal
Make users instantly think:
> “These guys are better than whoever built my site.”

### Design Direction
- Minimal
- Modern
- Fast
- Apple-inspired
- Blue accent system

### Pages

#### Home
- Hero
- Services
- Portfolio
- CTA

#### Portfolio
- Before / After designs
- Mock + real projects

#### Services
- Website Design
- Website Redesign
- Optimization

#### Contact / Audit
- Lead capture form

---

## 4.3 Free Website Audit Funnel

### Flow
1. User submits:
   - Name
   - Website
   - Email
2. Stored in database
3. Admin reviews
4. Manual follow-up

---

## 4.4 Outreach System

### Inputs
- Scraped leads from database

### Output
- Export or view leads
- Send outreach manually (MVP)

### Messaging Strategy
- Short
- Personalized
- Value-first

---

## 4.5 Admin Dashboard (Internal Tool)

### Features
- View all leads
- Filter by:
  - Location
  - Quality score
- Status tracking:
  - Not contacted
  - Contacted
  - Responded
  - Closed

### Frontend
- React + shadcn/ui

### Backend
- Gin API endpoints

---

## 5. Architecture

### Frontend
- React + TypeScript (Vite)
- Tailwind + shadcn/ui

### Backend
- Go + Gin API
- REST endpoints

### Database
- MySQL
- sqlc for queries

### Infra Flow
Client → nginx → Go API → MySQL

---

## 6. Security

- JWT authentication for admin
- bcrypt password hashing
- Input validation (backend)
- Rate limiting on APIs
- Environment variable protection
- Secure Docker configs

---

## 7. DevOps Flow

### Local Development
- Docker Compose runs:
  - Go API
  - MySQL
  - Frontend

### Deployment
- GitHub Actions:
  - Build Docker images
  - Push to AWS ECR
- Lightsail:
  - Runs containers
- nginx:
  - Routes traffic

---

## 8. Metrics for Success

### MVP Metrics
- # of leads scraped
- # of outreach attempts
- Response rate
- Clients closed

### Growth Metrics
- Monthly revenue
- Conversion rate
- Cost per lead

---

## 9. Go-To-Market Strategy

### Phase 1 (Milledgeville)
- Manual outreach
- Local businesses

### Phase 2 (Atlanta)
- Scale scraping radius
- Increase volume

### Phase 3 (Scale)
- Automate outreach
- SEO + ads

---

## 10. Roadmap

### Week 1–2
- Build frontend website
- Set up backend (Go + MySQL)
- Manual lead collection

### Week 3–4
- Build scraper
- Store leads in DB
- Start outreach

### Month 2+
- Admin dashboard
- Automation
- Expand geography

---

## 11. Future Opportunities

- SaaS version of lead scraper
- Subscription website plans
- AI-generated audits
- Industry-specific niches

---

## 12. Core Principle

> Start simple. Close deals. Then scale.