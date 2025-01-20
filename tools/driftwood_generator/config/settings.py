from pathlib import Path
from typing import Dict, Any

DEFAULT_CONFIG = {
    "openai": {
        "model": "gpt-4-turbo-preview",
        "temperature": 0.7,
        "max_tokens": 2000
    },
    "base_path": "apps",
    "templates_path": "templates"
}

class Settings:
    def __init__(self):
        self.config: Dict[str, Any] = DEFAULT_CONFIG.copy()
    
    def update(self, new_config: Dict[str, Any]):
        self.config.update(new_config)
    
    @property
    def base_path(self) -> Path:
        return Path(self.config["base_path"])
    
    @property
    def templates_path(self) -> Path:
        return Path(self.config["templates_path"])

settings = Settings()