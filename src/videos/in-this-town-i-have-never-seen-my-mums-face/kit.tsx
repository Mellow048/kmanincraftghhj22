import type React from "react";
import { Block, MinecraftAvatar, Vox, getPose } from "../../engine";
import type { Pose, Timing, Vec3 } from "../../engine";
import { Bits, Enderman, KID, PlayerSword, Pumpkin, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { Mood } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: an overworld town where everyone is an enderman, and the one kid who lives in it.
 *
 * The enderman, the pumpkin, the players' sword, the long table and the night fill come from the pack
 * (Topics/InThisTown/PACK.md). What is only this story's is here: the kid, his mum (pink bow, pink knees) and dad
 * (straw hat), a town of endermen that carry things, teleport and scream, the six players in pumpkins, his drawing,
 * the rain, the photo and the kitchen.
 *
 * The street runs north to south along x = 0 and the lens lives at its south end (+Z). Home closes the north end.
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export { DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Wisps, Pumpkin } from "../../../Topics/InThisTown";
export { Block } from "../../engine";
export { NightFill as Fill, LongTable as Table, groundSitPose as sitPose, GROUND_SIT, PixelHeart as Heart, PlayerSword as Sword } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
const rnd = (i: number, s = 1) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const U = 1.8 / 32;
export const PINK = "#f06aa8";
export const PURPLE = "#b04cf0";

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** Home: across the north end of the street. The middle of its front wall; the door faces south. */
  home: [0, 0, -16] as Vec3,
  /** The dinner table stands in the yard, across the street. Its middle. */
  table: [0, 0, -11.5] as Vec3,
  /** The kitchen: against the front wall, east of the door. The middle slot. */
  kitchen: [3.4, 0, -15.45] as Vec3,
  /** The square: the wide part of the street south of the yard. */
  square: [0, 0, -4] as Vec3,
  /** The pile of blocks he hides behind when the players come. */
  pile: [-2.6, 0, 8.2] as Vec3,
  /** The photo: its own zone, far away. */
  photo: [0, 0, 80] as Vec3,
};

// ----------------------------------------------------------------------------- the family

type A = React.ComponentProps<typeof MinecraftAvatar>;
/**
 * The teller: a kid in a yellow shirt. `pumpkin` > 0 puts a carved pumpkin on his head at that scale (it is too big for
 * him); `up` 0–1 pushes it back off his face like a hat.
 */
export const Hero: React.FC<A & { pumpkin?: number; up?: number; askew?: number }> = ({ pumpkin = 0, up = 0, askew = 0.1, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e2ac82"
    hair="#5a3418"
    colors={{ torso: "#f6c41c", arms: "#f6c41c", legs: "#3557b8" }}
    blink
    head={
      pumpkin > 0 ? (
        <group position={[0, 0.05 + up * 0.36, -up * 0.2]} rotation={[-up * 0.75, 0, askew]}>
          <Pumpkin position={[0, 0, 0]} scale={pumpkin} />
        </group>
      ) : undefined
    }
    {...p}
  />
);

type E = React.ComponentProps<typeof Enderman>;
/** His mum: the pink bow, and a pink band on each knee, which is how he knows her. No scarf: bent over, it hangs like a tongue. */
export const Mum: React.FC<E> = (p) => {
  const [x, y, z] = p.position ?? [0, 0, 0];
  const swing = Math.sin((p.walk ?? 0) * 2.6) * 0.45;
  return (
    <>
      <Enderman hat="bow" phase={0.7} {...p} />
      <group position={[x, y, z]} rotation={[0, p.rotationY ?? 0, 0]} scale={p.scale ?? 1}>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 2 * U, 30 * U, 0]} rotation={[s * swing, 0, 0]}>
            <Block position={[0, -14.5 * U, 0]} size={[2.7 * U, 1.9 * U, 2.7 * U]} color={PINK} />
          </group>
        ))}
      </group>
    </>
  );
};
/** His dad: the straw hat, a blue scarf, a little taller. He is always carrying something. */
export const Dad: React.FC<E> = (p) => <Enderman hat="straw" scarf="#3f8fe0" phase={1.9} scale={1.06} {...p} />;

// ----------------------------------------------------------------------------- things an enderman carries

/** What an enderman holds: 0 grass, 1 cobble, 2 sand, 3 planks, 4 melon, 5 a flower pot, 6 TNT, 7 hay, 8 grass with a poppy. */
export const Thing: React.FC<{ kind: number; position?: Vec3 }> = ({ kind, position = [0, 0, 0] }) => {
  const k = ((kind % 9) + 9) % 9;
  const s = 0.5;
  return (
    <group position={position}>
      {k === 0 || k === 8 ? <Vox kind="grass" side="dirt" size={[s, s, s]} /> : null}
      {k === 8 ? (
        <>
          <Block position={[0.05, s / 2 + 0.11, 0]} size={[0.035, 0.22, 0.035]} color="#3f8a34" castShadow={false} />
          <Block position={[0.05, s / 2 + 0.25, 0]} size={[0.15, 0.12, 0.15]} color="#e23a3a" castShadow={false} />
          <Block position={[-0.13, s / 2 + 0.08, 0.08]} size={[0.03, 0.16, 0.03]} color="#3f8a34" castShadow={false} />
          <Block position={[-0.13, s / 2 + 0.19, 0.08]} size={[0.12, 0.1, 0.12]} color="#f2d24a" castShadow={false} />
        </>
      ) : null}
      {k === 1 ? <Vox kind="cobble" size={[s, s, s]} /> : null}
      {k === 2 ? <Vox kind="sand" size={[s, s, s]} /> : null}
      {k === 3 ? <Vox kind="planks" size={[s, s, s]} /> : null}
      {k === 4 ? (
        <>
          <Block size={[s, s, s]} color="#5faa3a" />
          {[-0.15, 0, 0.15].map((x) => (
            <Block key={x} position={[x, 0, s / 2 + 0.003]} size={[0.05, s, 0.006]} color="#2f6a24" castShadow={false} />
          ))}
        </>
      ) : null}
      {k === 5 ? (
        <>
          <Block position={[0, -0.1, 0]} size={[0.34, 0.3, 0.34]} color="#a5583a" />
          <Block position={[0, 0.17, 0]} size={[0.04, 0.26, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.34, 0]} size={[0.2, 0.16, 0.2]} color="#5a8fe8" castShadow={false} />
        </>
      ) : null}
      {k === 6 ? (
        <>
          <Block size={[s, s, s]} color="#d33a2c" />
          <Block position={[0, 0, 0]} size={[s + 0.01, 0.17, s + 0.01]} color="#f1ede2" castShadow={false} />
        </>
      ) : null}
      {k === 7 ? <Vox kind="hay" size={[s, s, s]} /> : null}
    </group>
  );
};

/** The purple pop an enderman leaves when it teleports. `t`: seconds since it went. */
export const Zap: React.FC<{ position: Vec3; t: number; seed?: number }> = ({ position, t, seed = 1 }) => (
  <>
    <Bits position={[position[0], position[1] + 1.6, position[2]]} t={t} color={PURPLE} count={12} seed={seed} power={0.75} />
    <Bits position={[position[0], position[1] + 0.8, position[2]]} t={t} color="#e9b8ff" count={7} seed={seed + 9} power={0.55} />
  </>
);

/** [x, z, facing]. */
export type Spot = [number, number, number?];
/**
 * A town of endermen. Each holds a thing (`hold`), unless it has dropped it (`drop`: seconds since they all let go).
 * `outAt(i)`: the second at which that one teleports away. `jaw` and `shake` 0–1: the scream.
 */
export const Enders: React.FC<{
  spots: Spot[];
  t: number;
  face?: number;
  first?: number;
  lookAt?: Vec3;
  mood?: Mood;
  jaw?: number;
  shake?: number;
  hold?: boolean;
  drop?: number;
  walk?: number;
  shift?: Vec3;
  skip?: number[];
  scale?: number;
  outAt?: (i: number) => number;
  tilt?: number;
}> = ({ spots, t, face = 0, first = 0, lookAt, mood = "calm", jaw = 0, shake = 0, hold = true, drop, walk = 0, shift = [0, 0, 0], skip = [], scale = 1, outAt, tilt = 0 }) => (
  <>
    {spots.map(([x, z, f], i) => {
      if (skip.includes(i)) return null;
      const n = i + first;
      const k = scale * (0.94 + rnd(n, 3) * 0.12);
      const at: Vec3 = [x + shift[0], shift[1], z + shift[2]];
      const out = outAt ? outAt(i) : Infinity;
      if (t >= out) return <Zap key={i} position={at} t={t - out} seed={n} />;
      const dropped = drop !== undefined && drop > 0;
      const fall = dropped ? Math.max(0.25, 1.18 * k - 4.9 * drop * drop * 4) : 0;
      const rot = f ?? face;
      return (
        <group key={i}>
          <Enderman
            position={at}
            rotationY={rot}
            scale={k}
            phase={n * 1.7}
            walk={walk ? walk + n : 0}
            lookAt={lookAt}
            mood={mood}
            jaw={jaw}
            shake={shake}
            tilt={tilt ? Math.sin(t * 1.3 + n) * tilt : 0}
            carry={hold ? (dropped ? Math.max(0, 1 - drop * 5) : 1) : 0}
          >
            {hold && !dropped ? <Thing kind={n * 5 + 1} /> : null}
          </Enderman>
          {hold && dropped ? <Thing kind={n * 5 + 1} position={[at[0] + Math.sin(rot) * 1.1 * k, fall, at[2] + Math.cos(rot) * 1.1 * k]} /> : null}
        </group>
      );
    })}
  </>
);

// ----------------------------------------------------------------------------- the players

const HUNTERS = [
  { skin: "#c68e62", hair: "#1c1410", torso: "#8a2424", legs: "#22222a" },
  { skin: "#e3b48c", hair: "#c9a13c", torso: "#2f5fb0", legs: "#2c2c44" },
  { skin: "#8d5a3b", hair: "#15110f", torso: "#3f8f4a", legs: "#4a3a2a" },
  { skin: "#f0c8a4", hair: "#7a3d1c", torso: "#c8641e", legs: "#2a2a33" },
  { skin: "#d8a47c", hair: "#2a2a2a", torso: "#b0b6c0", legs: "#3a4252" },
  { skin: "#b97a56", hair: "#4a2c14", torso: "#2f8f8a", legs: "#33302c" },
];
/** One of the six players: a sword in the hand, and (`on`) a carved pumpkin over the head. */
export const Hunter: React.FC<A & { who: number; on?: boolean; sword?: boolean }> = ({ who, on = true, sword = true, ...p }) => {
  const c = HUNTERS[who % HUNTERS.length];
  return (
    <MinecraftAvatar
      outfit="tee"
      skin={c.skin}
      hair={c.hair}
      colors={{ torso: c.torso, arms: c.torso, legs: c.legs }}
      blink
      phase={who * 1.3 + 0.4}
      head={on ? <Pumpkin position={[0, 0.03, 0]} scale={0.98} /> : undefined}
      {...p}>
      {sword ? <PlayerSword /> : null}
    </MinecraftAvatar>
  );
};

/**
 * A pumpkin knocked off a head. `from` is where the head was, `t` seconds since the knock, `v` the push (x, up, z).
 * It tumbles, lands and lies still.
 */
export const Knocked: React.FC<{ from: Vec3; t: number; v?: Vec3; seed?: number }> = ({ from, t, v = [0, 2.6, -2.6], seed = 0 }) => {
  if (t <= 0) return null;
  const rest = 0.28;
  const land = (v[1] + Math.sqrt(v[1] * v[1] + 2 * 9.8 * (from[1] - rest))) / 9.8;
  const tt = Math.min(t, land);
  const roll = Math.min(1, Math.max(0, (t - land) / 0.5));
  const slide = roll * 0.5 * (1 - roll * 0.5);
  return (
    <group
      position={[from[0] + v[0] * (tt + slide), Math.max(rest, from[1] + v[1] * tt - 4.9 * tt * tt), from[2] + v[2] * (tt + slide)]}
      rotation={[tt >= land ? 0 : -tt * 7, seed * 1.3 + (tt >= land ? 0.4 : 0), tt >= land ? Math.sin(Math.min(t - land, 1.2) * 9) * 0.12 * (1 - roll) : 0]}>
      <Pumpkin position={[0, 0, 0]} />
    </group>
  );
};

/** An ender pearl, drawn flat: a round dark-green gem. `position` is its middle; it faces +Z. */
export const Pearl: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({ position, scale = 1, rotationY = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {([[0.2, 0.36], [0.36, 0.2]] as Array<[number, number]>).map(([a, b], i) => (
        <Block key={i} size={[a, b, 0.05]} color="#0f4a45" emissive="#0f4a45" emissiveIntensity={0.5} castShadow={false} />
      ))}
      <Block position={[0, 0, 0.01]} size={[0.26, 0.26, 0.05]} color="#1f8a78" emissive="#1f8a78" emissiveIntensity={0.6} castShadow={false} />
      <Block position={[-0.05, 0.05, 0.02]} size={[0.1, 0.1, 0.05]} color="#7ff0d0" emissive="#7ff0d0" emissiveIntensity={0.7} castShadow={false} />
    </group>
  );
/** What a player wants, on a board held over the head: a pearl. */
export const PearlSign: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({ position, scale = 1, rotationY = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block size={[0.74, 0.74, 0.04]} color="#15151a" castShadow={false} />
      <Block position={[0, 0, 0.012]} size={[0.64, 0.64, 0.04]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.35} castShadow={false} />
      <Block position={[0, -0.46, 0]} size={[0.14, 0.2, 0.03]} color="#15151a" castShadow={false} />
      <Pearl position={[0, 0, 0.04]} scale={1.2} />
    </group>
  );

// ----------------------------------------------------------------------------- his drawing

const INK = "#2a2630";
/**
 * His drawing of his mum. `dots` 0–2: the two purple dots, which are all he knows. `rest`: what he had to guess (a
 * square head, a big red smile, a bow, a sun and a heart). Paper 0.62 × 0.78, facing +Z. `position` is its middle.
 */
export const Drawing: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; dots?: number; rest?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, dots = 2, rest = true }) => {
  const z = 0.012;
  const ink = (x: number, y: number, sx: number, sy: number, color: string, key: string, r = 0) => (
    <group key={key} position={[x, y, z]} rotation={[0, 0, r]}>
      <Block size={[sx, sy, 0.006]} color={color} castShadow={false} />
    </group>
  );
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Block size={[0.62, 0.78, 0.02]} color="#fbf6e4" />
      {dots > 0 ? ink(-0.1, 0.1, 0.08, 0.08, PURPLE, "d1") : null}
      {dots > 1 ? ink(0.1, 0.1, 0.08, 0.08, PURPLE, "d2") : null}
      {rest ? (
        <>
          {ink(0, 0.27, 0.42, 0.03, INK, "t", 0.03)}
          {ink(0, -0.13, 0.42, 0.03, INK, "b", -0.04)}
          {ink(-0.2, 0.07, 0.03, 0.42, INK, "l", 0.03)}
          {ink(0.2, 0.07, 0.03, 0.42, INK, "r", -0.02)}
          {ink(-0.1, -0.02, 0.035, 0.07, "#e23a3a", "s1")}
          {ink(0, -0.06, 0.2, 0.035, "#e23a3a", "s2")}
          {ink(0.1, -0.02, 0.035, 0.07, "#e23a3a", "s3")}
          {ink(-0.06, 0.32, 0.1, 0.07, PINK, "w1", 0.3)}
          {ink(0.06, 0.32, 0.1, 0.07, PINK, "w2", -0.3)}
          {ink(0, -0.24, 0.03, 0.2, INK, "n")}
          {ink(0.22, 0.3, 0.1, 0.1, "#f2c21e", "sun")}
          {ink(-0.22, -0.28, 0.05, 0.05, "#e8455f", "h1")}
          {ink(-0.15, -0.28, 0.05, 0.05, "#e8455f", "h2")}
          {ink(-0.185, -0.325, 0.06, 0.05, "#e8455f", "h3")}
        </>
      ) : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- weather, and small things

/** Rain over `center`: `k` 0–1 is how hard. Endermen will not stand in it. */
export const Rain: React.FC<{ center: Vec3; t: number; area?: [number, number]; count?: number; k?: number }> = ({ center, t, area = [10, 14], count = 150, k = 1 }) => (
  <group position={center}>
    {Array.from({ length: Math.round(count * Math.min(1, Math.max(0, k))) }, (_, i) => {
      const y = 8 - ((t * 12 + rnd(i, 3) * 8) % 8);
      return <Block key={i} position={[(rnd(i, 1) - 0.5) * area[0], y, (rnd(i, 2) - 0.5) * area[1]]} size={[0.03, 0.46, 0.03]} color="#cfe4ff" emissive="#9cc4ff" emissiveIntensity={0.5} castShadow={false} />;
    })}
  </group>
);
export const Puddle: React.FC<{ position: Vec3; size?: [number, number] }> = ({ position, size = [1.5, 1.0] }) => (
  <group position={position}>
    <Block position={[0, 0.07, 0]} size={[size[0], 0.02, size[1]]} color="#4f96e0" castShadow={false} />
    <Block position={[0.1, 0.075, -0.05]} size={[size[0] * 0.62, 0.02, size[1] * 0.6]} color="#7fbcf2" castShadow={false} />
    <Block position={[-size[0] * 0.2, 0.08, 0.1]} size={[size[0] * 0.2, 0.02, size[1] * 0.12]} color="#d8efff" castShadow={false} />
  </group>
);
/** A plate with something on it. `position` is where it sits on the table top. */
export const Plate: React.FC<{ position: Vec3; food?: string }> = ({ position, food = "#b5651d" }) => (
  <group position={position}>
    <Block position={[0, 0.015, 0]} size={[0.36, 0.03, 0.36]} color="#f4f1e8" />
    <Block position={[0, 0.07, 0]} size={[0.18, 0.09, 0.18]} color={food} castShadow={false} />
  </group>
);

/**
 * The white border of a photo, for a camera that does not move: give it where the camera is, and the fov. It stands
 * half a metre in front of the lens, square to a lens that looks north with no tilt.
 */
export const PhotoBorder: React.FC<{ camera: Vec3; fov: number }> = ({ camera, fov }) => {
  const hh = 0.5 * Math.tan((fov * Math.PI) / 360);
  const hw = (hh * 9) / 16;
  const bar = (x: number, y: number, sx: number, sy: number, key: string) => (
    <Block key={key} position={[x, y, 0]} size={[sx, sy, 0.004]} color="#fbfaf4" emissive="#fbfaf4" emissiveIntensity={0.75} castShadow={false} />
  );
  return (
    <group position={[camera[0], camera[1], camera[2] - 0.5]}>
      {bar(-hw, 0, hw * 0.3, hh * 2.4, "l")}
      {bar(hw, 0, hw * 0.3, hh * 2.4, "r")}
      {bar(0, hh, hw * 2.4, hh * 0.22, "t")}
      {bar(0, -hh * 0.93, hw * 2.4, hh * 0.44, "b")}
    </group>
  );
};

/** What a player sees from inside a pumpkin: dark, and two small holes. Same rules as `PhotoBorder`. `sway` slides it. */
export const PumpkinView: React.FC<{ camera: Vec3; fov: number; sway?: number; hole?: number }> = ({ camera, fov, sway = 0, hole = 0.62 }) => {
  const hh = 0.5 * Math.tan((fov * Math.PI) / 360);
  const hw = (hh * 9) / 16;
  const a = hw * hole; // a hole's width
  const b = a * 0.95; // and its height
  const cx = hw * 0.52;
  const cy = hh * 0.12;
  const dark = (x: number, y: number, sx: number, sy: number, key: string) => (
    <Block key={key} position={[x, y, 0]} size={[sx, sy, 0.004]} color="#1c0d03" castShadow={false} />
  );
  const big = hh * 4;
  return (
    <group position={[camera[0] + sway, camera[1], camera[2] - 0.5]}>
      {dark(0, cy + b / 2 + big / 2, big, big, "t")}
      {dark(0, cy - b / 2 - big / 2, big, big, "b")}
      {dark(-cx - a / 2 - big / 2, cy, big, b, "l")}
      {dark(cx + a / 2 + big / 2, cy, big, b, "r")}
      {dark(0, cy, cx * 2 - a, b, "m")}
      {/* the carved edge: a soft orange rim round each hole */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * cx, cy, 0.002]}>
          <Block position={[0, b / 2 + 0.002, 0]} size={[a + 0.008, 0.004, 0.004]} color="#c8661a" emissive="#c8661a" emissiveIntensity={0.5} castShadow={false} />
          <Block position={[0, -b / 2 - 0.002, 0]} size={[a + 0.008, 0.004, 0.004]} color="#c8661a" emissive="#c8661a" emissiveIntensity={0.5} castShadow={false} />
        </group>
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- the kitchen

/** The stove: a furnace. `position` is the middle of its bottom; the mouth faces +Z. */
export const Stove: React.FC<{ position?: Vec3; lit?: boolean }> = ({ position = [0, 0, 0], lit = false }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 0.45, 0]} size={[0.9, 0.9, 0.9]} />
    <Block position={[0, 0.3, 0.452]} size={[0.5, 0.3, 0.02]} color="#1a1512" emissive={lit ? "#ff8a1c" : "#000000"} emissiveIntensity={lit ? 1 : 0} castShadow={false} />
    <Block position={[0, 0.68, 0.452]} size={[0.62, 0.12, 0.02]} color="#3a3a3e" castShadow={false} />
  </group>
);
/** A kitchen counter with a dark top, and a pot or a loaf on it. */
export const Counter: React.FC<{ position: Vec3; on?: "pot" | "loaf" }> = ({ position, on = "pot" }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.42, 0]} size={[0.9, 0.84, 0.9]} />
    <Vox kind="darkPlanks" position={[0, 0.88, 0]} size={[0.98, 0.08, 0.98]} />
    {on === "pot" ? (
      <>
        <Block position={[0, 1.06, 0]} size={[0.4, 0.28, 0.4]} color="#4a4a52" />
        <Block position={[0, 1.21, 0]} size={[0.32, 0.03, 0.32]} color="#d8842a" castShadow={false} />
      </>
    ) : (
      <Block position={[0, 1.0, 0]} size={[0.46, 0.18, 0.26]} color="#c98a3c" />
    )}
  </group>
);
/** A shelf on the wall with three jars. `position` is the middle of the board. */
export const Shelf: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="darkPlanks" size={[2.6, 0.08, 0.34]} />
    {(["#e23a3a", "#f2d24a", "#5a8fe8", "#5faa3a"] as string[]).map((c, i) => (
      <Block key={c} position={[-0.9 + i * 0.6, 0.17, 0]} size={[0.24, 0.26, 0.22]} color={c} />
    ))}
  </group>
);
/** Where the kitchen was: pale shapes on the wall and the floor. `position` is the middle slot. */
export const KitchenGone: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    {[-1, 0, 1].map((i) => (
      <group key={i}>
        <Block position={[i, 0.47, -0.5]} size={[0.86, 0.9, 0.02]} color="#b3a6cc" castShadow={false} />
        <Block position={[i, 0.075, 0]} size={[0.86, 0.02, 0.86]} color="#d9bf8c" castShadow={false} />
      </group>
    ))}
    <Block position={[0, 1.85, -0.5]} size={[2.6, 0.12, 0.02]} color="#b3a6cc" castShadow={false} />
  </group>
);
/** A frying pan with an egg in it, for a hand. */
export const Pan: React.FC = () => (
  <group position={[0, -0.02, 0.2]}>
    <Block position={[0, 0, 0.12]} size={[0.3, 0.05, 0.3]} color="#2e2e34" />
    <Block position={[0, 0, -0.1]} size={[0.06, 0.04, 0.2]} color="#5a3d22" />
    <Block position={[0, 0.03, 0.12]} size={[0.2, 0.02, 0.2]} color="#fbfbf4" castShadow={false} />
    <Block position={[0.02, 0.045, 0.13]} size={[0.08, 0.02, 0.08]} color="#f2b21e" castShadow={false} />
  </group>
);

// ----------------------------------------------------------------------------- staging

/** The town going about in the street: [x, z]. */
export const STREET: Spot[] = [
  [-0.9, 6.4], [1.1, 4.6], [-0.3, 2.6], [1.4, 0.8], [-1.3, -0.8], [0.5, -2.6], [-0.8, -4.4], [1.2, -6.0],
  [-2.3, 3.6], [2.4, 2.2], [0.1, -7.6], [-2.1, -6.4],
];
/** The whole town in the square at night, facing south. Mum and dad stand in front of it, apart from this. */
export const SQUARE: Spot[] = [
  [-2.1, -1.4], [2.2, -1.2], [0.1, -1.9], [-1.1, -2.6], [1.2, -2.9], [-3.0, -3.0], [3.1, -3.3], [-0.2, -3.7],
  [-2.0, -4.3], [2.1, -4.6], [0.9, -5.2], [-1.0, -5.5], [-3.2, -5.8], [3.3, -6.0], [0, -6.6], [-1.9, -7.2], [1.9, -7.4],
];
export const MUM_AT: Vec3 = [-0.95, 0, -0.5];
export const DAD_AT: Vec3 = [1.0, 0, 0];
/** The six players, in three rows of two, facing the town: [x, z]. */
export const SIX: Array<[number, number]> = [[-0.55, 3.3], [0.6, 3.1], [-1.6, 4.0], [1.65, 3.9], [-0.9, 5.0], [1.0, 5.1]];
/** Where the six pumpkins end up, for the shots after. */
export const PUMPS: Array<[number, number, number]> = [[-0.7, 1.6, 0.4], [0.9, 1.9, -0.6], [-1.5, 2.6, 1.9], [1.5, 2.9, 2.6], [-0.2, 2.8, -1.2], [0.3, 1.2, 0.9]];
