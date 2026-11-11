import * as THREE from "three";

export type Vec3 = [number, number, number];

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const clamp01 = (v: number) => clamp(v, 0, 1);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const inverseLerp = (a: number, b: number, v: number) => (a === b ? 0 : (v - a) / (b - a));
export const remap = (v: number, a: number, b: number, c: number, d: number) =>
  lerp(c, d, clamp01(inverseLerp(a, b, v)));
export const smoothstep = (t: number) => t * t * (3 - 2 * t);
export const TAU = Math.PI * 2;

/**
 * Vertical field of view (degrees) for a full-frame lens.
 *
 * The sensor is 24mm tall in the vertical 9:16 frame, so `focalMmToFov(35)`
 * returns ~37.8° — the "house lens" from the camera bible. Shots can be written
 * in millimetres and converted here instead of guessing degrees.
 */
export const focalMmToFov = (mm: number, sensorHeightMm = 24): number =>
  (2 * Math.atan(sensorHeightMm / (2 * Math.max(1, mm))) * 180) / Math.PI;

/** Smoothly approach a value, frame-rate independent. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export const vec3 = (v: Vec3) => new THREE.Vector3(v[0], v[1], v[2]);
export const vlerp = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

export type EaseName =
  | "linear"
  | "inSine"
  | "outSine"
  | "inOutSine"
  | "inCubic"
  | "outCubic"
  | "inOutCubic"
  | "outQuint"
  | "outExpo"
  | "inOutQuint"
  | "outBack"
  | "hold";

export const easings: Record<EaseName, (t: number) => number> = {
  linear: (t) => t,
  inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  outSine: (t) => Math.sin((t * Math.PI) / 2),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuint: (t) => 1 - Math.pow(1 - t, 5),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutQuint: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
  outBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  hold: () => 0,
};

/** Deterministic PRNG. Never use Math.random() in a film — it breaks rendering. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Cheap deterministic organic noise built from sines. Range roughly -1..1. */
export function wobble(t: number, seed = 0): number {
  return (
    Math.sin(t * 1.13 + seed * 1.7) * 0.5 +
    Math.sin(t * 2.71 + seed * 3.1) * 0.3 +
    Math.sin(t * 5.37 + seed * 7.3) * 0.2
  );
}

/** 0 → 1 → 0 pulse over [a,b] seconds. */
export function pulse(t: number, a: number, b: number): number {
  if (t <= a || t >= b) return 0;
  const p = inverseLerp(a, b, t);
  return Math.sin(p * Math.PI);
}

/** Shade a hex colour by `amount` (-1..1). */
export function shade(hex: string, amount: number): string {
  const c = hex.replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const f = (v: number) =>
    Math.round(amount >= 0 ? v + (255 - v) * amount : v * (1 + amount));
  return `#${[f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
