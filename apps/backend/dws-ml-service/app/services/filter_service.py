import pandas as pd
from app.core.db import MongoDBConnection
from app.core.config import settings
from loguru import logger


class FilterService:
    COLLECTION_NAME = "filter_values"

    def __init__(self):
        self.db_connection = MongoDBConnection()
        self.db_connection.connect()
        self.collection = self.db_connection.get_collection(self.COLLECTION_NAME)

    def update_filter_values(self):
        """
        We need to update our database with unique filter values from the dataset time to time, this is the function to do so.
        """
        logger.info("Updating filter values from dataset.")
        df = pd.read_csv(settings.DATASET_PATH)

        filter_columns = ["type_of_driftwood", "color", "texture", "location", "environment_type", "weather_conditions"]
        filter_values = {}
        for column in filter_columns:
            filter_values[column] = df[column].dropna().unique().tolist()

        for key, values in filter_values.items():
            self.collection.update_one(
                {"filter": key},
                {"$set": {"values": values}},
                upsert=True,
            )
        logger.info("Filter values updated in MongoDB.")

    def get_filter_values(self):
        """
        We need to fetch the possible filter values from the database for a better ML response.
        """
        logger.info("Fetching filter values from MongoDB.")
        filters = {}
        for document in self.collection.find():
            filters[document["filter"]] = document["values"]
        return filters

    def close_connection(self):
        logger.info("Closing MongoDB connection.")
        self.db_connection.close()
