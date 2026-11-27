import type React from "react";
import {
  Block,
  Clouds,
  DeadBushStall,
  Dust,
  Fence,
  Glow,
  GodRay,
  LightPool,
  ROOM_POS,
  Room,
  SCHOOL_POS,
  SolidBox,
  Tree,
  VillageStreet,
  Vox,
  Zone,
  on,
} from "./kit";

/**
 * Four persistent worlds with full cinematic atmosphere (GodRay, LightPool, Glow, Dust)
 * and Remaster v7 <SolidBox> collision / camera anti-clip at non-overlapping zone offsets:
 *  - "town" ([0,0,0]): sunlit village street (v7 dirt path + outer ±4.7 lampposts + house SolidBoxes) + Dad's market stall.
 *  - "night" ([0,0,0]): lantern-lit midnight village street for the stealth Milk Bucket chase & reveal.
 *  - "room" (ROOM_POS): warm home dining room with oak dinner table, Dad's empty chair, and solid walls.
 *  - "school" (SCHOOL_POS): bright schoolyard lawn behind wooden oak fences with oak trees and brick schoolhouse.
 */
export const World: React.FC = () => (
  <>
    <Zone name="town">
      <VillageStreet night={false} />
      <Clouds y={24} />
      <DeadBushStall position={[2.65, 0, 5.2]} rotationY={-Math.PI / 2} />
      {/* Sunbeams & drifting golden dust across the village road */}
      <GodRay position={[0, 6.2, 4.0]} rotation={[0.14, 0, -0.18]} width={3.6} height={11} color="#fff1c4" opacity={0.14} />
      <GodRay position={[-1.4, 6.4, -7.0]} rotation={[0.12, 0, -0.2]} width={3.4} height={11} color="#ffebc2" opacity={0.12} />
      <LightPool position={[0.4, 0.04, 5.2]} width={4.8} depth={4.8} color="#ffe7a6" opacity={0.2} />
      <Glow position={[2.6, 2.2, 5.2]} size={1.9} color="#ffdfa0" opacity={0.24} />
      <Dust position={[0, 2.2, 1.0]} area={[10, 4, 18]} count={36} color="#fff3cf" opacity={0.35} />
    </Zone>

    <Zone name="night">
      <VillageStreet night />
      {/* Warm lantern ground pools & misty night dust (v7 VillageStreet lampposts at ±4.7 keep faces clear) */}
      <LightPool position={[-2.9, 0.04, 6.0]} width={4.4} depth={4.4} color="#ffb95a" opacity={0.34} />
      <LightPool position={[2.9, 0.04, 0.5]} width={4.4} depth={4.4} color="#ffb95a" opacity={0.34} />
      <LightPool position={[-2.9, 0.04, -4.5]} width={4.6} depth={4.6} color="#ffb95a" opacity={0.36} />
      <Glow position={[-4.5, 3.1, -3.0]} size={1.9} color="#ffc978" opacity={0.3} />
      <Glow position={[4.5, 3.1, 9.0]} size={1.8} color="#ffc978" opacity={0.28} />
      <Dust position={[0, 1.8, -2.0]} area={[9, 3.5, 16]} count={30} color="#9bc9ff" opacity={0.28} />
    </Zone>

    <Zone name="room">
      <group position={ROOM_POS}>
        <Room at={[0, 0, 0]} night />
        <Vox kind="planks" tint="#8c6034" position={[0, 0.74, -0.4]} size={[2.2, 0.08, 1.1]} />
        {[
          [-0.95, -0.82],
          [0.95, -0.82],
          [-0.95, 0.02],
          [0.95, 0.02],
        ].map(([x, z], i) => (
          <Vox key={i} kind="planks" tint="#6e4925" position={[x!, 0.36, z!]} size={[0.1, 0.72, 0.1]} />
        ))}
        <group position={[-1.45, 0, -0.4]}>
          <Vox kind="planks" tint="#7c5328" position={[0, 0.42, 0]} size={[0.5, 0.08, 0.5]} />
          <Vox kind="planks" tint="#7c5328" position={[-0.22, 0.78, 0]} size={[0.08, 0.72, 0.5]} />
        </group>
        <group position={[1.45, 0, -0.4]}>
          <Vox kind="planks" tint="#7c5328" position={[0, 0.42, 0]} size={[0.5, 0.08, 0.5]} />
          <Vox kind="planks" tint="#7c5328" position={[0.22, 0.78, 0]} size={[0.08, 0.72, 0.5]} />
        </group>
        <Block position={[-0.55, 0.84, -0.4]} size={[0.26, 0.1, 0.26]} color="#d8c3a5" />
        <Block position={[0.55, 0.84, -0.4]} size={[0.26, 0.1, 0.26]} color="#d8c3a5" />
        <Block position={[0, 0.88, -0.4]} size={[0.08, 0.2, 0.08]} color="#f5e6c8" />
        <Block position={[0, 1.02, -0.4]} size={[0.06, 0.08, 0.06]} color="#ffcf54" emissive="#ff9c2a" emissiveIntensity={1.5} />
        <Glow position={[0, 1.15, -0.4]} size={1.6} color="#ffba4d" opacity={0.3} />
        <LightPool position={[0, 0.04, -0.4]} width={3.6} depth={3.2} color="#ffc46b" opacity={0.28} />
        <Dust position={[0, 1.6, 0]} area={[4.5, 2.8, 5.5]} count={22} color="#ffe0a6" opacity={0.3} />
      </group>
      {/* Solid room walls for v7 camera anti-clip & actor pushback (open +Z for camera) */}
      <SolidBox name="room-back" position={on(ROOM_POS, 0, 2.0, -3.9)} size={[8.2, 4.2, 0.5]} />
      <SolidBox name="room-left" position={on(ROOM_POS, -4.1, 2.0, 0)} size={[0.5, 4.2, 8.2]} />
      <SolidBox name="room-right" position={on(ROOM_POS, 4.1, 2.0, 0)} size={[0.5, 4.2, 8.2]} />
    </Zone>

    <Zone name="school">
      <group position={SCHOOL_POS}>
        <Vox kind="grass" side="dirt" position={[0, -0.5, 0]} size={[48, 1, 48]} />
        <Vox kind="cobble" position={[0, 0.01, 4.5]} size={[6.5, 0.02, 16]} />
        <Vox kind="bricks" position={[0, 2.8, -8.5]} size={[14, 5.6, 4.2]} />
        <Vox kind="planks" position={[0, 5.85, -8.5]} size={[14.8, 0.6, 4.8]} />
        <Block position={[-4.2, 2.8, -6.35]} size={[2.0, 1.6, 0.12]} color="#9cd9ff" />
        <Block position={[4.2, 2.8, -6.35]} size={[2.0, 1.6, 0.12]} color="#9cd9ff" />
        <Block position={[0, 1.35, -6.35]} size={[1.5, 2.7, 0.14]} color="#7a4c24" />
        <Fence from={[-7, 0, -5.5]} to={[-7, 0, 8]} />
        <Fence from={[7, 0, -5.5]} to={[7, 0, 8]} />
        <Tree position={[-5.6, 0, -3.5]} height={4.5} />
        <Tree position={[5.6, 0, -3.2]} height={4.8} />
        <Tree position={[-6.2, 0, 4.5]} height={4.0} />
        <Tree position={[6.0, 0, 4.2]} height={4.2} />
        <Clouds y={22} />
        <GodRay position={[0.8, 6.0, 0.5]} rotation={[0.14, 0, -0.18]} width={3.6} height={10} color="#fff1c4" opacity={0.14} />
        <LightPool position={[0, 0.04, 0.5]} width={5.0} depth={5.0} color="#ffeaa8" opacity={0.18} />
        <Dust position={[0, 2.0, 0.5]} area={[9, 3.5, 9]} count={26} color="#fff2cc" opacity={0.32} />
      </group>
      <SolidBox name="school-building" position={on(SCHOOL_POS, 0, 2.8, -8.5)} size={[14.2, 5.8, 4.4]} />
    </Zone>
  </>
);
