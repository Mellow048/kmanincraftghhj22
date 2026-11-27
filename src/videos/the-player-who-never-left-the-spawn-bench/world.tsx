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
      {/* Subtle stone inlay pad for the spawn bench plaza (centered at z=1.2) */}
      <Vox kind="stoneBrick" position={[0, 0.015, 1.2]} size={[5.6, 0.05, 4.4]} />
      <Tree position={[-4.8, 0, -5.2]} height={4.4} />
      <Tree position={[5.1, 0, -4.6]} height={4.1} />
      <Tree position={[-5.2, 0, 8.8]} height={4.5} />
      <Tree position={[5.0, 0, 9.2]} height={4.2} />
      <LightPool position={[0, 0.02, 1.2]} width={8.0} depth={8.0} color="#ffe399" opacity={0.22} />
      <Glow position={[0, 2.2, 1.2]} size={1.8} color="#fff0c4" opacity={0.18} />
      <GodRay position={[0, 4.2, -1.5]} width={5.8} height={9.5} color="#fff2cc" opacity={0.14} />
      <Clouds y={26} span={110} />
      <Dust count={26} area={[18, 6, 26]} position={[0, 2.2, 2]} color="#fff5d6" />
    </Zone>

    <Zone name="irl">
      <group position={IRL_POS}>
      {/* Cozy bedroom walls & floor framing the desk */}
      <Vox kind="planks" tint="#7d5938" position={[0, -0.15, 0]} size={[11, 0.3, 10]} />
      <Block position={[0, 2.2, -3.4]} size={[11, 4.4, 0.35]} color="#2b4b68" />
      <Block position={[-4.8, 2.2, 0.5]} size={[0.35, 4.4, 10]} color="#233e57" />
      <Block position={[4.8, 2.2, 0.5]} size={[0.35, 4.4, 10]} color="#233e57" />
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
      {/* Three classroom student desks */}
      {[-2.2, 0, 2.2].map((dx) => (
        <group key={dx} position={[dx, 0, -0.2]}>
          <Vox kind="planks" position={[0, 0.72, 0]} size={[1.15, 0.1, 0.72]} />
          <Vox kind="darkPlanks" position={[-0.48, 0.36, 0]} size={[0.1, 0.72, 0.62]} />
          <Vox kind="darkPlanks" position={[0.48, 0.36, 0]} size={[0.1, 0.72, 0.62]} />
        </group>
      ))}
      </group>
    </Zone>
  </>
);
