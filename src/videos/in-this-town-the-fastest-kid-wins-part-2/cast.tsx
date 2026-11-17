import type React from "react";
import type { Vec3 } from "../../engine";
import { Baby, LINE2, Me, Pal, Player, Puffs, R, ROBE, Rival, Streaks, Sweat, Villager } from "./kit";

export const E = Math.PI / 2;
export const up = (p: Vec3, y: number): Vec3 => [p[0], p[1] + y, p[2]];
export const clamp = (x: number): number => Math.max(0, Math.min(1, x));
/** 0 → 1 → 0 over `d` seconds from `at`. */
export const bump = (t: number, at: number, d: number): number => Math.sin(Math.PI * clamp((t - at) / d));
/** A colour between two hex colours. */
export const tint = (a: string, b: string, k: number): string => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * clamp(k)).toString(16).padStart(2, "0")).join("")}`;
};
const ROBES = [ROBE.brown, ROBE.white, ROBE.smith, ROBE.farmer, ROBE.red, ROBE.blue];
const LANES = [0.9, -0.7, 0.2, -1.3, 1.5, -0.2, 0.6, -1.0, 1.2, -0.5];
/**
 * THE PACK: the runners who are nobody in particular, strung out round a point. `x`, `z` are world numbers (where
 * the teller is); `ahead` of the `n` are in front of him. `mode`: "run" flat out, "tired" staggering with their heads
 * down and sweat coming off them, "walk". `d` is metres run (it drives the legs). The baby is not in it.
 */
export const Pack: React.FC<{ x: number; z: number; d: number; ahead?: number; n?: number; gap?: number; mode?: "run" | "tired" | "walk"; t?: number; hole?: number }> = ({
  x, z, d, ahead = 5, n = 14, gap = 1.1, mode = "run", t = 0, hole = 0.9,
}) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const front = i < ahead;
      const rank = front ? ahead - i : i - ahead + 1;
      const px = x + (front ? 1 : -1) * (hole + rank * gap * (0.75 + ((i * 7) % 5) * 0.1)) + (mode === "tired" ? Math.sin(t * 1.3 + i) * 0.25 : 0);
      const pz = z + LANES[i % LANES.length];
      const dd = d + i * 0.37;
      const p: Vec3 = [px, 0, pz];
      if (i % 3 === 2)
        return <Villager key={i} position={p} rotationY={E} walk={dd * (mode === "run" ? 1.4 : 0.9)} robe={ROBES[i % 6]} lean={mode === "tired" ? 0.42 : mode === "run" ? 0.25 : 0.05} nod={mode === "tired" ? 0.4 : 0} phase={i} />;
      return (
        <group key={i}>
          <Player who={i + 1} position={p} rotationY={E} animation={mode === "run" ? "run" : mode === "tired" ? "run" : "walk"} animDistance={500 + dd * (mode === "tired" ? 1.25 : 1)} face={mode === "tired" ? "ouch" : "brave"} headPitch={mode === "tired" ? 0.3 : 0} phase={i * 0.7} />
          {mode !== "walk" && i % 2 === 0 ? <Puffs position={[px - 0.5, 0.08, pz]} color="#e2cf9a" count={3} rise={0.35} spread={0.35} size={0.13} speed={2} opacity={0.5} /> : null}
          {mode === "tired" && i % 4 === 0 ? <Sweat position={[px, 1.6, pz]} t={t + i * 0.1} much={0.6} /> : null}
        </group>
      );
    })}
  </>
);
/** The line-up for stage two: three rows of seven behind LINE2. The teller is in the middle of the front row; first place and his two friends are next to him. */
const ROW = [0.1, 0.72, 1.36, 2.0, 2.64, 3.28, 3.9];
export const ME_Z = ROW[3];
export const TRIO_Z = [ROW[4], ROW[5], ROW[6]];
export const FRONT_X = LINE2 - 0.75;
/**
 * `gather` 0–1 walks them in from all over the camp; `set` puts them in a crouch; `go` is the second they start;
 * `bend` 0–1 for each of the three (first place in the middle) is how far he is bent down to his shoes.
 */
export const Grid: React.FC<{ t: number; go?: number; set?: boolean; gather?: number; bend?: [number, number, number]; meFace?: React.ComponentProps<typeof Me>["face"]; meLook?: Vec3; streak?: boolean }> = ({
  t, go = 99, set = false, gather = 1, bend = [0, 0, 0], meFace = "brave", meLook, streak = false,
}) => {
  const d = Math.max(0, t - go);
  return (
    <>
      {Array.from({ length: 21 }, (_, i) => {
        const row = Math.floor(i / 7);
        const z0 = ROW[i % 7] + (row % 2) * 0.2;
        const trio = i >= 4 && i <= 6;
        const v = trio ? 9.5 : i === 3 ? 5.4 : 5.0 + ((i * 7) % 5) * 0.4;
        const x0 = FRONT_X - row * 0.95 + d * v;
        const from: Vec3 = [x0 - 2 - ((i * 37) % 9) * 0.8, 0, z0 - 2.5 - ((i * 53) % 7) * 0.9];
        const p = R(from[0] + (x0 - from[0]) * gather, 0, from[2] + (z0 - from[2]) * gather);
        const moving = d > 0 || gather < 1;
        const anim = d > 0 ? "run" : gather < 1 ? "walk" : set ? "crouch" : "idle";
        const ad = d > 0 ? d * v : gather < 1 ? gather * 6 : undefined;
        const ry = gather < 1 ? Math.atan2(x0 - from[0], z0 - from[2]) : E;
        if (i === 3) return <Me key={i} position={p} rotationY={ry} animation={anim} animDistance={ad} face={meFace} lookAt={meLook} />;
        if (trio) {
          const b = bend[i - 4];
          const a = b > 0.5 && d <= 0 ? "crouch" : anim;
          const body = i === 5 ? <Rival position={p} rotationY={ry} animation={a} animDistance={ad} face="calm" shoeGlow={0.8 + b} /> : <Pal n={i === 4 ? 0 : 1} position={p} rotationY={ry} animation={a} animDistance={ad} face="calm" shoeGlow={0.8 + b} />;
          return (
            <group key={i}>
              {body}
              {streak && d > 0.2 ? <Streaks position={[p[0] - 0.6, 0.5, p[2]]} yaw={E} t={(d * 2) % 1} n={5} spread={0.3} speed={8} /> : null}
            </group>
          );
        }
        if (i === 10) return <Baby key={i} position={p} rotationY={ry} walk={moving ? (ad ?? 0) * 1.6 : 0} />;
        if (i % 3 === 2) return <Villager key={i} position={p} rotationY={ry} walk={moving ? (ad ?? 0) : 0} robe={ROBES[i % 6]} lean={d > 0 ? 0.3 : 0} phase={i} />;
        return <Player key={i} who={i} position={p} rotationY={ry} animation={anim} animDistance={ad} face="brave" phase={i * 0.7} />;
      })}
    </>
  );
};
