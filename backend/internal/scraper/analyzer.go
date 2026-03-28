package scraper

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"
	"time"
)

// WebsiteAnalysis contains the quality analysis of a website
type WebsiteAnalysis struct {
	URL              string  `json:"url"`
	IsAccessible     bool    `json:"is_accessible"`
	LoadTimeMs       int64   `json:"load_time_ms"`
	HasHTTPS         bool    `json:"has_https"`
	HasViewport      bool    `json:"has_viewport"`      // Mobile responsive indicator
	HasModernStack   bool    `json:"has_modern_stack"`  // React, Vue, Next.js, etc.
	ContentLength    int     `json:"content_length"`
	HasSocialLinks   bool    `json:"has_social_links"`
	HasContactInfo   bool    `json:"has_contact_info"`
	QualityScore     int     `json:"quality_score"`     // 1-10, higher = worse website = better lead
	QualityNotes     []string `json:"quality_notes"`
}

// WebsiteAnalyzer analyzes websites for quality signals
type WebsiteAnalyzer struct {
	httpClient *http.Client
}

// NewWebsiteAnalyzer creates a new website analyzer
func NewWebsiteAnalyzer() *WebsiteAnalyzer {
	return &WebsiteAnalyzer{
		httpClient: &http.Client{
			Timeout: 15 * time.Second,
			CheckRedirect: func(req *http.Request, via []*http.Request) error {
				if len(via) >= 3 {
					return fmt.Errorf("too many redirects")
				}
				return nil
			},
		},
	}
}

// Analyze performs a quality analysis on a website
func (a *WebsiteAnalyzer) Analyze(websiteURL string) *WebsiteAnalysis {
	analysis := &WebsiteAnalysis{
		URL:          websiteURL,
		QualityNotes: []string{},
	}

	// Handle missing or empty URL
	if websiteURL == "" {
		analysis.QualityScore = 10 // No website = highest priority lead
		analysis.QualityNotes = append(analysis.QualityNotes, "No website found")
		return analysis
	}

	// Ensure URL has scheme
	if !strings.HasPrefix(websiteURL, "http://") && !strings.HasPrefix(websiteURL, "https://") {
		websiteURL = "https://" + websiteURL
	}

	// Check HTTPS
	analysis.HasHTTPS = strings.HasPrefix(websiteURL, "https://")
	if !analysis.HasHTTPS {
		analysis.QualityNotes = append(analysis.QualityNotes, "No HTTPS")
	}

	// Fetch the website and measure load time
	startTime := time.Now()
	resp, err := a.httpClient.Get(websiteURL)
	if err != nil {
		analysis.IsAccessible = false
		analysis.QualityScore = 9
		analysis.QualityNotes = append(analysis.QualityNotes, "Website not accessible")
		return analysis
	}
	defer resp.Body.Close()

	analysis.LoadTimeMs = time.Since(startTime).Milliseconds()
	analysis.IsAccessible = true

	// Read body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		analysis.QualityScore = 8
		analysis.QualityNotes = append(analysis.QualityNotes, "Could not read website content")
		return analysis
	}

	html := string(body)
	analysis.ContentLength = len(body)

	// Check for viewport meta tag (mobile responsiveness)
	viewportRegex := regexp.MustCompile(`<meta[^>]*name=["']viewport["'][^>]*>`)
	analysis.HasViewport = viewportRegex.MatchString(html)
	if !analysis.HasViewport {
		analysis.QualityNotes = append(analysis.QualityNotes, "Not mobile responsive")
	}

	// Check for modern frameworks
	modernIndicators := []string{
		"react", "vue", "angular", "next", "nuxt", "gatsby",
		"tailwind", "bootstrap", "__NEXT_DATA__", "__NUXT__",
	}
	htmlLower := strings.ToLower(html)
	for _, indicator := range modernIndicators {
		if strings.Contains(htmlLower, indicator) {
			analysis.HasModernStack = true
			break
		}
	}
	if !analysis.HasModernStack {
		analysis.QualityNotes = append(analysis.QualityNotes, "Outdated technology stack")
	}

	// Check for social links
	socialPatterns := []string{
		"facebook.com", "twitter.com", "instagram.com",
		"linkedin.com", "youtube.com", "tiktok.com",
	}
	for _, pattern := range socialPatterns {
		if strings.Contains(htmlLower, pattern) {
			analysis.HasSocialLinks = true
			break
		}
	}

	// Check for contact information
	contactPatterns := []string{
		"mailto:", "tel:", "@gmail", "@yahoo", "@outlook",
		"contact", "phone", "email",
	}
	for _, pattern := range contactPatterns {
		if strings.Contains(htmlLower, pattern) {
			analysis.HasContactInfo = true
			break
		}
	}

	// Calculate quality score (1 = great site, 10 = terrible site = best lead)
	analysis.QualityScore = a.calculateScore(analysis)

	return analysis
}

// calculateScore returns a score from 1-10 where higher = worse website = better lead
func (a *WebsiteAnalyzer) calculateScore(analysis *WebsiteAnalysis) int {
	score := 5 // Start neutral

	// Positive signals (good website = lower score)
	if analysis.HasHTTPS {
		score--
	}
	if analysis.HasViewport {
		score--
	}
	if analysis.HasModernStack {
		score -= 2
	}
	if analysis.LoadTimeMs < 2000 {
		score--
	}
	if analysis.HasSocialLinks {
		score--
	}

	// Negative signals (bad website = higher score = better lead)
	if !analysis.HasHTTPS {
		score++
	}
	if !analysis.HasViewport {
		score += 2
	}
	if !analysis.HasModernStack {
		score++
	}
	if analysis.LoadTimeMs > 5000 {
		score += 2
	}
	if analysis.ContentLength < 10000 {
		score++ // Very basic site
	}

	// Clamp to 1-10
	if score < 1 {
		score = 1
	}
	if score > 10 {
		score = 10
	}

	return score
}

// AnalyzeBusiness analyzes a business's website and returns an enhanced business with quality score
func (a *WebsiteAnalyzer) AnalyzeBusiness(b Business) (Business, *WebsiteAnalysis) {
	analysis := a.Analyze(b.Website)
	return b, analysis
}
