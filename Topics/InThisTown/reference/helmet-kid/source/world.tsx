import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Fence, ForestEdge, Hut, LampPost, LanternPost, Moon, Pine, Stars } from "../../../Topics/InThisTown";
import { Classroom } from "../../../Topics/WhatIf/school";
import { CLASS, EDGE, HOME, HTREE, LAMP, POOL, TABLE, WALL, WOODS, YARD } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   class   The classroom (the What If pack's). Nine desks: the teller and the new kid have the back row.
 *   yard    The school yard: the school to the north, a lunch table, a pool, the teller's house to the east,
 *           and the road west into the woods.
 *   woods   Night. A clearing with one old lamp, and the fat tree the teller hides behind, east of it.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const rnd = (i: number): number => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Grass tufts, flowers and stones, kept off the given rectangles [x0, x1, z0, z1] (zone coordinates). */
const Dress: React.FC<{ seed: number; n: number; x: [number, number]; z: [number, number]; avoid?: Array<[number, number, number, number]>; dark?: boolean }> = ({ seed, n, x, z, avoid = [], dark = false }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const px = x[0] + rnd(seed + i) * (x[1] - x[0]);
      const pz = z[0] + rnd(seed + i + 500) * (z[1] - z[0]);
      if (avoid.some((r) => px > r[0] && px < r[1] && pz > r[2] && pz < r[3])) return null;
      const kind = i % 7;
      if (kind === 0) return <Block key={i} position={[px, 0.09, pz]} size={[0.3, 0.18, 0.26]} color={dark ? "#4a4f58" : "#8d9096"} />;
      if (kind === 1 && !dark)
        return (
          <group key={i} position={[px, 0, pz]}>
            <Block position={[0, 0.12, 0]} size={[0.04, 0.24, 0.04]} color="#3f8a3a" castShadow={false} />
            <Block position={[0, 0.27, 0]} size={[0.12, 0.1, 0.12]} color={["#e0433a", "#f2c230", "#f4f4f4", "#6fa8f0"][i % 4]} castShadow={false} />
          </group>
        );
      return <Block key={i} position={[px, 0.1, pz]} size={[0.08, 0.2 + (i % 3) * 0.08, 0.08]} color={dark ? "#20452a" : "#4f9a3c"} castShadow={false} />;
    })}
  </>
);

/** An above-ground pool: a stone rim 0.7 m high and water to 0.62 m, so a kid standing in it is in to the waist. */
const Pool: React.FC = () => (
  <group position={POOL}>
    {([[0, -2.2, 6.4, 0.4], [0, 2.2, 6.4, 0.4], [-3.0, 0, 0.4, 4.4], [3.0, 0, 0.4, 4.4]] as Array<[number, number, number, number]>).map(([x, z, w, d], i) => (
      <Vox key={i} kind="stone" position={[x, 0.35, z]} size={[w, 0.7, d]} />
    ))}
    <Block position={[0, 0.02, 0]} size={[5.6, 0.04, 4]} color="#2f6fb8" castShadow={false} />
    <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.6, 4]} />
      <meshStandardMaterial color="#4fa0e8" transparent opacity={0.72} roughness={0.2} />
    </mesh>
    {[[-1.4, -0.8], [1.2, 0.9], [0.3, -1.3]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.61, z]} size={[0.7, 0.01, 0.06]} color="#d8f0ff" castShadow={false} />
    ))}
    {/* steps up to the rim */}
    <Vox kind="planks" position={[-3.6, 0.18, 0]} size={[0.8, 0.36, 1.2]} />
  </group>
);

const Table: React.FC = () => (
  <group position={TABLE}>
    <Vox kind="planks" position={[0, 0.66, 0]} size={[2.6, 0.08, 0.8]} />
    {[-1.1, 1.1].map((x) => (
      <Vox key={x} kind="log" position={[x, 0.31, 0]} size={[0.14, 0.62, 0.6]} />
    ))}
    {[-0.75, 0.75].map((z) => (
      <group key={z}>
        <Vox kind="planks" tint="#b0803f" position={[0, 0.4, z]} size={[2.6, 0.08, 0.36]} />
        {[-1.1, 1.1].map((x) => (
          <Vox key={x} kind="log" position={[x, 0.18, z]} size={[0.12, 0.36, 0.3]} />
        ))}
      </group>
    ))}
  </group>
);

const Yard: React.FC = () => (
  <group>
    <group position={YARD}>
      <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 90]} />
      {/* the road: from the teller's house, past the school, west into the trees */}
      <Vox kind="path" position={[-2, 0.02, 1.5]} size={[60, 0.06, 3.2]} />
      <Vox kind="path" position={[0, 0.021, -1.6]} size={[4, 0.06, 6]} />
      <Dress seed={11} n={320} x={[-30, 32]} z={[-16, 18]} avoid={[[-32, 28, -0.4, 3.4], [-8.5, 8.5, -13, -0.4], [5.4, 12.6, 1.8, 7.2], [-8, -4, 2.2, 4.8]]} />
      {/* far hills */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return <Block key={i} position={[Math.cos(a) * 62, 3 + (i % 3) * 2, Math.sin(a) * 52]} size={[26, 6 + (i % 3) * 4, 10]} color={i % 2 ? "#3f7f3a" : "#4a8c42"} castShadow={false} />;
      })}
      {/* the school: one long building, a bell tower over the door */}
      <Hut at={[0, 0, -5]} w={15} d={8} h={5} wall="cobble" roof="#8a3b2a" windows={[-5.2, -2.6, 2.6, 5.2]} />
      <Vox kind="cobble" position={[0, 7.2, -8]} size={[2.4, 3, 2.4]} />
      <Block position={[0, 9, -8]} size={[3, 0.6, 3]} color="#8a3b2a" />
      <Block position={[0, 7.4, -6.75]} size={[0.6, 0.7, 0.1]} color="#f2c230" />
      <Vox kind="stone" position={[0, 0.1, -4.4]} size={[3.2, 0.2, 1.2]} />
      <Fence from={[-12, 0, -4.6]} to={[-12, 0, -0.4]} />
      <Fence from={[12, 0, -4.6]} to={[12, 0, -0.4]} />
      <Hut at={[-17, 0, -7]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" windows={[-1.6, 1.6]} />
      <Hut at={[30, 0, -6]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[1.5]} door={-1.2} />
      <Hut at={[-9, 0, 13]} w={7} tint="#caa268" roof="#3f6b3a" windows={[-1.8, 1.8]} turn={Math.PI} />
      <Hut at={[18, 0, 14]} w={6.5} tint="#d8c49a" roof="#8a3b2a" windows={[-1.6]} door={1.3} turn={Math.PI} />
      {/* a swing nobody is on, a ball nobody came back for */}
      <group position={[4.2, 0, 6.6]}>
        {[-0.9, 0.9].map((x) => (
          <Vox key={x} kind="log" position={[x, 1.1, 0]} size={[0.14, 2.2, 0.14]} />
        ))}
        <Vox kind="log" position={[0, 2.2, 0]} size={[2, 0.14, 0.14]} />
        {[-0.3, 0.3].map((x) => (
          <Block key={x} position={[x, 1.35, 0]} size={[0.03, 1.6, 0.03]} color="#5a4a3a" castShadow={false} />
        ))}
        <Vox kind="planks" position={[0, 0.55, 0]} size={[0.7, 0.06, 0.26]} />
      </group>
      <Block position={[-2.6, 0.16, 5.2]} size={[0.32, 0.32, 0.32]} color="#e0433a" />
      {(
        [[-27, -12, 5], [-13, 6.5, 4.2], [-3, 12, 4.4], [12, -9, 4.6], [14.5, 8.5, 4], [25, 8, 4.6], [-22, 12, 4], [37, 2, 4.8], [9, 15, 4.2], [-9.5, -11, 4.4]] as Array<[number, number, number]>
      ).map(([x, z, h], i) => (
        <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
      ))}
      <LampPost position={[-9.6, 0, -0.2]} seed={2} />
      <LampPost position={[9.6, 0, -0.2]} seed={3} />
      <LampPost position={[-15, 0, 3.6]} seed={4} />
      <LampPost position={[15.5, 0, 3.6]} seed={5} />
      <Clouds y={48} center={[0, 0, 0]} />
      <GodRay position={[-4, 6.5, 1]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
      <LightPool position={[0, 0.07, 1.5]} width={12} depth={8} color="#fff2c8" opacity={0.12} />
      <Glow position={[0, 7.4, -6.6]} size={1.6} color="#ffe08a" opacity={0.3} />
      <Dust position={[0, 2.2, 2]} area={[36, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.55} seed={3} speed={0.2} />
    </group>
    <Hut at={HOME} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Pool />
    <Table />
    {/* the woods begin here: you never see into them */}
    <ForestEdge from={[EDGE[0] - 3, 0, YARD[2] - 22]} to={[EDGE[0] - 3, 0, YARD[2] + 24]} back={[-1, 0, 0]} depth={12} count={46} seed={4} />
    <Pine position={[EDGE[0] - 1.2, 0, EDGE[2] - 3.4]} height={9} />
    <Pine position={[EDGE[0] - 0.6, 0, EDGE[2] + 3.6]} height={8} />
    <Vox kind="path" position={[EDGE[0] - 6, 0.022, EDGE[2]]} size={[12, 0.06, 2.4]} />
    <Block position={[EDGE[0] - 9, 2.5, EDGE[2]]} size={[1, 5, 4]} color="#060a08" castShadow={false} />
    <group position={WALL} />
  </group>
);

/** Pines of the woods: [x, z, height], in clearing coordinates. None within 4.5 m of the lamp, none on the line from the hiding tree. */
const PINES: Array<[number, number, number]> = [
  [-6, -4.5, 10], [-3.5, -6.5, 9], [1.5, -6, 11], [5.5, -5, 9.5], [9, -3.5, 10], [12.5, -1.5, 9],
  [-7.5, 0.5, 9.5], [-6.5, 5, 10.5], [-3, 7, 9], [2, 7.5, 10], [5.5, 8, 9.5], [10.5, 7, 10], [14, 5.5, 9],
  [-10, -3, 10], [-11, 3.5, 9], [-9.5, 8.5, 10], [0, -10, 10], [8, -9, 9], [16, -6, 10], [18, 1, 9.5], [16.5, 9, 10],
  [22, -3, 9], [24, 6, 10], [28, -2, 9.5], [30, 5.5, 9], [21, 10, 9.5], [-14, -8, 10], [-15, 7, 9],
];

const Woods: React.FC = () => (
  <group position={WOODS}>
    <Vox kind="grass" tint="#2c5a34" position={[5, -0.5, 0]} size={[120, 1, 80]} />
    {/* the path in from the east: it passes south of the hiding tree and ends at the lamp */}
    <Vox kind="path" tint="#6a5a44" position={[18, 0.02, 1.6]} size={[30, 0.06, 1.8]} />
    <Vox kind="path" tint="#6a5a44" position={[0.5, 0.021, 1.2]} size={[6.5, 0.06, 5.5]} />
    <Dress seed={77} n={260} x={[-16, 34]} z={[-12, 12]} dark avoid={[[-3, 4, -1.6, 4], [3, 34, 0.6, 2.6]]} />
    {PINES.map(([x, z, h], i) => (
      <Pine key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#1c3828" : "#20402c"} />
    ))}
    {/* the hiding tree: a trunk wide enough to stand behind */}
    <Vox kind="log" tint="#3a2a1c" position={[HTREE[0] - WOODS[0], 3.2, HTREE[2] - WOODS[2]]} size={[0.95, 6.4, 0.95]} />
    {[[0, 6.2, 3.4], [0, 7.4, 2.4], [0, 8.4, 1.3]].map(([x, y, w], i) => (
      <Block key={i} position={[HTREE[0] - WOODS[0] + x, y, HTREE[2] - WOODS[2]]} size={[w, 1.1, w]} color="#1c3828" />
    ))}
    <Block position={[HTREE[0] - WOODS[0] + 0.5, 0.12, HTREE[2] - WOODS[2] + 0.5]} size={[0.5, 0.24, 0.3]} color="#33261a" />
    {/* the old lamp: bent, the only warm thing here */}
    <group position={[LAMP[0] - WOODS[0], 0, LAMP[2] - WOODS[2]]} rotation={[0, 0, 0.05]}>
      <LanternPost position={[0, 0, 0]} height={3.3} light={26} seed={7} />
    </group>
    <LightPool position={[0, 0.07, 1]} width={7} depth={6} color="#ffd9a0" opacity={0.2} />
    <Glow position={[0, 3.1, 0.6]} size={2.2} color="#ffc878" opacity={0.3} />
    {/* fallen logs, a stump, old stones */}
    {[[-3.6, 3.4, 0.5], [3.2, -2.6, -0.4], [11, 4.2, 0.2]].map(([x, z, r]) => (
      <group key={x} position={[x, 0, z]} rotation={[0, r, 0]}>
        <Vox kind="log" tint="#3a2a1c" position={[0, 0.2, 0]} size={[2.2, 0.4, 0.4]} />
      </group>
    ))}
    <Vox kind="log" tint="#3a2a1c" position={[-2.8, 0.25, -2.2]} size={[0.7, 0.5, 0.7]} />
    {/* twigs on the ground where the teller stands */}
    {[[8.3, 3.5, 0.4], [8.6, 2.6, 1.2], [9.2, 3.2, 2.2]].map(([x, z, r]) => (
      <group key={x} position={[x, 0.03, z]} rotation={[0, r, 0]}>
        <Block size={[0.5, 0.04, 0.04]} color="#5a4028" castShadow={false} />
      </group>
    ))}
    <ForestEdge from={[-18, 0, -13]} to={[36, 0, -13]} back={[0, 0, -1]} depth={10} count={40} seed={9} />
    <ForestEdge from={[-18, 0, -13]} to={[-18, 0, 14]} back={[-1, 0, 0]} depth={10} count={24} seed={12} />
    <ForestEdge from={[-18, 0, 14]} to={[36, 0, 14]} back={[0, 0, 1]} depth={10} count={40} seed={15} />
    <Stars center={[0, 0, 0]} radius={150} count={240} seed={5} />
    <Moon position={[-30, 52, -80]} radius={6} rotation={[0.4, 0.3, 0]} glow={0.5} />
    {/* a cold fill, so the dark is blue and not black */}
    {[-8, 4, 14, 24].map((x) => (
      <pointLight key={x} position={[x, 7, 7]} color="#93a4ff" intensity={38} distance={22} decay={2} />
    ))}
    <GodRay position={[2, 7, -1]} rotation={[0, 0, 0.35]} width={4} height={13} color="#cfd8ff" opacity={0.05} />
    <Dust position={[3, 1.6, 1]} area={[26, 3.2, 12]} count={70} size={0.04} color="#cfd8ff" opacity={0.45} seed={7} speed={0.12} />
    {/* ground mist */}
    {Array.from({ length: 14 }, (_, i) => (
      <Glow key={i} position={[-10 + i * 2.6, 0.35, -5 + ((i * 3.7) % 10)]} size={3.4} color="#aab6e8" opacity={0.05} />
    ))}
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="class">
        <Classroom at={CLASS} board="MATH" boardSub="PAGE 12" night={night} />
        <Vox kind="grass" position={[0, -0.7, 0]} size={[40, 1, 40]} />
      </Zone>
      <Zone name="yard">
        <Yard />
      </Zone>
      <Zone name="woods">
        <Woods />
      </Zone>
    </>
  );
};
