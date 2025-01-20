from pathlib import Path
from typing import Optional
from .enums import Project, Level, GenerationType
from .path_resolver import PathResolver
from ..providers.base import AIProvider
from ..providers.openai_provider import OpenAIProvider

from jinja2 import Environment, FileSystemLoader, select_autoescape
import inquirer
from rich.console import Console
from rich.theme import Theme

class ComponentGenerator:
    def __init__(
        self,
        config_path: Path = Path('.driftwood-generator-config.toml'),
        templates_path: Path = Path('templates')
    ):
        self.console = Console(theme=Theme({
            "info": "cyan",
            "warning": "yellow",
            "error": "red",
            "success": "green"
        }))
        
        self.path_resolver = PathResolver()
        self.templates_path = templates_path
        self.provider = OpenAIProvider(config_path)
        
        # Setup Jinja2 environment
        self.jinja_env = Environment(
            loader=FileSystemLoader(str(templates_path / 'components'))
        )

    def _get_template_path(self, project: Project) -> str:
        if project == Project.INTERNAL_WEBAPP:
            return 'react/component.tsx.jinja2'
        elif project == Project.EXPOSED_WEBAPP:
            return 'next/component.tsx.jinja2'
        elif project == Project.API_GATEWAY:
            return 'go/service.go.jinja2'
        else:
            return 'python/service.py.jinja2'

    async def generate(
        self,
        project: Project,
        level: Level,
        name: str,
        generation_type: GenerationType,
        description: Optional[str] = None
    ):
        output_path = self.path_resolver.get_component_path(project, level)
        output_path.mkdir(parents=True, exist_ok=True)

        ext = self._get_file_extension(project)
        main_file = output_path / f"{name}{ext}"
        
        if generation_type == GenerationType.BLANK:
            current_template = self.jinja_env.get_template(self._get_template_path(project))
            content = current_template.render(name=name, level=level.value)
        else:
            content = await self.provider.generate_component(
                project, level, name, description
            )

        with open(main_file, 'w') as f:
            f.write(content)

        return main_file

    def _get_file_extension(self, project: Project) -> str:
        if project in [Project.EXPOSED_WEBAPP, Project.INTERNAL_WEBAPP]:
            return '.tsx'
        elif project == Project.API_GATEWAY:
            return '.go'
        else:
            return '.py'

    def _create_additional_files(self, project: Project, output_path: Path, name: str):
        if project in [Project.EXPOSED_WEBAPP, Project.INTERNAL_WEBAPP]:
            # Create test file
            with open(output_path / "tests" / f"{name}.test.tsx", 'w') as f:
                f.write(f"""import React from 'react'
import { render } from '@testing-library/react'
import {name} from '../index'

describe('{name}', () => {{
    it('renders without crashing', () => {{
        render(<{name} />)
    }})
}})""")

            # Create types file
            with open(output_path / "types" / "index.ts", 'w') as f:
                f.write(f"""export interface {name}Props {{
    // Define your props here
}}""")

        elif project == Project.API_GATEWAY:
            # Create test file
            with open(output_path / "tests" / f"{name}_test.go", 'w') as f:
                f.write(f"""package services_test

import (
    "testing"
)

func Test{name}(t *testing.T) {{
    // Add your tests here
}}""")

        else:  # ML_SERVICE
            # Create test file
            with open(output_path / "tests" / f"test_{name.lower()}.py", 'w') as f:
                f.write(f"""import pytest
from ..index import router

def test_{name.lower()}_endpoint():
    # Add your tests here
    pass""")
