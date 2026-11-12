import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, classroom, wordClock } from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "What if" film could use is in the topic's pack, Topics/WhatIf (catalogue with pictures:
 * Topics/WhatIf/PACK.md). It is passed on from here, so a scene imports only from "./kit". Build something new
 * here ONLY if the pack does not have it; if a second film could use it, put it in the pack instead.
 */

export {
  // how a power is shown
  Aura, Beam, Countdown, Echo, Overhead, Streaks, Swirl,
  // the people round the teller
  Classmate, KIDS, Teacher,
  // the school
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
  // shared with the other topics: a kid's bedroom, a village street, cubes that spell, the last picture
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.heart", "heart")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. Each place is its own zone, far from the others, and a shot names the zone it plays in.
 * world.tsx builds the places from these, and scenes stand people on them: change a number here, never in two.
 */
export const PLACE = {
  /** The classroom. The middle of its floor. */
  class: [0, 0, 0] as Vec3,
  /** The hallway of lockers. */
  hall: [0, 0, 40] as Vec3,
  /** The teller's room. */
  room: [0, 0, 80] as Vec3,
};
/** The classroom's desks, board and door: `SPOT.seat(col, row)`, `SPOT.teacher`, `SPOT.board`… */
export const SPOT = classroom(PLACE.class);
/** The teller's desk: the middle of the back row. Everybody he can see is in front of him. */
export const ME = SPOT.seat(1, 2);

// ----------------------------------------------------------------------------- the teller, and the people the story is about

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. Give him ONE loud colour nobody else in the film wears,
 * so a phone can find him in a full classroom.
 * Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face on the cut.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }} blink {...p} />
);

/** The best friend: the one who is told first, and the one who says stop. A second colour, quieter than the teller's. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);
