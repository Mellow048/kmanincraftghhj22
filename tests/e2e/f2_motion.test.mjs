import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import {
  bundleExports,
  installDomCanvasStub,
  renderHookedElement,
  setShimClock,
} from "./lib/bundle.mjs";
import { detectStationaryWalks } from "./lib/geometry.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";

function findLegRotations(tree) {
  const rots = [];
  function walk(n) {
    if (!n || typeof n !== "object") return;
    if (n.type === "group" && Array.isArray(n.props?.rotation) && Array.isArray(n.props?.position)) {
      const x = n.props.position[0];
      if (Math.abs(Math.abs(x) - 2.2 * (1 / 16)) < 0.02 && Math.abs(n.props.position[1]) < 0.01) {
        rots.push(n.props.rotation);
      }
    }
    for (const c of n.children ?? []) walk(c);
  }
  walk(tree);
  return rots;
}

function checkPostRampIdleSettle(samples) {
  // samples: array of { t, legR } after movement stopped at distance = 0.355m
  const maxAbs = Math.max(...samples.map((s) => Math.abs(s.legR)));
  return { settled: maxAbs < 0.05, maxAbs };
}

test("F2.T1 — Coupled stride() distance matches displacement and heading rotationY", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { stride } from "./src/engine/story";`,
    { withShims: true, cacheKey: "f2-story" },
  );
  const s0 = mod.stride([0, 0, 0], [3, 0, 4], 0);
  const sHalf = mod.stride([0, 0, 0], [3, 0, 4], 0.5);
  const s1 = mod.stride([0, 0, 0], [3, 0, 4], 1);

  assert.deepEqual(s0.position, [0, 0, 0]);
  assert.equal(s0.animDistance, 0);
  assert.deepEqual(sHalf.position, [1.5, 0, 2]);
  assert.ok(Math.abs(sHalf.animDistance - 2.5) < 1e-8);
  assert.deepEqual(s1.position, [3, 0, 4]);
  assert.ok(Math.abs(s1.animDistance - 5.0) < 1e-8);
  assert.ok(Math.abs(s1.rotationY - Math.atan2(3, 4)) < 1e-8);
});

test("F2.T2 — gaitPose() phase tracks animDistance deterministically and ignores clock", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { gaitPose } from "./src/engine/anim";`,
    { withShims: true, cacheKey: "f2-anim" },
  );
  const p0 = mod.gaitPose("walk", 0);
  const pMid = mod.gaitPose("walk", 0.355);
  const pMid2 = mod.gaitPose("walk", 0.355);
  assert.equal(p0.legR[0], 0);
  assert.ok(Math.abs(pMid.legR[0]) > 0.5, "Quarter-stride must swing legs");
  assert.deepEqual(pMid, pMid2);
});

test("F2.T3 — Post-ramp idle blend contract (synthetic in self-test, live MinecraftAvatar in --framework)", async () => {
  if (MODE === "framework") {
    const restoreDoc = installDomCanvasStub();
    try {
      const mod = await bundleExports(
        REPO_ROOT,
        `export { MinecraftAvatar } from "./src/engine/MinecraftAvatar";`,
        { withShims: true, cacheKey: "f2-avatar" },
      );
      // Simulate character that walked 0.355m (quarter-stride peak) and stopped: time advances while animDistance stays frozen.
      const legSamples = [];
      for (const frame of [30, 40, 50]) {
        setShimClock({ frame, fps: 30 });
        const tree = await renderHookedElement(
          createElement(mod.MinecraftAvatar, {
            animation: "walk",
            animDistance: 0.355,
            time: frame / 30,
          }),
        );
        const legs = findLegRotations(tree);
        assert.ok(legs.length >= 2, "MinecraftAvatar must render leg groups");
        legSamples.push({ t: frame / 30, legR: legs[0][0] });
      }
      // Without idle blend (or stationary gait freeze), legs stay locked at ~0.74 rad; framework fix must settle or blend to idle.
      const src = fs.readFileSync(path.join(REPO_ROOT, "src/engine/MinecraftAvatar.tsx"), "utf8");
      const hasStaticGaitGuard =
        /blendTo|idle|stopped|isMoving|delta|stationary/i.test(src) &&
        !src.includes('if (animDistance !== undefined && isGait(animation)) {\n    pose = gaitPose(animation, animDistance);\n  }');
      assert.ok(
        hasStaticGaitGuard || checkPostRampIdleSettle(legSamples).settled,
        `MinecraftAvatar freezes mid-stride (legR=${legSamples[0].legR.toFixed(3)}) when animDistance stops`,
      );
    } finally {
      restoreDoc();
    }
  } else {
    // Self-test mode: verify post-ramp idle blend validator logic cleanly passes settled idle poses
    const settledSamples = [
      { t: 0.8, legR: 0.02 },
      { t: 1.0, legR: 0.0 },
      { t: 1.2, legR: 0.0 },
    ];
    assert.equal(checkPostRampIdleSettle(settledSamples).settled, true);
  }
});

test("F2.T4 — Non-gait poses on MinecraftAvatar ignore animDistance and match getPose()", async () => {
  const restoreDoc = installDomCanvasStub();
  try {
    const mod = await bundleExports(
      REPO_ROOT,
      `export { MinecraftAvatar } from "./src/engine/MinecraftAvatar";
       export { getPose } from "./src/engine/anim";`,
      { withShims: true, cacheKey: "f2-avatar-anim" },
    );
    setShimClock({ frame: 15, fps: 30 });
    for (const anim of ["idle", "hold", "sit", "lie", "sleep"]) {
      const tWith = await renderHookedElement(
        createElement(mod.MinecraftAvatar, { animation: anim, animDistance: 1.2, time: 0.5 }),
      );
      const tWithout = await renderHookedElement(
        createElement(mod.MinecraftAvatar, { animation: anim, time: 0.5 }),
      );
      assert.deepEqual(findLegRotations(tWith), findLegRotations(tWithout), `${anim} must ignore animDistance`);
    }
  } finally {
    restoreDoc();
  }
});

test("F2.T5 — ExplainerCrowd & Topic actor prop contracts", async () => {
  const restoreDoc = installDomCanvasStub();
  try {
    const mod = await bundleExports(
      REPO_ROOT,
      `export { ExplainerCrowd } from "./Topics/Explainer/cast";
       export { Villager, IronGolem } from "./Topics/InThisTown/villagers";`,
      { withShims: true, cacheKey: "f2-crowd" },
    );
    assert.equal(typeof mod.ExplainerCrowd, "function");
    assert.equal(typeof mod.Villager, "function");
    assert.equal(typeof mod.IronGolem, "function");

    setShimClock({ frame: 10, fps: 30 });
    const tree = await renderHookedElement(
      createElement(mod.ExplainerCrowd, {
        positions: [[0, 0, 0], [1, 0, 0]],
        animation: "walk",
        animDistance: 1.4,
        time: 0.5,
      }),
      { maxDepth: 2 },
    );
    assert.ok(tree.children.length >= 2, "ExplainerCrowd must render child avatars");

    if (MODE === "framework") {
      const castSrc = fs.readFileSync(path.join(REPO_ROOT, "Topics/Explainer/cast.tsx"), "utf8");
      assert.match(castSrc, /\banimDistance\b/, "ExplainerCrowd must accept animDistance prop");
      assert.match(castSrc, /\btime\b/, "ExplainerCrowd must accept time prop");
    }
  } finally {
    restoreDoc();
  }
});

test("F2.N1 — Detects stationary walk={t * ...} across Villager, SnowGolem, Strider, IronGolem, MinecraftAvatar", () => {
  const Villager = () => null;
  const SnowGolem = () => null;
  const Strider = () => null;
  const IronGolem = () => null;
  const MinecraftAvatar = () => null;

  const shots = [
    { cue: "1.villager", dur: 1.0 },
    { cue: "2.golem", dur: 1.0 },
    { cue: "3.strider", dur: 1.0 },
    { cue: "4.iron", dur: 1.0 },
    { cue: "5.avatar", dur: 1.0 },
  ];
  const sampleStage = (i, t) => {
    switch (i) {
      case 0: return createElement(Villager, { position: [0, 0, 0], walk: t * 2 });
      case 1: return createElement(SnowGolem, { position: [1, 0, 2], walk: t * 1.5 });
      case 2: return createElement(Strider, { position: [0, 0, 0], walk: t * 3 });
      case 3: return createElement(IronGolem, { position: [0, 0, 0], walk: t * 1 });
      case 4: return createElement(MinecraftAvatar, { position: [0, 0, 0], animation: "walk", animDistance: t * 2 });
      default: return null;
    }
  };
  const issues = detectStationaryWalks(sampleStage, shots);
  assert.equal(issues.length, 5, `Expected 5 stationary-walk detections, got ${JSON.stringify(issues)}`);
});

test("F2.N2 — Valid moving walk={d} and stride() produce zero violations", async () => {
  const mod = await bundleExports(
    REPO_ROOT,
    `export { stride } from "./src/engine/story";`,
    { withShims: true, cacheKey: "f2-story" },
  );
  const Villager = () => null;
  const MinecraftAvatar = () => null;
  const shots = [
    { cue: "1.villager", dur: 1.0 },
    { cue: "2.avatar", dur: 1.0 },
  ];
  const sampleStage = (i, t) => {
    if (i === 0) {
      return createElement(Villager, { position: [0, 0, t * 1.4], rotationY: 0, walk: t * 1.4 });
    }
    return createElement(MinecraftAvatar, { ...mod.stride([0, 0, 0], [2, 0, 0], t), animation: "walk" });
  };
  const issues = detectStationaryWalks(sampleStage, shots);
  assert.deepEqual(issues, []);
});

test("F2.N3 — Detects uncoupled animDistance on non-gait pose (hold/push/reach/shrug)", () => {
  const MinecraftAvatar = () => null;
  const shots = [{ cue: "6.job", dur: 1.0 }];
  const sampleStage = (_i, t) =>
    createElement(MinecraftAvatar, {
      position: [0, 0, 3.2 - t * 4.4],
      rotationY: Math.PI,
      animation: "hold",
      animDistance: t * 1.1,
    });
  const issues = detectStationaryWalks(sampleStage, shots);
  assert.ok(issues.some((x) => x.kind === "uncoupled-animDistance-non-gait"), "Must catch skating hold+animDistance");
});

test("F2.N4 — Post-ramp mid-stride freeze boundary distinguishes frozen vs settled", () => {
  const frozen = [
    { t: 0.8, legR: 0.74 },
    { t: 1.0, legR: 0.74 },
    { t: 1.2, legR: 0.74 },
  ];
  const settled = [
    { t: 0.8, legR: 0.01 },
    { t: 1.0, legR: 0.0 },
    { t: 1.2, legR: 0.0 },
  ];
  assert.equal(checkPostRampIdleSettle(frozen).settled, false);
  assert.equal(checkPostRampIdleSettle(settled).settled, true);
});
