package server

import (
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"

    "dws-api-gateway/internal/server/handlers"
)

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"db": s.db.Health(),
		"ml": s.ml.Health(),
	})
}

func (s *Server) RegisterRoutes() http.Handler {
    r := gin.Default()

    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3030", "http://localhost:3031"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))
	
    r.GET("/", s.HelloWorldHandler) 
    r.GET("/health", s.healthHandler)

    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	mlHandler := handlers.NewMlHandler(s.ml)
	ml := r.Group("/ml")
	{
    	ml.POST("/search", mlHandler.SearchHandler)
	}

    filterHandler := handlers.NewFilterHandler(s.filter)
    filters := r.Group("/filters")
    {
		filters.GET("/updater-config", filterHandler.GetUpdaterConfiguration)
		filters.PUT("/updater-config", filterHandler.UpdateUpdaterConfiguration)

		filters.GET("", filterHandler.GetFilters)
		filters.PUT("/:id", filterHandler.UpdateFilter)
		filters.DELETE("/:id", filterHandler.DeleteFilter)
    }

    return r
}