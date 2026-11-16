import type React from "react";
import { getPose } from "../../engine";
import type { Pose, Timing, Vec3 } from "../../engine";
import { CatPlayer, KID, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { CatDogPlayerProps, CreeperSpot } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: a town where everyone is a creeper, and the one cat who lives in it.
 *
 * Everything alive and every thing comes from the pack (Topics/InThisTown/PACK.md): the cat is a `CatPlayer`, and the
 * creeper family, the crowd that bolts, the costume, the long table and the players with their swords and sacks are
 * "The creeper town". What is only this story's is here: the teller, where things stand, and who stands where.
 *
 * The street runs north to south along x = 0, and the lens lives at its south end (+Z). The school closes the north end.
 */

export { DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp, Bits, Bubble, Chicken, Creeper, Fish, Lantern, Puffs, SoundRings, SubscribeSign } from "../../../Topics/InThisTown";
// The creeper town (PACK.md, "The creeper town"): built in this film, and moved to the pack when the owner approved it.
// The scenes keep the short names they were written with.
export {
  CreeperMum as Mum, CreeperDad as Dad, CreeperKid as Little, creeperBolt as bolt, CreeperCrowd as Creeps,
  GunpowderPlayer as Raider, PlayerSword as Sword, EmptySack as Sack, LostShoe as Shoe,
  CardboardBox as Box, LongTable as Table, SchoolDesk as Desk, CreeperFace, CreeperSuit as Suit,
  NightFill as Fill, groundSitPose as sitPose, GROUND_SIT, openArmsPose as openArms, PixelHeart as Heart,
} from "../../../Topics/InThisTown";
export type Spot = CreeperSpot;

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. `cut`: the shot cuts in that late. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** His family's house, on the west side. Its door faces the street. */
  home: [-9.4, 0, 8] as Vec3,
  /** The dinner table stands in the yard in front of it, along the street. Its middle. */
  table: [-4.7, 0, 8] as Vec3,
  /** The school, across the north end of the street. The middle of its front wall. */
  school: [0, 0, -21] as Vec3,
  /** The square: the wide part of the street in front of the well. */
  square: [0, 0, -4] as Vec3,
  well: [5.2, 0, -6.5] as Vec3,
  /** The room: its own zone, far away. */
  room: [0, 0, 80] as Vec3,
};
/** How long the table is at first, and at the end. */
export const TABLE_LONG = 9;
export const TABLE_SHORT = 6;

/** The teller: the only cat in town. A kid in the red shirt. */
export const Hero: React.FC<Omit<CatDogPlayerProps, "kind" | "who">> = (p) => <CatPlayer who={0} scale={KID} {...p} />;

// ----------------------------------------------------------------------------- the players

// ----------------------------------------------------------------------------- staging

/** The town in the street, going about: [x, z]. Fourteen of them between the school and the south end. */
export const STREET: Spot[] = [
  [-1.1, 6.6], [1.2, 5.2], [-0.4, 3.4], [1.5, 2.0], [-1.4, 0.6], [0.5, -0.8], [-0.9, -2.6],
  [1.3, -3.8], [-2.6, 4.6], [2.7, 3.2], [0.1, -5.6], [-2.2, -6.4], [2.4, -7.2], [-0.2, 8.2],
];
/** The whole town backed into the square, facing south: [x, z]. Mum and dad stand at the front, apart from this. */
export const SQUARE: Spot[] = [
  [-2.6, 0.2], [2.5, 0.0], [-4.4, -0.6], [4.3, -0.9], [-1.5, -1.2], [1.4, -1.4], [0, -0.9], [-3.3, -2.0], [3.2, -2.3],
  [-5.2, -2.6], [5.0, -3.0], [-0.7, -2.7], [0.8, -3.0], [-2.3, -3.6], [2.2, -3.8], [-4.2, -4.2], [4.0, -4.6],
  [-1.2, -4.6], [1.1, -4.9], [0, -4.0], [-3.1, -5.6], [3.0, -5.8], [-0.4, -6.2], [1.9, -6.6], [-1.9, -6.9], [0.6, -7.4],
];
export const MUM_AT: Vec3 = [-0.8, 0, 1.4];
export const DAD_AT: Vec3 = [0.9, 0, 1.4];
/** The six players, in a line across the street: [x, z]. */
export const SIX: Array<[number, number]> = [[-0.4, 9.0], [1.0, 9.4], [-1.8, 9.6], [2.3, 10.0], [-3.0, 10.3], [3.5, 10.6]];
/** Where he stands behind his town before he says it. */
export const BEHIND: Vec3 = [0, 0, -9.4];

