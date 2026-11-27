import type React from "react";
import {
  Block,
  Clouds,
  DeskSetup,
  Dust,
  Glow,
  GodRay,
  Hut,
  LampPost,
  LightPool,
  PLACE,
  Tree,
  VillageStreet,
  Vox,
  Zone,
  on,
  plankTex,
} from "./kit";
import { useFilmTime } from "../../engine";

/**
 * 3-Zone Server Lore World:
 *   1. `smp`   — Minecraft SMP village street & pine clearing (day / moonlit night / warm lantern-lit finale)
 *   2. `irl`   — Grounded late-night real-world bedroom with DeskSetup (screen facing +Z) & warm night lamp
 *   3. `cabin` — Cozy interior of Milo's oak cabin (open +Z wall) where Owner finds the signed book
 */
export const World: React.FC = () => {
  const t = useFilmTime();
  const night = t >= 23 && t < 67;
  return (
    <group>
      {/* ---- ZONE 1: Minecraft SMP Village & Pine Clearing ---- */}
      <Zone name="smp">
        <VillageStreet position={PLACE.smp} night={night} />
        <Tree position={on(PLACE.smp, -6.4, 0, -17.5)} height={5.2} />
        <Tree position={on(PLACE.smp, 6.4, 0, -17.0)} height={5.0} />
        <Tree position={on(PLACE.smp, -11.5, 0, -8.5)} height={5.5} />
        <Tree position={on(PLACE.smp, 11.5, 0, -8.5)} height={5.4} />
        <Clouds y={48} center={PLACE.smp} />
        <GodRay position={on(PLACE.smp, 0, 8, -4)} rotation={[0, 0, 0.2]} width={5.5} height={14} color={night ? "#8ab4ff" : "#fff3cc"} opacity={night ? 0.06 : 0.08} />
        <LightPool position={on(PLACE.smp, 0, 0.06, 2)} width={12} depth={14} color={night ? "#7fa6ff" : "#fff5d8"} opacity={0.18} />
        <Glow position={on(PLACE.smp, 0, 3.4, -2)} size={3.2} color={night ? "#7ba6ff" : "#ffeaab"} opacity={0.2} />
        <Dust position={on(PLACE.smp, 0, 2.2, 2)} area={[16, 4.5, 22]} count={45} size={0.038} color={night ? "#b8d0ff" : "#fff9e0"} opacity={0.48} seed={17} speed={0.18} />
        <pointLight position={on(PLACE.smp, 0, 5.5, 2)} color={night ? "#9ec0ff" : "#fff0d0"} intensity={night ? 9 : 4} distance={24} decay={1.6} />
      </Zone>

      {/* ---- ZONE 2: Late-Night IRL Bedroom Cutaway (Monitor faces +Z cleanly) ---- */}
      <Zone name="irl">
        {/* Warm hardwood bedroom floor & navy-blue bedroom walls open toward +Z */}
        <Block position={on(PLACE.irl, 0, -0.15, 0)} size={[9.0, 0.3, 9.0]} map={plankTex("#755233", [5, 5])} />
        <Block position={on(PLACE.irl, 0, 2.0, -3.2)} size={[9.0, 4.3, 0.3]} color="#1d3552" />
        <Block position={on(PLACE.irl, -4.3, 2.0, 0)} size={[0.3, 4.3, 9.0]} color="#162940" />
        <Block position={on(PLACE.irl, 4.3, 2.0, 0)} size={[0.3, 4.3, 9.0]} color="#162940" />
        {/* Moonlit bedroom window on back wall */}
        <Block position={on(PLACE.irl, 1.8, 2.2, -3.02)} size={[1.7, 1.4, 0.06]} color="#2d5284" emissive="#4d7ec2" emissiveIntensity={0.45} />
        <Block position={on(PLACE.irl, 1.8, 2.2, -2.97)} size={[1.8, 0.08, 0.08]} color="#4e341e" />
        <Block position={on(PLACE.irl, 1.8, 2.2, -2.97)} size={[0.08, 1.5, 0.08]} color="#4e341e" />
        {/* Grounded PC DeskSetup positioned left-of-center with monitor facing +Z */}
        <DeskSetup position={on(PLACE.irl, -1.0, 0, -1.2)} screenText="MC SMP" screenColor="#4be08a" clockText="11:10 PM" lampOn />
        <Glow position={on(PLACE.irl, 0.4, 2.4, -1.0)} size={3.2} color="#9bc0ff" opacity={0.2} />
        <LightPool position={on(PLACE.irl, 0, 0.04, 0.2)} width={6.5} depth={6.0} color="#ffdba8" opacity={0.16} />
        <Dust position={on(PLACE.irl, 0, 1.8, 0)} area={[6.5, 3.2, 6.0]} count={32} size={0.03} color="#ffe8c4" opacity={0.42} seed={29} speed={0.14} />
        <pointLight position={on(PLACE.irl, 0.5, 3.0, 1.4)} color="#ffd9a0" intensity={8.5} distance={14} decay={1.6} />
      </Zone>

      {/* ---- ZONE 3: Milo's Small Wooden SMP Cabin Interior ---- */}
      <Zone name="cabin">
        <Block position={on(PLACE.cabin, 0, -0.15, 0)} size={[8.0, 0.3, 8.0]} map={plankTex("#966c41", [4, 4])} />
        <Vox kind="planks" position={on(PLACE.cabin, 0, 2.0, -3.0)} size={[8.0, 4.0, 0.35]} />
        <Vox kind="darkPlanks" position={on(PLACE.cabin, -3.8, 2.0, 0)} size={[0.35, 4.0, 7.6]} />
        <Vox kind="darkPlanks" position={on(PLACE.cabin, 3.8, 2.0, 0)} size={[0.35, 4.0, 7.6]} />
        {/* Warm crafting table & cobble furnace along back corners */}
        <Vox kind="planks" position={on(PLACE.cabin, -2.4, 0.48, -2.1)} size={[0.95, 0.95, 0.95]} />
        <Vox kind="cobble" position={on(PLACE.cabin, 2.4, 0.48, -2.1)} size={[0.95, 0.95, 0.95]} />
        <Block position={on(PLACE.cabin, 2.4, 0.35, -1.6)} size={[0.5, 0.35, 0.04]} color="#ff8524" emissive="#ff6b14" emissiveIntensity={1.1} />
        <Glow position={on(PLACE.cabin, 0, 2.4, -1.2)} size={3.0} color="#ffd98c" opacity={0.24} />
        <LightPool position={on(PLACE.cabin, 0, 0.04, 0)} width={6.5} depth={6.0} color="#ffe2a8" opacity={0.2} />
        <Dust position={on(PLACE.cabin, 0, 1.8, 0)} area={[6.0, 3.2, 6.0]} count={30} size={0.032} color="#fff0c8" opacity={0.44} seed={47} speed={0.14} />
        <pointLight position={on(PLACE.cabin, 0, 3.0, 1.0)} color="#ffdca0" intensity={9.5} distance={14} decay={1.6} />
      </Zone>
    </group>
  );
};
