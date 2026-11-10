{
  pkgs,
  lib,
  config,
  ...
}:
{
  # JavaScript tooling, including pnpm.
  languages.javascript = {
    enable = true;
    pnpm.enable = true;
  };

  # Rust toolchain required by Tauri.
  languages.rust.enable = true;

  # Tauri's native Linux build dependencies.
  packages = lib.optionals pkgs.stdenv.isLinux [
    pkgs.pkg-config
    pkgs.openssl
    pkgs.webkitgtk_4_1
    pkgs.gtk3
    pkgs.libayatana-appindicator
    pkgs.librsvg
  ];

  # See full reference at https://devenv.sh/reference/options/
}
