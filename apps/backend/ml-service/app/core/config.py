from pydantic import BaseSettings

class Config(BaseSettings):
    environment: str = "development"
    model_path: str = "./models/sample_model.pkl"

    class Config:
        env_file = ".env"

config = Config()