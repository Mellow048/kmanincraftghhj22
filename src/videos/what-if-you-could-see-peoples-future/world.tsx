import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { Classroom, Gym, Kitchen, LunchRoom, PLACE, RepairShop, Room, SchoolHall } from "./kit";

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} night={night} />
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="hall">
        <SchoolHall at={PLACE.hall} />
        <GodRay position={[PLACE.hall[0] - 2.6, 1.9, PLACE.hall[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.hall[0], 0.02, PLACE.hall[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.hall[0], 3.2, PLACE.hall[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.hall[0], 1.6, PLACE.hall[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
        <GodRay position={[PLACE.room[0] - 2.6, 1.9, PLACE.room[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.room[0], 0.02, PLACE.room[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.room[0], 3.2, PLACE.room[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.room[0], 1.6, PLACE.room[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
        <GodRay position={[PLACE.kitchen[0] - 2.6, 1.9, PLACE.kitchen[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.kitchen[0], 0.02, PLACE.kitchen[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.kitchen[0], 3.2, PLACE.kitchen[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.kitchen[0], 1.6, PLACE.kitchen[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="lunch">
        <LunchRoom at={PLACE.lunch} />
        <GodRay position={[PLACE.lunch[0] - 2.6, 1.9, PLACE.lunch[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.lunch[0], 0.02, PLACE.lunch[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.lunch[0], 3.2, PLACE.lunch[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.lunch[0], 1.6, PLACE.lunch[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="gym">
        <Gym at={PLACE.gym} night={night} dance={night} />
        <GodRay position={[PLACE.gym[0] - 2.6, 1.9, PLACE.gym[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.gym[0], 0.02, PLACE.gym[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.gym[0], 3.2, PLACE.gym[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.gym[0], 1.6, PLACE.gym[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="shop">
        <RepairShop at={PLACE.shop} />
        <GodRay position={[PLACE.shop[0] - 2.6, 1.9, PLACE.shop[2] + 0.9]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.1} />
        <LightPool position={[PLACE.shop[0], 0.02, PLACE.shop[2] + 0.8]} width={6.4} depth={4.6} color="#ffe0a0" opacity={0.16} />
        <Glow position={[PLACE.shop[0], 3.2, PLACE.shop[2] - 0.6]} size={2.2} color="#ffe0a0" opacity={0.18} />
        <Dust position={[PLACE.shop[0], 1.6, PLACE.shop[2] + 1]} area={[6, 2.6, 4]} count={36} size={0.025} color="#fff0c8" opacity={0.35} seed={17} speed={0.12} />
      </Zone>
    </>
  );
};
