.PHONY: dev dev-frontend dev-backend build up down logs clean

# Development
dev: dev-db
	@echo "Starting development servers..."
	@make -j2 dev-frontend dev-backend

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && set -a && . ../.env && set +a && go run ./cmd/api

dev-db:
	docker-compose -f docker-compose.dev.yaml up -d

# Docker commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Database
migrate:
	cd backend && go run ./cmd/migrate

# Clean
clean:
	docker-compose down -v
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	rm -f backend/main

# Install dependencies
install:
	cd frontend && npm install
	cd backend && go mod download

# Build frontend
build-frontend:
	cd frontend && npm run build

# Build backend
build-backend:
	cd backend && go build -o main ./cmd/api

# Generate sqlc
sqlc:
	cd backend && sqlc generate

# Help
help:
	@echo "Echols & French - Available Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev           - Start all development servers"
	@echo "  make dev-frontend  - Start frontend dev server"
	@echo "  make dev-backend   - Start backend dev server"
	@echo "  make dev-db        - Start development database"
	@echo ""
	@echo "Docker:"
	@echo "  make build         - Build all Docker images"
	@echo "  make up            - Start all containers"
	@echo "  make down          - Stop all containers"
	@echo "  make logs          - View container logs"
	@echo ""
	@echo "Other:"
	@echo "  make install       - Install all dependencies"
	@echo "  make clean         - Remove all build artifacts"
	@echo "  make sqlc          - Generate sqlc code"
