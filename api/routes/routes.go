package routes

import (
	"webshine-navigator-api/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRoutes 设置路由
func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// 配置CORS - 开发环境使用宽松配置
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// 创建控制器实例
	siteController := controllers.NewSiteController()

	// API路由组
	api := r.Group("/api/v1")
	{
		// 网站相关路由
		sites := api.Group("/sites")
		{
			sites.GET("", siteController.SearchSites)        // 获取所有网站或搜索网站
			sites.GET("/:id", siteController.GetSiteByID)    // 根据ID获取网站
			sites.POST("", siteController.CreateSite)        // 创建新网站
			sites.PUT("/:id", siteController.UpdateSite)     // 更新网站信息
			sites.DELETE("/:id", siteController.DeleteSite)  // 删除网站
		}
	}

	// 健康检查路由
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "API服务运行正常",
		})
	})

	return r
}
