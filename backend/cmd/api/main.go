package main

import (
	"log"
	"os"

	"github.com/echolsfrench/backend/internal/database"
	"github.com/echolsfrench/backend/internal/handlers"
	"github.com/echolsfrench/backend/internal/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Create Gin router
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Initialize handlers
	h := handlers.NewHandler(db)

	// Public routes
	api := r.Group("/api")
	{
		// Health check
		api.GET("/health", h.HealthCheck)

		// Lead/Audit request submission (public)
		api.POST("/audit-requests", h.CreateAuditRequest)

		// Contact form
		api.POST("/contact", h.CreateContact)

		// AI agent inquiry form
		api.POST("/ai-agent-inquiries", h.CreateAIAgentInquiry)
	}

	// Protected admin routes
	admin := r.Group("/api/admin")
	admin.Use(middleware.AuthMiddleware())
	{
		// Authentication
		r.POST("/api/auth/login", h.Login)

		// Leads management
		admin.GET("/leads", h.GetLeads)
		admin.GET("/leads/:id", h.GetLead)
		admin.PUT("/leads/:id", h.UpdateLead)
		admin.DELETE("/leads/:id", h.DeleteLead)

		// Audit requests management
		admin.GET("/audit-requests", h.GetAuditRequests)
		admin.PUT("/audit-requests/:id", h.UpdateAuditRequest)

		// AI agent inquiries management
		admin.GET("/ai-agent-inquiries", h.GetAIAgentInquiries)
		admin.PUT("/ai-agent-inquiries/:id", h.UpdateAIAgentInquiry)
	}

	// Get port from environment or default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
