import React from "react";
import {
  Block,
  ClassroomRoom,
  Clouds,
  DeskSetup,
  Dust,
  Glow,
  GodRay,
  LightPool,
  Tree,
  VillageStreet,
  Vox,
  Zone,
  IRL_POS,
  SCHOOL_POS,
} from "./kit";

/**
 * Multi-angle ServerLore world:
 * - "server": 56m <VillageStreet /> SMP spawn avenue (ZERO scoreboards!).
 * - "irl": Maya's warm bedroom + gaming desk cutaway.
 * - "school": Classroom cutaway with chalkboard & desks.
 */
export const World: React.FC = () => (
  <>
    <Zone name="server">
      <VillageStreet />
      {/* Subtle stone inlay pad for the roadside spawn bench */}
      <Vox kind="stoneBrick" position={[-2.4, 0.015, 1.2]} size={[3.6, 0.05, 3.4]} />
      <Tree position={[-4.8, 0, -5.2]} height={4.4} />
      <Tree position={[5.1, 0, -4.6]} height={4.1} />
      <Tree position={[-5.2, 0, 8.8]} height={4.5} />
      <Tree position={[5.0, 0, 9.2]} height={4.2} />
      <LightPool position={[-2.4, 0.02, 1.2]} width={6.8} depth={6.8} color="#ffe399" opacity={0.22} />
      <Glow position={[-2.4, 2.2, 1.2]} size={1.8} color="#fff0c4" opacity={0.18} />
      <GodRay position={[0, 4.2, -1.5]} width={5.8} height={9.5} color="#fff2cc" opacity={0.14} />
      <Clouds y={26} span={110} />
      <Dust count={26} area={[18, 6, 26]} position={[0, 2.2, 2]} color="#fff5d6" />
    </Zone>

    <Zone name="irl">
      <group position={IRL_POS}>
      {/* Cozy bedroom walls & floor framing the desk (open +X/+Z side for cameras) */}
      <Vox kind="planks" tint="#7d5938" position={[0, -0.15, 0]} size={[14, 0.3, 12]} />
      <Block position={[0, 3.25, -3.4]} size={[14, 6.5, 0.35]} color="#2b4b68" />
      <Block position={[-4.8, 3.25, 1.5]} size={[0.35, 6.5, 12]} color="#233e57" />
      {/* Bedroom window letting in warm afternoon light */}
      <Block position={[-2.6, 2.3, -3.18]} size={[1.8, 1.4, 0.1]} color="#8fd4ff" emissive="#7ac8ff" emissiveIntensity={0.45} />
      <DeskSetup
        position={[0, 0, -1.8]}
        screenText="SPAWN SMP"
        screenColor="#5ce69a"
        clockText="4:00 PM"
        lampOn
      />
      </group>
    </Zone>

    <Zone name="school">
      <group position={SCHOOL_POS}>
        <ClassroomRoom position={[0, 0, 0]} boardText="MATH 101" />
        {/* Full classroom wall extensions so front/side sweeps never show outside sky */}
        <Block position={[-4.8, 3.0, 2.0]} size={[0.4, 6.0, 16]} color="#dbd3be" />
        <Block position={[0, 3.0, 5.4]} size={[12, 6.0, 0.4]} color="#e3dcc8" />
        <Block position={[0, 5.0, -4.4]} size={[12, 2.0, 0.4]} color="#e3dcc8" />
      </group>
    </Zone>
  </>
);
