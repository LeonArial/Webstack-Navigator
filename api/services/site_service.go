package services

import (
	"context"
	"os"
	"time"

	"webshine-navigator-api/config"
	"webshine-navigator-api/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type SiteService struct {
	collection *mongo.Collection
}

// NewSiteService 创建新的网站服务
func NewSiteService() *SiteService {
	collectionName := os.Getenv("COLLECTION_NAME")
	if collectionName == "" {
		collectionName = "sites"
	}
	
	return &SiteService{
		collection: config.GetCollection(collectionName),
	}
}

// GetAllSites 获取所有网站
func (s *SiteService) GetAllSites() ([]models.Site, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := s.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var sites []models.Site
	if err = cursor.All(ctx, &sites); err != nil {
		return nil, err
	}

	return sites, nil
}

// GetSiteByID 根据ID获取网站
func (s *SiteService) GetSiteByID(id string) (*models.Site, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var site models.Site
	err = s.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&site)
	if err != nil {
		return nil, err
	}

	return &site, nil
}

// CreateSite 创建新网站
func (s *SiteService) CreateSite(req *models.CreateSiteRequest) (*models.Site, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	site := &models.Site{
		Name:        req.Name,
		Description: req.Description,
		URL:         req.URL,
		Category:    req.Category,
		Tags:        req.Tags,
		Rating:      req.Rating,
	}

	result, err := s.collection.InsertOne(ctx, site)
	if err != nil {
		return nil, err
	}

	site.ID = result.InsertedID.(primitive.ObjectID)
	return site, nil
}

// UpdateSite 更新网站信息
func (s *SiteService) UpdateSite(id string, req *models.UpdateSiteRequest) (*models.Site, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	update := bson.M{}
	if req.Name != "" {
		update["name"] = req.Name
	}
	if req.Description != "" {
		update["description"] = req.Description
	}
	if req.URL != "" {
		update["url"] = req.URL
	}
	if req.Category != "" {
		update["category"] = req.Category
	}
	if req.Tags != nil {
		update["tags"] = req.Tags
	}
	if req.Rating > 0 {
		update["rating"] = req.Rating
	}

	_, err = s.collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": update})
	if err != nil {
		return nil, err
	}

	return s.GetSiteByID(id)
}

// DeleteSite 删除网站
func (s *SiteService) DeleteSite(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = s.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}

// SearchSites 搜索网站
func (s *SiteService) SearchSites(query string) ([]models.Site, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{
		"$or": []bson.M{
			{"name": bson.M{"$regex": query, "$options": "i"}},
			{"description": bson.M{"$regex": query, "$options": "i"}},
			{"tags": bson.M{"$in": []string{query}}},
		},
	}

	cursor, err := s.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var sites []models.Site
	if err = cursor.All(ctx, &sites); err != nil {
		return nil, err
	}

	return sites, nil
}
