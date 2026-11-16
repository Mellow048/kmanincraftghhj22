import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { Classroom, PLACE, Room, SchoolHall } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   class   A classroom: nine desks, a board, windows on the west wall. Its south wall is seen from inside
 *           only, so the lens can stand behind the back row and look at the board, or stand at the board and
 *           look at faces with a wall behind them.
 *   hall    A hallway of lockers. It runs west–east; the lockers are on its north wall.
 *   room    The teller's room at home.
 *   street  NEW, and this film's own place: a street at night, and on the far side of it a house with one
 *           lit upstairs window. Built open - no side walls - because the whole last act is a camera looking
 *           ACROSS a street at a window, and the classroom and hallway sets are both sealed boxes. It runs
 *           north–south: the house's face is at z = -2.4, the pavement he stands on is at z = +1.4, and the
 *           lens lives between them.
 *
 * 1 unit = 1 metre. Ground is y = 0.
 */

/** The house across the street. Its face is at its own z = 0, facing +Z (toward the camera). */
const House: React.FC<{ at: [number, number, number]; lit: number }> = ({ at, lit }) => {
  const warm = lit > 0.5;
  return (
    <group position={at}>
      {/* the wall of the house, two floors, wider than the frame needs it to be */}
      <Block size={[6.6, 4.4, 0.4]} position={[0, 2.2, -0.2]} color="#6a4f3a" castShadow={false} />
      {/* eaves */}
      <Block size={[7.0, 0.26, 0.9]} position={[0, 4.5, 0.1]} color="#4a382a" castShadow={false} />
      {/* the upstairs window, and it is the only thing in this film that is warm */}
      <Block size={[1.36, 1.46, 0.16]} position={[0.95, 2.95, 0.06]} color="#171014" castShadow={false} />
      <Block
        size={[1.14, 1.24, 0.08]}
        position={[0.95, 2.95, 0.13]}
        color={warm ? "#ffd79a" : "#241f2b"}
        emissive={warm ? "#ffc478" : "#000000"}
        emissiveIntensity={1.6 * lit}
        castShadow={false}
      />
      {/* the window's cross bars */}
      <Block size={[0.07, 1.46, 0.06]} position={[0.95, 2.95, 0.19]} color="#171014" castShadow={false} />
      <Block size={[1.36, 0.07, 0.06]} position={[0.95, 2.95, 0.19]} color="#171014" castShadow={false} />
      {/* the sill he climbs onto */}
      <Block size={[1.7, 0.12, 0.4]} position={[0.95, 2.2, 0.12]} color="#4a382a" castShadow={false} />
      {/* downstairs window, dark */}
      <Block size={[1.5, 1.2, 0.1]} position={[-1.5, 1.5, 0.08]} color="#241f2b" castShadow={false} />
      {/* the front door, and the name plate on it */}
      <Block size={[1.0, 2.0, 0.14]} position={[-2.6, 1.0, 0.08]} color="#3c2c20" castShadow={false} />
      <Block size={[0.06, 2.0, 0.16]} position={[-2.1, 1.0, 0.1]} color="#2a1e16" castShadow={false} />
      {/* the plate the whole film turns on */}
      <Block size={[0.46, 0.18, 0.05]} position={[-2.6, 1.62, 0.19]} color="#e8e2d2" castShadow={false} />
      <pointLight position={[0.95, 2.95, 1.1]} color="#ffcf92" intensity={11 * lit} distance={6} decay={2} />
    </group>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} board="TODAY" boardSub="A TEST" night={night} />
        {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust in every zone. */}
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>

      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={16} />
      </Zone>

      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>

      {/* THE STREET. Open on three sides, so a camera can stand anywhere between the house and the road. */}
      <Zone name="street">
        {/* tarmac and the pavement */}
        <Block size={[30, 0.2, 4.6]} position={[0, -0.1, 3.4]} color="#2b2b33" castShadow={false} />
        <Block size={[30, 0.22, 1.9]} position={[0, -0.09, 1.2]} color="#6d6a72" castShadow={false} />
        <Block size={[30, 0.24, 0.14]} position={[0, -0.08, 2.16]} color="#8b8792" castShadow={false} />
        {/* the house on the far side */}
        <House at={[0, 0, -2.4]} lit={1} />
        {/* two more houses either side, dark, so the street is a street and not a stage */}
        <Block size={[5.2, 4.0, 0.4]} position={[-6.6, 2.0, -2.4]} color="#4e4152" castShadow={false} />
        <Block size={[5.2, 4.0, 0.4]} position={[6.6, 2.0, -2.4]} color="#4a3f4e" castShadow={false} />
        <Block size={[5.4, 0.24, 0.8]} position={[-6.6, 4.1, -2.3]} color="#3a3038" castShadow={false} />
        <Block size={[5.4, 0.24, 0.8]} position={[6.6, 4.1, -2.3]} color="#3a3038" castShadow={false} />
        {/* a lamp on the opposite pavement: the one cold light in the zone */}
        <Block size={[0.14, 4.0, 0.14]} position={[-2.9, 2.0, 4.6]} color="#3a3a42" castShadow={false} />
        <Block size={[0.5, 0.16, 0.3]} position={[-2.9, 4.0, 4.45]} color="#d8d2a0" emissive="#ffe9a8" emissiveIntensity={2} castShadow={false} />
        <pointLight position={[-2.9, 3.9, 4.2]} color="#ffe9a8" intensity={16} distance={12} decay={2} />
        <LightPool position={[-2.5, 0.02, 1.6]} width={5.4} depth={3.4} color="#ffe9a8" opacity={0.2} />
        <GodRay position={[0.95, 2.9, -1.6]} rotation={[0.35, 0, 0]} width={1.6} height={3.4} color="#ffcf92" opacity={0.16} />
        <Glow position={[0.95, 2.95, -2.1]} size={1.7} color="#ffcf92" opacity={0.34} />
        <Dust position={[0, 1.8, 0.6]} area={[10, 3, 4]} count={30} size={0.03} color="#ffe9c8" opacity={0.35} seed={9} speed={0.1} />
      </Zone>
    </>
  );
};
