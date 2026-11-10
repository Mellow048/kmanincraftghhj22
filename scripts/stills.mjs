#!/usr/bin/env node
/**
 * Render a handful of diagnostic stills from a composition.
 *
 *   node scripts/stills.mjs the-hallway "30,150,300,450,590" out/stills
 *
 * Stills are the review tool. A full render is a delivery step; do not burn one
 * to find out whether a face reads or a wall is in the way.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const composition = process.argv[2] ?? "the-hallway";
const frames = (process.argv[3] ?? "30,150,300,450,590")
  .split(",")
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value >= 0);
const outDir = process.argv[4] ?? "out/stills";

if (frames.length === 0) {
  console.error("No frames requested.");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const frame of frames) {
  const out = path.join(outDir, `${composition}-${String(frame).padStart(4, "0")}.png`);
  console.log(`\n▶ ${composition} frame ${frame} → ${out}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      composition,
      out,
      `--frame=${frame}`,
      "--gl=swangle",
      "--log=error",
    ],
    { stdio: "inherit" },
  );
}

console.log(`\nDone. ${frames.length} still(s) in ${outDir}`);
