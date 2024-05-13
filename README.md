# Hyōketsu

Hyōketsu is a simple and ephemeral voting system. By default the polls in which users vote expire and are deleted after 20 minutes. There is no authentication, it uses the honor system.

## About
- It's built on [Deno](https://deno.com/) and [Fresh](https://fresh.deno.dev/docs/getting-started)
- Runs on [Deno Deploy](https://deno.com/deploy). Using [Deno KV](https://deno.com/kv) for temporary storage
- It uses [`nix` package manager](https://nixos.org/download/) for managing development environment dependencies
- Development enviroments can be automatically loaded through [direnv](https://direnv.net/)
- Licenced under the [Hippocratic License v3.0 (HL3)](https://firstdonoharm.dev/); for its specific provisions, please read the licence file.

## Development Setup
Development dependencies are managed by the `nix` package manager, and `deno` itself. To get started:

1. Install `nix` package-manager

1. Using `nix` enable or install `direnv` (reccomended), or when you enter the directory type `nix shell`. When you `cd` into the project folder, `direnv` will ask for your permission to download all dependencies.

1. If you plan on contributing to the project install the githooks by typing: `make add-hooks`

## Run the dev server
This will watch the project directory and restart as necessary.

```
make dev
```

## Find out what else you can do
```
make help
```



