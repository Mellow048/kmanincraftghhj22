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
import { Bandage } from "./parts";
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
  Creeper,
  Hut,
  Room,
  Stall,
  SubscribeSign,
  PlainsVillageMap,
  ShopStand,
} from "../../../Topics/InThisTown";

export {
  TotemOfUndying,
  TotemBurst,
  WaterBucket,
  WaterSplashPool,
  GlassJarWing,
  Bandage,
  PigProp,
  ClockTower,
  LavaFountain,
  MuddyPigPen,
} from "./parts";

export { cam, storyScene, moveBetween, ChatToast, FloatingNumber, Block, Vox, Water, Sign };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Sunlit Plains Village with Clocktower, School ledge & Lava Fountain. */
  village: [0, 0, 0] as Vec3,
  /** Warm interior home room with wooden stairs & glass jar shelf. */
  home: [0, 0, 72] as Vec3,
  /** Mr. Vex's shiny Totem Shop & back shed puddle. */
  shop: [72, 0, 0] as Vec3,
  /** 40-block Canyon Cliff & Muddy Pig Pen. */
  canyon: [0, 0, -84] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Leo — narrator kid in bright teal hoodie & dark denim, always carrying his iron Water Bucket. */
export const Leo: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#e2ae86"
    hair="#362214"
    colors={{ torso: "#2296b8", arms: "#2296b8", legs: "#2c3d6e" }}
    blink
    shadow
    {...p}
  />
);

/** Leo's Dad — warm brown jacket, kind face, white bandage on left forearm (zero Totem). */
export const Dad: React.FC<A> = ({ torso, ...p }) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="hoodie"
    skin="#d9a37b"
    hair="#4a382b"
    colors={{ torso: "#6e4b30", arms: "#6e4b30", legs: "#353f52" }}
    blink
    shadow
    torso={
      <>
        <Bandage position={[-0.38, -0.05, 0.04]} />
        {torso}
      </>
    }
    {...p}
  />
);

/** Mr. Vex — greedy Totem merchant in royal purple coat with gold trim & top hat. */
export const MrVex: React.FC<A> = ({ head, ...p }) => (
  <MinecraftAvatar
    scale={1.04}
    outfit="suit"
    skin="#e0b592"
    hair="#222228"
    colors={{ torso: "#5b247a", arms: "#5b247a", legs: "#251c33" }}
    blink
    shadow
    head={
      <>
        <Block position={[0, 0.3, 0]} size={[0.68, 0.07, 0.68]} color="#1c1824" />
        <Block position={[0, 0.48, 0]} size={[0.48, 0.3, 0.48]} color="#261f33" />
        <Block position={[0, 0.36, 0]} size={[0.5, 0.06, 0.5]} color="#f2c438" />
        {head}
      </>
    }
    {...p}
  />
);
