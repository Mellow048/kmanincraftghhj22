import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
import { World as RaceWorld } from "../in-this-town-the-fastest-kid-wins/world";
import { Board, DESERT, END2, LINE2, RIVER, TABLE2, TREE } from "./kit";

/**
 * PART TWO'S WORLD is part one's world (same zones: village, room, forest, river, desert …) with four things added:
 *   river   the tree he hides behind, and the line stage two starts on, just before the first bridge
 *   desert  the camp where stage two ends: a line, a board, a tent, a table of water, a log to sit on
 * In every zone the track runs west to east along z = 2, and the camera lives south of it.
 */
const Line: React.FC<{ x: number }> = ({ x }) => (
  <>
    {Array.from({ length: 9 }, (_, i) => (
      <Block key={i} position={[x, 0.07, -0.2 + i * 0.55]} size={[0.5, 0.02, 0.275]} color={i % 2 ? "#15151a" : "#f4f4f4"} castShadow={false} />
    ))}
  </>
);
export const World: React.FC = () => (
  <>
    <RaceWorld />
    <Zone name="river">
      <Tree position={TREE} height={5.2} leaf="#4a9a36" />
      <group position={RIVER}>
        <Line x={LINE2} />
        <Board position={[LINE2 - 0.4, 0, -1.1]} text="STAGE 2" rotationY={0.2} scale={1.2} />
        <LightPool position={[LINE2 - 1, 0.08, 2]} width={8} depth={5} color="#fff8d0" opacity={0.14} />
      </group>
    </Zone>
    <Zone name="desert">
      <group position={DESERT}>
        <Line x={END2} />
        <LightPool position={[END2 + 4, 0.08, 1]} width={12} depth={7} color="#fff2c8" opacity={0.14} />
        <Glow position={[END2 + 4.5, 2.2, -1.6]} size={3} color="#ffd9a0" opacity={0.25} />
        <Dust position={[END2 + 3, 2.2, 1]} area={[20, 4, 10]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={41} speed={0.25} />
        {[-2.6, 2.6].map((dz) => (
          <Block key={dz} position={[END2, 2, 2 + dz]} size={[0.25, 4, 0.25]} color="#5c3f24" />
        ))}
        <Block position={[END2, 3.7, 2]} size={[0.1, 0.7, 5.3]} color="#f4f4f4" />
        {Array.from({ length: 10 }, (_, i) => (
          <Block key={i} position={[END2 - 0.06, 3.52 + (i % 2) * 0.35, -0.34 + i * 0.52]} size={[0.02, 0.35, 0.52]} color="#15151a" castShadow={false} />
        ))}
        <Board position={[END2 + 1.2, 0, -1.2]} text="REST HERE" rotationY={0.15} scale={1.2} />
        {/* a sun shade, a table of water under it, a log */}
        {[[-1.3, -0.7], [1.3, -0.7], [-1.3, 0.7], [1.3, 0.7]].map(([dx, dz], i) => (
          <Block key={i} position={[TABLE2[0] - DESERT[0] + dx, 1.25, TABLE2[2] - DESERT[2] + dz]} size={[0.1, 2.5, 0.1]} color="#5c3f24" />
        ))}
        <Block position={[TABLE2[0] - DESERT[0], 2.55, TABLE2[2] - DESERT[2]]} size={[3.1, 0.1, 1.9]} color="#d23a2e" />
        <Block position={[TABLE2[0] - DESERT[0], 2.61, TABLE2[2] - DESERT[2]]} size={[1.0, 0.02, 1.9]} color="#f4f0e4" castShadow={false} />
        <Vox kind="planks" position={[TABLE2[0] - DESERT[0], 0.8, TABLE2[2] - DESERT[2]]} size={[2, 0.1, 0.8]} />
        {[-0.85, 0.85].map((dx) => (
          <Block key={dx} position={[TABLE2[0] - DESERT[0] + dx, 0.4, TABLE2[2] - DESERT[2]]} size={[0.1, 0.8, 0.7]} color="#5c3f24" />
        ))}
        {[-0.7, -0.35, 0.35, 0.7].map((dx) => (
          <Block key={dx} position={[TABLE2[0] - DESERT[0] + dx, 0.92, TABLE2[2] - DESERT[2] - 0.15]} size={[0.1, 0.14, 0.1]} color="#f4f4f4" castShadow={false} />
        ))}
        <Vox kind="log" position={[END2 + 9, 0.22, -1.8]} size={[3, 0.45, 0.5]} />
        <GodRay position={[END2 + 4, 6.5, -2]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.07} />
      </group>
    </Zone>
  </>
);
