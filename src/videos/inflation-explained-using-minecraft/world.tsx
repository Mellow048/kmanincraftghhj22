import type React from "react";
import { Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import {
  BannerFlag,
  BreadShelf,
  CastleGateWall,
  CouncilTable,
  Crate,
  DetailedBookshelf,
  PLACE,
  Plinth,
  RoyalCarpet,
  RoyalThrone,
  Signpost,
  StoneBillboard,
  on,
} from "./kit";

/**
 * WORLD FOR "INFLATION, EXPLAINED USING MINECRAFT"
 * Four grounded <Zone> sets with detailed multi-part Minecraft architecture & props.
 */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Sunlit Bakery & Market Square ---- */}
    <Zone name="bakery">
      <Vox kind="grass" side="dirt" position={on(PLACE.bakery, 0, -0.25, 0)} size={[26, 0.5, 26]} />
      <Vox kind="cobble" position={on(PLACE.bakery, 0, -0.22, 0.5)} size={[11, 0.5, 10]} />
      {/* Bakery timber storefront */}
      <Vox kind="planks" position={on(PLACE.bakery, 0, 2.0, -4.4)} size={[8.2, 4.0, 0.8]} />
      <Vox kind="darkPlanks" position={on(PLACE.bakery, 0, 4.3, -4.2)} size={[9.0, 0.7, 1.4]} />
      <Signpost text="BAKERY" position={on(PLACE.bakery, -3.2, 0, -3.3)} rotationY={0.35} />
      <BreadShelf position={on(PLACE.bakery, 2.1, 0, -3.6)} rotationY={-0.15} count={4} />
      <Plinth position={on(PLACE.bakery, 0, 0, -0.6)} height={0.95} width={1.0} />
      <Crate position={on(PLACE.bakery, -2.5, 0, -2.9)} size={0.75} />
      <Tree position={on(PLACE.bakery, -7.2, 0, -2.2)} height={4.1} />
      <Tree position={on(PLACE.bakery, 7.0, 0, -1.8)} height={3.8} leaf="#4a8c33" />

      <GodRay position={on(PLACE.bakery, -1.2, 5.8, -1.0)} rotation={[0, 0, 0.35]} width={4.8} height={12} color="#fff3cf" opacity={0.08} />
      <LightPool position={on(PLACE.bakery, 0, 0.04, 0)} width={9} depth={8} color="#fff4d6" opacity={0.2} />
      <Glow position={on(PLACE.bakery, 0, 1.8, -0.6)} size={2.2} color="#ffe28a" opacity={0.24} />
      <Dust position={on(PLACE.bakery, 0, 2.2, 0)} area={[10, 4, 10]} count={36} size={0.035} color="#fff7da" opacity={0.55} seed={10} speed={0.2} />
    </Zone>

    {/* ---- ZONE 2: Server Treasury & Council Hall ---- */}
    <Zone name="hall">
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, -0.25, 0)} size={[16, 0.5, 16]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 3.2, -5.5)} size={[14, 6.4, 0.8]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, -6.5, 3.2, 0)} size={[0.8, 6.4, 12]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 6.5, 3.2, 0)} size={[0.8, 6.4, 12]} />

      <RoyalThrone position={on(PLACE.hall, 0, 0, -3.5)} />
      <RoyalCarpet position={on(PLACE.hall, 0, 0, 0.2)} length={5.4} width={1.7} />
      <BannerFlag position={on(PLACE.hall, -2.8, 3.3, -5.0)} emblem="gem" color="#1a4e36" trim="#f0c232" />
      <BannerFlag position={on(PLACE.hall, 2.8, 3.3, -5.0)} emblem="gem" color="#1a4e36" trim="#f0c232" />
      <DetailedBookshelf position={on(PLACE.hall, -5.6, 0, -3.2)} rotationY={Math.PI / 2} seed={3} />
      <DetailedBookshelf position={on(PLACE.hall, 5.6, 0, -3.2)} rotationY={-Math.PI / 2} seed={4} />
      <CouncilTable position={on(PLACE.hall, 2.8, 0, 1.4)} rotationY={-0.3} messy={false} />
      <Torch position={on(PLACE.hall, -1.6, 2.2, -4.95)} />
      <Torch position={on(PLACE.hall, 1.6, 2.2, -4.95)} />

      <LightPool position={on(PLACE.hall, 0, 0.04, -1.0)} width={7.5} depth={6.5} color="#fff2d0" opacity={0.22} />
      <Dust position={on(PLACE.hall, 0, 2.0, -1.0)} area={[8, 4, 8]} count={32} size={0.035} color="#fff6d4" opacity={0.5} seed={11} speed={0.18} />
    </Zone>

    {/* ---- ZONE 3: Cobble Mine Entrance ---- */}
    <Zone name="mine">
      <Vox kind="grass" side="dirt" position={on(PLACE.mine, 0, -0.25, 0)} size={[20, 0.5, 20]} />
      <Vox kind="cobble" position={on(PLACE.mine, 0, 2.0, -3.8)} size={[6.8, 4.0, 2.0]} />
      <Vox kind="stone" position={on(PLACE.mine, 0, 1.3, -2.75)} size={[2.2, 2.6, 0.4]} tint="#181a20" />
      <Torch position={on(PLACE.mine, -1.5, 1.8, -2.6)} light={1.4} />
      <Torch position={on(PLACE.mine, 1.5, 1.8, -2.6)} light={1.4} />
      <Crate position={on(PLACE.mine, -2.4, 0, -1.2)} size={0.7} />
      <LightPool position={on(PLACE.mine, 0, 0.04, 0)} width={7} depth={6} color="#ffeec8" opacity={0.18} />
      <Dust position={on(PLACE.mine, 0, 1.8, 0)} area={[7, 3, 7]} count={24} size={0.03} color="#fff5d0" opacity={0.45} seed={12} speed={0.18} />
    </Zone>

    {/* ---- ZONE 4: Real-World History Plaza ---- */}
    <Zone name="history">
      <Vox kind="cobble" position={on(PLACE.history, 0, -0.25, 0)} size={[24, 0.5, 24]} />
      <CastleGateWall position={on(PLACE.history, 0, 0, -5.8)} width={14} height={5.8} gate={false} />
      <StoneBillboard text="1971" position={on(PLACE.history, 0, 3.2, -5.1)} width={3.6} height={1.4} />
      <LightPool position={on(PLACE.history, 0, 0.04, 0)} width={8} depth={7} color="#fff3d8" opacity={0.18} />
      <Dust position={on(PLACE.history, 0, 2.0, 0)} area={[8, 4, 8]} count={24} size={0.035} color="#fff7da" opacity={0.45} seed={13} speed={0.18} />
    </Zone>
  </>
);
