package handlers

import (
	"net/http"

	"dws-api-gateway/internal/models"
	"dws-api-gateway/internal/services"

	"github.com/gin-gonic/gin"
)

type FilterHandler struct {
	svc services.FilterService
}

func NewFilterHandler(svc services.FilterService) *FilterHandler {
	return &FilterHandler{svc: svc}
}

// UpdateFilter - GET /filters.
func (h *FilterHandler) GetFilters(c *gin.Context) {
	filters, err := h.svc.GetFilters(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, filters)
}

// UpdateFilter - PUT /filters/:id.
func (h *FilterHandler) UpdateFilter(c *gin.Context) {
	var filter models.Filter
	if err := c.ShouldBindJSON(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	id := c.Param("id")

	if filter.ID == "" {
		filter.ID = id
	} else if filter.ID != id {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id in URL and body do not match"})
		return
	}

	updatedFilter, err := h.svc.UpdateFilter(c.Request.Context(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedFilter)
}

// DeleteFilter - DELETE /filters/:id.
func (h *FilterHandler) DeleteFilter(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.DeleteFilter(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

// GetUpdaterConfiguration - GET /filters/updater-config.
func (h *FilterHandler) GetUpdaterConfiguration(c *gin.Context) {
	config, err := h.svc.GetUpdaterConfiguration(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, config)
}

// UpdateUpdaterConfiguration - PUT /filters/updater-config.
func (h *FilterHandler) UpdateUpdaterConfiguration(c *gin.Context) {
	var config models.UpdaterConfig
	if err := c.ShouldBindJSON(&config); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	updatedConfig, err := h.svc.UpdateUpdaterConfiguration(c.Request.Context(), config)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, updatedConfig)
}
