import type React from "react";
import { Block, MinecraftAvatar, Vox } from "../../src/engine";
import type { BlockKind, Vec3 } from "../../src/engine";
import { Enderman } from "./monsters";
import type { Mood } from "./monsters";
import { Pumpkin } from "./players";
import { PlayerSword } from "./creepertown";
import { Bits } from "./things";
import { Hut } from "./places";

/**
 * THE ENDERMAN TOWN — endermen as people (a mum, a dad, a town that carries blocks, teleports and screams), the
 * players who come for ender pearls with pumpkins on their heads, and the things of a kid who lives among them.
 *
 * Built for "In This Town, I Have Never Seen My Mum's Face" and moved here at the owner's word (2026-11-16: "put the
 * enderman skins and other stuff as a template and put the source code + mp4 into the reference for other agents to
 * see"). Catalogue and picture: PACK.md, "The enderman town". How each is staged, shot by shot:
 * reference/never-seen-my-mums-face/.
 *
 *   <EnderMum position={p} lookAt={kid} lean={0.6} mood="happy" />     bends down to him
 *   <EnderDad position={p} carry={1}><EnderThing kind={8} /></EnderDad> carries a grass block with two flowers on it
 *   <EnderCrowd spots={SPOTS} t={t} jaw={1} shake={1} drop={t} />       the whole town screams and lets go of its blocks
 *   <EnderCrowd spots={SPOTS} t={t} outAt={(i) => 0.5 + i * 0.09} />    they teleport away, one after another
 *   <PumpkinPlayer who={0} on={t < knock} />                            a player with a sword, in a pumpkin until it is knocked off
 *
 * The enderman itself is `Enderman` in monsters.tsx: 2.9 m, `jaw` (the scream), `shake`, `carry` with `children`,
 * `lean`, `lookAt`, `mood`. Everything here is that enderman, dressed and directed.
 * A tall frame is narrow and an enderman is 2.9 m: stage in depth, tilt up, or cut it off at the chest on purpose.
 */

const U = 1.8 / 32;
export const ENDER_PINK = "#f06aa8";
export const ENDER_PURPLE = "#b04cf0";
const rnd = (i: number, s = 1) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};
type A = React.ComponentProps<typeof MinecraftAvatar>;

// ----------------------------------------------------------------------------- the family

/**
 * A carved pumpkin worn by a kid, for the `head` prop of a `MinecraftAvatar`: `<MinecraftAvatar head={<PumpkinHat />} />`.
 * `scale` 1.15 is too big for a kid, which is the joke. `up` 0–1 pushes it back off the face like a hat; `askew` tips it.
 */
export const PumpkinHat: React.FC<{ scale?: number; up?: number; askew?: number }> = ({ scale = 1.15, up = 0, askew = 0.1 }) => (
  <group position={[0, 0.05 + up * 0.36, -up * 0.2]} rotation={[-up * 0.75, 0, askew]}>
    <Pumpkin position={[0, 0, 0]} scale={scale} />
  </group>
);

type E = React.ComponentProps<typeof Enderman>;
/** His mum: the pink bow, and a pink band on each knee, which is how he knows her. No scarf: bent over, it hangs like a tongue. */
export const EnderMum: React.FC<E> = (p) => {
  const [x, y, z] = p.position ?? [0, 0, 0];
  const swing = Math.sin((p.walk ?? 0) * 2.6) * 0.45;
  return (
    <>
      <Enderman hat="bow" phase={0.7} {...p} />
      <group position={[x, y, z]} rotation={[0, p.rotationY ?? 0, 0]} scale={p.scale ?? 1}>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 2 * U, 30 * U, 0]} rotation={[s * swing, 0, 0]}>
            <Block position={[0, -14.5 * U, 0]} size={[2.7 * U, 1.9 * U, 2.7 * U]} color={ENDER_PINK} />
          </group>
        ))}
      </group>
    </>
  );
};
/** His dad: the straw hat, a blue scarf, a little taller. He is always carrying something. */
export const EnderDad: React.FC<E> = (p) => <Enderman hat="straw" scarf="#3f8fe0" phase={1.9} scale={1.06} {...p} />;

// ----------------------------------------------------------------------------- things an enderman carries

/** What an enderman holds: 0 grass, 1 cobble, 2 sand, 3 planks, 4 melon, 5 a flower pot, 6 TNT, 7 hay, 8 grass with a poppy. */
export const EnderThing: React.FC<{ kind: number; position?: Vec3 }> = ({ kind, position = [0, 0, 0] }) => {
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
export const EnderZap: React.FC<{ position: Vec3; t: number; seed?: number }> = ({ position, t, seed = 1 }) => (
  <>
    <Bits position={[position[0], position[1] + 1.6, position[2]]} t={t} color={ENDER_PURPLE} count={12} seed={seed} power={0.75} />
    <Bits position={[position[0], position[1] + 0.8, position[2]]} t={t} color="#e9b8ff" count={7} seed={seed + 9} power={0.55} />
  </>
);

/** [x, z, facing]. */
export type EnderSpot = [number, number, number?];
/**
 * A town of endermen. Each holds a thing (`hold`), unless it has dropped it (`drop`: seconds since they all let go).
 * `outAt(i)`: the second at which that one teleports away. `jaw` and `shake` 0–1: the scream.
 */
export const EnderCrowd: React.FC<{
  spots: EnderSpot[];
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
      if (t >= out) return <EnderZap key={i} position={at} t={t - out} seed={n} />;
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
            {hold && !dropped ? <EnderThing kind={n * 5 + 1} /> : null}
          </Enderman>
          {hold && dropped ? <EnderThing kind={n * 5 + 1} position={[at[0] + Math.sin(rot) * 1.1 * k, fall, at[2] + Math.cos(rot) * 1.1 * k]} /> : null}
        </group>
      );
    })}
  </>
);

// ----------------------------------------------------------------------------- the players

const PUMPKIN_PLAYERS = [
  { skin: "#c68e62", hair: "#1c1410", torso: "#8a2424", legs: "#22222a" },
  { skin: "#e3b48c", hair: "#c9a13c", torso: "#2f5fb0", legs: "#2c2c44" },
  { skin: "#8d5a3b", hair: "#15110f", torso: "#3f8f4a", legs: "#4a3a2a" },
  { skin: "#f0c8a4", hair: "#7a3d1c", torso: "#c8641e", legs: "#2a2a33" },
  { skin: "#d8a47c", hair: "#2a2a2a", torso: "#b0b6c0", legs: "#3a4252" },
  { skin: "#b97a56", hair: "#4a2c14", torso: "#2f8f8a", legs: "#33302c" },
];
/** One of the six players: a sword in the hand, and (`on`) a carved pumpkin over the head. */
export const PumpkinPlayer: React.FC<A & { who: number; on?: boolean; sword?: boolean }> = ({ who, on = true, sword = true, ...p }) => {
  const c = PUMPKIN_PLAYERS[who % PUMPKIN_PLAYERS.length];
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
export const KnockedPumpkin: React.FC<{ from: Vec3; t: number; v?: Vec3; seed?: number }> = ({ from, t, v = [0, 2.6, -2.6], seed = 0 }) => {
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
export const EnderPearl: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({ position, scale = 1, rotationY = 0 }) =>
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
      <EnderPearl position={[0, 0, 0.04]} scale={1.2} />
    </group>
  );

// ----------------------------------------------------------------------------- his drawing

const INK = "#2a2630";
/**
 * His drawing of his mum. `dots` 0–2: the two purple dots, which are all he knows. `rest`: what he had to guess (a
 * square head, a big red smile, a bow, a sun and a heart). Paper 0.62 × 0.78, facing +Z. `position` is its middle.
 */
export const KidDrawing: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; dots?: number; rest?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, dots = 2, rest = true }) => {
  const z = 0.012;
  const ink = (x: number, y: number, sx: number, sy: number, color: string, key: string, r = 0) => (
    <group key={key} position={[x, y, z]} rotation={[0, 0, r]}>
      <Block size={[sx, sy, 0.006]} color={color} castShadow={false} />
    </group>
  );
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Block size={[0.62, 0.78, 0.02]} color="#fbf6e4" />
      {dots > 0 ? ink(-0.1, 0.1, 0.08, 0.08, ENDER_PURPLE, "d1") : null}
      {dots > 1 ? ink(0.1, 0.1, 0.08, 0.08, ENDER_PURPLE, "d2") : null}
      {rest ? (
        <>
          {ink(0, 0.27, 0.42, 0.03, INK, "t", 0.03)}
          {ink(0, -0.13, 0.42, 0.03, INK, "b", -0.04)}
          {ink(-0.2, 0.07, 0.03, 0.42, INK, "l", 0.03)}
          {ink(0.2, 0.07, 0.03, 0.42, INK, "r", -0.02)}
          {ink(-0.1, -0.02, 0.035, 0.07, "#e23a3a", "s1")}
          {ink(0, -0.06, 0.2, 0.035, "#e23a3a", "s2")}
          {ink(0.1, -0.02, 0.035, 0.07, "#e23a3a", "s3")}
          {ink(-0.06, 0.32, 0.1, 0.07, ENDER_PINK, "w1", 0.3)}
          {ink(0.06, 0.32, 0.1, 0.07, ENDER_PINK, "w2", -0.3)}
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
export const DinnerPlate: React.FC<{ position: Vec3; food?: string }> = ({ position, food = "#b5651d" }) => (
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
export const KitchenStove: React.FC<{ position?: Vec3; lit?: boolean }> = ({ position = [0, 0, 0], lit = false }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 0.45, 0]} size={[0.9, 0.9, 0.9]} />
    <Block position={[0, 0.3, 0.452]} size={[0.5, 0.3, 0.02]} color="#1a1512" emissive={lit ? "#ff8a1c" : "#000000"} emissiveIntensity={lit ? 1 : 0} castShadow={false} />
    <Block position={[0, 0.68, 0.452]} size={[0.62, 0.12, 0.02]} color="#3a3a3e" castShadow={false} />
  </group>
);
/** A kitchen counter with a dark top, and a pot or a loaf on it. */
export const KitchenCounter: React.FC<{ position: Vec3; on?: "pot" | "loaf" }> = ({ position, on = "pot" }) => (
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
export const KitchenShelf: React.FC<{ position: Vec3 }> = ({ position }) => (
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
export const FryingPan: React.FC = () => (
  <group position={[0, -0.02, 0.2]}>
    <Block position={[0, 0, 0.12]} size={[0.3, 0.05, 0.3]} color="#2e2e34" />
    <Block position={[0, 0, -0.1]} size={[0.06, 0.04, 0.2]} color="#5a3d22" />
    <Block position={[0, 0.03, 0.12]} size={[0.2, 0.02, 0.2]} color="#fbfbf4" castShadow={false} />
    <Block position={[0.02, 0.045, 0.13]} size={[0.08, 0.02, 0.08]} color="#f2b21e" castShadow={false} />
  </group>
);

// ----------------------------------------------------------------------------- the town

const KINDS: BlockKind[] = ["grass", "sand", "cobble", "planks", "hay", "log", "dirt", "stone"];
/** What an enderman brings home: a heap of blocks that do not match. `n` picks which; `at` is [x, z]. */
export const BlockPile: React.FC<{ at: [number, number]; n: number; wide?: number; high?: number }> = ({ at, n, wide = 2, high = 2 }) => (
  <group position={[at[0], 0, at[1]]}>
    {Array.from({ length: wide * high }, (_, i) => {
      const col = i % wide;
      const row = Math.floor(i / wide);
      if (row > 0 && (i * 5 + n) % 3 === 0) return null;
      const kind = KINDS[(i * 3 + n * 5) % KINDS.length];
      return <Vox key={i} kind={kind} side={kind === "grass" ? "dirt" : undefined} position={[col - (wide - 1) / 2, 0.5 + row, ((i + n) % 2) * 0.12]} size={[1, 1, 1]} />;
    })}
  </group>
);

export const ENDER_WALL = "#5d4f78";
export const ENDER_ROOF = "#7b46c4";
/** An enderman's house: a `Hut` with dark purple walls and a purple roof. `at` is the middle of its front wall; `turn` 0 faces south. */
export const EnderHouse: React.FC<Omit<React.ComponentProps<typeof Hut>, "wall" | "tint" | "roof">> = (p) => <Hut wall="planks" tint={ENDER_WALL} roof={ENDER_ROOF} {...p} />;

