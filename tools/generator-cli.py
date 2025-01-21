
import os
import sys
from pathlib import Path
import asyncio

# Add the tools directory to the Python path
current_dir = Path(__file__).parent
tools_dir = current_dir
sys.path.insert(0, str(tools_dir))

import click
import inquirer
from rich.console import Console
from rich.theme import Theme
from typing import Optional

from driftwood_generator.core.enums import Project, Level, GenerationType
from driftwood_generator.core.component_generator import ComponentGenerator
from driftwood_generator.config.settings import settings

# Configure rich console
console = Console(theme=Theme({
    "info": "cyan",
    "warning": "yellow",
    "error": "red",
    "success": "green"
}))

def validate_name(name: str, project: Project) -> bool:
    """Validate component name."""
    if not name.isidentifier():
        console.print("[error]Invalid component name. Please use a valid identifier.[/]")
        return False
    if project in [Project.EXPOSED_WEBAPP, Project.INTERNAL_WEBAPP] and not name[0].isupper():
        console.print("[error]Component name must start with an uppercase letter.[/]")
        return False
    return True

def get_root_dir() -> Path:
    """Get the project root directory."""
    current_dir = Path(__file__).parent.parent
    while not (current_dir / 'Makefile').exists():
        if current_dir == current_dir.parent:
            raise FileNotFoundError("Could not find project root (Makefile)")
        current_dir = current_dir.parent
    return current_dir

def setup_paths() -> None:
    """Setup necessary paths in settings."""
    root_dir = get_root_dir()
    settings.update({
        "base_path": str(root_dir / "apps"),
        "templates_path": str(root_dir / "tools" / "driftwood_generator" / "templates"),
        "config_path": str(root_dir / ".driftwood-generator-config.toml")
    })

def get_generation_details() -> tuple[GenerationType, Optional[str]]:
    """Get generation type and description from user."""
    questions = [
        inquirer.List(
            'generation_type',
            message="How would you like to generate the component?",
            choices=[
                ('Blank template', GenerationType.BLANK),
                ('AI Generated (requires OpenAI key)', GenerationType.AI_GENERATED)
            ]
        )
    ]
    
    answers = inquirer.prompt(questions)
    generation_type = answers['generation_type']
    
    description = None
    if generation_type == GenerationType.AI_GENERATED:
        description_prompt = inquirer.Text(
            'description',
            message="Please describe the component you want to create"
        )
        description = inquirer.prompt([description_prompt])['description']
    
    return generation_type, description

@click.command()
@click.option(
    '--project',
    type=click.Choice([p.value for p in Project]),
    required=True,
    help='Project to generate component for'
)
@click.option(
    '--level',
    type=click.Choice([l.value for l in Level]),
    required=True,
    help='Component level/type'
)
@click.option(
    '--name',
    required=True,
    help='Component name (PascalCase)'
)
@click.option(
    '--config',
    type=click.Path(exists=True),
    help='Path to custom config file'
)
def generate_component(project: str, level: str, name: str, config: Optional[str] = None):
    """Generate a new component for the Driftwood Stack project."""
    try:
        # Setup paths
        setup_paths()
        
        # Update settings if custom config provided
        if config:
            settings.update_from_file(Path(config))
        
        # Validate component name
        if not validate_name(name, project):
            return
        
        # Convert string inputs to enums
        project_enum = Project(project)
        level_enum = Level(level)
        
        # Get generation details from user
        generation_type, description = get_generation_details()
        
        # Initialize generator
        generator = ComponentGenerator(
            config_path=Path(settings.config["config_path"]),
            templates_path=Path(settings.config["templates_path"])
        )
        
        # Generate the component
        with console.status(f"[info]Generating {name} component...[/]"):
            output_file = asyncio.run(generator.generate(
                project=project_enum,
                level=level_enum,
                name=name,
                generation_type=generation_type,
                description=description
            ))
        
        # Show success message
        console.print(f"[success]Awesome, successfully generated component at {output_file}[/]")
        
        # Print next steps
        if project_enum in [Project.EXPOSED_WEBAPP, Project.INTERNAL_WEBAPP]:
            console.print("\n[info]Next steps:[/]")
            console.print("1. Add your component to the index file")
            console.print("2. Add tests in the tests directory")
            console.print("3. Update the types if needed")
            
            if generation_type == GenerationType.AI_GENERATED:
                console.print("4. Review the generated code and adjust as needed")
        
    except FileNotFoundError as e:
        console.print(f"[error]Project structure error: {str(e)}[/]")
    except Exception as e:
        console.print(f"[error]Error generating component: {str(e)}[/]")
        console.print("[info]For detailed error information, run with --debug flag[/]")
        if "--debug" in sys.argv:
            raise
        sys.exit(1)

def main():
    """Main entry point with error handling."""
    try:
        generate_component()
    except KeyboardInterrupt:
        console.print("\n[warning]Operation cancelled by user[/]")
        sys.exit(1)
    except Exception as e:
        console.print(f"[error]Unexpected error: {str(e)}[/]")
        if "--debug" in sys.argv:
            raise
        sys.exit(1)

if __name__ == "__main__":
    main()