#!/usr/bin/env node
/**
 * Splits one composition into frame ranges, so a long film can be rendered by
 * several machines side by side and joined afterwards (.github/workflows/render.yml).
 *
 *   node scripts/render-plan.mjs in-this-town-monster-egg
 *   node scripts/render-plan.mjs the-hallway --chunk 270 --max 20 --scale 0.5
 *
 * Prints key=value lines, and inside GitHub Actions also appends them to $GITHUB_OUTPUT:
 *   matrix={"include":[{"index":"00","from":0,"to":264}, …]}
 *   chunks=20  frames=5300  fps=30  size=540x960
 *
 * A chunk is about nine seconds of film (--chunk 270 frames), and there are at most twenty
 * (--max 20): that is how many jobs a free GitHub account runs at once. A 20-second short
 * becomes three chunks, a three-minute film twenty.
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
  console.error("Usage: node scripts/render-plan.mjs <composition> [--chunk 270] [--max 20] [--scale 1]");
  process.exit(1);
}
const perChunk = Math.max(30, Number(opt("chunk", "270")) || 270);
const maxChunks = Math.max(1, Number(opt("max", "20")) || 20);
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
// THE THREE-MINUTE WALL (the owner, 2026-11-14: "add a strict rule, no over 3 minutes"). A vertical video over 3:00
// is not a YouTube Short. Such a film is not rendered at all: cut it or split it first.
if (composition.height > composition.width && frames / composition.fps > 180) {
  console.error(`${id} is ${(frames / composition.fps).toFixed(1)}s. STRICT RULE: no vertical film runs over three minutes (YouTube would not treat it as a Short). It will not be rendered. Cut lines (scripts/trim-narration.py) or split the story into parts.`);
  process.exit(1);
}
const count = Math.min(maxChunks, Math.ceil(frames / perChunk));
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
