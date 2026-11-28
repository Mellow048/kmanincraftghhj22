import {
  BadgePop,
  CherryCabinMap,
  Clock3AM,
  FloatingHeart,
  HouseLivingRoomMap,
  ServerCrowd,
  ServerPlayer,
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
  Clock3AM,
  FloatingHeart,
  HouseLivingRoomMap,
  ServerCrowd,
  ServerPlayer,
  Sign,
  Vox,
  cam,
  ease,
  moveBetween,
  ramp,
  storyScene,
};

export { PhantomMob, DiamondSword, MinecraftBed, FiftyBedsHall } from "./parts";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Cherry Blossom SMP Cabin where Big Brother guards Little Brother from Phantoms all night. */
  cabin: [0, 0, 0] as Vec3,
  /** Warm IRL House Living Room showing the little brother afraid of the dark. */
  irl: [72, 0, 0] as Vec3,
  /** Grand 50-Bed Server Sleep Hall built by the whole SMP community. */
  hall: [0, 0, 72] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];
