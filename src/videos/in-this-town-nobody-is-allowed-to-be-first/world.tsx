import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  DarkOakVillageMap,
  FounderSkeleton,
  IslandBridge,
  MineEntrance,
  PLACE,
  ShopStand,
  Sign,
  Vox,
} from "./kit";

/**
 * 3-Zone World for "In This Town, Nobody Is Allowed To Be First":
 * - `village`: Dark Oak Forest Village + doorway threshold + Market Stall + outdoor dinner table
 * - `bridge`: Two grass islands separated by real water with wooden bridge
 * - `cave`: Timber-framed MineEntrance + deep stone tunnel with FounderSkeleton & carved wall sign
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: DARK OAK FOREST VILLAGE */}
    <Zone name="village">
      <group position={PLACE.village}>
        <DarkOakVillageMap position={[0, 0, 0]} />
        {/* Wooden doorway arch at z = -1.5 for the Frame-0 threshold hook */}
        <group position={[0, 0, -1.5]}>
          <Vox kind="darkPlanks" position={[-1.4, 1.5, 0]} size={[0.4, 3.0, 0.4]} />
          <Vox kind="darkPlanks" position={[1.4, 1.5, 0]} size={[0.4, 3.0, 0.4]} />
          <Vox kind="darkPlanks" position={[0, 3.15, 0]} size={[3.2, 0.3, 0.4]} />
        </group>
        {/* Market stall & outdoor dinner table */}
        <ShopStand position={[5.6, 0, 1.5]} title="MARKET" awningColor="#b83b2a" itemColor="#ffd43b" />
        <Vox kind="planks" position={[-5.2, 0.45, 2.2]} size={[2.6, 0.9, 1.2]} />
        {/* Cave mouth visible at edge of the dark oak woods */}
        <MineEntrance position={[0, 0, -12.5]} />
        <GodRay position={[0, 5.5, 0]} width={3.6} height={11} color="#ffeab3" opacity={0.14} />
        <LightPool position={[0, 0.02, 1.5]} width={7} depth={7} color="#ffe2a8" opacity={0.14} />
        <Glow position={[0, 2.6, -11.2]} size={1.4} color="#ff9d3b" opacity={0.25} />
        <Dust count={44} position={[0, 2.2, 0]} area={[16, 4.5, 16]} color="#f5e6c8" opacity={0.34} />
      </group>
    </Zone>

    {/* ZONE 2: WOODEN RIVER BRIDGE BETWEEN TWO ISLANDS */}
    <Zone name="bridge">
      <group position={PLACE.bridge}>
        <IslandBridge position={[0, 0, 0]} />
        <GodRay position={[0, 5.5, 0]} width={4.0} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.25, 0]} width={5.5} depth={5.5} color="#ffeab3" opacity={0.14} />
      </group>
    </Zone>

    {/* ZONE 3: DEEP FOUNDER CAVE TUNNEL */}
    <Zone name="cave">
      <group position={PLACE.cave}>
        {/* Non-overlapping stone cave floor, ceiling, back wall & side walls */}
        <Vox kind="stone" position={[0, -0.25, 0]} size={[8.0, 0.5, 18.0]} />
        <Vox kind="stone" position={[0, 4.25, 0]} size={[8.0, 0.5, 18.0]} />
        <Vox kind="cobble" position={[0, 2.0, -8.75]} size={[8.0, 4.0, 0.5]} />
        <Vox kind="stone" position={[-3.75, 2.0, 0.25]} size={[0.5, 4.0, 17.5]} />
        <Vox kind="stone" position={[3.75, 2.0, 0.25]} size={[0.5, 4.0, 17.5]} />
        {/* Collapsed boulders behind the founder */}
        <Vox kind="cobble" position={[-1.4, 0.7, -7.4]} size={[1.4, 1.4, 1.4]} />
        <Vox kind="cobble" position={[1.5, 0.6, -7.6]} size={[1.2, 1.2, 1.2]} />
        {/* Founder's seated skeleton & carved wall warning (flush on back wall z = -8.50) */}
        <FounderSkeleton position={[0, 0, -7.2]} rotationY={0} />
        <Sign title="DON'T GO FIRST" position={[0, 2.25, -8.45]} width={3.6} height={0.76} />
        <Glow position={[0, 1.6, -7.2]} size={1.6} color="#ffaa44" opacity={0.28} />
        <LightPool position={[0, 0.02, -6.5]} width={4.5} depth={4.5} color="#ffb966" opacity={0.2} />
        <Dust count={36} position={[0, 1.8, -4.0]} area={[6, 3.5, 12]} color="#ffd8a8" opacity={0.3} />
      </group>
    </Zone>
  </>
);
