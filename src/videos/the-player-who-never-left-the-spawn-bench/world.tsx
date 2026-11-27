import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { ClassroomRoom, DeskSetup, Hut, PLACE, on } from "./kit";

/** Pure Minecraft SMP spawn, IRL PC desk, and school classroom. */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Bright Minecraft SMP Spawn Square ---- */}
    <Zone name="server">
      <Vox kind="grass" position={on(PLACE.server, 0, -0.25, 0)} size={[42, 0.5, 42]} />
      <Vox kind="cobble" position={on(PLACE.server, 0, 0.02, 1.2)} size={[12, 0.08, 13]} />
      <Hut at={on(PLACE.server, -7.0, 0, -4.5)} tint="#c98e52" roof="#5e3a22" />
      <Hut at={on(PLACE.server, 7.0, 0, -4.5)} tint="#d6c7a9" roof="#3d6cb8" />
      <Tree position={on(PLACE.server, -9.5, 0, 2.5)} height={4.8} />
      <Tree position={on(PLACE.server, 9.5, 0, 2.2)} height={4.6} />
      <Torch position={on(PLACE.server, -3.5, 1.4, 3.6)} light={0} />
      <Torch position={on(PLACE.server, 3.5, 1.4, 3.6)} light={0} />
      <GodRay position={on(PLACE.server, 0, 6.4, -1.6)} rotation={[0, 0, 0.18]} width={4.8} height={11} color="#fff3d4" opacity={0.07} />
      <LightPool position={on(PLACE.server, 0, 0.03, 1.2)} width={10} depth={10} color="#fff4d6" opacity={0.22} />
      <Glow position={on(PLACE.server, 0, 3.0, -1.8)} size={2.3} color="#ffe8a3" opacity={0.18} />
      <Dust position={on(PLACE.server, 0, 2.1, 1.0)} area={[10, 4, 10]} count={32} size={0.034} color="#fff7dc" opacity={0.45} seed={23} speed={0.18} />
      <pointLight position={on(PLACE.server, -2.2, 4.8, 4.2)} color="#fff5e0" intensity={6.5} distance={18} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: Maya's IRL Bedroom Desk ---- */}
    <Zone name="irl">
      <Block position={on(PLACE.irl, 0, -0.2, 0)} size={[10, 0.4, 10]} map={plankTex("#755336", [4, 4])} />
      <Block position={on(PLACE.irl, 0, 2.1, -3.2)} size={[10, 4.2, 0.4]} color="#253142" />
      <DeskSetup position={on(PLACE.irl, 0, 0, -1.2)} screenText="WELCOME BACK!" screenColor="#6ee7b7" clockText="4:00 PM" lampOn />
      <LightPool position={on(PLACE.irl, 0, 0.03, -0.4)} width={5.5} depth={5.5} color="#a9d4ff" opacity={0.18} />
      <Glow position={on(PLACE.irl, 0, 2.0, -1.2)} size={2.0} color="#9cd2ff" opacity={0.2} />
      <pointLight position={on(PLACE.irl, 0, 3.2, 1.5)} color="#cfe4ff" intensity={5.5} distance={12} decay={2} />
    </Zone>

    {/* ---- ZONE 3: IRL School Classroom ---- */}
    <Zone name="school">
      <ClassroomRoom position={PLACE.school} boardText="MATH CLASS" />
    </Zone>
  </>
);
