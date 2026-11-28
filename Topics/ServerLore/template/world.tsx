import type React from "react";
import { Dust, Glow, GodRay, LightPool, Vox, Zone } from "../../engine";
import { CherryCabinMap, ComputerRoomMap, ObsidianLavaPit, PLACE, on } from "./kit";

/**
 * Starter World for a Server Lore Short — uses authentic SMP maps (swap CherryCabinMap
 * for TropicalIslandMap, CherryCampfireMap, or SpawnHubMap) + enclosed IRL ComputerRoomMap
 * (or HouseLivingRoomMap / ClassroomRoom / ClassroomHallMap). Zero ScoreboardWall, zero z-fighting.
 */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Authentic SMP Server (Cherry Blossom Cabin & Pond) ---- */}
    <Zone name="server">
      <CherryCabinMap position={PLACE.server} />
      <GodRay position={on(PLACE.server, 0, 6.2, -1.0)} rotation={[0, 0, 0.25]} width={4.4} height={11} color="#fff2ce" opacity={0.07} />
      <LightPool position={on(PLACE.server, 0, 0.04, 0)} width={9} depth={9} color="#fff2d0" opacity={0.2} />
      <Glow position={on(PLACE.server, 0, 2.2, -1.5)} size={1.8} color="#ffe18c" opacity={0.22} />
      <Dust position={on(PLACE.server, 0, 2.2, 0)} area={[10, 4, 10]} count={36} size={0.035} color="#fff6d4" opacity={0.45} seed={11} speed={0.2} />
    </Zone>

    {/* ---- ZONE 2: Deep Dark / Lava Pit ---- */}
    <Zone name="cave">
      <Vox kind="stone" position={on(PLACE.cave, 0, -0.30, 0)} size={[22, 0.56, 22]} />
      <Vox kind="stone" position={on(PLACE.cave, 0, 3.0, -5.5)} size={[18, 6, 1.2]} />
      <ObsidianLavaPit position={on(PLACE.cave, 0, 0, -1.6)} size={2.5} />
      <LightPool position={on(PLACE.cave, 0, 0.04, 0)} width={7} depth={7} color="#28e8d8" opacity={0.18} />
      <Glow position={on(PLACE.cave, 0, 2.0, -1.6)} size={1.8} color="#ff7029" opacity={0.24} />
      <Dust position={on(PLACE.cave, 0, 1.8, 0)} area={[8, 4, 8]} count={28} size={0.035} color="#58f5e8" opacity={0.45} seed={33} speed={0.16} />
      <pointLight position={on(PLACE.cave, 2.0, 4.0, 2.0)} color="#40ded0" intensity={4.5} distance={14} decay={2} />
    </Zone>

    {/* ---- ZONE 3: IRL Gaming / Computer Room Cutaway ---- */}
    <Zone name="irl">
      <ComputerRoomMap position={PLACE.irl} screenText="MC SMP - 3:00 AM" clockText="3:00 AM" />
      <LightPool position={on(PLACE.irl, 0, 0.04, -0.4)} width={5.5} depth={5.5} color="#a9d4ff" opacity={0.18} />
      <pointLight position={on(PLACE.irl, 0, 3.2, 1.5)} color="#cfe4ff" intensity={5.5} distance={12} decay={2} />
    </Zone>
  </>
);
