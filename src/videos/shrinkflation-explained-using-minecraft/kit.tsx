import {
  Balance,
  CitizenLead,
  CompareChestPair,
  EliteLead,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  KitchenCounterSet,
  PlainsVillageMap,
  ShopStand,
  StoneBillboard,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  wordClock,
} from "../../../Topics/Explainer";
import { Block, Sign, Vox, moveBetween } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import timingJson from "./timing.json";

export {
  Balance,
  Block,
  CitizenLead,
  CompareChestPair,
  EliteLead,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  KitchenCounterSet,
  PlainsVillageMap,
  ShopStand,
  Sign,
  StoneBillboard,
  Vox,
  cam,
  ease,
  moveBetween,
  pop,
  ramp,
  storyScene,
};

export { MinecraftCake, ShinyCakeBox, GroceryShelf } from "./parts";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Sterling's Bakery counter + towering emerald vault (Frame-0 & Loop zone). */
  bakery: [0, 0, 0] as Vec3,
  /** Secret back bakery workshop where Sterling slices cakes down 7->5->3->1. */
  workshop: [64, 0, 0] as Vec3,
  /** Market square + farm + Balance scale + real-world grocery aisle. */
  market: [0, 0, 64] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/** Exact Frame-0 & Final-Frame camera for seamless infinite loop. */
export const LOOP_CAM = cam.sweep({
  on: at(PLACE.bakery, 0, 1.35, -0.8),
  dist: 5.0,
  fromYaw: -14,
  toYaw: 14,
  pitch: 10,
  fov: 42,
});
