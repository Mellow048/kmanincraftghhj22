import type React from "react";
import { Block, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "In This Town" film could use is in the topic's pack, Topics/InThisTown
 * (catalogue with pictures: Topics/InThisTown/PACK.md). It is passed on from here, so a scene
 * imports only from "./kit". Build something new here ONLY if the pack does not have it; if a
 * second film could use it, put it in the pack instead.
 */

export {
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  // the people of the town
  ADULT, CHILD, ROBE, Villager, villagerChest, villagerFace, Poppy,
  // places and props of the pack
  Bell, Fence, Hut, LampPost, Lantern, LanternLine, LanternPost,
  // things
  BedBox, Bits, Bubble, Bucket, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
  // fields and sky
  ForestEdge, Moon, Moonlight, Pine, Stars,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * One coordinate sheet. The town is a single street of wool: west–east along x, houses on the north side facing
 * south (at the camera). The bell tower stands at the north-east end of it, its door facing south.
 * Feet stand on `PLACE.wool`, the top of the wool the whole town is floored with.
 */
export const PLACE = {
  /** Top of the wool: every pair of feet in the street is on this height. */
  wool: 0.14,
  /** The middle of the street. */
  street: [0, 0.14, 2] as Vec3,
  /** Where the teller stands when the town looks at him. */
  kid: [0.6, 0.14, 2.2] as Vec3,
  /** The school: its front wall, and the first of the signs that stand in front of it. */
  school: [-10, 0, -5] as Vec3,
  signLine: 1.9,
  /** The bell tower: its footprint, the step in front of its door, its upper floor, and the bell under the beam. */
  tower: [4, 0, -9] as Vec3,
  towerFoot: [4, 0.14, -6.1] as Vec3,
  towerIn: 3.35,
  bellAt: [4, 7.05, -9.3] as Vec3,
  ropeFoot: [4, 3.35, -9.3] as Vec3,
  /** Where the grandmother stands, at the rope. */
  grannyAt: [4, 3.35, -10] as Vec3,
  /** The rows of beds in the wool: noon. */
  beds: [-6, 0.14, 6] as Vec3,
  /** THE THING BELOW: its own floor, far from the town. Its mass is 11 m wide. */
  below: [0, 0, 60] as Vec3,
};
export const bed = (i: number): Vec3 => [PLACE.beds[0] + i * 3.1, PLACE.beds[1], PLACE.beds[2] + (i % 2) * 1.4];

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. Mustard tee, so a phone can find him in a town of
 * cream wool and brown robes. Faces: smile grin laugh frown uneasy brave fear wow ouch calm.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e0b189"
    hair="#2f1d10"
    colors={{ torso: "#d99a24", arms: "skin", legs: "#3b3a46" }}
    blink
    {...p}
  />
);

/** His grandmother. The one person in the town who is allowed to touch the bell. Grey bun, purple robe. */
export const Granny: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  nod?: number;
  turn?: number;
  lean?: number;
  strain?: number;
  arms?: { l?: number; r?: number };
  lookAt?: Vec3;
}> = ({ position, rotationY, scale, nod, turn, lean, strain, arms, lookAt }) => (
  <Villager
    position={position}
    rotationY={rotationY}
    scale={scale}
    robe={ROBE.elder}
    nod={nod}
    turn={turn}
    lean={lean}
    strain={strain}
    arms={arms}
    lookAt={lookAt}
    headwear={<Block position={[0, 0.62, -0.16]} size={[0.5, 0.32, 0.42]} color="#d8d4cc" />}
  />
);

/** A villager of the town, in the cream robe nobody can tell apart. */
export const Town: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  robe?: string;
  walk?: number;
  nod?: number;
  turn?: number;
  hmm?: number;
  lean?: number;
  kid?: boolean;
  lookAt?: Vec3;
  strain?: number;
  arms?: { l?: number; r?: number };
}> = ({ robe = ROBE.brown, ...rest }) => <Villager robe={robe} {...rest} />;

// ----------------------------------------------------------------------------- the bell

/**
 * The town bell, hanging under a beam. The pack's `Bell` stands on a stone step in the square; this one hangs,
 * because a bell you can ring has to swing. `swing` is radians about the beam (z axis of the group).
 */
export const HungBell: React.FC<{ at: Vec3; swing?: number; blanket?: number; y?: number }> = ({
  at,
  swing = 0,
  blanket = 0,
  y = 0,
}) => (
  <group position={[at[0], at[1] + y, at[2]]}>
    {/* the beam, from the tower wall to the tower wall */}
    <Vox kind="darkPlanks" position={[0, 0.62, 0]} size={[3.4, 0.34, 0.4]} />
    {/* the bell swings about the beam */}
    <group rotation={[0, 0, swing]} position={[0, 0.55, 0]}>
      <Block position={[0, -0.16, 0]} size={[0.14, 0.5, 0.14]} color="#5d4428" />
      <Block position={[0, -0.62, 0]} size={[0.62, 0.5, 0.62]} color="#e8c44a" emissive="#4a3a10" emissiveIntensity={0.5} metalness={0.55} roughness={0.35} />
      <Block position={[0, -0.98, 0]} size={[0.86, 0.26, 0.86]} color="#d9b23a" emissive="#4a3a10" emissiveIntensity={0.5} metalness={0.55} roughness={0.35} />
      <Block position={[0, -1.1, 0]} size={[0.96, 0.04, 0.96]} color="#b8952f" metalness={0.5} roughness={0.45} />
      <Block position={[0, -1.24, 0]} size={[0.16, 0.24, 0.16]} color="#8a6f22" />
      {/* the black blanket, thrown over it: `blanket` is how far down it has slid */}
      {blanket > 0 && (
        <group position={[0, -0.62 - blanket * 0.3, 0]}>
          <Block position={[0, 0.52, 0]} size={[0.98, 0.2, 0.98]} color="#15141a" roughness={1} />
          <Block position={[0, 0.16, 0]} size={[1.06, 0.56, 1.06]} color="#15141a" roughness={1} />
          <Block position={[0, -0.2, 0.02]} size={[1.1, 0.3, 1.1]} color="#0f0e13" roughness={1} />
          <Block position={[0.42, -0.44, 0.3]} size={[0.3, 0.4, 0.26]} rotation={[0.2, 0, 0.34]} color="#15141a" />
          <Block position={[-0.4, -0.5, -0.26]} size={[0.26, 0.5, 0.3]} rotation={[-0.16, 0, -0.22]} color="#0f0e13" />
        </group>
      )}
    </group>
  </group>
);

/** The bell rope, hanging from the bell's clapper to the floor. `pullM` is metres taken up by a pull. */
export const Rope: React.FC<{ at: Vec3; from?: number; to?: number; pull?: number }> = ({ at, from = 6.0, to = 3.5, pull = 0 }) => (
  <group position={at}>
    <Block position={[0, (from + to + pull) / 2, 0]} size={[0.07, from - to - pull, 0.07]} color="#b48d52" />
    <Block position={[0, to + pull, 0]} size={[0.13, 0.16, 0.13]} color="#8a6a3c" />
  </group>
);

// ----------------------------------------------------------------------------- the school

/** A sign: one board on one post. The whole school is these. */
export const Sign: React.FC<{ at: Vec3; words: string; turn?: number; tilt?: number; h?: number }> = ({
  at,
  words,
  turn = 0,
  tilt = 0,
  h = 1.35,
}) => (
  <group position={at} rotation={[0, turn, 0]}>
    <Block position={[0, h * 0.5, 0]} size={[0.1, h, 0.1]} color="#6b4a2c" />
    <group position={[0, h, 0]} rotation={[0, 0, tilt]}>
      <Block size={[1.1, 0.78, 0.08]} color="#b48d52" />
      <Block position={[0, 0, 0.05]} size={[1.0, 0.68, 0.02]} color="#c9a468" />
      <PixelText text={words} position={[0, 0, 0.075]} height={0.2} maxWidth={0.9} />
    </group>
  </group>
);

// ----------------------------------------------------------------------------- the thing below

/**
 * THE THING BELOW. A town's worth of wool, breathing under the town. Not a monster: a mass with two soft eyes
 * that are almost always shut. `awake` 0 = shut, 1 = open. It never moves fast: at 11 m wide, a hand's width
 * of lift is all it does.
 */
export const ThingBelow: React.FC<{ at: Vec3; awake?: number; t?: number }> = ({ at, awake = 0, t = 0 }) => {
  const breath = Math.sin(t * 1.05) * 0.07;
  const eye = 0.06 + 0.94 * awake;
  const lids = 0.5 + 0.5 * Math.sin(t * 0.7);
  return (
    <group position={at}>
      {/* the mass, rooted to the ground, wider than the lens */}
      <Block position={[0, 1.5 + breath, -0.4]} size={[13, 3, 9]} color="#e6ddc6" roughness={1} />
      <Block position={[0, 3.1 + breath, -1.6]} size={[10.4, 1.5, 7]} color="#efe6d0" roughness={1} />
      <Block position={[0, 4.0 + breath, -2.6]} size={[7.4, 1.2, 5]} color="#f5ecd6" roughness={1} />
      {/* wool growing on it, in tufts */}
      {[
        [-4.6, 2.9, 3.0, 1.5],
        [-2.4, 3.5, 3.5, 1.1],
        [1.1, 3.6, 3.4, 1.3],
        [4.2, 3.1, 3.1, 1.6],
        [0.2, 4.6, 1.6, 1.0],
      ].map(([x, y, z, s], i) => (
        <Block
          key={i}
          position={[x, y + breath, z]}
          rotation={[0, i * 0.6, 0.07]}
          size={[s, s * 0.62, s * 0.8]}
          color={i % 2 ? "#e9e2cd" : "#e2dac4"}
          roughness={1}
        />
      ))}
      {/* the eyes: two soft lights behind a heavy lid */}
      {[-2.3, 2.3].map((x, i) => (
        <group key={i} position={[x, 3.0 + breath, 4.18]}>
          <Block position={[0, 0, 0]} size={[1.5, 1.5, 0.14]} color="#7d7566" roughness={1} />
          <Block position={[0, 0, 0.1]} size={[1.14, 1.14 * eye, 0.1]} color="#8ef2de" emissive="#5fe8d0" emissiveIntensity={1.6} roughness={0.6} />
          <Block position={[0, 0, 0.16]} size={[0.44, 0.44 * eye, 0.08]} color="#16302c" roughness={0.5} />
          {/* the lid comes down over it */}
          <Block position={[0, 0.62 - 0.62 * eye * 0.5, 0.2]} size={[1.54, 0.62 * (1 - eye * 0.5) + 0.02 + lids * 0.04, 0.1]} color="#bdb49f" roughness={1} />
        </group>
      ))}
      {/* the mouth is a crack in the wool, not a mouth */}
      <Block position={[0, 1.35 + breath, 4.05]} size={[3.4, 0.12, 0.1]} color="#5b5346" />
    </group>
  );
};

/** The wool roots that hang from the town's underside into the dark. */
export const WoolRoots: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    {[
      [-6.4, 0, 0.4, 3.4],
      [-3.7, 0, -0.6, 4.6],
      [-1.2, 0, 0.9, 2.8],
      [2.1, 0, -0.4, 5.2],
      [5.2, 0, 0.6, 3.9],
      [7.4, 0, -1.1, 2.6],
    ].map(([x, y, z, h], i) => (
      <Block key={i} position={[x, y - h / 2, z]} size={[0.16 + (i % 3) * 0.06, h, 0.16 + (i % 2) * 0.05]} color={i % 2 ? "#e2dac4" : "#d6cdb7"} roughness={1} />
    ))}
  </group>
);
