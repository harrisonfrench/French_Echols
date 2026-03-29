package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Message string        `json:"message"`
	History []chatMessage `json:"history"`
}

type anthropicRequest struct {
	Model     string        `json:"model"`
	MaxTokens int           `json:"max_tokens"`
	System    string        `json:"system"`
	Messages  []chatMessage `json:"messages"`
}

type anthropicResponse struct {
	Content []struct {
		Type string `json:"type"`
		Text string `json:"text"`
	} `json:"content"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

const agentSystemPrompt = `You are a helpful AI assistant for Echols & French, a web design and AI automation agency based in Milledgeville, Georgia.

Your job is to help visitors understand:
- How AI agents can automate repetitive business tasks (scheduling, follow-ups, lead qualification, customer service)
- How modern websites drive real business results
- What working with Echols & French looks like (discovery call → build → launch → support)
- Pricing is custom based on scope, but starts around $1,500 for websites and $2,000+ for AI agents

Be friendly, direct, and concise — 2-4 sentences per response unless more detail is asked. Always be honest. If something is outside your knowledge, say so and suggest they reach out directly at hello@echolsfrench.com.`

// Chat handles the live AI demo endpoint
func (h *Handler) Chat(c *gin.Context) {
	apiKey := os.Getenv("ANTHROPIC_API_KEY")
	if apiKey == "" {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "AI service not configured — set ANTHROPIC_API_KEY"})
		return
	}

	var req chatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "message is required"})
		return
	}

	// Cap history to last 10 messages to keep context manageable
	history := req.History
	if len(history) > 10 {
		history = history[len(history)-10:]
	}

	messages := make([]chatMessage, 0, len(history)+1)
	messages = append(messages, history...)
	messages = append(messages, chatMessage{Role: "user", Content: req.Message})

	body, err := json.Marshal(anthropicRequest{
		Model:     "claude-haiku-4-5-20251001",
		MaxTokens: 512,
		System:    agentSystemPrompt,
		Messages:  messages,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to build request"})
		return
	}

	httpReq, err := http.NewRequest("POST", "https://api.anthropic.com/v1/messages", bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("x-api-key", apiKey)
	httpReq.Header.Set("anthropic-version", "2023-06-01")

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Failed to reach AI service"})
		return
	}
	defer resp.Body.Close()

	var anthropicResp anthropicResponse
	if err := json.NewDecoder(resp.Body).Decode(&anthropicResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse AI response"})
		return
	}

	if anthropicResp.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": anthropicResp.Error.Message})
		return
	}

	if len(anthropicResp.Content) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Empty response from AI"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"response": anthropicResp.Content[0].Text})
}
