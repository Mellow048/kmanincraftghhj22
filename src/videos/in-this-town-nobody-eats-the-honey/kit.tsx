import type React from "react";
import {
  Block,
  ChatToast,
  FloatingNumber,
  MinecraftAvatar,
  Sign,
  Vox,
  Water,
  cam,
  moveBetween,
  storyScene,
} from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  DEG,
  EAST,
  KID,
  NORTH,
  SOUTH,
  WEST,
  ahead,
  beside,
  chestOf,
  ease,
  faceOf,
  jolt,
  pop,
  ramp,
  ADULT,
  CHILD,
  Villager,
  Player,
  Room,
  Well,
  SubscribeSign,
  PlainsVillageMap,
  ShopStand,
} from "../../../Topics/InThisTown";

export {
  BeeMob,
  HoneyJar,
  HoneyJarWall,
  BeeHiveBox,
  WoodenSpoon,
  PoppyFlower,
  FlowerRallyRows,
} from "./parts";

export { cam, storyScene, moveBetween, ChatToast, FloatingNumber, Block, Vox, Water, Sign };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Sunlit open-front Honey Hall with 400 glowing amber jars. */
  hall: [0, 0, 0] as Vec3,
  /** Sunflower village street, hives, market & stone well. */
  village: [72, 0, 0] as Vec3,
  /** Warm classroom & home windowsill. */
  school: [0, 0, 72] as Vec3,
  /** Golden sunflower & poppy community rally meadow. */
  meadow: [0, 0, -72] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Narrator kid — warm amber-orange hoodie & denim so he pops against green meadows and dark oak. */
export const Kid: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#e2ae86"
    hair="#3b2618"
    colors={{ torso: "#e67e22", arms: "#e67e22", legs: "#334d8a" }}
    blink
    shadow
    {...p}
  />
);

/** Kind Mayor — forest-green coat & straw sunhat (distinct from Mr. Vex!). */
export const Mayor: React.FC<A> = ({ head, ...p }) => (
  <MinecraftAvatar
    scale={1.02}
    outfit="suit"
    skin="#dca882"
    hair="#d4d4d8"
    colors={{ torso: "#2f6b48", arms: "#2f6b48", legs: "#2c353d" }}
    blink
    shadow
    head={
      <>
        <Block position={[0, 0.3, 0]} size={[0.74, 0.06, 0.74]} color="#d9b45b" />
        <Block position={[0, 0.44, 0]} size={[0.48, 0.22, 0.48]} color="#e6c46e" />
        <Block position={[0, 0.35, 0]} size={[0.5, 0.05, 0.5]} color="#2f6b48" />
        {head}
      </>
    }
    {...p}
  />
);

/** Dad — denim flannel shirt, calm smile. */
export const Dad: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="hoodie"
    skin="#d9a37b"
    hair="#4c3828"
    colors={{ torso: "#476a8a", arms: "#476a8a", legs: "#363c48" }}
    blink
    shadow
    {...p}
  />
);
