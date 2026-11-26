import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { Hut, PLACE, StaircaseHall, on } from "./kit";

/**
 * 3 clean zones with generous camera clearance (zero center foreground pillars/trees/fences):
 *   1. `server`: Lush Minecraft oak forest lawn, outer wooden fence perimeter, Spawn path, neighbor huts.
 *   2. `irl`: Son's warm hardwood bedroom shell (DeskSetup mounts dynamically per shot for live monitor text).
 *   3. `stairs`: Two-story wooden stairwell leading down to console table.
 */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Minecraft SMP Oak Clearing ---- */}
    <Zone name="server">
      <Vox kind="grass" position={on(PLACE.server, 0, -0.25, 0)} size={[38, 0.5, 38]} />
      <Vox kind="cobble" position={on(PLACE.server, 0, 0.02, 2.2)} size={[3.6, 0.08, 8.8]} />
      <Clouds y={14} span={24} center={on(PLACE.server, 0, 14, -8)} />

      {/* Outer starter fences placed safely to flanks/back (never crossing center sightlines) */}
      <Block position={on(PLACE.server, -3.8, 0.45, 0.6)} size={[0.18, 0.9, 5.2]} map={plankTex("#8f6438", [3, 1])} />
      <Block position={on(PLACE.server, 4.1, 0.45, 0.6)} size={[0.18, 0.9, 5.2]} map={plankTex("#8f6438", [3, 1])} />

      {/* Hero choppable Oak Tree right-front flank, outer forest trees around backdrop */}
      <Tree position={on(PLACE.server, 2.9, 0, 1.5)} height={4.1} />
      <Tree position={on(PLACE.server, -5.8, 0, -3.5)} height={4.8} />
      <Tree position={on(PLACE.server, 6.2, 0, -3.8)} height={4.6} />
      <Tree position={on(PLACE.server, -6.4, 0, 3.2)} height={4.3} />

      <Hut at={on(PLACE.server, -8.5, 0, -7.0)} />
      <Hut at={on(PLACE.server, 8.8, 0, -6.5)} />
      <Torch position={on(PLACE.server, -3.7, 1.0, 3.1)} />
      <Torch position={on(PLACE.server, 4.0, 1.0, 3.1)} />

      <GodRay position={on(PLACE.server, 0, 6.4, -1.0)} rotation={[0, 0, 0.22]} width={5.0} height={12} color="#fff2d2" opacity={0.07} />
      <LightPool position={on(PLACE.server, 0, 0.03, 0.5)} width={10} depth={10} color="#fff2d0" opacity={0.2} />
      <Glow position={on(PLACE.server, 0, 2.2, -1.8)} size={2.4} color="#ffe398" opacity={0.18} />
      <Dust position={on(PLACE.server, 0, 2.2, 0.5)} area={[10, 4, 10]} count={36} size={0.035} color="#fff7d8" opacity={0.5} seed={19} speed={0.18} />
      <pointLight position={on(PLACE.server, -2.5, 5.5, 3.8)} color="#fff6e0" intensity={7} distance={20} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: IRL Bedroom Shell ---- */}
    <Zone name="irl">
      <Block position={on(PLACE.irl, 0, -0.2, 0)} size={[12, 0.4, 12]} map={plankTex("#6d4e32", [5, 5])} />
      {/* Warm bedroom back & right walls + left open doorway frame at x=-3.1 */}
      <Block position={on(PLACE.irl, 0, 2.15, -4.4)} size={[12, 4.3, 0.4]} color="#283040" />
      <Block position={on(PLACE.irl, 3.8, 2.15, 0)} size={[0.4, 4.3, 12]} color="#232a38" />
      <Block position={on(PLACE.irl, -3.3, 2.15, -2.6)} size={[0.38, 4.3, 3.4]} color="#252c3b" />
      <Block position={on(PLACE.irl, -3.3, 2.15, 2.2)} size={[0.38, 4.3, 2.8]} color="#252c3b" />
      {/* Bedroom poster & bookshelf on right/back wall */}
      <Block position={on(PLACE.irl, 2.2, 0.9, -3.9)} size={[1.15, 1.8, 0.55]} map={plankTex("#593c23")} />
      <Block position={on(PLACE.irl, -1.6, 2.1, -4.15)} size={[1.2, 1.5, 0.06]} color="#3a7a42" />
      <LightPool position={on(PLACE.irl, 0, 0.03, 0.2)} width={6.5} depth={6.5} color="#bcd8ff" opacity={0.18} />
      <pointLight position={on(PLACE.irl, 0, 3.6, 1.8)} color="#d8e8ff" intensity={6.5} distance={14} decay={2} />
    </Zone>

    {/* ---- ZONE 3: IRL Staircase & Hallway ---- */}
    <Zone name="stairs">
      <StaircaseHall position={on(PLACE.stairs, 0, 0, 0)} withLaptop={false} />
    </Zone>
  </>
);
