import type React from "react";
import { MinecraftAvatar, getPose } from "../../engine";
import type { Pose, Timing, Vec3 } from "../../engine";
import { KID, PumpkinHat, ease, ramp, wordClock } from "../../../Topics/InThisTown";
import type { EnderSpot } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's own cast and things: an overworld town where everyone is an enderman, and the one kid who lives in it.
 *
 * Everything alive and every thing comes from the pack (Topics/InThisTown/PACK.md): his mum (pink bow, pink knees)
 * and dad (straw hat), the town of endermen that carry things, teleport and scream, the six players in pumpkins, his
 * drawing, the rain, the photo and the kitchen are "The enderman town". What is only this story's is here: the kid,
 * where things stand, and who stands where.
 *
 * The street runs north to south along x = 0 and the lens lives at its south end (+Z). Home closes the north end.
 * A tall frame is narrow: at 6 m it shows about 1.4 m each side of its middle. Stage in depth, not in width.
 */

export { DEG, EAST, KID, NORTH, SOUTH, WEST, ease, ramp, Bits, Bubble, Puffs, SoundRings, SubscribeSign, Wisps, Pumpkin } from "../../../Topics/InThisTown";
export { Block } from "../../engine";
export { NightFill as Fill, LongTable as Table, groundSitPose as sitPose, GROUND_SIT, PixelHeart as Heart, PlayerSword as Sword } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);
/** Seconds into its shot at which a word is said. */
export const w = (cue: string, word: string, cut = 0, nth = 0) => wordAt(cue, word, nth) - cut;
export const tw = (t: number, a: number, b: number) => ease(ramp(t, a, b));
export const cueLen = (cue: string): number => {
  const c = (timing as unknown as { cues: Array<{ id: string; start: number; end: number }> }).cues.find((x) => x.id === cue);
  return c ? c.end - c.start : 2;
};
export const posed = (clip: Parameters<typeof getPose>[0], t: number, patch: Partial<Pose>): Pose => ({ ...getPose(clip, t), ...patch });
/** One hop: 0 outside, a sine arc of height `h` for `d` seconds from `at`. */
export const hop = (t: number, at: number, h = 0.3, d = 0.3) => {
  const k = (t - at) / d;
  return k <= 0 || k >= 1 ? 0 : Math.sin(k * Math.PI) * h;
};

// The enderman town (PACK.md, "The enderman town"): built in this film, and moved to the pack when the owner asked for
// it (2026-11-16). The scenes keep the short names they were written with.
export {
  EnderMum as Mum, EnderDad as Dad, EnderThing as Thing, EnderZap as Zap, EnderCrowd as Enders, PumpkinPlayer as Hunter,
  KnockedPumpkin as Knocked, EnderPearl as Pearl, PearlSign, KidDrawing as Drawing, Rain, Puddle, DinnerPlate as Plate,
  PhotoBorder, PumpkinView, KitchenStove as Stove, KitchenCounter as Counter, KitchenShelf as Shelf, KitchenGone,
  FryingPan as Pan, ENDER_PINK as PINK, ENDER_PURPLE as PURPLE,
} from "../../../Topics/InThisTown";
export type Spot = EnderSpot;

// ----------------------------------------------------------------------------- places

export const PLACE = {
  /** Home: across the north end of the street. The middle of its front wall; the door faces south. */
  home: [0, 0, -16] as Vec3,
  /** The dinner table stands in the yard, across the street. Its middle. */
  table: [0, 0, -11.5] as Vec3,
  /** The kitchen: against the front wall, east of the door. The middle slot. */
  kitchen: [3.4, 0, -15.45] as Vec3,
  /** The square: the wide part of the street south of the yard. */
  square: [0, 0, -4] as Vec3,
  /** The pile of blocks he hides behind when the players come. */
  pile: [-2.6, 0, 8.2] as Vec3,
  /** The photo: its own zone, far away. */
  photo: [0, 0, 80] as Vec3,
};

// ----------------------------------------------------------------------------- the family

type A = React.ComponentProps<typeof MinecraftAvatar>;
/**
 * The teller: a kid in a yellow shirt. `pumpkin` > 0 puts a carved pumpkin on his head at that scale (it is too big for
 * him); `up` 0–1 pushes it back off his face like a hat.
 */
export const Hero: React.FC<A & { pumpkin?: number; up?: number; askew?: number }> = ({ pumpkin = 0, up = 0, askew = 0.1, ...p }) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e2ac82"
    hair="#5a3418"
    colors={{ torso: "#f6c41c", arms: "#f6c41c", legs: "#3557b8" }}
    blink
    head={pumpkin > 0 ? <PumpkinHat scale={pumpkin} up={up} askew={askew} /> : undefined}
    {...p}
  />
);


// ----------------------------------------------------------------------------- staging

/** The town going about in the street: [x, z]. */
export const STREET: Spot[] = [
  [-0.9, 6.4], [1.1, 4.6], [-0.3, 2.6], [1.4, 0.8], [-1.3, -0.8], [0.5, -2.6], [-0.8, -4.4], [1.2, -6.0],
  [-2.3, 3.6], [2.4, 2.2], [0.1, -7.6], [-2.1, -6.4],
];
/** The whole town in the square at night, facing south. Mum and dad stand in front of it, apart from this. */
export const SQUARE: Spot[] = [
  [-2.1, -1.4], [2.2, -1.2], [0.1, -1.9], [-1.1, -2.6], [1.2, -2.9], [-3.0, -3.0], [3.1, -3.3], [-0.2, -3.7],
  [-2.0, -4.3], [2.1, -4.6], [0.9, -5.2], [-1.0, -5.5], [-3.2, -5.8], [3.3, -6.0], [0, -6.6], [-1.9, -7.2], [1.9, -7.4],
];
export const MUM_AT: Vec3 = [-0.95, 0, -0.5];
export const DAD_AT: Vec3 = [1.0, 0, 0];
/** The six players, in three rows of two, facing the town: [x, z]. */
export const SIX: Array<[number, number]> = [[-0.55, 3.3], [0.6, 3.1], [-1.6, 4.0], [1.65, 3.9], [-0.9, 5.0], [1.0, 5.1]];
/** Where the six pumpkins end up, for the shots after. */
export const PUMPS: Array<[number, number, number]> = [[-0.7, 1.6, 0.4], [0.9, 1.9, -0.6], [-1.5, 2.6, 1.9], [1.5, 2.9, 2.6], [-0.2, 2.8, -1.2], [0.3, 1.2, 0.9]];
