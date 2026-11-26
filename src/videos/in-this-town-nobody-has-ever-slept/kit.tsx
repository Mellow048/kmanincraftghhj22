import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, KID, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
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
  ROBE,
  Villager,
  villagerChest,
  villagerFace,
  BedBox,
  Bits,
  Blaze,
  Bubble,
  Bucket,
  FireLight,
  Hole,
  Lantern,
  Player,
  Poppy,
  Smoke,
  StrawHat,
  SubscribeSign,
} from "../../../Topics/InThisTown";

export * from "./parts";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [2.8, 0, -2.5] as Vec3,
  mushrooms: [-9, 0, -5.8] as Vec3,
  soupShed: [-4.8, 0, -5.2] as Vec3,
  chalk: [1.8, 0, -4.4] as Vec3,
  cellar: [11, 0, -4.2] as Vec3,
  lavaShore: [0, -0.35, 11.5] as Vec3,
  // Under-town zone: z centered cleanly in its own Zone
  underPath: [0, 0, 0] as Vec3,
  portal: [0, 0, -6.5] as Vec3,
  bedSocket: [-3.8, 0, -2.5] as Vec3,
  underLava: [4.5, -0.25, 2.5] as Vec3,
  // Overworld moonlit village zone
  overPortal: [0, 0, -9] as Vec3,
  overSquare: [0, 0, 1] as Vec3,
  overHutLeft: [-6.5, 0, -3.5] as Vec3,
  overHutRight: [6.5, 0, -3.5] as Vec3,
};

type A = Partial<MinecraftAvatarProps>;

/** The teller: warm crimson/amber sleeve stripe against purple/charcoal Nether stones so he pops in every shot. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar
    scale={KID}
    outfit="tee"
    skin="#e2ab82"
    hair="#2e1c11"
    colors={{ torso: "#2bb5cf", arms: "skin", legs: "#263252" }}
    blink
    {...p}
  />
);

/** Mum: strong red-apron villager carrying the heavy iron lava bucket. */
export const Mum: React.FC<Omit<React.ComponentProps<typeof Villager>, "robe">> = (p) => (
  <Villager robe={ROBE.red} scale={ADULT} {...p} />
);

/** Dad: farmer-robe mushroom tender tending the Nether rows. */
export const Dad: React.FC<Omit<React.ComponentProps<typeof Villager>, "robe">> = (p) => (
  <Villager robe={ROBE.farmer} hat="straw" scale={ADULT} {...p} />
);

/** Old Wick: purple-robed elder who still remembers when the sky turned dark. */
export const OldWick: React.FC<Omit<React.ComponentProps<typeof Villager>, "robe">> = (p) => (
  <Villager robe={ROBE.elder} scale={ADULT} {...p} />
);

/** Baker: cream apron villager guarding the cold soup cauldron & bread. */
export const Baker: React.FC<Omit<React.ComponentProps<typeof Villager>, "robe">> = (p) => (
  <Villager robe={ROBE.white} scale={ADULT} {...p} />
);
