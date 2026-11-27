import type React from "react";
import {
  Block,
  Clouds,
  DeskSetup,
  Dust,
  Glow,
  GodRay,
  LightPool,
  PLACE,
  PoppyFlower,
  SURFACE_Y,
  Tree,
  VillageStreet,
  Vox,
  Zone,
  on,
  plankTex,
} from "./kit";
import { SolidBox, Torch, useActiveShot } from "../../engine";

/**
 * 6-Zone Overhauled Server Lore World (ZERO Z-Fighting + Authentic Environments for EVERY Beat!):
 *   1. `forest`  — Lush Minecraft Oak Meadow elevated at y=2.0 with a REAL carved 1.36x1.36x2.0m sunken dirt shaft!
 *   2. `dungeon` — Dark Torch-lit Stonebrick Boss Arena elevated at y=2.0 with sunken hole & glowing lava moats!
 *   3. `burrow`  — True Underground Dirt/Stone Cross-Section Cutaway with grass roof overhead & mobs walking above!
 *   4. `smp`     — Village Street & Lantern-lit Hills for community rallies, Safe Booths, Iron Golems & Finale!
 *   5. `irl`     — Spacious Late-Night Real-World Bedroom (open camera side, full view of desk, Milo, Mom & crib!)
 *   6. `cabin`   — Milo's Cozy Oak Cabin Interior where Owner finds the signed book!
 */
export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night";

  return (
    <group>
      {/* ---- ZONE 1: Lush Oak Forest & REAL Carved Sunken Dirt Shaft (Surface = y=2.0, Shaft Floor = y=0.0!) ---- */}
      <Zone name="forest">
        {/* Deep bedrock/stone floor under the sunken shaft (y: -0.3..0.0) */}
        <Vox kind="cobble" position={on(PLACE.forest, 0, -0.15, 0)} size={[6, 0.3, 6]} />
        {/* 4 strictly non-overlapping earth/grass terrain slabs carving a genuine 1.36x1.36x2.0m hole at (0, 0..2.0, 0)! */}
        {/* North slab (z: -24.68..-0.68) */}
        <Vox kind="dirt" position={on(PLACE.forest, 0, 0.9, -12.68)} size={[50, 1.8, 24]} />
        <Vox kind="grass" position={on(PLACE.forest, 0, 1.9, -12.68)} size={[50, 0.2, 24]} />
        {/* South slab (z: +0.68..+24.68) */}
        <Vox kind="dirt" position={on(PLACE.forest, 0, 0.9, 12.68)} size={[50, 1.8, 24]} />
        <Vox kind="grass" position={on(PLACE.forest, 0, 1.9, 12.68)} size={[50, 0.2, 24]} />
        {/* West strip between north & south slabs (x: -25..-0.68, z: -0.68..+0.68) */}
        <Vox kind="dirt" position={on(PLACE.forest, -12.84, 0.9, 0)} size={[24.32, 1.8, 1.36]} />
        <Vox kind="grass" position={on(PLACE.forest, -12.84, 1.9, 0)} size={[24.32, 0.2, 1.36]} />
        {/* East strip between north & south slabs (x: +0.68..+25, z: -0.68..+0.68) */}
        <Vox kind="dirt" position={on(PLACE.forest, 12.84, 0.9, 0)} size={[24.32, 1.8, 1.36]} />
        <Vox kind="grass" position={on(PLACE.forest, 12.84, 1.9, 0)} size={[24.32, 0.2, 1.36]} />

        {/* Lush surrounding Minecraft Oak Forest (kept clear of camera arcs!) */}
        <Tree position={on(PLACE.forest, -5.8, SURFACE_Y, -4.8)} height={5.2} />
        <Tree position={on(PLACE.forest, 5.8, SURFACE_Y, -4.5)} height={5.4} />
        <Tree position={on(PLACE.forest, -9.2, SURFACE_Y, -9.5)} height={5.6} />
        <Tree position={on(PLACE.forest, 0.4, SURFACE_Y, -11.5)} height={5.8} />
        <Tree position={on(PLACE.forest, 8.8, SURFACE_Y, -10.2)} height={5.4} />
        <Tree position={on(PLACE.forest, -10.5, SURFACE_Y, 4.5)} height={5.0} />
        <Tree position={on(PLACE.forest, 10.5, SURFACE_Y, 4.2)} height={5.2} />
        {/* Distant stepped green Minecraft hillsides */}
        <Vox kind="grass" position={on(PLACE.forest, -10, SURFACE_Y + 0.5, -18)} size={[16, 1.0, 8]} />
        <Vox kind="grass" position={on(PLACE.forest, 10, SURFACE_Y + 0.5, -18.5)} size={[16, 1.0, 8]} />
        <Vox kind="grass" position={on(PLACE.forest, 0, SURFACE_Y + 1.5, -21)} size={[14, 1.0, 6]} />
        {/* Wildflowers & felled oak log */}
        <PoppyFlower position={on(PLACE.forest, -2.8, SURFACE_Y, 2.2)} />
        <PoppyFlower position={on(PLACE.forest, 3.1, SURFACE_Y, -1.8)} />
        <Vox kind="log" position={on(PLACE.forest, -4.6, SURFACE_Y + 0.35, 1.2)} rotation={[0, 0.25, Math.PI / 2]} size={[0.7, 2.6, 0.7]} />
        <Clouds y={50} center={PLACE.forest} />
        <GodRay position={on(PLACE.forest, 0, SURFACE_Y + 8, -3)} rotation={[0, 0, 0.2]} width={5.5} height={14} color={night ? "#8ab4ff" : "#fff4d0"} opacity={night ? 0.06 : 0.08} />
        <LightPool position={on(PLACE.forest, 0, SURFACE_Y + 0.04, 1)} width={10} depth={10} color={night ? "#7fa8ff" : "#fff7dc"} opacity={0.14} />
        <Dust position={on(PLACE.forest, 0, SURFACE_Y + 2.2, 0)} area={[16, 4.5, 16]} count={40} size={0.036} color={night ? "#b8d0ff" : "#fff9df"} opacity={0.45} seed={19} speed={0.16} />
        <pointLight position={on(PLACE.forest, 0, SURFACE_Y + 5.5, 4)} color={night ? "#9dc0ff" : "#fff2d4"} intensity={night ? 9 : 4} distance={24} decay={1.6} />
      </Zone>

      {/* ---- ZONE 2: Torch-Lit Boss-Fight Dungeon Arena (Elevated at y=2.0 with real carved stone pit!) ---- */}
      <Zone name="dungeon">
        {/* Deep floor inside Milo's dungeon escape shaft */}
        <Vox kind="cobble" position={on(PLACE.dungeon, 0, -0.15, 0)} size={[6, 0.3, 6]} />
        {/* 4 non-overlapping dungeon stonebrick floor slabs carving a genuine 1.36x1.36x2.0m pit at (0, 0..2.0, 0) */}
        <Vox kind="stoneBrick" position={on(PLACE.dungeon, 0, 1.0, -10.68)} size={[36, 2.0, 20]} />
        <Vox kind="stoneBrick" position={on(PLACE.dungeon, 0, 1.0, 10.68)} size={[36, 2.0, 20]} />
        <Vox kind="stoneBrick" position={on(PLACE.dungeon, -9.34, 1.0, 0)} size={[17.32, 2.0, 1.36]} />
        <Vox kind="stoneBrick" position={on(PLACE.dungeon, 9.34, 1.0, 0)} size={[17.32, 2.0, 1.36]} />
        {/* Towering mossy stone dungeon walls & grand pillars */}
        <Vox kind="cobble" position={on(PLACE.dungeon, 0, SURFACE_Y + 4.5, -11.0)} size={[26, 9.0, 1.2]} />
        <Vox kind="cobble" position={on(PLACE.dungeon, -9.5, SURFACE_Y + 4.5, -1.0)} size={[1.2, 9.0, 22]} />
        <Vox kind="cobble" position={on(PLACE.dungeon, 9.5, SURFACE_Y + 4.5, -1.0)} size={[1.2, 9.0, 22]} />
        {[-6.5, 6.5].flatMap((px) =>
          [-7.5, -2.0, 3.5].map((pz) => (
            <group key={`p_${px}_${pz}`}>
              <Vox kind="stoneBrick" position={on(PLACE.dungeon, px, SURFACE_Y + 3.5, pz)} size={[1.4, 7.0, 1.4]} />
              <Torch position={on(PLACE.dungeon, px > 0 ? px - 0.8 : px + 0.8, SURFACE_Y + 2.8, pz)} light={3.5} seed={Math.abs(px + pz)} />
            </group>
          )),
        )}
        {/* Glowing lava channels along left & right dungeon edges */}
        <Block position={on(PLACE.dungeon, -8.2, SURFACE_Y + 0.04, -2.0)} size={[1.1, 0.08, 16]} color="#ff5810" emissive="#ff4406" emissiveIntensity={1.5} />
        <Block position={on(PLACE.dungeon, 8.2, SURFACE_Y + 0.04, -2.0)} size={[1.1, 0.08, 16]} color="#ff5810" emissive="#ff4406" emissiveIntensity={1.5} />
        <Glow position={on(PLACE.dungeon, 0, SURFACE_Y + 3.5, -5)} size={5.2} color="#ff6a2b" opacity={0.28} />
        <Dust position={on(PLACE.dungeon, 0, SURFACE_Y + 2.4, -2)} area={[14, 5, 14]} count={45} size={0.04} color="#ffb37a" opacity={0.5} seed={71} speed={0.24} />
        <pointLight position={on(PLACE.dungeon, 0, SURFACE_Y + 5.2, 1)} color="#ff9d5c" intensity={11} distance={22} decay={1.6} />
      </Zone>

      {/* ---- ZONE 3: TRUE UNDERGROUND CUTAWAY CROSS-SECTION (Dirt Cave Below + Grass Roof + Night Mobs Above!) ---- */}
      <Zone name="burrow">
        {/* Underground stone floor (y: -0.3..0.0) */}
        <Vox kind="cobble" position={on(PLACE.burrow, 0, -0.15, 0)} size={[16, 0.3, 10]} />
        {/* Deep solid earth cutaway walls around Milo's 1.6m-wide underground 3-block pocket (open +Z for camera!) */}
        {/* Back dirt/stone wall */}
        <Vox kind="dirt" position={on(PLACE.burrow, 0, 1.35, -1.1)} size={[14, 2.7, 0.8]} />
        {/* Left & Right solid earth cross-section banks framing Milo's tight 1.6m pocket */}
        <Vox kind="dirt" position={on(PLACE.burrow, -4.3, 1.35, 0.2)} size={[7.0, 2.7, 2.0]} />
        <Vox kind="dirt" position={on(PLACE.burrow, 4.3, 1.35, 0.2)} size={[7.0, 2.7, 2.0]} />
        {/* Exposed underground stone & coal ore veins on cutaway faces */}
        <Vox kind="cobble" position={on(PLACE.burrow, -2.4, 0.65, 1.15)} size={[0.8, 0.8, 0.22]} />
        <Vox kind="cobble" position={on(PLACE.burrow, 2.6, 1.15, 1.15)} size={[0.9, 0.9, 0.22]} />
        <Block position={on(PLACE.burrow, -1.9, 1.65, 1.24)} size={[0.25, 0.25, 0.08]} color="#1f2026" />
        <Block position={on(PLACE.burrow, 2.1, 0.55, 1.24)} size={[0.28, 0.24, 0.08]} color="#1f2026" />
        {/* SOLID DIRT + GRASS ROOF CEILING DIRECTLY OVER MILO'S HEAD (y = 2.70..3.15)! */}
        <Vox kind="dirt" position={on(PLACE.burrow, 0, 2.86, 0.0)} size={[16, 0.32, 4.8]} />
        <Vox kind="grass" position={on(PLACE.burrow, 0, 3.12, 0.0)} size={[16, 0.2, 4.8]} />
        {/* Background meadow hillside visible behind the surface above */}
        <Vox kind="grass" position={on(PLACE.burrow, 0, 2.95, -8.5)} size={[36, 0.5, 12]} />
        <Tree position={on(PLACE.burrow, -5.2, 3.2, -5.2)} height={4.6} />
        <Tree position={on(PLACE.burrow, 5.4, 3.2, -5.0)} height={4.8} />
        {/* Cozy glowing wall torch inside Milo's tiny underground shelter */}
        <Torch position={on(PLACE.burrow, 0.62, 1.45, -0.58)} light={4.5} seed={99} />
        <Glow position={on(PLACE.burrow, 0, 1.3, 0)} size={2.2} color="#ffca72" opacity={0.28} />
        <pointLight position={on(PLACE.burrow, 0, 1.6, 1.8)} color="#ffd696" intensity={6.5} distance={9} decay={1.8} />
        <pointLight position={on(PLACE.burrow, 0, 5.8, 2.0)} color="#8eb4ff" intensity={6.0} distance={18} decay={1.6} />
      </Zone>

      {/* ---- ZONE 4: Minecraft SMP Village Street & Rolling Lantern Hills ---- */}
      <Zone name="smp">
        <VillageStreet position={PLACE.smp} night={night} />
        <Tree position={on(PLACE.smp, -6.8, 0, -17.5)} height={5.2} />
        <Tree position={on(PLACE.smp, 6.8, 0, -17.0)} height={5.0} />
        <Tree position={on(PLACE.smp, -11.5, 0, -8.5)} height={5.5} />
        <Tree position={on(PLACE.smp, 11.5, 0, -8.5)} height={5.4} />
        <Clouds y={48} center={PLACE.smp} />
        <GodRay position={on(PLACE.smp, 0, 8, -4)} rotation={[0, 0, 0.2]} width={5.5} height={14} color={night ? "#8ab4ff" : "#fff3cc"} opacity={night ? 0.06 : 0.08} />
        <Glow position={on(PLACE.smp, 0, 3.4, -2)} size={3.2} color={night ? "#7ba6ff" : "#ffeaab"} opacity={0.2} />
        <Dust position={on(PLACE.smp, 0, 2.2, 2)} area={[16, 4.5, 22]} count={45} size={0.038} color={night ? "#b8d0ff" : "#fff9e0"} opacity={0.48} seed={17} speed={0.18} />
        <pointLight position={on(PLACE.smp, 0, 5.5, 2)} color={night ? "#9ec0ff" : "#fff0d0"} intensity={night ? 9 : 4} distance={24} decay={1.6} />
      </Zone>

      {/* ---- ZONE 5: Spacious Late-Night IRL Bedroom (Generous framing room so Milo, Desk, Mom & Crib NEVER clip!) ---- */}
      <Zone name="irl">
        <Block position={on(PLACE.irl, 0, -0.15, 1.5)} size={[16.0, 0.3, 14.0]} map={plankTex("#755233", [6, 5])} />
        <Block position={on(PLACE.irl, 0, 3.25, -3.4)} size={[16.0, 6.5, 0.35]} color="#1d3552" />
        <SolidBox name="irl-back-wall" position={on(PLACE.irl, 0, 3.25, -3.4)} size={[16.0, 6.5, 0.4]} />
        <Block position={on(PLACE.irl, -5.6, 3.25, 1.5)} size={[0.35, 6.5, 14.0]} color="#162940" />
        <SolidBox name="irl-left-wall" position={on(PLACE.irl, -5.6, 3.25, 1.5)} size={[0.4, 6.5, 14.0]} />
        {/* Moonlit bedroom window on back wall */}
        <Block position={on(PLACE.irl, 1.9, 2.35, -3.2)} size={[1.8, 1.4, 0.06]} color="#2d5284" emissive="#4d7ec2" emissiveIntensity={0.45} />
        <Block position={on(PLACE.irl, 1.9, 2.35, -3.14)} size={[1.86, 0.08, 0.06]} color="#4e341e" />
        <Block position={on(PLACE.irl, 1.9, 2.35, -3.12)} size={[0.08, 1.46, 0.06]} color="#4e341e" />
        {/* Cute Minecraft creeper wall poster above desk */}
        <Block position={on(PLACE.irl, -1.6, 2.4, -3.19)} size={[1.05, 1.25, 0.04]} color="#3a8530" />
        <Block position={on(PLACE.irl, -1.8, 2.58, -3.16)} size={[0.2, 0.2, 0.03]} color="#121c10" />
        <Block position={on(PLACE.irl, -1.4, 2.58, -3.16)} size={[0.2, 0.2, 0.03]} color="#121c10" />
        <Block position={on(PLACE.irl, -1.6, 2.26, -3.16)} size={[0.26, 0.26, 0.03]} color="#121c10" />
        {/* Grounded PC DeskSetup positioned cleanly on left side */}
        <DeskSetup position={on(PLACE.irl, -1.5, 0, -1.7)} screenText="MC SMP" screenColor="#4be08a" clockText="11:10 PM" lampOn />
        <Glow position={on(PLACE.irl, 0.2, 2.4, -1.2)} size={2.2} color="#9bc0ff" opacity={0.22} />
        <LightPool position={on(PLACE.irl, 0, 0.05, 0.4)} width={7.0} depth={6.0} color="#ffdba8" opacity={0.14} />
        <Dust position={on(PLACE.irl, 0, 1.8, 0)} area={[7.0, 3.2, 6.0]} count={32} size={0.03} color="#ffe8c4" opacity={0.42} seed={29} speed={0.14} />
        <pointLight position={on(PLACE.irl, 0.4, 3.2, 2.0)} color="#ffd9a0" intensity={9.0} distance={15} decay={1.6} />
      </Zone>

      {/* ---- ZONE 6: Milo's Cozy Wooden SMP Cabin Interior ---- */}
      <Zone name="cabin">
        <Block position={on(PLACE.cabin, 0, -0.15, 0.5)} size={[13.0, 0.3, 11.0]} map={plankTex("#966c41", [5, 5])} />
        <Vox kind="planks" position={on(PLACE.cabin, 0, 3.0, -3.2)} size={[13.0, 6.0, 0.35]} />
        <SolidBox name="cabin-back-wall" position={on(PLACE.cabin, 0, 3.0, -3.2)} size={[13.0, 6.0, 0.4]} />
        <Vox kind="darkPlanks" position={on(PLACE.cabin, -4.4, 3.0, 0.8)} size={[0.35, 6.0, 11.0]} />
        <SolidBox name="cabin-left-wall" position={on(PLACE.cabin, -4.4, 3.0, 0.8)} size={[0.4, 6.0, 11.0]} />
        <Vox kind="planks" position={on(PLACE.cabin, -2.5, 0.48, -2.1)} size={[0.95, 0.95, 0.95]} />
        <Vox kind="cobble" position={on(PLACE.cabin, 2.5, 0.48, -2.1)} size={[0.95, 0.95, 0.95]} />
        <Block position={on(PLACE.cabin, 2.5, 0.35, -1.6)} size={[0.5, 0.35, 0.04]} color="#ff8524" emissive="#ff6b14" emissiveIntensity={1.1} />
        <Glow position={on(PLACE.cabin, 0, 2.4, -1.2)} size={2.0} color="#ffd98c" opacity={0.24} />
        <LightPool position={on(PLACE.cabin, 0, 0.05, 0)} width={6.5} depth={6.0} color="#ffe2a8" opacity={0.18} />
        <Dust position={on(PLACE.cabin, 0, 1.8, 0)} area={[6.0, 3.2, 6.0]} count={30} size={0.032} color="#fff0c8" opacity={0.44} seed={47} speed={0.14} />
        <pointLight position={on(PLACE.cabin, 0, 3.0, 1.2)} color="#ffdca0" intensity={9.5} distance={14} decay={1.6} />
      </Zone>
    </group>
  );
};
