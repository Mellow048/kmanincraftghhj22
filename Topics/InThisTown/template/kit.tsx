import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
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
} from "../../../Topics/InThisTown";

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
