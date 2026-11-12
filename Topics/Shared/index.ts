/**
 * SHARED PARTS — what more than one topic builds from.
 *
 * This folder is not a topic: it has no topic.json, no rules and no starter. It exists so that a
 * new topic does not copy a helper out of another topic's folder, and does not reach into it either.
 *
 *   import { Figure, Icon, filmClock, pop, wordClock, SubscribeSign } from "../Shared";
 *
 * Two kinds of thing live here:
 *   1. Parts written for every topic: `voxel.tsx` (numbers, signs and icons made of cubes) and
 *      `clock.ts` (when a word is said, in film seconds).
 *   2. Parts that were born in "In This Town" and are not about a town. They still live in that
 *      topic's pack, unchanged, because its finished films are built on them; this file only
 *      passes them on. Move one here for real only with a pixel check of those films
 *      (scripts/compare-stills.py).
 *
 * A topic's own index.ts passes these on in turn, so a film imports only from its own "./kit".
 */

// ---- born in In This Town, and not about a town ----------------------------
// staging: when a word is said, how a thing pops in, where "in front of him" is
export { DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp, wordClock } from "../InThisTown/staging";
// twelve people, no two alike
export { PLAYERS, Player } from "../InThisTown/players";
// a speech bubble; bits that fly when something breaks
export { Bits, Bubble } from "../InThisTown/things";
// puffs of dust, rings of sound, and the red sign every film of the channel ends on
export { Puffs, SoundRings, SubscribeSign } from "../InThisTown/creatures";
// the people of a Minecraft village, and what a village is built from
export { ADULT, CHILD, ROBE, Villager, villagerChest, villagerFace } from "../InThisTown/villagers";
export type { VillagerProps } from "../InThisTown/villagers";
export { Hut, LampPost, Room, Stall } from "../InThisTown/places";
export { BedBox } from "../InThisTown/things";

// ---- written for every topic ----------------------------------------------
export * from "./clock";
export * from "./voxel";
