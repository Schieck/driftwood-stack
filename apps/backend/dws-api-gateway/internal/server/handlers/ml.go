package handlers

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "dws-api-gateway/internal/services"
)

type MlHandler struct {
    svc services.MlService
}

func NewMlHandler(svc services.MlService) *MlHandler {
    return &MlHandler{svc: svc}
}

func (h *MlHandler) SearchHandler(c *gin.Context) {
    var request struct {
        Query                 string            `json:"query"`
        Filters               map[string]string `json:"filters"`
        IncludeRecommendations bool             `json:"include_recommendations"`
    }

    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    response, err := h.svc.SearchDriftwood(request.Query, request.Filters, request.IncludeRecommendations)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "details": "Failed to fetch results"})
        return
    }

    c.JSON(http.StatusOK, response)
}