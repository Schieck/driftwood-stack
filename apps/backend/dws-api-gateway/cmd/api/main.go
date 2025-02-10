package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"dws-api-gateway/internal/server"
)

func gracefulShutdown(srv *server.Server, done chan bool) {
    ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
    defer stop()

    <-ctx.Done()
    log.Println("shutting down gracefully...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Printf("Server forced to shutdown with error: %v", err)
    }
    log.Println("Server exiting")

    done <- true
}

func main() {
    s := server.NewServer()
    done := make(chan bool, 1)

    go gracefulShutdown(s, done)
    if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        panic(fmt.Sprintf("http server error: %s", err))
    }

    <-done
    log.Println("Graceful shutdown complete.")
}