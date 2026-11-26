import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, plankTex } from "../../engine";
import { DeskSetup, Hut, ObsidianLavaPit, PLACE, ScoreboardWall, on } from "./kit";

/**
 * Starter World for a Server Lore Short — three clean zones (`server`, `cave`, `irl`)
 * with zero flat gray void backgrounds and full volumetric shader lighting.
 */
export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Minecraft SMP Spawn & Bridge ---- */}
    <Zone name="server">
      <Vox kind="grass" position={on(PLACE.server, 0, -0.25, 0)} size={[34, 0.5, 34]} />
      {/* Cobble spawn plaza + plank bridge */}
      <Vox kind="cobble" position={on(PLACE.server, 0, 0.02, 0)} size={[9, 0.08, 12]} />
      <Block position={on(PLACE.server, 0, 0.04, -5.5)} size={[3.2, 0.12, 8.5]} map={plankTex("#8c6239", [2, 4])} />

      {/* Background SMP houses & spawn scoreboard */}
      <Hut position={on(PLACE.server, -5.6, 0, -4.5)} rotationY={0.3} />
      <Hut position={on(PLACE.server, 5.8, 0, -3.5)} rotationY={-0.4} />
      <ScoreboardWall
        title="SERVER LOGS"
        rows={[
          { label: "ALEX", value: 2 },
          { label: "SAM", value: 1 },
        ]}
        position={on(PLACE.server, -3.4, 0, -1.6)}
        rotationY={0.45}
      />

      <Tree position={on(PLACE.server, -7.2, 0, 2.4)} height={4.5} />
      <Tree position={on(PLACE.server, 7.2, 0, 2.0)} height={4.2} />
      <Torch position={on(PLACE.server, -1.8, 1.6, 1.5)} />
      <Torch position={on(PLACE.server, 1.8, 1.6, 1.5)} />

      <GodRay position={on(PLACE.server, 0, 6.2, -1.0)} rotation={[0, 0, 0.25]} width={4.4} height={11} color="#fff2ce" opacity={0.07} />
      <LightPool position={on(PLACE.server, 0, 0.03, 0)} width={9} depth={9} color="#fff2d0" opacity={0.22} />
      <Glow position={on(PLACE.server, 0, 2.2, -1.5)} size={2.2} color="#ffe18c" opacity={0.24} />
      <Dust position={on(PLACE.server, 0, 2.2, 0)} area={[10, 4, 10]} count={36} size={0.035} color="#fff6d4" opacity={0.55} seed={11} speed={0.2} />
      <pointLight position={on(PLACE.server, -2.5, 4.5, 3.0)} color="#fff5de" intensity={6.5} distance={18} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: Deep Dark / Lava Pit ---- */}
    <Zone name="cave">
      <Vox kind="deepslate" position={on(PLACE.cave, 0, -0.25, 0)} size={[22, 0.5, 22]} />
      <Vox kind="deepslate" position={on(PLACE.cave, 0, 3.0, -5.5)} size={[18, 6, 1.2]} />
      <ObsidianLavaPit position={on(PLACE.cave, 0, 0, -1.6)} size={2.5} />
      <LightPool position={on(PLACE.cave, 0, 0.03, 0)} width={7} depth={7} color="#28e8d8" opacity={0.18} />
      <Glow position={on(PLACE.cave, 0, 2.0, -1.6)} size={2.0} color="#ff7029" opacity={0.26} />
      <Dust position={on(PLACE.cave, 0, 1.8, 0)} area={[8, 4, 8]} count={28} size={0.035} color="#58f5e8" opacity={0.45} seed={33} speed={0.16} />
      <pointLight position={on(PLACE.cave, 2.0, 4.0, 2.0)} color="#40ded0" intensity={4.5} distance={14} decay={2} />
    </Zone>

    {/* ---- ZONE 3: IRL Bedroom Cutaway ---- */}
    <Zone name="irl">
      <Block position={on(PLACE.irl, 0, -0.2, 0)} size={[10, 0.4, 10]} map={plankTex("#6e4e32", [4, 4])} />
      <Block position={on(PLACE.irl, 0, 2.1, -3.2)} size={[10, 4.2, 0.4]} color="#252c3b" />
      <DeskSetup position={on(PLACE.irl, 0, 0, -1.2)} screenText="MC SMP - 3:00 AM" screenColor="#4be08a" clockText="3:00 AM" />
      <LightPool position={on(PLACE.irl, 0, 0.03, -0.4)} width={5.5} depth={5.5} color="#a9d4ff" opacity={0.18} />
      <pointLight position={on(PLACE.irl, 0, 3.2, 1.5)} color="#cfe4ff" intensity={5.5} distance={12} decay={2} />
    </Zone>
  </>
);
