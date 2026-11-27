import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { Hut } from "../../../Topics/InThisTown";
import { PLACE, on } from "./kit";

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Village Square & Leo's House ---- */}
    <Zone name="square">
      <Vox kind="grass" position={on(PLACE.square, 0, -0.25, 0)} size={[42, 0.5, 42]} />
      <Vox kind="cobble" position={on(PLACE.square, 0, 0.02, 0.8)} size={[11, 0.08, 12]} />
      <Hut at={on(PLACE.square, -6.8, 0, -5.2)} tint="#c98e52" roof="#3d6cb8" />
      <Hut at={on(PLACE.square, 6.8, 0, -5.2)} tint="#d6c7a9" roof="#b84338" />
      <Hut at={on(PLACE.square, 0, 0, -8.5)} tint="#b59469" roof="#2d8a5e" />
      <Tree position={on(PLACE.square, -9.8, 0, -1.5)} height={4.6} />
      <Tree position={on(PLACE.square, 8.5, 0, -2.8)} height={4.5} />
      <GodRay position={on(PLACE.square, 0, 6.2, -2.0)} rotation={[0, 0, 0.18]} width={4.8} height={11} color="#fff4d6" opacity={0.07} />
      <LightPool position={on(PLACE.square, 0, 0.03, 0.5)} width={10} depth={10} color="#fff6dc" opacity={0.22} />
      <Glow position={on(PLACE.square, 0, 2.8, -1.8)} size={2.4} color="#ffe8a3" opacity={0.18} />
      <Dust position={on(PLACE.square, 0, 2.0, 0.5)} area={[10, 4, 10]} count={32} size={0.034} color="#fff8e0" opacity={0.42} seed={31} speed={0.18} />
      <pointLight position={on(PLACE.square, 0, 5.2, 4.5)} color="#fff5e0" intensity={6.5} distance={20} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: Town Hall / Treasury ---- */}
    <Zone name="hall">
      <Block position={on(PLACE.hall, 0, -0.2, 0)} size={[14, 0.4, 14]} map={plankTex("#7a5836", [5, 5])} />
      <Vox kind="stoneBrick" position={on(PLACE.hall, 0, 2.5, -4.5)} size={[14, 5.0, 0.6]} />
      <Torch position={on(PLACE.hall, -3.2, 2.2, -4.0)} light={2.2} />
      <Torch position={on(PLACE.hall, 3.2, 2.2, -4.0)} light={2.2} />
      <LightPool position={on(PLACE.hall, 0, 0.03, 0)} width={8} depth={8} color="#fff1cc" opacity={0.2} />
      <Glow position={on(PLACE.hall, 0, 2.8, -3.2)} size={2.2} color="#ffd86b" opacity={0.2} />
      <pointLight position={on(PLACE.hall, 0, 4.2, 2.2)} color="#fff2d6" intensity={6.0} distance={16} decay={1.6} />
    </Zone>

    {/* ---- ZONE 3: Real-World Bridge Stage ---- */}
    <Zone name="history">
      <Vox kind="stoneBrick" position={on(PLACE.history, 0, -0.25, 0)} size={[22, 0.5, 22]} />
      <LightPool position={on(PLACE.history, 0, 0.03, 0)} width={10} depth={10} color="#dceeff" opacity={0.22} />
      <Glow position={on(PLACE.history, 0, 3.0, -2.0)} size={2.5} color="#a8d8ff" opacity={0.22} />
      <pointLight position={on(PLACE.history, 0, 5.0, 4.0)} color="#f2f8ff" intensity={6.5} distance={18} decay={1.5} />
    </Zone>
  </>
);
