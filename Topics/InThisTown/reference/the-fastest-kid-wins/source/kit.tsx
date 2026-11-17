import type React from "react";
import { Block, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, Bits, Bubble, CHILD, KID, Player, ROBE, Villager, villagerFace, wordClock } from "../../../Topics/InThisTown";
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
  // the people of the town, the iron golem and its flower
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // people who are not from the town: twelve different players
  Player, Pumpkin,
  // things
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
  Chicken, Lantern,
} from "../../../Topics/InThisTown";
export { Black, DustRing, Glint, Puffs, Streaks, hop, mix, toward } from "../in-this-town-monster-village-part-3/kit";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the camera.
 * world.tsx builds the town from these, and scenes stand people on them: change a number here, never in two places.
 */
export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south-west. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /** The oldest villager's porch. It is half a block high, so she stands over a kid and the two stack in a tall frame. */
  porch: [-10, 0.5, -4.1] as Vec3,
  /** Where a kid stands to talk to her. */
  porchFoot: [-10, 0, -2.5] as Vec3,
  /** The teller's house. Middle of its front wall. */
  home: [10, 0, -5] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
};
/** The teller's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

// ----------------------------------------------------------------------------- the teller

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. Give him ONE loud colour nobody else in the film wears,
 * so a phone can find him in a crowd. (Same Face: teal, bare arms. Monster Egg: red.)
 * Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face on the cut.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#e8a21c", arms: "#e8a21c", legs: "#3b3fa0" }}
    blink
    {...p}
  />
);

// ----------------------------------------------------------------------------- the race's places

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";
/** The street the race starts on runs west to east at this z, in every zone: a runner's z is `LANE + something small`. */
export const LANE = 2;
/** Each stretch of the race is its own zone a long way from the others. A point in one: `at(FOREST, x, y, z)`. */
export const FOREST: Vec3 = [0, 0, 200];
export const RIVER: Vec3 = [0, 0, 400];
export const DESERT: Vec3 = [0, 0, 600];
export const OAK: Vec3 = [0, 0, 800];
export const FINISH: Vec3 = [0, 0, 1000];
/** Stage one, between the village and the rivers: the wheat fields, then the birch wood. */
export const FIELDS: Vec3 = [0, 0, 1200];
export const BIRCH: Vec3 = [0, 0, 1400];
/** In the river zone (x from RIVER): the line stage one ends on, and the log he sits on in the rest camp, by the first river. */
export const GATE_X = -20;
export const BENCH: Vec3 = [RIVER[0] - 12, 0, RIVER[2] - 1.4];
export const BENCH_TOP = 0.45;
export const at = (o: Vec3, x: number, y: number, z: number): Vec3 => [o[0] + x, o[1] + y, o[2] + z];
/** In the village: the start line, the hill, the pond, the trophy's stand. */
export const START_X = -4;
export const HILL: Vec3 = [-40, 0, 2];
export const POND: Vec3 = [-23, 0, 7.2];
export const STAND: Vec3 = [3, 0, -1.4];
/** In the forest: the stump he sits on, the tree the witch is behind, the pond. */
export const STUMP: Vec3 = at(FOREST, 1.5, 0, 1.2);
export const WTREE: Vec3 = at(FOREST, -2.6, 0, -0.8);
export const WITCH: Vec3 = at(FOREST, -1.7, 0, -0.3);
export const FPOND: Vec3 = at(FOREST, 18, 0, 2.5);
/** In the last village: the finish line and the trophy. */
export const LINE_X = 12;
export const CUP: Vec3 = at(FINISH, 16.5, 0, 2);

/**
 * A push-up, as a pose for the avatar's `pose`: `k` 0 is flat on the grass, 1 is arms straight. The body is one
 * straight plank from the toes to the head and the hands are on the ground under the shoulders: nothing floats.
 * Stand the avatar where its HIPS are; the toes are behind that and the hands in front.
 */
export const pushUp = (k: number) => {
  const ang = 0.17 + (0.52 - 0.17) * k; // the plank's angle off the ground
  return {
    bodyY: 0.75 * Math.sin(ang) - 0.75 + 0.07,
    bodyPitch: Math.PI / 2 - ang,
    bodyRoll: 0,
    bodyYaw: 0,
    torso: [0, 0, 0] as Vec3,
    head: [-0.75, 0, 0] as Vec3,
    armR: [-(Math.PI / 2 - ang), 0, 1.15 * (1 - k)] as Vec3,
    armL: [-(Math.PI / 2 - ang), 0, -1.15 * (1 - k)] as Vec3,
    legR: [0, 0, 0.03] as Vec3,
    legL: [0, 0, -0.03] as Vec3,
    kneeR: [0, 0, 0] as Vec3,
    kneeL: [0, 0, 0] as Vec3,
  };
};

// ----------------------------------------------------------------------------- things

export const SHOE = "#e0322c";
const GOLD = "#f2c230";
/** The trophy: a gold cup with two handles on a dark base. `position` is under its base. About 0.8 m tall at scale 1. */
export const Trophy: React.FC<{ position: Vec3; scale?: number; rotationY?: number }> = ({ position, scale = 1, rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Block position={[0, 0.06, 0]} size={[0.34, 0.12, 0.34]} color="#3a2616" />
    <Block position={[0, 0.2, 0]} size={[0.1, 0.18, 0.1]} color={GOLD} metalness={0.6} roughness={0.3} emissive={GOLD} emissiveIntensity={0.25} />
    <Block position={[0, 0.5, 0]} size={[0.36, 0.42, 0.36]} color={GOLD} metalness={0.6} roughness={0.3} emissive={GOLD} emissiveIntensity={0.25} />
    <Block position={[0, 0.73, 0]} size={[0.44, 0.06, 0.44]} color="#ffe07a" metalness={0.6} roughness={0.3} emissive={GOLD} emissiveIntensity={0.35} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.26, 0.52, 0]} size={[0.08, 0.26, 0.08]} color={GOLD} metalness={0.6} roughness={0.3} emissive={GOLD} emissiveIntensity={0.25} />
    ))}
    <Block position={[0, 0.5, 0.185]} size={[0.14, 0.14, 0.01]} color="#fff4c8" castShadow={false} />
  </group>
);
/** The stone stand a trophy sits on. `position` is the ground; the trophy goes 1.0 above it. */
export const Stand: React.FC<{ position: Vec3; cup?: boolean }> = ({ position, cup = true }) => (
  <group position={position}>
    <Vox kind="stoneBrick" position={[0, 0.5, 0]} size={[0.8, 1, 0.8]} />
    <Block position={[0, 1.02, 0]} size={[1, 0.06, 1]} color="#77777a" />
    {cup ? <Trophy position={[0, 1.05, 0]} scale={1.2} /> : null}
  </group>
);
/**
 * The witch's shoes, as a thing on their own: a pair of red trainers, toes to +Z. On the outside of the right one
 * (+X) are three buttons; `on` (0, 1 or 2) is the one that is lit. `glow` 0–1 lights the pair up. One shoe: `one`.
 */
export const ShoePair: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; on?: number; glow?: number; one?: boolean }> = ({
  position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, on = 0, glow = 0.3, one = false,
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    {(one ? [1] : [-1, 1]).map((s) => (
      <group key={s} position={[one ? 0 : s * 0.11, 0, 0]}>
        <Block position={[0, 0.02, 0]} size={[0.17, 0.04, 0.36]} color="#f4f4f4" />
        <Block position={[0, 0.1, -0.02]} size={[0.16, 0.13, 0.3]} color={SHOE} emissive={SHOE} emissiveIntensity={glow * 0.35} />
        <Block position={[0, 0.075, 0.15]} size={[0.16, 0.08, 0.07]} color="#f4f4f4" />
        <Block position={[0, 0.172, -0.04]} size={[0.08, 0.02, 0.16]} color="#ffffff" castShadow={false} />
        <Block position={[-s * 0.082, 0.1, -0.02]} size={[0.01, 0.04, 0.22]} color={GOLD} castShadow={false} />
        {s === 1
          ? [0, 1, 2].map((i) => (
              <Block key={i} position={[0.085, 0.1, 0.07 - i * 0.07]} size={[0.02, 0.05, 0.05]} color={i === on ? "#4dff6a" : "#3a3a3a"} emissive={i === on ? "#4dff6a" : "#000000"} emissiveIntensity={i === on ? 1.6 : 0} castShadow={false} />
            ))
          : null}
      </group>
    ))}
  </group>
);
/** A chopped tree: something to sit on. `position` is the ground; the seat is 0.5 up. */
export const Stump: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 0.25, 0]} size={[0.9, 0.5, 0.9]} />
    <Block position={[0, 0.505, 0]} size={[0.78, 0.01, 0.78]} color="#c9a36a" castShadow={false} />
    <Block position={[0, 0.51, 0]} size={[0.4, 0.01, 0.4]} color="#b08a52" castShadow={false} />
  </group>
);
/** Sweat flying off somebody: `position` is the head. It never stops. */
export const Sweat: React.FC<{ position: Vec3; t: number; much?: number }> = ({ position, t, much = 1 }) => (
  <>
    {[0, 0.17, 0.34].map((o, i) => (
      <Bits key={i} position={position} t={(t + o) % 0.5} color="#7fd0ff" count={Math.round(5 * much)} power={1.6 + much} seed={i + 2} />
    ))}
  </>
);
/** A board on a post with words on it. `position` is the ground. It faces +Z, turned by `rotationY`. */
export const Board: React.FC<{ position: Vec3; text: string; rotationY?: number; scale?: number; color?: string; ink?: string; post?: boolean }> = ({
  position, text, rotationY = 0, scale = 1, color = "#f4ead0", ink = "#2a1c10", post = true,
}) => {
  const w = 0.3 + text.length * 0.2;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {post ? <Block position={[0, 0.6, -0.04]} size={[0.1, 1.2, 0.08]} color="#5c3f24" /> : null}
      <Block position={[0, post ? 1.4 : 0, 0]} size={[w, 0.5, 0.06]} color={color} />
      <PixelText text={text} position={[0, post ? 1.4 : 0, 0.035]} height={0.3} maxWidth={w - 0.14} color={ink} />
    </group>
  );
};
/** A place in the race, said as a big card over somebody's head. */
export const Place: React.FC<{ text: string; position: Vec3; scale: number; rotationY?: number }> = ({ text, position, scale, rotationY = 0 }) => (
  <Bubble text={text} position={position} rotationY={rotationY} scale={scale} tail={0} dark />
);

// ----------------------------------------------------------------------------- people

/** The baby villager who always wins. */
export const Baby: React.FC<React.ComponentProps<typeof Villager>> = (p) => <Villager kid scale={CHILD} robe={ROBE.friend} {...p} />;
export const babyFace = (p: Vec3): Vec3 => villagerFace(p, CHILD);

const WROBE = "#4b2a6b";
/**
 * The witch: a villager in purple with a black pointed hat. The hat is ON her head (the pack's `headwear`), so it
 * nods, turns and leans with her. She is a villager: no hand ever comes out of her sleeves. So `wave` 0–1 is a wave
 * done with the whole body, rocking from side to side and turning a little, and `give` 0–1 leans her forward with
 * whatever is in `children` lying on her folded sleeves.
 */
export const Witch: React.FC<React.ComponentProps<typeof Villager> & { wave?: number; give?: number; t?: number; children?: React.ReactNode }> = ({
  wave = 0, give = 0, t = 0, children, position = [0, 0, 0], rotationY = 0, lean = 0, tilt = 0, ...p
}) => {
  const top = 10 * (1.8 / 32);
  const rock = Math.sin(t * 7) * wave;
  return (
    <group position={position} rotation={[0, rotationY + 0.28 * rock, 0.16 * rock]}>
      <Villager
        robe={WROBE}
        lean={lean + 0.22 * give + 0.06 * wave}
        tilt={tilt + 0.25 * rock}
        carry={give > 0 ? children : undefined}
        headwear={
          <>
            <Block position={[0, top + 0.03, 0]} size={[0.95, 0.06, 0.95]} color="#16121c" />
            <Block position={[0, top + 0.19, 0]} size={[0.5, 0.28, 0.5]} color="#1c1626" />
            <Block position={[0, top + 0.24, 0.255]} size={[0.5, 0.08, 0.01]} color="#7a4fb0" castShadow={false} />
            <Block position={[0.03, top + 0.45, -0.03]} size={[0.32, 0.26, 0.32]} color="#1c1626" />
            <Block position={[0.08, top + 0.67, -0.08]} size={[0.16, 0.22, 0.16]} color="#1c1626" />
          </>
        }
        {...p}
      />
    </group>
  );
};
export const witchFace = (p: Vec3): Vec3 => villagerFace(p, ADULT);

/** The twenty he runs against: who they are and which lane. Every third one is a villager; number 20 is the baby. */
const LANES = [0.9, -0.7, 0.2, -1.3, 1.5, -0.2, 0.6, -1.0, 1.2, -0.5];
/**
 * The field, running east. `x` is where the teller is; `ahead` is how many of the twenty are in front of him. The
 * ones in front are strung out ahead of him and the rest behind, `gap` metres apart. `d` is metres run (legs).
 * `baby` false leaves the baby out, for a shot that stages it.
 */
export const Field: React.FC<{ x: number; z: number; ahead: number; d: number; gap?: number; baby?: boolean; y?: number; only?: "ahead" | "behind"; shoes?: boolean }> = ({
  x, z, ahead, d, gap = 1.1, baby = true, y = 0, only, shoes = false,
}) => (
  <>
    {Array.from({ length: 20 }, (_, i) => {
      const front = i < ahead;
      if (only === "ahead" && !front) return null;
      if (only === "behind" && front) return null;
      const rank = front ? ahead - i : i - ahead + 1;
      const px = x + (front ? 1 : -1) * (0.9 + rank * gap * (0.75 + ((i * 7) % 5) * 0.1));
      const pz = z + LANES[i % LANES.length];
      const dd = d + i * 0.37;
      if (i === 19) return baby ? <Baby key={i} position={[px, y, pz]} rotationY={Math.PI / 2} walk={dd * 1.6} /> : null;
      if (i % 3 === 2) return <Villager key={i} position={[px, y, pz]} rotationY={Math.PI / 2} walk={dd * 1.4} robe={[ROBE.brown, ROBE.white, ROBE.smith, ROBE.farmer, ROBE.red, ROBE.blue][i % 6]} lean={0.25} phase={i} />;
      return <Player key={i} who={i} position={[px, y, pz]} rotationY={Math.PI / 2} animation="run" animDistance={dd} face="brave" shoes={shoes && i === 0 ? SHOE : undefined} />;
    })}
  </>
);
