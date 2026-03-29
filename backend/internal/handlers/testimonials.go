package handlers

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type testimonial struct {
	ID           int64     `json:"id"`
	CompanyName  string    `json:"company_name"`
	ReviewerName string    `json:"reviewer_name"`
	ReviewerRole string    `json:"reviewer_role"`
	Rating       int       `json:"rating"`
	Message      string    `json:"message"`
	Approved     bool      `json:"approved,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
}

type testimonialInput struct {
	CompanyName  string `json:"company_name" binding:"required"`
	ReviewerName string `json:"reviewer_name" binding:"required"`
	ReviewerRole string `json:"reviewer_role"`
	Rating       int    `json:"rating" binding:"required,min=1,max=5"`
	Message      string `json:"message" binding:"required"`
}

// GetTestimonials returns approved testimonials (public)
func (h *Handler) GetTestimonials(c *gin.Context) {
	rows, err := h.db.Query(`
		SELECT id, company_name, reviewer_name, reviewer_role, rating, message, created_at
		FROM testimonials
		WHERE approved = TRUE
		ORDER BY created_at DESC
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch testimonials"})
		return
	}
	defer rows.Close()

	testimonials := make([]testimonial, 0)
	for rows.Next() {
		var t testimonial
		if err := rows.Scan(&t.ID, &t.CompanyName, &t.ReviewerName, &t.ReviewerRole, &t.Rating, &t.Message, &t.CreatedAt); err != nil {
			continue
		}
		testimonials = append(testimonials, t)
	}

	c.JSON(http.StatusOK, gin.H{"data": testimonials})
}

// CreateTestimonial handles public review submissions
func (h *Handler) CreateTestimonial(c *gin.Context) {
	var input testimonialInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := h.db.Exec(`
		INSERT INTO testimonials (company_name, reviewer_name, reviewer_role, rating, message, approved)
		VALUES (?, ?, ?, ?, ?, FALSE)
	`, input.CompanyName, input.ReviewerName, input.ReviewerRole, input.Rating, input.Message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit review"})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{
		"message": "Review submitted — it will appear after approval",
		"data": gin.H{"id": id},
	})
}

// AdminGetTestimonials returns all testimonials including unapproved (admin)
func (h *Handler) AdminGetTestimonials(c *gin.Context) {
	rows, err := h.db.Query(`
		SELECT id, company_name, reviewer_name, reviewer_role, rating, message, approved, created_at
		FROM testimonials
		ORDER BY approved ASC, created_at DESC
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch testimonials"})
		return
	}
	defer rows.Close()

	testimonials := make([]testimonial, 0)
	for rows.Next() {
		var t testimonial
		if err := rows.Scan(&t.ID, &t.CompanyName, &t.ReviewerName, &t.ReviewerRole, &t.Rating, &t.Message, &t.Approved, &t.CreatedAt); err != nil {
			continue
		}
		testimonials = append(testimonials, t)
	}

	c.JSON(http.StatusOK, gin.H{"data": testimonials})
}

// AdminUpdateTestimonial approves or rejects a testimonial (admin)
func (h *Handler) AdminUpdateTestimonial(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var input struct {
		Approved *bool  `json:"approved"`
		Message  string `json:"message"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Approved != nil {
		_, err = h.db.Exec(`UPDATE testimonials SET approved = ? WHERE id = ?`, *input.Approved, id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update testimonial"})
			return
		}
	}

	var t testimonial
	err = h.db.QueryRow(`
		SELECT id, company_name, reviewer_name, reviewer_role, rating, message, approved, created_at
		FROM testimonials WHERE id = ?
	`, id).Scan(&t.ID, &t.CompanyName, &t.ReviewerName, &t.ReviewerRole, &t.Rating, &t.Message, &t.Approved, &t.CreatedAt)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Testimonial not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch updated testimonial"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated", "data": t})
}
