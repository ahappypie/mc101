{ lib
, buildGoModule
, fetchFromGitHub
, installShellFiles
}:

buildGoModule {
  pname = "packwiz";
  version = "unstable-2023-12-30";

  src = fetchFromGitHub {
    owner = "packwiz";
    repo = "packwiz";
    rev = "7545d9a777739655de749dedcd383dee6bbfd2e2";
    sha256 = "sha256-Ly5z+h11yyhIgzhohjk2g8hQNEPkxxag9m7XYmTMfEQ=";
  };

  vendorHash = "sha256-yL5pWbVqf6mEpgYsItLnv8nwSmoMP+SE0rX/s7u2vCg=";

  nativeBuildInputs = [
    installShellFiles
  ];

  postInstall = ''
    installShellCompletion --cmd packwiz \
      --bash <($out/bin/packwiz completion bash) \
      --fish <($out/bin/packwiz completion fish) \
      --zsh <($out/bin/packwiz completion zsh)
  '';

  meta = with lib; {
    description = "A command line tool for editing and distributing Minecraft modpacks, using a git-friendly TOML format";
    homepage = "https://packwiz.infra.link/";
    license = licenses.mit;
    maintainers = with maintainers; [ infinidoge ];
    mainProgram = "packwiz";
  };
}