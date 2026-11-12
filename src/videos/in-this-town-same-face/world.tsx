import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, useActiveShot } from "../../engine";
import type { BlockKind, Vec3 } from "../../engine";
import { Fire } from "../../../Topics/InThisTown/creatures";
import { Blaze, HILL, PLACE, Smoke } from "./kit";

/**
 * THE VALLEY, in five zones. A shot names the zone it plays in.
 *
 *   village  The town. One street, west–east (x); house fronts on the north side face south, at the camera.
 *            The square is at x = 0. The burned house is at the west end.
 *   hill     Only the ground and the hill: for shots on the slope where neither village matters.
 *   valley2  The other side of the hill: a village like ours, on fire. From x = 63 east.
 *   room     The hero's room. No south wall: that is where the camera lives. Lens north, east or west.
 *   tunnel   Under the hill. It runs along x and has no end wall: the camera is where the dirt would be.
 *
 * The ground and the hill belong to every outdoor zone. 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const SOOT = "#3a3331";

/** A village house. `at` is the middle of its front wall, at ground level. `turn` 0 faces south. */
const Hut: React.FC<{
  at: Vec3;
  w?: number;
  d?: number;
  h?: number;
  wall?: BlockKind;
  tint?: string;
  roof?: string;
  door?: number;
  windows?: number[];
  turn?: number;
  /** Burned out long ago: black walls, half a roof, no door, no glass. */
  burnt?: boolean;
  /** Burning now: the windows glow. The flames are added by the zone. */
  ablaze?: boolean;
}> = ({ at, w = 6, d = 6, h = 3.8, wall = "planks", tint, roof = "#8a3b2a", door = 0, windows = [], turn = 0, burnt = false, ablaze = false }) => {
  const layers = Math.ceil((w + 1) / 1.8);
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Vox kind={wall} tint={burnt ? SOOT : tint} position={[0, (h + 1) / 2, -d / 2]} size={[w, h - 1, d]} />
      <Vox kind="cobble" tint={burnt ? "#4d4845" : undefined} position={[0, 0.5, -d / 2]} size={[w + 0.12, 1, d + 0.12]} />
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" tint={burnt ? "#262019" : undefined} position={[s * (w / 2), h / 2, 0.06]} size={[0.5, h, 0.5]} />
      ))}
      <Vox kind="log" tint={burnt ? "#262019" : undefined} position={[0, h + 0.05, 0.06]} size={[w + 0.5, 0.4, 0.5]} />
      {Array.from({ length: layers }, (_, i) => {
        const lw = w + 1 - i * 1.8;
        if (lw < 0.9) return null;
        // A burned roof keeps its eaves on one side and nothing else.
        if (burnt) return i > 1 ? null : <Vox key={i} kind="darkPlanks" tint="#2a2422" position={[-w * 0.22 - i * 0.3, h + 0.55 + i * 0.6, -d / 2]} size={[lw * 0.5, 0.6, d + 1]} />;
        return <Vox key={i} kind="darkPlanks" tint={roof} position={[0, h + 0.55 + i * 0.6, -d / 2]} size={[lw, 0.6, d + 1]} />;
      })}
      {burnt ? (
        <>
          <Block position={[door, 1.05, 0.02]} size={[1.1, 2.1, 0.1]} color="#060505" castShadow={false} />
          <Vox kind="log" tint="#262019" position={[w * 0.2, h + 0.9, -d * 0.3]} rotation={[0.5, 0.3, 0.9]} size={[0.3, 3.4, 0.3]} />
          <Vox kind="log" tint="#262019" position={[w * 0.32, h + 0.5, -d * 0.7]} rotation={[-0.4, 0, 0.5]} size={[0.3, 2.6, 0.3]} />
          <Vox kind="darkPlanks" tint="#2a2422" position={[w * 0.3, 0.2, 0.9]} rotation={[0, 0.5, 0]} size={[1.4, 0.4, 0.5]} />
        </>
      ) : (
        <>
          <Vox kind="darkPlanks" position={[door, 1.05, 0.06]} size={[1.1, 2.1, 0.14]} />
          <Block position={[door + 0.36, 1.05, 0.15]} size={[0.08, 0.08, 0.06]} color="#e8c44a" />
          <Vox kind="stone" position={[door, 0.06, 0.62]} size={[1.5, 0.12, 0.9]} />
        </>
      )}
      {windows.map((x) => (
        <group key={x} position={[x, 2.15, 0.02]}>
          <Block size={[1.3, 1.3, 0.12]} color={burnt ? "#120e0c" : "#5c3f24"} />
          <Block
            position={[0, 0, 0.03]}
            size={[1.02, 1.02, 0.1]}
            color={burnt ? "#050404" : ablaze ? "#ffb44a" : "#a8d8f0"}
            emissive={burnt ? "#000000" : ablaze ? "#ff7a1e" : "#6fb6e0"}
            emissiveIntensity={burnt ? 0 : ablaze ? 2.4 : 0.25}
            castShadow={false}
          />
          {burnt ? null : (
            <>
              <Block position={[0, 0, 0.09]} size={[1.02, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
              <Block position={[0, 0, 0.09]} size={[0.07, 1.02, 0.03]} color="#5c3f24" castShadow={false} />
            </>
          )}
          {burnt || ablaze ? null : (
            <>
              <Vox kind="leaves" position={[0, -0.84, 0.18]} size={[1.3, 0.3, 0.32]} />
              <Block position={[-0.32, -0.64, 0.22]} size={[0.15, 0.15, 0.15]} color="#e8433a" />
              <Block position={[0.26, -0.64, 0.24]} size={[0.15, 0.15, 0.15]} color="#f2d23a" />
            </>
          )}
        </group>
      ))}
    </group>
  );
};

const LampPost: React.FC<{ position: Vec3; seed?: number }> = ({ position, seed = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 1.1, 0]} size={[0.22, 2.2, 0.22]} />
    <Torch position={[0, 2.2, 0]} seed={seed} />
  </group>
);

/** The village bell, on its stone step. `fallen` lays it on its side. */
const Bell: React.FC<{ position: Vec3; fallen?: boolean }> = ({ position, fallen = false }) => (
  <group position={position}>
    <Vox kind="cobble" position={[0, 0.25, 0]} size={[2.6, 0.5, 1.5]} />
    <group rotation={fallen ? [0, 0.3, 1.2] : [0, 0, 0]} position={fallen ? [1.4, 0.3, 0.5] : [0, 0, 0]}>
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * 0.9, 1.6, 0]} size={[0.3, 2.2, 0.3]} />
      ))}
      <Vox kind="log" position={[0, 2.8, 0]} size={[2.4, 0.3, 0.3]} />
      <Block position={[0, 2.28, 0]} size={[0.56, 0.6, 0.56]} color="#e8c44a" metalness={0.5} roughness={0.4} />
      <Block position={[0, 1.94, 0]} size={[0.74, 0.12, 0.74]} color="#d9b23a" metalness={0.5} roughness={0.4} />
    </group>
  </group>
);

const Well: React.FC = () => (
  <group position={PLACE.well}>
    {(
      [
        [0, 0.95, 2.4, 0.5],
        [0, -0.95, 2.4, 0.5],
        [0.95, 0, 0.5, 1.4],
        [-0.95, 0, 0.5, 1.4],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, d], i) => (
      <Vox key={i} kind="cobble" position={[x, 0.4, z]} size={[w, 0.8, d]} />
    ))}
    <Block position={[0, 0.5, 0]} size={[1.4, 0.06, 1.4]} color="#3f7fd8" emissive="#2a5fb8" emissiveIntensity={0.4} castShadow={false} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="log" position={[s * 1.05, 1.5, 0]} size={[0.26, 2.2, 0.26]} />
    ))}
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 2.75, 0]} size={[2.9, 0.3, 2.2]} />
    <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 3.05, 0]} size={[1.9, 0.3, 1.4]} />
  </group>
);

/** The market stall. The counter top is y = 1.0. */
const Stall: React.FC = () => (
  <group position={PLACE.stall}>
    <Vox kind="planks" position={[0, 0.5, 0]} size={[2.6, 1, 0.9]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="log" position={[s * 1.2, 1.4, -0.36]} size={[0.16, 2.8, 0.16]} />
    ))}
    {[-1, 0, 1].map((k) => (
      <Vox key={k} kind="wool" tint={k === 0 ? "#f4f1ea" : "#c8362e"} position={[k * 0.9, 2.85, 0.05]} rotation={[0.32, 0, 0]} size={[0.9, 0.1, 1.5]} />
    ))}
    <Vox kind="hay" position={[1.9, 0.4, 0.2]} size={[0.8, 0.8, 0.8]} />
  </group>
);

/** The ground, the hill that closes the valley, and the ridges along it. In every outdoor shot. */
const Terrain: React.FC<{ smoke: boolean }> = ({ smoke }) => (
  <>
    <Vox kind="grass" position={[30, -0.5, 0]} size={[190, 1, 104]} />
    {Array.from({ length: HILL.layers }, (_, i) => (
      <Vox key={i} kind="grass" tint={i % 2 ? "#4c8c33" : "#6bb244"} position={[HILL.x, i + 0.5, 0]} size={[30 - 2.4 * i, 1, 76 - 3 * i]} />
    ))}
    {/* Rocks and flowers on the slopes, off the line the story climbs (z = 0). */}
    {(
      [
        [36.4, 3, 5.5, "cobble"],
        [40.1, 6, -6.5, "mossy"],
        [42.4, 8, 9, "cobble"],
        [38.9, 5, -12, "mossy"],
        [58.2, 4, 7, "cobble"],
        [55.8, 6, -8, "mossy"],
      ] as Array<[number, number, number, BlockKind]>
    ).map(([x, y, z, kind], i) => (
      <Vox key={i} kind={kind} position={[x, y + 0.35, z]} rotationY={i * 0.6} size={[1.1, 0.7, 0.9]} />
    ))}
    {(
      [
        [35.2, 2, 3.2, "#f2d23a"],
        [37.6, 4, -4.2, "#e8433a"],
        [41.2, 7, 4.4, "#f2f2f2"],
        [43.6, 9, -3.4, "#f2d23a"],
        [36.4, 3, -8.6, "#e85a9a"],
      ] as Array<[number, number, number, string]>
    ).map(([x, y, z, color], i) => (
      <group key={i} position={[x, y, z]}>
        <Block position={[0, 0.12, 0]} size={[0.04, 0.24, 0.04]} color="#3f8a35" />
        <Block position={[0, 0.27, 0]} size={[0.14, 0.1, 0.14]} color={color} />
      </group>
    ))}
    {(
      [
        [38.2, 4, -17, 3.4],
        [41.8, 7, 15, 3],
        [36.9, 3, 20, 3.6],
        [43, 8, -24, 3.2],
        [57.6, 4, -18, 3.4],
        [54.2, 7, 19, 3],
      ] as Array<[number, number, number, number]>
    ).map(([x, y, z, height], i) => (
      <Tree key={i} position={[x, y, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#356e27"} spread={0.8} />
    ))}
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="grass" tint="#5a9a3a" position={[30, 1.5, s * 40]} size={[190, 3, 14]} />
        <Vox kind="grass" tint="#538f36" position={[30, 4.5, s * 44]} size={[190, 3, 8]} />
        {[-38, -20, -4, 13, 29, 70, 86, 102].map((x, i) => (
          <Tree key={x} position={[x + (i % 3), 3, s * (36.5 + (i % 2) * 2)]} height={3.6 + (i % 3) * 0.6} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
        ))}
      </group>
    ))}
    <Clouds y={48} center={[30, 0, 0]} color={smoke ? "#6b4a3c" : "#ffffff"} opacity={smoke ? 0.55 : 0.92} />
  </>
);

const Village: React.FC = () => (
  <>
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Vox kind="path" position={[-10, 0.021, -2.6]} size={[3, 0.06, 4.6]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={PLACE.black} w={7} d={6} h={3.8} windows={[-2, 2]} burnt />
    <Hut at={[-10, 0, -5]} w={6} d={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* Her porch is raised, so she looks down at a kid and the two of them stack in a tall frame. */}
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} d={6} h={3.8} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} d={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} d={6} h={3.8} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} d={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} d={6} h={3.8} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well />
    <Stall />

    {/* The grass round the burned house never grew back. */}
    <Block position={[-21, 0.012, -3.6]} size={[9.5, 0.02, 4.4]} color="#2c2a22" castShadow={false} />
    <Block position={[-17.4, 0.014, -1.6]} size={[2.2, 0.02, 1.6]} color="#34322a" castShadow={false} />

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
        [29.5, -6, 3.6],
        [-33, 1, 4.8],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <Vox kind="hay" position={[-3.4, 0.4, -3.4]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="hay" position={[-2.5, 0.4, -3.6]} rotationY={0.3} size={[0.8, 0.8, 0.8]} />
    {/* Flower beds along the street. */}
    {[-7.5, -2.2, 3.4, 13.5, 17.2, 22.5].map((x, i) => (
      <group key={x} position={[x, 0, -0.9 + (i % 2) * 0.3]}>
        <Vox kind="leaves" position={[0, 0.14, 0]} size={[1.1, 0.28, 0.5]} />
        <Block position={[-0.3, 0.33, 0.05]} size={[0.14, 0.14, 0.14]} color={i % 2 ? "#e8433a" : "#f2d23a"} />
        <Block position={[0.25, 0.33, -0.05]} size={[0.14, 0.14, 0.14]} color={i % 3 ? "#f2f2f2" : "#e85a9a"} />
      </group>
    ))}

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const OTHER_HUTS: Array<{ at: Vec3; w: number; turn: number; roof: string; tint?: string }> = [
  { at: [77, 0, -5], w: 6, turn: 0, roof: "#8a3b2a", tint: "#caa268" },
  { at: [86, 0, -7.5], w: 7, turn: 0, roof: "#3d5f9a" },
  { at: [94.5, 0, -3], w: 6, turn: -0.5, roof: "#3f6b3a", tint: "#d8c49a" },
  { at: [79, 0, 9.5], w: 6, turn: Math.PI, roof: "#5a4a6a", tint: "#d8c49a" },
  { at: [90, 0, 10.5], w: 7, turn: Math.PI, roof: "#8a3b2a" },
];
/** The middle of a hut's roof, in the world. */
const roofOf = (hut: { at: Vec3; turn: number }, up = 5): Vec3 => [hut.at[0] - Math.sin(hut.turn) * 3, up, hut.at[2] - Math.cos(hut.turn) * 3];

/** The village on the other side: the same houses, the same bell, and every roof on fire. */
const OtherVillage: React.FC = () => (
  <>
    <Vox kind="path" position={[84, 0.02, 1]} size={[30, 0.06, 4.6]} />
    <Vox kind="path" position={[84, 0.021, 1]} size={[11, 0.06, 11]} />
    <Bell position={[84, 0, -1.8]} fallen />
    {OTHER_HUTS.map((hut, i) => {
      const r = roofOf(hut);
      return (
        <group key={i}>
          <Hut at={hut.at} w={hut.w} roof={hut.roof} tint={hut.tint} windows={[-1.7, 1.7]} turn={hut.turn} ablaze />
          <Blaze position={[r[0] - 1.1, 4.3, r[2]]} size={2.1} height={7} count={24} seed={i * 2 + 1} />
          <Blaze position={[r[0] + 1.5, 4.7, r[2] - 0.4]} size={1.5} height={5.5} count={16} seed={i * 2 + 2} />
          <Fire from={[r[0] - 0.2, 4.6, r[2] + 0.8]} to={[r[0] + 0.3, 8.2, r[2] + 1]} width={1.2} count={16} seed={i + 3} />
          <Glow position={[r[0], 6.6, r[2]]} size={16} color="#ff6a1e" opacity={0.6} />
          <Smoke position={[r[0], 8, r[2]]} rise={17} spread={2.2} size={6.5} count={11} speed={0.09} lean={0.12} seed={30 + i} />
        </group>
      );
    })}
    <pointLight position={[82, 4.5, 0.5]} color="#ff7a2a" intensity={80} distance={30} decay={2} />
    <pointLight position={[90, 4.5, 2]} color="#ff7a2a" intensity={60} distance={26} decay={2} />
    <pointLight position={[69, 4, 0]} color="#ff8a3a" intensity={55} distance={22} decay={2} />
    {/* What the fire has already had: scorched ground, a cart, a field. */}
    {(
      [
        [80, 3.5, 5, 3.4],
        [87, -3, 4.4, 3],
        [75, 2, 3, 4.2],
        [92, 4.5, 3.6, 2.6],
        [84, 6.5, 2.6, 2.2],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, d], i) => (
      <Block key={i} position={[x, 0.03 + i * 0.002, z]} rotationY={i * 0.5} size={[w, 0.02, d]} color="#1c1612" castShadow={false} />
    ))}
    <Vox kind="hay" tint="#3a2a18" position={[81, 0.4, 5.5]} size={[0.9, 0.8, 0.9]} />
    <Vox kind="hay" tint="#2a1e12" position={[81.9, 0.4, 6]} rotationY={0.4} size={[0.9, 0.8, 0.9]} />
    <Fire from={[81.4, 0.8, 5.7]} to={[81.6, 2.6, 5.8]} width={0.5} count={12} seed={41} />
    <Tree position={[71, 0, -12]} height={4} leaf="#4a3a22" />
    <Tree position={[97, 0, 6]} height={4.4} leaf="#3a2c1a" />

    <LightPool position={[84, 0.06, 1]} width={26} depth={22} color="#ff7a2a" opacity={0.3} />
    <GodRay position={[84, 6, -3]} rotation={[0, 0.3, 0.2]} width={7} height={13} color="#ff8a3c" opacity={0.08} />
    <Dust position={[82, 4, 1]} area={[34, 9, 28]} count={120} size={0.08} color="#ffb347" opacity={0.95} seed={17} speed={0.7} />
  </>
);

/** The hero's room. Origin PLACE.room. The scenes put the bed and the hole in it, because both move. */
const Room: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.room}>
    {/* Walls and ceiling cast no shadow, so the sky lights the room as if through the roof. */}
    <Vox kind="planks" position={[0, -0.1, 1.5]} size={[5.4, 0.2, 8]} />
    <Vox kind="planks" tint="#c8a878" position={[0, 2.3, -2.5]} size={[5.4, 4.6, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#c0a070" position={[-2.7, 2.3, 1.5]} size={[0.2, 4.6, 8]} castShadow={false} />
    <Vox kind="planks" tint="#c0a070" position={[2.7, 2.3, 1.5]} size={[0.2, 4.6, 8]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 4.7, 1.5]} size={[5.6, 0.2, 8]} castShadow={false} />
    <Vox kind="log" position={[0, 3.1, -2.35]} size={[5.4, 0.3, 0.3]} />

    <group position={[1.3, 1.85, -2.39]}>
      <Block size={[1.5, 1.5, 0.08]} color="#5c3f24" />
      <Block
        position={[0, 0, 0.03]}
        size={[1.2, 1.2, 0.06]}
        color={night ? "#a9c6ff" : "#cfeaff"}
        emissive={night ? "#7fa8ff" : "#bfe2ff"}
        emissiveIntensity={night ? 1.5 : 1.1}
        castShadow={false}
      />
      {night ? <Block position={[0.25, 0.25, 0.065]} size={[0.34, 0.34, 0.02]} color="#f4f7ff" emissive="#ffffff" emissiveIntensity={2.2} castShadow={false} /> : null}
      <Block position={[0, 0, 0.07]} size={[1.2, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
      <Block position={[0, 0, 0.07]} size={[0.07, 1.2, 0.03]} color="#5c3f24" castShadow={false} />
    </group>
    <GodRay position={[1.1, 1.2, -1.35]} rotation={[0.55, 0, 0.12]} width={1.5} height={2.8} color={night ? "#a9c6ff" : "#fff0c8"} opacity={night ? 0.2 : 0.14} />
    <LightPool position={[0.95, 0.012, -0.55]} width={1.9} depth={1.7} color={night ? "#a9c6ff" : "#fff0c8"} opacity={0.34} />
    <pointLight position={[1.2, 2.1, -1.5]} color={night ? "#8fb4ff" : "#fff0d0"} intensity={night ? 9 : 6} distance={7} decay={2} />
    {/* Fill from the open side, where the camera lives. Without it a face turned to the lens at night is black. */}
    <pointLight position={[0.4, 2.3, 2.9]} color={night ? "#93a9ff" : "#ffffff"} intensity={night ? 34 : 10} distance={11} decay={2} />

    <Vox kind="wool" tint="#3f8a8f" position={[0.9, 0.02, 0.7]} size={[2.4, 0.04, 2]} />
    <Vox kind="darkPlanks" position={[2.15, 0.35, -1.7]} size={[0.8, 0.7, 1.1]} />
    <Block position={[1.74, 0.42, -1.7]} size={[0.04, 0.12, 0.14]} color="#e8c44a" />
    <Vox kind="planks" position={[2.5, 1.5, 0.6]} size={[0.24, 0.08, 1.4]} />
    <Block position={[2.46, 1.66, 0.9]} size={[0.2, 0.24, 0.2]} color="#e8433a" />
    <Block position={[2.46, 1.64, 0.55]} size={[0.2, 0.2, 0.2]} color="#f2d23a" />
    {/* The flower the golem gave him, in a pot on the shelf. He kept it. */}
    <Block position={[2.46, 1.6, 0.22]} size={[0.16, 0.12, 0.16]} color="#9c5240" />
    <Block position={[2.46, 1.78, 0.22]} size={[0.03, 0.24, 0.03]} color="#3f8a35" />
    <Block position={[2.46, 1.93, 0.22]} size={[0.13, 0.1, 0.13]} color="#e3261c" />
    <Torch position={[-2.5, 1.5, 0.9]} light={night ? 3.5 : 0} seed={4} />
    <Dust position={[0, 1.4, -0.2]} area={[4.6, 2.4, 4.2]} count={45} size={0.03} color={night ? "#cfe0ff" : "#fff3d0"} opacity={0.6} seed={5} speed={0.15} />
  </group>
);

/** Under the hill. He digs toward +X; the camera stands where the dirt still is and looks back at him. */
const Tunnel: React.FC = () => (
  <group position={PLACE.tunnel}>
    <Vox kind="dirt" position={[-4, -0.5, 0]} size={[16, 1, 2.6]} />
    <Vox kind="dirt" position={[-4, 2.5, 0]} size={[16, 1, 2.6]} castShadow={false} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="dirt" position={[-4, 1, s * 1.4]} size={[16, 3, 1]} castShadow={false} />
    ))}
    {(
      [
        [-0.6, 1.5, -0.9, "stone"],
        [-2.4, 0.5, 0.9, "cobble"],
        [-3.9, 1.6, -0.9, "stone"],
        [1.2, 0.6, 0.9, "stone"],
      ] as Array<[number, number, number, BlockKind]>
    ).map(([x, y, z, kind], i) => (
      <Vox key={i} kind={kind} position={[x, y, z]} size={[1, 1, 0.06]} castShadow={false} />
    ))}
    <Block position={[-11.9, 1, 0]} size={[0.1, 2, 1.8]} color="#050404" castShadow={false} />
    <Torch position={[-2.2, 0.9, -0.82]} light={7} seed={6} />
    <Torch position={[-6.5, 0.9, 0.82]} light={4} seed={7} />
    <LightPool position={[-2.2, 0.02, -0.2]} width={2.6} depth={1.6} color="#ffb060" opacity={0.35} />
    <Dust position={[-1, 1, 0]} area={[6, 1.6, 1.6]} count={40} size={0.03} color="#e8c9a0" opacity={0.7} seed={9} speed={0.25} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  const smoke = look === "lava-shore";
  return (
    <>
      <Zone name="hill" with={["village", "valley2"]}>
        <Terrain smoke={smoke} />
      </Zone>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="valley2">
        <OtherVillage />
      </Zone>
      <Zone name="room">
        <Room night={night} />
      </Zone>
      <Zone name="tunnel">
        <Tunnel />
      </Zone>
    </>
  );
};
