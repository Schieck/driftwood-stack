from pathlib import Path
from .enums  import Project, Level

class PathResolver:
    def __init__(self, base_path: Path = Path("apps")):
        self.base_path = base_path

    def get_component_path(self, project: Project, level: Level) -> Path:
        if project in [Project.EXPOSED_WEBAPP, Project.INTERNAL_WEBAPP]:
            project_name = project.value
            component_base = self.base_path / "frontend" / f"dws-{project_name}"

            if level == Level.PAGE:
                subfolder = "routes" if project == Project.INTERNAL_WEBAPP else "pages"
                return component_base / subfolder
            
            return component_base / "components" / level.value 

        elif project == Project.API_GATEWAY:
            return self.base_path / "backend" / "api-gateway" / "internal" / "services"
            
        elif project == Project.ML_SERVICE:
            return self.base_path / "backend" / "ml-service" / "app" / "services"