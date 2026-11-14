import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, DarkOak, Hut, LampPost, Moon, Room, Stall, Stars, Well } from "../../../Topics/InThisTown";
import { BENCH, BENCH_TOP, BIRCH, Board, CUP, DESERT, FIELDS, FINISH, FOREST, FPOND, GATE_X, HILL, LINE_X, OAK, PLACE, POND, RIVER, STAND, START_X, STUMP, Stand, Stump, WTREE } from "./kit";

/**
 * THE RACE'S WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  The town: one street, west–east (x). The start line is across it. A hill at the west end, a pond.
 *   room     The teller's room, with the empty shelf.
 *   forest   The forest at night: the stump, the witch's tree, a pond.
 *   river    Stretch two of the race: two rivers across the track, a bridge over each.
 *   desert   Stretch three: sand, cactus, rock.
 *   oak      Stretch four: the dark oak forest.
 *   finish   The last village: the finish line and the trophy.
 *   fields   Stage one, first half: wheat on both sides, fences, a barn, a windmill.
 *   birch    Stage one, second half: a birch wood.
 *
 * The river zone is where stage one ENDS: the line (GATE_X) and the rest camp are on the west bank of the first river.
 * Every zone is dressed by `Dress` (flowers, grass, stones, bushes) and closed by `Horizon` (hills all the way round),
 * so that no frame is a flat green floor with a few trees on it.
 *
 * In every zone the track runs west to east along z = 2 (kit: LANE), and the camera lives south of it.
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const WATER = "#3f7fd6";
const Water: React.FC<{ position: [number, number, number]; size: [number, number] }> = ({ position, size }) => (
  <>
    <Block position={[position[0], position[1] + 0.03, position[2]]} size={[size[0], 0.06, size[1]]} color={WATER} emissive="#2a5fb0" emissiveIntensity={0.25} roughness={0.2} castShadow={false} />
    <Block position={[position[0] - size[0] * 0.2, position[1] + 0.065, position[2] + size[1] * 0.15]} size={[size[0] * 0.25, 0.01, 0.12]} color="#bfe2ff" castShadow={false} />
    <Block position={[position[0] + size[0] * 0.15, position[1] + 0.065, position[2] - size[1] * 0.2]} size={[size[0] * 0.2, 0.01, 0.12]} color="#bfe2ff" castShadow={false} />
  </>
);
/** Posts and a banner over the track at x. */
const Gate: React.FC<{ x: number; z: number; text?: boolean }> = ({ x, z, text = false }) => (
  <group position={[x, 0, z]}>
    {[-2.6, 2.6].map((dz) => (
      <Block key={dz} position={[0, 2, dz]} size={[0.25, 4, 0.25]} color="#5c3f24" />
    ))}
    <Block position={[0, 3.7, 0]} size={[0.1, 0.7, 5.3]} color="#f4f4f4" />
    {Array.from({ length: 10 }, (_, i) => (
      <Block key={i} position={[-0.06, 3.52 + (i % 2) * 0.35, -2.34 + i * 0.52]} size={[0.02, 0.35, 0.52]} color="#15151a" castShadow={false} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <Block key={i} position={[0, 0.07, -2.2 + i * 0.55]} size={[0.5, 0.02, 0.275]} color={i % 2 ? "#15151a" : "#f4f4f4"} castShadow={false} />
    ))}
    {text ? null : null}
  </group>
);

// ----------------------------------------------------------------------------- dressing

/** A number 0…1 from a seed: the same every frame. */
const rnd = (i: number): number => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
type Rect = [number, number, number, number];
const inside = (x: number, z: number, r: Rect): boolean => x > r[0] && x < r[1] && z > r[2] && z < r[3];
const FLOWERS = ["#e0433a", "#f2c230", "#f4f4f4", "#e77fd0", "#6fa8f0", "#f08a2a"];
/**
 * Small things all over a zone's ground, the same every frame: flowers, tufts of grass, stones, and bushes.
 * Nothing is put on the track (z −0.8…4.8), in an `avoid` rectangle [x0, x1, z0, z1], and nothing taller than a shin
 * is put south of the track near it, where the cameras are: bushes stay north of z −3 or south of z 13.
 */
const Dress: React.FC<{
  seed: number; n?: number; x?: [number, number]; z?: [number, number]; avoid?: Rect[]; grass?: string; flowers?: boolean; stones?: string; bush?: string; shrooms?: boolean;
}> = ({ seed, n = 170, x = [-48, 48], z = [-16, 16], avoid = [], grass = "#4f9a3a", flowers = true, stones = "#8d8d8d", bush = "#3f7f2d", shrooms = false }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const px = x[0] + rnd(seed + i) * (x[1] - x[0]);
      const pz = z[0] + rnd(seed + i + 1000) * (z[1] - z[0]);
      if (pz > -0.8 && pz < 4.8) return null;
      if (avoid.some((r) => inside(px, pz, r))) return null;
      const kind = Math.floor(rnd(seed + i + 2000) * 10);
      const s = 0.7 + rnd(seed + i + 3000) * 0.7;
      if (kind <= 3) {
        return (
          <group key={i} position={[px, 0, pz]}>
            {[-0.07, 0, 0.08].map((d, j) => (
              <Block key={j} position={[d, 0.1 * s + j * 0.02, d * 0.6]} size={[0.035, 0.22 * s + j * 0.04, 0.035]} color={j === 1 ? grass : "#5fae45"} castShadow={false} />
            ))}
          </group>
        );
      }
      if (kind <= 6) {
        if (!flowers) return null;
        const c = FLOWERS[Math.floor(rnd(seed + i + 4000) * FLOWERS.length)];
        return shrooms ? (
          <group key={i} position={[px, 0, pz]}>
            <Block position={[0, 0.09, 0]} size={[0.08, 0.18, 0.08]} color="#e8e0cc" castShadow={false} />
            <Block position={[0, 0.21, 0]} size={[0.26, 0.09, 0.26]} color={i % 2 ? "#c23a2e" : "#9a6a3a"} />
          </group>
        ) : (
          <group key={i} position={[px, 0, pz]}>
            <Block position={[0, 0.11, 0]} size={[0.03, 0.22, 0.03]} color="#3f8a35" castShadow={false} />
            <Block position={[0, 0.25, 0]} size={[0.13, 0.09, 0.13]} color={c} castShadow={false} />
          </group>
        );
      }
      if (kind <= 8) {
        return (
          <group key={i} position={[px, 0, pz]}>
            <Block position={[0, 0.1 * s, 0]} size={[0.42 * s, 0.2 * s, 0.34 * s]} color={stones} />
            <Block position={[0.16 * s, 0.06 * s, 0.14 * s]} size={[0.2 * s, 0.12 * s, 0.18 * s]} color={stones} />
          </group>
        );
      }
      if (pz > -3 && pz < 13) return null;
      return (
        <group key={i} position={[px, 0, pz]}>
          <Vox kind="leaves" tint={bush} position={[0, 0.4 * s, 0]} size={[1.1 * s, 0.8 * s, 0.9 * s]} />
          <Vox kind="leaves" tint={bush} position={[0.4 * s, 0.25 * s, 0.3 * s]} size={[0.6 * s, 0.5 * s, 0.6 * s]} />
        </group>
      );
    })}
  </>
);
/** The end of the world, hidden: a wide floor under the zone and hills in steps all the way round it. */
const Horizon: React.FC<{ seed: number; ground: string; hill: string; top?: string; r?: number; snow?: boolean }> = ({ seed, ground, hill, top, r = 78, snow = false }) => (
  <>
    <Block position={[0, -0.56, 0]} size={[520, 1, 520]} color={ground} castShadow={false} />
    {Array.from({ length: 22 }, (_, i) => {
      const a = (i / 22) * Math.PI * 2 + rnd(seed + i) * 0.2;
      const d = r + rnd(seed + i + 50) * 34;
      const w = 30 + rnd(seed + i + 100) * 24;
      const h = 6 + rnd(seed + i + 150) * 13;
      return (
        <group key={i} position={[Math.cos(a) * d * 1.25, 0, Math.sin(a) * d]}>
          <Block position={[0, h * 0.25, 0]} size={[w, h * 0.5, w * 0.8]} color={hill} castShadow={false} />
          <Block position={[w * 0.05, h * 0.7, 0]} size={[w * 0.6, h * 0.45, w * 0.5]} color={top ?? hill} castShadow={false} />
          <Block position={[w * 0.08, h * 1.0, 0]} size={[w * 0.28, h * 0.25, w * 0.26]} color={snow && h > 13 ? "#eef2f4" : top ?? hill} castShadow={false} />
        </group>
      );
    })}
  </>
);
/** A fence: posts and two rails from `from` to `to` (both on the ground). */
const Fence: React.FC<{ from: [number, number]; to: [number, number] }> = ({ from, to }) => {
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const n = Math.max(2, Math.round(len / 1.6));
  return (
    <group position={[from[0], 0, from[1]]} rotation={[0, -Math.atan2(to[1] - from[1], to[0] - from[0]), 0]}>
      {Array.from({ length: n + 1 }, (_, i) => (
        <Block key={i} position={[(i / n) * len, 0.45, 0]} size={[0.14, 0.9, 0.14]} color="#7a5632" />
      ))}
      {[0.35, 0.7].map((y) => (
        <Block key={y} position={[len / 2, y, 0]} size={[len, 0.09, 0.07]} color="#8a6a3e" />
      ))}
    </group>
  );
};
const Hay: React.FC<{ position: [number, number, number]; turn?: number }> = ({ position, turn = 0 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <Vox kind="hay" position={[0, 0.4, 0]} size={[1.2, 0.8, 0.8]} />
  </group>
);
const Barrel: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.4, 0]} size={[0.6, 0.8, 0.6]} color="#7a5632" />
    {[0.15, 0.65].map((y) => (
      <Block key={y} position={[0, y, 0]} size={[0.64, 0.07, 0.64]} color="#3c3c44" castShadow={false} />
    ))}
    <Block position={[0, 0.805, 0]} size={[0.5, 0.01, 0.5]} color="#3f7fd6" castShadow={false} />
  </group>
);
const Crate: React.FC<{ position: [number, number, number]; s?: number }> = ({ position, s = 0.7 }) => (
  <Vox kind="planks" position={[position[0], position[1] + s / 2, position[2]]} size={[s, s, s]} />
);
/** A windmill, to stand a long way off: a tower and four sails. */
const Windmill: React.FC<{ position: [number, number, number]; turn?: number }> = ({ position, turn = 0.5 }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 3, 0]} size={[3.4, 6, 3.4]} />
    <Vox kind="planks" position={[0, 7.2, 0]} size={[3, 2.4, 3]} />
    <Block position={[0, 8.8, 0]} size={[3.6, 0.8, 3.6]} color="#8a3b2a" />
    <group position={[0, 7.4, 1.7]} rotation={[0, 0, turn]}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
          <Block position={[0, 2.3, 0]} size={[0.16, 4.6, 0.1]} color="#5c3f24" />
          <Block position={[0.5, 2.9, 0]} size={[0.9, 3.2, 0.04]} color="#efe7d2" castShadow={false} />
        </group>
      ))}
    </group>
  </group>
);
/** Little flags on a line across the street at x, between two poles. */
const Bunting: React.FC<{ x: number; z: number; y?: number; span?: number }> = ({ x, z, y = 4.6, span = 7 }) => (
  <group position={[x, 0, z]}>
    {[-span / 2, span / 2].map((dz) => (
      <Block key={dz} position={[0, y / 2, dz]} size={[0.14, y, 0.14]} color="#5c3f24" />
    ))}
    <Block position={[0, y - 0.1, 0]} size={[0.03, 0.03, span]} color="#2a1c10" castShadow={false} />
    {Array.from({ length: 12 }, (_, i) => (
      <Block key={i} position={[0, y - 0.32, -span / 2 + 0.4 + i * ((span - 0.8) / 11)]} size={[0.03, 0.4, 0.3]} color={FLOWERS[i % FLOWERS.length]} castShadow={false} />
    ))}
  </group>
);
/** A tent: a striped ridge roof on two poles, open at the front. */
const Tent: React.FC<{ position: [number, number, number]; color?: string; turn?: number }> = ({ position, color = "#c23a2e", turn = 0 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    {[-1, 1].map((sd) => (
      <group key={sd} position={[sd * 0.85, 1.1, 0]} rotation={[0, 0, -sd * 0.9]}>
        <Block position={[0, 0, 0]} size={[0.08, 2.6, 3]} color="#f4f0e4" />
        {[-1, 0, 1].map((k) => (
          <Block key={k} position={[sd * 0.045, 0, k * 1]} size={[0.02, 2.6, 0.5]} color={color} castShadow={false} />
        ))}
      </group>
    ))}
    <Block position={[0, 1.95, 0]} size={[0.3, 0.12, 3.1]} color={color} />
    <Block position={[0, 2.4, 1.5]} size={[0.06, 0.9, 0.06]} color="#5c3f24" />
    <Block position={[0.22, 2.7, 1.5]} size={[0.4, 0.26, 0.03]} color={color} castShadow={false} />
    <Block position={[0, 0.03, 0]} size={[2.4, 0.04, 2.8]} color="#b89a6a" castShadow={false} />
  </group>
);
/** The rest camp where stage one ends: the line, tents, a log to sit on, water, a fire that is out, a board. */
const Camp: React.FC = () => (
  <>
    <Gate x={GATE_X} z={2} />
    <Board position={[GATE_X + 0.2, 0, -1.4]} text="STAGE 1" rotationY={0.2} scale={1.3} />
    <Board position={[GATE_X + 6.6, 0, -3.2]} text="REST HERE" rotationY={0.1} scale={1.2} />
    <Bunting x={GATE_X + 1.5} z={2} />
    <Tent position={[GATE_X + 2.6, 0, -6.2]} />
    <Tent position={[GATE_X + 6.2, 0, -7]} color="#3d5f9a" turn={-0.2} />
    <Tent position={[GATE_X + 4, 0, 9.5]} color="#3f8a35" turn={Math.PI} />
    {/* The log he sits on: along the track, facing it, the river just behind its east end. */}
    <Vox kind="log" position={[BENCH[0] - RIVER[0], BENCH_TOP / 2, BENCH[2] - RIVER[2]]} size={[3.4, BENCH_TOP, 0.5]} />
    <Vox kind="log" position={[BENCH[0] - RIVER[0] - 4.4, BENCH_TOP / 2, BENCH[2] - RIVER[2] - 0.3]} size={[2.4, BENCH_TOP, 0.5]} />
    {/* The fire ring and the water table. */}
    <group position={[GATE_X + 4.6, 0, -2.6]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Block key={i} position={[Math.cos(i) * 0.5, 0.09, Math.sin(i) * 0.5]} size={[0.26, 0.18, 0.26]} color="#77777a" />
      ))}
      <Block position={[0, 0.1, 0]} size={[0.5, 0.12, 0.14]} color="#3a2616" />
      <Block position={[0, 0.14, 0]} size={[0.14, 0.12, 0.5]} color="#2a1c10" />
    </group>
    <group position={[GATE_X + 1.6, 0, -3.3]}>
      <Vox kind="planks" position={[0, 0.8, 0]} size={[2, 0.1, 0.8]} />
      {[-0.85, 0.85].map((dx) => (
        <Block key={dx} position={[dx, 0.4, 0]} size={[0.1, 0.8, 0.7]} color="#5c3f24" />
      ))}
      {[-0.6, -0.2, 0.2, 0.6].map((dx) => (
        <Block key={dx} position={[dx, 0.93, 0.1]} size={[0.14, 0.16, 0.14]} color="#f4f4f4" castShadow={false} />
      ))}
    </group>
    <Barrel position={[GATE_X + 3.1, 0, -3.4]} />
    <Barrel position={[GATE_X + 3.8, 0, -3.7]} />
    <Crate position={[BENCH[0] - RIVER[0] + 2.2, 0, -2.6]} />
    <Crate position={[BENCH[0] - RIVER[0] + 2.0, 0.7, -2.6]} s={0.5} />
    <Hay position={[GATE_X + 8, 0, -4.2]} turn={0.3} />
  </>
);

/** A birch: a white trunk with black marks and pale leaves. */
const BirchTree: React.FC<{ position: [number, number, number]; height?: number; n?: number }> = ({ position, height = 5, n = 0 }) => (
  <group position={position}>
    <Block position={[0, height / 2, 0]} size={[0.5, height, 0.5]} color="#e9e6dc" />
    {[0.18, 0.37, 0.55, 0.72].map((k, i) => (
      <Block key={k} position={[i % 2 ? 0.14 : -0.12, height * k, 0.255]} size={[0.2, 0.08, 0.01]} color="#2b2b2b" castShadow={false} />
    ))}
    {[0.25, 0.6].map((k, i) => (
      <Block key={k} position={[0.255, height * k, i ? 0.1 : -0.1]} size={[0.01, 0.08, 0.2]} color="#2b2b2b" castShadow={false} />
    ))}
    <Vox kind="leaves" tint={n % 2 ? "#7fbf5a" : "#8fcb62"} position={[0, height + 0.3, 0]} size={[2.6, 1.8, 2.6]} />
    <Vox kind="leaves" tint={n % 2 ? "#8fcb62" : "#7fbf5a"} position={[0, height + 1.5, 0]} size={[1.5, 0.9, 1.5]} />
  </group>
);
const BIRCHES: Array<[number, number, number]> = [
  [-24, -2.6, 5], [-19, -4.4, 5.6], [-14, -2.4, 4.8], [-9, -3.8, 5.4], [-4, -2.6, 5], [1, -4.2, 5.6], [6, -2.6, 4.8], [11, -3.8, 5.4], [16, -2.4, 5], [21, -4.2, 5.6], [26, -2.8, 5], [31, -4, 5.4],
  [-22, -8, 5.8], [-13, -9, 5.4], [-5, -8, 5.8], [4, -9.2, 5.4], [13, -8, 5.8], [22, -9, 5.4], [30, -8.4, 5.6], [-28, -12, 5.6], [-8, -13, 5.8], [9, -13.5, 5.6], [26, -13, 5.8],
  [-23, 8.4, 5.2], [-15, 9.6, 5], [-7, 8.6, 5.4], [1, 9.8, 5], [9, 8.6, 5.2], [17, 9.6, 5.4], [25, 8.6, 5], [-27, 13, 5.4], [-3, 14, 5.2], [13, 14, 5.4], [33, 9, 5.2], [-33, -3, 5.2], [38, -3, 5],
];
const Birch: React.FC = () => (
  <group position={BIRCH}>
    <Vox kind="grass" tint="#6fae4a" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Horizon seed={71} ground="#5f9e40" hill="#5a9a3e" top="#6aa848" />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.2]} />
    {BIRCHES.map(([x, z, height], i) => (
      <BirchTree key={i} position={[x, 0, z]} height={height} n={i} />
    ))}
    <Dress seed={700} n={240} grass="#6fae4a" bush="#6aa848" />
    {[-18, -6, 7, 19].map((x, i) => (
      <Vox key={x} kind="log" position={[x, 0.2, -1.6 - (i % 2) * 0.5]} size={[1.6, 0.4, 0.4]} />
    ))}
    {[-12, 2, 16].map((x) => (
      <GodRay key={x} position={[x, 6, 1]} rotation={[0, 0, 0.4]} width={2.6} height={12} color="#fffbe0" opacity={0.09} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
    <LightPool position={[2, 0.08, 2]} width={12} depth={5} color="#fff8d0" opacity={0.14} />
    <Dust position={[0, 2.2, 1]} area={[34, 4, 10]} count={70} size={0.04} color="#fffbe0" opacity={0.6} seed={29} speed={0.15} />
  </group>
);
const Fields: React.FC = () => (
  <group position={FIELDS}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Horizon seed={81} ground="#5f9e40" hill="#5a9a3e" top="#6aa848" snow />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    {/* Wheat: tall on the north side, behind a fence; cut low on the south side, where the lens is. */}
    {Array.from({ length: 13 }, (_, i) => (
      <group key={i}>
        <Block position={[-48 + i * 8, -0.02, -7.5]} size={[6.6, 0.06, 10]} color="#6b4a2a" castShadow={false} />
        {[-3, -1.5, 0, 1.5, 3].map((d, j) => (
          <Block key={d} position={[-48 + i * 8 + d, 0.5, -7.5]} size={[0.9, 1.0 - (j % 2) * 0.12, 9.6]} color={(i + j) % 2 ? "#d9b84a" : "#e3c65a"} castShadow={false} />
        ))}
        <Block position={[-48 + i * 8, -0.02, 11]} size={[6.6, 0.06, 9]} color="#6b4a2a" castShadow={false} />
        {[-3, -1.5, 0, 1.5, 3].map((d, j) => (
          <Block key={`s${d}`} position={[-48 + i * 8 + d, 0.2, 11]} size={[0.9, 0.4, 8.6]} color={(i + j) % 2 ? "#d9b84a" : "#c9a53a"} castShadow={false} />
        ))}
      </group>
    ))}
    <Fence from={[-52, -1.7]} to={[52, -1.7]} />
    {[-30, -11, 6, 24].map((x, i) => (
      <Hay key={x} position={[x, 0, -1.0 + (i % 2) * 0.1]} turn={0.2 * i} />
    ))}
    {/* A scarecrow in the wheat, a barn and a windmill behind it. */}
    {[-16, 14].map((x) => (
      <group key={x} position={[x, 0, -5]}>
        <Block position={[0, 1.1, 0]} size={[0.12, 2.2, 0.12]} color="#5c3f24" />
        <Block position={[0, 1.6, 0]} size={[1.5, 0.1, 0.1]} color="#5c3f24" />
        <Block position={[0, 1.55, 0]} size={[0.6, 0.7, 0.3]} color="#8a3b2a" />
        <Block position={[0, 2.2, 0]} size={[0.45, 0.45, 0.45]} color="#e8a21c" />
        <Block position={[0, 2.47, 0]} size={[0.8, 0.08, 0.8]} color="#c9a53a" />
      </group>
    ))}
    <Hut at={[-4, 0, -17]} w={10} d={7} h={5.4} tint="#b0302a" roof="#5c3f24" windows={[-3, 3]} />
    <Hut at={[27, 0, -16]} w={6} h={3.8} tint="#d8c49a" roof="#8a3b2a" windows={[1.6]} door={-1} />
    <Windmill position={[14, 0, -19]} />
    <Windmill position={[-32, 0, -22]} turn={1.1} />
    {([[-40, -15, 4.6], [-22, -16, 4.2], [38, -15, 4.8], [-36, 19, 4.4], [8, 20, 4.6], [34, 19, 4.2]] as Array<[number, number, number]>).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#4a9a36" : "#57a83e"} />
    ))}
    <Dress seed={800} n={90} z={[-1.5, 6.5]} flowers />
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[1, 6.5, -2]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[1, 0.08, 2]} width={12} depth={5} color="#fff2c8" opacity={0.14} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.5} seed={31} speed={0.25} />
  </group>
);

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 90]} />
    <Horizon seed={11} ground="#5f9e40" hill="#5a9a3e" top="#6aa848" snow />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Dress seed={100} n={260} x={[-60, 60]} z={[-18, 20]} avoid={[[POND[0] - 4, POND[0] + 4, POND[2] - 2.6, POND[2] + 2.6], [-7, 7, -5, 8], [HILL[0] - 5.5, HILL[0] + 5, HILL[2] - 5, HILL[2] + 5], [-12, -5, 4, 8.5]]} />
    <Bunting x={START_X + 0.6} z={2} />
    <Bunting x={START_X + 9} z={2} y={4.2} />
    <Bunting x={24} z={2} y={4.2} />
    <Fence from={[21, -1.4]} to={[58, -1.4]} />
    <Fence from={[26, 5.6]} to={[58, 5.6]} />
    {[30, 37, 44, 51].map((x, i) => (
      <group key={x}>
        <Block position={[x, -0.01, -6]} size={[5.4, 0.06, 7]} color="#6b4a2a" castShadow={false} />
        {[-2, -0.7, 0.7, 2].map((d, j) => (
          <Block key={d} position={[x + d, 0.3, -6]} size={[0.8, 0.6, 6.6]} color={["#d9b84a", "#5fae45", "#e3c65a", "#4f9a3a"][(i + j) % 4]} castShadow={false} />
        ))}
      </group>
    ))}
    <Windmill position={[40, 0, -17]} />
    <Hut at={[33, 0, 13]} w={6} h={3.6} tint="#caa268" roof="#8a3b2a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[46, 0, 12.5]} w={7} wall="cobble" roof="#3f6b3a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hay position={[23.5, 0, -2.2]} />
    <Hay position={[24.6, 0, -2.5]} turn={0.4} />
    <Barrel position={[8.6, 0, -2.4]} />
    <Crate position={[9.3, 0, -2.6]} />
    <Crate position={[-13.6, 0, -2.2]} s={0.6} />
    <Barrel position={[17, 0, -2.3]} />
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />
    <Hut at={[-13, 0, 11.5]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />
    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />
    <Stand position={STAND} />
    <Gate x={START_X} z={2} />
    {/* The hill at the west end: three steps of grass. */}
    <Vox kind="grass" position={[HILL[0], 0.5, HILL[2]]} size={[9, 1, 9]} />
    <Vox kind="grass" position={[HILL[0] - 0.5, 1.5, HILL[2]]} size={[6, 1, 6]} />
    <Vox kind="grass" position={[HILL[0] - 1, 2.5, HILL[2]]} size={[3, 1, 3]} />
    <Water position={[POND[0], 0.02, POND[2]]} size={[6.5, 3.8]} />
    {(
      [
        [-28, -12, 4.6], [-15.5, -13.5, 4], [6, -15.5, 4.4], [15, -13, 3.8], [27, -11, 4.6], [-27, 15, 4], [8, 18, 4.4], [25, 13, 4], [-33, -6, 4.8], [31, -8, 4.4],
        [-46, -6, 4.4], [-47, 9, 4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <Clouds y={48} center={[0, 0, 0]} />
    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[STAND[0], 1.7, STAND[2]]} size={1.6} color="#ffe08a" opacity={0.4} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const FOREST_TREES: Array<[number, number, number]> = [
  [-8, -3, 5], [-5, -6, 4.4], [3, -4, 5.2], [7, -2.5, 4.6], [11, -5, 5], [15, -3, 4.4], [22, -4.5, 5], [27, -2, 4.6], [-12, -5, 4.8], [-16, -2, 5.2],
  [-10, 9, 4.6], [-3, 11, 5], [6, 10, 4.4], [13, 12, 5], [24, 10, 4.6], [-18, 8, 5], [0, -9, 5.4], [9, -10, 5], [18, -9, 4.8], [-7, -11, 5], [30, -7, 5], [33, 8, 4.6],
];
const Forest: React.FC = () => (
  <group position={FOREST}>
    <Vox kind="grass" tint="#3f7a36" position={[5, -0.5, 0]} size={[110, 1, 70]} />
    <Horizon seed={21} ground="#2f5f2c" hill="#244a26" top="#2c5a2c" r={60} />
    <Dress seed={200} n={260} x={[-30, 40]} z={[-14, 14]} grass="#3f7a36" bush="#2f6a2a" shrooms avoid={[[FPOND[0] - FOREST[0] - 5.5, FPOND[0] - FOREST[0] + 5.5, -1, 6], [-4, 5, -1.5, 4]]} />
    {/* More trees further back, so there is forest behind the forest. */}
    {Array.from({ length: 46 }, (_, i) => (
      <Tree key={`far${i}`} position={[-44 + ((i * 13.7) % 96), 0, i % 2 ? -15 - ((i * 5.3) % 16) : 15 + ((i * 4.1) % 12)]} height={4.6 + (i % 4) * 0.5} leaf={i % 2 ? "#29602a" : "#2f6a2a"} />
    ))}
    {[[-9, -2.2, 0.3], [9.5, -1.8, -0.2], [24, -2.4, 0.5]].map(([x, z, r]) => (
      <group key={x} position={[x, 0, z]} rotation={[0, r, 0]}>
        <Vox kind="log" position={[0, 0.22, 0]} size={[2.2, 0.44, 0.44]} />
        <Block position={[0.3, 0.46, 0]} size={[0.5, 0.04, 0.3]} color="#4f8a3a" castShadow={false} />
      </group>
    ))}
    {/* Fireflies. */}
    {Array.from({ length: 26 }, (_, i) => (
      <Block key={`fly${i}`} position={[-12 + ((i * 9.1) % 44), 0.6 + ((i * 3.3) % 2.4), -5 + ((i * 5.7) % 12)]} size={[0.05, 0.05, 0.05]} color="#f4ff9a" emissive="#e8ff6a" emissiveIntensity={2.5} castShadow={false} />
    ))}
    {FOREST_TREES.map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#2f6a2a" : "#387a30"} />
    ))}
    <Tree position={[WTREE[0] - FOREST[0], 0, WTREE[2] - FOREST[2]]} height={5.4} leaf="#2a5a26" />
    <Stump position={[STUMP[0] - FOREST[0], 0, STUMP[2] - FOREST[2]]} />
    <Water position={[FPOND[0] - FOREST[0], 0.02, FPOND[2] - FOREST[2]]} size={[9, 5]} />
    {/* Fallen leaves. */}
    {Array.from({ length: 40 }, (_, i) => (
      <Block key={i} position={[-14 + ((i * 7.3) % 40), 0.02, -3 + ((i * 3.7) % 9)]} size={[0.18, 0.02, 0.14]} color={["#b8642a", "#c98a2e", "#8a5a22"][i % 3]} castShadow={false} />
    ))}
    <Stars center={[0, 0, 0]} radius={150} count={260} seed={5} />
    <Moon position={[18, 46, -90]} radius={7} rotation={[0.3, -0.2, 0]} glow={0.6} />
    {[-12, -2, 8, 18, 28].map((x) => (
      <pointLight key={x} position={[x, 6, 6]} color="#b4c2ff" intensity={55} distance={22} decay={2} />
    ))}
    <GodRay position={[0, 7, -1]} rotation={[0, 0, 0.35]} width={4} height={13} color="#cfd8ff" opacity={0.07} />
    <LightPool position={[1, 0.07, 1]} width={8} depth={6} color="#cfd8ff" opacity={0.12} />
    <Glow position={[-2, 2.2, -0.5]} size={2.4} color="#9a6fff" opacity={0.12} />
    <Dust position={[2, 2.2, 1]} area={[30, 4, 12]} count={60} size={0.04} color="#cfd8ff" opacity={0.5} seed={7} speed={0.15} />
  </group>
);

const River: React.FC = () => (
  <group position={RIVER}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Horizon seed={41} ground="#5f9e40" hill="#5a9a3e" top="#6aa848" snow />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    <Camp />
    <Dress seed={400} n={280} x={[-60, 40]} z={[-18, 18]} avoid={[[-10.2, -3.8, -40, 40], [5.8, 12.2, -40, 40], [GATE_X - 1, -10, -8.5, 0], [GATE_X + 2, GATE_X + 6, 7.5, 11.5]]} />
    {/* Lily pads, and stones at the water's edge. */}
    {Array.from({ length: 22 }, (_, i) => (
      <Block key={`lily${i}`} position={[(i % 2 ? -7 : 9) - 1.8 + ((i * 1.37) % 3.6), 0.075, -16 + ((i * 7.9) % 34)]} size={[0.4, 0.02, 0.4]} color="#3f8a35" castShadow={false} />
    ))}
    {Array.from({ length: 20 }, (_, i) => {
      const z = -17 + ((i * 6.1) % 36);
      return z > -1.5 && z < 5.5 ? null : <Block key={`rk${i}`} position={[(i % 2 ? -7 : 9) + (i % 4 < 2 ? -2.9 : 2.9), 0.12, z]} size={[0.5, 0.24, 0.6]} color="#8d8d8d" />;
    })}
    {[-7, 9].map((x) => (
      <group key={x}>
        <Block position={[x, -0.2, 0]} size={[5.4, 0.5, 80]} color="#2a4f8a" castShadow={false} />
        <Water position={[x, 0, 0]} size={[5, 80]} />
        <Vox kind="planks" position={[x, 0.04, 2]} size={[6.4, 0.12, 3.6]} />
        {[-1.8, 1.8].map((dz) => (
          <Vox key={dz} kind="log" position={[x, 0.6, 2 + dz]} size={[6.4, 0.2, 0.2]} />
        ))}
        {[-11, -6, 8, 13].map((z, i) => (
          <Block key={z} position={[x + (i % 2 ? 2.8 : -2.8), 0.7, z]} size={[0.14, 1.4, 0.14]} color="#4f8f3a" />
        ))}
      </group>
    ))}
    {([[-27, -9, 4.4], [-13, -11, 4], [1, -7, 4.6], [17, -6, 4.2], [26, -9, 4.8], [-24, 14, 4], [2, 12, 4.4], [20, 12, 4], [34, -5, 4.4], [-34, -7, 4.6], [-40, -13, 4.8], [-46, 12, 4.4], [-52, -8, 4.6], [-10.5, 13, 4.2], [14, -14, 4.6], [-2, -15, 4.4], [-33, -16, 4.6], [-58, 9, 4.2]] as Array<[number, number, number]>).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#4a9a36" : "#57a83e"} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[1, 6.5, -2]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[1, 0.08, 2]} width={12} depth={5} color="#fff2c8" opacity={0.12} />
    <Glow position={[9, 1, 2]} size={4} color="#bfe2ff" opacity={0.12} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={13} speed={0.2} />
  </group>
);

const Cactus: React.FC<{ position: [number, number, number]; h?: number }> = ({ position, h = 2.4 }) => (
  <group position={position}>
    <Block position={[0, h / 2, 0]} size={[0.6, h, 0.6]} color="#4f8f3a" />
    <Block position={[0.5, h * 0.55, 0]} size={[0.5, 0.3, 0.3]} color="#4f8f3a" />
    <Block position={[0.65, h * 0.72, 0]} size={[0.3, 0.6, 0.3]} color="#4f8f3a" />
    <Block position={[-0.45, h * 0.4, 0]} size={[0.4, 0.3, 0.3]} color="#478236" />
  </group>
);
const Desert: React.FC = () => (
  <group position={DESERT}>
    <Vox kind="sand" position={[0, -0.5, 0]} size={[150, 1, 90]} />
    <Horizon seed={61} ground="#e2cf8a" hill="#d9a05a" top="#c98a4a" />
    <Dress seed={600} n={200} flowers={false} grass="#b8a25a" stones="#b98a52" bush="#8a7a3a" />
    {/* A pyramid, a long way off, and bones by the track. */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Vox key={`py${i}`} kind="sand" tint="#e6cf86" position={[24, 1.5 + i * 3, -44]} size={[30 - i * 5, 3, 30 - i * 5]} />
    ))}
    {[-17, 5, 31].map((x) => (
      <group key={`bone${x}`} position={[x, 0, -1.6]}>
        <Block position={[0, 0.1, 0]} size={[0.9, 0.1, 0.1]} color="#efe9d8" />
        {[-0.3, 0, 0.3].map((d) => (
          <Block key={d} position={[d, 0.28, 0]} size={[0.07, 0.4, 0.07]} color="#efe9d8" />
        ))}
      </group>
    ))}
    <Block position={[0, 0.02, 2]} size={[150, 0.04, 4.4]} color="#e9d79a" castShadow={false} />
    {([[-14, -4, 2.6], [-6, -7, 2], [3, -3.6, 3], [12, -6, 2.2], [20, -4, 2.8], [28, -8, 2.4], [-22, -6, 3], [-9, 9, 2.4], [9, 11, 2.8], [24, 9, 2.2], [36, -4, 2.6], [-32, -4, 2.4]] as Array<[number, number, number]>).map(([x, z, h], i) => (
      <Cactus key={i} position={[x, 0, z]} h={h} />
    ))}
    {([[-18, -12, 9, 5], [6, -14, 12, 7], [30, -13, 8, 4], [-40, -10, 10, 6]] as Array<[number, number, number, number]>).map(([x, z, w, h], i) => (
      <group key={i}>
        <Vox kind="sand" tint="#d9a05a" position={[x, h / 2, z]} size={[w, h, 5]} />
        <Vox kind="sand" tint="#c98a4a" position={[x + 1, h + 0.75, z]} size={[w * 0.5, 1.5, 3.4]} />
      </group>
    ))}
    {[-10, 0, 15, 26].map((x) => (
      <Block key={x} position={[x, 0.2, -1.2]} size={[0.5, 0.4, 0.5]} color="#8a6a3a" />
    ))}
    <GodRay position={[2, 7, -3]} rotation={[0, 0, 0.5]} width={6} height={13} color="#fff0c8" opacity={0.08} />
    <LightPool position={[0, 0.08, 2]} width={14} depth={6} color="#fff2c8" opacity={0.16} />
    <Glow position={[10, 9, -20]} size={10} color="#fff0b0" opacity={0.3} />
    <Dust position={[0, 1.6, 1]} area={[34, 3, 14]} count={90} size={0.05} color="#f4e2a8" opacity={0.6} seed={17} speed={0.5} />
  </group>
);

const OAKS: Array<[number, number, number]> = [
  [-22, -2.4, 5], [-17, -4, 5.4], [-12, -2, 4.8], [-7, -3.6, 5.2], [-2, -2.2, 5], [3, -4, 5.4], [8, -2.4, 4.8], [13, -3.6, 5.2], [18, -2, 5], [23, -4, 5.4], [28, -2.6, 5],
  [-20, -8, 5.6], [-10, -8.5, 5.2], [0, -8, 5.6], [10, -8.6, 5.2], [20, -8, 5.6], [30, -8, 5.2],
  [-21, 7.4, 5.2], [-14, 8.6, 5], [-6, 7.6, 5.4], [2, 8.8, 5], [10, 7.6, 5.2], [17, 8.6, 5.4], [25, 7.6, 5], [-26, 12, 5.4], [-2, 13, 5.2], [14, 13, 5.4], [33, 8, 5.2], [-30, -3, 5.2], [36, -3, 5],
];
const Oak: React.FC = () => (
  <group position={OAK}>
    <Vox kind="grass" tint="#3c6b2e" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Horizon seed={91} ground="#335c28" hill="#2a4a22" top="#31562a" r={62} />
    <Dress seed={900} n={240} grass="#3c6b2e" bush="#2c5424" shrooms />
    <Vox kind="path" tint="#8a7a52" position={[0, 0.02, 2]} size={[130, 0.06, 4]} />
    {OAKS.map(([x, z, height], i) => (
      <DarkOak key={i} position={[x, 0, z]} height={height} n={i} />
    ))}
    {[-15, -3, 9, 21].map((x, i) => (
      <group key={x}>
        <Block position={[x, 0.2, -0.9 - (i % 2) * 0.4]} size={[0.3, 0.4, 0.3]} color="#b0302a" />
        <Block position={[x, 0.45, -0.9 - (i % 2) * 0.4]} size={[0.6, 0.2, 0.6]} color="#c23a2e" />
      </group>
    ))}
    {[-10, 4, 18].map((x) => (
      <GodRay key={x} position={[x, 6, 1]} rotation={[0, 0, 0.4]} width={2.4} height={12} color="#e8ffd0" opacity={0.08} />
    ))}
    <LightPool position={[2, 0.08, 2]} width={10} depth={4} color="#e8ffd0" opacity={0.12} />
    <Glow position={[2, 3, 2]} size={5} color="#d8ffb0" opacity={0.1} />
    <Dust position={[0, 2.2, 1]} area={[34, 4, 10]} count={70} size={0.04} color="#e8ffd0" opacity={0.6} seed={19} speed={0.15} />
  </group>
);

const Finish: React.FC = () => (
  <group position={FINISH}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Horizon seed={51} ground="#5f9e40" hill="#5a9a3e" top="#6aa848" snow />
    <Dress seed={500} n={220} avoid={[[10, 20, -1.5, 5]]} />
    <Bunting x={LINE_X - 3} z={2} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    <Hut at={[4, 0, -5]} w={7} windows={[-2, 2]} roof="#8a3b2a" tint="#d8c49a" />
    <Hut at={[14, 0, -5.5]} w={6.5} h={4} wall="cobble" roof="#3d5f9a" windows={[-1.8]} door={1.2} />
    <Hut at={[24, 0, -5]} w={7} tint="#caa268" roof="#3f6b3a" windows={[2]} door={-1.2} />
    <Hut at={[-8, 0, -5.5]} w={6} h={3.6} roof="#5a4a6a" windows={[1.6]} door={-1} />
    <Hut at={[8, 0, 12]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[22, 0, 12]} w={6} wall="cobble" roof="#3f6b3a" windows={[1.5]} turn={Math.PI} />
    <Gate x={LINE_X} z={2} />
    <Stand position={[CUP[0] - FINISH[0], 0, CUP[2] - FINISH[2]]} />
    {([[-20, -8, 4.4], [-14, 10, 4], [32, -8, 4.6], [34, 9, 4.2], [-28, -4, 4.6]] as Array<[number, number, number]>).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[15, 6.5, 0]} rotation={[0, 0, 0.4]} width={4} height={12} color="#fff0c8" opacity={0.1} />
    <LightPool position={[16, 0.08, 2]} width={6} depth={5} color="#fff2c8" opacity={0.2} />
    <Glow position={[CUP[0] - FINISH[0], 1.7, CUP[2] - FINISH[2]]} size={2.6} color="#ffe08a" opacity={0.45} />
    <Dust position={[10, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={23} speed={0.2} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
        {/* The shelf over where a trophy would go. It is empty. */}
        <group position={[PLACE.room[0] - 1.1, 0, PLACE.room[2] - 2.36]}>
          <Block position={[0, 1.7, 0.16]} size={[1.5, 0.08, 0.34]} color="#7a5632" />
          <Block position={[-0.6, 1.56, 0.1]} size={[0.08, 0.22, 0.2]} color="#5c3f24" />
          <Block position={[0.6, 1.56, 0.1]} size={[0.08, 0.22, 0.2]} color="#5c3f24" />
        </group>
      </Zone>
      <Zone name="forest">
        <Forest />
      </Zone>
      <Zone name="river">
        <River />
      </Zone>
      <Zone name="desert">
        <Desert />
      </Zone>
      <Zone name="oak">
        <Oak />
      </Zone>
      <Zone name="finish">
        <Finish />
      </Zone>
      <Zone name="fields">
        <Fields />
      </Zone>
      <Zone name="birch">
        <Birch />
      </Zone>
    </>
  );
};
