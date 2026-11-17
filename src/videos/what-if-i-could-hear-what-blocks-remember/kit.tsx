import type React from "react";
import { Block, Glow, MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, SoundRings, classroom, gym, lunchRoom, pop, wordClock } from "../../../Topics/WhatIf";
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
  // where a story goes when it leaves the classroom, and a function for the places in each (PACK.md)
  Gym, Kitchen, LunchRoom, Reflection, gym, kitchen, lunchRoom,
  // the small things
  Card, Cookie, CookieStack, Cup, Dog, DogBowl, Eraser, Sandwich, Tie, Tray,
  // shared with the other topics: a kid's bedroom, a village street, cubes that spell, the last picture
  BedBox, Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, Room, SoundRings, SubscribeSign, Voxels,
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
} from "../../../Topics/WhatIf";

/**
 * THE GYM AFTER LIGHTS-OUT.
 *
 * Measured on the delivered film, the night stretch of this story sits at 14-30 luma out of 255, and in the four
 * shots at its centre half of every frame is below ten: the viewer cannot see the boy at the moment the story
 * turns. The look alone will not lift it, and a point light cannot either — it falls off long before the edges of
 * a five-metre frame, so the middle brightens and the frame stays black. This lifts the air instead: `air` is the
 * corridor light through the gym doors, `spill` is what the stage throws back, and `on` puts a soft cool light on
 * whoever the camera is close to.
 */
export const NightGym: React.FC<{ on?: Vec3; air?: number; spill?: number; key?: number }> = ({ on, air = 0.55, spill = 0.26, key = 8 }) => (
  <>
    <ambientLight color="#9db0e6" intensity={air} />
    <hemisphereLight color="#8ea6e6" groundColor="#2b2434" intensity={spill} />
    {on && key > 0 ? <pointLight position={[on[0] - 0.65, on[1] + 1.7, on[2] + 0.85]} color="#bcd0ff" intensity={key} distance={7} decay={2} /> : null}
  </>
);

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
  /** The lunch room where the block returns a lost sandwich. */
  lunch: [0, 0, 80] as Vec3,
  /** The gym and its school stage. */
  gym: [0, 0, 120] as Vec3,
};
/** The classroom's desks, board and door: `SPOT.seat(col, row)`, `SPOT.teacher`, `SPOT.board`… */
export const SPOT = classroom(PLACE.class);
/** The teller's desk: the middle of the back row. Everybody he can see is in front of him. */
export const ME = SPOT.seat(1, 2);
/** The gym's stage, doors and school gate: `GYM.at(x, y, z)`. */
export const GYM = gym(PLACE.gym);
/** The lunch room's tables and serving counter. */
export const LUNCH = lunchRoom(PLACE.lunch);

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

/**
 * One block's remembered phrase. The block stays ordinary: the echo is only the same cool-blue square rings,
 * which distinguishes remembered sound from a live speaker without placing tiny, unreadable words in the frame.
 */
export const EchoTrace: React.FC<{ at: Vec3; t: number; rotationY?: number }> = ({ at, t, rotationY = 0 }) => {
  const fade = t < 0 ? 0 : Math.max(0, 1 - Math.max(0, t - 1.2) / 0.65);
  const pulse = pop(t, 0, 0.22) * fade;
  return (
    <>
      <Block position={at} size={[0.56, 0.56, 0.56]} color="#69737a" metalness={0.18} roughness={0.82} />
      <Block position={[at[0], at[1], at[2] + 0.285]} size={[0.42, 0.42, 0.025]} color="#59656d" emissive="#273d4b" emissiveIntensity={0.18} castShadow={false} />
      <Glow position={[at[0], at[1] + 0.04, at[2] + 0.38]} size={0.9} color="#8bd9f1" opacity={0.22 * pulse} />
      <SoundRings position={[at[0], at[1] + 0.02, at[2] + 0.34]} rotationY={rotationY} t={t} color="#9fe8ff" reach={0.78} />
    </>
  );
};
