import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { TARGET_SHORTS } from "./lib/schema.mjs";
import { validateDesktopDir } from "./verify-deliverables.mjs";

const TMP_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "e2e-desktop-"));
after(() => {
  fs.rmSync(TMP_ROOT, { recursive: true, force: true });
});

const FIX_VALID = path.join(TMP_ROOT, "valid-1080x1920.mp4");
const FIX_NO_AUDIO = path.join(TMP_ROOT, "video-only.mp4");
const FIX_LANDSCAPE = path.join(TMP_ROOT, "landscape-1920x1080.mp4");
const FIX_ZERO_BYTE = path.join(TMP_ROOT, "zero-byte.mp4");
const FIX_TRUNCATED = path.join(TMP_ROOT, "truncated.mp4");
const SYNTH_REPO = path.join(TMP_ROOT, "synth-repo");

// Build shared synthetic fixtures once (< 2s total)
execFileSync(
  "ffmpeg",
  [
    "-y", "-v", "error",
    "-f", "lavfi", "-i", "testsrc2=size=1080x1920:rate=30:duration=1.5",
    "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=44100:duration=1.5",
    "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-shortest",
    FIX_VALID,
  ],
  { stdio: "pipe" },
);
execFileSync(
  "ffmpeg",
  [
    "-y", "-v", "error",
    "-f", "lavfi", "-i", "testsrc2=size=1080x1920:rate=30:duration=1.5",
    "-an", "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
    FIX_NO_AUDIO,
  ],
  { stdio: "pipe" },
);
execFileSync(
  "ffmpeg",
  [
    "-y", "-v", "error",
    "-f", "lavfi", "-i", "testsrc2=size=1920x1080:rate=30:duration=1.5",
    "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=44100:duration=1.5",
    "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-shortest",
    FIX_LANDSCAPE,
  ],
  { stdio: "pipe" },
);
fs.writeFileSync(FIX_ZERO_BYTE, Buffer.alloc(0));
fs.writeFileSync(FIX_TRUNCATED, fs.readFileSync(FIX_VALID).subarray(0, 128));

for (const slug of TARGET_SHORTS) {
  const dir = path.join(SYNTH_REPO, "src", "videos", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "timing.json"), JSON.stringify({ fps: 30, duration: 1.5, cues: [] }));
}

function makeDeliveryDir(name) {
  const dir = path.join(TMP_ROOT, name);
  fs.mkdirSync(dir, { recursive: true });
  for (const slug of TARGET_SHORTS) {
    fs.copyFileSync(FIX_VALID, path.join(dir, `${slug}.mp4`));
  }
  return dir;
}

test("F12.1 — Happy path baseline: 5 valid 1080x1920@30fps h264+aac MP4s pass", () => {
  const dir = makeDeliveryDir("case-happy");
  const res = validateDesktopDir(dir, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(res.ok, true, res.errors.join("\n"));
});

test("F12.2 — Rejects chunk-*, .mov, .zip, and .part artifacts", () => {
  for (const [idx, artifact] of ["chunk-00.mp4", "chunk-01.mov", "deliverable.zip", "render.mp4.part"].entries()) {
    const dir = makeDeliveryDir(`case-artifact-${idx}`);
    fs.writeFileSync(path.join(dir, artifact), "bad");
    const res = validateDesktopDir(dir, {
      repoRoot: SYNTH_REPO,
      skipPythonChecks: true,
      skipSheets: true,
    });
    assert.equal(res.ok, false);
    assert.ok(
      res.errors.some((e) => e.includes(artifact)),
      `Expected error mentioning ${artifact}, got ${JSON.stringify(res.errors)}`,
    );
  }
});

test("F12.3 — Rejects video-only MP4 missing audio stream", () => {
  const dir = makeDeliveryDir("case-no-audio");
  fs.copyFileSync(FIX_NO_AUDIO, path.join(dir, "in-this-town-nobody-has-ever-slept.mp4"));
  const res = validateDesktopDir(dir, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(res.ok, false);
  assert.match(res.errors.join("\n"), /missing audio stream/i);
});

test("F12.4 — Rejects 1920x1080 landscape MP4", () => {
  const dir = makeDeliveryDir("case-landscape");
  fs.copyFileSync(FIX_LANDSCAPE, path.join(dir, "in-this-town-we-live-at-the-bottom.mp4"));
  const res = validateDesktopDir(dir, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(res.ok, false);
  assert.match(res.errors.join("\n"), /1920x1080/);
});

test("F12.5 — Rejects 0-byte, truncated, and duration-mismatched MP4s vs timing.json", () => {
  const dirZero = makeDeliveryDir("case-zero");
  fs.copyFileSync(FIX_ZERO_BYTE, path.join(dirZero, "inflation-explained-using-minecraft.mp4"));
  const resZero = validateDesktopDir(dirZero, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(resZero.ok, false);
  assert.match(resZero.errors.join("\n"), /0-byte empty MP4/);

  const dirTrunc = makeDeliveryDir("case-trunc");
  fs.copyFileSync(FIX_TRUNCATED, path.join(dirTrunc, "inflation-explained-using-minecraft.mp4"));
  const resTrunc = validateDesktopDir(dirTrunc, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(resTrunc.ok, false);

  const dirMismatch = makeDeliveryDir("case-mismatch");
  const repoMismatch = path.join(TMP_ROOT, "synth-repo-mismatch");
  fs.cpSync(SYNTH_REPO, repoMismatch, { recursive: true });
  fs.writeFileSync(
    path.join(repoMismatch, "src/videos/inflation-explained-using-minecraft/timing.json"),
    JSON.stringify({ fps: 30, duration: 4.0, cues: [] }),
  );
  const resMismatch = validateDesktopDir(dirMismatch, {
    repoRoot: repoMismatch,
    durationToleranceSec: 1.0,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(resMismatch.ok, false);
  assert.match(resMismatch.errors.join("\n"), /differs from timing\.json/);
});

test("F12.6 — Rejects missing required target Short", () => {
  const dir = makeDeliveryDir("case-missing");
  fs.rmSync(path.join(dir, "in-this-town-nobody-turns-on-a-furnace.mp4"));
  const res = validateDesktopDir(dir, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(res.ok, false);
  assert.match(res.errors.join("\n"), /Missing required target Short.*furnace/);
});

test("F12.7 — Rejects presence of a ServerLore MP4", () => {
  const dir = makeDeliveryDir("case-serverlore");
  fs.copyFileSync(FIX_VALID, path.join(dir, "the-player-who-only-logged-on-at-3am-server-lore.mp4"));
  const res = validateDesktopDir(dir, {
    repoRoot: SYNTH_REPO,
    skipPythonChecks: true,
    skipSheets: true,
  });
  assert.equal(res.ok, false);
  assert.match(res.errors.join("\n"), /Unexpected ServerLore MP4 forbidden by R3/);
});
