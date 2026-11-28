import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  Block,
  ClockTower,
  GlassJarWing,
  LavaFountain,
  MuddyPigPen,
  PLACE,
  PlainsVillageMap,
  Room,
  ShopStand,
  Sign,
  TotemOfUndying,
  Vox,
  Water,
} from "./kit";

/**
 * 4-Zone World for "In This Town, Everyone Got One Extra Life — Except Me":
 * - `village`: Sunlit Plains Village + Clocktower + Lava Fountain + School ledge
 * - `home`: Warm indoor Room with wooden staircase & Glass Jar shelf
 * - `shop`: Mr. Vex's shiny Totem Shop + emerald vault + back shed puddle
 * - `canyon`: 40-block Cliff Jump ridge + stone canyon floor + Muddy Pig Pen
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: SUNLIT PLAINS VILLAGE + CLOCKTOWER + LAVA FOUNTAIN */}
    <Zone name="village">
      <group position={PLACE.village}>
        <PlainsVillageMap position={[0, 0, 0]} />
        <ClockTower position={[0, 0, -10.5]} />
        <LavaFountain position={[9.2, 0, 2.5]} />
        <GodRay position={[0, 5.5, -4.0]} width={3.6} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.02, 1.5]} width={7} depth={7} color="#ffeab3" opacity={0.14} />
        <Glow position={[9.2, 1.0, 2.5]} size={1.6} color="#ff7a29" opacity={0.28} />
        <Dust count={48} position={[0, 2.5, 0]} area={[16, 5, 16]} color="#fff3d6" opacity={0.35} />
        {/* 2nd-story schoolhouse facade with wooden stairs beside it */}
        <group position={[-10.5, 0, 3.0]}>
          <Vox kind="bricks" position={[0, 3.0, 0]} size={[6.0, 6.0, 4.4]} />
          <Block position={[0, 4.2, 2.25]} size={[1.8, 1.6, 0.1]} color="#202836" />
          <Sign title="SCHOOL" position={[0, 5.45, 2.25]} width={2.8} height={0.62} />
          {/* Wooden outdoor stairs along right side */}
          {[0, 1, 2, 3, 4].map((s) => (
            <Vox key={s} kind="planks" position={[3.6, 0.25 + s * 0.5, 2.0 - s * 0.7]} size={[1.2, 0.5, 0.7]} />
          ))}
        </group>
      </group>
    </Zone>

    {/* ZONE 2: WARM HOME INTERIOR WITH STAIRS & GLASS JAR SHELF */}
    <Zone name="home">
      <group position={PLACE.home}>
        <Room at={[0, 0, 0]} night={false} />
        {/* Wooden staircase along left wall */}
        {[0, 1, 2, 3, 4].map((s) => (
          <Vox key={s} kind="planks" position={[-2.0, 0.25 + s * 0.5, 1.4 - s * 0.75]} size={[1.1, 0.5, 0.75]} />
        ))}
        {/* Oak shelf on back wall holding Dad's glass jar with cracked gold Totem wing */}
        <Vox kind="darkPlanks" position={[1.0, 1.7, -2.1]} size={[2.2, 0.14, 0.6]} />
        <GlassJarWing position={[1.0, 1.77, -2.1]} />
        <Glow position={[1.0, 2.0, -2.1]} size={0.75} color="#ffd859" opacity={0.25} />
        <LightPool position={[0.4, 0.02, 0.6]} width={4.2} depth={4.2} color="#ffdfb0" opacity={0.18} />
        {/* Dining table */}
        <Vox kind="planks" position={[0.4, 0.45, 0.6]} size={[2.2, 0.9, 1.2]} />
      </group>
    </Zone>

    {/* ZONE 3: MR. VEX'S TOTEM SHOP + EMERALD VAULT + BACK SHED PUDDLE */}
    <Zone name="shop">
      <group position={PLACE.shop}>
        <Vox kind="grass" position={[0, -0.25, 0]} size={[42, 0.5, 42]} />
        <Block position={[0, 0.02, 2.0]} size={[14.0, 0.04, 10.0]} color="#c9ba8e" />
        {/* Main Totem Shop Stand */}
        <ShopStand position={[0, 0, -2.2]} title="TOTEMS 50E" awningColor="#6b2896" itemColor="#f2c636" />
        <TotemOfUndying position={[-0.7, 1.12, -2.2]} scale={0.95} mode="gold" />
        <TotemOfUndying position={[0.7, 1.12, -2.2]} scale={0.95} mode="gold" />
        {/* Towering Emerald Vault beside shop */}
        <group position={[5.6, 0, -3.2]}>
          <Vox kind="stoneBrick" position={[0, 2.4, 0]} size={[4.2, 4.8, 3.6]} />
          <Block position={[0, 2.2, 1.85]} size={[2.2, 2.6, 0.1]} color="#25d963" emissive="#1cb850" emissiveIntensity={0.22} />
          <Sign title="50 EMERALDS" position={[0, 4.15, 1.85]} width={3.2} height={0.68} />
        </group>
        {/* Back shed + puddle where Leo discovers carved oak wood under the paint */}
        <group position={[-7.5, 0, -2.5]}>
          <Vox kind="darkPlanks" position={[0, 1.6, 0]} size={[4.6, 3.2, 3.8]} />
          <Block position={[0, 1.1, 1.95]} size={[1.4, 2.2, 0.1]} color="#291d14" />
          {/* Shallow rain puddle outside shed door */}
          <Water position={[0.2, 0.04, 3.2]} size={[2.8, 0.06, 2.2]} />
        </group>
      </group>
    </Zone>

    {/* ZONE 4: 40-BLOCK CANYON CLIFF + STONE FLOOR + MUDDY PIG PEN */}
    <Zone name="canyon">
      <group position={PLACE.canyon}>
        {/* Deep canyon stone floor (top y = 0.0) */}
        <Vox kind="stone" position={[0, -0.4, 0]} size={[54, 0.8, 54]} />
        {/* Towering 20m cliff wall rising cleanly on the -Z side (z from -18 to -6, top y = 20.0) */}
        <Vox kind="stone" position={[0, 9.75, -12.0]} size={[34.0, 19.5, 12.0]} />
        {/* Grass cliff top cap (bottom y = 19.5, top y = 20.0) */}
        <Vox kind="grass" position={[0, 19.75, -12.0]} size={[34.0, 0.5, 12.0]} />
        {/* Side canyon walls framing depth */}
        <Vox kind="stone" position={[-20.0, 8.0, 2.0]} size={[6.0, 16.0, 32.0]} />
        <Vox kind="stone" position={[20.0, 8.0, 2.0]} size={[6.0, 16.0, 32.0]} />
        {/* Cliff banner sign */}
        <Vox kind="darkPlanks" position={[-1.4, 20.72, -6.44]} size={[0.18, 1.44, 0.18]} />
        <Vox kind="darkPlanks" position={[1.4, 20.72, -6.44]} size={[0.18, 1.44, 0.18]} />
        <Sign title="CLIFF JUMP" position={[0, 21.8, -6.4]} width={3.6} height={0.76} />
        {/* Muddy Pig Pen on the canyon floor to the right for Mr. Vex's karma */}
        <MuddyPigPen position={[8.0, 0, 2.5]} />
      </group>
    </Zone>
  </>
);
