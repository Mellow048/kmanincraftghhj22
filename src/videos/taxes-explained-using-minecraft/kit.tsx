import { Creeper as PackCreeper } from "../../../Topics/InThisTown";
import type React from "react";
import { Block, ChatToast, FloatingNumber, Glow,
  GodRay, Sign, Torch, Vox, cam, moveBetween, storyScene } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import {
  Balance,
  BarChart,
  Chest,
  CitizenLead,
  CommandBoard,
  Crown,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  MoneyPrinter,
  Official,
  OrbitingItemRing,
  RuleBoard,
  StoneBillboard,
  VillageStreet,
} from "../../../Topics/Explainer";
import { ease, pop, ramp, wordClock } from "../../../Topics/Shared";
import timingJson from "./timing.json";

export {
  Balance,
  BarChart,
  Block,
  ChatToast,
  Chest,
  CitizenLead,
  CommandBoard,
  Crown,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  Glow,
  GodRay,
  MoneyPrinter,
  Official,
  OrbitingItemRing,
  RuleBoard,
  Sign,
  StoneBillboard,
  Torch,
  VillageStreet,
  Vox,
  cam,
  ease,
  moveBetween,
  pop,
  ramp,
  storyScene,
};

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  street: [0, 0, 0] as Vec3,
  hall: [0, 0, 110] as Vec3,
  real: [0, 0, 200] as Vec3,
};

export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/** Real articulated pack Creeper from Topics/InThisTown/monsters.tsx (never a scratch box mob!). */
export const Creeper: React.FC<{ position?: Vec3; rotationY?: number; swell?: number; walk?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  swell = 0,
  walk = 0,
}) => (
  <PackCreeper position={position} rotationY={rotationY} fuse={swell} walk={walk} mood={swell > 0.2 ? "angry" : "calm"} />
);

/** Giant gaudy gold statue of the greedy mod. */
export const GoldStatue: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="stoneBrick" position={[0, 0.35, 0]} size={[2.2, 0.7, 2.2]} />
    <Block position={[-0.28, 1.35, 0]} size={[0.45, 1.3, 0.45]} color="#f5c736" metalness={0.55} roughness={0.25} />
    <Block position={[0.28, 1.35, 0]} size={[0.45, 1.3, 0.45]} color="#f5c736" metalness={0.55} roughness={0.25} />
    <Block position={[0, 2.55, 0]} size={[1.1, 1.2, 0.6]} color="#ffd84d" metalness={0.6} roughness={0.22} />
    <Block position={[-0.82, 2.55, 0]} size={[0.42, 1.15, 0.45]} color="#f5c736" metalness={0.55} roughness={0.25} />
    <Block position={[0.82, 2.55, 0]} size={[0.42, 1.15, 0.45]} color="#f5c736" metalness={0.55} roughness={0.25} />
    <Block position={[0, 3.6, 0]} size={[0.88, 0.88, 0.88]} color="#ffe066" metalness={0.6} roughness={0.2} />
    <Crown position={[0, 4.15, 0]} scale={1.4} />
    <Glow position={[0, 3.2, 0.5]} size={3.2} color="#ffe066" opacity={0.32} />
  </group>
);
