from .base import AIProvider
from openai import OpenAI
from ..core.enums import Project, Level
from ..templates.prompts import get_prompt_template
import inquirer
import toml
from pathlib import Path

class OpenAIProvider(AIProvider):
    def __init__(self, config_path: Path):
        self.config_path = config_path
        self.config = self._load_config()
        
    def _load_config(self) -> dict:
        if self.config_path.exists():
            return toml.load(self.config_path)
        return {}

    def get_credentials(self) -> dict:
        if 'openai_api_key' in self.config:
            return {'api_key': self.config['openai_api_key']}
        
        questions = [
            inquirer.Text('api_key',
                         message="Please enter your OpenAI API key"),
            inquirer.Confirm('save',
                           message="Would you like to save this key for future use?",
                           default=True)
        ]
        
        answers = inquirer.prompt(questions)
        
        if answers['save']:
            self.config['openai_api_key'] = answers['api_key']
            with open(self.config_path, 'w') as f:
                toml.dump(self.config, f)
        
        return {'api_key': answers['api_key']}

    async def generate_component(
        self,
        project: Project,
        level: Level,
        name: str,
        description: str
    ) -> str:
        credentials = self.get_credentials()
        client = OpenAI(api_key=credentials['api_key'])
        
        prompt_template = get_prompt_template(project)
        prompt = prompt_template.format(
            level=level.value,
            name=name,
            description=description
        )

        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert software developer helping to generate high-quality code for the Driftwood Stack project."
                },
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content
    
