package handlers

import (
	"database/sql"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/echolsfrench/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// Handler holds dependencies for HTTP handlers
type Handler struct {
	db *sql.DB
}

// NewHandler creates a new Handler instance
func NewHandler(db *sql.DB) *Handler {
	return &Handler{db: db}
}

// HealthCheck returns the API health status
func (h *Handler) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "healthy",
		"time":    time.Now().UTC(),
		"version": "1.0.0",
	})
}

// CreateAuditRequest handles new audit request submissions
func (h *Handler) CreateAuditRequest(c *gin.Context) {
	var req models.AuditRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.Status = "pending"
	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	result, err := h.db.Exec(`
		INSERT INTO audit_requests (business_name, website, email, status, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?)
	`, req.BusinessName, req.Website, req.Email, req.Status, req.CreatedAt, req.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create audit request"})
		return
	}

	id, _ := result.LastInsertId()
	req.ID = id

	c.JSON(http.StatusCreated, gin.H{
		"message": "Audit request submitted successfully",
		"data":    req,
	})
}

// CreateContact handles contact form submissions
func (h *Handler) CreateContact(c *gin.Context) {
	var contact models.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	contact.CreatedAt = time.Now()

	result, err := h.db.Exec(`
		INSERT INTO contacts (name, email, message, created_at)
		VALUES (?, ?, ?, ?)
	`, contact.Name, contact.Email, contact.Message, contact.CreatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit contact form"})
		return
	}

	id, _ := result.LastInsertId()
	contact.ID = id

	c.JSON(http.StatusCreated, gin.H{
		"message": "Contact form submitted successfully",
		"data":    contact,
	})
}

// Login handles admin authentication
func (h *Handler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	err := h.db.QueryRow(`
		SELECT id, email, password_hash, name, created_at
		FROM users WHERE email = ?
	`, req.Email).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Name, &user.CreatedAt)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "your-secret-key-change-in-production"
	}

	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, models.LoginResponse{
		Token: tokenString,
		User:  user,
	})
}

// GetLeads returns all leads with optional filtering
func (h *Handler) GetLeads(c *gin.Context) {
	var filter models.LeadFilter
	if err := c.ShouldBindQuery(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set defaults
	if filter.Limit == 0 {
		filter.Limit = 50
	}

	query := `SELECT id, business_name, website, email, phone, location, category,
		quality_score, status, notes, created_at, updated_at FROM leads WHERE 1=1`
	args := []interface{}{}

	if filter.Status != "" {
		query += " AND status = ?"
		args = append(args, filter.Status)
	}
	if filter.Location != "" {
		query += " AND location LIKE ?"
		args = append(args, "%"+filter.Location+"%")
	}
	if filter.Category != "" {
		query += " AND category = ?"
		args = append(args, filter.Category)
	}
	if filter.MinScore > 0 {
		query += " AND quality_score >= ?"
		args = append(args, filter.MinScore)
	}
	if filter.MaxScore > 0 {
		query += " AND quality_score <= ?"
		args = append(args, filter.MaxScore)
	}

	query += " ORDER BY quality_score DESC, created_at DESC LIMIT ? OFFSET ?"
	args = append(args, filter.Limit, filter.Offset)

	rows, err := h.db.Query(query, args...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch leads"})
		return
	}
	defer rows.Close()

	var leads []models.Lead
	for rows.Next() {
		var lead models.Lead
		err := rows.Scan(
			&lead.ID, &lead.BusinessName, &lead.Website, &lead.Email, &lead.Phone,
			&lead.Location, &lead.Category, &lead.QualityScore, &lead.Status,
			&lead.Notes, &lead.CreatedAt, &lead.UpdatedAt,
		)
		if err != nil {
			continue
		}
		leads = append(leads, lead)
	}

	c.JSON(http.StatusOK, gin.H{"data": leads})
}

// GetLead returns a single lead by ID
func (h *Handler) GetLead(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lead ID"})
		return
	}

	var lead models.Lead
	err = h.db.QueryRow(`
		SELECT id, business_name, website, email, phone, location, category,
			quality_score, status, notes, created_at, updated_at
		FROM leads WHERE id = ?
	`, id).Scan(
		&lead.ID, &lead.BusinessName, &lead.Website, &lead.Email, &lead.Phone,
		&lead.Location, &lead.Category, &lead.QualityScore, &lead.Status,
		&lead.Notes, &lead.CreatedAt, &lead.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Lead not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": lead})
}

// UpdateLead updates a lead's information
func (h *Handler) UpdateLead(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lead ID"})
		return
	}

	var lead models.Lead
	if err := c.ShouldBindJSON(&lead); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	lead.UpdatedAt = time.Now()

	_, err = h.db.Exec(`
		UPDATE leads SET status = ?, notes = ?, updated_at = ? WHERE id = ?
	`, lead.Status, lead.Notes, lead.UpdatedAt, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update lead"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Lead updated successfully"})
}

// DeleteLead removes a lead from the database
func (h *Handler) DeleteLead(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lead ID"})
		return
	}

	_, err = h.db.Exec("DELETE FROM leads WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete lead"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Lead deleted successfully"})
}

// GetAuditRequests returns all audit requests
func (h *Handler) GetAuditRequests(c *gin.Context) {
	rows, err := h.db.Query(`
		SELECT id, business_name, website, email, status, notes, created_at, updated_at
		FROM audit_requests ORDER BY created_at DESC
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch audit requests"})
		return
	}
	defer rows.Close()

	var requests []models.AuditRequest
	for rows.Next() {
		var req models.AuditRequest
		err := rows.Scan(
			&req.ID, &req.BusinessName, &req.Website, &req.Email,
			&req.Status, &req.Notes, &req.CreatedAt, &req.UpdatedAt,
		)
		if err != nil {
			continue
		}
		requests = append(requests, req)
	}

	c.JSON(http.StatusOK, gin.H{"data": requests})
}

// CreateAIAgentInquiry handles AI agent interest form submissions
func (h *Handler) CreateAIAgentInquiry(c *gin.Context) {
	var req models.AIAgentInquiry
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.Status = "new"
	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	result, err := h.db.Exec(`
		INSERT INTO ai_agent_inquiries (full_name, business_name, business_type, challenge, contact_method, email, phone, status, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, req.FullName, req.BusinessName, req.BusinessType, req.Challenge, req.ContactMethod, req.Email, req.Phone, req.Status, req.CreatedAt, req.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit inquiry"})
		return
	}

	id, _ := result.LastInsertId()
	req.ID = id

	c.JSON(http.StatusCreated, gin.H{
		"message": "Inquiry submitted successfully",
		"data":    req,
	})
}

// GetAIAgentInquiries returns all AI agent inquiries
func (h *Handler) GetAIAgentInquiries(c *gin.Context) {
	rows, err := h.db.Query(`
		SELECT id, full_name, business_name, business_type, challenge, contact_method,
			email, phone, status, notes, created_at, updated_at
		FROM ai_agent_inquiries ORDER BY created_at DESC
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch inquiries"})
		return
	}
	defer rows.Close()

	var inquiries []models.AIAgentInquiry
	for rows.Next() {
		var inq models.AIAgentInquiry
		err := rows.Scan(
			&inq.ID, &inq.FullName, &inq.BusinessName, &inq.BusinessType, &inq.Challenge,
			&inq.ContactMethod, &inq.Email, &inq.Phone, &inq.Status, &inq.Notes,
			&inq.CreatedAt, &inq.UpdatedAt,
		)
		if err != nil {
			continue
		}
		inquiries = append(inquiries, inq)
	}

	c.JSON(http.StatusOK, gin.H{"data": inquiries})
}

// UpdateAIAgentInquiry updates an AI agent inquiry's status
func (h *Handler) UpdateAIAgentInquiry(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid inquiry ID"})
		return
	}

	var req models.AIAgentInquiry
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.UpdatedAt = time.Now()

	_, err = h.db.Exec(`
		UPDATE ai_agent_inquiries SET status = ?, notes = ?, updated_at = ? WHERE id = ?
	`, req.Status, req.Notes, req.UpdatedAt, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update inquiry"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Inquiry updated successfully"})
}

// UpdateAuditRequest updates an audit request's status
func (h *Handler) UpdateAuditRequest(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	var req models.AuditRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.UpdatedAt = time.Now()

	_, err = h.db.Exec(`
		UPDATE audit_requests SET status = ?, notes = ?, updated_at = ? WHERE id = ?
	`, req.Status, req.Notes, req.UpdatedAt, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update audit request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Audit request updated successfully"})
}
