import type { Vec3 } from "../../../src/engine";

/** One metre per unit. +Z follows the street into the school; floor y=0. */
export const TOWN = {
  road: { minX: -2.8, maxX: 2.8, minZ: -10, maxZ: 3.55 },
  schoolDoor: [0, 0, 3.55] as Vec3,
  hall: { minX: -3.1, maxX: 3.1, minZ: 3.55, maxZ: 8.65, height: 3.6 },
  classDoor: [0, 0, 8.65] as Vec3,
  classroom: { minX: -4.5, maxX: 4.5, minZ: 8.65, maxZ: 16.25, height: 3.6 },
  rankBoard: [0, 2.25, 16.07] as Vec3,
} as const;

/** Reuse these when blocking actors, lights and props. Shot from/target values stay explicit for the camera linter. */
export const MARKS = {
  egg: [-0.55, 0, -2.7] as Vec3,
  heroHome: [-1.25, 0, -3.3] as Vec3,
  heroGate: [-0.95, 0, 2.15] as Vec3,
  friendGate: [1.65, 0, 1.6] as Vec3,
  sisterGate: [-1.8, 0, 1.45] as Vec3,
  dragonGate: [1.7, 0, 2.75] as Vec3,
  phoenixGate: [-1.9, 1.65, 2.6] as Vec3,
  heroClass: [-1.8, 0, 11.3] as Vec3,
  friendClass: [1.95, 0, 11.25] as Vec3,
  sisterClass: [2.9, 0, 13.25] as Vec3,
  dragonClass: [1.85, 0, 12.7] as Vec3,
  phoenixClass: [2.45, 1.75, 13.7] as Vec3,
  wormClass: [0.25, 0, 12.45] as Vec3,
} as const;
