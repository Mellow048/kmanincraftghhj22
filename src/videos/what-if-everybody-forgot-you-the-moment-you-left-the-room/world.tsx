import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Vox, Zone, useActiveShot } from "../../engine";
import { Classroom, Kitchen, PLACE, Room, SchoolHall } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   class   A classroom. 9.4 × 8 m, board on the north wall, door in the east wall, south wall seen from
 *           inside only. The lens stands in the aisles and looks at the door or the board: x −4.3…4.3,
 *           z −3.4…3.5, under the 3.6 m ceiling.
 *   hall    A hallway of lockers. 16 m west–east, 4 m deep, lockers on the north wall.
 *   room    The teller's bedroom at home: 5.4 m wide, 8 m deep, no south wall, a window on the north wall.
 *           The lens lives on the open south side.
 *   lunch   NEW: the canteen. 12 m wide, 11 m deep, the counter on the north wall, no south wall.
 *   shop    NEW: the bike shop he walks the bike out of. A door on the open south side, a counter and
 *           a rack of bikes inside.
 *   yard    NEW: the school yard, OPEN on all four sides — the only place in the film where he is under
 *           the sky, so it has to be a place with no walls at all: grass, a wall to sit on, a fence, the
 *           school behind. The lens can stand anywhere in it.
 *   drive   NEW: the street outside his house. A gate, a pavement, his front door. Open, so the last
 *           three shots can look at the door from the road and at the road from the step.
 *
 * 1 unit = 1 metre. Ground is y = 0.
 *
 * THE ONE THING EVERY ZONE SHARES: a door. It is the look of the power — every time he leaves a room
 * the film cuts to a door, and the last shot of the film is one open.
 */

/** A doorframe with the door in it. `width`/`height` are the opening; the door is a slab that can be open. */
const Doorway: React.FC<{ at: [number, number, number]; facing?: number; open?: number; lit?: number }> = ({
  at,
  facing = 0,
  open = 0,
  lit = 0,
}) => (
  <group position={at} rotation={[0, facing, 0]}>
    <Block size={[1.3, 2.3, 0.14]} position={[0, 1.15, 0]} color="#6b4d33" />
    <Block size={[1.1, 2.12, 0.05]} position={[0, 1.06, 0.09]} color={lit > 0.5 ? "#f6e2b4" : "#241d18"} emissive={lit > 0.5 ? "#ffd79a" : "#000000"} emissiveIntensity={lit * 0.9} castShadow={false} />
    <group position={[-0.55, 0, 0.12]} rotation={[0, open, 0]}>
      <Block size={[1.02, 2.06, 0.07]} position={[0.51, 1.03, 0]} color="#8a6a44" />
      <Block size={[0.07, 0.07, 0.1]} position={[0.9, 1.02, 0.06]} color="#d8b44a" castShadow={false} />
    </group>
  </group>
);

/** The house at the end: a wall, a lit window, a front door on the step. Facing +Z. */
const Home: React.FC<{ at: [number, number, number] }> = ({ at }) => (
  <group position={at}>
    <Block size={[9.0, 5.2, 0.4]} position={[0, 2.6, -0.2]} color="#8a6a52" castShadow={false} />
    <Block size={[9.4, 0.3, 1.0]} position={[0, 5.3, 0.1]} color="#4a382a" castShadow={false} />
    {/* two lit windows, warm: the only warm light in the film */}
    {[-2.0, 2.0].map((x) => (
      <group key={x} position={[x, 2.9, 0.06]}>
        <Block size={[1.5, 1.5, 0.12]} color="#4a382a" castShadow={false} />
        <Block size={[1.24, 1.24, 0.06]} position={[0, 0, 0.07]} color="#ffd79a" emissive="#ffc478" emissiveIntensity={1.5} castShadow={false} />
        <Block size={[0.08, 1.24, 0.03]} position={[0, 0, 0.11]} color="#4a382a" castShadow={false} />
        <Block size={[1.24, 0.08, 0.03]} position={[0, 0, 0.11]} color="#4a382a" castShadow={false} />
      </group>
    ))}
    {/* the front door, and the step he stands on */}
    <Doorway at={[0, 0, 0.12]} lit={0.6} open={0.9} />
    <Block size={[3.0, 0.16, 1.2]} position={[0, 0.08, 0.7]} color="#8b8792" castShadow={false} />
    <pointLight position={[0, 2.2, 1.2]} color="#ffcf92" intensity={9} distance={7} decay={2} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  const sky = night ? "#93a9ff" : "#fff0c8";
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} board="TODAY" boardSub="A TEST" night={night} />
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color={sky} opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color={sky} opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>

      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={16} />
        <Dust position={[PLACE.hall[0], 1.6, PLACE.hall[2]]} area={[14, 2.4, 3]} count={34} size={0.03} color="#fff7d8" opacity={0.45} seed={4} speed={0.12} />
      </Zone>

      <Zone name="room">
        <Room at={PLACE.room} night={true} />
        <GodRay position={[PLACE.room[0] + 1.1, 1.2, PLACE.room[2] - 1.35]} rotation={[0.55, 0, 0.12]} width={1.5} height={2.8} color="#a9c6ff" opacity={0.18} />
        <LightPool position={[PLACE.room[0] + 0.95, 0.012, PLACE.room[2] - 0.55]} width={1.9} depth={1.7} color="#a9c6ff" opacity={0.3} />
        <Dust position={[PLACE.room[0], 1.4, PLACE.room[2] - 0.2]} area={[4.6, 2.4, 4.2]} count={40} size={0.03} color="#cfe0ff" opacity={0.55} seed={5} speed={0.15} />
      </Zone>

      {/* THE KITCHEN AT HOME. The real table, so the tin and the coins are on a table and not on a plank. */}
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
        <Dust position={[PLACE.kitchen[0], 1.5, PLACE.kitchen[2] - 0.4]} area={[5.6, 2.4, 4.6]} count={40} size={0.03} color="#fff3d0" opacity={0.5} seed={17} speed={0.14} />
      </Zone>

      {/* THE CANTEEN. Open on the south side, where the lens lives. */}
      <Zone name="lunch">
        <group position={PLACE.lunch}>
          {/* floor tiles */}
          {Array.from({ length: 12 }, (_, i) =>
            Array.from({ length: 11 }, (_, j) => (
              <Block key={`f${i}${j}`} position={[-5.5 + i, -0.05, -5.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#d9d2bf" : "#b4c0c8"} castShadow={false} />
            )),
          )}
          <Vox kind="wool" tint="#3f5f8a" position={[0, 1.75, -6.1]} size={[12.4, 3.5, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#3a5880" position={[-6.1, 1.75, -0.5]} size={[0.2, 3.5, 11]} castShadow={false} />
          <Vox kind="wool" tint="#3a5880" position={[6.1, 1.75, -0.5]} size={[0.2, 3.5, 11]} castShadow={false} />
          <Vox kind="wool" tint="#f1ecdc" position={[0, 3.6, -0.5]} size={[12.6, 0.2, 11.2]} castShadow={false} />
          {/* the counter: steel, and what is for lunch */}
          <Block position={[-1.4, 0.5, -4.3]} size={[8.4, 1.0, 0.9]} color="#d3d9df" />
          <Block position={[-1.4, 1.01, -4.3]} size={[8.5, 0.03, 0.96]} color="#aab3bb" castShadow={false} />
          <Block position={[-1.4, 0.82, -3.72]} size={[8.4, 0.04, 0.26]} color="#9aa5ae" />
          {[-5.0, -3.6, -2.2, -0.8, 0.6, 2.0].map((x, i) => (
            <Block key={x} position={[x + 0.3, 1.07, -4.3]} size={[0.86, 0.1, 0.46]} color={["#f2c230", "#6fbf4a", "#e2b56c", "#f4f1e8", "#e8823a", "#8a5a2c"][i]} castShadow={false} />
          ))}
          {/* a menu board over the counter, and a clock nobody looks at */}
          <Block position={[-1.4, 2.5, -5.98]} size={[5.2, 1.1, 0.06]} color="#1e2b3a" castShadow={false} />
          <Block position={[3.4, 2.6, -5.98]} size={[0.7, 0.7, 0.06]} color="#e8e2d2" castShadow={false} />
          {/* four long tables */}
          {[[-3.6, -0.6], [1.2, -0.6], [-3.6, 2.2], [1.2, 2.2]].map(([x, z]) => (
            <group key={`${x}${z}`} position={[x, 0, z]}>
              <Block position={[0, 0.66, 0]} size={[3.4, 0.08, 0.9]} color="#c9a06a" />
              {[-1.4, 1.4].flatMap((dx) => [-0.3, 0.3].map((dz) => (
                <Block key={`${dx}${dz}`} position={[dx, 0.32, dz]} size={[0.08, 0.64, 0.08]} color="#59606b" />
              )))}
              {[-1, 1].map((dz) => (
                <Block key={`b${dz}`} position={[0, 0.44, dz * 0.75]} size={[3.2, 0.06, 0.3]} color="#8a6a44" />
              ))}
            </group>
          ))}
          <Glow position={[0, 3.3, -1.5]} size={2.8} color="#fff0c8" opacity={0.18} />
          <LightPool position={[0, 0.02, -0.6]} width={9} depth={6} color="#fff2c8" opacity={0.12} />
          <Dust position={[0, 1.8, -1.5]} area={[11, 3, 7]} count={36} size={0.03} color="#fff7d8" opacity={0.4} seed={6} speed={0.12} />
        </group>
      </Zone>

      {/* THE BIKE SHOP. A door on the open south side, and he walks a bike out of it. */}
      <Zone name="shop">
        <group position={PLACE.shop}>
          {Array.from({ length: 11 }, (_, i) =>
            Array.from({ length: 8 }, (_, j) => (
              <Block key={`f${i}${j}`} position={[-5 + i, -0.05, -3.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#9aa0a6" : "#8a9096"} castShadow={false} />
            )),
          )}
          <Vox kind="wool" tint="#d8d2c0" position={[0, 1.7, -4.1]} size={[10.4, 3.4, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#cdc7b4" position={[-5.1, 1.7, 0]} size={[0.2, 3.4, 8.2]} castShadow={false} />
          <Vox kind="wool" tint="#cdc7b4" position={[5.1, 1.7, 0]} size={[0.2, 3.4, 8.2]} castShadow={false} />
          <Vox kind="wool" tint="#f4efe0" position={[0, 3.45, 0]} size={[10.6, 0.2, 8.4]} castShadow={false} />
          {/* the shopfront: two windows and a door, on the open south face */}
          {[-3.2, 3.2].map((x) => (
            <group key={x} position={[x, 1.6, 3.9]}>
              <Block size={[3.0, 2.4, 0.12]} color="#6b4d33" />
              <Block size={[2.7, 2.1, 0.06]} position={[0, 0, 0.08]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.7} opacity={0.4} transparent castShadow={false} />
            </group>
          ))}
          <Doorway at={[0, 0, 3.94]} facing={Math.PI} open={1.0} />
          {/* the counter, and the rack of bikes he takes one off */}
          <Block position={[3.2, 0.5, -1.6]} size={[3.2, 1.0, 0.8]} color="#5c7a5a" />
          <Block position={[3.2, 1.02, -1.6]} size={[3.3, 0.04, 0.86]} color="#8fa88c" castShadow={false} />
          {[-2.4, -1.2, 0.0].map((x) => (
            <group key={x} position={[x, 0, -3.0]}>
              <Block position={[0, 0.55, 0]} size={[1.3, 0.06, 0.1]} color="#3a3344" />
              <Block position={[0, 0.85, 0]} size={[0.06, 0.7, 0.1]} color="#3a3344" />
              {[-0.6, 0.6].map((dx) => (
                <Block key={dx} position={[dx, 0.34, 0]} size={[0.6, 0.62, 0.08]} color="#2b2b33" />
              ))}
              <Block position={[0, 1.2, 0]} size={[0.5, 0.1, 0.3]} color="#4a4454" />
            </group>
          ))}
          <Glow position={[0, 3.1, -0.6]} size={2.6} color="#fff0c8" opacity={0.2} />
          <LightPool position={[0, 0.02, 1.4]} width={8} depth={5} color="#fff2c8" opacity={0.14} />
          <Dust position={[0, 1.6, 0]} area={[9, 2.6, 6]} count={32} size={0.03} color="#fff7d8" opacity={0.4} seed={7} speed={0.12} />
        </group>
      </Zone>

      {/* THE YARD. No walls at all: this is the one place in the film where he is under the sky. */}
      <Zone name="yard">
        <group position={PLACE.yard}>
          {/* grass, all the way to the edge of the frame */}
          <Block size={[90, 0.2, 90]} position={[0, -0.1, 0]} color="#5f8a45" />
          {/* the school behind him: a long low block with a row of windows, kept well back */}
          <Block size={[30, 6.0, 0.6]} position={[0, 3.0, -12.5]} color="#c9b28e" castShadow={false} />
          <Block size={[30.4, 0.4, 1.2]} position={[0, 6.2, -12.3]} color="#8a7a62" castShadow={false} />
          {[-9, -4.5, 0, 4.5, 9].map((x) =>
            [2.2, 4.6].map((y) => (
              <Block key={`w${x}${y}`} position={[x, y, -12.14]} size={[2.6, 1.5, 0.06]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.45} castShadow={false} />
            )),
          )}
          {/* the school's back door, dead centre: the door he has to go back through */}
          <Doorway at={[0, 0, -12.05]} open={0.35} lit={0.35} />
          {/* a low wall he sits on, and a tree, and a fence at the far edge */}
          <Block size={[7.0, 0.9, 0.6]} position={[5.2, 0.45, -1.4]} color="#a89a86" />
          <Block size={[7.2, 0.14, 0.8]} position={[5.2, 0.95, -1.4]} color="#bcae98" castShadow={false} />
          <Block size={[0.7, 3.4, 0.7]} position={[-9.0, 1.7, 2.0]} color="#6b4a2f" />
          <Block size={[4.6, 2.2, 4.2]} position={[-9.0, 4.4, 2.0]} color="#4e7a3a" castShadow={false} />
          <Block size={[4.0, 1.8, 3.6]} position={[-9.4, 5.6, 1.6]} color="#5c8a42" castShadow={false} />
          {Array.from({ length: 16 }, (_, i) => (
            <Block key={`fence${i}`} position={[-15 + i * 2, 0.75, 7.5]} size={[0.1, 1.5, 0.1]} color="#7a6a52" castShadow={false} />
          ))}
          <Block size={[32, 0.08, 0.08]} position={[0, 1.4, 7.5]} color="#7a6a52" castShadow={false} />
          <LightPool position={[2, 0.02, 0]} width={16} depth={12} color="#fff6d8" opacity={0.1} />
          <GodRay position={[7, 5.0, -4]} rotation={[0, 0.1, 0.32]} width={7} height={11} color="#fff0c8" opacity={0.07} />
          <Dust position={[2, 2.2, 0]} area={[20, 4, 14]} count={40} size={0.035} color="#fff7d8" opacity={0.32} seed={8} speed={0.1} />
        </group>
      </Zone>

      {/* THE STREET OUTSIDE HIS HOUSE: a gate, a pavement, the front door, and the road the last voice comes from. */}
      <Zone name="drive">
        <group position={PLACE.drive}>
          <Block size={[40, 0.2, 40]} position={[0, -0.1, 0]} color="#5f7a4a" />
          {/* the road, running east–west behind the lens in the last two shots */}
          <Block size={[40, 0.2, 5.0]} position={[0, -0.06, 5.4]} color="#2b2b33" castShadow={false} />
          <Block size={[40, 0.24, 1.6]} position={[0, -0.04, 2.4]} color="#6d6a72" castShadow={false} />
          {/* the house, and its open front door */}
          <Home at={[0, 0, -2.6]} />
          {/* the garden path, and the gate open on the pavement */}
          <Block size={[1.4, 0.1, 4.4]} position={[0, 0.05, 1.4]} color="#b0a894" castShadow={false} />
          {[-0.8, 0.8].map((x) => (
            <group key={x}>
              <Block size={[0.14, 1.3, 0.14]} position={[x, 0.65, 3.3]} color="#7a6a52" />
              <Block size={[0.1, 1.0, 0.9]} position={[x * 1.9, 0.75, 3.3]} color="#8a7a5a" rotationY={0.6} />
            </group>
          ))}
          {/* a lamp on the road, so the last shot has one cold light */}
          <Block size={[0.12, 4.0, 0.12]} position={[4.4, 2.0, 3.4]} color="#3a3a42" castShadow={false} />
          <Block size={[0.5, 0.16, 0.3]} position={[4.4, 3.95, 3.25]} color="#d8d2a0" emissive="#ffe9a8" emissiveIntensity={1.8} castShadow={false} />
          <pointLight position={[4.4, 3.85, 3.0]} color="#ffe9a8" intensity={14} distance={12} decay={2} />
          {/* two dark houses either side, so it is a street */}
          <Block size={[8, 4.6, 0.4]} position={[-10, 2.3, -2.6]} color="#7a6656" castShadow={false} />
          <Block size={[8, 4.6, 0.4]} position={[10, 2.3, -2.6]} color="#6e5c4e" castShadow={false} />
          <LightPool position={[0, 0.02, 1.6]} width={9} depth={5} color="#ffcf92" opacity={0.16} />
          <Glow position={[0, 2.6, -2.4]} size={2.2} color="#ffcf92" opacity={0.26} />
          <Dust position={[0, 1.8, 1.6]} area={[14, 3, 6]} count={30} size={0.03} color="#ffe9c8" opacity={0.3} seed={9} speed={0.1} />
        </group>
      </Zone>
    </>
  );
};
