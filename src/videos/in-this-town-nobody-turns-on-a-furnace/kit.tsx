import type React from "react";
import { ChatToast, EmberDrift, FloatingNumber, MinecraftAvatar, cam, storyScene } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, hill, jolt, pop, ramp,
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  Player, Pumpkin,
  BedBox, Bits, Blaze, Bubble, FireLight, Hole, Smoke, SmokeBank, SubscribeSign, Wisps,
  Fence, Hut, LampPost, Room, Stall,
} from "../../../Topics/InThisTown";

export { SnowGolem, SnowTrail, Furnace, Snowball, BerryPlate } from "./parts";
export { cam, storyScene, ChatToast, FloatingNumber, EmberDrift };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  home: [10, 0, -5] as Vec3,
  /** Indoor kitchen/bedroom (cold house, zero torches or furnaces). */
  room: [0, 0, 80] as Vec3,
  /** Wooden village bakery where the summer furnace fire breaks out. */
  bakery: [-12, 0, 38] as Vec3,
};

export const room = (x: number, y: number, z: number): Vec3 => [PLACE.room[0] + x, PLACE.room[1] + y, PLACE.room[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** The kid teller — bright golden-orange hoodie so he pops against white snow & fire. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#dba47c"
    hair="#3a2415"
    hairLayer
    colors={{ torso: "#e8921c", arms: "#e8921c", legs: "#3b4fa0" }}
    blink
    {...p}
  />
);
