from driftwood_generator.core.enums import Project
from typing import Dict, Callable
from .exposed_webapp import get_prompt as exposed_webapp_prompt
from .internal_webapp import get_prompt as internal_webapp_prompt
from .api_gateway import get_prompt as api_gateway_prompt
from .ml_service import get_prompt as ml_service_prompt

PROMPT_REGISTRY: Dict[Project, Callable[[], str]] = {
    Project.EXPOSED_WEBAPP: exposed_webapp_prompt,
    Project.INTERNAL_WEBAPP: internal_webapp_prompt,
    Project.API_GATEWAY: api_gateway_prompt,
    Project.ML_SERVICE: ml_service_prompt,
}

def get_prompt_template(project: Project) -> str:
    return PROMPT_REGISTRY[project]()