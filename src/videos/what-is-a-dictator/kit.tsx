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
  Bread, BreadShelf, Crate,
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
    pileA: p(-0.98, 0, 0.05),
    pileB: p(0.98, 0, 0.05),
    /** Where the two stand who are being voted on. */
    spotA: p(-1.8, 0, -0.05),
    spotB: p(1.8, 0, -0.05),
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
export const HOME = square(on(PLACE.home, -1.3, 0, 0.9));
export const GREY = square(on(PLACE.grey, 2.6, 0, 0.9));

/** YOUR VILLAGE, west of the square: the baker's shelf, and the new bridge off the edge of the island. */
export const SHELF = HOME.p(-2.75, 0, -1.2);
/** The loaf the leader takes: where it lies on the shelf (the middle of its underside). */
export const SHELF_LOAF = HOME.p(-2.75 + 0.35, 0.59, -1.2);
export const BAKER = HOME.p(-3.6, 0, -0.75);
/** The bridge runs west from the edge of the island, at this depth; the hole in it is between `HOLE[0]` and `HOLE[1]`. */
export const BRIDGE_Z = -0.5;
export const EDGE_X = -6.2;
export const HOLE: [number, number] = [-7.0, -8.25];
/** Where you stand at the bridge, the three villagers behind you, and where the leader comes to a stop. */
export const BRIDGE_YOU = HOME.p(-5.55, 0, -0.35);
export const BRIDGE_FOLK: Vec3[] = [HOME.p(-4.85, 0, -1.0), HOME.p(-4.7, 0, 0.35), HOME.p(-4.05, 0, -0.3)];
export const BRIDGE_LEADER = HOME.p(-3.45, 0, 0.8);

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
/** Where you stand at the start: on the second step of the statue's base, at its front right corner. */
export const STATUE_YOU: Vec3 = [STATUE[0] + 1.02, STATUE[1] + 1.0, STATUE[2] + 1.16];

/**
 * ROME: a temple front. `ROME` is the ground at the middle of the foot of the columns; the floor the men stand on
 * is `FLOOR` above it, at the top of six steps.
 */
export const ROME = on(PLACE.rome, 0, 0, 0.6);
export const FLOOR = 1.8;
export const rome = (x: number, y: number, z: number): Vec3 => [ROME[0] + x, ROME[1] + y, ROME[2] + z];
/** The stand the cloak hangs on when nobody has the job; the two men who wear it; the three who give it. */
export const STAND = rome(0, FLOOR, -1.45);
export const FIRST = rome(-0.8, FLOOR, -0.6);
export const CAESAR = rome(0.85, FLOOR, -0.6);
export const SENATORS: Vec3[] = [rome(-2.4, FLOOR, -0.9), rome(2.4, FLOOR, -0.95), rome(-2.55, 1.2, 1.07)];
/** The two bowls that are lit when Rome is in danger: on the second step down, either side of the men. */
export const BOWLS: Vec3[] = [rome(-1.5, 1.2, 1.07), rome(1.5, 1.2, 1.07)];
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
  /** Where the film opens: the whole statue, and you on its base. */
  open: stop([STATUE[0] + 0.35, STATUE[1] + 4.2, STATUE[2]], 10.8, 12, -2, 46),
  /** You: head to knee, the question over your head, and the stone man going up out of the frame behind you. */
  you: stop(youAt(STATUE_YOU, 1.5), 4.5, 17, -12, 42),

  /** The square at home, whole: the box, the two piles, the two who are voted on, the bench behind. */
  vote: stop(HOME.p(0, 1.05, -0.3), 10.2, 6, 9, 42),
  /** The leader with a loaf that is not his, and the judge over him. */
  judge: stop(HOME.p(-1.0, 1.25, -0.8), 9.4, -8, 8, 42),
  /** The new bridge from the side: its hole against the sky, and everybody at the end of it. */
  loud: stop(HOME.p(-6.7, 1.2, -0.4), 10.6, 3, 6, 42),
  /** The box again, from the other side and nearer. */
  again: stop(HOME.p(-0.3, 1.1, -0.3), 9.2, -8, 8, 42),

  /** The other village: one man on a balcony, and the people under it. */
  hates: stop(GREY.p(GATE_X, 3.45, -2.8), 10.6, 4, 2, 40),
  /** The gate under the balcony. */
  army: stop(GREY.p(GATE_X, 1.5, -2.2), 7.4, -5, 7, 42),
  /** His square: the same box, the same piles, framed the same way as yours. */
  won: stop(GREY.p(0, 1.05, -0.3), 9.9, 8, 9, 42),
  /** The bench, close: the judge, and who comes for him. */
  bench: stop(GREY.p(-0.25, 2.3, -2.3), 6.8, -10, 3, 40),
  /** The one who said no. */
  jail: stop(GREY.p(1.72, 1.55, -0.3), 7.6, 13, 6, 40),
  /** The box and the one pile left, all the way up. */
  fixed: stop(GREY.p(-0.3, 1.3, -0.2), 9.6, -6, 5, 42),
  /** Back and up: the gate, the balcony, the man on it, and the word under him. */
  name: stop(GREY.p(GATE_X, 4.3, -2.6), 12.5, 6, -3, 42),

  /** Two thousand years down: the temple, whole. */
  word: stop(rome(0, 3.75, -0.4), 13.2, 5, 4, 42),
  /** The men on the temple floor, and the fires either side of them. */
  rome: stop(rome(0, 3.2, -0.6), 10.4, -9, 3, 42),
  /** One man in the cloak, and the six moons over him. */
  six: stop(rome(0, 3.35, -0.7), 9.0, 7, 2, 40),
  /** The other man, and a row of moons that does not end. */
  caesar: stop(rome(0.9, 3.35, -0.7), 8.6, -9, 2, 40),

  /** All the way back up: the man on the balcony, in the cloak, and the word under him. */
  now: stop(GREY.p(GATE_X, 4.9, -2.6), 7.6, -12, 2, 40),
  /** The same, from the other side: what happens to a NO on its way up to him. */
  answer: stop(GREY.p(GATE_X, 4.75, -2.5), 7.2, 11, 3, 40),

  /** Home: you at the vote box. */
  home: stop(HOME.p(-0.45, 0.9, 0.25), 6.8, 10, 6, 40),
  /** You, the sign over your head, and the NO over that. */
  sub: stop(HOME.p(-0.8, 1.95, 1.0), 6.0, -9, 3, 40),
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
