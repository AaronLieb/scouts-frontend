{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	buildInputs = with pkgs; [
		nodejs
	];
	shellHook = ''
		export PATH="$PATH:${builtins.toPath ./.}/node_modules/.bin"
	'';
}
