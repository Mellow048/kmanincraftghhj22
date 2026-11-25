import type React from "react";
import { Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
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
 * Bright sunlit village square with white snow trails, cold indoor family room,
 * and the timber village bakery.
 */
export const World: React.FC = () => (
  <>
    <Zone name="town">
      <Vox kind="grass" side="dirt" position={[0, -0.25, 0]} size={[36, 0.5, 34]} />
      <Vox kind="cobble" position={[0, -0.22, 1.8]} size={[10, 0.5, 9]} />
      <SnowTrail
        points={[
          [-2.2, 0, 2.2],
          [-1.3, 0, 1.9],
          [-0.4, 0, 1.5],
          [0.5, 0, 1.2],
          [1.4, 0, 1.6],
          [2.3, 0, 2.0],
        ]}
      />
      <Hut at={PLACE.home} wall="planks" door={0} windows={[-2, 2]} />
      <Hut at={[-10, 0, -5]} wall="darkPlanks" door={0} windows={[-2, 2]} />
      <Stall position={PLACE.stall} />
      <Fence from={[-7, 0, -4.5]} to={[-3, 0, -4.5]} />
      <LampPost position={[-4.2, 0, 1.5]} seed={2} />
      <Tree position={[-8.5, 0, 3.0]} height={4.1} />
      <Tree position={[9.2, 0, 3.4]} height={3.8} leaf="#4b8d33" />

      <GodRay position={[-2, 6, 1]} rotation={[0, 0, 0.4]} width={5} height={12} color="#fff5d6" opacity={0.08} />
      <LightPool position={[0, 0.04, 1.5]} width={9} depth={8} color="#fff4d8" opacity={0.22} />
      <Glow position={[0, 2.2, 1.0]} size={2.2} color="#ffe8aa" opacity={0.24} />
      <Dust position={[0, 2.0, 1.5]} area={[12, 4, 12]} count={36} size={0.04} color="#fff9df" opacity={0.55} seed={3} speed={0.2} />
    </Zone>

    <Zone name="room">
      <Room at={PLACE.room} night={false} />
      <BedBox position={room(-1.6, 0, -2.5)} />
      <Furnace position={room(1.8, 0, -3.2)} lit={false} />
      <Vox kind="planks" position={room(0, 0.4, -0.5)} size={[1.8, 0.8, 1.1]} />
      <BerryPlate position={room(-0.4, 0.82, -0.5)} />
      <BerryPlate position={room(0.4, 0.82, -0.5)} />
      <LightPool position={room(0, 0.04, -1.0)} width={5} depth={5} color="#dbeeff" opacity={0.22} />
      <Dust position={room(0, 1.8, -1.0)} area={[5, 3, 5]} count={22} size={0.03} color="#e8f5ff" opacity={0.45} seed={5} speed={0.15} />
    </Zone>

    <Zone name="bakery">
      <Vox kind="grass" side="dirt" position={[PLACE.bakery[0], -0.25, PLACE.bakery[2]]} size={[22, 0.5, 22]} />
      <Vox kind="cobble" position={[PLACE.bakery[0], -0.22, PLACE.bakery[2] + 1.5]} size={[9, 0.5, 8]} />
      <Hut at={[PLACE.bakery[0], 0, PLACE.bakery[2] - 2.5]} wall="planks" door={0} windows={[-2, 2]} open />
      <Furnace position={[PLACE.bakery[0] + 1.4, 0, PLACE.bakery[2] - 1.2]} rotationY={-0.35} lit />
      <LightPool position={[PLACE.bakery[0], 0.04, PLACE.bakery[2]]} width={7} depth={7} color="#ffe4b8" opacity={0.2} />
      <Dust position={[PLACE.bakery[0], 2.0, PLACE.bakery[2]]} area={[8, 4, 8]} count={28} size={0.035} color="#ffeac4" opacity={0.5} seed={7} speed={0.2} />
    </Zone>
  </>
);
