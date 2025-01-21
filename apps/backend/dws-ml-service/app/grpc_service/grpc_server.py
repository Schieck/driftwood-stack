import grpc
from concurrent import futures
from loguru import logger
from app.grpc_service import dws_ml_server_pb2_grpc, dws_ml_server_pb2
from app.services.search_service import SearchService
from app.core.config import settings


class DriftwoodSearchService(dws_ml_server_pb2_grpc.DriftwoodSearchServiceServicer):
    def __init__(self):
        self.search_service = SearchService()

    def SearchDriftwood(self, request, context):
        logger.info(f"Received SearchDriftwood request: {request}")
        results, recommendations = self.search_service.search_driftwood(
            query=request.query,
            filters=dict(request.filters),
            include_recommendations=request.include_recommendations,
        )

        response = dws_ml_server_pb2.SearchResponse()
        for result in results:
            driftwood_item = response.results.add()
            driftwood_item.id = result.get("id", "")
            driftwood_item.image_path = result.get("image_path", "")
            driftwood_item.metadata.type = result.get("type", "")
            driftwood_item.metadata.size = result.get("size", 0.0)
            driftwood_item.metadata.color = result.get("color", "")

        for recommendation in recommendations:
            summary = response.recommendations.add()
            summary.id = recommendation.get("id", "")
            summary.image_path = recommendation.get("image_path", "")
            summary.type = recommendation.get("type", "")
            summary.location = recommendation.get("location", "")

        logger.info(f"SearchDriftwood response: {response}")
        return response


def serve():
    port = settings.PORT
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    dws_ml_server_pb2_grpc.add_DriftwoodSearchServiceServicer_to_server(
        DriftwoodSearchService(), server
    )
    server.add_insecure_port(f"[::]:{port}")
    logger.info(f"gRPC server running on port {port}...")
    server.start()
    server.wait_for_termination()
