import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import {
  BannerFlag,
  BreadShelf,
  CastleGateWall,
  CouncilTable,
  Crate,
  DetailedBookshelf,
  Lectern,
  PLACE,
  Plinth,
  RoyalCarpet,
  RoyalThrone,
  Signpost,
  StoneBillboard,
  on,
} from "./kit";

/**
 * WORLD FOR "INFLATION, EXPLAINED USING MINECRAFT" (Remastered on `74ba75f`)
 * Four grounded multi-part <Zone> sets — rich composite Minecraft props, zero bare boxes.
 */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Sunlit Bakery & Market Square ---- */}
    <Zone name="bakery">
      <Vox kind="grass" side="dirt" position={on(PLACE.bakery, 0, -0.25, 0)} size={[32, 0.5, 32]} />
      <Vox kind="cobble" position={on(PLACE.bakery, 0, -0.22, 0.5)} size={[13, 0.5, 11]} />
      <Vox kind="planks" position={on(PLACE.bakery, 0, 2.0, -4.6)} size={[9.2, 4.0, 0.8]} />
      <Vox kind="darkPlanks" position={on(PLACE.bakery, 0, 4.35, -4.35)} size={[10.0, 0.7, 1.5]} />
      <Vox kind="stoneBrick" position={on(PLACE.bakery, -2.5, 1.1, -4.0)} size={[1.6, 2.2, 1.1]} />
      <Block position={on(PLACE.bakery, -2.5, 0.7, -3.44)} size={[0.8, 0.6, 0.04]} color="#ff8020" emissive="#ff5a00" emissiveIntensity={1.2} />
      <Signpost text="BAKERY" position={on(PLACE.bakery, -3.8, 0, -3.1)} rotationY={0.38} />
      <BreadShelf position={on(PLACE.bakery, 2.2, 0, -3.7)} rotationY={-0.15} count={4} />
      <Plinth position={on(PLACE.bakery, 0, 0, -0.55)} height={0.95} width={1.0} />
      <Crate position={on(PLACE.bakery, -2.8, 0, -2.5)} size={0.75} />
      <Crate position={on(PLACE.bakery, 3.6, 0, -2.9)} size={0.75} />
      <Tree position={on(PLACE.bakery, -7.8, 0, -2.0)} height={4.2} />
      <Tree position={on(PLACE.bakery, 7.6, 0, -1.6)} height={3.9} leaf="#4a8c33" />
      <Tree position={on(PLACE.bakery, -6.5, 0, 5.2)} height={3.6} leaf="#3f7f2d" />

      <GodRay position={on(PLACE.bakery, -1.2, 5.8, -1.0)} rotation={[0, 0, 0.35]} width={4.8} height={12} color="#fff3cf" opacity={0.07} />
      <LightPool position={on(PLACE.bakery, 0, 0.04, 0)} width={9.5} depth={8.5} color="#fff4d6" opacity={0.2} />
      <Glow position={on(PLACE.bakery, 0, 1.8, -0.55)} size={2.0} color="#ffe28a" opacity={0.22} />
      <Dust position={on(PLACE.bakery, 0, 2.2, 0)} area={[10, 4, 10]} count={32} size={0.035} color="#fff7da" opacity={0.5} seed={10} speed={0.2} />
    </Zone>

    {/* ---- ZONE 2: Server Treasury & Council Hall ---- */}
    <Zone name="hall">
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, -0.25, 0)} size={[18, 0.5, 18]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 3.3, -5.8)} size={[16, 6.6, 0.8]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, -7.2, 3.3, 0)} size={[0.8, 6.6, 13]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 7.2, 3.3, 0)} size={[0.8, 6.6, 13]} />

      <RoyalThrone position={on(PLACE.hall, 0, 0, -3.7)} />
      <RoyalCarpet position={on(PLACE.hall, 0, 0, 0.2)} length={5.8} width={1.8} />
      <BannerFlag position={on(PLACE.hall, -3.0, 3.4, -5.3)} emblem="gem" color="#1a4e36" trim="#f0c232" />
      <BannerFlag position={on(PLACE.hall, 3.0, 3.4, -5.3)} emblem="gem" color="#1a4e36" trim="#f0c232" />
      <DetailedBookshelf position={on(PLACE.hall, -6.2, 0, -3.2)} rotationY={Math.PI / 2} seed={3} />
      <DetailedBookshelf position={on(PLACE.hall, -6.2, 0, -1.2)} rotationY={Math.PI / 2} seed={5} />
      <DetailedBookshelf position={on(PLACE.hall, 6.2, 0, -3.2)} rotationY={-Math.PI / 2} seed={4} />
      <Lectern position={on(PLACE.hall, -2.5, 0, -1.6)} rotationY={0.45} />
      <CouncilTable position={on(PLACE.hall, 2.8, 0, 1.4)} rotationY={-0.3} messy={false} />
      <Torch position={on(PLACE.hall, -1.7, 2.3, -5.2)} />
      <Torch position={on(PLACE.hall, 1.7, 2.3, -5.2)} />
      <Torch position={on(PLACE.hall, -6.6, 2.3, 0.8)} />

      <LightPool position={on(PLACE.hall, 0, 0.04, 0.5)} width={8} depth={8} color="#fff2d0" opacity={0.22} />
      <Dust position={on(PLACE.hall, 0, 2.0, -1.0)} area={[8, 4, 8]} count={30} size={0.035} color="#fff6d4" opacity={0.48} seed={11} speed={0.18} />
    </Zone>

    {/* ---- ZONE 3: Emerald Mine & Shaft ---- */}
    <Zone name="mine">
      <Vox kind="grass" side="dirt" position={on(PLACE.mine, 0, -0.25, 0)} size={[24, 0.5, 24]} />
      <Vox kind="cobble" position={on(PLACE.mine, 0, 2.2, -4.0)} size={[7.6, 4.4, 2.4]} />
      <Vox kind="stone" position={on(PLACE.mine, 0, 1.4, -2.75)} size={[2.3, 2.8, 0.4]} tint="#16181f" />
      <Vox kind="stone" position={on(PLACE.mine, -2.0, 1.4, -2.75)} size={[0.8, 0.8, 0.15]} />
      <Block position={on(PLACE.mine, -2.0, 1.4, -2.66)} size={[0.24, 0.24, 0.05]} color="#3fd46a" emissive="#229944" emissiveIntensity={0.4} />
      <Vox kind="stone" position={on(PLACE.mine, 2.0, 1.7, -2.75)} size={[0.8, 0.8, 0.15]} />
      <Block position={on(PLACE.mine, 2.0, 1.7, -2.66)} size={[0.24, 0.24, 0.05]} color="#3fd46a" emissive="#229944" emissiveIntensity={0.4} />
      <Torch position={on(PLACE.mine, -1.5, 1.9, -2.6)} light={1.4} />
      <Torch position={on(PLACE.mine, 1.5, 1.9, -2.6)} light={1.4} />
      <Crate position={on(PLACE.mine, 2.2, 0, -1.4)} size={0.75} />
      <Tree position={on(PLACE.mine, -5.5, 0, -2.2)} height={4.0} />
      <LightPool position={on(PLACE.mine, 0, 0.04, 0)} width={7.5} depth={6.5} color="#ffeec8" opacity={0.2} />
      <Dust position={on(PLACE.mine, 0, 1.8, 0)} area={[7, 3, 7]} count={24} size={0.03} color="#fff5d0" opacity={0.45} seed={12} speed={0.18} />
    </Zone>

    {/* ---- ZONE 4: Real-World History Plaza ---- */}
    <Zone name="history">
      <Vox kind="cobble" position={on(PLACE.history, 0, -0.25, 0)} size={[28, 0.5, 28]} />
      <CastleGateWall position={on(PLACE.history, 0, 0, -6.0)} width={16} height={6.0} gate={false} />
      <Vox kind="stoneBrick" position={on(PLACE.history, -7.2, 2.5, 0)} size={[1.2, 5.0, 14]} />
      <Vox kind="stoneBrick" position={on(PLACE.history, 7.2, 2.5, 0)} size={[1.2, 5.0, 14]} />
      <StoneBillboard text="1971" position={on(PLACE.history, 0, 3.4, -5.2)} width={3.8} height={1.45} />
      <LightPool position={on(PLACE.history, 0, 0.04, 0)} width={9} depth={8} color="#fff3d8" opacity={0.2} />
      <Dust position={on(PLACE.history, 0, 2.0, 0)} area={[9, 4, 9]} count={26} size={0.035} color="#fff7da" opacity={0.48} seed={13} speed={0.18} />
    </Zone>
  </>
);
