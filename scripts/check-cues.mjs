#!/usr/bin/env node
/**
 * Load a film's scenes in plain Node and build every shot list, with no browser.
 *
 *   node scripts/check-cues.mjs <slug>     one film
 *   node scripts/check-cues.mjs --all      every film that has scenes
 *
 * `npm run check` reads files; it cannot run them. So a scene can pass every lint and still
 * throw the moment Remotion loads it. `wordAt("3.week", "best-informed")` on a line whose
 * voice says "bestinformed" passed the whole contract and then failed the render at the
 * plan step — after a push, a queue and a Chrome download. This runs the module instead: a
 * bad cue, a word the voice never says, or `cut` arithmetic that does not add up throws
 * here, in about a second.
 *
 * No Chrome and no network: esbuild transpiles the TSX and the JSX stays lazy, so the
 * renderer never starts. Texture builders want a 2D canvas, so there is a stub for it.
 */
import esbuild from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/check-cues.mjs <slug> | --all");
  process.exit(2);
}

async function buildOne(slug) {
  const dir = path.join("src", "videos", slug);
  const scenes = fs
    .readdirSync(dir)
    .filter((f) => /^scene\d+\.tsx$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  const entry = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "cues-")), "entry.tsx");
  fs.writeFileSync(
    entry,
    scenes.map((f) => `export { ${f.replace(/\.tsx$/, "")} } from ${JSON.stringify(path.resolve(dir, f))};`).join("\n"),
  );
  const outfile = path.join(path.resolve("."), ".scratch", `cues-${slug}.mjs`);
  fs.mkdirSync(path.dirname(outfile), { recursive: true });
  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    loader: { ".json": "json", ".tsx": "tsx", ".ts": "ts" },
    jsx: "automatic",
    external: ["react", "react/jsx-runtime", "three", "@react-three/fiber", "remotion", "react-dom"],
    logLevel: "error",
  });

  // Texture builders run at module load and want a 2D canvas. None of it is used to BUILD a
  // shot list, so a canvas that swallows every call is enough.
  const ctx2d = new Proxy(
    {},
    { get: (_t, k) => (k === "canvas" ? { width: 1, height: 1 } : () => ctx2d), set: () => true },
  );
  globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ctx2d, style: {} }) };
  const mod = await import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
  fs.rmSync(outfile, { force: true });

  let shots = 0;
  let seconds = 0;
  for (const scene of Object.values(mod)) {
    shots += scene.shots.length;
    seconds += scene.duration;
  }
  return { scenes: Object.keys(mod).length, shots, seconds };
}

if (arg === "--all") {
  // A film that exists on disk but is not in src/registry.ts cannot be rendered at all: Remotion reports
  // "Could not find composition" twenty minutes later, at the plan step. Film four spent a whole render pass
  // in that state. This is the cheapest place in the pipeline to notice.
  const registry = fs.readFileSync(path.join("src", "registry.ts"), "utf8");
  const unregistered = fs
    .readdirSync(path.join("src", "videos"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join("src", "videos", e.name, "film.tsx")))
    .map((e) => e.name)
    .filter((slug) => !registry.includes(`videos/${slug}/film`));
  for (const slug of unregistered) {
    process.stdout.write(`${slug.padEnd(58)} NOT IN src/registry.ts — it cannot render\n`);
  }
  if (unregistered.length > 0) process.exitCode = 1;

  const slugs = fs
    .readdirSync(path.join("src", "videos"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join("src", "videos", e.name, "film.tsx")))
    .filter((e) => fs.readdirSync(path.join("src", "videos", e.name)).some((f) => /^scene\d+\.tsx$/.test(f)))
    .map((e) => e.name);
  let failed = 0;
  for (const slug of slugs) {
    try {
      const r = execFileSync(process.execPath, [process.argv[1], slug], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      process.stdout.write(`${slug.padEnd(58)} ${r.trim()}\n`);
    } catch (error) {
      failed++;
      const why = String(error.stderr ?? error.message)
        .split("\n")
        .filter((l) => l.trim() && !l.includes("THREE_CJS") && !l.includes("trace-deprecation"))
        .slice(0, 4)
        .join("\n    ");
      process.stdout.write(`${slug.padEnd(58)} FAILED\n    ${why}\n`);
    }
  }
  process.stdout.write(
    `\n${failed === 0 ? "OK — every film builds its shot lists." : `${failed} film(s) cannot build their scenes.`}\n`,
  );
  if (failed > 0) process.exitCode = 1;
}

const r = await buildOne(arg);
process.stdout.write(`${r.shots} shots across ${r.scenes} scenes, ${r.seconds.toFixed(2)}s\n`);
