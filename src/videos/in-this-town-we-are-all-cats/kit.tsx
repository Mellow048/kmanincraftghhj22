import type React from "react";
import { Block, Vox, clamp, getPose } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import {
  CatDogGolem as Guard,
  CatDogPlayer as Pal,
  CatDogVillager as Folk,
  EAST,
  KID,
  WEST,
  catArchPose as archPose,
  ease,
  ramp,
  wordClock,
} from "../../../Topics/InThisTown";
import type { CatDogPlayerProps as PalProps, CatOrDog as Kind } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a village where everyone is a cat, and the other half of it, where everyone is a dog.
 *
 * The cats and dogs themselves were built for this film and now live in the pack (Topics/InThisTown/catsdogs.tsx;
 * PACK.md, "Cats and dogs"), so any film can have them. This file gives them the short names the scenes use:
 * `Pal` is the player (`CatDogPlayer`), `Folk` the villager (`CatDogVillager`), `Guard` the golem (`CatDogGolem`).
 * What is only this story's stays here: the two kids, the line of white blocks, the weather, the two sides.
 *
 * The line runs north to south along x = 0. Cats live west of it (-X) and face EAST; dogs live east of it and face WEST.
 */

export { DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp, Bits, Lantern, Puffs, SubscribeSign } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. `cut`: the shot cuts in that late. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};

// The cats and dogs, from the pack, under this film's names.
export {
  Bone,
  CatDogGolem as Guard,
  CatDogPlayer as Pal,
  CatDogVillager as Folk,
  Fish,
  catArchPose as archPose,
  catDogFur as furOf,
} from "../../../Topics/InThisTown";
export type { CatDogPlayerProps as PalProps, CatDogVillagerProps as FolkProps, CatOrDog as Kind } from "../../../Topics/InThisTown";

// ----------------------------------------------------------------------------- the two kids

/** The teller: a cat kid in the red shirt of every film of the series. */
export const Hero: React.FC<Omit<PalProps, "kind" | "who">> = (p) => <Pal kind="cat" who={0} scale={KID} {...p} />;
/** The dog kid who stands across the line from him. */
export const Pup: React.FC<Omit<PalProps, "kind" | "who">> = (p) => <Pal kind="dog" who={0} scale={KID} {...p} />;

// ----------------------------------------------------------------------------- things

/** How far north and south the line runs, and how big one block of it is. */
export const LINE_N = -15;
export const LINE_S = 16;
export const BLOCK = 0.5;
export const LINE_BLOCKS = Math.round((LINE_S - LINE_N) / BLOCK);
export const lineZ = (i: number) => LINE_S - BLOCK / 2 - i * BLOCK;
/** The well stands on the line: the line stops at its wall and goes on behind it. */
export const WELL: Vec3 = [0, 0, -8];
const inWell = (z: number) => Math.abs(z - WELL[2]) < 1.3;

/** One block of the line: white wool, with a seam. `position` is its middle. */
export const LineBlock: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="wool" tint="#f7f5ee" size={[BLOCK - 0.02, 0.36, BLOCK - 0.02]} />
    <Block position={[0, 0.183, 0]} size={[BLOCK - 0.1, 0.01, BLOCK - 0.1]} color="#e3dfd2" castShadow={false} />
  </group>
);

/** The line, block 0 at the south end. `gone(i)` says a block has been taken. */
export const Line: React.FC<{ gone?: (i: number) => boolean }> = ({ gone }) => (
  <>
    {Array.from({ length: LINE_BLOCKS }, (_, i) => (inWell(lineZ(i)) || gone?.(i) ? null : <LineBlock key={i} position={[0, 0.18, lineZ(i)]} />))}
  </>
);

/** Rain, or snow: the same on every render. */
export const Weather: React.FC<{ center: Vec3; t: number; snow?: boolean; amount?: number; area?: [number, number]; count?: number; height?: number }> = ({ center, t, snow = false, amount = 1, area = [14, 16], count = 200, height = 9 }) => (
  <>
    {Array.from({ length: Math.round(count * clamp(amount, 0, 1)) }, (_, i) => {
      const fx = ((i * 0.6180339) % 1) - 0.5;
      const fz = ((i * 0.7548776) % 1) - 0.5;
      const speed = snow ? 1.3 + (i % 5) * 0.2 : 11 + (i % 5);
      const y = height - ((t * speed + i * 1.37) % height);
      const drift = snow ? Math.sin(t * 1.3 + i) * 0.25 : 0;
      return <Vox key={i} kind="wool" tint={snow ? "#ffffff" : "#cfe2ff"} position={[center[0] + fx * area[0] + drift, center[1] + y, center[2] + fz * area[1]]} size={snow ? [0.07, 0.07, 0.07] : [0.02, 0.42, 0.02]} />;
    })}
  </>
);

// ----------------------------------------------------------------------------- the two sides

type Member = { type: "pal" | "folk"; who: number; z: number; back?: number; kid?: boolean };
/** Who stands at the line, south to north, the same on both sides. The teller and the dog kid stand at z 2, the golems at z -3. */
export const ROW: Member[] = [
  { type: "folk", who: 1, z: 0.1 },
  { type: "pal", who: 1, z: 4.2 },
  { type: "folk", who: 2, z: 6.3 },
  { type: "pal", who: 2, z: 8.5 },
  { type: "folk", who: 3, z: 10.7 },
  { type: "pal", who: 3, z: 12.9 },
  { type: "pal", who: 4, z: 1.0, back: 1.5 },
  { type: "folk", who: 4, z: 3.2, back: 1.7 },
  { type: "pal", who: 5, z: 5.3, back: 1.4, kid: true },
  { type: "folk", who: 5, z: 7.5, back: 1.8 },
  { type: "pal", who: 1, z: 9.8, back: 1.5, kid: true },
  { type: "folk", who: 0, z: 11.9, back: 1.6 },
];
export const KID_Z = 2;
export const GOLEM_Z = -3;
export const GAP = 1.35;
/** How far from the line each golem stands: close enough that the two are nose to nose when they lean in. */
export const GOLEM_X = 1.12;

export type SideProps = {
  kind: Kind;
  t: number;
  /** Metres from the line to the front row. */
  gap?: number;
  /** Metres walked, for the feet. */
  walk?: number;
  /** Walking away from the line: they have turned round. */
  away?: boolean;
  /** Cats: 0–1 fur up; 0–1 back up; 0–1 turned sideways. */
  puff?: number;
  arch?: number;
  side?: number;
  /** Cats: 0–1, too tired to hold it. */
  sag?: number;
  /** Dogs: 0–1 barking. */
  bark?: number;
  wag?: number;
  face?: MinecraftAvatarProps["face"];
  /** Everybody looks here. */
  lookAt?: Vec3;
  /** Heads turn this much (radians) at their own pace: looking for something. */
  search?: number;
  /** The kid of this side stands in the row (the teller, or the dog kid). */
  kid?: boolean;
  golem?: boolean;
  golemGrass?: number;
  /** Leave these out of the row, by index in ROW. */
  skip?: number[];
};

/** One side of the village, standing at the line (or walking up to it, or home from it). */
export const Side: React.FC<SideProps> = ({ kind, t, gap = GAP, walk = 0, away = false, puff = 0, arch = 0, side = 0, sag = 0, bark = 0, wag = 0.3, face, lookAt, search = 0, kid = true, golem = true, golemGrass = 0, skip }) => {
  const s = kind === "cat" ? -1 : 1;
  const toLine = kind === "cat" ? EAST : WEST;
  const heading = away ? -toLine : toLine;
  const mood = face ?? (kind === "cat" ? (puff > 0.5 ? "angry" : "neutral") : bark > 0.5 ? "angry" : "neutral");
  const one = (m: Member, i: number, isKid: boolean) => {
    const x = s * (gap + (m.back ?? 0));
    const turnSide = (i % 2 ? 1 : -1) * side * 1.25;
    const rot = heading + (kind === "cat" ? turnSide : 0);
    const look = search ? Math.sin(t * (1.1 + (i % 3) * 0.3) + i * 1.9) * search : 0;
    const headYaw = (kind === "cat" ? -turnSide * 0.95 : 0) + look;
    const walking = walk > 0;
    const key = `${kind}${i}`;
    const p: Vec3 = [x, 0, m.z];
    const wk = walk + i * 0.37;
    if (m.type === "folk")
      return <Folk key={key} kind={kind} who={m.who} position={p} rotationY={rot} walk={walking ? wk : 0} lean={arch * 0.42 * (1 - sag * 0.5)} puff={puff} tailUp={0.25 + 0.75 * Math.max(puff, arch)} bark={bark} wag={wag} turn={headYaw} nod={sag * 0.25} lookAt={lookAt} phase={i * 1.3} />;
    const cat = kind === "cat" && (arch > 0.02 || puff > 0.02);
    return (
      <Pal
        key={key}
        kind={kind}
        who={isKid ? 0 : m.who}
        scale={isKid || m.kid ? KID : 1}
        position={p}
        rotationY={rot}
        puff={puff}
        tailUp={0.25 + 0.75 * Math.max(puff, arch)}
        bark={bark}
        wag={wag}
        face={sag > 0.5 ? "sleepy" : mood}
        {...(cat ? { pose: archPose(t + i, arch, headYaw, sag) } : walking ? { animation: "walk" as const, animDistance: wk, headYaw } : { animation: "idle" as const, headYaw })}
        {...(lookAt && !cat ? { lookAt } : {})}
      />
    );
  };
  return (
    <>
      {ROW.map((m, i) => (skip?.includes(i) ? null : one(m, i, false)))}
      {kid ? one({ type: "pal", who: 0, z: KID_Z }, 20, true) : null}
      {golem ? (
        <Guard kind={kind} position={[s * (GOLEM_X + Math.max(0, gap - GAP)), 0, GOLEM_Z]} rotationY={heading} walk={walk > 0 ? walk * 0.8 : 0} puff={puff} tailUp={0.3 + 0.7 * Math.max(puff, arch)} bark={bark} wag={wag} grass={golemGrass} headYaw={search ? Math.sin(t * 0.9) * search * 0.7 : 0} />
      ) : null}
    </>
  );
};

export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });

/** After the line: where everybody stands once nobody has a side. [x, z, facing]. Even ones are cats, odd ones dogs. */
const MIX: Array<[number, number, number]> = [
  [-3.4, 9.5, 0.4], [3.1, 10.2, -0.5], [-1.6, 12.0, 0.2], [1.9, 12.6, -0.2], [-5.2, 6.4, 0.7], [5.0, 7.0, -0.7],
  [2.6, 1.2, -0.6], [-2.8, 0.6, 0.6], [4.6, 3.6, -0.9], [-4.8, 3.0, 0.9], [-1.2, -1.4, 0.3], [1.4, -1.0, -0.3],
  [-6.6, 10.6, 0.8], [6.4, 11.4, -0.8], [0.4, 14.6, 0], [-0.8, 8.0, 0.1], [6.8, 0.4, -1.0], [-6.9, -0.6, 1.0],
];
/** The whole village with no sides: cats and dogs standing anywhere. `cheer` 0–1 makes them bounce. `spread` scales the layout. */
export const Mixed: React.FC<{ t: number; cheer?: number; lookAt?: Vec3; spread?: number; skip?: number[] }> = ({ t, cheer = 0, lookAt, spread = 1, skip }) => (
  <>
    {MIX.map(([x, z, r], i) => {
      if (skip?.includes(i)) return null;
      const kind: Kind = i % 2 ? "dog" : "cat";
      const hop = cheer * Math.abs(Math.sin(t * 7 + i * 1.3)) * 0.16;
      const p: Vec3 = [x * spread, hop, 5 + (z - 5) * spread];
      return i % 3 === 1 ? (
        <Folk key={i} kind={kind} who={i} position={p} rotationY={r} lookAt={lookAt} wag={1} tailUp={0.9} phase={i} />
      ) : (
        <Pal key={i} kind={kind} who={1 + (i % 5)} scale={i % 4 === 0 ? KID : 1} position={p} rotationY={r} animation={cheer > 0.5 ? "cheer" : "idle"} face="grin" wag={1} tailUp={0.9} {...(lookAt ? { lookAt } : {})} />
      );
    })}
  </>
);
