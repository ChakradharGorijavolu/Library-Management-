package main

import (
	"backend/config"
	"backend/models"
	routes "backend/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Create a Gin router
	r := gin.Default()

	// Connect to PostgreSQL
	config.ConnectDatabase()

	// Auto-create the "users" table
	config.DB.AutoMigrate(&models.User{})

	// Add CORS middleware (important for frontend)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Load your auth routes
	routes.AuthRoutes(r)
	r.SetTrustedProxies(nil)

	// Start backend
	r.Run(":8080")
}
