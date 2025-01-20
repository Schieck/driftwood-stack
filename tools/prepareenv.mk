# Makefile

# ===========================================
# Configuration
# ===========================================

# Define the path to the frontend applications
FRONTEND_DIR := apps/frontend

# Automatically find all immediate subdirectories within apps/frontend containing a package.json
FRONTEND_SUBDIRS := $(shell find $(FRONTEND_DIR) -mindepth 1 -maxdepth 1 -type d -exec test -f "{}/package.json" \; -print)

# Alternatively, specify frontend subdirectories manually
# Uncomment and modify the following line if you prefer to specify subdirectories manually
# FRONTEND_SUBDIRS := $(FRONTEND_DIR)/dws-exposed-webapp $(FRONTEND_DIR)/dws-internal-webapp

# ===========================================
# Phony Targets
# ===========================================

.PHONY: install-env-deps install-pnpm clean-env-deps


install-env-deps: check_pnpm install-pnpm

# ===========================================
# Check pnpm Installation
# ===========================================

# Verify that pnpm is installed; exit with an error message if not
check_pnpm:
	@command -v pnpm >/dev/null 2>&1 || { \
		echo >&2 "Error: pnpm is not installed. Please install pnpm from https://pnpm.io/installation and try again."; \
		exit 1; \
	}

# ===========================================
# Install Dependencies Target
# ===========================================

# Install dependencies in all frontend subdirectories
install-pnpm:
	@echo "🔧 Installing dependencies in all frontend subdirectories with package.json..."
	@for dir in $(FRONTEND_SUBDIRS); do \
		echo "➡️  Installing in $$dir..."; \
		(cd $$dir && pnpm install) || { \
			echo "❌ Installation failed in $$dir"; \
			exit 1; \
		}; \
	done
	@echo "✅ All frontend dependencies installed successfully."

# ===========================================
# Clean Dependencies Target
# ===========================================

# Clean node_modules and pnpm lock files in all frontend subdirectories
clean-env-deps:
	@echo "🧹 Cleaning node_modules and pnpm lock files in all frontend subdirectories..."
	@for dir in $(FRONTEND_SUBDIRS); do \
		echo "➡️  Cleaning $$dir..."; \
		rm -rf $$dir/node_modules $$dir/pnpm-lock.yaml || { \
			echo "❌ Cleaning failed in $$dir"; \
			exit 1; \
		}; \
	done
	@echo "✅ All frontend subdirectories cleaned successfully."
