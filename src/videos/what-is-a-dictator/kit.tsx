import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, filmClock, near, stop } from "../../../Topics/Explainer";
import timingJson from "./timing.json";

/**
 * This film's own route, places and people.
 *
 * Everything another explainer could use is in the topic's pack, Topics/Explainer (catalogue with pictures:
 * Topics/Explainer/PACK.md). It is passed on from here, so a scene imports only from "./kit". What the pack did not
 * have is in ./parts.tsx, built the way the pack asks: in the film first.
 */

export {
  // the camera: stops, and the scene that flies between them
  flightScene, near, stop, unbroken,
  // the stage: islands in one sky, and what stands on them
  Bridge, Island, Plinth, Signpost, Sun,
  // things money buys: the loaf the leader may not take
  Bread,
  // shared with the other topics: cubes that spell, people, a village, the last picture
  Bits, Bubble, Figure, Hut, Icon, LampPost, Puffs, ROBE, SubscribeSign, Villager, Voxels, textRows,
  // staging: how a thing pops in, where "in front of him" is
  ADULT, CHILD, DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp, villagerChest, villagerFace,
} from "../../../Topics/Explainer";
export {
  BENCH_FLOOR, Banner, Bench, Brazier, Cage, Cloak, CloakStand, Column, DESK_TOP, FlyingHat, Folk, GOLD, Gavel, Helmet, LeaderHat, LooseCloak, Medals, Moon, No, NoBits, PURPLE, RED,
  STONE, Spear, StoneMan, Stripe, Tabs, U, VoteBox, VotePile, VoteStone, Wig, Wreath, headTop, heldBy, strike,
} from "./parts";

export const timing = timingJson as unknown as Timing;

/**
 * The film's clock. Everything an explainer shows lives in the world for the whole film, so it is driven by the
 * moment a word is said. The first line starts at 0, so `useNow()` is the film's time, and `clock.at(cue, word)`
 * is a moment on the same clock:
 *
 *   const now = useNow();
 *   const no = clock.at("2.judge", "no");
 *   <No scale={pop(now - no, 0)} … />
 *
 * `clock.at` throws if the cue or the word is not there, so a change to the script breaks the build instead of
 * leaving an action on the wrong word.
 */
export const clock = filmClock(timing);
export const useNow = (): number => clock.useSince("1.ask");

/** Moments that more than one exhibit acts on. */
export const SHARED = {
  /** Your village: the planks drop out of the new bridge. */
  planks: clock.at("2.loud", "job") + 0.12,
  /** The camera is over the other village: at home, the square is tidied for the last scene. */
  tidied: clock.at("3.hates") + 1.6,
  /** The other village: the judge is taken from his desk, and his hammer is left lying on it. */
  judgeTaken: clock.at("4.won", "first") + 0.9,
  /** ...until the man picks it up. */
  hammerTaken: clock.at("4.won", "first") + 2.8,
};

// ----------------------------------------------------------------------------- places

/**
 * THE ISLANDS. An island's `position` is the middle of its top, so people and things stand at that height.
 *
 *   home   YOUR VILLAGE. Grass, planks, a red roof. The leader is picked here, told no here, and voted out here.
 *   grey   THE OTHER VILLAGE: the same square, the same bench, the same vote box, in grey stone under one man's
 *          banners. It lies beside `home` at the same height, with open sky between them: the two are the same
 *          kind of place, and nothing joins them.
 *   rome   ANCIENT ROME, where the word comes from. Far BELOW `grey` and in front of it: as in the reference
 *          film, down is earlier. The camera falls two thousand years to reach it, and climbs back.
 *
 * Every stop looks north, and a tall frame is a slit: `home` and `grey` are side by side, so neither is ever in
 * the other's picture, and `rome` is under the lens when the lens is over `grey`.
 */
export const PLACE = {
  home: [0, 0, 0] as Vec3,
  grey: [22, 0, 0] as Vec3,
  rome: [23, -18, 12.5] as Vec3,
};
/** Width (x) and depth (z) of each island's top. */
export const SIZE = {
  home: [15, 10] as [number, number],
  grey: [20, 10] as [number, number],
  rome: [15, 9] as [number, number],
};
/** A point on an island, given from the middle of its top. */
export const on = (island: Vec3, x: number, y: number, z: number): Vec3 => [island[0] + x, island[1] + y, island[2] + z];

/**
 * THE SQUARE of a village, the same in both: the vote box in the middle, a pile of counted votes on each side of
 * it, the two people being voted on outside the piles, and behind and above it all the judge's bench. Every
 * number is given from the ground under the vote box. `A` is the one on the left, `B` the one on the right.
 */
export const square = (origin: Vec3) => {
  const p = (x: number, y: number, z: number): Vec3 => [origin[0] + x, origin[1] + y, origin[2] + z];
  return {
    /** A point of the square, from the ground under the vote box. */
    p,
    /** The ground under the vote box. */
    box: p(0, 0, 0),
    /** The slot of the box: where a vote goes in. */
    slot: p(0, 1.0, 0),
    /** The ground under each pile. */
    pileA: p(-0.92, 0, 0.15),
    pileB: p(0.92, 0, 0.15),
    /** Where the two stand who are being voted on. A tall frame is narrow: they are as close to the box as the piles allow. */
    spotA: p(-1.6, 0, -0.2),
    spotB: p(1.6, 0, -0.2),
    /** Behind the desk, on the platform: whoever stands here is over everyone in the square. */
    judge: p(0, 1.0, -2.75),
    /** Where a NO said from the bench hangs: over the desk. */
    over: p(0.05, 3.72, -1.75),
    /** The way up to the bench: the foot of the steps, the three steps, the top. */
    stairs: [p(-1.45, 0, -0.42), p(-1.45, 0.333, -0.72), p(-1.45, 0.667, -1.07), p(-1.45, 1.0, -1.42), p(-1.45, 1.0, -1.9)] as Vec3[],
    /** The door in the wall behind the bench, at the level of the platform (the other village has one; yours has a wall). */
    door: p(-1.25, 1.0, -3.4),
  };
};
export const HOME = square(on(PLACE.home, -2.5, 0, 0.9));
export const GREY = square(on(PLACE.grey, 2.6, 0, 0.9));

/**
 * YOUR VILLAGE, west of the square, in the order the leader walks it: the baker with his loaf, a neighbour, you,
 * and the new bridge off the edge of the island. The west edge is close on purpose: the leader has one second to
 * get from the judge's NO to his bridge.
 */
export const BAKER = HOME.p(-2.95, 0, -0.35);
export const NEIGHBOUR = HOME.p(-4.3, 0, -1.25);
/** The bridge runs west from the edge of the island, at this depth; the hole in it is between `HOLE[0]` and `HOLE[1]`. */
export const BRIDGE_Z = -0.5;
export const EDGE_X = -5.0;
export const HOLE: [number, number] = [-5.25, -6.08];
/** Where you stand at the bridge: on its first plank. And where the leader comes to a stop, in the middle of everybody. */
export const BRIDGE_YOU = HOME.p(-4.75, 0, -0.3);
export const BRIDGE_LEADER = HOME.p(-3.85, 0, -0.5);
/** The two who vote from the east side of the square, out of every frame; and where they have gone by the end, out of the way of the flight home. */
export const EAST_VOTERS: Vec3[] = [HOME.p(3.2, 0, 1.2), HOME.p(3.8, 0, 1.9)];
export const EAST_LATER: Vec3[] = [HOME.p(5.1, 0, -0.7), HOME.p(5.9, 0, 0.1)];

/**
 * THE OTHER VILLAGE, west of its square: one long stone hall along the back, with a gate through it, a balcony over
 * the gate, and at the far west end a statue. `GATE_X` is the middle of the gate, from the vote box.
 */
export const GATE_X = -4.6;
/** The floor of the balcony, and the middle of the stone front the word is cut into. */
export const BALCONY_FLOOR = 4.3;
export const BALCONY = GREY.p(GATE_X, BALCONY_FLOOR, -2.75);
export const FASCIA = GREY.p(GATE_X, 4.375, -2.13);
/** The statue: the ground under it, and how many times a villager's size it is. */
export const STATUE = GREY.p(-10.6, 0, -1.2);
export const STATUE_BASE = 2.2;
export const STATUE_SCALE = 2.45;
/** Where you stand at the start: on the block the stone man stands on, in front of his feet. */
export const STATUE_YOU: Vec3 = [STATUE[0] + 0.5, STATUE[1] + STATUE_BASE, STATUE[2] + 0.62];

/**
 * ROME: a temple front. `ROME` is the ground at the middle of the foot of the columns; the floor the men stand on
 * is `FLOOR` above it, at the top of six steps.
 */
export const ROME = on(PLACE.rome, 0, 0, 0.6);
export const FLOOR = 1.8;
export const rome = (x: number, y: number, z: number): Vec3 => [ROME[0] + x, ROME[1] + y, ROME[2] + z];
/** The stand the cloak hangs on when nobody has the job, and the two men who wear it. */
export const STAND = rome(0, FLOOR, -1.45);
export const FIRST = rome(-0.8, FLOOR, -0.6);
export const CAESAR = rome(0.85, FLOOR, -0.6);
/** The two bowls that are lit when Rome is in danger: on the first step down, either side of the men. */
export const BOWLS: Vec3[] = [rome(-1.4, 1.5, 0.62), rome(1.4, 1.5, 0.62)];
/** The hooks of the six moons, under the beam; a seventh and more go on to the right at the same step. */
export const MOON_STEP = 0.6;
export const moonHook = (i: number): Vec3 => rome(-1.5 + i * MOON_STEP, 4.79, -1.42);

// ----------------------------------------------------------------------------- the route

/**
 * THE ROUTE: every place the camera comes to rest, in order. `stop(lookAt, metres, yaw°, pitch°, fov°)`.
 * Yaw 0 stands on the +z side of the thing (its front); 90 on its +x side. Pitch 15 looks down a little.
 * Two lines about one thing are two stops (`near`): the camera has to keep moving.
 *
 * The captions sit at 72% of the frame's height, so every stop looks a little ABOVE the middle of its thing:
 * the thing lands in the upper two thirds, and the caption lies on ground, a step or a wall.
 */
const youAt = (p: Vec3, up: number): Vec3 => [p[0], p[1] + up, p[2]];
export const STOPS = {
  /** Where the film opens: the whole stone man, and you at his feet. */
  open: stop([STATUE[0] + 0.1, STATUE[1] + 4.0, STATUE[2]], 11.6, 22, -2, 46),
  /** You, from a little below: the question over your head, and the stone man going up out of the frame behind you. */
  you: stop(youAt(STATUE_YOU, 0.95), 4.4, 9, -10, 42),

  /** The square at home, whole: the box, the two piles, the two who are voted on, the bench behind. */
  vote: stop(HOME.p(0.25, 1.15, -0.3), 11.0, 6, 9, 44),
  /** From the west side, so that the judge at his high desk is OVER the leader in the frame, and the baker is beside him. */
  judge: stop(HOME.p(-1.6, 1.5, -0.9), 9.2, -20, 7, 42),
  /** The new bridge from the side: its hole against the sky, and the leader with everybody round him. */
  loud: stop(HOME.p(-4.2, 1.05, -0.4), 9.9, 4, 5, 44),
  /** The square again, from the other side. */
  again: stop(HOME.p(0.3, 1.2, -0.3), 10.6, -7, 8, 44),

  /** The other village: one man on a balcony, and the people under it. */
  hates: stop(GREY.p(GATE_X, 3.45, -2.8), 10.6, 4, 2, 40),
  /** The gate under the balcony. */
  army: stop(GREY.p(GATE_X, 1.5, -2.2), 7.4, -5, 7, 42),
  /** His square: the same box, the same piles, framed the same way as yours. */
  won: stop(GREY.p(0.25, 1.15, -0.3), 11.0, 7, 9, 44),
  /** The bench, close: the judge, and who comes for him. */
  bench: stop(GREY.p(-0.25, 2.3, -2.3), 6.8, -10, 3, 40),
  /** The one who said no. */
  jail: stop(GREY.p(1.5, 1.55, -0.3), 7.6, 13, 6, 40),
  /** The box and the one pile left, all the way up. */
  fixed: stop(GREY.p(-0.3, 1.3, -0.2), 9.6, -6, 5, 42),
  /** Back and up: the gate, the balcony, the man on it, and the word under him. */
  name: stop(GREY.p(GATE_X, 4.3, -2.6), 12.5, 6, -3, 42),

  /** Two thousand years down: the temple, whole. */
  word: stop(rome(0, 3.75, -0.4), 13.2, 5, 4, 42),
  /** The two men on the temple floor, the cloak between them, and the fires either side. */
  rome: stop(rome(-0.12, 3.1, -0.4), 10.2, -3, 3, 42),
  /** One man in the cloak, and all six moons over him. */
  six: stop(rome(0, 3.35, -0.7), 9.6, 6, 2, 40),
  /** The other man, from his right, so that the row of moons runs away from the lens and off the frame. */
  caesar: stop(rome(1.5, 3.3, -0.8), 8.4, -24, 2, 40),

  /** All the way back up: the man on the balcony, in the cloak, and the word under him. */
  now: stop(GREY.p(GATE_X, 4.9, -2.6), 7.6, -12, 2, 40),
  /** The same, from the other side: what happens to a NO on its way up to him. */
  answer: stop(GREY.p(GATE_X, 4.75, -2.5), 7.2, 11, 3, 40),

  /** Home: you at the vote box. */
  home: stop(HOME.p(-0.25, 1.05, -0.1), 6.4, 12, 8, 40),
  /** Round to your other side: the sign over your head and the NO beside it, stacked in a tall frame. */
  sub: stop(HOME.p(-0.21, 1.72, -0.3), 6.1, -8, 3, 40),
};
void near;

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

/** The shirt "you" wear: one loud blue that nobody else in the film has. The same kid as in the bread film. */
export const SHIRT = "#2f7de0";

/**
 * YOU: the one person the explanation happens to. A kid (`KID` is his scale), in the loud blue shirt.
 * Faces: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face ON the word.
 */
export const You: React.FC<A> = (p) => <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: SHIRT, arms: SHIRT, legs: "#2b2f45" }} blink {...p} />;

/** Who wears what. Your village is bright; the other one has had the colour taken out of it, except for one woman. */
export const ROBES = {
  /** The leader your village picks first, and the one it picks next. */
  leaderA: "#4f9a3a",
  leaderB: "#d9822b",
  judge: "#26262c",
  baker: "#e2dccb",
  voters: ["#8a6a3a", "#3a8f8a", "#c96a8a", "#6b4a34"],
  bridge: ["#b8a13a", "#2f7a6a", "#d9cdb4"],
  /** The man: the dark of his own banners. */
  man: "#3b3050",
  /** The one who runs against him, and says no. The only bright robe in the grey village. */
  her: "#2fa39a",
  soldier: "#4b4f58",
  crowd: ["#77737a", "#6a6a70", "#857f7a", "#5f5f66", "#8a8580"],
  toga: "#efe9dc",
};

// ----------------------------------------------------------------------------- moving things

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const gap = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** An angle between two headings, the short way round. `k` 0 is `a`, 1 is `b`. */
export const mixAngle = (a: number, b: number, k: number): number => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * clamp01(k);
};

/**
 * A WALK along a list of points, starting at `t0` at `speed` metres a second, easing out of the first step and into
 * the last. Gives where the walker is, which way he is heading, how far he has walked (for the waddle), and when
 * he gets there. Before `t0` he is on the first point; afterwards on the last.
 */
export const walk = (points: Vec3[], t: number, t0: number, speed: number) => {
  const lengths: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const l = gap(points[i - 1], points[i]);
    lengths.push(l);
    total += l;
  }
  const dur = total / speed;
  const k = clamp01((t - t0) / dur);
  // Half way between a steady pace and a smooth start and stop: a waddle does not glide.
  const eased = k + (k * k * (3 - 2 * k) - k) * 0.5;
  let d = eased * total;
  const walked = d;
  let i = 0;
  while (i < lengths.length - 1 && d > lengths[i]) {
    d -= lengths[i];
    i++;
  }
  const a = points[i];
  const b = points[i + 1];
  const f = lengths[i] > 0 ? clamp01(d / lengths[i]) : 0;
  const p: Vec3 = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  return { p, rot: Math.atan2(b[0] - a[0], b[2] - a[2]), walked, going: k > 0 && k < 1, done: k >= 1, end: t0 + dur };
};

/** A thing thrown at `t0`: where it is, `dur` seconds on its way from `a` to `b`, `rise` metres over the straight line. `null` before and after. */
export const thrown = (t: number, t0: number, dur: number, a: Vec3, b: Vec3, rise = 0.6): Vec3 | null => {
  const k = (t - t0) / dur;
  if (k < 0 || k > 1) return null;
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k + Math.sin(k * Math.PI) * rise, a[2] + (b[2] - a[2]) * k];
};

/** A thing dropped from a height: metres above where it comes to rest, `t` seconds after it was let go. One small bounce. */
export const dropped = (t: number, from = 0.7, fall = 0.2): number => {
  if (t <= 0) return from;
  if (t < fall) return from * (1 - (t / fall) ** 2);
  if (t < fall + 0.16) return 0.07 * Math.sin(((t - fall) / 0.16) * Math.PI);
  return 0;
};

/** One small jump, `x` seconds after it starts: metres off the ground. */
export const hop = (x: number, high = 0.1, dur = 0.28): number => (x > 0 && x < dur ? Math.sin((x / dur) * Math.PI) * high : 0);

/** Seconds a vote is in the air between a hand and the slot. */
export const FLY = 0.3;

/** One vote thrown: when, by which thrower, and whose pile it is counted on. */
export type Throw = { at: number; by: number; to: "A" | "B" };
/** `count` votes, `every` seconds apart from `t0`, thrown in turn by `throwers` people, counted as `to` spells out (for example "ABAAB"). */
export const votes = (t0: number, every: number, to: string, throwers: number): Throw[] => [...to].map((who, i) => ({ at: t0 + i * every, by: i % throwers, to: who === "A" ? "A" : "B" }));
/** The moments at which the votes for one side are counted: what a `VotePile` draws. */
export const counted = (list: Throw[], side: "A" | "B"): number[] => list.filter((v) => v.to === side).map((v) => v.at + FLY);
