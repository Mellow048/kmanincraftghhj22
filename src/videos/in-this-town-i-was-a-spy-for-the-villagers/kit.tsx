import type React from "react";
import { MinecraftAvatar, Vox, getPose } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { HandBanner, KID, PILLAGER, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a boy from the town, in a pillager's coat, in the pillagers' outpost.
 *
 * Everything another "In This Town" film could use is in the topic's pack (Topics/InThisTown/PACK.md) and is passed
 * on from here, so a scene imports only from "./kit" and the engine. The pillagers, the ravager, the horde, the watch
 * tower and the banner are the pack's. What is this story's: the boy and his disguise (`Hero`), the ash, the washing
 * line, the map with the red X, the gate, the rain.
 */

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp,
  ROBE, Villager, PILLAGER, Pillager, pillagerFace, Ravager, Horde, HandBanner, Boom, Bush,
  Bell, Bits, Blaze, FireLight, Lantern, Puffs, Smoke, SubscribeSign,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. `cut`: the shot cuts in that late. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });

// ----------------------------------------------------------------------------- places

export const PLACE = { town: [0, 0, 0] as Vec3, outpost: [300, 0, 0] as Vec3, march: [600, 0, 0] as Vec3 };
const at = (o: Vec3) => (x: number, y: number, z: number): Vec3 => [o[0] + x, o[1] + y, o[2] + z];
/** A point in the town, in the outpost, on the night march. */
export const T = at(PLACE.town);
export const O = at(PLACE.outpost);
export const M = at(PLACE.march);

/** The watch tower stands here in the outpost, front to +Z. Its second floor (the map room) is at y 3.3. */
export const TOWER: Vec3 = [0, 0, -7];
/** The gate in the south wall. */
export const GATE_Z = 14;

// ----------------------------------------------------------------------------- the boy

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
export const blend = (a: string, b: string, k: number): string => {
  const [x, y] = [hex(a), hex(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * Math.max(0, Math.min(1, k))).toString(16).padStart(2, "0")).join("")}`;
};

type A = Partial<MinecraftAvatarProps> & {
  /** In the pillager's coat he took off the line. */
  coat?: boolean;
  /** 0–1: how much campfire ash is on his face. 1 is as grey as a pillager. */
  ash?: number;
};
/** The teller: the boy in the red shirt, as in every film of the series. */
export const Hero: React.FC<A> = ({ coat = false, ash = 0, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin={blend("#dca47a", PILLAGER.skin, ash)}
    hair="#2e1c12"
    colors={coat ? { torso: PILLAGER.coats[1], arms: PILLAGER.coats[1], legs: PILLAGER.legs } : { torso: "#c0392b", arms: "#c0392b", legs: "#26355e" }}
    blink
    {...p}
  />
);

/** The banner, standing in the world: the foot of the pole is at `position`. */
export const Banner: React.FC<{ position: Vec3; t?: number; rotation?: Vec3 }> = ({ position, t = 0, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <group position={[0, 0.4, 0]}>
      <HandBanner t={t} />
    </group>
  </group>
);

// ----------------------------------------------------------------------------- things

export const Butterfly: React.FC<{ position: Vec3; t: number; color?: string }> = ({ position, t, color = "#f2a23a" }) => {
  const flap = Math.sin(t * 22) * 0.9;
  return (
    <group position={[position[0] + Math.sin(t * 2.1) * 0.25, position[1] + Math.sin(t * 3.3) * 0.12, position[2] + Math.cos(t * 1.7) * 0.2]} rotation={[0, t * 0.8, 0]}>
      <Vox kind="wool" tint="#2a1c12" position={[0, 0, 0]} size={[0.03, 0.03, 0.12]} />
      {[-1, 1].map((s) => (
        <group key={s} rotation={[0, 0, s * (0.3 + flap * 0.6)]}>
          <Vox kind="wool" tint={color} position={[s * 0.07, 0, 0]} size={[0.13, 0.012, 0.13]} />
        </group>
      ))}
    </group>
  );
};

/** A campfire, and beside it the grey heap it has made. */
export const Campfire: React.FC<{ position: Vec3; lit?: boolean }> = ({ position, lit = true }) => (
  <group position={position}>
    {[0, 1, 2, 3].map((i) => (
      <group key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
        <Vox kind="log" position={[0, 0.12, 0]} size={[1.3, 0.22, 0.24]} />
      </group>
    ))}
    {lit ? <Vox kind="wool" tint="#ff9a2e" position={[0, 0.34, 0]} size={[0.5, 0.3, 0.5]} /> : null}
    {/* the ash */}
    <Vox kind="wool" tint="#8b8f92" position={[1.7, 0.07, 0.5]} size={[2.0, 0.14, 1.6]} />
    <Vox kind="wool" tint="#a2a6a8" position={[1.6, 0.17, 0.4]} size={[1.2, 0.1, 0.9]} />
  </group>
);

/** One pillager coat, hanging: the pegs are at `position`. */
export const Coat: React.FC<{ position: Vec3; rotation?: Vec3; color?: string }> = ({ position, rotation = [0, 0, 0], color = PILLAGER.coats[1] }) => (
  <group position={position} rotation={rotation}>
    <Vox kind="wool" tint={color} position={[0, -0.36, 0]} size={[0.5, 0.7, 0.1]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="wool" tint={color} position={[s * 0.36, -0.2, 0]} size={[0.22, 0.4, 0.1]} />
    ))}
    <Vox kind="wool" tint={PILLAGER.legs} position={[0, -0.95, 0]} size={[0.44, 0.5, 0.08]} />
  </group>
);

/** The washing line: runs along x from `position`, 4 m long, 1.9 m up. `taken` leaves the middle peg empty. */
export const WashLine: React.FC<{ position: Vec3; taken?: boolean }> = ({ position, taken = false }) => (
  <group position={position}>
    {[-2, 2].map((x) => (
      <Vox key={x} kind="log" position={[x, 1.0, 0]} size={[0.16, 2.0, 0.16]} />
    ))}
    <Vox kind="wool" tint="#d8cfb8" position={[0, 1.92, 0]} size={[4, 0.03, 0.03]} />
    <Coat position={[-1.2, 1.9, 0]} color={PILLAGER.coats[0]} />
    {taken ? null : <Coat position={[0, 1.9, 0]} />}
    <Coat position={[1.2, 1.9, 0]} color={PILLAGER.coats[3]} />
  </group>
);

/** The plan: a map of the town on a table, with a red X on the bell. The table top is 0.9 m up; the map lies flat. */
export const MapTable: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.82, 0]} size={[1.9, 0.12, 1.3]} />
    {[-0.8, 0.8].map((x) => [-0.5, 0.5].map((z) => <Vox key={`${x}${z}`} kind="log" position={[x, 0.4, z]} size={[0.12, 0.8, 0.12]} />))}
    <Vox kind="wool" tint="#e6d7ac" position={[0, 0.89, 0]} size={[1.6, 0.02, 1.05]} />
    {/* the houses of the town, the road, and the woods */}
    <Vox kind="wool" tint="#b89a66" position={[0, 0.9, 0.05]} size={[1.3, 0.012, 0.07]} />
    {([[-0.5, -0.2, "#8a3b2a"], [-0.2, -0.25, "#3d5f9a"], [0.25, -0.22, "#3f6b3a"], [0.5, -0.18, "#8a3b2a"], [-0.4, 0.3, "#5a4a6a"], [0.35, 0.32, "#3d5f9a"]] as Array<[number, number, string]>).map(([x, z, c], i) => (
      <group key={i}>
        <Vox kind="wool" tint="#d8c49a" position={[x, 0.93, z]} size={[0.14, 0.07, 0.12]} />
        <Vox kind="wool" tint={c} position={[x, 0.98, z]} size={[0.16, 0.035, 0.14]} />
      </group>
    ))}
    {[-0.72, -0.66, -0.7].map((x, i) => (
      <Vox key={i} kind="leaves" tint="#2f5a2c" position={[x, 0.93, -0.4 + i * 0.36]} size={[0.1, 0.08, 0.1]} />
    ))}
    {/* the bell, and the X on it */}
    <Vox kind="wool" tint="#e0b83a" position={[0.02, 0.94, 0.06]} size={[0.1, 0.1, 0.1]} />
    {[-1, 1].map((s) => (
      <group key={s} position={[0.02, 1.0, 0.06]} rotation={[0, (s * Math.PI) / 4, 0]}>
        <Vox kind="wool" tint="#d21f1f" position={[0, 0, 0]} size={[0.42, 0.015, 0.07]} />
      </group>
    ))}
    {/* a sun in the corner with an arrow from the woods: before sunrise */}
    <Vox kind="wool" tint="#f2a23a" position={[0.62, 0.9, -0.38]} size={[0.14, 0.012, 0.14]} />
    {[0, 1, 2, 3, 4].map((i) => (
      <Vox key={i} kind="wool" tint="#d21f1f" position={[-0.56 + i * 0.11, 0.9, 0.06]} size={[0.06, 0.012, 0.03]} />
    ))}
  </group>
);

/** The gate in the south wall of the outpost: two leaves of logs. `open` 0–1 swings them in; `smashed` lays them flat. */
export const Gate: React.FC<{ open?: number; smashed?: boolean }> = ({ open = 0, smashed = false }) => (
  <group position={[PLACE.outpost[0], 0, PLACE.outpost[2] + GATE_Z]}>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 2.2, 0, 0]} rotation={smashed ? [-1.45, s * 0.3, 0] : [0, s * open * 1.4, 0]}>
        <Vox kind="log" position={[-s * 1.05, 1.5, smashed ? -0.3 : 0]} size={[2.1, 3.0, 0.28]} />
        <Vox kind="planks" position={[-s * 1.05, 1.5, 0.16]} size={[2.1, 0.3, 0.06]} />
      </group>
    ))}
  </group>
);

/** Rain: streaks coming down over `center`. No randomness: the same rain on every render. */
export const Rain: React.FC<{ center: Vec3; t: number; area?: [number, number]; count?: number; height?: number }> = ({ center, t, area = [14, 14], count = 220, height = 9 }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const fx = ((i * 0.6180339) % 1) - 0.5;
      const fz = ((i * 0.7548776) % 1) - 0.5;
      const y = height - ((t * (11 + (i % 5)) + i * 1.37) % height);
      return <Vox key={i} kind="wool" tint="#cfe2ff" position={[center[0] + fx * area[0], center[1] + y, center[2] + fz * area[1]]} size={[0.02, 0.42, 0.02]} />;
    })}
  </>
);

// ----------------------------------------------------------------------------- staging used by several scenes

import { PixelText } from "../../engine";
import { Pillager as P_, Ravager as R_ } from "../../../Topics/InThisTown";

/** A small word in the air (a grunt, a snore): pops up at `from`, drifts up, gone after `life` seconds. Faces `yaw`°. */
export const Word: React.FC<{ at: Vec3; t: number; from?: number; text: string; yaw?: number; height?: number; color?: string; life?: number }> = ({ at, t, from = 0, text, yaw = 0, height = 0.16, color = "#ffffff", life = 0.9 }) => {
  const k = t - from;
  if (k < 0 || k > life) return null;
  const pop = Math.min(1, k / 0.12) * (1 + 0.25 * Math.exp(-8 * k) * Math.cos(k * 20));
  return <PixelText text={text} position={[at[0], at[1] + k * 0.35, at[2]]} rotationY={(yaw * Math.PI) / 180} height={height * pop} color={color} />;
};

/** The morning line in the yard: six pillagers along x at z = 5, facing south, and a gap in the middle for him. */
export const LINE_X = [-2.85, -1.9, -0.95, 0.95, 1.9, 2.85];
export const LineUp: React.FC<{ stare?: number; lookAt?: Vec3 }> = ({ stare = 0, lookAt }) => (
  <>
    {LINE_X.map((x, i) => (
      <P_ key={i} position={O(x, 0, 5)} rotationY={i === 3 ? -stare * 1.45 : 0} n={i} crossbow={i % 2 === 0} armR={i % 2 === 0 ? -0.35 : undefined} phase={i * 1.7} lean={i === 3 ? 0.5 * stare : 0} nod={i === 3 ? 0.25 * stare : 0} lookAt={i === 3 ? undefined : lookAt} />
    ))}
  </>
);

/** A point `s` metres along a path of corners: [x, z, heading]. */
export const pathAt = (pts: Array<[number, number]>, s: number): [number, number, number] => {
  let left = Math.max(0, s);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    if (left <= len || i === pts.length - 2) {
      const k = len > 0 ? left / len : 0;
      return [ax + (bx - ax) * k, az + (bz - az) * k, Math.atan2(bx - ax, bz - az)];
    }
    left -= len;
  }
  return [pts[0][0], pts[0][1], 0];
};

/**
 * The raid on the move, behind the banner: pairs of pillagers, 1.3 m apart, following `pts` exactly where the head
 * went. `s` is how far the head has gone. The boy and the banner are not drawn here: he is at `pathAt(pts, s)`.
 */
export const Column: React.FC<{ origin: (x: number, y: number, z: number) => Vec3; pts: Array<[number, number]>; s: number; n?: number; t: number; tired?: number; beast?: number }> = ({ origin, pts, s, n = 20, t, tired = 0, beast = 6 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / 2) + 1;
      const side = i % 2 ? 1 : -1;
      const back = s - row * 1.35 - (row > beast ? 2.6 : 0);
      if (back < 0) return null;
      const [x, z, h] = pathAt(pts, back);
      const p = origin(x + Math.cos(h) * side * 0.55, 0, z - Math.sin(h) * side * 0.55);
      return <P_ key={i} position={p} rotationY={h} n={i} walk={back} chief={i === 0} crossbow={i % 3 === 1} armR={i % 3 === 1 ? -0.4 : undefined} lean={tired * 0.3} nod={tired * 0.35} phase={i * 1.3} />;
    })}
    {(() => {
      const back = s - beast * 1.35 - 2.2;
      if (back < 0) return null;
      const [x, z, h] = pathAt(pts, back);
      return <R_ position={origin(x, 0, z)} rotationY={h} walk={back} jaw={0.3 + 0.3 * Math.sin(t * 2)} head={-tired * 0.3} />;
    })()}
  </>
);

/** The boy with the banner in front of him in both hands. `h` is his heading; `walk` the metres he has walked. */
export const Bearer: React.FC<{ at: Vec3; h?: number; t: number; walk?: number; ash?: number; face?: string; headYaw?: number; headPitch?: number; lift?: number; side?: number }> = ({ at, h = 0, t, walk, ash = 1, face = "uneasy", headYaw = 0, headPitch = 0, lift = 0, side = 0.34 }) => {
  const sw = walk === undefined ? 0 : Math.sin(walk * 5.2) * 0.55;
  const bob = walk === undefined ? 0 : Math.abs(Math.sin(walk * 5.2)) * 0.04;
  return (
    <>
      <Hero coat ash={ash} position={[at[0], at[1] + bob, at[2]]} rotationY={h} pose={posed("idle", t, { armR: [-1.25, 0, side > 0 ? 0 : -0.25], armL: [side > 0 ? -1.1 : -1.25, 0, side > 0 ? 0.55 : 0.25], legR: [sw, 0, 0], legL: [-sw, 0, 0] })} face={face as never} headYaw={headYaw} headPitch={headPitch} />
      <Banner position={[at[0] + Math.sin(h) * 0.4 + Math.cos(h) * side, at[1] + 0.42 + bob + lift, at[2] + Math.cos(h) * 0.4 - Math.sin(h) * side]} t={t} rotation={[0, h, 0]} />
    </>
  );
};

/** Morning fog: flat pale sheets across the way, one behind the other. */
export const Fog: React.FC<{ at: Vec3; n?: number; step?: number; opacity?: number; t?: number }> = ({ at, n = 5, step = 3, opacity = 0.2, t = 0 }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <mesh key={i} position={[at[0] + Math.sin(t * 0.2 + i) * 1.5, at[1] + 3 + (i % 2), at[2] - i * step]}>
        <boxGeometry args={[70, 9, 0.05]} />
        <meshBasicMaterial color="#e9e4dc" transparent opacity={opacity} depthWrite={false} />
      </mesh>
    ))}
  </>
);
