package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
	"log"

	_ "github.com/joho/godotenv/autoload"

	"dws-api-gateway/internal/ml"
	"dws-api-gateway/internal/database"
)

type Server struct {
	port int

	ml ml.Service
	db database.Service
}

func NewServer() *http.Server {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		log.Fatalf("Invalid PORT: %v", err)
	}

	NewServer := &Server{
		port: port,
		db:   database.New(),
		ml:   ml.New(),
	}
	handler := NewServer.RegisterRoutes()

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      handler,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
