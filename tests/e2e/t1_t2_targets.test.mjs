import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import * as THREE from "three";
import { installDomCanvasStub, renderHookedElement, setShimClock } from "./lib/bundle.mjs";
import {
  detectStationaryWalks,
  extractBoxes,
  findCoplanarOrOverlapping,
  findDuplicateWorldSceneProps,
  walkElements,
} from "./lib/geometry.mjs";
import {
  detectOutExpoTailFreeze,
  makePerspectiveCamera,
  projectBox3Corners,
  projectWorldPoint,
} from "./lib/camera-checks.mjs";
import { TARGET_SHORTS, validateSoundLockSchema, validateTimingSchema } from "./lib/schema.mjs";
import { loadFilm } from "../../scripts/rehearse.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MODE = process.env.E2E_MODE || "self-test";
const TARGET_ARG = process.env.E2E_TARGET || "";

// ---- Reusable F7–F11 Detectors ------------------------------------------------

export function detectMinusHalfPiLieWrappers(stageRoot) {
  const hits = [];
  walkElements(stageRoot, ({ name, props, path: nodePath }) => {
    if (name !== "group") return;
    const rot = props.rotation ?? [
      props["rotation-x"] ?? props.rotationX ?? 0,
      props["rotation-y"] ?? props.rotationY ?? 0,
      props["rotation-z"] ?? props.rotationZ ?? 0,
    ];
    if (Array.isArray(rot) && Math.abs(Math.abs(Number(rot[0]) || 0) - Math.PI / 2) < 0.15) {
      let hasActorChild = false;
      walkElements(stageRoot, ({ name: childName, path: childPath }) => {
        if (
          childPath.startsWith(nodePath + ".") &&
          ["Hero", "Mum", "OldWick", "Villager", "MinecraftAvatar"].includes(childName)
        ) {
          hasActorChild = true;
        }
      });
      if (hasActorChild) {
        hits.push({ path: nodePath, rotation: rot, message: `Standing actor wrapped in rotation-x=${rot[0].toFixed(2)} instead of grounded lie/sleep` });
      }
    }
  });
  return hits;
}

export function checkMedianShotDuration(timing, maxMedianSec = 2.3) {
  const durs = (timing.cues ?? []).map((c) => c.end - c.start).sort((a, b) => a - b);
  const median = durs.length ? durs[Math.floor(durs.length / 2)] : 0;
  return { ok: median <= maxMedianSec, median, maxMedianSec };
}

export function checkBottomScriptPace(timing) {
  const words = timing.words?.length ?? 0;
  const wpm = timing.wordsPerMinute ?? (words / Math.max(1, timing.duration)) * 60;
  const ok = words >= 640 && words <= 770 && wpm >= 235 && wpm <= 268;
  return { ok, words, wpm };
}

export function checkRichMansionVisibility(shot, mansionMin = [3, 5.85, -36], mansionMax = [10, 16.3, -30]) {
  const res = [];
  for (const frac of [0, 1]) {
    const cam = makePerspectiveCamera(shot, (shot.dur ?? 1) * frac, 9 / 16);
    const boxNdc = projectBox3Corners(cam, mansionMin, mansionMax);
    const heightPct = (Math.min(1, boxNdc.maxY) - Math.max(-1, boxNdc.minY)) / 2;
    const inFrame = boxNdc.visibleInFront && boxNdc.maxX > -0.95 && boxNdc.minX < 0.95 && boxNdc.maxY > -0.95 && boxNdc.minY < 0.95;
    res.push({ frac, inFrame, heightPct, boxNdc });
  }
  const ok = res.some((r) => r.inFrame && r.heightPct >= 0.06);
  return { ok, samples: res };
}

export function checkFoxSillFacing(stageRoot, sillPos = [-8.5, 0, -4.54]) {
  const bad = [];
  walkElements(stageRoot, ({ name, props, worldMatrix }) => {
    if (name !== "Fox" && name !== "Teller") return;
    const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
    const nearSill = Math.abs(p.x - sillPos[0]) < 2.8 && p.z >= sillPos[2] - 0.5 && p.z <= sillPos[2] + 3.0;
    if (!nearSill) return;
    const ry = Number(props.rotationY ?? props["rotation-y"] ?? 0) || 0;
    // Facing -Z (into sill) means cos(ry - Math.PI) > 0.5 (within ±60° of Math.PI)
    if (Math.cos(ry - Math.PI) <= 0.5) {
      bad.push({ name, pos: [p.x, p.y, p.z], rotationY: ry, message: `${name} near sill has backwards rotationY=${ry.toFixed(2)} (expected ~Math.PI)` });
    }
  });
  return bad;
}

export function checkShotHasActor(stageRoot) {
  let count = 0;
  walkElements(stageRoot, ({ name }) => {
    if (["Fox", "Teller", "Dad", "Sister", "Hero", "Villager", "MinecraftAvatar", "IronGolem", "CitizenLead", "EliteLead", "Official"].includes(name)) {
      count++;
    }
  });
  return { ok: count > 0, count };
}

export function checkSillRepetition(shots, sillAnchor = [-8.5, 0, -4.54], maxRatio = 0.4) {
  let sillCount = 0;
  for (const s of shots) {
    const t = s.target ?? [0, 0, 0];
    if (Math.hypot(t[0] - sillAnchor[0], t[2] - sillAnchor[2]) < 3.0) sillCount++;
  }
  const ratio = shots.length ? sillCount / shots.length : 0;
  return { ok: ratio <= maxRatio, sillCount, total: shots.length, ratio };
}

export function checkBakeryPlinthRepetition(shots, maxRatio = 0.45) {
  const bakery = shots.filter((s) => s.zone === "bakery").length;
  const ratio = shots.length ? bakery / shots.length : 0;
  return { ok: ratio <= maxRatio, bakery, total: shots.length, ratio };
}

export function checkFloatingNumbersInFrame(stageRoot, shot) {
  const issues = [];
  const points = [];
  walkElements(stageRoot, ({ name, props, worldMatrix }) => {
    if (name === "FloatingNumber") {
      const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      points.push({ text: props.value ?? props.text ?? "?", pos: [p.x, p.y, p.z] });
    }
  });
  for (const pt of points) {
    for (const frac of [0.1, 0.5, 0.9]) {
      const cam = makePerspectiveCamera(shot, (shot.dur ?? 1) * frac, 9 / 16);
      const ndc = projectWorldPoint(cam, pt.pos);
      if (!ndc.inFront || Math.abs(ndc.x) >= 0.85 || ndc.y <= -0.45 || ndc.y >= 0.88) {
        issues.push({
          cue: shot.cue,
          text: pt.text,
          ndc: [ndc.x, ndc.y, ndc.z],
          message: `[${shot.cue}] FloatingNumber "${pt.text}" out of 9:16 safe bounds: ndc=(${ndc.x.toFixed(2)}, ${ndc.y.toFixed(2)})`,
        });
      }
    }
  }
  return issues;
}

export function checkSweptActorCollision(positions, actorRadius, obstacleMin, obstacleMax) {
  const hits = [];
  for (const pos of positions) {
    const aMin = [pos[0] - actorRadius, pos[1], pos[2] - actorRadius];
    const aMax = [pos[0] + actorRadius, pos[1] + 1.8, pos[2] + actorRadius];
    const ox = Math.min(aMax[0], obstacleMax[0]) - Math.max(aMin[0], obstacleMin[0]);
    const oy = Math.min(aMax[1], obstacleMax[1]) - Math.max(aMin[1], obstacleMin[1]);
    const oz = Math.min(aMax[2], obstacleMax[2]) - Math.max(aMin[2], obstacleMin[2]);
    if (ox > 0.01 && oy > 0.01 && oz > 0.01) {
      hits.push({ pos, overlap: [ox, oy, oz] });
    }
  }
  return { ok: hits.length === 0, hits };
}

// ---- Tier 1 & 2 Self-Tests (Synthetic Passing & Failing Fixtures) -----------

test("F7.SELF — Slept defect detectors (duplicate CellarGate, -Math.PI/2 lie, median <= 2.3s, 10.stopped crowd)", () => {
  const Zone = ({ children }) => children;
  const CellarGate = () => null;
  const Hero = () => null;

  const world = createElement(Zone, { name: "cellar" }, createElement(CellarGate, { position: [1, 0, 2] }));
  const stageBad = createElement(
    "group",
    null,
    createElement(CellarGate, { position: [1, 0, 2] }),
    createElement("group", { rotation: [-Math.PI / 2, 0, 0] }, createElement(Hero, { position: [0, 0.25, 0] })),
  );
  assert.equal(findDuplicateWorldSceneProps(world, [{ cue: "5.cellar", zone: "cellar", root: stageBad }]).length, 1);
  assert.equal(detectMinusHalfPiLieWrappers(stageBad).length, 1);
  assert.equal(checkMedianShotDuration({ cues: [{ start: 0, end: 2.4 }, { start: 2.4, end: 4.8 }] }).ok, false);

  const stageGood = createElement(Hero, { position: [0, 0, 0], animation: "sleep" });
  assert.equal(findDuplicateWorldSceneProps(world, [{ cue: "5.cellar", zone: "cellar", root: stageGood }]).length, 0);
  assert.equal(detectMinusHalfPiLieWrappers(stageGood).length, 0);
  assert.equal(checkMedianShotDuration({ cues: [{ start: 0, end: 2.1 }, { start: 2.1, end: 4.1 }] }).ok, true);
});

test("F8.SELF — Bottom defect detectors (words/WPM, RichMansion visibility, crab-walk)", () => {
  assert.equal(checkBottomScriptPace({ duration: 164.8, words: new Array(636).fill({}), wordsPerMinute: 232.2 }).ok, false);
  assert.equal(checkBottomScriptPace({ duration: 164.8, words: new Array(680).fill({}), wordsPerMinute: 248.0 }).ok, true);

  const goodHookShot = {
    dur: 2.0,
    from: [2, 3.0, 10],
    to: [3, 4.0, 6],
    target: [6.4, 9.5, -33.2],
    fov: 42,
  };
  assert.equal(checkRichMansionVisibility(goodHookShot).ok, true);

  const occludedShot = {
    dur: 2.0,
    from: [0, 1.5, 15],
    to: [0, 1.5, 12],
    target: [0, 1.5, 10],
    fov: 38,
  };
  assert.equal(checkRichMansionVisibility(occludedShot).ok, false);

  const Villager = () => null;
  const crab = detectStationaryWalks(
    (_i, t) => createElement(Villager, { position: [-1, 0, 8 + t * 1.5], rotationY: -Math.PI / 2, walk: t * 2 }),
    [{ cue: "1.town", dur: 1 }],
  );
  assert.ok(crab.some((x) => x.kind === "crab-walk"));
});

test("F9.SELF — Stole-Things defect detectors (sill repetition, backwards Fox, empty 11.count)", () => {
  const sillShots = Array.from({ length: 52 }, (_, i) => ({
    target: i < 29 ? [-8.5, 1, -4.5] : [2, 1, 2],
  }));
  assert.equal(checkSillRepetition(sillShots).ok, false);
  const variedShots = Array.from({ length: 52 }, (_, i) => ({
    target: i < 15 ? [-8.5, 1, -4.5] : [i, 1, 2],
  }));
  assert.equal(checkSillRepetition(variedShots).ok, true);

  const Fox = () => null;
  const Pile = () => null;
  assert.equal(checkFoxSillFacing(createElement(Fox, { position: [-8.5, 0, -3.5], rotationY: 0 })).length, 1);
  assert.equal(checkFoxSillFacing(createElement(Fox, { position: [-8.5, 0, -3.5], rotationY: Math.PI })).length, 0);
  assert.equal(checkShotHasActor(createElement(Pile, { reveal: 1 })).ok, false);
  assert.equal(checkShotHasActor(createElement("group", null, createElement(Pile, {}), createElement(Fox, {}))).ok, true);
});

test("F10.SELF — Inflation defect detectors (Plinth/BarChart overlap, bakery repetition, FloatingNumber 9:16 margins)", () => {
  const Block = () => null;
  const FloatingNumber = () => null;

  const colliding = [
    { tag: "Plinth", path: "plinth", min: [-0.5, 0, -1.05], max: [0.5, 0.95, -0.05] },
    { tag: "BarChart", path: "chart", min: [0.0, 0, -0.85], max: [0.7, 1.4, -0.15] },
  ];
  assert.ok(findCoplanarOrOverlapping(colliding).length > 0);
  const clear = [
    { tag: "Plinth", path: "plinth", min: [-0.5, 0, -1.05], max: [0.5, 0.95, -0.05] },
    { tag: "BarChart", path: "chart", min: [0.8, 0, -0.85], max: [1.5, 1.4, -0.15] },
  ];
  assert.deepEqual(findCoplanarOrOverlapping(clear), []);

  assert.equal(checkBakeryPlinthRepetition(Array.from({ length: 37 }, (_, i) => ({ zone: i < 25 ? "bakery" : "hall" }))).ok, false);
  assert.equal(checkBakeryPlinthRepetition(Array.from({ length: 37 }, (_, i) => ({ zone: i < 12 ? "bakery" : "hall" }))).ok, true);

  const shot = { cue: "1.hook", dur: 1.5, from: [0, 1.5, 4], to: [0, 1.5, 3], target: [0, 1.2, 0], fov: 40 };
  const okNum = createElement(FloatingNumber, { position: [0, 1.5, 0], value: "$10" });
  const offscreenNum = createElement(FloatingNumber, { position: [5.0, 1.5, 0], value: "$10" });
  assert.deepEqual(checkFloatingNumbersInFrame(okNum, shot), []);
  assert.ok(checkFloatingNumbersInFrame(offscreenNum, shot).length > 0);
  void Block;
});

test("F11.SELF — Furnace defect detectors (SnowTrail coplanar cobble, 2.dark outExpo whip, 8.puddle counter collision)", () => {
  const Vox = () => null;
  const Block = () => null;
  const cobbleAndBuriedSnow = extractBoxes(
    createElement(
      "group",
      null,
      createElement(Vox, { position: [0, -0.2, 1.2], size: [12, 0.5, 11] }),
      createElement(Block, { position: [0, 0.025, 0], size: [0.85, 0.05, 0.85] }),
    ),
  );
  assert.ok(findCoplanarOrOverlapping(cobbleAndBuriedSnow).length > 0);

  const cobbleAndRaisedSnow = extractBoxes(
    createElement(
      "group",
      null,
      createElement(Vox, { position: [0, -0.2, 1.2], size: [12, 0.5, 11] }),
      createElement(Block, { position: [0, 0.08, 0], size: [0.85, 0.05, 0.85] }),
    ),
  );
  assert.deepEqual(findCoplanarOrOverlapping(cobbleAndRaisedSnow), []);

  assert.ok(
    detectOutExpoTailFreeze({
      cue: "2.dark",
      dur: 1.9,
      from: [0, 1.5, 4],
      target: [0, 1.2, 0],
      targetTo: [3, 1.2, 0],
      ease: "outExpo",
    }),
  );

  // 8.puddle counter AABB: x:[-1.3..1.3], y:[0..0.58], z:[0.425..0.875]
  const collide = checkSweptActorCollision([[ -0.6, 0, 0.65 ]], 0.25, [-1.3, 0, 0.425], [1.3, 0.58, 0.875]);
  assert.equal(collide.ok, false);
  const clearWalk = checkSweptActorCollision([[ -0.6, 0, 1.35 ]], 0.25, [-1.3, 0, 0.425], [1.3, 0.58, 0.875]);
  assert.equal(clearWalk.ok, true);
});

// ---- Live Target Suite (--target <slug> or --all) -----------------------------

if (MODE === "target" || MODE === "all") {
  const targets =
    MODE === "target" && TARGET_ARG
      ? [TARGET_ARG]
      : TARGET_SHORTS;

  for (const slug of targets) {
    test(`LIVE [${slug}] — Timing, sound.lock, rehearse --final, motion, camera, z-fight & Short-specific gates`, async () => {
      const restoreDoc = installDomCanvasStub();
      try {
        const dir = path.join(REPO_ROOT, "src/videos", slug);
        const timing = JSON.parse(fs.readFileSync(path.join(dir, "timing.json"), "utf8"));
        const tRes = validateTimingSchema(timing, { requireAligned: true });
        assert.equal(tRes.ok, true, `${slug} timing.json errors: ${tRes.errors.join("; ")}`);

        const lockPath = path.join(dir, "sound.lock.json");
        assert.equal(fs.existsSync(lockPath), true, `${slug} missing sound.lock.json`);
        const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
        const lRes = validateSoundLockSchema(lock);
        assert.equal(lRes.ok, true, `${slug} sound.lock.json errors: ${lRes.errors.join("; ")}`);

        const reh = spawnSync(process.execPath, ["scripts/rehearse.mjs", slug, "--final"], {
          cwd: REPO_ROOT,
          encoding: "utf8",
        });
        assert.equal(reh.status, 0, `rehearse --final failed for ${slug}:\n${reh.stdout}\n${reh.stderr}`);

        const snd = spawnSync("python3", ["scripts/sound.py", "check", slug], {
          cwd: REPO_ROOT,
          encoding: "utf8",
        });
        assert.equal(snd.status, 0, `sound.py check failed for ${slug}:\n${snd.stdout}\n${snd.stderr}`);

        const film = await loadFilm(REPO_ROOT, slug);
        setShimClock({ frame: 0, fps: film.fps });
        const worldTree = await renderHookedElement(createElement(film.World, {}));

        const allShots = [];
        const stageRoots = [];
        const motionIssues = [];
        const tailFreezes = [];

        for (const scene of film.scenes) {
          allShots.push(...scene.shots);
          if (scene.sampleStage) {
            motionIssues.push(...detectStationaryWalks(scene.sampleStage, scene.shots));
            for (const [idx, shot] of scene.shots.entries()) {
              const freeze = detectOutExpoTailFreeze(shot);
              if (freeze) tailFreezes.push(freeze);
              const root = scene.sampleStage(idx, shot.dur * 0.5);
              stageRoots.push({ cue: shot.cue, zone: shot.zone, root });
            }
          }
        }

        assert.deepEqual(motionIssues, [], `${slug} motion issues:\n${motionIssues.map((m) => m.message).join("\n")}`);
        assert.deepEqual(tailFreezes, [], `${slug} outExpo tail freezes:\n${tailFreezes.map((f) => f.message).join("\n")}`);

        const dupes = findDuplicateWorldSceneProps(worldTree, stageRoots);
        assert.deepEqual(dupes, [], `${slug} World+Scene duplicate props:\n${dupes.map((d) => d.message).join("\n")}`);

        if (slug === "in-this-town-nobody-has-ever-slept") {
          const med = checkMedianShotDuration(timing, 2.3);
          assert.equal(med.ok, true, `slept medianShotSeconds=${med.median.toFixed(2)}s > 2.3s`);
          const lieHits = stageRoots.flatMap((s) => detectMinusHalfPiLieWrappers(s.root));
          assert.deepEqual(lieHits, [], lieHits.map((h) => h.message).join("\n"));
        }

        if (slug === "in-this-town-we-live-at-the-bottom") {
          const pace = checkBottomScriptPace(timing);
          assert.equal(pace.ok, true, `bottom script pace out of bounds: ${pace.words} words, ${pace.wpm.toFixed(1)} WPM`);
          const hookShot = allShots.find((s) => s.cue === "1.town") ?? allShots[0];
          const vis = checkRichMansionVisibility(hookShot);
          assert.equal(vis.ok, true, "bottom 1.town hook must frame RichMansion prominently in 9:16");
        }

        if (slug === "in-this-town-my-family-stole-things") {
          const sillRep = checkSillRepetition(allShots);
          assert.equal(sillRep.ok, true, `stole-things sill repetition ${sillRep.sillCount}/${sillRep.total} (${(sillRep.ratio * 100).toFixed(1)}%) > 40%`);
          const foxBad = stageRoots.flatMap((s) => checkFoxSillFacing(s.root));
          assert.deepEqual(foxBad, [], foxBad.map((f) => f.message).join("\n"));
          const countStage = stageRoots.find((s) => s.cue === "11.count");
          assert.ok(countStage && checkShotHasActor(countStage.root).ok, "11.count must include at least one actor");
        }

        if (slug === "inflation-explained-using-minecraft") {
          const rep = checkBakeryPlinthRepetition(allShots);
          assert.equal(rep.ok, true, `inflation bakery/plinth repetition ${rep.bakery}/${rep.total} (${(rep.ratio * 100).toFixed(1)}%) > 45%`);
          const floatIssues = [];
          for (const scene of film.scenes) {
            if (!scene.sampleStage) continue;
            for (const [idx, shot] of scene.shots.entries()) {
              floatIssues.push(...checkFloatingNumbersInFrame(scene.sampleStage(idx, shot.dur * 0.5), shot));
            }
          }
          assert.deepEqual(floatIssues, [], floatIssues.map((i) => i.message).join("\n"));
        }

        if (slug === "in-this-town-nobody-turns-on-a-furnace") {
          const snowBoxes = extractBoxes(worldTree).filter((b) => Math.abs(b.size[0] - 0.85) < 0.02 && Math.abs(b.size[1] - 0.05) < 0.01);
          for (const sb of snowBoxes) {
            assert.ok(sb.min[1] >= 0.052, `SnowTrail bottom y=${sb.min[1].toFixed(3)}m buried in y=0.05 cobble`);
          }
        }
      } finally {
        restoreDoc();
      }
    });
  }
}
