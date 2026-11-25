import type React from "react";
import { Block, ChatToast, EmberDrift, FloatingNumber, MinecraftAvatar, Vox, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Pumpkin,
  BedBox, Bell, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Well, Wisps,
  Fence, Hut, LampPost, Room, Stall,
} from "../../../Topics/InThisTown";

export { SnowGolem, SnowTrail, Furnace, Snowball, BerryPlate } from "./parts";
export { cam, storyScene, ChatToast, FloatingNumber, EmberDrift, Block, Vox };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [5.4, 0, -2.8] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  home: [10, 0, -5] as Vec3,
  /** Indoor kitchen/bedroom (Room zone centered at z=80; north wall at z=77.5). */
  room: [0, 0, 80] as Vec3,
  /** Wooden village bakery where the summer furnace fire breaks out. */
  bakery: [-12, 0, 38] as Vec3,
};

/** Helper for placing props inside the interior `Room` (x in -2.5..2.5, z in -2.4..+3.5). */
export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

type A = Partial<MinecraftAvatarProps>;

/**
 * Classic InThisTown kid protagonist — orange hoodie & denim pants so he reads sharply
 * against white snow, wooden interiors, and blazing embers without ceiling-cap glare.
 */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#dba47c"
    hair="#3a2415"
    colors={{ torso: "#e8921c", arms: "#e8921c", legs: "#3b4fa0" }}
    blink
    {...p}
  />
);
