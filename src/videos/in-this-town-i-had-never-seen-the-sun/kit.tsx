import type React from "react";
import { Block, Glow, GodRay, LightPool, Vox } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { BedBox, Blaze, FireLight, Hut, Villager, Zombie, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a zombie kid who has never seen the sun, his mum, his grandpa, the old ones, and a
 * villager kid from the town on the other side of the hill.
 *
 * Five places (zones in world.tsx).
 *   under    The zombie town under the big trees. A street runs west–east; our house is on its north side with the
 *            door to the lens, grandpa's is next door to the east. Blue, always.
 *   room     My room. The door is in the back wall, right of the middle; the bed is on the left. The lens stands
 *            where the fourth wall would be.
 *   rim      The edge of the trees. The wood is in the south (behind the usual lens), the path runs north to a
 *            hill, and the sun and the moon come up over that hill. A log lies across the path.
 *   meadow   The day side: flowers, a row of sunflowers, a pond to the west, the day town far in the north.
 *   daytown  The villagers' street: three houses in a row, doors to the lens, a hay bale to hide behind.
 *
 * The sun is in the north in every outdoor look (src/engine/Look.tsx `sunDir`), so the lens in the south sees it.
 *
 * From the pack: the zombie (with `headwear`, added for this film), villagers, huts, the bed, fire, rain, the bone.
 * Built here: the helmet and its wear bar, the room and its door, the sunflower, the bees, the notice boards.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits, Blaze, Bone, Bubble, FireLight, Puffs, SoundRings, SubscribeSign, Villager, ROBE,
  Zombie, NightFill as Fill, BedBox, Hut, Smoke, Rain, Puddle, Moon, Stars,
} from "../../../Topics/InThisTown";
export { Block, Glow, GodRay, LightPool, PixelText, Vox } from "../../engine";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, nth = 0) => wordAt(cue, word, nth);
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
/** Walking from a to b: where, which way, how far. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; walk: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * q };
};

/** One pixel of a mob's skin, in metres. */
export const U = 1.8 / 32;

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** under: the front of our house, on the ground. The door is in the middle of it. */
  home: [0, 0, -6] as Vec3,
  homeDoor: [0, 0, -5.4] as Vec3,
  /** under: grandpa's house, and where he stands in front of it. */
  grandpaHome: [7.2, 0, -6] as Vec3,
  grandpa: [5.4, 0, -3.6] as Vec3,
  /** under: the notice board. */
  board: [-6.3, 0, -3.7] as Vec3,
  /** room: where I stand at the door, and the gap the light comes through. */
  atDoor: [-0.35, 0, -1.0] as Vec3,
  gap: [0.2, 0, -2.0] as Vec3,
  bed: [-1.45, 0, -0.9] as Vec3,
  /** rim: the log across the path, and the two seats on it. */
  log: [0, 0, -2.2] as Vec3,
  seatMe: [-0.45, 0, -2.2] as Vec3,
  seatPal: [0.5, 0, -2.2] as Vec3,
  /** rim: where the hat lay. */
  hat: [0.5, 0, -0.6] as Vec3,
  /** meadow: the tall sunflower, the pond, and the spot in it. */
  flower: [0.9, 0, -0.8] as Vec3,
  pond: [-7, 0, 3] as Vec3,
  inPond: [-7, -0.74, 3.2] as Vec3,
  bank: [-5.4, 0, 5.3] as Vec3,
};

// ----------------------------------------------------------------------------- cast

/** The zombie kid's size. He is 1.25 m to the top of his head; his face is 1.05 m up. */
export const ZK = 0.62;
export const KID = 0.7;
export const meFace = (p: Vec3): Vec3 => [p[0], p[1] + 1.05, p[2]];
export const palFace = (p: Vec3): Vec3 => [p[0], p[1] + 1.63 * KID, p[2]];
export const bigFace = (p: Vec3): Vec3 => [p[0], p[1] + 1.58, p[2]];

const IRON = "#d3d8e0";
const IRON_DARK = "#8a919c";

/**
 * The iron helmet, in the head's own space (the head is 8 U wide, its middle 4 U up). Worn: give it to a zombie as
 * `headwear`. Lying about: wrap it in a group (`HelmetProp`). `crack` 0–1 draws the crack; `half` keeps one side.
 */
export const Helmet: React.FC<{ crack?: number; half?: -1 | 0 | 1 }> = ({ crack = 0, half = 0 }) => {
  const u = U;
  const cx = half * 2.25 * u;
  const cw = half === 0 ? 9 * u : 4.5 * u;
  return (
    <group>
      <Block position={[cx, 7.0 * u, 0]} size={[cw, 3 * u, 9 * u]} color={IRON} />
      <Block position={[cx, 5.25 * u, -0.25 * u]} size={[cw, 1.1 * u, 8.6 * u]} color="#b4bac4" />
      {[-1, 1].map((s) => (half !== 0 && s !== half ? null : <Block key={s} position={[s * 4.3 * u, 3.7 * u, -0.6 * u]} size={[0.5 * u, 2.6 * u, 5 * u]} color="#b4bac4" />))}
      {half === 0 ? <Block position={[0, 5.0 * u, 4.4 * u]} size={[1.3 * u, 1.3 * u, 0.3 * u]} color={IRON_DARK} castShadow={false} /> : null}
      {/* the dent: how you know this hat when you see it again */}
      {half !== -1 ? <Block position={[2.5 * u, 7.75 * u, 3.25 * u]} size={[2.3 * u, 1.5 * u, 2.7 * u]} color={IRON_DARK} castShadow={false} /> : null}
      {half === 0 && crack > 0.02 ? (
        <>
          <Block position={[-0.9 * u, 7.6 * u, 4.56 * u]} rotation={[0, 0, 0.4]} size={[0.45 * u, 1.9 * u, 0.12 * u]} color="#15181c" castShadow={false} />
          {crack > 0.4 ? <Block position={[-0.4 * u, 6.2 * u, 4.56 * u]} rotation={[0, 0, -0.5]} size={[0.45 * u, 1.7 * u, 0.12 * u]} color="#15181c" castShadow={false} /> : null}
          {crack > 0.7 ? <Block position={[-0.9 * u, 8.56 * u, 1.5 * u]} rotation={[0, 0.3, 0]} size={[0.45 * u, 0.12 * u, 6 * u]} color="#15181c" castShadow={false} /> : null}
        </>
      ) : null}
    </group>
  );
};

/** The helmet as a thing in the world. `position` is the middle of its rim; at `scale` 1 it fits the zombie kid. */
export const HelmetProp: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number; crack?: number; half?: -1 | 0 | 1 }> = ({ position, rotation = [0, 0, 0], scale = 1, crack = 0, half = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={1.5 * ZK * scale}>
      <group position={[0, -2.4 * U, 0]}>
        <Helmet crack={crack} half={half} />
      </group>
    </group>
  );

/**
 * How worn the hat is, as a bar that hangs over it: the clock of the film. `k` 1 is new, 0 is gone. It turns from
 * green to yellow to red, and blinks under 0.15. `yaw` turns it to the lens (radians).
 */
export const WearBar: React.FC<{ position: Vec3; k: number; yaw?: number; scale?: number; t?: number; flat?: boolean }> = ({ position, k, yaw = 0, scale = 1, t = 0, flat = false }) => {
  if (scale <= 0.01) return null;
  const q = Math.max(0, Math.min(1, k));
  const color = q > 0.55 ? "#4fe04a" : q > 0.28 ? "#f2d230" : "#f0402a";
  const on = q > 0.15 || Math.floor(t * 7) % 2 === 0;
  return (
    <group position={position} rotation={[flat ? -Math.PI / 2 : 0, yaw, 0]} scale={scale}>
      <Block position={[0, 0, -0.012]} size={[0.47, 0.125, 0.03]} color="#c9ccd2" castShadow={false} />
      <Block size={[0.43, 0.085, 0.04]} color="#101014" castShadow={false} />
      {q > 0.005 && on ? <Block position={[-0.2 * (1 - q), 0, 0.012]} size={[0.4 * q, 0.055, 0.05]} color={color} emissive={color} emissiveIntensity={0.45} castShadow={false} /> : null}
    </group>
  );
};

type ZProps = React.ComponentProps<typeof Zombie>;

/**
 * Me: a zombie kid with a yellow scarf. `helmet` puts the hat on; `crack` cracks it; `wear` (0–1) hangs the bar over
 * it, turned by `barYaw`; `fire` sets him alight; `soot` is what he looks like after.
 */
export const Me: React.FC<ZProps & { helmet?: boolean; crack?: number; wear?: number; barYaw?: number; barT?: number; fire?: boolean; soot?: boolean }> = ({
  helmet = false, crack = 0, wear, barYaw = 0, barT = 0, fire = false, soot = false, position = [0, 0, 0], ...p
}) => (
  <>
    <Zombie baby scale={ZK} scarf="#f2c230" arms={0} phase={0.4} position={position} skin={soot ? "#4a5a40" : undefined} headwear={helmet ? <Helmet crack={crack} /> : undefined} {...p} />
    {wear !== undefined ? <WearBar position={[position[0], position[1] + 1.58, position[2]]} k={wear} yaw={barYaw} t={barT} /> : null}
    {fire ? (
      <>
        <Blaze position={[position[0], position[1] + 0.35, position[2]]} size={0.5} height={1.5} count={14} />
        <FireLight position={[position[0], position[1] + 1.0, position[2] + 0.6]} power={8} reach={6} />
      </>
    ) : null}
  </>
);

/** A blindfold: what the grown-ups wear out of doors when the sky goes pink. `up` pushes it onto the forehead. */
export const Blindfold: React.FC<{ up?: number }> = ({ up = 0 }) => (
  <Block position={[0, (4.2 + up * 2.6) * U, 0]} size={[8.5 * U, 1.9 * U, 8.5 * U]} color="#23232c" castShadow={false} />
);

export const Mum: React.FC<ZProps> = (p) => <Zombie hat="bow" scarf="#e86a9a" arms={0.15} phase={1.3} {...p} />;

const OLD_SKIN = "#9bb58a";
/** Grandpa: paler, a purple shirt, a white beard and brows. `young` is him long ago: no beard, the same shirt. */
export const Grandpa: React.FC<ZProps & { young?: boolean; blind?: number }> = ({ young = false, blind, ...p }) => (
  <Zombie
    skin={young ? undefined : OLD_SKIN}
    shirt="#7a5aa8"
    legs="#4a4458"
    arms={0.1}
    phase={2.2}
    lean={young ? 0 : 0.14}
    headwear={
      young ? undefined : (
        <>
          <Block position={[0, 0.2 * U, 4.2 * U]} size={[5 * U, 2.6 * U, 0.5 * U]} color="#f1efe6" castShadow={false} />
          <Block position={[0, -1.2 * U, 3.9 * U]} size={[3 * U, 1.6 * U, 0.5 * U]} color="#f1efe6" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 2 * U, 5.9 * U, 4.25 * U]} size={[2.6 * U, 0.8 * U, 0.4 * U]} color="#f1efe6" castShadow={false} />
          ))}
          {blind !== undefined ? <Blindfold up={blind} /> : null}
        </>
      )
    }
    {...p}
  />
);

/** One of the old ones. */
export const Old: React.FC<ZProps & { n?: number }> = ({ n = 0, ...p }) => (
  <Zombie skin={OLD_SKIN} shirt={n % 2 ? "#5a7a6a" : "#8a6a4a"} legs="#4a4458" arms={0.1} lean={0.12} phase={3 + n * 1.7} scarf={n % 2 ? "#c8c8c8" : undefined} {...p} />
);

export const PAL_ROBE = "#c8452f";
/** The kid from the day town: a red robe. */
export const Pal: React.FC<VillagerProps> = (p) => <Villager robe={PAL_ROBE} kid scale={KID} phase={0.9} {...p} />;
/** His dad. */
export const PalDad: React.FC<VillagerProps> = (p) => <Villager robe="#5a2f26" scale={1.02} phase={2.6} {...p} />;

/** Somebody lying down. `position` is where the feet are; the head lies towards −Z before `turn`. Face up. */
export const Lying: React.FC<{ position: Vec3; turn?: number; down?: boolean; children: React.ReactNode }> = ({ position, turn = 0, down = false, children }) => (
  <group position={position} rotation={[0, turn + (down ? Math.PI : 0), 0]}>
    <group rotation={[down ? Math.PI / 2 : -Math.PI / 2, 0, 0]}>{children}</group>
  </group>
);

// ----------------------------------------------------------------------------- things

/** A loaf of bread, lying along X. `position` is the middle of its underside. */
export const Loaf: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={scale}>
      <Block position={[0, 0.09, 0]} size={[0.52, 0.18, 0.26]} color="#b8762a" />
      <Block position={[0, 0.185, 0]} size={[0.46, 0.03, 0.2]} color="#dba24c" castShadow={false} />
      {[-0.14, 0, 0.14].map((x) => (
        <Block key={x} position={[x, 0.2, 0]} rotation={[0, 0.5, 0]} size={[0.03, 0.02, 0.2]} color="#8a5418" castShadow={false} />
      ))}
    </group>
  );

/** A sunflower. `position` is its foot. Its face looks along `rotationY` and tips up by `up` radians. */
export const Sunflower: React.FC<{ position: Vec3; height?: number; rotationY?: number; up?: number; sway?: number }> = ({ position, height = 1.75, rotationY = 0, up = 0.5, sway = 0 }) => (
  <group position={position} rotation={[0, rotationY, sway]}>
    <Block position={[0, height / 2, 0]} size={[0.08, height, 0.08]} color="#3f8a34" />
    <Block position={[0.17, height * 0.45, 0]} rotation={[0, 0, -0.5]} size={[0.3, 0.05, 0.16]} color="#4a9a3c" castShadow={false} />
    <Block position={[-0.17, height * 0.62, 0]} rotation={[0, 0, 0.5]} size={[0.3, 0.05, 0.16]} color="#4a9a3c" castShadow={false} />
    <group position={[0, height, 0.03]} rotation={[-up, 0, 0]}>
      <Block position={[0, 0, 0]} size={[0.66, 0.66, 0.05]} color="#f7c81e" />
      <Block position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} size={[0.62, 0.62, 0.045]} color="#f2b414" castShadow={false} />
      <Block position={[0, 0, 0.035]} size={[0.32, 0.32, 0.06]} color="#5a3a1a" castShadow={false} />
      <Block position={[0, 0, -0.035]} size={[0.3, 0.3, 0.04]} color="#3f8a34" castShadow={false} />
    </group>
  </group>
);

/** Bees going round a point. */
export const Bees: React.FC<{ center: Vec3; t: number; n?: number; reach?: number }> = ({ center, t, n = 4, reach = 0.7 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = t * (1.6 + rnd(i, 1)) + i * 2.1;
      const r = reach * (0.5 + rnd(i, 2) * 0.6);
      return (
        <group key={i} position={[center[0] + Math.sin(a) * r, center[1] + Math.sin(a * 1.7 + i) * 0.18 + i * 0.07, center[2] + Math.cos(a) * r]} rotation={[0, a + Math.PI / 2, 0]}>
          <Block size={[0.1, 0.09, 0.16]} color="#f7c81e" castShadow={false} />
          <Block position={[0, 0, 0.01]} size={[0.105, 0.095, 0.04]} color="#1c1a14" castShadow={false} />
          <Block position={[0, 0, -0.06]} size={[0.105, 0.095, 0.03]} color="#1c1a14" castShadow={false} />
          <Block position={[0, 0.07, 0]} size={[0.16, 0.01, 0.08]} color="#eaf4ff" castShadow={false} />
        </group>
      );
    })}
  </>
);

/** A notice board with what you must not look at drawn on it and crossed out: the sun, or the moon. It faces +Z. */
export const Board: React.FC<{ position: Vec3; rotationY?: number; kind: "sun" | "moon"; cross?: number }> = ({ position, rotationY = 0, kind, cross = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {[-0.6, 0.6].map((x) => (
      <Vox key={x} kind="log" position={[x, 0.95, -0.05]} size={[0.12, 1.9, 0.12]} />
    ))}
    <Vox kind="planks" tint={kind === "sun" ? "#6b5a48" : "#c9a86a"} position={[0, 1.35, 0]} size={[1.4, 1.1, 0.08]} />
    {kind === "sun" ? (
      <>
        <Block position={[0, 1.35, 0.05]} size={[0.42, 0.42, 0.03]} color="#f7c81e" emissive="#f7c81e" emissiveIntensity={0.5} castShadow={false} />
        {[0, 1, 2, 3].map((i) => (
          <Block key={i} position={[Math.cos((i * Math.PI) / 2) * 0.36, 1.35 + Math.sin((i * Math.PI) / 2) * 0.36, 0.05]} size={[0.12, 0.12, 0.03]} color="#f7c81e" emissive="#f7c81e" emissiveIntensity={0.5} castShadow={false} />
        ))}
      </>
    ) : (
      <>
        <Block position={[0, 1.35, 0.05]} size={[0.46, 0.46, 0.03]} color="#e8ecf4" castShadow={false} />
        <Block position={[-0.09, 1.42, 0.06]} size={[0.12, 0.12, 0.03]} color="#b4bccb" castShadow={false} />
        <Block position={[0.1, 1.27, 0.06]} size={[0.09, 0.09, 0.03]} color="#b4bccb" castShadow={false} />
        {[[-0.45, 1.7], [0.45, 1.62], [0.38, 1.02]].map(([x, y], i) => (
          <Block key={i} position={[x, y, 0.05]} size={[0.06, 0.06, 0.03]} color="#e8ecf4" castShadow={false} />
        ))}
      </>
    )}
    {cross > 0.02
      ? [-1, 1].map((s) => (
          <Block key={s} position={[0, 1.35, 0.075]} rotation={[0, 0, (s * Math.PI) / 4]} size={[1.25 * Math.min(1, cross), 0.11, 0.03]} color="#e3261c" castShadow={false} />
        ))
      : null}
  </group>
);

/** A soul lamp: the zombie town's light. Blue. `light` over 0 makes it a real one. */
export const SoulLamp: React.FC<{ position: Vec3; light?: number }> = ({ position, light = 0 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.9, 0]} size={[0.14, 1.8, 0.14]} />
    <Block position={[0, 1.95, 0]} size={[0.3, 0.3, 0.3]} color="#7fe9ff" emissive="#7fe9ff" emissiveIntensity={0.9} castShadow={false} />
    <Glow position={[0, 1.95, 0.2]} size={1.2} color="#7fe9ff" opacity={0.25} />
    {light > 0 ? <pointLight position={[0, 1.9, 0.5]} color="#9fe6ff" intensity={light} distance={10} decay={2} /> : null}
  </group>
);

// ----------------------------------------------------------------------------- sets

/**
 * My room. `door` 0–1 opens the door (it swings in); `light` 0–1 is how much day is behind it, in `tint`. With the
 * door shut the light is a line under it. `boards` nails it shut. `bed` leaves the bed out when false.
 */
export const MyRoom: React.FC<{ door?: number; light?: number; tint?: string; boards?: boolean; bed?: boolean }> = ({ door = 0, light = 0, tint = "#ffd257", boards = false, bed = true }) => {
  const wd = 0.06 + door * 0.5;
  return (
    <group>
      <Vox kind="darkPlanks" position={[0, -0.05, 0]} size={[4.8, 0.1, 5]} />
      <Vox kind="planks" tint="#5d4a36" position={[-1.075, 1.6, -2.1]} size={[2.45, 3.2, 0.2]} />
      <Vox kind="planks" tint="#5d4a36" position={[1.675, 1.6, -2.1]} size={[1.25, 3.2, 0.2]} />
      <Vox kind="planks" tint="#5d4a36" position={[0.6, 2.55, -2.1]} size={[0.9, 1.3, 0.2]} />
      {[-2.4, 2.4].map((x) => (
        <Vox key={x} kind="planks" tint="#54422f" position={[x, 1.6, 0.3]} size={[0.2, 3.2, 5]} />
      ))}
      {/* the day outside, seen only through the gap */}
      {light > 0.01 ? (
        <mesh position={[0.6, 1.0, -2.45]}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial color={tint} toneMapped={false} fog={false} />
        </mesh>
      ) : (
        <Block position={[0.6, 1.0, -2.45]} size={[2.4, 2.4, 0.05]} color="#05060c" castShadow={false} />
      )}
      {/* the door: hinged on the right, swinging in */}
      <group position={[1.05, 0, -2.04]} rotation={[0, door * 1.25, 0]}>
        <Block position={[-0.45, 0.96, 0]} size={[0.9, 1.9, 0.08]} color="#7a5632" />
        <Block position={[-0.45, 0.96, 0.045]} size={[0.74, 1.6, 0.02]} color="#6a4829" castShadow={false} />
        <Block position={[-0.8, 0.95, 0.07]} size={[0.07, 0.07, 0.07]} color="#2a2a30" castShadow={false} />
      </group>
      {boards
        ? [0.7, 1.3].map((y, i) => (
            <Vox key={y} kind="planks" position={[0.6, y, -1.96]} rotation={[0, 0, i ? 0.12 : -0.1]} size={[1.5, 0.2, 0.06]} />
          ))
        : null}
      {light > 0.01 ? (
        <>
          {/* the line under the door, and what it spills on the floor */}
          <Block position={[0.6, 0.014, -1.99]} size={[0.9, 0.028, 0.05]} color={tint} emissive={tint} emissiveIntensity={2.2 * light} castShadow={false} />
          <LightPool position={[0.6, 0.02, -1.55]} width={1.3} depth={1.1} color={tint} opacity={0.5 * light} />
          {door > 0.02 ? (
            <>
              <Block position={[0.15 + wd / 2, 0.014, -0.1]} size={[wd, 0.028, 3.9]} color={tint} emissive={tint} emissiveIntensity={2.4 * light} castShadow={false} />
              <GodRay position={[0.15 + wd / 2, 1.0, -1.2]} rotation={[0, Math.PI / 2, 0]} width={2.0} height={2.0} color={tint} opacity={0.2 * light} crossed={false} />
              <pointLight position={[0.3, 0.9, -1.3]} color={tint} intensity={2.2 * light * (0.4 + door)} distance={3.2} decay={2} />
            </>
          ) : (
            <pointLight position={[0.6, 0.25, -1.5]} color={tint} intensity={1.6 * light} distance={3} decay={2} />
          )}
        </>
      ) : null}
      {bed ? <BedBox position={PLACE.bed} /> : null}
      <pointLight position={[-0.6, 2.4, 1.6]} color="#8fa6ff" intensity={5} distance={8} decay={2} />
    </group>
  );
};

/** Our house in the zombie town, and grandpa's. `open` opens our door. */
export const Homes: React.FC<{ open?: boolean; grandpaOpen?: boolean }> = ({ open = false, grandpaOpen = false }) => (
  <>
    <Hut at={PLACE.home} w={5} h={3.4} wall="darkPlanks" roof="#33465c" windows={[-1.6, 1.6]} open={open} />
    <Hut at={PLACE.grandpaHome} w={4.6} h={3.2} wall="cobble" tint="#6f7a80" roof="#4a3a5a" windows={[1.3]} door={-0.9} open={grandpaOpen} />
    <Hut at={[-7.6, 0, -6]} w={5} h={3.4} wall="darkPlanks" tint="#4a4038" roof="#2f4a3a" windows={[1.5]} door={-0.8} open={grandpaOpen} />
  </>
);

/** The villagers' street. By day the doors stand open; at `night` they are shut and the windows are lit. */
export const DayTown: React.FC<{ night?: boolean; open?: boolean; lit?: boolean }> = ({ night = false, open, lit }) => {
  const o = open ?? !night;
  const l = lit ?? night;
  return (
    <>
      <Hut at={[-6.4, 0, -5]} w={5} h={3.4} tint="#d8c49a" roof="#3d5f9a" windows={[1.6]} door={-0.8} open={o} lit={l} />
      <Hut at={[0, 0, -5.6]} w={5} h={3.6} tint="#c8a878" roof="#8a3b2a" windows={[-1.6, 1.6]} open={o} lit={l} />
      <Hut at={[6.4, 0, -5]} w={5} h={3.4} wall="cobble" roof="#3f6b3a" windows={[-1.6]} door={0.8} open={o} lit={l} />
    </>
  );
};

/** The first pink light, coming in sideways under the trees of the zombie town. `k` 0–1. */
export const PinkDawn: React.FC<{ k?: number }> = ({ k = 1 }) =>
  k <= 0.01 ? null : (
    <>
      <pointLight position={[8, 3.2, 1.5]} color="#ff9fb0" intensity={130 * k} distance={34} decay={2} />
      <pointLight position={[-7, 4, 3]} color="#ffb8a8" intensity={60 * k} distance={30} decay={2} />
      <LightPool position={[1, 0.06, -2.4]} width={16} depth={8} color="#ff9fb0" opacity={0.3 * k} />
      {[-5, 1.5, 7].map((x, i) => (
        <GodRay key={x} position={[x, 5, -1.5 - i]} rotation={[0, 0, -0.55]} width={2.6} height={13} color="#ffb0c0" opacity={0.13 * k} />
      ))}
    </>
  );

/** The log across the path at the rim, where the two of them sit. */
export const Log: React.FC = () => <Vox kind="log" position={[PLACE.log[0], 0.21, PLACE.log[2]]} size={[2.8, 0.42, 0.5]} />;
