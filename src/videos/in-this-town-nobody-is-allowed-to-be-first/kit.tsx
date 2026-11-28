import type React from "react";
import {
  Block,
  ChatToast,
  FloatingNumber,
  MinecraftAvatar,
  Sign,
  Vox,
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
  SubscribeSign,
  DarkOakVillageMap,
  ShopStand,
  IslandBridge,
  MineEntrance,
} from "../../../Topics/InThisTown";

export { FounderCrest, FounderSkeleton, HandTorch } from "./parts";
export { cam, storyScene, moveBetween, ChatToast, FloatingNumber, Block, Vox, Sign };

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  /** Dark Oak Forest Village with doorway threshold, market stall & dinner table. */
  village: [0, 0, 0] as Vec3,
  /** Wooden river bridge connecting two lush grass islands. */
  bridge: [72, 0, 0] as Vec3,
  /** Dark stone cave tunnel & Founder's collapsed chamber. */
  cave: [0, 0, -76] as Vec3,
};

export const at = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

type A = Partial<MinecraftAvatarProps>;

/** Narrator kid — crimson-red hoodie & dark jeans, bold and curious. */
export const Teller: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#e2ae86"
    hair="#2e1d12"
    colors={{ torso: "#c9382b", arms: "#c9382b", legs: "#2c3852" }}
    blink
    shadow
    {...p}
  />
);

/** Sam — best friend who always goes second, warm forest-teal sweater. */
export const Sam: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="hoodie"
    skin="#d9a680"
    hair="#523a24"
    colors={{ torso: "#2a8c82", arms: "#2a8c82", legs: "#39465c" }}
    blink
    shadow
    {...p}
  />
);

/** The Oldest Man — silver hair & beard, slate-blue cloak, always goes dead last. */
export const Elder: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={1.0}
    outfit="suit"
    skin="#d6a580"
    hair="#d4d7de"
    colors={{ torso: "#48566a", arms: "#48566a", legs: "#2b323d" }}
    face="bearded"
    blink
    shadow
    {...p}
  />
);
