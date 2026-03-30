# Contributing to Echols & French

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Go 1.22+](https://go.dev/dl/)
- [Node.js 20+](https://nodejs.org/)

## First-Time Setup

```bash
git clone https://github.com/<your-org>/French_Echols.git
cd French_Echols
make setup
```

`make setup` will:
- Copy `.env.example` → `.env`
- Install frontend and backend dependencies
- Start the local MySQL database via Docker
- Install pre-commit hooks (Husky)

Then start the dev servers:

```bash
make dev
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:8080  |
| API docs | http://localhost:8080/api/health |

## Environment Variables

Copy the example files if `make setup` didn't do it:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

See `.env.example` for all required variables. Never commit `.env` files.

## Branch Naming

```
feat/short-description
fix/short-description
chore/short-description
```

## Workflow

1. Branch off `main`: `git checkout -b feat/my-feature`
2. Make your changes
3. Commit — the pre-commit hook will run lint + format automatically
4. Open a PR against `main`
5. CI must pass before merging

## Pre-commit Hooks

On every `git commit`, the hook runs:
- **Frontend:** Prettier (format) + ESLint (lint) on staged files
- **Backend:** `go vet` + `go build`

If the hook fails, fix the errors and re-commit.

## Common Commands

```bash
make dev          # Start frontend + backend + database
make dev-db       # Start only the database
make build        # Build Docker images
make sqlc         # Regenerate database query code
make clean        # Remove build artifacts and containers
```

## Code Style

- **Frontend:** Prettier + ESLint (auto-applied on commit)
- **Backend:** `gofmt` + golangci-lint (checked in CI)
- Run `npm run format` in `frontend/` to format manually
