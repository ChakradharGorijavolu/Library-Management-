package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	host := os.Getenv("DB_HOST")       // postgres
	user := os.Getenv("DB_USER")       // postgres
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port,
	)

	var database *gorm.DB
	var err error

	// Retry logic (important for Docker)
	for i := 1; i <= 10; i++ {
		database, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			DB = database
			fmt.Println("Database connected successfully!")
			return
		}

		fmt.Printf("Waiting for database... retry %d/10\n", i)
		time.Sleep(3 * time.Second)
	}

	log.Fatal("Failed to connect to database after retries:", err)
}
