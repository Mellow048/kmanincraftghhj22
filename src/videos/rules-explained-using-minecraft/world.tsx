import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  Block,
  PLACE,
  SchoolCampusMap,
  Sign,
  Vox,
} from "./kit";

/**
 * 2-Zone World for "Rules, Explained Using Minecraft":
 * - `spawn`: Sunlit stone-brick SMP Spawn Plaza with towering pillars, emerald beacon, and central rule board mount
 * - `campus`: Open-roof SchoolCampusMap (real-world teacher & classroom bridge)
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: SUNLIT STONE-BRICK SPAWN PLAZA */}
    <Zone name="spawn">
      <group position={PLACE.spawn}>
        <Vox kind="grass" position={[0, -0.25, 0]} size={[52, 0.5, 52]} />
        {/* Stone-brick spawn plaza floor (thin slab, auto polygonOffset) */}
        <Block position={[0, 0.02, 0]} size={[18.0, 0.04, 18.0]} color="#9ca2aa" />
        {/* Background medieval spawn wall with two corner towers */}
        <Vox kind="stoneBrick" position={[0, 2.2, -7.2]} size={[14.0, 4.4, 1.2]} />
        <Vox kind="stoneBrick" position={[-7.8, 3.2, -7.2]} size={[2.4, 6.4, 2.4]} />
        <Vox kind="stoneBrick" position={[7.8, 3.2, -7.2]} size={[2.4, 6.4, 2.4]} />
        <Sign title="SERVER SPAWN" position={[0, 3.55, -6.55]} width={3.6} height={0.76} />
        <GodRay position={[0, 5.8, -1.5]} width={4.0} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.05, 0]} width={8.0} depth={8.0} color="#ffeab3" opacity={0.14} />
        <Glow position={[0, 3.2, -2.4]} size={1.6} color="#ffdd57" opacity={0.22} />
        <Dust count={40} position={[0, 2.2, 0]} area={[16, 4.5, 16]} color="#fff3d6" opacity={0.32} />
      </group>
    </Zone>

    {/* ZONE 2: OPEN-ROOF SCHOOL CAMPUS (REAL-WORLD TEACHER BRIDGE) */}
    <Zone name="campus">
      <group position={PLACE.campus}>
        <SchoolCampusMap position={[0, 0, 0]} />
        <LightPool position={[0, 0.08, 0]} width={7.0} depth={7.0} color="#ffeab3" opacity={0.14} />
      </group>
    </Zone>
  </>
);
