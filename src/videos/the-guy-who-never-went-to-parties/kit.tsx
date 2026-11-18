import type React from "react";
import { MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Bubble, KID, wordClock } from "../../../Topics/InThisTown";
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

export { Vox };
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
  /** The vending machine, on the south side of the street. The town's only restaurant. */
  vending: [8.0, 0, 5.0] as Vec3,
  /** THE TELLER'S KITCHEN. Its own set, sealed on four sides, far from the street. */
  home2: [0, 0, 400] as Vec3,
  /** The restaurant: 12 x 9, its pass on the south wall. Its own set again. */
  restaurant: [0, 0, 500] as Vec3,
  /** The teller's room. Its own zone, far from everything. */
  room: [0, 0, 600] as Vec3,
};
/** The kitchen at home: a point given in the kitchen's own coordinates. */
export const K = (x: number, y: number, z: number): Vec3 => [PLACE.home2[0] + x, PLACE.home2[1] + y, PLACE.home2[2] + z];
/** A point in the restaurant kitchen. */
export const R = (x: number, y: number, z: number): Vec3 => [PLACE.restaurant[0] + x, PLACE.restaurant[1] + y, PLACE.restaurant[2] + z];
/** A point inside his bedroom. */
export const B = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

/**
 * THE KITCHEN'S OWN NUMBERS. Every lens in `home` is placed from these, never by eye: a sealed room will
 * happily render the inside of a wall, and it looks exactly like a lighting fault.
 *
 *   floor      x -3.5 .. 3.5, z -3.0 .. 3.0, ceiling 3.0
 *   counter    along the north wall, top y 0.93
 *   stove      x -2.1
 *   fridge     x 2.75
 *   table      middle (0, 0.76, 0.6), 2.2 x 1.3
 *   board      THE CUTTING BOARD (0, 0.85, 0.25): the subject of the whole training arc
 *   doorway    the south wall's gap, x -0.7 .. 0.7: the lens stands in it, outside the room
 */
export const HOME2 = {
  x: [-3.4, 3.4] as [number, number],
  z: [-2.9, 2.9] as [number, number],
  ceiling: 3.0,
  counterTop: 0.93,
  stove: K(-2.1, 1.02, -2.55),
  fridge: K(2.75, 0.9, -2.5),
  table: K(0, 0.76, 0.6),
  board: K(0, 0.88, 0.25),
};
/** The restaurant's numbers, for the same reason. */
export const REST2 = {
  x: [-5.9, 5.9] as [number, number],
  z: [-4.4, 4.4] as [number, number],
  ceiling: 3.4,
  hotLine: R(0, 1.02, -3.6),
  pass: R(0, 1.1, 3.2),
  bench: R(-1.6, 0.88, -1.2),
};

// ----------------------------------------------------------------------------- the teller

/**
 * "HUS HUS HUS": the running chant. It is a meme about SPEED, and the first cut drew one slow bubble,
 * which read as a cough. Three bubbles now, half a beat apart, repeating five times a second, each one
 * popping and dying, so the chant is visibly faster than the knife hand in the same frame.
 */
export const Chant: React.FC<{ t: number; at: Vec3; scale?: number; rotationY?: number; tail?: number; spread?: number }> = ({
  t,
  at,
  scale = 0.5,
  rotationY = 0,
  tail = -1,
  spread = 0.62,
}) => (
  <group position={at} rotation={[0, rotationY, 0]}>
    {[0, 1, 2].map((i) => {
      const period = 0.62; // three bubbles, one every 0.21 s: a breath in a run
      const cycle = (((t - i * 0.075) % period) + period) % period;
      const local = cycle / period;
      if (local > 0.74) return null; // two of the three are on screen most of the time: a chant, not a cough
      const grow = Math.min(1, local / 0.14);
      const fade = Math.min(1, (0.74 - local) / 0.12);
      const s = scale * grow * fade;
      return (
        <Bubble
          key={i}
          text="HUS"
          position={[i * spread, i * 0.06 + Math.sin(t * 26 + i) * 0.02, -i * 0.05]}
          scale={s}
          rotationY={rotationY * i * 0.3}
          dark
          tail={i === 0 ? tail : 0}
        />
      );
    })}
  </group>
);

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
