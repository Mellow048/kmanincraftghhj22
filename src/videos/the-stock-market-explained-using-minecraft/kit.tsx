import type React from "react";
import {
  Block,
  Clouds,
  Dust,
  EmberDrift,
  Glow,
  GodRay,
  LightPool,
  SolidBox,
  Torch,
  Vox,
  Zone,
  clamp01,
  storyScene,
  walkSegment,
} from "../../engine";
import type { AnimName, FaceName, Vec3 } from "../../engine";
import {
  Arrow,
  Balance,
  BannerFlag,
  BarChart,
  Bubble,
  ChatToast,
  Chest,
  CitizenLead,
  Coin,
  CoinPile,
  CoinStack,
  CommandBoard,
  CompareChestPair,
  CouncilTable,
  DEG,
  DetailedBookshelf,
  EAST,
  EliteLead,
  FloatingNumber,
  IngotStack,
  LampPost,
  NORTH,
  Pickaxe,
  PriceBillboard,
  PriceTag,
  Puffs,
  SOUTH,
  ShopStall,
  StoneBillboard,
  VillageStreet,
  WEST,
  cam,
  ease,
  pop,
  ramp,
  wordClock,
} from "../../../Topics/Explainer";
import timingData from "./timing.json";

export const timing = timingData as unknown as import("../../engine").Timing;
export const w = wordClock(timing);

/** Separate world origins per zone so v7 <SolidBox> walls never collide across zones. */
export const EXCHANGE_POS: Vec3 = [60, 0, 0];
export const OFFICE_POS: Vec3 = [-60, 0, 0];
export const on = (base: Vec3, x: number, y: number, z: number): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

export {
  Arrow,
  Balance,
  BannerFlag,
  BarChart,
  Block,
  Bubble,
  ChatToast,
  Chest,
  CitizenLead,
  Clouds,
  Coin,
  CoinPile,
  CoinStack,
  CommandBoard,
  CompareChestPair,
  CouncilTable,
  DEG,
  DetailedBookshelf,
  Dust,
  EAST,
  EliteLead,
  EmberDrift,
  FloatingNumber,
  Glow,
  GodRay,
  IngotStack,
  LampPost,
  LightPool,
  NORTH,
  Pickaxe,
  PriceBillboard,
  PriceTag,
  Puffs,
  SOUTH,
  ShopStall,
  SolidBox,
  StoneBillboard,
  Torch,
  VillageStreet,
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

/** Composite Minecraft Blacksmith Furnace with stone masonry, iron grate, chimney, and roaring fire! */
export const ForgeFurnace: React.FC<{
  position?: Vec3;
  rotationY?: number;
  lit?: boolean;
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, lit = true, scale = 1 }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {/* Base cobble body */}
    <Vox kind="cobble" position={[0, 0.72, 0]} size={[1.38, 1.44, 1.32]} />
    {/* Dark stone rim & top slab */}
    <Vox kind="stone" position={[0, 1.52, 0]} size={[1.48, 0.18, 1.42]} />
    <Vox kind="cobble" position={[0, 2.2, -0.18]} size={[0.72, 1.25, 0.72]} />
    {/* Upper smelter slot */}
    <Block position={[0, 1.05, 0.67]} size={[0.88, 0.24, 0.05]} color="#1d2026" />
    <Block position={[0, 1.05, 0.69]} size={[0.76, 0.06, 0.03]} color="#6f7782" />
    {/* Firebox opening */}
    <Block position={[0, 0.44, 0.67]} size={[0.88, 0.52, 0.05]} color="#181518" />
    {lit ? (
      <>
        <Block position={[0, 0.36, 0.69]} size={[0.74, 0.34, 0.04]} color="#ff7a1a" emissive="#ff5500" emissiveIntensity={1.6} />
        <Block position={[-0.14, 0.48, 0.7]} size={[0.24, 0.18, 0.03]} color="#ffd447" emissive="#ffb01f" emissiveIntensity={1.5} />
        <Block position={[0.16, 0.44, 0.7]} size={[0.22, 0.16, 0.03]} color="#ffe678" emissive="#ffaa1a" emissiveIntensity={1.4} />
        <Glow position={[0, 0.45, 0.85]} size={1.6} color="#ff8422" opacity={0.42} />
      </>
    ) : (
      <Block position={[0, 0.34, 0.69]} size={[0.68, 0.18, 0.03]} color="#3a3d44" />
    )}
  </group>
);

/** Crisp emerald-and-gold Share Ticket ("10% FORGE") used across purchase, pump, panic-dump & rebound beats! */
export const ShareTicket: React.FC<{
  position?: Vec3;
  rotationY?: number;
  rotation?: Vec3;
  scale?: number;
  color?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, rotation, scale = 1, color = "#37c967" }) => (
  <group position={position} rotation={rotation ?? [0, rotationY, 0]} scale={scale}>
    {/* Cream certificate backing */}
    <Block position={[0, 0, 0]} size={[0.66, 0.44, 0.04]} color="#f6eed8" />
    {/* Colored inner border & emerald seal */}
    <Block position={[0, 0, 0.025]} size={[0.58, 0.36, 0.02]} color={color} />
    <Block position={[0, 0, 0.038]} size={[0.48, 0.26, 0.015]} color="#f9f4e4" />
    <Block position={[-0.14, 0, 0.048]} size={[0.14, 0.14, 0.02]} color={color} emissive={color} emissiveIntensity={0.35} />
    {/* Fake text bars */}
    <Block position={[0.09, 0.05, 0.048]} size={[0.24, 0.04, 0.015]} color="#252c36" />
    <Block position={[0.09, -0.04, 0.048]} size={[0.2, 0.035, 0.015]} color="#536070" />
  </group>
);

/** Fan of 10 share tickets showing Sam splitting ownership into 10 equal 10% pieces! */
export const ShareFan: React.FC<{
  position?: Vec3;
  spread?: number;
  count?: number;
  color?: string;
}> = ({ position = [0, 1.3, 0], spread = 1, count = 10, color = "#37c967" }) => (
  <group position={position}>
    {Array.from({ length: count }, (_, i) => {
      const mid = (count - 1) / 2;
      const offset = i - mid;
      const x = offset * 0.24 * spread;
      const y = -Math.abs(offset) * 0.04 * spread;
      const rotZ = -offset * 0.08 * spread;
      return (
        <ShareTicket
          key={i}
          position={[x, y, i * 0.012]}
          rotation={[0, 0, rotZ]}
          scale={0.78}
          color={color}
        />
      );
    })}
  </group>
);

/** Compact Minecraft Blacksmith Anvil sitting outside Sam's forge. */
export const IronAnvil: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.14, 0]} size={[0.72, 0.28, 0.56]} color="#3a3f47" metalness={0.45} roughness={0.45} />
    <Block position={[0, 0.42, 0]} size={[0.42, 0.3, 0.34]} color="#2e333a" metalness={0.45} roughness={0.45} />
    <Block position={[0, 0.72, 0]} size={[0.92, 0.32, 0.52]} color="#4a505a" metalness={0.5} roughness={0.38} />
  </group>
);
