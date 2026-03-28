package scraper

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
)

// PlacesClient handles Google Places API requests
type PlacesClient struct {
	apiKey     string
	httpClient *http.Client
}

// Business represents a scraped business
type Business struct {
	Name        string  `json:"name"`
	PlaceID     string  `json:"place_id"`
	Address     string  `json:"address"`
	Phone       string  `json:"phone"`
	Website     string  `json:"website"`
	Rating      float64 `json:"rating"`
	TotalRatings int    `json:"total_ratings"`
	Category    string  `json:"category"`
	Location    string  `json:"location"`
}

// PlacesSearchResponse represents the Google Places API response
type PlacesSearchResponse struct {
	Results []struct {
		Name             string `json:"name"`
		PlaceID          string `json:"place_id"`
		FormattedAddress string `json:"formatted_address"`
		Rating           float64 `json:"rating"`
		UserRatingsTotal int     `json:"user_ratings_total"`
		Types            []string `json:"types"`
	} `json:"results"`
	NextPageToken string `json:"next_page_token"`
	Status        string `json:"status"`
}

// PlaceDetailsResponse represents the place details API response
type PlaceDetailsResponse struct {
	Result struct {
		Name             string `json:"name"`
		FormattedAddress string `json:"formatted_address"`
		FormattedPhone   string `json:"formatted_phone_number"`
		Website          string `json:"website"`
		Rating           float64 `json:"rating"`
		UserRatingsTotal int     `json:"user_ratings_total"`
	} `json:"result"`
	Status string `json:"status"`
}

// NewPlacesClient creates a new Google Places API client
func NewPlacesClient() *PlacesClient {
	apiKey := os.Getenv("GOOGLE_PLACES_API_KEY")
	return &PlacesClient{
		apiKey:     apiKey,
		httpClient: &http.Client{},
	}
}

// SearchBusinesses searches for businesses in a location by category
func (c *PlacesClient) SearchBusinesses(location, category string, radius int) ([]Business, error) {
	if c.apiKey == "" {
		return nil, fmt.Errorf("GOOGLE_PLACES_API_KEY environment variable not set")
	}

	// Build the search URL
	baseURL := "https://maps.googleapis.com/maps/api/place/textsearch/json"
	query := fmt.Sprintf("%s in %s", category, location)

	params := url.Values{}
	params.Set("query", query)
	params.Set("key", c.apiKey)
	if radius > 0 {
		params.Set("radius", fmt.Sprintf("%d", radius))
	}

	fullURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())

	resp, err := c.httpClient.Get(fullURL)
	if err != nil {
		return nil, fmt.Errorf("failed to search places: %w", err)
	}
	defer resp.Body.Close()

	var searchResp PlacesSearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResp); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	if searchResp.Status != "OK" && searchResp.Status != "ZERO_RESULTS" {
		return nil, fmt.Errorf("places API error: %s", searchResp.Status)
	}

	// Convert to our Business struct and fetch details
	var businesses []Business
	for _, result := range searchResp.Results {
		business := Business{
			Name:         result.Name,
			PlaceID:      result.PlaceID,
			Address:      result.FormattedAddress,
			Rating:       result.Rating,
			TotalRatings: result.UserRatingsTotal,
			Category:     category,
			Location:     location,
		}

		// Get additional details (phone, website)
		details, err := c.GetPlaceDetails(result.PlaceID)
		if err == nil {
			business.Phone = details.Phone
			business.Website = details.Website
		}

		businesses = append(businesses, business)
	}

	return businesses, nil
}

// GetPlaceDetails fetches detailed information about a place
func (c *PlacesClient) GetPlaceDetails(placeID string) (*Business, error) {
	if c.apiKey == "" {
		return nil, fmt.Errorf("GOOGLE_PLACES_API_KEY environment variable not set")
	}

	baseURL := "https://maps.googleapis.com/maps/api/place/details/json"

	params := url.Values{}
	params.Set("place_id", placeID)
	params.Set("fields", "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total")
	params.Set("key", c.apiKey)

	fullURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())

	resp, err := c.httpClient.Get(fullURL)
	if err != nil {
		return nil, fmt.Errorf("failed to get place details: %w", err)
	}
	defer resp.Body.Close()

	var detailsResp PlaceDetailsResponse
	if err := json.NewDecoder(resp.Body).Decode(&detailsResp); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	if detailsResp.Status != "OK" {
		return nil, fmt.Errorf("places API error: %s", detailsResp.Status)
	}

	return &Business{
		Name:         detailsResp.Result.Name,
		Address:      detailsResp.Result.FormattedAddress,
		Phone:        detailsResp.Result.FormattedPhone,
		Website:      detailsResp.Result.Website,
		Rating:       detailsResp.Result.Rating,
		TotalRatings: detailsResp.Result.UserRatingsTotal,
	}, nil
}
