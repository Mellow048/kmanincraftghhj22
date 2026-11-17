import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { Classroom, Kitchen, PLACE, Room, SchoolHall } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in and the others are not drawn.
 *
 *   class    9 desks, a board, windows on the west wall. Lens stays under 3.3 m and inside the walls.
 *   hall     Lockers on the north wall, 16 m long. Where the friend talks to him.
 *   kitchen  Home: counter, stove, tall mirror. Where the film turns.
 *   room     His bedroom, only for the last picture.
 */
export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} board="TODAY" boardSub="A TEST" night={night} />
        <GodRay position={[PLACE.class[0] - 2.4, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.0]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={16} />
        <GodRay position={[PLACE.hall[0] + 1.6, 2.0, PLACE.hall[2] - 0.4]} rotation={[0, 0, 0.9]} width={2.0} height={3.4} color="#dff0ff" opacity={0.07} />
        <LightPool position={[PLACE.hall[0], 0.02, PLACE.hall[2]]} width={9} depth={3} color="#eaf4ff" opacity={0.1} />
        <Dust position={[PLACE.hall[0], 1.5, PLACE.hall[2]]} area={[10, 2.4, 2.6]} count={30} size={0.03} color="#eef6ff" opacity={0.45} seed={9} speed={0.12} />
      </Zone>
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
        <LightPool position={[PLACE.kitchen[0], 0.02, PLACE.kitchen[2] + 0.4]} width={5.4} depth={4} color="#ffe0b0" opacity={0.14} />
        <Glow position={[PLACE.kitchen[0], 2.6, PLACE.kitchen[2] - 0.4]} size={2.0} color="#ffd9a0" opacity={0.18} />
        <Dust position={[PLACE.kitchen[0], 1.4, PLACE.kitchen[2]]} area={[5, 2, 3]} count={22} size={0.028} color="#ffe9c8" opacity={0.4} seed={5} speed={0.1} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
        <LightPool position={[PLACE.room[0], 0.02, PLACE.room[2] + 0.6]} width={4} depth={3} color="#ffe6bc" opacity={0.12} />
        <Dust position={[PLACE.room[0], 1.3, PLACE.room[2]]} area={[4, 1.8, 3]} count={18} size={0.026} color="#ffeacb" opacity={0.36} seed={11} speed={0.09} />
      </Zone>
    </>
  );
};
