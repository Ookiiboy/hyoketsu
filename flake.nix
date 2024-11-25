{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
    nix-plop.url = "gitlab:cbleslie/nix-plop";
    nix-testcafe.url = "gitlab:cbleslie/nix-testcafe";
    ignoreBoy.url = "github:Ookiiboy/ignoreBoy";

    # Non-flake
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
    nix-testcafe,
    stylelint-config-recommended,
    editorconfig,
    ignoreBoy,
    ...
  }: let
    forAllSystems = nixpkgs.lib.genAttrs (import systems);
    # This just holds metadata about the project to reuse across the file.
    meta = rec {
      version = "${self.shortRev or "dirty"}";
      name = "hyoketsu";
      pname = name;
      tag = version;
    };
  in {
    packages = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in rec {
      default = docker;
      hyoketsu = pkgs.stdenv.mkDerivation {
        inherit (meta) version pname;
        src = ./.;
        # Don't build because dependencies are gathered on first run by Deno.
        # Should still be reproduceable because of deno.lock.
        dontBuild = true;
        installPhase = ''
          DEPS=(
            "components"
            "islands"
            "lib"
            "routes"
            "static"
            "deno.json"
            "deno.lock"
            "fresh.config.ts"
            "fresh.gen.ts"
            "Licence"
            "main.ts"
          )
          mkdir -p $out/bin
          cp -r "''${DEPS[@]}" $out/bin
        '';
      };
      # This makes sure deno is in the path (with any other deps) and runs the
      # server. This is here so we can run with the server with deps, the same
      # way as the server itself.
      hyoketsuRunScript = pkgs.writeShellApplication {
        inherit (meta) name;
        runtimeInputs = with pkgs; [deno hyoketsu];
        # We should figure out exactly what runtime permissions we need. -A is
        # less than ideal.
        text = ''
          deno run -A ${hyoketsu}/bin/main.ts
        '';
      };
      docker = pkgs.dockerTools.buildImage {
        inherit (meta) name tag;
        config = {
          ExposedPorts = {"8000" = {};};
          Cmd = ["${hyoketsuRunScript}/bin/hyoketsu"];
        };
      };
    });
    formatter = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in
      pkgs.alejandra);
    # https://github.com/cachix/git-hooks.nix?tab=readme-ov-file
    # https://devenv.sh/reference/options/?query=pre-commit.hooks
    checks = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
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
            entry = "${pkgs.stylelint}/bin/stylelint --fix";
            files = "\\.(css)$";
            types = ["text" "css"];
            language = "system";
            pass_filenames = true;
          };
        };
      };
    });
    devShells = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
      ignoreSettings = {
        ignores = ["Node" "community/JavaScript/Vue"];
        # Anything custom you might want in your .gitignore you can place in extraConfig.
        extraConfig = ''
          .env
          .env.development.local
          .env.test.local
          .env.production.local
          .env.local
          # Fresh build directory
          _fresh/
          # npm dependencies
          node_modules/
          .pre-commit-config.yaml
          # Symlinked Flake Inputs
          stylelint.config.mjs
          .editorconfig
        '';
      };
    in {
      default = pkgs.mkShell {
        name = "Local Development Shell";
        # We're going to make a symlink and create a direct reference to the
        # stylelint config, rather than have a copy. No, npm or yarn
        # package.json to install this file, so we fetch it directly from the
        # github repo itself. This keeps the install and deps clean.
        shellHook = ''
          ln -sf ${stylelint-config-recommended}/index.js ./stylelint.config.mjs
          ln -sf ${editorconfig}/.editorconfig ./.editorconfig
          ${self.checks.${system}.pre-commit-check.shellHook}
          ${ignoreBoy.lib.${system}.gitignore ignoreSettings}
        '';
        ENV = "dev"; # Used in the event we need a development environment hook.
        PORT = 6969; # Sets the development server's port
        buildInputs = with pkgs;
          [
            nix-plop.packages.${system}.default
            nix-testcafe.packages.${system}.default
            gnumake
            deno
            nix-tree
            # Typescript LSP for SublimeText runs on node
            nodejs_20
          ]
          ++ self.checks.${system}.pre-commit-check.enabledPackages;
      };
    });
  };
}
