import React from "react";
import {
  Block,
  Dust,
  GodRay,
  LightPool,
  SolidBox,
  Torch,
  Tree,
  Vox,
  Water,
} from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Bell, Hut, LampPost, Well } from "./places";

/**
 * IN THIS TOWN — ADDITIONAL BIOME VILLAGE MAPS (Zero Z-Fighting + Auto-SolidBox).
 * Stops every InThisTown short from recycling the exact same street!
 * 1. <VillageStreet />       (classic reference avenue, in places.tsx)
 * 2. <PlainsVillageMap />    (authentic Minecraft Plains Village: town well, wheat farms, bell, oak cottages)
 * 3. <DarkOakVillageMap />   (authentic Minecraft Dark Oak Forest Village: 2x2 dark oaks, giant mushrooms, mossy timber huts)
 */

/** Authentic Minecraft Plains Village: central stone well, fenced wheat farms, bell post, dirt crossroads, oak huts. */
export const PlainsVillageMap: React.FC<{ position?: Vec3; night?: boolean }> = ({
  position = [0, 0, 0],
  night = false,
}) => (
  <group position={position}>
    {/* Non-coplanar grass base (top at y = -0.02) & warm dirt-path crossroads (top at y = +0.02) */}
    <Vox kind="grass" position={[0, -0.30, 0]} size={[72, 0.56, 72]} />
    <Vox kind="planks" tint="#bfa065" position={[0, -0.005, 0]} size={[5.2, 0.05, 56]} />
    <Vox kind="planks" tint="#bfa065" position={[-14.62, -0.005, 2]} size={[24.0, 0.05, 4.6]} />
    <Vox kind="planks" tint="#bfa065" position={[14.62, -0.005, 2]} size={[24.0, 0.05, 4.6]} />

    {/* Central cobblestone village well & meeting bell */}
    <Well position={[-3.2, 0, -2.5]} roof />
    <Bell position={[3.2, 0, -1.8]} />
    <SolidBox name="plains-well" position={[-3.2, 1.0, -2.5]} size={[2.2, 2.0, 2.2]} blocksCamera={false} />

    {/* Authentic Minecraft irrigated wheat farm plots */}
    {[-1, 1].map((side) => (
      <group key={side} position={[side * 8.2, 0, 9.5]}>
        <Vox kind="darkPlanks" position={[0, 0.24, 0]} size={[6.4, 0.48, 5.4]} />
        <Block position={[0, 0.50, 0]} size={[5.8, 0.08, 4.8]} color="#5c3d24" />
        <Water position={[0, 0.54, 0]} size={[5.6, 0.06, 0.7]} />
        {[-1.5, 1.5].map((rz) => (
          <Block key={rz} position={[0, 0.78, rz]} size={[5.4, 0.52, 1.3]} color="#d8b648" />
        ))}
      </group>
    ))}

    {/* Varied Minecraft Plains oak & cobblestone villager houses */}
    {[
      { at: [-9.2, 0, -10] as Vec3, wall: "planks" as const, tint: "#c79a5b", roof: "#6e4b2a", turn: Math.PI / 2 },
      { at: [9.4, 0, -9] as Vec3, wall: "cobble" as const, tint: "#999c9e", roof: "#5c3d24", turn: -Math.PI / 2 },
      { at: [-10.5, 0, 1.8] as Vec3, wall: "planks" as const, tint: "#d2ab6e", roof: "#4f3620", turn: Math.PI / 2 },
      { at: [10.5, 0, 2.4] as Vec3, wall: "stoneBrick" as const, tint: "#a4a8ad", roof: "#664024", turn: -Math.PI / 2 },
      { at: [0, 0, -17.5] as Vec3, wall: "planks" as const, tint: "#c49454", roof: "#5a391e", turn: 0 },
    ].map((h, i) => (
      <React.Fragment key={i}>
        <Hut at={h.at} w={6.2} d={5.6} h={4.0} wall={h.wall} tint={h.tint} roof={h.roof} turn={h.turn} lit={night} windows={[-1.4, 1.4]} />
        <SolidBox name={`plains-hut-${i}`} position={[h.at[0], 2.0, h.at[2]]} size={[6.0, 4.0, 6.0]} />
      </React.Fragment>
    ))}

    {/* Oak trees & street lamps */}
    <Tree position={[-6.5, 0, -16]} height={4.6} />
    <Tree position={[7.2, 0, -15.5]} height={4.9} />
    <Tree position={[-14.5, 0, 14]} height={5.1} />
    <Tree position={[14.5, 0, 14]} height={4.7} />
    <LampPost position={[-4.2, 0, 5.5]} seed={1} />
    <LampPost position={[4.2, 0, 5.5]} seed={2} />
    <LampPost position={[-4.2, 0, -7.5]} seed={3} />
    <LampPost position={[4.2, 0, -7.5]} seed={4} />

    <LightPool position={[0, 0.04, 0]} width={14} depth={36} color={night ? "#ffd68a" : "#fff7dc"} opacity={night ? 0.24 : 0.14} />
    <GodRay position={[0, 7.0, -8]} width={6.0} height={13} color="#fff3d4" opacity={night ? 0.04 : 0.08} />
    <Dust position={[0, 2.4, 0]} area={[16, 5, 32]} count={40} size={0.036} color="#fff7df" opacity={0.4} seed={19} speed={0.16} />
  </group>
);

/** Thick 2x2 Minecraft Dark Oak Tree with broad shadowy canopy. */
const ThickDarkOak: React.FC<{ position: Vec3; height?: number }> = ({ position, height = 5.6 }) => (
  <group position={position}>
    <Vox kind="darkPlanks" tint="#3b2616" position={[0, height / 2, 0]} size={[1.35, height, 1.35]} />
    <Block position={[0, height + 0.4, 0]} size={[4.8, 1.6, 4.8]} color="#1e4018" />
    <Block position={[0, height + 1.5, 0]} size={[3.4, 1.1, 3.4]} color="#254c1e" />
  </group>
);

/** Giant Red or Brown Roofed-Forest Mushroom. */
const GiantMushroom: React.FC<{ position: Vec3; red?: boolean }> = ({ position, red = true }) => (
  <group position={position}>
    <Block position={[0, 1.2, 0]} size={[0.68, 2.4, 0.68]} color="#d8cfb8" />
    {red ? (
      <>
        <Block position={[0, 2.65, 0]} size={[2.2, 1.1, 2.2]} color="#c92e28" />
        <Block position={[-0.6, 2.85, 1.12]} size={[0.35, 0.35, 0.04]} color="#f5efe4" />
        <Block position={[0.55, 2.55, 1.12]} size={[0.35, 0.35, 0.04]} color="#f5efe4" />
      </>
    ) : (
      <Block position={[0, 2.5, 0]} size={[3.2, 0.52, 3.2]} color="#8f6845" />
    )}
  </group>
);

/** Authentic Minecraft Dark Oak Forest Village: thick 2x2 dark oaks, giant mushrooms, moody lantern cottages. */
export const DarkOakVillageMap: React.FC<{ position?: Vec3; night?: boolean }> = ({
  position = [0, 0, 0],
  night = true,
}) => (
  <group position={position}>
    {/* Rich dark-forest grass floor (top -0.02) & mossy podzol/dirt path (top +0.02) */}
    <Vox kind="grass" tint="#3d612a" position={[0, -0.30, 0]} size={[72, 0.56, 76]} />
    <Vox kind="planks" tint="#6e5034" position={[0, -0.005, 0]} size={[5.4, 0.05, 56]} />

    {/* Dark oak & mossy cobblestone forest cottages */}
    {[
      { at: [-8.6, 0, -10] as Vec3, wall: "darkPlanks" as const, tint: "#4a301d", roof: "#24170e", turn: Math.PI / 2 },
      { at: [8.6, 0, -8] as Vec3, wall: "cobble" as const, tint: "#6e7a69", roof: "#2b1c12", turn: -Math.PI / 2 },
      { at: [-8.6, 0, 5] as Vec3, wall: "cobble" as const, tint: "#6b7368", roof: "#24170e", turn: Math.PI / 2 },
      { at: [8.6, 0, 7] as Vec3, wall: "darkPlanks" as const, tint: "#523520", roof: "#2b1c12", turn: -Math.PI / 2 },
    ].map((h, i) => (
      <React.Fragment key={i}>
        <Hut at={h.at} w={6.2} d={5.8} h={4.2} wall={h.wall} tint={h.tint} roof={h.roof} turn={h.turn} lit={night} windows={[-1.4, 1.4]} />
        <SolidBox name={`darkoak-hut-${i}`} position={[h.at[0], 2.1, h.at[2]]} size={[6.0, 4.2, 6.0]} />
      </React.Fragment>
    ))}

    {/* Thick 2x2 Dark Oak trees framing the forest canopy */}
    {[
      [-6.8, -18], [6.8, -17], [-12.5, -2], [12.5, -1],
      [-7.2, 15], [7.2, 16], [-2.5, -23], [3.5, -22],
    ].map(([x, z], i) => (
      <ThickDarkOak key={i} position={[x!, 0, z!]} height={5.2 + (i % 3) * 0.7} />
    ))}

    {/* Signature Dark Oak Forest Giant Mushrooms */}
    <GiantMushroom position={[-4.8, 0, -15]} red />
    <GiantMushroom position={[5.2, 0, 12.5]} red={false} />
    <GiantMushroom position={[-5.4, 0, 11.5]} red />

    {/* Warm amber lanterns along the forest path */}
    {[-12, -2, 8].flatMap((z, i) => [
      <LampPost key={`DL${i}`} position={[-4.4, 0, z]} seed={i * 2 + 1} />,
      <LampPost key={`DR${i}`} position={[4.4, 0, z]} seed={i * 2 + 2} />,
    ])}
    <LampPost position={[-4.4, 0, -18]} seed={7} />
    <LampPost position={[4.4, 0, -18]} seed={8} />

    <LightPool position={[0, 0.04, 0]} width={12} depth={38} color="#ffc46b" opacity={0.22} />
    <GodRay position={[0, 6.5, -10]} width={5.5} height={13} color="#a8c0ff" opacity={0.07} />
    <Dust position={[0, 2.2, 0]} area={[14, 5, 34]} count={44} size={0.036} color="#ffe4a8" opacity={0.42} seed={31} speed={0.14} />
  </group>
);
