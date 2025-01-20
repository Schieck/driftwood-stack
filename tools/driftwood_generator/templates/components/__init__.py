"""
Component templates for different project types.
"""

from pathlib import Path

def get_template_dir() -> Path:
    """Get the base directory for component templates."""
    return Path(__file__).parent

__all__ = ["get_template_dir"]