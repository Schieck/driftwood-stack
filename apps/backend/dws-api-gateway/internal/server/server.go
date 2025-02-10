package server

import (
	"context"
    "log"
    "net/http"
    "os"
    "strconv"
    "time"

    _ "github.com/joho/godotenv/autoload"

    "dws-api-gateway/internal/database"
    "dws-api-gateway/internal/services"
)

type Server struct {
	httpServer         *http.Server

    port int

    db                  database.Service
    filter	    		services.FilterService
    ml               	services.MlService
}

func NewServer() *Server {
    port, err := strconv.Atoi(os.Getenv("PORT"))
    if err != nil {
        log.Fatalf("Invalid PORT: %v", err)
    }

	db := database.New()
	dbName := "dws_ml_service"

    return &Server{
        port: port,
        db:   db,
        filter: services.NewFilterService(db.GetDatabase(dbName)),
        ml:             services.NewMlService(),
    }
}

func (s *Server) ListenAndServe() error {
    handler := s.RegisterRoutes()

    s.httpServer = &http.Server{
        Addr:         ":" + strconv.Itoa(s.port),
        Handler:      handler,
        IdleTimeout:  time.Minute,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 30 * time.Second,
    }

    log.Printf("Listening on port %d...", s.port)
    return s.httpServer.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
    if s.httpServer == nil {
        return nil
    }
    return s.httpServer.Shutdown(ctx)
}
