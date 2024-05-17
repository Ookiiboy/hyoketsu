# Tooling
.PHONY: all 
.PHONY: clean
.PHONY: test
.PHONY: help

help: ## Help What runs when you type `make help`.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

test: ## Dev - Run linters and tests.
	nix flake check

update: ## Dev - Update the flake
	nix flake update

update-fresh: ## Dev -- Update Fresh
	deno run -A -r https://fresh.deno.dev/update .

dev: ## Start the development Server
	deno task start

deploy: ## Deploy the app
	deployctl deploy --org=ookiiboy --project=hyoketsu --save-config