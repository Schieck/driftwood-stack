import threading
import time
import logging

from app.grpc_service.grpc_server import serve
from app.services.filter_service import FilterService

logger = logging.getLogger(__name__)

def run_filter_updater(filter_service: FilterService):
    """
    Runs the updater in an infinite loop.
    """
    while True:
        try:
            config = filter_service.config_collection.find_one({"_id": "config"})
            interval = config.get("interval", 60) if config else 60 # Failsafe default at 60

            logger.info("Running filter updater. Next update in %s seconds.", interval)
            filter_service.update_filter_values()
        except Exception as e:
            logger.error("Error during filter updater run: %s", e)
        time.sleep(interval)

if __name__ == "__main__":
    filter_service = FilterService()

    updater_thread = threading.Thread(target=run_filter_updater, args=(filter_service,), daemon=True)
    updater_thread.start()

    serve()

    filter_service.close_connection()
