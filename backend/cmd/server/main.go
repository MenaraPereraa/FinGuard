package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"finguard/internal/database"
	"finguard/internal/handlers"

	"github.com/joho/godotenv"
)

// enableCORS allows requests from the Next.js frontend
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system env variables")
	}

	ctx := context.Background()

	// Connect to PostgreSQL database
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = os.Getenv("DB_URL")
	}

	if err := database.Connect(ctx, dbURL); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}

	// Setup API routes
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/signup", handlers.HandleSignup)
	mux.HandleFunc("POST /api/login", handlers.HandleLogin)

	// Wrap router with CORS middleware
	handlerWithCORS := enableCORS(mux)

	// Start HTTP server
	log.Println("FinGuard backend server listening on :8080...")
	if err := http.ListenAndServe(":8080", handlerWithCORS); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}