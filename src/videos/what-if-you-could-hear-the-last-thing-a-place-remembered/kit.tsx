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
  /** The street at midnight: the bus shelter, the shop, the bench, the road. */
  street: [0, 0, -80] as Vec3,
  /** The kitchen at home, where his dad says one thing to the sink. */
  kitchen: [0, 0, 160] as Vec3,
  /** The gym: a hall with a climbing frame and one wall that remembers nothing. */
  gym: [-60, 0, 0] as Vec3,
  /** The bathroom at home: the mirror, the tiles, and his mother's voice in them. */
  bath: [0, 0, 240] as Vec3,
};
/** The classroom's desks, board and door: `SPOT.seat(col, row)`, `SPOT.teacher`, `SPOT.board`… */
export const SPOT = classroom(PLACE.class);
/** The teller's desk: the middle of the back row. Everybody he can see is in front of him. */
export const ME = SPOT.seat(1, 2);
/** The street: `S(x, y, z)` from the middle of the pavement. The bus shelter is at x +1.4. */
export const S = (x: number, y: number, z: number): Vec3 => [PLACE.street[0] + x, PLACE.street[1] + y, PLACE.street[2] + z];
/** The kitchen: `K(x, y, z)`. The sink is on the north wall; the door is in the east wall. */
export const K = (x: number, y: number, z: number): Vec3 => [PLACE.kitchen[0] + x, PLACE.kitchen[1] + y, PLACE.kitchen[2] + z];
/** The gym: `G(x, y, z)` from the middle of its floor. The silent wall is the west one. */
export const G = (x: number, y: number, z: number): Vec3 => [PLACE.gym[0] + x, PLACE.gym[1] + y, PLACE.gym[2] + z];
/** The bathroom: `B(x, y, z)`. The mirror is on the east wall, the tiles run round the room. */
export const B = (x: number, y: number, z: number): Vec3 => [PLACE.bath[0] + x, PLACE.bath[1] + y, PLACE.bath[2] + z];
/** The kitchen at home, from the pack: `HOME.table`, `HOME.stove`, `HOME.chair`. */
export const HOME = kitchen(PLACE.kitchen);

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
 * A grown-up in this film. NOT the pack's `Teacher`: its off-white tee reads as a white slab under three metres.
 * His dad, his mother, a teacher, the man at the bus stop.
 */
export const Adult: React.FC<A & { color?: string }> = ({ color = "#5a4a6a", ...p }) => (
  <MinecraftAvatar scale={1} outfit="tee" skin="#e0ac7e" hair="#4a3524" colors={{ torso: color, arms: color, legs: "#33374a" }} blink {...p} />
);

/** His dad: the one who says one thing to an empty kitchen every morning. */
export const Dad: React.FC<A> = (p) => <Adult color="#3f5f6a" hair="#5a4a3a" {...p} />;

/** His mother: the voice in the bathroom wall, and the one who says it back on the last morning. */
export const Mum: React.FC<A> = (p) => (
  <MinecraftAvatar scale={0.94} outfit="tee" skin="#dcae86" hair="#6b5540" colors={{ torso: "#7a4a6a", arms: "#7a4a6a", legs: "#3a3344" }} blink {...p} />
);

/** The best friend: the one who is told first, and the one who says stop. A second colour, quieter than the teller's. */
export const Friend: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);
