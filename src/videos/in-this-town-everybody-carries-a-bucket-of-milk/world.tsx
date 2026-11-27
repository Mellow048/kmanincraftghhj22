import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { Hut } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Bright Town Square + Baron Cream's Milk Shop ---- */}
    <Zone name="town">
      <Vox kind="grass" position={[0, -0.25, 0]} size={[44, 0.5, 44]} />
      <Vox kind="cobble" position={[0, 0.02, 2]} size={[14, 0.08, 16]} />
      {/* Houses lining north side (fronts at z = -4.2, exterior action stays z >= -2.5) */}
      <Hut at={[-7.2, 0, -4.5]} tint="#c98e52" roof="#6e3c22" />
      <Hut at={[0, 0, -5.2]} tint="#d4c7ad" roof="#3d5a80" />
      <Hut at={[7.2, 0, -4.5]} tint="#f0ede4" roof="#228c4a" />
      <Tree position={[-10.5, 0, 2.5]} height={4.8} />
      <Tree position={[10.5, 0, 2.2]} height={4.5} />
      <Torch position={[-3.6, 1.4, 4.2]} light={0} />
      <Torch position={[3.6, 1.4, 4.2]} light={0} />
      <GodRay position={[0, 6.8, -1.5]} rotation={[0, 0, 0.18]} width={5.0} height={12} color="#fff5d6" opacity={0.07} />
      <LightPool position={[0, 0.03, 2.0]} width={12} depth={12} color="#fff6dc" opacity={0.22} />
      <Glow position={[0, 3.0, -2.0]} size={2.4} color="#ffe8a3" opacity={0.18} />
      <Dust position={[0, 2.2, 1.5]} area={[12, 4, 12]} count={36} size={0.035} color="#fff7df" opacity={0.45} seed={19} speed={0.2} />
      <pointLight position={[0, 5.2, 5.0]} color="#fff5e0" intensity={6.5} distance={20} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: Classroom / Interior Room ---- */}
    <Zone name="room">
      <Block position={[PLACE.room[0], -0.2, PLACE.room[2]]} size={[10, 0.4, 10]} map={plankTex("#946c42", [4, 4])} />
      <Block position={[PLACE.room[0], 2.2, PLACE.room[2] - 4.2]} size={[10, 4.4, 0.4]} color="#e6dec8" />
      <LightPool position={[PLACE.room[0], 0.03, PLACE.room[2]]} width={7} depth={7} color="#fff4d6" opacity={0.2} />
      <pointLight position={[PLACE.room[0], 3.5, PLACE.room[2] + 1.5]} color="#fff4dc" intensity={6.0} distance={14} decay={1.8} />
    </Zone>
  </>
);
