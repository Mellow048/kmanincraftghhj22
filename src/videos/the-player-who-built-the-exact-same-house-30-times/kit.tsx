import type React from "react";
import {
  BedroomSet,
  Block,
  Bubble,
  ChatToast,
  ChestGridUI,
  Clouds,
  DEG,
  DeskSetup,
  Dust,
  EAST,
  EmberDrift,
  FloatingHeart,
  FloatingNumber,
  Glow,
  GodRay,
  LampPost,
  LightPool,
  NORTH,
  OpeningChest,
  Puffs,
  SOUTH,
  ServerChatBox,
  ServerNameTag,
  ServerPlayer,
  Sign,
  SubscribeSign,
  TearDrops,
  Torch,
  Tree,
  Vox,
  WEST,
  Zone,
  cam,
  clamp01,
  ease,
  pop,
  ramp,
  storyScene,
  wordClock,
} from "../../../Topics/ServerLore";
import type { AnimName, FaceName, Timing, Vec3 } from "../../../Topics/ServerLore";
import { MinecraftAvatar, SolidBox, walkSegment } from "../../engine";
import type { MinecraftAvatarProps } from "../../engine";
import timingData from "./timing.json";

export const timing = timingData as unknown as Timing;
export const w = wordClock(timing);

/** Separate world origins per zone so v7 <SolidBox> walls never collide across zones. */
export const WOODS_POS: Vec3 = [60, 0, 0];
export const IRL_POS: Vec3 = [-60, 0, 0];
export const SPAWN_POS: Vec3 = [0, 0, 80];
export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

export {
  BedroomSet,
  Block,
  Bubble,
  ChatToast,
  ChestGridUI,
  Clouds,
  DEG,
  DeskSetup,
  Dust,
  EAST,
  EmberDrift,
  FloatingHeart,
  FloatingNumber,
  Glow,
  GodRay,
  LampPost,
  LightPool,
  NORTH,
  OpeningChest,
  Puffs,
  SOUTH,
  ServerChatBox,
  ServerPlayer,
  Sign,
  SolidBox,
  SubscribeSign,
  Torch,
  Tree,
  Vox,
  WEST,
  Zone,
  cam,
  clamp01,
  ease,
  pop,
  ramp,
  storyScene,
  walkSegment,
};
export type { AnimName, FaceName, Vec3 };

/** 75-year-old Grandpa: silver hair, round spectacles, cozy knit cardigan, warm gentle presence. */
export const Grandpa: React.FC<
  Partial<MinecraftAvatarProps> & { tears?: number; nameTag?: string }
> = ({ tears = 0, nameTag, position = [0, 0, 0], scale = 0.96, head, torso, ...rest }) => (
  <group>
    <MinecraftAvatar
      position={position}
      scale={scale}
      outfit="hoodie"
      skin="#ebd0b5"
      hair="#c8cdd4"
      hairLayer
      colors={{ torso: "#8a6d4f", arms: "#785e43", legs: "#3e4652" }}
      shoes="#5a4534"
      blink
      head={
        <>
          {/* Silver glasses frames */}
          <Block position={[-0.11, 0.02, 0.258]} size={[0.14, 0.1, 0.02]} color="#4a5058" castShadow={false} />
          <Block position={[0.11, 0.02, 0.258]} size={[0.14, 0.1, 0.02]} color="#4a5058" castShadow={false} />
          <Block position={[-0.11, 0.02, 0.264]} size={[0.09, 0.06, 0.015]} color="#d8eefc" opacity={0.42} castShadow={false} />
          <Block position={[0.11, 0.02, 0.264]} size={[0.09, 0.06, 0.015]} color="#d8eefc" opacity={0.42} castShadow={false} />
          <Block position={[0, 0.03, 0.26]} size={[0.08, 0.025, 0.015]} color="#4a5058" castShadow={false} />
          {/* Gentle silver mustache */}
          <Block position={[0, -0.1, 0.258]} size={[0.24, 0.05, 0.02]} color="#cfd4db" castShadow={false} />
          {tears > 0.05 ? <TearDrops intensity={tears} t={rest.time} /> : null}
          {head}
        </>
      }
      torso={
        <>
          {/* Cream knit collar & cardigan buttons */}
          <Block position={[0, 0.28, 0.132]} size={[0.16, 0.14, 0.014]} color="#f4ecdc" castShadow={false} />
          <Block position={[0, 0.02, 0.133]} size={[0.05, 0.44, 0.012]} color="#5e4933" castShadow={false} />
          {torso}
        </>
      }
      {...rest}
    />
    {nameTag ? (
      <ServerNameTag
        text={nameTag}
        position={[position[0], position[1] + 2.26 * scale, position[2]]}
        scale={scale}
        color="#ffe680"
      />
    ) : null}
  </group>
);

/** Bright iconic Minecraft Dandelion ("One yellow flower meant Grandpa was safe"). */
export const YellowFlower: React.FC<{
  position?: Vec3;
  scale?: number;
  glow?: number;
}> = ({ position = [0, 0, 0], scale = 1, glow = 0.35 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.2, 0]} size={[0.07, 0.4, 0.07]} color="#3a8a2e" />
    <Block position={[-0.08, 0.16, 0]} rotation={[0, 0, 0.5]} size={[0.12, 0.05, 0.06]} color="#49a638" />
    <Block position={[0.08, 0.22, 0]} rotation={[0, 0, -0.5]} size={[0.12, 0.05, 0.06]} color="#49a638" />
    {/* Bright sunny petals */}
    <Block position={[0, 0.46, 0]} size={[0.26, 0.16, 0.26]} color="#ffdf2b" emissive="#ffcc00" emissiveIntensity={glow} />
    <Block position={[0, 0.54, 0]} size={[0.16, 0.09, 0.16]} color="#fff176" emissive="#ffd92e" emissiveIntensity={glow} />
    {glow > 0.2 ? <Glow position={[0, 0.5, 0]} size={0.95} color="#ffe347" opacity={0.28} /> : null}
  </group>
);

/** Sam's iconic tiny identical Oak Cottage with corner logs, plank walls, warm window, door, and yellow flower! */
export const OakCottage: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  flower?: boolean;
  burned?: boolean;
  porchLodestone?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, flower = true, burned = false, porchLodestone = false }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {burned ? (
      <>
        {/* Charred ruins + cooling magma / lava glow */}
        <Vox kind="cobble" tint="#3b3634" position={[0, 0.15, 0]} size={[3.2, 0.3, 3.2]} />
        <Vox kind="planks" tint="#2c211b" position={[-1.3, 0.8, -1.2]} size={[0.45, 1.3, 0.45]} />
        <Vox kind="planks" tint="#2c211b" position={[1.3, 0.65, -1.2]} size={[0.45, 1.0, 0.45]} />
        <Vox kind="planks" tint="#2c211b" position={[-1.3, 0.55, 1.2]} size={[0.45, 0.8, 0.45]} />
        <Block position={[0, 0.32, 0.1]} size={[1.8, 0.08, 1.6]} color="#ff5511" emissive="#ff3b00" emissiveIntensity={1.5} />
        <Glow position={[0, 0.7, 0.1]} size={2.4} color="#ff5a14" opacity={0.4} />
      </>
    ) : (
      <>
        {/* Cobble foundation + wooden porch step */}
        <Vox kind="cobble" position={[0, 0.12, 0]} size={[3.3, 0.24, 3.3]} />
        <Vox kind="planks" tint="#a87942" position={[0, 0.08, 1.95]} size={[2.2, 0.16, 0.9]} />
        {porchLodestone ? <LodestoneBlock position={[0, 0.22, 1.95]} scale={0.78} /> : null}
        {/* Oak plank walls */}
        <Vox kind="planks" tint="#b48349" position={[0, 1.45, 0]} size={[3.0, 2.4, 3.0]} />
        {/* 4 oak corner log pillars */}
        {[
          [-1.48, -1.48],
          [1.48, -1.48],
          [-1.48, 1.48],
          [1.48, 1.48],
        ].map(([x, z], i) => (
          <Vox key={i} kind="log" position={[x!, 1.45, z!]} size={[0.38, 2.5, 0.38]} />
        ))}
        {/* Pitched oak plank roof */}
        <Vox kind="planks" tint="#8a5d2e" position={[0, 2.85, 0]} size={[3.6, 0.36, 3.6]} />
        <Vox kind="planks" tint="#7b5126" position={[0, 3.22, 0]} size={[2.8, 0.38, 2.8]} />
        <Vox kind="planks" tint="#6e4620" position={[0, 3.55, 0]} size={[1.9, 0.34, 1.9]} />
        {/* Wooden front door + warm glowing front window */}
        <Block position={[-0.48, 1.15, 1.52]} size={[0.84, 1.75, 0.08]} color="#6f4620" />
        <Block position={[-0.22, 1.12, 1.57]} size={[0.09, 0.09, 0.04]} color="#e5c147" />
        <Block position={[0.68, 1.45, 1.52]} size={[0.82, 0.82, 0.08]} color="#ffdf8e" emissive="#ffb938" emissiveIntensity={0.85} />
        {/* Iconic yellow dandelion right outside the door! */}
        {flower ? <YellowFlower position={[0.92, 0.16, 2.08]} scale={1.15} glow={0.45} /> : null}
      </>
    )}
  </group>
);

/** Authentic Minecraft Lodestone Block: carved chiseled stone + dark netherite bands + soft enchant glow! */
export const LodestoneBlock: React.FC<{
  position?: Vec3;
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="stone" tint="#8c929c" position={[0, 0.45, 0]} size={[0.92, 0.9, 0.92]} />
    <Block position={[0, 0.45, 0]} size={[0.96, 0.24, 0.96]} color="#4e545e" />
    <Block position={[0, 0.45, 0.47]} size={[0.42, 0.42, 0.04]} color="#2f333a" />
    <Block position={[0, 0.45, 0.49]} size={[0.24, 0.24, 0.03]} color="#c47eff" emissive="#a44aff" emissiveIntensity={1.1} />
    <Glow position={[0, 0.52, 0]} size={1.65} color="#c780ff" opacity={0.36} />
  </group>
);

/** Enchanted Minecraft Lodestone Compass ("HOME") with spinning crimson magnetic needle! */
export const LodestoneCompass: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  needleAngle?: number;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], needleAngle = 0, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Iron outer casing with purple enchantment sheen */}
    <Block position={[0, 0, 0]} size={[0.62, 0.62, 0.1]} color="#7e8896" metalness={0.45} roughness={0.35} />
    <Block position={[0, 0, 0.055]} size={[0.48, 0.48, 0.03]} color="#262c38" />
    <Block position={[0, 0, 0.065]} size={[0.42, 0.42, 0.02]} color="#b46eff" opacity={0.28} emissive="#9b42ff" emissiveIntensity={0.65} />
    {/* Magnetic needle rotating cleanly toward Grandpa's home! */}
    <group position={[0, 0, 0.085]} rotation={[0, 0, needleAngle]}>
      <Block position={[0, 0.08, 0]} size={[0.08, 0.2, 0.03]} color="#ff3b30" emissive="#ff2a1f" emissiveIntensity={0.9} />
      <Block position={[0, -0.08, 0]} size={[0.08, 0.16, 0.03]} color="#d8e0eb" />
    </group>
    <Glow position={[0, 0, 0.06]} size={1.25} color="#bf73ff" opacity={0.35} />
  </group>
);

/** Molten iron Lava Bucket used in Rex's griefing beat. */
export const LavaBucket: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  pouring?: number;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], pouring = 0, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.3, 0.32, 0.3]} color="#8b94a0" metalness={0.4} roughness={0.4} />
    <Block position={[0, 0.15, 0]} size={[0.24, 0.05, 0.24]} color="#ff6a00" emissive="#ff4800" emissiveIntensity={1.6} />
    {pouring > 0.02 ? (
      <Block
        position={[0, -0.55 * pouring, 0.32]}
        size={[0.22, 1.2 * pouring, 0.22]}
        color="#ff5500"
        emissive="#ff3800"
        emissiveIntensity={1.6}
      />
    ) : null}
  </group>
);
