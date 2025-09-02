package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Site 网站信息结构体
type Site struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	URL         string             `json:"url" bson:"url"`
	Category    string             `json:"category" bson:"category"`
	Tags        []string           `json:"tags" bson:"tags"`
	Rating      int                `json:"rating" bson:"rating"`
}

// CreateSiteRequest 创建网站请求结构体
type CreateSiteRequest struct {
	Name        string   `json:"name" binding:"required"`
	Description string   `json:"description" binding:"required"`
	URL         string   `json:"url" binding:"required"`
	Category    string   `json:"category" binding:"required"`
	Tags        []string `json:"tags"`
	Rating      int      `json:"rating" binding:"min=1,max=5"`
}

// UpdateSiteRequest 更新网站请求结构体
type UpdateSiteRequest struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	URL         string   `json:"url"`
	Category    string   `json:"category"`
	Tags        []string `json:"tags"`
	Rating      int      `json:"rating" binding:"min=1,max=5"`
}
