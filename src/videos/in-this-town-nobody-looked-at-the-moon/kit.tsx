import type React from "react";
import { Block, Glow, MinecraftAvatar, Vox, clamp01 } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Bucket, CHILD, KID, Moon, PixelDisc, ROBE, StrawHat, Villager, ease, jolt, ramp, wordClock } from "../../../Topics/InThisTown";
import type { VillagerProps } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast, places and sky.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit". What is built HERE belongs to this story alone: the teller, the moon
 * that is an eye, where it is staring, and how far the scarecrows have come.
 */

export {
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the people of the town, and the iron golem
  ADULT, CHILD, IronGolem, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // worn and carried
  Bits, Bubble, Bucket, Lantern, StrawHat, SubscribeSign, BedBox,
  // out in the fields
  Scarecrow, scarecrowFace,
} from "../../../Topics/InThisTown";
export type { VillagerProps } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("11.blink", "blinked")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

/** When a cue starts, in film seconds. */
export const cueStart = (id: string): number => {
  const cue = timing.cues.find((c) => c.id === id);
  if (!cue) throw new Error(`cueStart: no cue "${id}"`);
  return cue.start;
};

// ----------------------------------------------------------------------------- places

/**
 * THE AXIS. The whole film lies on one line, north to south, so it stacks in a tall frame:
 *
 *   forest (z -47)  ·  wheat and scarecrows  ·  fence (z -13)  ·  the lane between two houses
 *   ·  the square and the well (z 2)  ·  the teller's door (z 9.5)  ·  and over his roof, in the south, the moon.
 *
 * So the usual camera, south of someone and looking north, has the lane and the wheat behind them;
 * and to see the moon you turn round. The street crosses the square west–east (x).
 */
export const PLACE = {
  /** The well: the middle of the square, and of the film. */
  well: [0, 0, 2] as Vec3,
  /** Where he stands to look into it: north of it, facing south, his belly on the wall. The wheat is behind him. */
  atWell: [0, 0, 0.45] as Vec3,
  /** Where his best friend stands once she has climbed off the lid: by the west wall, her back to it. */
  guard: [-1.8, 0, 1.5] as Vec3,
  /** The bell, on its stone step, at the north-west corner of the square. */
  bell: [-4.8, 0, -1.6] as Vec3,
  /** Where the old bell ringer stands: on the corner of the bell's stone step, half a block over a kid's head. */
  ringer: [-3.75, 0.5, -0.95] as Vec3,
  stall: [5.6, 0, -2.4] as Vec3,
  /** The teller's house: the middle of its front wall. It faces NORTH, onto the square. His door is here. */
  home: [0, 0, 9.5] as Vec3,
  /** The bench under his window. Its seat is 0.44 m up: a kid's `sit` fits it. */
  bench: [-2.15, 0, 8.85] as Vec3,
  /** The mouth of the lane, where the town ends and the fields begin. */
  gate: [0, 0, -13] as Vec3,
  /** The middle of the wheat: where the moon stares. */
  field: [0, 0, -28] as Vec3,
  /** Where the track meets the trees. */
  trees: [0, 0, -47] as Vec3,
  /** The board with the rule on it, by the well. */
  sign: [3.3, 0, 4.2] as Vec3,
};

/** The board with the rule on it faces north and a little east: a lens in front of it has the moon behind it. */
export const SIGN_FACING = Math.PI - 0.2;

/** The top of the well's wall, and the top of its lid. */
export const RIM = 0.8;
export const LID_TOP = 0.98;
/** How far the lid has to be pushed for a moon to fit in the gap. */
export const LID_OPEN = 1.0;

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;

/** The brim of his hat, in his own units: one metre in the world. As wide as a door. */
const HAT = 1.25;
/** The same hat when it is not on his head: `<StrawHat width={LOOSE_HAT} crown={0.4} …>`. */
export const LOOSE_HAT = HAT * KID;
/** How he wears it: tipped back a little. Everyone else's is level. It is the first thing the film says about him. */
export const HAT_BACK = -0.14;

const HeadHat: React.FC<{ tilt: number; y?: number }> = ({ tilt, y = 0.45 }) => {
  // Tipped back, it hinges on the back of his head; pulled down, on his forehead.
  if (tilt < 0)
    return (
      <group position={[0, y, -0.2]} rotation={[tilt, 0, 0]}>
        <StrawHat position={[0, 0, 0.2]} width={HAT} crown={0.5} />
      </group>
    );
  if (tilt > 0)
    return (
      <group position={[0, y, 0.2]} rotation={[tilt, 0, 0]}>
        <StrawHat position={[0, 0, -0.2]} width={HAT} crown={0.5} />
      </group>
    );
  return <StrawHat position={[0, y, 0]} width={HAT} crown={0.5} />;
};

/**
 * The teller: a kid in red with white sleeves (the boy of the first, 20-second version wore red and white),
 * under a hat as wide as a door.
 *
 *   hat      "on" (default) · "off" (the scene has it somewhere else) · "bucket" (the bucket, with the hat on top of it)
 *   hatTilt  radians: negative tips the hat back (default HAT_BACK), positive pulls it down over his face
 *   hatLift  metres the hat has hopped off the bucket
 *
 * With the hat on, his face is only seen from BELOW the brim: keep the camera at or under his chin (pitch 0 or less).
 * Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face on the cut.
 */
export const Hero: React.FC<A & { hat?: "on" | "off" | "bucket"; hatTilt?: number; hatLift?: number }> = ({ hat = "on", hatTilt = HAT_BACK, hatLift = 0, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#d8342a", arms: "#f1ece0", legs: "#2f3a7a" }}
    faceGlow={0.3}
    blink
    headwear={
      hat === "on" ? (
        <HeadHat tilt={hatTilt} />
      ) : hat === "bucket" ? (
        <>
          <Bucket position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]} handle={false} />
          <HeadHat tilt={hatTilt} y={0.5 + hatLift} />
        </>
      ) : null
    }
    {...p}
  />
);

/** One of the town: a villager under a wide hat, eyes on the ground. Every `Villager` prop works; `nod={0}` lifts the face. */
export const Folk: React.FC<VillagerProps> = (p) => <Villager hat="wide" nod={0.4} {...p} />;
/** One of the town walking a straight line from `from` towards `to` at `speed` m/s, `t` seconds in. It stops at `to`. */
export const Walker: React.FC<VillagerProps & { from: Vec3; to: Vec3; t: number; speed?: number }> = ({ from, to, t, speed = 0.9, ...p }) => {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const len = Math.hypot(dx, dz) || 1;
  const gone = Math.max(0, Math.min(len, speed * t));
  return <Folk position={[from[0] + (dx / len) * gone, from[1], from[2] + (dz / len) * gone]} rotationY={Math.atan2(dx, dz)} walk={gone} {...p} />;
};
/** His best friend: a girl of the town, in green. She never says a word. */
export const Friend: React.FC<VillagerProps> = (p) => <Villager hat="wide" robe={ROBE.friend} scale={CHILD} kid nod={0.3} phase={1.1} {...p} />;
/** Where he stops when he finds her sitting on the lid (9.friend). When she turns her back, it is on this spot. */
export const STOP: Vec3 = [0.75, 0, -0.35];
/** The way she faces when she looks at him there. */
export const TO_HIM = Math.atan2(STOP[0] - PLACE.guard[0], STOP[2] - PLACE.guard[2]);
/** His best friend from 9.back until the light comes: beside the well, her back to it, her hat down. */
export const Guard: React.FC = () => <Friend position={PLACE.guard} rotationY={TO_HIM + Math.PI} nod={0.4} />;
/** The old bell ringer, in purple: the only one who ever tells him anything. */
export const Ringer: React.FC<VillagerProps> = (p) => <Villager hat="wide" robe={ROBE.elder} nod={0.4} phase={2.2} {...p} />;

// ----------------------------------------------------------------------------- things of this story

/**
 * The rule, on a board nobody remembers putting up: a moon, crossed out. `position` is the foot of the post.
 * It faces +Z. The board is high (its middle is 2.05 m up), so a low lens sees it against the sky.
 */
export const RuleSign: React.FC<{ position: Vec3; rotationY?: number; wobble?: number }> = ({ position, rotationY = 0, wobble = 0 }) => (
  <group position={position} rotation={[0, rotationY, wobble]}>
    <Vox kind="log" position={[0, 0.98, -0.07]} size={[0.16, 1.96, 0.16]} />
    <group position={[0, 2.05, 0]} rotation={[0, 0, -0.05]}>
      <Vox kind="darkPlanks" size={[1.0, 1.0, 0.09]} />
      <Block position={[0, 0.53, 0]} size={[1.08, 0.07, 0.13]} color="#3a2817" />
      <Block position={[0, -0.53, 0]} size={[1.08, 0.07, 0.13]} color="#3a2817" />
      <group position={[0, 0, 0.06]}>
        <PixelDisc radius={0.33} color="#ece9d8" n={12} fog />
        <Block position={[-0.1, 0.1, 0.012]} size={[0.11, 0.11, 0.01]} color="#cfcdbd" castShadow={false} />
        <Block position={[0.12, -0.06, 0.012]} size={[0.08, 0.08, 0.01]} color="#cfcdbd" castShadow={false} />
        <Block position={[-0.04, -0.17, 0.012]} size={[0.055, 0.055, 0.01]} color="#cfcdbd" castShadow={false} />
      </group>
      {[-1, 1].map((s) => (
        <Block key={s} position={[0, 0, 0.09]} rotation={[0, 0, s * 0.785]} size={[1.12, 0.1, 0.03]} color="#c0281d" emissive="#c0281d" emissiveIntensity={0.3} castShadow={false} />
      ))}
      {/* It has been here a long time. */}
      <Block position={[-0.38, -0.41, 0.05]} size={[0.2, 0.14, 0.02]} color="#4f7a3a" castShadow={false} />
      <Block position={[0.41, 0.39, 0.05]} size={[0.12, 0.16, 0.02]} color="#4f7a3a" castShadow={false} />
    </group>
  </group>
);

/** The rail he levers the lid with. Give it to `Hero` as a child: it lies along his right arm, between his hands. */
export const Pole: React.FC = () => <Block position={[-0.32, -0.56, 0]} size={[0.085, 1.5, 0.085]} color="#6a4a2a" />;
/** The same rail, lying on the ground. `position` is its middle. */
export const PoleDown: React.FC<{ position: Vec3; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <Block position={position} rotation={[0, rotationY, 0]} size={[0.07, 0.07, 1.2]} color="#6a4a2a" />
);

/**
 * A night scratched on the north wall of the well for every night he pushed: bundles of five. `count` 0 … 30.
 * `position` is the well's. They face north.
 */
export const Tally: React.FC<{ position: Vec3; count: number }> = ({ position, count }) => (
  <group position={[position[0], 0, position[2] - 1.2]}>
    {Array.from({ length: Math.min(30, Math.floor(count)) }, (_, i) => {
      const bundle = Math.floor(i / 5);
      const j = i % 5;
      const x = 0.78 - bundle * 0.3;
      return j < 4 ? (
        <Block key={i} position={[x - j * 0.05, 0.44 + ((i * 7) % 3) * 0.008, -0.004]} size={[0.02, 0.19, 0.01]} color="#ece8d8" castShadow={false} />
      ) : (
        <Block key={i} position={[x - 0.075, 0.44, -0.006]} rotation={[0, 0, 0.9]} size={[0.02, 0.3, 0.01]} color="#ece8d8" castShadow={false} />
      );
    })}
  </group>
);

/** The water in the well: black, 0.3 m under the top of the wall. `position` is the well's. */
export const WellWater: React.FC<{ position: Vec3 }> = ({ position }) => (
  <Block position={[position[0], 0.535, position[2]]} size={[1.4, 0.03, 1.4]} color="#050814" emissive="#0a1230" emissiveIntensity={0.35} castShadow={false} receiveShadow={false} />
);

// ----------------------------------------------------------------------------- the moon

const LID_SKIN = "#232b4a";

/**
 * THE MOON, which is an eye.
 *
 * Until it blinks it is only a moon: the white of an eye, with nothing in it. `eye` shows the iris.
 * It is drawn in pixels, 16 across, and the iris moves a whole pixel at a time.
 *
 *   look    where the iris is on the disc, −1 … 1 each way. [0, 0] is looking straight out at whoever it faces.
 *   lid     0 open … 1 shut: both lids. A blink is 0 → 1 → 0. The lids are the colour of the night.
 *   droop   the top lid alone, 0 … 1: bored.
 *   pupil   1 is normal, under 0.9 a pinpoint (a stare), 1.2 and over wide open
 *   facing  the point it is turned towards (it is a flat thing in the sky)
 *   flat    lie face up on water, for someone standing north of it and looking down
 *   shift   slides the row at height y sideways (both in metres): the one in the well, shaking
 */
export const MoonEye: React.FC<{
  position: Vec3;
  radius?: number;
  facing?: Vec3;
  eye?: boolean;
  look?: [number, number];
  lid?: number;
  droop?: number;
  pupil?: number;
  glow?: number;
  shift?: (y: number) => number;
  flat?: boolean;
}> = ({ position, radius = 8, facing, eye = false, look = [0, 0], lid = 0, droop = 0, pupil = 1, glow = 1, shift, flat = false }) => {
  const px = radius / 8;
  const shut = clamp01(lid);
  // Where the lids are, −1 … 1. They meet a little under the middle, the way an eye shuts.
  const top = Math.max(-0.125, 1 - shut * 1.125 - droop * (1 - shut));
  const bottom = Math.min(-0.125, -1 + shut * 0.875);
  const open = top - bottom > 0.13;

  const n = facing ? [facing[0] - position[0], facing[1] - position[1], facing[2] - position[2]] : [0, 0, 1];
  const len = Math.hypot(n[0], n[1], n[2]) || 1;
  const yaw = Math.atan2(n[0], n[2]);
  const pitch = -Math.asin(n[1] / len);

  // The iris stays inside the white, and on the pixel grid.
  const reach = Math.hypot(look[0], look[1]);
  const k = (reach > 1 ? 1 / reach : 1) * 3.6;
  const c: [number, number] = [Math.round(look[0] * k) * px, Math.round(look[1] * k) * px];
  const pupilN = pupil >= 1.2 ? 6 : pupil >= 0.9 ? 4 : 2;
  const glint = c[1] + 1.5 * px;

  return (
    <group position={position} rotation={flat ? [0, Math.PI, 0] : [0, yaw, 0]}>
      <group rotation={flat ? [-Math.PI / 2, 0, 0] : [pitch, 0, 0]}>
        {/* The lids: always there, behind the white. When the white goes, they are what is left. */}
        <PixelDisc radius={radius} color={LID_SKIN} z={-px * 0.12} shift={shift} />
        {open ? (
          <Moon position={[0, 0, 0]} radius={radius} from={bottom} to={top} shift={shift} glow={0}>
            {eye ? (
              <>
                <PixelDisc radius={4 * px} n={8} color="#1f4fb5" center={c} z={px * 0.25} from={bottom} to={top} within={radius} shift={shift} />
                <PixelDisc radius={3 * px} n={6} color="#58a0ff" center={c} z={px * 0.36} from={bottom} to={top} within={radius} shift={shift} />
                <PixelDisc radius={(pupilN / 2) * px} n={pupilN} color="#050812" center={c} z={px * 0.47} from={bottom} to={top} within={radius} shift={shift} />
                {glint < top * radius && glint > bottom * radius ? (
                  <mesh position={[c[0] + 1.5 * px + (shift ? shift(glint) : 0), glint, px * 0.6]}>
                    <boxGeometry args={[px, px, px * 0.1]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} fog={false} />
                  </mesh>
                ) : null}
              </>
            ) : null}
          </Moon>
        ) : (
          <mesh position={[0, -0.125 * radius, px * 0.1]}>
            <boxGeometry args={[radius * 1.75, px * 0.5, px * 0.2]} />
            <meshBasicMaterial color="#8e96b4" toneMapped={false} fog={false} />
          </mesh>
        )}
        {glow > 0 ? <Glow position={[0, 0, -px * 0.6]} size={radius * 5.2} color="#8fb0ff" opacity={0.3 * glow * (1 - shut * 0.85)} /> : null}
      </group>
    </group>
  );
};

/** A blink that begins at `at`: 0 open, 1 shut. Shut for `hold` seconds in the middle. */
export const blinkAt = (t: number, at: number, hold = 0.1, speed = 0.09): number => {
  const x = t - at;
  if (x <= 0 || x >= speed * 2 + hold) return 0;
  if (x < speed) return ease(x / speed);
  if (x < speed + hold) return 1;
  return 1 - ease((x - speed - hold) / speed);
};
/** The moment a blink that begins at `at` is fully shut: when things move. */
export const shutAt = (at: number, hold = 0.1, speed = 0.09) => at + speed + hold / 2;

// ----------------------------------------------------------------------------- the scarecrows

/** Where the scarecrows stand in the wheat when the film begins: [x, z, facing]. They all face the town. */
export const CROWS: Array<[number, number, number]> = [
  [-6.5, -24, 0.14],
  [7.5, -29, -0.1],
  [-15, -34, 0.32],
  [13, -21.5, -0.36],
  [17.5, -37, -0.3],
  [-21, -26, 0.5],
  [3.4, -45.6, 0],
  [24, -30, -0.6],
  [-11, -42, 0.2],
];
/** The one beside the track. `k` 0 … 1: from the trees to the fence. A little nearer in every scene, and nobody says so. */
export const leaderAt = (k: number): Vec3 => [-2.3, 0, -40 + 24.5 * clamp01(k)];

/**
 * THE MARCH. When the stare comes into town the scarecrows walk: out of the wheat, down the track, down the lane.
 * It begins on "begun" (12.dark) and ends on "stopped" (13.back). Where each one is, at any second of the film,
 * is decided here, so every shot of it agrees with the others.
 *
 * Each row: the points it walks through (the first is where it stood), and how late it sets off (seconds).
 */
const MARCH: Array<{ path: Vec3[]; delay: number }> = [
  { path: [leaderAt(1), [-1.2, 0, -13], [-0.9, 0, -6], [0.55, 0, -0.75]], delay: 0 },
  { path: [[-6.5, 0, -24], [-2.2, 0, -17], [-1.5, 0, -12], [-1.6, 0, -4.6]], delay: 0.5 },
  { path: [[7.5, 0, -29], [2, 0, -21], [1.3, 0, -13], [1.2, 0, -7.6]], delay: 0.2 },
  { path: [[13, 0, -21.5], [4, 0, -16], [-0.9, 0, -13.5], [-0.8, 0, -10.6]], delay: 1.1 },
  { path: [[-15, 0, -34], [-4, 0, -24], [1.2, 0, -18], [1.1, 0, -14.2]], delay: 0.3 },
  { path: [[17.5, 0, -37], [6, 0, -27], [-1.2, 0, -20], [-1.3, 0, -16.8]], delay: 0.6 },
  { path: [[-21, 0, -26], [-12, 0, -22], [-6, 0, -19.5]], delay: 0.9 },
  { path: [[3.4, 0, -45.6], [1, 0, -34], [-0.4, 0, -25], [0.2, 0, -21.4]], delay: 0 },
  { path: [[24, 0, -30], [14, 0, -25], [8.5, 0, -21.8]], delay: 0.7 },
  { path: [[-11, 0, -42], [-5, 0, -33], [-3.2, 0, -27.5]], delay: 0.4 },
];
export const MARCHERS = MARCH.length;
export const MARCH_T = { from: cueStart("12.dark") + wordAt("12.dark", "begun"), to: cueStart("13.back") + wordAt("13.back", "stopped") };

const along = (path: Vec3[], k: number): { position: Vec3; heading: number; walked: number } => {
  const lengths = path.slice(1).map((b, i) => Math.hypot(b[0] - path[i][0], b[2] - path[i][2]));
  const total = lengths.reduce((a, b) => a + b, 0);
  let left = clamp01(k) * total;
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i] || i === lengths.length - 1) {
      const q = Math.min(1, left / lengths[i]);
      const a = path[i];
      const b = path[i + 1];
      return { position: [a[0] + (b[0] - a[0]) * q, 0, a[2] + (b[2] - a[2]) * q], heading: Math.atan2(b[0] - a[0], b[2] - a[2]), walked: clamp01(k) * total };
    }
    left -= lengths[i];
  }
  return { position: path[0], heading: 0, walked: 0 };
};

/** Where scarecrow `i` of the march is at film second `film`: feet, facing, metres walked, and whether it is moving. */
export function marcher(i: number, film: number) {
  const m = MARCH[i % MARCH.length];
  const span = MARCH_T.to - MARCH_T.from;
  const k = clamp01((film - MARCH_T.from - m.delay) / (span - m.delay));
  const at = along(m.path, k);
  // Standing still, each one faces the well, and whoever is at it.
  const still = k >= 1 || k <= 0;
  const rotationY = still ? Math.atan2(0 - at.position[0], 0.6 - at.position[2]) : at.heading;
  return { position: at.position, rotationY, walked: at.walked, moving: !still, k };
}

/** Where they stand on the nights after, between the lane and his door: [x, z]. Each blink, one step. */
export const AT_DOOR: Array<[number, number]> = [
  [0.6, 3.86],
  [-1.3, 3.58],
  [1.98, 2.7],
  [-1.95, 1.3],
  [0.5, -2.9],
  [-1.2, -6.6],
  [1.5, -10.4],
  [-0.4, -14.5],
];
const DOOR: Vec3 = [0, 0, 9.4];
/** Scarecrow `i` at the door after `steps` steps (it can be a fraction, mid-step). */
export const atDoor = (i: number, steps: number): { position: Vec3; rotationY: number } => {
  const [x, z] = AT_DOOR[i % AT_DOOR.length];
  const dx = DOOR[0] - x;
  const dz = DOOR[2] - z;
  const len = Math.hypot(dx, dz) || 1;
  const go = Math.min(steps * 0.45, len - 0.75);
  return { position: [x + (dx / len) * go, 0, z + (dz / len) * go], rotationY: Math.atan2(dx, dz) };
};

// ----------------------------------------------------------------------------- the sky, shot by shot

/** Where the moon hangs for most of the film: high in the south, over the teller's roof. */
export const MOON: Vec3 = [0, 62, 80];
/** What the moon stares at: the middle of the wheat, the well, his door. */
const ON_WHEAT: Vec3 = [0, 0, -28];
const ON_WELL: Vec3 = [0, 0, 1.4];
const ON_HOME: Vec3 = [0, 0, 6.6];

export type Sky = {
  /** Where the moon is, and how big. */
  moon: Vec3;
  radius: number;
  /** Has it shown what it is yet? */
  eye: boolean;
  look: [number, number];
  lid: number;
  droop: number;
  pupil: number;
  /** The middle of the pool of moonlight: what the moon is staring at. */
  stare: Vec3;
  /** Metres of ground the stare covers. */
  reach: number;
  /** 0 = its eye is shut and the light is gone; 1 = the full stare. */
  power: number;
  /** 0 … 1: a shaft of light standing on the stare, for shots that see it from far off. */
  beam: number;
  /** How bright the wheat is: 1 under the stare, 0 when the moon has looked away from it. */
  wheat: number;
  /** Are the doors of the town open? They shut when the light comes in. */
  doors: boolean;
  /** Is the teller's own door open? */
  home: boolean;
  /** How far the lid of the well has been pushed, in metres. `LID_OPEN` is far enough. */
  slab: number;
  /** His hat, off his head and lying on the lid. */
  looseHat: boolean;
  /** Nights scratched on the wall of the well, 0 … 30. */
  tally: number;
  /** The rail he levers the lid with is lying by the well (he is not holding it). */
  pole: boolean;
  /** Radians the nearest scarecrow has tilted its head. The last thing in the film. */
  crowLooks: number;
  /** The board with the rule on it rocks when something walks into it (7.week). Radians. */
  signWobble: number;
  /**
   * The scarecrows the WORLD draws.
   *   stand  in the wheat; `lead` 0 … 1 is how far the one beside the track has come towards the town
   *   march  walking on the town: where each one is at film second `film`
   *   door   between the lane and his door, `steps` steps nearer
   *   none   the shot stages its own
   */
  crows: { kind: "stand"; lead: number } | { kind: "march"; film: number } | { kind: "door"; steps: number } | { kind: "none" };
  /** Does the world walk the iron golem on its rounds along the fence? Not when the shot has it. */
  patrol: boolean;
};

const at = (cue: string, word: string, nth = 0) => cueStart(cue) + wordAt(cue, word, nth);
const LIGHT = { start: cueStart("11.light"), came: at("11.light", "came") };
const BACK = { start: cueStart("13.back"), went: at("13.back", "went") };
const HAT_OFF = cueStart("10.stone");
const HAT_ON = cueStart("13.hat");
const mix = (a: Vec3, b: Vec3, k: number): Vec3 => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

/** Shots that stage their own scarecrows. */
const OWN_CROWS = new Set(["13.never", "13.blink", "13.held"]);
/** Shots with the iron golem in them. */
const OWN_GOLEM = new Set(["3.golem", "7.tip", "7.bucket", "8.nobody", "10.town", "13.awake"]);
/** Shots that see the stare from far enough off to see the shaft of it. */
const BEAM = new Set(["3.light", "11.light", "13.back"]);
/** Pictures of how it was before, in the middle of scene 13: the stare is back on the wheat, as it had always been. */
const BEFORE = new Set(["13.never", "13.blink", "13.held", "13.awake"]);

/** The blinks of "one blink at a time" (13.blink), in seconds since the cut. */
export const WALK_BLINKS = [0.42, 1.0, 1.58];
/** The blinks of the last scene, each in seconds since the cut of its own shot. */
export const LAST_BLINKS: Record<string, number> = {
  "14.blinks": wordAt("14.blinks", "blinks") - 0.05,
  "14.step": wordAt("14.step", "one") - 0.1,
  "14.sub": wordAt("14.sub", "blinks") - 0.05,
};
const LAST_ORDER = ["14.knows", "14.blinks", "14.step", "14.sub"];

/** How far the lid has been pushed, at any moment. Scene 8 pushes it; 10.gap gives the last shove. */
export function slabAt(cue: string, t: number): number {
  const scene = Number(cue.split(".")[0]);
  if (scene < 8) return 0;
  if (cue === "8.down") return 0;
  if (cue === "8.lid") {
    // Three heaves, on the words.
    const heave = (word: string, nth = 0) => ease(ramp(t, wordAt("8.lid", word, nth), wordAt("8.lid", word, nth) + 0.3));
    return 0.06 * heave("every") + 0.07 * heave("pushed") + 0.07 * heave("further");
  }
  if (cue === "8.nobody") return 0.42 + 0.08 * ease(ramp(t, 0.5, 0.9)) + 0.08 * ease(ramp(t, 1.4, 1.8));
  if (cue === "8.nights") return 0.8;
  if (scene === 9) return LID_OPEN - 0.14;
  if (cue === "10.gap") return LID_OPEN - 0.14 + 0.14 * ease(ramp(t, wordAt("10.gap", "gap"), wordAt("10.gap", "just") + 0.25));
  if (scene === 14) return 0;
  return LID_OPEN;
}

/**
 * THE DIRECTOR OF THE SKY. One place decides, for every shot, where the moon is, whether it is an eye yet,
 * what it is staring at (and so where the cold light lies), which doors are open, how far the lid has been
 * pushed and where the scarecrows have got to. The world draws all of it; scenes stage people.
 * `t` is seconds since the cut.
 */
export function skyAt(cue: string, t: number): Sky {
  const scene = Number(cue.split(".")[0]);
  const film = cueStart(cue) + t;
  const sky: Sky = {
    moon: MOON,
    radius: 8,
    eye: false,
    look: [0, 0],
    lid: 0,
    droop: 0,
    pupil: 1,
    stare: ON_WHEAT,
    reach: 22,
    power: 1,
    beam: BEAM.has(cue) ? 1 : 0,
    wheat: 1,
    doors: true,
    home: true,
    slab: slabAt(cue, t),
    looseHat: film >= HAT_OFF && film < HAT_ON && !BEFORE.has(cue),
    tally: scene < 8 ? 0 : cue === "8.down" ? 0 : cue === "8.lid" ? 1 : cue === "8.nobody" ? 14 : cue === "8.nights" ? (t < wordAt("8.nights", "thirty") + 0.06 ? 29 : 30) : 30,
    pole: scene >= 9 && scene < 14 && cue !== "10.gap",
    crowLooks: 0,
    signWobble: cue === "7.week" ? jolt(t, wordAt("7.week", "week"), 0.16) : 0,
    crows: OWN_CROWS.has(cue) ? { kind: "none" } : { kind: "stand", lead: clamp01((Math.min(scene, 10) - 1) / 9) },
    patrol: !OWN_GOLEM.has(cue) && scene < 11,
  };

  // Scene 1: it rises behind his roof, bigger than it will ever be again, and the wheat lights up under it.
  if (cue === "1.wake") {
    sky.radius = 11;
    sky.moon = [0, 17 + 13 * ease(ramp(t, 0, 1.9)), 74];
    sky.wheat = ease(ramp(t, 0.3, 1.7));
  } else if (cue === "1.look") {
    sky.radius = 11;
    sky.moon = [0, 35.5 + 0.5 * t, 74];
  }

  // From the blink on it is an eye, and it is looking at him: down, out of the south.
  if (film >= cueStart("11.blink")) {
    sky.eye = true;
    sky.look = [0, -0.3];
    sky.pupil = 0.8;
  }

  if (film >= LIGHT.start) {
    // The stare leaves the wheat and comes down the lane to the well. The doors shut. The scarecrows walk.
    const k = ease(ramp(film, LIGHT.start + 0.2, LIGHT.came + 0.5));
    sky.stare = mix(ON_WHEAT, ON_WELL, k);
    sky.reach = 22 - 10 * k;
    sky.wheat = 1 - k;
    sky.doors = film < LIGHT.came - 0.1;
    sky.home = sky.doors;
    sky.crows = { kind: "march", film };
  }

  if (BEFORE.has(cue)) {
    sky.stare = ON_WHEAT;
    sky.reach = 22;
    sky.wheat = 1;
    sky.doors = true;
    sky.home = true;
    sky.look = [0, 0];
    sky.pupil = 0.8;
    sky.crows = OWN_CROWS.has(cue) ? { kind: "none" } : { kind: "stand", lead: 1 };
    if (cue === "13.never") sky.stare = [0, 0, -40];
    if (cue === "13.blink") {
      // One blink at a time: the light goes, and when it is back they are nearer.
      sky.lid = Math.max(...WALK_BLINKS.map((b) => blinkAt(t, b, 0.12, 0.07)));
      sky.power = 1 - sky.lid;
      sky.wheat = 1 - sky.lid;
    }
  }

  if (cue === "13.bored") {
    // It gets bored: the lid sinks, and the iris drifts off, up and away, to the fields.
    const k = ease(ramp(t, 0.3, 1.35));
    sky.droop = 0.5 * k;
    sky.look = [0.3 * k, -0.3 + 0.9 * k];
    sky.pupil = 1;
  }
  if (film >= BACK.start) {
    const k = ease(ramp(film, BACK.start + 0.1, BACK.went + 0.7));
    sky.stare = mix(ON_WELL, ON_WHEAT, k);
    sky.reach = 12 + 10 * k;
    sky.wheat = k;
    sky.droop = 0.3;
    sky.look = [0.3, 0.6];
    sky.pupil = 1;
  }

  // Scene 14, the nights after: it finds his house. Every blink, they take a step.
  if (scene === 14) {
    sky.stare = ON_HOME;
    sky.reach = 12;
    sky.wheat = 0;
    sky.droop = 0;
    sky.look = [0, -0.6];
    sky.pupil = 0.8;
    sky.doors = false;
    sky.home = false;
    let steps = 0;
    for (const id of LAST_ORDER) {
      const blink = LAST_BLINKS[id];
      if (id === cue) {
        if (blink !== undefined) {
          sky.lid = blinkAt(t, blink, 0.16, 0.08);
          // The step is taken in the dark: it begins as the lids meet and is over before they part.
          steps += ease(ramp(t, blink + 0.08, blink + 0.24));
        }
        break;
      }
      if (blink !== undefined) steps += 1;
    }
    sky.power = 1 - sky.lid;
    sky.crows = { kind: "door", steps };
    // The last thing in the film: the nearest one, right behind him, slowly tilts its head.
    if (cue === "14.sub") sky.crowLooks = 0.6 * ease(ramp(t, wordAt("14.sub", "again"), wordAt("14.sub", "again") + 0.45));
  }
  return sky;
}
