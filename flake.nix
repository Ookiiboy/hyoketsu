{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = {
    self,
    systems,
    nixpkgs,
    pre-commit-hooks,
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
          alejandra.enable = true;
          deadnix.enable = true;
          statix.enable = true;
          flake-checker.enable = true;
          checkmake.enable = true;
          denofmt.enable = true;
          denolint.enable = true;
          shellcheck.enable = true;
          check-json.enable = true;
          actionlint.enable = true;
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
        shellHook = ''
          ${self.checks.${system}.pre-commit-check.shellHook}
          export PATH="bin:$PATH"
        '';
        SHELL_ENV = "dev";
        PORT = 6969;
        buildInputs = with nixpkgs.legacyPackages.${system};
          [
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
