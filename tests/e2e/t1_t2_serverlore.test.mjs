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
import { extractBoxes, walkElements } from "./lib/geometry.mjs";
import { createTempWorkspace } from "./lib/fixtures.mjs";
import { findUnexpectedServerLoreMp4s } from "./lib/schema.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";

/**
 * Check ClassroomRoom boxes for 4 enclosing walls (+Z, -Z, +X, -X) and a ceiling slab (y > 3.5).
 */
export function checkClassroomEnclosure(roomTree) {
  const boxes = extractBoxes(roomTree);
  const walls = boxes.filter((b) => b.size[1] >= 2.5 && (b.size[0] >= 4 || b.size[2] >= 4));
  const hasBackWall = walls.some((b) => b.center[2] < -3.0 && b.size[0] >= 4);
  const hasFrontWall = walls.some((b) => b.center[2] > 3.0 && b.size[0] >= 4);
  const hasLeftWall = walls.some((b) => b.center[0] < -3.0 && b.size[2] >= 4);
  const hasRightWall = walls.some((b) => b.center[0] > 3.0 && b.size[2] >= 4);
  const hasCeiling = boxes.some((b) => b.center[1] > 3.5 && b.size[0] >= 5 && b.size[2] >= 5);
  const missing = [];
  if (!hasBackWall) missing.push("back wall (-Z)");
  if (!hasFrontWall) missing.push("front wall (+Z)");
  if (!hasLeftWall) missing.push("left wall (-X)");
  if (!hasRightWall) missing.push("right wall (+X)");
  if (!hasCeiling) missing.push("ceiling slab (y > 3.5)");
  return { ok: missing.length === 0, missing, boxCount: boxes.length };
}

/**
 * Check ServerChatBox rendered tree for a dedicated typing bar element when `typing` prop is passed.
 */
export function checkChatTypingBar(chatTree, typingText = "") {
  const boxes = extractBoxes(chatTree, { includePlanes: true });
  const meshes = [];
  walkElements(chatTree, ({ name, props, worldMatrix }) => {
    if (name === "mesh" || name === "Block") {
      const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      meshes.push({ name, pos: [p.x, p.y, p.z], props });
    }
  });
  const hasTypingMesh = meshes.some(
    (m) =>
      String(m.props?.name ?? "").toLowerCase().includes("typing") ||
      (typingText && m.props?.material?.map?.userData?.text?.includes?.(typingText)),
  );
  // Also allow geometry heuristic: extra bottom bar below message rows (more plane meshes than lines + 1)
  return {
    ok: hasTypingMesh || boxes.length >= 4,
    meshCount: meshes.length,
    boxCount: boxes.length,
  };
}

/**
 * Check RedstoneLine and LightPool Y-clearance against floor/bridge boxes in ServerLore world/scenes.
 */
export function checkFloorPropClearance(worldTree, stageRoots, activeZone = "server") {
  const floorBoxes = extractBoxes(worldTree, { activeZone }).filter(
    (b) => b.size[0] >= 1.5 && b.size[2] >= 1.5 && b.max[1] > -0.5 && b.max[1] < 1.0,
  );
  const violations = [];

  const checkNode = (root, label) => {
    walkElements(
      root,
      ({ name, props, worldMatrix }) => {
        if (name !== "LightPool" && name !== "RedstoneLine") return;
        const pts =
          name === "RedstoneLine" && Array.isArray(props.from) && Array.isArray(props.to)
            ? [props.from, [(props.from[0] + props.to[0]) / 2, (props.from[1] + props.to[1]) / 2, (props.from[2] + props.to[2]) / 2], props.to]
            : [[0, 0, 0]];
        for (const localPt of pts) {
          const wp =
            name === "RedstoneLine"
              ? new THREE.Vector3(localPt[0], localPt[1], localPt[2])
              : new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
          let maxFloorUnder = -Infinity;
          for (const fb of floorBoxes) {
            if (wp.x >= fb.min[0] && wp.x <= fb.max[0] && wp.z >= fb.min[2] && wp.z <= fb.max[2]) {
              if (fb.max[1] > maxFloorUnder) maxFloorUnder = fb.max[1];
            }
          }
          if (maxFloorUnder > -Infinity && wp.y <= maxFloorUnder + 0.002) {
            violations.push({
              prop: name,
              label,
              y: wp.y,
              floorTop: maxFloorUnder,
              message: `${label}: ${name} at y=${wp.y.toFixed(3)}m is buried under/coplanar with floor top y=${maxFloorUnder.toFixed(3)}m`,
            });
          }
        }
      },
      { activeZone },
    );
  };

  checkNode(worldTree, "World");
  for (const s of stageRoots) {
    if (!s.zone || String(s.zone).split("+").includes(activeZone)) {
      checkNode(s.root, s.cue ?? "stage");
    }
  }
  return violations;
}

/**
 * Check `3.irl` chair alignment between DeskSetup (chair seat at deskPos + [0, 0.49, 0.82])
 * and sitting ServerPlayer.
 */
export function checkDeskChairAlignment(stageRoot) {
  let deskPos = null;
  let sitterPos = null;
  walkElements(stageRoot, ({ name, props, worldMatrix }) => {
    const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
    if (name === "DeskSetup") deskPos = [p.x, p.y, p.z];
    if ((name === "ServerPlayer" || name === "MinecraftAvatar") && props.animation === "sit") {
      sitterPos = [p.x, p.y, p.z];
    }
  });
  if (!deskPos || !sitterPos) {
    return { ok: false, reason: "Missing DeskSetup or seated ServerPlayer in 3.irl" };
  }
  const seatCenter = [deskPos[0], deskPos[1], deskPos[2] + 0.82];
  const xzDist = Math.hypot(sitterPos[0] - seatCenter[0], sitterPos[2] - seatCenter[2]);
  return {
    ok: xzDist <= 0.15,
    xzDist,
    seatCenter,
    sitterPos,
    reason: xzDist <= 0.15 ? "aligned" : `Seated actor XZ offset ${xzDist.toFixed(3)}m > 0.15m from DeskSetup chair seat`,
  };
}

test("F6.T1 — Zero ServerLore MP4 guard across renders/, out/, Desktop", () => {
  const hits = findUnexpectedServerLoreMp4s(REPO_ROOT);
  assert.deepEqual(hits, [], `Forbidden ServerLore MP4(s) detected: ${hits.join(", ")}`);
});

test("F6.T2 — ServerLore topic.json & dual-track Up audio files exist on disk", () => {
  const topic = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "Topics/ServerLore/topic.json"), "utf8"));
  assert.equal(topic.id, "server-lore");
  assert.equal(topic.sound.music.file, "Topics/ServerLore/up_happy.m4a");
  assert.ok(topic.sound.music.extraFiles.includes("Topics/ServerLore/up_sad.m4a"));
  assert.equal(fs.existsSync(path.join(REPO_ROOT, topic.sound.music.file)), true);
  assert.equal(fs.existsSync(path.join(REPO_ROOT, "Topics/ServerLore/up_sad.m4a")), true);
});

test("F6.T3 — ServerLore enclosure, typing bar, clearance, and chair alignment detectors (self-test)", () => {
  const Block = () => null;
  const Vox = () => null;
  const LightPool = () => null;
  const RedstoneLine = () => null;
  const DeskSetup = () => null;
  const ServerPlayer = () => null;

  // 1) Enclosure positive & negative
  const closedRoom = createElement(
    "group",
    null,
    createElement(Block, { position: [0, 2.1, -4.4], size: [10, 4.2, 0.4] }),
    createElement(Block, { position: [0, 2.1, 4.4], size: [10, 4.2, 0.4] }),
    createElement(Block, { position: [-4.8, 2.1, 0], size: [0.4, 4.2, 10] }),
    createElement(Block, { position: [4.8, 2.1, 0], size: [0.4, 4.2, 10] }),
    createElement(Block, { position: [0, 4.2, 0], size: [10, 0.3, 10] }),
  );
  assert.equal(checkClassroomEnclosure(closedRoom).ok, true);

  const openRoom = createElement(
    "group",
    null,
    createElement(Block, { position: [0, 2.1, -4.4], size: [10, 4.2, 0.4] }),
    createElement(Block, { position: [-4.8, 2.1, 0], size: [0.4, 4.2, 10] }),
  );
  const openRes = checkClassroomEnclosure(openRoom);
  assert.equal(openRes.ok, false);
  assert.ok(openRes.missing.includes("ceiling slab (y > 3.5)"));

  // 2) Floor clearance positive & negative
  const worldBridge = createElement(
    "group",
    null,
    createElement(Vox, { position: [0, 0.04, -2.5], size: [3.2, 0.12, 8.5] }), // top = 0.10
  );
  const goodStage = createElement(
    "group",
    null,
    createElement(LightPool, { position: [0, 0.12, -2.0] }),
    createElement(RedstoneLine, { from: [0, 0.11, -1.5], to: [1.2, 0.11, -3.5] }),
  );
  assert.deepEqual(checkFloorPropClearance(worldBridge, [{ cue: "4.rally", root: goodStage }], "server"), []);

  const badStage = createElement(
    "group",
    null,
    createElement(LightPool, { position: [0, 0.03, -2.0] }),
    createElement(RedstoneLine, { from: [0, 0, -1.5], to: [1.2, 0, -3.5] }),
  );
  assert.ok(checkFloorPropClearance(worldBridge, [{ cue: "4.rally", root: badStage }], "server").length >= 2);

  // 3) Chair alignment positive & negative
  const alignedIrl = createElement(
    "group",
    null,
    createElement(DeskSetup, { position: [0, 0, -1.2] }),
    createElement(ServerPlayer, { position: [0.02, 0.05, -0.38], animation: "sit" }),
  );
  assert.equal(checkDeskChairAlignment(alignedIrl).ok, true);

  const misalignedIrl = createElement(
    "group",
    null,
    createElement(DeskSetup, { position: [0, 0, -1.2] }),
    createElement(ServerPlayer, { position: [0.5, 0.05, -0.45], animation: "sit" }),
  );
  assert.equal(checkDeskChairAlignment(misalignedIrl).ok, false);
});

test("F6.T4 — Scaffold tsc --noEmit catches Hut/yawTo errors in synthetic temp fixture", () => {
  const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f6-tsc-" });
  try {
    const tsconfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "tsconfig.json"), "utf8"));
    fs.writeFileSync(path.join(ws.root, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
    const vidDir = path.join(ws.root, "src", "videos", "bad-lore");
    fs.mkdirSync(vidDir, { recursive: true });
    fs.writeFileSync(
      path.join(vidDir, "bad.ts"),
      `import { cam } from "../../engine";
       export const s = cam.push({ on: [0, 1, 0], dist: 3, to: 2, yaw: 10, yawTo: 0 });`,
    );
    const res = spawnSync("npx", ["tsc", "--noEmit"], { cwd: ws.root, encoding: "utf8" });
    assert.notEqual(res.status, 0, "tsc --noEmit must reject invalid yawTo on cam.push");
    assert.match(res.stdout + res.stderr, /yawTo/);
  } finally {
    ws.cleanup();
  }
});

if (MODE === "server-lore") {
  test("F6.LIVE.1 — Scaffolded server-lore film passes tsc --noEmit and rehearse --draft", () => {
    const ws = createTempWorkspace(REPO_ROOT, { prefix: "e2e-f6-live-" });
    try {
      const tsconfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "tsconfig.json"), "utf8"));
      fs.writeFileSync(path.join(ws.root, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
      fs.writeFileSync(
        path.join(ws.root, "src", "index.ts"),
        `export const register = () => null;\n`,
      );
      fs.writeFileSync(path.join(ws.root, "src", "registry.ts"), `export const FILMS = [];\n`);

      const scaf = spawnSync(
        process.execPath,
        [path.join(ws.root, "scripts", "new-video.mjs"), "The Test Lore", "--topic", "server-lore"],
        { cwd: ws.root, encoding: "utf8" },
      );
      assert.equal(scaf.status, 0, `new-video.mjs failed:\n${scaf.stdout}\n${scaf.stderr}`);

      const tsc = spawnSync("npx", ["tsc", "--noEmit"], { cwd: ws.root, encoding: "utf8" });
      assert.equal(tsc.status, 0, `Scaffolded server-lore failed tsc --noEmit:\n${tsc.stdout}\n${tsc.stderr}`);

      const reh = spawnSync(
        process.execPath,
        [path.join(ws.root, "scripts", "rehearse.mjs"), "the-test-lore", "--draft"],
        { cwd: ws.root, encoding: "utf8" },
      );
      assert.equal(reh.status, 0, `rehearse --draft failed:\n${reh.stdout}\n${reh.stderr}`);
    } finally {
      ws.cleanup();
    }
  });

  test("F6.LIVE.2 — Topics/ServerLore/index.ts exports all upgraded components, enclosed ClassroomRoom, typing ServerChatBox", async () => {
    const restoreDoc = installDomCanvasStub();
    try {
      const mod = await bundleExports(
        REPO_ROOT,
        `export * from "./Topics/ServerLore";`,
        { withShims: true, cacheKey: "f6-live-pack" },
      );
      for (const sym of [
        "ScoreboardSidebar",
        "HudTimeBadge",
        "SubscribePill",
        "PhoneProp",
        "BedroomSet",
        "ClassroomRoom",
        "ServerChatBox",
        "ServerPlayer",
        "ServerCrowd",
        "DeskSetup",
        "HospitalCorridor",
        "SculkSensor",
        "RedstoneLamp",
        "RedstoneLine",
        "OpeningChest",
        "Clock3AM",
      ]) {
        assert.equal(typeof mod[sym], "function", `Topics/ServerLore missing export ${sym}`);
      }

      setShimClock({ frame: 10, fps: 30 });
      const roomTree = await renderHookedElement(createElement(mod.ClassroomRoom, {}));
      const enc = checkClassroomEnclosure(roomTree);
      assert.equal(enc.ok, true, `ClassroomRoom not fully enclosed: missing ${enc.missing.join(", ")}`);

      const chatTree = await renderHookedElement(
        createElement(mod.ServerChatBox, {
          lines: [{ sender: "Noah", text: "hi" }],
          typing: "Wait...",
        }),
      );
      const chatRes = checkChatTypingBar(chatTree, "Wait...");
      assert.equal(chatRes.ok, true, "ServerChatBox must render typing bar when typing prop is supplied");
    } finally {
      restoreDoc();
    }
  });

  test("F6.LIVE.3 — Topics/ServerLore/template spatial clearance, 3.irl alignment, 5.cta blend, zero yawTo", async () => {
    const restoreDoc = installDomCanvasStub();
    try {
      const scene1Src = fs.readFileSync(path.join(REPO_ROOT, "Topics/ServerLore/template/scene1.tsx"), "utf8");
      assert.doesNotMatch(scene1Src, /\byawTo\b/, "template/scene1.tsx must not pass yawTo to cam.push");

      const mod = await bundleExports(
        REPO_ROOT,
        `export { World } from "./Topics/ServerLore/template/world";
         export { scene1 } from "./Topics/ServerLore/template/scene1";`,
        { withShims: true, cacheKey: "f6-live-template" },
      );
      setShimClock({ frame: 15, fps: 30 });
      const worldTree = await renderHookedElement(createElement(mod.World, {}));
      const stages = mod.scene1.shots.map((s, i) => ({
        cue: s.cue,
        zone: s.zone,
        root: mod.scene1.sampleStage(i, s.dur * 0.5),
      }));

      const clearanceErrs = checkFloorPropClearance(worldTree, stages, "server");
      assert.deepEqual(clearanceErrs, [], clearanceErrs.map((e) => e.message).join("\n"));

      const irlShot = stages.find((s) => s.cue === "3.irl");
      assert.ok(irlShot, "template/scene1.tsx must have 3.irl cue");
      const chairCheck = checkDeskChairAlignment(irlShot.root);
      assert.equal(chairCheck.ok, true, chairCheck.reason);

      const ctaIdx = mod.scene1.shots.findIndex((s) => s.cue === "5.cta");
      assert.ok(ctaIdx >= 0, "template/scene1.tsx must have 5.cta cue");
      const ctaEnd = mod.scene1.sampleStage(ctaIdx, mod.scene1.shots[ctaIdx].dur * 0.95);
      let heroOk = false;
      walkElements(ctaEnd, ({ name, props }) => {
        if ((name === "ServerPlayer" || name === "MinecraftAvatar") && props.role === "hero") {
          if (props.blendTo === "cheer" || props.blendTo === "idle" || props.animation === "cheer" || props.animation === "idle") {
            heroOk = true;
          }
        }
      });
      assert.equal(heroOk, true, "5.cta Hero must blend to cheer/idle instead of freezing mid-stride");
    } finally {
      restoreDoc();
    }
  });
}
