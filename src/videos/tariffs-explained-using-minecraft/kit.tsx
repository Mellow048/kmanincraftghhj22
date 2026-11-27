import type React from "react";
import {
  Block,
  Clouds,
  Dust,
  Glow,
  GodRay,
  LightPool,
  Sign,
  Tree,
  Vox,
  Zone,
  cam,
  clamp01,
  moveBetween,
  plankTex,
  storyScene,
} from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import {
  Balance,
  BannerFlag,
  BarChart,
  Bread,
  BreadShelf,
  Bridge,
  Bubble,
  CastleGateWall,
  ChatToast,
  Chest,
  CitizenLead,
  Coin,
  CoinPile,
  CoinStack,
  CompareChestPair,
  Crate,
  DetailedBookshelf,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingNumber,
  Hut,
  IngotStack,
  LampPost,
  Official,
  Pickaxe,
  PriceBillboard,
  Puffs,
  RuleBoard,
  ShopStall,
  Signpost,
  StoneBillboard,
  VillageStreet,
  Water,
  ease,
  pop,
  ramp,
  wordClock,
} from "../../../Topics/Explainer";
import rawTiming from "./timing.json";

export {
  Balance,
  BannerFlag,
  BarChart,
  Block,
  Bread,
  BreadShelf,
  Bridge,
  Bubble,
  CastleGateWall,
  ChatToast,
  Chest,
  CitizenLead,
  Clouds,
  Coin,
  CoinPile,
  CoinStack,
  CompareChestPair,
  Crate,
  DetailedBookshelf,
  Dust,
  EliteLead,
  EmeraldFountain,
  ExplainerCrowd,
  FloatingNumber,
  Glow,
  GodRay,
  Hut,
  IngotStack,
  LampPost,
  LightPool,
  Official,
  Pickaxe,
  PriceBillboard,
  Puffs,
  RuleBoard,
  ShopStall,
  Sign,
  Signpost,
  StoneBillboard,
  Tree,
  VillageStreet,
  Vox,
  Water,
  Zone,
  cam,
  clamp01,
  ease,
  moveBetween,
  pop,
  ramp,
  storyScene,
};
export type { Timing, Vec3 };

export const timing = rawTiming as unknown as Timing;
export const wordAt = wordClock(timing);
export const on = (base: Vec3, x = 0, y = 0, z = 0): Vec3 => [base[0] + x, base[1] + y, base[2] + z];

/**
 * 3 distinct grounded world zones separated cleanly so no set overlaps another:
 *   - red:    Red Village street & Sam's local sword stall / Maya's bakery
 *   - bridge: Sunlit oak river crossing between Red Village (west) and Blue Village (east)
 *   - blue:   Blue Village craft plaza & Alex's 5-emerald sword workshop
 */
export const PLACE = {
  red: [0, 0, 0] as Vec3,
  bridge: [0, 0, 88] as Vec3,
  blue: [0, 0, 176] as Vec3,
};

/** Exact shared seamless-loop camera for Frame 0 (`1.hook`) and closing loop (`5.loop`). */
export const LOOP_CAM = cam.sweep({
  on: on(PLACE.bridge, 0, 1.5, 0),
  dist: 7.4,
  distTo: 6.0,
  fromYaw: -22,
  toYaw: 16,
  pitch: 9,
  fov: 46,
});

/** Iconic Minecraft voxel Diamond Sword prop (floating display or held trade item). */
export const DiamondSword: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Pommel & leather grip */}
    <Block position={[0, -0.34, 0]} size={[0.14, 0.14, 0.08]} color="#3ad4d8" />
    <Block position={[0, -0.18, 0]} size={[0.09, 0.22, 0.07]} color="#5e3b22" />
    {/* Gold/teal crossguard */}
    <Block position={[0, -0.02, 0]} size={[0.42, 0.1, 0.09]} color="#258f9c" />
    <Block position={[0, -0.02, 0]} size={[0.3, 0.08, 0.11]} color="#57f2f2" castShadow={false} />
    {/* Stepped diamond blade */}
    <Block position={[0, 0.36, 0]} size={[0.16, 0.68, 0.06]} color="#48e8ef" emissive="#25b8c7" emissiveIntensity={0.25} />
    <Block position={[0, 0.36, 0]} size={[0.07, 0.62, 0.075]} color="#b8ffff" castShadow={false} />
    <Block position={[0, 0.74, 0]} size={[0.11, 0.12, 0.06]} color="#6ff6ff" emissive="#36d4e0" emissiveIntensity={0.3} />
    <Glow position={[0, 0.35, 0]} size={0.85} color="#4ceeff" opacity={0.22} />
  </group>
);

/**
 * Animated Border Tariff Toll Gate spanning the bridge:
 * `drop` (0 = raised open, 1 = slammed down across the road).
 */
export const TariffGate: React.FC<{
  position?: Vec3;
  rotationY?: number;
  drop?: number;
  accent?: string;
  label?: string;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  drop = 1,
  accent = "#d63228",
  label = "+10 TARIFF",
}) => {
  const k = clamp01(drop);
  const armAngle = (1 - k) * 1.25;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Twin stone toll posts */}
      <Vox kind="stoneBrick" position={[-2.2, 1.4, 0]} size={[0.65, 2.8, 0.65]} />
      <Vox kind="stoneBrick" position={[2.2, 1.4, 0]} size={[0.65, 2.8, 0.65]} />
      <Block position={[-2.2, 2.9, 0]} size={[0.78, 0.22, 0.78]} color={accent} />
      <Block position={[2.2, 2.9, 0]} size={[0.78, 0.22, 0.78]} color={accent} />
      {/* Overhead customs lintel + bold billboard */}
      <Vox kind="darkPlanks" position={[0, 2.8, 0]} size={[5.1, 0.36, 0.52]} />
      <StoneBillboard
        text={label}
        position={[0, 3.62, 0.12]}
        width={3.6}
        height={0.95}
        bgColor={accent}
        textColor="#fff8e8"
      />
      {/* Striped barrier arm pivoting from left post */}
      <group position={[-1.95, 1.25, 0]} rotation={[0, 0, armAngle]}>
        {Array.from({ length: 8 }, (_, i) => (
          <Block
            key={i}
            position={[0.3 + i * 0.48, 0, 0]}
            size={[0.48, 0.22, 0.18]}
            color={i % 2 === 0 ? accent : "#f5f2e6"}
          />
        ))}
      </group>
      {/* Customs tax booth desk beside right post */}
      <Block position={[2.2, 0.5, 0.85]} size={[0.95, 1.0, 0.75]} map={plankTex("#8c6036")} />
      <Block position={[2.2, 1.04, 0.85]} size={[1.05, 0.08, 0.85]} color={accent} />
    </group>
  );
};

/** Custom Sword Shop Stall (uses Explainer ShopStall counter/PriceBillboard + spinning DiamondSword). */
export const SwordShop: React.FC<{
  price: string | number;
  position?: Vec3;
  rotationY?: number;
  t?: number;
  bannerColor?: string;
}> = ({ price, position = [0, 0, 0], rotationY = 0, t = 0, bannerColor = "#b5332a" }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <ShopStall price={price} showPickaxe={false} t={t} />
    <DiamondSword position={[0, 1.5 + Math.sin(t * 3.2) * 0.07, 0.65]} rotation={[0, t * 1.5, 0.18]} scale={0.85} />
    <BannerFlag position={[-1.55, 1.6, -0.5]} color={bannerColor} trim="#f0c232" emblem="gem" width={0.62} height={1.4} />
    <BannerFlag position={[1.55, 1.6, -0.5]} color={bannerColor} trim="#f0c232" emblem="gem" width={0.62} height={1.4} />
  </group>
);

/** Reusable Peak Climax Stage helper shared by Frame 0 (`1.hook`) and Loop Close (`5.loop`). */
export function loopClimaxStage(t: number, slamAt = 0.2): React.ReactNode {
  const drop = ease(ramp(t, slamAt, slamAt + 0.45));
  const price = drop > 0.5 ? 15 : 5;
  return (
    <>
      <TariffGate position={on(PLACE.bridge, 0, 0, -1.8)} drop={drop} accent="#d63228" label="+10 TARIFF" />
      <SwordShop price={price} position={on(PLACE.bridge, 0, 0, 1.8)} t={t} bannerColor="#27549c" />
      <CitizenLead variant="leo" position={on(PLACE.bridge, -1.9, 0, 2.2)} rotationY={0.55} animation="panic" face="wow" time={t} />
      <EliteLead variant="pres" position={on(PLACE.bridge, 2.0, 0, 0.4)} rotationY={-0.45} animation="point" face="grin" time={t} />
    </>
  );
}
