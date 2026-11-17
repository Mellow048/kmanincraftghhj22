import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, TELLER, classroom, kitchen, wordClock } from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
 * Everything another "What if" film could use is in the topic's pack, Topics/WhatIf (catalogue with pictures:
 * Topics/WhatIf/PACK.md). It is passed on from here, so a scene imports only from "./kit". Build something new
 * here ONLY if the pack does not have it; if a second film could use it, put it in the pack instead.
 *
 * THIS FILM'S NEW THING IS A DOOR. Six of them, all the same size, all in the same street: they are the power.
 * Each one is a zone of its own, so a shot can be in the hall behind a door and nowhere else.
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
 *
 *   street  The street he lives on, at NIGHT: the pavement, the road, six front doors. The power's home.
 *   kitchen The kitchen at home, at night: the fridge is the first door he uses. Also where his mum sits at the end.
 *   school  The classroom, entered through the fridge. Daytime: the other end of a door in the dark.
 *   shop    The corner shop, its queue, at nine at night. Where the woman is.
 *   pool    The deep end of a swimming pool, at night, for the dare.
 *   hall    The hallway behind the stuck door. No windows, one lamp, and writing on the wall.
 *
 * A zone is drawn only while a shot says it is on, so 6 sets cost the price of one.
 */
export const PLACE = {
  /** The street at night. Number 4 (his) faces south; the lens lives on the road. */
  street: [0, 0, 0] as Vec3,
  /** The kitchen at home. */
  kitchen: [0, 0, 60] as Vec3,
  /** The classroom he walks out of the fridge into. */
  school: [0, 0, -60] as Vec3,
  /** The corner shop and the pavement outside it. */
  shop: [60, 0, 0] as Vec3,
  /** The pool he comes out in. */
  pool: [-60, 0, 0] as Vec3,
  /** The hallway behind the stuck door: the last place in the film, and the one he has never seen. */
  hall: [0, 0, 120] as Vec3,
};

/** The street: `S(x, y, z)` from the middle of the pavement. Numbers 4 and 9 are his and the blue door. */
export const S = (x: number, y: number, z: number): Vec3 => [PLACE.street[0] + x, PLACE.street[1] + y, PLACE.street[2] + z];
/** The kitchen: `K(x, y, z)`. The fridge is at +x on the north wall; the table is in the middle. */
export const K = (x: number, y: number, z: number): Vec3 => [PLACE.kitchen[0] + x, PLACE.kitchen[1] + y, PLACE.kitchen[2] + z];
/** The classroom and its desks: `SPOT.seat(col, row)`, `SPOT.board`, `SPOT.door`. */
export const SPOT = classroom(PLACE.school);
/** The teller's desk, seen from the front of the class. */
export const ME = SPOT.seat(1, 1);
/** The corner shop: `SH(x, y, z)` from the middle of its floor. The door is on the open south side (+z). */
export const SH = (x: number, y: number, z: number): Vec3 => [PLACE.shop[0] + x, PLACE.shop[1] + y, PLACE.shop[2] + z];
/** The pool: `P(x, y, z)` from the middle of the deep end's water. The water's surface is y = 0. */
export const P = (x: number, y: number, z: number): Vec3 => [PLACE.pool[0] + x, PLACE.pool[1] + y, PLACE.pool[2] + z];
/** The hallway behind the stuck door: `H(x, y, z)`. It runs north–south, 1.4 m wide. */
export const H = (x: number, y: number, z: number): Vec3 => [PLACE.hall[0] + x, PLACE.hall[1] + y, PLACE.hall[2] + z];
/** The kitchen at home, from the pack: `HOME.chair`, `HOME.table`, `HOME.door`, `HOME.stove`. */
export const HOME = kitchen(PLACE.kitchen);

/**
 * The six doors of the street, in the order the film needs them. A door is a hole in a wall with a slab in it;
 * `at` is the middle of the opening at floor level, `facing` is the way the door faces (0 = south, toward the road).
 */
export const DOOR = {
  /** NUMBER 4: his own front door, which opens onto somewhere else only for him. */
  mine: { at: S(-6.4, 0, -3.02), facing: 0 },
  /** NUMBER 6: the pizza arrives here, late, from a door it was never ordered from. */
  pizza: { at: S(0, 0, -3.02), facing: 0 },
  /** NUMBER 9: the blue door, which is a dare, and which comes out in the deep end. */
  blue: { at: S(12.8, 0, -3.02), facing: 0, blue: true },
  /** The back door of the house, in the passage between 2 and 4: a step and then a brick wall. */
  back: { at: S(-9.6, 0, -4.2), facing: Math.PI / 2 },
  /** The shop door: on the shop's open south side. */
  shop: { at: SH(0, 0, 4.0), facing: 0 },
} as const;

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
 * A grown-up in this film. NOT `Teacher` from the pack — that one wears an off-white tee (#e9e4d8) and under three
 * metres it reads as a white slab with a head above it, which is what four shots of film three looked like.
 */
export const Adult: React.FC<A & { color?: string }> = ({ color = "#3f5f8a", ...p }) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#e0ac7e" hair="#4a3524" colors={{ torso: color, arms: color, legs: "#33374a" }} blink {...p} />
);

/** His mum: smaller than a stranger, in the one warm colour in the film that is not his own orange. */
export const Mum: React.FC<A> = (p) => (
  <MinecraftAvatar scale={0.94} outfit="tee" skin="#dcae86" hair="#6b5540" colors={{ torso: "#7a4a6a", arms: "#7a4a6a", legs: "#3a3344" }} blink {...p} />
);

/** The neighbour: dressing gown, fury, no idea which door he came out of. */
export const Neighbour: React.FC<A> = (p) => (
  <Adult color="#b8863f" {...p} />
);

/** The woman at the front of the queue. The same coat at nine at night and at six the next evening. */
export const Woman: React.FC<A> = (p) => (
  <Adult color="#4a6a5a" hair="#8a8a8a" {...p} />
);

/** The kid who dared him into the pool. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);
