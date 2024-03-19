# Tooling
.PHONY: all 
.PHONY: clean
.PHONY: test
.PHONY: help

help: ## Help What runs when you type `make help`.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

test: ## Dev - Run linters and tests.
	nix fmt .
	checkmake makefile

add-hooks: ## Dev - Install git hooks.
	lefthook install

update: ## Dev - Update the flake
	nix flake update

