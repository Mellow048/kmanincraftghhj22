#!/usr/bin/env node
/**
 * Freeze/verify the actual live Monster Egg implementation into source/.
 * Run from the repository root: node 'Topics/InThisTown/reference#1/freeze-source.mjs'
 * Run with --check in CI or after edits to catch drift from the published MP4.
 *
 * Snapshot paths stay repository-relative: copying source/src, source/Topics,
 * and source/public into a matching checkout reconstructs the registered film.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const reference = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(reference, "../../..");
const snapshot = path.join(reference, "source");
const check = process.argv.includes("--check");
const filmDir = "src/videos/in-this-town-monster-egg";
const audioDir = "public/audio/in-this-town-monster-egg";
const mapsDir = "Topics/InThisTown/maps";
const files = [
  ".github/workflows/render.yml",
  ".github/workflows/stills.yml",
  "src/engine/Look.tsx",
  "src/engine/defineFilm.tsx",
  "src/engine/types.ts",
  "src/registry.ts",
  ...fs.readdirSync(path.join(root, filmDir)).filter((f) => f.endsWith(".tsx")).map((f) => `${filmDir}/${f}`),
  "Topics/InThisTown/README.md",
  "Topics/InThisTown/creatures.tsx",
  ...fs.readdirSync(path.join(root, mapsDir)).filter((f) => /\.(tsx?|md)$/.test(f)).map((f) => `${mapsDir}/${f}`),
  "Topics/InThisTown/reference#1/audio/make-bed.py",
  ...fs.readdirSync(path.join(root, audioDir)).filter((f) => f.endsWith(".mp3")).map((f) => `${audioDir}/${f}`),
].sort();

const manifest = {};
const problems = [];
for (const relative of files) {
  const live = path.join(root, relative);
  const frozen = path.join(snapshot, relative);
  const data = fs.readFileSync(live);
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  manifest[relative] = hash;
  if (check) {
    if (!fs.existsSync(frozen)) {
      problems.push(`Missing snapshot: ${relative}`);
    } else if (!data.equals(fs.readFileSync(frozen))) {
      problems.push(`Snapshot differs from live: ${relative}`);
    }
  } else {
    fs.mkdirSync(path.dirname(frozen), { recursive: true });
    fs.writeFileSync(frozen, data);
  }
}

const manifestPath = path.join(snapshot, "manifest.json");
const expectedManifest = `${JSON.stringify({ files: manifest }, null, 2)}\n`;
if (check) {
  if (!fs.existsSync(manifestPath) || fs.readFileSync(manifestPath, "utf8") !== expectedManifest) {
    problems.push("manifest.json is missing or differs from the live file hashes");
  }
  const listed = new Set(files);
  const walk = (dir, prefix = "") => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relative = path.posix.join(prefix, entry.name);
      if (entry.isDirectory()) walk(path.join(dir, entry.name), relative);
      else if (relative !== "README.md" && relative !== "manifest.json" && !listed.has(relative)) {
        problems.push(`Stale snapshot file: ${relative}`);
      }
    }
  };
  if (fs.existsSync(snapshot)) walk(snapshot);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log(`PASS — all ${files.length} snapshot files match the registered film`);
} else {
  fs.writeFileSync(manifestPath, expectedManifest);
  console.log(`Frozen ${files.length} repository-relative files to ${path.relative(root, snapshot)}`);
}
