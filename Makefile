include tools/setup.mk
include tools/generator.mk

# Create DB container
docker-run:
	@if docker compose -f ./infra/docker-compose.yml --env-file example.env up --build | cat 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose up --build; \
	fi

# Shutdown DB container
docker-down:
	@if docker compose down 2>/dev/null; then \
		: ; \
	else \
		echo "Falling back to Docker Compose V1"; \
		docker-compose down; \
	fi

# Help command
help:
	@echo "$(CYAN)Available commands:$(RESET)"
	@echo "  make setup                - Will rename and configure the blueprint to your project name"
	@echo "    Required parameters:"
	@echo "      project_name=<p_name> - Project Long Name (your-project-name)"
	@echo "      project_alias=<alias> - Project Alias 	   (ypn)"
	@echo "  make setup-generator      - Install dependencies and configure the component generator"
	@echo "  make docker-run           - Create a Docker container for the database"
	@echo "  make component            - Generate a new component (Setup generator before running)"
	@echo "    Required parameters:"
	@echo "      project=<project>     - Project type (exposed-webapp, internal-webapp, api-gateway, ml-service)"
	@echo "      level=<level>         - Component level (atom, molecule, organism, template, page, service, model)"
	@echo "      name=<name>           - Component name"
	@echo ""
	@echo "$(CYAN)Examples:$(RESET)"
	@echo "  make setup project_name=your-project-name project_alias=ypa"
	@echo "  make setup-generator"
	@echo "  make docker-run"
	@echo "  make component project=exposed-webapp level=atom name=SendButton"