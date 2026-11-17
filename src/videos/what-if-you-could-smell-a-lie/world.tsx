import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { Classroom, PLACE, Room, SchoolHall } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   class   A classroom: nine desks, a board, windows on the west wall. Its south wall is seen from inside
 *           only, so the lens can stand behind the back row and look at the board, or stand at the board and
 *           look at faces with a wall behind them. Keep the lens under 3.3 m and inside the side walls.
 *   hall    A hallway of lockers. It runs west–east; the lockers are on its north wall, and its south wall
 *           is one-sided in the same way.
 *   room    The teller's room at home.
 *
 * This is a STARTER. The story's own place (the pool, the roof, the bus, wherever the power is used for the
 * one big thing) is yours to build, as another zone. The parts come from the topic's pack
 * (Topics/WhatIf/PACK.md). 1 unit = 1 metre. Ground is y = 0.
 */
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
    </>
  );
};
