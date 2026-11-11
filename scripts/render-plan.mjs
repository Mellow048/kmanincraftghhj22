#!/usr/bin/env node
/**
 * Splits one composition into frame ranges, so a long film can be rendered by
 * several machines side by side and joined afterwards (.github/workflows/render.yml).
 *
 *   node scripts/render-plan.mjs in-this-town-monster-egg
 *   node scripts/render-plan.mjs the-hallway --chunk 450 --max 16 --scale 0.5
 *
 * Prints key=value lines, and inside GitHub Actions also appends them to $GITHUB_OUTPUT:
 *   matrix={"include":[{"index":"00","from":0,"to":441}, …]}
 *   chunks=12  frames=5300  fps=30  size=540x960
 *
 * A film of up to two chunks' worth of frames (a 20-second short) stays in one piece.
 * It asks Remotion for the length, so it is right for every film, with or without narration.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { openBrowser, selectComposition } from "@remotion/renderer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback;
};
const id = args[0];
if (!id || id.startsWith("--")) {
  console.error("Usage: node scripts/render-plan.mjs <composition> [--chunk 450] [--max 16] [--scale 1]");
  process.exit(1);
}
const perChunk = Math.max(30, Number(opt("chunk", "450")) || 450);
const maxChunks = Math.max(1, Number(opt("max", "16")) || 16);
const scale = Number(opt("scale", "1")) || 1;
const chrome = opt("chrome", process.env.REMOTION_CHROME ?? null);

const log = (...parts) => console.error(...parts);

log(`Bundling to measure ${id}…`);
const serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts"), publicDir: path.join(root, "public") });
const chromiumOptions = { gl: "swangle" };
const browser = await openBrowser("chrome", { browserExecutable: chrome, chromiumOptions });
let composition;
try {
  composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser, browserExecutable: chrome, chromiumOptions });
} catch (error) {
  log(`No composition "${id}": ${String(error?.message ?? error).split("\n")[0]}`);
  await browser.close({ silent: true });
  process.exit(1);
}
await browser.close({ silent: true });

const frames = composition.durationInFrames;
const count = frames <= perChunk * 2 ? 1 : Math.min(maxChunks, Math.ceil(frames / perChunk));
const include = [];
for (let i = 0; i < count; i++) {
  const from = Math.floor((i * frames) / count);
  const to = Math.floor(((i + 1) * frames) / count) - 1;
  include.push({ index: String(i).padStart(2, "0"), from, to });
}
// H.264 needs whole, even pixels, and Remotion fails in the middle of a render when a scale
// such as 0.667 gives 1280.64. Say so here, in seconds, not there, after minutes.
const width = composition.width * scale;
const height = composition.height * scale;
if (![width, height].every((n) => Number.isInteger(n) && n % 2 === 0)) {
  log(
    `Scale ${scale} turns ${composition.width}x${composition.height} into ${width}x${height}. ` +
      "Both sides must be whole, even numbers. Use 1, 0.75, 0.5 or 0.25.",
  );
  process.exit(1);
}

log(`${id}: ${frames} frames at ${composition.fps} fps (${(frames / composition.fps).toFixed(1)}s) → ${count} chunk${count === 1 ? "" : "s"}`);
const answer =
  [
    `matrix=${JSON.stringify({ include })}`,
    `chunks=${count}`,
    `frames=${frames}`,
    `fps=${composition.fps}`,
    `size=${width}x${height}`,
  ].join("\n") + "\n";
// Written to the file directly, not through a shell redirect: a first run also prints
// the browser download to stdout, and GitHub rejects an output file with stray lines.
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, answer);
process.stdout.write(answer);
process.exit(0);
