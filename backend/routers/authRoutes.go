package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

// AuthRoutes defines API endpoints like /api/auth/register
func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/api/auth")
	{
		r.POST("/login", controllers.Login)
		auth.POST("/register", controllers.Register)
		auth.POST("/forgot-password", controllers.ForgotPassword)

		auth.PUT("/update/:id", controllers.UpdateUser)
		auth.DELETE("/delete/:id", controllers.DeleteUser)
	}
}
