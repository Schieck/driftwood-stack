from abc import ABC, abstractmethod
from typing import Optional
from .enums import Project, Level

class AIProvider(ABC):
    @abstractmethod
    async def generate_component(
        self,
        project: Project,
        level: Level,
        name: str,
        description: str
    ) -> str:
        pass

    @abstractmethod
    def get_credentials(self) -> dict:
        pass
