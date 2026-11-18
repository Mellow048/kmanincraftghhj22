import { clamp01, lerp, smoothstep } from "../../engine";
import type { Vec3 } from "../../engine";
import edit from "./edit.json";

export const { fps: FPS, frames: FRAMES, cuts: CUT, reps: REP, foleyOnly: FOLEY, marks: MARK } = edit;
export const sec = (f: number) => f / FPS;
export const unit = (f: number, a: number, b: number) => clamp01((f - a) / Math.max(.01, b - a));
export const rise = (f: number, a: number, b: number) => smoothstep(unit(f, a, b));
export const window = (f: number, a: number, b: number, c: number, d: number) => rise(f, a, b) * (1 - rise(f, c, d));
export const mixVec = (a: Vec3, b: Vec3, p: number): Vec3 => [lerp(a[0], b[0], p), lerp(a[1], b[1], p), lerp(a[2], b[2], p)];
export const HOME = { surface: .846, plate: [-.48, .875, .69] as Vec3, feet: [-.57, 0, .221] as Vec3 };
export const SHOP = { surface: .926, plate: [-.76, .957, -.496] as Vec3, feet: [-.85, 0, -1.005] as Vec3 };
export const PASS = { surface: 1.015, x: -.64, z: 1.38, feet: [-.80, 0, .94] as Vec3 };

/** Exactly one pass on each syllable. The tool stays planted in the spaces between passes. */
export function sweep(f: number, reps: readonly number[], reach: number, width = 5.8) {
  let pos = -reach;
  for (const [i, at] of reps.entries()) {
    if (f < at) break;
    pos = lerp(i % 2 ? reach : -reach, i % 2 ? -reach : reach, rise(f, at - .18, at + width));
  }
  return pos;
}
