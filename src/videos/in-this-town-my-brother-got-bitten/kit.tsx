import type React from "react";
import { Block, Glow, PixelText, Vox, useFilmTime } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { BedBox, Hut, Villager, ROBE, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a kid, his big brother who was bitten, their dad, the priest and the old lady
 * next door.
 *
 * Four places.
 *   THE TOWN    Our house in the north with the old lady's beside it, the priest's stall to the west, wheat to the
 *               south-east, a wall with one gate in the south, woods beyond. The lens lives south of what it looks at;
 *               the gate is shot from inside, looking out.
 *   THE ROOM    Two beds, head to the same wall from either side: mine on the right (east), his on the left. The wall
 *               between them is edge-on to the lens. Open to the south.
 *   THE CELLAR  Bars across the room from west to east. Behind them (north) the cell: a bed along the back wall, a
 *               little window high up. In front, the floor, and stairs up the west wall that climb towards the lens to
 *               a door in the south wall. Shot from the south (the south wall is left off) or from inside the cell
 *               (the back wall is left off).
 *   THE WOODS   The road dad walked at night.
 *
 * From the pack: villagers (with their arms out of the sleeves when they are green: `arms`), the zombie, huts, the
 * bed, wheat. Built here: the cellar, the room, the stall's goods, the lantern, the wooden sword, the two bottles, the
 * golden apple, the bite.
 *
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Villager, ROBE,
  Zombie, NightFill as Fill, BedBox, Wheat, Hut, Smoke,
} from "../../../Topics/InThisTown";
export { Block, Glow, PixelText, Torch, Vox } from "../../engine";

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
/** A knock: a quick dip forward and back, 0–1, at `at`. */
export const bonk = (t: number, at: number, d = 0.22) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI);
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

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** The town. */
  home: [0, 0, -6] as Vec3,
  homeDoor: [-1.3, 0, -6] as Vec3,
  lady: [7.6, 0, -6] as Vec3,
  ladyDoor: [7.6, 0, -6] as Vec3,
  stall: [-6.6, 0, -3.6] as Vec3,
  field: [6.2, 0, 4.6] as Vec3,
  square: [0, 0, 1] as Vec3,
  gate: [0, 0, 13] as Vec3,
  /** The room: my bed, his bed, and the wall between them (x = 0). */
  myBed: [0.78, 0, -1.05] as Vec3,
  hisBed: [-0.78, 0, -1.05] as Vec3,
  /** The cellar: the bars are at z = BARS; he stands just behind them, I stand in front. */
  bro: [-0.17, 0, -1.0] as Vec3,
  me: [-0.17, 0, 0.35] as Vec3,
  cellBed: [1.15, 0, -2.0] as Vec3,
  /** The third step up, where I sat. */
  step: [-1.95, 0.9, 1.08] as Vec3,
  cellarDoor: [-1.95, 1.8, 2.95] as Vec3,
};
export const BARS = -0.5;
/** The post in the cell that holds up our floor. He knocks on it. */
export const POST: Vec3 = [-0.95, 0, -1.25];
export const CELLAR = { x: 2.4, north: -2.6, south: 3.0, h: 3.8 };
/** The six steps: step i has its top at 0.3 × (i + 1) and its middle at z = 0.4 + 0.34 × i. */
export const STEP = (i: number): Vec3 => [-1.95, 0.3 * (i + 1), 0.4 + 0.34 * i];

// ----------------------------------------------------------------------------- the cast

const SKIN = [0xbd, 0x8b, 0x72];
const ZSKIN = [0x5f, 0x9a, 0x4e];
const mixHex = (a: number[], b: number[], k: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",")})`;
export const skinAt = (green: number) => mixHex(SKIN, ZSKIN, Math.max(0, Math.min(1, green)));
const eyesAt = (green: number) => mixHex([0x2f, 0x8f, 0x3a], [0xd8, 0x2a, 0x1e], Math.max(0, Math.min(1, green)));

export const KID = 0.7;
export const TEEN = 0.86;
export const MAN = 1.0;
export const ME_ROBE = "#e0851e";
export const BRO_ROBE = "#3f74c4";
/** A villager's face above his feet, at a scale. */
export const face = (p: Vec3, scale: number): Vec3 => [p[0], p[1] + 1.63 * scale, p[2]];
export const chest = (p: Vec3, scale: number): Vec3 => [p[0], p[1] + 1.07 * scale, p[2]];

/** The teller: a kid in an orange robe. Nobody else in the film wears orange. */
export const Me: React.FC<VillagerProps> = (p) => <Villager robe={ME_ROBE} kid scale={KID} phase={0.4} {...p} />;

/**
 * My big brother, in blue. `green` 0–1 is how far the bite has gone: his skin and his eyes change with it.
 * `out` takes his arms out of the sleeves (a zombie villager holds them straight out in front); give `arms` to pose
 * them or to put something in his hand. The torn sleeve is where he was bitten.
 */
export const Bro: React.FC<VillagerProps & { green?: number; out?: boolean; bitten?: boolean }> = ({ green = 0, out = false, bitten = false, arms, ...p }) => {
  const t = useFilmTime();
  const sway = green > 0.5 ? Math.sin(t * 2.1) * 0.05 : 0;
  const bite = bitten ? (
    <>
      <Block position={[0, 0.2, 0.125]} size={[0.14, 0.12, 0.02]} color="#27351f" castShadow={false} />
      {[-1, 0, 1].map((i) => (
        <Block key={i} position={[i * 0.04, 0.2, 0.137]} size={[0.02, 0.05, 0.01]} color="#7fd35a" castShadow={false} />
      ))}
    </>
  ) : undefined;
  const a = out || arms ? { l: -1.5 + sway, r: -1.5 - sway, holdL: bite, ...arms } : undefined;
  const torn = bitten && !a ? (
    <group position={[-0.3375, -0.139, -0.116]} rotation={[-0.75, 0, 0]}>
      <Block position={[0, 0, 0.118]} size={[0.16, 0.14, 0.02]} color="#27351f" castShadow={false} />
      {[-1, 0, 1].map((i) => (
        <Block key={i} position={[i * 0.045, 0, 0.13]} size={[0.022, 0.065, 0.01]} color="#7fd35a" castShadow={false} />
      ))}
    </group>
  ) : undefined;
  return <Villager robe={BRO_ROBE} scale={TEEN} phase={2.2} skin={skinAt(green)} eyes={eyesAt(green)} arms={a} {...p} carry={torn || p.carry ? <>{torn}{p.carry}</> : undefined} />;
};

/** Dad: the tallest, in a dark robe with a brown apron and a beard. `arms`: he has rolled up a sleeve. */
export const Dad: React.FC<VillagerProps> = (p) => (
  <Villager
    robe="#4a4038"
    scale={MAN}
    phase={1.3}
    headwear={
      <>
        <Block position={[0, 0.05, 0.215]} size={[0.47, 0.17, 0.06]} color="#4a3524" castShadow={false} />
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 0.205, 0.13, 0.13]} size={[0.07, 0.3, 0.2]} color="#4a3524" castShadow={false} />
        ))}
      </>
    }
    {...p}
  />
);
/** What is under dad's sleeve: a bare arm and an old bite. Give it to `arms.hold`. */
export const OldBite: React.FC = () => (
  <>
    <Block position={[0, 0.25, 0]} size={[0.245, 0.34, 0.245]} color={skinAt(0)} castShadow={false} />
    <Block position={[0, 0.44, 0]} size={[0.27, 0.07, 0.27]} color="#3b332d" castShadow={false} />
    {[-1, 1].map((r) =>
      [-1.5, -0.5, 0.5, 1.5].map((i) => <Block key={`${r}${i}`} position={[i * 0.045, 0.25 + r * 0.055, 0.125]} size={[0.026, 0.045, 0.02]} color="#4f7a3f" castShadow={false} />),
    )}
  </>
);

/** The priest: purple, with a gold band. `green`: when it was him behind the bars. */
export const Priest: React.FC<VillagerProps & { green?: number }> = ({ green = 0, ...p }) => (
  <Villager
    robe={ROBE.elder}
    scale={0.96}
    phase={3.1}
    skin={skinAt(green)}
    eyes={eyesAt(green)}
    arms={green > 0.5 ? { l: -1.5, r: -1.5 } : undefined}
    headwear={
      <>
        <Block position={[0, 0.575, 0]} size={[0.48, 0.06, 0.48]} color="#e3bf4a" castShadow={false} />
        <Block position={[0, 0.63, 0]} size={[0.34, 0.08, 0.34]} color="#7a4a9c" castShadow={false} />
      </>
    }
    {...p}
  />
);

/** The old lady next door, and the hat she never takes off. `lift` 0–1 raises it: the bite is under it. */
export const Lady: React.FC<VillagerProps & { lift?: number }> = ({ lift = 0, ...p }) => (
  <Villager
    robe="#d8cfc0"
    scale={0.9}
    phase={4.4}
    headwear={
      <>
        {lift > 0.02 ? (
          <>
            <Block position={[0, 0.568, 0.04]} size={[0.22, 0.012, 0.16]} color="#4f7a3f" castShadow={false} />
            {[-1.5, -0.5, 0.5, 1.5].map((i) => (
              <Block key={i} position={[i * 0.045, 0.575, 0.04]} size={[0.026, 0.012, 0.09]} color="#2c4a26" castShadow={false} />
            ))}
          </>
        ) : null}
        <group position={[0, 0.57 + lift * 0.42, -lift * 0.12]} rotation={[-lift * 0.5, 0, 0]}>
          <Block position={[0, 0.02, 0]} size={[0.86, 0.04, 0.86]} color="#8d5aa8" />
          <Block position={[0, 0.13, 0]} size={[0.44, 0.2, 0.44]} color="#a06cbc" />
          <Block position={[0, 0.06, 0]} size={[0.46, 0.05, 0.46]} color="#f0e6c8" castShadow={false} />
          <Block position={[0.2, 0.16, 0.2]} size={[0.12, 0.12, 0.12]} color="#e3261c" castShadow={false} />
          <Block position={[0.2, 0.16, 0.2]} size={[0.05, 0.14, 0.05]} color="#f2d24a" castShadow={false} />
        </group>
      </>
    }
    {...p}
  />
);

/** Somebody lying on their back, head to the north: put a standing figure inside. `position` is the feet. */
export const Lying: React.FC<{ position: Vec3; turn?: number; children: React.ReactNode }> = ({ position, turn = 0, children }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <group rotation={[-Math.PI / 2, 0, 0]}>{children}</group>
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

/** A golden apple. It shines by itself. */
export const GoldenApple: React.FC<{ position?: Vec3; scale?: number; glow?: number }> = ({ position = [0, 0, 0], scale = 1, glow = 0.5 }) =>
  scale <= 0.01 ? null : (
    <group position={position} scale={scale}>
      <Block size={[0.24, 0.22, 0.24]} color="#f2c43a" emissive="#e0a020" emissiveIntensity={0.7} />
      <Block position={[0, 0.02, 0]} size={[0.28, 0.14, 0.2]} color="#ffd95a" emissive="#e0a020" emissiveIntensity={0.7} castShadow={false} />
      <Block position={[0, 0.15, 0]} size={[0.04, 0.1, 0.04]} color="#5c3a18" castShadow={false} />
      <Block position={[0.06, 0.17, 0]} size={[0.1, 0.04, 0.05]} color="#3f8a34" castShadow={false} />
      {glow > 0 ? <Glow position={[0, 0.05, 0]} size={1.1} color="#ffd24a" opacity={glow} /> : null}
    </group>
  );

/** A bottle. Grey is the witch's (weakness); pink is the one for when we were sick (healing). */
export const Bottle: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; pink?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, pink = false }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={rotation} scale={scale}>
      <Block size={[0.2, 0.2, 0.2]} color={pink ? "#f0508c" : "#7d8794"} emissive={pink ? "#f0508c" : "#59626d"} emissiveIntensity={pink ? 0.7 : 0.4} />
      <Block position={[0, 0.15, 0]} size={[0.09, 0.12, 0.09]} color="#cfe4ee" castShadow={false} />
      <Block position={[0, 0.22, 0]} size={[0.12, 0.04, 0.12]} color="#8a6234" castShadow={false} />
    </group>
  );

/**
 * My wooden sword, lying along Y: the handle is the −Y end, the point is +Y. In a hand that is held straight out,
 * −Y is away from the body: this is a sword held by the blade and offered handle first.
 */
export const WoodSword: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.2, 0]} size={[0.09, 0.56, 0.035]} color="#b08d57" />
    <Block position={[0, 0.5, 0]} size={[0.05, 0.06, 0.035]} color="#b08d57" castShadow={false} />
    <Block position={[0, -0.1, 0]} size={[0.26, 0.06, 0.05]} color="#6b4a2a" />
    <Block position={[0, -0.24, 0]} size={[0.06, 0.24, 0.05]} color="#4a3520" />
  </group>
);

/** The lantern I carried: a small iron cage with a flame in it. `light` > 0 makes it a real light. */
export const HandLantern: React.FC<{ position?: Vec3; light?: number; scale?: number }> = ({ position = [0, 0, 0], light = 0, scale = 1 }) => {
  const t = useFilmTime();
  const f = 1 + Math.sin(t * 11) * 0.06 + Math.sin(t * 23) * 0.04;
  return (
    <group position={position} scale={scale}>
      <Block position={[0, 0.02, 0]} size={[0.22, 0.04, 0.22]} color="#2b2b30" />
      <Block position={[0, 0.3, 0]} size={[0.22, 0.04, 0.22]} color="#2b2b30" />
      <Block position={[0, 0.36, 0]} size={[0.08, 0.1, 0.08]} color="#2b2b30" castShadow={false} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b], i) => (
        <Block key={i} position={[a * 0.095, 0.16, b * 0.095]} size={[0.03, 0.26, 0.03]} color="#2b2b30" castShadow={false} />
      ))}
      <Block position={[0, 0.16, 0]} size={[0.13, 0.2, 0.13]} color="#ffd27a" emissive="#ffb347" emissiveIntensity={2.2 * f} castShadow={false} />
      <Glow position={[0, 0.16, 0]} size={1.5} color="#ffb347" opacity={0.5 * f} />
      {light > 0 ? <pointLight position={[0, 0.3, 0]} color="#ffc27a" intensity={light * f} distance={7} decay={1.6} /> : null}
    </group>
  );
};

/** A price over a customer's head: so many emeralds. */
export const Price: React.FC<{ position: Vec3; n: number; scale?: number; rotationY?: number }> = ({ position, n, scale = 1, rotationY = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0, -0.03]} size={[0.3 + n * 0.26, 0.5, 0.04]} color="#1a1420" castShadow={false} />
      {Array.from({ length: n }, (_, i) => (
        <group key={i} position={[(i - (n - 1) / 2) * 0.26, 0, 0]}>
          <Block size={[0.14, 0.24, 0.05]} color="#1fbf5a" emissive="#0f9a44" emissiveIntensity={0.7} castShadow={false} />
          <Block position={[0, 0, 0.01]} size={[0.07, 0.32, 0.05]} color="#39e07a" emissive="#1fbf5a" emissiveIntensity={0.7} castShadow={false} />
        </group>
      ))}
    </group>
  );

/** What the cure looks like: red squares that wind up round somebody. `k` 0–1 is how strong. */
export const RedSwirl: React.FC<{ position: Vec3; t: number; k?: number; height?: number }> = ({ position, t, k = 1, height = 1.7 }) =>
  k <= 0.01 ? null : (
    <group position={position}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = t * 3.4 + i * 1.31;
        const y = ((t * 0.55 + i / 16) % 1) * height;
        const r = 0.36 + (i % 3) * 0.07;
        return <Block key={i} position={[Math.sin(a) * r, y, Math.cos(a) * r]} size={[0.075 * k, 0.075 * k, 0.075 * k]} color="#ff3b2e" emissive="#ff3b2e" emissiveIntensity={1.6} castShadow={false} />;
      })}
      <Glow position={[0, height * 0.5, 0]} size={2.2} color="#ff4a3a" opacity={0.22 * k} />
    </group>
  );

/** A splash: squares of one colour thrown out from a point, falling. `t` is seconds since it burst. */
export const Splash: React.FC<{ position: Vec3; t: number; color: string }> = ({ position, t, color }) =>
  t <= 0 || t > 0.9 ? null : (
    <group position={position}>
      {Array.from({ length: 14 }, (_, i) => {
        const a = i * 2.4;
        const sp = 0.9 + rnd(i, 1) * 1.1;
        const k = t / 0.9;
        return <Block key={i} position={[Math.sin(a) * sp * t, 0.3 + (1.6 * rnd(i, 2) + 0.6) * t - 3.2 * t * t, Math.cos(a) * sp * t * 0.6]} size={[0.09 * (1 - k), 0.09 * (1 - k), 0.09 * (1 - k)]} color={color} emissive={color} emissiveIntensity={0.9} castShadow={false} />;
      })}
      <Glow position={[0, 0.4, 0]} size={2 * (1 - t / 0.9) + 0.6} color={color} opacity={0.5 * (1 - t / 0.9)} />
    </group>
  );

// ----------------------------------------------------------------------------- the cellar

const STONE = "#6f7480";
const STONE2 = "#5f6470";
/** A run of iron bars along X at `z`, from `x0` to `x1`. */
export const Bars: React.FC<{ z?: number; x0?: number; x1?: number; h?: number; roof?: boolean }> = ({ z = BARS, x0 = -CELLAR.x, x1 = CELLAR.x, h = 2.5, roof = true }) => {
  const n = Math.round((x1 - x0) / 0.34);
  return (
    <group>
      {Array.from({ length: n + 1 }, (_, i) => (
        <Block key={i} position={[x0 + (i / n) * (x1 - x0), h / 2, z]} size={[0.06, h, 0.06]} color="#aab2bc" metalness={0.55} roughness={0.4} />
      ))}
      <Block position={[(x0 + x1) / 2, h, z]} size={[x1 - x0 + 0.1, 0.1, 0.1]} color="#8b949e" metalness={0.55} roughness={0.4} />
      <Block position={[(x0 + x1) / 2, 0.05, z]} size={[x1 - x0 + 0.1, 0.1, 0.1]} color="#8b949e" metalness={0.55} roughness={0.4} />
      {roof ? <Block position={[(x0 + x1) / 2, h + (CELLAR.h - h) / 2 + 0.05, z]} size={[x1 - x0 + 0.1, CELLAR.h - h, 0.3]} color={STONE2} castShadow={false} /> : null}
    </group>
  );
};

/**
 * The room under our house. `open` is the wall that is left off for the lens: "south" (the usual), or "north" for a
 * shot from inside the cell looking back at the stairs and the door.
 * `sky` is the colour in the little window; `door` 0–1 is how far the door at the top of the stairs stands open, and
 * `day` is the colour of what comes through it. `sun` 0–1 is how far the light has come: 0 nothing, 0.5 at the foot
 * of the stairs, 1 across the floor to the bars. `shadow` draws mine across it at x = `shadowX`.
 */
export const Cellar: React.FC<{
  /** Which walls are drawn: any of n, e, w, s. The lens side is left off. */
  walls?: string;
  /** `false` takes the ceiling off, for a shot from above. */
  roof?: boolean;
  sky?: string;
  door?: number;
  day?: string;
  sun?: number;
  shadow?: boolean;
  bed?: boolean;
}> = ({ walls = "new", roof = true, sky = "#101a3c", door = 0, day = "#ffd9a0", sun = 0, shadow = false, bed = true }) => {
  const { x, north, south, h } = CELLAR;
  const depth = south - north;
  const mid = (south + north) / 2;
  const stepsLit = Math.max(0, Math.min(6, Math.round(sun * 2 * 6)));
  const floorReach = Math.max(0, Math.min(1, (sun - 0.5) * 2));
  return (
    <group>
      {/* floor: stone slabs, a darker ring where the bed is */}
      <Vox kind="stoneBrick" position={[0, -0.1, mid]} size={[x * 2, 0.2, depth]} />
      {Array.from({ length: 7 }, (_, i) => (
        <Block key={i} position={[-2.1 + i * 0.7, 0.004, mid]} size={[0.02, 0.01, depth]} color="#4a4f5a" castShadow={false} />
      ))}
      {/* walls */}
      {!walls.includes("n") ? null : (
        <>
          <Vox kind="cobble" position={[0, h / 2, north - 0.1]} size={[x * 2 + 0.4, h, 0.2]} castShadow={false} />
          {/* the little window, high up in the cell */}
          <Block position={[-1.25, 2.95, north + 0.005]} size={[0.62, 0.46, 0.03]} color="#3a3f48" castShadow={false} />
          <Block position={[-1.25, 2.95, north + 0.02]} size={[0.5, 0.34, 0.03]} color={sky} emissive={sky} emissiveIntensity={1.1} castShadow={false} />
          {[-0.12, 0.12].map((dx) => (
            <Block key={dx} position={[-1.25 + dx, 2.95, north + 0.04]} size={[0.03, 0.34, 0.03]} color="#22252b" castShadow={false} />
          ))}
        </>
      )}
      {!walls.includes("s") ? null : (
        <>
          <Vox kind="cobble" position={[0.45, h / 2, south + 0.1]} size={[x * 2 - 0.9 + 0.4, h, 0.2]} castShadow={false} />
          <Vox kind="cobble" position={[-1.95, 0.9, south + 0.1]} size={[0.9, 1.8, 0.2]} castShadow={false} />
        </>
      )}
      {[-1, 1].map((s) =>
        walls.includes(s < 0 ? "w" : "e") ? <Vox key={s} kind="cobble" position={[s * (x + 0.1), h / 2, mid]} size={[0.2, h, depth]} castShadow={false} /> : null,
      )}
      {/* the ceiling is the floor of our house: planks on beams */}
      {roof ? (
        <>
          <Vox kind="darkPlanks" position={[0, h + 0.1, mid]} size={[x * 2 + 0.4, 0.2, depth + 0.4]} castShadow={false} />
          {[-1.4, 0.3, 2.0].map((z) => (
            <Vox key={z} kind="log" position={[0, h - 0.14, z]} size={[x * 2, 0.26, 0.26]} castShadow={false} />
          ))}
        </>
      ) : null}
      <Bars roof={roof} />
      {/* the post he knocks on: it holds up our floor */}
      <Vox kind="log" position={[POST[0], (roof ? h : 2.6) / 2, POST[2]]} size={[0.3, roof ? h : 2.6, 0.3]} />
      {bed ? <BedBox position={PLACE.cellBed} rotationY={Math.PI / 2} /> : null}
      {/* a bucket and a bowl: somebody thought about who would be in here */}
      <Block position={[1.95, 0.16, -0.95]} size={[0.3, 0.32, 0.3]} color="#7a5a36" />
      <Block position={[1.95, 0.33, -0.95]} size={[0.24, 0.02, 0.24]} color="#4f8fd0" castShadow={false} />
      {/* the stairs, up the west wall towards the lens */}
      {Array.from({ length: 6 }, (_, i) => {
        const s = STEP(i);
        const lit = i >= 6 - stepsLit;
        return (
          <group key={i}>
            <Vox kind="cobble" position={[s[0], s[1] / 2, s[2]]} size={[0.9, s[1], 0.34]} />
            <Block position={[s[0], s[1] + 0.012, s[2]]} size={[0.9, 0.024, 0.34]} color={lit ? day : STONE} emissive={lit ? day : "#000000"} emissiveIntensity={lit ? 0.85 : 0} castShadow={false} />
          </group>
        );
      })}
      <Vox kind="cobble" position={[-1.95, 0.9, 2.635]} size={[0.9, 1.8, 0.73]} />
      {/* the door at the top */}
      <Block position={[PLACE.cellarDoor[0], 2.75, south + 0.02]} size={[0.9, 1.9, 0.04]} color={door > 0.05 ? day : "#3a2a1a"} emissive={door > 0.05 ? day : "#000000"} emissiveIntensity={door > 0.05 ? 1.2 : 0} castShadow={false} />
      <group position={[PLACE.cellarDoor[0] + 0.45, 1.8, south - 0.02]} rotation={[0, -door * 1.9, 0]}>
        <Block position={[-0.45, 0.95, 0]} size={[0.9, 1.9, 0.08]} color="#6b4a2a" />
        <Block position={[-0.76, 0.95, -0.05]} size={[0.06, 0.06, 0.06]} color="#cfd8e2" castShadow={false} />
      </group>
      {door > 0.05 ? <Glow position={[PLACE.cellarDoor[0], 2.7, south - 0.4]} size={3.2} color={day} opacity={0.3 * door} /> : null}
      {/* the light on the floor: it comes from the foot of the stairs towards the bars */}
      {floorReach > 0.01 ? (
        <>
          <Block position={[-0.75, 0.012, 0.25 - floorReach * 1.05]} size={[3.1, 0.012, 0.3 + floorReach * 2.1]} color={day} emissive={day} emissiveIntensity={0.9} castShadow={false} />
          {shadow ? <Block position={[PLACE.bro[0], 0.02, -0.72]} size={[0.86, 0.012, 1.95]} color="#34363f" castShadow={false} /> : null}
        </>
      ) : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- the room

/**
 * Our room. One wall down the middle (x = 0), edge-on to the lens: my bed on the right of it, his on the left, head
 * to head through the planks. Open to the south. `night`: the windows are dark blue and the moon is in mine.
 * `shake` moves the floorboards in front of my bed (a knock from under).
 */
export const OurRoom: React.FC<{ night?: boolean; shake?: number; sword?: boolean }> = ({ night = false, shake = 0, sword = false }) => {
  const wall = "#b08a56";
  const win = night ? "#243a7a" : "#bfe6ff";
  return (
    <group>
      <Vox kind="planks" position={[0, -0.1, 0]} size={[4.8, 0.2, 4.8]} />
      {/* the boards in front of my bed: these are the ones that jump */}
      <group position={[0.9, shake * 0.05, 0.9]} rotation={[0, 0, shake * 0.02]}>
        <Block position={[0, 0.012, 0]} size={[1.5, 0.03, 0.34]} color="#9c7340" castShadow={false} />
        <Block position={[0.1, 0.012, 0.38]} size={[1.3, 0.03, 0.34]} color="#a57c48" castShadow={false} />
      </group>
      <Block position={[0, 1.7, -2.5]} size={[4.8, 3.4, 0.2]} color={wall} castShadow={false} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 2.5, 1.7, 0]} size={[0.2, 3.4, 4.8]} color={s < 0 ? "#a5804e" : "#a07a48"} castShadow={false} />
          {/* a window over each bed */}
          <Block position={[s * 1.25, 2.2, -2.39]} size={[0.9, 0.9, 0.04]} color={win} emissive={win} emissiveIntensity={night ? 0.7 : 0.9} castShadow={false} />
          <Block position={[s * 1.25, 2.2, -2.37]} size={[1.02, 0.08, 0.03]} color="#5c3f24" castShadow={false} />
          <Block position={[s * 1.25, 2.2, -2.37]} size={[0.08, 1.02, 0.03]} color="#5c3f24" castShadow={false} />
        </group>
      ))}
      {night ? <Block position={[1.45, 2.4, -2.36]} size={[0.26, 0.26, 0.02]} color="#f4f1dc" emissive="#f4f1dc" emissiveIntensity={1.4} castShadow={false} /> : null}
      {[0.9, 1.8, 2.7].map((y) => (
        <Block key={y} position={[0, y, -2.395]} size={[4.8, 0.03, 0.02]} color="#8f6c3e" castShadow={false} />
      ))}
      {/* the wall between the beds */}
      <Block position={[0, 1.3, -0.95]} size={[0.14, 2.6, 2.9]} color="#96713f" />
      <Block position={[0, 2.62, -0.95]} size={[0.2, 0.06, 2.96]} color="#6e5230" castShadow={false} />
      <BedBox position={PLACE.myBed} />
      <BedBox position={PLACE.hisBed} />
      {sword ? <WoodSword position={[1.6, 0.03, 0.7]} rotation={[Math.PI / 2, 0, 0.6]} /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- the town

/** The priest's stall: bread on the counter, and one golden apple under glass that is not for sale. */
export const PriestStall: React.FC<{ apple?: boolean; sign?: boolean }> = ({ apple = true, sign = false }) => {
  const p = PLACE.stall;
  return (
    <group position={p}>
      <Vox kind="planks" position={[0, 0.5, 0]} size={[2.8, 1, 0.9]} />
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * 1.3, 1.5, -0.36]} size={[0.16, 3, 0.16]} />
      ))}
      {[-1, 0, 1].map((k) => (
        <Vox key={k} kind="wool" tint={k === 0 ? "#f4f1ea" : "#7a4a9c"} position={[k * 0.95, 3.0, 0.05]} rotation={[0.32, 0, 0]} size={[0.95, 0.1, 1.5]} />
      ))}
      {[-0.85, -0.3, 0.25].map((x, i) => (
        <Loaf key={x} position={[x, 1, 0.1 + (i % 2) * 0.12]} rotation={[0, 0.3 * i, 0]} />
      ))}
      {/* the shelf, and the apple under glass */}
      <Vox kind="darkPlanks" position={[0.85, 1.06, 0.05]} size={[0.6, 0.12, 0.6]} />
      {apple ? <GoldenApple position={[0.85, 1.27, 0.05]} scale={1.15} glow={0.6} /> : null}
      <Block position={[0.85, 1.36, 0.05]} size={[0.5, 0.5, 0.5]} color="#cfe9ff" opacity={0.28} castShadow={false} />
      {sign ? (
        <group position={[0.85, 1.95, 0.1]}>
          <Block position={[0, 0, -0.03]} size={[1.25, 0.56, 0.04]} color="#1a1420" castShadow={false} />
          <PixelText text="NOT FOR" position={[0, 0.12, 0]} height={0.2} color="#ffe27a" />
          <PixelText text="SALE" position={[0, -0.13, 0]} height={0.2} color="#ffe27a" />
        </group>
      ) : null}
    </group>
  );
};

export const WALL = { x: 22, z: 13, gate: 1.7, h: 2.8 };
/** The town wall in the south, and the gate in it. `open` 0–1 swings the two doors outward. */
export const GateWall: React.FC<{ open?: number }> = ({ open = 1 }) => (
  <group>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="cobble" position={[s * (WALL.gate + (WALL.x - WALL.gate) / 2), WALL.h / 2, WALL.z]} size={[WALL.x - WALL.gate, WALL.h, 0.8]} />
        <Vox kind="stoneBrick" position={[s * (WALL.gate + (WALL.x - WALL.gate) / 2), WALL.h + 0.12, WALL.z]} size={[WALL.x - WALL.gate + 0.1, 0.24, 0.94]} />
        <Vox kind="log" position={[s * WALL.gate, 1.8, WALL.z]} size={[0.5, 3.6, 1]} />
        <group position={[s * (WALL.gate - 0.25), 0, WALL.z + 0.3]} rotation={[0, s * -open * 1.7, 0]}>
          <Block position={[-s * 0.72, 1.25, 0]} size={[1.44, 2.5, 0.12]} color="#6b4a2a" />
          {[0.5, 1.9].map((y) => (
            <Block key={y} position={[-s * 0.72, y, 0.07]} size={[1.44, 0.12, 0.03]} color="#3a2a1a" castShadow={false} />
          ))}
        </group>
      </group>
    ))}
    <Vox kind="log" position={[0, 3.7, WALL.z]} size={[WALL.gate * 2 + 0.6, 0.4, 1]} />
  </group>
);

/** Our house and the old lady's: drawn by the scenes that need a door open or a window lit. */
export const Houses: React.FC<{ lit?: boolean; homeOpen?: boolean; ladyOpen?: boolean }> = ({ lit = false, homeOpen = false, ladyOpen = false }) => (
  <>
    <Hut at={PLACE.home} w={6} h={3.6} d={6} tint="#caa268" roof="#8a3b2a" door={-1.3} windows={[1.5]} lit={lit} open={homeOpen} />
    <Hut at={PLACE.lady} w={5} h={3.4} d={5} wall="cobble" roof="#7a4a9c" door={0} windows={[-1.6, 1.6]} lit={lit} open={ladyOpen} />
  </>
);

const FOLK: Array<[number, number, string, number]> = [
  [-3.4, 2.6, ROBE.brown, 0.94],
  [3.2, 0.2, ROBE.farmer, 0.94],
  [-2.2, -2.6, ROBE.red, 0.9],
  [4.4, 3.6, ROBE.white, 0.94],
  [-5.0, 5.2, ROBE.friend, 0.7],
];
/** The town going about its day. `look` makes them all look at one point; `still` stops them. */
export const Life: React.FC<{ t: number; n?: number; look?: Vec3; still?: boolean }> = ({ t, n = 4, look, still = false }) => (
  <>
    {FOLK.slice(0, n).map(([x, z, robe, scale], i) => {
      const dir = i % 2 ? 1 : -1;
      const swing = still ? 0 : Math.sin(t * 0.5 + i * 1.7);
      const vx = Math.cos(t * 0.5 + i * 1.7) * dir;
      return <Villager key={i} position={[x + swing * 1.1 * dir, 0, z]} rotationY={still ? 0 : vx > 0 ? Math.PI / 2 : -Math.PI / 2} walk={still ? 0 : swing * 1.1 + 3} robe={robe} kid={scale < 0.8} scale={scale} lookAt={look} phase={i * 1.3} />;
    })}
  </>
);

/** The colour in the little window: 0 night, 0.5 grey, 1 gold. */
export const skyAt = (k: number) => {
  const a = [0x10, 0x1a, 0x3c];
  const b = [0x8a, 0x94, 0xa8];
  const c = [0xff, 0xd2, 0x7a];
  const q = Math.max(0, Math.min(1, k));
  return q < 0.5 ? mixHex(a, b, q * 2) : mixHex(b, c, (q - 0.5) * 2);
};

/** The parts of the town that change: our house, the old lady's, and the wall with its gate. */
export const TownSet: React.FC<{ lit?: boolean; homeOpen?: boolean; ladyOpen?: boolean; gate?: number; apple?: boolean; sign?: boolean }> = ({ lit = false, homeOpen = false, ladyOpen = false, gate = 0, apple = true, sign = false }) => (
  <>
    <PriestStall apple={apple} sign={sign} />
    <Houses lit={lit} homeOpen={homeOpen} ladyOpen={ladyOpen} />
    <GateWall open={gate} />
  </>
);
