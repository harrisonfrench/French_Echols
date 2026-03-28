-- name: GetUserByEmail :one
SELECT id, email, password_hash, name, created_at
FROM users
WHERE email = ?;

-- name: CreateUser :execresult
INSERT INTO users (email, password_hash, name)
VALUES (?, ?, ?);

-- name: GetLeads :many
SELECT id, business_name, website, email, phone, location, category,
       quality_score, status, notes, created_at, updated_at
FROM leads
ORDER BY quality_score DESC, created_at DESC
LIMIT ? OFFSET ?;

-- name: GetLeadsByStatus :many
SELECT id, business_name, website, email, phone, location, category,
       quality_score, status, notes, created_at, updated_at
FROM leads
WHERE status = ?
ORDER BY quality_score DESC, created_at DESC
LIMIT ? OFFSET ?;

-- name: GetLeadByID :one
SELECT id, business_name, website, email, phone, location, category,
       quality_score, status, notes, created_at, updated_at
FROM leads
WHERE id = ?;

-- name: CreateLead :execresult
INSERT INTO leads (business_name, website, email, phone, location, category, quality_score, status, notes)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: UpdateLeadStatus :exec
UPDATE leads
SET status = ?, notes = ?, updated_at = NOW()
WHERE id = ?;

-- name: DeleteLead :exec
DELETE FROM leads WHERE id = ?;

-- name: GetAuditRequests :many
SELECT id, business_name, website, email, status, notes, created_at, updated_at
FROM audit_requests
ORDER BY created_at DESC
LIMIT ? OFFSET ?;

-- name: GetAuditRequestByID :one
SELECT id, business_name, website, email, status, notes, created_at, updated_at
FROM audit_requests
WHERE id = ?;

-- name: CreateAuditRequest :execresult
INSERT INTO audit_requests (business_name, website, email, status)
VALUES (?, ?, ?, 'pending');

-- name: UpdateAuditRequestStatus :exec
UPDATE audit_requests
SET status = ?, notes = ?, updated_at = NOW()
WHERE id = ?;

-- name: CreateContact :execresult
INSERT INTO contacts (name, email, message)
VALUES (?, ?, ?);

-- name: GetContacts :many
SELECT id, name, email, message, created_at
FROM contacts
ORDER BY created_at DESC
LIMIT ? OFFSET ?;
