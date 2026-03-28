CREATE TABLE IF NOT EXISTS ai_agent_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    challenge TEXT NOT NULL,
    contact_method ENUM('email', 'phone', 'either') NOT NULL DEFAULT 'email',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ai_inquiries_status (status),
    INDEX idx_ai_inquiries_email (email),
    INDEX idx_ai_inquiries_business_type (business_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
