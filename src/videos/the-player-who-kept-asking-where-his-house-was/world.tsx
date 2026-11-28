import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  Block,
  ComputerRoomMap,
  PLACE,
  SpawnHubMap,
  Vox,
} from "./kit";

/**
 * 3-Zone World for "The Player Who Kept Asking Where His House Was":
 * - `smp`: Real SMP SpawnHubMap (medieval plaza + glowing emerald Beacon beam) + grass lane for Arthur's cottage
 * - `irl`: Warm lamp-lit IRL ComputerRoomMap with yellow sticky note taped to monitor
 * - `cabin`: Cozy wooden cottage interior where Owner opens Arthur's chest & reads his book
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: REAL SMP SPAWN HUB & ARTHUR'S LANE */}
    <Zone name="smp">
      <group position={PLACE.smp}>
        <SpawnHubMap position={[0, 0, -14]} />
        <Vox kind="grass" position={[0, -0.25, 8]} size={[42, 0.5, 28]} />
        <Block position={[0, 0.02, 4]} size={[3.0, 0.04, 16.0]} color="#c9ba8e" />
        <GodRay position={[0, 6.0, 2.0]} width={3.8} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.05, 4.0]} width={7} depth={7} color="#ffeab3" opacity={0.14} />
        <Glow position={[0, 3.0, -8.0]} size={1.6} color="#55ff88" opacity={0.24} />
        <Dust count={38} position={[0, 2.2, 4.0]} area={[16, 4.5, 16]} color="#fff3d6" opacity={0.3} />
      </group>
    </Zone>

    {/* ZONE 2: WARM IRL COMPUTER ROOM WITH YELLOW STICKY NOTE */}
    <Zone name="irl">
      <group position={PLACE.irl}>
        <ComputerRoomMap position={[0, 0, 0]} />
        {/* Yellow sticky note taped to corner of monitor */}
        <Block position={[0.45, 1.52, -2.56]} size={[0.24, 0.24, 0.02]} color="#ffe066" emissive="#ffd43b" emissiveIntensity={0.25} />
        <LightPool position={[0, 0.02, -1.2]} width={4.8} depth={4.8} color="#ffdfb0" opacity={0.18} />
      </group>
    </Zone>

    {/* ZONE 3: ARTHUR'S COZY COTTAGE INTERIOR */}
    <Zone name="cabin">
      <group position={PLACE.cabin}>
        <Vox kind="planks" position={[0, -0.15, 0]} size={[8.0, 0.3, 8.0]} />
        <Vox kind="planks" position={[0, 2.0, -3.85]} size={[8.0, 4.0, 0.3]} />
        <Vox kind="planks" position={[-3.85, 2.0, 0.15]} size={[0.3, 4.0, 7.7]} />
        <Vox kind="planks" position={[3.85, 2.0, 0.15]} size={[0.3, 4.0, 7.7]} />
        {/* Cozy blue bed */}
        <Block position={[-2.2, 0.35, -2.5]} size={[1.4, 0.5, 2.2]} color="#228be6" />
        <Block position={[-2.2, 0.64, -3.2]} size={[1.2, 0.14, 0.6]} color="#f8f9fa" />
        <LightPool position={[0, 0.02, -1.5]} width={4.5} depth={4.5} color="#ffdfb0" opacity={0.2} />
      </group>
    </Zone>
  </>
);
