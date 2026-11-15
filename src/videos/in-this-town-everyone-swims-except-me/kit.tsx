import type React from "react";
import { Glow, MinecraftAvatar, PixelText, Vox, getPose, mulberry32, useFilmTime } from "../../engine";
import { wordTexture } from "../../engine/pixelfont";
import type { FaceName, MinecraftAvatarProps, Pose, Timing, Vec3 } from "../../engine";
import { KID, Puffs, ROBE, Villager, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places: a swimming town.
 *
 * Everything another "In This Town" film could use is in the topic's pack
 * (Topics/InThisTown/PACK.md) and is passed on from here, so a scene imports only from "./kit".
 * The pool, the swimmers, the stands, the trophy and the ring are this story's; they live here.
 *
 * REMASTER (2026-11-15). The owner on the first build: "it sucked! it was not like in the reference … keep the
 * story how it is. just improve motion, add mini scenes and visuals". The words, the voice and the timing are the
 * first build's. What is new here: a pool with depth and lane lines (`Pool`), a body that actually swims, flails,
 * treads and sinks (`Swim`, `swimPose`), foam and bubbles, stands full of people who face the water (`Stand`), and
 * the small things a pool yard has (`Parasol`, `Lounger`, `LifeguardChair`, `Bunting`, `DivingBoard`).
 */

export {
  // staging
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the town
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Pumpkin,
  // places and things
  BedBox, Bits, Blaze, Chicken, FireLight, Hole, Lantern, LanternPost, Puffs, Smoke, SmokeBank,
  Stall, SubscribeSign, Well, Wisps,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("6.bonk", "head")`. */
export const wordAt = wordClock(timing);
/** The same for a shot that cuts in `cut` seconds into its line. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
/** 0 to 1 between two seconds of a shot, eased. */
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
/** A point between two points. */
export const mix = (a: Vec3, b: Vec3, k: number): Vec3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

// ----------------------------------------------------------------------------- places

const POOL_AT: Vec3 = [200, 0, 0];
const ARENA_AT: Vec3 = [380, 0, 0];

/** The water line of every pool: just under the deck. */
export const WL = -0.15;
/** The town pool, where he trains: 16 m by 8 m, four lanes. West end shallow talk, east end is "the deep end". */
export const POOL = { L: 16, W: 8, lanes: 4, D: 2.4, deck: 2.6 };
/** Pool one of the contest: 30 m by 20 m, ten lanes ("I was tenth"). He is in lane 5 (z = −1); the kid who wins is in lane 6. */
export const RACE = { L: 30, W: 20, lanes: 10, D: 2.4, deck: 3.2 };

export const PLACE = {
  /** The square. The town hall, with the trophy in its window, is north of it. */
  square: [0, 0, 2] as Vec3,
  hall: [0, 0, -7] as Vec3,
  pool: POOL_AT,
  /** His room, far from the water. */
  home: [120, 0, 40] as Vec3,
  /** The shower: its own little tiled box beside his room. */
  shower: [132, 0, 40] as Vec3,
  /** The path in the woods where the stranger waits. */
  woods: [-40, 0, 80] as Vec3,
  arena: ARENA_AT,
  /** The trophy table, past the finish wall. */
  trophyTable: [ARENA_AT[0] + 18.6, 0, ARENA_AT[2] - 3] as Vec3,
};

/** A point in the town pool's yard: x along the pool (west −8 … east +8), z across it (north −4 … south +4). */
export const P = (x: number, y: number, z: number): Vec3 => [POOL_AT[0] + x, y, POOL_AT[2] + z];
/** A point at the contest pool: x −15 (the start) … +15 (the finish), z −7 … +7. */
export const R = (x: number, y: number, z: number): Vec3 => [ARENA_AT[0] + x, y, ARENA_AT[2] + z];
/** His room and the woods, in their own coordinates. */
export const HM = (x: number, y: number, z: number): Vec3 => [PLACE.home[0] + x, y, PLACE.home[2] + z];
export const SH = (x: number, y: number, z: number): Vec3 => [PLACE.shower[0] + x, y, PLACE.shower[2] + z];
export const WD = (x: number, y: number, z: number): Vec3 => [PLACE.woods[0] + x, y, PLACE.woods[2] + z];

/** The z of lane `i` (1-based, 1 is the north lane). */
export const laneZ = (i: number, pool: { W: number; lanes: number } = RACE): number => -pool.W / 2 + ((i - 0.5) * pool.W) / pool.lanes;

// ----------------------------------------------------------------------------- the teller and his people

type A = Partial<MinecraftAvatarProps> & { ring?: boolean | 1 | 2 | 3 };

/**
 * A ring on the right hand. It is parented to the hand in MinecraftAvatar, so it stays on the finger
 * through every gesture instead of floating where a hand used to be.
 */
const Worn: React.FC<{ lit?: 0 | 1 | 2 | 3 }> = ({ lit = 3 }) => (
  // What the ring looks like ON: one yellow stripe round the forearm, with three dots on the outside of it.
  // (The owner: "edit the design on the main character's arm to have 1 yellow stripe with 3 dots as buttons".)
  <group position={[0, 0.09, 0]}>
    <mesh>
      <boxGeometry args={[0.243, 0.085, 0.243]} />
      <meshStandardMaterial color="#f4c21e" roughness={0.45} emissive="#7a5a00" emissiveIntensity={0.5} />
    </mesh>
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[0.125, 0, (i - 1) * 0.072]}>
        <boxGeometry args={[0.02, 0.046, 0.046]} />
        <meshStandardMaterial
          color={i !== lit - 1 ? "#2b2620" : i === 0 ? "#ff4a3a" : i === 1 ? "#ff9a1e" : "#35e06a"}
          emissive={i !== lit - 1 ? "#000000" : i === 0 ? "#ff4a3a" : i === 1 ? "#ff9a1e" : "#35e06a"}
          emissiveIntensity={i === lit - 1 ? 2.2 : 0}
        />
      </mesh>
    ))}
  </group>
);

/**
 * The teller. RED shirt, as the owner asked ("change my shirt into red cuz other agents make it yellow or blue").
 * Dark shorts, one loud colour nobody else in the film wears.
 */
export const Hero: React.FC<A> = ({ ring = false, children, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dca47a"
    hair="#2e1c12"
    colors={{ torso: "#c0392b", arms: "#c0392b", legs: "#26355e" }}
    blink
    {...p}
  >
    {ring ? <Worn lit={ring === true ? 3 : ring} /> : null}
    {children}
  </MinecraftAvatar>
);

/** The friend who pulls him out — twice. Green, taller, always first to move. */
export const Friend: React.FC<A> = ({ ring = false, children, ...p }) => (
  <MinecraftAvatar
    scale={KID * 1.04}
    outfit="tee"
    skin="#e6b98f"
    hair="#3a2717"
    colors={{ torso: "#2f7d4f", arms: "#2f7d4f", legs: "#40342c" }}
    blink
    {...p}
  >
    {ring ? <Worn lit={3} /> : null}
    {children}
  </MinecraftAvatar>
);

/** The kid who wins: black and white, the other ring. */
export const Rival: React.FC<A> = ({ ring = false, children, ...p }) => (
  <MinecraftAvatar
    scale={KID * 1.05}
    outfit="tee"
    skin="#c99a74"
    hair="#141414"
    colors={{ torso: "#20262f", arms: "#e6e6e6", legs: "#20262f" }}
    blink
    {...p}
  >
    {ring ? <Worn lit={2} /> : null}
    {children}
  </MinecraftAvatar>
);

/**
 * The stranger in the woods: a villager in a black suit, the size of any villager. (He was a tall copy of the
 * hero's own body in grey, and the owner asked why.) He carries the ring on his folded sleeves, as villagers
 * carry everything.
 */
export const SUIT = "#1e1e26";
export const Stranger: React.FC<{ position: Vec3; rotationY?: number; walk?: number; ring?: boolean; nod?: number; lookAt?: Vec3; glow?: number }> = ({ position, rotationY = 0, walk, ring = false, nod, lookAt, glow = 1.5 }) => (
  <Villager
    position={position}
    rotationY={rotationY}
    robe={SUIT}
    walk={walk}
    nod={nod}
    lookAt={lookAt}
    carry={ring ? <Ring position={[0, 0.07, 0.04]} rotation={[-0.75, 0, 0]} scale={3.4} glow={glow} /> : undefined}
  />
);

// ----------------------------------------------------------------------------- the pool

/** A lane rope: a thin line with red and white floats, along x. */
const Rope: React.FC<{ z: number; length: number }> = ({ z, length }) => {
  const n = Math.max(2, Math.floor(length / 1.1));
  return (
    <group position={[0, WL + 0.03, z]}>
      <mesh>
        <boxGeometry args={[length, 0.03, 0.03]} />
        <meshStandardMaterial color="#cfc8b8" roughness={0.7} />
      </mesh>
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[-length / 2 + 0.55 + i * 1.1, 0, 0]}>
          <boxGeometry args={[0.34, 0.17, 0.17]} />
          <meshStandardMaterial color={i % 2 ? "#f6f2e6" : "#e0392b"} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
};

/** Sun on the water: little bright dashes that drift and wink. Without them a pool is a blue floor. */
const Glints: React.FC<{ L: number; W: number; seed?: number }> = ({ L, W, seed = 3 }) => {
  const t = useFilmTime();
  const rnd = mulberry32(seed);
  const n = Math.round((L * W) / 7);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = (rnd() - 0.5) * (L - 1);
        const z = (rnd() - 0.5) * (W - 0.6);
        const ph = rnd() * 6.28;
        const k = 0.5 + 0.5 * Math.sin(t * (1.6 + rnd()) + ph);
        return (
          <mesh key={i} position={[x + Math.sin(t * 0.5 + ph) * 0.35, WL + 0.012, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.5 + k * 0.5, 0.07]} />
            <meshBasicMaterial color="#f4fdff" transparent opacity={0.25 + 0.5 * k} depthWrite={false} />
          </mesh>
        );
      })}
    </>
  );
};

/**
 * A swimming pool, sunk in the ground. Origin: the middle of the water, at deck height.
 * Deck and coping, a tiled basin with a dark line down the middle of every lane (what makes it read as a pool
 * and gives a swimmer something to move over), water you can see into, ropes, starting blocks on the west end,
 * a ladder at each east corner.
 */
export const Pool: React.FC<{
  at?: Vec3;
  length?: number;
  width?: number;
  lanes?: number;
  depth?: number;
  deck?: number;
  blocks?: boolean;
  seed?: number;
}> = ({ at = [0, 0, 0], length = POOL.L, width = POOL.W, lanes = POOL.lanes, depth = POOL.D, deck = POOL.deck, blocks = true, seed = 3 }) => {
  const L = length;
  const W = width;
  const D = depth;
  const hL = L / 2;
  const hW = W / 2;
  const tile = "#e9dcc0";
  const cope = "#fbf8f0";
  return (
    <group position={at}>
      {/* deck, in four slabs around the water: warm stone, so the blue has something to sit against */}
      <Vox kind="stoneBrick" tint={tile} position={[0, -0.16, -(hW + deck / 2)]} size={[L + deck * 2, 0.32, deck]} />
      <Vox kind="stoneBrick" tint={tile} position={[0, -0.16, hW + deck / 2]} size={[L + deck * 2, 0.32, deck]} />
      <Vox kind="stoneBrick" tint={tile} position={[-(hL + deck / 2), -0.16, 0]} size={[deck, 0.32, W]} />
      <Vox kind="stoneBrick" tint={tile} position={[hL + deck / 2, -0.16, 0]} size={[deck, 0.32, W]} />
      {/* the coping: a white lip all the way round */}
      <Vox kind="wool" tint={cope} position={[0, 0.02, -(hW + 0.2)]} size={[L + 0.8, 0.08, 0.4]} castShadow={false} />
      <Vox kind="wool" tint={cope} position={[0, 0.02, hW + 0.2]} size={[L + 0.8, 0.08, 0.4]} castShadow={false} />
      <Vox kind="wool" tint={cope} position={[-(hL + 0.2), 0.02, 0]} size={[0.4, 0.08, W]} castShadow={false} />
      <Vox kind="wool" tint={cope} position={[hL + 0.2, 0.02, 0]} size={[0.4, 0.08, W]} castShadow={false} />

      {/* the basin */}
      <Vox kind="stoneBrick" tint="#5fb4d8" position={[0, -D - 0.12, 0]} size={[L, 0.24, W]} />
      <Vox kind="stoneBrick" tint="#57a9cf" position={[0, -D / 2, -hW - 0.12]} size={[L + 0.48, D, 0.24]} />
      <Vox kind="stoneBrick" tint="#57a9cf" position={[0, -D / 2, hW + 0.12]} size={[L + 0.48, D, 0.24]} />
      <Vox kind="stoneBrick" tint="#57a9cf" position={[-hL - 0.12, -D / 2, 0]} size={[0.24, D, W]} />
      <Vox kind="stoneBrick" tint="#57a9cf" position={[hL + 0.12, -D / 2, 0]} size={[0.24, D, W]} />
      {/* a dark line down every lane, with a T at each end */}
      {Array.from({ length: lanes }, (_, i) => {
        const z = -hW + ((i + 0.5) * W) / lanes;
        return (
          <group key={i}>
            <mesh position={[0, -D + 0.012, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[L - 3, 0.28]} />
              <meshStandardMaterial color="#1c4f86" roughness={0.6} />
            </mesh>
            {[-1, 1].map((s) => (
              <mesh key={s} position={[s * (hL - 1.5), -D + 0.012, z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.28, 1.0]} />
                <meshStandardMaterial color="#1c4f86" roughness={0.6} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* the water: a body you can see into, and a bright skin */}
      <mesh position={[0, (WL - D) / 2, 0]}>
        <boxGeometry args={[L - 0.02, D + WL - 0.02, W - 0.02]} />
        <meshStandardMaterial color="#1f8fd0" transparent opacity={0.42} roughness={0.12} metalness={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[0, WL, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[L, W]} />
        <meshStandardMaterial color="#49c3ee" transparent opacity={0.5} roughness={0.05} metalness={0.3} depthWrite={false} />
      </mesh>
      <Glints L={L} W={W} seed={seed} />

      {Array.from({ length: lanes + 1 }, (_, i) => (
        <Rope key={i} z={-hW + (i * W) / lanes} length={L - 0.3} />
      ))}

      {/* starting blocks on the west end, with a number on the back of each */}
      {blocks &&
        Array.from({ length: lanes }, (_, i) => {
          const z = -hW + ((i + 0.5) * W) / lanes;
          return (
            <group key={i} position={[-hL - 0.6, 0, z]}>
              <Vox kind="stone" tint="#dfe6e8" position={[0, 0.22, 0]} size={[0.5, 0.44, 0.6]} />
              <Vox kind="wool" tint={["#e0392b", "#2f7fd0", "#f0c030", "#3fa860"][i % 4]} position={[-0.02, 0.47, 0]} size={[0.62, 0.07, 0.66]} />
              <PixelText text={String(i + 1)} position={[-0.27, 0.24, 0]} rotationY={-Math.PI / 2} height={0.26} color="#2a3a48" />
            </group>
          );
        })}

      {/* a ladder at each east corner */}
      {[-1, 1].map((s) => (
        <group key={s} position={[hL - 1.2, 0, s * (hW + 0.02)]}>
          {[-0.22, 0.22].map((dx) => (
            <mesh key={dx} position={[dx, -0.25, 0]}>
              <boxGeometry args={[0.06, 1.7, 0.06]} />
              <meshStandardMaterial color="#d9dee2" metalness={0.8} roughness={0.25} />
            </mesh>
          ))}
          {[0.35, 0, -0.35, -0.7].map((y) => (
            <mesh key={y} position={[0, y, -s * 0.05]}>
              <boxGeometry args={[0.44, 0.05, 0.1]} />
              <meshStandardMaterial color="#d9dee2" metalness={0.8} roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------- swimming

export type SwimMode = "crawl" | "kick" | "glide" | "flail" | "tread" | "sink" | "float";


/**
 * A body in water, as a whole pose. Horizontal modes pitch the body onto its front (the hip is the pivot, the
 * head points where the body faces). `rate` is how hard: 1 is a kid swimming, 2.5 is the ring.
 *
 *   crawl  arms windmill, legs flutter, the head turns to breathe      kick   arms straight ahead on a wall, legs go mad
 *   glide  arms ahead, nothing moves                                   flail  upright, arms beat the water: he cannot swim
 *   tread  upright, hands scull: he has it, just                       sink   upright, arms up, slow: going down
 *   float  on the back, arms out
 */
export const swimPose = (mode: SwimMode, t: number, rate = 1): Pose => {
  const p = getPose("idle", 0);
  p.bodyY = 0;
  p.bodyRoll = 0;
  p.bodyYaw = 0;
  p.torso = [0, 0, 0];
  p.kneeR = [0, 0, 0];
  p.kneeL = [0, 0, 0];
  const th = t * rate * 5.4;
  switch (mode) {
    case "crawl": {
      p.bodyPitch = Math.PI / 2 - 0.05;
      p.bodyRoll = Math.sin(th) * 0.3;
      p.armR = [th, 0, 0.14];
      p.armL = [th + Math.PI, 0, -0.14];
      const k = Math.sin(th * 2.6);
      p.legR = [k * 0.42, 0, 0.03];
      p.legL = [-k * 0.42, 0, -0.03];
      p.kneeR = [Math.max(0, -k) * 0.35, 0, 0];
      p.kneeL = [Math.max(0, k) * 0.35, 0, 0];
      p.head = [-0.85, Math.max(0, Math.sin(th)) * 0.7, 0];
      return p;
    }
    case "kick": {
      const k = Math.sin(t * 15 * rate);
      p.bodyPitch = Math.PI / 2 - 0.3 + Math.sin(t * 7) * 0.05;
      p.bodyRoll = Math.sin(t * 9) * 0.1;
      p.armR = [-Math.PI + 0.25, 0, 0.1];
      p.armL = [-Math.PI + 0.25, 0, -0.1];
      p.legR = [k * 0.85, 0, 0.12];
      p.legL = [-k * 0.85, 0, -0.12];
      p.kneeR = [Math.max(0, -k) * 0.9, 0, 0];
      p.kneeL = [Math.max(0, k) * 0.9, 0, 0];
      p.head = [-1.0, Math.sin(t * 5) * 0.2, 0];
      return p;
    }
    case "glide": {
      p.bodyPitch = Math.PI / 2 - 0.04;
      p.armR = [-Math.PI + 0.06, 0, 0.06];
      p.armL = [-Math.PI + 0.06, 0, -0.06];
      p.legR = [0.04, 0, 0.02];
      p.legL = [-0.04, 0, -0.02];
      p.head = [-0.6, 0, 0];
      return p;
    }
    case "flail": {
      const s = Math.sin(t * 9.5 * rate);
      p.bodyPitch = 0.16 + Math.sin(t * 5.1) * 0.14;
      p.bodyRoll = Math.sin(t * 6.3) * 0.2;
      p.armR = [-2.3 + Math.sin(t * 11.3) * 0.95, 0, 0.75];
      p.armL = [-2.3 - Math.sin(t * 10.1) * 0.95, 0, -0.75];
      p.legR = [s * 0.8, 0, 0.1];
      p.legL = [-s * 0.8, 0, -0.1];
      p.kneeR = [Math.max(0, s) * 0.8, 0, 0];
      p.kneeL = [Math.max(0, -s) * 0.8, 0, 0];
      p.head = [-0.5, Math.sin(t * 7.7) * 0.45, Math.sin(t * 5.3) * 0.15];
      return p;
    }
    case "tread": {
      const s = Math.sin(t * 5.5 * rate);
      p.bodyPitch = 0.08;
      p.armR = [-0.5 + s * 0.2, 0, 1.15 + s * 0.3];
      p.armL = [-0.5 - s * 0.2, 0, -1.15 + s * 0.3];
      p.legR = [s * 0.55, 0, 0.2];
      p.legL = [-s * 0.55, 0, -0.2];
      p.kneeR = [0.4 + Math.max(0, s) * 0.5, 0, 0];
      p.kneeL = [0.4 + Math.max(0, -s) * 0.5, 0, 0];
      p.head = [-0.3, 0, 0];
      return p;
    }
    case "sink": {
      const s = Math.sin(t * 2.2);
      p.bodyPitch = -0.12 + s * 0.05;
      p.bodyRoll = Math.sin(t * 1.3) * 0.08;
      p.armR = [-2.75 + s * 0.2, 0, 0.35];
      p.armL = [-2.75 - s * 0.2, 0, -0.35];
      p.legR = [0.25 + s * 0.2, 0, 0.12];
      p.legL = [-0.1 - s * 0.2, 0, -0.12];
      p.kneeR = [0.5, 0, 0];
      p.kneeL = [0.3, 0, 0];
      p.head = [-0.55, 0, 0];
      return p;
    }
    default: {
      p.bodyPitch = -Math.PI / 2 + 0.06;
      p.armR = [0, 0, 1.2 + Math.sin(t * 1.6) * 0.1];
      p.armL = [0, 0, -1.2 - Math.sin(t * 1.6) * 0.1];
      p.legR = [0.05, 0, 0.14];
      p.legL = [-0.05, 0, -0.14];
      p.head = [0, 0, 0];
      return p;
    }
  }
};

const HIP_M = 0.675;

type Who = "hero" | "friend" | "rival" | number;

const KID_SHIRTS = ["#2f7fd0", "#f0c030", "#8a4fd0", "#f08030", "#3fb8a8", "#e86aa8", "#6a8f2f", "#d0d4dc", "#b84a2a", "#4a5fd0"];
const KID_SKIN = ["#e6b98f", "#c99a74", "#f0c8a0", "#a87850", "#dca47a"];
const KID_HAIR = ["#3a2717", "#141414", "#8a5a2a", "#d8b060", "#5a3a20"];

/** One of the town's other kids. `n` picks the shirt, the skin, the hair and the height. */
export const Kid: React.FC<Partial<MinecraftAvatarProps> & { n: number }> = ({ n, ...p }) => (
  <MinecraftAvatar
    scale={KID * (0.92 + ((n * 7) % 5) * 0.035)}
    outfit="tee"
    skin={KID_SKIN[n % KID_SKIN.length]}
    hair={KID_HAIR[(n * 3) % KID_HAIR.length]}
    colors={{ torso: KID_SHIRTS[n % KID_SHIRTS.length], arms: KID_SKIN[n % KID_SKIN.length], legs: ["#26355e", "#40342c", "#2c4a3a"][n % 3] }}
    blink
    {...p}
  />
);

/** A patch of white water: foam where arms and feet break the surface. `at` is on the water line. */
export const Foam: React.FC<{ at: Vec3; t: number; size?: number; n?: number; seed?: number }> = ({ at, t, size = 1, n = 7, seed = 1 }) => {
  const rnd = mulberry32(seed * 31 + 7);
  return (
    <group position={at}>
      {Array.from({ length: n }, (_, i) => {
        const a = rnd() * 6.28;
        const r = rnd() * 0.5 * size;
        const k = 0.55 + 0.45 * Math.sin(t * (9 + rnd() * 6) + i * 1.7);
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.03 + k * 0.05, Math.sin(a) * r]} rotation={[-Math.PI / 2, 0, a]}>
            <planeGeometry args={[(0.22 + rnd() * 0.3) * size * (0.6 + 0.4 * k), (0.14 + rnd() * 0.18) * size]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.55 + 0.4 * k} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Drops thrown up off the water: a splash. `k` 0 → 1 is its life (rise, hang, fall, gone). */
export const Splash: React.FC<{ at: Vec3; k: number; size?: number; n?: number; seed?: number }> = ({ at, k, size = 1, n = 14, seed = 5 }) => {
  if (k <= 0 || k >= 1) return null;
  const rnd = mulberry32(seed * 17 + 3);
  return (
    <group position={at}>
      {Array.from({ length: n }, (_, i) => {
        const a = rnd() * 6.28;
        const out = (0.25 + rnd() * 0.9) * size;
        const up = (0.9 + rnd() * 1.3) * size;
        const s = (0.07 + rnd() * 0.1) * size * (1 - k * 0.5);
        return (
          <mesh key={i} position={[Math.cos(a) * out * k, up * 4 * k * (1 - k), Math.sin(a) * out * k]}>
            <boxGeometry args={[s, s, s]} />
            <meshStandardMaterial color="#e8f8ff" emissive="#bfe8ff" emissiveIntensity={0.35} transparent opacity={0.9 * (1 - k * k)} />
          </mesh>
        );
      })}
      <Foam at={[0, 0, 0]} t={k * 3} size={size * (0.8 + k)} n={8} seed={seed} />
    </group>
  );
};

/** Bubbles going up from a mouth or a foot, under water. */
export const Bubbles: React.FC<{ at: Vec3; t: number; n?: number; rise?: number; spread?: number; seed?: number }> = ({ at, t, n = 9, rise = 1.6, spread = 0.25, seed = 2 }) => {
  const rnd = mulberry32(seed * 13 + 1);
  return (
    <group position={at}>
      {Array.from({ length: n }, (_, i) => {
        const ph = rnd();
        const k = (t * (0.5 + rnd() * 0.4) + ph) % 1;
        const s = 0.04 + rnd() * 0.07;
        const a = rnd() * 6.28;
        return (
          <mesh key={i} position={[Math.cos(a) * spread * (0.3 + k) + Math.sin(t * 5 + i) * 0.03, k * rise, Math.sin(a) * spread * (0.3 + k)]}>
            <boxGeometry args={[s, s, s]} />
            <meshStandardMaterial color="#eafaff" emissive="#cfefff" emissiveIntensity={0.6} transparent opacity={0.75 * (1 - k * 0.6)} />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * Under water, things further away are bluer. A pool has no fog, so a shot that goes under puts these sheets
 * across the lens' view: `at` is a point in the water ahead of the camera, `yaw` the way the camera looks.
 */
export const Murk: React.FC<{ at: Vec3; yaw?: number; n?: number; gap?: number; size?: number; opacity?: number }> = ({ at, yaw = 0, n = 5, gap = 1.6, size = 30, opacity = 0.16 }) => (
  <group position={at} rotation={[0, yaw, 0]}>
    {Array.from({ length: n }, (_, i) => (
      <mesh key={i} position={[0, 0, -i * gap]}>
        <planeGeometry args={[size, 8]} />
        <meshBasicMaterial color="#1877c8" transparent opacity={opacity} depthWrite={false} side={2} />
      </mesh>
    ))}
  </group>
);

/** Where `Swim` puts a body, and in what pose: for a lens or a light that has to find a hand (`bandAt`). */
export const swimBody = (at: Vec3, heading: number, mode: SwimMode, t: number, rate = 1, depth = 0, seed = 1, given?: Pose): { position: Vec3; rotationY: number; pose: Pose } => {
  const flat = mode === "crawl" || mode === "kick" || mode === "glide" || mode === "float";
  const y = flat ? at[1] - HIP_M * KID + (mode === "float" ? -0.02 : -0.06) - depth : at[1] - 1.5 * KID * 0.86 - depth + (mode === "flail" ? Math.sin(t * 6.1) * 0.09 : 0);
  return { position: [at[0], y, at[2]], rotationY: heading, pose: given ?? swimPose(mode, t + seed * 0.37, rate) };
};

/**
 * Someone in the water. `at` is where they are ON THE WATER LINE (y = WL); `heading` is where the head points
 * (the staging constants: EAST, WEST …). `depth` pushes the body under (metres). Horizontal modes leave foam
 * behind the feet and at the hands; upright modes churn it all round.
 */
export const Swim: React.FC<{
  who?: Who;
  at: Vec3;
  heading?: number;
  mode?: SwimMode;
  t: number;
  rate?: number;
  depth?: number;
  ring?: boolean | 1 | 2 | 3;
  face?: FaceName;
  foam?: number;
  seed?: number;
  headYaw?: number;
  /** Replace the stroke with a pose of your own (the body is still put in the water the same way). */
  pose?: Pose;
}> = ({ who = "hero", at, heading = 0, mode = "crawl", t, rate = 1, depth = 0, ring = false, face, foam = 1, seed = 1, headYaw, pose: given }) => {
  const flat = mode === "crawl" || mode === "kick" || mode === "glide" || mode === "float";
  const placed = swimBody(at, heading, mode, t, rate, depth, seed, given);
  const pose = placed.pose;
  if (headYaw !== undefined) pose.head = [pose.head[0], headYaw, pose.head[2]];
  const body = { position: placed.position, rotationY: heading, pose, face, shadow: false, breath: 0, weightShift: 0 };
  const fx = Math.sin(heading);
  const fz = Math.cos(heading);
  const wet = depth < 0.5 && foam > 0;
  return (
    <>
      <Cast who={who} ring={ring} {...body} />
      {wet && flat && mode !== "float" && mode !== "glide" ? (
        <>
          <Foam at={[at[0] - fx * 0.75, at[1], at[2] - fz * 0.75]} t={t} size={(mode === "kick" ? 1.25 : 0.8 + 0.25 * rate) * foam} seed={seed} />
          <Foam at={[at[0] + fx * 0.75, at[1], at[2] + fz * 0.75]} t={t + 1} size={(mode === "kick" ? 0.3 : 0.55 + 0.2 * rate) * foam} n={5} seed={seed + 3} />
          {mode === "crawl" && rate > 0.6
            ? [1, 2, 3, 4].map((i) => (
                <Foam key={i} at={[at[0] - fx * (0.9 + i * 0.75 * rate), at[1], at[2] - fz * (0.9 + i * 0.75 * rate)]} t={t + i} size={(0.75 - i * 0.13) * (0.6 + 0.4 * rate) * foam} n={5} seed={seed + i * 5} />
              ))
            : null}
        </>
      ) : null}
      {wet && !flat ? <Foam at={[at[0], at[1], at[2]]} t={t} size={(mode === "flail" ? 1.5 : mode === "tread" ? 0.9 : 0.5) * foam} n={mode === "flail" ? 12 : 7} seed={seed} /> : null}
    </>
  );
};

// ----------------------------------------------------------------------------- round the pool

/**
 * A stand: steps of planks with the town sitting on them. `at` is the middle of the front edge, on the ground;
 * the seats look along local +Z (`turn` 0: they face south; Math.PI: north) and each row is higher and further back.
 * Villagers and kids, mixed. `cheer` 0–1 gets the kids on their feet with their arms up; `t` is the stage clock.
 */
export const Stand: React.FC<{ at: Vec3; rows?: number; width?: number; turn?: number; look?: Vec3; cheer?: number; t?: number; seed?: number }> = ({
  at,
  rows = 4,
  width = 26,
  turn = 0,
  look,
  cheer = 0,
  t = 0,
  seed = 1,
}) => {
  const fz = Math.cos(turn);
  const fx = Math.sin(turn);
  const eye: Vec3 = look ?? [at[0] + fx * 9, 0.2, at[2] + fz * 9];
  const rnd = mulberry32(seed * 101 + 9);
  return (
    <group position={at} rotation={[0, turn, 0]}>
      {/* The group is turned, so `lookAt` (a world point) is given to people who take one; they are not turned twice. */}
      {Array.from({ length: rows }, (_, i) => (
        <group key={i}>
          <Vox kind="planks" tint={i % 2 ? "#b9a58a" : "#c8b496"} position={[0, 0.3 + i * 0.6, -i * 0.95 - 0.45]} size={[width, 0.6, 0.95]} />
          {Array.from({ length: Math.floor(width / 1.25) }, (_, j) => {
            const r = rnd();
            const x = -width / 2 + 0.7 + j * 1.25 + (rnd() - 0.5) * 0.3;
            if (r < 0.12) return null;
            const seat: Vec3 = [x, 0.6 + i * 0.6, -i * 0.95 - 0.5];
            if (r < 0.5) {
              const up = cheer > 0 ? cheer * Math.abs(Math.sin(t * 5.2 + j * 1.3 + i)) * 0.18 : 0;
              return (
                <Kid
                  key={j}
                  n={i * 7 + j}
                  position={[seat[0], seat[1] + up, seat[2] + 0.12]}
                  animation={cheer > 0.5 ? "cheer" : "sit"}
                  phase={j * 0.7 + i}
                  face={cheer > 0.5 ? "laugh" : "smile"}
                  shadow={false}
                />
              );
            }
            return (
              <Villager
                key={j}
                position={[seat[0], seat[1] - 0.04, seat[2] - 0.05]}
                robe={[ROBE.brown, ROBE.white, ROBE.farmer, ROBE.blue, ROBE.red][(i + j) % 5]}
                sit
                lookAt={eye}
                hmm={cheer > 0 ? cheer * (0.5 + 0.5 * Math.sin(t * 6 + j)) : 0}
                phase={i * 1.7 + j * 0.6}
              />
            );
          })}
        </group>
      ))}
      <Vox kind="log" position={[-width / 2 - 0.1, rows * 0.3, -rows * 0.475]} size={[0.2, rows * 0.6, rows * 0.95]} />
      <Vox kind="log" position={[width / 2 + 0.1, rows * 0.3, -rows * 0.475]} size={[0.2, rows * 0.6, rows * 0.95]} />
    </group>
  );
};

/** A sun parasol: a pole and a striped top. */
export const Parasol: React.FC<{ position: Vec3; color?: string; lean?: number }> = ({ position, color = "#e0392b", lean = 0.08 }) => (
  <group position={position} rotation={[0, 0, lean]}>
    <Vox kind="log" tint="#d8d0c0" position={[0, 1.15, 0]} size={[0.09, 2.3, 0.09]} />
    {[0, 1, 2, 3].map((i) => (
      <Vox key={i} kind="wool" tint={i % 2 ? "#fbf8f0" : color} position={[0, 2.3 + i * 0.1, 0]} size={[2.4 - i * 0.6, 0.1, 2.4 - i * 0.6]} />
    ))}
  </group>
);

/** A sun lounger with a towel on it. */
export const Lounger: React.FC<{ position: Vec3; rotationY?: number; towel?: string }> = ({ position, rotationY = 0, towel = "#f0c030" }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" tint="#f2ead8" position={[0, 0.3, 0]} size={[0.7, 0.1, 1.5]} />
    <Vox kind="planks" tint="#f2ead8" position={[0, 0.5, -0.9]} size={[0.7, 0.1, 0.6]} rotation={[-0.8, 0, 0]} />
    <Vox kind="wool" tint={towel} position={[0, 0.37, 0.1]} size={[0.6, 0.05, 1.1]} />
    {[-0.6, 0.6].map((z) => (
      <Vox key={z} kind="log" tint="#d8d0c0" position={[0, 0.14, z]} size={[0.6, 0.28, 0.08]} />
    ))}
  </group>
);

/** The lifeguard's high chair. `position` is the ground under it; the seat is 1.7 m up and looks along local +Z. */
export const LifeguardChair: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {[[-0.45, -0.35], [0.45, -0.35], [-0.45, 0.35], [0.45, 0.35]].map(([x, z], i) => (
      <Vox key={i} kind="planks" tint="#fbf8f0" position={[x, 0.85, z]} size={[0.1, 1.7, 0.1]} />
    ))}
    <Vox kind="planks" tint="#fbf8f0" position={[0, 1.7, 0]} size={[1.1, 0.1, 0.9]} />
    <Vox kind="planks" tint="#e0392b" position={[0, 2.25, -0.4]} size={[1.1, 1.0, 0.1]} />
    {[0.45, 0.9, 1.3].map((y) => (
      <Vox key={y} kind="planks" tint="#fbf8f0" position={[0, y, 0.42]} size={[0.9, 0.07, 0.07]} />
    ))}
    <Vox kind="wool" tint="#e0392b" position={[0.75, 1.2, 0]} size={[0.14, 0.7, 0.7]} />
    <Vox kind="wool" tint="#fbf8f0" position={[0.76, 1.2, 0]} size={[0.15, 0.25, 0.25]} />
  </group>
);

/** A line of little flags between two points. */
export const Bunting: React.FC<{ from: Vec3; to: Vec3; n?: number; sag?: number; t?: number }> = ({ from, to, n = 14, sag = 0.5, t = 0 }) => {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const yaw = Math.atan2(dx, dz) + Math.PI / 2;
  const cols = ["#e0392b", "#f0c030", "#2f7fd0", "#fbf8f0", "#3fa860"];
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const k = (i + 0.5) / n;
        const drop = Math.sin(k * Math.PI) * sag;
        return (
          <mesh key={i} position={[from[0] + dx * k, from[1] + (to[1] - from[1]) * k - drop - 0.2, from[2] + dz * k]} rotation={[Math.sin(t * 2.4 + i) * 0.25, yaw, 0]}>
            <planeGeometry args={[0.42, 0.5]} />
            <meshStandardMaterial color={cols[i % cols.length]} side={2} roughness={0.8} />
          </mesh>
        );
      })}
    </>
  );
};

/** A springboard over the deep end. `position` is where it leaves the deck; it reaches 2 m out along local −X. */
export const DivingBoard: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="stone" tint="#dfe6e8" position={[0.5, 0.35, 0]} size={[0.8, 0.7, 0.7]} />
    <Vox kind="wool" tint="#2f7fd0" position={[-0.6, 0.76, 0]} size={[3.0, 0.08, 0.5]} />
  </group>
);

/** A rubber ring or a pair of armbands, for the little kids who swim better than he does. */
export const Floatie: React.FC<{ position: Vec3; color?: string; scale?: number }> = ({ position, color = "#f0c030", scale = 1 }) => (
  <mesh position={position} rotation={[Math.PI / 2, 0, 0]} scale={scale}>
    <torusGeometry args={[0.3, 0.11, 8, 14]} />
    <meshStandardMaterial color={color} roughness={0.5} />
  </mesh>
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
export const Ring: React.FC<{
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
  glow?: number;
  lit?: 0 | 1 | 2 | 3;
  tint?: string;
}> = ({ position, rotation = [0, 0, 0], scale = 1, glow = 0.4, tint = "#e6c068" }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.027, 0.0085, 12, 28]} />
      <meshStandardMaterial color={tint} metalness={0.95} roughness={0.22} emissive="#4a3408" emissiveIntensity={glow} />
    </mesh>
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
    <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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

// ----------------------------------------------------------------------------- the two pools, alive

/** A sheet of blue under the surface and sheets of blue into the distance: what turns a shot under water blue. */
export const Under: React.FC<{ on: Vec3; yaw?: number; dist?: number; far?: number; opacity?: number; top?: number }> = ({ on, yaw = 0, dist = 4, far = 9, opacity = 0.15, top = 0.9 }) => {
  const a = yaw * (Math.PI / 180);
  const n = 6;
  return (
    <>
      <mesh position={[on[0], WL - 0.01, on[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial color="#8fdcf6" transparent opacity={top} side={2} depthWrite={false} />
      </mesh>
      <group position={[on[0] + Math.sin(a) * dist * 0.55, -1.2, on[2] + Math.cos(a) * dist * 0.55]} rotation={[0, a, 0]}>
        {Array.from({ length: n }, (_, i) => (
          <mesh key={i} position={[0, 0, -(i * (dist * 0.55 + far)) / n]}>
            <planeGeometry args={[60, 4]} />
            <meshBasicMaterial color="#1670c4" transparent opacity={opacity} depthWrite={false} side={2} />
          </mesh>
        ))}
      </group>
    </>
  );
};

/**
 * The town pool on an ordinary morning: two kids doing lengths in the far lanes, the lifeguard on his chair,
 * a mother under a parasol, little kids with their feet in the water, floats adrift. Drawn in every pool shot,
 * on the film's own clock, so the place carries on between cuts. `lanes` are the far lanes that have a swimmer.
 */
export const PoolLife: React.FC<{ lanes?: number[]; kids?: boolean; quiet?: boolean }> = ({ lanes = [1, 2], kids = true, quiet = false }) => {
  const t = useFilmTime();
  const lap = (speed: number, ph: number) => {
    const u = ((t * speed + ph) % 2 + 2) % 2;
    const going = u < 1;
    return { x: -6.6 + (going ? u : 2 - u) * 13.2, heading: going ? Math.PI / 2 : -Math.PI / 2 };
  };
  if (quiet) return null;
  return (
    <>
      {lanes.map((ln, i) => {
        const l = lap(0.085 + i * 0.022, i * 0.63 + 0.2);
        return <Swim key={ln} who={3 + i * 4} at={P(l.x, WL, laneZ(ln, POOL))} heading={l.heading} mode="crawl" t={t} rate={0.85 + i * 0.15} seed={ln + 2} />;
      })}
      <Villager position={P(-1.6, 1.75 - 0.56 * 0.94, -5.85)} robe={ROBE.white} sit lookAt={P(Math.sin(t * 0.5) * 6, 0, 1)} phase={0.4} />
      <Villager position={P(3.0, 0, -5.2)} rotationY={0.4} robe={ROBE.farmer} hmm={0.5 + 0.5 * Math.sin(t * 2.2)} lookAt={P(4.6, 1, -5.0)} phase={1.2} />
      <Villager position={P(4.7, 0, -5.0)} rotationY={-0.7} robe={ROBE.blue} lookAt={P(3.0, 1.4, -5.2)} phase={2.3} />
      {kids ? (
        <>
          <Kid n={2} scale={KID * 0.7} position={P(5.6, -0.38, -4.02)} animation="sit" phase={0.3} face="smile" shadow={false} />
          <Kid n={5} scale={KID * 0.66} position={P(6.5, -0.36, -4.02)} animation="sit" phase={1.3} face="grin" shadow={false} />
          <Floatie position={P(6.1 + Math.sin(t * 0.4) * 0.3, WL + 0.06, -2.6)} color="#f0c030" />
          <Floatie position={P(-3.2 + Math.sin(t * 0.3) * 0.4, WL + 0.06, -1.9)} color="#e86aa8" scale={0.8} />
        </>
      ) : null}
    </>
  );
};

/**
 * The contest ground's people: the stand on the north side (and the south one when the lens looks that way),
 * the starter and two judges. `cheer` 0–1 gets them going; `t` is the shot's clock.
 */
export const ArenaCrowd: React.FC<{ t: number; cheer?: number; south?: boolean; north?: boolean; rows?: number }> = ({ t, cheer = 0, south = false, north = true, rows = 4 }) => (
  <>
    {north ? <Stand at={R(0, 0, -13.9)} width={30} rows={rows} turn={0} look={R(0, 0, 0)} cheer={cheer} t={t} seed={1} /> : null}
    {south ? <Stand at={R(0, 0, 13.9)} width={30} rows={rows} turn={Math.PI} look={R(0, 0, 0)} cheer={cheer} t={t} seed={2} /> : null}
    <Villager position={R(-17.6, 0, -11.2)} rotationY={Math.PI / 2} robe={ROBE.white} lookAt={R(0, 0.5, 0)} phase={0.3} />
    <Villager position={R(16.9, 0, -4.6)} rotationY={-Math.PI / 2} robe={ROBE.brown} lookAt={R(10, 0, 0)} hmm={cheer} phase={1.1} />
    <Villager position={R(16.9, 0, 5.2)} rotationY={-Math.PI / 2} robe={ROBE.blue} lookAt={R(10, 0, 0)} hmm={cheer} phase={2.1} />
  </>
);

// ----------------------------------------------------------------------------- the race

/** The race starts on the first word of `8.water`; `raceS(cue, t)` is seconds since then, for a shot's clock `t`. */
const RACE_START = (timing.cues.find((c) => c.id === "8.water")?.start ?? 0) + 0.25;
export const raceS = (cue: string, t: number) => (timing.cues.find((c) => c.id === cue)?.start ?? 0) + t - RACE_START;

const lerpKeys = (keys: Array<[number, number]>, s: number) => {
  if (s <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (s <= keys[i][0]) {
      const [a, va] = keys[i - 1];
      const [b, vb] = keys[i];
      return va + ((vb - va) * (s - a)) / (b - a);
    }
  }
  return keys[keys.length - 1][1];
};

/**
 * Where everybody is, `s` seconds into the race. x runs −15 (the start wall) to +15 (the finish).
 * Everybody but him gets a clean dive (they come up at −12); he lands flat and comes up at −13.5, last. Then the
 * ring: past two by 2.2 s, a third by 2.9, three more by 4.1, one at 9.8 and one at 10.5 — the narration's own
 * times for "tenth … eighth … seventh … fourth … third … second" — and then a body behind lane 6 to the wall.
 */
export const HERO_LANE = 5;
export const RIVAL_LANE = 6;
const FIELD: Array<{ lane: number; v: number; who: number }> = [
  { lane: 3, v: 1.0, who: 1 },
  { lane: 8, v: 1.03, who: 2 },
  { lane: 2, v: 1.09, who: 4 },
  { lane: 9, v: 1.27, who: 6 },
  { lane: 1, v: 1.31, who: 7 },
  { lane: 10, v: 1.34, who: 8 },
  { lane: 4, v: 1.72, who: 9 },
  { lane: 7, v: 1.745, who: 0 },
];
const FIN = 14.3;
export const fieldX = (v: number, s: number) => Math.min(FIN, -12 + v * Math.max(0, s));
export const heroX = (s: number) => lerpKeys([[0, -13.5], [1.2, -12.9], [2.2, -9.8], [2.9, -8.8], [4.1, -6.5], [9.8, 4.9], [10.5, 6.3], [11.5, 8.2], [14.25, 13.2], [14.9, FIN]], s);
export const rivalX = (s: number) => fieldX(1.85, s);

/** All ten in the water. `only` draws just some lanes (a close shot does not need the far ones). */
export const Race: React.FC<{ s: number; t: number; only?: number[]; heroRate?: number; heroFace?: FaceName; rivalRate?: number }> = ({ s, t, only, heroRate = 1.9, heroFace = "brave", rivalRate = 2.0 }) => {
  const show = (lane: number) => !only || only.includes(lane);
  return (
    <>
      {FIELD.map((f) =>
        show(f.lane) ? (
          <Swim key={f.lane} who={f.who} at={R(fieldX(f.v, s), WL, laneZ(f.lane))} heading={Math.PI / 2} mode="crawl" t={t} rate={0.7 + f.v * 0.45} seed={f.lane} />
        ) : null,
      )}
      {show(RIVAL_LANE) ? <Swim who="rival" ring at={R(rivalX(s), WL, laneZ(RIVAL_LANE))} heading={Math.PI / 2} mode={rivalX(s) >= FIN ? "glide" : "crawl"} t={t} rate={rivalRate} seed={11} /> : null}
      {show(HERO_LANE) ? <Swim who="hero" ring at={R(heroX(s), WL, laneZ(HERO_LANE))} heading={Math.PI / 2} mode={heroX(s) >= FIN ? "glide" : "crawl"} t={t} rate={heroRate} face={heroFace} seed={12} /> : null}
    </>
  );
};

// ----------------------------------------------------------------------------- bodies doing pool things

/** A clip with some of its joints replaced: `posed("idle", t, { armR: [-2, 0, 0] })`. */
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });

type CastProps = Partial<MinecraftAvatarProps> & { who?: Who; ring?: boolean | 1 | 2 | 3 };
/** Any of the film's kids by name or number. */
export const Cast: React.FC<CastProps> = ({ who = "hero", ring = false, ...p }) =>
  who === "hero" ? <Hero ring={ring} {...p} /> : who === "friend" ? <Friend {...p} /> : who === "rival" ? <Rival ring={!!ring} {...p} /> : <Kid n={who} {...p} />;

/** Where `Hang` puts a body, and in what pose. */
export const hangBody = (wall: Vec3, heading = 0, k = 0, t = 0, kick = 1, armR?: [number, number, number], armL?: [number, number, number]): { position: Vec3; rotationY: number; pose: Pose } => {
  const back = 0.92 - 0.6 * k;
  const hipY = WL - 0.08 - 0.3 * k;
  const pose = swimPose("kick", t, Math.max(0.05, kick));
  pose.bodyPitch = (Math.PI / 2 - 0.3) * (1 - k) + 0.1 * k + Math.sin(t * 7) * 0.04 * kick;
  pose.armR = armR ?? [-Math.PI + 0.25 + 0.2 * k, 0, 0.1];
  pose.armL = armL ?? [-Math.PI + 0.25 + 0.2 * k, 0, -0.1];
  pose.head = [-1.0 + 0.75 * k, 0, 0];
  return { position: [wall[0] - Math.sin(heading) * back, hipY - HIP_M * KID, wall[2] - Math.cos(heading) * back], rotationY: heading, pose };
};

const turn3 = (v: Vec3, e: readonly [number, number, number]): Vec3 => {
  let [x, y, z] = v;
  let c = Math.cos(e[2]);
  let n = Math.sin(e[2]);
  [x, y] = [x * c - y * n, x * n + y * c];
  c = Math.cos(e[1]);
  n = Math.sin(e[1]);
  [x, z] = [x * c + z * n, -x * n + z * c];
  c = Math.cos(e[0]);
  n = Math.sin(e[0]);
  [y, z] = [y * c - z * n, y * n + z * c];
  return [x, y, z];
};
/**
 * Where the band is, in the world: on the right wrist of a body at `position`, facing `rotationY`, in `pose`.
 * (The right arm hangs off the body's +X shoulder; the band sits 0.53 m down it. `along` −0.62 is the fist.)
 * This is how a close shot finds a wrist without guessing.
 */
export const bandAt = (body: { position: Vec3; rotationY: number; pose: Pose }, scale = KID, along = -0.529, side = 0): Vec3 => {
  const PX = 1.8 / 32;
  const a = turn3([side, along, 0], body.pose.armR);
  const b = turn3([6 * PX + a[0], 12 * PX + a[1], a[2]], [body.pose.bodyPitch, body.pose.bodyYaw, body.pose.bodyRoll]);
  const w = turn3([b[0] * scale, (b[1] + 12 * PX + body.pose.bodyY) * scale, b[2] * scale], [0, body.rotationY, 0]);
  return [body.position[0] + w[0], body.position[1] + w[1], body.position[2] + w[2]];
};

/**
 * Holding the pool wall. `wall` is the point on the coping the hands are on; `heading` is the way the face points
 * (at the wall). `k` 0 is flat out behind the hands, kicking; 1 is hanging straight down off them.
 */
export const Hang: React.FC<{ who?: Who; wall: Vec3; heading?: number; k?: number; t: number; kick?: number; face?: FaceName; ring?: boolean | 1 | 2 | 3; headYaw?: number; headPitch?: number; armR?: [number, number, number]; armL?: [number, number, number] }> = ({
  who = "hero",
  wall,
  heading = 0,
  k = 0,
  t,
  kick = 1,
  face,
  ring = false,
  headYaw = 0,
  headPitch = 0,
  armR,
  armL,
}) => {
  const { position: at, pose } = hangBody(wall, heading, k, t, kick, armR, armL);
  return (
    <>
      <Cast who={who} ring={ring} position={at} rotationY={heading} pose={pose} face={face} headYaw={headYaw} headPitch={headPitch} shadow={false} breath={0} weightShift={0} />
      {kick > 0.3 && k < 0.6 ? <Foam at={[wall[0] - Math.sin(heading) * 1.7, WL, wall[2] - Math.cos(heading) * 1.7]} t={t} size={1.5 * kick} n={12} seed={4} /> : null}
    </>
  );
};

/**
 * A dive off a block (or a jump off the deck). Before `at` the body waits bent on `from`; it flies `reach` metres
 * along `heading`, goes in with a splash, and swims on at `speed`. `at` is in the shot's seconds.
 */
export const Dive: React.FC<{
  who?: Who;
  from: Vec3;
  heading?: number;
  t: number;
  at: number;
  reach?: number;
  speed?: number;
  rate?: number;
  ring?: boolean | 1 | 2 | 3;
  face?: FaceName;
  seed?: number;
  /** After the splash: swim on, or go under and stay there. */
  then?: SwimMode;
}> = ({ who = "hero", from, heading = Math.PI / 2, t, at, reach = 2.6, speed = 1.5, rate = 1, ring = false, face, seed = 1, then = "crawl" }) => {
  const fx = Math.sin(heading);
  const fz = Math.cos(heading);
  const fly = 0.5;
  const k = (t - at) / fly;
  if (k < 0) {
    const wind = ease(ramp(t, at - 0.4, at));
    const pose = getPose("idle", 0);
    pose.bodyPitch = 0.55 + wind * 0.45;
    pose.bodyY = -0.1 - wind * 0.08;
    pose.armR = [0.5 + wind * 0.7, 0, 0.1];
    pose.armL = [0.5 + wind * 0.7, 0, -0.1];
    pose.legR = [-0.7 - wind * 0.3, 0, 0.03];
    pose.legL = [-0.7 - wind * 0.3, 0, -0.03];
    pose.kneeR = [0.9 + wind * 0.4, 0, 0];
    pose.kneeL = [0.9 + wind * 0.4, 0, 0];
    pose.head = [-0.5, 0, 0];
    return <Cast who={who} ring={ring} position={from} rotationY={heading} pose={pose} face={face} />;
  }
  if (k < 1) {
    const hipFrom = from[1] + HIP_M * KID;
    const hipY = hipFrom + (WL - 0.1 - hipFrom) * k + 0.75 * 4 * k * (1 - k) * 0.5;
    const pose = getPose("idle", 0);
    pose.bodyPitch = 1.0 + k * 1.0;
    pose.bodyY = 0;
    pose.armR = [-Math.PI + 0.1, 0, 0.06];
    pose.armL = [-Math.PI + 0.1, 0, -0.06];
    pose.legR = [0.1, 0, 0.02];
    pose.legL = [0.1, 0, -0.02];
    pose.head = [-0.4, 0, 0];
    return <Cast who={who} ring={ring} position={[from[0] + fx * reach * k, hipY - HIP_M * KID, from[2] + fz * reach * k]} rotationY={heading} pose={pose} face={face} shadow={false} />;
  }
  const s = t - at - fly;
  const d = reach + 0.4 + speed * s;
  const entry: Vec3 = [from[0] + fx * (reach + 0.3), WL, from[2] + fz * (reach + 0.3)];
  return (
    <>
      <Swim who={who} ring={ring} at={[from[0] + fx * d, WL, from[2] + fz * d]} heading={heading} mode={then} t={t} rate={rate} face={face} seed={seed} depth={then === "sink" ? Math.min(1.5, s * 1.4) : Math.max(0, 0.3 - s * 0.8)} />
      <Splash at={entry} k={s / 0.7} size={1.2} seed={seed} />
    </>
  );
};

/** Water falling from a shower rose (or off a wet kid): thin bright streaks. `top` is where it starts. */
export const Drops: React.FC<{ top: Vec3; t: number; height?: number; spread?: number; n?: number; seed?: number; speed?: number }> = ({ top, t, height = 2.4, spread = 0.2, n = 34, seed = 1, speed = 2.2 }) => {
  const rnd = mulberry32(seed * 7 + 5);
  return (
    <group position={top}>
      {Array.from({ length: n }, (_, i) => {
        const a = rnd() * 6.28;
        const r = Math.sqrt(rnd()) * spread;
        const k = (t * speed * (0.8 + rnd() * 0.4) + rnd()) % 1;
        return (
          <mesh key={i} position={[Math.cos(a) * r * (1 + k * 0.6), -k * height, Math.sin(a) * r * (1 + k * 0.6)]}>
            <boxGeometry args={[0.018, 0.16, 0.018]} />
            <meshBasicMaterial color="#d8f2ff" transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

/** A towel over a shoulder or on the ground: a soft slab. */
export const Towel: React.FC<{ position: Vec3; color?: string; rotation?: Vec3; size?: Vec3 }> = ({ position, color = "#f0c030", rotation = [0, 0, 0], size = [0.5, 0.05, 0.9] }) => (
  <Vox kind="wool" tint={color} position={position} rotation={rotation} size={size} castShadow={false} />
);

/** On hands and knees, coughing. `cough` 0–1 jerks the body. */
export const allFours = (t: number, cough = 0): Pose => {
  const p = getPose("idle", 0);
  const j = cough * Math.max(0, Math.sin(t * 13)) * 0.12;
  p.bodyPitch = 1.25 + j;
  p.bodyY = -0.34;
  p.armR = [-1.3 - j, 0, 0.1];
  p.armL = [-1.3 - j, 0, -0.1];
  p.legR = [-1.25, 0, 0.05];
  p.legL = [-1.25, 0, -0.05];
  p.kneeR = [1.5, 0, 0];
  p.kneeL = [1.5, 0, 0];
  p.head = [-0.5 + j * 3, 0, 0];
  p.torso = [0, 0, 0];
  return p;
};

/** Flat on the back on the tiles, arms out: done. `breath` lifts the chest. */
export const flatOut = (t: number): Pose => {
  const p = getPose("lie", t);
  p.armR = [0, 0, 1.25];
  p.armL = [0, 0, -1.25];
  p.legR = [0, 0, 0.16];
  p.legL = [0, 0, -0.16];
  p.bodyY = -0.125 + Math.sin(t * 5.5) * 0.012;
  return p;
};

/** The eased progress a `cam.truck` uses: give it the shot's own `p` and a body rides in the frame. */
export const sine = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, p)));

/** The white road a fast swimmer leaves: foam from `from` to `to`, fading toward the old end. */
export const Wake: React.FC<{ from: Vec3; to: Vec3; t: number; size?: number; seed?: number }> = ({ from, to, t, size = 1, seed = 1 }) => {
  const len = Math.hypot(to[0] - from[0], to[2] - from[2]);
  const n = Math.max(1, Math.round(len / 0.55));
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const k = (i + 0.5) / n;
        return <Foam key={i} at={mix(from, to, k)} t={t + i} size={size * (0.55 + 0.75 * k)} n={7} seed={seed + i} />;
      })}
    </>
  );
};

/** Stars round a head that has just met a wall. `at` is the top of the head. */
export const Stars: React.FC<{ at: Vec3; t: number; n?: number; r?: number }> = ({ at, t, n = 4, r = 0.3 }) => (
  <group position={at}>
    {Array.from({ length: n }, (_, i) => {
      const a = t * 6 + (i * Math.PI * 2) / n;
      return (
        <mesh key={i} position={[Math.cos(a) * r, 0.12 + Math.sin(t * 9 + i) * 0.03, Math.sin(a) * r]} rotation={[0, a, Math.PI / 4]}>
          <boxGeometry args={[0.09, 0.09, 0.03]} />
          <meshStandardMaterial color="#ffe14a" emissive="#ffd020" emissiveIntensity={1.4} />
        </mesh>
      );
    })}
  </group>
);

/** Rings of sound coming off a speaker: hoops that grow and fade. `dir` is the way the cone faces (radians). */
export const SoundRings: React.FC<{ at: Vec3; t: number; dir?: number; n?: number; loud?: number }> = ({ at, t, dir = 0, n = 4, loud = 1 }) => (
  <group position={at} rotation={[0, dir, 0]}>
    {Array.from({ length: n }, (_, i) => {
      const k = (t * 1.5 + i / n) % 1;
      return (
        <mesh key={i} position={[0, 0, 0.2 + k * 1.6]}>
          <torusGeometry args={[0.2 + k * 0.75 * loud, 0.022, 6, 22]} />
          <meshBasicMaterial color="#fff6c8" transparent opacity={0.85 * (1 - k)} />
        </mesh>
      );
    })}
  </group>
);

/** A bib with a number, to hang on a chest or a back. Faces local +Z. */
export const Bib: React.FC<{ position: Vec3; rotationY?: number; text?: string; scale?: number }> = ({ position, rotationY = 0, text = "66", scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="wool" tint="#fbf8f0" size={[0.36, 0.3, 0.02]} castShadow={false} />
    <PixelText text={text} position={[0, 0, 0.016]} height={0.22} color="#1d2b3a" />
  </group>
);

/** How long a line lasts, seconds. */
export const cueLen = (cue: string) => {
  const c = timing.cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 1;
};

/**
 * The ten on their blocks. `tl` is the time on the line's own clock and `go` the moment of "go" on it: everybody
 * leaves the block then, with a long clean dive — except him, a beat late and flat.
 */
export const StartLine: React.FC<{ tl: number; go: number; only?: number[]; heroFace?: FaceName; heroYaw?: number }> = ({ tl, go, only, heroFace = "uneasy" }) => {
  const show = (lane: number) => !only || only.includes(lane);
  return (
    <>
      {FIELD.map((f) =>
        show(f.lane) ? <Dive key={f.lane} who={f.who} from={R(-15.6, 0.5, laneZ(f.lane))} heading={Math.PI / 2} t={tl} at={go + 0.02 + (f.lane % 3) * 0.02} reach={3.2} speed={f.v} seed={f.lane} /> : null,
      )}
      {show(RIVAL_LANE) ? <Dive who="rival" ring from={R(-15.6, 0.5, laneZ(RIVAL_LANE))} heading={Math.PI / 2} t={tl} at={go} reach={3.3} speed={1.85} rate={2} seed={11} face="smug" /> : null}
      {show(HERO_LANE) ? <Dive who="hero" ring={3} from={R(-15.6, 0.5, laneZ(HERO_LANE))} heading={Math.PI / 2} t={tl} at={go + 0.16} reach={1.7} speed={0.6} rate={1.9} seed={12} face={heroFace} /> : null}
    </>
  );
};

/**
 * The small word that pops up over the band when a button is pressed: MAX, MEDIUM, LOW. It bounces in, and
 * 1.2 seconds after `from` it has faded away. `yaw` and `pitch` are the shot's, in degrees, so it faces the lens.
 */
export const PressLabel: React.FC<{ at: Vec3; t: number; from: number; text: string; yaw?: number; pitch?: number; height?: number; color?: string }> = ({ at, t, from, text, yaw = 0, pitch = 0, height = 0.06, color = "#ffffff" }) => {
  const k = t - from;
  if (k < 0 || k > 1.2) return null;
  const tex = wordTexture(text.toUpperCase());
  const image = tex.image as { width: number; height: number };
  const pop = 1 + 0.6 * Math.exp(-6 * k) * Math.cos(k * 21) - Math.exp(-14 * k);
  const hop = Math.abs(Math.sin(k * 9.5)) * Math.exp(-3.5 * k) * height * 0.9;
  const fade = k < 0.85 ? 1 : Math.max(0, 1 - (k - 0.85) / 0.35);
  return (
    <group position={[at[0], at[1] + hop, at[2]]} rotation={[0, (yaw * Math.PI) / 180, 0]}>
      <mesh rotation={[(-pitch * Math.PI) / 180, 0, 0]} scale={pop} renderOrder={30}>
        <planeGeometry args={[(image.width / image.height) * height, height]} />
        <meshBasicMaterial map={tex} color={color} transparent opacity={fade} depthTest={false} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
};
export const BUTTON = { 1: ["MAX", "#ff8a7a"], 2: ["MEDIUM", "#ffd24a"], 3: ["LOW", "#8ff5aa"] } as const;
