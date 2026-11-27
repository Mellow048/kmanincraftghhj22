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

/**
 * Animated overflowing iron chest cascade: wide-open chest packed with iron ingots while
 * gleaming silver bars continuously spill, arc, tumble over the rim, and glint into floor piles!
 */
export const IronOverflow: React.FC<{
  position?: Vec3;
  t?: number;
  burst?: number;
  scale?: number;
}> = ({ position = [0, 0, 0], t = 0, burst = 1, scale = 1 }) => (
  <group position={position} scale={scale}>
    {/* Wide-open wooden chest filled to the brim with gleaming iron */}
    <Chest position={[0, 0, 0]} open={1} gold={1} kind="gold" />
    {/* Mounded gleaming silver iron core rising right out of the open chest rim */}
    <Block position={[0, 0.62, 0]} size={[0.76, 0.28, 0.58]} color="#dce4ee" metalness={0.65} roughness={0.22} />
    <Block position={[0, 0.78, 0.04]} size={[0.56, 0.22, 0.42]} color="#eef4fc" metalness={0.7} roughness={0.18} />
    {/* Continuously tumbling & spilling silver ingots arcing over all sides of the chest */}
    {Array.from({ length: 18 }, (_, i) => {
      const phase = ((t * 1.35 + i * 0.19) % 1) * burst;
      const angle = (i / 18) * Math.PI * 2 + 0.25;
      const dist = 0.22 + phase * 0.92;
      const y = 0.88 + Math.sin(phase * Math.PI) * 0.68 - phase * 0.76;
      const spin = t * 5 + i * 1.3;
      return (
        <group
          key={i}
          position={[Math.cos(angle) * dist, Math.max(0.08, y), Math.sin(angle) * dist]}
          rotation={[spin * 0.7, angle, spin * 0.5]}
        >
          <Block position={[0, 0, 0]} size={[0.26, 0.1, 0.12]} color={i % 2 === 0 ? "#e6eef8" : "#cfd9e6"} metalness={0.72} roughness={0.2} />
          <Block position={[0, 0.055, 0]} size={[0.2, 0.02, 0.08]} color="#ffffff" emissive="#d8ecff" emissiveIntensity={0.45} castShadow={false} />
        </group>
      );
    })}
    {/* Sparkling metallic glint cubes rising over the overflow */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const p = (t * 1.8 + i * 0.31) % 1;
      const ang = i * 1.15 + t;
      return (
        <Block
          key={`g${i}`}
          position={[Math.cos(ang) * 0.55, 0.85 + p * 0.9, Math.sin(ang) * 0.55]}
          size={[0.09, 0.09, 0.09]}
          color="#ffffff"
          emissive="#cce8ff"
          emissiveIntensity={1.2}
          opacity={1 - p}
          castShadow={false}
        />
      );
    })}
    {/* Growing piles of spilled silver ingots around the chest base */}
    <IngotStack position={[-0.78, 0.02, 0.55]} count={8} />
    <IngotStack position={[0.78, 0.02, 0.52]} count={8} />
    <IngotStack position={[0.05, 0.02, 0.86]} count={6} />
    <Glow position={[0, 0.85, 0.15]} size={1.7} color="#dcefff" opacity={0.34} />
  </group>
);

/**
 * Real crashing stock chart: baseline green bars (10, 18, 25) stand steady while the live 4th bar
 * STARTS tall & green at 25 and PLUMMETS downward to 6, shifting green -> amber -> red with live ticking readout!
 */
export const CrashChart: React.FC<{
  position?: Vec3;
  crash?: number;
}> = ({ position = [0, 0, 0], crash = 0 }) => {
  const c = clamp01(crash);
  const liveVal = Math.round(25 - c * 19); // ticks 25 -> 6!
  const liveH = 2.5 - c * 1.9; // drops from 2.5m down to 0.6m!
  const liveColor = c < 0.25 ? "#37c967" : c < 0.55 ? "#f2c12e" : c < 0.8 ? "#f06c28" : "#ff2e24";
  const staticBars = [
    { x: -1.5, h: 1.0, label: "10", color: "#37c967" },
    { x: -0.5, h: 1.75, label: "18", color: "#37c967" },
    { x: 0.5, h: 2.5, label: "25", color: "#4ef27c" },
  ];
  return (
    <group position={position}>
      {/* Stone base plinth */}
      <Vox kind="stoneBrick" position={[0, 0.08, 0]} size={[4.6, 0.16, 1.35]} />
      {staticBars.map((b) => (
        <group key={b.label} position={[b.x, 0.16, 0]}>
          <Block position={[0, b.h / 2, 0]} size={[0.68, b.h, 0.68]} color={b.color} />
          <FloatingNumber text={b.label} position={[0, b.h + 0.36, 0.08]} color="#f6f9fc" height={0.38} />
        </group>
      ))}
      {/* Live crashing 4th bar plunging from 25 -> 6! */}
      <group position={[1.5, 0.16, 0]}>
        {/* Ghost dashed peak marker showing where 25 USED to be! */}
        {c > 0.12 ? (
          <Block position={[0, 2.48, 0]} size={[0.72, 0.06, 0.72]} color="#ffffff" opacity={0.55} castShadow={false} />
        ) : null}
        <Block
          position={[0, liveH / 2, 0]}
          size={[0.72, liveH, 0.72]}
          color={liveColor}
          emissive={c > 0.75 ? "#ff2218" : "#000000"}
          emissiveIntensity={c > 0.75 ? 0.55 : 0}
        />
        <FloatingNumber
          text={`${liveVal}`}
          position={[0, liveH + 0.42, 0.1]}
          color={c > 0.5 ? "#ff4f42" : "#52f081"}
          height={0.56}
        />
        {c > 0.85 ? <Puffs position={[0, 0.35, 0.25]} color="#ff5c52" /> : null}
      </group>
    </group>
  );
};

/** Tall blocky dark-spruce pine tree for the Ironworkers' Mountain Market Town (zero visual overlap with Oak village!). */
export const SpruceTree: React.FC<{ position?: Vec3; height?: number }> = ({ position = [0, 0, 0], height = 6.2 }) => (
  <group position={position}>
    <Vox kind="log" tint="#4d321d" position={[0, height * 0.26, 0]} size={[0.58, height * 0.52, 0.58]} />
    <Block position={[0, height * 0.44, 0]} size={[2.6, 1.05, 2.6]} color="#254d39" />
    <Block position={[0, height * 0.62, 0]} size={[2.0, 1.0, 2.0]} color="#2b5a42" />
    <Block position={[0, height * 0.79, 0]} size={[1.35, 0.95, 1.35]} color="#31664b" />
    <Block position={[0, height * 0.95, 0]} size={[0.68, 0.75, 0.68]} color="#397556" />
  </group>
);

/** Distinct multi-story Stone-Brick & Birch Timbered Guild Townhouse for Ironworkers' Market Square. */
export const GuildTownhouse: React.FC<{
  position: Vec3;
  rotationY?: number;
  roofColor: string;
  awningColor: string;
  stories?: number;
}> = ({ position, rotationY = 0, roofColor, awningColor, stories = 2 }) => {
  const upperH = stories >= 2 ? 2.8 : 0;
  const roofY = 3.2 + upperH;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Ground floor: chiseled stone brick */}
      <Vox kind="stoneBrick" tint="#8a929e" position={[0, 1.6, 0]} size={[5.8, 3.2, 5.4]} />
      {/* Upper floor: bright birch timber framing with dark spruce corner beams */}
      {stories >= 2 ? (
        <group position={[0, 3.2, 0]}>
          <Vox kind="planks" tint="#e3d2b0" position={[0, 1.4, 0]} size={[6.0, 2.8, 5.6]} />
          {[-2.92, 2.92].map((x, i) => (
            <Block key={i} position={[x, 1.4, 2.75]} size={[0.24, 2.82, 0.24]} color="#4a311e" />
          ))}
          <Block position={[0, 0.08, 2.84]} size={[6.1, 0.22, 0.22]} color="#4a311e" />
          <Block position={[-1.45, 1.45, 2.83]} size={[1.1, 1.25, 0.08]} color="#8fd4ff" />
          <Block position={[1.45, 1.45, 2.83]} size={[1.1, 1.25, 0.08]} color="#8fd4ff" />
        </group>
      ) : null}
      {/* Stepped steep gable roof */}
      <Block position={[0, roofY + 0.32, 0]} size={[6.5, 0.64, 6.2]} color={roofColor} />
      <Block position={[0, roofY + 0.94, 0]} size={[5.3, 0.62, 5.1]} color={roofColor} />
      <Block position={[0, roofY + 1.5, 0]} size={[3.8, 0.56, 3.8]} color={roofColor} />
      {/* Ground-floor arched shop doorway + striped market canopy */}
      <Block position={[0, 1.18, 2.74]} size={[1.25, 2.25, 0.1]} color="#4d2f18" />
      <Block position={[-1.7, 1.65, 2.74]} size={[1.1, 1.05, 0.08]} color="#9ad9ff" />
      <Block position={[1.7, 1.65, 2.74]} size={[1.1, 1.05, 0.08]} color="#9ad9ff" />
      {[-2.1, -1.4, -0.7, 0, 0.7, 1.4, 2.1].map((x, i) => (
        <Block key={i} position={[x, 2.78, 3.35]} rotation={[0.22, 0, 0]} size={[0.7, 0.12, 1.35]} color={i % 2 === 0 ? awningColor : "#f7f1e3"} />
      ))}
    </group>
  );
};

/** Brand-new Ironworkers' Cobblestone & Terracotta Market Town (100% distinct from any wooden village!). */
export const IronworkersMarket: React.FC = () => (
  <group>
    {/* Alpine meadow base */}
    <Vox kind="grass" tint="#4d7d46" position={[0, -0.3, 0]} size={[76, 0.6, 86]} />
    {/* Cool stone-brick & cobble central trading boulevard + warm terracotta sidewalks */}
    <Vox kind="stone" tint="#929aa4" position={[0, 0.02, 0]} size={[6.8, 0.08, 62]} />
    <Vox kind="cobble" tint="#767e88" position={[0, 0.065, 0]} size={[2.2, 0.04, 60]} />
    <Vox kind="bricks" tint="#b86c52" position={[-4.5, 0.06, 0]} size={[2.2, 0.12, 62]} />
    <Vox kind="bricks" tint="#b86c52" position={[4.5, 0.06, 0]} size={[2.2, 0.12, 62]} />
    {/* Left side Guild Townhouses (2-story stone + cream birch timber, slate-teal & crimson roofs) */}
    <GuildTownhouse position={[-9.2, 0, -15]} rotationY={Math.PI / 2} roofColor="#264b5c" awningColor="#2eb85c" stories={2} />
    <GuildTownhouse position={[-9.2, 0, -3.5]} rotationY={Math.PI / 2} roofColor="#6e2c35" awningColor="#d94638" stories={2} />
    <GuildTownhouse position={[-9.2, 0, 9.5]} rotationY={Math.PI / 2} roofColor="#2c5947" awningColor="#2c7ab8" stories={2} />
    <SolidBox name="market-L0" position={[-9.2, 3.0, -15]} size={[5.8, 6.2, 6.2]} />
    <SolidBox name="market-L1" position={[-9.2, 3.0, -3.5]} size={[5.8, 6.2, 6.2]} />
    <SolidBox name="market-L2" position={[-9.2, 3.0, 9.5]} size={[5.8, 6.2, 6.2]} />
    {/* Right side Guild Townhouses (behind Sam's forge at z = 2) */}
    <GuildTownhouse position={[9.4, 0, -14]} rotationY={-Math.PI / 2} roofColor="#6e2c35" awningColor="#e0a82e" stories={2} />
    <GuildTownhouse position={[9.4, 0, -2.5]} rotationY={-Math.PI / 2} roofColor="#264b5c" awningColor="#2eb85c" stories={2} />
    <GuildTownhouse position={[9.4, 0, 11.5]} rotationY={-Math.PI / 2} roofColor="#3a3357" awningColor="#c94032" stories={2} />
    <SolidBox name="market-R0" position={[9.4, 3.0, -14]} size={[5.8, 6.2, 6.2]} />
    <SolidBox name="market-R1" position={[9.4, 3.0, -2.5]} size={[5.8, 6.2, 6.2]} />
    <SolidBox name="market-R2" position={[9.4, 3.0, 11.5]} size={[5.8, 6.2, 6.2]} />
    {/* Iconic background Stone Market Clocktower & Brick Foundry Smokestack on north horizon */}
    <group position={[0, 0, -24.5]}>
      <Vox kind="stoneBrick" tint="#7e8794" position={[0, 6.2, 0]} size={[4.6, 12.4, 4.6]} />
      <Block position={[0, 13.0, 0]} size={[5.2, 1.2, 5.2]} color="#264b5c" />
      <Block position={[0, 14.3, 0]} size={[3.4, 1.4, 3.4]} color="#264b5c" />
      <Block position={[0, 15.6, 0]} size={[1.4, 1.4, 1.4]} color="#eab93a" />
      {/* Clock face */}
      <Block position={[0, 9.6, 2.36]} size={[2.2, 2.2, 0.12]} color="#f7eed8" />
      <Block position={[0, 9.6, 2.44]} size={[0.14, 0.85, 0.08]} color="#1d2229" />
      <Block position={[0.32, 9.6, 2.44]} size={[0.68, 0.14, 0.08]} color="#1d2229" />
    </group>
    <group position={[7.4, 0, -22.5]}>
      <Vox kind="bricks" tint="#9e493b" position={[0, 5.4, 0]} size={[2.4, 10.8, 2.4]} />
      <Vox kind="stone" position={[0, 11.0, 0]} size={[2.8, 0.6, 2.8]} />
    </group>
    {/* Stone market fountain centerpiece down the north avenue */}
    <group position={[0, 0.06, -11.5]}>
      <Vox kind="stoneBrick" position={[0, 0.32, 0]} size={[3.4, 0.64, 3.4]} />
      <Block position={[0, 0.56, 0]} size={[2.6, 0.18, 2.6]} color="#3ca7e8" emissive="#2280c2" emissiveIntensity={0.22} />
      <Vox kind="stoneBrick" position={[0, 1.2, 0]} size={[0.75, 1.7, 0.75]} />
      <Block position={[0, 2.12, 0]} size={[0.42, 0.32, 0.42]} color="#68c6ff" opacity={0.85} />
    </group>
    {/* Tall spruce pines & craggy alpine stone ridges framing the horizon */}
    <SpruceTree position={[-5.4, 0, -21.5]} height={6.8} />
    <SpruceTree position={[5.6, 0, -19.5]} height={6.4} />
    <SpruceTree position={[-11.5, 0, -24.0]} height={7.6} />
    <SpruceTree position={[12.0, 0, -23.0]} height={7.2} />
    <Vox kind="stone" tint="#6f7885" position={[-12, 3.5, -34]} size={[18, 7.0, 9]} />
    <Vox kind="stone" tint="#7b8491" position={[11, 4.2, -36]} size={[20, 8.4, 10]} />
    <Vox kind="stone" tint="#8892a0" position={[0, 5.2, -39]} size={[16, 10.4, 8]} />
    <Block position={[0, 10.6, -39]} size={[13, 0.9, 6.5]} color="#f0f5fa" />
    {/* Emerald & gold market banners + outer lamps */}
    <BannerFlag position={[-4.8, 0, -7.8]} color="#2eb85c" trim="#ffd84d" />
    <BannerFlag position={[4.8, 0, -7.8]} color="#1d4d8f" trim="#ffd84d" />
    {[-14, -4, 8, 18].flatMap((z, zi) => [
      <LampPost key={`ML_${zi}`} position={[-4.8, 0, z]} />,
      <LampPost key={`MR_${zi}`} position={[4.8, 0, z]} />,
    ])}
  </group>
);
