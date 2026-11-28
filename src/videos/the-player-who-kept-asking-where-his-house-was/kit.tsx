import {
  BadgePop,
  CherryCabinMap,
  ChestGridUI,
  ComputerRoomMap,
  FloatingHeart,
  OpenBookPage,
  OpeningChest,
  ServerCrowd,
  ServerPlayer,
  SpawnHubMap,
  TearDrops,
  cam,
  ease,
  ramp,
  storyScene,
  wordClock,
} from "../../../Topics/ServerLore";
import { Block, Sign, Vox, moveBetween } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

export {
  BadgePop,
  Block,
  CherryCabinMap,
  ChestGridUI,
  ComputerRoomMap,
  FloatingHeart,
  OpenBookPage,
  OpeningChest,
  ServerCrowd,
  ServerPlayer,
  Sign,
  SpawnHubMap,
  TearDrops,
  Vox,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
};

export {
  BlueRoofCottage,
  LodestoneBlock,
  EnchantedCompass,
  BlueLanternRoad,
  TrailSign,
} from "./parts";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** SMP Spawn Hub + Arthur's Blue-Roof Cottage lane. */
  smp: [0, 0, 0] as Vec3,
  /** Warm lamp-lit IRL Computer Room where 72-year-old Arthur plays with sticky note on monitor. */
  irl: [72, 0, 0] as Vec3,
  /** Cozy cottage interior where Owner discovers Arthur's book in the chest. */
  cabin: [0, 0, 72] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];
