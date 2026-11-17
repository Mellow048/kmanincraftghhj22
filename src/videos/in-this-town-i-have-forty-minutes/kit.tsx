import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText, Torch, Vox, getPose, useFilmTime } from "../../engine";
import type { MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { BedBox, Hole, Hut, ROBE, Villager, Well, Wheat, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a villager who sells books, and the stranger who moved into his house.
 *
 * Three places. THE TOWN: a square with a hole in the middle of it (origin + 1.5 south), the bell north of that, a
 * well to the east, the wheat to the west, seven houses that are all the same house, a wall round the lot with one
 * gate in the south, and woods beyond the gate. The lens lives south of what it looks at. THE ROOM: his room, open to
 * the south, the bed against the back wall on the right, the chest on the left. THE WILD: where he was before the
 * boat.
 *
 * From the pack: villagers, the iron golem, pillagers, the ravager, the bed, huts, wheat. Built here: the stranger,
 * a zombie villager (the pack's villager with green skin), a boat, the desk (a lectern), the bell and its stand,
 * emeralds, a golden apple, the wall, the torches.
 *
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export {
  DEG, EAST, NORTH, SOUTH, WEST, ease, ramp, pop, jolt, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Villager, ROBE, IronGolem, Poppy, Pillager, Ravager,
  HandBanner, Chicken, Zombie, Skeleton, NightFill as Fill, Hole, BedBox, Wheat, Hut, PlayerSword as Sword,
} from "../../../Topics/InThisTown";
export { Block, Glow, PixelText, Torch, Vox } from "../../engine";

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
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
/** Walking from a to b for someone who is not an avatar: where, which way, how far. */
export const go = (a: Vec3, b: Vec3, k: number): { position: Vec3; rotationY: number; walk: number } => {
  const q = Math.min(1, Math.max(0, k));
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return { position: [a[0] + dx * q, a[1] + (b[1] - a[1]) * q, a[2] + dz * q], rotationY: Math.atan2(dx, dz), walk: Math.hypot(dx, dz) * q };
};

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** The hole he dug, in the middle of the square. */
  hole: [0, 0, 1.5] as Vec3,
  bell: [0, 0, -5.5] as Vec3,
  well: [5.4, 0, -2.2] as Vec3,
  field: [-5.8, 0, 1.2] as Vec3,
  /** The gate: the one gap in the wall, in the south. */
  gate: [0, 0, 13] as Vec3,
  /** Where the woods start, south of the gate. */
  woods: [0, 0, 25] as Vec3,
  /** The front door of the house he calls his. */
  door: [-5.5, 0, -9.4] as Vec3,
  /** In the room: the bed, the chest, where the desk goes, where he stands, the doorway. */
  bed: [1.15, 0, -1.15] as Vec3,
  chest: [-1.45, 0, -1.85] as Vec3,
  desk: [-1.25, 0, 0.25] as Vec3,
  me: [-0.15, 0, 0.3] as Vec3,
  doorway: [-0.55, 0, -2.3] as Vec3,
};
/** [x, z, turn]: the middle of each front wall. Every house is the same house: that is a clue. */
export const HOUSES: Array<[number, number, number]> = [
  [-5.5, -10, 0],
  [0.6, -12, 0],
  [6.7, -10, 0],
  [11.5, -3.5, -Math.PI / 2],
  [11.5, 4.5, -Math.PI / 2],
  [-11.5, -3.5, Math.PI / 2],
  [-11.5, 4.5, Math.PI / 2],
];
export const HOUSE = { w: 5, h: 3.5, roof: "#8a3b2a" };
export const WALL = { x: 16.5, north: -17.5, south: 13, gate: 1.8, h: 2.6 };

// ----------------------------------------------------------------------------- the cast

/** The teller: a villager in a white robe with a librarian's red cap. `cap={false}`: before the desk. */
export const Me: React.FC<VillagerProps & { cap?: boolean }> = ({ cap = true, ...p }) => (
  <Villager
    robe={ROBE.white}
    phase={0.4}
    headwear={
      cap ? (
        <>
          <Block position={[0, 0.585, 0]} size={[0.47, 0.07, 0.47]} color="#b8322a" />
          <Block position={[0, 0.64, 0]} size={[0.3, 0.07, 0.3]} color="#d9443a" />
        </>
      ) : undefined
    }
    {...p}
  />
);
/** The old man who rings the bell: purple robe, white brows and a white beard. */
export const OldMan: React.FC<VillagerProps> = (p) => (
  <Villager
    robe={ROBE.elder}
    phase={2.1}
    headwear={
      <>
        <Block position={[0, 0.07, 0.2]} size={[0.47, 0.16, 0.1]} color="#e9e6dc" castShadow={false} />
        <Block position={[-0.2, 0.14, 0.12]} size={[0.08, 0.26, 0.24]} color="#e9e6dc" castShadow={false} />
        <Block position={[0.2, 0.14, 0.12]} size={[0.08, 0.26, 0.24]} color="#e9e6dc" castShadow={false} />
        <Block position={[0, 0.345, 0.232]} size={[0.38, 0.07, 0.02]} color="#f4f1ea" castShadow={false} />
      </>
    }
    {...p}
  />
);
export const GREEN = "#5f9a4e";
/** A zombie villager: the same face, green, in a torn brown robe. `k` 0–1 is how far he has got better. */
export const Green: React.FC<VillagerProps & { k?: number }> = ({ k = 0, ...p }) => {
  const mix = (a: number, b: number) => Math.round(a + (b - a) * k);
  const skin = `rgb(${mix(0x5f, 0xbd)},${mix(0x9a, 0x8b)},${mix(0x4e, 0x72)})`;
  return <Villager robe="#5b4a3a" skin={skin} phase={3.3} {...p} />;
};

type A = Partial<MinecraftAvatarProps>;
/** The stranger: a player, and he looks like the one everybody starts as. What he holds is a child, in his right hand. */
export const Stranger: React.FC<A & { omen?: number }> = ({ omen = 0, ...p }) => {
  const t = useFilmTime();
  return (
    <MinecraftAvatar
      outfit="tee"
      skin="#c98f6a"
      hair="#3a2416"
      colors={{ torso: "#19b0b0", arms: "#19b0b0", legs: "#3a3f9e" }}
      shoes="#6b6b6b"
      face="smile"
      blink
      phase={0.9}
      head={
        omen > 0 ? (
          <>
            {Array.from({ length: 9 }, (_, i) => {
              const a = t * 2.2 + i * 0.7;
              const r = 0.46 + (i % 3) * 0.1;
              return <Block key={i} position={[Math.sin(a) * r, 0.05 + ((t * 0.5 + i * 0.13) % 0.7), Math.cos(a) * r]} size={[0.13 * omen, 0.13 * omen, 0.13 * omen]} color={i % 2 ? "#aab3bd" : "#59626d"} castShadow={false} />;
            })}
          </>
        ) : undefined
      }
      {...p}
    />
  );
};

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

/** An iron pickaxe, the same way round as the axe. */
export const Pickaxe: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.36]} size={[0.07, 0.07, 0.95]} color="#6b4a2a" />
    <Block position={[0, 0, 0.8]} size={[0.07, 0.5, 0.1]} color="#dfe6ee" metalness={0.3} roughness={0.35} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[0, s * 0.3, 0.72]} size={[0.06, 0.14, 0.1]} color="#dfe6ee" metalness={0.3} roughness={0.35} />
    ))}
  </group>
);

/** The pickaxe he came up with: it glows. Held the way `Pickaxe` is. */
export const GlowPick: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0.36]} size={[0.07, 0.07, 0.95]} color="#6b4a2a" />
    <Block position={[0, 0, 0.8]} size={[0.07, 0.5, 0.1]} color="#6fe8e0" emissive="#b070ff" emissiveIntensity={1.1} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[0, s * 0.3, 0.72]} size={[0.06, 0.14, 0.1]} color="#6fe8e0" emissive="#b070ff" emissiveIntensity={1.1} />
    ))}
    <Glow position={[0, 0, 0.78]} size={1.1} color="#b070ff" opacity={0.4} />
  </group>
);
/** Somebody lying on their back on the floor, head to the north: put a standing figure inside. `position` is the feet. */
export const Lying: React.FC<{ position: Vec3; turn?: number; children: React.ReactNode }> = ({ position, turn = 0, children }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <group rotation={[-Math.PI / 2, 0, 0]}>{children}</group>
  </group>
);

/** A chest. `open` 0–1 lifts the lid; `bread` is how many loaves are in it. */
export const Chest: React.FC<{ position?: Vec3; rotationY?: number; open?: number; bread?: number }> = ({ position = PLACE.chest, rotationY = 0, open = 0, bread = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.3, 0]} size={[0.9, 0.6, 0.9]} color="#a06a2c" />
    <Block position={[0, 0.3, 0]} size={[0.92, 0.08, 0.92]} color="#5c3a18" castShadow={false} />
    <Block position={[0, 0.03, 0]} size={[0.92, 0.06, 0.92]} color="#5c3a18" castShadow={false} />
    {open > 0.05 ? <Block position={[0, 0.58, 0]} size={[0.8, 0.06, 0.8]} color="#2a1a0c" castShadow={false} /> : null}
    {open > 0.05 ? Array.from({ length: bread }, (_, i) => <Loaf key={i} position={[(i % 2 ? 0.16 : -0.16), 0.64, -0.15 + (i >> 1) * 0.3]} rotation={[0, i * 0.5, 0]} scale={0.6} />) : null}
    <group position={[0, 0.6, -0.45]} rotation={[-open * 1.75, 0, 0]}>
      <Block position={[0, 0.14, 0.45]} size={[0.9, 0.28, 0.9]} color="#b0782f" />
      <Block position={[0, 0.02, 0.45]} size={[0.92, 0.05, 0.92]} color="#5c3a18" castShadow={false} />
      <Block position={[0, 0.06, 0.92]} size={[0.14, 0.2, 0.06]} color="#cfd8e2" metalness={0.3} roughness={0.4} castShadow={false} />
    </group>
  </group>
);

/** The desk: a lectern, with a book open on it. It faces +Z. */
export const Lectern: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; book?: boolean }> = ({ position = PLACE.desk, rotationY = 0, scale = 1, book = true }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.06, 0]} size={[0.9, 0.12, 0.9]} color="#a37a44" />
      <Block position={[0, 0.5, 0]} size={[0.5, 0.78, 0.5]} color="#8a6234" />
      <Block position={[0, 0.5, 0.26]} size={[0.4, 0.5, 0.02]} color="#d9443a" castShadow={false} />
      <group position={[0, 0.95, 0]} rotation={[0.38, 0, 0]}>
        <Block position={[0, 0, 0]} size={[0.92, 0.14, 0.7]} color="#b48d52" />
        {book ? (
          <>
            <Block position={[-0.2, 0.1, 0]} size={[0.36, 0.05, 0.5]} color="#f4efe0" castShadow={false} />
            <Block position={[0.2, 0.1, 0]} size={[0.36, 0.05, 0.5]} color="#f4efe0" castShadow={false} />
            <Block position={[0, 0.085, 0]} size={[0.8, 0.03, 0.54]} color="#7a2f24" castShadow={false} />
          </>
        ) : null}
      </group>
    </group>
  );

/** A book, shut. */
export const Book: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; glow?: boolean }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, glow = false }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.3, 0.08, 0.38]} color={glow ? "#8a4fd0" : "#7a2f24"} emissive={glow ? "#b070ff" : undefined} emissiveIntensity={glow ? 0.8 : 0} />
    <Block position={[0.01, 0, 0]} size={[0.27, 0.05, 0.4]} color="#f4efe0" castShadow={false} />
  </group>
);

/** An emerald. */
export const Emerald: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.14, 0.22, 0.08]} color="#1fbf5a" emissive="#0f9a44" emissiveIntensity={0.55} />
    <Block position={[0, 0, 0.01]} size={[0.07, 0.3, 0.07]} color="#39e07a" emissive="#1fbf5a" emissiveIntensity={0.55} castShadow={false} />
    <Block position={[-0.02, 0.04, 0.045]} size={[0.04, 0.08, 0.01]} color="#d8ffe6" castShadow={false} />
  </group>
);

/** A golden apple. */
export const GoldenApple: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block size={[0.24, 0.22, 0.24]} color="#f2c43a" emissive="#e0a020" emissiveIntensity={0.6} />
    <Block position={[0, 0.02, 0]} size={[0.28, 0.14, 0.2]} color="#ffd95a" emissive="#e0a020" emissiveIntensity={0.6} castShadow={false} />
    <Block position={[0, 0.15, 0]} size={[0.04, 0.1, 0.04]} color="#5c3a18" castShadow={false} />
    <Block position={[0.06, 0.17, 0]} size={[0.1, 0.04, 0.05]} color="#3f8a34" castShadow={false} />
  </group>
);

/** A splash bottle: grey stuff in glass. */
export const Bottle: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number }> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block size={[0.2, 0.2, 0.2]} color="#6f7a86" emissive="#4b5560" emissiveIntensity={0.4} />
    <Block position={[0, 0.15, 0]} size={[0.09, 0.12, 0.09]} color="#cfe4ee" castShadow={false} />
    <Block position={[0, 0.22, 0]} size={[0.12, 0.04, 0.12]} color="#8a6234" castShadow={false} />
  </group>
);

/** The bed as a thing in a pocket: small, and it turns. */
export const MiniBed: React.FC<{ position?: Vec3; scale?: number; spin?: number }> = ({ position = [0, 0, 0], scale = 1, spin = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0.3, spin, 0]} scale={0.3 * scale}>
      <BedBox position={[0, -0.3, 0]} />
    </group>
  );

/** A bell. Its top is at the origin; `swing` is radians. In a hand it hangs from the hand. */
export const BellOnly: React.FC<{ position?: Vec3; swing?: number; scale?: number }> = ({ position = [0, 0, 0], swing = 0, scale = 1 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, 0, swing]} scale={scale}>
      <Block position={[0, -0.07, 0]} size={[0.16, 0.14, 0.16]} color="#c9a53a" metalness={0.5} roughness={0.35} />
      <Block position={[0, -0.3, 0]} size={[0.5, 0.36, 0.5]} color="#e3bf4a" metalness={0.5} roughness={0.35} />
      <Block position={[0, -0.5, 0]} size={[0.62, 0.1, 0.62]} color="#c9a53a" metalness={0.5} roughness={0.35} />
      <Block position={[0, -0.6, 0]} size={[0.1, 0.12, 0.1]} color="#5c3a18" castShadow={false} />
    </group>
  );

/** The bell's stand: a cobble step, two posts and a beam. `bell={false}`: he took it, and the hook is empty. */
export const BellStand: React.FC<{ position?: Vec3; bell?: boolean; swing?: number; scale?: number }> = ({ position = PLACE.bell, bell = true, swing = 0, scale = 1 }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 0.2, 0]} size={[2.4, 0.4, 1.4]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="log" position={[s * 0.85, 1.25, 0]} size={[0.3, 1.7, 0.3]} />
    ))}
    <Vox kind="darkPlanks" position={[0, 2.2, 0]} size={[2.2, 0.24, 0.36]} />
    <Block position={[0, 2.05, 0]} size={[0.06, 0.1, 0.06]} color="#2b2b2b" castShadow={false} />
    {bell ? <BellOnly position={[0, 2.02, 0]} swing={swing} scale={1.5 * scale} /> : null}
  </group>
);

/**
 * A boat. It points along +Z; its floor is 0.2 up. Whoever sits in it: put them at [0, 0.2 − 0.56·scale, ±0.45] of
 * the boat with `sit`. Players row boats over dry land, and so does this one.
 */
export const Boat: React.FC<{ position?: Vec3; rotationY?: number; row?: number; rock?: number; children?: React.ReactNode }> = ({ position = [0, 0, 0], rotationY = 0, row = 0, rock = 0, children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <group rotation={[0, 0, rock]}>
      <Block position={[0, 0.14, 0]} size={[1.1, 0.12, 2.3]} color="#a37a44" />
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.58, 0.36, 0]} size={[0.12, 0.44, 2.3]} color="#b48d52" />
      ))}
      <Block position={[0, 0.36, 1.2]} size={[1.28, 0.44, 0.12]} color="#b48d52" />
      <Block position={[0, 0.36, -1.2]} size={[1.28, 0.44, 0.12]} color="#b48d52" />
      {[-1, 1].map((s) => (
        <group key={`o${s}`} position={[s * 0.66, 0.56, 0.2]} rotation={[Math.sin(row * 6) * 0.7, 0, s * -0.9]}>
          <Block position={[0, -0.45, 0]} size={[0.07, 1.3, 0.07]} color="#8a6234" />
          <Block position={[0, -1.05, 0]} size={[0.07, 0.36, 0.26]} color="#8a6234" />
        </group>
      ))}
      {children}
    </group>
  </group>
);

/** A number over somebody's head: the count of a thing. */
export const Count: React.FC<{ position: Vec3; text: string; scale?: number; rotationY?: number; color?: string }> = ({ position, text, scale = 1, rotationY = 0, color = "#ffe27a" }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0, -0.03]} size={[0.26 + text.length * 0.3, 0.6, 0.04]} color="#1a1420" castShadow={false} />
    <PixelText text={text} position={[0, 0, 0]} height={0.36} color={color} />
  </group>
);

// ----------------------------------------------------------------------------- the town

const wallParts = (): Array<[Vec3, Vec3]> => {
  const out: Array<[Vec3, Vec3]> = [];
  const { x, north, south, gate, h } = WALL;
  const run = (ax: number, az: number, bx: number, bz: number) => {
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.round(len / 4.2));
    for (let i = 0; i < n; i += 1) {
      const k = (i + 0.5) / n;
      out.push([[ax + (bx - ax) * k, h / 2, az + (bz - az) * k], bx === ax ? [0.8, h, len / n + 0.02] : [len / n + 0.02, h, 0.8]]);
    }
  };
  run(-gate, south, -x, south);
  run(gate, south, x, south);
  run(x, south, x, north);
  run(-x, south, -x, north);
  run(-x, north, x, north);
  return out;
};
export const WALLS = wallParts();
/** The wall he built round the town: cobble, with one gate. `grow(i)` 0–1 is how far part i has come up. */
export const Wall: React.FC<{ grow?: (i: number) => number; arrows?: boolean }> = ({ grow = () => 1, arrows = false }) => (
  <>
    {WALLS.map(([p, s], i) => {
      const g = Math.max(0, Math.min(1, grow(i)));
      return g <= 0.01 ? null : (
        <group key={i} position={[p[0], 0, p[2]]} scale={[1, g, 1]}>
          <Vox kind="cobble" position={[0, p[1], 0]} size={s} />
          <Vox kind="stoneBrick" position={[0, s[1] + 0.12, 0]} size={[s[0] + 0.14, 0.24, s[2] + 0.14]} />
        </group>
      );
    })}
    {/* the gate posts */}
    {[-1, 1].map((s) =>
      grow(s < 0 ? 0 : 4) > 0.5 ? <Vox key={s} kind="log" position={[s * WALL.gate, 1.6, WALL.south]} size={[0.5, 3.2, 1]} /> : null,
    )}
    {arrows
      ? Array.from({ length: 9 }, (_, i) => (
          <group key={`a${i}`} position={[(i % 2 ? 1 : -1) * (2.4 + rnd(i, 1) * 4), 0.8 + rnd(i, 2) * 1.4, WALL.south + 0.42]} rotation={[0.2 - rnd(i, 3) * 0.5, rnd(i, 4) * 0.4 - 0.2, 0]}>
            <Block position={[0, 0, 0.2]} size={[0.04, 0.04, 0.5]} color="#d9d2c0" castShadow={false} />
            <Block position={[0, 0, 0.47]} size={[0.12, 0.12, 0.06]} color="#e9e6dc" castShadow={false} />
          </group>
        ))
      : null}
  </>
);

/** Where he put torches: the path, the well, the roofs, the bell. Everything. */
export const TORCHES: Vec3[] = [
  [-2.4, 0, -1.4], [2.4, 0, -1.4], [-2.4, 0, 3.6], [2.4, 0, 3.6], [0, 0, 6.4], [-3.6, 0, -6], [3.6, 0, -6], [-1.6, 0, 9.4], [1.6, 0, 9.4],
  [PLACE.well[0] - 0.9, 1.05, PLACE.well[2] + 0.9], [PLACE.well[0] + 0.9, 1.05, PLACE.well[2] + 0.9],
  [-7.2, HOUSE.h + 0.25, -9.5], [-3.8, HOUSE.h + 0.25, -9.5], [-1.1, HOUSE.h + 0.25, -11.5], [2.3, HOUSE.h + 0.25, -11.5], [5, HOUSE.h + 0.25, -9.5], [8.4, HOUSE.h + 0.25, -9.5],
  [-8.4, 0, -1.2], [8.4, 0, 1.2], [-8.6, 0, 7], [8.6, 0, 7], [-5, 0, 10.4], [5, 0, 10.4],
];
export const Torches: React.FC<{ grow?: (i: number) => number; light?: boolean }> = ({ grow = () => 1, light = false }) => (
  <>
    {TORCHES.map((p, i) => {
      const g = Math.max(0, Math.min(1, grow(i)));
      return g <= 0.01 ? null : (
        <group key={i} position={p} scale={g}>
          <Torch position={[0, 0, 0]} seed={i + 3} light={light && i % 5 === 0 ? 7 : 0} />
        </group>
      );
    })}
  </>
);

/**
 * The things in the square that change. `bell`: it is on its stand. `hole`: he has dug it. `wheat` 0–1: how much is
 * still standing. `torches`, `wall`: built. The houses, the well and the ground are the zone's (world.tsx).
 */
export const Town: React.FC<{ bell?: boolean; swing?: number; hole?: boolean; wheat?: number; torches?: boolean; wall?: boolean; arrows?: boolean; light?: boolean }> = ({
  bell = false, swing = 0, hole = true, wheat = 0.12, torches = true, wall = true, arrows = false, light = false,
}) => (
  <>
    <BellStand bell={bell} swing={swing} />
    {hole ? <Hole position={[PLACE.hole[0], 0.045, PLACE.hole[2]]} size={1.1} /> : null}
    <Wheat position={PLACE.field} size={[4.6, 4.6]} height={0.12 + 0.78 * wheat} sway={wheat} seed={4} />
    {torches ? <Torches light={light} /> : null}
    {wall ? <Wall arrows={arrows} /> : null}
  </>
);

/** The houses: seven, and all the same. `n`: how many are built. */
export const Houses: React.FC<{ n?: number; lit?: boolean; grow?: (i: number) => number }> = ({ n = HOUSES.length, lit = false, grow = () => 1 }) => (
  <>
    {HOUSES.slice(0, n).map(([x, z, turn], i) => {
      const g = Math.max(0, grow(i));
      return g <= 0.01 ? null : (
        <group key={i} position={[x, 0, z]} scale={[1, g, 1]}>
          <Hut at={[0, 0, 0]} w={HOUSE.w} h={HOUSE.h} turn={turn} roof={HOUSE.roof} wall="planks" windows={[-HOUSE.w / 2 + 1.1, HOUSE.w / 2 - 1.1]} lit={lit} />
        </group>
      );
    })}
  </>
);
export const WellAt: React.FC = () => <Well position={PLACE.well} />;

const FOLK: Array<[number, number, number, string, boolean]> = [
  [-3.2, -3.2, 1, ROBE.brown, false],
  [3.4, -4.4, -1, ROBE.blue, false],
  [-3.6, 5.6, 1, ROBE.farmer, false],
  [4.6, 4.6, -1, ROBE.red, false],
  [1.4, -7.6, 1, ROBE.friend, true],
  [-1.8, -8.2, -1, ROBE.smith, false],
];
/** The town going about its day: villagers strolling to and fro. `look` makes them all look at one point. */
export const Life: React.FC<{ t: number; n?: number; look?: Vec3; still?: boolean }> = ({ t, n = 5, look, still = false }) => (
  <>
    {FOLK.slice(0, n).map(([x, z, dir, robe, kid], i) => {
      const swing = still ? 0 : Math.sin(t * 0.5 + i * 1.7);
      const vx = Math.cos(t * 0.5 + i * 1.7) * dir;
      return <Villager key={i} position={[x + swing * 1.1 * dir, 0, z]} rotationY={still ? 0 : vx > 0 ? Math.PI / 2 : -Math.PI / 2} walk={still ? 0 : swing * 1.1 + 3} robe={robe} kid={kid} scale={kid ? 0.7 : 0.94} lookAt={look} phase={i} />;
    })}
  </>
);

// ----------------------------------------------------------------------------- the room

/**
 * His room. Open to the south (the lens), 4.6 wide and 4.6 deep, plank floor, a window over the bed, a doorway in
 * the back wall on the left. `bed`: it is still there (`false` leaves its pale mark on the floor). `door`: `"up"`
 * hangs in the doorway, `"flat"` lies on the floor where he walked over it. `desk` 0–1. `torches`: on the floor.
 */
export const MyRoom: React.FC<{ bed?: boolean; door?: "up" | "flat"; desk?: number; torches?: number; chest?: number; bread?: number; night?: boolean }> = ({
  bed = false, door = "flat", desk = 0, torches = 0, chest = 0, bread = 0, night = false,
}) => {
  const wall = "#b08a56";
  return (
    <group>
      <Vox kind="planks" position={[0, -0.1, 0]} size={[4.6, 0.2, 4.6]} />
      {/* back wall, with the doorway cut out on the left and a window on the right */}
      <Block position={[-1.75, 1.7, -2.4]} size={[1.1, 3.4, 0.2]} color={wall} castShadow={false} />
      <Block position={[1.15, 1.7, -2.4]} size={[2.3, 3.4, 0.2]} color={wall} castShadow={false} />
      <Block position={[-0.6, 2.8, -2.4]} size={[1.2, 1.2, 0.2]} color={wall} castShadow={false} />
      <Block position={[-0.6, 1.1, -2.46]} size={[1.2, 2.2, 0.04]} color={night ? "#1a2238" : "#bfe6ff"} emissive={night ? "#1a2238" : "#bfe6ff"} emissiveIntensity={night ? 0.3 : 0.9} castShadow={false} />
      <Block position={[1.2, 2.15, -2.29]} size={[0.9, 0.9, 0.04]} color={night ? "#1a2238" : "#bfe6ff"} emissive={night ? "#1a2238" : "#bfe6ff"} emissiveIntensity={night ? 0.3 : 0.9} castShadow={false} />
      <Block position={[1.2, 2.15, -2.27]} size={[1.02, 0.08, 0.03]} color="#5c3f24" castShadow={false} />
      <Block position={[1.2, 2.15, -2.27]} size={[0.08, 1.02, 0.03]} color="#5c3f24" castShadow={false} />
      {[0.9, 1.8, 2.7].map((y) => (
        <Block key={y} position={[0, y, -2.295]} size={[4.6, 0.03, 0.02]} color="#8f6c3e" castShadow={false} />
      ))}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block position={[s * 2.4, 1.7, 0]} size={[0.2, 3.4, 4.6]} color={s < 0 ? "#a5804e" : "#a07a48"} castShadow={false} />
          {[0.9, 1.8, 2.7].map((y) => (
            <Block key={y} position={[s * 2.295, y, 0]} size={[0.02, 0.03, 4.6]} color="#8f6c3e" castShadow={false} />
          ))}
        </group>
      ))}
      {door === "up" ? (
        <Block position={[-0.6, 1.1, -2.3]} size={[1.1, 2.2, 0.1]} color="#7a5632" />
      ) : (
        <group position={[-0.6, 0.06, -1.2]} rotation={[0, 0.12, 0]}>
          <Block size={[1.1, 0.1, 2.1]} color="#7a5632" />
          <Block position={[0.3, 0.06, 0.3]} size={[0.1, 0.02, 0.1]} color="#cfd8e2" castShadow={false} />
          <Block position={[-0.1, 0.06, -0.3]} size={[0.26, 0.012, 0.5]} color="#4a3520" castShadow={false} />
        </group>
      )}
      {bed ? <BedBox position={PLACE.bed} /> : <Block position={[PLACE.bed[0], 0.012, PLACE.bed[2]]} size={[1.2, 0.02, 2.3]} color="#d8b77c" castShadow={false} />}
      <Chest open={chest} bread={bread} />
      <Lectern scale={desk} />
      {Array.from({ length: Math.round(torches) }, (_, i) => (
        <Torch key={i} position={[-1.9 + (i % 4) * 1.25 + ((i >> 2) % 2) * 0.5, 0, -0.5 + (i >> 2) * 0.8]} seed={i + 1} light={i === 2 ? 4 : 0} />
      ))}
    </group>
  );
};

// ============================================================================= film 4: the trader with forty minutes
//
// The town above is the one from "A Stranger Moved Into My House", without its hole and its wall: a square, a bell, a
// well, wheat, seven houses. What this film adds: the wandering trader, his two llamas, his shop, three villagers who
// each have a shop of their own, a player, a kid and his mum, and the clock.

export const SPOT = {
  /** Where the trader stands: in the square, facing the lens. His shop is on his left hand, his llamas behind him. */
  me: [0, 0, 3.0] as Vec3,
  shop: [1.15, 0, 3.2] as Vec3,
  llamaA: [-0.95, 0, 1.5] as Vec3,
  llamaB: [0.75, 0, 1.2] as Vec3,
  baker: [-2.6, 0, -1.6] as Vec3,
  fisher: [2.9, 0, -0.9] as Vec3,
  farmer: [-2.9, 0, 4.9] as Vec3,
  /** The kid's house is the first one (north west): its front wall is at z -10. */
  home: [-5.5, 0, -7.4] as Vec3,
};
export const mmss = (sec: number) => {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
/** The clock over his head. `sec`: seconds left. It goes red under three minutes. (The pixel font has no colon: it is two blocks.) */
export const Clock: React.FC<{ position: Vec3; sec: number; scale?: number; rotationY?: number }> = ({ position, sec, scale = 0.7, rotationY = 0 }) => {
  const s = Math.max(0, Math.round(sec));
  const color = s <= 180 ? "#ff6a5a" : "#ffe27a";
  const mm = String(Math.floor(s / 60));
  const ss = String(s % 60).padStart(2, "0");
  const beat = s <= 180 && s > 0 ? 1 + 0.08 * Math.max(0, Math.sin(sec * Math.PI * 2)) : 1;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale * beat}>
      <Block position={[0, 0, -0.04]} size={[1.92, 0.66, 0.04]} color={s <= 180 ? "#3a1014" : "#1a1420"} castShadow={false} />
      <Block position={[0, 0, -0.05]} size={[2.02, 0.76, 0.03]} color="#e8b93a" castShadow={false} />
      <PixelText text={mm} position={[-0.08 - mm.length * 0.17, 0, 0]} height={0.4} color={color} />
      <PixelText text={ss} position={[0.46, 0, 0]} height={0.4} color={color} />
      <Block position={[0.03, 0.09, 0]} size={[0.07, 0.07, 0.01]} color={color} emissive={color} emissiveIntensity={1} castShadow={false} />
      <Block position={[0.03, -0.09, 0]} size={[0.07, 0.07, 0.01]} color={color} emissive={color} emissiveIntensity={1} castShadow={false} />
    </group>
  );
};

const TRADER_BLUE = "#2f55a4";
/** A villager's nose hangs down to his sleeves: anything carried is set a hand lower, so it never covers his face. */
const low = (c: React.ReactNode) => (c ? <group position={[0, -0.25, 0.03]}>{c}</group> : undefined);
/** A villager who carries things under his nose and not on it. */
export const Person: React.FC<VillagerProps> = (p) => <Villager {...p} carry={low(p.carry)} />;
/** The wandering trader: a villager in a blue robe with a blue hood trimmed in gold. */
export const Trader: React.FC<VillagerProps> = (p) => (
  <Villager
    robe={TRADER_BLUE}
    phase={1.3}
    headwear={
      <>
        <Block position={[0, 0.56, -0.02]} size={[0.5, 0.1, 0.5]} color={TRADER_BLUE} castShadow={false} />
        <Block position={[0, 0.3, -0.24]} size={[0.5, 0.52, 0.06]} color={TRADER_BLUE} castShadow={false} />
        <Block position={[-0.245, 0.34, -0.04]} size={[0.05, 0.44, 0.36]} color={TRADER_BLUE} castShadow={false} />
        <Block position={[0.245, 0.34, -0.04]} size={[0.05, 0.44, 0.36]} color={TRADER_BLUE} castShadow={false} />
        <Block position={[0, 0.535, 0.235]} size={[0.5, 0.07, 0.03]} color="#e8b93a" castShadow={false} />
      </>
    }
    {...p}
    carry={low(p.carry)}
  />
);
export const Kid: React.FC<VillagerProps> = (p) => <Villager robe="#d8a82a" kid scale={0.68} phase={2.6} {...p} carry={low(p.carry)} />;
/** His mum: a red robe and a white headscarf. */
export const Mum: React.FC<VillagerProps> = (p) => (
  <Villager
    robe={ROBE.red}
    phase={0.2}
    headwear={
      <>
        <Block position={[0, 0.56, 0]} size={[0.48, 0.08, 0.48]} color="#efe9da" castShadow={false} />
        <Block position={[0, 0.34, -0.235]} size={[0.48, 0.44, 0.05]} color="#efe9da" castShadow={false} />
      </>
    }
    {...p}
    carry={low(p.carry)}
  />
);
/** The customer: a player in an orange shirt. A child is held in his right hand. */
export const Player: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#c98f6a" hair="#5a3a1c" colors={{ torso: "#e07a2a", arms: "#e07a2a", legs: "#2f3a5a" }} shoes="#4a4a4a" face="smile" blink phase={0.5} {...p} />
);

/** A trader llama: cream or brown, with a blue and gold blanket. Faces +Z. `chew` and `look` (head yaw) are radians. */
export const Llama: React.FC<{ position: Vec3; rotationY?: number; scale?: number; coat?: string; walk?: number; look?: number; nod?: number; t?: number }> = ({
  position, rotationY = 0, scale = 1, coat = "#e9dcc0", walk = 0, look = 0, nod = 0, t = 0,
}) => {
  const dark = "#6b5a44";
  const swing = Math.sin(walk * 4.4) * 0.45;
  const chew = Math.sin(t * 9) * 0.015;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {([[-0.17, 0.42, swing], [0.17, 0.42, -swing], [-0.17, -0.42, -swing], [0.17, -0.42, swing]] as Array<[number, number, number]>).map(([x, z, a], i) => (
        <group key={i} position={[x, 0.72, z]} rotation={[a, 0, 0]}>
          <Block position={[0, -0.36, 0]} size={[0.17, 0.72, 0.17]} color={coat} />
          <Block position={[0, -0.68, 0]} size={[0.18, 0.08, 0.18]} color={dark} castShadow={false} />
        </group>
      ))}
      <Block position={[0, 1.0, 0]} size={[0.58, 0.6, 1.12]} color={coat} />
      {/* the blanket */}
      <Block position={[0, 1.02, -0.05]} size={[0.62, 0.6, 0.6]} color="#2f55a4" castShadow={false} />
      <Block position={[0, 1.02, -0.05]} size={[0.63, 0.14, 0.61]} color="#e8b93a" castShadow={false} />
      <Block position={[0, 1.33, -0.05]} size={[0.36, 0.06, 0.44]} color="#b8322a" castShadow={false} />
      <group position={[0, 1.2, 0.5]} rotation={[nod, look, 0]}>
        <Block position={[0, 0.42, 0]} size={[0.3, 0.9, 0.3]} color={coat} />
        <group position={[0, 0.9, 0.06]}>
          <Block position={[0, 0.06, 0]} size={[0.36, 0.34, 0.4]} color={coat} />
          <Block position={[0, -0.02 + chew, 0.26]} size={[0.22, 0.2, 0.16]} color="#f6efe0" castShadow={false} />
          <Block position={[0, 0.02, 0.345]} size={[0.1, 0.05, 0.01]} color="#3a2c22" castShadow={false} />
          <Block position={[-0.1, 0.12, 0.205]} size={[0.07, 0.07, 0.01]} color="#15151a" castShadow={false} />
          <Block position={[0.1, 0.12, 0.205]} size={[0.07, 0.07, 0.01]} color="#15151a" castShadow={false} />
          <Block position={[-0.13, 0.3, -0.08]} size={[0.08, 0.16, 0.08]} color={coat} castShadow={false} />
          <Block position={[0.13, 0.3, -0.08]} size={[0.08, 0.16, 0.08]} color={coat} castShadow={false} />
        </group>
      </group>
      <Block position={[0, 1.1, -0.6]} size={[0.12, 0.14, 0.1]} color={coat} castShadow={false} />
    </group>
  );
};
/** A lead: a thin brown line between two points. */
export const Lead: React.FC<{ a: Vec3; b: Vec3 }> = ({ a, b }) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz) || 0.001;
  return (
    <group position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
      <group rotation={[-Math.asin(dy / len), 0, 0]}>
        <Block size={[0.045, 0.045, len]} color="#8a6234" castShadow={false} />
      </group>
    </group>
  );
};

type Thing = { position?: Vec3; rotation?: Vec3; scale?: number };
const at = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: Thing) => ({ position, rotation, scale });
/** A sapling: a stick with four leaves. `position` is its foot. */
export const Sapling: React.FC<Thing> = (p) => (
  <group {...at(p)}>
    <Block position={[0, 0.14, 0]} size={[0.05, 0.28, 0.05]} color="#6b4a2a" castShadow={false} />
    <Block position={[0, 0.3, 0]} size={[0.26, 0.12, 0.26]} color="#3f9a34" />
    <Block position={[0, 0.4, 0]} size={[0.16, 0.1, 0.16]} color="#57b848" castShadow={false} />
  </group>
);
/** A slime ball. */
export const SlimeBall: React.FC<Thing> = (p) => (
  <group {...at(p)}>
    <Block position={[0, 0.11, 0]} size={[0.22, 0.22, 0.22]} color="#7fd65a" emissive="#4fa83a" emissiveIntensity={0.35} />
    <Block position={[-0.04, 0.16, 0.112]} size={[0.07, 0.07, 0.01]} color="#d8ffc8" castShadow={false} />
  </group>
);
/** A fish in a bucket: a small orange fish. `big`: the fisherman's, which is a better fish. */
export const FishBucket: React.FC<Thing> = (p) => (
  <group {...at(p)}>
    <Block position={[0, 0.12, 0]} size={[0.26, 0.24, 0.26]} color="#aab3bd" />
    <Block position={[0, 0.245, 0]} size={[0.2, 0.01, 0.2]} color="#3f7fd8" castShadow={false} />
    <Block position={[0, 0.28, 0]} size={[0.14, 0.07, 0.05]} color="#f08a2a" castShadow={false} />
    <Block position={[-0.09, 0.28, 0]} size={[0.05, 0.1, 0.03]} color="#f08a2a" castShadow={false} />
  </group>
);
export const Fish: React.FC<Thing> = (p) => (
  <group {...at(p)}>
    <Block position={[0, 0.08, 0]} size={[0.5, 0.2, 0.1]} color="#6f9ad0" />
    <Block position={[-0.3, 0.08, 0]} size={[0.12, 0.26, 0.06]} color="#4f7ab8" castShadow={false} />
    <Block position={[0.17, 0.11, 0.052]} size={[0.05, 0.05, 0.01]} color="#15151a" castShadow={false} />
    <Block position={[0, 0.03, 0]} size={[0.3, 0.06, 0.11]} color="#e9eef4" castShadow={false} />
  </group>
);
/** The dead bush: brown twigs, and that is all. */
export const DeadBush: React.FC<Thing & { pot?: boolean }> = ({ pot = false, ...p }) => (
  <group {...at(p)}>
    {pot ? <Block position={[0, 0.09, 0]} size={[0.26, 0.18, 0.26]} color="#a8553a" /> : null}
    <group position={[0, pot ? 0.18 : 0, 0]}>
      <Block position={[0, 0.14, 0]} size={[0.05, 0.28, 0.05]} color="#7a5a34" castShadow={false} />
      <Block position={[-0.1, 0.24, 0]} rotation={[0, 0, 0.8]} size={[0.04, 0.26, 0.04]} color="#8a6a3e" castShadow={false} />
      <Block position={[0.1, 0.27, 0]} rotation={[0, 0, -0.7]} size={[0.04, 0.28, 0.04]} color="#7a5a34" castShadow={false} />
      <Block position={[0.02, 0.3, 0.09]} rotation={[0.7, 0, 0]} size={[0.04, 0.22, 0.04]} color="#8a6a3e" castShadow={false} />
      <Block position={[-0.03, 0.26, -0.09]} rotation={[-0.8, 0, 0.2]} size={[0.04, 0.2, 0.04]} color="#6b4e2c" castShadow={false} />
    </group>
  </group>
);
export const Carrot: React.FC<Thing> = (p) => (
  <group {...at(p)}>
    <Block position={[0, 0.06, 0]} size={[0.34, 0.1, 0.1]} color="#f08a2a" />
    <Block position={[0.2, 0.06, 0]} size={[0.1, 0.14, 0.06]} color="#3f9a34" castShadow={false} />
  </group>
);
/** A market stall: a plank table with two posts and a striped roof. 1.3 wide. `position` is the ground under its middle; it faces +Z. */
export const Stall: React.FC<{ position: Vec3; rotationY?: number; cloth?: string; children?: React.ReactNode }> = ({ position, rotationY = 0, cloth = "#b8322a", children }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.35, 0]} size={[1.3, 0.7, 0.6]} />
    <Vox kind="log" position={[-0.6, 1.0, -0.25]} size={[0.1, 2.0, 0.1]} />
    <Vox kind="log" position={[0.6, 1.0, -0.25]} size={[0.1, 2.0, 0.1]} />
    {Array.from({ length: 5 }, (_, i) => (
      <Block key={i} position={[-0.56 + i * 0.28, 2.04, 0]} rotation={[0.22, 0, 0]} size={[0.28, 0.06, 0.9]} color={i % 2 ? "#f2ead8" : cloth} />
    ))}
    <group position={[0, 0.7, 0.05]}>{children}</group>
  </group>
);
/** His shop, with what is still on it. The price is on a card at the front. */
export const Shop: React.FC<{ position?: Vec3; rotationY?: number; sapling?: boolean; slime?: boolean; fish?: boolean; bush?: boolean; price?: string; lift?: [number, number, number, number] }> = ({
  position = SPOT.shop, rotationY = 0, sapling = true, slime = true, fish = true, bush = true, price = "5", lift = [0, 0, 0, 0],
}) => (
  <Stall position={position} rotationY={rotationY} cloth="#2f55a4">
    {sapling ? <Sapling position={[-0.46, lift[0], 0]} /> : null}
    {slime ? <SlimeBall position={[-0.16, lift[1], 0.02]} /> : null}
    {fish ? <FishBucket position={[0.16, lift[2], 0]} /> : null}
    {bush ? <DeadBush position={[0.46, lift[3], 0]} /> : null}
    {price ? (
      <group position={[0, -0.3, 0.33]}>
        <Count position={[-0.08, 0, 0]} text={price} scale={0.42} />
        <Emerald position={[0.16, 0, 0.02]} scale={0.7} />
      </group>
    ) : null}
  </Stall>
);
const VENDOR = {
  baker: { robe: ROBE.white, cloth: "#c9862a", spot: SPOT.baker, turn: 0.5 },
  fisher: { robe: "#2e8f88", cloth: "#3f7f9a", spot: SPOT.fisher, turn: -0.5 },
  farmer: { robe: ROBE.farmer, cloth: "#5f9a3a", spot: SPOT.farmer, turn: 1.2 },
} as const;
export type Who = keyof typeof VENDOR;
/** A villager with a shop of his own. He stands behind it. `away`: he has left it (the scene draws him). */
export const Vendor: React.FC<VillagerProps & { who: Who; away?: boolean; goods?: boolean }> = ({ who, away = false, goods = true, ...p }) => {
  const v = VENDOR[who];
  const [x, , z] = v.spot;
  const back: Vec3 = [x - Math.sin(v.turn) * 0.75, 0, z - Math.cos(v.turn) * 0.75];
  return (
    <>
      <Stall position={v.spot} rotationY={v.turn} cloth={v.cloth}>
        {goods && who === "baker" ? (<><Loaf position={[-0.3, 0, 0]} /><Loaf position={[0.25, 0, 0.05]} rotation={[0, 0.5, 0]} /></>) : null}
        {goods && who === "fisher" ? (<><Fish position={[-0.2, 0, 0]} /><Fish position={[0.3, 0.0, 0.1]} rotation={[0, 0.4, 0]} scale={0.8} /></>) : null}
        {goods && who === "farmer" ? (<><Carrot position={[-0.3, 0, 0]} /><Carrot position={[0.05, 0, 0.08]} rotation={[0, 0.6, 0]} /><Carrot position={[0.35, 0, -0.02]} rotation={[0, -0.4, 0]} /></>) : null}
      </Stall>
      {away ? null : <Villager position={back} rotationY={v.turn} robe={v.robe} hat={who === "farmer" ? "straw" : "none"} phase={who.length} {...p} carry={low(p.carry)} />}
    </>
  );
};
/** Where a vendor stands behind his stall, and the robe he wears: for a scene that walks him somewhere. */
export const vendorAt = (who: Who): { position: Vec3; rotationY: number; robe: string } => {
  const v = VENDOR[who];
  return { position: [v.spot[0] - Math.sin(v.turn) * 0.75, 0, v.spot[2] - Math.cos(v.turn) * 0.75], rotationY: v.turn, robe: v.robe };
};
/** The square, dressed: bell, torches, wheat, the three shops and a few people on their way somewhere. */
export const Square: React.FC<{ t: number; night?: boolean; folk?: number; look?: Vec3; still?: boolean; vendors?: boolean; away?: Who[]; vendorLook?: Vec3 }> = ({
  t, night = false, folk = 4, look, still = false, vendors = true, away = [], vendorLook,
}) => (
  <>
    <Town bell hole={false} wall={false} wheat={0.9} torches light={night} />
    {vendors ? (["baker", "fisher", "farmer"] as Who[]).map((who) => <Vendor key={who} who={who} away={away.includes(who)} lookAt={vendorLook} />) : null}
    {folk > 0 ? <Crowd t={t} n={folk} look={look} still={still} /> : null}
  </>
);
/** The potion's grey swirl, where somebody invisible is standing. */
export const Swirl: React.FC<{ position: Vec3; t: number; k?: number }> = ({ position, t, k = 1 }) => (
  <group position={position}>
    {Array.from({ length: 10 }, (_, i) => {
      const a = t * 2.4 + i * 0.63;
      const r = 0.34 + (i % 3) * 0.09;
      return <Block key={i} position={[Math.sin(a) * r, 0.2 + ((t * 0.45 + i * 0.17) % 1.6), Math.cos(a) * r]} size={[0.08 * k, 0.08 * k, 0.08 * k]} color={i % 2 ? "#cfd6e4" : "#8f98ac"} castShadow={false} />;
    })}
  </group>
);

/** Seconds left on his clock when each shot starts. It ticks one second a second inside a shot, and jumps between them. */
export const LEFT: Record<string, number> = {
  "1.forty": 2400, "1.sell": 2396, "1.llamas": 2392, "1.clock": 2387, "1.where": 2383, "2.goods": 2340, "2.bush": 2334, "2.five": 2330, "2.nine": 2322, "2.sold": 2300, "2.think": 2296,
  "3.town": 2105, "3.baker": 2052, "3.fisher": 1990, "3.same": 1984, "3.farmer": 1925, "3.salesmen": 1880, "3.clock": 1861.2,
  "4.player": 1500, "4.looked": 1494, "4.took": 1488, "4.pay": 1483, "4.gone": 1470, "5.night": 905, "5.potion": 790, "5.invisible": 725, "5.clock": 541.5, "5.alone": 470,
  "6.kid": 181.2, "6.see": 177, "6.said": 173, "6.want": 169, "6.one": 164, "6.looked": 159, "6.deal": 154, "6.first": 148, "6.home": 143,
  "7.tell": 133, "7.right": 129, "7.two": 121, "7.buy": 100, "7.bread": 86, "7.round": 62, "7.town": 46, "7.why": 36, "7.lights": 26, "7.back": 15, "7.zero": 3.3, "7.poof": 0,
  "8.next": 2400, "8.know": 2394, "8.sub": 2388,
};
export const left = (cue: string, t: number) => Math.max(0, (LEFT[cue] ?? 0) - t);

/**
 * The trader with his clock over his head. `cue` and `t` set the clock. `face`: the yaw (radians) of the shot, so the
 * clock faces it. `ghost`: he has drunk the potion: only the swirl and the clock are there.
 */
export const Him: React.FC<VillagerProps & { cue: string; t: number; face?: number; ghost?: boolean; clock?: boolean; clockScale?: number; rise?: number }> = ({
  cue, t, face = 0, ghost = false, clock = true, clockScale = 0.62, rise = 0, position = SPOT.me, ...p
}) => (
  <>
    {ghost ? <Swirl position={position} t={t} /> : <Trader position={[position[0], position[1] + rise, position[2]]} {...p} />}
    {clock ? <Clock position={[position[0], 2.55 + rise, position[2]]} sec={left(cue, t)} scale={clockScale} rotationY={face} /> : null}
  </>
);
export const POST: Vec3 = [-0.1, 0, 0.75];
/** The post his llamas are tied to. `cut`: the leads have been taken; two short ends hang from it. */
export const Post: React.FC<{ cut?: boolean }> = ({ cut = false }) => (
  <group position={POST}>
    <Vox kind="log" position={[0, 0.65, 0]} size={[0.2, 1.3, 0.2]} />
    <Block position={[0, 1.1, 0]} size={[0.26, 0.08, 0.26]} color="#8a6234" castShadow={false} />
    {cut ? (
      <>
        <Block position={[-0.13, 0.9, 0.05]} rotation={[0, 0, 0.2]} size={[0.045, 0.42, 0.045]} color="#8a6234" castShadow={false} />
        <Block position={[0.13, 0.84, 0.05]} rotation={[0, 0, -0.25]} size={[0.045, 0.52, 0.045]} color="#8a6234" castShadow={false} />
      </>
    ) : null}
  </group>
);
/** His two llamas, tied to their post behind him. `look`: head yaw of each. */
export const Llamas: React.FC<{ t: number; look?: [number, number]; nod?: number }> = ({ t, look = [0.15, -0.2], nod = 0 }) => (
  <>
    <Post />
    <Llama position={SPOT.llamaA} rotationY={0.25} t={t} look={look[0]} nod={nod} />
    <Llama position={SPOT.llamaB} rotationY={-0.3} coat="#9a7a56" t={t + 0.4} look={look[1]} nod={nod} />
    <Lead a={[POST[0], 1.1, POST[2]]} b={[SPOT.llamaA[0] + 0.1, 1.45, SPOT.llamaA[2] + 0.45]} />
    <Lead a={[POST[0], 1.1, POST[2]]} b={[SPOT.llamaB[0] - 0.1, 1.45, SPOT.llamaB[2] + 0.45]} />
  </>
);
/** Where a customer stands in front of a vendor's shop, facing him; and the yaw (degrees) of a lens that sees both from the side. */
export const front = (who: Who, d = 1.2): { position: Vec3; rotationY: number } => {
  const v = VENDOR[who];
  return { position: [v.spot[0] + Math.sin(v.turn) * d, 0, v.spot[2] + Math.cos(v.turn) * d], rotationY: v.turn + Math.PI };
};
/** The lens sits at `on + dist * (sin yaw, 0, cos yaw)`: a positive yaw puts it to the EAST of what it looks at. */
export const sideYaw = (who: Who, flip = 1) => ((VENDOR[who].turn - (Math.PI / 2) * flip) * 180) / Math.PI;
export const stallOf = (who: Who): Vec3 => VENDOR[who].spot;
/** People with somewhere to be: they stroll to and fro at the edges of the square, away from the three shops. */
const CROWD: Array<[number, number, number, string, boolean]> = [
  [-5.4, 1.6, 1, ROBE.brown, false],
  [5.2, 0.4, -1, ROBE.red, false],
  [3.6, 6.6, -1, ROBE.smith, false],
  [-1.2, -7.8, 1, ROBE.elder, false],
  [5.8, -6.4, -1, ROBE.brown, false],
  [-5.8, -5.8, 1, ROBE.red, true],
];
export const Crowd: React.FC<{ t: number; n?: number; look?: Vec3; still?: boolean }> = ({ t, n = 4, look, still = false }) => (
  <>
    {CROWD.slice(0, n).map(([x, z, dir, robe, kid], i) => {
      const swing = still ? 0 : Math.sin(t * 0.5 + i * 1.7);
      const vx = Math.cos(t * 0.5 + i * 1.7) * dir;
      return <Villager key={i} position={[x + swing * 1.1 * dir, 0, z]} rotationY={still ? 0 : vx > 0 ? Math.PI / 2 : -Math.PI / 2} walk={still ? 0 : swing * 1.1 + 3} robe={robe} kid={kid} scale={kid ? 0.7 : 0.94} lookAt={look} phase={i} />;
    })}
  </>
);
/** A pixel heart. */
export const Heart: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({ position, scale = 1, rotationY = 0 }) =>
  scale <= 0.01 ? null : (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {(["01101100", "11111110", "11111110", "01111100", "00111000", "00010000"] as string[]).flatMap((row, y) =>
        row.split("").map((c, x) => (c === "1" ? <Block key={`${x}.${y}`} position={[(x - 3) * 0.07, (2.5 - y) * 0.07, 0]} size={[0.07, 0.07, 0.04]} color="#e8413a" emissive="#b8221e" emissiveIntensity={0.6} castShadow={false} /> : null)),
      )}
    </group>
  );
/** A line of green sparks along the way the emerald went. `k` 0..1: how much of the way is drawn. */
export const Trail: React.FC<{ pts: Vec3[]; k: number; t: number }> = ({ pts, k, t }) => {
  const dots: Vec3[] = [];
  for (let i = 0; i + 1 < pts.length; i++) {
    const [a, b] = [pts[i], pts[i + 1]];
    const n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[2] - a[2]) / 0.45));
    for (let j = 0; j < n; j++) dots.push([a[0] + ((b[0] - a[0]) * j) / n, 0.12, a[2] + ((b[2] - a[2]) * j) / n]);
  }
  const on = Math.floor(dots.length * Math.max(0, Math.min(1, k)));
  return (
    <>
      {dots.slice(0, on).map((d, i) => (
        <Block key={i} position={[d[0], d[1] + 0.04 * Math.sin(t * 6 + i), d[2]]} size={[0.2, 0.2, 0.2]} color="#39e07a" emissive="#1fbf5a" emissiveIntensity={1.6} castShadow={false} />
      ))}
    </>
  );
};
/** Night in the square: the two lights that carry the torches to the faces. */
export const NightLights: React.FC<{ at?: Vec3; power?: number }> = ({ at = SPOT.me, power = 1 }) => (
  <>
    <pointLight position={[at[0] + 0.6, 3.0, at[2] + 3.2]} color="#ffd9a0" intensity={58 * power} distance={13} decay={2} />
    <pointLight position={[at[0] - 2, 6, at[2] - 4]} color="#c9d0ff" intensity={44 * power} distance={18} decay={2} />
  </>
);
