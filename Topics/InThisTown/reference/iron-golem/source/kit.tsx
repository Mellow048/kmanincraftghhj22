import type React from "react";
import * as THREE from "three";
import { Block, Glow, MinecraftAvatar, Vox, clamp01, getPose, lerp, mulberry32, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { Blaze, Hut, IronGolem, KID, Player, Pumpkin, Puffs, Villager, beside, ease, hill, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import { filmClock } from "../../../Topics/Shared";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit".
 *
 * New in this film, and not in the pack yet: the SNOW GOLEM (Puddle), the fire flier (a blaze: `FireMob`,
 * because the pack's `Blaze` is a roof on fire), the GATE (a nether portal), the umbrella, a cow, a cart.
 * Part two will want the first three: move them to the pack then.
 */

export {
  // staging
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the people of the town, the iron golem
  ADULT, CHILD, IronGolem, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // players
  Player, Pumpkin,
  // things
  BedBox, Bits, Blaze, Bucket, Chicken, Fire, FireLight, Hut, Puffs, RankSign, Smoke, SubscribeSign, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
export const wordAt = wordClock(timing);
/** The same for a shot that cuts in `cut` seconds into its line. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
/** Film time: for the world, which outlives a shot. */
export const clock = filmClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the camera.
 * The hill with the gate closes the street at its east end.
 */
export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south-west. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [5.0, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /** The teller's house. Middle of its front wall. Its door is 1.3 m west of that. */
  home: [10, 0, -5] as Vec3,
  /** In front of his door. */
  doorstep: [8.7, 0, -3.6] as Vec3,
  /** Where the first flier hangs when the snowball finds it, over the west of the square. */
  mark: [-3.2, 3.6, 1.6] as Vec3,
  /** Where the contest boulder lies. */
  rock: [-1.2, 0, 2.6] as Vec3,
  /** Where Puddle makes his stand, and melts. */
  stand: [3.2, 0, 3.0] as Vec3,
  /** The foot of the hill, on the road. */
  foot: [28.6, 0, 2] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
/** The teller's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

/** THE HILL at the east end of the street. Six blocks high; the top runs from x = 39 to x = 45. */
export const HILL = hill({ x: 42, layers: 6, width: 24, step: 1.5 });
/** The road runs along z = 2, and so does the way up. */
export const ROAD_Z = 2;
/** The gate stands on top, across the road, and looks down the street. `GATE` is the ground under its middle. */
export const GATE: Vec3 = [42, 6, ROAD_Z];
/** The middle of the gate's opening. */
export const GATE_EYE: Vec3 = [42, 8.5, ROAD_Z];

/**
 * How high the road is at `x`: flat through the town, then the six steps of the hill, then the top.
 * The last third of each step rises to the next, so a thing that walks up does not jump a block at a time.
 */
export const roadY = (x: number): number => {
  const f = (x - 30) / 1.5;
  if (f < -0.3) return 0;
  const i = Math.floor(f);
  const k = f - i;
  const here = Math.min(6, Math.max(0, i + 1));
  const next = Math.min(6, Math.max(0, i + 2));
  return here + (next - here) * ease(ramp(k, 0.7, 1));
};
/** A point on the road at `x`, `off` metres south of its middle. */
export const onRoad = (x: number, off = 0): Vec3 => [x, roadY(x), ROAD_Z + off];

// ----------------------------------------------------------------------------- small maths

export { Glow, lerp } from "../../engine";

/** A point on a thrown arc from `a` to `b`: `k` 0 → 1, `up` metres of lob. */
export const arc = (a: Vec3, b: Vec3, k: number, up = 0.6): Vec3 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k) + up * 4 * k * (1 - k), lerp(a[2], b[2], k)];
/** Freeze the clock for `len` seconds at `at`: the frame a hit lands on is held. */
export const hold = (t: number, at: number, len = 0.1) => (t < at ? t : t < at + len ? at : t - len);
const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
/** Mix two colours. */
export const mix = (a: string, b: string, k: number): string => {
  const x = hex(a);
  const y = hex(b);
  const q = clamp01(k);
  return `#${[0, 1, 2].map((i) => Math.round(lerp(x[i], y[i], q)).toString(16).padStart(2, "0")).join("")}`;
};

// ----------------------------------------------------------------------------- people

type A = Partial<MinecraftAvatarProps>;

/** The teller. RED: nobody else in the film wears it. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#e2362b", arms: "#e2362b", legs: "#2c3350" }} blink {...p} />
);

/** His dad. A beard, a green coat. */
export const Dad: React.FC<A> = (p) => (
  <MinecraftAvatar scale={1} outfit="hoodie" skin="#dba47c" hair="#3a2415" face="bearded" colors={{ torso: "#4f7a45", arms: "#4f7a45", legs: "#5a4632" }} blink {...p} />
);

/** The other kids, by `who` (the pack's players, at kid size). None of them wears red, and none a pumpkin. */
export const KIDS = [3, 7, 6, 1, 10, 4, 9, 11];
export const Kid: React.FC<A & { n: number }> = ({ n, ...p }) => <Player who={KIDS[n % KIDS.length]} scale={KID} {...p} />;

/** A pose from a clip, with one or both arms straight up: holding something over a head. */
export const armsUp = (clip: Parameters<typeof getPose>[0], t: number, right = true, left = false, lean = 0): Pose => {
  const p = getPose(clip, t);
  return { ...p, armR: right ? [-2.95, 0, 0.1 + lean] : p.armR, armL: left ? [-2.95, 0, -0.1 - lean] : p.armL };
};

// ----------------------------------------------------------------------------- the snow golem

const SNOW = "#f4f9ff";
const SNOW_SHADE = "#dfeaf6";
const STICK = "#6a4a2a";
const ARM = 0.68;

export type SnowArm = { raise?: number; swing?: number } | null;

/** How high the snow of him stands, for `snow` of him left. The pumpkin sits on that. */
const snowTop = (snow: number) => Math.max(0.07, 1.3 * snow);
const shoulderOf = (snow: number): [number, number] => [0.16 + 0.17 * Math.min(1, snow * 1.6), Math.max(0.1, 1.0 * snow)];

/**
 * PUDDLE. Two blocks of snow, a carved pumpkin, two sticks. Feet on `position`, facing +Z, 1.8 m tall when whole.
 *
 * `snow` is how much of him is left: 1 whole, 0.5 up to a kid's chin, 0.2 at his belt, 0 a pumpkin on a heap.
 * The pumpkin and the sticks do not melt. An arm is `{ raise, swing }` in radians (0, 0 sticks straight out to the
 * side; raise lifts it, swing brings it round to the front), or `null` when it has come off.
 */
export const SnowGolem: React.FC<{
  position: Vec3;
  rotationY?: number;
  snow?: number;
  armR?: SnowArm;
  armL?: SnowArm;
  headYaw?: number;
  headPitch?: number;
  headRoll?: number;
  /** Leans the whole of him forward (radians). */
  lean?: number;
  /** 0–1: the noon sun. He sags, spreads, and stands in his own water. */
  drip?: number;
  /** Metres of water round his foot, whatever the sun is doing. */
  wet?: number;
  /** A small warm light on his face, for the night: moonlight turns a pumpkin black. Its strength. */
  fill?: number;
  /** In the right stick's hand. */
  children?: React.ReactNode;
}> = ({ position, rotationY = 0, snow = 1, armR = {}, armL = {}, headYaw = 0, headPitch = 0, headRoll = 0, lean = 0, drip = 0, wet = 0, fill = 0, children }) => {
  const t = useFilmTime();
  const s = clamp01(snow) * (1 - 0.3 * drip);
  const fat = (0.5 + 0.5 * Math.min(1, s * 1.4)) * (1 + 0.22 * drip);
  const top = snowTop(s);
  const [sx, sy] = shoulderOf(s);
  const water = Math.max(wet, drip * 1.25);
  const sag = drip * 0.55;
  const arm = (side: number, a: SnowArm) => {
    if (a === null) return null;
    const raise = (a.raise ?? 0.3) - sag;
    const swing = a.swing ?? 0.15;
    return (
      <group key={side} position={[side * sx * fat, sy, 0]} rotation={[0, -side * swing, side * raise]}>
        <Block position={[side * ARM * 0.5, 0, 0]} size={[ARM, 0.06, 0.06]} color={STICK} />
        <Block position={[side * (ARM - 0.12), 0.08, 0]} rotation={[0, 0, side * 0.7]} size={[0.2, 0.045, 0.045]} color={STICK} />
        <Block position={[side * (ARM - 0.2), -0.07, 0.02]} rotation={[0, 0, -side * 0.6]} size={[0.16, 0.04, 0.04]} color={STICK} />
        {side > 0 && children ? <group position={[ARM, 0, 0]}>{children}</group> : null}
      </group>
    );
  };
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {water > 0.02 ? (
        <>
          <Block position={[0.02, 0.05, 0.04]} size={[water * 1.0, 0.02, water * 0.72]} color="#5fa8dc" castShadow={false} opacity={0.88} />
          <Block position={[0.3 * water, 0.05, -0.34 * water]} size={[water * 0.52, 0.02, water * 0.4]} color="#5fa8dc" castShadow={false} opacity={0.88} />
          <Block position={[-0.36 * water, 0.05, 0.36 * water]} size={[water * 0.5, 0.02, water * 0.34]} color="#5fa8dc" castShadow={false} opacity={0.88} />
          <Block position={[0.46 * water, 0.05, 0.3 * water]} size={[water * 0.26, 0.02, water * 0.3]} color="#5fa8dc" castShadow={false} opacity={0.88} />
          <Block position={[-0.12 * water, 0.062, 0.16 * water]} size={[water * 0.4, 0.012, water * 0.12]} color="#d6efff" castShadow={false} />
        </>
      ) : null}
      <group rotation={[lean, 0, 0]}>
        {/* The snow: a wide block and a narrower one on it. Both shrink as he melts. */}
        <group scale={[fat, Math.max(0.05, s), fat]}>
          <Vox kind="wool" tint={SNOW} position={[0, 0.36, 0]} size={[0.84, 0.72, 0.84]} />
          <Vox kind="wool" tint={SNOW_SHADE} position={[0, 1.01, 0]} size={[0.64, 0.58, 0.64]} />
          <Block position={[0, 0.74, 0.3]} size={[0.5, 0.05, 0.1]} color="#ffffff" castShadow={false} />
        </group>
        {arm(1, armR)}
        {arm(-1, armL)}
        <group position={[0, top + 0.2 - drip * 0.05, 0]} rotation={[headPitch + drip * 0.18, headYaw, headRoll + Math.sin(t * 1.3) * 0.02]}>
          <Pumpkin position={[0, 0, 0]} scale={0.84} />
        </group>
        {fill > 0 ? <pointLight position={[0, top + 0.35, 1.0]} color="#ffd2a0" intensity={fill} distance={3.2} decay={2} /> : null}
      </group>
      {drip > 0.1
        ? [0, 1, 2].map((i) => {
            const k = (t * 1.6 + i * 0.37) % 1;
            return <Block key={i} position={[(i - 1) * 0.3, top * (1 - k) + 0.05, 0.36]} size={[0.045, 0.09, 0.045]} color="#bfe4f8" castShadow={false} opacity={drip} />;
          })
        : null}
    </group>
  );
};

/** Where the tip of one of his sticks is, in the world: where the snowball leaves from. `side` 1 is his right. */
export const stickTip = (p: Vec3, rotY: number, a: { raise?: number; swing?: number }, side = 1, snow = 1): Vec3 => {
  const fat = 0.5 + 0.5 * Math.min(1, snow * 1.4);
  const [sx, sy] = shoulderOf(snow);
  const r = a.raise ?? 0.3;
  const sw = a.swing ?? 0.15;
  return beside(p, rotY, side * (sx * fat + ARM * Math.cos(r) * Math.cos(sw)), sy + ARM * Math.sin(r), ARM * Math.cos(r) * Math.sin(sw));
};
/** Where his pumpkin is, for the camera. */
export const snowFace = (p: Vec3, snow = 1): Vec3 => [p[0], p[1] + snowTop(snow) + 0.2, p[2]];

/**
 * A throw with a stick arm: wound back, then all at once. `at` is the second the ball leaves.
 * Returns the arm, and whether the ball is still in the hand.
 */
export const throwArm = (t: number, at: number): { raise: number; swing: number; holding: boolean } => {
  const wind = ease(ramp(t, at - 0.34, at - 0.07));
  const snap = ramp(t, at - 0.07, at + 0.03);
  const back = ease(ramp(t, at + 0.22, at + 0.5));
  const swing = lerp(lerp(lerp(0.15, -0.95, wind), 1.4, snap * snap), 0.15, back);
  const raise = lerp(lerp(lerp(0.3, 1.05, wind), 0.2, snap * snap), 0.3, back);
  return { raise, swing, holding: t < at };
};

/** A snowball. */
export const Snowball: React.FC<{ position: Vec3; size?: number; spin?: number }> = ({ position, size = 0.17, spin = 0 }) => (
  <mesh position={position} rotation={[spin * 2.1, spin * 1.3, spin]} castShadow>
    <boxGeometry args={[size, size, size]} />
    <meshStandardMaterial color="#ffffff" emissive="#dfefff" emissiveIntensity={0.35} roughness={1} />
  </mesh>
);

/** A heap of snowballs: he had more. `position` is the ground under its middle. */
export const SnowPile: React.FC<{ position: Vec3; count?: number }> = ({ position, count = 10 }) => {
  const spots: Array<[number, number, number]> = [
    [-0.2, 0, 0.1], [0.02, 0, 0.14], [0.22, 0, 0.08], [-0.1, 0, -0.1], [0.13, 0, -0.1],
    [-0.09, 0.15, 0.06], [0.1, 0.15, 0.05], [0.01, 0.15, -0.08], [0.0, 0.3, 0.02], [0.3, 0, -0.06],
  ];
  return (
    <group position={position}>
      {spots.slice(0, count).map(([x, y, z], i) => (
        <Snowball key={i} position={[x, y + 0.09, z]} spin={i * 0.7} />
      ))}
    </group>
  );
};

/** Snow where a snowball has landed: it bursts and is gone. `t` is seconds since the hit. */
export const Splat: React.FC<{ position: Vec3; t: number; size?: number; seed?: number }> = ({ position, t, size = 1, seed = 3 }) => {
  if (t < 0 || t > 0.6) return null;
  const rand = mulberry32(seed * 53 + 7);
  return (
    <group position={position}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const up = rand() * 1.6 - 0.3;
        const v = (0.9 + rand() * 1.4) * size;
        const sz = (0.05 + rand() * 0.07) * size * (1 - t / 0.6);
        return (
          <mesh key={i} position={[Math.cos(a) * v * t, up * t - 2.2 * t * t, Math.sin(a) * v * t]} rotation={[i, t * 9, i * 2]}>
            <boxGeometry args={[sz, sz, sz]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
    </group>
  );
};

/** Snow on the ground behind him: a line of white patches from `from` to `to`. */
export const SnowTrail: React.FC<{ from: Vec3; to: Vec3; count?: number; width?: number }> = ({ from, to, count = 8, width = 0.5 }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const k = i / Math.max(1, count - 1);
      const wob = Math.sin(i * 2.3) * 0.1;
      return (
        <Block
          key={i}
          position={[lerp(from[0], to[0], k) + wob, from[1] + 0.012 + (i % 3) * 0.002, lerp(from[2], to[2], k) - wob]}
          rotationY={i * 0.5}
          size={[width * (0.8 + (i % 3) * 0.2), 0.02, width * (0.7 + (i % 2) * 0.3)]}
          color="#f4f9ff"
          castShadow={false}
        />
      );
    })}
  </>
);

/** Snow falling in a box of air round `center`. `amount` 0–1 thins it. */
export const Snowfall: React.FC<{ center: Vec3; area?: Vec3; count?: number; seed?: number; size?: number; amount?: number; speed?: number }> = ({
  center,
  area = [14, 9, 12],
  count = 140,
  seed = 2,
  size = 0.07,
  amount = 1,
  speed = 1,
}) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 911 + 5);
  return (
    <group position={center}>
      {Array.from({ length: count }, (_, i) => {
        const x = (rand() - 0.5) * area[0];
        const z = (rand() - 0.5) * area[2];
        const ph = rand();
        const v = (0.13 + rand() * 0.09) * speed;
        const sz = size * (0.6 + rand() * 0.9);
        if (i / count > amount) return null;
        const k = (t * v + ph) % 1;
        return (
          <mesh key={i} position={[x + Math.sin(t * 0.9 + i) * 0.25, area[1] * (0.5 - k), z + Math.cos(t * 0.7 + i * 1.7) * 0.2]} rotation={[t + i, i, t * 0.6]}>
            <boxGeometry args={[sz, sz, sz]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.95 * clamp01(k * 8) * clamp01((1 - k) * 8)} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Winter on the ground: the day he was built. Lay it over the village in a shot's stage. */
export const SnowCover: React.FC<{ center?: Vec3; size?: [number, number] }> = ({ center = [8, 0, 0], size = [70, 44] }) => (
  <>
    <Vox kind="wool" tint="#f2f7fc" position={[center[0], 0.07, center[2]]} size={[size[0], 0.1, size[1]]} tile={2} />
    {(
      [
        [-2.2, -2.2, 1.2, 0.3], [3.4, -1.0, 0.9, 0.22], [12.5, -2.6, 1.3, 0.34], [6.2, 0.8, 0.8, 0.2], [14.8, 1.6, 1.1, 0.26], [9.9, 2.9, 0.7, 0.18],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, wd, h], i) => (
      <Vox key={i} kind="wool" tint="#ffffff" position={[x, 0.12 + h / 2, z]} rotationY={i * 0.4} size={[wd, h, wd * 0.8]} />
    ))}
  </>
);

// ----------------------------------------------------------------------------- the things from the gate

const HOT = "#f6c21c";
const ASH = "#4c4742";

/**
 * A BLAZE: a burning head, and twelve rods that turn round the place a body would be. It flies. `position` is its head.
 * `out` 0 → 1 puts it out: it goes grey, the rods stop and drop, and steam comes off it.
 */
export const FireMob: React.FC<{ position: Vec3; rotationY?: number; scale?: number; out?: number; seed?: number; light?: number; angry?: number }> = ({
  position,
  rotationY = 0,
  scale = 1,
  out = 0,
  seed = 1,
  light = 0,
  angry = 0,
}) => {
  const t = useFilmTime() + seed * 1.7;
  const live = 1 - clamp01(out);
  const bob = Math.sin(t * 2.1) * 0.12 * live;
  const body = mix(HOT, ASH, out);
  const rod = mix("#e9a51a", "#3c3835", out);
  const glow = 0.4 * live;
  return (
    <group position={[position[0], position[1] + bob - out * out * 0.6, position[2]]} rotation={[0, rotationY, out * 0.5]} scale={scale}>
      <Block size={[0.52, 0.52, 0.52]} color={body} emissive="#ff8a00" emissiveIntensity={glow} />
      <Block position={[0, 0.2, 0]} size={[0.54, 0.14, 0.54]} color={mix("#c9781a", ASH, out)} emissive="#ff6a00" emissiveIntensity={glow * 0.8} castShadow={false} />
      {[-1, 1].map((sd) => (
        <group key={sd}>
          <Block position={[sd * 0.13, 0.03, 0.262]} size={[0.13, 0.09, 0.02]} color="#2a1200" castShadow={false} />
          <Block position={[sd * 0.13, 0.11 + angry * 0.02, 0.264]} rotation={[0, 0, -sd * (0.25 + angry * 0.4)]} size={[0.17, 0.05, 0.02]} color="#7a3a05" castShadow={false} />
        </group>
      ))}
      {[0, 1, 2].map((ring) => {
        const radius = [0.62, 0.46, 0.34][ring];
        const y = [-0.42, -0.86, -1.28][ring];
        const spin = (ring % 2 ? -1 : 1) * t * (2.2 + ring * 0.7) * live + ring;
        return (
          <group key={ring} position={[0, y - out * (0.3 + ring * 0.25), 0]} rotation={[0, spin, 0]}>
            {[0, 1, 2, 3].map((i) => {
              const a = (i * Math.PI) / 2;
              return (
                <Block
                  key={i}
                  position={[Math.cos(a) * radius * (1 + out * 0.5), Math.sin(t * 3 + i + ring) * 0.06 * live, Math.sin(a) * radius * (1 + out * 0.5)]}
                  rotation={[out * (i % 2 ? 0.9 : -0.7), 0, out * 0.8]}
                  size={[0.13, 0.5, 0.13]}
                  color={rod}
                  emissive="#ff9a00"
                  emissiveIntensity={glow * 0.9}
                />
              );
            })}
          </group>
        );
      })}
      {live > 0.05 ? (
        <>
          <Glow position={[0, -0.5, 0]} size={3.4} color="#ff8a1e" opacity={0.55 * live} />
          <Puffs position={[0, 0.3, 0]} color="#3a2c26" count={5} rise={1.6} spread={0.25} size={0.2} opacity={0.5 * live} seed={seed + 2} />
          {[0, 1, 2, 3].map((i) => {
            const k = (t * 1.4 + i * 0.25) % 1;
            return (
              <mesh key={i} position={[Math.sin(i * 2.4 + t) * 0.35, -1.5 + k * 1.9, Math.cos(i * 1.9) * 0.35]} rotation={[k * 4, i, k * 3]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color={k < 0.5 ? "#fff0a0" : "#ff7a1e"} transparent opacity={(1 - k) * live} toneMapped={false} />
              </mesh>
            );
          })}
        </>
      ) : null}
      {out > 0.02 && out < 1 ? <Puffs position={[0, 0, 0]} color="#f2f6fa" count={9} rise={2.2} spread={0.5} size={0.3} speed={1.1} opacity={0.8 * (1 - out * 0.6)} seed={seed + 9} /> : null}
      {light > 0 ? <pointLight position={[0, -0.4, 0.3]} color="#ff8a2a" intensity={light * live} distance={13} decay={2} /> : null}
    </group>
  );
};

/** Red heat on iron: a red lamp and a glow, right against it. `power` 0–1. */
export const Heat: React.FC<{ position: Vec3; power: number; size?: number; lamp?: boolean }> = ({ position, power, size = 3.2, lamp = true }) =>
  power <= 0.01 ? null : (
    <>
      {lamp ? <pointLight position={position} color="#ff2a10" intensity={34 * power} distance={5.5} decay={2} /> : null}
      <Glow position={position} size={size} color="#ff3a14" opacity={0.6 * power} />
    </>
  );

/**
 * An iron golem that sits down in the road: legs straight out in front, hands on its knees, head down.
 * `sit` 0 stands, 1 sits. `droop` 0–1 lets the head and the back go.
 */
export const SatGolem: React.FC<{ position: Vec3; rotationY?: number; sit?: number; droop?: number; headYaw?: number }> = ({ position, rotationY = 0, sit = 1, droop = 1, headYaw = 0 }) => {
  const k = clamp01(sit);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <IronGolem position={[0, -1.0 * k, 0]} bow={k * (0.2 + droop * 0.45)} headPitch={k * (0.1 + droop * 0.55)} headYaw={headYaw} armR={-1.0 * k} armL={-1.0 * k} />
      {k > 0.05
        ? [-1, 1].map((sd) => <Vox key={sd} kind="stone" tint="#cfc8ba" position={[sd * 0.25, 0.16, 0.12 + 0.5 * k]} size={[0.375, 0.31, 1.0 * k]} />)
        : null}
    </group>
  );
};

/**
 * An iron golem that has stopped: folded forward at the waist, arms hanging, head down. It stays on its feet.
 * `slump` 0 stands, 1 is folded. `hot` 0–1 is how red the iron still is.
 */
export const Slumped: React.FC<{ position: Vec3; rotationY?: number; slump?: number; hot?: number; lamp?: boolean; walk?: number; armR?: number; armL?: number; headPitch?: number; headYaw?: number }> = ({
  position,
  rotationY = 0,
  slump = 1,
  hot = 0,
  lamp = false,
  walk = 0,
  armR,
  armL,
  headPitch = 0,
  headYaw = 0,
}) => {
  const k = ease(clamp01(slump));
  return (
    <>
      <IronGolem
        position={position}
        rotationY={rotationY}
        walk={walk}
        bow={2.2 * k}
        headPitch={lerp(headPitch, 0.7, k)}
        headYaw={headYaw * (1 - k)}
        armR={armR === undefined && k === 0 ? undefined : lerp(armR ?? 0, -0.15, k)}
        armL={armL === undefined && k === 0 ? undefined : lerp(armL ?? 0, -0.15, k)}
      />
      <Heat position={[position[0], position[1] + 1.7, position[2]]} power={hot} lamp={lamp} />
    </>
  );
};

/** An iron golem flat on its back, gone dark. */
export const DownGolem: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={[position[0], position[1] + 0.36, position[2]]} rotation={[0, rotationY, 0]}>
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <IronGolem position={[0, 0, 0]} armR={0.25} armL={-0.2} headPitch={-0.2} />
    </group>
  </group>
);

/**
 * THE GATE: a frame of black stone, four blocks wide and five high, standing across the road. It looks west and east.
 * `lit` 0–1 fills it with purple. `eyes` 0–1 brings something up behind the purple that is bigger than the gate.
 */
export const Gate: React.FC<{ at: Vec3; lit?: number; eyes?: number }> = ({ at, lit = 0, eyes = 0 }) => {
  const t = useFilmTime();
  return (
    <group position={at}>
      <Vox kind="obsidian" position={[0, 0.5, 0]} size={[1, 1, 4]} />
      <Vox kind="obsidian" position={[0, 4.5, 0]} size={[1, 1, 4]} />
      <Vox kind="obsidian" position={[0, 2.5, -1.5]} size={[1, 3, 1]} />
      <Vox kind="obsidian" position={[0, 2.5, 1.5]} size={[1, 3, 1]} />
      {/* It has stood here longer than the town: moss and a vine. */}
      <Block position={[-0.51, 3.6, -1.5]} size={[0.02, 1.1, 0.5]} color="#3f6a35" castShadow={false} />
      <Block position={[-0.51, 4.7, 0.6]} size={[0.02, 0.4, 0.9]} color="#4a7a3c" castShadow={false} />
      <Block position={[-0.51, 0.7, 1.4]} size={[0.02, 0.5, 0.6]} color="#3f6a35" castShadow={false} />
      {lit > 0.01 ? (
        <>
          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[0.16, 3, 2]} />
            <meshBasicMaterial color={mix("#5a1fb8", "#b46aff", 0.35 + 0.25 * Math.sin(t * 5))} transparent opacity={0.92 * clamp01(lit)} toneMapped={false} />
          </mesh>
          {Array.from({ length: 12 }, (_, i) => {
            const k = (t * (0.35 + (i % 4) * 0.08) + i * 0.083) % 1;
            const a = k * Math.PI * 4 + i;
            return (
              <mesh key={i} position={[i % 2 ? 0.1 : -0.1, 2.5 + Math.sin(a) * 1.25 * (1 - k * 0.5), Math.cos(a) * 0.85 * (1 - k * 0.5)]}>
                <boxGeometry args={[0.03, 0.2, 0.2]} />
                <meshBasicMaterial color={i % 3 ? "#d9a8ff" : "#ffffff"} transparent opacity={0.85 * clamp01(lit)} toneMapped={false} />
              </mesh>
            );
          })}
          <Glow position={[-0.6, 2.5, 0]} size={8 + 6 * lit} color="#9a48ff" opacity={0.55 * clamp01(lit)} />
          <Glow position={[0.6, 2.5, 0]} size={8 + 6 * lit} color="#9a48ff" opacity={0.4 * clamp01(lit)} />
          <pointLight position={[-1.6, 2.5, 0]} color="#a35cff" intensity={70 * lit} distance={24} decay={2} />
        </>
      ) : null}
      {eyes > 0.01
        ? [-1, 1].map((sd) => (
            <group key={sd} position={[-0.2, 2.9 + 0.2 * eyes, sd * 0.52]}>
              <mesh>
                <boxGeometry args={[0.06, 0.42 * eyes + 0.1, 0.5 * eyes + 0.1]} />
                <meshBasicMaterial color="#ffdc6a" transparent opacity={clamp01(eyes * 1.5)} toneMapped={false} />
              </mesh>
              <mesh position={[-0.04, 0, sd * -0.06]}>
                <boxGeometry args={[0.04, 0.26 * eyes, 0.14 * eyes]} />
                <meshBasicMaterial color="#2a0a00" transparent opacity={clamp01(eyes * 1.5)} />
              </mesh>
              <Glow position={[-0.3, 0, 0]} size={2.6 * eyes} color="#ffb03a" opacity={0.7 * eyes} />
            </group>
          ))
        : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- things

/**
 * The umbrella. `position` is the bottom of its handle; it stands straight up unless `rotation` tips it.
 * `open` 0 is furled, 1 is open: a blue roof 1.5 m square. `burn` 0–1 sets it alight and eats it.
 */
export const Umbrella: React.FC<{ position: Vec3; rotation?: Vec3; open?: number; burn?: number; scale?: number; /** false: it has burned out, and only smokes. */ flame?: boolean }> = ({
  position,
  rotation,
  open = 1,
  burn = 0,
  scale = 1,
  flame = true,
}) => {
  const o = clamp01(open);
  const wide = lerp(0.1, 1, o) * (1 - 0.3 * burn);
  const cloth = mix("#2f7fe8", "#1a1512", burn * 0.9);
  const rim = mix("#ffffff", "#2a221c", burn * 0.9);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Block position={[0, 0.62, 0]} size={[0.05, 1.24, 0.05]} color="#5c3f24" />
      <Block position={[0.06, 0.03, 0]} size={[0.16, 0.05, 0.05]} color="#5c3f24" />
      <group position={[0, 1.16 - (1 - o) * 0.42, 0]} scale={[wide, lerp(7, 1, o), wide]}>
        <Block position={[0, -0.03, 0]} size={[1.56, 0.03, 1.56]} color={rim} />
        <Block position={[0, 0.0, 0]} size={[1.5, 0.05, 1.5]} color={cloth} />
        <Block position={[0, 0.06, 0]} size={[1.08, 0.07, 1.08]} color={mix(cloth, "#ffffff", 0.12 * (1 - burn))} />
        <Block position={[0, 0.13, 0]} size={[0.6, 0.07, 0.6]} color={cloth} />
      </group>
      <Block position={[0, 1.3, 0]} size={[0.07, 0.14, 0.07]} color={rim} />
      {burn > 0.04 && !flame ? <Puffs position={[0, 1.25, 0]} color="#5a524c" count={5} rise={1.5} spread={0.3} size={0.2} opacity={0.5} seed={4} /> : null}
      {burn > 0.04 && flame ? (
        <>
          <Blaze position={[0, 1.2, 0]} size={0.55 * (0.4 + burn * 0.6)} height={0.9 + burn * 0.5} count={10} seed={7} />
          <Glow position={[0, 1.5, 0]} size={2.6} color="#ff8a2a" opacity={0.5 * burn} />
        </>
      ) : null}
    </group>
  );
};

/** A cow. Feet on `position`, facing +Z. */
export const Cow: React.FC<{ position: Vec3; rotationY?: number; rotation?: Vec3; scale?: number; dangle?: number }> = ({ position, rotationY = 0, rotation, scale = 1, dangle = 0 }) => {
  const t = useFilmTime();
  return (
    <group position={position} rotation={rotation ?? [0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.98, 0]} size={[0.72, 0.72, 1.25]} color="#4a3324" />
      <Block position={[0.365, 1.05, 0.2]} size={[0.02, 0.4, 0.5]} color="#f1ece2" castShadow={false} />
      <Block position={[-0.365, 0.95, -0.25]} size={[0.02, 0.45, 0.45]} color="#f1ece2" castShadow={false} />
      <Block position={[0, 1.345, -0.1]} size={[0.4, 0.02, 0.5]} color="#f1ece2" castShadow={false} />
      <Block position={[0, 0.58, -0.25]} size={[0.3, 0.1, 0.3]} color="#e8a6a6" />
      <group position={[0, 1.2, 0.72]}>
        <Block size={[0.5, 0.5, 0.42]} color="#4a3324" />
        <Block position={[0, -0.1, 0.215]} size={[0.36, 0.22, 0.02]} color="#f1ece2" castShadow={false} />
        <Block position={[0, -0.12, 0.23]} size={[0.2, 0.1, 0.02]} color="#d99a9a" castShadow={false} />
        {[-1, 1].map((sd) => (
          <group key={sd}>
            <Block position={[sd * 0.14, 0.08, 0.215]} size={[0.09, 0.09, 0.02]} color="#111111" castShadow={false} />
            <Block position={[sd * 0.3, 0.2, 0]} size={[0.1, 0.16, 0.08]} color="#d8d2c4" />
          </group>
        ))}
      </group>
      {(
        [
          [-0.24, 0.42], [0.24, 0.42], [-0.24, -0.42], [0.24, -0.42],
        ] as Array<[number, number]>
      ).map(([x, z], i) => (
        <group key={i} position={[x, 0.62, z]} rotation={[Math.sin(t * 5 + i * 1.6) * 0.35 * dangle, 0, 0]}>
          <Block position={[0, -0.31, 0]} size={[0.22, 0.62, 0.22]} color={i % 2 ? "#4a3324" : "#3d2a1d"} />
        </group>
      ))}
    </group>
  );
};

/** A hay cart with two shafts. Middle of the box on `position`; the shafts point +Z, at whoever pulls it. `roll` is metres travelled. */
export const Cart: React.FC<{ position: Vec3; rotationY?: number; roll?: number }> = ({ position, rotationY = 0, roll = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.72, 0]} size={[1.5, 0.5, 2.1]} />
    <Vox kind="hay" position={[0, 1.22, 0]} size={[1.3, 0.56, 1.8]} />
    <Vox kind="hay" position={[0.1, 1.7, -0.2]} rotationY={0.3} size={[0.8, 0.5, 0.9]} />
    {[-1, 1].map((sd) => (
      <group key={sd}>
        <group position={[sd * 0.84, 0.42, -0.4]} rotation={[roll / 0.42, 0, 0]}>
          <Block size={[0.12, 0.84, 0.84]} color="#3d2a1a" />
          <Block size={[0.14, 0.2, 0.2]} color="#8d877a" />
        </group>
        <Block position={[sd * 0.62, 0.86, 1.9]} size={[0.1, 0.1, 1.9]} color="#5c3f24" />
      </group>
    ))}
  </group>
);

/** A block of iron, the way the town hands them out. */
export const IronBlock: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="stone" tint="#e4e2dc" size={[0.8, 0.8, 0.8]} />
    {[-1, 1].map((sd) => (
      <Block key={sd} position={[0, sd * 0.3, 0.401]} size={[0.7, 0.05, 0.01]} color="#bdbab2" castShadow={false} />
    ))}
  </group>
);
/** A block of snow. */
export const SnowBlock: React.FC<{ position: Vec3; scale?: number; size?: number }> = ({ position, scale = 1, size = 0.8 }) => (
  <group position={position} scale={scale}>
    <Vox kind="wool" tint="#f6fbff" size={[size, size * 0.9, size]} />
  </group>
);

/** The contest boulder: a block of cobble a kid cannot see over. `position` is the ground under it. */
export const Boulder: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number }> = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Vox kind="cobble" position={[0, 0.5, 0]} size={[1.0, 1.0, 1.0]} />
    <Vox kind="mossy" position={[0.12, 0.92, -0.1]} size={[0.6, 0.3, 0.6]} />
  </group>
);

/** Flags on a line between two points. */
export const Bunting: React.FC<{ from: Vec3; to: Vec3; count?: number; sag?: number }> = ({ from, to, count = 9, sag = 0.6 }) => {
  const t = useFilmTime();
  const colors = ["#e8c44a", "#4fd6d0", "#e85a9a", "#5fa03c", "#f07a2a", "#f2efe6"];
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const k = (i + 0.5) / count;
        const y = lerp(from[1], to[1], k) - sag * 4 * k * (1 - k);
        return (
          <group key={i} position={[lerp(from[0], to[0], k), y, lerp(from[2], to[2], k)]} rotation={[Math.sin(t * 2 + i) * 0.15, Math.atan2(to[0] - from[0], to[2] - from[2]) + Math.PI / 2, 0]}>
            <Block position={[0, -0.17, 0]} size={[0.3, 0.34, 0.03]} color={colors[i % colors.length]} castShadow={false} />
          </group>
        );
      })}
    </>
  );
};

/** One of his arms, off him: a stick with two twigs, lying on the ground or flying. */
export const Stick: React.FC<{ position: Vec3; rotation?: Vec3 }> = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <Block size={[ARM, 0.06, 0.06]} color={STICK} />
    <Block position={[ARM / 2 - 0.12, 0.08, 0]} rotation={[0, 0, 0.7]} size={[0.2, 0.045, 0.045]} color={STICK} />
    <Block position={[ARM / 2 - 0.2, -0.07, 0.02]} rotation={[0, 0, -0.6]} size={[0.16, 0.04, 0.04]} color={STICK} />
  </group>
);

/** The crate the iron came in. Open at the top, and empty. `position` is the ground under it. */
export const Crate: React.FC<{ position: Vec3; rotationY?: number; rotation?: Vec3 }> = ({ position, rotationY = 0, rotation }) => (
  <group position={position} rotation={rotation ?? [0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.04, 0]} size={[1.1, 0.08, 1.1]} />
    <Block position={[0, 0.09, 0]} size={[0.96, 0.02, 0.96]} color="#2a1c10" castShadow={false} />
    {[-1, 1].map((sd) => (
      <group key={sd}>
        <Vox kind="planks" position={[sd * 0.51, 0.45, 0]} size={[0.08, 0.9, 1.1]} />
        <Vox kind="planks" position={[0, 0.45, sd * 0.51]} size={[1.1, 0.9, 0.08]} />
        <Block position={[sd * 0.56, 0.45, 0]} size={[0.02, 0.9, 0.16]} color="#5c3f24" castShadow={false} />
      </group>
    ))}
  </group>
);

/** A loaf, for the baker's sleeves. */
export const Loaf: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block size={[0.5, 0.16, 0.2]} color="#c98a3c" />
    {[-0.14, 0, 0.14].map((x) => (
      <Block key={x} position={[x, 0.085, 0]} size={[0.04, 0.02, 0.16]} color="#8d5a22" castShadow={false} />
    ))}
  </group>
);

/** One snowflake. */
export const Flake: React.FC<{ position: Vec3; size?: number; spin?: number }> = ({ position, size = 0.05, spin = 0 }) => (
  <mesh position={position} rotation={[spin, spin * 1.7, spin * 0.6]}>
    <boxGeometry args={[size, size, size]} />
    <meshBasicMaterial color="#ffffff" />
  </mesh>
);

/** Snow settling on top of a thing 0.47 m wide (his pumpkin): `amount` 0–1. `position` is the top of the thing. */
export const SnowCap: React.FC<{ position: Vec3; amount: number }> = ({ position, amount }) =>
  amount <= 0.02 ? null : (
    <group position={position}>
      <Block position={[0, 0.03 * amount, 0]} size={[0.5, 0.06 * amount, 0.5]} color="#ffffff" castShadow={false} />
      <Block position={[0.05, 0.07 * amount, -0.03]} size={[0.3 * amount, 0.05 * amount, 0.3 * amount]} color="#f2f8ff" castShadow={false} />
    </group>
  );

/** A whole small house, for a golem to carry over its head. `position` is the ground under its middle. */
export const SmallHouse: React.FC<{ position: Vec3; rotationY?: number; tilt?: number }> = ({ position, rotationY = 0, tilt = 0 }) => (
  <group position={position} rotation={[0, rotationY, tilt]}>
    <Vox kind="dirt" position={[0, 0.15, 0]} size={[4.4, 0.3, 4.4]} />
    <Block position={[0, 0.31, 0]} size={[4.4, 0.03, 4.4]} color="#5f9f3c" castShadow={false} />
    <group position={[0, 0.3, 2]}>
      <Hut at={[0, 0, 0]} w={3.6} d={3.6} h={2.6} tint="#d8c49a" roof="#c8362e" door={-0.6} windows={[0.9]} />
    </group>
  </group>
);

/** Where a kid's hand is when the arm is straight up (the `lift` clip, or `armsUp`): put the umbrella's handle there. */
export const handUp = (p: Vec3, rotY: number, scale = KID, side = 1): Vec3 => beside(p, rotY, side * 0.3 * scale, 1.86 * scale, 0.1 * scale);

/** People of the town, standing where they are told: [x, z, facing, robe, kid?]. All look at `at`, if given. */
export const Folk: React.FC<{ spots: Array<[number, number, number, string, boolean?]>; at?: Vec3; y?: number } & Partial<VillagerProps>> = ({ spots, at, y = 0, ...rest }) => (
  <>
    {spots.map(([x, z, rot, robe, kid], i) => (
      <Villager key={i} position={[x, y, z]} rotationY={rot} robe={robe} kid={kid} scale={kid ? 0.72 : 1} lookAt={at} phase={i * 1.3 + 0.2} {...rest} />
    ))}
  </>
);

/**
 * Half a house: a floor, one wall of posts with a beam on it, and a roof. Nothing holds the east end of the roof up.
 * `position` is the middle of the floor. The roof's underside is 3.9 m up: an iron golem's hands, arms straight up.
 */
export const HalfHouse: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 0.06, 0]} size={[3.4, 0.12, 3.0]} />
    {[-1.2, 1.2].map((z) => (
      <Vox key={z} kind="log" position={[-1.45, 1.95, z]} size={[0.34, 3.9, 0.34]} />
    ))}
    <Vox kind="planks" position={[-1.45, 0.9, 0]} size={[0.2, 1.6, 2.1]} />
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 4.06, 0]} size={[3.8, 0.32, 3.4]} />
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 4.38, 0]} size={[2.4, 0.32, 3.4]} />
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 4.7, 0]} size={[1.0, 0.32, 3.4]} />
    <Vox kind="planks" position={[0.3, 0.3, 2.3]} size={[0.9, 0.36, 0.5]} />
    <Vox kind="planks" position={[0.5, 0.62, 2.35]} rotationY={0.3} size={[0.8, 0.28, 0.45]} />
  </group>
);

/** A window in the west wall of his room, with the night in it. `position` is the middle of the glass; it looks east, into the room. */
export const WallWindow: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position} rotation={[0, Math.PI / 2, 0]}>
    <Block size={[1.5, 1.5, 0.08]} color="#5c3f24" />
    <Block position={[0, 0, 0.03]} size={[1.2, 1.2, 0.06]} color="#22346e" emissive="#2a4496" emissiveIntensity={0.7} castShadow={false} />
    <Block position={[0, 0, 0.07]} size={[1.2, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
    <Block position={[0, 0, 0.07]} size={[0.07, 1.2, 0.03]} color="#5c3f24" castShadow={false} />
    <Block position={[0, -0.72, 0.12]} size={[1.6, 0.08, 0.26]} color="#6b4a2c" />
  </group>
);

/** Where a kid's right hand is with the arm hanging (`k` 0) and with it reaching up (`k` 1, the `reachUp` clip). */
export const handAt = (p: Vec3, rotY: number, k = 0, scale = KID, side = 1): Vec3 => {
  const q = clamp01(k);
  return beside(p, rotY, side * 0.31 * scale, lerp(0.66, 1.74, q) * scale, lerp(0.04, 0.3, q) * scale);
};

/** What is left of a flier that has gone out: a grey head on the ground, its rods lying round it, a thread of steam. */
export const Cinder: React.FC<{ position: Vec3; rotationY?: number; seed?: number; steam?: number }> = ({ position, rotationY = 0, seed = 1, steam = 1 }) => {
  const rand = mulberry32(seed * 97 + 3);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block position={[0, 0.24, 0]} rotation={[0.3, 0.4, 0.2]} size={[0.52, 0.52, 0.52]} color={ASH} />
      <Block position={[0.03, 0.3, 0.26]} rotation={[0.3, 0.4, 0.2]} size={[0.3, 0.08, 0.03]} color="#2a2420" castShadow={false} />
      {Array.from({ length: 7 }, (_, i) => (
        <Block key={i} position={[(rand() - 0.5) * 2.2, 0.07, (rand() - 0.5) * 2.2]} rotation={[Math.PI / 2, 0, rand() * 3]} size={[0.13, 0.5, 0.13]} color="#3c3835" />
      ))}
      {steam > 0.02 ? <Puffs position={[0, 0.4, 0]} color="#e6ecf2" count={5} rise={2.4} spread={0.3} size={0.24} speed={0.5} opacity={0.5 * steam} seed={seed + 4} /> : null}
    </group>
  );
};

/**
 * The umbrella in a kid's right hand. `up` 0: shut, tucked under the arm, pointing where he faces.
 * `up` 1: held up over his head, leaning by `lean` (radians, towards -X of the world).
 */
export const HeldUmbrella: React.FC<{ p: Vec3; rotY: number; up?: number; open?: number; burn?: number; flame?: boolean; lean?: number; side?: number; /** Which way it points when carried, if not where he faces. */ aim?: number }> = ({ p, rotY, up = 0, open = 0, burn = 0, flame = true, lean = 0.3, side = 1, aim }) => {
  const u = clamp01(up);
  const a = aim ?? rotY;
  // Carried shut it stands by his leg like a stick: level, it crossed the picture as a blue bar.
  const carry = new THREE.Vector3(-Math.sin(a) * 0.16, 0.98, -Math.cos(a) * 0.16);
  const high = new THREE.Vector3(-Math.sin(lean), Math.cos(lean), 0);
  const d = carry.lerp(high, u).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  const h = handAt(p, rotY, u, KID, side);
  const back = 0.6 * (1 - u);
  return (
    <group position={[h[0] - d.x * back, h[1] - d.y * back, h[2] - d.z * back]} quaternion={q}>
      <Umbrella position={[0, 0, 0]} open={open} burn={burn} flame={flame} />
    </group>
  );
};

// ----------------------------------------------------------------------------- the piglin

const PIG = { skin: "#e9a07a", snout: "#f4bb98", dark: "#6e3f2c", cloth: "#5c3a21", cloth2: "#44291a", gold: "#f6cf3a" };

/**
 * A PIGLIN: what comes out of the gate every year. Pink, in brown leather, with tusks, flap ears and a gold sword.
 * It stands on `position` and faces +Z at rotationY 0. `raise` lifts the sword arm (0 hangs, 1 straight up);
 * `scared` throws both arms up and opens the mouth; `rotation` tumbles the whole of it about its middle, for one
 * that has been thrown.
 */
export const Piglin: React.FC<{
  position: Vec3; rotationY?: number; rotation?: Vec3; scale?: number; walk?: number; raise?: number; sword?: boolean; scared?: number; headPitch?: number; headYaw?: number; seed?: number;
}> = ({ position, rotationY = 0, rotation = [0, 0, 0], scale = 1, walk = 0, raise = 0, sword = false, scared = 0, headPitch = 0, headYaw = 0, seed = 0 }) => {
  const t = useFilmTime();
  const u = 1 / 16;
  const gait = walk * 4.6;
  const swing = Math.sin(gait) * 0.7;
  const bob = Math.abs(Math.sin(gait)) * 0.04;
  const flail = scared * Math.sin(t * 22 + seed * 2) * 0.35;
  const armR = -2.9 * Math.max(raise, scared) + flail + (1 - Math.max(raise, scared)) * -swing * 0.8;
  const armL = -2.9 * scared - flail + (1 - scared) * swing * 0.8;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, 1, 0]} rotation={rotation}>
        <group position={[0, -1, 0]}>
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 2 * u, 12 * u, 0]} rotation={[s * swing + scared * s * 0.5 * Math.sin(t * 19 + seed), 0, 0]}>
              <Block position={[0, -5 * u, 0]} size={[3.9 * u, 10 * u, 4 * u]} color={PIG.cloth2} />
              <Block position={[0, -11 * u, 0]} size={[3.9 * u, 2 * u, 4 * u]} color={PIG.skin} />
            </group>
          ))}
          <group position={[0, 12 * u + bob, 0]}>
            <Block position={[0, 6 * u, 0]} size={[8 * u, 12 * u, 4 * u]} color={PIG.cloth} />
            <Block position={[0, 1.2 * u, 0]} size={[8.2 * u, 1.6 * u, 4.2 * u]} color={PIG.cloth2} castShadow={false} />
            <Block position={[0, 1.2 * u, 2.1 * u]} size={[2 * u, 2 * u, 0.3 * u]} color={PIG.gold} castShadow={false} />
            <Block position={[0, 9 * u, 2.05 * u]} size={[4 * u, 3 * u, 0.1 * u]} color={PIG.skin} castShadow={false} />
            {[-1, 1].map((s) => (
              <group key={s} position={[s * 6 * u, 10.5 * u, 0]} rotation={[s === 1 ? armR : armL, 0, s * 0.08]}>
                <Block position={[0, -1.5 * u, 0]} size={[4 * u, 4 * u, 4.05 * u]} color={PIG.cloth} />
                <Block position={[0, -7.5 * u, 0]} size={[3.9 * u, 8 * u, 3.9 * u]} color={PIG.skin} />
                {s === 1 && sword ? (
                  <group position={[0, -11 * u, 1 * u]} rotation={[-1.45, 0, 0]}>
                    <Block position={[0, -1 * u, 0]} size={[1.2 * u, 4 * u, 1.2 * u]} color="#5a3a1c" />
                    <Block position={[0, 1.4 * u, 0]} size={[5 * u, 1.2 * u, 1.4 * u]} color="#c99a1e" />
                    <Block position={[0, 8.5 * u, 0]} size={[2.4 * u, 13 * u, 0.9 * u]} color={PIG.gold} emissive={PIG.gold} emissiveIntensity={0.25} metalness={0.3} roughness={0.4} />
                    <Block position={[0, 15.6 * u, 0]} size={[1.3 * u, 1.4 * u, 0.9 * u]} color="#fff2a0" />
                  </group>
                ) : null}
              </group>
            ))}
            <group position={[0, 12 * u, 0]} rotation={[headPitch - 0.25 * scared, headYaw, 0]}>
              <Block position={[0, 4 * u, 0]} size={[10 * u, 8 * u, 8 * u]} color={PIG.skin} />
              <Block position={[0, 7.4 * u, 0]} size={[10.1 * u, 1.3 * u, 8.1 * u]} color={mix(PIG.skin, "#000000", 0.14)} castShadow={false} />
              {/* The snout, its two holes, and a tusk either side of it. */}
              <Block position={[0, 2.4 * u, 4.4 * u]} size={[4.2 * u, 3.6 * u, 1.2 * u]} color={PIG.snout} />
              {[-1, 1].map((s) => (
                <group key={s}>
                  <Block position={[s * 1.05 * u, 2.9 * u, 5.02 * u]} size={[1 * u, 1.3 * u, 0.1 * u]} color={PIG.dark} castShadow={false} />
                  <Block position={[s * 2.7 * u, 1.5 * u, 4.4 * u]} size={[1 * u, 2.2 * u, 1 * u]} color="#fff6e0" />
                  <Block position={[s * 3.1 * u, 5.4 * u, 4.02 * u]} size={[2.2 * u, 1.5 * u, 0.1 * u]} color="#ffffff" castShadow={false} />
                  <Block position={[s * (2.6 + 0.5 * scared) * u, 5.4 * u, 4.06 * u]} size={[1.1 * u, 1.5 * u, 0.1 * u]} color="#1a1210" castShadow={false} />
                  <Block position={[s * 3.1 * u, 6.7 * u - scared * 0.5 * u, 4.07 * u]} rotation={[0, 0, s * (0.35 - 0.7 * scared)]} size={[2.8 * u, 0.8 * u, 0.1 * u]} color={PIG.dark} castShadow={false} />
                  {/* Flap ears, one with a gold ring in it. */}
                  <group position={[s * 5 * u, 6 * u, 0]} rotation={[0, 0, s * (0.5 + 0.25 * Math.sin(gait + s) + 0.5 * scared)]}>
                    <Block position={[s * 0.6 * u, -2.4 * u, 0]} size={[1.1 * u, 5 * u, 4 * u]} color={mix(PIG.skin, "#000000", 0.1)} />
                    {s === 1 ? <Block position={[s * 0.7 * u, -4.6 * u, 1 * u]} size={[1.4 * u, 1.2 * u, 1.2 * u]} color={PIG.gold} /> : null}
                  </group>
                </group>
              ))}
              {scared > 0.3 ? <Block position={[0, 0.7 * u, 4.02 * u]} size={[3 * u, 1.3 * u, 0.1 * u]} color="#2a1210" castShadow={false} /> : null}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

/** A small steady lamp for a face at night, with nothing to see where it hangs. */
export const FaceLight: React.FC<{ position: Vec3; power?: number; reach?: number; color?: string }> = ({ position, power = 4, reach = 5, color = "#ffc9a0" }) => (
  <pointLight position={position} color={color} intensity={power} distance={reach} decay={2} />
);
