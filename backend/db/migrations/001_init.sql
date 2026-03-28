-- Echols & French Database Schema
-- MySQL 8.0

-- Users table (admin users)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Leads table (scraped business leads)
CREATE TABLE IF NOT EXISTS leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quality_score INT DEFAULT 5 CHECK (quality_score >= 1 AND quality_score <= 10),
    status ENUM('not_contacted', 'contacted', 'responded', 'closed') DEFAULT 'not_contacted',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_leads_status (status),
    INDEX idx_leads_location (location),
    INDEX idx_leads_category (category),
    INDEX idx_leads_quality (quality_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit requests table (from website form)
CREATE TABLE IF NOT EXISTS audit_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    website VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status ENUM('pending', 'reviewed', 'contacted', 'closed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_audit_requests_status (status),
    INDEX idx_audit_requests_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts table (general contact form submissions)
CREATE TABLE IF NOT EXISTS contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contacts_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION)
-- Hash generated with bcrypt cost 10
INSERT INTO users (email, password_hash, name) VALUES
('admin@echolsfrench.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.aOG2rLqHqXr6a1h6zi', 'Admin User')
ON DUPLICATE KEY UPDATE email = email;
