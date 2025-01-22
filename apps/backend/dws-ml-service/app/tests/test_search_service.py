import grpc
from app.grpc_service import dws_ml_server_pb2, dws_ml_server_pb2_grpc

def test_search_service():
    # Arrange
    with grpc.insecure_channel("localhost:8000") as channel:
        stub = dws_ml_server_pb2_grpc.DriftwoodSearchServiceStub(channel)
        request = dws_ml_server_pb2.SearchRequest(
            query="riverbank dark brown log rough",
            filters={"type_of_driftwood": "log", "color": "brown", "location": "beach"},
            include_recommendations=True,
        )
        
        # Act
        response = stub.SearchDriftwood(request)

        # Assert
        print("Results:")
        for result in response.results:
            print(result)
        print("Recommendations:")
        for rec in response.recommendations:
            print(rec)

if __name__ == "__main__":
    test_search_service()
