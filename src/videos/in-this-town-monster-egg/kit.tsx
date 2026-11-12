import type React from "react";
import { Block, Glow, MinecraftAvatar, Torch, Vox, clamp01, lerp, smoothstep } from "../../engine";
import type { AnimName, FaceName, MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { MonsterEgg, Worm } from "../../../Topics/InThisTown/creatures";
import timingJson from "./timing.json";

/**
 * The cast, the things they carry, and the small maths every scene of this film uses.
 */

export const timing = timingJson as unknown as Timing;

// ----------------------------------------------------------------------------- maths

/** Seconds into its shot at which a word is said: `wordAt("12.pack", "bread")`. */
export function wordAt(cueId: string, word: string, nth = 0): number {
  const cue = timing.cues.find((c) => c.id === cueId);
  if (!cue) throw new Error(`wordAt: no cue "${cueId}"`);
  let seen = 0;
  for (const w of timing.words) {
    if (w.s < cue.start - 0.05 || w.s >= cue.end) continue;
    if (w.w.toLowerCase().replace(/[^a-z']/g, "") === word.toLowerCase()) {
      if (seen === nth) return Math.max(0, w.s - cue.start);
      seen++;
    }
  }
  throw new Error(`wordAt: cue "${cueId}" has no word "${word}" (#${nth})`);
}

/** 0 before `a`, 1 after `b`, straight in between. */
export const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const ease = (k: number) => smoothstep(clamp01(k));
/** Scale for a thing that pops into being at `at`: 0, a small overshoot, then 1. */
export const pop = (t: number, at: number, dur = 0.24) => {
  const k = clamp01((t - at) / dur);
  return k <= 0 ? 0 : (1 - (1 - k) ** 3) * (1 + 0.3 * Math.sin(k * Math.PI));
};
/** A short decaying rattle that starts at `at`: a tap, a jolt. */
export const jolt = (t: number, at: number, size = 0.2) => {
  const x = t - at;
  return x <= 0 ? 0 : Math.exp(-x * 13) * Math.sin(x * 42) * size;
};

/** A point `dist` metres in front of someone (behind, if negative) and `up` metres above their feet. */
export const ahead = (p: Vec3, rotY: number, dist: number, up = 0): Vec3 => [
  p[0] + Math.sin(rotY) * dist,
  p[1] + up,
  p[2] + Math.cos(rotY) * dist,
];

/** Facing directions, as `rotationY`. The street runs east–west; the camera usually stands to the south. */
export const SOUTH = 0;
export const EAST = Math.PI / 2;
export const NORTH = Math.PI;
export const WEST = -Math.PI / 2;

export const KID = 0.8;
export const faceOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.53 * scale, p[2]];
export const chestOf = (p: Vec3, scale = KID): Vec3 => [p[0], p[1] + 1.12 * scale, p[2]];

// ----------------------------------------------------------------------------- places

export const PLACE = {
  nest: [-31, 0, 1] as Vec3,
  school: [-20, 0, -3.2] as Vec3,
  mail: [-8.5, 0, -3.2] as Vec3,
  bakery: [0.5, 0, -3.2] as Vec3,
  /** The mouth of the bakery oven. */
  oven: [3.1, 1.15, -1.85] as Vec3,
  home: [10.5, 0, -3.2] as Vec3,
  elder: [19.5, 0, -3.2] as Vec3,
  well: [17, 0, 6] as Vec3,
  gate: [27, 0, 1] as Vec3,
  wallTop: [28.5, 6, 1] as Vec3,
  /** Where the hero stands at the lava. The lava starts at x = 42. */
  edge: [41.4, 0, 1] as Vec3,
  /** Where the egg comes to rest on the cooled crust. */
  crust: [43.3, -0.2, 1] as Vec3,
  /** The bench on the oldest woman's porch. Sit her here. */
  porch: [19.3, 0.545, -2.7] as Vec3,
  /** Bedroom origin. Bed, table and window are placed from here in world.tsx. */
  room: [0, 0, 80] as Vec3,
};
/** Bedroom: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
/** The egg's spot on the bedside table. */
export const TABLE_EGG = room(-0.4, 0.6, -1.95);

// ----------------------------------------------------------------------------- cast

type A = Partial<MinecraftAvatarProps>;

export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#f1c7a0"
    hair="#4a2f1b"
    colors={{ torso: "#d8342c", arms: "#d8342c", legs: "#2e3c6e" }}
    blink
    {...p}
  />
);

export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e9b98c"
    hair="#e3bd55"
    colors={{ torso: "#2f7de1", arms: "skin", legs: "#6a5238" }}
    blink
    phase={1.7}
    {...p}
  />
);

export const Sister: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={0.9}
    outfit="tee"
    skin="#f1c7a0"
    hair="#2a1c14"
    colors={{ torso: "#9b4fd0", arms: "#9b4fd0", legs: "#ece6f5" }}
    blink
    phase={3.1}
    {...p}
  />
);

/** The oldest woman in town. Small, grey, and she leans on a stick. */
export const Elder: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={0.92}
    outfit="tee"
    skin="#dcb394"
    hair="#e6e6e6"
    colors={{ torso: "#5b4a6e", arms: "#5b4a6e", legs: "#3a3344" }}
    blink
    phase={5.3}
    {...p}
  >
    <Block position={[0, -0.3, 0.08]} size={[0.06, 0.78, 0.06]} color="#5c3f24" />
  </MinecraftAvatar>
);

const ADULTS: Array<{ skin: string; hair: string; torso: string; arms: string; legs: string }> = [
  { skin: "#e3b48c", hair: "#6b4a2a", torso: "#f2efe6", arms: "skin", legs: "#7a5a3a" }, // 0 the baker: white apron
  { skin: "#f0c8a4", hair: "#b5622a", torso: "#3f8a4f", arms: "#3f8a4f", legs: "#4a3a2a" }, // 1 green dress
  { skin: "#c99a74", hair: "#2b2b2b", torso: "#c9a23a", arms: "#c9a23a", legs: "#3b3f52" }, // 2 mustard coat
  { skin: "#ecc19a", hair: "#8a8a8a", torso: "#3f6fb8", arms: "#3f6fb8", legs: "#2f2f38" }, // 3 blue tunic
];
const KIDS: Array<{ skin: string; hair: string; torso: string; arms: string; legs: string }> = [
  { skin: "#f0c8a4", hair: "#2b2b2b", torso: "#38b6a8", arms: "skin", legs: "#3b3f52" },
  { skin: "#c99a74", hair: "#4a2f1b", torso: "#f0a02a", arms: "#f0a02a", legs: "#4a6a8a" },
  { skin: "#ecc19a", hair: "#c2452a", torso: "#e85a9a", arms: "skin", legs: "#5a4632" },
  { skin: "#e3b48c", hair: "#e3bd55", torso: "#6ac24a", arms: "#6ac24a", legs: "#3a3344" },
];

export const Adult: React.FC<A & { who: number }> = ({ who, ...p }) => {
  const c = ADULTS[who % ADULTS.length];
  return (
    <MinecraftAvatar
      outfit="tee"
      skin={c.skin}
      hair={c.hair}
      colors={{ torso: c.torso, arms: c.arms, legs: c.legs }}
      blink
      phase={who * 2.3 + 0.4}
      {...p}
    />
  );
};

export const Kid: React.FC<A & { who: number }> = ({ who, ...p }) => {
  const c = KIDS[who % KIDS.length];
  return (
    <MinecraftAvatar
      scale={KID - 0.03 * (who % 2)}
      outfit="tee"
      skin={c.skin}
      hair={c.hair}
      colors={{ torso: c.torso, arms: c.arms, legs: c.legs }}
      blink
      phase={who * 1.9 + 0.8}
      {...p}
    />
  );
};

// ----------------------------------------------------------------------------- things

type EggProps = React.ComponentProps<typeof MonsterEgg>;

/** Where a kid's hands are when carrying: `hold` out in front, `hug` against the chest. */
export const carried = (p: Vec3, rotY: number, carry: "hold" | "hug" | "lift" = "hold", scale = KID): Vec3 =>
  carry === "lift"
    ? ahead(p, rotY, 0.1 * scale, 1.92 * scale)
    : ahead(p, rotY, (carry === "hug" ? 0.3 : 0.42) * scale, (carry === "hug" ? 0.88 : 0.76) * scale);

/** Size of the egg when someone carries it. */
export const CARRIED = 0.5;

/** The hero with his egg. Give `animation="walk"` and he walks with it; otherwise he just holds it. */
export const HeroEgg: React.FC<A & { carry?: "hold" | "hug" | "lift"; egg?: Partial<EggProps>; pack?: boolean }> = ({
  carry = "hold",
  egg,
  pack = false,
  position = [0, 0, 0],
  rotationY = 0,
  animation,
  ...rest
}) => (
  <>
    <Hero
      position={position}
      rotationY={rotationY}
      animation={animation ?? carry}
      arms={animation ? carry : undefined}
      {...rest}
    />
    <MonsterEgg position={carried(position, rotationY, carry)} rotationY={rotationY} scale={CARRIED} cracked {...egg} />
    {pack ? <Backpack position={ahead(position, rotationY, -0.2, 0.6)} rotationY={rotationY} /> : null}
  </>
);

/** Healthy eggs: [shell, speckles]. */
export const EGG_COLORS: Array<[string, string]> = [
  ["#3f8fe8", "#cfe6ff"],
  ["#55b848", "#dcf7ba"],
  ["#f0b92a", "#fff3c0"],
  ["#e85a9a", "#ffd6e8"],
  ["#8a5ae0", "#e4d6ff"],
  ["#2ec4b6", "#cffff6"],
  ["#f07a2a", "#ffe4c0"],
];

/** The eggs in the stone nest. `shown(i)` is each egg's scale, so they can pop in one by one. */
export const NestEggs: React.FC<{ shown?: (i: number) => number; dim?: boolean; tap?: number }> = ({
  shown = () => 1,
  dim = false,
  tap = 0,
}) => (
  <>
    {EGG_COLORS.map(([shell, spots], i) => {
      const a = (i / 6) * Math.PI * 2 + 0.4;
      const r = i === 6 ? 0 : 1.15;
      const s = shown(i);
      if (s <= 0.001) return null;
      return (
        <MonsterEgg
          key={i}
          position={[PLACE.nest[0] + Math.cos(a) * r, 0.16, PLACE.nest[2] + Math.sin(a) * r]}
          rotationY={i * 1.3}
          scale={0.78 * s}
          color={dim ? "#6d6f78" : shell}
          spots={dim ? "#85878f" : spots}
          tilt={Math.sin(tap * 3 + i * 2.1) * 0.03}
        />
      );
    })}
  </>
);

export const Backpack: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({
  position,
  rotationY = 0,
  scale = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.02, 0]} size={[0.42, 0.5, 0.22]} color="#8a5a2e" />
    <Block position={[0, 0.2, -0.02]} size={[0.45, 0.16, 0.25]} color="#6b4220" />
    <Block position={[0, -0.06, -0.13]} size={[0.26, 0.2, 0.06]} color="#a06a36" />
    <Block position={[0, 0.02, -0.165]} size={[0.07, 0.06, 0.02]} color="#e8c44a" />
  </group>
);

/** A backpack lying open on the floor, seen from above. */
export const OpenBag: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.15, 0]} size={[0.7, 0.3, 0.56]} color="#8a5a2e" />
    <Block position={[0, 0.301, 0]} size={[0.56, 0.01, 0.42]} color="#2a1a0e" castShadow={false} />
    <Block position={[0, 0.1, -0.42]} size={[0.66, 0.06, 0.3]} color="#6b4220" />
    <Block position={[0, 0.14, 0.3]} size={[0.3, 0.16, 0.06]} color="#a06a36" />
    <Block position={[-0.2, 0.03, 0.5]} size={[0.07, 0.04, 0.5]} color="#6b4220" />
    <Block position={[0.2, 0.03, 0.5]} size={[0.07, 0.04, 0.5]} color="#6b4220" />
  </group>
);

export const Bread: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.08, 0]} size={[0.44, 0.16, 0.2]} color="#c98a3a" />
    {[-0.12, 0, 0.12].map((x) => (
      <Block key={x} position={[x, 0.165, 0]} size={[0.05, 0.02, 0.16]} color="#e8c07a" castShadow={false} />
    ))}
  </group>
);

export const Bottle: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.07, 0]} size={[0.34, 0.14, 0.16]} color="#6fc3f0" emissive="#3a9ad8" emissiveIntensity={0.35} />
    <Block position={[0.21, 0.07, 0]} size={[0.1, 0.08, 0.08]} color="#d8f0ff" />
    <Block position={[0.28, 0.07, 0]} size={[0.05, 0.1, 0.1]} color="#8a5a2e" />
  </group>
);

export const Rope: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="hay" tint="#b5935a" position={[0, 0.05, 0]} size={[0.4, 0.1, 0.4]} />
    <Block position={[0, 0.101, 0]} size={[0.16, 0.01, 0.16]} color="#3a2a16" castShadow={false} />
    <Block position={[0.24, 0.03, 0.12]} size={[0.2, 0.05, 0.06]} color="#b5935a" />
  </group>
);

/** A torch as luggage: lying on its side. */
export const TorchItem: React.FC<{ position: Vec3; rotationY?: number; scale?: number; light?: number }> = ({
  position,
  rotationY = 0,
  scale = 1,
  light = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Torch position={[-0.3, 0.07, 0]} lean={[0, 0, -Math.PI / 2]} light={light} seed={9} />
  </group>
);

export const Blanket: React.FC<{ position: Vec3; rotationY?: number; size?: Vec3; color?: string }> = ({
  position,
  rotationY = 0,
  size = [0.5, 0.06, 0.4],
  color = "#4f9be0",
}) => <Vox kind="wool" tint={color} position={position} rotationY={rotationY} size={size} />;

/** The worm, wrapped in the hero's blanket, with its head out. Origin: the bottom of the bundle. */
export const Bundle: React.FC<{ position: Vec3; rotationY?: number; lift?: number; mouth?: number }> = ({
  position,
  rotationY = 0,
  lift = 0.3,
  mouth = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="wool" tint="#4f9be0" position={[0, 0.12, 0]} size={[0.36, 0.24, 0.3]} />
    <Vox kind="wool" tint="#3f86c8" position={[0, 0.26, -0.06]} size={[0.3, 0.08, 0.2]} />
    <Worm position={[0, 0.2, -0.08]} scale={0.95} lift={lift} mouth={mouth} />
  </group>
);

/** The hero carrying the bundle. */
export const HeroBundle: React.FC<A & { lift?: number; mouth?: number }> = ({
  lift,
  mouth,
  position = [0, 0, 0],
  rotationY = 0,
  animation,
  ...rest
}) => (
  <>
    <Hero position={position} rotationY={rotationY} animation={animation ?? "hug"} arms={animation ? "hug" : undefined} {...rest} />
    <Bundle position={carried(position, rotationY, "hug")} rotationY={rotationY} lift={lift} mouth={mouth} />
  </>
);

// ----------------------------------------------------------------------------- staging helpers

/** Where a dragon's mouth is, in the world. Fire starts here. */
export const dragonMouth = (p: Vec3, rotY: number, scale: number, bow = 0): Vec3 =>
  ahead(p, rotY, lerp(1.5, 2.0, bow) * scale, lerp(1.62, 0.8, bow) * scale);

/** A row of townsfolk, shoulder to shoulder. `at` is the middle of the row. */
export const Crowd: React.FC<{
  at: Vec3;
  rotationY?: number;
  count?: number;
  spacing?: number;
  animation?: AnimName;
  face?: FaceName;
  lookAt?: Vec3;
  /** Start the cast at a different person, so two crowds do not match. */
  first?: number;
  kidsOnly?: boolean;
}> = ({ at, rotationY = 0, count = 5, spacing = 0.95, animation = "idle", face = "neutral", lookAt, first = 0, kidsOnly = false }) => (
  <>
    {Array.from({ length: count }, (_, i) => {
      const along = (i - (count - 1) / 2) * spacing;
      const back = (((i + first) * 37) % 3) * 0.28;
      const position: Vec3 = [
        at[0] + Math.cos(rotationY) * along - Math.sin(rotationY) * back,
        at[1],
        at[2] - Math.sin(rotationY) * along - Math.cos(rotationY) * back,
      ];
      const who = i + first;
      const props = { position, rotationY, animation, face, lookAt };
      return kidsOnly || who % 2 === 1 ? <Kid key={i} who={who >> 1} {...props} /> : <Adult key={i} who={who >> 1} {...props} />;
    })}
  </>
);

/**
 * A Minecraft sun and moon on one wheel, for "three whole days" in two seconds.
 * The wheel faces a camera that looks along X. `turns` days pass as `p` goes 0 → 1.
 */
export const DayWheel: React.FC<{ center: Vec3; radius?: number; turns?: number; p: number }> = ({
  center,
  radius = 4,
  turns = 3,
  p,
}) => {
  const a = Math.PI / 2 - p * turns * Math.PI * 2;
  const at = (angle: number): Vec3 => [center[0], center[1] + Math.sin(angle) * radius, center[2] + Math.cos(angle) * radius];
  return (
    <>
      <mesh position={at(a)}>
        <boxGeometry args={[0.1, 1.5, 1.5]} />
        <meshBasicMaterial color="#ffe36a" toneMapped={false} fog={false} />
      </mesh>
      <Glow position={at(a)} size={5} color="#ffe36a" opacity={0.5} />
      <mesh position={at(a + Math.PI)}>
        <boxGeometry args={[0.1, 1.2, 1.2]} />
        <meshBasicMaterial color="#e8eeff" toneMapped={false} fog={false} />
      </mesh>
    </>
  );
};

/** Square ripples on a flat surface: something has just gone under. */
export const Ripples: React.FC<{ position: Vec3; t: number; color?: string; reach?: number }> = ({
  position,
  t,
  color = "#fff7d0",
  reach = 1.7,
}) => (
  <group position={position}>
    {[0, 1, 2].map((i) => {
      const k = t * 0.9 - i * 0.28;
      if (k <= 0 || k >= 1) return null;
      const r = 0.25 + k * reach;
      const w = 0.11;
      const bar = (x: number, z: number, sx: number, sz: number, key: string) => (
        <mesh key={key} position={[x, 0, z]}>
          <boxGeometry args={[sx, 0.03, sz]} />
          <meshBasicMaterial color={color} transparent opacity={(1 - k) * 0.9} toneMapped={false} depthWrite={false} />
        </mesh>
      );
      return (
        <group key={i}>
          {bar(0, r, r * 2 + w, w, "s")}
          {bar(0, -r, r * 2 + w, w, "n")}
          {bar(r, 0, w, r * 2 + w, "e")}
          {bar(-r, 0, w, r * 2 + w, "w")}
        </group>
      );
    })}
  </group>
);

/** The last picture of every film in this topic. It lives with the topic, so every film holds up the same sign. */
export { SubscribeSign } from "../../../Topics/InThisTown/creatures";

/** Two eyes in the dark, and nothing else. */
export const Eyes: React.FC<{ position: Vec3; rotationY?: number; open?: number; color?: string }> = ({
  position,
  rotationY = 0,
  open = 1,
  color = "#ffcf5a",
}) =>
  open <= 0.02 ? null : (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.17, 0, 0]}>
          <boxGeometry args={[0.15, 0.1 * open, 0.02]} />
          <meshBasicMaterial color={color} toneMapped={false} fog={false} />
        </mesh>
      ))}
      <Glow position={[0, 0, 0.1]} size={1.1} color={color} opacity={0.5 * open} />
    </group>
  );
