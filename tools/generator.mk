# Python virtual environment
VENV_DIR := .venv
PIP := pip3
PYTHON := python3
TOOLS_DIR := tools

# Colors for pretty printing
CYAN := \033[36m
GREEN := \033[32m
RED := \033[31m
RESET := \033[0m
.PHONY: component validate-input


# Create virtual environment and install dependencies
setup-generator:
	@echo "Setting up component generator..."
	@if [ ! -d "$(VENV_DIR)" ]; then \
		$(PYTHON) -m venv $(VENV_DIR); \
	fi
	@$(VENV_DIR)/bin/$(PIP) install -r tools/requirements.txt


# Validate input parameters
validate-input:
	@if [ -z "$(project)" ]; then \
		echo "$(RED)Error: Missing 'project' parameter$(RESET)"; \
		echo "Available projects: exposed-webapp, internal-webapp, dws-api-gateway, dws-ml-service"; \
		exit 1; \
	fi
	@if [ -z "$(level)" ]; then \
		echo "$(RED)Error: Missing 'level' parameter$(RESET)"; \
		echo "Available levels: atom, molecule, organism, template, page, service, model"; \
		exit 1; \
	fi
	@if [ -z "$(name)" ]; then \
		echo "$(RED)Error: Missing 'name' parameter$(RESET)"; \
		echo "Example: make component project=exposed-webapp level=atom name=SendButton"; \
		exit 1; \
	fi

# Generate component
component: validate-input
	@echo "$(CYAN)Generating component...$(RESET)"
	$(VENV_DIR)/bin/$(PYTHON) $(TOOLS_DIR)/generator-cli.py \
		--project $(project) \
		--level $(level) \
		--name $(name)
	@echo "$(GREEN)Component generation complete!$(RESET)"