import type React from "react";
import { Bed, Clouds, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Lantern, LanternPost, Room, Stall, Well } from "../../../Topics/InThisTown";
import { Bunting, DisplayCase, DivingBoard, LifeguardChair, Lounger, PLACE, POOL, Parasol, Pool, RACE, SignBoard, Trophy } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  The square, the town hall and its window. The trophy is in that window all year.
 *   pool     The town pool: four lanes in a yard with a hedge round it, the changing hut, the lifeguard's chair,
 *            parasols, and the town's roofs over the hedge. Deck is y = 0; the water is just below it.
 *   home     His room, and the shower beside it. No south wall: that is where the camera lives.
 *   woods    The path at the edge of town, where the stranger waits. Night.
 *   arena    The contest: pool one of three, seven lanes, a stand on each long side, flags, the trophy table
 *            past the finish. Pools two and three lie beyond it to the east, each bigger.
 *
 * The people in the stands are not here: a stand that cheers needs the shot's clock, so the scenes draw them
 * (`Stand` in kit.tsx).
 */

/** A lawn with rectangular holes in it, so a pool can be sunk into the ground without grass filling it. */
type Rect = { x: number; z: number; w: number; d: number };

const Lawn: React.FC<{ w: number; d: number; holes?: Rect[]; y?: number; h?: number; kind?: "grass" | "stoneBrick"; tint?: string }> = ({
  w,
  d,
  holes = [],
  y = -0.55,
  h = 1,
  kind = "grass",
  tint,
}) => {
  const cut = holes.map((h) => ({ x0: h.x - h.w / 2, x1: h.x + h.w / 2, z0: h.z - h.d / 2, z1: h.z + h.d / 2 }));
  const zs = Array.from(new Set([-d / 2, d / 2, ...cut.flatMap((h) => [Math.max(-d / 2, h.z0), Math.min(d / 2, h.z1)])])).sort(
    (a, b) => a - b,
  );
  const slabs: Rect[] = [];
  for (let i = 0; i < zs.length - 1; i++) {
    const z0 = zs[i];
    const z1 = zs[i + 1];
    if (z1 - z0 < 0.01) continue;
    const zc = (z0 + z1) / 2;
    const spans = cut
      .filter((h) => h.z0 < zc && h.z1 > zc)
      .map((h) => [h.x0, h.x1] as [number, number])
      .sort((a, b) => a[0] - b[0]);
    let x0 = -w / 2;
    for (const [a, b] of spans) {
      if (a > x0) slabs.push({ x: (x0 + a) / 2, z: zc, w: a - x0, d: z1 - z0 });
      x0 = Math.max(x0, b);
    }
    if (x0 < w / 2) slabs.push({ x: (x0 + w / 2) / 2, z: zc, w: w / 2 - x0, d: z1 - z0 });
  }
  return (
    <>
      {slabs.map((sl, i) => (
        <Vox key={i} kind={kind} tint={tint} position={[sl.x, y, sl.z]} size={[sl.w, h, sl.d]} />
      ))}
    </>
  );
};


/** Distant trees in a ring: they stop the ground from ending in a straight line on the horizon. */
const Treeline: React.FC<{ r0: number; r1: number; n: number; seed?: number }> = ({ r0, r1, n, seed = 1 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.09;
      const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
      return (
        <Tree
          key={i}
          position={[Math.cos(a) * r, 0, Math.sin(a) * r]}
          height={4.5 + ((i * 7 + seed) % 4)}
          leaf={i % 2 ? "#3f7f2d" : "#356430"}
        />
      );
    })}
  </>
);

/**
 * A ground plane under everything, big enough that its edge is lost in the fog.
 * It takes the same holes as the lawn it sits under: a grass sheet below a pool reads as
 * a swimming pool full of grass through the water, which is exactly what it did.
 */
const FarGround: React.FC<{ holes?: Rect[] }> = ({ holes }) => <Lawn w={700} d={700} y={-0.62} holes={holes} />;

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <FarGround />
    <Treeline r0={58} r1={86} n={30} seed={2} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* The town hall. The trophy window is the middle of its front. */}
    <Hut at={[0, 0, -7]} w={10} d={7} h={5} roof="#8a3b2a" windows={[-3.3, 3.3]} />
    <DisplayCase position={[0, 0, -3.55]} />
    <Vox kind="planks" tint="#e8dcc0" position={[0, 3.55, -3.44]} size={[3.2, 0.5, 0.12]} />
    <Hut at={[17, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />
    <Hut at={[27, 0, -6]} w={5} h={3.4} tint="#caa268" roof="#4a6a3a" />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={[-3.6, 0, -1]} />
    <Well position={[6.4, 0, 1.4]} />
    <Stall position={[-7.5, 0, 2.4]} />

    {(
      [
        [-28, -12, 4.6],
        [-15.5, -13.5, 4],
        [6, -15.5, 4.4],
        [15, -13, 3.8],
        [27, -11, 4.6],
        [-25, 14, 4],
        [8, 17, 4.4],
        [25, 13, 4],
        [-33, 1, 4.8],
        [31, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.3} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const POOL_HOLE = { x: 0, z: 0, w: POOL.L + POOL.deck * 2, d: POOL.W + POOL.deck * 2 };

/** A clipped hedge, along x or along z. */
const Hedge: React.FC<{ from: [number, number]; to: [number, number]; h?: number }> = ({ from, to, h = 1.3 }) => {
  const alongX = Math.abs(to[0] - from[0]) > Math.abs(to[1] - from[1]);
  const len = alongX ? Math.abs(to[0] - from[0]) : Math.abs(to[1] - from[1]);
  return <Vox kind="leaves" tint="#4f8f3a" position={[(from[0] + to[0]) / 2, h / 2, (from[1] + to[1]) / 2]} size={alongX ? [len, h, 0.8] : [0.8, h, len]} />;
};

const PoolZone: React.FC = () => (
  <group position={PLACE.pool}>
    <Lawn w={90} d={70} holes={[POOL_HOLE]} />
    <FarGround holes={[POOL_HOLE]} />
    <Treeline r0={46} r1={74} n={30} seed={4} />
    <Pool />

    {/* the hedge round the yard, with the gate in the west side */}
    <Hedge from={[-14, -9.5]} to={[14, -9.5]} />
    <Hedge from={[-14, 9.5]} to={[14, 9.5]} />
    <Hedge from={[14, -9.5]} to={[14, 9.5]} />
    <Hedge from={[-14, -9.5]} to={[-14, -1.8]} />
    <Hedge from={[-14, 1.8]} to={[-14, 9.5]} />
    <Vox kind="path" position={[-21, 0.02, 0]} size={[14, 0.06, 3]} />
    <SignBoard at={[-13.3, 0, -4.2]} rotationY={Math.PI / 2} width={3.2} height={2.6} lines={[{ text: "TOWN", height: 0.5 }, { text: "POOL", height: 0.5 }]} />

    {/* NORTH SIDE, which is what the lens sees most: the changing hut, the lifeguard, parasols, a board */}
    <Hut at={[-8.5, 0, -8.2]} w={5} d={3} h={3.0} tint="#f2ead8" roof="#2f7fd0" door={1.1} windows={[-1.2]} />
    <LifeguardChair position={[-1.6, 0, -5.9]} />
    <Parasol position={[3.4, 0, -6.4]} color="#e0392b" />
    <Lounger position={[2.5, 0, -6.2]} rotationY={0.2} towel="#f0c030" />
    <Lounger position={[4.4, 0, -6.3]} rotationY={-0.15} towel="#2f7fd0" />
    <Parasol position={[9.6, 0, -6.6]} color="#f0c030" lean={-0.06} />
    <Lounger position={[10.4, 0, -6.2]} rotationY={-0.3} towel="#e86aa8" />
    <SignBoard at={[7.0, 0, -8.6]} width={3.6} height={2.5} lines={[{ text: "DEEP END", height: 0.4, color: "#a83c2a" }, { text: "2.4 M", height: 0.4 }]} />
    {/* a low bench along the south deck, with towels: the little kids sit here */}
    <Vox kind="planks" tint="#c8b18a" position={[-2, 0.3, 6.2]} size={[7, 0.12, 0.6]} />
    {[-5, -2, 1].map((x) => (
      <Vox key={x} kind="planks" tint="#b8a078" position={[x, 0.14, 6.2]} size={[0.16, 0.28, 0.5]} />
    ))}
    <Vox kind="wool" tint="#f0c030" position={[-4.2, 0.39, 6.2]} size={[0.9, 0.06, 0.5]} />
    <Vox kind="wool" tint="#3fb8a8" position={[0.4, 0.39, 6.2]} size={[0.9, 0.06, 0.5]} />
    <Parasol position={[-10.2, 0, 7.4]} color="#3fa860" />
    <Lounger position={[-9.2, 0, 7.2]} rotationY={Math.PI + 0.2} towel="#fbf8f0" />
    {/* the deep end: a springboard, and a ring on the fence */}
    <DivingBoard position={[POOL.L / 2 + 1.7, 0, 2]} />
    <Vox kind="log" position={[11.6, 0.9, -3]} size={[0.14, 1.8, 0.14]} />
    <mesh position={[11.5, 1.5, -3]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[0.32, 0.1, 8, 14]} />
      <meshStandardMaterial color="#e0392b" roughness={0.5} />
    </mesh>

    {/* the town over the hedge: roofs to the north and east, trees between */}
    <Hut at={[-17, 0, -17]} w={7} h={3.8} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} />
    <Hut at={[-4, 0, -19]} w={6} h={4.4} wall="cobble" roof="#5a4a6a" windows={[-1.6, 1.6]} />
    <Hut at={[8, 0, -17.5]} w={7} h={3.8} tint="#caa268" roof="#3f6b3a" windows={[-1.8, 1.8]} />
    <Hut at={[20, 0, -16]} w={6} h={4.2} tint="#d8c49a" roof="#3d5f9a" windows={[-1.6]} door={1.3} />
    <Hut at={[23, 0, 2]} w={6} h={3.8} wall="cobble" roof="#8a3b2a" windows={[-1.6, 1.6]} turn={-Math.PI / 2} />
    <Hut at={[-6, 0, 18]} w={7} h={3.8} tint="#caa268" roof="#5a4a6a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[10, 0, 19]} w={6} h={4.0} tint="#d8c49a" roof="#3f6b3a" windows={[1.5]} turn={Math.PI} />
    {(
      [
        [-11, -13.5, 5.2], [2, -13, 4.6], [14.5, -12.5, 5.4], [-22, -9, 5], [18.5, -8, 4.4], [19, 8, 5.2],
        [-19, 9, 4.8], [-12, 13.5, 5], [2, 13.5, 4.4], [17, 14, 5.4], [26, -9, 5.8], [-26, 4, 5.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <Bunting from={[-13.5, 3.2, -9.3]} to={[13.5, 3.2, -9.3]} n={22} sag={0.7} />
    <Vox kind="log" position={[-13.5, 1.6, -9.3]} size={[0.16, 3.2, 0.16]} />
    <Vox kind="log" position={[13.5, 1.6, -9.3]} size={[0.16, 3.2, 0.16]} />

    <Clouds y={44} center={[0, 0, 0]} />
    <GodRay position={[-9, 9, -3]} rotation={[0, 0, 0.42]} width={6} height={16} color="#fff4d0" opacity={0.07} />
    <LightPool position={[0, 0.1, 0]} width={20} depth={12} color="#eafcff" opacity={0.1} />
    <Dust position={[0, 3, 0]} area={[26, 5, 18]} count={70} size={0.05} color="#ffffff" opacity={0.5} seed={7} speed={0.25} />
  </group>
);

/** The shower: three tiled walls and a floor. Open to the south. */
const Shower: React.FC = () => (
  <group position={PLACE.shower}>
    <Vox kind="stoneBrick" tint="#cfe4ea" position={[0, -0.1, 0.4]} size={[3.2, 0.2, 3.6]} />
    <Vox kind="stoneBrick" tint="#bcd9e2" position={[0, 1.5, -1.3]} size={[3.2, 3.2, 0.2]} castShadow={false} />
    <Vox kind="stoneBrick" tint="#b4d2dc" position={[-1.6, 1.5, 0.4]} size={[0.2, 3.2, 3.6]} castShadow={false} />
    <Vox kind="stoneBrick" tint="#b4d2dc" position={[1.6, 1.5, 0.4]} size={[0.2, 3.2, 3.6]} castShadow={false} />
    {/* the pipe and the rose */}
    <Vox kind="stone" tint="#c8ced2" position={[0, 1.5, -1.15]} size={[0.08, 2.4, 0.08]} />
    <Vox kind="stone" tint="#c8ced2" position={[0, 2.66, -0.95]} size={[0.08, 0.08, 0.48]} />
    <Vox kind="stone" tint="#dfe6e8" position={[0, 2.6, -0.72]} size={[0.42, 0.08, 0.42]} />
    {/* a shelf, a bottle, a duck */}
    <Vox kind="planks" tint="#f2ead8" position={[1.3, 1.3, -0.6]} size={[0.4, 0.06, 0.9]} />
    <Vox kind="wool" tint="#3fa860" position={[1.3, 1.5, -0.8]} size={[0.16, 0.34, 0.16]} />
    <Vox kind="wool" tint="#f0c030" position={[1.3, 1.42, -0.4]} size={[0.24, 0.18, 0.2]} />
    <Vox kind="wool" tint="#f0c030" position={[1.3, 1.56, -0.34]} size={[0.14, 0.14, 0.14]} />
    <Vox kind="wool" tint="#f08030" position={[1.3, 1.54, -0.24]} size={[0.07, 0.05, 0.08]} />
    <Vox kind="wool" tint="#f6f2e6" position={[-0.9, 0.03, 1.4]} size={[1.1, 0.05, 0.7]} />
    <pointLight position={[0, 2.4, 1.2]} color="#f4fbff" intensity={9} distance={7} decay={2} />
  </group>
);

const Home: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.home}>
    <Room at={[0, 0, 0]} night={night} />
    <Bed position={[1.3, 0, -0.4]} rotationY={0} width={0.9} length={2} sheet="#c94f3d" blanket="#c94f3d" />
    <Vox kind="planks" tint="#a8834e" position={[-1.7, 0.28, -0.4]} size={[0.9, 0.56, 0.9]} />
    <Lantern position={[-1.7, 0.62, -0.4]} />
    <Vox kind="wool" tint="#e8dcc0" position={[1.6, 0.06, 2.4]} size={[1.6, 0.06, 1.2]} />
    {/* a shelf with last year's ribbons for taking part, a desk, a poster of the cup */}
    <Vox kind="planks" tint="#8a6a42" position={[-0.4, 1.7, -2.3]} size={[1.6, 0.08, 0.3]} />
    <Vox kind="wool" tint="#2f7fd0" position={[-0.9, 1.86, -2.3]} size={[0.14, 0.24, 0.1]} />
    <Vox kind="wool" tint="#3fa860" position={[-0.6, 1.83, -2.3]} size={[0.14, 0.18, 0.1]} />
    <Vox kind="wool" tint="#f0c030" position={[0.1, 1.82, -2.3]} size={[0.3, 0.16, 0.2]} />
    <Vox kind="wool" tint="#f6f2e6" position={[2.64, 1.7, 0.6]} size={[0.03, 0.9, 0.7]} />
    <Vox kind="wool" tint="#f0c030" position={[2.62, 1.75, 0.6]} size={[0.03, 0.4, 0.3]} />
    <Vox kind="planks" tint="#a8834e" position={[-2.2, 0.4, 2.2]} size={[0.8, 0.8, 1.4]} />
    <Vox kind="wool" tint="#c0392b" position={[0.2, 0.03, 1.2]} size={[2.2, 0.04, 1.6]} />
    <Glow position={[-1.7, 0.9, -0.4]} size={1.2} color="#ffd9a0" opacity={night ? 0.4 : 0.16} />
    <LightPool position={[-1.2, 0.05, 0.6]} width={4} depth={4} color="#ffd9a0" opacity={0.12} />
  </group>
);

const Woods: React.FC = () => (
  <group position={PLACE.woods}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[50, 1, 50]} />
    <FarGround />
    <Treeline r0={30} r1={56} n={28} seed={7} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[4.2, 0.06, 30]} />
    {(
      [
        [-7, -8, 6],
        [6, -6, 6.6],
        [-9, 2, 7],
        [8, 4, 6.2],
        [-6, 12, 6.8],
        [7, 14, 6],
        [-12, -2, 5.4],
        [12, -1, 5.8],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#2f5a2a" : "#356430"} />
    ))}
    {(
      [
        [-3.6, -4, 7.4], [3.7, 0.4, 6.4], [-3.9, 8.6, 6.8], [3.5, 10.2, 7.2], [4.1, -9, 6.6], [-4.2, -11, 7], [-15, 6, 6], [15, 8, 6.4],
        [-8, -16, 7], [9, -15, 6.2], [-5.5, 15.5, 6.4], [5.6, 16, 6],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Tree key={`in${i}`} position={[x, 0, z]} height={h} leaf={i % 2 ? "#28502a" : "#2f5a2c"} />
    ))}
    {/* toadstools along the path, and fireflies */}
    {([[-2.5, 3], [2.6, 5.2], [-2.7, 9.5], [2.4, 0.5], [-2.3, -3], [2.8, 11.5]] as Array<[number, number]>).map(([x, z], i) => (
      <group key={`m${i}`} position={[x, 0, z]}>
        <Vox kind="wool" tint="#efe6d2" position={[0, 0.1, 0]} size={[0.08, 0.2, 0.08]} />
        <Vox kind="wool" tint={i % 2 ? "#c0392b" : "#b0803a"} position={[0, 0.24, 0]} size={[0.26, 0.1, 0.26]} />
      </group>
    ))}
    <Dust position={[0, 1.4, 4]} area={[9, 2.4, 16]} count={40} size={0.07} color="#e8f08a" opacity={0.9} seed={21} speed={0.35} />
    <Lantern position={[2.4, 2.1, 4]} />
    <LanternPost position={[-2.6, 0, 6.5]} seed={9} />
    <Glow position={[0, 1.6, 2]} size={2.4} color="#a8c8ff" opacity={0.3} />
    <LightPool position={[0, 0.05, 3]} width={10} depth={12} color="#9fc0ff" opacity={0.14} />
    <Dust position={[0, 2, 2]} area={[16, 4, 20]} count={80} size={0.05} color="#cfe0ff" opacity={0.4} seed={11} speed={0.15} />
  </group>
);

const RACE_HOLES = [
  { x: 0, z: 0, w: RACE.L + RACE.deck * 2, d: RACE.W + RACE.deck * 2 },
  { x: 60, z: -4, w: 44 + POOL.deck * 2, d: 24 + POOL.deck * 2 },
  { x: 126, z: 6, w: 60 + POOL.deck * 2, d: 30 + POOL.deck * 2 },
];

const Arena: React.FC = () => (
  <group position={PLACE.arena}>
    <Lawn w={260} d={150} holes={RACE_HOLES} />
    <FarGround holes={RACE_HOLES} />
    <Treeline r0={150} r1={190} n={36} seed={9} />
    {/* The arena stands in the town's park, not in an empty field: trees behind both stands, round the start
        and between the pools, and roofs behind the trees. */}
    {Array.from({ length: 34 }, (_, i) => {
      const side = i % 2 ? 1 : -1;
      const n = Math.floor(i / 2);
      const x = -46 + n * 6.1 + ((n * 37) % 10) * 0.25;
      const z = side * (21.5 + ((n * 53 + (side > 0 ? 3 : 0)) % 7) * 1.5);
      return <Tree key={`row${i}`} position={[x, 0, z]} height={4.6 + ((i * 7) % 4) * 0.7} leaf={i % 3 === 0 ? "#356430" : i % 3 === 1 ? "#3f7f2d" : "#4a8c33"} spread={1.05} />;
    })}
    {(
      [
        [-33, -13], [-36, -3], [-34, 9], [-40, 15], [-42, -9], [-29, 17], [-30, -18], [-48, 2],
        [26, -15], [30, 13], [27, 19], [33, -21], [91, -22], [96, 26], [164, -8], [166, 16], [150, 30], [140, -24],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Tree key={`near${i}`} position={[x, 0, z]} height={4.4 + (i % 4) * 0.8} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} spread={1.1} />
    ))}
    {(
      [
        [-52, -14, Math.PI / 2, "#8a3b2a"], [-54, 8, Math.PI / 2, "#3d5f9a"], [-22, -36, 0, "#5a4a6a"], [-4, -38, 0, "#8a3b2a"], [14, -36, 0, "#3f6b3a"],
        [34, -38, 0, "#3d5f9a"], [-16, 37, Math.PI, "#3f6b3a"], [4, 38, Math.PI, "#8a3b2a"], [24, 37, Math.PI, "#5a4a6a"],
      ] as Array<[number, number, number, string]>
    ).map(([x, z, turn, roof], i) => (
      <Hut key={`hut${i}`} at={[x, 0, z]} w={6 + (i % 3)} h={3.6 + (i % 2) * 0.6} tint={i % 2 ? "#d8c49a" : "#caa268"} roof={roof} windows={[-1.6, 1.6]} turn={turn} />
    ))}

    {/* Pool one: the smallest. Ten lanes. */}
    <Pool length={RACE.L} width={RACE.W} lanes={RACE.lanes} deck={RACE.deck} seed={5} />
    {/* Pool two and pool three, each bigger, each further east. */}
    <group position={[60, 0, -4]}>
      <Pool length={44} width={24} lanes={12} blocks={false} seed={8} />
    </group>
    <group position={[126, 0, 6]}>
      <Pool length={60} width={30} lanes={15} blocks={false} seed={11} />
    </group>
    <Vox kind="path" position={[26, 0.02, 0]} size={[14, 0.06, 4]} />
    <Vox kind="path" position={[86, 0.02, 2]} size={[12, 0.06, 4]} />

    {/* flags over both long sides, and across the finish */}
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="log" position={[-16, 2.2, s * 13.2]} size={[0.18, 4.4, 0.18]} />
        <Vox kind="log" position={[16, 2.2, s * 13.2]} size={[0.18, 4.4, 0.18]} />
        <Bunting from={[-16, 4.3, s * 13.2]} to={[16, 4.3, s * 13.2]} n={30} sag={0.9} />
      </group>
    ))}
    <Bunting from={[16, 4.3, -13.2]} to={[16, 4.3, 13.2]} n={18} sag={0.8} />
    {/* the finish board over the east wall */}
    <Vox kind="planks" tint="#fbf8f0" position={[16.2, 3.3, 0]} size={[0.16, 0.9, 7]} />
    <PixelText text="FINISH" position={[16.1, 3.3, 0]} rotationY={-Math.PI / 2} height={0.55} color="#a83c2a" />

    {/* The board that says which pool this is, by the start. */}
    <SignBoard
      at={[-20.5, 0, -7]}
      rotationY={Math.PI / 2}
      width={5.6}
      height={3.4}
      lines={[{ text: "SUMMER RACE", height: 0.42, color: "#a83c2a" }, { text: "POOL ONE", height: 0.5 }, { text: "THE SMALLEST", height: 0.3 }]}
    />
    {/* the speaker on its pole */}
    <Vox kind="log" position={[-17.4, 2.0, 11.6]} size={[0.2, 4.0, 0.2]} />
    <Vox kind="stone" tint="#3a3f48" position={[-17.4, 4.1, 11.6]} size={[0.7, 0.6, 0.5]} />
    <Vox kind="stone" tint="#22262c" position={[-17.04, 4.1, 11.6]} size={[0.04, 0.42, 0.34]} />

    {/* The trophy table, past the finish wall. */}
    <group position={[18.6, 0, -3]}>
      <Vox kind="planks" tint="#a8834e" position={[0, 0.5, 0]} size={[1.3, 1.0, 2.6]} />
      <Vox kind="wool" tint="#e0392b" position={[0, 1.03, 0]} size={[1.5, 0.06, 2.8]} />
      <Trophy position={[0, 1.07, 0]} scale={1.7} glow={0.3} />
      <Trophy position={[0, 1.07, 0.95]} scale={0.85} />
      <Trophy position={[0, 1.07, -0.95]} scale={0.65} />
    </group>
    {/* the sign-up desk, west of the start */}
    <group position={[-24, 0, 4]}>
      <Vox kind="planks" tint="#a8834e" position={[0, 0.45, 0]} size={[2.6, 0.9, 0.9]} />
      <Vox kind="wool" tint="#fbf8f0" position={[0, 0.92, 0]} size={[2.8, 0.05, 1.0]} />
      <Vox kind="wool" tint="#e0392b" position={[0, 2.5, 0.2]} size={[3.6, 0.12, 2.4]} />
      {[[-1.7, -0.9], [1.7, -0.9], [-1.7, 1.3], [1.7, 1.3]].map(([x, z], i) => (
        <Vox key={i} kind="log" tint="#d8d0c0" position={[x, 1.25, z]} size={[0.1, 2.5, 0.1]} />
      ))}
    </group>

    {/* Tents, so the field reads as an event. */}
    {(
      [
        [-27, -17, "#f0c030"], [-24, 19, "#2f7fd0"], [25, 19, "#3fa860"], [27, -17, "#e86aa8"],
      ] as Array<[number, number, string]>
    ).map(([x, z, c], i) => (
      <group key={i} position={[x, 0, z]}>
        <Vox kind="wool" tint={c} position={[0, 2.3, 0]} size={[4, 0.14, 4]} />
        <Vox kind="wool" tint="#fbf8f0" position={[0, 2.5, 0]} size={[2.6, 0.26, 2.6]} />
        {[[-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8]].map(([px, pz], j) => (
          <Vox key={j} kind="log" tint="#d8d0c0" position={[px, 1.15, pz]} size={[0.12, 2.3, 0.12]} />
        ))}
      </group>
    ))}
    {(
      [
        [-34, -24, 5.6], [-18, -27, 5], [0, -28, 6], [18, -27, 5.2], [36, -24, 5.8], [-35, 25, 5.4], [-10, 28, 5], [10, 28, 5.8],
        [35, 26, 5.2], [-40, -2, 6],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}

    <Clouds y={52} center={[20, 0, 0]} />
    <GodRay position={[-10, 10, -6]} rotation={[0, 0, 0.45]} width={8} height={18} color="#fff4d0" opacity={0.07} />
    <LightPool position={[0, 0.1, 0]} width={34} depth={18} color="#eafcff" opacity={0.1} />
    <Dust position={[0, 3, 0]} area={[44, 6, 26]} count={110} size={0.05} color="#ffffff" opacity={0.45} seed={13} speed={0.22} />
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
      <Zone name="pool">
        <PoolZone />
      </Zone>
      <Zone name="home">
        <Home night={night} />
        <Shower />
      </Zone>
      <Zone name="woods">
        <Woods />
      </Zone>
      <Zone name="arena">
        <Arena />
      </Zone>
    </>
  );
};
