import type React from "react";
import { Block, Dust, GodRay, LightPool, Torch, Vox } from "../../src/engine";
import type { BlockKind, Vec3 } from "../../src/engine";
import { Lantern } from "./things";

/**
 * PLACES — the buildings and sets an "In This Town" film is shot in: a village house (new, burned
 * out, or on fire), the bell, the well, a stall, a stepped hill, a bedroom, a tunnel.
 *
 * Part of the topic's pack (see PACK.md). These are PARTS. Where they stand is the film's business:
 * a film lays out its own town in its world.tsx (the starter in template/ has one to change).
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const SOOT = "#3a3331";

/** A village house. `at` is the middle of its front wall, at ground level. `turn` 0 faces south. */
export const Hut: React.FC<{
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
  /** Somebody is home and it is dark out: the windows are warm. */
  lit?: boolean;
  /** The door stands open, with the light of the room in the doorway and on the step. */
  open?: boolean;
}> = ({ at, w = 6, d = 6, h = 3.8, wall = "planks", tint, roof = "#8a3b2a", door = 0, windows = [], turn = 0, burnt = false, ablaze = false, lit = false, open = false }) => {
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
          {open ? (
            <>
              <Block position={[door, 1.05, 0.03]} size={[1.1, 2.1, 0.1]} color="#ffcf8a" emissive="#ffb24a" emissiveIntensity={1.5} castShadow={false} />
              <group position={[door - 0.55, 0, 0.1]} rotation={[0, -1.9, 0]}>
                <Vox kind="darkPlanks" position={[0.55, 1.05, 0]} size={[1.1, 2.1, 0.14]} />
                <Block position={[0.91, 1.05, 0.09]} size={[0.08, 0.08, 0.06]} color="#e8c44a" />
              </group>
              <LightPool position={[door, 0.14, 1.7]} width={2.3} depth={3.4} color="#ffb060" opacity={0.32} />
            </>
          ) : (
            <>
              <Vox kind="darkPlanks" position={[door, 1.05, 0.06]} size={[1.1, 2.1, 0.14]} />
              <Block position={[door + 0.36, 1.05, 0.15]} size={[0.08, 0.08, 0.06]} color="#e8c44a" />
            </>
          )}
          <Vox kind="stone" position={[door, 0.06, 0.62]} size={[1.5, 0.12, 0.9]} />
        </>
      )}
      {windows.map((x) => (
        <group key={x} position={[x, 2.15, 0.02]}>
          <Block size={[1.3, 1.3, 0.12]} color={burnt ? "#120e0c" : "#5c3f24"} />
          <Block
            position={[0, 0, 0.03]}
            size={[1.02, 1.02, 0.1]}
            color={burnt ? "#050404" : ablaze ? "#ffb44a" : lit ? "#ffd58a" : "#a8d8f0"}
            emissive={burnt ? "#000000" : ablaze ? "#ff7a1e" : lit ? "#ffb347" : "#6fb6e0"}
            emissiveIntensity={burnt ? 0 : ablaze ? 2.4 : lit ? 1.5 : 0.25}
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

/** A torch on a post. */
export const LampPost: React.FC<{ position: Vec3; seed?: number }> = ({ position, seed = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 1.1, 0]} size={[0.22, 2.2, 0.22]} />
    <Torch position={[0, 2.2, 0]} seed={seed} />
  </group>
);

/** The village bell, on its stone step. `fallen` lays it on its side. */
export const Bell: React.FC<{ position: Vec3; fallen?: boolean }> = ({ position, fallen = false }) => (
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

/**
 * The village well. `position` is its middle, at ground level. The wall is 0.8 m high and 2.4 m square;
 * the hole is 1.4 m square. `roof={false}` leaves off the posts and the roof: an open ring of stone,
 * to look down into, or to put a `WellLid` on.
 */
export const Well: React.FC<{ position: Vec3; roof?: boolean }> = ({ position, roof = true }) => (
  <group position={position}>
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
    {roof ? (
      <>
        {[-1, 1].map((s) => (
          <Vox key={s} kind="log" position={[s * 1.05, 1.5, 0]} size={[0.26, 2.2, 0.26]} />
        ))}
        <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 2.75, 0]} size={[2.9, 0.3, 2.2]} />
        <Vox kind="darkPlanks" tint="#8a3b2a" position={[0, 3.05, 0]} size={[1.9, 0.3, 1.4]} />
      </>
    ) : null}
  </group>
);

/**
 * A stone lid for a well with no roof (`<Well roof={false}>`): a slab 2.1 m square, lying on the wall.
 * `position` is the well's. `slide` is how many metres it has been pushed off, towards +Z (`turn` turns that
 * way round); at 1.0 the gap behind it is 0.65 m. Its top is y = 0.98.
 */
export const WellLid: React.FC<{ position: Vec3; slide?: number; turn?: number; skew?: number }> = ({ position, slide = 0, turn = 0, skew = 0 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <group position={[0, 0.89, slide]} rotation={[0, skew, 0]}>
      <Vox kind="stone" tint="#7e8088" size={[2.1, 0.18, 2.1]} />
      <Vox kind="stoneBrick" tint="#8d9098" position={[0, 0.1, 0]} size={[1.3, 0.03, 1.3]} castShadow={false} />
      {/* The iron ring it was lowered by, long ago. */}
      <Block position={[0, 0.13, 0]} size={[0.34, 0.04, 0.08]} color="#3a3a42" metalness={0.5} roughness={0.5} castShadow={false} />
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.15, 0.12, 0]} size={[0.06, 0.05, 0.12]} color="#3a3a42" metalness={0.5} roughness={0.5} castShadow={false} />
      ))}
    </group>
  </group>
);

/** A market stall. `position` is the middle of its counter, at ground level. The counter top is y = 1.0. */
export const Stall: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
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

/**
 * The slabs of a stepped hill (see `hill()` in staging.ts, which gives the climbing maths for the same numbers).
 * `length` is how far it runs north–south at the bottom. Each layer is `step` metres narrower on both sides.
 */
export const SteppedHill: React.FC<{ x: number; layers: number; width: number; length: number; step: number; taper?: number; tints?: [string, string] }> = ({
  x,
  layers,
  width,
  length,
  step,
  taper = 1.5,
  tints = ["#6bb244", "#4c8c33"],
}) => (
  <>
    {Array.from({ length: layers }, (_, i) => (
      <Vox key={i} kind="grass" tint={tints[i % 2]} position={[x, i + 0.5, 0]} size={[width - 2 * step * i, 1, length - 2 * taper * i]} />
    ))}
  </>
);

/**
 * A bedroom: 5.4 m wide, 8 m deep, plank walls, one window in the north wall. `at` is its origin (the middle of the floor,
 * 2.5 m in front of the north wall). No south wall: that is where the camera lives, so the lens looks north, east or west.
 * It has no bed: the scenes put the bed (and anything else that moves) in it. `night` turns the window to moonlight.
 */
export const Room: React.FC<{ at: Vec3; night: boolean }> = ({ at, night }) => (
  <group position={at}>
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

/**
 * A tunnel through dirt, 16 m long and one block wide, lit by two torches. `at` is its origin, near the digging end.
 * It runs along x and has no end wall at +x: the camera stands where the dirt still is and looks back at the digger.
 */
export const Tunnel: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
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

/** A lantern on a post with an arm. `turn` is the way the arm points (0 = south). */
export const LanternPost: React.FC<{ position: Vec3; turn?: number; height?: number; light?: number; seed?: number }> = ({ position, turn = 0, height = 2.7, light = 0, seed = 1 }) => (
  <group position={position} rotation={[0, turn, 0]}>
    <Vox kind="log" position={[0, height / 2, 0]} size={[0.2, height, 0.2]} />
    <Vox kind="log" position={[0, height - 0.12, 0.34]} size={[0.12, 0.12, 0.8]} />
    <Lantern position={[0, height - 0.18, 0.62]} chain={0.22} light={light} seed={seed} sway={0.05} />
  </group>
);

/**
 * A line of lanterns strung between two points, sagging in the middle: across a street, from eave to eave.
 * `lit` lists which lanterns (0 = the first) are real lights; the rest only glow.
 */
export const LanternLine: React.FC<{ from: Vec3; to: Vec3; count?: number; sag?: number; lit?: number[]; light?: number; seed?: number }> = ({
  from,
  to,
  count = 4,
  sag = 0.7,
  lit = [],
  light = 9,
  seed = 1,
}) => {
  const at = (k: number): Vec3 => [
    from[0] + (to[0] - from[0]) * k,
    from[1] + (to[1] - from[1]) * k - sag * 4 * k * (1 - k),
    from[2] + (to[2] - from[2]) * k,
  ];
  const points = Array.from({ length: count + 2 }, (_, i) => at(i / (count + 1)));
  return (
    <>
      {points.slice(1).map((b, i) => {
        const a = points[i];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const dz = b[2] - a[2];
        const flat = Math.hypot(dx, dz);
        return (
          <group key={`r${i}`} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]} rotation={[0, Math.atan2(dx, dz), 0]}>
            <Block rotation={[-Math.atan2(dy, flat), 0, 0]} size={[0.03, 0.03, Math.hypot(flat, dy)]} color="#1c1a1e" castShadow={false} />
          </group>
        );
      })}
      {points.slice(1, -1).map((p, i) => (
        <Lantern key={i} position={p} chain={0.16 + (i % 2) * 0.1} light={lit.includes(i) ? light : 0} seed={seed + i} sway={0.06} scale={0.9} />
      ))}
    </>
  );
};

/** A post-and-rail fence from one point to another. */
export const Fence: React.FC<{ from: Vec3; to: Vec3; height?: number; gap?: number }> = ({ from, to, height = 1, gap = 2 }) => {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const posts = Math.max(1, Math.round(length / gap));
  return (
    <group position={from} rotation={[0, Math.atan2(dx, dz), 0]}>
      {Array.from({ length: posts + 1 }, (_, i) => (
        <Vox key={i} kind="log" position={[0, height / 2, (i / posts) * length]} size={[0.16, height, 0.16]} castShadow={false} />
      ))}
      {[0.45, 0.82].map((y) => (
        <Vox key={y} kind="planks" tint="#8a6a3c" position={[0, y * height, length / 2]} size={[0.07, 0.1, length]} castShadow={false} />
      ))}
    </group>
  );
};
