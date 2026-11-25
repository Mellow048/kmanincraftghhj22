import type React from "react";
import { MinecraftAvatar } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { ADULT, CHILD, KID, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

/**
 * This film's cast and places.
 *
 * The family is foxes (`Topics/InThisTown/foxes.tsx`, built for this film); the boy is the one villager. Everything
 * else is the topic's pack. A scene imports only from "./kit".
 */

export {
  // staging: when a word is said, how a thing pops in, where "in front of him" is
  DEG, EAST, KID, NORTH, SOUTH, WEST, ahead, beside, chestOf, ease, faceOf, jolt, pop, ramp,
  // the people of the town, the iron golem and its flower
  ADULT, CHILD, IronGolem, Poppy, ROBE, Villager, golemHand, villagerChest, villagerFace,
  // the foxes, and what a fox carries
  Berries, CookedChicken, Fox, FoxCub, FoxHead, FoxTail, RedFlower, SillCup, Sword, foxFur,
  // dogs, who know a fox before anyone does
  DogVillager,
  // the stuff of a town at night
  BedBox, Bubble, Smoke, SubscribeSign,
} from "../../../Topics/InThisTown";
import { Fox, Villager } from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;

/** Seconds into its shot at which a word is said: `wordAt("3.bell", "bell")`. Hang every action on a word. */
export const wordAt = wordClock(timing);

// ----------------------------------------------------------------------------- places

/**
 * Where things are. The street runs west–east (x); house fronts on the north side face south, at the camera.
 * The den is its own zone, far from everything.
 */
export const PLACE = {
  /** The middle of the street. */
  square: [0, 0, 2] as Vec3,
  bell: [2.8, 0, -2.5] as Vec3,
  stall: [6.4, 0, -2.6] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  /**
   * The boy's house: its front wall is at z = -5, so the sill of its lit window is at z = -4.85 and y = 1.3.
   * The cup stands on it. A fox on the path below can reach it at full stretch.
   */
  boyHouse: [-11, 0, -5] as Vec3,
  sill: [-9.5, 1.5, -4.85] as Vec3,
  /** The step under the sill, where the boy sits and cries. */
  step: [-9.5, 0, -3.9] as Vec3,
  /** The path in front of the boy's door: where a fox is caught in daylight. */
  path: [-11, 0, -2.2] as Vec3,
  /** The hedge across the street, where the teller watches the house. */
  hedge: [-9.5, 0, 0.4] as Vec3,
  /** The den: its own zone. Origin at the middle of its floor; the pile is against the north wall. */
  den: [0, 0, 60] as Vec3,
  /** The teller's room, if a beat needs one. */
  room: [0, 0, 90] as Vec3,
};
/** A point given in den coordinates. */
export const den = (x: number, y: number, z: number): Vec3 => [PLACE.den[0] + x, PLACE.den[1] + y, PLACE.den[2] + z];

// ----------------------------------------------------------------------------- the cast

/**
 * The teller: the smallest fox, in the one loud shirt in the film, so a phone can find him in every shot.
 * He is the one who carries things wrong. Faces: smile grin laugh frown uneasy brave fear wow ouch calm.
 */
export const Teller: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  animation?: Parameters<typeof MinecraftAvatar>[0]["animation"];
  face?: Parameters<typeof MinecraftAvatar>[0]["face"];
  lookAt?: Vec3;
  time?: number;
  headPitch?: number;
  arms?: Parameters<typeof MinecraftAvatar>[0]["arms"];
  blendTo?: Parameters<typeof MinecraftAvatar>[0]["blendTo"];
  blend?: number;
  animDistance?: number;
  plantFeet?: boolean;
  carry?: React.ReactNode;
  tailUp?: number;
  puff?: number;
  sniff?: number;
  ears?: number;
  pose?: Parameters<typeof MinecraftAvatar>[0]["pose"];
  scaleY?: number;
}> = (p) => <Fox who={0} shirt="#2f6f5a" {...p} />;

/** Dad: the tallest fox, and the quietest. A sword went missing once. */
export const Dad: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; animation?: Parameters<typeof MinecraftAvatar>[0]["animation"]; face?: Parameters<typeof MinecraftAvatar>[0]["face"]; carry?: React.ReactNode; tailUp?: number; time?: number; lookAt?: Vec3; headPitch?: number; animDistance?: number; blendTo?: Parameters<typeof MinecraftAvatar>[0]["blendTo"]; blend?: number }> = (p) => (
  <Fox who={1} scale={0.72} shirt="#3a4f8a" {...p} />
);

/** Mum: the fastest. Says nothing, looks at windows. */
export const Mum: React.FC<{ position?: Vec3; rotationY?: number; animation?: Parameters<typeof MinecraftAvatar>[0]["animation"]; face?: Parameters<typeof MinecraftAvatar>[0]["face"]; tailUp?: number; time?: number; lookAt?: Vec3; carry?: React.ReactNode }> = (p) => (
  <Fox who={4} scale={0.68} shirt="#8a3b2a" {...p} />
);

/** The sister: can take the pin out of a hat. Carries whole chickens. */
export const Sister: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; animation?: Parameters<typeof MinecraftAvatar>[0]["animation"]; face?: Parameters<typeof MinecraftAvatar>[0]["face"]; carry?: React.ReactNode; tailUp?: number; time?: number; lookAt?: Vec3; headPitch?: number; animDistance?: number; blendTo?: Parameters<typeof MinecraftAvatar>[0]["blendTo"]; blend?: number }> = (p) => (
  <Fox who={2} scale={0.62} shirt="#7a5a2a" {...p} />
);

/** The boy: a villager kid, the one human in the film. `carry` takes a `RedFlower`. */
export const Boy: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  walk?: number;
  nod?: number;
  lookAt?: Vec3;
  lean?: number;
  sit?: boolean;
  carry?: React.ReactNode;
  hat?: "none" | "straw" | "wide";
  phase?: number;
}> = ({ scale = CHILD, ...p }) => <Villager kid scale={scale} robe="#7a6a4a" {...p} />;
