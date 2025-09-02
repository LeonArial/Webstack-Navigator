package controllers

import (
	"net/http"

	"webshine-navigator-api/models"
	"webshine-navigator-api/services"

	"github.com/gin-gonic/gin"
)

type SiteController struct {
	siteService *services.SiteService
}

// NewSiteController 创建新的网站控制器
func NewSiteController() *SiteController {
	return &SiteController{
		siteService: services.NewSiteService(),
	}
}

// GetAllSites 获取所有网站
func (sc *SiteController) GetAllSites(c *gin.Context) {
	sites, err := sc.siteService.GetAllSites()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sites)
}

// GetSiteByID 根据ID获取网站
func (sc *SiteController) GetSiteByID(c *gin.Context) {
	id := c.Param("id")
	
	site, err := sc.siteService.GetSiteByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "网站未找到"})
		return
	}

	c.JSON(http.StatusOK, site)
}

// CreateSite 创建新网站
func (sc *SiteController) CreateSite(c *gin.Context) {
	var req models.CreateSiteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	site, err := sc.siteService.CreateSite(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, site)
}

// UpdateSite 更新网站信息
func (sc *SiteController) UpdateSite(c *gin.Context) {
	id := c.Param("id")
	
	var req models.UpdateSiteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	site, err := sc.siteService.UpdateSite(id, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, site)
}

// DeleteSite 删除网站
func (sc *SiteController) DeleteSite(c *gin.Context) {
	id := c.Param("id")
	
	err := sc.siteService.DeleteSite(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "网站删除成功"})
}

// SearchSites 搜索网站
func (sc *SiteController) SearchSites(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		sc.GetAllSites(c)
		return
	}

	sites, err := sc.siteService.SearchSites(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, sites)
}
