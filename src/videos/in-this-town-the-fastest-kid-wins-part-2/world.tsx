import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
import { World as RaceWorld } from "../in-this-town-the-fastest-kid-wins/world";
import { Board, DESERT, END2, LINE2, RIVER, ROBE, TABLE2, TREE, Villager } from "./kit";

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
/** A number from a seed, 0–1, the same every frame. */
const rnd = (n: number): number => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};
/** A cactus with arms; one in three has a pink flower on top. */
const Cactus: React.FC<{ position: [number, number, number]; h?: number; flower?: boolean; flip?: boolean }> = ({ position, h = 2.4, flower = false, flip = false }) => (
  <group position={position} scale={[flip ? -1 : 1, 1, 1]}>
    <Block position={[0, h / 2, 0]} size={[0.6, h, 0.6]} color="#4f8f3a" />
    <Block position={[0.5, h * 0.55, 0]} size={[0.5, 0.3, 0.3]} color="#4f8f3a" />
    <Block position={[0.65, h * 0.74, 0]} size={[0.3, 0.7, 0.3]} color="#4f8f3a" />
    <Block position={[-0.45, h * 0.38, 0]} size={[0.4, 0.3, 0.3]} color="#478236" />
    <Block position={[-0.55, h * 0.52, 0]} size={[0.3, 0.5, 0.3]} color="#478236" />
    {flower ? <Block position={[0, h + 0.1, 0]} size={[0.3, 0.2, 0.3]} color="#ff7ab0" castShadow={false} /> : null}
  </group>
);
/** Red rock in bands: a mesa. `w` wide, `h` high, `d` deep. */
const Mesa: React.FC<{ position: [number, number, number]; w: number; h: number; d?: number }> = ({ position, w, h, d = 6 }) => (
  <group position={position}>
    <Vox kind="sand" tint="#d9a05a" position={[0, h * 0.25, 0]} size={[w, h * 0.5, d]} />
    <Vox kind="sand" tint="#c98a4a" position={[0.4, h * 0.6, 0]} size={[w * 0.86, h * 0.2, d * 0.86]} />
    <Vox kind="sand" tint="#b8733c" position={[0.2, h * 0.8, 0]} size={[w * 0.74, h * 0.2, d * 0.74]} />
    <Vox kind="sand" tint="#d9a05a" position={[-0.3, h * 0.95, 0]} size={[w * 0.6, h * 0.1, d * 0.6]} />
    <Vox kind="sand" tint="#c98a4a" position={[w * 0.62, h * 0.18, d * 0.2]} size={[w * 0.3, h * 0.36, d * 0.5]} />
  </group>
);
/** A palm: a leaning trunk in rings, and six leaves. */
const Palm: React.FC<{ position: [number, number, number]; h?: number; lean?: number }> = ({ position, h = 4.2, lean = 0.12 }) => (
  <group position={position} rotation={[0, 0, lean]}>
    {Array.from({ length: 7 }, (_, i) => (
      <Block key={i} position={[0, (h / 7) * (i + 0.5), 0]} size={[0.34 - i * 0.015, h / 7, 0.34 - i * 0.015]} color={i % 2 ? "#8a6a3a" : "#7a5c30"} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <group key={i} position={[0, h, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
        <Block position={[0.7, 0.05, 0]} rotation={[0, 0, -0.25]} size={[1.4, 0.08, 0.5]} color="#3f8a35" />
        <Block position={[1.6, -0.28, 0]} rotation={[0, 0, -0.7]} size={[0.9, 0.08, 0.4]} color="#357a2c" />
      </group>
    ))}
    <Block position={[0.15, h - 0.2, 0.1]} size={[0.22, 0.22, 0.22]} color="#5c3f24" />
  </group>
);
/** A dead bush: dry sticks. */
const DeadBush: React.FC<{ position: [number, number, number]; s?: number }> = ({ position, s = 1 }) => (
  <group position={position} scale={s}>
    <Block position={[0, 0.2, 0]} size={[0.06, 0.4, 0.06]} color="#7a5c30" />
    <Block position={[0.14, 0.34, 0]} rotation={[0, 0, -0.8]} size={[0.05, 0.36, 0.05]} color="#8a6a3a" />
    <Block position={[-0.14, 0.3, 0.04]} rotation={[0, 0, 0.8]} size={[0.05, 0.32, 0.05]} color="#8a6a3a" />
    <Block position={[0, 0.3, 0.14]} rotation={[0.8, 0, 0]} size={[0.05, 0.3, 0.05]} color="#7a5c30" />
  </group>
);
/** A stake at the edge of the track with a little flag on it. */
const Flag: React.FC<{ position: [number, number, number]; color: string; h?: number }> = ({ position, color, h = 1.3 }) => (
  <group position={position}>
    <Block position={[0, h / 2, 0]} size={[0.07, h, 0.07]} color="#5c3f24" />
    <Block position={[0.2, h - 0.14, 0]} size={[0.36, 0.24, 0.03]} color={color} castShadow={false} />
  </group>
);
/** A striped tent in steps. */
const Tent2: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => (
  <group position={position}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Block key={i} position={[0, 0.25 + i * 0.5, 0]} size={[3 - i * 0.6, 0.5, 2.6 - i * 0.5]} color={i % 2 ? "#f4f0e4" : color} />
    ))}
    <Block position={[0, 0.7, 1.31]} size={[0.8, 1.4, 0.04]} color="#2a1c10" castShadow={false} />
    <Block position={[0, 2.75, 0]} size={[0.08, 0.6, 0.08]} color="#5c3f24" />
    <Block position={[0.2, 2.95, 0]} size={[0.36, 0.22, 0.03]} color={color} castShadow={false} />
  </group>
);
const FLAGS = ["#d23a2e", "#2f6fe0", "#f2c230", "#3f8a35"];
/**
 * WHAT PART TWO ADDS TO THE DESERT. Part one dressed it from x = -48 to 48 for a few seconds of film; stage two is run
 * in it for a minute. Tall things stand north of the track (z < -3) or far south (z > 16): the camera lives between.
 */
const DesertExtras: React.FC = () => (
  <>
    {/* the sun, and the heat */}
    <Glow position={[34, 30, -60]} size={22} color="#fff6c8" opacity={0.55} />
    <Glow position={[34, 30, -60]} size={44} color="#ffe9a0" opacity={0.18} />
    {[-52, -26, 0, 26, 52].map((x, i) => (
      <Dust key={x} position={[x, 1.4, 1]} area={[28, 2.6, 16]} count={70} size={0.05} color="#f4e2a8" opacity={0.55} seed={50 + i} speed={0.6} />
    ))}
    {[-38, -12, 18].map((x) => (
      <GodRay key={x} position={[x, 7, -4]} rotation={[0, 0, 0.5]} width={5} height={13} color="#fff0c8" opacity={0.06} />
    ))}
    {/* red rock: a near row and a far row, the whole length of the stage */}
    {([[-66, -15, 11, 7], [-52, -18, 13, 9], [-30, -17, 9, 5], [-6, -19, 10, 8], [18, -18, 9, 6], [42, -16, 12, 8], [58, -17, 10, 6], [70, -14, 9, 9]] as Array<[number, number, number, number]>).map(([x, z, w, h], i) => (
      <Mesa key={`m${i}`} position={[x, 0, z]} w={w} h={h} />
    ))}
    {([[-60, -30, 20, 13], [-34, -32, 16, 11], [-8, -31, 18, 14], [48, -30, 20, 12], [70, -32, 16, 15], [-58, 24, 16, 7], [-22, 26, 18, 8], [14, 25, 16, 6], [46, 26, 18, 9]] as Array<[number, number, number, number]>).map(([x, z, w, h], i) => (
      <Mesa key={`f${i}`} position={[x, 0, z]} w={w} h={h} d={9} />
    ))}
    {/* a rock arch by the track */}
    <group position={[-24, 0, -8]}>
      <Vox kind="sand" tint="#c98a4a" position={[-2.2, 2, 0]} size={[1.6, 4, 1.8]} />
      <Vox kind="sand" tint="#c98a4a" position={[2.2, 2, 0]} size={[1.6, 4, 1.8]} />
      <Vox kind="sand" tint="#b8733c" position={[0, 4.5, 0]} size={[6.4, 1.2, 1.8]} />
      <Vox kind="sand" tint="#d9a05a" position={[0.4, 5.4, 0]} size={[3.6, 0.7, 1.4]} />
    </group>
    {/* a second, smaller pyramid */}
    {[0, 1, 2, 3].map((i) => (
      <Vox key={`p2${i}`} kind="sand" tint="#e6cf86" position={[-38, 1.5 + i * 3, -46]} size={[20 - i * 5, 3, 20 - i * 5]} />
    ))}
    {/* an oasis: water, reeds, three palms */}
    <group position={[8, 0, -8.5]}>
      <Block position={[0, 0.03, 0]} size={[5.4, 0.06, 3.6]} color="#b8a25a" castShadow={false} />
      <Block position={[0, 0.07, 0]} size={[4.4, 0.05, 2.6]} color="#3f8fd0" emissive="#1c5a9a" emissiveIntensity={0.25} castShadow={false} />
      <Block position={[0.6, 0.1, 0.2]} size={[1.2, 0.02, 0.5]} color="#8fd0ff" castShadow={false} />
      <Palm position={[-2.4, 0, -0.9]} h={4.6} lean={0.14} />
      <Palm position={[2.3, 0, -1.2]} h={3.8} lean={-0.12} />
      <Palm position={[0.3, 0, -1.9]} h={5.2} lean={0.04} />
      {[-1.6, -1.2, 1.5, 1.9].map((x) => (
        <Block key={x} position={[x, 0.3, 1.2]} size={[0.06, 0.6, 0.06]} color="#5fae45" castShadow={false} />
      ))}
    </group>
    <Palm position={[-47, 0, -6]} h={4.4} lean={-0.1} />
    <Palm position={[33, 0, -9]} h={4.8} lean={0.1} />
    {/* cactus, both sides, all the way */}
    {Array.from({ length: 46 }, (_, i) => {
      const x = -72 + i * 3.2 + rnd(i) * 1.6;
      const north = i % 3 !== 2;
      const z = north ? -3.2 - rnd(i + 40) * 8 : 15.5 + rnd(i + 40) * 5;
      if (x > END2 - 3 && x < END2 + 12 && north) return null;
      if (Math.abs(x - 8) < 4 && north) return null;
      return <Cactus key={`c${i}`} position={[x, 0, z]} h={1.6 + rnd(i + 80) * 1.8} flower={i % 3 === 0} flip={i % 2 === 0} />;
    })}
    {/* low things by the track: dry bushes, stones, bones */}
    {Array.from({ length: 70 }, (_, i) => {
      const x = -72 + i * 2.05 + rnd(i + 7) * 1.2;
      const z = i % 2 ? -1.2 - rnd(i + 200) * 5 : 5.2 + rnd(i + 200) * 7;
      if (x > END2 - 1 && x < END2 + 12 && z < 0) return null;
      const k = i % 4;
      if (k === 0) return <DeadBush key={`d${i}`} position={[x, 0, z]} s={0.9 + rnd(i) * 0.8} />;
      if (k === 1) return <Block key={`d${i}`} position={[x, 0.13, z]} rotation={[0, rnd(i) * 3, 0]} size={[0.5 + rnd(i) * 0.4, 0.26, 0.4]} color="#b98a52" />;
      if (k === 2) return <Block key={`d${i}`} position={[x, 0.07, z]} rotation={[0, rnd(i) * 3, 0]} size={[0.9, 0.14, 0.7]} color="#d9c78a" castShadow={false} />;
      return (
        <group key={`d${i}`} position={[x, 0, z]} rotation={[0, rnd(i) * 3, 0]}>
          <Block position={[0, 0.12, 0]} size={[0.3, 0.24, 0.3]} color="#efe9d8" />
          <Block position={[0.45, 0.05, 0.1]} size={[0.5, 0.08, 0.08]} color="#efe9d8" />
        </group>
      );
    })}
    {/* the edge of the track: stakes with flags, every eight metres */}
    {Array.from({ length: 17 }, (_, i) => {
      const x = -70 + i * 8;
      return x > END2 - 4 ? null : (
        <group key={`fl${i}`}>
          <Flag position={[x, 0, -0.55]} color={FLAGS[i % 4]} />
        </group>
      );
    })}
    <Board position={[-36, 0, -1.3]} text="NO SHADE" rotationY={0.2} scale={1.1} />
    <Board position={[28, 0, -1.3]} text="WATER 1 KM" rotationY={0.2} scale={1.1} />
    {/* the rest camp at the end of the stage: tents, flags, barrels, people */}
    <Tent2 position={[END2 + 3.2, 0, -6.4]} color="#d23a2e" />
    <Tent2 position={[END2 + 8.4, 0, -6.8]} color="#2f6fe0" />
    <Tent2 position={[END2 + 13.4, 0, -5.6]} color="#3f8a35" />
    {Array.from({ length: 12 }, (_, i) => (
      <Block key={`bu${i}`} position={[END2 + 0.05, 3.15 - Math.abs(((i + 0.5) / 12) * 2 - 1) * 0.1, -0.4 + i * 0.44]} size={[0.03, 0.3, 0.3]} color={FLAGS[i % 4]} castShadow={false} />
    ))}
    {[[2.4, -2.6], [2.9, -3.0], [11.2, -2.9]].map(([dx, dz], i) => (
      <group key={`ba${i}`} position={[END2 + dx, 0, dz]}>
        <Block position={[0, 0.4, 0]} size={[0.6, 0.8, 0.6]} color="#7a5632" />
        <Block position={[0, 0.2, 0]} size={[0.64, 0.08, 0.64]} color="#3a3d44" />
        <Block position={[0, 0.62, 0]} size={[0.64, 0.08, 0.64]} color="#3a3d44" />
      </group>
    ))}
    {[-4, 0, 9.5, 12].map((dx, i) => (
      <Flag key={`cf${i}`} position={[END2 + dx, 0, -3.6 - (i % 2)]} color={FLAGS[i]} h={2.6} />
    ))}
    <Villager position={[END2 - 1.6, 0, -1.4]} rotationY={0.5} robe={ROBE.farmer} />
    <Villager position={[END2 - 0.6, 0, -1.9]} rotationY={0.2} robe={ROBE.white} />
    <Villager position={[END2 + 2.2, 0, -2.2]} rotationY={0.1} robe={ROBE.brown} />
    <Villager position={[END2 + 14, 0, -2.6]} rotationY={-0.6} robe={ROBE.smith} />
    <Mesa position={[END2 + 6, 0, -15]} w={14} h={8} />
    <Palm position={[END2 + 16, 0, -3.4]} h={4.4} lean={0.1} />
    <Palm position={[END2 - 3, 0, -4.2]} h={4} lean={-0.1} />
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
        <DesertExtras />
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
