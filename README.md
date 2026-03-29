# Echols & French — Agency Platform

Modern web design and AI automation agency website for Echols & French, based in Milledgeville, Georgia.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Go 1.22, Gin, sqlc, JWT |
| Database | MySQL 8.0 (via Docker) |
| AI | Anthropic Claude (Haiku) |
| Infra | Docker, Docker Compose |

---

## Project Structure

```
French_Echols/
├── frontend/          # React + TypeScript + Vite
│   └── src/
│       ├── pages/             # Route-level page components
│       │   ├── Home.tsx
│       │   ├── AIAgents.tsx
│       │   ├── MeetTheTeam.tsx
│       │   ├── WebsiteGrader.tsx
│       │   └── admin/         # Protected admin pages
│       ├── components/
│       │   ├── layout/        # Header, Footer
│       │   ├── sections/      # Homepage sections (Hero, About, Testimonials…)
│       │   ├── ai-agents/     # AI Agents page sections + ChatDemo
│       │   ├── admin/         # Admin layout + sidebar
│       │   └── ui/            # Base UI components (Button, Card, Input…)
│       └── lib/
│           ├── api.ts         # Typed API client
│           └── utils.ts
├── backend/           # Go REST API
│   ├── cmd/api/       # Entry point (main.go)
│   ├── internal/
│   │   ├── handlers/  # HTTP handlers (handlers.go, chat.go, testimonials.go)
│   │   ├── database/  # MySQL connection
│   │   ├── middleware/ # JWT auth
│   │   └── models/    # Shared types
│   └── db/migrations/ # SQL migration files
├── Founders-Credentials/  # Team resume files
├── docker-compose.yaml
├── docker-compose.dev.yaml
└── Makefile
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Services, Portfolio, About, Testimonials, Contact |
| `/ai-agents` | AI Agents service page with live chat demo |
| `/team` | Meet The Team — founder profiles and credentials |
| `/website-grader` | Free Website Grader (Google PageSpeed Insights) |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard — leads & audit request overview |
| `/admin/leads` | Lead management |
| `/admin/audit-requests` | Audit request management |
| `/admin/ai-agents` | AI agent inquiry management |
| `/admin/testimonials` | Approve / unpublish client reviews |

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/audit-requests` | Submit a website audit request |
| `POST` | `/api/contact` | Submit a contact form |
| `POST` | `/api/ai-agent-inquiries` | Submit an AI agent inquiry |
| `POST` | `/api/chat` | Live AI demo (requires `ANTHROPIC_API_KEY`) |
| `GET` | `/api/testimonials` | Fetch approved client testimonials |
| `POST` | `/api/testimonials` | Submit a testimonial (pending approval) |

### Admin (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login → JWT token |
| `GET` | `/api/admin/leads` | List all leads |
| `GET/PUT/DELETE` | `/api/admin/leads/:id` | Manage a lead |
| `GET` | `/api/admin/audit-requests` | List audit requests |
| `PUT` | `/api/admin/audit-requests/:id` | Update audit request status |
| `GET` | `/api/admin/ai-agent-inquiries` | List AI agent inquiries |
| `PUT` | `/api/admin/ai-agent-inquiries/:id` | Update inquiry status |
| `GET` | `/api/admin/testimonials` | List all testimonials (incl. unapproved) |
| `PUT` | `/api/admin/testimonials/:id` | Approve / unpublish a testimonial |

---

## Features

### Public Website
- **Homepage** — conversion-focused landing page with all service sections
- **AI Agents page** — full service vertical for AI automation with pricing, use cases, and live chat demo
- **Meet The Team** — founder profiles with bios, skills, and credentials
- **Free Website Grader** — instant performance audit using Google PageSpeed Insights; captures leads when scores are low
- **Testimonials** — client reviews section; visitors can submit, admins approve before publishing
- **Live AI Chat Demo** — embedded Claude-powered assistant on the AI Agents page

### Admin Panel (`/admin`)
- Dashboard with stats (leads, audit requests, high-priority score)
- Full CRUD for leads, audit requests, AI agent inquiries
- Testimonial approval queue
- JWT authentication (24-hour tokens)

---

## Development Setup

### Prerequisites
- Go 1.22+
- Node.js 20+
- Docker Desktop (for MySQL)

### Quick Start

```bash
# Install dependencies
make install

# Start the database (Docker required)
make dev-db

# Start both frontend and backend
make dev
```

Frontend runs at `http://localhost:5173`
Backend runs at `http://localhost:8080`

### Environment Variables

**Backend** — create `backend/.env` or set in shell:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=echolsfrench
DB_PASSWORD=devpassword
DB_NAME=echolsfrench
JWT_SECRET=your-secret-key
ANTHROPIC_API_KEY=your-anthropic-key   # Required for /api/chat (AI demo)
PORT=8080
```

### Database Migrations

Migrations in `backend/db/migrations/` run automatically via Docker's `entrypoint-initdb.d`:
- `001_init.sql` — users, leads, audit_requests, contacts
- `002_ai_agent_inquiries.sql` — AI agent inquiries
- `003_testimonials.sql` — client testimonials

### Default Admin Credentials
```
Email:    admin@echolsfrench.com
Password: admin123
```
**Change in production.**

---

## Team

| Name | Role |
|---|---|
| Aiden Echols | Co-Founder — Technical Architecture & AI Strategy |
| Harrison French | Co-Founder |
| Charles (Chase) Williamson | Co-Founder |
