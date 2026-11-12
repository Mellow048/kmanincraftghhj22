import type React from "react";
import { Block, Glow, MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export { stride } from "../../engine";

/**
 * This film's own cast, places and powers.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene imports only from "./kit".
 *
 * What belongs to this story alone, and is built here:
 *   - HERO and BROTHER  twins: one model, a RED shirt and a BLACK shirt. `kid` is both of them at eight.
 *   - The townsfolk     villagers, told apart by their robes: Mom, Dad, Baker, Old, and the friends Bo, Mira, Tip.
 *   - The animals       Pig and Sheep. The brother hurts them at eight; a pig is the first thing the hero heals.
 *   - The powers        Daisy and Lawn (life), Flame, Burst and Orbs (everything the brother took), Drain (the taking).
 */

export {
  ADULT, CHILD, DEG, EAST, KID, NORTH, ROBE, SOUTH, WEST, ahead, beside, ease, jolt, pop, ramp,
  villagerChest, villagerFace,
  BedBox, Bits, Blaze, FireLight, Smoke, SoundRings, SubscribeSign, Villager, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("9.daisy", "daisy")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the camera.
 * world.tsx builds the town from these, and scenes stand people on them: change a number here, never in two places.
 */
export const PLACE = {
  square: [0, 0, 2] as Vec3,
  /** The bell that hands out the powers. You stand under it on your eighteenth birthday. */
  bell: [0, 0, -2.5] as Vec3,
  /** Where you stand to get your power: just south of the bell, facing the town. */
  under: [0, 0, -0.9] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /** The pond the sheep go into. Its water is at y = 0.02; it is 0.9 deep. */
  pond: [-17, 0, 4] as Vec3,
  /** The pig pen, and the mud in it. He lands here. */
  pen: [-10, 0, 10] as Vec3,
  /** The baker's house: middle of its front wall. Its roof is the one he fixes. */
  baker: [-10, 0, -5] as Vec3,
  /** Home: middle of its front wall. The door is 1.3 m west of that. */
  home: [10, 0, -5] as Vec3,
  /** The gate at the top of the town, where the road north begins. He waits here. */
  gate: [5, 0, -9.5] as Vec3,
  /** His room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
export const BED = room(-1.0, 0, -1.2);
export const IN_BED = room(-1.0, 0.2, -1.28);
/** The door of his house, outside. */
export const DOOR: Vec3 = [PLACE.home[0] - 1.3, 0, PLACE.home[2] + 1.0];
/** Where the blast leaves him: on his back in the road in front of his house. */
export const DOWN: Vec3 = [8.4, 0, 1.4];
/** Where his brother stands, between him and what is left of the house. */
export const BRO: Vec3 = [8.4, 0, -1.3];
/** Where his mother stands: far down the road to the east. */
export const MOM_FAR: Vec3 = [25, 0, 2.2];
/** Where he lands: in the mud of the pig pen. */
export const MUD: Vec3 = [PLACE.pen[0] + 0.4, 0, PLACE.pen[2] + 0.2];
/** The pig beside him. */
export const PIGGY: Vec3 = [MUD[0] - 1.25, 0, MUD[2] - 0.2];

/**
 * Which town a shot is in. A shot's `zone` is one of these:
 *   day   the town as it was;  fire  burning, his house still standing;  ruin  burning, his house gone.
 */
export const ZONE = { day: "village+calm+home", fire: "village+fire+home", ruin: "village+fire+ruin", room: "room" };
export const DAY = "overworld-day";
export const NIGHT = "overworld-night";
export const CHAOS = "overworld-storm";

/** Lying on the ground: the avatar's `lie` pose floats a bed's height up, so sink it by this. */
export const flat = (p: Vec3): Vec3 => [p[0], p[1] - 0.33, p[2]];

// ----------------------------------------------------------------------------- the twins

type A = Partial<MinecraftAvatarProps>;
const SKIN = "#dba47c";
const HAIR = "#3a2415";
const KID8 = 0.72;

/** The teller: RED shirt. `kid` is him at eight. Faces: smile grin laugh frown uneasy brave fear wow ouch calm angry sad scared worried dizzy blank. */
export const Hero: React.FC<A & { kid?: boolean }> = ({ kid = false, ...p }) => (
  <MinecraftAvatar scale={kid ? KID8 : 1} outfit="tee" skin={SKIN} hair={HAIR} colors={{ torso: "#d8262e", arms: "#d8262e", legs: "#3b4a6b" }} blink {...p} />
);

/** His twin: the same face in a BLACK shirt. `kid` is him at eight. `flame` puts fire in his right hand (give it the shot's `t`). */
export const Brother: React.FC<A & { kid?: boolean; flame?: number }> = ({ kid = false, flame, ...p }) => (
  <MinecraftAvatar scale={kid ? KID8 : 1} outfit="tee" skin={SKIN} hair={HAIR} colors={{ torso: "#17171c", arms: "#17171c", legs: "#2a2a33" }} blink phase={1.7} {...p}>
    {flame === undefined ? null : <Flame t={flame} />}
  </MinecraftAvatar>
);
/** A grown player's face and chest (the pack's own default to a child's height). */
export const faceOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.56, p[2]];
export const chestOf = (p: Vec3): Vec3 => [p[0], p[1] + 1.12, p[2]];
export const kidFace = (p: Vec3): Vec3 => [p[0], p[1] + 1.53 * KID8, p[2]];
export const kidChest = (p: Vec3): Vec3 => [p[0], p[1] + 1.12 * KID8, p[2]];

// ----------------------------------------------------------------------------- the town

type V = VillagerProps;
/** Mother: the white robe. Her power: she can find any lost sock. */
export const Mom: React.FC<V> = (p) => <Villager robe={ROBE.white} phase={0.3} {...p} />;
/** Father: the brown robe. */
export const Dad: React.FC<V> = (p) => <Villager robe={ROBE.brown} phase={0.9} {...p} />;
/** The baker: straw hat. */
export const Baker: React.FC<V> = (p) => <Villager robe={ROBE.farmer} hat="straw" phase={1.4} {...p} />;
/** The oldest man: purple. His power: he can breathe underwater, for two seconds. */
export const Old: React.FC<V> = (p) => <Villager robe={ROBE.elder} phase={2.2} {...p} />;
/** Bo: green. He jumps one block higher than anyone. `drained` is him with it taken. */
export const Bo: React.FC<V & { drained?: boolean }> = ({ drained, ...p }) => <Villager robe={drained ? "#7b8478" : ROBE.friend} phase={2.9} {...p} />;
/** Mira: blue. She makes bread warm again. */
export const Mira: React.FC<V> = (p) => <Villager robe={ROBE.blue} phase={3.5} {...p} />;
/** Tip: yellow. He always knows which way is north. */
export const Tip: React.FC<V> = (p) => <Villager robe="#c9a227" phase={4.1} {...p} />;
/** Anyone else. `n` picks a robe. */
export const Folk: React.FC<V & { n: number }> = ({ n, ...p }) => (
  <Villager robe={[ROBE.smith, ROBE.farmer, "#7a5a8a", "#5a7a6a", ROBE.brown, "#8a7a5a"][n % 6]} phase={n * 1.3} {...p} />
);
export const HEAD = 29 * (1.8 / 32) * ADULT;

// ----------------------------------------------------------------------------- animals

/** A pig. Feet on `position`, facing +Z. `burnt` is one black ear; `shake` 0–1 makes it tremble. */
export const Pig: React.FC<{ position: Vec3; rotationY?: number; scale?: number; burnt?: boolean; t?: number; shake?: number }> = ({ position, rotationY = 0, scale = 1, burnt = false, t = 0, shake = 0 }) => (
  <group position={[position[0] + Math.sin(t * 40) * 0.015 * shake, position[1], position[2]]} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.48, 0]} size={[0.56, 0.48, 0.95]} color="#f0a5a8" />
    <Block position={[0, 0.58, 0.62]} size={[0.48, 0.46, 0.42]} color="#f3adb0" />
    <Block position={[0, 0.5, 0.85]} size={[0.24, 0.16, 0.08]} color="#d98589" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.13, 0.66, 0.835]} size={[0.07, 0.07, 0.02]} color="#1b1b22" castShadow={false} />
        <Block position={[s * 0.2, 0.84, 0.52]} size={[0.14, 0.12, 0.1]} color={burnt && s > 0 ? "#2a1a16" : "#e8959a"} />
        <Block position={[s * 0.18, 0.12, 0.32]} size={[0.16, 0.24, 0.16]} color="#e8959a" />
        <Block position={[s * 0.18, 0.12, -0.32]} size={[0.16, 0.24, 0.16]} color="#e8959a" />
      </group>
    ))}
  </group>
);

/** A sheep. Feet on `position`, facing +Z. */
export const Sheep: React.FC<{ position: Vec3; rotationY?: number; scale?: number; tilt?: number }> = ({ position, rotationY = 0, scale = 1, tilt = 0 }) => (
  <group position={position} rotation={[tilt, rotationY, 0]} scale={scale}>
    <Vox kind="wool" position={[0, 0.62, 0]} size={[0.7, 0.62, 1.0]} />
    <Block position={[0, 0.78, 0.62]} size={[0.38, 0.38, 0.36]} color="#d8c7b0" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.1, 0.84, 0.805]} size={[0.07, 0.07, 0.02]} color="#1b1b22" castShadow={false} />
        <Block position={[s * 0.2, 0.16, 0.3]} size={[0.14, 0.32, 0.14]} color="#d8c7b0" />
        <Block position={[s * 0.2, 0.16, -0.3]} size={[0.14, 0.32, 0.14]} color="#d8c7b0" />
      </group>
    ))}
  </group>
);

// ----------------------------------------------------------------------------- his power: life

/** One daisy. `position` is where it comes out of the ground. `grow` 0–1. This is all the bell seemed to give him. */
export const Daisy: React.FC<{ position: Vec3; grow?: number; scale?: number }> = ({ position, grow = 1, scale = 1 }) =>
  grow <= 0 ? null : (
    <group position={position} scale={scale * (0.25 + 0.75 * grow)}>
      <Block position={[0, 0.13 * grow, 0]} size={[0.03, 0.26 * grow, 0.03]} color="#3f8a35" castShadow={false} />
      <Block position={[0.05, 0.1 * grow, 0]} size={[0.09, 0.02, 0.05]} color="#4a9a3d" castShadow={false} />
      <group position={[0, 0.27 * grow, 0]} rotation={[0.5, 0, 0]}>
        <Block size={[0.2, 0.03, 0.07]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} castShadow={false} />
        <Block size={[0.07, 0.03, 0.2]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.25} castShadow={false} />
        <Block position={[0, 0.012, 0]} size={[0.075, 0.035, 0.075]} color="#f2c52e" emissive="#f2c52e" emissiveIntensity={0.4} castShadow={false} />
      </group>
    </group>
  );

/** Grass coming up where there was mud, plank or ash. `position` is its middle, on the ground. `grow` 0–1 spreads it. */
export const Lawn: React.FC<{ position: Vec3; size?: number; grow?: number; seed?: number; glow?: boolean }> = ({ position, size = 0.5, grow = 1, seed = 1, glow = false }) => {
  if (grow <= 0) return null;
  const s = size * grow;
  return (
    <group position={position}>
      <Vox kind="grass" position={[0, 0.02, 0]} size={[s, 0.05, s]} castShadow={false} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = i * 2.4 + seed;
        return <Block key={i} position={[Math.sin(a) * s * 0.3, 0.1, Math.cos(a * 1.3) * s * 0.3]} size={[0.04, 0.14 * grow, 0.04]} color={i % 2 ? "#5fb24a" : "#4a9a3d"} castShadow={false} />;
      })}
      {glow ? <Glow position={[0, 0.25, 0]} size={s * 2.2} color="#9dff8a" opacity={0.32 * grow} /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- his brother's powers: all taken

const FIRE = ["#fff1a8", "#ffc23a", "#ff8a1e", "#e8431a"];

/** Fire in a hand. Parent it to the hand (the Brother does), or give it a `position`. `t` is the shot's time. */
export const Flame: React.FC<{ t: number; position?: Vec3; size?: number }> = ({ t, position = [0, 0, 0], size = 1 }) => (
  <group position={position} scale={size}>
    {[0, 1, 2, 3, 4].map((i) => {
      const k = (t * 2.6 + i * 0.2) % 1;
      return (
        <Block
          key={i}
          position={[Math.sin(i * 2.1 + t * 7) * 0.05, -0.02 + k * 0.42, Math.cos(i * 1.7 + t * 5) * 0.05]}
          size={[0.2 * (1 - k * 0.75), 0.2 * (1 - k * 0.75), 0.2 * (1 - k * 0.75)]}
          color={FIRE[Math.min(3, Math.floor(k * 4))]}
          emissive={FIRE[Math.min(3, Math.floor(k * 4))]}
          emissiveIntensity={2.4}
          castShadow={false}
        />
      );
    })}
    <Glow position={[0, 0.15, 0]} size={0.9} color="#ff9a3a" opacity={0.5} />
    <pointLight position={[0, 0.2, 0]} color="#ff9a4a" intensity={3 + Math.sin(t * 23) * 0.8} distance={5} decay={2} />
  </group>
);

/** An explosion. `t` is seconds since it went off; it is over in about 1.4 s. `size` is its radius in metres. */
export const Burst: React.FC<{ position: Vec3; t: number; size?: number; seed?: number }> = ({ position, t, size = 3, seed = 1 }) => {
  if (t <= 0 || t > 1.5) return null;
  const k = Math.min(1, t / 0.35);
  const fade = Math.max(0, 1 - (t - 0.35) / 1.1);
  const r = size * (1 - (1 - k) * (1 - k));
  return (
    <group position={position}>
      {Array.from({ length: 22 }, (_, i) => {
        const a = i * 2.399 + seed;
        const up = ((i * 0.618 + seed * 0.37) % 1) * 1.6 - 0.35;
        const d = r * (0.45 + ((i * 0.37) % 1) * 0.6);
        const s = size * 0.42 * (t < 0.35 ? k : fade) + 0.05;
        const c = t < 0.5 ? FIRE[i % 3] : i % 3 === 0 ? "#3a302b" : FIRE[2 + (i % 2)];
        return <Block key={i} position={[Math.cos(a) * d, up * r * 0.7 + t * 0.8, Math.sin(a) * d]} size={[s, s, s]} color={c} emissive={c} emissiveIntensity={c === "#3a302b" ? 0 : 2.6 * fade + 0.4} castShadow={false} />;
      })}
      <pointLight position={[0, 1, 0]} color="#ffb060" intensity={60 * fade} distance={size * 6} decay={2} />
    </group>
  );
};

/** A power leaving one body for another: lights that cross from `from` to `to`. `k` 0–1. */
export const Drain: React.FC<{ from: Vec3; to: Vec3; k: number; color?: string }> = ({ from, to, k, color = "#8dff7a" }) =>
  k <= 0 || k >= 1 ? null : (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const q = Math.min(1, Math.max(0, k * 1.5 - i * 0.1));
        if (q <= 0 || q >= 1) return null;
        const p: Vec3 = [from[0] + (to[0] - from[0]) * q, from[1] + (to[1] - from[1]) * q + Math.sin(q * Math.PI) * 0.25 + Math.sin(i * 2) * 0.08, from[2] + (to[2] - from[2]) * q + Math.cos(i * 2.3) * 0.08];
        return (
          <group key={i}>
            <Block position={p} size={[0.1, 0.1, 0.1]} color={color} emissive={color} emissiveIntensity={3} castShadow={false} />
            <Glow position={p} size={0.5} color={color} opacity={0.5} />
          </group>
        );
      })}
    </>
  );

/** Every power he has taken, going round him. `position` is his feet. `t` is the shot's time; `amount` 0–1 brings them out. */
export const Orbs: React.FC<{ position: Vec3; t: number; amount?: number; count?: number }> = ({ position, t, amount = 1, count = 12 }) =>
  amount <= 0 ? null : (
    <>
      {Array.from({ length: count }, (_, i) => {
        const a = t * (0.9 + (i % 3) * 0.35) + i * ((Math.PI * 2) / count);
        const c = ["#8dff7a", "#7ac8ff", "#ffd24a", "#ff7ab8", "#c58aff", "#ff8a3a"][i % 6];
        const p: Vec3 = [position[0] + Math.cos(a) * (0.75 + (i % 4) * 0.16) * amount, position[1] + 0.5 + ((i * 0.37) % 1) * 1.5, position[2] + Math.sin(a) * (0.75 + (i % 4) * 0.16) * amount];
        return (
          <group key={i}>
            <Block position={p} size={[0.09, 0.09, 0.09]} color={c} emissive={c} emissiveIntensity={3 * amount} castShadow={false} />
            <Glow position={p} size={0.42} color={c} opacity={0.45 * amount} />
          </group>
        );
      })}
    </>
  );

// ----------------------------------------------------------------------------- small things

/** A sock. `position` is its middle. */
export const Sock: React.FC<{ position: Vec3; rotation?: Vec3; color?: string; scale?: number }> = ({ position, rotation = [0, 0, 0], color = "#f4f1ea", scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.06, 0]} size={[0.1, 0.24, 0.1]} color={color} />
    <Block position={[0.06, -0.06, 0]} size={[0.2, 0.1, 0.1]} color={color} />
    <Block position={[0, 0.16, 0]} size={[0.105, 0.05, 0.105]} color="#d8262e" castShadow={false} />
  </group>
);

/** A loaf. `warm` 0–1 makes it glow. */
export const Bread: React.FC<{ position: Vec3; warm?: number }> = ({ position, warm = 0 }) => (
  <group position={position}>
    <Block position={[0, 0.08, 0]} size={[0.42, 0.16, 0.2]} color="#c98a3c" emissive="#ff8a2a" emissiveIntensity={warm * 1.4} />
    <Block position={[0, 0.165, 0]} size={[0.34, 0.03, 0.14]} color="#e0a550" emissive="#ffa040" emissiveIntensity={warm * 1.4} castShadow={false} />
    {warm > 0 ? <Glow position={[0, 0.2, 0]} size={0.9} color="#ffb060" opacity={0.45 * warm} /> : null}
  </group>
);

/** A red arrow lying on the ground, pointing north (−Z). Tip's whole power. */
export const North: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.03, 0.15]} size={[0.14, 0.04, 0.7]} color="#e3261c" castShadow={false} />
    <Block position={[0, 0.03, -0.28]} size={[0.42, 0.04, 0.16]} color="#e3261c" castShadow={false} />
    <Block position={[0, 0.03, -0.42]} size={[0.22, 0.04, 0.14]} color="#e3261c" castShadow={false} />
  </group>
);

/** A bucket of water. `position` is the middle of its base. */
export const Bucket: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.14, 0]} size={[0.3, 0.28, 0.3]} color="#8a8f98" />
    <Block position={[0, 0.285, 0]} size={[0.24, 0.01, 0.24]} color="#3f7fd8" castShadow={false} />
  </group>
);

/** The table his mother lays: `plates` plates, the fourth for someone who is not there. `position` is the floor under its middle. */
export const Table: React.FC<{ position: Vec3; plates?: number }> = ({ position, plates = 4 }) => (
  <group position={position}>
    <Vox kind="planks" position={[0, 0.72, 0]} size={[1.7, 0.1, 1.7]} />
    <Vox kind="log" position={[0, 0.34, 0]} size={[0.3, 0.68, 0.3]} />
    {(
      [
        [0, -0.55],
        [0.55, 0],
        [0, 0.55],
        [-0.55, 0],
      ] as Array<[number, number]>
    )
      .slice(0, plates)
      .map(([x, z], i) => (
        <group key={i}>
          <Block position={[x, 0.79, z]} size={[0.36, 0.03, 0.36]} color="#f4f1ea" />
          <Block position={[x, 0.81, z]} size={[0.22, 0.02, 0.22]} color={i === 3 ? "#f4f1ea" : "#c98a3c"} castShadow={false} />
        </group>
      ))}
  </group>
);

/** Snow on the ground and in the air, around `position`. */
export const Snow: React.FC<{ position: Vec3; t: number }> = ({ position, t }) => (
  <group position={position}>
    <Block position={[0, 0.04, 0]} size={[40, 0.06, 30]} color="#f1f5fb" castShadow={false} />
    {Array.from({ length: 40 }, (_, i) => {
      const x = ((i * 0.618) % 1) * 7 - 3.5;
      const z = ((i * 0.377) % 1) * 6 - 2;
      const y = 4 - ((t * 0.9 + i * 0.173) % 1) * 4;
      return <Block key={i} position={[x + Math.sin(t + i) * 0.1, y, z]} size={[0.05, 0.05, 0.05]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} castShadow={false} />;
    })}
  </group>
);

/** A villager walking in a straight line during a shot: spread it into one. `p` runs 0 → 1. */
export const waddle = (a: Vec3, b: Vec3, p: number): { position: Vec3; rotationY: number; walk: number } => {
  const k = Math.min(1, Math.max(0, p));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * k, a[1] + (b[1] - a[1]) * k, a[2] + dz * k], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * k };
};
/** A jump: 0 at `at`, `height` at the top, 0 again `dur` seconds later. */
export const hop = (t: number, at: number, height: number, dur = 0.6): number => {
  const q = (t - at) / dur;
  return q <= 0 || q >= 1 ? 0 : 4 * height * q * (1 - q);
};
