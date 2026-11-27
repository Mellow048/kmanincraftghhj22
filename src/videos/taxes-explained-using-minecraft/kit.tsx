import type React from "react";
import { Block, ChatToast, FloatingNumber, Glow, Sign, Torch, Vox, cam, storyScene } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import {
  Balance,
  BarChart,
  Chest,
  CitizenLead,
  Crown,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  Official,
  OrbitingItemRing,
  RuleBoard,
  StoneBillboard,
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
  Crown,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingItemPyramid,
  FloatingNumber,
  Glow,
  Official,
  OrbitingItemRing,
  RuleBoard,
  Sign,
  StoneBillboard,
  Torch,
  Vox,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
};

export const timing = timingJson as unknown as Timing;
export const wordAt = wordClock(timing);

export const PLACE = {
  square: [0, 0, 0] as Vec3,
  hall: [0, 0, 70] as Vec3,
  history: [0, 0, 140] as Vec3,
};

export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/** Blocky green Minecraft Creeper that swells slightly right before booming. */
export const Creeper: React.FC<{ position?: Vec3; rotationY?: number; swell?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  swell = 0,
}) => {
  const s = 1 + swell * 0.16;
  const flash = swell > 0.55;
  const bodyCol = flash ? "#eef5ee" : "#3da63a";
  const darkCol = flash ? "#c8e0c8" : "#267324";
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={s}>
      {/* 4 blocky feet */}
      {[[-0.16, 0.14], [0.16, 0.14], [-0.16, -0.14], [0.16, -0.14]].map(([x, z], i) => (
        <Block key={i} position={[x!, 0.22, z!]} size={[0.2, 0.44, 0.2]} color={darkCol} />
      ))}
      {/* Torso */}
      <Block position={[0, 0.88, 0]} size={[0.42, 0.88, 0.28]} color={bodyCol} />
      {/* Head + classic creeper frown */}
      <group position={[0, 1.56, 0]}>
        <Block position={[0, 0, 0]} size={[0.5, 0.5, 0.5]} color={bodyCol} />
        <Block position={[-0.11, 0.08, 0.26]} size={[0.12, 0.12, 0.03]} color="#101410" castShadow={false} />
        <Block position={[0.11, 0.08, 0.26]} size={[0.12, 0.12, 0.03]} color="#101410" castShadow={false} />
        <Block position={[0, -0.04, 0.26]} size={[0.12, 0.14, 0.03]} color="#101410" castShadow={false} />
        <Block position={[-0.08, -0.12, 0.26]} size={[0.08, 0.12, 0.03]} color="#101410" castShadow={false} />
        <Block position={[0.08, -0.12, 0.26]} size={[0.08, 0.12, 0.03]} color="#101410" castShadow={false} />
      </group>
    </group>
  );
};

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
