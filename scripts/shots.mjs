#!/usr/bin/env node
/**
 * One still per shot of a story film. This is how a long film is reviewed:
 * 90 shots are 90 pictures, and each must be worth looking at on its own.
 *
 *   node scripts/shots.mjs in-this-town-monster-egg                  every shot, at its middle
 *   node scripts/shots.mjs in-this-town-monster-egg --only 3.,14.    only cues that start "3." or "14."
 *   node scripts/shots.mjs in-this-town-monster-egg --at 0.1,0.9     two stills a shot: is anything moving?
 *   node scripts/shots.mjs in-this-town-monster-egg --frames 0,45    exact film frames instead of shots
 *
 *   --scale 0.5         output size (1 = full 1080×1920). Default 0.5.
 *   --out out/shots     where the JPGs go. Default out/shots/<film>.
 *   --chrome /path      browser to use. Default: REMOTION_CHROME, else Remotion's own.
 *
 * It bundles once and reuses one browser, so a still costs seconds, not the
 * twenty a fresh `remotion still` takes. Rendering is permission-only on the
 * owner's machine (AGENTS.md §10); in a cloud sandbox it is the review tool.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const film = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1]?.startsWith("--") !== true) ?? args[0];
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback;
};

if (!film || film.startsWith("--")) {
  console.error("Usage: node scripts/shots.mjs <film> [--only 3.,4.] [--at 0.5] [--frames 0,45] [--scale 0.5] [--out dir]");
  process.exit(1);
}

const timingPath = path.join(root, "src", "videos", film, "timing.json");
if (!fs.existsSync(timingPath)) {
  console.error(`${film} has no timing.json. shots.mjs is for story films; use scripts/stills.mjs for the others.`);
  process.exit(1);
}
const timing = JSON.parse(fs.readFileSync(timingPath, "utf8"));
const fps = timing.fps ?? 30;
const scale = Number(opt("scale", "0.5"));
const outDir = path.resolve(root, opt("out", path.join("out", "shots", film)));
const only = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const fractions = opt("at", "0.5")
  .split(",")
  .map(Number)
  .filter((n) => Number.isFinite(n));
const chrome = opt("chrome", process.env.REMOTION_CHROME ?? null);

/** [{ frame, name }] */
const jobs = [];
const exact = opt("frames", "");
if (exact) {
  for (const value of exact.split(",")) {
    const frame = Number(value);
    if (Number.isFinite(frame)) jobs.push({ frame, name: `frame-${String(frame).padStart(5, "0")}` });
  }
} else {
  timing.cues.forEach((cue, index) => {
    if (only.length > 0 && !only.some((prefix) => cue.id.startsWith(prefix))) return;
    const first = Math.round(cue.start * fps);
    const last = Math.max(first, Math.round(cue.end * fps) - 1);
    fractions.forEach((fraction, k) => {
      const frame = Math.min(last, Math.max(first, Math.round(first + (last - first) * fraction)));
      const tag = fractions.length > 1 ? `-${String.fromCharCode(97 + k)}` : "";
      jobs.push({ frame, name: `${String(index + 1).padStart(2, "0")}-${cue.id.replace(/[^\w.-]/g, "_")}${tag}` });
    });
  });
}
if (jobs.length === 0) {
  console.error("Nothing to render: no cue matches.");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const started = Date.now();
console.log(`Bundling… (${jobs.length} still${jobs.length === 1 ? "" : "s"} of ${film}, scale ${scale})`);
const serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts"), publicDir: path.join(root, "public") });
const chromiumOptions = { gl: "swangle" };
const browser = await openBrowser("chrome", { browserExecutable: chrome, chromiumOptions });
const composition = await selectComposition({
  serveUrl,
  id: film,
  puppeteerInstance: browser,
  browserExecutable: chrome,
  chromiumOptions,
});

// A film in progress is shorter than its narration: do not render the shots that are not built.
const built = jobs.filter((job) => job.frame < composition.durationInFrames);
if (built.length < jobs.length) {
  console.log(`${jobs.length - built.length} shot(s) are past the end of the film so far (${composition.durationInFrames} frames) and were skipped.`);
}

let failed = 0;
for (const job of built) {
  const output = path.join(outDir, `${job.name}.jpg`);
  const t0 = Date.now();
  try {
    await renderStill({
      composition,
      serveUrl,
      output,
      frame: job.frame,
      imageFormat: "jpeg",
      jpegQuality: 82,
      scale,
      puppeteerInstance: browser,
      browserExecutable: chrome,
      chromiumOptions,
      logLevel: "error",
    });
    console.log(`${job.name}  frame ${job.frame}  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  } catch (error) {
    failed++;
    console.error(`${job.name}  frame ${job.frame}  FAILED: ${String(error?.message ?? error).split("\n")[0]}`);
  }
}
await browser.close({ silent: true });
console.log(`\n${built.length - failed}/${built.length} stills in ${path.relative(root, outDir)} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
process.exit(failed > 0 ? 1 : 0);
