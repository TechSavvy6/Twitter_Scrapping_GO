package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	// Database connection
	var err error
	db, err = sql.Open("postgres", "user=your_username dbname=your_database password=your_password sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Periodically fetch data from Twitter and save to DB
	go func() {
		for {
			// Fetch data from Twitter
			// Save data to PostgreSQL
			time.Sleep(time.Hour)
		}
	}()

	// Save images to local storage

	// Send email when post has video

	// GET API for saved posts with pagination
	http.HandleFunc("/posts", func(w http.ResponseWriter, r *http.Request) {
		// Implement pagination logic
		// Query database for saved posts
		rows, err := db.Query("SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 0")
		if err != nil {
			log.Println(err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Return posts as JSON response
		// Implement JSON response
	})

	// Start server
	http.ListenAndServe(":8080", nil)
}