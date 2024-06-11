{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
    nix-plop.url = "gitlab:cbleslie/nix-plop";

    # Stylelint Config
    stylelint-config-recommended.url = "github:stylelint/stylelint-config-recommended";
    stylelint-config-recommended.flake = false;
    editorconfig.url = "github:Ookiiboy/editor-config/";
    editorconfig.flake = false;
  };

  outputs = {
    self,
    systems,
    nixpkgs,
    pre-commit-hooks,
    nix-plop,
    stylelint-config-recommended,
    editorconfig,
    ...
  }: let
    forAllSystems = nixpkgs.lib.genAttrs (import systems);
  in {
    formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.alejandra);
    # https://github.com/cachix/git-hooks.nix?tab=readme-ov-file
    # https://devenv.sh/reference/options/?query=pre-commit.hooks
    checks = forAllSystems (system: {
      pre-commit-check = pre-commit-hooks.lib.${system}.run {
        src = ./.;
        hooks = {
          # Nix
          alejandra.enable = true;
          deadnix.enable = true;
          statix.enable = true;
          flake-checker.enable = true;
          # Makefiles
          checkmake.enable = true;
          # Deno
          denofmt.enable = true;
          denolint.enable = true;
          # Shell Scripts
          shellcheck.enable = true;
          beautysh.enable = true;
          # JSON
          check-json.enable = true;
          # Github Actions
          actionlint.enable = true;
          # Markdown
          typos.enable = true;
          # Generic - .editorconfig
          editorconfig-checker.enable = true;
          check-toml.enable = true;
          # CSS - .stylelint.json
          stylelint = {
            enable = true;
            name = "Stylelint";
            entry = "${nixpkgs.legacyPackages.${system}.stylelint}/bin/stylelint --fix";
            files = "\\.(css)$";
            types = ["text" "css"];
            language = "system";
            pass_filenames = true;
          };
        };
      };
    });
    devShells = forAllSystems (system: {
      default = nixpkgs.legacyPackages.${system}.mkShell {
        name = "Local Development Shell";
        # We're going to make a symlink and create a direct reference to the
        # stylelint config, rather than have a copy. No, npm or yarn
        # package.json to install this file, so we fetch it directly from the
        # github repo itself. This keeps the install and deps clean.
        shellHook = ''
          ln -sf ${stylelint-config-recommended}/index.js ./stylelint.config.mjs
          ln -sf ${editorconfig}/.editorconfig ./.editorconfig
          ${self.checks.${system}.pre-commit-check.shellHook}
        '';
        ENV = "dev"; # Used in the event we need a development environment hook.
        PORT = 6969; # Sets the development server's port
        buildInputs = with nixpkgs.legacyPackages.${system};
          [
            nix-plop.packages.${system}.default
            gnumake
            deno
            # Typescript LSP for SublimeText runs on node
            nodejs_20
          ]
          ++ self.checks.${system}.pre-commit-check.enabledPackages;
      };
    });
  };
}
