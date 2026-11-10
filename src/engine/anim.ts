import { TAU, clamp01, lerp, pulse, wobble } from "./math";
import type { Vec3 } from "./math";

/**
 * Procedural animation clips. No rig files, no mixamo, no bones — just the
 * classic Minecraft limb pivots, driven by maths so every frame is deterministic.
 *
 * Two flavours of clip:
 *
 *   TIME-BASED   `getPose(name, t)`      — idles, reactions, one-shots.
 *   DISTANCE     `gaitPose(name, dist)`  — walking/running. The phase comes from
 *                                          how far the character has travelled,
 *                                          so the feet always match the ground
 *                                          speed and nobody shuffles in place.
 *
 * Angles are radians. `bodyY` is metres. The character faces +Z.
 */
export type Pose = {
  bodyY: number;
  bodyPitch: number;
  bodyRoll: number;
  bodyYaw: number;
  torso: Vec3;
  head: Vec3;
  armR: Vec3;
  armL: Vec3;
  legR: Vec3;
  legL: Vec3;
  kneeR: Vec3;
  kneeL: Vec3;
};

export type AnimName =
  | "idle"
  | "talk"
  | "walk"
  | "run"
  | "creep"
  | "stagger"
  | "jump"
  | "fall"
  | "sit"
  | "sitDown"
  | "standUp"
  | "lie"
  | "sleep"
  | "scared"
  | "crouch"
  | "cower"
  | "reach"
  | "reachUp"
  | "press"
  | "point"
  | "wave"
  | "panic"
  | "collapse"
  | "peek"
  | "lookAround";

/** Walking clips whose phase is driven by ground distance, not the clock. */
export type GaitName = "walk" | "run" | "creep" | "stagger";

/** Metres of ground one full stride cycle covers. Tune so the feet never skate. */
export const STRIDE: Record<GaitName, number> = {
  walk: 1.42,
  run: 2.1,
  creep: 1.12,
  stagger: 1.55,
};

const zero = (): Pose => ({
  bodyY: 0,
  bodyPitch: 0,
  bodyRoll: 0,
  bodyYaw: 0,
  torso: [0, 0, 0],
  head: [0, 0, 0],
  armR: [0, 0, 0],
  armL: [0, 0, 0],
  legR: [0, 0, 0],
  legL: [0, 0, 0],
  kneeR: [0, 0, 0],
  kneeL: [0, 0, 0],
});

const lerpVec = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/** Linear blend between two poses. Use for walk→idle, sit→stand, panic→collapse. */
export function blendPose(a: Pose, b: Pose, t: number): Pose {
  const k = clamp01(t);
  return {
    bodyY: lerp(a.bodyY, b.bodyY, k),
    bodyPitch: lerp(a.bodyPitch, b.bodyPitch, k),
    bodyRoll: lerp(a.bodyRoll, b.bodyRoll, k),
    bodyYaw: lerp(a.bodyYaw, b.bodyYaw, k),
    torso: lerpVec(a.torso, b.torso, k),
    head: lerpVec(a.head, b.head, k),
    armR: lerpVec(a.armR, b.armR, k),
    armL: lerpVec(a.armL, b.armL, k),
    legR: lerpVec(a.legR, b.legR, k),
    legL: lerpVec(a.legL, b.legL, k),
    kneeR: lerpVec(a.kneeR, b.kneeR, k),
    kneeL: lerpVec(a.kneeL, b.kneeL, k),
  };
}

/**
 * Distance-driven gait. `distance` is metres travelled along the path.
 * Feet, arms and pelvis all come from the same phase, so the cycle is
 * physically consistent: stop moving and the legs stop mid-stride.
 */
export function gaitPose(name: GaitName, distance: number): Pose {
  const p = zero();
  const stride = STRIDE[name];
  const cycle = (Math.max(0, distance) / stride) * TAU;
  const s = Math.sin(cycle);
  const c = Math.cos(cycle);

  if (name === "walk") {
    p.bodyY = Math.abs(s) * 0.035 - 0.008;
    p.bodyRoll = c * 0.028;
    p.legR = [s * 0.74, 0, 0];
    p.legL = [-s * 0.74, 0, 0];
    p.kneeR = [Math.max(0, s) * 0.78 + 0.03, 0, 0];
    p.kneeL = [Math.max(0, -s) * 0.78 + 0.03, 0, 0];
    p.armR = [-s * 0.66, 0, 0.05];
    p.armL = [s * 0.66, 0, -0.05];
    p.torso = [0.045, s * 0.05, 0];
    p.head = [-0.03, -s * 0.04, 0];
    return p;
  }

  if (name === "run") {
    p.bodyY = Math.abs(s) * 0.075 - 0.02;
    p.bodyPitch = -0.22;
    p.bodyRoll = c * 0.045;
    p.legR = [s * 1.05, 0, 0];
    p.legL = [-s * 1.05, 0, 0];
    p.kneeR = [Math.max(0, s) * 1.2 + 0.18, 0, 0];
    p.kneeL = [Math.max(0, -s) * 1.2 + 0.18, 0, 0];
    p.armR = [-s * 1.1 - 0.4, 0, 0.12];
    p.armL = [s * 1.1 - 0.4, 0, -0.12];
    p.torso = [-0.12, s * 0.08, 0];
    p.head = [0.1, -s * 0.05, 0];
    return p;
  }

  if (name === "creep") {
    // Hesitant, flat-footed. Short steps, held breath, hands slightly out.
    p.bodyY = Math.abs(s) * 0.02 - 0.014;
    p.bodyPitch = 0.07;
    p.bodyRoll = c * 0.016;
    p.legR = [s * 0.52, 0, 0.01];
    p.legL = [-s * 0.52, 0, -0.01];
    p.kneeR = [Math.max(0, s) * 0.48 + 0.14, 0, 0];
    p.kneeL = [Math.max(0, -s) * 0.48 + 0.14, 0, 0];
    p.armR = [-0.34 + s * 0.18, 0, 0.14];
    p.armL = [-0.34 - s * 0.18, 0, -0.14];
    p.torso = [0.05, s * 0.03, 0];
    p.head = [0.07, -s * 0.09, 0.03];
    return p;
  }

  // stagger — drunk, injured, or something wearing a person's shape wrong.
  p.bodyY = Math.abs(s) * 0.05 - 0.01;
  p.bodyPitch = 0.1;
  p.bodyRoll = c * 0.075;
  p.legR = [s * 0.82, 0, 0.06];
  p.legL = [-s * 0.82, 0, -0.06];
  p.kneeR = [Math.max(0, s) * 0.85 + 0.08, 0, 0];
  p.kneeL = [Math.max(0, -s) * 0.85 + 0.08, 0, 0];
  p.armR = [-0.5 - s * 0.55, 0, 0.3];
  p.armL = [-0.5 + s * 0.55, 0, -0.3];
  p.torso = [0.09, s * 0.12, 0];
  p.head = [0.06, -s * 0.14, 0.09];
  return p;
}

/** Time-based clips. Reactions, one-shots and anything that does not travel. */
export function getPose(name: AnimName, t: number): Pose {
  const p = zero();
  const time = Math.max(0, t);

  switch (name) {
    case "idle": {
      p.bodyY = Math.sin(time * 1.4) * 0.012;
      p.head = [0.04 + Math.sin(time * 0.7) * 0.03, Math.sin(time * 0.45) * 0.12, 0];
      p.armR = [Math.sin(time * 1.4) * 0.04, 0, 0.03];
      p.armL = [-Math.sin(time * 1.4) * 0.04, 0, -0.03];
      p.torso = [0, Math.sin(time * 0.45) * 0.02, 0];
      return p;
    }

    case "lookAround": {
      p.bodyY = Math.sin(time * 1.2) * 0.01;
      p.head = [Math.sin(time * 0.8) * 0.05, Math.sin(time * 0.55) * 0.55, 0];
      p.armR = [0.02, 0, 0.03];
      p.armL = [0.02, 0, -0.03];
      return p;
    }

    case "talk": {
      p.bodyY = Math.sin(time * 1.5) * 0.012;
      p.head = [Math.sin(time * 3.2) * 0.045, Math.sin(time * 0.9) * 0.14, 0];
      p.torso = [0, Math.sin(time * 0.9) * 0.04, 0];
      p.armR = [-0.35 + Math.sin(time * 2.4) * 0.22, 0, 0.18];
      p.armL = [-0.12 + Math.sin(time * 1.7) * 0.1, 0, -0.1];
      return p;
    }

    // Legacy time-driven walk/run. Prefer gaitPose() so the feet match the ground.
    case "walk": {
      const s = Math.sin(time * TAU * 1.75);
      const c = Math.cos(time * TAU * 1.75);
      p.bodyY = Math.abs(s) * 0.035 - 0.01;
      p.bodyRoll = c * 0.025;
      p.legR = [s * 0.72, 0, 0];
      p.legL = [-s * 0.72, 0, 0];
      p.kneeR = [Math.max(0, s) * 0.7, 0, 0];
      p.kneeL = [Math.max(0, -s) * 0.7, 0, 0];
      p.armR = [-s * 0.62, 0, 0.05];
      p.armL = [s * 0.62, 0, -0.05];
      p.torso = [0.04, s * 0.06, 0];
      p.head = [-0.02, -s * 0.05, 0];
      return p;
    }

    case "run": {
      const s = Math.sin(time * TAU * 2.6);
      const c = Math.cos(time * TAU * 2.6);
      p.bodyY = Math.abs(s) * 0.07 - 0.02;
      p.bodyPitch = -0.22;
      p.bodyRoll = c * 0.04;
      p.legR = [s * 1.05, 0, 0];
      p.legL = [-s * 1.05, 0, 0];
      p.kneeR = [Math.max(0, s) * 1.15 + 0.15, 0, 0];
      p.kneeL = [Math.max(0, -s) * 1.15 + 0.15, 0, 0];
      p.armR = [-s * 1.1 - 0.35, 0, 0.12];
      p.armL = [s * 1.1 - 0.35, 0, -0.12];
      p.torso = [-0.12, s * 0.09, 0];
      p.head = [0.12, -s * 0.06, 0];
      return p;
    }

    case "creep": {
      // Time fallback for creep, for callers that have no distance.
      return gaitPose("creep", time * 0.95);
    }

    case "stagger": {
      return gaitPose("stagger", time * 1.35);
    }

    case "sitDown": {
      const k = clamp01(time / 0.85);
      const e = k * k * (3 - 2 * k);
      p.bodyY = lerp(0, -0.125, e);
      p.legR = [lerp(0, -Math.PI / 2, e), 0, lerp(0, 0.04, e)];
      p.legL = [lerp(0, -Math.PI / 2, e), 0, lerp(0, -0.04, e)];
      p.kneeR = [lerp(0, Math.PI / 2, e), 0, 0];
      p.kneeL = [lerp(0, Math.PI / 2, e), 0, 0];
      p.armR = [lerp(0, -0.32, e), 0, lerp(0, 0.08, e)];
      p.armL = [lerp(0, -0.32, e), 0, lerp(0, -0.08, e)];
      p.bodyPitch = lerp(0, -0.04, e);
      p.head = [lerp(0, 0.06, e), 0, 0];
      return p;
    }

    case "standUp": {
      const k = clamp01(time / 0.72);
      const e = k * k * (3 - 2 * k);
      p.bodyY = lerp(-0.125, 0, e);
      p.legR = [lerp(-Math.PI / 2, 0, e), 0, lerp(0.04, 0, e)];
      p.legL = [lerp(-Math.PI / 2, 0, e), 0, lerp(-0.04, 0, e)];
      p.kneeR = [lerp(Math.PI / 2, 0.06, e), 0, 0];
      p.kneeL = [lerp(Math.PI / 2, 0.06, e), 0, 0];
      p.armR = [lerp(-0.32, 0, e), 0, lerp(0.08, 0.03, e)];
      p.armL = [lerp(-0.32, 0, e), 0, lerp(-0.08, -0.03, e)];
      p.bodyPitch = lerp(-0.04, 0.02, e);
      p.head = [lerp(0.06, 0.04, e), 0, 0];
      return p;
    }

    case "cower": {
      const shiver = wobble(time * 7.3, 2) * 0.035;
      p.bodyY = -0.3 + Math.abs(Math.sin(time * 3.1)) * 0.012;
      p.bodyPitch = 0.3;
      p.bodyRoll = shiver;
      p.legR = [-0.62, 0, 0.1];
      p.legL = [-0.62, 0, -0.1];
      p.kneeR = [1.25, 0, 0];
      p.kneeL = [1.25, 0, 0];
      p.armR = [-2.5 + shiver, 0, 0.35];
      p.armL = [-2.5 - shiver, 0, -0.35];
      p.head = [0.34, 0, 0];
      return p;
    }

    case "peek": {
      const lean = Math.sin(time * 1.1) * 0.5 + 0.5;
      p.bodyPitch = -0.12 * lean;
      p.bodyY = -0.06 * lean;
      p.head = [0.1 - 0.14 * lean, 0.1 * Math.sin(time * 0.7), 0];
      p.armR = [-0.5 - 0.2 * lean, 0, 0.1];
      p.armL = [-0.2, 0, -0.1];
      p.legR = [-0.14, 0, 0.05];
      p.legL = [-0.14, 0, -0.05];
      p.kneeR = [0.22, 0, 0];
      p.kneeL = [0.22, 0, 0];
      return p;
    }

    case "press": {
      const k = clamp01(time / 0.5);
      const press = Math.sin(k * Math.PI);
      p.armR = [-1.35 - press * 0.3, 0, 0.1];
      p.armL = [-0.1, 0, -0.06];
      p.bodyPitch = -0.06 - press * 0.04;
      p.head = [-0.14, -0.08, 0];
      p.bodyY = -press * 0.01;
      return p;
    }

    case "reachUp": {
      p.armR = [-2.6 + Math.sin(time * 1.3) * 0.08, 0, 0.2];
      p.armL = [-0.2, 0, -0.08];
      p.bodyPitch = -0.14;
      p.head = [-0.28, 0, 0];
      p.bodyY = Math.sin(time * 1.3) * 0.008;
      return p;
    }

    case "jump": {
      const cycle = 1.05;
      const q = time % cycle;
      const crouch = pulse(q, 0, 0.24);
      const air = pulse(q, 0.26, 0.78);
      const land = pulse(q, 0.78, 1.0);
      p.bodyY = crouch * -0.09 + air * 0.52 - land * 0.06;
      p.bodyPitch = -0.06 + crouch * 0.12;
      p.legR = [air * -0.55 - crouch * 0.35, 0, air * 0.08];
      p.legL = [air * -0.55 - crouch * 0.35, 0, air * -0.08];
      p.kneeR = [air * 0.85 + crouch * 1.1, 0, 0];
      p.kneeL = [air * 0.85 + crouch * 1.1, 0, 0];
      p.armR = [air * -2.2 - crouch * 0.15, 0, air * 0.35];
      p.armL = [air * -2.2 - crouch * 0.15, 0, air * -0.35];
      p.head = [air * 0.12, 0, 0];
      return p;
    }

    case "fall": {
      p.bodyPitch = 0.12 + Math.sin(time * 3.1) * 0.05;
      p.bodyRoll = Math.sin(time * 2.3) * 0.09;
      p.armR = [-2.5 + Math.sin(time * 5.1) * 0.12, 0, 0.45];
      p.armL = [-2.5 - Math.sin(time * 5.1) * 0.12, 0, -0.45];
      p.legR = [-0.2, 0, 0.18];
      p.legL = [-0.35, 0, -0.18];
      p.head = [-0.12, 0, 0];
      return p;
    }

    case "sit": {
      // Hips drop to bed height, thighs horizontal, feet hanging.
      p.bodyY = -0.125 + Math.sin(time * 1.6) * 0.008;
      p.legR = [-Math.PI / 2, 0, 0.04];
      p.legL = [-Math.PI / 2, 0, -0.04];
      p.kneeR = [Math.PI / 2, 0, 0];
      p.kneeL = [Math.PI / 2, 0, 0];
      p.armR = [-0.32, 0, 0.08];
      p.armL = [-0.32, 0, -0.08];
      p.bodyPitch = -0.04;
      p.head = [0.06 + Math.sin(time * 1.1) * 0.02, Math.sin(time * 0.4) * 0.08, 0];
      return p;
    }

    case "lie": {
      p.bodyPitch = -Math.PI / 2;
      p.bodyY = -0.125;
      p.armR = [0, 0, 0.18];
      p.armL = [0, 0, -0.18];
      p.legR = [0, 0, 0.03];
      p.legL = [0, 0, -0.03];
      p.head = [0, 0, 0.08];
      return p;
    }

    case "sleep": {
      p.bodyPitch = -Math.PI / 2;
      p.bodyY = -0.125 + Math.sin(time * 1.1) * 0.006;
      p.armR = [0, 0, 0.22];
      p.armL = [0, 0, -0.22];
      p.legR = [0, 0, 0.02];
      p.legL = [0, 0, -0.02];
      p.head = [0, -0.25, 0.1];
      return p;
    }

    case "scared": {
      const shiver = wobble(time * 9, 3) * 0.03;
      p.bodyY = -0.05 + shiver * 0.3;
      p.bodyPitch = 0.1;
      p.bodyRoll = shiver;
      p.armR = [-1.5 + shiver, 0, 0.55];
      p.armL = [-1.5 - shiver, 0, -0.55];
      p.legR = [-0.12, 0, 0.08];
      p.legL = [-0.12, 0, -0.08];
      p.head = [0.1, wobble(time * 7, 1) * 0.12, 0];
      return p;
    }

    case "crouch": {
      p.bodyY = -0.26;
      p.bodyPitch = 0.22;
      p.legR = [-0.55, 0, 0.08];
      p.legL = [-0.55, 0, -0.08];
      p.kneeR = [1.25, 0, 0];
      p.kneeL = [1.25, 0, 0];
      p.armR = [0.25, 0, 0.12];
      p.armL = [0.25, 0, -0.12];
      p.head = [-0.08, 0, 0];
      return p;
    }

    case "reach": {
      p.bodyPitch = -0.05;
      p.armR = [-1.55, 0, 0.18];
      p.armL = [-0.15, 0, -0.08];
      p.head = [-0.12, -0.1, 0];
      p.bodyY = Math.sin(time * 1.4) * 0.01;
      return p;
    }

    case "point": {
      p.bodyPitch = -0.04;
      p.armR = [-1.7, 0, 0.12];
      p.armL = [0.05, 0, -0.05];
      p.head = [-0.06, -0.22, 0];
      p.torso = [0, -0.1, 0];
      p.bodyY = Math.sin(time * 1.4) * 0.008;
      return p;
    }

    case "wave": {
      p.armR = [-0.2, 0, 2.35 + Math.sin(time * 6.2) * 0.28];
      p.armL = [0.02, 0, -0.05];
      p.head = [0, Math.sin(time * 1.4) * 0.08, 0.06];
      p.bodyY = Math.sin(time * 1.5) * 0.01;
      return p;
    }

    case "panic": {
      const s = Math.sin(time * TAU * 3.2);
      p.bodyY = Math.abs(s) * 0.05;
      p.bodyPitch = -0.12;
      p.bodyRoll = wobble(time * 6, 2) * 0.06;
      p.armR = [-2.4 + Math.sin(time * 7.7) * 0.5, 0, 0.5];
      p.armL = [-2.4 - Math.sin(time * 7.3) * 0.5, 0, -0.5];
      p.legR = [s * 1.0, 0, 0.05];
      p.legL = [-s * 1.0, 0, -0.05];
      p.head = [0.05, wobble(time * 8, 4) * 0.25, 0];
      return p;
    }

    case "collapse": {
      const k = clamp01(time / 1.1);
      const ease = k * k * (3 - 2 * k);
      p.bodyPitch = lerp(0, 1.55, ease);
      p.bodyY = lerp(0, -0.42, ease);
      p.armR = [lerp(0, -2.6, ease), 0, 0.2];
      p.armL = [lerp(0, -2.6, ease), 0, -0.2];
      p.legR = [lerp(0, 0.35, ease), 0, 0.05];
      p.legL = [lerp(0, 0.3, ease), 0, -0.05];
      p.kneeR = [lerp(0, 0.7, ease), 0, 0];
      p.kneeL = [lerp(0, 0.7, ease), 0, 0];
      p.head = [lerp(0, 0.3, ease), 0, 0];
      return p;
    }

    default:
      return p;
  }
}

export const ANIM_NAMES: AnimName[] = [
  "idle",
  "talk",
  "walk",
  "run",
  "creep",
  "stagger",
  "jump",
  "fall",
  "sit",
  "sitDown",
  "standUp",
  "lie",
  "sleep",
  "scared",
  "crouch",
  "cower",
  "reach",
  "reachUp",
  "press",
  "point",
  "wave",
  "panic",
  "collapse",
  "peek",
  "lookAround",
];
