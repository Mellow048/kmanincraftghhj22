import type React from "react";
import { Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import {
  BannerFlag,
  CastleGateWall,
  CouncilTable,
  DetailedBookshelf,
  PLACE,
  RoyalCarpet,
  RoyalThrone,
  StoneBillboard,
  on,
} from "./kit";

/**
 * THE WORLD OF AN EXPLAINER: grounded, richly detailed Minecraft sets divided by <Zone>.
 * Never drop bare single cubes for shelves, thrones, or walls — compose real depth with
 * DetailedBookshelf, RoyalThrone, BannerFlag, CastleGateWall, StoneBillboard, and lit pools.
 */

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Throne & Council Hall ---- */}
    <Zone name="hall">
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, -0.25, 0)} size={[16, 0.5, 16]} />
      {/* Back & side stone walls */}
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 3.2, -5.5)} size={[14, 6.4, 0.8]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, -6.5, 3.2, 0)} size={[0.8, 6.4, 12]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 6.5, 3.2, 0)} size={[0.8, 6.4, 12]} />

      {/* Royal throne + runner + banners */}
      <RoyalThrone position={on(PLACE.hall, 0, 0, -3.5)} />
      <RoyalCarpet position={on(PLACE.hall, 0, 0, 0.2)} length={5.4} width={1.7} />
      <BannerFlag position={on(PLACE.hall, -2.8, 3.3, -5.0)} emblem="crown" />
      <BannerFlag position={on(PLACE.hall, 2.8, 3.3, -5.0)} emblem="crown" />

      {/* Detailed bookshelves flanking the hall — never flat boxes */}
      <DetailedBookshelf position={on(PLACE.hall, -5.6, 0, -3.2)} rotationY={Math.PI / 2} seed={1} />
      <DetailedBookshelf position={on(PLACE.hall, 5.6, 0, -3.2)} rotationY={-Math.PI / 2} seed={2} />

      {/* Council desk pushed to east side for dialogue/work beats */}
      <CouncilTable position={on(PLACE.hall, 3.2, 0, 1.4)} rotationY={-0.35} messy={false} />

      {/* Warm readable torches & pools */}
      <Torch position={on(PLACE.hall, -1.6, 2.2, -4.95)} />
      <Torch position={on(PLACE.hall, 1.6, 2.2, -4.95)} />
      <GodRay position={on(PLACE.hall, 0, 5.5, -1.5)} rotation={[0, 0, 0.3]} width={4.2} height={11} color="#fff2ce" opacity={0.07} />
      <LightPool position={on(PLACE.hall, 0, 0.03, -1.0)} width={7.5} depth={6.5} color="#fff2d0" opacity={0.22} />
      <Glow position={on(PLACE.hall, 0, 2.6, -3.4)} size={2.2} color="#ffe28a" opacity={0.28} />
      <Dust position={on(PLACE.hall, 0, 2.0, -1.0)} area={[8, 4, 8]} count={36} size={0.035} color="#fff6d4" opacity={0.55} seed={11} speed={0.18} />
    </Zone>

    {/* ---- ZONE 2: Castle Courtyard & Voting Plaza ---- */}
    <Zone name="square">
      <Vox kind="cobble" position={on(PLACE.square, 0, -0.25, 0)} size={[26, 0.5, 26]} />
      <CastleGateWall position={on(PLACE.square, 0, 0, -6.5)} width={14} height={6.2} />
      <StoneBillboard text="YEAR 1" position={on(PLACE.square, -4.4, 3.2, -5.9)} width={2.8} height={1.1} />
      <Tree position={on(PLACE.square, 6.2, 0, -2.5)} height={4.2} />
      <Tree position={on(PLACE.square, -6.5, 0, 2.0)} height={3.8} />

      <LightPool position={on(PLACE.square, 0, 0.03, 0)} width={9} depth={8} color="#fff5d8" opacity={0.18} />
      <Dust position={on(PLACE.square, 0, 2.2, 0)} area={[10, 4, 10]} count={32} size={0.035} color="#fff8de" opacity={0.5} seed={22} speed={0.22} />
    </Zone>
  </>
);
