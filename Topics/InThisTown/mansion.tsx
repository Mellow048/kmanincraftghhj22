import type React from "react";
import { Block, Dust, Glow, LightPool, Tree, Vox } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Lantern } from "./things";

/**
 * THE MANSION — where the pillagers live. Built from the owner's two pictures
 * (Topics/InThisTown/outlines/monster-village-part-3-mansion): outside, dark planks with a cobble pillar at every
 * corner, three floors each stepping back from the one below, and wide flat dark roofs, in a dark oak forest;
 * inside, a pale plank floor, dark plank walls with a band of cobble under the roof, big windows, a chandelier,
 * and a long table with a map on it and plank seats round it.
 *
 * Part of the topic's pack (see PACK.md). The outside and the hall are two separate sets: put each in its own Zone,
 * a long way from the other. Both are open to the south, where the camera lives.
 */

const PILLAR = "#7d7d80";
export const DARK_OAK = ["#2c5a22", "#27501e"];

/** A dark oak: lower and wider than the village's trees. */
export const DarkOak: React.FC<{ position: Vec3; height?: number; n?: number }> = ({ position, height = 4.8, n = 0 }) => (
  <Tree position={position} height={height} leaf={DARK_OAK[n % 2]} spread={1.35} />
);

/** One floor of the front: dark planks, a cobble pillar every few metres, warm windows, a flat roof that hangs over. */
const Floor: React.FC<{ x: number; z: number; w: number; d: number; y: number; h?: number; door?: boolean; lit: boolean }> = ({ x, z, w, d, y, h = 4.2, door = false, lit }) => {
  const n = Math.max(2, Math.round(w / 3.4));
  return (
    <group position={[x, y, z]}>
      <Vox kind="darkPlanks" position={[0, h / 2, -d / 2]} size={[w, h, d]} />
      <Vox kind="cobble" position={[0, 0.35, -d / 2]} size={[w + 0.3, 0.7, d + 0.3]} />
      {Array.from({ length: n + 1 }, (_, i) => {
        const px = -w / 2 + (i * w) / n;
        /* No pillar in the doorway: one each side of it instead. */
        if (door && Math.abs(px) < 1.4) return [-1, 1].map((e) => <Vox key={`${i}${e}`} kind="cobble" tint={PILLAR} position={[e * 1.7, h / 2, 0.12]} size={[0.8, h, 0.8]} />);
        return <Vox key={i} kind="cobble" tint={PILLAR} position={[px, h / 2, 0.12]} size={[0.8, h, 0.8]} />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const wx = -w / 2 + ((i + 0.5) * w) / n;
        if (door && Math.abs(wx) < 2.6) return null;
        const dim = !lit || i % 4 === 2;
        return (
          <group key={i} position={[wx, h * 0.58, 0.03]}>
            <Block size={[1.3, 1.5, 0.08]} color="#3a2616" castShadow={false} />
            <Block position={[0, 0, 0.03]} size={[1.05, 1.25, 0.06]} color="#000000" emissive={dim ? "#6f8fc8" : i % 3 === 1 ? "#ffb060" : "#ffd9a0"} emissiveIntensity={dim ? 0.3 : 0.9} castShadow={false} />
            <Block position={[0, 0, 0.07]} size={[0.07, 1.25, 0.03]} color="#3a2616" castShadow={false} />
            <Block position={[0, 0, 0.07]} size={[1.05, 0.07, 0.03]} color="#3a2616" castShadow={false} />
          </group>
        );
      })}
      <Block position={[0, h + 0.2, -d / 2]} size={[w + 2.2, 0.4, d + 2.2]} color="#4a2c1a" />
      <Block position={[0, h + 0.6, -d / 2]} size={[w + 0.8, 0.4, d + 0.8]} color="#57341f" />
    </group>
  );
};

/**
 * The mansion from outside. `at` is the ground in front of its front door; the house runs 19 m each way along X and
 * 14 m back (−Z), and stands 15 m tall. The doorway is 2.4 wide and 3 high and is drawn dark: a shot that opens the
 * door draws its own two leaves in it (each 1.2 × 2.9, hinged at x = ±1.2, z = 0.1). `lit` false is nobody home.
 */
export const Mansion: React.FC<{ at: Vec3; lit?: boolean }> = ({ at, lit = true }) => (
  <group position={at}>
    <Floor x={0} z={0} w={22} d={14} y={0} door lit={lit} />
    <Floor x={-14.5} z={-3} w={8} d={10} y={0} lit={lit} />
    <Floor x={14.5} z={-3} w={8} d={10} y={0} lit={lit} />
    <Floor x={0} z={-2} w={20} d={11} y={5} lit={lit} />
    <Floor x={-12} z={-5} w={7} d={7} y={5} lit={lit} />
    <Floor x={2} z={-4.5} w={12} d={7} y={10} lit={lit} />
    <Block position={[0, 1.5, 0.06]} size={[2.4, 3.0, 0.1]} color="#0d0906" castShadow={false} />
    <Block position={[0, 3.15, 0.2]} size={[3.0, 0.3, 0.3]} color="#3a2616" />
    <Vox kind="cobble" position={[0, 0.15, 1.0]} size={[4, 0.3, 1.6]} />
    <Vox kind="cobble" position={[0, 0.07, 2.1]} size={[4.6, 0.14, 1]} />
    <Lantern position={[-2.6, 2.7, 0.75]} chain={0.2} light={lit ? 10 : 0} reach={9} seed={21} />
    <Lantern position={[2.6, 2.7, 0.75]} chain={0.2} light={lit ? 10 : 0} reach={9} seed={22} />
    {lit ? <Glow position={[0, 3, 1.5]} size={7} color="#ffb060" opacity={0.16} /> : null}
  </group>
);

/** Where the trees of `DarkOakForest` stand, relative to the mansion's door: [x, z, height]. A lane 5 m wide runs south from the door. */
export const DARK_OAKS: Array<[number, number, number]> = [
  [-6, 6, 4.2], [6.5, 5.5, 4.6], [-11, 10, 5], [11.5, 10.5, 4.4], [-5.5, 13, 4.8], [6, 14, 5], [-16, 5, 5.2], [17, 6, 4.8],
  [-10, 18, 5], [10.5, 19, 4.6], [-19, 13, 4.6], [20, 14, 5.2], [-4.6, 21, 4.4], [5, 22.5, 5], [-15, 23, 5.4], [15.5, 24, 4.8],
  [-24, 20, 5], [25, 21, 5], [-8, 27, 5.2], [9, 28, 4.6], [-21, 4, 4.6], [23, 3, 5],
];

/** The dark oak forest in front of the mansion, its ground, and the path up the lane to the door. `at` is the same point as the mansion's. */
export const DarkOakForest: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Vox kind="grass" tint="#3c6b2e" position={[0, -0.25, 6]} size={[90, 0.5, 70]} />
    <Vox kind="path" position={[0, 0.02, 10.5]} size={[2.6, 0.06, 16]} />
    {DARK_OAKS.map(([x, z, height], i) => (
      <DarkOak key={i} position={[x, 0, z]} height={height} n={i} />
    ))}
  </group>
);

const WALL = "#4f331d";

const Window: React.FC<{ position: Vec3; turn?: number }> = ({ position, turn = 0 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <Block size={[2.6, 2.4, 0.1]} color="#2a1a0e" castShadow={false} />
    <Block position={[0, 0, 0.04]} size={[2.3, 2.1, 0.06]} color="#000000" emissive="#7f9fe0" emissiveIntensity={0.8} castShadow={false} />
    {[-0.58, 0, 0.58].map((x) => (
      <Block key={x} position={[x, 0, 0.08]} size={[0.06, 2.1, 0.03]} color="#d8dde6" castShadow={false} />
    ))}
    {[-0.5, 0.2].map((y) => (
      <Block key={y} position={[0, y, 0.08]} size={[2.3, 0.06, 0.03]} color="#d8dde6" castShadow={false} />
    ))}
  </group>
);

/** A seat as in his picture: a plank block with a back. It faces +Z; the seat is 0.5 m up. */
export const PlankSeat: React.FC<{ position: Vec3; turn?: number }> = ({ position, turn = 0 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <Vox kind="planks" position={[0, 0.25, 0]} size={[0.9, 0.5, 0.9]} />
    <Vox kind="planks" position={[0, 0.7, -0.33]} size={[0.9, 0.5, 0.24]} />
  </group>
);

/** The hall's measurements, relative to its `at`: for staging. The table top is `tableY` up; the table is 7.4 × 3.4. */
export const MANSION_HALL = {
  x: [-10.3, 10.3] as [number, number],
  z: [-7, 10] as [number, number],
  tableY: 0.96,
  table: [7.4, 3.4] as [number, number],
  /** The doorway, in the west wall. */
  door: [-10.3, 0, 2.2] as Vec3,
  /** The three seats behind the table (north of it), and the one at each end. */
  seats: [[-2.4, 0, -2.5], [0, 0, -2.5], [2.4, 0, -2.5], [4.6, 0, 0], [-4.6, 0, 0]] as Vec3[],
};

/**
 * The mansion's hall. `at` is the floor under the middle of the table. 20.6 m wide, 8 m high, open to the south.
 * It brings its own light (the chandelier and three fills). `table` false leaves the table and seats out.
 */
export const MansionHall: React.FC<{ at: Vec3; table?: boolean }> = ({ at, table = true }) => (
  <group position={at}>
    <Vox kind="planks" tint="#d6bd8a" position={[0, -0.1, 1.5]} size={[21, 0.2, 17]} />
    <Vox kind="darkPlanks" tint={WALL} position={[0, 4, -7.1]} size={[21, 8, 0.2]} castShadow={false} />
    <Vox kind="darkPlanks" tint={WALL} position={[-10.4, 4, 1.5]} size={[0.2, 8, 17]} castShadow={false} />
    <Vox kind="darkPlanks" tint={WALL} position={[10.4, 4, 1.5]} size={[0.2, 8, 17]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 8.1, 1.5]} size={[21, 0.2, 17]} castShadow={false} />
    <Vox kind="cobble" position={[0, 6.4, -6.95]} size={[21, 0.8, 0.14]} castShadow={false} />
    <Vox kind="cobble" position={[-10.25, 6.4, 1.5]} size={[0.14, 0.8, 17]} castShadow={false} />
    <Vox kind="cobble" position={[10.25, 6.4, 1.5]} size={[0.14, 0.8, 17]} castShadow={false} />
    <Window position={[4.6, 3.1, -6.95]} />
    <Window position={[8.2, 3.1, -6.95]} />
    <Window position={[10.25, 3.1, -2.5]} turn={-Math.PI / 2} />
    <Window position={[10.25, 3.1, 2.5]} turn={-Math.PI / 2} />
    <Block position={[-10.25, 1.6, 2.2]} size={[0.1, 3.2, 2.6]} color="#150f0a" castShadow={false} />
    <Block position={[-10.2, 3.3, 2.2]} size={[0.2, 0.3, 3.0]} color="#3a2616" castShadow={false} />
    {[-7.5, -5.3, -3.1].map((x) => (
      <group key={x} position={[x, 0, -6.6]}>
        <Vox kind="planks" position={[0, 1.4, 0]} size={[2.1, 2.8, 0.7]} />
        {[0.55, 1.35, 2.15].map((y, r) =>
          [-0.7, -0.35, 0, 0.35, 0.7].map((bx, i) => (
            <Block key={`${y}${bx}`} position={[bx, y, 0.33]} size={[0.26, 0.5, 0.1]} color={["#b0302a", "#3f6fc2", "#3f7f3a", "#e0b83a", "#7a4fb0"][(i + r * 2) % 5]} castShadow={false} />
          )),
        )}
      </group>
    ))}
    {table ? (
      <>
        <Vox kind="planks" position={[0, 0.45, 0]} size={[7.4, 0.9, 3.4]} />
        <Block position={[0, 0.93, 0]} size={[6.6, 0.06, 2.7]} color="#6fae4a" castShadow={false} />
        <Block position={[-1.6, 0.965, 0.3]} size={[2.2, 0.02, 1.3]} color="#4a7ac2" castShadow={false} />
        <Block position={[1.7, 0.965, -0.4]} size={[1.8, 0.02, 1.1]} color="#e0cf6a" castShadow={false} />
        <Block position={[0.4, 0.965, 0.8]} size={[1.2, 0.02, 0.6]} color="#4f8f3a" castShadow={false} />
        <Block position={[2.6, 0.965, 0.7]} size={[0.6, 0.02, 0.5]} color="#4a7ac2" castShadow={false} />
        {MANSION_HALL.seats.map((p, i) => (
          <PlankSeat key={i} position={p} turn={i === 3 ? -Math.PI / 2 : i === 4 ? Math.PI / 2 : 0} />
        ))}
      </>
    ) : null}
    {/* The chandelier: fence posts and four flames. */}
    <Block position={[0, 7.0, 0]} size={[0.14, 2.2, 0.14]} color="#8a6238" castShadow={false} />
    <Block position={[0, 5.9, 0]} size={[2.6, 0.14, 0.14]} color="#8a6238" castShadow={false} />
    <Block position={[0, 5.9, 0]} size={[0.14, 0.14, 2.6]} color="#8a6238" castShadow={false} />
    {[[-1.25, 0], [1.25, 0], [0, -1.25], [0, 1.25]].map(([x, z], i) => (
      <group key={i} position={[x, 6.05, z]}>
        <Block position={[0, 0.15, 0]} size={[0.1, 0.3, 0.1]} color="#e8e0c8" castShadow={false} />
        <Block position={[0, 0.38, 0]} size={[0.1, 0.14, 0.1]} color="#000000" emissive="#ffc060" emissiveIntensity={1} castShadow={false} />
      </group>
    ))}
    <Glow position={[0, 6.3, 0]} size={3.6} color="#ffb860" opacity={0.25} />
    <pointLight position={[0, 5.4, 0]} color="#ffd9a8" intensity={90} distance={20} decay={2} />
    <LightPool position={[0, 0.03, 0.5]} width={12} depth={8} color="#ffe2b0" opacity={0.12} />
    <pointLight position={[-6, 3.4, 4]} color="#ffd9a8" intensity={40} distance={15} decay={2} />
    <pointLight position={[6, 3.4, 4]} color="#ffd9a8" intensity={40} distance={15} decay={2} />
    <pointLight position={[0, 3.2, 8]} color="#ffd9a8" intensity={40} distance={16} decay={2} />
    <Dust position={[0, 3, 0]} area={[18, 5, 12]} count={50} size={0.04} color="#ffe9c4" opacity={0.5} seed={15} speed={0.15} />
  </group>
);
