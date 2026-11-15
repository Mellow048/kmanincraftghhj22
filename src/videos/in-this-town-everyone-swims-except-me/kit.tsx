import type React from "react";
import { Glow, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, Puffs, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places: a swimming town.
 *
 * Everything another "In This Town" film could use is in the topic's pack
 * (Topics/InThisTown/PACK.md) and is passed on from here, so a scene imports only from "./kit".
 * The pool, the lane ropes, the trophy and the ring are this story's; they live here.
 */

export {
  // staging
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the town
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Pumpkin,
  // places and things
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Lantern, LanternPost, Puffs, Smoke, SmokeBank,
  Stall, SubscribeSign, Well, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("6.bonk", "head")`. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

const POOL_AT: Vec3 = [200, 0, 0];
const ARENA_AT: Vec3 = [380, 0, 0];

export const PLACE = {
  /** The square. The town hall, with the trophy in its window, is north of it. */
  square: [0, 0, 2] as Vec3,
  hall: [0, 0, -7] as Vec3,
  /** The town pool where he trains. Deck level; the water is at y = 0. */
  pool: POOL_AT,
  poolWater: [POOL_AT[0], 0, POOL_AT[2]] as Vec3,
  /** Standing on the west deck, where the starting blocks are. */
  poolStart: [POOL_AT[0] - 14.2, 0, POOL_AT[2]] as Vec3,
  poolEast: [POOL_AT[0] + 14.2, 0, POOL_AT[2]] as Vec3,
  /** His room, far from the water. */
  home: [120, 0, 40] as Vec3,
  /** the room's own coordinates */
  bed: [121.4, 0, 39.6] as Vec3,
  lamp: [119.2, 0, 38.6] as Vec3,
  /** The path in the woods where the stranger waits. */
  woods: [-40, 0, 80] as Vec3,
  woodsPath: [-40, 0, 72] as Vec3,
  /** The contest: pool one of three, and the smallest. */
  arena: ARENA_AT,
  arenaWater: [ARENA_AT[0], 0, ARENA_AT[2]] as Vec3,
  arenaStart: [ARENA_AT[0] - 26, 0, ARENA_AT[2]] as Vec3,
  /** The trophy table, at the finish wall. */
  trophyTable: [ARENA_AT[0] + 27.5, 0, ARENA_AT[2] - 2] as Vec3,
};

/** The z of lane `i` (1-based) in a pool of `lanes` lanes. */
export const laneZ = (i: number, lanes = 6, width = 12): number => -width / 2 + ((i - 0.5) * width) / lanes;

// ----------------------------------------------------------------------------- the teller and his people

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller. RED shirt, as the owner asked ("change my shirt into red cuz other agents make it yellow or blue").
 * Dark shorts, one loud colour nobody else in the film wears.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dca47a"
    hair="#2e1c12"
    colors={{ torso: "#c0392b", arms: "#c0392b", legs: "#26355e" }}
    blink
    {...p}
  />
);

/** The friend who pulls him out — twice. Green, taller, always first to move. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID * 1.04}
    outfit="tee"
    skin="#e6b98f"
    hair="#3a2717"
    colors={{ torso: "#2f7d4f", arms: "#2f7d4f", legs: "#40342c" }}
    blink
    {...p}
  />
);

/** The kid who wins: black and white, the other ring. */
export const Rival: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID * 1.05}
    outfit="tee"
    skin="#c99a74"
    hair="#141414"
    colors={{ torso: "#20262f", arms: "#e6e6e6", legs: "#20262f" }}
    blink
    {...p}
  />
);

/** The stranger in the woods. Never seen from the front. */
export const Stranger: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.86}
    outfit="shadow"
    skin="#8f8f96"
    hair="#101014"
    colors={{ torso: "#1b1f2a", arms: "#1b1f2a", legs: "#141821" }}
    face="blank"
    {...p}
  />
);

// ----------------------------------------------------------------------------- the pool

/** A lane rope: a thin line with red and white floats, along x. */
const Rope: React.FC<{ z: number; length: number }> = ({ z, length }) => {
  const n = Math.max(2, Math.floor(length / 1.4));
  return (
    <group position={[0, -0.04, z]}>
      <mesh>
        <boxGeometry args={[length, 0.02, 0.02]} />
        <meshStandardMaterial color="#cfc8b8" roughness={0.7} />
      </mesh>
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[-length / 2 + 0.7 + i * 1.4, 0, 0]}>
          <boxGeometry args={[0.26, 0.15, 0.15]} />
          <meshStandardMaterial color={i % 2 ? "#f2eee2" : "#d8402f"} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * A swimming pool, in the ground: tiled deck, tiled basin, six lanes of water, lane ropes.
 * `blocks` puts the starting blocks on the west end. `contest` adds the second and third pool far behind.
 */
export const Pool: React.FC<{
  at?: Vec3;
  length?: number;
  width?: number;
  lanes?: number;
  blocks?: boolean;
  numbers?: boolean;
}> = ({ at = [0, 0, 0], length = 25, width = 12, lanes = 6, blocks = true, numbers = true }) => {
  const L = length;
  const W = width;
  const D = 2.1;
  const dk = 3.4;
  const hL = L / 2;
  const hW = W / 2;
  const tile = "#e7e1d4";
  return (
    <group position={at}>
      {/* deck, in four slabs around the water */}
      <Vox kind="stoneBrick" tint={tile} position={[0, -0.16, -(hW + dk / 2)]} size={[L + dk * 2, 0.32, dk]} />
      <Vox kind="stoneBrick" tint={tile} position={[0, -0.16, hW + dk / 2]} size={[L + dk * 2, 0.32, dk]} />
      <Vox kind="stoneBrick" tint={tile} position={[-(hL + dk / 2), -0.16, 0]} size={[dk, 0.32, W]} />
      <Vox kind="stoneBrick" tint={tile} position={[hL + dk / 2, -0.16, 0]} size={[dk, 0.32, W]} />

      {/* the basin: floor and four walls, in blue tile */}
      <Vox kind="stoneBrick" tint="#8fd0de" position={[0, -D, 0]} size={[L, 0.24, W]} />
      <Vox kind="stoneBrick" tint="#7cc2d2" position={[0, -D / 2, -hW]} size={[L, D, 0.24]} />
      <Vox kind="stoneBrick" tint="#7cc2d2" position={[0, -D / 2, hW]} size={[L, D, 0.24]} />
      <Vox kind="stoneBrick" tint="#7cc2d2" position={[-hL, -D / 2, 0]} size={[0.24, D, W]} />
      <Vox kind="stoneBrick" tint="#7cc2d2" position={[hL, -D / 2, 0]} size={[0.24, D, W]} />

      {/* the water: a body you can see through, and a bright surface */}
      <mesh position={[0, -D / 2 - 0.02, 0]}>
        <boxGeometry args={[L - 0.12, D - 0.3, W - 0.12]} />
        <meshStandardMaterial color="#2f9fc4" transparent opacity={0.55} roughness={0.12} metalness={0.15} />
      </mesh>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[L - 0.08, W - 0.08]} />
        <meshStandardMaterial color="#84e2ef" transparent opacity={0.45} roughness={0.06} metalness={0.25} />
      </mesh>

      {/* lane ropes, and the outer two */}
      {Array.from({ length: lanes + 1 }, (_, i) => (
        <Rope key={i} z={-hW + (i * W) / lanes} length={L - 0.3} />
      ))}

      {/* lane numbers, painted on the west deck, facing up */}
      {numbers &&
        Array.from({ length: lanes }, (_, i) => (
          <PixelText
            key={i}
            text={String(i + 1)}
            position={[-hL - 1.5, 0.02, -hW + ((i + 0.5) * W) / lanes]}
            rotation={[-Math.PI / 2, 0, 0]}
            height={0.5}
            color="#5d7f8a"
          />
        ))}

      {/* starting blocks on the west end */}
      {blocks &&
        Array.from({ length: lanes }, (_, i) => {
          const z = -hW + ((i + 0.5) * W) / lanes;
          return (
            <group key={i} position={[-hL - 0.55, 0, z]}>
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.34, 0.4, 0.34]} />
                <meshStandardMaterial color="#cfd6d8" roughness={0.5} metalness={0.1} />
              </mesh>
              <mesh position={[-0.18, 0.44, 0]} rotation={[0, 0, 0.32]}>
                <boxGeometry args={[0.5, 0.1, 0.5]} />
                <meshStandardMaterial color="#e8ecec" roughness={0.45} />
              </mesh>
            </group>
          );
        })}
    </group>
  );
};

/** A stepped stand with villagers sitting on it, facing the water. */
export const Bleachers: React.FC<{ at: Vec3; rows?: number; width?: number; turn?: number }> = ({
  at,
  rows = 4,
  width = 26,
  turn = 0,
}) => (
  <group position={at} rotation={[0, turn, 0]}>
    {Array.from({ length: rows }, (_, i) => (
      <group key={i}>
        <Vox kind="planks" tint="#b9a58a" position={[0, 0.25 + i * 0.5, -i * 0.9]} size={[width, 0.5, 0.9]} />
        {Array.from({ length: Math.floor(width / 1.6) }, (_, j) => (
          <Villager
            key={j}
            position={[-width / 2 + 0.9 + j * 1.6, 0.5 + i * 0.5, -i * 0.9 - 0.05]}
            robe={[ROBE.brown, ROBE.white, ROBE.farmer, ROBE.blue, ROBE.red][(i + j) % 5]}
            sit
            lookAt={[at[0], 0.4, at[2] + 12]}
            phase={i * 1.7 + j * 0.6}
          />
        ))}
      </group>
    ))}
  </group>
);

/** The cup. `position` is the middle of its base. */
export const Trophy: React.FC<{ position: Vec3; scale?: number; glow?: number; rotationY?: number }> = ({
  position,
  scale = 1,
  glow = 0.35,
  rotationY = 0,
}) => (
  <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
    <mesh position={[0, 0.045, 0]}>
      <boxGeometry args={[0.26, 0.09, 0.26]} />
      <meshStandardMaterial color="#2b2320" roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.11, 0]}>
      <cylinderGeometry args={[0.07, 0.1, 0.06, 12]} />
      <meshStandardMaterial color="#d9b25a" metalness={0.9} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0.22, 0]}>
      <cylinderGeometry args={[0.035, 0.05, 0.18, 10]} />
      <meshStandardMaterial color="#e8c46a" metalness={0.9} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.38, 0]}>
      <cylinderGeometry args={[0.15, 0.07, 0.2, 14, 1, true]} />
      <meshStandardMaterial
        color="#f0cf74"
        metalness={0.95}
        roughness={0.16}
        emissive="#8a6418"
        emissiveIntensity={0.55 + glow}
      />
    </mesh>
    <mesh position={[0, 0.485, 0]}>
      <cylinderGeometry args={[0.15, 0.15, 0.02, 14]} />
      <meshStandardMaterial color="#f7e3a4" metalness={0.9} roughness={0.2} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.16, 0.4, 0]} rotation={[0, 0, s * 0.35]}>
        <torusGeometry args={[0.075, 0.018, 8, 14, Math.PI]} />
        <meshStandardMaterial color="#e8c46a" metalness={0.9} roughness={0.2} />
      </mesh>
    ))}
  </group>
);

/** The ring: a gold band with three little buttons on one side. */
export const Ring: React.FC<{ position: Vec3; rotation?: Vec3; scale?: number; glow?: number; lit?: 0 | 1 | 2 | 3 }> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  glow = 0.4,
  lit = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.058, 0.013, 10, 22]} />
      <meshStandardMaterial color="#e6c068" metalness={0.95} roughness={0.22} emissive="#4a3408" emissiveIntensity={glow} />
    </mesh>
    {/* the three buttons, on the outside of the band */}
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[0, 0.012, 0.062 + i * 0.026]}>
        <boxGeometry args={[0.022, 0.012, 0.018]} />
        <meshStandardMaterial
          color={i === 0 ? "#e2574a" : i === 1 ? "#e8d27a" : "#7fd4a0"}
          emissive={i === lit - 1 ? "#fff0c0" : "#000000"}
          emissiveIntensity={i === lit - 1 ? 1.6 : 0}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
    ))}
  </group>
);

/** A phone, screen up, with a word on it. */
export const Phone: React.FC<{ position: Vec3; rotation?: Vec3; word?: string; scale?: number }> = ({
  position,
  rotation = [0, 0, 0],
  word = "LEARN FAST",
  scale = 1,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh>
      <boxGeometry args={[0.16, 0.012, 0.3]} />
      <meshStandardMaterial color="#1a1c22" roughness={0.5} metalness={0.4} />
    </mesh>
    <mesh position={[0, 0.008, 0]}>
      <planeGeometry args={[0.145, 0.275]} />
      <meshStandardMaterial color="#cfe9ff" emissive="#9fd0ff" emissiveIntensity={0.75} />
    </mesh>
    <PixelText text={word} position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} height={0.045} maxWidth={0.13} color="#1d2b3a" />
  </group>
);

/** A glass display case with a warm light in it: the trophy in the town hall window. */
export const DisplayCase: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.55, -0.28]} size={[1.5, 1.1, 0.16]} />
    <Vox kind="darkPlanks" position={[0, 1.12, 0]} size={[1.6, 0.14, 0.7]} />
    <Vox kind="planks" position={[0, 0.5, 0]} size={[1.4, 0.1, 0.6]} />
    <mesh position={[0, 0.55, 0.31]}>
      <planeGeometry args={[1.44, 1.0]} />
      <meshStandardMaterial color="#bfe6f2" transparent opacity={0.16} roughness={0.05} metalness={0.5} />
    </mesh>
    <Trophy position={[0, 0.56, 0]} scale={1.15} />
    <pointLight position={[0, 1.0, 0.1]} color="#ffd9a0" intensity={1.6} distance={2.6} decay={2} />
    <Glow position={[0, 0.95, 0.1]} size={0.9} color="#ffcf8a" opacity={0.35} />
  </group>
);

/** A body floating at the surface: `at` is the water line at the middle of the swimmer. */
export const Swimmer: React.FC<{
  at: Vec3;
  turn?: number;
  children?: React.ReactNode;
  /** how deep the body sits under the surface */
  sink?: number;
}> = ({ at, turn = 0, children, sink = 0 }) => (
  <group position={[at[0], at[1] - sink, at[2]]} rotation={[0, turn, 0]}>
    <group position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {children}
    </group>
  </group>
);

/** A burst of white water. */
export const Splash: React.FC<{ at: Vec3; size?: number; count?: number; seed?: number }> = ({
  at,
  size = 0.18,
  count = 9,
  seed = 5,
}) => (
  <Puffs position={at} color="#eef8fb" count={count} rise={0.9} spread={0.4} size={size} speed={0.9} opacity={0.85} seed={seed} />
);

/** A board on two posts, with words on it. Used for the pool notices and the race poster. */
export const SignBoard: React.FC<{
  at: Vec3;
  width?: number;
  height?: number;
  lines: Array<{ text: string; height?: number; color?: string }>;
  rotationY?: number;
  tint?: string;
}> = ({ at, width = 4, height = 1.6, lines, rotationY = 0, tint = "#e8dcc0" }) => {
  const gap = height / (lines.length + 1);
  return (
    <group position={at} rotation={[0, rotationY, 0]}>
      <Vox kind="log" position={[-width / 2 + 0.3, height / 2, -0.12]} size={[0.18, height, 0.18]} />
      <Vox kind="log" position={[width / 2 - 0.3, height / 2, -0.12]} size={[0.18, height, 0.18]} />
      <Vox kind="planks" tint={tint} position={[0, height / 2, 0]} size={[width, height, 0.14]} />
      {lines.map((l, i) => (
        <PixelText
          key={i}
          text={l.text}
          position={[0, height - gap * (i + 1) + gap * 0.5, 0.09]}
          height={l.height ?? 0.42}
          maxWidth={width - 0.5}
          color={l.color ?? "#3c5a66"}
        />
      ))}
    </group>
  );
};
