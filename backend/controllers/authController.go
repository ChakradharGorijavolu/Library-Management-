package controllers

import (
	"backend/config"
	"backend/models"
	"fmt"
	"math/rand"
	"net/http"
	"net/smtp"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)


// -------------------------------------------------------
// REGISTER USER
// -------------------------------------------------------
func Register(c *gin.Context) {
	var user models.User
	var existingUser models.User

	// Parse JSON
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input format"})
		return
	}

	// Check email/mobile exists
	if err := config.DB.Where("email = ? OR mobile_no = ?", user.Email, user.MobileNo).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email or Mobile number already registered"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	user.Password = string(hashedPassword)

	// Save
	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database insert failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully!"})
}



// -------------------------------------------------------
// LOGIN
// -------------------------------------------------------
func Login(c *gin.Context) {
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var user models.User

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	// Check email exists
	if err := config.DB.Where("email = ?", request.Email).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password"})
		return
	}

	// Validate password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Login successful!",
		"user": gin.H{
			"id":        user.ID,
			"name":      user.Name,
			"email":     user.Email,
			"mobile_no": user.MobileNo,
		},
	})
}



// -------------------------------------------------------
// FORGOT PASSWORD (SENDS OTP EMAIL)
// -------------------------------------------------------
func ForgotPassword(c *gin.Context) {
	var request struct {
		Email string `json:"email"`
	}
	var user models.User

	// Parse request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Check if user exists
	if err := config.DB.Where("email = ?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Generate OTP
	otp := fmt.Sprintf("%06d", rand.Intn(1000000))

	// Save OTP (if you create otp fields in the model)
	config.DB.Save(&user)

	// Email details
	from := "gorijavoluchakradhar@gmail.com"
	password := "your_app_password"
	to := []string{user.Email}
	subject := "Password Reset OTP"
	body := fmt.Sprintf("Your OTP is %s. It will expire in 5 minutes.", otp)

	message := []byte(fmt.Sprintf("Subject: %s\r\n\r\n%s", subject, body))

	auth := smtp.PlainAuth("", from, password, "smtp.gmail.com")

	if err := smtp.SendMail("smtp.gmail.com:587", auth, from, to, message); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send OTP"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP sent to email successfully!"})
}



// -------------------------------------------------------
// UPDATE USER (EDIT PROFILE)
// -------------------------------------------------------
func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var request struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		MobileNo string `json:"mobile_no"`
		Password string `json:"password"` // optional
	}

	var user models.User

	// Parse input
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	// Check if user exists
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update fields
	if request.Name != "" {
		user.Name = request.Name
	}
	if request.Email != "" {
		user.Email = request.Email
	}
	if request.MobileNo != "" {
		user.MobileNo = request.MobileNo
	}

	// Update password only if provided
	if request.Password != "" {
		hashed, _ := bcrypt.GenerateFromPassword([]byte(request.Password), 14)
		user.Password = string(hashed)
	}

	config.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"user":    user,
	})
}



// -------------------------------------------------------
// DELETE USER ACCOUNT
// -------------------------------------------------------
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User

	// Find user
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Delete user
	config.DB.Delete(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "Account deleted successfully",
	})
}
