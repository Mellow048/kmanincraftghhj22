import type React from "react";
<<<<<<< HEAD
import { MinecraftAvatar } from "../../engine";
=======
import { MinecraftAvatar, cam, useFilmTime } from "../../engine";
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, classroom, wordClock } from "../../../Topics/WhatIf";
import timingJson from "./timing.json";

/**
 * This film's own cast and places.
 *
<<<<<<< HEAD
 * Everything another "What if" film could use is in the topic's pack, Topics/WhatIf (catalogue with pictures:
 * Topics/WhatIf/PACK.md). It is passed on from here, so a scene imports only from "./kit". Build something new
 * here ONLY if the pack does not have it; if a second film could use it, put it in the pack instead.
=======
 * Everything reusable lives in the topic's pack (Topics/WhatIf). This file names what the scenes need, and
 * keeps every position in one place: `A("kitchen", 0, 0, -2)` is a point in the kitchen, never a magic number
 * in a scene.
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
 */

export {
  // how a power is shown
<<<<<<< HEAD
  Aura, Beam, Countdown, Echo, Overhead, Streaks, Swirl,
=======
  Aura, Beam, Countdown, Echo, Overhead, Swirl,
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
  // the people round the teller
  Classmate, KIDS, Teacher,
  // the school
  Chalkboard, Classroom, Desk, SchoolHall, classroom,
<<<<<<< HEAD
  // where a story goes when it leaves the classroom, and a function for the places in each (PACK.md)
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  // the small things
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  // shared with the other topics: a kid's bedroom, a village street, cubes that spell, the last picture
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
=======
  // home
  Kitchen, kitchen, Room, BedBox,
  // the small things
  Card, Cookie, CookieStack, Cup, Eraser, Tray,
  // staging
  DEG, EAST, KID, NORTH, SOUTH, WEST, chestOf, ease, faceOf, pop, ramp,
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
} from "../../../Topics/WhatIf";

export const timing = timingJson as unknown as Timing;

<<<<<<< HEAD
/** Seconds into its shot at which a word is said: `wordAt("3.heart", "heart")`. Hang every action on a word. */
=======
/** Seconds into its shot at which a word is said: `wordAt("3.hair", "hair")`. Hang every action on a word. */
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

<<<<<<< HEAD
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
=======
/** The middle of each floor. Each place is its own zone, far from the others. */
export const PLACE = {
  class: [0, 0, 0] as Vec3,
  hall: [0, 0, 40] as Vec3,
  kitchen: [0, 0, 80] as Vec3,
  room: [0, 0, 120] as Vec3,
};

export type ZoneName = keyof typeof PLACE;

/** A point inside a place: metres from the middle of its floor. */
export const A = (zone: ZoneName, x: number, y: number, z: number): Vec3 => [
  PLACE[zone][0] + x,
  y,
  PLACE[zone][2] + z,
];

/** The classroom's desks, board and door. */
export const SPOT = classroom(PLACE.class);

// ----------------------------------------------------------------------------- cast

type A2 = Partial<MinecraftAvatarProps>;

/** The teller: one loud colour nobody else wears, so a phone can find him in a full class. */
export const Hero: React.FC<A2> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" }} blink {...p} />
);

/** The best friend: the one who says the thing that stops him. Quiet green. */
export const Friend: React.FC<A2> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#8a5a3c" hair="#1f1a18" colors={{ torso: "#2fb5a8", arms: "skin", legs: "#3a3344" }} blink {...p} />
);

/** His mum: a grown-up, one head taller, in the cardigan she never takes off. */
export const Mum: React.FC<A2> = (p) => (
  <MinecraftAvatar scale={1.05} outfit="tee" skin="#e0b48c" hair="#4a3324" colors={{ torso: "#7d5aa8", arms: "#7d5aa8", legs: "#3b3346" }} blink {...p} />
);

/** What a lie looks like to him, and to nobody else: grey-brown smoke off the mouth. */
export const Toast: React.FC<{ at: Vec3; n?: number; seed?: number }> = ({ at, n = 9, seed = 7 }) => {
  const t = useFilmTime();
  return (
    <group position={[at[0], at[1] + 1.24, at[2]]}>
      {Array.from({ length: n }, (_, i) => {
        const k = (t * 0.42 + i / n + (seed % 7) * 0.03) % 1;
        const s = 0.2 * (0.5 + k * 1.1);
        const jx = ((i * 37 + seed * 11) % 13) / 13 - 0.5;
        const jz = ((i * 53 + seed * 7) % 11) / 11 - 0.5;
        return (
          <mesh key={i} position={[jx * 0.36 * (0.4 + k), k * 1.0, jz * 0.3 * (0.4 + k)]} rotation={[0, i + k, 0]}>
            <boxGeometry args={[s, s, s]} />
            <meshBasicMaterial color="#2f261c" transparent opacity={0.85 * (1 - k) * Math.min(1, k * 6)} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * A camera that always fits a person in a tall frame.
 *
 * The lens this film learned on: at 2.5 m and fov 42 a portrait frame holds about 1.5 m of height, which cuts
 * heads off at the forehead. Everything here is pulled to 3.2–4.8 m, aimed no higher than a chest, and opened
 * to at least 46°, so a standing kid fits with air above him and the room reads behind him.
 */
export const fit = (o: Omit<Parameters<typeof cam.push>[0], "to"> & { to?: number }) => {
  const dist = Math.min(Math.max(o.dist * 1.2, 2.6), 5.4);
  return {
    ...o,
    on: [o.on[0], Math.min(o.on[1], 1.14), o.on[2]] as Vec3,
    dist,
    to: Math.max(o.to ?? dist * 0.9, 2.4),
    fov: Math.max(o.fov ?? 45, 46),
  };
};
>>>>>>> 8510bb0b99d0dbaa89384979ebff0f03bdd1b7c2
