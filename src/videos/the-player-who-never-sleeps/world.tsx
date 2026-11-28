import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  CherryCabinMap,
  FiftyBedsHall,
  HouseLivingRoomMap,
  PLACE,
  Sign,
} from "./kit";

/**
 * 3-Zone World for "The Player Who Never Sleeps":
 * - `cabin`: CherryCabinMap SMP cottage where Big Brother fights off Phantoms all night
 * - `irl`: Warm IRL HouseLivingRoomMap showing the little brother scared of the dark
 * - `hall`: Grand FiftyBedsHall built by the whole server so nobody sleeps alone
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: CHERRY CABIN SMP SERVER */}
    <Zone name="cabin">
      <group position={PLACE.cabin}>
        <CherryCabinMap position={[0, 0, 0]} />
        <GodRay position={[0, 5.5, 2.0]} width={3.6} height={11} color="#a9c9ff" opacity={0.14} />
        <LightPool position={[0, 0.05, 3.0]} width={7} depth={7} color="#ffeab3" opacity={0.14} />
        <Glow position={[0, 2.5, 1.5]} size={1.4} color="#ffd880" opacity={0.24} />
        <Dust count={36} position={[0, 2.2, 2.0]} area={[16, 4.5, 16]} color="#dbe8ff" opacity={0.3} />
      </group>
    </Zone>

    {/* ZONE 2: WARM IRL HOUSE LIVING ROOM */}
    <Zone name="irl">
      <group position={PLACE.irl}>
        <HouseLivingRoomMap position={[0, 0, 0]} />
        <LightPool position={[0, 0.02, 0]} width={5.0} depth={5.0} color="#ffdfb0" opacity={0.18} />
      </group>
    </Zone>

    {/* ZONE 3: GRAND 50-BED SERVER SLEEP HALL */}
    <Zone name="hall">
      <group position={PLACE.hall}>
        <FiftyBedsHall position={[0, 0, 0]} />
        <Sign title="50 BEDS · SLEEP TOGETHER" position={[0, 3.85, -6.15]} width={4.6} height={0.76} />
        <GodRay position={[0, 5.5, 0]} width={4.4} height={11} color="#ffeab3" opacity={0.14} />
        <LightPool position={[0, 0.05, 0]} width={9.0} depth={8.0} color="#ffe8b8" opacity={0.18} />
        <Glow position={[0, 3.2, -5.0]} size={1.6} color="#ffd43b" opacity={0.24} />
        <Dust count={40} position={[0, 2.2, 0]} area={[14, 4.5, 12]} color="#fff3d6" opacity={0.32} />
      </group>
    </Zone>
  </>
);
