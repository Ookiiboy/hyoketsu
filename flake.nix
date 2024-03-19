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
        SHELL_ENV = "dev";
        buildInputs = with pkgs; [
          lefthook
          shellcheck
          gnumake
          checkmake
          statix
          deadnix
          deno
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
