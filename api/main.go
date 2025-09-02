package main

import (
	"log"
	"os"

	"webshine-navigator-api/config"
	"webshine-navigator-api/routes"

	"github.com/joho/godotenv"
)

func main() {
	// 加载环境变量
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default values")
	}

	// 连接数据库
	config.ConnectDatabase()

	// 设置路由
	r := routes.SetupRoutes()

	// 获取端口号
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
