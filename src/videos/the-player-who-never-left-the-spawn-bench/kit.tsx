import React from "react";
import {
  Block,
  Glow,
  LightPool,
  RedstoneLamp,
  RedstoneLine,
  ServerPlayer,
  Sign,
  Vox,
  cam,
  clamp01,
  lerp,
  vlerp,
  ServerChatBox as BaseServerChatBox,
  BadgePop,
  TearDrops,
  FloatingHeart,
  DeskSetup,
  ClassroomRoom,
  ServerCrowd,
  Tree,
  Torch,
  Clouds,
  Dust,
  EmberDrift,
  GodRay,
  Zone,
  storyScene,
} from "../../../Topics/ServerLore";
import type { AnimName, FaceName, Timing, Vec3 } from "../../../Topics/ServerLore";
import { VillageStreet } from "../../../Topics/InThisTown";
import { moveBetween } from "../../engine";
import timingJson from "./timing.json";

export {
  Block,
  Glow,
  LightPool,
  RedstoneLamp,
  RedstoneLine,
  ServerPlayer,
  Sign,
  Vox,
  cam,
  clamp01,
  lerp,
  vlerp,
  moveBetween,
  VillageStreet,
  BadgePop,
  TearDrops,
  FloatingHeart,
  DeskSetup,
  ClassroomRoom,
  ServerCrowd,
  Tree,
  Torch,
  Clouds,
  Dust,
  EmberDrift,
  GodRay,
  Zone,
  storyScene,
};
export type { AnimName, FaceName, Timing, Vec3 };

export const timing = timingJson as Timing;

export const SERVER_POS: Vec3 = [0, 0, 0];
export const IRL_POS: Vec3 = [80, 0, 0];
export const SCHOOL_POS: Vec3 = [160, 0, 0];

/** Bench sits along the left side of the spawn pathway (never blocking the center road). */
export const BENCH_POS: Vec3 = [-2.4, 0, 1.2];
export const BENCH_ROT = 0.35;
export const BENCH_SEAT: Vec3 = [-2.34, 0.2, 1.37];

/** Compact 9:16-safe Minecraft chat box scaled to fit cleanly above character nametags. */
export const ServerChatBox: React.FC<React.ComponentProps<typeof BaseServerChatBox>> = ({
  scale = 0.48,
  position = [BENCH_POS[0], 2.95, BENCH_POS[2]],
  ...rest
}) => <BaseServerChatBox scale={scale} position={position} {...rest} />;

/* ─────────────────────────── DISTINCT CAST (ZERO CLONES) ─────────────────────────── */

export const Maya: React.FC<{
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animDistance?: number;
  face?: FaceName;
  time?: number;
  nameTag?: string;
  badge?: "!" | "?" | "heart" | "broken";
  badgePopStart?: number;
  tears?: number;
}> = ({ nameTag = "Maya", ...props }) => (
  <ServerPlayer
    role="hero"
    shirtColor="#8a5ec9"
    nameTag={nameTag}
    nameTagColor="#e8d8ff"
    {...props}
  />
);

export const Sister: React.FC<{
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animDistance?: number;
  face?: FaceName;
  time?: number;
}> = (props) => (
  <ServerPlayer role="mom" shirtColor="#2f8f83" {...props} />
);

export const Jake: React.FC<{
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animDistance?: number;
  face?: FaceName;
  time?: number;
  badge?: "!" | "?" | "heart" | "broken";
  badgePopStart?: number;
  tears?: number;
}> = (props) => (
  <ServerPlayer
    role="griefer"
    nameTag="Jake"
    nameTagColor="#ffb0a0"
    {...props}
  />
);

export const Owner: React.FC<{
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animDistance?: number;
  face?: FaceName;
  time?: number;
  badge?: "!" | "?" | "heart" | "broken";
  badgePopStart?: number;
}> = (props) => (
  <ServerPlayer
    role="owner"
    crown
    nameTag="Owner"
    nameTagColor="#ffe47a"
    {...props}
  />
);

/* ─────────────────────────── STORY PROPS ─────────────────────────── */

export const SpawnBench: React.FC<{
  position?: Vec3;
  rotationY?: number;
  upgraded?: boolean;
  platePressed?: number;
}> = ({ position = BENCH_POS, rotationY = BENCH_ROT, upgraded = false, platePressed = 0 }) => {
  const pressY = 0.04 - clamp01(platePressed) * 0.025;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Oak seat slab & backrest */}
      <Vox kind="planks" position={[0, 0.48, 0]} size={[2.3, 0.16, 0.78]} />
      <Vox kind="planks" position={[0, 0.94, -0.34]} size={[2.3, 0.44, 0.12]} />
      {/* Dark oak legs & armrests */}
      <Vox kind="darkPlanks" position={[-0.98, 0.24, 0]} size={[0.18, 0.48, 0.72]} />
      <Vox kind="darkPlanks" position={[0.98, 0.24, 0]} size={[0.18, 0.48, 0.72]} />
      <Vox kind="darkPlanks" position={[-1.08, 0.72, -0.04]} size={[0.14, 0.28, 0.76]} />
      <Vox kind="darkPlanks" position={[1.08, 0.72, -0.04]} size={[0.14, 0.28, 0.76]} />

      {upgraded ? (
        <>
          {/* Cozy lantern posts flanking the rebuilt bench */}
          {[-1.55, 1.55].map((lx) => (
            <group key={lx} position={[lx, 0, -0.1]}>
              <Vox kind="darkPlanks" position={[0, 1.15, 0]} size={[0.18, 2.3, 0.18]} />
              <Vox kind="darkPlanks" position={[lx < 0 ? 0.24 : -0.24, 2.22, 0]} size={[0.52, 0.14, 0.14]} />
              <Block
                position={[lx < 0 ? 0.42 : -0.42, 1.92, 0]}
                size={[0.3, 0.36, 0.3]}
                color="#ffd966"
                emissive="#ffae34"
                emissiveIntensity={1.6}
              />
              <Glow position={[lx < 0 ? 0.42 : -0.42, 1.92, 0]} size={1.6} color="#ffcf5c" opacity={0.42} />
              <pointLight
                position={[lx < 0 ? 0.42 : -0.42, 1.85, 0]}
                color="#ffc152"
                intensity={3.4}
                distance={6.5}
                decay={2}
              />
            </group>
          ))}
          {/* Auto-greeting pressure plate + redstone wire + lamp */}
          <Block position={[0.55, pressY, 0.72]} size={[0.72, 0.06, 0.72]} color="#d6ad5a" />
          <RedstoneLine from={[0.9, 0.01, 0.72]} to={[1.75, 0.01, 0.72]} lit={platePressed > 0.2 ? 1 : 0.25} />
          <RedstoneLamp position={[2.1, 0.46, 0.72]} size={0.86} lit={platePressed > 0.2 ? 1 : 0.2} />
          <LightPool position={[0, 0.02, 0.4]} width={8.4} depth={8.4} color="#ffd578" opacity={0.34} />
        </>
      ) : null}
    </group>
  );
};

export const TntBlock: React.FC<{ position?: Vec3; fuse?: number }> = ({
  position = [0, 0.45, 1.2],
  fuse = 0,
}) => {
  const flash = fuse > 0.05 && Math.floor(fuse * 14) % 2 === 0;
  const s = 1 + clamp01(fuse) * 0.12;
  return (
    <group position={position} scale={s}>
      <Block
        size={[0.88, 0.88, 0.88]}
        color={flash ? "#ffffff" : "#d9342b"}
        emissive={flash ? "#fff0b3" : "#440808"}
        emissiveIntensity={flash ? 1.2 : 0.2}
      />
      <Block position={[0, 0, 0]} size={[0.9, 0.28, 0.9]} color="#f4efe4" />
      <Block position={[0, 0.45, 0]} size={[0.86, 0.04, 0.86]} color="#3b2c22" />
    </group>
  );
};

export const Crater: React.FC<{ position?: Vec3; debris?: number }> = ({
  position = BENCH_POS,
  debris = 1,
}) => (
  <group position={position}>
    <Block position={[0, 0.02, 0]} size={[3.4, 0.06, 2.6]} color="#252328" />
    <Block position={[0, 0.05, 0]} size={[2.2, 0.05, 1.7]} color="#161418" />
    {debris > 0.1
      ? [
          [-1.35, 0.14, 0.65, 0.3],
          [1.25, 0.12, -0.55, -0.5],
          [-0.65, 0.1, -0.95, 0.8],
          [0.95, 0.15, 0.85, -0.2],
          [0.15, 0.11, -0.4, 1.1],
        ].map(([x, y, z, r], i) => (
          <Vox
            key={i}
            kind="planks"
            position={[x!, y!, z!]}
            rotation={[0.2, r!, 0.15]}
            size={[0.52, 0.12, 0.22]}
          />
        ))
      : null}
  </group>
);

export const RedFlower: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.2, 0]} size={[0.07, 0.4, 0.07]} color="#3c913b" />
    <Block position={[0.08, 0.14, 0]} size={[0.12, 0.07, 0.07]} color="#4aa848" />
    <Block position={[0, 0.44, 0]} size={[0.24, 0.22, 0.24]} color="#e6332e" emissive="#a81b18" emissiveIntensity={0.22} />
    <Block position={[0, 0.48, 0]} size={[0.1, 0.1, 0.1]} color="#281c18" />
  </group>
);

export const PencilProp: React.FC<{ position?: Vec3; rotation?: Vec3 }> = ({
  position = [0, 0.04, 0],
  rotation = [0, 0.4, 0],
}) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0, 0]} size={[0.42, 0.055, 0.055]} color="#f2c438" />
    <Block position={[-0.24, 0, 0]} size={[0.08, 0.058, 0.058]} color="#f08aa0" />
    <Block position={[0.24, 0, 0]} size={[0.07, 0.045, 0.045]} color="#e6cfa8" />
    <Block position={[0.29, 0, 0]} size={[0.04, 0.025, 0.025]} color="#22252c" />
  </group>
);

export const SubPlaque: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 2.55, -0.5],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block size={[2.2, 0.62, 0.14]} color="#d92626" emissive="#a81818" emissiveIntensity={0.35} />
    <Sign title="SUBSCRIBE" position={[0, 0, 0.09]} width={1.9} height={0.44} />
  </group>
);
