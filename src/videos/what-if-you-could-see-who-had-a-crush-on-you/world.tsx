import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { BedBox, Classroom, Desk, Gym, Kitchen, LunchRoom, PLACE, Room, SchoolHall, room } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   class    The classroom: nine desks, a board, windows on the west wall. Its south wall is seen from inside
 *            only, so the lens can stand behind the back row and look at the board, or stand at the board and
 *            look at faces with a wall behind them. Keep the lens under 3.3 m and inside the side walls.
 *   hall     A hallway of lockers. It runs west–east; the lockers are on its north wall, and its south wall
 *            is one-sided in the same way. The film opens here and ends here.
 *   kitchen  Home, at breakfast: where the power arrives. The mirror is on its west wall.
 *   room     The teller's room: the card, the dog, the tie. Always at night.
 *   lunch    The lunch room: the line along the counter, and the tables where he forgets Jo.
 *   gym      The gym, and the yard and the gate in front of it. By day it is where two teachers hold hands; at
 *            night it is the dance. THE PLACE OF THE FILM: the reveal is the walk from its lights to its gate.
 *
 * A shot's `look` decides day or night: "overworld-night" turns a place's windows dark and its lamps on, and
 * dresses the gym for the dance.
 * 1 unit = 1 metre. Ground is y = 0.
 */
export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} board="MATH" boardSub="7 × 8 = ?" night={night} />
        {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust in every zone. */}
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={16} />
        <LightPool position={[PLACE.hall[0], 0.02, PLACE.hall[2] + 0.4]} width={12} depth={3} color="#fff2c8" opacity={0.14} />
        <Dust position={[PLACE.hall[0], 1.6, PLACE.hall[2]]} area={[14, 2.6, 3.4]} count={45} size={0.03} color="#fff7d8" opacity={0.5} seed={7} speed={0.15} />
      </Zone>
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
        <BedBox position={room(-1.95, 0, 0.9)} />
        {/* his desk, under a lamp: where the card is written */}
        <Desk position={room(-0.7, 0, -2.0)} />
        <Block position={room(-1.02, 0.7, -2.16)} size={[0.12, 0.04, 0.12]} color="#2b3340" />
        <Block position={room(-1.02, 0.86, -2.16)} size={[0.03, 0.3, 0.03]} color="#2b3340" />
        <Block position={room(-0.96, 1.02, -2.1)} size={[0.2, 0.08, 0.2]} color="#ffe9a8" emissive="#ffd27a" emissiveIntensity={night ? 2.2 : 0.4} castShadow={false} />
        <pointLight position={room(-0.9, 1.0, -1.95)} color="#ffe2a8" intensity={night ? 5 : 1} distance={3} decay={2} />
        <Glow position={room(-0.96, 0.98, -2.05)} size={0.9} color="#ffd9a0" opacity={night ? 0.5 : 0.1} />
      </Zone>
      <Zone name="lunch">
        <LunchRoom at={PLACE.lunch} />
      </Zone>
      <Zone name="gym">
        <Gym at={PLACE.gym} night={night} dance={night} />
      </Zone>
    </>
  );
};
