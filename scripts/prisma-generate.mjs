import { spawnSync } from "node:child_process";

function run() {
  const res = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["prisma", "generate"],
    { stdio: "inherit" },
  );

  if (res.status === 0) return 0;

  // On some Windows setups (Defender/AV + Desktop folder), Prisma engine
  // download/rename can fail with EPERM. The generated client often already
  // exists (or will be generated in CI on Linux). Don't block installs/dev.
  if (process.platform === "win32") {
    console.warn(
      "\n[warn] Prisma generate failed on Windows (likely EPERM file lock). " +
        "Continuing. If you see runtime Prisma errors, move the project to a " +
        "non-protected folder (e.g. C:\\dev\\...) or whitelist the folder in AV.\n",
    );
    return 0;
  }

  return res.status ?? 1;
}

process.exit(run());

