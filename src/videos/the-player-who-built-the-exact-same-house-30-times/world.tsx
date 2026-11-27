import type React from "react";
import {
  BedroomSet,
  Block,
  Clouds,
  DeskSetup,
  Dust,
  Glow,
  GodRay,
  IRL_POS,
  LampPost,
  LightPool,
  OakCottage,
  SPAWN_POS,
  SolidBox,
  Torch,
  Tree,
  Vox,
  WOODS_POS,
  YellowFlower,
  Zone,
  on,
} from "./kit";

/**
 * Four persistent worlds with full cinematic atmosphere (GodRay, LightPool, Glow, Dust)
 * and Remaster v7 <SolidBox> collision / camera anti-clip at non-overlapping zone offsets:
 *  - "smp" ([0,0,0]): bright sunlit SMP valley with giant stone castles in the background & rows of identical OakCottages.
 *  - "woods" (WOODS_POS): atmospheric night oak forest with dark trees & winding path where Grandpa gets lost.
 *  - "irl" (IRL_POS): fully enclosed cozy real-world bedroom + PC desk cutaway (`DeskSetup` faces +Z; zero open-sky leaks!).
 *  - "spawn" (SPAWN_POS): sunlit Spawn Plaza with stone courtyard, flower-lined yellow paths, and Grandpa's rebuilt OakCottage.
 */
export const World: React.FC = () => (
  <>
    <Zone name="smp">
      <Vox kind="grass" side="dirt" position={[0, -0.5, 0]} size={[64, 1, 64]} />
      <Vox kind="cobble" position={[0, 0.01, 2.0]} size={[5.2, 0.04, 28]} />
      <group position={[-8.5, 0, -14.5]}>
        <Vox kind="stone" position={[0, 4.0, 0]} size={[8.0, 8.0, 6.0]} />
        <Vox kind="cobble" position={[-3.6, 5.5, 2.6]} size={[2.2, 11.0, 2.2]} />
        <Vox kind="cobble" position={[3.6, 5.5, 2.6]} size={[2.2, 11.0, 2.2]} />
        <Block position={[0, 3.0, 3.05]} size={[2.0, 3.2, 0.1]} color="#422a16" />
        <Block position={[-3.6, 11.5, 2.6]} size={[0.2, 1.8, 0.2]} color="#d4a026" />
        <Block position={[-2.9, 12.0, 2.6]} size={[1.2, 0.7, 0.08]} color="#2f66c4" />
      </group>
      <group position={[9.2, 0, -15.5]}>
        <Vox kind="bricks" position={[0, 3.5, 0]} size={[7.2, 7.0, 5.4]} />
        <Vox kind="stone" position={[0, 7.3, 0]} size={[7.8, 0.7, 6.0]} />
        <Block position={[-1.8, 4.2, 2.75]} size={[1.4, 1.6, 0.1]} color="#8fd4ff" />
        <Block position={[1.8, 4.2, 2.75]} size={[1.4, 1.6, 0.1]} color="#8fd4ff" />
      </group>
      <OakCottage position={[-6.2, 0, -4.5]} rotationY={Math.PI / 4} />
      <OakCottage position={[6.2, 0, -5.0]} rotationY={-Math.PI / 4} />
      <OakCottage position={[-6.5, 0, 3.5]} rotationY={Math.PI / 2} />
      <OakCottage position={[6.5, 0, 3.2]} rotationY={-Math.PI / 2} />
      <SolidBox name="smp-cottage-nw" position={[-6.2, 1.8, -4.5]} size={[3.6, 3.6, 3.6]} />
      <SolidBox name="smp-cottage-ne" position={[6.2, 1.8, -5.0]} size={[3.6, 3.6, 3.6]} />
      <SolidBox name="smp-cottage-sw" position={[-6.5, 1.8, 3.5]} size={[3.6, 3.6, 3.6]} />
      <SolidBox name="smp-cottage-se" position={[6.5, 1.8, 3.2]} size={[3.6, 3.6, 3.6]} />
      <Tree position={[-10.5, 0, -1.0]} height={5.2} />
      <Tree position={[10.5, 0, -0.5]} height={4.8} />
      <Tree position={[-9.5, 0, 9.5]} height={4.5} />
      <Tree position={[9.8, 0, 9.0]} height={5.0} />
      <Clouds y={25} />
      <GodRay position={[0.4, 6.4, 0.5]} rotation={[0.14, 0, -0.18]} width={4.2} height={11} color="#fff2c6" opacity={0.14} />
      <LightPool position={[0, 0.05, 1.5]} width={5.6} depth={5.6} color="#ffeba8" opacity={0.2} />
      <Glow position={[0, 2.2, -1.5]} size={2.0} color="#ffe399" opacity={0.22} />
      <Dust position={[0, 2.2, 1.0]} area={[11, 4, 14]} count={34} color="#fff3cf" opacity={0.34} />
    </Zone>

    <Zone name="woods">
      <group position={WOODS_POS}>
        <Vox kind="grass" tint="#2f4d2c" side="dirt" position={[0, -0.5, 0]} size={[64, 1, 64]} />
        <Vox kind="dirt" position={[0, 0.01, 0]} size={[3.6, 0.03, 36]} />
        {[
          [-5.2, -10], [5.4, -9], [-6.0, -3], [5.8, -2],
          [-5.5, 4], [5.6, 5], [-6.2, 11], [6.0, 10],
          [-9.5, -6], [9.5, -6], [-9.0, 2], [9.2, 3],
        ].map(([x, z], i) => (
          <Tree key={i} position={[x!, 0, z!]} height={4.8 + (i % 3) * 0.9} />
        ))}
        <LampPost position={[-4.2, 0, 6.5]} />
        <LampPost position={[4.2, 0, -6.5]} />
        <GodRay position={[-0.6, 6.0, 1.5]} rotation={[0.12, 0, -0.16]} width={3.2} height={10} color="#8fb8ff" opacity={0.1} />
        <LightPool position={[-3.2, 0.05, 6.5]} width={4.0} depth={4.0} color="#ffba63" opacity={0.32} />
        <LightPool position={[3.2, 0.05, -6.5]} width={4.0} depth={4.0} color="#ffba63" opacity={0.32} />
        <Glow position={[-4.2, 3.1, 6.5]} size={1.9} color="#ffc978" opacity={0.3} />
        <Dust position={[0, 1.8, 1.0]} area={[10, 3.8, 16]} count={30} color="#a4c8ff" opacity={0.28} />
      </group>
    </Zone>

    <Zone name="irl">
      <group position={IRL_POS}>
        {/* Full cozy bedroom shell extending behind BOTH BedroomSet and DeskSetup so zero sky/void leaks */}
        <Vox kind="planks" tint="#7c5938" position={[0.5, -0.16, 0.5]} size={[16, 0.3, 14]} />
        <Block position={[0.5, 3.1, -4.68]} size={[16, 6.5, 0.35]} color="#1f5378" />
        <Block position={[-5.75, 3.1, 0.5]} size={[0.35, 6.5, 14]} color="#184361" />
        <Block position={[6.5, 3.1, 0.5]} size={[0.35, 6.5, 14]} color="#184361" />
        {/* Warm evening framed bedroom window behind Grandpa's desk */}
        <group position={[3.3, 2.45, -4.46]}>
          <Block position={[0, 0, 0]} size={[2.0, 1.5, 0.08]} color="#ffd99c" emissive="#ffb966" emissiveIntensity={0.42} />
          <Block position={[0, 0.78, 0.04]} size={[2.22, 0.14, 0.12]} color="#5e3e22" />
          <Block position={[0, -0.78, 0.04]} size={[2.22, 0.14, 0.12]} color="#5e3e22" />
          <Block position={[-1.04, 0, 0.04]} size={[0.14, 1.66, 0.12]} color="#5e3e22" />
          <Block position={[1.04, 0, 0.04]} size={[0.14, 1.66, 0.12]} color="#5e3e22" />
          <Block position={[0, 0, 0.04]} size={[0.09, 1.52, 0.1]} color="#5e3e22" />
          <Block position={[0, 0, 0.04]} size={[2.02, 0.09, 0.1]} color="#5e3e22" />
        </group>
        <BedroomSet position={[-2.6, 0, -2.0]} clockText="09:45" />
        <DeskSetup position={[2.2, 0, -1.6]} screenText="GRANDPA JOINED" screenColor="#5ce075" clockText="09:45" lampOn />
        <LightPool position={[2.0, 0.04, -0.8]} width={3.6} depth={3.4} color="#ffd080" opacity={0.26} />
        <Glow position={[2.2, 1.4, -1.6]} size={1.8} color="#ffd488" opacity={0.28} />
        <Dust position={[0, 1.7, -1.0]} area={[7, 3.0, 5]} count={22} color="#ffe4b5" opacity={0.28} />
      </group>
      {/* Solid IRL bedroom walls for v7 camera anti-clip & actor pushback (open +Z for camera) */}
      <SolidBox name="irl-back" position={on(IRL_POS, 0.5, 3.1, -4.68)} size={[16, 6.5, 0.5]} />
      <SolidBox name="irl-left" position={on(IRL_POS, -5.75, 3.1, 0.5)} size={[0.5, 6.5, 14]} />
      <SolidBox name="irl-right" position={on(IRL_POS, 6.5, 3.1, 0.5)} size={[0.5, 6.5, 14]} />
    </Zone>

    <Zone name="spawn">
      <group position={SPAWN_POS}>
        <Vox kind="grass" side="dirt" position={[0, -0.5, 0]} size={[64, 1, 64]} />
        <Vox kind="stone" position={[0, 0.02, 2.5]} size={[10.5, 0.06, 22]} />
        <Vox kind="cobble" position={[0, 0.05, 4.5]} size={[4.2, 0.04, 18]} />
        <OakCottage position={[0, 0, -4.8]} rotationY={0} flower porchLodestone />
        {[-0.5, 1.2, 2.9, 4.6, 6.3, 8.0, 9.7].map((z, i) => (
          <group key={i}>
            <YellowFlower position={[-2.45, 0.05, z]} scale={1.1} glow={0.4} />
            <YellowFlower position={[2.45, 0.05, z]} scale={1.1} glow={0.4} />
          </group>
        ))}
        <LampPost position={[-4.5, 0, -1.5]} />
        <LampPost position={[4.5, 0, -1.5]} />
        <LampPost position={[-4.5, 0, 5.5]} />
        <LampPost position={[4.5, 0, 5.5]} />
        <Torch position={[-1.65, 2.0, -3.25]} light={3.2} />
        <Torch position={[1.65, 2.0, -3.25]} light={3.2} />
        <Tree position={[-7.5, 0, -5.0]} height={5.0} />
        <Tree position={[7.5, 0, -5.0]} height={5.2} />
        <Tree position={[-7.8, 0, 4.5]} height={4.6} />
        <Tree position={[7.8, 0, 4.5]} height={4.8} />
        <Clouds y={24} />
        <GodRay position={[0, 6.5, -2.5]} rotation={[0.14, 0, -0.16]} width={4.6} height={11} color="#fff2c2" opacity={0.16} />
        <LightPool position={[0, 0.08, -2.0]} width={6.0} depth={5.5} color="#ffe99c" opacity={0.28} />
        <Glow position={[0, 2.3, -3.2]} size={2.0} color="#ffe082" opacity={0.28} />
        <Dust position={[0, 2.1, 1.5]} area={[11, 4, 16]} count={38} color="#fff3c4" opacity={0.36} />
      </group>
      <SolidBox name="spawn-cottage" position={on(SPAWN_POS, 0, 1.8, -4.8)} size={[3.6, 3.6, 3.6]} />
    </Zone>
  </>
);
