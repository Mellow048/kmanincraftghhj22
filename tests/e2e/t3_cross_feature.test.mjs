import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { bundleExports, installDomCanvasStub, renderHookedElement, setShimClock } from "./lib/bundle.mjs";
import { checkCaptionsSafeZone, makePerspectiveCamera, projectBox3Corners } from "./lib/camera-checks.mjs";
import { extractBoxes } from "./lib/geometry.mjs";
import { createTempWorkspace, writeSyntheticStoryFilm } from "./lib/fixtures.mjs";
import { TARGET_SHORTS, findUnexpectedServerLoreMp4s, validateTimingSchema } from "./lib/schema.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";
const TARGET_ARG = process.env.E2E_TARGET || "";
const WITH_STILLS = process.env.E2E_WITH_STILLS === "1";

function synthSpeechLikeMp3(outMp3Path, words, durationSec) {
  fs.mkdirSync(path.dirname(outMp3Path), { recursive: true });
  const wavPath = outMp3Path.replace(/\.mp3$/i, ".wav");
  const wordsJson = JSON.stringify(words);
  const py = `
import json, wave, numpy as np
sr = 44100
dur = ${durationSec}
n = int(round(dur * sr))
t = np.arange(n) / sr
y = np.zeros(n, dtype=np.float64)
words = json.loads(${JSON.stringify(wordsJson)})
for w in words:
    a, b = int(w["s"] * sr), min(n, int(w["e"] * sr))
    if b <= a: continue
    lt = np.arange(b - a) / sr
    sig = 0.55 * np.sin(2 * np.pi * 190 * lt) + 0.30 * np.sin(2 * np.pi * 380 * lt) + 0.15 * np.sin(2 * np.pi * 620 * lt)
    fade = min(400, (b - a) // 4)
    if fade > 1:
        sig[:fade] *= np.linspace(0, 1, fade)
        sig[-fade:] *= np.linspace(1, 0, fade)
    y[a:b] += sig * 0.6
pcm = np.clip(y * 32767.0, -32768, 32767).astype("<i2")
with wave.open(${JSON.stringify(wavPath)}, "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(sr)
    wf.writeframes(pcm.tobytes())
`;
  const r1 = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  assert.equal(r1.status, 0, `Python speech synth failed: ${r1.stderr}`);
  const r2 = spawnSync(
    "ffmpeg",
    ["-y", "-v", "error", "-i", wavPath, "-af", "loudnorm=I=-14.5:TP=-1.0:LRA=7", "-b:a", "192k", outMp3Path],
    { encoding: "utf8" },
  );
  assert.equal(r2.status, 0, `ffmpeg encode failed: ${r2.stderr}`);
  fs.rmSync(wavPath, { force: true });
}

function measureWavSliceDbfs(wavPath, startSec, endSec) {
  const py = `
import math, wave, numpy as np
with wave.open(${JSON.stringify(wavPath)}, "rb") as wf:
    sr = wf.getframerate()
    ch = wf.getnchannels()
    raw = wf.readframes(wf.getnframes())
arr = np.frombuffer(raw, dtype="<i2").astype(np.float64) / 32768.0
if ch > 1:
    arr = arr.reshape(-1, ch).mean(axis=1)
a = max(0, int(${startSec} * sr))
b = min(len(arr), int(${endSec} * sr))
seg = arr[a:b]
rms = math.sqrt(float(np.mean(seg ** 2))) if len(seg) else 0.0
db = 20.0 * math.log10(max(rms, 1e-12))
print(f"{db:.2f}")
`;
  const r = spawnSync("python3", ["-c", py], { encoding: "utf8" });
  assert.equal(r.status, 0, `measureWavSliceDbfs failed: ${r.stderr}`);
  return Number(r.stdout.trim());
}

test("T3.COMBO1.SELF — Audio + Timing + sound.py + rehearse --final integration on synthetic aligned fixture", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-t3-c1-" });
  try {
    const slug = "combo1-aligned-short";
    const { timing, narrationMp3 } = writeSyntheticStoryFilm(ws.root, slug, { includeSoundLock: false });
    synthSpeechLikeMp3(narrationMp3, timing.words, timing.duration);

    const bRes = spawnSync("python3", [path.join(ws.root, "scripts", "sound.py"), "build", slug], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.equal(bRes.status, 0, `sound.py build failed:\n${bRes.stdout}\n${bRes.stderr}`);

    const cRes = spawnSync("python3", [path.join(ws.root, "scripts", "sound.py"), "check", slug], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.equal(cRes.status, 0, `sound.py check failed:\n${cRes.stdout}\n${cRes.stderr}`);

    const rRes = spawnSync(
      process.execPath,
      [path.join(ws.root, "scripts", "rehearse.mjs"), slug, "--final"],
      { cwd: ws.root, encoding: "utf8" },
    );
    assert.equal(rRes.status, 0, `rehearse --final failed:\n${rRes.stdout}\n${rRes.stderr}`);
    assert.match(rRes.stdout, /Delivery preflight passed/);
  } finally {
    ws.cleanup();
  }
});

test("T3.COMBO2 — ServerLore multi-track sound.py (up_happy <-> up_sad + none breath) + ServerChatBox vs Captions 9:16 safe-zone (no render)", async () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-t3-c2-" });
  const restoreDoc = installDomCanvasStub();
  try {
    const slug = "combo2-server-lore";
    const filmDir = path.join(ws.root, "src", "videos", slug);
    const audioDir = path.join(ws.root, "public", "audio", slug);
    fs.mkdirSync(filmDir, { recursive: true });
    fs.mkdirSync(audioDir, { recursive: true });

    const cues = [
      { id: "1.hook", start: 0.0, end: 3.0, text: "At three AM the server woke up." },
      { id: "2.mock", start: 3.0, end: 6.0, text: "Everyone laughed at his empty chest." },
      { id: "3.irl", start: 6.0, end: 9.0, text: "Across town his room was dark." },
      { id: "4.clue", start: 9.0, end: 11.0, text: "Then silence fell." },
      { id: "4.rally", start: 11.0, end: 14.0, text: "The owner lit every redstone lamp." },
      { id: "5.cta", start: 14.0, end: 17.0, text: "Subscribe for the next server mystery." },
    ];
    const words = [];
    for (const c of cues) {
      const tokens = c.text.split(/\s+/);
      const step = (c.end - c.start - 0.25) / tokens.length;
      tokens.forEach((w, idx) => {
        const s = Number((c.start + 0.08 + idx * step).toFixed(3));
        const e = Number((s + step * 0.72).toFixed(3));
        words.push({ w, s, e });
      });
    }
    const timing = {
      fps: 30,
      duration: 17.0,
      audio: `audio/${slug}/narration.mp3`,
      estimated: false,
      wordTiming: "aligned",
      wordsPerMinute: 190,
      clips: [{ name: "full", timing: "aligned" }],
      cues,
      words,
    };
    fs.writeFileSync(path.join(filmDir, "timing.json"), JSON.stringify(timing, null, 2));
    fs.writeFileSync(
      path.join(filmDir, "film.tsx"),
      `export const film = { id: "${slug}", topic: "server-lore" };\n`,
    );

    const narrationMp3 = path.join(audioDir, "narration.mp3");
    synthSpeechLikeMp3(narrationMp3, words, timing.duration);

    const soundSheet = {
      film: slug,
      music: {
        track: "Topics/ServerLore/up_happy.m4a",
        gain: -14,
        sections: [
          { from: "1.hook", mood: "warm", track: "Topics/ServerLore/up_happy.m4a" },
          { from: "3.irl", mood: "hollow", track: "Topics/ServerLore/up_sad.m4a" },
          { from: "4.clue", mood: "none" },
          { from: "4.rally", mood: "warm", track: "Topics/ServerLore/up_happy.m4a" },
          { from: "5.cta", mood: "triumph", track: "Topics/ServerLore/up_happy.m4a" },
        ],
      },
      beds: [
        { from: "1.hook", to: "2.mock", bed: "village" },
        { from: "3.irl", to: "4.clue", bed: "room" },
        { from: "4.rally", to: "5.cta", bed: "village" },
      ],
      sfx: [
        { cue: "1.hook", sfx: "pop" },
        { cue: "2.mock", sfx: "whoosh" },
        { cue: "3.irl", sfx: "click" },
        { cue: "4.clue", sfx: "thud" },
        { cue: "4.rally", sfx: "ding" },
        { cue: "4.rally", at: 1.5, sfx: "pop" },
        { cue: "5.cta", sfx: "ding" },
        { cue: "5.cta", at: 1.5, sfx: "pop" },
      ],
    };
    fs.writeFileSync(path.join(filmDir, "sound.json"), JSON.stringify(soundSheet, null, 2));

    const bRes = spawnSync(
      "python3",
      [path.join(ws.root, "scripts", "sound.py"), "build", slug, "--stems"],
      { cwd: ws.root, encoding: "utf8" },
    );
    assert.equal(bRes.status, 0, `ServerLore sound.py build --stems failed:\n${bRes.stdout}\n${bRes.stderr}`);

    const cRes = spawnSync(
      "python3",
      [path.join(ws.root, "scripts", "sound.py"), "check", slug],
      { cwd: ws.root, encoding: "utf8" },
    );
    assert.equal(cRes.status, 0, `ServerLore sound.py check failed:\n${cRes.stdout}\n${cRes.stderr}`);

    const lock = JSON.parse(fs.readFileSync(path.join(filmDir, "sound.lock.json"), "utf8"));
    assert.deepEqual(lock.failures, []);
    const trackPaths = (lock.music_files ?? []).map((f) => f.path);
    assert.ok(trackPaths.includes("Topics/ServerLore/up_happy.m4a"), "music_files must include up_happy.m4a");
    assert.ok(trackPaths.includes("Topics/ServerLore/up_sad.m4a"), "music_files must include up_sad.m4a");
    assert.ok(lock.measured.secondsWithoutMusic >= 1.0 && lock.measured.secondsWithoutMusic <= 6.0);
    assert.ok(lock.measured.musicUnderVoiceDb >= 11 && lock.measured.musicUnderVoiceDb <= 22);
    assert.ok(lock.measured.voiceOverRestWorstDb >= 3.0);
    assert.ok(lock.measured.lufs >= -16.5 && lock.measured.lufs <= -13.0);

    // Check music stem RMS drops during "none" breath (9.6..10.4s) and recovers in 4.rally (11.8..13.5s)
    const musicWav = path.join(ws.root, "out", "sound", slug, "music.wav");
    assert.equal(fs.existsSync(musicWav), true);
    const silentDb = measureWavSliceDbfs(musicWav, 9.6, 10.4);
    const rallyDb = measureWavSliceDbfs(musicWav, 11.8, 13.5);
    assert.ok(silentDb < -45, `Expected silence (< -45 dBFS) during 'none' section, got ${silentDb} dBFS`);
    assert.ok(rallyDb > -38 && rallyDb > silentDb + 15, `Expected music recovery in 4.rally, got ${rallyDb} dBFS`);

    // 2) ServerChatBox + Captions (y=0.67) 9:16 safe-zone projection
    const mod = await bundleExports(
      REPO_ROOT,
      `export { ServerChatBox } from "./Topics/ServerLore/props";
       export { cam } from "./src/engine/cam";`,
      { withShims: true, cacheKey: "t3-serverlore-ui" },
    );
    setShimClock({ frame: 15, fps: 30 });
    const chatPos = [0, 2.35, -0.8];
    const chatTree = await renderHookedElement(
      createElement(mod.ServerChatBox, {
        position: chatPos,
        lines: [
          { sender: "Alex", text: "Why at 3 AM?" },
          { sender: "Noah", text: "Wait for me" },
        ],
      }),
    );
    const boxes = extractBoxes(chatTree, { includePlanes: true });
    assert.ok(boxes.length >= 1);
    let min = [Infinity, Infinity, Infinity];
    let max = [-Infinity, -Infinity, -Infinity];
    for (const b of boxes) {
      for (let k = 0; k < 3; k++) {
        min[k] = Math.min(min[k], b.min[k]);
        max[k] = Math.max(max[k], b.max[k]);
      }
    }
    const shot = {
      dur: 2.0,
      ...mod.cam.push({
        on: [0, 1.5, -0.8],
        dist: 4.8,
        to: 3.6,
        fov: 42,
        screenOffset: [0, 0.04],
      }),
    };
    const cam = makePerspectiveCamera(shot, 1.0, 9 / 16);
    const ndcBox = projectBox3Corners(cam, min, max);
    const zoneCheck = checkCaptionsSafeZone(ndcBox, { minBottomNdcY: -0.2, maxMarginX: 0.92 });
    assert.equal(zoneCheck.ok, true, `ServerChatBox overlaps 9:16 margins/Captions: ${zoneCheck.issues.join("; ")}`);

    // Guarantee zero ServerLore MP4s were created anywhere
    assert.deepEqual(findUnexpectedServerLoreMp4s(REPO_ROOT, [ws.root]), []);
  } finally {
    restoreDoc();
    ws.cleanup();
  }
});

if (MODE === "target" || MODE === "all") {
  const targets = MODE === "target" && TARGET_ARG ? [TARGET_ARG] : TARGET_SHORTS;
  for (const slug of targets) {
    test(`T3.COMBO1.LIVE [${slug}] — Aligned timing + sound.py check + rehearse --final${WITH_STILLS ? " + shots.mjs hook stills" : ""}`, () => {
      const timing = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "src/videos", slug, "timing.json"), "utf8"));
      const tSchema = validateTimingSchema(timing, { requireAligned: true });
      assert.equal(tSchema.ok, true, `${slug} timing invalid: ${tSchema.errors.join("; ")}`);

      const sCheck = spawnSync("python3", ["scripts/sound.py", "check", slug], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      });
      assert.equal(sCheck.status, 0, `sound.py check failed for ${slug}:\n${sCheck.stdout}\n${sCheck.stderr}`);

      const rCheck = spawnSync(process.execPath, ["scripts/rehearse.mjs", slug, "--final"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      });
      assert.equal(rCheck.status, 0, `rehearse --final failed for ${slug}:\n${rCheck.stdout}\n${rCheck.stderr}`);

      if (WITH_STILLS && process.env.REMOTION_CHROME) {
        const outDir = fs.mkdtempSync(path.join("/tmp", `e2e-stills-${slug}-`));
        try {
          const st = spawnSync(
            process.execPath,
            ["scripts/shots.mjs", slug, "--only", "1.", "--at", "0.1,0.9", "--out", outDir],
            { cwd: REPO_ROOT, encoding: "utf8" },
          );
          assert.equal(st.status, 0, `shots.mjs failed:\n${st.stdout}\n${st.stderr}`);
          const jpgs = fs.readdirSync(outDir).filter((f) => f.endsWith(".jpg"));
          assert.ok(jpgs.length >= 2, `Expected >= 2 hook stills, got ${jpgs.length}`);
        } finally {
          fs.rmSync(outDir, { recursive: true, force: true });
        }
      }
    });
  }
}
