import { clamp01, smoothstep } from "../../src/engine";
import type { Timing, Vec3 } from "../../src/engine";

/**
 * STAGING — the small maths every "In This Town" scene uses: when a word is said,
 * how a thing pops in, where a point in front of somebody is.
 *
 * Part of the topic's pack (see PACK.md). A film's own kit.tsx re-exports these,
 * so a scene file only ever imports from "./kit".
 */

/**
 * `wordAt` for one film. Give it the film's timing.json and it returns the function
 * every scene uses to hang an action on a word:
 *
 *   export const wordAt = wordClock(timing);
 *   const HMM = wordAt("3.hmm", "hmm");   // seconds into shot 3.hmm at which "hmm" is said
 *
 * It throws if the cue or the word is not there, so a script change breaks the build
 * instead of leaving an action on the wrong word.
 */
export function wordClock(timing: Timing) {
  return function wordAt(cueId: string, word: string, nth = 0): number {
    const cue = timing.cues.find((c) => c.id === cueId);
    if (!cue) throw new Error(`wordAt: no cue "${cueId}"`);
    let seen = 0;
    for (const w of timing.words) {
      if (w.s < cue.start - 0.05 || w.s >= cue.end) continue;
      if (w.w.toLowerCase().replace(/[^a-z']/g, "") === word.toLowerCase()) {
        if (seen === nth) return Math.max(0, w.s - cue.start);
        seen++;
      }
    }
    throw new Error(`wordAt: cue "${cueId}" has no word "${word}" (#${nth})`);
  };
}

/** 0 before `a`, 1 after `b`, straight in between. */
export const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const ease = (k: number) => smoothstep(clamp01(k));
/** Scale for a thing that pops into being at `at`: 0, a small overshoot, then 1. */
export const pop = (t: number, at: number, dur = 0.24) => {
  const k = clamp01((t - at) / dur);
  return k <= 0 ? 0 : (1 - (1 - k) ** 3) * (1 + 0.3 * Math.sin(k * Math.PI));
};
/** A short decaying rattle that starts at `at`: a tap, a jolt. */
export const jolt = (t: number, at: number, size = 0.2) => {
  const x = t - at;
  return x <= 0 ? 0 : Math.exp(-x * 13) * Math.sin(x * 42) * size;
};

/** A point `dist` metres in front of someone (behind, if negative) and `up` metres above their feet. */
export const ahead = (p: Vec3, rotY: number, dist: number, up = 0): Vec3 => [
  p[0] + Math.sin(rotY) * dist,
  p[1] + up,
  p[2] + Math.cos(rotY) * dist,
];
/** A point given in someone's own axes: `side` to their +X (their right hand), `up`, `front`. */
export const beside = (p: Vec3, rotY: number, side: number, up = 0, front = 0): Vec3 => [
  p[0] + Math.cos(rotY) * side + Math.sin(rotY) * front,
  p[1] + up,
  p[2] - Math.sin(rotY) * side + Math.cos(rotY) * front,
];

/** Facing directions, as `rotationY`. A town's street runs west–east (x); the camera usually stands to the south (+z). */
export const SOUTH = 0;
export const EAST = Math.PI / 2;
export const NORTH = Math.PI;
export const WEST = -Math.PI / 2;
export const DEG = Math.PI / 180;

/** The teller is a kid: a `MinecraftAvatar` at this scale is 1.44 m tall. */
export const KID = 0.8;
/** Where a player's face and chest are, for a camera to look at. `p` is the feet. */
export const faceOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.53 * scale, p[2]];
export const chestOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.12 * scale, p[2]];

/**
 * A STEPPED HILL, Minecraft style: `layers` slabs one block high, each `step` metres narrower
 * on both sides than the one below. It runs north–south and closes a valley. Draw it with
 * `<SteppedHill>` (places.tsx) and climb it with the functions this returns.
 *
 *   export const HILL = hill({ x: 48, layers: 11, width: 30, step: 1.2 });
 *   <Hero position={HILL.climb(0, 4, p)} />        // hop up the first four blocks as p goes 0 → 1
 */
export function hill({ x, layers, width, step }: { x: number; layers: number; width: number; step: number }) {
  const west = x - width / 2;
  const east = x + width / 2;
  /** The middle of step `i` (0 = the first block off the valley floor) on the west slope. */
  const stepAt = (i: number, z = 0): Vec3 => [west + step * i + step / 2, i + 1, z];
  /** The same on the east slope. */
  const stepEast = (i: number, z = 0): Vec3 => [east - step * i - step / 2, i + 1, z];
  /**
   * Hop up `steps` blocks of the west slope: up first, then forward, the way a player climbs.
   * `p` runs 0 → 1 over the whole climb. Returns the feet position.
   */
  const climb = (from: number, steps: number, p: number, z = 0): Vec3 => {
    const f = Math.min(steps - 1e-4, clamp01(p) * steps);
    const i = Math.floor(f);
    const k = f - i;
    const a = stepAt(from + i, z);
    return [a[0] + step * ease((k - 0.25) / 0.75), a[1] + ease(k / 0.5) + 0.26 * Math.sin(Math.PI * k), z];
  };
  return { x, layers, width, step, top: layers, stepAt, stepEast, climb };
}
