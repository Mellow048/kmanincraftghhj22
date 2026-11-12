import type React from "react";
import { MinecraftAvatar, Torch } from "../../engine";
import type { AnimName, FaceName, MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { EAST, KID, NORTH, Player, WEST, hill, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and places. Everything that another "In This Town" film could use
 * (the villagers, the iron golem, the twelve players, bubbles, smoke, fire, the maths) lives in
 * the topic's pack, Topics/InThisTown, and is passed on from here: a scene imports only from "./kit".
 *
 * Two kinds of people live in this film, and the whole story is the difference:
 *   - VILLAGERS have one face, no hands and one word. They are built from boxes (pack: villagers.tsx).
 *   - PLAYERS (the teller, and the strangers over the hill) are `MinecraftAvatar`s: every face different, and hands.
 */

export {
  // staging
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // villagers
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // players
  Pumpkin,
  // things
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, Wisps,
} from "../../../Topics/InThisTown";
export type { VillagerProps } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.hmm", "hmm")`. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** The middle of the square. The bell is north of it, the well south-west. */
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  /** Where the iron golem stands guard. */
  post: [2.8, 0, 0.8] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /** The oldest villager's porch. It is half a block high, so she stands over a kid. */
  porch: [-10, 0.5, -4.1] as Vec3,
  /** Where a kid stands to talk to her. */
  porchFoot: [-10, 0, -2.5] as Vec3,
  home: [10, 0, -5] as Vec3,
  /** The oldest house in town, burned black. Middle of its front wall. */
  black: [-21, 0, -5] as Vec3,
  /** The east end of the street, where you stand to look at the hill. */
  streetEnd: [24, 0, 2] as Vec3,
  /** The grass under the hill where the teller was found. */
  found: [29.2, 0, 6.6] as Vec3,
  /** The hero's room. Its own zone, far from everything. */
  room: [0, 0, 80] as Vec3,
  /** The tunnel. Its own zone. It runs along X; the digging face is at +X. */
  tunnel: [0, 0, 120] as Vec3,
  /** The east lip of the hill top: the place the whole film is about. */
  lip: [50.3, 11, 0] as Vec3,
  /** The middle of the village on the other side. */
  other: [84, 0, 0] as Vec3,
};
/** The hero's room: a point given in room coordinates. */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];
/** The hole under the bed. The bed's usual place is right over it. */
export const HOLE = room(-1.2, 0, -1.2);
/** Where the bed stands when it is pushed aside. */
export const ASIDE = room(-0.25, 0, -1.2);

/**
 * THE HILL. Eleven layers of one block each, stepping in 1.2 m a layer, 76 m long north to south:
 * a ridge that closes the valley. Top at y = 11, from x = 45 to x = 51.
 */
export const HILL = hill({ x: 48, layers: 11, width: 30, step: 1.2 });
/** The middle of step `i` (0 = the first block off the valley floor) on the west slope, the side the town can see. */
export const stepAt = HILL.stepAt;
/** The same on the east slope, the side nobody may see. */
export const stepEast = HILL.stepEast;
/**
 * Hop up `steps` blocks of the west slope, Minecraft style: up first, then forward.
 * `p` runs 0 → 1 over the whole climb. Returns the feet position.
 */
export const climb = HILL.climb;

// ----------------------------------------------------------------------------- players

type A = Partial<MinecraftAvatarProps>;

/** The teller. Bare arms on purpose: in this town, hands are the strangest thing about him. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#16a6b6", arms: "skin", legs: "#3b3fa0" }}
    blink
    {...p}
  />
);

/** One of the strangers over the hill: the pack's `Player`. 0 has the beard, 1 the green hair, 2 the pumpkin. */
export const Raider = Player;

/** Where the three strangers he names are standing. */
export const NAMED = {
  beard: [66.2, 0, 1.0] as Vec3,
  hair: [67.6, 0, -2.4] as Vec3,
  pumpkin: [65.2, 0, 3.4] as Vec3,
};

/** The people at the foot of the hill: [x, z, facing, clip, who, torch]. The first three are the ones he names. */
const CROWD: Array<[number, number, number, AnimName, number, boolean]> = [
  [NAMED.beard[0], NAMED.beard[2], WEST + 0.1, "laugh", 0, true],
  [NAMED.hair[0], NAMED.hair[2], WEST - 0.25, "cheer", 1, false],
  [NAMED.pumpkin[0], NAMED.pumpkin[2], WEST + 0.35, "lookAround", 2, true],
  [64.3, -3.0, WEST + 0.5, "talk", 3, true],
  [66.6, 4.9, NORTH, "talk", 4, true],
  [67.1, 6.1, 0.3, "laugh", 5, false],
  [68.6, 0.4, WEST + 0.4, "point", 6, true],
  [69.2, -4.2, WEST, "cheer", 7, true],
  [68.2, -5.8, EAST, "idle", 8, false],
  [69.6, 3.0, WEST - 0.5, "laugh", 9, true],
  [64.6, 6.2, WEST + 0.2, "cheer", 10, false],
  [65.8, -5.2, WEST - 0.4, "talk", 11, true],
  [70.4, -1.6, EAST + 0.3, "lookAround", 3, false],
  [63.7, 2.7, EAST - 0.2, "point", 9, true],
  [70.8, 5.2, WEST + 0.6, "cheer", 6, false],
  [70.2, -6.8, WEST - 0.2, "talk", 10, true],
  [64.0, -6.4, WEST + 0.3, "laugh", 8, true],
  [66.9, -0.9, EAST + 0.5, "talk", 5, false],
];
const CROWD_FACES: FaceName[] = ["grin", "laugh", "happy", "smug", "grin", "laugh"];

/** Dozens of people, at the foot of the far side of the hill. No two alike, and every one of them has hands. */
export const Strangers: React.FC<{ lit?: boolean }> = ({ lit = false }) => (
  <>
    {CROWD.map(([x, z, rot, clip, who, torch], i) => (
      <Raider
        key={i}
        who={who}
        position={[x, 0, z]}
        rotationY={rot}
        animation={clip}
        torch={torch}
        light={lit && i < 3 ? 5 : 0}
        phase={i * 1.37}
        {...(who === 0 ? {} : { face: CROWD_FACES[i % CROWD_FACES.length] })}
      />
    ))}
  </>
);

// ----------------------------------------------------------------------------- things

/** The torch he stands on the floor to dig by. It is the warm light in every night shot in his room. */
export const NightLight: React.FC = () => <Torch position={room(-2.2, 0, -0.55)} light={7} seed={11} />;
