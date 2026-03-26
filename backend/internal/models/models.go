package models

import "time"

// Lead represents a scraped business lead
type Lead struct {
	ID           int64     `json:"id"`
	BusinessName string    `json:"business_name"`
	Website      string    `json:"website"`
	Email        string    `json:"email,omitempty"`
	Phone        string    `json:"phone,omitempty"`
	Location     string    `json:"location"`
	Category     string    `json:"category"`
	QualityScore int       `json:"quality_score"` // 1-10, higher = worse website = better lead
	Status       string    `json:"status"`        // not_contacted, contacted, responded, closed
	Notes        string    `json:"notes,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// AuditRequest represents a website audit request from the contact form
type AuditRequest struct {
	ID           int64     `json:"id"`
	BusinessName string    `json:"business_name" binding:"required"`
	Website      string    `json:"website" binding:"required,url"`
	Email        string    `json:"email" binding:"required,email"`
	Status       string    `json:"status"` // pending, reviewed, contacted, closed
	Notes        string    `json:"notes,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// Contact represents a general contact form submission
type Contact struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name" binding:"required"`
	Email     string    `json:"email" binding:"required,email"`
	Message   string    `json:"message" binding:"required"`
	CreatedAt time.Time `json:"created_at"`
}

// User represents an admin user
type User struct {
	ID           int64     `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"` // Never expose in JSON
	Name         string    `json:"name"`
	CreatedAt    time.Time `json:"created_at"`
}

// LoginRequest represents login credentials
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// LoginResponse represents the response after successful login
type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

// LeadFilter represents query parameters for filtering leads
type LeadFilter struct {
	Status   string `form:"status"`
	Location string `form:"location"`
	Category string `form:"category"`
	MinScore int    `form:"min_score"`
	MaxScore int    `form:"max_score"`
	Limit    int    `form:"limit"`
	Offset   int    `form:"offset"`
}
