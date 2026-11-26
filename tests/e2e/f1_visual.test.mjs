import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import * as THREE from "three";
import {
  bundleExports,
  installDomCanvasStub,
  renderHookedElement,
  setShimClock,
} from "./lib/bundle.mjs";
import { createTempWorkspace, writeSyntheticStoryFilm } from "./lib/fixtures.mjs";
import { directionReport } from "../../scripts/direction-report.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("F1.T1 — LOOKS exports all 17 presets including overworld-golden", async () => {
  const mod = await bundleExports(REPO_ROOT, `export { LOOKS } from "./src/engine/Look";`, {
    withShims: true,
    cacheKey: "f1-looks",
  });
  const keys = Object.keys(mod.LOOKS);
  assert.equal(keys.length, 17, `Expected 17 LOOKS presets, got ${keys.length}`);
  const golden = mod.LOOKS["overworld-golden"];
  assert.ok(golden, "overworld-golden preset must exist");
  assert.equal(golden.bg, "#f5c284");
  assert.equal(golden.fog, "#f2ca98");
  assert.equal(golden.fogDensity, 0.008);
  assert.equal(golden.follow, true);
  assert.equal(golden.shadowSpan, 13);
  assert.ok(golden.sky && typeof golden.sky.top === "string" && typeof golden.sky.horizon === "string");
  assert.ok(Array.isArray(golden.sky.sunDir) && golden.sky.clouds > 0);
});

test("F1.T2 — SHADER_PRESETS, DEFAULT_SHADERS, resolveShaders, and PostFX contract", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { DEFAULT_SHADERS, SHADER_PRESETS, resolveShaders, PostFX } from "./src/engine/shaders";`,
    { withShims: true, cacheKey: "f1-shaders" },
  );
  assert.equal(mod.DEFAULT_SHADERS.enabled, true);
  assert.equal(mod.DEFAULT_SHADERS.threshold, 1.25);
  assert.equal(mod.DEFAULT_SHADERS.saturation, 1.45);
  assert.equal(mod.DEFAULT_SHADERS.vignette, 0.12);
  assert.deepEqual(Object.keys(mod.SHADER_PRESETS), [
    "cinematic",
    "vibrant-day",
    "warm-sunset",
    "moonlight",
    "horror-noir",
  ]);
  assert.deepEqual(mod.resolveShaders(true), mod.DEFAULT_SHADERS);
  const vibrant = mod.resolveShaders("vibrant-day");
  assert.ok(vibrant && vibrant.vibrance > mod.DEFAULT_SHADERS.vibrance);
  assert.equal(mod.resolveShaders({ enabled: false }), null);
  assert.equal(typeof mod.PostFX, "function");
});

test("F1.T3 — textures.ts preserves NearestFilter pixel art and LinearFilter glow/beam mipmaps", async () => {
  const restoreDoc = installDomCanvasStub();
  try {
    const mod = await bundleExports(
      REPO_ROOT,
      `export { pixelTex, plankTex, blockTex, glowTex, beamTex } from "./src/engine/textures";`,
      { withShims: true, cacheKey: "f1-textures" },
    );
    const pTex = mod.pixelTex("#5fa03c");
    const wTex = mod.plankTex();
    const gTex = mod.blockTex("grass");
    for (const tex of [pTex, wTex, gTex]) {
      assert.ok(tex instanceof THREE.CanvasTexture);
      assert.equal(tex.magFilter, THREE.NearestFilter);
      assert.equal(tex.minFilter, THREE.NearestMipmapLinearFilter);
      assert.equal(tex.wrapS, THREE.RepeatWrapping);
      assert.equal(tex.wrapT, THREE.RepeatWrapping);
      assert.equal(tex.colorSpace, THREE.SRGBColorSpace);
    }
    const glow = mod.glowTex();
    const beam = mod.beamTex();
    for (const soft of [glow, beam]) {
      assert.ok(soft instanceof THREE.CanvasTexture);
      assert.equal(soft.magFilter, THREE.LinearFilter);
      assert.equal(soft.minFilter, THREE.LinearMipmapLinearFilter);
    }
  } finally {
    restoreDoc();
  }
});

test("F1.T4 — Water clones cached texture offset safely and EmberDrift is deterministic", async () => {
  const restoreDoc = installDomCanvasStub();
  try {
    const mod = await bundleExports(
      REPO_ROOT,
      `export { Water } from "./src/engine/blocks";
       export { EmberDrift } from "./src/engine/fx";
       export { blockTex } from "./src/engine/textures";`,
      { withShims: true, cacheKey: "f1-water-ember" },
    );
    assert.equal(typeof mod.Water, "function");
    assert.equal(typeof mod.EmberDrift, "function");

    setShimClock({ frame: 15, fps: 30 });
    const ember1 = await renderHookedElement(createElement(mod.EmberDrift, { seed: 77, count: 16 }));
    const ember2 = await renderHookedElement(createElement(mod.EmberDrift, { seed: 77, count: 16 }));
    const pos1 = ember1.props.geometry.getAttribute("position").array;
    const pos2 = ember2.props.geometry.getAttribute("position").array;
    assert.equal(pos1.length, 48);
    assert.deepEqual(Array.from(pos1), Array.from(pos2), "EmberDrift must be frame/seed deterministic");

    const baseWater = mod.blockTex("water", "#2d7ee6");
    const baseOffsetX = baseWater.offset.x;
    const baseOffsetY = baseWater.offset.y;
    const waterTree = await renderHookedElement(
      createElement(mod.Water, { size: [4, 0.5, 4], tint: "#2d7ee6" }),
    );
    const mat = waterTree.children[0].props.map;
    assert.notEqual(mat, baseWater, "Water must clone blockTex('water') rather than mutating cache");
    assert.equal(baseWater.offset.x, baseOffsetX);
    assert.equal(baseWater.offset.y, baseOffsetY);
    assert.ok(mat.offset.x > 0 || mat.offset.y > 0, "Water offset must scroll at frame 15");
  } finally {
    restoreDoc();
  }
});

test("F1.T5 — Captions uses native 3D shader quad, zero 2D overlays, crisp wordTexture", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { Captions, captionText, activeWord } from "./src/engine/Captions";
     export { wordTexture } from "./src/engine/pixelfont";`,
    { withShims: true, cacheKey: "f1-captions" },
  );
  assert.equal(typeof mod.Captions, "function");
  assert.equal(mod.captionText("Hello!"), "HELLO");

  const captionsSrc = fs.readFileSync(path.join(REPO_ROOT, "src/engine/Captions.tsx"), "utf8");
  assert.equal(/<(div|img|video|canvas|AbsoluteFill)\b|backgroundImage|linear-gradient\(/i.test(captionsSrc), false);

  const tex = mod.wordTexture("INFLATION");
  assert.ok(tex instanceof THREE.DataTexture);
  assert.equal(tex.magFilter, THREE.NearestFilter);
  assert.ok(tex.image.width > 0);
  assert.equal(tex.image.height, 11);
});

test("F1.T6 — 9:16 aspect-corrected elliptical vignette math in shaders.tsx", () => {
  const shadersSrc = fs.readFileSync(path.join(REPO_ROOT, "src/engine/shaders.tsx"), "utf8");
  assert.match(shadersSrc, /float\s+aspect\s*=\s*uTexel\.y\s*\/\s*max\(uTexel\.x,\s*1e-6\)/);
  assert.match(shadersSrc, /vec2\s+d\s*=\s*\(uv\s*-\s*0\.5\)\s*\*\s*vec2\(aspect,\s*1\.0\)/);
  // Numerical sanity check at 1080x1920: texel = (1/1080, 1/1920), aspect = (1/1920)/(1/1080) = 9/16
  const uTexel = { x: 1 / 1080, y: 1 / 1920 };
  const aspect = uTexel.y / Math.max(uTexel.x, 1e-6);
  assert.ok(Math.abs(aspect - 9 / 16) < 1e-6);
  const topCornerDist = Math.hypot((1 - 0.5) * aspect, 1 - 0.5);
  const sideMidDist = Math.hypot((1 - 0.5) * aspect, 0.5 - 0.5);
  assert.ok(topCornerDist > sideMidDist && topCornerDist < Math.hypot(0.5, 0.5), "Elliptical 9:16 vignette softens corner darkening");
});

test("F1.N1 — Rejects 2D HTML overlays in synthetic film/scene via check-films.mjs", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f1-2d-" });
  try {
    writeSyntheticStoryFilm(ws.root, "bad-overlay-short", { include2DOverlay: true });
    const res = spawnSync(process.execPath, [path.join(ws.root, "scripts", "check-films.mjs")], {
      cwd: ws.root,
      encoding: "utf8",
    });
    assert.notEqual(res.status, 0, "check-films.mjs must fail when 2D overlay exists");
    assert.match(res.stdout + res.stderr, /2D overlay/i);
  } finally {
    ws.cleanup();
  }
});

test("F1.N2 — Rejects disabled shaders on modern film via directionReport()", () => {
  const words = [{ w: "Hello.", s: 0.1, e: 0.5 }];
  const timing = {
    fps: 30,
    duration: 1,
    audio: "audio/test/narration.mp3",
    estimated: false,
    wordTiming: "aligned",
    cues: [{ id: "1.me", start: 0, end: 1, text: "Hello." }],
    words,
    clips: [{ name: "hook", timing: "aligned" }],
  };
  const film = {
    fps: 30,
    id: "test",
    scenes: [
      {
        id: "scene1",
        duration: 1,
        shots: [{ cue: "1.me", from: [0, 1, 3], to: [0, 1, 2], target: [0, 1, 0], at: 0, dur: 1 }],
      },
    ],
    captions: { words, motion: "on-beat" },
    audio: { src: "audio/test/mix.mp3" },
    post: { shaders: { enabled: false } },
  };
  const r = directionReport(film, timing, { film: { captions: true }, sound: { required: true } });
  assert.match(r.unfinished.join("\n"), /shader chain is off/i);
});

test("F1.N3 — Captions activeWord hold window (0.45s) and pause gap boundary", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { activeWord } from "./src/engine/Captions";`,
    { withShims: true, cacheKey: "f1-captions-active" },
  );
  const words = [
    { w: "First", s: 0.1, e: 0.3 },
    { w: "Second", s: 1.5, e: 1.8 },
  ];
  assert.equal(mod.activeWord(words, 0.05), null);
  assert.equal(mod.activeWord(words, 0.1)?.w, "First");
  assert.equal(mod.activeWord(words, 0.74)?.w, "First");
  assert.equal(mod.activeWord(words, 0.76), null, "Must clear after word.e + 0.45s across pause");
  assert.equal(mod.activeWord(words, 1.5)?.w, "Second");
});
