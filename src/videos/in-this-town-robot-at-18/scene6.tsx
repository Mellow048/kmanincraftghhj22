import type React from "react";
import { Glow, blendPose, cam, storyScene } from "../../engine";
import type { FaceName, Pose, Vec3 } from "../../engine";
import {
  Beam, Bits, Bubble, Bush, Crater, CutTree, DUSK, DustRing, Fill, Hero, Jets, Katana, OldMan, Streaks, ZONE,
  ease, f, hop, jolt, lerp, pop, ramp, timing, toward, wordAt,
} from "./kit";
import {
  AIMED, Arc, BENT, CHOPPED, COILED, Crack, DRAWN, DUCKED, Dash, Debris, DustColumn, Flash, Flyer, HIGH, LANDED, LOW, P, PINNED, READY, RISEN, SKIPPED,
  STRUCK, SWEEP0, SWEEP1, SkyRun, TALL, THRUST, TUCKED, WARY, backpedal, crab, flail, hold, hover, keys, out, rocket, slow, snap, soar, sprint, tumble,
} from "./fight";
import { BUSH, ME, OLD, TREE } from "./scene5";

/**
 * THE FIGHT. Thirty shots in thirty-nine seconds, and every body in them is posed frame by frame (see fight.tsx).
 *
 * The clearing runs west to east and the camera lives south of it. ONE RULE keeps it readable: the old man is
 * always on the right and always coming left; the teller is always on the left and always going left, away from
 * him. Over the trees it is the same: they fly west, into the sun, the old man behind.
 *
 * A line of narration is cut into two or three angles with `cut` (seconds into the line).
 */
const E = Math.PI / 2;
const W = -Math.PI / 2;
const RED = "#ff3b2e";
const CYAN = "#4fe3ff";
/** The line the fight runs along. */
const ZL = -0.85;
const at = (x: number, y = 0, z = ZL): Vec3 => f(x, y, z);

/** Where 11.landed left them. */
export const ME0: Vec3 = [lerp(ME[0], OLD[0] - 0.25, 0.62), 0, lerp(ME[2], OLD[2], 0.62)];
export const OLD0: Vec3 = OLD;
const O0 = { x: 2.2, z: -1.4 };
/** The tree the blade goes into, behind where he ducks. It falls west, clear of the fight. */
const TREE2: Vec3 = f(-0.6, 0, -2.3);
/** The pine at the west edge of the clearing: where the forest runs out. It is the world's; nobody cuts it. */
const PINE = { x: -8.5, z: -1.0 };
/** Where he comes down. */
export const CR: Vec3 = f(1.2, 0, -0.2);

/** The sky is its own place: nothing of the town or the clearing is drawn there. */
const SKY0: Vec3 = [0, 0, -400];
const S = (x: number, y: number, z = 0): Vec3 => [x, y, -400 + z];
const cueStart = (id: string) => timing.cues.find((c) => c.id === id)!.start;
const cueDur = (id: string) => { const c = timing.cues.find((x) => x.id === id)!; return c.end - c.start; };
const SKY_T = cueStart("12.chase");
/** How far the treetops have run past, at `t` seconds into a shot that cut in at `cut` in line `cue`. */
const scroll = (cue: string, cut: number, t: number) => 24 * (cueStart(cue) + cut + t - SKY_T);

const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;

const Old: React.FC<{ position: Vec3; yaw?: number; pose: Pose; lance?: number; blade?: number }> = ({ position, yaw = W, pose, lance = 0, blade = 1 }) => (
  <OldMan position={position} rotationY={yaw} suit={1} pose={pose} breath={0} weightShift={0}>
    {blade > 0.02 ? <Katana out={blade} lance={lance} /> : null}
  </OldMan>
);
const Me: React.FC<{ position: Vec3; yaw?: number; pose: Pose; eyes?: number; visor?: number; face?: FaceName }> = ({ position, yaw = E, pose, eyes = 1, visor = 0, face = "fear" }) => (
  <Hero position={position} rotationY={yaw} suit={1} pose={pose} breath={0} weightShift={0} eyes={eyes} visor={visor} face={face} />
);

/** What is standing in the clearing while they fight. */
export const Woods: React.FC<{ cut2?: number; shake?: number; t?: number; hole?: boolean }> = ({ cut2 = 0, shake = 0, t = 0, hole = false }) => (
  <>
    <CutTree position={TREE} cut={1} dir={-1} />
    <CutTree position={TREE2} cut={cut2} at={1.75} dir={-1} />
    <Bush position={BUSH} shake={shake} t={t} />
    {hole ? <Crater position={CR} /> : null}
  </>
);

// --- poses that belong to one moment only
const NECK = P({ pitch: -0.04, R: [-0.08, 0], L: [0.08, 0], aR: [0.12, 0, 0.3], aL: [0.05, 0, -0.12], head: [-0.1, 0, 0.5] });
const LOOKUP = P({ pitch: -0.1, R: [-0.08, 0], L: [0.08, 0], aR: [0.12, 0, 0.3], aL: [0.05, 0, -0.12], head: [-0.8, 0, 0] });
const SHOWN = P({ pitch: 0, R: [-0.2, 0.2], L: [0.2, 0.2], aR: [-1.57, 0, 1.1], aL: [0.05, 0, -0.2], head: [0, 0.5, 0] });
const SPIN = P({ pitch: 0.15, R: [-0.5, 0.6], L: [0.45, 0.5], aR: [-1.5, 0, 1.45], aL: [-0.6, 0, -0.9] });
const FLIP = P({ air: true, R: [-1.4, 1.9], L: [-1.3, 1.9], aR: [-0.6, 0, 0.5], aL: [-0.9, 0, -0.4], head: [0.4, 0, 0] });
const PEEK = P({ pitch: 0.7, R: [-1.05, 2.0], L: [-0.95, 2.0], aR: [-1.6, 0, -0.3], aL: [-1.6, 0, 0.3], head: [-0.75, 0, 0] });
const COOL = P({ air: true, pitch: -0.03, aR: [-2.2, 0, 0.25], aL: [0.05, 0, -0.2], R: [-0.25, 0.5], L: [0.1, 0.3], head: [0.1, 0, 0.3] });
const GUARD = P({ air: true, pitch: 0.1, aR: [-1.4, 0, 0], aL: [-1.2, 0, 0.6], R: [-0.3, 0.6], L: [0.2, 0.4], head: [-0.1, 0, 0] });
const HIGH_AIR = P({ air: true, pitch: -0.3, aR: [-3.0, 0, 0.12], aL: [-2.7, 0, -0.3], R: [-0.3, 0.5], L: [0.3, 0.5], head: [-0.15, 0, 0] });
const CHOP_AIR = P({ air: true, pitch: 0.55, aR: [-0.9, 0, -0.08], aL: [-0.4, 0, 0.1], R: [-0.6, 0.9], L: [0.5, 0.4], head: [-0.4, 0, 0] });
const PAST = P({ air: true, pitch: 0.4, yaw: 0.85, aR: [-1.5, 0, 1.4], aL: [-0.5, 0, -0.7], R: [-0.5, 0.7], L: [0.5, 0.4], head: [0, -0.5, 0] });
const JUMPY = P({ air: true, pitch: -0.25, aR: [-2.3, 0, 0.8], aL: [-2.3, 0, -0.8], R: [-0.5, 0.8], L: [-0.3, 0.9] });
const RELIEF = P({ air: true, pitch: 0.06, aR: [0.08, 0, 0.3], aL: [-1.0, 0, 0.5], R: [-0.3, 0.55], L: [0.1, 0.35], head: [0.4, -1.0, 0] });
const MYHAND = P({ air: true, pitch: 0.1, aR: [-1.2, 0, -0.3], aL: [0.05, 0, -0.3], R: [-0.3, 0.55], L: [0.1, 0.35], head: [0.4, 0.3, 0] });

/** The first leap, by how far through it he is: from where he stood to where he lands, blade up. */
const leap = (u: number) => ({
  position: at(lerp(O0.x, 1.05, u), 1.7 * 4 * u * (1 - u), lerp(O0.z, -1.1, u)),
  pose: keys(u, [[0, COILED], [0.25, HIGH], [0.7, HIGH], [0.92, SWEEP0]]),
});
/** The somersault over to him. */
const FLIP_AT = 1.62;
const FLIP_LEN = 0.67;
const flip = (u: number) => ({
  position: at(lerp(1.05, -0.6, u), 1.6 * 4 * u * (1 - u), lerp(-1.1, -0.75, u)),
  pose: { ...FLIP, bodyPitch: Math.PI * 2 * u } as Pose,
});
const io = (k: number) => -(Math.cos(Math.PI * Math.min(1, Math.max(0, k))) - 1) / 2;

const NOT = w("12.suit", "not");
const C_SUIT = 1.55;
const C_KAT = 1.25;
const C_DUCK = 1.72;
const C_DUCKED = 1.3;
const C_AG1 = 1.25;
const C_AG2 = 2.3;
const C_BACK = 1.5;
const C_UP = 0.78;
const C_FOL = 1.2;
const C_CH1 = 1.3;
const C_CH2 = 2.4;
const C_DG1 = 1.75;
const C_DG2 = 2.6;
const C_BM = 1.35;
const C_SW1 = 1.0;
const C_SW2 = 2.2;
const C_HOLE = 1.1;

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The fight",
  shots: [
    // ------------------------------------------------------------------ he is not an old man
    {
      cue: "12.suit",
      ...cam.orbit({ on: [OLD0[0], 1.25, OLD0[2]], dist: 4.4, distTo: 3.4, yaw: -30, yawTo: 6, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The camera swings round the old man. He stops shaking. Dark metal slams shut over him with a ring of dust and a red flash, and behind him the teller's visor snaps down and he goes back a step.",
      impacts: [{ at: NOT, amp: 0.08, dur: 0.35 }],
      stage: (t) => {
        const on = t > NOT;
        const back = 0.6 * ease(ramp(t, NOT, NOT + 0.4));
        return (
          <>
            <OldMan position={[OLD0[0] + (on ? 0 : Math.sin(t * 42) * 0.015), hop(t, NOT, 0.3, 0.3), OLD0[2]]} rotationY={toward(OLD0, ME0)} animation={on ? "idle" : "ache"} suit={on ? 1 : 0} headPitch={on ? -0.05 : 0.3} />
            <DustRing position={OLD0} t={t - NOT} size={2.4} color="#8a8a66" />
            <Bits position={[OLD0[0], 1.0, OLD0[2] + 0.3]} t={t - NOT} color={RED} count={22} power={3} />
            <Bits position={[OLD0[0], 0.3, OLD0[2] + 0.3]} t={t - NOT} color="#34343e" count={14} power={2.4} />
            <Flash position={[OLD0[0], 1.2, OLD0[2] + 0.3]} t={t - NOT} size={3.5} color="#ff6a50" life={0.2} />
            <Hero position={[ME0[0] - back, 0, ME0[2]]} rotationY={E} animation={on ? "stagger" : "reach"} animDistance={back} suit={1} visor={on ? 0 : 1} face="wow" />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.suit",
      cut: C_SUIT,
      ...cam.push({ on: [OLD0[0], 1.3, OLD0[2]], dist: 5.2, to: 3.9, yaw: -55, pitch: 3, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Past the teller's shoulder. The old man rolls his head on his neck, once, like somebody who has waited a long time. Then on 'suit' he drops into a fighting stance and his eyes burn red.",
      stage: (t) => {
        const st = w("12.suit", "suit", C_SUIT);
        return (
          <>
            <Old position={OLD0} pose={keys(t, [[0, TALL], [0.4, NECK], [0.75, TALL], [st + 0.05, READY, snap]])} blade={0} />
            <Glow position={[OLD0[0] - 0.3, 1.62, OLD0[2] + 0.1]} size={0.5 + 0.9 * ramp(t, st, st + 0.3)} color={RED} opacity={0.5} />
            <DustRing position={OLD0} t={t - st - 0.05} size={1.4} color="#8a8a66" />
            <Me position={[ME0[0] - 0.6 - 0.3 * ease(ramp(t, st, st + 0.5)), 0, ME0[2]]} pose={blendPose(TALL, WARY, ease(ramp(t, 0.1, 0.6)))} />
            <Woods />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ the blade
    {
      cue: "12.katana",
      ...cam.push({ on: [OLD0[0] - 0.25, 1.75, OLD0[2] + 0.6], dist: 3.2, to: 2.5, yaw: -12, pitch: -6, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Close. He throws his arm out to the side, and on 'slid' a long blade runs up out of it with a ring and a line of sparks, straight up past his red eyes. Then he whips it down.",
      impacts: [{ at: 0.62, amp: 0.04, dur: 0.2 }],
      stage: (t) => {
        const k = w("12.katana", "slid");
        const blade = ease(ramp(t, k - 0.05, k + 0.17));
        const tip: Vec3 = [OLD0[0] - 0.28, 1.45 + 1.25 * blade, OLD0[2] + 0.9];
        return (
          <>
            <Old position={OLD0} pose={keys(t, [[0, READY], [0.25, SHOWN, out], [0.98, SHOWN], [1.2, READY, snap]])} blade={blade} />
            <Bits position={tip} t={t - k} color="#ffd8cc" count={12} power={1.4} />
            <Bits position={[tip[0], 1.5, tip[2]]} t={t - k + 0.05} color={RED} count={8} power={1.0} />
            <Flash position={tip} t={t - k - 0.17} size={1.6} color="#ffe8e0" />
            <Glow position={[OLD0[0] - 0.3, 1.62, OLD0[2] + 0.1]} size={1.2} color={RED} opacity={0.4} />
            <Me position={[ME0[0] - 0.9, 0, ME0[2]]} pose={WARY} />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.katana",
      cut: C_KAT,
      ...cam.push({ on: at(1.15, 1.2, -1.0), onTo: at(0.95, 1.7, -1.0), dist: 6.2, to: 5.4, yaw: 0, pitch: 2, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Wide. He sinks onto his heels, and on 'jumped' he is in the air: up and across the clearing with the blade over his head and the dust still spreading where he stood. The teller's hands come up.",
      impacts: [{ at: 0.31, amp: 0.06, dur: 0.25 }],
      stage: (t) => {
        const j = w("12.katana", "jumped", C_KAT);
        const u = ramp(t, j, j + 0.9);
        const L = leap(u);
        return (
          <>
            {t < j ? <Old position={OLD0} pose={keys(t, [[0, READY], [j - 0.04, COILED, out]])} /> : <Old position={L.position} pose={L.pose} />}
            {u > 0 ? <Streaks position={[L.position[0] + 1.3, L.position[1] + 1.3, L.position[2]]} yaw={W} t={t} n={10} spread={0.9} speed={18} color="#ffd0c0" /> : null}
            <DustRing position={OLD0} t={t - j} size={2.2} color="#8a8a66" />
            <Debris position={[OLD0[0], 0.05, OLD0[2]]} t={t - j} count={10} power={2.2} size={0.14} />
            <Me position={[ME0[0] - 0.9, 0, ME0[2]]} pose={WARY} />
            <Woods />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ DUCK
    {
      cue: "12.duck",
      ...cam.push({ on: at(0.5, 1.75, -1.0), dist: 3.7, to: 3.1, yaw: 14, pitch: -8, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Everything slows down. The old man hangs in the air above him, turning the blade over for the cut. The teller has not moved. The helmet's eyes flash, and one word comes up: DUCK.",
      stage: (t, { dur }) => {
        const d = w("12.duck", "duck");
        const L = leap(0.71 + 0.19 * (t / dur));
        const H: Vec3 = [ME0[0] - 0.9, 0, ME0[2]];
        return (
          <>
            <Old position={L.position} pose={L.pose} lance={ramp(t, 0.9, 1.6)} />
            <Streaks position={[L.position[0] + 1.3, L.position[1] + 1.3, L.position[2]]} yaw={W} t={t * 0.2} n={8} spread={1.0} speed={10} color="#ffd0c0" />
            <Me position={H} pose={blendPose(WARY, DUCKED, 0.35 * ramp(t, d + 0.08, dur))} eyes={1 + 3 * Math.abs(jolt(t, d - 0.1, 1))} />
            <group scale={pop(t, d - 0.12)}>
              <Bubble text="DUCK!" position={[H[0] - 0.2, 2.5, H[2] + 0.25]} rotationY={0.2} scale={0.62} dark />
            </group>
            <Fill on={[H[0], 1.5, H[2]]} yaw={14} power={3} />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.duck",
      cut: C_DUCK,
      ...cam.push({ on: at(0.45, 1.0, -1.0), dist: 5.0, to: 4.6, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "And back to full speed. He drops. The old man lands and the cut comes round flat, a white line an arm's length over the teller's back, and the frame it passes on is held white.",
      impacts: [{ at: 0.18, amp: 0.1, dur: 0.3 }],
      stage: (t) => {
        const tt = hold(t, 0.2, 0.1);
        const L = leap(0.9 + 0.1 * ramp(tt, 0, 0.12));
        return (
          <>
            <Old position={L.position} pose={tt < 0.12 ? L.pose : keys(tt, [[0.12, SWEEP0], [0.2, SWEEP1, snap]])} lance={1} />
            <Arc position={at(1.05, 1.38, -1.1)} yaw={W} t={tt - 0.12} a0={-1.25} a1={1.5} r={1.95} flat />
            <Flash position={at(0.1, 1.45, -0.9)} t={tt - 0.19} size={3.2} />
            <Bits position={at(0.1, 1.45, -0.9)} t={tt - 0.19} color="#ffe8d8" count={14} power={2.2} />
            <DustRing position={at(1.05, 0, -1.1)} t={tt - 0.12} size={1.6} color="#8a8a66" />
            <Me position={[ME0[0] - 0.9, 0, ME0[2]]} pose={keys(tt, [[0, blendPose(WARY, DUCKED, 0.35)], [0.1, DUCKED, out]])} />
            <Woods cut2={tt > 0.19 ? 0.002 : 0} />
          </>
        );
      },
    },
    {
      cue: "12.ducked",
      ...cam.push({ on: at(0.3, 0.85, -0.9), dist: 3.1, to: 2.6, yaw: -16, pitch: 1, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Low, beside him: rolled up on the grass with his arms over his head. The blade is still out past him. He lifts his head to see if it is still on.",
      stage: (t) => (
        <>
          <Me position={[ME0[0] - 0.9, 0, ME0[2]]} pose={keys(t, [[0, DUCKED], [0.45, DUCKED], [0.75, PEEK]])} />
          <Old position={at(1.05, 0, -1.1)} pose={keys(t, [[0, SWEEP1], [0.55, SWEEP1], [1.05, TALL]])} lance={1 - ramp(t, 0.55, 1.0)} />
          <Bits position={at(-0.4, 2.0, -1.9)} t={t + 0.05} color="#3a7d34" count={12} power={1.2} />
          <Woods cut2={0.002} />
        </>
      ),
    },
    {
      cue: "12.ducked",
      cut: C_DUCKED,
      ...cam.push({ on: at(-0.8, 1.7, -1.6), onTo: at(-1.3, 1.45, -1.3), dist: 7.6, to: 6.8, yaw: 0, pitch: 3, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Wide. Behind him, a line of light across a tree trunk. On 'tree' the top half slides off it and comes down across the clearing. He goes backwards on his hands and heels. The old man does not watch the tree: he sinks, and goes over in a somersault after him.",
      impacts: [{ at: 1.3, amp: 0.1, dur: 0.4 }],
      stage: (t) => {
        const tr = w("12.ducked", "tree", C_DUCKED);
        const d = 1.9 * ease(ramp(t, 0.1, 1.3));
        const u = ramp(t, FLIP_AT, FLIP_AT + FLIP_LEN);
        const F = flip(u);
        return (
          <>
            <Me position={at(0.0 - d, 0, lerp(-0.72, -0.75, ramp(t, 0, 1.3)))} pose={blendPose(blendPose(PEEK, crab(d), ramp(t, 0, 0.2)), WARY, ease(ramp(t, 1.3, 1.7)))} />
            {u > 0 ? <Old position={F.position} pose={F.pose} /> : <Old position={at(1.05, 0, -1.1)} pose={keys(t, [[0, TALL], [FLIP_AT - 0.3, TALL], [FLIP_AT - 0.03, COILED, out]])} />}
            {u > 0 ? <Streaks position={[F.position[0] + 1.2, F.position[1] + 0.9, F.position[2]]} yaw={W} t={t} n={8} spread={0.8} speed={18} color="#ffd0c0" /> : null}
            <DustRing position={at(1.05, 0, -1.1)} t={t - FLIP_AT} size={1.8} color="#8a8a66" />
            <Bits position={[TREE2[0], 1.8, TREE2[2] + 0.3]} t={t - tr + 0.3} color="#3a7d34" count={22} power={3} />
            <Bits position={[TREE2[0], 1.75, TREE2[2] + 0.3]} t={t - tr + 0.3} color="#ffb060" count={12} power={2} />
            <DustRing position={[TREE2[0] - 3.2, 0, TREE2[2]]} t={t - 1.3} size={2.8} color="#8a8a66" />
            <Debris position={[TREE2[0] - 3.2, 0.1, TREE2[2]]} t={t - 1.3} count={14} power={2.6} color="#3a7d34" alt="#6b5a40" size={0.22} />
            <Woods cut2={Math.max(0.002, ease(ramp(t, tr - 0.35, 1.4)))} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ again, and again, and again
    {
      cue: "12.again",
      ...cam.truck({ on: at(-1.3, 1.2, -0.75), dist: 5.8, yaw: 0, pitch: 3, fov: 44, by: [-0.9, 0, 0] }),
      zone: ZONE.forest,
      look: DUSK,
      note: "ONE. He lands on one knee and a fist, and on 'spun' he comes up out of it turning: a full turn with the blade out flat, a ring of light at waist height. The teller jumps it with his knees up to his chin.",
      impacts: [{ at: 0.12, amp: 0.07, dur: 0.25 }, { at: 0.93, amp: 0.08, dur: 0.25 }],
      stage: (t) => {
        const hit = w("12.again", "again");
        const s0 = hit - 0.45;
        const turn = ramp(t, s0, s0 + 0.6);
        const u = ramp(t + (cueDur("12.ducked") - C_DUCKED - FLIP_AT), 0, FLIP_LEN);
        const F = flip(u);
        const ox = -0.6 - 0.7 * ease(ramp(t, s0, s0 + 0.6));
        const k = ramp(t, hit - 0.15, hit + 0.27);
        return (
          <>
            {u < 1 ? (
              <Old position={F.position} pose={F.pose} />
            ) : (
              <Old position={at(ox, 0, -0.75)} yaw={W + Math.PI * 2 * turn} pose={keys(t, [[0.12, LANDED], [s0 - 0.08, LANDED], [s0 + 0.04, SPIN, out], [s0 + 0.6, SPIN], [s0 + 0.78, READY]])} lance={ramp(t, s0 - 0.08, s0 + 0.04) * (1 - ramp(t, s0 + 0.6, s0 + 0.78))} />
            )}
            <Arc position={at(ox, 1.3, -0.75)} yaw={W} t={t - s0} a0={1.57} a1={1.57 + 6.28} r={1.95} flat draw={0.6} life={0.85} />
            <DustRing position={at(-0.6, 0, -0.75)} t={t - 0.12} size={1.8} color="#8a8a66" />
            <Debris position={at(-0.6, 0.05, -0.75)} t={t - 0.12} count={8} power={2} size={0.14} />
            <Me position={at(-1.9 - 1.0 * k, 0.95 * 4 * k * (1 - k), -0.75)} pose={keys(t, [[hit - 0.25, WARY], [hit - 0.07, TUCKED, out], [hit + 0.17, TUCKED], [hit + 0.29, WARY]])} />
            <Flash position={at(-2.5, 1.0, -0.75)} t={t - hit} size={2.4} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "12.again",
      cut: C_AG1,
      ...cam.push({ on: at(-2.6, 1.2, -0.6), dist: 5.0, to: 4.4, yaw: -58, pitch: -3, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "TWO. From in front of them, low: the old man comes up off the ground with the blade over his head and brings it straight down where the teller is. The teller throws himself sideways, at us. The blade goes into the grass and the grass splits.",
      impacts: [{ at: 0.41, amp: 0.13, dur: 0.35 }],
      stage: (t) => {
        const hit = w("12.again", "again", C_AG1, 1);
        const tt = hold(t, hit + 0.01, 0.08);
        const j = ramp(tt, 0.05, hit - 0.02);
        const k = ramp(tt, hit - 0.18, hit + 0.1);
        const k2 = ease(ramp(tt, hit + 0.15, hit + 0.57));
        return (
          <>
            <Old position={at(-1.3 - 0.7 * j, 0.5 * 4 * j * (1 - j), -0.75)} pose={keys(tt, [[0, READY], [hit - 0.12, HIGH, out], [hit, CHOPPED, snap], [hit + 0.35, CHOPPED], [hit + 0.6, LOW]])} lance={0.5} />
            <Arc position={at(-2.0, 1.38, -0.75)} yaw={W} t={tt - hit + 0.07} a0={2.0} a1={-0.5} r={1.8} />
            <Crack position={at(-3.0, 0, -0.75)} yaw={W} t={tt - hit} size={1.2} />
            <Debris position={at(-3.1, 0.05, -0.75)} t={tt - hit} count={18} power={3.2} />
            <DustRing position={at(-3.1, 0, -0.75)} t={tt - hit} size={2.0} color="#8a8a66" />
            <Flash position={at(-3.1, 0.3, -0.75)} t={tt - hit} size={2.6} color="#fff0d8" />
            <Me
              position={at(-2.9 - 0.6 * k - 0.4 * k2, 0.35 * 4 * k * (1 - k), -0.75 + 0.95 * k - 0.8 * k2)}
              pose={keys(tt, [[hit - 0.25, WARY], [hit - 0.1, SKIPPED, out], [hit + 0.1, SKIPPED], [hit + 0.35, WARY]])}
            />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "12.again",
      cut: C_AG2,
      ...cam.truck({ on: at(-3.5, 1.3, -0.65), dist: 4.8, yaw: 6, pitch: 2, fov: 44, by: [-0.7, 0, 0] }),
      zone: ZONE.forest,
      look: DUSK,
      note: "THREE. He rips the blade out of the ground and up in one move. The teller bends over backwards from the knees and for a slow half second the edge goes past his visor with sparks coming off it. Then he is running. Backwards.",
      impacts: [{ at: 0.56, amp: 0.06, dur: 0.25 }],
      stage: (t) => {
        const hit = w("12.again", "again", C_AG2, 2);
        const tt = slow(t, hit - 0.04, hit + 0.31, 0.35);
        const d = 0.7 * ease(ramp(tt, hit + 0.16, hit + 0.63));
        return (
          <>
            <Old position={at(-2.0 - 1.0 * ease(ramp(tt, 0.1, hit - 0.04)), 0, -0.7)} pose={keys(tt, [[0, LOW], [hit - 0.12, LOW], [hit + 0.02, RISEN, snap], [hit + 0.36, RISEN], [hit + 0.56, READY]])} lance={0.6} />
            <Arc position={at(-3.0, 1.3, -0.7)} yaw={W} t={tt - hit + 0.07} a0={-0.6} a1={2.1} r={1.95} draw={0.09} life={0.4} />
            <Bits position={at(-4.45, 1.3, -0.6)} t={tt - hit - 0.01} color="#ffe8d8" count={12} power={1.6} />
            <Flash position={at(-4.45, 1.3, -0.6)} t={tt - hit - 0.01} size={1.6} />
            <Me
              position={at(-3.9 - 0.4 * ease(ramp(tt, 0.05, hit - 0.09)) - d, 0, -0.6)}
              pose={blendPose(keys(tt, [[hit - 0.24, WARY], [hit - 0.04, BENT, out], [hit + 0.12, BENT], [hit + 0.41, WARY]]), backpedal(d * 1.5), ramp(tt, hit + 0.3, hit + 0.5))}
            />
            <Woods cut2={1} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ out of forest
    {
      cue: "12.back",
      ...cam.truck({ on: at(-5.0, 1.2, -0.7), dist: 5.6, yaw: -12, pitch: 3, fov: 46, by: [-2.6, 0, 0] }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The camera goes with them. The teller is going backwards as fast as two legs can, arms going like a windmill. The old man runs after him bent low, with the blade trailing behind him along the grass and throwing sparks.",
      shake: 0.015,
      stage: (t, { dur }) => {
        const d = 2.6 * io(t / dur);
        const od = 3.3 * io(ramp(t, 0.15, dur));
        return (
          <>
            <Me position={at(-5.0 - d, 0, -0.7)} pose={backpedal(0.7 * 1.5 + d * 1.5)} />
            <Old position={at(-3.0 - od, 0, -0.7)} pose={blendPose(READY, sprint(od), ramp(t, 0.15, 0.3))} lance={ramp(t, 0.15, 0.3)} />
            <Bits position={at(-3.0 - od + 1.5, 0.08, -0.4)} t={t > 0.3 ? t % 0.2 : 0} color="#ffd8a0" count={6} power={1.0} />
            <Bits position={at(-5.0 - d + 0.3, 0.08, -0.7)} t={t % 0.25} color="#8aa070" count={5} power={1.0} />
            <Streaks position={at(-5.0 - d, 1.3, -0.7)} yaw={E} t={t} n={10} spread={1.0} speed={16} color="#fff0e0" />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "12.back",
      cut: C_BACK,
      ...cam.push({ on: at(-7.5, 1.3, -0.95), dist: 4.6, to: 3.9, yaw: 10, pitch: 2, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "His back hits a pine, flat, arms out. Needles come down on him. That is the end of the clearing. The old man skids to a stop two steps away and draws the blade back.",
      impacts: [{ at: 0.1, amp: 0.1, dur: 0.3 }],
      stage: (t) => {
        const k = ramp(t, 0, 0.1);
        const hx = lerp(-7.6, PINE.x + 0.45, k) + jolt(t, 0.1, 0.06);
        return (
          <>
            <Me position={at(hx, 0, lerp(-0.7, PINE.z, k))} pose={keys(t, [[0, backpedal(5.0)], [0.1, PINNED, snap]])} />
            <Bits position={at(PINE.x + 0.2, 2.5, PINE.z)} t={t - 0.1} color="#2f5a34" count={22} power={1.2} />
            <Bits position={at(PINE.x + 0.3, 1.2, PINE.z)} t={t - 0.1} color="#6b4a2a" count={8} power={1.4} />
            <Old position={at(-6.3 - 0.4 * out(ramp(t, 0, 0.3)), 0, -0.8)} pose={keys(t, [[0, sprint(3.3)], [0.3, READY, out], [0.7, DRAWN]])} lance={1} />
            <Bits position={at(-6.5, 0.08, -0.8)} t={t + 0.02} color="#8aa070" count={10} power={1.4} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ up
    {
      cue: "12.up",
      ...cam.push({ on: at(-7.5, 1.4, -0.95), onTo: at(-7.9, 4.8, -0.95), dist: 4.8, to: 5.6, yaw: 10, pitch: -6, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The lunge comes. His boots light, and he is gone, straight up through the branches in a burst of needles. The blade goes a hand deep into the trunk where his chest was.",
      impacts: [{ at: 0.38, amp: 0.08, dur: 0.25 }, { at: 0.45, amp: 0.08, dur: 0.25 }],
      stage: (t) => {
        const go = 0.38;
        const up = t > go;
        const y = up ? 16 * Math.pow(t - go, 1.4) : 0;
        const hx = PINE.x + 0.45 + 0.3 * ramp(t, go, go + 0.4);
        return (
          <>
            {up ? (
              <Flyer who="hero" at={at(hx, y + 0.675, PINE.z)} yaw={E} pose={rocket(t, 1)} t={t} trail={Math.min(2.5, y)} />
            ) : (
              <Me position={at(hx, 0, PINE.z)} pose={keys(t, [[0, PINNED], [0.14, PINNED], [0.36, COILED, out]])} />
            )}
            <DustRing position={at(hx, 0, PINE.z)} t={t - go} size={2.2} color="#8a8a66" />
            <Flash position={at(hx, 0.3, PINE.z)} t={t - go} size={2.4} color="#a8f0ff" />
            <Bits position={at(PINE.x + 0.5, 2.6, PINE.z)} t={t - go - 0.1} color="#2f5a34" count={28} power={3} />
            <Old position={at(-6.7 - 0.35 * ramp(t, 0.3, 0.44), 0, -0.85)} pose={keys(t, [[0, DRAWN], [0.3, DRAWN], [0.44, THRUST, snap]])} lance={1} />
            <Flash position={at(PINE.x + 0.25, 1.3, PINE.z)} t={t - 0.45} size={1.8} color="#fff0d8" />
            <Bits position={at(PINE.x + 0.3, 1.3, PINE.z)} t={t - 0.45} color="#6b4a2a" count={14} power={2} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "12.up",
      cut: C_UP,
      from: f(-6.5, 12.5, 1.5),
      to: f(-6.3, 13.6, 1.7),
      target: f(-7.9, 3, -1.0),
      targetTo: f(-7.7, 9.5, -0.9),
      fov: 50,
      ease: "linear",
      zone: ZONE.forest,
      look: DUSK,
      note: "From above the trees, looking down: he comes up out of the clearing straight at us, arms and legs everywhere, and far below the old man is a small dark shape with his blade stuck in a tree.",
      shake: 0.015,
      stage: (t, { p }) => {
        const y = 4.4 + 7.4 * p;
        return (
          <>
            <Flyer who="hero" at={at(-7.5, y, -0.9)} yaw={E} pose={rocket(t, 1)} t={t} trail={3} />
            <Streaks position={at(-7.5, y, -0.9)} yaw={0} pitch={-Math.PI / 2} t={t} n={10} spread={1.2} speed={18} color="#fff0e0" />
            <Old position={at(-7.05, 0, -0.85)} pose={THRUST} lance={1} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ his feet lit up too
    {
      cue: "12.follow",
      ...cam.push({ on: at(-7.0, 1.45, -0.9), dist: 3.0, to: 2.4, yaw: 24, pitch: -16, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "From below him. He pulls the blade out of the trunk without looking at it, and tips his head back. Two red eyes, looking straight up.",
      stage: (t) => {
        const x = -7.05 + 0.2 * out(ramp(t, 0.12, 0.3));
        return (
          <>
            <Old position={at(x, 0, -0.85)} pose={keys(t, [[0, THRUST], [0.12, THRUST], [0.32, TALL, out], [0.45, TALL], [0.85, LOOKUP]])} lance={1 - ramp(t, 0.2, 0.45)} />
            <Bits position={at(PINE.x + 0.3, 1.3, PINE.z)} t={t - 0.12} color="#6b4a2a" count={12} power={1.6} />
            <Glow position={at(x - 0.25, 1.68, -0.6)} size={0.5 + 0.8 * ramp(t, 0.5, 0.9)} color={RED} opacity={0.5} />
            <Fill on={at(x, 1.4, -0.85)} yaw={24} power={3} color="#ffe0c8" />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "12.follow",
      cut: C_FOL,
      ...cam.push({ on: at(-6.85, 1.3, -0.9), onTo: at(-6.85, 6.0, -0.9), dist: 6.2, to: 7.6, yaw: 6, pitch: -10, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "On 'feet', red fire under his boots. He sinks, and goes: twice as fast as the teller did, in a straight line, and the grass where he stood goes outwards in two rings.",
      impacts: [{ at: 0.55, amp: 0.13, dur: 0.4 }],
      stage: (t) => {
        const feet = w("12.follow", "feet", C_FOL);
        const go = 0.55;
        const y = t > go ? 30 * Math.pow(t - go, 1.5) : 0;
        const P0 = at(-6.85, 0, -0.85);
        return (
          <>
            {t > go ? (
              <Flyer who="old" at={at(-6.85, y + 0.675, -0.85)} yaw={W} pose={rocket(t, 0)} t={t} lance={0} trail={Math.min(4, y)} />
            ) : (
              <>
                <Old position={P0} pose={keys(t, [[0, LOOKUP], [feet + 0.1, LOOKUP], [go - 0.04, { ...COILED, head: [-0.9, 0, 0] }, out]])} />
                <Jets position={P0} power={ramp(t, feet, feet + 0.18)} t={t} color={RED} />
              </>
            )}
            <Bits position={[P0[0], 0.1, P0[2]]} t={t - feet} color={RED} count={14} power={2.0} />
            <DustRing position={P0} t={t - go} size={2.6} color="#8a8a66" />
            <DustRing position={P0} t={t - go - 0.1} size={3.8} color="#a09a78" />
            <Debris position={[P0[0], 0.05, P0[2]]} t={t - go} count={18} power={3.4} />
            <Flash position={[P0[0], 0.4, P0[2]]} t={t - go} size={3.6} color="#ff7a5a" life={0.16} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ over the trees
    {
      cue: "12.chase",
      ...cam.push({ on: S(0.2, 10.6), onTo: S(-0.2, 12.0), dist: 9.5, to: 7.0, yaw: 0, pitch: 5, fov: 46 }),
      zone: "sky",
      look: DUSK,
      note: "Above the forest, at sunset, the treetops racing past underneath. The teller comes up through the leaves and tips over into something like flying, flat out, arms and legs going. A second later the old man comes up behind him and lies down on the air like a spear.",
      shake: 0.012,
      stage: (t) => {
        const k = ramp(t, 0, 0.6);
        const k2 = ramp(t, 0.5, 1.05);
        const sc = scroll("12.chase", 0, t);
        return (
          <>
            <SkyRun origin={SKY0} scroll={sc} />
            <Flyer who="hero" at={S(lerp(1.0, -1.3, ease(k)), lerp(7.5, 12.3, out(k)) + 0.3 * Math.sin(t * 7))} yaw={W} pose={blendPose(rocket(t, 1), flail(t), ramp(t, 0.2, 0.6))} t={t} trail={2.5} />
            {t > 0.5 ? <Flyer who="old" at={S(lerp(3.6, 1.9, ease(k2)), lerp(7.5, 11.6, out(k2)))} yaw={W} pose={blendPose(rocket(t, 0), soar(t), ramp(t, 0.6, 0.95))} t={t} trail={3.5} /> : null}
            <Bits position={S(1.0 + 24 * t, 8.6)} t={t + 0.01} color="#3a7d34" count={26} power={3.2} />
            <Bits position={S(3.6 + 24 * (t - 0.5), 8.6)} t={t - 0.5} color="#3a7d34" count={26} power={3.2} />
            <Streaks position={S(0, 12)} yaw={E} t={t} n={14} spread={2.6} speed={22} color="#fff4e0" />
          </>
        );
      },
    },
    {
      cue: "12.chase",
      cut: C_CH1,
      from: S(-6.2, 12.6, 1.5),
      to: S(-5.3, 12.4, 1.1),
      target: S(0, 12.2, -0.3),
      fov: 46,
      ease: "linear",
      zone: "sky",
      look: DUSK,
      note: "From in front, flying backwards ahead of them. The teller fills the frame, all elbows, and looks back over his shoulder. Behind him the old man has not moved a finger, and he is closer.",
      shake: 0.015,
      stage: (t, { p }) => {
        const back = ease(ramp(t, 0.12, 0.35)) * (1 - ease(ramp(t, 0.75, 0.95)));
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.chase", C_CH1, t)} />
            <Flyer who="hero" at={S(-1.3, 12.2 + 0.3 * Math.sin(t * 7), 0.3 * Math.sin(t * 4))} yaw={W} pose={flail(t, 0, back)} t={t} trail={2.5} />
            <Flyer who="old" at={S(lerp(4.2, 1.6, p), 12.9, -1.7)} yaw={W} pose={soar(t)} t={t} trail={4} />
            <Streaks position={S(-1, 12.2)} yaw={E} t={t} n={14} spread={2.4} speed={22} color="#fff4e0" />
          </>
        );
      },
    },
    {
      cue: "12.chase",
      cut: C_CH2,
      ...cam.push({ on: S(-0.7, 12.1), dist: 6.4, to: 5.6, yaw: 10, pitch: 3, fov: 44 }),
      zone: "sky",
      look: DUSK,
      note: "Side on. To show how much better he is, the old man rolls once right round the teller, over the top of him and under, as if the teller were standing still, and settles in at his heels.",
      shake: 0.012,
      stage: (t, { dur }) => {
        const ph = Math.PI * 2 * ease(ramp(t, 0.08, dur - 0.1));
        const hy = 12.2 + 0.3 * Math.sin(t * 7);
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.chase", C_CH2, t)} />
            <Flyer who="hero" at={S(-1.3, hy)} yaw={W} pose={flail(t)} t={t} trail={2.5} />
            <Flyer who="old" at={S(-1.3 + lerp(2.1, 1.5, t / dur) - 1.1 * Math.sin(ph / 2), 12.1 + 1.15 * Math.sin(ph), 1.15 * Math.cos(ph) - 1.15)} yaw={W} pose={soar(t, ph)} t={t} trail={3} />
            <Streaks position={S(-0.7, 12.1)} yaw={E} t={t} n={14} spread={2.4} speed={22} color="#fff4e0" />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ I went left. He went left.
    {
      cue: "12.dodge",
      from: S(8.6, 14.8, 0.6),
      to: S(7.6, 14.3, 1.8),
      target: S(-2, 11.8, 0),
      targetTo: S(-2, 11.8, 2.4),
      fov: 46,
      ease: "inOutSine",
      zone: "sky",
      look: DUSK,
      note: "From behind and above the two of them, flying at the sun. On 'left' the teller throws himself over and swerves left. The old man carries straight on for one beat. Then, on 'He went left', he is behind him again, in one snap.",
      shake: 0.015,
      stage: (t) => {
        const a = w("12.dodge", "left");
        const b = w("12.dodge", "left", 0, 1);
        const hk = ramp(t, a - 0.1, a + 0.35);
        const ok = ramp(t, b - 0.06, b + 0.12);
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", 0, t)} />
            <Flyer who="hero" at={S(-1.6, 12.2 + 0.25 * Math.sin(t * 7), 3.2 * ease(hk))} yaw={W} pose={flail(t, -1.0 * Math.sin(Math.PI * hk))} t={t} trail={3} />
            <Flyer who="old" at={S(1.6, 11.9, 3.2 * out(ok))} yaw={W} pose={soar(t, -1.2 * Math.sin(Math.PI * ok))} t={t} trail={4} />
            <Dash from={S(1.6, 11.9, 0)} to={S(1.6, 11.9, 3.2)} t={t - b + 0.06} life={0.28} width={0.22} />
            <Streaks position={S(0, 12.4, 1.6)} yaw={E} t={t} n={16} spread={3} speed={22} color="#fff4e0" />
          </>
        );
      },
    },
    {
      cue: "12.dodge",
      cut: C_DG1,
      ...cam.push({ on: S(-1.4, 12.2, 3.2), onTo: S(-1.9, 17.5, 3.2), dist: 7.6, to: 8.6, yaw: 0, pitch: -6, fov: 46 }),
      zone: "sky",
      look: DUSK,
      note: "Side on. On 'up' the teller hauls himself round and goes straight up, as hard as the boots will go. The old man flies on underneath, past him. Then a red line goes up the frame faster than he did.",
      shake: 0.012,
      stage: (t) => {
        const up = w("12.dodge", "up", C_DG1);
        const kk = ease(ramp(t, up - 0.14, up + 0.12));
        const y = 12.2 + 22 * Math.pow(Math.max(0, t - up + 0.08), 1.6);
        const ox = 1.6 - 9 * t;
        const z = up + 0.16;
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", C_DG1, t)} />
            <Flyer who="hero" at={S(-1.6 - 0.5 * t, y, 3.2)} yaw={W} pose={blendPose(flail(t), rocket(t, 1), kk)} t={t} trail={3} />
            {t < z ? <Flyer who="old" at={S(ox, 11.9, 3.2)} yaw={W} pose={soar(t)} t={t} trail={4} /> : null}
            <Dash from={S(1.6 - 9 * z, 11.9, 3.2)} to={S(1.6 - 9 * z - 0.8, 34, 3.2)} t={t - z} life={0.4} width={0.3} />
            <Flash position={S(1.6 - 9 * z, 11.9, 3.2)} t={t - z} size={3} color="#ff7a5a" />
            <Streaks position={S(-1, 12.4, 3.2)} yaw={E} t={t} n={12} spread={2.6} speed={22} color="#fff4e0" />
          </>
        );
      },
    },
    {
      cue: "12.dodge",
      cut: C_DG2,
      ...cam.push({ on: S(0.4, 27.4, 3.2), onTo: S(-1.2, 27.5, 3.2), dist: 5.6, to: 4.7, yaw: -8, pitch: -2, fov: 44 }),
      zone: "sky",
      look: DUSK,
      note: "Above the clouds, quiet. The teller pops up through them, stops, and looks back down the way he came, pleased with himself. The camera slides left. The old man is standing on the air right in front of him with the blade on his shoulder, waiting. The teller jumps a foot.",
      stage: (t) => {
        const there = w("12.dodge", "there", C_DG2);
        const k = ramp(t, 0, 0.3);
        const jump = 0.4 * out(ramp(t, there - 0.08, there + 0.1));
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", C_DG1, 0.85) + 5 * t} clouds={24.0} />
            <Flyer
              who="hero"
              at={S(0.2 + jump, lerp(25.2, 27.3, out(k)) + 0.05 * Math.sin(t * 3) + 0.3 * Math.abs(jolt(t, there - 0.08, 1)), 3.2)}
              yaw={W}
              pose={keys(t, [[0, rocket(t, 1)], [0.3, RELIEF, out], [there - 0.12, RELIEF], [there + 0.02, JUMPY, out], [there + 0.6, JUMPY], [there + 1.05, AIMED]])}
              t={t}
            />
            <Bits position={S(0.2, 25.4, 3.2)} t={t + 0.02} color="#fff3ea" count={18} power={2} />
            <Flyer who="old" at={S(-2.7, 27.5 + 0.04 * Math.sin(t * 2.5), 3.2)} yaw={E} pose={{ ...COOL, head: [0.1, 0, 0.3 - 0.6 * ease(ramp(t, there + 0.25, there + 0.6))] }} t={t} lance={0} />
            <group scale={pop(t, there - 0.08)}>
              <Bubble text="!" position={S(0.75, 28.95, 3.3)} scale={0.6} dark />
            </group>
          </>
        );
      },
    },
    // ------------------------------------------------------------------ the beam
    {
      cue: "12.beam",
      ...cam.push({ on: S(-1.1, 27.5, 3.2), dist: 5.2, to: 4.5, yaw: 8, pitch: 0, fov: 44 }),
      zone: "sky",
      look: DUSK,
      note: "He throws his hand out, his palm fills with light, and on 'beam' he fires at him from three steps away. The old man only turns the blade up on its edge in front of his face. The light hits it and the whole frame goes white-blue.",
      impacts: [{ at: 0.5, amp: 0.08, dur: 0.5 }],
      stage: (t) => {
        const b = w("12.beam", "beam");
        const on = t > b;
        const hx = 0.6 + 0.25 * ramp(t, b, 1.35);
        const palm = S(hx - 0.72, 27.92, 3.2);
        const edge = S(-2.06, 27.95, 3.2);
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", C_DG1, 0.85) + 5 * (1.87 + t)} clouds={24.0} />
            <Flyer who="hero" at={S(hx, 27.3 + 0.04 * Math.sin(t * 9), 3.2)} yaw={W} pose={AIMED} t={t} eyes={on ? 2.5 : 1} />
            <Glow position={palm} size={0.3 + 1.4 * ramp(t, 0.12, b)} color={CYAN} opacity={0.8} />
            <Flyer who="old" at={S(-2.7, 27.5, 3.2)} yaw={E} pose={keys(t, [[0, COOL], [b - 0.2, COOL], [b - 0.04, GUARD, snap]])} t={t} lance={0} />
            {on ? <Beam from={palm} to={edge} width={0.24 + 0.05 * Math.sin(t * 60)} /> : null}
            {on ? <Beam from={edge} to={S(-12, 32.5, 1.2)} width={0.14} /> : null}
            {on ? <Beam from={edge} to={S(-12, 23.5, 5.2)} width={0.14} /> : null}
            <Flash position={edge} t={t - b} size={7} color="#c8f6ff" life={0.3} />
            {on ? <Glow position={edge} size={2.2 + 0.4 * Math.sin(t * 50)} color="#c8f6ff" opacity={0.8} /> : null}
            {on ? <pointLight position={[edge[0], edge[1], edge[2] + 1]} color={CYAN} intensity={30} distance={8} decay={2} /> : null}
            <Bits position={edge} t={on ? (t - b) % 0.3 : 0} color="#eaffff" count={10} power={2.4} />
          </>
        );
      },
    },
    {
      cue: "12.beam",
      cut: C_BM,
      from: S(3.6, 28.7, 5.6),
      to: S(3.0, 28.4, 5.2),
      target: S(-2.2, 27.6, 3.2),
      fov: 42,
      zone: "sky",
      look: DUSK,
      note: "Over the teller's shoulder. The light clears: the beam is breaking on the edge of the blade and going past him on both sides. On 'cut' he brings the blade down through it, and the beam is two beams, and then it is nothing. The teller looks at his own hand. The old man shakes his head, slowly.",
      impacts: [{ at: 0.21, amp: 0.1, dur: 0.35 }],
      stage: (t) => {
        const c = w("12.beam", "cut", C_BM);
        const tt = hold(t, c + 0.01, 0.08);
        const off = c + 0.5;
        const on = tt < off;
        const wide = 1 + 2.2 * ramp(tt, c, c + 0.25);
        const palm = S(0.85 - 0.72, 27.92, 3.2);
        const edge = S(-2.06, 27.95, 3.2);
        const shake = tt > off + 0.35 && tt < off + 0.85 ? 0.45 * Math.sin((tt - off - 0.35) * 13) : 0;
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", C_DG1, 0.85) + 5 * (3.22 + t)} clouds={24.0} />
            <Flyer who="hero" at={S(0.85, 27.3 + 0.04 * Math.sin(t * 9), 3.2)} yaw={W} pose={keys(tt, [[off, AIMED], [off + 0.25, MYHAND]])} t={t} eyes={on ? 2.5 : 1} />
            <Flyer
              who="old"
              at={S(-2.7, 27.5, 3.2)}
              yaw={E}
              pose={{ ...keys(tt, [[0, GUARD], [c - 0.11, HIGH_AIR, out], [c, CHOP_AIR, snap], [off + 0.1, CHOP_AIR], [off + 0.35, COOL]]), head: [0.05, shake, tt > off + 0.3 ? 0 : -0.2] }}
              t={t}
              lance={0.5 * ramp(tt, c - 0.11, c) * (1 - ramp(tt, off + 0.1, off + 0.35))}
            />
            {on ? <Beam from={palm} to={edge} width={0.24 + 0.05 * Math.sin(t * 60)} /> : null}
            {on ? <Beam from={edge} to={S(-12, 27.95 + 4.5 * wide, 3.2 - 2 * wide)} width={0.14} /> : null}
            {on ? <Beam from={edge} to={S(-12, 27.95 - 4.5 * wide, 3.2 + 2 * wide)} width={0.14} /> : null}
            {on ? <Glow position={edge} size={1.6} color="#c8f6ff" opacity={0.7} /> : null}
            {on ? <pointLight position={[edge[0], edge[1], edge[2] + 1]} color={CYAN} intensity={20} distance={8} decay={2} /> : null}
            <Arc position={S(-2.6, 28.1, 3.2)} yaw={E} t={tt - c + 0.07} a0={2.0} a1={-0.6} r={1.7} />
            <Flash position={edge} t={tt - c} size={5} life={0.18} />
            <Bits position={edge} t={tt - c} color="#eaffff" count={24} power={3.4} />
            <Bits position={palm} t={tt > off ? (tt - off) % 0.35 : 0} color={CYAN} count={5} power={0.8} />
          </>
        );
      },
    },
    // ------------------------------------------------------------------ out of the sky
    {
      cue: "12.swat",
      ...cam.push({ on: S(-0.6, 27.3, 3.2), onTo: S(0.5, 26.6, 3.2), dist: 6.8, to: 6.2, yaw: 4, pitch: 0, fov: 46 }),
      zone: "sky",
      look: DUSK,
      note: "The old man leans forward and is not there any more: a red line straight through where the teller is, one white frame, and the old man is on the far side with his arm out. The teller folds in half round nothing and starts to fall.",
      impacts: [{ at: 0.32, amp: 0.18, dur: 0.5 }],
      stage: (t) => {
        const hit = w("12.swat", "bumped");
        const tt = hold(t, hit, 0.12);
        const k = ramp(tt, hit - 0.08, hit);
        const ft = Math.max(0, tt - hit);
        const H = S(0.85 + 3.0 * ft, 27.3 - 15 * Math.pow(ft, 1.5), 3.2);
        return (
          <>
            <SkyRun origin={SKY0} scroll={scroll("12.dodge", C_DG1, 0.85) + 5 * (5.14 + t)} clouds={24.0} />
            <Flyer who="hero" at={H} yaw={W} pose={ft > 0 ? tumble(ft) : tt > hit - 0.03 ? STRUCK : MYHAND} t={t} jets={ft > 0 ? (Math.sin(t * 30) > 0.3 ? 0.5 : 0) : 1} eyes={ft > 0 ? 0.4 : 1} />
            <Flyer who="old" at={S(lerp(-2.7, 2.6, k), 27.5, 3.2)} yaw={E} pose={keys(tt, [[0, COOL], [hit - 0.1, soar(t)], [hit, PAST, snap], [hit + 0.3, PAST], [hit + 0.6, COOL]])} t={t} lance={ramp(tt, hit - 0.1, hit) * (1 - ramp(tt, hit + 0.3, hit + 0.6))} />
            <Dash from={S(-2.7, 27.7, 3.2)} to={S(2.6, 27.7, 3.2)} t={tt - hit + 0.04} life={0.34} width={0.34} />
            <Arc position={S(0.4, 27.9, 3.2)} yaw={E} t={tt - hit + 0.03} a0={-1.5} a1={1.5} r={1.7} flat color="#ffffff" />
            <Flash position={S(0.85, 27.8, 3.2)} t={tt - hit} size={8} life={0.14} />
            <Bits position={S(0.85, 27.8, 3.2)} t={tt - hit} color="#eaffff" count={28} power={4} />
            <Bits position={S(0.85 + 3.0 * 0.3, 25.0, 3.2)} t={ft - 0.3} color="#fff3ea" count={18} power={2.4} />
          </>
        );
      },
    },
    {
      cue: "12.swat",
      cut: C_SW1,
      ...cam.push({ on: S(0.4, 12, 3.2), dist: 5.8, to: 4.4, yaw: -8, pitch: 14, fov: 46 }),
      roll: 0.12,
      rollTo: -0.14,
      zone: "sky",
      look: DUSK,
      note: "Falling with him. He turns over and over, his jets cough and go out, and the forest comes up from underneath: small, then not small, then every tree by itself.",
      shake: 0.02,
      stage: (t, { p }) => (
        <>
          <SkyRun origin={[0, lerp(-26, 0.8, Math.pow(p, 1.25)), -400]} scroll={300 + 6 * t} />
          <Flyer who="hero" at={S(0.4, 12, 3.2)} yaw={W} pose={tumble(t + 0.56)} t={t} jets={Math.sin(t * 30) > 0.3 ? 0.5 : 0} eyes={0.4} />
          <Streaks position={S(0.4, 12, 3.2)} yaw={0} pitch={Math.PI / 2} t={t} n={14} spread={1.6} speed={24} color="#fff4e0" />
        </>
      ),
    },
    {
      cue: "12.swat",
      cut: C_SW2,
      from: f(2.5, 0.35, 3.0),
      to: f(2.3, 0.5, 2.7),
      target: f(1.3, 10, -0.6),
      targetTo: f(1.2, 2.4, -0.2),
      fov: 50,
      ease: "inCubic",
      zone: ZONE.forest,
      look: DUSK,
      note: "From the grass of the clearing, looking straight up at the sky. A dot. Then a boy, turning over, coming down at us very fast, getting very big.",
      stage: (t, { p }) => (
        <>
          <Flyer who="hero" at={f(1.2, 26 - 24.3 * Math.pow(p, 1.5), -0.2)} yaw={W} pose={tumble(t + 1.76)} t={t} jets={Math.sin(t * 30) > 0.3 ? 0.5 : 0} trail={2.5} eyes={0.4} />
          <Woods cut2={1} />
        </>
      ),
    },
    // ------------------------------------------------------------------ the hole
    {
      cue: "12.hole",
      ...cam.push({ on: [CR[0], 0.9, CR[2]], dist: 6.4, to: 7.4, yaw: 0, pitch: 4, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "He hits. The whole clearing jumps: a column of dust, three rings going out along the grass, lumps of earth coming down everywhere, and the bush at the back shaking.",
      impacts: [{ at: 0.08, amp: 0.2, dur: 0.6 }],
      stage: (t) => {
        const hit = 0.08;
        return (
          <>
            {t < hit ? <Flyer who="hero" at={[CR[0], 0.9 + 9 * (hit - t), CR[2]]} yaw={W} pose={tumble(t + 2.9)} t={t} jets={0} eyes={0.4} /> : null}
            <Flash position={[CR[0], 0.5, CR[2]]} t={t - hit} size={7} color="#fff0d8" life={0.16} />
            <DustRing position={CR} t={t - hit} size={2.6} color="#9a8a68" />
            <DustRing position={CR} t={t - hit - 0.08} size={3.8} color="#8a8a66" />
            <DustRing position={CR} t={t - hit - 0.16} size={5.0} color="#a09a78" />
            <Debris position={[CR[0], 0.05, CR[2]]} t={t - hit} count={34} power={4.4} size={0.26} life={1.4} />
            <Debris position={[CR[0], 0.05, CR[2]]} t={t - hit - 0.05} count={20} power={3.0} size={0.16} seed={4} life={1.4} />
            <DustColumn position={[CR[0], 0.2, CR[2]]} t={t - hit} height={5.5} />
            <Woods cut2={1} hole={t > hit} shake={t > hit && t < 0.7 ? 1 : 0} t={t} />
          </>
        );
      },
    },
    {
      cue: "12.hole",
      cut: C_HOLE,
      ...cam.top({ on: [CR[0], 0, CR[2] - 0.2], height: 8.6, to: 6.0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Straight down. The dust thins, and there is a hole in the ground the exact shape of him, arms out, with him lying in the bottom of it. His visor slides up. His eyes are going round.",
      stage: (t) => {
        const hole = w("12.hole", "hole", C_HOLE);
        return (
          <>
            <Hero position={[CR[0], 0.04, CR[2] - 0.25]} rotationY={0} animation="lie" suit={1} visor={ease(ramp(t, hole + 0.25, hole + 0.6))} face="dizzy" eyes={0.4} />
            <Crater position={CR} />
            <DustColumn position={[CR[0], 0.2, CR[2]]} t={t + 1.02} height={5.5} />
            <Bits position={[CR[0], 0.3, CR[2]]} t={t} color="#7a6a4a" count={14} power={1.4} />
            <Woods cut2={1} />
          </>
        );
      },
    },
  ],
});
