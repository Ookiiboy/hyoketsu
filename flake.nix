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
  } @ inputs: let
    forAllSystems = nixpkgs.lib.genAttrs (import systems);
  in {
    formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.alejandra);
    checks = forAllSystems (system: {
      pre-commit-check = inputs.pre-commit-hooks.lib.${system}.run {
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
