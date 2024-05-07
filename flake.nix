{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = {
    systems,
    nixpkgs,
    ...
  } @ inputs: let
    eachSystem = f:
      nixpkgs.lib.genAttrs (import systems) (
        system:
          f nixpkgs.legacyPackages.${system}
      );
  in {
    formatter = {
      "aarch64-darwin" = nixpkgs.legacyPackages.aarch64-darwin.alejandra;
      "x86_64-linux" = nixpkgs.legacyPackages.x86_64-linux.alejandra;
    };
    devShells = eachSystem (pkgs: {
      default = pkgs.mkShell {
        shellHook = ''
          export PATH="bin:$PATH"
        '';
        SHELL_ENV = "dev";
        PORT = 6969;
        buildInputs = with pkgs; [
          lefthook
          shellcheck
          gnumake
          checkmake
          statix
          deadnix
          deno
          # Typescript LSP for SublimeText runs on node
          nodejs_20
        ];
      };
      production = pkgs.mkShell {
        SHELL_ENV = "prod";
        buildInputs = with pkgs; [
          deno
        ];
      };
    });
  };
}
