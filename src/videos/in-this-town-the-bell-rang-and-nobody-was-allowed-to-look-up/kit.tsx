import type React from "react";
import { MinecraftAvatar, Vox } from "../../engine";
import type { MinecraftAvatarProps, Timing, Vec3 } from "../../engine";
import { ADULT, CHILD, IronGolem, KID, ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import timingJson from "./timing.json";

export {
  Bell, Bubble, SubscribeSign, Well,
  ease, pop, ramp,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const DAY = "overworld-day";
export const NIGHT = "overworld-night";

export const PLACE = {
  square: [0, 0, 2] as Vec3,
  bell: [0, 0, -2.5] as Vec3,
  well: [-5, 0, 5.5] as Vec3,
  home: [10, 0, -5] as Vec3,
};

type A = Partial<MinecraftAvatarProps>;
type Folk = {
  position?: Vec3;
  rotationY?: number;
  lean?: number;
  nod?: number;
  walk?: number;
  hmm?: number;
  turn?: number;
  lookAt?: Vec3;
};

/** The teller. Orange, so a phone finds him in a town of brown robes. */
export const Hero: React.FC<A> = (p) => (
  <MinecraftAvatar scale={KID} outfit="tee" skin="#dba47c" hair="#3a2415" colors={{ torso: "#e8a21c", arms: "#e8a21c", legs: "#3b3fa0" }} blink {...p} />
);

/** Villagers have no hands. A bow is lean and nod, never an arm. */
export const Friend: React.FC<Folk> = (p) => <Villager scale={CHILD} kid robe={ROBE.white} hat="none" {...p} />;
export const Mum: React.FC<Folk> = (p) => <Villager scale={ADULT} robe={ROBE.red} hat="none" {...p} />;
export const Dad: React.FC<Folk> = (p) => <Villager scale={ADULT} robe={ROBE.farmer} hat="straw" {...p} />;
export const Baker: React.FC<Folk> = (p) => <Villager scale={ADULT} robe={ROBE.white} hat="straw" {...p} />;

export const Golem: React.FC<{ position?: Vec3; rotationY?: number; bow?: number; walk?: number }> = ({ position = [0, 0, 0], rotationY = 0, bow = 0, walk = 0 }) => (
  <IronGolem position={position} rotationY={rotationY} bow={bow} walk={walk} />
);

/** A fill from the camera side, so a face at night is not a hole. */
export const Fill: React.FC<{ on: Vec3; yaw?: number; power?: number }> = ({ on, yaw = 0, power = 5 }) => {
  const a = (yaw * Math.PI) / 180;
  return <pointLight position={[on[0] + Math.sin(a) * 1.6, on[1] + 0.4, on[2] + Math.cos(a) * 1.6]} intensity={power} distance={8} color="#e7eeff" />;
};

/** The rope under the bell. `pull` 0..1 drops it. */
export const BellRope: React.FC<{ pull?: number }> = ({ pull = 0 }) => (
  <group position={[PLACE.bell[0], 2.15 - pull * 0.45, PLACE.bell[2] + 0.15]}>
    <Vox kind="wool" tint="#6a3a28" position={[0, -0.85, 0]} size={[0.08, 1.7, 0.08]} />
    <Vox kind="wool" tint="#8a4a30" position={[0, -1.7, 0]} size={[0.16, 0.12, 0.16]} />
  </group>
);

/**
 * The thing the law was written for. One eye, too many legs, and it comes out of the sky.
 * Built here because no other film should have it.
 */
export const SkyThing: React.FC<{ position?: Vec3; scale?: number; legs?: number }> = ({ position = [0, 16, -6], scale = 1, legs = 8 }) => (
  <group position={position} scale={scale}>
    <Vox kind="obsidian" position={[0, 2.4, 0]} size={[4.4, 2.2, 3.2]} />
    <Vox kind="obsidian" position={[0, 3.8, 0.3]} size={[2.2, 1.5, 1.8]} />
    <Vox kind="wool" tint="#f2c14e" position={[0, 3.9, 1.25]} size={[0.72, 0.72, 0.2]} />
    {Array.from({ length: legs }).map((_, i) => {
      const x = (i - (legs - 1) / 2) * 0.62;
      const h = 2.4 + (i % 3) * 0.9;
      return <Vox key={i} kind="obsidian" position={[x, 1.1 - h * 0.45, (i % 2) * 0.35]} size={[0.4, h, 0.4]} />;
    })}
  </group>
);

/** A ring in the sky, not a disc: from below it reads as a hole. */
export const SkyHole: React.FC<{ position?: Vec3; open?: number }> = ({ position = [0, 24, -8], open = 1 }) => (
  <group position={position} scale={open}>
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return <Vox key={i} kind="obsidian" position={[Math.cos(a) * 3.1, 0, Math.sin(a) * 2.2]} size={[1.5, 0.45, 1.5]} />;
    })}
  </group>
);
