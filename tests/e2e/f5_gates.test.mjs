import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { createTempWorkspace, writeSyntheticStoryFilm } from "./lib/fixtures.mjs";
import {
  validateDirectionReportSchema,
  validateSoundLockSchema,
  validateTimingSchema,
} from "./lib/schema.mjs";
import { directionReport } from "../../scripts/direction-report.mjs";
import { checkStoryFilm, loadTopic } from "../../scripts/check-story-film.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";

test("F5.T1 — tsconfig.json isolates tests/ and excludes Topics/**/template", () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "tsconfig.json"), "utf8"));
  assert.equal(tsconfig.include.includes("tests"), false, "tests/ must NOT be in tsconfig.json include");
  assert.equal(
    tsconfig.exclude.some((p) => p.includes("Topics/**/template")),
    true,
    "Topics/**/template must be excluded in tsconfig.json",
  );
  const res = spawnSync("npx", ["tsc", "--noEmit"], { cwd: REPO_ROOT, encoding: "utf8" });
  assert.equal(res.status, 0, `tsc --noEmit failed:\n${res.stdout}\n${res.stderr}`);
});

test("F5.T2 — directionReport() returns valid schema on complete aligned fixture", () => {
  const words = [{ w: "Hello.", s: 0.1, e: 0.5 }];
  const timing = {
    fps: 30,
    duration: 1,
    audio: "audio/test/narration.mp3",
    estimated: false,
    wordTiming: "aligned",
    clips: [{ name: "hook", timing: "aligned" }],
    cues: [{ id: "1.me", start: 0, end: 1, text: "Hello." }],
    words,
  };
  const film = {
    fps: 30,
    id: "test",
    scenes: [
      {
        id: "scene1",
        duration: 1,
        shots: [{ cue: "1.me", at: 0, dur: 1, from: [0, 1, 4], to: [0, 1, 2.5], target: [0, 1, 0] }],
        sampleStage: (_i, t) => createElement("group", { position: [t, 0, 0] }),
      },
    ],
    captions: { words, motion: "on-beat" },
    audio: { src: "audio/test/mix.mp3" },
    post: { shaders: true },
  };
  const report = directionReport(film, timing, { film: { captions: true }, sound: { required: true } });
  const schema = validateDirectionReportSchema(report);
  assert.equal(schema.ok, true, schema.errors.join("; "));
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.unfinished, []);
});

test("F5.T3 — timing.json and sound.lock.json schema & hash integrity", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f5-schema-" });
  try {
    const slug = "schema-valid-short";
    const { filmDir } = writeSyntheticStoryFilm(ws.root, slug);
    const timing = JSON.parse(fs.readFileSync(path.join(filmDir, "timing.json"), "utf8"));
    const lock = JSON.parse(fs.readFileSync(path.join(filmDir, "sound.lock.json"), "utf8"));
    const tCheck = validateTimingSchema(timing, { requireAligned: true });
    const lCheck = validateSoundLockSchema(lock);
    assert.equal(tCheck.ok, true, tCheck.errors.join("; "));
    assert.equal(lCheck.ok, true, lCheck.errors.join("; "));
  } finally {
    ws.cleanup();
  }
});

test("F5.T4 — rehearse --final passes on temp aligned fixture", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f5-rehearse-" });
  try {
    const slug = "rehearse-pass-short";
    writeSyntheticStoryFilm(ws.root, slug);
    const res = spawnSync(process.execPath, [path.join(ws.root, "scripts", "rehearse.mjs"), slug, "--final"], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.equal(res.status, 0, `Expected rehearse --final exit 0, got ${res.status}\n${res.stdout}\n${res.stderr}`);
    assert.match(res.stdout, /Delivery preflight passed/);
  } finally {
    ws.cleanup();
  }
});

test("F5.T5 — Python pipeline alignment & lock checks pass via direct invocation", () => {
  const res = spawnSync("python3", [path.join(REPO_ROOT, "tests/e2e/f5_pipeline.py")], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  assert.equal(res.status, 0, `f5_pipeline.py failed:\n${res.stdout}\n${res.stderr}`);
});

test("F5.T6 — shots.mjs / stills.mjs support REMOTION_CHROME and --gl=angle (framework gate)", () => {
  const shotsSrc = fs.readFileSync(path.join(REPO_ROOT, "scripts/shots.mjs"), "utf8");
  const stillsSrc = fs.readFileSync(path.join(REPO_ROOT, "scripts/stills.mjs"), "utf8");
  assert.match(shotsSrc, /REMOTION_CHROME/, "shots.mjs must support REMOTION_CHROME");

  if (MODE === "framework") {
    assert.match(shotsSrc, /--gl|gl:\s*(?:opt\(|gl\b)/, "shots.mjs must support --gl option (e.g., angle)");
    assert.doesNotMatch(
      shotsSrc,
      /const chromiumOptions = \{\s*gl:\s*"swangle"\s*\};/,
      "shots.mjs must not hardcode gl: 'swangle' without --gl override",
    );
    assert.match(stillsSrc, /REMOTION_CHROME/, "stills.mjs must support REMOTION_CHROME");
    assert.match(stillsSrc, /--gl/, "stills.mjs must support configurable --gl renderer");
  }
});

test("F5.N1 — Rejects estimated: true timing on rehearse --final", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f5-est-" });
  try {
    const slug = "estimated-short";
    writeSyntheticStoryFilm(ws.root, slug, { estimated: true });
    const res = spawnSync(process.execPath, [path.join(ws.root, "scripts", "rehearse.mjs"), slug, "--final"], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.equal(res.status, 1);
    assert.match(res.stdout + res.stderr, /DRAFT:\s*No fully aligned/);
  } finally {
    ws.cleanup();
  }
});

test("F5.N2 — Rejects corrupt or stale sound.lock.json via checkStoryFilm()", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f5-lock-" });
  try {
    const topic = loadTopic(ws.root, "in-this-town");
    for (const [slug, opts] of [
      ["corrupt-lock-short", { corruptLock: true }],
      ["stale-lock-short", { staleSoundJson: true }],
    ]) {
      const { filmDir } = writeSyntheticStoryFilm(ws.root, slug, opts);
      const filmSrc = fs.readFileSync(path.join(filmDir, "film.tsx"), "utf8");
      const fails = [];
      checkStoryFilm({
        root: ws.root,
        slug,
        dir: filmDir,
        film: filmSrc,
        topic,
        fail: (m) => fails.push(m),
        info: () => {},
        TWO_D: /<(div|img|video|canvas|AbsoluteFill)\b/i,
        BANNED_PHRASES: [],
      });
      assert.ok(
        fails.some((m) => /sound\.lock\.json|out of date/i.test(m)),
        `Expected sound.lock.json failure for ${slug}, got: ${JSON.stringify(fails)}`,
      );
    }
  } finally {
    ws.cleanup();
  }
});

test("F5.N3 — Rejects missing audio asset on disk via rehearse --final", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f5-audio-" });
  try {
    const slug = "missing-audio-short";
    writeSyntheticStoryFilm(ws.root, slug, { missingAudio: true });
    const res = spawnSync(process.execPath, [path.join(ws.root, "scripts", "rehearse.mjs"), slug, "--final"], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.equal(res.status, 1);
    assert.match(res.stdout + res.stderr, /DRAFT:\s*Missing audio asset|No fully aligned/);
  } finally {
    ws.cleanup();
  }
});
