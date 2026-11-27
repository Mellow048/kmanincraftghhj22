import React from "react";
import {
  CoalMountain,
  Dust,
  ForestEdge,
  Glow,
  GodRay,
  LightPool,
  Hut,
  Moon,
  Room,
  Sign,
  Stars,
  VillageStreet,
  Zone,
  ROOM_POS,
} from "./kit";

/**
 * Multi-angle InThisTown world:
 * - "town": 56m <VillageStreet night />
      <GodRay position={[0, 4.4, -2.0]} width={5.4} height={9.2} color="#9bb8ff" opacity={0.12} />
      <LightPool position={[0, 0.02, 1.0]} width={9.0} depth={9.0} color="#ffb955" opacity={0.24} />
      <Glow position={[3.8, 2.1, -2.5]} size={1.6} color="#ffbe55" opacity={0.28} />
      <Dust count={26} area={[18, 6, 26]} position={[0, 2.2, 0]} color="#ffd89e" /> with 8 houses on both sides, lampposts,
 *   Chief Flint's Coal Shop, Coal Mountain, dark pine forest edge, moon & stars.
 * - "room": Cozy interior room for the baby crib & school desk gags.
 */
export const World: React.FC = () => (
  <>
    <Zone name="town">
      <VillageStreet night />
      <GodRay position={[0, 4.4, -2.0]} width={5.4} height={9.2} color="#9bb8ff" opacity={0.12} />
      <LightPool position={[0, 0.02, 1.0]} width={9.0} depth={9.0} color="#ffb955" opacity={0.24} />
      <Glow position={[3.8, 2.1, -2.5]} size={1.6} color="#ffbe55" opacity={0.28} />
      <Dust count={26} area={[18, 6, 26]} position={[0, 2.2, 0]} color="#ffd89e" />
      {/* Chief Flint's brick Coal Shop on the right edge of the square */}
      <Hut
        at={[6.4, 0, -2.5]}
        wall="bricks"
        tint="#7a3e32"
        roof="#33221f"
        turn={-Math.PI / 2}
        windows={[1, 2]}
        lit
      />
      <Sign title="FLINT COAL" position={[4.1, 2.35, -2.5]} rotationY={-Math.PI / 2} width={2.1} height={0.55} />
      <CoalMountain position={[5.6, 0, -8.5]} />
      {/* Dark pine woods framing the far north end of the avenue */}
      <ForestEdge from={[-18, 0, -20]} to={[18, 0, -20]} back={[0, 0, -28]} count={22} />
      <Moon position={[-12, 22, -26]} />
      <Stars center={[0, 24, 0]} radius={42} count={90} />
    </Zone>

    <Zone name="room">
      <Room at={ROOM_POS} night />
    </Zone>
  </>
);
