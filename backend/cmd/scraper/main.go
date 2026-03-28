package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/echolsfrench/backend/internal/database"
	"github.com/echolsfrench/backend/internal/scraper"
)

func main() {
	// Parse command line flags
	location := flag.String("location", "Milledgeville, GA", "Location to search (city, state)")
	categories := flag.String("categories", "", "Comma-separated list of business categories (uses defaults if empty)")
	radius := flag.Int("radius", 5000, "Search radius in meters")
	workers := flag.Int("workers", 5, "Number of concurrent workers for website analysis")
	dryRun := flag.Bool("dry-run", false, "Print results without saving to database")

	flag.Parse()

	// Validate Google Places API key
	if os.Getenv("GOOGLE_PLACES_API_KEY") == "" {
		log.Fatal("GOOGLE_PLACES_API_KEY environment variable is required")
	}

	// Parse categories
	var categoryList []string
	if *categories != "" {
		categoryList = strings.Split(*categories, ",")
		for i, c := range categoryList {
			categoryList[i] = strings.TrimSpace(c)
		}
	} else {
		categoryList = scraper.DefaultCategories()
	}

	fmt.Println("=========================================")
	fmt.Println("   Echols & French Lead Scraper")
	fmt.Println("=========================================")
	fmt.Printf("Location:   %s\n", *location)
	fmt.Printf("Categories: %v\n", categoryList)
	fmt.Printf("Radius:     %d meters\n", *radius)
	fmt.Printf("Workers:    %d\n", *workers)
	fmt.Printf("Dry Run:    %v\n", *dryRun)
	fmt.Println("=========================================")

	// Connect to database (unless dry run)
	if !*dryRun {
		db, err := database.Connect()
		if err != nil {
			log.Fatalf("Failed to connect to database: %v", err)
		}
		defer db.Close()

		// Create scraper service
		service := scraper.NewService(db)

		// Run scraper
		config := scraper.ScrapeConfig{
			Location:   *location,
			Categories: categoryList,
			Radius:     *radius,
			MaxWorkers: *workers,
		}

		saved, err := service.ScrapeAndSave(config)
		if err != nil {
			log.Fatalf("Scrape failed: %v", err)
		}

		fmt.Println("=========================================")
		fmt.Printf("Scrape complete! Saved %d new leads.\n", saved)
		fmt.Println("=========================================")
	} else {
		// Dry run - just print results
		service := scraper.NewService(nil)

		config := scraper.ScrapeConfig{
			Location:   *location,
			Categories: categoryList,
			Radius:     *radius,
			MaxWorkers: *workers,
		}

		leads, err := service.Scrape(config)
		if err != nil {
			log.Fatalf("Scrape failed: %v", err)
		}

		fmt.Println("\n=========================================")
		fmt.Printf("Found %d leads (dry run - not saved)\n", len(leads))
		fmt.Println("=========================================")

		// Print top leads by quality score
		fmt.Println("\nTop Leads (worst websites = best prospects):")
		fmt.Println("-----------------------------------------")

		for i, lead := range leads {
			if i >= 20 {
				break
			}
			score := 0
			if lead.WebsiteAnalysis != nil {
				score = lead.WebsiteAnalysis.QualityScore
			}
			fmt.Printf("%2d. [Score: %d] %s\n", i+1, score, lead.Name)
			if lead.Website != "" {
				fmt.Printf("    Website: %s\n", lead.Website)
			} else {
				fmt.Printf("    Website: (none)\n")
			}
			if lead.Phone != "" {
				fmt.Printf("    Phone:   %s\n", lead.Phone)
			}
			if lead.WebsiteAnalysis != nil && len(lead.WebsiteAnalysis.QualityNotes) > 0 {
				fmt.Printf("    Issues:  %v\n", lead.WebsiteAnalysis.QualityNotes)
			}
			fmt.Println()
		}
	}
}
