import type React from "react";
import { Block, CeilingLight, Dust, Glow, GodRay, LightPool, PixelText, Torch, Tree, Vox, useFilmTime } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Fence, Hut } from "../Shared";

/**
 * PLACES — where a school story goes when it leaves the classroom: the kitchen at home, the lunch room,
 * the gym (by day, and dressed for a dance), and the yard and gate in front of it.
 *
 * Part of the What If pack (PACK.md). 1 unit = 1 metre; a kid is 1.44 m tall (KID = 0.8).
 *
 * THE KITCHEN AND THE LUNCH ROOM HAVE NO SOUTH WALL: that is where the camera lives, so the lens looks north,
 * east or west. THE GYM HAS FOUR WALLS AND A REAL DOOR: the lens stays inside it, or stands in the yard.
 * Every set has its own lamps and its own air (a ray, a pool of light, dust), and each comes with a function
 * that says where things are in it, the way `classroom(at)` does.
 *
 * The walls here are DARKER than a classroom's on purpose: a sign over a head (a heart, a number) is a bright
 * thing, and a bright thing needs something dark behind it (SHOTS.md §3).
 */

const WALL = "#f1dc9c";

// ----------------------------------------------------------------------------- the kitchen

/**
 * Where things are in a kitchen built at `at`.
 *
 *   const HOME = kitchen(PLACE.kitchen);
 *   <Mom position={HOME.stove} rotationY={NORTH} />      at the stove, her back to the room
 *   <Hero position={HOME.chair} rotationY={NORTH} animation="sit" />
 */
export function kitchen(at: Vec3) {
  const p = (x: number, y: number, z: number): Vec3 => [at[0] + x, at[1] + y, at[2] + z];
  return {
    /** The floor in front of the stove. The cook faces NORTH to cook, SOUTH (rotationY 0) to talk. */
    stove: p(0.6, 0, -1.95),
    /** The chair on the south side of the table: a kid sits here facing NORTH (`animation="sit"`). */
    chair: p(0.3, 0, 1.3),
    /** The middle of the table top. */
    table: p(0.3, 0.77, 0.6),
    /** The floor in the doorway (east wall). Somebody coming in walks west from here. */
    door: p(3.3, 0, -0.9),
    /** The floor where the dog's bowl is, in the open: a lens on the south side sees the dog come to it. */
    bowl: p(-2.2, 0, 0.25),
    /** The floor in front of the mirror (west wall): stand here facing WEST. */
    mirror: p(-2.6, 0, 1.75),
    /** The x of the mirror's glass. A reflection is the room drawn again, flipped about this: see `Reflection`. */
    glass: at[0] - 3.5,
    /** Any point of the room, in room coordinates. */
    at: p,
  };
}

/**
 * A KITCHEN at breakfast: a counter, a stove and a window along the north wall, a table in the middle, the door to
 * the hall in the east wall and a tall mirror on the west wall. `at` is the middle of the floor. 7 wide (x), 6 deep
 * (z), 3.2 high. No south wall.
 *
 * `image`: this is the copy that is seen IN the mirror (see `Reflection`): no west wall, no lamps, no dust.
 */
export const Kitchen: React.FC<{ at: Vec3; image?: boolean }> = ({ at, image = false }) => (
  <group position={at}>
    {/* a floor of two tiles */}
    {Array.from({ length: 7 }, (_, i) =>
      Array.from({ length: 6 }, (_, j) => <Block key={`${i}-${j}`} position={[-3 + i, -0.05, -2.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#ece2c6" : "#a9c4a4"} castShadow={false} />),
    )}
    <Vox kind="wool" tint={WALL} position={[0, 1.6, -3.1]} size={[7.2, 3.2, 0.2]} castShadow={false} />
    <Vox kind="wool" tint="#f6f0dc" position={[0, 3.3, 0]} size={[7.4, 0.2, 6.2]} castShadow={false} />

    {/* east wall, with the doorway to the hall, and a stub of the hall behind it */}
    <Vox kind="wool" tint="#ecd592" position={[3.6, 1.6, -2.225]} size={[0.2, 3.2, 1.55]} castShadow={false} />
    <Vox kind="wool" tint="#ecd592" position={[3.6, 1.6, 1.325]} size={[0.2, 3.2, 3.35]} castShadow={false} />
    <Vox kind="wool" tint="#ecd592" position={[3.6, 2.7, -0.9]} size={[0.2, 1.0, 1.1]} castShadow={false} />
    {[-1.48, -0.32].map((z) => (
      <Block key={z} position={[3.5, 1.1, z]} size={[0.24, 2.2, 0.1]} color="#7a5a3a" />
    ))}
    <Block position={[3.5, 2.24, -0.9]} size={[0.24, 0.1, 1.26]} color="#7a5a3a" />
    <Vox kind="planks" tint="#b9925c" position={[4.7, -0.1, -0.9]} size={[2.0, 0.2, 2.6]} />
    <Vox kind="wool" tint="#b9a56e" position={[5.75, 1.6, -0.9]} size={[0.2, 3.2, 2.8]} castShadow={false} />
    <Vox kind="wool" tint="#c4ae74" position={[4.7, 1.6, -2.25]} size={[2.2, 3.2, 0.2]} castShadow={false} />
    <Vox kind="wool" tint="#c4ae74" position={[4.7, 1.6, 0.45]} size={[2.2, 3.2, 0.2]} castShadow={false} />
    {[-1.5, -0.9, -0.3].map((z, i) => (
      <Block key={z} position={[5.62, 1.35, z]} size={[0.06, 0.6, 0.36]} color={["#3f6fb8", "#8a6a44", "#3f8a4f"][i]} castShadow={false} />
    ))}

    {/* west wall, with the hole the mirror is */}
    {image ? null : (
      <>
        <Vox kind="wool" tint="#ecd592" position={[-3.6, 1.6, -0.875]} size={[0.2, 3.2, 4.25]} castShadow={false} />
        <Vox kind="wool" tint="#ecd592" position={[-3.6, 1.6, 2.625]} size={[0.2, 3.2, 0.75]} castShadow={false} />
        <Vox kind="wool" tint="#ecd592" position={[-3.6, 0.15, 1.75]} size={[0.2, 0.3, 1.0]} castShadow={false} />
        <Vox kind="wool" tint="#ecd592" position={[-3.6, 2.7, 1.75]} size={[0.2, 1.0, 1.0]} castShadow={false} />
        {/* the frame, and a breath of glass: the hole is 1.0 wide and runs from 0.3 to 2.2 */}
        {[1.21, 2.29].map((z) => (
          <Block key={z} position={[-3.47, 1.25, z]} size={[0.1, 2.06, 0.1]} color="#5c3f24" />
        ))}
        {[0.26, 2.24].map((y) => (
          <Block key={y} position={[-3.47, y, 1.75]} size={[0.1, 0.1, 1.18]} color="#5c3f24" />
        ))}
        <Block position={[-3.51, 1.25, 1.75]} size={[0.004, 1.9, 1.0]} color="#d6ecff" opacity={0.08} transparent castShadow={false} receiveShadow={false} />
      </>
    )}

    {/* the counter along the north wall: cupboards, a sink under the window, the stove, the fridge */}
    <Block position={[0, 1.3, -2.985]} size={[7, 0.8, 0.03]} color="#f7f4ea" castShadow={false} />
    <Block position={[-0.75, 0.44, -2.62]} size={[5.3, 0.88, 0.74]} color="#6f8aa8" />
    <Vox kind="planks" tint="#d8b47a" position={[-0.75, 0.91, -2.6]} size={[5.4, 0.06, 0.82]} />
    {[-3.0, -2.1, -1.2, -0.3, 1.45].map((x) => (
      <group key={x}>
        <Block position={[x + 0.02, 0.46, -2.245]} size={[0.8, 0.66, 0.012]} color="#7f9ab8" castShadow={false} />
        <Block position={[x + 0.32, 0.6, -2.23]} size={[0.05, 0.12, 0.03]} color="#e8edf2" castShadow={false} />
      </group>
    ))}
    {/* the stove, and breakfast in the pan */}
    <Block position={[0.6, 0.47, -2.6]} size={[0.84, 0.94, 0.8]} color="#3a3f47" />
    <Block position={[0.6, 0.945, -2.6]} size={[0.8, 0.02, 0.76]} color="#22252b" castShadow={false} />
    <Block position={[0.6, 0.42, -2.19]} size={[0.6, 0.4, 0.02]} color="#191b20" castShadow={false} />
    {[0.36, 0.6, 0.84].map((x) => (
      <Block key={x} position={[x, 0.8, -2.19]} size={[0.07, 0.07, 0.03]} color="#d9dee3" castShadow={false} />
    ))}
    <Block position={[0.52, 0.98, -2.55]} size={[0.38, 0.04, 0.38]} color="#2b2b2b" />
    <Block position={[0.52, 0.985, -2.26]} size={[0.06, 0.03, 0.22]} color="#2b2b2b" />
    <Block position={[0.52, 1.004, -2.55]} size={[0.22, 0.012, 0.22]} color="#fffdf2" castShadow={false} />
    <Block position={[0.54, 1.014, -2.53]} size={[0.085, 0.012, 0.085]} color="#f5b921" castShadow={false} />
    {/* cupboards over the counter: dark, so that a sign over the cook's head has something behind it */}
    <Vox kind="darkPlanks" position={[0.3, 2.42, -2.8]} size={[3.6, 1.0, 0.4]} />
    {[-1.05, -0.15, 0.75, 1.65].map((x) => (
      <Block key={x} position={[x + 0.33, 2.1, -2.59]} size={[0.05, 0.12, 0.03]} color="#d8b47a" castShadow={false} />
    ))}
    {/* the sink and the window over it: the light of the morning */}
    <Block position={[-2.3, 0.935, -2.6]} size={[0.8, 0.02, 0.5]} color="#c3ccd4" castShadow={false} />
    <Block position={[-2.3, 1.06, -2.9]} size={[0.06, 0.24, 0.06]} color="#d9dee3" />
    <Block position={[-2.3, 1.17, -2.8]} size={[0.06, 0.05, 0.22]} color="#d9dee3" />
    <group position={[-2.3, 2.1, -2.98]}>
      <Block size={[1.5, 1.3, 0.08]} color="#f6f0dc" />
      <Block position={[0, 0, 0.03]} size={[1.3, 1.1, 0.05]} color="#fff3c4" emissive="#ffe9a8" emissiveIntensity={1.2} castShadow={false} />
      <Block position={[0, 0, 0.065]} size={[1.3, 0.06, 0.02]} color="#f6f0dc" castShadow={false} />
      <Block position={[0, 0, 0.065]} size={[0.06, 1.1, 0.02]} color="#f6f0dc" castShadow={false} />
      <Block position={[0, -0.7, 0.12]} size={[1.6, 0.06, 0.24]} color="#f6f0dc" />
      <Block position={[-0.45, -0.55, 0.14]} size={[0.16, 0.14, 0.16]} color="#9c5240" />
      <Block position={[-0.45, -0.4, 0.14]} size={[0.2, 0.2, 0.2]} color="#3f8a35" />
    </group>
    {/* the fridge */}
    <Block position={[2.85, 0.98, -2.6]} size={[0.92, 1.96, 0.78]} color="#e8edf2" />
    <Block position={[2.85, 1.35, -2.205]} size={[0.9, 0.02, 0.012]} color="#aab3bb" castShadow={false} />
    <Block position={[2.5, 1.0, -2.19]} size={[0.05, 0.5, 0.04]} color="#aab3bb" castShadow={false} />
    <Block position={[3.0, 1.62, -2.2]} size={[0.26, 0.3, 0.012]} color="#fff4d6" castShadow={false} />
    <Block position={[3.0, 1.62, -2.192]} size={[0.14, 0.14, 0.008]} color="#e8a21c" castShadow={false} />
    <Block position={[2.72, 1.72, -2.2]} size={[0.08, 0.08, 0.02]} color="#3f8a4f" castShadow={false} />

    {/* the table, set for breakfast, and four chairs */}
    <Vox kind="planks" tint="#c9a06a" position={[0.3, 0.72, 0.6]} size={[1.7, 0.07, 0.96]} />
    {[-0.45, 1.05].flatMap((x) => [0.2, 1.0].map((z) => <Block key={`${x}${z}`} position={[x, 0.35, z]} size={[0.08, 0.7, 0.08]} color="#8a6a44" />))}
    {[
      [0.3, 1.3, 0],
      [0.3, -0.1, Math.PI],
    ].map(([x, z, turn], i) => (
      <group key={i} position={[x, 0, z]} rotation={[0, turn, 0]}>
        <Vox kind="planks" tint="#b0803f" position={[0, 0.41, 0]} size={[0.46, 0.06, 0.44]} />
        <Vox kind="planks" tint="#b0803f" position={[0, 0.76, 0.2]} size={[0.46, 0.4, 0.05]} />
        {[-0.2, 0.2].flatMap((cx) => [-0.19, 0.19].map((cz) => <Block key={`${cx}${cz}`} position={[cx, cz > 0 ? 0.47 : 0.2, cz]} size={[0.05, cz > 0 ? 0.94 : 0.4, 0.05]} color="#8a6a44" />))}
      </group>
    ))}
    <Block position={[0.3, 0.765, 0.84]} size={[0.3, 0.016, 0.3]} color="#f7f4ea" castShadow={false} />
    <Block position={[0.3, 0.79, 0.84]} size={[0.15, 0.035, 0.15]} color="#e2b56c" castShadow={false} />
    <Block position={[0.62, 0.82, 0.74]} size={[0.08, 0.13, 0.08]} color="#fbfbfb" />
    <Block position={[-0.1, 0.795, 0.52]} size={[0.24, 0.08, 0.24]} color="#3f6fb8" />
    <Block position={[-0.1, 0.84, 0.52]} size={[0.19, 0.012, 0.19]} color="#f2d98a" castShadow={false} />
    <Block position={[0.78, 0.765, 0.36]} size={[0.4, 0.014, 0.28]} color="#e9e6da" castShadow={false} />

    {image ? null : (
      <>
        <GodRay position={[-1.9, 1.25, -1.9]} rotation={[0.6, 0, 0.14]} width={1.5} height={2.9} color="#fff0c8" opacity={0.15} />
        <LightPool position={[-1.7, 0.012, -1.0]} width={2.2} depth={1.9} color="#fff0c8" opacity={0.34} />
        <pointLight position={[-2.2, 2.2, -2.0]} color="#fff0d0" intensity={9} distance={8} decay={2} />
        <CeilingLight position={[0.3, 3.18, 0.3]} size={[1.2, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={8} distance={8} />
        {/* a fill from the open side, where the camera lives */}
        <pointLight position={[0, 2.3, 4.6]} color="#ffffff" intensity={14} distance={12} decay={2} />
        <Dust position={[-0.6, 1.5, -0.4]} area={[5.6, 2.4, 4.6]} count={45} size={0.03} color="#fff3d0" opacity={0.55} seed={17} speed={0.14} />
      </>
    )}
  </group>
);

/**
 * WHAT A MIRROR SHOWS. Put in it everything that stands in front of the glass (and the room, as `image`), and it is
 * drawn again on the far side of the wall, flipped: a true reflection, from any camera angle, at the cost of drawing
 * those things twice. `glass` is the x of the mirror (it hangs on a wall that runs north–south).
 *
 *   <Reflection glass={HOME.glass}>
 *     <Kitchen at={PLACE.kitchen} image />
 *     <Hero position={HOME.mirror} rotationY={WEST} />
 *   </Reflection>
 *
 * Draw the same things outside it as well: this is only the copy.
 */
export const Reflection: React.FC<{ glass: number; children: React.ReactNode }> = ({ glass, children }) => (
  <group position={[2 * glass, 0, 0]} scale={[-1, 1, 1]}>
    {children}
  </group>
);

// ----------------------------------------------------------------------------- the lunch room

/** Four long tables: two rows of two. [x, z] of the middle of each. */
const TABLES: Array<[number, number]> = [
  [-2.7, -1.3],
  [2.7, -1.3],
  [-2.7, 2.5],
  [2.7, 2.5],
];

/**
 * Where things are in a lunch room built at `at`.
 *
 *   const LUNCH = lunchRoom(PLACE.lunch);
 *   <Classmate who={3} position={LUNCH.line(2)} rotationY={WEST} />                     third in the line
 *   <Hero position={LUNCH.seat(2, "n", 0)} rotationY={SOUTH} animation="sit" />          facing the lens
 */
export function lunchRoom(at: Vec3) {
  const p = (x: number, y: number, z: number): Vec3 => [at[0] + x, at[1] + y, at[2] + z];
  return {
    /** Place `i` in the line along the counter: 0 is the one being served. The line faces WEST. */
    line: (i: number): Vec3 => p(-3.0 + i * 0.78, 0, -3.15),
    /** A seat at table `table` (0–3): the north bench ("n", facing SOUTH: the lens sees the face) or the south one ("s", facing NORTH). `k` is the place along it, −1 to 1. */
    seat: (table: number, side: "n" | "s", k = 0): Vec3 => p(TABLES[table % 4][0] + k * 0.72, 0, TABLES[table % 4][1] + (side === "n" ? -0.62 : 0.62)),
    /** A point on the top of table `table`: `k` along it, `across` towards the south bench. */
    top: (table: number, k = 0, across = 0): Vec3 => p(TABLES[table % 4][0] + k * 0.72, 0.665, TABLES[table % 4][1] + across),
    /** Behind the counter, where whoever serves stands (facing SOUTH). */
    cook: p(-2.2, 0, -5.2),
    /** Any point of the room, in room coordinates. */
    at: p,
  };
}

/**
 * A LUNCH ROOM: a serving counter along the north wall, four long tables with benches, windows in the west wall.
 * `at` is the middle of the floor. 12 wide (x), 11 deep (z: the kitchen side is 6 m north of `at`, the open side 5 m
 * south), 3.5 high: low enough for something to touch the ceiling. No south wall.
 * Find the places in it with `lunchRoom(at)`.
 */
export const LunchRoom: React.FC<{ at: Vec3; sign?: string }> = ({ at, sign = "LUNCH" }) => (
  <group position={at}>
    {Array.from({ length: 12 }, (_, i) =>
      Array.from({ length: 11 }, (_, j) => <Block key={`${i}-${j}`} position={[-5.5 + i, -0.05, -5.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#d9d2bf" : "#b4c0c8"} castShadow={false} />),
    )}
    <Vox kind="wool" tint="#3f5f8a" position={[0, 1.75, -6.1]} size={[12.4, 3.5, 0.2]} castShadow={false} />
    <Vox kind="wool" tint="#3a5880" position={[-6.1, 1.75, -0.5]} size={[0.2, 3.5, 11]} castShadow={false} />
    <Vox kind="wool" tint="#3a5880" position={[6.1, 1.75, -0.5]} size={[0.2, 3.5, 11]} castShadow={false} />
    <Vox kind="wool" tint="#f1ecdc" position={[0, 3.6, -0.5]} size={[12.6, 0.2, 11.2]} castShadow={false} />
    {/* a band of pale tile along the foot of each wall */}
    <Block position={[0, 0.5, -5.985]} size={[12, 1.0, 0.03]} color="#e4e0d2" castShadow={false} />
    <Block position={[-5.985, 0.5, -0.5]} size={[0.03, 1.0, 11]} color="#e4e0d2" castShadow={false} />
    <Block position={[5.985, 0.5, -0.5]} size={[0.03, 1.0, 11]} color="#e4e0d2" castShadow={false} />

    {/* the counter: steel, a rail for the trays, a pane of glass, and what is for lunch */}
    <Block position={[-1.4, 0.5, -4.3]} size={[8.4, 1.0, 0.9]} color="#d3d9df" />
    <Block position={[-1.4, 1.01, -4.3]} size={[8.5, 0.03, 0.96]} color="#aab3bb" castShadow={false} />
    <Block position={[-1.4, 0.82, -3.72]} size={[8.4, 0.04, 0.26]} color="#9aa5ae" />
    <Block position={[-1.4, 1.45, -3.9]} size={[8.4, 0.5, 0.02]} color="#d6ecff" opacity={0.16} transparent castShadow={false} receiveShadow={false} />
    <Block position={[-1.4, 1.71, -3.9]} size={[8.4, 0.03, 0.06]} color="#9aa5ae" castShadow={false} />
    {[-5.0, -3.6, -2.2, -0.8, 0.6, 2.0].map((x, i) => (
      <group key={x} position={[x + 0.3, 1.03, -4.3]}>
        <Block size={[1.0, 0.03, 0.6]} color="#7d8892" castShadow={false} />
        <Block position={[0, 0.05, 0]} size={[0.86, 0.08, 0.46]} color={["#f2c230", "#6fbf4a", "#e2b56c", "#f4f1e8", "#e8823a", "#8a5a2c"][i]} castShadow={false} />
      </group>
    ))}
    {/* the till, at the far end of the line */}
    <Block position={[-5.2, 1.16, -4.25]} size={[0.44, 0.3, 0.4]} color="#3a3f47" />
    <Block position={[-5.2, 1.36, -4.15]} size={[0.3, 0.14, 0.03]} color="#58d66a" emissive="#58d66a" emissiveIntensity={0.8} castShadow={false} />
    {/* behind it: shelves, pots, and the board that says what room this is */}
    <Vox kind="darkPlanks" position={[-1.4, 2.65, -5.95]} size={[5.2, 0.9, 0.08]} />
    <PixelText text={sign} position={[-1.4, 2.65, -5.9]} height={0.56} maxWidth={4.6} color="#f4f2e6" />
    <Vox kind="planks" position={[3.9, 1.7, -5.8]} size={[2.6, 0.06, 0.36]} />
    {[3.0, 3.6, 4.3, 4.9].map((x, i) => (
      <Block key={x} position={[x, 1.87 + (i % 2) * 0.04, -5.8]} size={[0.34, 0.28 + (i % 2) * 0.08, 0.3]} color={["#aab3bb", "#59606b", "#c3ccd4", "#7d8892"][i]} />
    ))}
    {/* a stack of trays at the near end of the rail */}
    {[0, 1, 2, 3, 4].map((i) => (
      <Block key={i} position={[2.5, 0.86 + i * 0.03, -3.72]} size={[0.46, 0.025, 0.3]} color={i % 2 ? "#8fa0ad" : "#a9b8c4"} castShadow={false} />
    ))}

    {/* four long tables, a bench on each side: kid height, like a school desk */}
    {TABLES.map(([x, z], i) => (
      <group key={i} position={[x, 0, z]}>
        <Vox kind="planks" tint="#c9a06a" position={[0, 0.63, 0]} size={[2.5, 0.06, 0.78]} />
        {[-1.1, 1.1].map((lx) => (
          <Block key={lx} position={[lx, 0.3, 0]} size={[0.08, 0.6, 0.6]} color="#59606b" />
        ))}
        {[-0.62, 0.62].map((bz) => (
          <group key={bz}>
            <Vox kind="planks" tint="#b0803f" position={[0, 0.41, bz]} size={[2.5, 0.06, 0.32]} />
            {[-1.1, 1.1].map((lx) => (
              <Block key={lx} position={[lx, 0.19, bz]} size={[0.07, 0.38, 0.26]} color="#59606b" />
            ))}
          </group>
        ))}
      </group>
    ))}

    {/* windows in the west wall, a door and a bin on the east */}
    {[-2.4, 1.6].map((z) => (
      <group key={z} position={[-5.98, 2.0, z]}>
        <Block size={[0.08, 1.7, 2.2]} color="#f4efe0" />
        <Block position={[0.03, 0, 0]} size={[0.06, 1.46, 1.96]} color="#cfeaff" emissive="#cfeaff" emissiveIntensity={1.1} castShadow={false} />
        <Block position={[0.07, 0, 0]} size={[0.03, 1.46, 0.07]} color="#f4efe0" castShadow={false} />
        <Block position={[0.07, 0, 0]} size={[0.03, 0.07, 1.96]} color="#f4efe0" castShadow={false} />
        <GodRay position={[1.6, -0.8, 0]} rotation={[0, 0, 1.05]} width={1.8} height={3.8} color="#fff0d0" opacity={0.12} />
        <LightPool position={[2.5, -1.985, 0]} width={2.8} depth={2.2} color="#fff0d0" opacity={0.3} />
        <pointLight position={[1.2, 0.2, 0]} color="#fff0d0" intensity={10} distance={9} decay={2} />
      </group>
    ))}
    <Block position={[5.97, 1.1, 2.6]} size={[0.06, 2.2, 1.1]} color="#8a6a44" />
    <Block position={[5.94, 2.42, 2.6]} size={[0.03, 0.26, 0.9]} color="#2f8a4a" emissive="#58d66a" emissiveIntensity={0.9} castShadow={false} />
    <Block position={[5.6, 0.35, 0.9]} size={[0.5, 0.7, 0.5]} color="#59606b" />
    <Vox kind="planks" tint="#b48d52" position={[5.97, 2.1, -1.6]} size={[0.05, 0.9, 1.8]} />
    {[-2.2, -1.6, -1.0].map((z, i) => (
      <Block key={z} position={[5.935, 2.1 + (i % 2 ? 0.08 : -0.06), z]} size={[0.01, 0.46, 0.4]} color={["#fff4d6", "#d9f0d0", "#d6e6ff"][i]} castShadow={false} />
    ))}

    <CeilingLight position={[-2.7, 3.48, -2.6]} size={[1.6, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={9} distance={9} />
    <CeilingLight position={[2.7, 3.48, -2.6]} size={[1.6, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={9} distance={9} />
    <CeilingLight position={[0, 3.48, 1.8]} size={[1.6, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={9} distance={9} />
    {/* a fill from the open side, where the camera lives */}
    <pointLight position={[0, 2.4, 6.4]} color="#ffffff" intensity={20} distance={14} decay={2} />
    <pointLight position={[-4.6, 2.0, -2.6]} color="#fff4e0" intensity={8} distance={8} decay={2} />
    <Glow position={[-1.4, 2.9, -5.6]} size={2.6} color="#fff0c8" opacity={0.16} />
    <Dust position={[-1, 1.6, -0.6]} area={[9, 2.6, 8]} count={60} size={0.03} color="#fff3d0" opacity={0.5} seed={23} speed={0.14} />
  </group>
);

// ----------------------------------------------------------------------------- the gym, and the yard in front of it

/**
 * Where things are in a gym built at `at`, and in the yard south of it.
 *
 *   const GYM = gym(PLACE.gym);
 *   <Mia position={GYM.lights} rotationY={SOUTH} />      under the lights, facing the door
 *   <Jo position={GYM.lamp} rotationY={NORTH} />         out by the gate, looking back at the gym
 */
export function gym(at: Vec3) {
  const p = (x: number, y: number, z: number): Vec3 => [at[0] + x, at[1] + y, at[2] + z];
  return {
    /** The middle of the floor, under the lights: somebody stands here to be looked at, facing the door (rotationY 0). */
    lights: p(0, 0, 0),
    /** The floor just inside the door (south wall). */
    door: p(0, 0, 9.0),
    /** The drinks table, by the door: stand on its west side, facing EAST. */
    drinks: p(3.0, 0, 8.3),
    /** The school gate, 14 m out along the path. */
    gate: p(0, 0, 24),
    /**
     * Under the lamp, just inside the gate: a metre from the lantern, so that a heart over a head clears it.
     * Somebody who stands here and looks back at the gym (NORTH) has the lamp's light on their face.
     */
    lamp: p(0.7, 0, 23.1),
    /** The street outside the gate. It runs west–east. */
    street: p(0, 0, 27),
    /** Any point, in gym coordinates. */
    at: p,
  };
}

const PARTY = ["#ffd24a", "#4ad6ff", "#58e08a", "#5a8cff", "#f4f7fb"];

/** One balloon on a string. `position` is where the string is tied. */
const Balloon: React.FC<{ position: Vec3; color: string; string?: number; phase?: number }> = ({ position, color, string = 1.2, phase = 0 }) => {
  const t = useFilmTime();
  const sway = Math.sin(t * 1.1 + phase) * 0.06;
  return (
    <group position={position} rotation={[0, 0, sway]}>
      <Block position={[0, string / 2, 0]} size={[0.012, string, 0.012]} color="#e9e4d8" castShadow={false} />
      <Block position={[0, string + 0.19, 0]} size={[0.34, 0.4, 0.34]} color={color} emissive={color} emissiveIntensity={0.25} castShadow={false} />
      <Block position={[0, string + 0.0, 0]} size={[0.08, 0.06, 0.08]} color={color} castShadow={false} />
    </group>
  );
};

/**
 * A GYM, with the yard and the school gate in front of it. `at` is the middle of the gym floor. The gym is 16 wide
 * (x), 20 deep (z) and 6 high, with a hoop on the north wall and a double door in the south wall. A path runs 14 m
 * south from the door to the gate; the street is outside the gate, with houses across it.
 *
 * `night`: the windows go dark, the lamp at the gate is lit, the houses have lights on.
 * `dance`: the gym is dressed for a dance: a mirror ball, coloured lamps, flags, balloons, a banner, a drinks table
 * by the door, a board over the door outside. The cone of white light is at `gym(at).lights`, in the middle of the
 * floor. NONE OF THE PARTY LIGHTS IS PINK OR RED.
 * Find the places with `gym(at)`.
 */
export const Gym: React.FC<{ at: Vec3; night?: boolean; dance?: boolean; banner?: string }> = ({ at, night = false, dance = false, banner = "SCHOOL DANCE" }) => {
  const t = useFilmTime();
  const pane = night ? "#22345a" : "#cfeaff";
  const lit = dance && night;
  return (
    <group position={at}>
      {/* the floor, and the lines of a court */}
      <Vox kind="planks" tint="#d2a25e" position={[0, -0.1, 0]} size={[16, 0.2, 20]} />
      {[
        [0, 0, 13.4, 0.08],
        [0, -8.6, 13.4, 0.08],
        [0, 8.6, 13.4, 0.08],
        [-6.7, 0, 0.08, 17.2],
        [6.7, 0, 0.08, 17.2],
        [0, -6.2, 3.6, 0.08],
        [-1.8, -7.4, 0.08, 2.4],
        [1.8, -7.4, 0.08, 2.4],
        [0, 1.3, 2.6, 0.08],
        [0, -1.3, 2.6, 0.08],
        [-1.3, 0, 0.08, 2.6],
        [1.3, 0, 0.08, 2.6],
      ].map(([x, z, w, d], i) => (
        <Block key={i} position={[x, 0.004, z]} size={[w, 0.008, d]} color="#f4efe0" castShadow={false} />
      ))}

      {/* four walls: brick outside, dark boards to head height inside and blue paint over them. They cast no shadow. */}
      <Vox kind="bricks" position={[0, 3, -10.15]} size={[16.6, 6, 0.3]} castShadow={false} />
      <Vox kind="bricks" position={[-8.15, 3, 0]} size={[0.3, 6, 20]} castShadow={false} />
      <Vox kind="bricks" position={[8.15, 3, 0]} size={[0.3, 6, 20]} castShadow={false} />
      <Vox kind="bricks" position={[-4.75, 3, 10.15]} size={[7.1, 6, 0.3]} castShadow={false} />
      <Vox kind="bricks" position={[4.75, 3, 10.15]} size={[7.1, 6, 0.3]} castShadow={false} />
      <Vox kind="bricks" position={[0, 4.4, 10.15]} size={[2.4, 3.2, 0.3]} castShadow={false} />
      <Vox kind="darkPlanks" position={[0, 1.2, -9.97]} size={[16, 2.4, 0.06]} castShadow={false} />
      <Block position={[0, 4.2, -9.97]} size={[16, 3.6, 0.05]} color="#2f4a74" castShadow={false} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Vox kind="darkPlanks" position={[s * 7.97, 1.2, 0]} size={[0.06, 2.4, 20]} castShadow={false} />
          <Block position={[s * 7.97, 4.2, 0]} size={[0.05, 3.6, 20]} color="#2b446c" castShadow={false} />
          <Vox kind="darkPlanks" position={[s * 4.6, 1.2, 9.97]} size={[6.8, 2.4, 0.06]} castShadow={false} />
          <Block position={[s * 4.6, 4.2, 9.97]} size={[6.8, 3.6, 0.05]} color="#2f4a74" castShadow={false} />
        </group>
      ))}
      <Block position={[0, 4.4, 9.97]} size={[2.4, 3.2, 0.05]} color="#2f4a74" castShadow={false} />
      <Block position={[0, 6.1, 0]} size={[16.8, 0.2, 20.8]} color="#2b3340" castShadow={false} />
      {/* roof beams */}
      {[-6, -2, 2, 6].map((z) => (
        <Block key={z} position={[0, 5.85, z]} size={[16, 0.3, 0.3]} color="#3a4658" castShadow={false} />
      ))}

      {/* high windows down both sides, and two in the front that glow when there is a party */}
      {[-1, 1].flatMap((s) =>
        [-6.5, -2.2, 2.2, 6.5].map((z) => (
          <group key={`${s}${z}`} position={[s * 7.94, 4.3, z]}>
            <Block size={[0.06, 1.5, 2.6]} color="#e9e4d8" castShadow={false} />
            <Block position={[-s * 0.03, 0, 0]} size={[0.05, 1.3, 2.4]} color={pane} emissive={pane} emissiveIntensity={night ? 0.5 : 1.1} castShadow={false} />
            {night ? null : <GodRay position={[-s * 2.2, -1.6, 0]} rotation={[0, 0, -s * 0.95]} width={2.4} height={5} color="#fff0d0" opacity={0.09} />}
          </group>
        )),
      )}
      {[-4.6, 4.6].map((x) => (
        <group key={x} position={[x, 3.6, 10.15]}>
          <Block size={[2.4, 1.5, 0.36]} color="#e9e4d8" castShadow={false} />
          <Block size={[2.2, 1.3, 0.38]} color={lit ? "#ffe2a0" : pane} emissive={lit ? "#ffd27a" : pane} emissiveIntensity={lit ? 1.5 : night ? 0.4 : 1.0} castShadow={false} />
          <Block size={[0.08, 1.3, 0.4]} color="#e9e4d8" castShadow={false} />
        </group>
      ))}

      {/* the hoop, wall bars, benches, mats */}
      <Block position={[0, 3.35, -9.86]} size={[1.9, 1.2, 0.08]} color="#f4efe0" />
      <Block position={[0, 3.15, -9.81]} size={[0.7, 0.5, 0.02]} color="#d86a2a" castShadow={false} />
      <Block position={[0, 3.15, -9.8]} size={[0.56, 0.36, 0.02]} color="#f4efe0" castShadow={false} />
      {[
        [0, -9.35, 0.5, 0.05],
        [0, -9.78, 0.5, 0.05],
        [-0.25, -9.56, 0.05, 0.46],
        [0.25, -9.56, 0.05, 0.46],
      ].map(([x, z, w, d], i) => (
        <Block key={i} position={[x, 2.92, z]} size={[w, 0.05, d]} color="#e8662a" castShadow={false} />
      ))}
      <Block position={[0, 2.68, -9.56]} size={[0.4, 0.44, 0.36]} color="#f4f7fb" opacity={0.35} transparent castShadow={false} receiveShadow={false} />
      {[-5.2, 5.2].map((x) => (
        <group key={x} position={[x, 0, -9.88]}>
          {[-0.7, 0, 0.7].map((dx) => (
            <Block key={dx} position={[dx, 1.5, 0]} size={[0.08, 3.0, 0.08]} color="#c9a06a" castShadow={false} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <Block key={i} position={[0, 0.3 + i * 0.26, 0.03]} size={[1.5, 0.05, 0.05]} color="#d8b47a" castShadow={false} />
          ))}
        </group>
      ))}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Vox kind="planks" tint="#b0803f" position={[s * 7.55, 0.42, -3]} size={[0.4, 0.07, 7]} />
          <Vox kind="planks" tint="#b0803f" position={[s * 7.55, 0.42, 5.2]} size={[0.4, 0.07, 5]} />
          {[-6, -3, 0, 3, 5.2, 7.2].map((z) => (
            <Block key={z} position={[s * 7.55, 0.2, z]} size={[0.3, 0.4, 0.08]} color="#59606b" castShadow={false} />
          ))}
        </group>
      ))}
      {[0, 1, 2].map((i) => (
        <Block key={i} position={[-6.6, 0.1 + i * 0.2, 8.6]} size={[1.9, 0.18, 1.2]} color={i % 2 ? "#2f6fd6" : "#3f8ae8"} />
      ))}

      {/* the door: two leaves, standing open into the yard, and the step */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.2, 0, 10.32]} rotation={[0, s * 1.35, 0]}>
          <Block position={[-s * 0.58, 1.3, 0]} size={[1.16, 2.6, 0.07]} color="#5c7f96" />
          <Block position={[-s * 0.58, 1.85, 0.04]} size={[0.7, 0.9, 0.012]} color={lit ? "#ffe2a0" : "#cfeaff"} emissive={lit ? "#ffd27a" : "#cfeaff"} emissiveIntensity={0.6} castShadow={false} />
        </group>
      ))}
      {[-1.26, 1.26].map((x) => (
        <Block key={x} position={[x, 1.4, 10.15]} size={[0.14, 2.8, 0.4]} color="#e9e4d8" castShadow={false} />
      ))}
      <Block position={[0, 2.86, 10.15]} size={[2.66, 0.14, 0.4]} color="#e9e4d8" castShadow={false} />
      <Vox kind="stoneBrick" position={[0, -0.06, 10.8]} size={[3.4, 0.2, 1.0]} />
      {dance ? (
        <>
          <Block position={[0, 3.75, 10.33]} size={[3.6, 0.9, 0.06]} color="#1b2a55" castShadow={false} />
          <PixelText text="DANCE" position={[0, 3.75, 10.37]} height={0.6} maxWidth={3.2} color="#ffd24a" />
          {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => (
            <Block key={x} position={[x, 3.2, 10.36]} size={[0.14, 0.14, 0.04]} color={PARTY[i % 4]} emissive={PARTY[i % 4]} emissiveIntensity={1.6} castShadow={false} />
          ))}
        </>
      ) : null}

      {/* lamps. By day the roof lamps; at a dance, colour. */}
      {lit ? (
        <>
          <pointLight position={[0, 4.6, 0.3]} color="#fff3d6" intensity={70} distance={11} decay={2} />
          <pointLight position={[0, 2.4, 3.4]} color="#dfe6ff" intensity={26} distance={10} decay={2} />
          <pointLight position={[-4.5, 3.4, -5]} color="#4ad6ff" intensity={34} distance={10} decay={2} />
          <pointLight position={[4.5, 3.4, -3]} color="#58e08a" intensity={28} distance={10} decay={2} />
          <pointLight position={[-3.5, 3.4, 3.5]} color="#5a8cff" intensity={36} distance={11} decay={2} />
          <pointLight position={[3.5, 3.2, 5.5]} color="#ffd98a" intensity={40} distance={11} decay={2} />
          <pointLight position={[0, 2.6, 8.2]} color="#ffe9c4" intensity={30} distance={9} decay={2} />
          {/* White from behind the middle of the floor: without it the back of a fair head under the lights is green. */}
          <pointLight position={[0, 2.6, -3.4]} color="#fff3e0" intensity={30} distance={10} decay={2} />
        </>
      ) : (
        <>
          {[-5, 5].flatMap((z) => [-4, 4].map((x) => <CeilingLight key={`${x}${z}`} position={[x, 5.68, z]} size={[1.6, 0.4]} color="#fff6dc" lightColor="#fff0d0" intensity={night ? 6 : 42} distance={13} />))}
          <pointLight position={[0, 3, 0]} color="#ffffff" intensity={night ? 4 : 30} distance={16} decay={2} />
        </>
      )}

      {dance ? (
        <>
          {/* the white cone somebody stands under, and its pool on the floor */}
          <GodRay position={[0, 3.1, 0]} width={2.6} height={6} color="#fff6dc" opacity={0.22} />
          <LightPool position={[0, 0.014, 0]} width={4.2} depth={4.2} color="#fff3d0" opacity={0.6} />
          <Block position={[0, 5.72, 0]} size={[0.5, 0.36, 0.5]} color="#1b2028" castShadow={false} />
          <Block position={[0, 5.52, 0]} size={[0.34, 0.05, 0.34]} color="#fffbe8" emissive="#fff3c4" emissiveIntensity={2.4} castShadow={false} />
          {/* coloured lamps that wander */}
          {[
            [-4.6, -5.4, "#4ad6ff", 0],
            [4.4, -3.4, "#58e08a", 1.7],
            [-4.4, 2.6, "#5a8cff", 3.1],
            [4.2, 4.6, "#ffd24a", 4.4],
            [0.4, -7.2, "#4ad6ff", 5.2],
          ].map(([x, z, color, phase], i) => {
            const dx = Math.sin(t * 0.9 + (phase as number)) * 1.1;
            const dz = Math.cos(t * 0.7 + (phase as number) * 1.3) * 0.9;
            return (
              <group key={i}>
                <GodRay position={[(x as number) + dx * 0.5, 3.0, (z as number) + dz * 0.5]} rotation={[dz * 0.12, 0, -dx * 0.12]} width={1.7} height={6} color={color as string} opacity={0.15} />
                <LightPool position={[(x as number) + dx, 0.012 + i * 0.001, (z as number) + dz]} width={3.2} depth={3.2} color={color as string} opacity={0.42} />
                <Block position={[x as number, 5.62, z as number]} size={[0.3, 0.26, 0.3]} color={color as string} emissive={color as string} emissiveIntensity={1.8} castShadow={false} />
              </group>
            );
          })}
          {/* the mirror ball */}
          <Block position={[0, 5.5, -1.6]} size={[0.03, 0.8, 0.03]} color="#59606b" castShadow={false} />
          <group position={[0, 4.85, -1.6]} rotation={[0, t * 0.8, 0]}>
            <Block size={[0.6, 0.6, 0.6]} color="#c3ccd4" metalness={0.7} roughness={0.25} emissive="#9fb4d6" emissiveIntensity={0.35} castShadow={false} />
            {[0, 1, 2, 3].map((i) => (
              <Block key={i} position={[Math.cos((i * Math.PI) / 2) * 0.305, ((i % 2) - 0.5) * 0.24, Math.sin((i * Math.PI) / 2) * 0.305]} size={[0.14, 0.14, 0.14]} color="#ffffff" emissive="#ffffff" emissiveIntensity={2.2} castShadow={false} />
            ))}
          </group>
          <Glow position={[0, 4.85, -1.6]} size={2.6} color="#dfe6ff" opacity={0.3} />
          {/* flags on two lines across the room */}
          {[-7.2, 2.6].map((z, row) => (
            <group key={z} position={[0, 4.5, z]}>
              <Block size={[15.8, 0.02, 0.02]} color="#e9e4d8" castShadow={false} />
              {Array.from({ length: 19 }, (_, i) => (
                <Block key={i} position={[-7.2 + i * 0.8, -0.2 - Math.sin((i / 18) * Math.PI) * 0.25, 0]} size={[0.34, 0.36, 0.02]} color={PARTY[(i + row) % 4]} emissive={PARTY[(i + row) % 4]} emissiveIntensity={0.3} castShadow={false} />
              ))}
            </group>
          ))}
          {/* the banner, over the hoop */}
          <Block position={[0, 4.75, -9.9]} size={[7.4, 1.0, 0.04]} color="#1b2a55" castShadow={false} />
          <PixelText text={banner} position={[0, 4.75, -9.87]} height={0.62} maxWidth={6.8} color="#ffd24a" />
          {/* balloons, in bunches along the walls */}
          {[
            [-7.3, -8.6],
            [7.3, -8.6],
            [-7.3, -1.5],
            [7.3, 0.5],
            [-7.3, 6.5],
            [7.3, 6.8],
            [-2.2, 9.5],
          ].flatMap(([x, z], bunch) =>
            [0, 1, 2].map((i) => <Balloon key={`${bunch}${i}`} position={[x + (i - 1) * 0.16, 0.45, z + (i % 2) * 0.12]} color={PARTY[(bunch + i) % 5]} string={1.3 + i * 0.28 + (bunch % 2) * 0.2} phase={bunch + i * 1.7} />),
          )}
          {/* music: two speakers and a desk, in the north-east corner */}
          {[4.2, 6.9].map((x) => (
            <group key={x} position={[x, 0, -9.2]}>
              <Block position={[0, 0.7, 0]} size={[0.8, 1.4, 0.7]} color="#1b2028" />
              {[0.42, 1.0].map((y, i) => (
                <Block key={y} position={[0, y, 0.36]} size={[0.44 - i * 0.14, 0.44 - i * 0.14, 0.02]} color="#39424f" emissive="#4ad6ff" emissiveIntensity={0.25 + Math.abs(Math.sin(t * 7.3)) * 0.5} castShadow={false} />
              ))}
            </group>
          ))}
          <Block position={[5.55, 0.5, -9.1]} size={[1.4, 1.0, 0.7]} color="#2b3340" />
          <Block position={[5.55, 1.02, -9.1]} size={[1.1, 0.04, 0.5]} color="#59606b" castShadow={false} />
          {/* the drinks table, by the door */}
          <group position={[3.9, 0, 8.3]}>
            <Block position={[0, 0.4, 0]} size={[0.9, 0.8, 2.2]} color="#f4f7fb" />
            <Block position={[0, 0.81, 0]} size={[1.0, 0.03, 2.3]} color="#3f7fd6" castShadow={false} />
            <Block position={[0, 0.94, -0.5]} size={[0.5, 0.24, 0.5]} color="#d6ecff" opacity={0.5} transparent castShadow={false} />
            <Block position={[0, 0.96, -0.5]} size={[0.42, 0.16, 0.42]} color="#ffd24a" emissive="#ffd24a" emissiveIntensity={0.25} castShadow={false} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <group key={i} position={[-0.2 + (i % 2) * 0.22, 0.825, 0.2 + Math.floor(i / 2) * 0.24]}>
                <Block position={[0, 0.065, 0]} size={[0.09, 0.13, 0.09]} color="#f4f7fb" castShadow={false} />
                <Block position={[0, 0.07, 0]} size={[0.094, 0.04, 0.094]} color="#3f7fd6" castShadow={false} />
              </group>
            ))}
          </group>
        </>
      ) : (
        <>
          {/* by day: a rack of balls, and the air of a big room */}
          <group position={[6.6, 0, 8.4]}>
            <Block position={[0, 0.45, 0]} size={[1.3, 0.9, 0.5]} color="#59606b" opacity={0.5} transparent castShadow={false} />
            {[-0.4, 0, 0.4].map((x, i) => (
              <Block key={x} position={[x, 0.5 + (i % 2) * 0.3, 0]} size={[0.3, 0.3, 0.3]} color="#d86a2a" />
            ))}
          </group>
          <LightPool position={[0, 0.012, -1]} width={11} depth={13} color="#fff2c8" opacity={0.14} />
        </>
      )}
      <Dust position={[0, 2.4, -1]} area={[14, 4.4, 17]} count={90} size={0.04} color={lit ? "#dfe6ff" : "#fff3d0"} opacity={0.5} seed={31} speed={0.16} />

      {/* ---- the yard: grass, the path from the door to the gate, the fence, the lamp ---- */}
      <Vox kind="grass" position={[0, -0.35, 22.3]} size={[44, 0.5, 24]} />
      <Vox kind="grass" position={[-15.3, -0.35, 0]} size={[14, 0.5, 21]} />
      <Vox kind="grass" position={[15.3, -0.35, 0]} size={[14, 0.5, 21]} />
      <Vox kind="path" position={[0, -0.1, 17.4]} size={[2.6, 0.04, 13.4]} />
      <Vox kind="cobble" position={[0, -0.1, 27]} size={[44, 0.04, 4.4]} />
      <Fence from={[-16, -0.1, 24]} to={[-1.9, -0.1, 24]} height={1.15} gap={2} />
      <Fence from={[1.9, -0.1, 24]} to={[16, -0.1, 24]} height={1.15} gap={2} />
      {[-1.9, 1.9].map((x) => (
        <group key={x} position={[x, -0.1, 24]}>
          <Vox kind="bricks" position={[0, 1.4, 0]} size={[0.6, 2.8, 0.6]} />
          <Vox kind="stoneBrick" position={[0, 2.9, 0]} size={[0.76, 0.2, 0.76]} />
        </group>
      ))}
      <Vox kind="darkPlanks" position={[0, 3.25, 24]} size={[4.6, 0.6, 0.16]} />
      <PixelText text="SCHOOL" position={[0, 3.25, 24.09]} height={0.42} maxWidth={3.8} color="#f4f2e6" />
      <PixelText text="SCHOOL" position={[0, 3.25, 23.91]} rotationY={Math.PI} height={0.42} maxWidth={3.8} color="#f4f2e6" />
      {/* the lamp just inside the gate */}
      <group position={[2.35, -0.1, 22.9]}>
        <Vox kind="log" position={[0, 1.35, 0]} size={[0.2, 2.7, 0.2]} />
        <Block position={[-0.3, 2.62, 0]} size={[0.6, 0.1, 0.1]} color="#3a2c1c" />
        <Block position={[-0.6, 2.42, 0]} size={[0.3, 0.34, 0.3]} color={night ? "#ffe9a8" : "#d9d2bf"} emissive="#ffd27a" emissiveIntensity={night ? 2.2 : 0} castShadow={false} />
        <Block position={[-0.6, 2.62, 0]} size={[0.38, 0.06, 0.38]} color="#3a2c1c" castShadow={false} />
        {night ? (
          <>
            {/* The lantern itself is weak: at 46 it bleached the gate post, and anything floating over a head, to white. */}
            <pointLight position={[-0.6, 2.3, 0.2]} color="#ffd9a0" intensity={10} distance={10} decay={2} />
            {/* What lights the one who stands under it (`lamp`): the same lamp, from where a face can catch it. */}
            <pointLight position={[-2.1, 2.3, -1.7]} color="#ffd9a0" intensity={30} distance={8} decay={2} />
            <Glow position={[-0.6, 2.42, 0]} size={1.7} color="#ffd9a0" opacity={0.42} />
            <LightPool position={[-0.9, 0.13, 0]} width={5.4} depth={5.4} color="#ffd9a0" opacity={0.5} />
            <GodRay position={[-0.6, 1.2, 0]} width={2.2} height={2.5} color="#ffd9a0" opacity={0.13} />
          </>
        ) : null}
      </group>
      {/* trees, and the houses across the street */}
      <Tree position={[-6.5, -0.1, 19.5]} height={3.6} />
      <Tree position={[7.2, -0.1, 16.5]} height={4.2} leaf="#3a7a35" />
      <Tree position={[-11.5, -0.1, 13]} height={4} leaf="#4a8a3a" />
      <Tree position={[12.5, -0.1, 21]} height={3.4} />
      <Hut at={[-9.5, -0.1, 30.2]} w={6} d={5} h={3.6} turn={Math.PI} tint="#c9a06a" roof="#7a3b2a" windows={[-1.6, 1.6]} lit={night} />
      <Hut at={[-1.5, -0.1, 30.6]} w={6.4} d={5} h={4} turn={Math.PI} wall="cobble" roof="#3f5f8a" door={1.6} windows={[-1.4]} lit={night} />
      <Hut at={[7, -0.1, 30.2]} w={6} d={5} h={3.6} turn={Math.PI} tint="#b9925c" roof="#4a7a3a" windows={[-1.6, 1.6]} lit={night} />
      {night ? (
        <>
          <Torch position={[-5.2, 1.6, 30.0]} light={5} seed={3} />
          {/* the light of the party, spilling out of the door onto the step */}
          {lit ? (
            <>
              <LightPool position={[0, 0.06, 11.9]} width={4.4} depth={5.6} color="#ffe2a0" opacity={0.6} />
              <pointLight position={[0, 2.2, 11.6]} color="#ffe2a0" intensity={30} distance={9} decay={2} />
              <Glow position={[0, 1.5, 10.5]} size={4.6} color="#ffd98a" opacity={0.32} />
            </>
          ) : null}
          {/* a moon, low over the roofs */}
          <Block position={[9, 17, 60]} size={[3.4, 3.4, 0.4]} color="#f4f7ff" emissive="#ffffff" emissiveIntensity={1.6} castShadow={false} />
          <Glow position={[9, 17, 59.5]} size={13} color="#b9ccff" opacity={0.3} />
          {Array.from({ length: 26 }, (_, i) => (
            <Block key={i} position={[-34 + ((i * 53) % 70), 12 + ((i * 37) % 22), 62 + (i % 3)]} size={[0.22, 0.22, 0.1]} color="#ffffff" emissive="#ffffff" emissiveIntensity={2} castShadow={false} />
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <Block key={`n${i}`} position={[-30 + ((i * 47) % 62), 9 + ((i * 29) % 20), -34 - (i % 3)]} size={[0.2, 0.2, 0.1]} color="#ffffff" emissive="#ffffff" emissiveIntensity={2} castShadow={false} />
          ))}
        </>
      ) : null}
    </group>
  );
};
