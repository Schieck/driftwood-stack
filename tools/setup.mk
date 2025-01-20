# ==========================================
# Project Setup and Renaming
# ==========================================

# Default project values
DEFAULT_PROJECT_NAME := driftwood-stack
DEFAULT_PROJECT_ALIAS := dws

# Setup Colors
SETUP_BLUE := \033[0;34m
SETUP_GREEN := \033[0;32m
SETUP_RED := \033[0;31m
SETUP_YELLOW := \033[0;33m
SETUP_NC := \033[0m # No Color

# Validation function for setup
define validate_setup_input
	@if [ -z "$(project_name)" ] || [ -z "$(project_alias)" ]; then \
		echo "$(SETUP_RED)Error: Both project_name and project_alias are required$(SETUP_NC)"; \
		echo "Usage: make setup project_name=your-project-name project_alias=ypa"; \
		exit 1; \
	fi
endef

.PHONY: setup
setup: ## Initialize project with new name (Usage: make setup project_name=new-name project_alias=alias)
	$(call validate_setup_input)
	@echo "$(SETUP_BLUE)Setting up project with name: $(project_name) (alias: $(project_alias))$(SETUP_NC)"
	@$(MAKE) setup-frontend
	@$(MAKE) setup-backend
	@$(MAKE) setup-infrastructure
	@$(MAKE) setup-documentation
	@$(MAKE) verify-setup
	@$(MAKE) setup-clean
	@echo "$(SETUP_GREEN)Project setup completed!$(SETUP_NC)"

#
# Frontend renaming
#
.PHONY: setup-frontend
setup-frontend:
	@echo "$(SETUP_BLUE)Setting up frontend projects...$(SETUP_NC)"
	# Setup Next.js project
	@LC_ALL=C find "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-exposed-webapp" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-exposed-webapp" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +
	@mv "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-exposed-webapp" \
		"./apps/frontend/$(project_alias)-exposed-webapp" 2>/dev/null || true

	# Setup React project
	@LC_ALL=C find "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-internal-webapp" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-internal-webapp" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +
	@mv "./apps/frontend/$(DEFAULT_PROJECT_ALIAS)-internal-webapp" \
		"./apps/frontend/$(project_alias)-internal-webapp" 2>/dev/null || true

#
# Backend renaming
#
.PHONY: setup-backend
setup-backend:
	@echo "$(SETUP_BLUE)Setting up backend projects...$(SETUP_NC)"
	# Setup Go API project
	@LC_ALL=C find "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-api-gateway" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-api-gateway" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +
	@mv "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-api-gateway" \
		"./apps/backend/$(project_alias)-api-gateway" 2>/dev/null || true

	# Setup Python ML project
	@LC_ALL=C find "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-ml-service" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-ml-service" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +
	@mv "./apps/backend/$(DEFAULT_PROJECT_ALIAS)-ml-service" \
		"./apps/backend/$(project_alias)-ml-service" 2>/dev/null || true

#
# Infrastructure renaming
#
.PHONY: setup-infrastructure
setup-infrastructure:
	@echo "$(SETUP_BLUE)Setting up infrastructure files...$(SETUP_NC)"
	@LC_ALL=C find "./infra" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find "./infra" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +

#
# Documentation renaming
#
.PHONY: setup-documentation
setup-documentation:
	@echo "$(SETUP_BLUE)Setting up documentation...$(SETUP_NC)"
	@LC_ALL=C find . -name "*.md" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_NAME)/$(project_name)/g" {} +
	@LC_ALL=C find . -name "*.md" -type f \
		-exec sed -i.bak "s/$(DEFAULT_PROJECT_ALIAS)/$(project_alias)/g" {} +

#
# Verification
#
.PHONY: verify-setup
verify-setup:
	@echo "$(SETUP_BLUE)Verifying project setup...$(SETUP_NC)"
	@echo "Checking for remaining occurrences of $(DEFAULT_PROJECT_NAME)..."
	@if grep -r "$(DEFAULT_PROJECT_NAME)" . --exclude-dir={.git,node_modules,build,dist} --exclude=Makefile --exclude="*.bak" ; then \
		echo "$(SETUP_RED)Found remaining occurrences of $(DEFAULT_PROJECT_NAME)$(SETUP_NC)"; \
	fi
	@echo "Checking for remaining occurrences of $(DEFAULT_PROJECT_ALIAS)..."
	@if grep -r "$(DEFAULT_PROJECT_ALIAS)" . --exclude-dir={.git,node_modules,build,dist} --exclude=Makefile --exclude="*.bak"; then \
		echo "$(SETUP_RED)Found remaining occurrences of $(DEFAULT_PROJECT_ALIAS)$(SETUP_NC)"; \
	fi
	@echo "$(SETUP_GREEN)Setup verification complete!$(SETUP_NC)"

#
# Cleanup
#
.PHONY: setup-clean
setup-clean:
	@echo "$(SETUP_BLUE)Cleaning up temporary files...$(SETUP_NC)"
	@find . -type f -name "*.bak" -delete
	@echo "$(SETUP_GREEN)Setup cleanup complete!$(SETUP_NC)"
