import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { CastleGateWall, DetailedBookshelf, PLACE, RoyalCarpet, RoyalThrone, StoneBillboard, on } from "./kit";

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Bright Market Square (3 Competing Stalls -> Sterling's Mega-Shop) ---- */}
    <Zone name="square">
      <Vox kind="grass" position={on(PLACE.square, 0, -0.25, 0)} size={[40, 0.5, 40]} />
      <Vox kind="cobble" position={on(PLACE.square, 0, 0.02, 1.5)} size={[14, 0.08, 10]} />
      <CastleGateWall position={on(PLACE.square, 0, 0, -6.5)} />
      <Tree position={on(PLACE.square, -8.5, 0, -2.5)} height={4.6} />
      <Tree position={on(PLACE.square, 8.5, 0, -2.5)} height={4.4} />
      <Torch position={on(PLACE.square, -4.5, 1.4, 3.0)} light={0} />
      <Torch position={on(PLACE.square, 4.5, 1.4, 3.0)} light={0} />
      <GodRay position={on(PLACE.square, 0, 6.5, -1.0)} rotation={[0, 0, 0.18]} width={4.8} height={12} color="#fff5d6" opacity={0.07} />
      <LightPool position={on(PLACE.square, 0, 0.03, 1.0)} width={12} depth={10} color="#fff6dc" opacity={0.22} />
      <Dust position={on(PLACE.square, 0, 2.0, 1.0)} area={[12, 4, 10]} count={30} size={0.035} color="#fff7df" opacity={0.4} seed={21} speed={0.2} />
      <pointLight position={on(PLACE.square, 0, 5.0, 4.5)} color="#fff5e0" intensity={6.5} distance={18} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: Sterling's Vault & Monopoly Hall ---- */}
    <Zone name="hall">
      <Block position={on(PLACE.hall, 0, -0.2, 0)} size={[14, 0.4, 14]} map={plankTex("#593d24", [5, 5])} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 2.5, -5.2)} size={[14, 5, 0.5]} />
      <RoyalCarpet position={on(PLACE.hall, 0, 0.02, 0)} length={9} />
      <RoyalThrone position={on(PLACE.hall, 0, 0, -3.5)} />
      <DetailedBookshelf position={on(PLACE.hall, -3.4, 0, -4.5)} />
      <DetailedBookshelf position={on(PLACE.hall, 3.4, 0, -4.5)} />
      <LightPool position={on(PLACE.hall, 0, 0.03, -1.0)} width={8} depth={8} color="#ffe7a3" opacity={0.22} />
      <Glow position={on(PLACE.hall, 0, 2.6, -2.5)} size={2.4} color="#ffd966" opacity={0.22} />
      <pointLight position={on(PLACE.hall, 0, 4.2, 2.0)} color="#fff1cc" intensity={6.5} distance={15} decay={1.8} />
    </Zone>

    {/* ---- ZONE 3: Real-World Corporate Plaza ---- */}
    <Zone name="history">
      <Vox kind="grass" position={on(PLACE.history, 0, -0.25, 0)} size={[36, 0.5, 36]} />
      <Vox kind="cobble" position={on(PLACE.history, 0, 0.02, 1.0)} size={[12, 0.08, 10]} />
      <StoneBillboard text="REAL WORLD" position={on(PLACE.history, 0, 0, -3.5)} />
      <LightPool position={on(PLACE.history, 0, 0.03, 0.5)} width={10} depth={8} color="#fff4d6" opacity={0.2} />
      <pointLight position={on(PLACE.history, 0, 5.0, 4.0)} color="#fff5e0" intensity={6.0} distance={16} decay={1.6} />
    </Zone>
  </>
);
