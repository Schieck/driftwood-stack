from pymongo import MongoClient
from loguru import logger
from app.core.config import settings


class MongoDBConnection:
    def __init__(self):
        self.client = None
        self.db = None

    def connect(self):
        """
        Establish a connection to the MongoDB instance.
        """
        try:
            logger.info("Connecting to MongoDB...")
            self.client = MongoClient(
                host=settings.DB_HOST,
                port=settings.DB_PORT,
                username=settings.DB_USERNAME,
                password=settings.DB_PASSWORD,
            )
            self.db = self.client["dws_ml_service"]
            logger.info("Connected to MongoDB successfully.")
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {e}")
            raise e

    def get_collection(self, collection_name):
        """
        Get a specific collection from the database.
        """
        if self.db is None:  # Explicitly check if self.db is None
            logger.error("Database connection not established.")
            raise Exception("Database connection not established.")
        return self.db[collection_name]

    def close(self):
        """
        Close the database connection.
        """
        if self.client:
            logger.info("Closing MongoDB connection.")
            self.client.close()
