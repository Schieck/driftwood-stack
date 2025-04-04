package services

import (
    "context"
    "fmt"
    "log"
    "os"
    "time"

    pb "dws-api-gateway/proto"
    "google.golang.org/grpc"
)

type MlService interface {
    SearchDriftwood(query string, filters map[string]string, includeRecommendations bool) (*pb.SearchResponse, error)
    Health() map[string]string
    Close() error
}

type mlService struct {
    client pb.DriftwoodSearchServiceClient
    conn   *grpc.ClientConn
}

func NewMlService() MlService {
	grpcAddress := fmt.Sprintf("%s:%s", os.Getenv("ML_HOST"), os.Getenv("ML_PORT"))
	log.Printf("Connecting to ML gRPC Service at %s...\n", grpcAddress)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, grpcAddress, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("Failed to connect to gRPC server at %s: %v", grpcAddress, err)
	}

	client := pb.NewDriftwoodSearchServiceClient(conn)
	log.Println("Connected to gRPC ML-Service at", grpcAddress)

	return &mlService{
		client: client,
		conn:   conn,
	}
}

func (s *mlService) SearchDriftwood(query string, filters map[string]string, includeRecommendations bool) (*pb.SearchResponse, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	request := &pb.SearchRequest{
		Query:                query,
		Filters:              filters,
		IncludeRecommendations: includeRecommendations,
	}

	response, err := s.client.SearchDriftwood(ctx, request)
	if err != nil {
		log.Printf("Error calling SearchDriftwood: %v", err)
		return nil, err
	}

	return response, nil
}

func (s *mlService) Health() map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	_, err := s.client.SearchDriftwood(ctx, &pb.SearchRequest{})
	if err != nil {
		log.Printf("ML-Service Health Check Failed: %v", err)
		return map[string]string{"status": "unhealthy", "message": err.Error()}
	}

	return map[string]string{"status": "healthy", "message": "ML-Service is reachable"}
}

func (s *mlService) Close() error {
	log.Println("Closing gRPC connection to ML-Service.")
	return s.conn.Close()
}
