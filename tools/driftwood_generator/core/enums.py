from enum import Enum

class Project(str, Enum):
    EXPOSED_WEBAPP = "exposed-webapp"
    INTERNAL_WEBAPP = "internal-webapp"
    API_GATEWAY = "dws-api-gateway"
    ML_SERVICE = "dws-ml-service"

class Level(str, Enum):
    ATOM = "atom"
    MOLECULE = "molecule"
    ORGANISM = "organism"
    TEMPLATE = "template"
    PAGE = "page"
    SERVICE = "service"
    MODEL = "model"

class GenerationType(str, Enum):
    BLANK = "blank"
    AI_GENERATED = "ai-generated"