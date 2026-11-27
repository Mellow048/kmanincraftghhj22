import type React from "react";
import { Block, Dust, Glow,
  GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { Hut } from "../../../Topics/InThisTown";
import { PLACE, VillageStreet, on } from "./kit";

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Full 56m Multi-Angle Village Street (Houses Both Sides, Alleys, 6 LampPosts, Hill) ---- */}
    <Zone name="street">
      <GodRay position={on(PLACE.street, 0, 4.2, -1.5)} width={5.5} height={9.0} color="#fff2cc" opacity={0.14} />
      <VillageStreet position={PLACE.street} />
      <Tree position={on(PLACE.street, -13, 0, -12)} height={5.2} />
      <Tree position={on(PLACE.street, 13, 0, -10)} height={5.0} />
      <pointLight position={on(PLACE.street, 0, 6.0, 6.0)} color="#fff5e0" intensity={6.5} distance={26} decay={1.4} />
    </Zone>

    {/* ---- ZONE 2: Town Treasury / Council Hall ---- */}
    <Zone name="hall">
      <Block position={on(PLACE.hall, 0, -0.2, 0)} size={[16, 0.4, 16]} map={plankTex("#7a5836", [5, 5])} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 2.6, -5.5)} size={[16, 5.2, 0.6]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, -7.5, 2.6, 0)} size={[0.6, 5.2, 16]} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 7.5, 2.6, 0)} size={[0.6, 5.2, 16]} />
      <Torch position={on(PLACE.hall, -3.5, 2.3, -5.0)} light={2.2} />
      <Torch position={on(PLACE.hall, 3.5, 2.3, -5.0)} light={2.2} />
      <LightPool position={on(PLACE.hall, 0, 0.03, 0)} width={10} depth={10} color="#fff1cc" opacity={0.22} />
      <Glow position={on(PLACE.hall, 0, 2.8, -3.6)} size={2.4} color="#ffd86b" opacity={0.2} />
      <Dust position={on(PLACE.hall, 0, 2.0, 0)} area={[10, 4, 10]} count={28} size={0.034} color="#fff5d6" opacity={0.38} seed={11} speed={0.15} />
      <pointLight position={on(PLACE.hall, 0, 4.5, 2.5)} color="#fff2d6" intensity={6.0} distance={18} decay={1.5} />
    </Zone>

    {/* ---- ZONE 3: Real-World Civic Plaza (Roads, School, Clean Water Fountain) ---- */}
    <Zone name="real">
      <Vox kind="grass" position={on(PLACE.real, 0, -0.25, 0)} size={[46, 0.5, 46]} />
      <Vox kind="stoneBrick" position={on(PLACE.real, 0, 0.04, 0)} size={[16, 0.08, 22]} />
      <Hut at={on(PLACE.real, -7.8, 0, -6.5)} wall="bricks" tint="#c45c4b" roof="#355880" turn={0.3} windows={[-1.4, 1.4]} />
      <Hut at={on(PLACE.real, 7.8, 0, -6.5)} wall="stoneBrick" tint="#c9d1d9" roof="#2d6e4e" turn={-0.3} windows={[-1.4, 1.4]} />
      <Tree position={on(PLACE.real, -11, 0, 2)} height={4.8} />
      <Tree position={on(PLACE.real, 11, 0, 2)} height={4.6} />
      <LightPool position={on(PLACE.real, 0, 0.05, 0)} width={12} depth={12} color="#dceeff" opacity={0.22} />
      <Glow position={on(PLACE.real, 0, 3.2, -3.0)} size={2.6} color="#a8d8ff" opacity={0.22} />
      <pointLight position={on(PLACE.real, 0, 5.5, 4.5)} color="#f2f8ff" intensity={6.5} distance={22} decay={1.5} />
    </Zone>
  </>
);
