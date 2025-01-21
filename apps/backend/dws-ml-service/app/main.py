from app.grpc_service.grpc_server import serve
from app.services.filter_service import FilterService

if __name__ == "__main__":
    # Update filter values in MongoDB
    filter_service = FilterService()
    filter_service.update_filter_values()
    filter_service.close_connection()

    # Start the gRPC server
    serve()
