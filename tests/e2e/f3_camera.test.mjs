import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { bundleExports } from "./lib/bundle.mjs";
import { detectOutExpoTailFreeze, makePerspectiveCamera, projectWorldPoint } from "./lib/camera-checks.mjs";
import { directionReport } from "../../scripts/direction-report.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";

test("F3.T1 — cam.* easing defaults (inOutSine, linear truck, inOutCubic dollyZoom)", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { cam } from "./src/engine/cam";`,
    { withShims: true, cacheKey: "f3-cam" },
  );
  const { cam } = mod;
  assert.equal(cam.push({ on: [0, 1, 0], dist: 4, to: 2.5 }).ease, "inOutSine");
  assert.equal(cam.orbit({ on: [0, 1, 0], dist: 4, yaw: 0, yawTo: 30 }).ease, "inOutSine");
  assert.equal(cam.pan({ from: [0, 1, 4], on: [0, 1, 0], onTo: [2, 1, 0] }).ease, "inOutSine");
  assert.equal(cam.crane({ on: [0, 1, 0], dist: 4, fromPitch: -10, toPitch: 25 }).ease, "inOutSine");
  assert.equal(cam.ots({ speaker: [0, 1, 0], listener: [0, 1, 3] }).ease, "inOutSine");
  assert.equal(cam.top({ on: [0, 0, 0], height: 6, to: 2 }).ease, "inOutSine");
  assert.equal(cam.truck({ on: [0, 1, 0], dist: 4, by: [2, 0, 0] }).ease, "linear");
  assert.equal(cam.dollyZoom({ on: [0, 1, 0], dist: 5, to: 2.8 }).ease, "inOutCubic");
});

test("F3.T2 — Short snappy cam.whip (< 0.65s) passes tail-freeze gate", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { cam } from "./src/engine/cam";`,
    { withShims: true, cacheKey: "f3-cam" },
  );
  const whip = {
    cue: "2.snap",
    at: 0,
    dur: 0.45,
    ...mod.cam.whip({ from: [0, 1.5, 4], on: [0, 1.2, 0], onTo: [3, 1.2, 0] }),
  };
  assert.equal(detectOutExpoTailFreeze(whip), null);

  if (MODE === "framework") {
    // Under M1 F3 fix, either direction-report.mjs flags long outExpo tail freeze OR cam.whip no longer emits freezing outExpo
    const longWhip = {
      cue: "2.long",
      at: 0,
      dur: 2.0,
      ...mod.cam.whip({ from: [0, 1.5, 4], on: [0, 1.2, 0], onTo: [4, 1.2, 0] }),
    };
    const r = directionReport({
      fps: 30,
      captions: { motion: "on-beat" },
      scenes: [{ id: "scene1", duration: 2.0, shots: [longWhip], sampleStage: (_i, t) => createElement("group", { position: [t, 0, 0] }) }],
    });
    const flagged = r.unfinished.concat(r.review).some((msg) => /outExpo|tail|freeze|whip/i.test(msg));
    assert.ok(
      longWhip.ease !== "outExpo" || flagged,
      "Framework must either avoid outExpo tail freeze on long whips or flag it in directionReport()",
    );
  }
});

test("F3.T3 — Camera motion continuity across samples (inOutSine second half >= 0.45)", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { easings } from "./src/engine/math";
     export { pickShot } from "./src/engine/Camera";`,
    { withShims: true, cacheKey: "f3-math-cam" },
  );
  const e0 = mod.easings.inOutSine(0);
  const e25 = mod.easings.inOutSine(0.25);
  const e50 = mod.easings.inOutSine(0.5);
  const e75 = mod.easings.inOutSine(0.75);
  const e100 = mod.easings.inOutSine(1);
  assert.ok(e0 < e25 && e25 < e50 && e50 < e75 && e75 < e100);
  assert.ok(Math.abs(e100 - e50) >= 0.45, "Second half of inOutSine must carry substantial motion");
});

test("F3.T4 — Frame-1 proximity gate accepts 6.5m and rejects 14m", () => {
  const stage = (_i, t) => createElement("group", { position: [t, 0, 0] });
  const closeFilm = {
    fps: 30,
    captions: { motion: "on-beat" },
    scenes: [
      {
        id: "scene1",
        duration: 1.5,
        shots: [{ cue: "1.hook", at: 0, dur: 1.5, from: [0, 1.3, 6.5], to: [0, 1.3, 4.0], target: [0, 1.3, 0] }],
        sampleStage: stage,
      },
    ],
  };
  const closeReport = directionReport(closeFilm);
  assert.equal(closeReport.unfinished.filter((m) => /opening hook camera starts/i.test(m)).length, 0);

  const farFilm = {
    ...closeFilm,
    scenes: [
      {
        id: "scene1",
        duration: 1.5,
        shots: [{ cue: "1.hook", at: 0, dur: 1.5, from: [0, 1.3, 14.0], to: [0, 1.3, 10.0], target: [0, 1.3, 0] }],
        sampleStage: stage,
      },
    ],
  };
  const farReport = directionReport(farFilm);
  assert.match(farReport.unfinished.join("\n"), /opening hook camera starts/);
});

test("F3.T5 — pickShot selection and 9:16 PerspectiveCamera framing projection", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { pickShot } from "./src/engine/Camera";
     export { cam } from "./src/engine/cam";`,
    { withShims: true, cacheKey: "f3-pick" },
  );
  const s1 = { cue: "1.a", at: 0, dur: 1.2, ...mod.cam.push({ on: [0, 1.2, 0], dist: 4, to: 3, screenOffset: [0, 0.1] }) };
  const s2 = { cue: "2.b", at: 1.2, dur: 1.0, ...mod.cam.orbit({ on: [0, 1.2, 0], dist: 3, yaw: 0, yawTo: 30 }) };
  assert.equal(mod.pickShot([s1, s2], 0.5), s1);
  assert.equal(mod.pickShot([s1, s2], 1.5), s2);

  const cam = makePerspectiveCamera(s1, 0.6, 9 / 16);
  const pt = projectWorldPoint(cam, [0, 1.2, 0]);
  assert.equal(pt.inFront, true);
  assert.ok(pt.y > 0.05, "Positive screenOffset[1]=0.1 must shift subject upward in 9:16 NDC");
});

test("F3.N1 — Rejects long outExpo whip-pan (dur = 2.0s) tail freeze", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { cam } from "./src/engine/cam";`,
    { withShims: true, cacheKey: "f3-cam" },
  );
  const frozenWhip = {
    cue: "2.dark",
    at: 0,
    dur: 2.0,
    ...mod.cam.whip({ from: [0, 1.5, 4], on: [0, 1.2, 0], onTo: [4, 1.2, 0] }),
    ease: "outExpo",
  };
  const issue = detectOutExpoTailFreeze(frozenWhip);
  assert.ok(issue, "2.0s outExpo whip must be flagged as tail freeze");
  assert.ok(issue.tailMoveRatio < 0.05);
  assert.match(issue.message, /tail freeze/i);
});

test("F3.N2 — Boundary duration test: 0.55s outExpo passes vs 1.2s outExpo fails", () => {
  const shortWhip = {
    cue: "2.snap",
    at: 0,
    dur: 0.55,
    from: [0, 1.5, 4],
    target: [0, 1.2, 0],
    targetTo: [4, 1.2, 0],
    ease: "outExpo",
  };
  const longWhip = { ...shortWhip, cue: "2.slow", dur: 1.2 };
  assert.equal(detectOutExpoTailFreeze(shortWhip), null);
  assert.ok(detectOutExpoTailFreeze(longWhip), "1.2s outExpo must fail tail-freeze threshold");
});

test("F3.N3 — Locked shot exemption and contradiction detection", () => {
  const stage = (_i, t) => createElement("group", { position: [t, 0, 0] });
  const lockedShot = { cue: "1.photo", at: 0, dur: 2.0, from: [0, 1.5, 4], target: [0, 1.2, 0], locked: true, ease: "outExpo" };
  assert.equal(detectOutExpoTailFreeze(lockedShot), null);

  const reportOk = directionReport({
    fps: 30,
    scenes: [{ id: "scene1", duration: 2.0, shots: [lockedShot], sampleStage: stage }],
  });
  assert.equal(reportOk.errors.length, 0);

  const reportBad = directionReport({
    fps: 30,
    scenes: [{ id: "scene1", duration: 2.0, shots: [{ ...lockedShot, to: [2, 1.5, 4] }], sampleStage: stage }],
  });
  assert.match(reportBad.errors.join("\n"), /says locked/);
});
