import type React from "react";
import { Block, Dust, Glow, LightPool, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, chestOf, faceOf, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * THIS FILM'S KIT. The cast, the shadow, and the few things the scenes handle.
 *
 * The places (a classroom, its hallway, the cafeteria, the prom gym) are built in world.tsx: a shot names its
 * zone and the other three are not drawn. Everything that is a person, or is picked up and put down, lives here.
 *
 * What is this story's own:
 *   ME      the teller: teal hoodie, dark jeans, scared of everything.
 *   HER     the one he cannot say hi to.
 *   FRIEND  the best friend who is done hearing about her.
 *   SHADOW  his shadow: a flat black copy of him on the floor that moves on its own. Not a person. No face.
 *           `lift` peels it up off the floor (0 flat, 1 standing), `pose` decides what its limbs are doing.
 */

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said: `wordAt("3.class", "stood")`. */
export const wordAt = wordClock(timing);

export { Block, Dust, Glow, LightPool, PixelText, Vox, MinecraftAvatar, KID, chestOf, faceOf };
export { stride } from "../../engine";
export { Bubble, DEG, ease, pop, ramp } from "../../../Topics/InThisTown";

// ----------------------------------------------------------------------------- the cast

type A = Partial<MinecraftAvatarProps>;

export const ME_SHIRT = "#2f8f8a";
export const ME_JEANS = "#28304a";

/** The teller. */
export const Me: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="tee"
    skin="#f0c49c"
    hair="#3a2415"
    colors={{ torso: ME_SHIRT, arms: ME_SHIRT, legs: ME_JEANS }}
    scale={KID}
    blink
    shoes="#f2f2f2"
    {...p}
  />
);

/** Her: lilac sweater, and the whole film turns on her. */
export const Her: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="tee"
    skin="#f4cba6"
    hair="#6b3a1e"
    colors={{ torso: "#a97ad6", arms: "#a97ad6", legs: "#e6e2ee" }}
    scale={0.8}
    blink
    shoes="#d8d2e6"
    {...p}
  />
);

/** The best friend: green hoodie, blonde braid, unimpressed. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="hoodie"
    skin="#e9bd92"
    hair="#e2c464"
    colors={{ torso: "#3f7d4f", legs: "#2b3242" }}
    scale={0.82}
    blink
    shoes="#2f2f38"
    {...p}
  />
);

/** The janitor: grey overalls and a mop. He has seen everything twice. */
export const Janitor: React.FC<A> = (p) => (
  <MinecraftAvatar
    outfit="tee"
    skin="#c89a72"
    hair="#d8d8d8"
    colors={{ torso: "#41597a", arms: "#7a8ba3", legs: "#33415c" }}
    scale={0.88}
    shoes="#2a2a2a"
    face="neutral"
    {...p}
  />
);

/** The cook, behind the counter. */
export const Cook: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#d8a878" hair="#8a8a8a" colors={{ torso: "#f2efe6", arms: "#e8c49a", legs: "#3a3a44" }} scale={0.9} {...p} />
);

/** The teacher at the blackboard. */
export const Teacher: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#e0b48c" hair="#3a3a3a" colors={{ torso: "#8a3b2a", arms: "#8a3b2a", legs: "#2f2f38" }} scale={0.92} {...p} />
);

/** The principal in the hallway. Suit, and a clipboard. */
export const Principal: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#c89a72" hair="#4a4a4a" colors={{ torso: "#2a2f3a", arms: "#2a2f3a", legs: "#1e2430" }} scale={0.92} {...p} />
);

/** Any other kid in the school. `n` picks the colours. */
export const Kid: React.FC<A & { n?: number }> = ({ n = 0, ...p }) => {
  const shirts = ["#c2452a", "#e8c44a", "#4a7fc1", "#8a5aa8", "#d97a3a", "#4aa88a"];
  const hairs = ["#2b1d14", "#5a3a1e", "#0f0f12", "#c98a3a", "#3a2a5a", "#8a8a8a"];
  return (
    <MinecraftAvatar
      outfit="tee"
      skin={["#f0c8a4", "#d8a878", "#b97a56", "#8a5a3c"][n % 4]}
      hair={hairs[n % 6]}
      colors={{ torso: shirts[n % 6], arms: shirts[n % 6], legs: ["#2f3b6e", "#3a3a44", "#4a3a2a"][n % 3] }}
      scale={0.76 + ((n * 7) % 5) * 0.012}
      shoes="#f2f2f2"
      {...p}
    />
  );
};

// ----------------------------------------------------------------------------- the shadow

export type ShadowPose = "idle" | "walk" | "run" | "sit" | "armsUp" | "out" | "reach" | "cower" | "point" | "cheer";

const POSE: Record<ShadowPose, { armL: number; armR: number; legL: number; legR: number }> = {
  idle: { armL: 0.16, armR: -0.16, legL: 0.07, legR: -0.07 },
  walk: { armL: 0.55, armR: -0.55, legL: -0.4, legR: 0.4 },
  run: { armL: 0.95, armR: -0.95, legL: -0.65, legR: 0.65 },
  sit: { armL: 0.3, armR: -0.3, legL: 1.35, legR: 1.15 },
  armsUp: { armL: 2.5, armR: -2.5, legL: 0.1, legR: -0.1 },
  out: { armL: 1.45, armR: -1.45, legL: 0.12, legR: -0.12 },
  reach: { armL: 1.5, armR: -0.2, legL: 0.2, legR: -0.2 },
  cower: { armL: 2.1, armR: -2.1, legL: 0.5, legR: -0.5 },
  point: { armL: 1.6, armR: -0.15, legL: 0.1, legR: -0.1 },
  cheer: { armL: 2.8, armR: -2.8, legL: -0.3, legR: 0.3 },
};

const INK = "#0a0d16";

/** One limb of the silhouette: hangs from `at` (a joint) and swings in the plane by `rot`. */
const Limb: React.FC<{ at: Vec3; w: number; len: number; rot: number }> = ({ at, w, len, rot }) => (
  <group position={at} rotation={[0, 0, rot]}>
    <Block position={[0, -len / 2, 0]} size={[w, len, 0.026]} color={INK} castShadow={false} receiveShadow={false} />
  </group>
);

/**
 * HIS SHADOW. A flat black copy of him, laid on the floor.
 *
 * `lift` 0 is flat on the ground; 1 stands it up on its feet, like a shadow peeling off the floor and standing
 * up. `swing` (0–1) is how much the limbs move, and `t` sets the phase. `position` is where its feet are.
 */
export const Shadow: React.FC<{
  position: Vec3;
  rotationY?: number;
  pose?: ShadowPose;
  lift?: number;
  scale?: number;
  t?: number;
  swing?: number;
  /** Rolls the silhouette inside its own plane, in radians: 1.45 lays it sideways, like a push-up on a wall. */
  roll?: number;
  color?: string;
}> = ({ position, rotationY = 0, pose = "idle", lift = 0, scale = 1, t = 0, swing = 0, roll = 0, color = INK }) => {
  const a = POSE[pose];
  const s = Math.sin(t * 7) * swing;
  return (
    <group position={[position[0], position[1] + 0.014, position[2]]} rotation={[0, rotationY, 0]}>
      <group rotation={[-Math.PI / 2 + lift * (Math.PI / 2), 0, roll]} scale={[scale, scale, 1]}>
        <group position={[0, 0, 0]}>
          <Limb at={[-0.115, 0.66, 0]} w={0.2} len={0.66} rot={a.legL + s * 0.5} />
          <Limb at={[0.115, 0.66, 0]} w={0.2} len={0.66} rot={a.legR - s * 0.5} />
          <Block position={[0, 0.95, 0]} size={[0.46, 0.58, 0.026]} color={color} castShadow={false} receiveShadow={false} />
          <Limb at={[-0.29, 1.22, 0]} w={0.13} len={0.58} rot={a.armL - s * 0.6} />
          <Limb at={[0.29, 1.22, 0]} w={0.13} len={0.58} rot={a.armR + s * 0.6} />
          <Block position={[0, 1.44, 0]} size={[0.38, 0.38, 0.026]} color={color} castShadow={false} receiveShadow={false} />
        </group>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- places
/**
 * The school is one long world: four rooms side by side, each its own zone. `P` gives a point in one of them.
 * These numbers are the ONLY place the layout is written down; world.tsx builds to them and scenes stand in them.
 */
export const ZONE_X = { class: 0, hall: 40, cafe: 80, gym: 124, room: 160 } as const;
export const P = (zone: keyof typeof ZONE_X, x: number, y: number, z: number): Vec3 => [ZONE_X[zone] + x, y, z];

/** The classroom: his desk on the left of the room, hers by the window. The board is on the north wall. */
export const MY_DESK: Vec3 = P("class", -3, 0, 0.4);
export const HER_DESK: Vec3 = P("class", 3, 0, 0.4);
export const BOARD: Vec3 = P("class", 0, 1.8, -4.38);
/** The hallway: lockers on the north wall, doors on the south. It runs east–west. */
export const HALL_LOCKERS = P("hall", 0, 0, -3.0);
/** The cafeteria: her table (long, by the window), and the counter the pudding comes from. */
export const HER_TABLE: Vec3 = P("cafe", 4.6, 0, 0.6);
export const COUNTER: Vec3 = P("cafe", 0, 0, -4.2);
/** The gym, at prom: the lights are over `DANCE`, the punch table east, the plant he hides behind west. */
export const DANCE: Vec3 = P("gym", 0, 0, 0.3);
export const PLANT: Vec3 = P("gym", -5.4, 0, 2.6);
export const MIRROR: Vec3 = P("gym", 8.9, 1.9, -3.2);

// ----------------------------------------------------------------------------- the few scene props

/** A lunch tray. `position` is the floor under it; the flat comes up to y = 0.05. */
export const Tray: React.FC<{ position: Vec3; rotationY?: number; pudding?: number; roll?: boolean; scale?: number }> = ({
  position,
  rotationY = 0,
  pudding = 0,
  roll = false,
  scale = 1,
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.025, 0]} size={[0.62, 0.05, 0.44]} color="#c9483a" />
    <Block position={[0, 0.052, 0]} size={[0.56, 0.008, 0.38]} color="#e8e2d4" castShadow={false} />
    {roll ? <Block position={[-0.16, 0.1, 0.02]} size={[0.15, 0.1, 0.13]} color="#c98a3a" /> : null}
    {Array.from({ length: pudding }).map((_, i) => (
      <group key={i} position={[-0.12 + i * 0.26, 0.06, 0.1]}>
        <Block position={[0, 0.05, 0]} size={[0.16, 0.1, 0.16]} color="#e8d27a" />
        <Block position={[0, 0.105, 0]} size={[0.17, 0.012, 0.17]} color="#8a4a2a" castShadow={false} />
      </group>
    ))}
  </group>
);

/** Her pencil case: purple, with a cat on it. `position` is the middle of its top. */
export const PencilCase: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block size={[0.26, 0.09, 0.13]} color="#8a5ad6" />
    <Block position={[0, 0.05, 0]} size={[0.27, 0.012, 0.14]} color="#6a3fb0" castShadow={false} />
    {/* the cat: two ears and a face, painted on the lid */}
    <Block position={[0, 0.058, -0.01]} size={[0.1, 0.006, 0.08]} color="#f2e6c8" castShadow={false} />
    <Block position={[-0.03, 0.062, -0.055]} size={[0.022, 0.006, 0.022]} color="#3a2a1a" castShadow={false} />
    <Block position={[0.03, 0.062, -0.055]} size={[0.022, 0.006, 0.022]} color="#3a2a1a" castShadow={false} />
  </group>
);

/** The like card that ends the film: a thumb, and the word. Face +Z. */
export const LikeCard: React.FC<{ position: Vec3; rotationY?: number; scale?: number }> = ({ position, rotationY = 0, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block size={[1.5, 0.66, 0.06]} color="#e63a3a" />
    <Block size={[1.38, 0.54, 0.02]} color="#f24a4a" castShadow={false} />
    <Block position={[-0.46, 0.02, 0.05]} size={[0.3, 0.26, 0.1]} color="#f8f4ee" />
    <Block position={[-0.36, 0.13, 0.05]} size={[0.18, 0.2, 0.1]} color="#f8f4ee" />
    <PixelText text="LIKE" position={[0.2, 0.0, 0.06]} height={0.26} />
  </group>
);
