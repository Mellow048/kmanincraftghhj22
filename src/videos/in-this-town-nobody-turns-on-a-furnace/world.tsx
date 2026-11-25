import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
import {
  BedBox,
  BerryPlate,
  Fence,
  Furnace,
  Hut,
  LampPost,
  PLACE,
  Room,
  SnowTrail,
  Stall,
  room,
} from "./kit";

/**
 * WORLD: "In This Town, Nobody Turns On a Furnace"
 * Three cleanly separated <Zone> sets calibrated for 9:16 portrait sightlines.
 */
export const World: React.FC = () => (
  <>
    <Zone name="town">
      <Vox kind="grass" side="dirt" position={[0, -0.25, 0]} size={[38, 0.5, 36]} />
      <Vox kind="cobble" position={[0, -0.22, 1.8]} size={[11, 0.5, 9]} />
      <SnowTrail
        points={[
          [-2.0, 0, 2.0],
          [-1.1, 0, 1.7],
          [-0.2, 0, 1.4],
          [0.7, 0, 1.2],
          [1.6, 0, 1.6],
          [2.4, 0, 2.0],
        ]}
      />
      <Hut at={PLACE.home} wall="planks" door={0} windows={[-2, 2]} />
      <Hut at={[-9.5, 0, -5]} wall="darkPlanks" door={0} windows={[-2, 2]} />
      <Stall position={PLACE.stall} />
      {/* Blacksmith glowing furnace on the east edge of square */}
      <Furnace position={[4.5, 0, 1.5]} rotationY={-0.6} lit />
      <Fence from={[-6.5, 0, -4.5]} to={[-2.5, 0, -4.5]} />
      <LampPost position={[-4.0, 0, 1.4]} seed={2} />
      <Tree position={[-8.0, 0, 3.0]} height={4.1} />
      <Tree position={[9.0, 0, 3.2]} height={3.8} leaf="#4b8d33" />

      <GodRay position={[-2, 6, 1]} rotation={[0, 0, 0.4]} width={5} height={12} color="#fff5d6" opacity={0.07} />
      <LightPool position={[0, 0.04, 1.5]} width={9.5} depth={8.5} color="#fff4d8" opacity={0.2} />
      <Glow position={[0, 2.2, 1.0]} size={2.0} color="#ffe8aa" opacity={0.22} />
      <Dust position={[0, 2.0, 1.5]} area={[12, 4, 12]} count={32} size={0.04} color="#fff9df" opacity={0.5} seed={3} speed={0.2} />
    </Zone>

    <Zone name="room">
      {/* Room already includes LightPool, GodRay, ceiling fill, rug, nightstand, and window (right wall x=1.3).
          Place Furnace & Bed against north/west plank walls cleanly LEFT of window glare! */}
      <Room at={PLACE.room} night={false} />
      <BedBox position={room(-1.6, 0, -1.35)} />
      {/* Dark unlit stone Furnace inside the north wall (z=-1.95 sits squarely inside Room north wall z=-2.4) */}
      <Furnace position={room(-0.1, 0, -1.9)} lit={false} />
      {/* Kitchen breakfast table shifted right-front so cold furnace & Hero sightline remain unobstructed */}
      <Vox kind="planks" position={room(1.45, 0.4, 0.55)} size={[1.45, 0.8, 0.95]} />
      <BerryPlate position={room(1.2, 0.82, 0.45)} />
      <BerryPlate position={room(1.72, 0.82, 0.65)} />
    </Zone>

    <Zone name="bakery">
      <Vox kind="grass" side="dirt" position={[PLACE.bakery[0], -0.25, PLACE.bakery[2]]} size={[24, 0.5, 24]} />
      <Vox kind="cobble" position={[PLACE.bakery[0], -0.22, PLACE.bakery[2] + 1.5]} size={[10, 0.5, 9]} />
      <Hut at={[PLACE.bakery[0], 0, PLACE.bakery[2] - 2.5]} wall="planks" door={0} windows={[-2, 2]} open />
      {/* Counter in front of bakery for 6.trap */}
      <Vox kind="planks" position={[PLACE.bakery[0], 0.45, PLACE.bakery[2] + 0.6]} size={[2.8, 0.9, 0.55]} />
      <Furnace position={[PLACE.bakery[0] + 1.5, 0, PLACE.bakery[2] - 1.2]} rotationY={-0.35} lit />
      <Furnace position={[PLACE.bakery[0] + 2.5, 0, PLACE.bakery[2] - 1.2]} rotationY={-0.35} lit />
      <Tree position={[PLACE.bakery[0] - 6.0, 0, PLACE.bakery[2] - 1.8]} height={3.9} leaf="#7a6830" />
      <Tree position={[PLACE.bakery[0] + 6.2, 0, PLACE.bakery[2] - 1.5]} height={3.7} leaf="#6e602b" />
      <LightPool position={[PLACE.bakery[0], 0.04, PLACE.bakery[2]]} width={7.5} depth={7.5} color="#ffe4b8" opacity={0.2} />
      <Dust position={[PLACE.bakery[0], 2.0, PLACE.bakery[2]]} area={[8, 4, 8]} count={26} size={0.035} color="#ffeac4" opacity={0.48} seed={7} speed={0.2} />
    </Zone>
  </>
);
