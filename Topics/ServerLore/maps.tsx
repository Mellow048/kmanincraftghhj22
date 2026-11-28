import React from "react";
import {
  Block,
  Clouds,
  Dust,
  Glow,
  GodRay,
  LightPool,
  SolidBox,
  Torch,
  Vox,
  Water,
} from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Hut, LampPost } from "../InThisTown/places";
import { CampfireProp, CraftingStation, ShopStand } from "../Shared/universal";

/**
 * SERVER LORE — 4 AUTHENTIC SMP SERVER MAPS (Zero Scoreboards, Zero Z-Fighting).
 * Modeled directly on the owner's 4 reference SMP server screenshots:
 * 1. <CherryCabinMap />      — Cherry blossom grove, dark-oak cabin, crafting table+chest, lilypad pond
 * 2. <TropicalIslandMap />   — Turquoise reef lagoon, sandy shore, thatched beach huts, bamboo & palms
 * 3. <CherryCampfireMap />   — Cozy cherry blossom canopy glade with glowing campfire, petals, & lanterns
 * 4. <SpawnHubMap />         — Grand medieval SMP spawn plaza with towering glowing emerald Beacon beam
 */

/** Pink Minecraft Cherry Blossom Tree with dark cherry bark & layered pink petals. */
const CherryTree: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Vox kind="darkPlanks" tint="#3b2128" position={[0, 2.1, 0]} size={[0.72, 4.2, 0.72]} />
    <Vox kind="darkPlanks" tint="#3b2128" position={[0.7, 3.3, 0]} rotation={[0, 0, -0.5]} size={[0.48, 1.8, 0.48]} />
    <Block position={[0.2, 4.5, 0]} size={[4.4, 1.3, 4.2]} color="#f2a8cb" />
    <Block position={[0.6, 5.4, 0.2]} size={[3.2, 0.9, 3.0]} color="#f9c2dd" />
    <Block position={[-1.4, 3.8, 1.2]} size={[1.2, 0.8, 1.2]} color="#e894bc" />
    <Block position={[1.8, 3.9, -1.0]} size={[1.1, 0.7, 1.1]} color="#f5b3d2" />
  </group>
);

/** Map 1: Cherry Blossom SMP Cabin & Pond (matches images (3).jpeg). */
export const CherryCabinMap: React.FC<{ position?: Vec3; night?: boolean }> = ({
  position = [0, 0, 0],
  night = false,
}) => (
  <group position={position}>
    <Vox kind="grass" tint="#6fa646" position={[0, -0.30, 0]} size={[72, 0.56, 72]} />
    {/* Warm curved dirt path (top at +0.02, zero z-fighting with grass at -0.02) */}
    <Vox kind="planks" tint="#c29c5c" position={[-1.8, -0.005, 3]} size={[3.6, 0.05, 42]} />
    {/* Cozy two-story dark-oak SMP timber cabin */}
    <Hut at={[5.6, 0, -4.5]} w={7.6} d={6.4} h={5.2} wall="darkPlanks" tint="#543822" roof="#2d1c12" turn={-Math.PI / 2} lit={night} windows={[-1.8, 1.8]} />
    <SolidBox name="cherry-cabin" position={[5.6, 2.6, -4.5]} size={[6.6, 5.2, 7.6]} />
    {/* Crafting table + double chest + torch by the path */}
    <CraftingStation position={[1.4, 0, 2.2]} rotationY={-0.3} />
    {/* Crystal lilypad pond on the right */}
    <Water position={[6.2, -0.05, 5.8]} size={[5.4, 0.08, 4.4]} />
    <Block position={[5.6, 0.015, 5.5]} size={[0.7, 0.04, 0.7]} color="#3a8f32" />
    <Block position={[6.8, 0.015, 6.4]} size={[0.55, 0.04, 0.55]} color="#43a339" />
    {/* Pink cherry blossom trees framing the grove */}
    <CherryTree position={[-6.8, 0, -5.5]} scale={1.15} />
    <CherryTree position={[-7.5, 0, 5.2]} scale={1.05} />
    <CherryTree position={[10.5, 0, -11.0]} scale={1.2} />
    <CherryTree position={[-1.5, 0, -13.5]} scale={1.1} />
    <LampPost position={[-4.2, 0, 0.5]} seed={1} />
    <LampPost position={[2.8, 0, -0.2]} seed={2} />
    <LightPool position={[0, 0.04, 0]} width={12} depth={26} color="#ffe7f2" opacity={0.18} />
    <GodRay position={[0, 6.8, -6]} width={5.8} height={13} color="#fff0f6" opacity={0.07} />
    <Dust position={[0, 2.6, 0]} area={[16, 5, 24]} count={52} size={0.06} color="#ffb8db" opacity={0.65} seed={17} speed={0.22} />
    <Clouds y={28} span={120} />
  </group>
);

/** Map 2: Tropical Island SMP Lagoon (matches images (4).jpeg). */
export const TropicalIslandMap: React.FC<{ position?: Vec3; night?: boolean }> = ({
  position = [0, 0, 0],
  night = false,
}) => (
  <group position={position}>
    {/* Crystal turquoise reef water */}
    <Water position={[0, -0.34, 0]} size={[86, 0.2, 86]} />
    {/* Sandy island terrace & elevated grass heart */}
    <Block position={[0, -0.22, -2]} size={[28, 0.44, 24]} color="#e8daa6" />
    <Vox kind="grass" tint="#6eb046" position={[0, 0.01, -4]} size={[20, 0.08, 16]} />
    {/* Wooden beach dock extending into the lagoon */}
    <Vox kind="planks" tint="#b58348" position={[0, 0.05, 11.5]} size={[3.6, 0.12, 9.0]} />
    <Vox kind="darkPlanks" position={[-1.5, 0.50, 15.2]} size={[0.24, 0.80, 0.24]} />
    <Vox kind="darkPlanks" position={[1.5, 0.50, 15.2]} size={[0.24, 0.80, 0.24]} />
    <Torch position={[-1.5, 0.90, 15.2]} />
    <Torch position={[1.5, 0.90, 15.2]} />
    {/* Thatched straw-roof beach huts */}
    <Hut at={[6.8, 0, -3.2]} w={5.8} d={5.2} h={3.8} wall="planks" tint="#9e6d3b" roof="#d8bd54" turn={-Math.PI / 2} lit={night} windows={[-1.2, 1.2]} />
    <Hut at={[-6.8, 0, -5.5]} w={5.4} d={4.8} h={3.6} wall="planks" tint="#8f6134" roof="#ccb049" turn={Math.PI / 2} lit={night} windows={[-1.0, 1.0]} />
    <SolidBox name="island-hut-R" position={[6.8, 1.9, -3.2]} size={[5.4, 3.8, 5.8]} />
    <SolidBox name="island-hut-L" position={[-6.8, 1.8, -5.5]} size={[5.0, 3.6, 5.4]} />
    {/* Cherry blossom tree on left shore + palm trees & tall bamboo */}
    <CherryTree position={[-9.5, 0, 3.2]} scale={1.05} />
    {[
      [10.2, 4.2], [9.5, -9.5], [-10.5, -10.0],
    ].map(([x, z], i) => (
      <group key={i} position={[x!, 0, z!]}>
        <Vox kind="planks" tint="#8a5e32" position={[0, 3.2, 0]} size={[0.55, 6.4, 0.55]} />
        <Block position={[0, 6.6, 0]} size={[3.6, 0.6, 0.9]} color="#3a8c38" />
        <Block position={[0, 6.66, 0]} size={[0.9, 0.52, 3.6]} color="#3a8c38" />
      </group>
    ))}
    {[-3.2, -2.4, 2.8, 3.5, 4.2].map((bx, i) => (
      <Block key={i} position={[bx, 2.4 + (i % 2) * 0.7, -10.5]} size={[0.24, 4.8 + (i % 2) * 1.4, 0.24]} color="#5ea832" />
    ))}
    <LightPool position={[0, 0.06, 0]} width={16} depth={22} color="#fff7d6" opacity={0.16} />
    <GodRay position={[0, 7.2, -4]} width={6.4} height={14} color="#fff8e0" opacity={0.08} />
    <Dust position={[0, 2.4, 0]} area={[16, 4, 20]} count={36} size={0.04} color="#fff8df" opacity={0.42} seed={23} speed={0.18} />
    <Clouds y={28} span={130} />
  </group>
);

/** Map 3: Cozy Cherry Grove Campfire Glade (matches images (5).jpeg). */
export const CherryCampfireMap: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Vox kind="grass" tint="#6ea644" position={[0, -0.30, 0]} size={[64, 0.56, 64]} />
    <Vox kind="planks" tint="#c29c5c" position={[1.8, -0.005, 2]} size={[3.4, 0.05, 36]} />
    {/* Central crackling campfire + wooden log benches */}
    <CampfireProp position={[-1.4, 0, 1.2]} />
    <Vox kind="darkPlanks" position={[-3.6, 0.42, 0.4]} size={[0.9, 0.84, 3.6]} />
    <Vox kind="darkPlanks" position={[-1.2, 0.42, -2.6]} size={[3.4, 0.84, 0.85]} />
    {/* Pink petal carpet scattered on grass (y = +0.025, zero z-fighting) */}
    {[
      [-0.2, 2.6], [-2.5, 3.2], [0.4, -0.8], [-3.2, -1.6], [3.6, 1.8], [-0.8, 4.2],
    ].map(([x, z], i) => (
      <Block key={i} position={[x!, 0.025, z!]} size={[0.85, 0.03, 0.85]} color="#f7c1dc" />
    ))}
    {/* Surrounding cherry blossom canopy */}
    <CherryTree position={[-5.4, 0, -4.5]} scale={1.25} />
    <CherryTree position={[5.6, 0, -3.5]} scale={1.25} />
    <CherryTree position={[-6.0, 0, 5.5]} scale={1.15} />
    <CherryTree position={[6.2, 0, 5.0]} scale={1.15} />
    <LampPost position={[3.6, 0, -1.2]} seed={5} />
    <LampPost position={[-4.4, 0, 3.8]} seed={6} />
    <GodRay position={[0, 6.2, -3]} width={5.2} height={12} color="#ffdcf0" opacity={0.09} />
    <Dust position={[0, 2.5, 0]} area={[14, 5, 18]} count={58} size={0.058} color="#ffb8db" opacity={0.68} seed={42} speed={0.22} />
  </group>
);

/** Map 4: Grand Medieval SMP Spawn Hub Plaza with Towering Beacon Beam (matches images (6).jpeg). */
export const SpawnHubMap: React.FC<{ position?: Vec3; night?: boolean }> = ({
  position = [0, 0, 0],
  night = false,
}) => (
  <group position={position}>
    <Vox kind="grass" position={[0, -0.30, 0]} size={[76, 0.56, 76]} />
    {/* Warm paved wooden/cobble spawn plaza (non-coplanar, zero z-fighting) */}
    <Vox kind="planks" tint="#b98a56" position={[0, -0.005, 0]} size={[18, 0.05, 34]} />
    <Vox kind="stoneBrick" position={[0, 0.02, -3]} size={[7.2, 0.05, 7.2]} />

    {/* Iconic central glowing emerald Beacon pyramid & skyward beam! */}
    <Block position={[0, 0.25, -3]} size={[2.8, 0.44, 2.8]} color="#d8dde4" />
    <Block position={[0, 0.93, -3]} size={[0.92, 0.92, 0.92]} color="#78f2c8" emissive="#45e8b0" emissiveIntensity={1.6} />
    <Block position={[0, 22.39, -3]} size={[0.38, 42, 0.38]} color="#42e88a" emissive="#36e07d" emissiveIntensity={2.2} opacity={0.78} transparent />
    <Glow position={[0, 1.2, -3]} size={2.0} color="#58f59d" opacity={0.5} />

    {/* Grand medieval brick/timber SMP hub buildings framing the plaza */}
    {[
      { at: [-11.5, 0, -10] as Vec3, wall: "bricks" as const, tint: "#b85c38", roof: "#4e281a", h: 6.2, turn: Math.PI / 2 },
      { at: [11.5, 0, -10] as Vec3, wall: "bricks" as const, tint: "#b05434", roof: "#3a2d28", h: 6.4, turn: -Math.PI / 2 },
      { at: [-11.5, 0, 3] as Vec3, wall: "planks" as const, tint: "#a87444", roof: "#5a321e", h: 5.4, turn: Math.PI / 2 },
      { at: [11.5, 0, 3] as Vec3, wall: "stoneBrick" as const, tint: "#959aa3", roof: "#4e2d1c", h: 5.6, turn: -Math.PI / 2 },
      { at: [0, 0, -19] as Vec3, wall: "bricks" as const, tint: "#c46238", roof: "#364d75", h: 7.2, turn: 0 },
    ].map((b, i) => (
      <React.Fragment key={i}>
        <Hut at={b.at} w={7.0} d={6.4} h={b.h} wall={b.wall} tint={b.tint} roof={b.roof} turn={b.turn} lit={night} windows={[-1.6, 1.6]} />
        <SolidBox name={`hub-bldg-${i}`} position={[b.at[0], b.h / 2, b.at[2]]} size={[6.8, b.h, 6.8]} />
      </React.Fragment>
    ))}

    {/* Market stall on left edge of plaza */}
    <ShopStand position={[-6.8, 0, 2.2]} rotationY={Math.PI / 2} title="SPAWN SHOP" awningColor="#2e7d32" itemColor="#ffd54f" />

    <LampPost position={[-6.2, 0, -6.5]} seed={1} />
    <LampPost position={[6.2, 0, -6.5]} seed={2} />
    <LampPost position={[-6.2, 0, 7.5]} seed={3} />
    <LampPost position={[6.2, 0, 7.5]} seed={4} />
    <LightPool position={[0, 0.05, -2]} width={16} depth={28} color={night ? "#ffd68a" : "#fff5db"} opacity={0.22} />
    <GodRay position={[0, 8.0, -6]} width={6.5} height={15} color="#fff2d0" opacity={0.08} />
    <Dust position={[0, 2.8, 0]} area={[18, 6, 30]} count={48} size={0.04} color="#fff6df" opacity={0.44} seed={55} speed={0.18} />
    <Clouds y={32} span={140} />
  </group>
);
