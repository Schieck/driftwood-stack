import pandas as pd
from app.core.db import MongoDBConnection
from app.core.config import settings
from loguru import logger


class FilterService:
    COLLECTION_NAME = "filter_values"
    CONFIG_COLLECTION = "updater_config"

    def __init__(self):
        self.db_connection = MongoDBConnection()
        self.db_connection.connect()
        self.collection = self.db_connection.get_collection(self.COLLECTION_NAME)

    def get_config(self):
        """
        Fetch the updater configuration from MongoDB.

        The configuration is expected to be stored in the 'updater_config' collection
        with a fixed document ID of 'config'. For example:
            {
                "_id": "config",
                "enabled": true,
                "interval": 120
            }
        """
        logger.info("Fetching updater configuration from MongoDB.")
        config = self.config_collection.find_one({"_id": "config"})
        if config:
            logger.info("Updater configuration found: {}", config)
        else:
            logger.info("No updater configuration found; using defaults.")
        return config


    def update_filter_values(self):
        """
        We need to update our database with unique filter values from the dataset time to time, this is the function to do so.
        """
        logger.info("Checking updater configuration for filter updater.")
        config = self.config_collection.find_one({"_id": "config"})
        if not config or not config.get("enabled", False):
            logger.info("Filter updater is disabled by configuration; skipping update.")
            return

        logger.info("Reading dataset from %s", settings.DATASET_PATH)
        try:
            df = pd.read_csv(settings.DATASET_PATH)
        except Exception as e:
            logger.error("Error reading CSV: %s", e)
            return

        csv_columns = list(df.columns)
        logger.info("CSV columns found: %s", csv_columns)

        # Get existing filter names from the database.
        existing_filters = self.filter_collection.distinct("filter")
        logger.info("Existing filters in DB: %s", existing_filters)

        if existing_filters:
            # Update only those filters that are present both in DB and CSV.
            filter_columns = [col for col in existing_filters if col in csv_columns]
            if not filter_columns:
                logger.info("No matching filter columns between CSV and database. Nothing to update.")
                return
        else:
            # If no filters exist in the DB yet, update for all CSV columns.
            filter_columns = csv_columns

        logger.info("Updating filter values for columns: %s", filter_columns)
        for column in filter_columns:
            # Get unique non-null values from the CSV column.
            values = df[column].dropna().unique().tolist()
            # Upsert the filter document in MongoDB.
            self.filter_collection.update_one(
                {"filter": column},
                {"$set": {"values": values}},
                upsert=True
            )
            logger.info("Updated filter '%s' with values: %s", column, values)

        logger.info("Filter values update completed.")

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
