import { TAU, clamp01, lerp, pulse, wobble } from "./math";
import type { Vec3 } from "./math";

/**
 * Procedural animation clips. No rig files, no mixamo, no bones — just the
 * classic Minecraft limb pivots, driven by maths so every frame is deterministic.
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
  | "jump"
  | "fall"
  | "sit"
  | "lie"
  | "sleep"
  | "scared"
  | "crouch"
  | "reach"
  | "point"
  | "wave"
  | "panic"
  | "collapse"
  | "lookAround";

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
  "jump",
  "fall",
  "sit",
  "lie",
  "sleep",
  "scared",
  "crouch",
  "reach",
  "point",
  "wave",
  "panic",
  "collapse",
  "lookAround",
];
