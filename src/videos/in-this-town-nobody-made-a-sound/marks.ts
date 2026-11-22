import type { Vec3 } from "../../engine";

/**
 * The set, as numbers. world.tsx builds the town from these, and scenes stand people on them:
 * change a number here, never in two places.
 *
 * The town is one street of wool, west–east along x. House fronts on the north side face south, at the camera.
 * 1 unit = 1 block = 1 metre. The wool is one layer thick, so every foot in the street is on `WOOL`.
 */

/** Top of the wool: the floor of the town. Same height as PLACE.wool in kit.tsx. */
export const WOOL = 0.14;

/** The wool itself: one slab over the whole street, and small rugs in front of every door. */
export const woolSlab = { at: [0, WOOL / 2, 2] as Vec3, size: [46, WOOL, 20] as [number, number, number] };

/** Houses. `turn` π puts a house on the south side, back to the usual camera. */
export const HOUSES = [
  { at: [-19, 0, -5.5] as Vec3, w: 7, roof: "#6a5a3a", door: 2.4 },
  { at: [-10, 0, -5] as Vec3, w: 7.6, h: 4.2, roof: "#7a4a32", door: 0, windows: [] }, // the school
  { at: [13, 0, -5.5] as Vec3, w: 6.4, roof: "#5a4a6a", door: -2.2 },
  { at: [-13, 0, 11] as Vec3, w: 7, roof: "#7a4a32", door: 1.8, turn: Math.PI },
  { at: [10, 0, 11] as Vec3, w: 6.6, roof: "#6a5a3a", door: -1.4, turn: Math.PI },
];

/** The school's lesson: five boards on five posts in front of it. Nobody in this town has ever read them aloud. */
export const SIGNS: Array<{ x: number; z: number; words: string; tilt: number }> = [
  { x: -13.6, z: -2.4, words: "quiet", tilt: 0.03 },
  { x: -12.2, z: -2.9, words: "shh", tilt: -0.05 },
  { x: -10.6, z: -2.5, words: "no noise", tilt: 0.02 },
  { x: -9.1, z: -2.9, words: "sit still", tilt: 0.06 },
  { x: -7.6, z: -2.4, words: "listen", tilt: -0.03 },
];

/** The bell tower: a stone box 4.4 m square, 11 m tall, a doorway in its south face, a floor inside at 3.2 m. */
export const TOWER = {
  at: [4, 0, -9] as Vec3,
  w: 4.4,
  h: 11,
  wall: 0.34,
  /** The bottom of the upper floor and its top. */
  floorY: 3.2,
  floorTop: 3.35,
  /** The doorway: 1.5 m wide, 2.6 m tall, in the south face. */
  doorW: 1.5,
  doorH: 2.6,
  /** The dark of the inside, seen through the doorway. */
  inside: [4, 0, -9.2] as Vec3,
  /** The bell beam, and the bell hanging under it. */
  beamY: 7.6,
  bell: [4, 7.05, -9.3] as Vec3,
};

/** Rows of bedrolls in the wool: at noon the whole town is in them. */
export const BEDS: Array<{ at: Vec3; wide: number }> = [
  { at: [-7.4, WOOL, 5.4], wide: 2.0 },
  { at: [-3.9, WOOL, 5.9], wide: 2.2 },
  { at: [-0.2, WOOL, 5.2], wide: 1.9 },
  { at: [3.4, WOOL, 6.1], wide: 2.1 },
  { at: [7.1, WOOL, 5.5], wide: 2.0 },
];

/** The thing below: a floor of its own, 60 m from the street so nothing of the town is near it. */
export const BELOW = {
  at: [0, 0, 60] as Vec3,
  floor: [0, -0.5, 58] as Vec3,
  floorSize: [64, 1, 44] as [number, number, number],
  ceilingY: 11,
};
