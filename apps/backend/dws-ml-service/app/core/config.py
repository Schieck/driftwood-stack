from pydantic_settings import BaseSettings
from functools import lru_cache
from loguru import logger

class Settings(BaseSettings):
    # API Settings
    PROJECT_NAME: str = "Driftwood Search API"

    # Model Settings
    MODEL_PATH: str = "app/core/ml_model/model.pkl"
    SIMILARITY_THRESHOLD: float = 0.5
    MAX_RESULTS: int = 10

    # Data Settings
    DATASET_PATH: str = "scripts/training-data/driftwood_dataset.csv"
    IMAGES_DIR: str = "scripts/training-data/generated_images"

    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # MongoDB Settings
    DB_HOST: str = "localhost"
    DB_PORT: int = 27017
    DB_USERNAME: str = "root"
    DB_PASSWORD: str = "donotusethisenvinprod"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    logger.info("Loading application settings.")
    return Settings()


settings = get_settings()
