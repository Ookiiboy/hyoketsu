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

            # The command to execute (mandatory):
            entry = "${nixpkgs.legacyPackages.${system}.stylelint}/bin/stylelint";

            # The pattern of files to run on (default: "" (all))
            # see also https://pre-commit.com/#hooks-files
            files = "\\.(css)$";

            # List of file types to run on (default: [ "file" ] (all files))
            # see also https://pre-commit.com/#filtering-files-with-types
            # You probably only need to specify one of `files` or `types`:
            types = ["text" "css"];

            # The language of the hook - tells pre-commit
            # how to install the hook (default: "system")
            # see also https://pre-commit.com/#supported-languages
            language = "system";

            # Set this to false to not pass the changed files
            # to the command (default: true):
            pass_filenames = false;
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
