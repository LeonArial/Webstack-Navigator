package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"time"

	"webshine-navigator-api/config"
	"webshine-navigator-api/models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

// LegacySite 用于解析原有JSON格式的结构体
type LegacySite struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	URL         string   `json:"url"`
	Category    string   `json:"category"`
	Tags        []string `json:"tags"`
	Rating      int      `json:"rating"`
}

func main() {
	// 加载环境变量
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found, using default values")
	}

	// 连接数据库
	config.ConnectDatabase()

	// 获取集合名称
	collectionName := os.Getenv("COLLECTION_NAME")
	if collectionName == "" {
		collectionName = "sites"
	}

	collection := config.GetCollection(collectionName)

	// 检查集合是否已有数据
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	count, err := collection.CountDocuments(ctx, bson.M{})
	if err != nil {
		log.Fatal("Failed to count documents:", err)
	}

	if count > 0 {
		log.Printf("Collection '%s' already has %d documents. Skipping initialization.", collectionName, count)
		return
	}

	// 读取JSON文件
	jsonFile := "../../public/sites.json"
	if len(os.Args) > 1 {
		jsonFile = os.Args[1]
	}

	log.Printf("Reading data from: %s", jsonFile)
	
	data, err := ioutil.ReadFile(jsonFile)
	if err != nil {
		log.Fatal("Failed to read JSON file:", err)
	}

	// 解析JSON数据
	var legacySites []LegacySite
	if err := json.Unmarshal(data, &legacySites); err != nil {
		log.Fatal("Failed to parse JSON:", err)
	}

	// 转换为新的Site格式并插入数据库
	var sites []interface{}
	for _, legacy := range legacySites {
		site := models.Site{
			Name:        legacy.Name,
			Description: legacy.Description,
			URL:         legacy.URL,
			Category:    legacy.Category,
			Tags:        legacy.Tags,
			Rating:      legacy.Rating,
		}
		sites = append(sites, site)
	}

	// 批量插入数据
	if len(sites) > 0 {
		result, err := collection.InsertMany(ctx, sites)
		if err != nil {
			log.Fatal("Failed to insert documents:", err)
		}

		log.Printf("Successfully inserted %d documents into collection '%s'", len(result.InsertedIDs), collectionName)
		
		// 打印插入的文档ID
		for i, id := range result.InsertedIDs {
			log.Printf("Document %d: %v", i+1, id)
		}
	} else {
		log.Println("No data to insert")
	}

	log.Println("Database initialization completed!")
}
