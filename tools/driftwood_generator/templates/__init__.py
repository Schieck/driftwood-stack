"""
Templates module for the Driftwood Generator.
"""

from pathlib import Path
from typing import Dict

def get_template_path() -> Path:
    """Get the base path for templates."""
    return Path(__file__).parent

def get_component_templates() -> Dict[str, Path]:
    """Get a mapping of component types to their template paths."""
    template_path = get_template_path()
    return {
        "react": template_path / "components" / "react",
        "go": template_path / "components" / "go",
        "python": template_path / "components" / "python",
    }

__all__ = [
    "get_template_path",
    "get_component_templates",
]