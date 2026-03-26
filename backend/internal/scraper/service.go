package scraper

import (
	"database/sql"
	"fmt"
	"log"
	"sync"
	"time"
)

// Service handles lead scraping operations
type Service struct {
	db       *sql.DB
	places   *PlacesClient
	analyzer *WebsiteAnalyzer
}

// ScrapedLead represents a lead ready to be stored
type ScrapedLead struct {
	Business
	WebsiteAnalysis *WebsiteAnalysis
}

// ScrapeConfig contains configuration for a scrape job
type ScrapeConfig struct {
	Location   string   // e.g., "Milledgeville, GA"
	Categories []string // e.g., ["restaurant", "gym", "barbershop"]
	Radius     int      // Search radius in meters
	MaxWorkers int      // Concurrent analysis workers
}

// NewService creates a new scraper service
func NewService(db *sql.DB) *Service {
	return &Service{
		db:       db,
		places:   NewPlacesClient(),
		analyzer: NewWebsiteAnalyzer(),
	}
}

// Scrape performs a full scrape operation for the given config
func (s *Service) Scrape(config ScrapeConfig) ([]ScrapedLead, error) {
	log.Printf("Starting scrape for %s with categories: %v", config.Location, config.Categories)

	var allLeads []ScrapedLead
	var mu sync.Mutex

	// Set default workers
	if config.MaxWorkers == 0 {
		config.MaxWorkers = 5
	}

	for _, category := range config.Categories {
		log.Printf("Searching for %s in %s...", category, config.Location)

		businesses, err := s.places.SearchBusinesses(config.Location, category, config.Radius)
		if err != nil {
			log.Printf("Error searching %s: %v", category, err)
			continue
		}

		log.Printf("Found %d businesses for %s", len(businesses), category)

		// Analyze websites concurrently
		sem := make(chan struct{}, config.MaxWorkers)
		var wg sync.WaitGroup

		for _, business := range businesses {
			wg.Add(1)
			sem <- struct{}{} // Acquire semaphore

			go func(b Business) {
				defer wg.Done()
				defer func() { <-sem }() // Release semaphore

				_, analysis := s.analyzer.AnalyzeBusiness(b)

				lead := ScrapedLead{
					Business:        b,
					WebsiteAnalysis: analysis,
				}

				mu.Lock()
				allLeads = append(allLeads, lead)
				mu.Unlock()

				log.Printf("Analyzed: %s (Score: %d)", b.Name, analysis.QualityScore)
			}(business)
		}

		wg.Wait()

		// Rate limit between categories
		time.Sleep(500 * time.Millisecond)
	}

	log.Printf("Scrape complete. Found %d total leads", len(allLeads))
	return allLeads, nil
}

// SaveLeads stores scraped leads in the database
func (s *Service) SaveLeads(leads []ScrapedLead) (int, error) {
	saved := 0

	for _, lead := range leads {
		// Check if lead already exists (by name and location)
		var exists bool
		err := s.db.QueryRow(`
			SELECT EXISTS(SELECT 1 FROM leads WHERE business_name = ? AND location = ?)
		`, lead.Name, lead.Location).Scan(&exists)

		if err != nil {
			log.Printf("Error checking existing lead: %v", err)
			continue
		}

		if exists {
			log.Printf("Skipping duplicate: %s", lead.Name)
			continue
		}

		// Determine quality score
		qualityScore := 5
		if lead.WebsiteAnalysis != nil {
			qualityScore = lead.WebsiteAnalysis.QualityScore
		}

		// Build notes from analysis
		notes := ""
		if lead.WebsiteAnalysis != nil && len(lead.WebsiteAnalysis.QualityNotes) > 0 {
			notes = fmt.Sprintf("Issues: %v", lead.WebsiteAnalysis.QualityNotes)
		}

		// Insert lead
		_, err = s.db.Exec(`
			INSERT INTO leads (business_name, website, email, phone, location, category, quality_score, status, notes, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, 'not_contacted', ?, NOW(), NOW())
		`, lead.Name, lead.Website, "", lead.Phone, lead.Location, lead.Category, qualityScore, notes)

		if err != nil {
			log.Printf("Error saving lead %s: %v", lead.Name, err)
			continue
		}

		saved++
	}

	return saved, nil
}

// ScrapeAndSave performs a scrape and saves results to database
func (s *Service) ScrapeAndSave(config ScrapeConfig) (int, error) {
	leads, err := s.Scrape(config)
	if err != nil {
		return 0, err
	}

	return s.SaveLeads(leads)
}

// DefaultCategories returns the default business categories to scrape
func DefaultCategories() []string {
	return []string{
		"restaurant",
		"gym",
		"barbershop",
		"hair salon",
		"real estate agent",
		"plumber",
		"hvac",
		"dentist",
		"lawyer",
		"accountant",
	}
}
