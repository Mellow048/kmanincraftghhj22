import { clamp01, lerp, smoothstep } from "../../engine";
import edit from "./edit.json";

export const { fps: FPS, cuts: CUT, reps: REP, tug: TUG } = edit;
export const DESK = -2.37;
export const SINK = -0.66;
export const STAGE = 0.82;
export const SURFACE = 0.845;
export const HOME_Z = 0.07;
export const BUCKET_X = 1.36;
export const BUCKET_Z = 0.87;
export const MISS = REP.trial[2] + edit.firstFlight;
export const WIN = REP.retry[2] + edit.retryFlight;
export const time = (n: number) => n / FPS;
export const up = (f: number, a: number, b: number) => smoothstep(clamp01((f - a) / (b - a)));
export const between = (f: number, a: number, b: number) => clamp01((f - a) / (b - a));
export const gate = (f: number, a: number, b: number, c: number, d: number) => up(f, a, b) * (1 - up(f, c, d));
export const countAt = (f: number, list: number[]) => list.filter((n) => f >= n).length;

/** The tool moves once per breath. Keep the last position, don't add invisible return wipes. */
export function sweep(f: number, list: number[], duration: number, reach: number) {
  let x = -reach;
  for (const [i, at] of list.entries()) {
    if (f < at) break;
    x = lerp(i % 2 ? reach : -reach, i % 2 ? -reach : reach, up(f, at, at + duration));
  }
  return x;
}
