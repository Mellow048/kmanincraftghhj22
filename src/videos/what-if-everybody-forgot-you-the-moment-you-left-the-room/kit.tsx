import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, TELLER, classroom, kitchen, lunchRoom, wordClock } from "../../../Topics/WhatIf";
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
  // the people round the teller, and his own look
  Classmate, HERO, KIDS, TELLER, Teacher,
  // the school
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
  // where a story goes when it leaves the classroom, and a function for the places in each (PACK.md)
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  // the small things
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
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
  /** The canteen: its own set, west of everything, sharing the class's z. */
  lunch: [16, 0, 0] as Vec3,
  /** The bike shop. */
  shop: [0, 0, 120] as Vec3,
  /** The school yard: open on all sides. The only place in the film with no walls. */
  yard: [-24, 0, 0] as Vec3,
  /** The street outside his house. */
  drive: [24, 0, 60] as Vec3,
  /** The kitchen at home, where the tin is kept. */
  kitchen: [0, 0, 160] as Vec3,
};
/** The classroom's desks, board and door: `SPOT.seat(col, row)`, `SPOT.teacher`, `SPOT.board`… */
export const SPOT = classroom(PLACE.class);
/** The teller's desk: the middle of the back row. Everybody he can see is in front of him. */
export const ME = SPOT.seat(1, 2);
/** The hallway's own places: `HALL.at(x, y, z)` from the middle of its floor. It runs west to east. */
export const HALL = {
  at: (x: number, y: number, z: number): Vec3 => [PLACE.hall[0] + x, PLACE.hall[1] + y, PLACE.hall[2] + z],
};
/** The home's own places: `R(x, y, z)` from the middle of the room's floor. */
export const R = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

// ----------------------------------------------------------------------------- the teller, and the people the story is about

type A = Partial<MinecraftAvatarProps>;

/**
 * The teller: a kid, first person, in most of the shots. His colours and his painted head come from the pack
 * (`HERO` and `TELLER`, PACK.md), so every film of the topic is the same boy and no two invent him again.
 * Keep ONE loud colour nobody else in the film wears, so a phone can find him in a full classroom.
 * Faces for a kid: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face on the cut.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" blink {...TELLER} {...p} />
);

/**
 * A grown-up in the school: the teacher, the shopkeeper, the woman behind the counter. NOT `Teacher` from the pack —
 * that one wears an off-white tee (#e9e4d8) and at anything under three metres it reads as a white slab with a head
 * above it, which is what four shots of film three looked like. This one wears a colour you can see.
 */
export const Adult: React.FC<A & { color?: string }> = ({ color = "#3f5f8a", ...p }) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#e0ac7e" hair="#4a3524" colors={{ torso: color, arms: color, legs: "#33374a" }} blink {...p} />
);

/** The best friend: the one who is told first, and the one who says stop. A second colour, quieter than the teller's. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);

/** The canteen's own places, at `lunchRoom(PLACE.lunch)`. */
export const LUNCH = lunchRoom(PLACE.lunch);
/** The bike shop's floor: `SHOP.at(x, y, z)` from the middle of it. The door is on its south side (+z). */
export const SHOP = { at: (x: number, y: number, z: number): Vec3 => [PLACE.shop[0] + x, PLACE.shop[1] + y, PLACE.shop[2] + z] };
/** The school yard: open on all sides. The one place in the film where he is under the sky. */
export const YARD = { at: (x: number, y: number, z: number): Vec3 => [PLACE.yard[0] + x, PLACE.yard[1] + y, PLACE.yard[2] + z] };
/** The street outside his house: the front door at z = -2.6, the road at z = +5. */
export const DRIVE = { at: (x: number, y: number, z: number): Vec3 => [PLACE.drive[0] + x, PLACE.drive[1] + y, PLACE.drive[2] + z] };

/** The kitchen at home: `HOME.chair` (where he sits), `HOME.table` (the middle of it), `HOME.stove`. */
export const HOME = kitchen(PLACE.kitchen);
