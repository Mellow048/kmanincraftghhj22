import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { filmClock, near, stop } from "../../../Topics/Explainer";
import timingJson from "./timing.json";

/**
 * This film's own route, places and people.
 *
 * Everything another explainer could use is in the topic's pack, Topics/Explainer (catalogue with pictures:
 * Topics/Explainer/PACK.md). It is passed on from here, so a scene imports only from "./kit". Build something
 * new here ONLY if the pack does not have it; if a second film could use it, put it in the pack instead.
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

export const timing = timingJson as unknown as Timing;

/**
 * The film's clock. Everything an explainer shows lives in the world for the whole film, so it asks
 * "how long ago was this word said?":
 *
 *   const t = clock.useSince("2.loaf", "costs");     // negative until "costs" is said, then seconds since
 *   <PriceTag text="1" scale={pop(t, 0)} … />
 */
export const clock = filmClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * The islands, in the order the film visits them. Each holds ONE idea. `position` of an island is the middle
 * of its top, so people and things stand at that height. world.tsx builds the islands from these and the
 * exhibits stand on them: change a number here, never in two places.
 */
export const PLACE = {
  /** The question: one person, one thing, one price. */
  ask: [0, 0, 0] as Vec3,
  /** The cause. A block higher, so the flight to it climbs. */
  cause: [17, 1, -4] as Vec3,
};
/** A point on an island, given from the middle of its top. */
export const on = (island: Vec3, x: number, y: number, z: number): Vec3 => [island[0] + x, island[1] + y, island[2] + z];

// ----------------------------------------------------------------------------- the route

/** Where Sam stands, and where the loaf is. Stops look at these. */
export const SAM = on(PLACE.ask, -1.1, 0, 0.5);
export const LOAF = on(PLACE.ask, 1.2, 1.0, 0.3);
export const MINT = on(PLACE.cause, -1.2, 0, -0.4);

/**
 * THE ROUTE: every place the camera comes to rest, in order. `stop(lookAt, metres, yaw°, pitch°, fov°)`.
 * Yaw 0 stands on the +z side of the thing (its front); 90 on its +x side. Pitch 15 looks down a little.
 * Two lines about one thing are two stops (`near`): the camera has to keep moving.
 */
export const STOPS = {
  /** Where the film opens: the whole island, small in the sky. */
  open: stop(on(PLACE.ask, 0, 1.2, 0), 11.5, 14, 18, 46),
  /** Sam, head to knee, a little from below. A grown-up is 1.8 m: stand 4 m off. */
  sam: stop([SAM[0], SAM[1] + 1.25, SAM[2]], 4.2, 20, 3, 40),
  /** The loaf on its plinth, and room OVER it for its price: in a tall frame a number hangs above its thing. */
  loaf: stop([LOAF[0], LOAF[1] + 0.7, LOAF[2]], 3.6, -14, 10, 40),
  /** The second island: the machine. */
  mint: stop([MINT[0], MINT[1] + 1.0, MINT[2]], 5.2, -24, 14, 42),
};
// Two lines about one thing are two stops. Make the second from the first:
//   tag: near(STOPS.loaf, { closer: 1.3, turn: 25, on: [LOAF[0] + 0.1, LOAF[1] + 1.0, LOAF[2]] })
void near;

// ----------------------------------------------------------------------------- the people

type A = Partial<MinecraftAvatarProps>;

/**
 * SAM: the one person an explainer follows. Whatever is being explained happens to Sam, so the viewer has
 * somebody to be. One loud colour nobody else in the film wears.
 * Faces: smile grin laugh frown uneasy brave fear wow ouch calm. Change the face ON the word.
 */
export const Sam: React.FC<A> = (p) => (
  <MinecraftAvatar outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#2f7de0", arms: "#2f7de0", legs: "#2b2f45" }} blink {...p} />
);
