import type React from "react";
import { Block, Glow, MinecraftAvatar, PixelText, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { Coin, KID, PriceTag, Stall, ease, filmClock, near, ramp, stop } from "../../../Topics/Explainer";
import { Loaf, Oven } from "./parts";
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
  // money
  Bill, BillStack, Chest, Coin, CoinPile, CoinStack, MoneyBag, Printer,
  // numbers you can stand next to
  Arrow, Balance, Bar, BarChart, PriceTag,
  // things money buys
  Apple, Bread, BreadShelf, Crate,
  // shared with the other topics: cubes that spell, people, a village, the last picture
  Bits, Bubble, Figure, Hut, Icon, LampPost, Player, Puffs, ROBE, Stall, SubscribeSign, Villager, Voxels,
  // staging: how a thing pops in, where "in front of him" is
  ADULT, CHILD, DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp, villagerChest, villagerFace,
} from "../../../Topics/Explainer";
export { Balloon, Loaf, NoteBundle, NoteFall, NoteHeap, Oven, PriceRoll, Wheelbarrow } from "./parts";

export const timing = timingJson as unknown as Timing;

/**
 * The film's clock. Everything an explainer shows lives in the world for the whole film, so it asks
 * "how long ago was this word said?":
 *
 *   const t = clock.useSince("2.loaf", "costs");     // negative until "costs" is said, then seconds since
 */
export const clock = filmClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * THE ISLANDS, in the order the film visits them. Each holds ONE idea. An island's `position` is the middle of
 * its top, so people and things stand at that height.
 *
 *   now       Today: the stall, the loaf, two coins. The film starts here and comes home to it.
 *   then      The same stall when your mom was your age. It hangs BELOW and in front of `now`: the camera goes
 *             DOWN into the past, and the price has gone UP since. Higher is later, and dearer.
 *   village   A thought experiment: ten loaves, ten coins. Low and off to the west: a model, not a place.
 *   real      The real world: a mint and a bakery. Up and out to the west: the biggest island.
 *   old       Germany, 1923. Far below `then`, at the bottom of the same shaft: a hundred years down.
 *             The flight home from it rises past `then` to `now`: back up through time.
 *
 * Every stop looks north (the shops face south), and a tall frame is a slit: an island is only in another's
 * picture if it lies north of it. That is why the village and the real world are off to the west.
 */
export const PLACE = {
  now: [0, 0, 0] as Vec3,
  then: [0, -5, 6.2] as Vec3,
  village: [-14, -4, 0] as Vec3,
  real: [-30, 2, -5] as Vec3,
  old: [0, -16, 13.5] as Vec3,
};
/** Width (x) and depth (z) of each island's top. */
export const SIZE = {
  now: [11, 7] as [number, number],
  then: [8, 6] as [number, number],
  village: [10, 8] as [number, number],
  real: [14, 11] as [number, number],
  old: [11, 9] as [number, number],
};
/** A point on an island, given from the middle of its top. */
export const on = (island: Vec3, x: number, y: number, z: number): Vec3 => [island[0] + x, island[1] + y, island[2] + z];
const up = (p: Vec3, y: number): Vec3 => [p[0], p[1] + y, p[2]];

/**
 * A BAKER'S SHOP, the same on `now` and on `then`: where each thing of it is. The loaf lies on a step on the
 * counter; its price in coins stands on the counter in front of the step, UNDER the loaf; its tag hangs over it.
 * That is the picture of a price in this film, and the village's rack repeats it ten times.
 */
export const shop = (island: Vec3) => {
  const stall = on(island, -0.7, 0, 0);
  const step: Vec3 = [stall[0] - 0.35, stall[1] + 1.0, stall[2] - 0.1];
  const loaf = up(step, 0.2);
  return {
    /** The middle of the counter, on the ground. The counter top is 1.0 above it. */
    stall,
    /** The middle of the underside of the display step, on the counter. */
    step,
    /** The middle of the loaf's underside. `LOAF` is its scale. */
    loaf,
    /** The knot of the price tag, over the loaf. */
    tag: [loaf[0], stall[1] + 2.72, stall[2] + 0.2] as Vec3,
    /** Where coin `i` of `n` stands: on the counter, in front of the step, under the loaf. */
    coin: (i: number, n: number): Vec3 => [loaf[0] + (i - (n - 1) / 2) * 0.44, stall[1] + 1.0, stall[2] + 0.27],
    /** The floor under the oven: behind the stall, to the left of the loaf. */
    oven: [stall[0] - 1.45, stall[1], stall[2] - 1.8] as Vec3,
    /** The baker, behind the counter. */
    baker: [stall[0] + 1.12, stall[1], stall[2] - 0.95] as Vec3,
    /** The kid who has come to buy, in front of the counter. */
    kid: [stall[0] + 0.55, stall[1], stall[2] + 1.2] as Vec3,
    /** The board that hangs from the front of the canopy, over the loaf, with the shop's time on it: TODAY, THEN. */
    name: [loaf[0], stall[1] + 2.5, stall[2] + 0.82] as Vec3,
  };
};
export const NOW = shop(PLACE.now);
export const THEN = shop(PLACE.then);
/** The loaf of this film: the pack's loaf at this scale, everywhere. 0.88 m long, 0.39 high. */
export const LOAF = 1.7;
/** A price coin: this wide, standing on its edge. */
export const COIN = 0.3;

// ----------------------------------------------------------------------------- the route

/**
 * THE ROUTE: every place the camera comes to rest, in order. `stop(lookAt, metres, yaw°, pitch°, fov°)`.
 * Yaw 0 stands on the +z side of the thing (its front); 90 on its +x side. Pitch 15 looks down a little.
 * Two lines about one thing are two stops (`near`): the camera has to keep moving.
 *
 * The captions sit at 72% of the frame's height, so every stop looks a little ABOVE the middle of its thing:
 * the thing lands in the upper two thirds, and the caption lies on ground, grass or a plank.
 */
export const STOPS = {
  /** Where the film opens: the stall and the kid in front of it, with the edge of the island and the sky round them. */
  open: stop(on(PLACE.now, -0.75, 1.45, 0.4), 6.6, 14, 7, 46),
  /** You: head to knee, the question over your head. */
  you: stop(up(NOW.kid, 1.04), 3.5, 16, 2, 40),
  /** The loaf, its coins under it and its tag over it. */
  loaf: stop([NOW.loaf[0] + 0.05, NOW.stall[1] + 1.5, NOW.loaf[2]], 3.9, -9, 7, 40),
  /** The same stall, thirty years down: the loaf, its one coin, and the girl who is buying it. */
  then: stop([THEN.loaf[0] + 0.42, THEN.stall[1] + 1.42, THEN.loaf[2]], 5.0, -4, 7, 40),
  /** Both stalls in one frame, through a long lens from far back: `then` below, `now` above, nearly the same size. */
  both: stop([-0.55, -3.12, 4.0], 21.5, -3, 5.2, 30),

  /** The tiny village, whole: its huts, its baker, its one rack. */
  village: stop(on(PLACE.village, 0.2, 2.3, -0.4), 12.4, 12, 11, 46),
  /** The rack from the front: its big tag at the top of the frame, its ten places, and the ground at its foot. */
  rack: stop(on(PLACE.village, 0.2, 2.6, -0.9), 9.0, 0, 3, 42),
};
/**
 * THE REAL WORLD: a stage with the two machines on it. Both stand so that their roofs are level (`RACE_LINE`),
 * because what they make is stacked on those roofs, and the two stacks are a race.
 */
export const STAGE = on(PLACE.real, 0, 0, 1.8);
export const STAGE_TOP = 1.2;
export const MINT: Vec3 = [STAGE[0] - 0.95, STAGE[1] + STAGE_TOP + 0.63, STAGE[2] - 0.1];
export const BAKERY: Vec3 = [STAGE[0] + 0.95, STAGE[1] + STAGE_TOP, STAGE[2] - 0.2];
/** The height both stacks start from: the roof of the printer, the top of the oven. */
export const RACE_LINE = STAGE[1] + STAGE_TOP + 1.8;
/** The loaf whose price creeps up, on its plinth in front of the stage. The middle of its underside. */
export const CREEP = on(PLACE.real, 0, 1.0, 4.5);

/** GERMANY, 1923: the printer as big as a house, at the front edge of its island; and the loaf with the price nobody could pay. */
export const PRESS = on(PLACE.old, -0.4, 0, 2.2);
export const PRESS_SCALE = 3;
export const TOTEM = on(PLACE.old, 3.55, 0, 3.6);
export const TOTEM_HIGH = 2.7;

/** HOME, on `now`: your chest, the bread its coins would buy, and where you stand beside them. */
export const CHEST = on(PLACE.now, 3.75, 0, 0.45);
export const TOWER = on(PLACE.now, 4.78, 0, 0.45);
export const HOME_KID = on(PLACE.now, 2.6, 0, 0.5);

/** The stops of beats 5 to 7. */
export const LATER = {
  /** The real world, whole: the stage, the mint behind it on the left, the bakery on the right. */
  real: stop(on(PLACE.real, 0, 2.3, 1.6), 12.6, 8, 8, 46),
  /** The race: both machines, and the two stacks on their roofs. */
  race: stop([STAGE[0], STAGE[1] + 3.15, STAGE[2]], 7.9, -6, 3, 42),
  /** The loaf in front of the stage, and all the room over it that its price needs. */
  creep: stop([CREEP[0], PLACE.real[1] + 2.62, CREEP[2]], 6.3, -12, 4, 40),
  /** Germany, 1923: the press at the edge of its island, and the notes pouring off it into the clouds. */
  old: stop([PRESS[0] + 0.2, PLACE.old[1] + 1.5, PRESS[2] + 2.0], 13.5, 9, 11, 46),
  /** One loaf, and its price all the way down the plinth it stands on. */
  totem: stop([TOTEM[0] + 0.3, PLACE.old[1] + 1.2, TOTEM[2] + 0.4], 7.3, -9, 5, 40),
  /** Home again: today's loaf, from a little nearer and the other side. */
  answer: near(STOPS.loaf, { closer: 0.25, turn: 15, on: [NOW.loaf[0] + 0.02, NOW.stall[1] + 1.46, NOW.loaf[2]] }),
  /** Your chest, the bread beside it, and you. */
  chest: stop([CHEST[0] + 0.1, PLACE.now[1] + 1.22, CHEST[2]], 6.9, 5, 8, 40),
  /** You, and the sign over your head. */
  sub: stop([HOME_KID[0] - 0.12, PLACE.now[1] + 1.5, HOME_KID[2]], 3.8, -14, 3, 40),
};

/** The rack from one side or the other, a little nearer or further: one stop for each line about it. */
export const RACKS = {
  one: near(STOPS.rack, { closer: 1.4, turn: -15, raise: 2, on: on(PLACE.village, 0.2, 3.0, -0.9) }),
  more: near(STOPS.rack, { closer: 0.2, turn: 13, raise: 1, on: on(PLACE.village, 0.2, 2.5, -0.9) }),
  still: stop(on(PLACE.village, 1.32, 1.95, 0), 5.1, 17, 4, 40),
  two: near(STOPS.rack, { closer: 1.2, turn: -11, raise: 2, on: on(PLACE.village, 0.2, 2.95, -0.9) }),
  nobody: stop(on(PLACE.village, 0.2, 2.62, -0.9), 4.7, 9, 2, 40),
};

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

/** The shirt "you" wear: one loud blue that nobody else in the film has. Your mom wore it too. */
export const SHIRT = "#2f7de0";

/**
 * YOU: the one person the explanation happens to. A kid (`KID` is his scale), in the loud blue shirt.
 * Faces: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face ON the word.
 */
export const You: React.FC<A> = (p) => <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: SHIRT, arms: SHIRT, legs: "#2b2f45" }} blink {...p} />;

/** Two bunches of hair and their bows, worn on the head. */
const Bunches: React.FC<{ hair: string }> = ({ hair }) => (
  <>
    {[-1, 1].map((side) => (
      <group key={side}>
        <Block position={[side * 0.275, -0.1, -0.04]} size={[0.11, 0.36, 0.16]} color={hair} />
        <Block position={[side * 0.26, 0.09, -0.04]} size={[0.08, 0.08, 0.12]} color="#ff5aa0" />
      </group>
    ))}
  </>
);

/** YOUR MOM, WHEN SHE WAS YOUR AGE: the same shirt, thirty years earlier. Two bunches of hair, so nobody takes her for you. */
export const Mom: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#5a3218" colors={{ torso: SHIRT, arms: SHIRT, legs: "#6a4a7a" }} blink head={<Bunches hair="#5a3218" />} {...p} />
);

// ----------------------------------------------------------------------------- a shop, and the price in it

/** A thing dropped from a hand: metres above where it comes to rest, `t` seconds after it was let go. One small bounce. */
export const dropped = (t: number, from = 0.7): number => {
  if (t <= 0) return from;
  if (t < 0.2) return from * (1 - (t / 0.2) ** 2);
  if (t < 0.36) return 0.07 * Math.sin(((t - 0.2) / 0.16) * Math.PI);
  return 0;
};

/** 0 → 1 with a little too far and back: a sign swinging round, a lid thrown open. */
export const swung = (k: number): number => {
  const x = Math.min(1, Math.max(0, k));
  return 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2;
};

/** A price coin standing on its edge at `rest`, `since` seconds after it was dropped there. Hidden before. */
export const PriceCoin: React.FC<{ rest: Vec3; since: number; size?: number }> = ({ rest, since, size = COIN }) => {
  if (since < 0) return null;
  return <Coin position={[rest[0], rest[1] + size / 2 + dropped(since), rest[2]]} size={size} spin={Math.max(0, 0.2 - since) * 16} glow={0.2} />;
};

/**
 * THE SHOP ITSELF: what does not move. The stall, the step the loaf lies on, the board with the shop's time on it.
 * The same on both islands: "same bread, same oven".
 */
export const ShopSet: React.FC<{ at: ReturnType<typeof shop>; name: string }> = ({ at, name }) => (
  <>
    <Stall position={at.stall} />
    <Vox kind="planks" tint="#c9a66b" position={[at.step[0], at.step[1] + 0.1, at.step[2]]} size={[1.06, 0.2, 0.46]} />
    <Vox kind="stone" position={[at.oven[0], at.oven[1] + 0.3, at.oven[2]]} size={[1.9, 0.6, 1.5]} />
    {/* the board on the front of the canopy */}
    <Block position={at.name} size={[1.12, 0.34, 0.06]} color="#5c3f24" />
    <Block position={[at.name[0], at.name[1], at.name[2] + 0.02]} size={[1.03, 0.26, 0.05]} color="#f6ecd2" emissive="#f6ecd2" emissiveIntensity={0.2} castShadow={false} />
    <PixelText text={name} position={[at.name[0], at.name[1], at.name[2] + 0.05]} height={0.22} maxWidth={0.92} color="#3b2a16" />
  </>
);

/**
 * WHAT A SHOP SHOWS: the loaf, its price in coins under it, its tag over it, and the oven it came out of.
 * Nothing here knows the time: the exhibits give it seconds.
 */
export const ShopGoods: React.FC<{
  at: ReturnType<typeof shop>;
  /** The price on the tag. */
  price: string;
  /** Seconds since the tag began to swing round to face us. Before that its back is to us. */
  tagSince: number;
  /** Seconds since each price coin was dropped on the counter: one entry for each coin. */
  coinsSince: number[];
  /** Metres between the two halves of the loaf, at the loaf's scale 1. 0 is a whole loaf. */
  split?: number;
  /** 0–1: the loaf hops off its step and the tag rattles. For "the same bread". */
  hop?: number;
  /** 0–1: the tag swells. For "only the price moved". */
  swell?: number;
  /** 0–1 and more: how hot the oven burns. */
  fire?: number;
}> = ({ at, price, tagSince, coinsSince, split = 0, hop = 0, swell = 0, fire = 0.8 }) => {
  const turned = swung(tagSince / 0.36);
  const settle = tagSince > 0 ? Math.sin(tagSince * 11) * 0.16 * Math.exp(-tagSince * 2.2) : 0;
  return (
    <>
      <Loaf position={[at.loaf[0], at.loaf[1] + hop * 0.16, at.loaf[2]]} rotationY={hop * 0.12} scale={LOAF * (1 + hop * 0.08)} split={split} />
      {/* It swells about the middle of its card, not about its knot: a tag that grew downward would cover the loaf. */}
      <PriceTag text={price} position={[at.tag[0], at.tag[1] + swell * 0.36, at.tag[2] + swell * 0.1]} rotationY={Math.PI * (1 - turned)} scale={1.6 * (1 + swell * 0.55)} swing={settle + hop * 0.1} />
      {coinsSince.map((since, i) => (
        <PriceCoin key={i} rest={at.coin(i, coinsSince.length)} since={since} />
      ))}
      <Oven position={[at.oven[0], at.oven[1] + 0.6, at.oven[2]]} fire={fire} />
    </>
  );
};
void ease;
void ramp;

// ----------------------------------------------------------------------------- the village's rack

/**
 * THE RACK of the tiny village: ten loaves, two across and five up, on a plank cabinet. Each loaf lies on a step,
 * and its price in coins stands UNDER it, exactly as in the shop. It is tall and narrow because the frame is.
 * `RACK` is the floor under its middle; it faces +Z.
 */
export const RACK = on(PLACE.village, 0.2, 0, -0.9);
export const RACK_ROWS = 5;
const RACK_BASE = 0.92;
const RACK_ROW = 0.62;
const RACK_COL = 0.44;
/** The loaf of the rack: smaller than the shop's. 0.65 m long. */
export const RACK_LOAF = 1.25;
/** Cell `i` of ten: 0 is top left, 1 top right, 9 bottom right. The middle of the board the loaf's step stands on. */
export const rackCell = (i: number): Vec3 => [RACK[0] + (i % 2 === 0 ? -RACK_COL : RACK_COL), RACK[1] + RACK_BASE + (RACK_ROWS - 1 - Math.floor(i / 2)) * RACK_ROW, RACK[2]];
/** Where the loaf of cell `i` lies (the middle of its underside). */
export const rackLoaf = (i: number): Vec3 => { const c = rackCell(i); return [c[0], c[1] + 0.22, c[2] - 0.06]; };
/** Where coin `k` of `n` stands under the loaf of cell `i`: on the board, in front of the step. */
export const rackCoin = (i: number, k: number, n: number): Vec3 => { const c = rackCell(i); return [c[0] + (k - (n - 1) / 2) * 0.3, c[1], c[2] + 0.2]; };
/** Where coin `k` of ten waits on the ground at the foot of the rack: two rows of five. */
export const rackFoot = (k: number): Vec3 => [RACK[0] + ((k % 5) - 2) * 0.36, RACK[1], RACK[2] + 0.66 + Math.floor(k / 5) * 0.4];
/** The top of the rack: where its one big price tag hangs from. */
export const RACK_TOP: Vec3 = [RACK[0], RACK[1] + RACK_BASE + RACK_ROWS * RACK_ROW, RACK[2]];

/** The rack itself: cabinet, boards, posts, and the step under each loaf. The loaves and the coins are the exhibit's. */
export const Rack: React.FC = () => {
  const top = RACK_BASE + RACK_ROWS * RACK_ROW;
  return (
    <group position={RACK}>
      <Vox kind="planks" position={[0, RACK_BASE / 2 - 0.03, 0]} size={[1.9, RACK_BASE - 0.06, 0.62]} />
      <Vox kind="darkPlanks" position={[0, 0.06, 0.02]} size={[2.0, 0.12, 0.7]} />
      {[-1, 1].map((side) => (
        <Vox key={side} kind="darkPlanks" position={[side * 0.93, (top + 0.2) / 2, -0.04]} size={[0.1, top + 0.2, 0.56]} />
      ))}
      <Vox kind="darkPlanks" position={[0, RACK_BASE + (top - RACK_BASE) / 2, -0.27]} size={[1.86, top - RACK_BASE, 0.06]} />
      {Array.from({ length: RACK_ROWS + 1 }, (_, r) => (
        <Vox key={r} kind="planks" position={[0, RACK_BASE + r * RACK_ROW - 0.03, 0]} size={[1.9, 0.06, 0.62]} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <Vox key={`s${i}`} kind="planks" tint="#c9a66b" position={[i % 2 === 0 ? -RACK_COL : RACK_COL, RACK_BASE + (RACK_ROWS - 1 - Math.floor(i / 2)) * RACK_ROW + 0.11, -0.06]} size={[0.74, 0.22, 0.34]} />
      ))}
      {/* the beam the big tag hangs from */}
      <Vox kind="log" position={[0, top + 0.86, -0.04]} size={[0.14, 1.6, 0.14]} />
      <Vox kind="log" position={[0, top + 1.6, 0.16]} size={[0.14, 0.14, 0.54]} />
    </group>
  );
};

/** The light that comes out of an open chest: `power` 0–1. */
export const Glow7: React.FC<{ at: Vec3; power: number }> = ({ at, power }) => (power > 0.02 ? <Glow position={at} size={2.2} color="#ffd24a" opacity={0.4 * power} /> : null);
