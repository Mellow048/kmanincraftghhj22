import type React from "react";
import { Block, Clouds, Dust, GodRay, Glow, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import { PLACE, Shaft, at } from "./kit";

/**
 * THE WORLD: five sets, far apart, one for each beat of the story.
 *
 *   room        his bedroom at midnight: a desk, a monitor, a bed. The only light is the screen.
 *   shaft       forty metres east, a one-block hole straight down, a torch every ten blocks.
 *   field       the field at night, where the enderman waits.
 *   stronghold  the portal room, twelve eyes short of finished.
 *   end         the obsidian platform, and the dragon.
 *
 * The sets are mounted for the whole film (the world does not cut, the camera does), each in a
 * <Zone> so a shot only draws the set it names in `zone` — five sets' worth of lights, not lit at once.
 */
const Sets: React.FC = () => (
  <>
    {/* ---- room: the bedroom where he starts ---- */}
    <Zone name="room">
      <Vox kind="planks" position={at(PLACE.room, 0, -0.1, 0)} size={[9, 0.2, 10]} />
      <Vox kind="planks" position={at(PLACE.room, 0, 1.4, -4.9)} size={[9, 3.2, 0.2]} />
      <Vox kind="planks" position={at(PLACE.room, -4.3, 1.4, 0)} size={[0.2, 3.2, 10]} />
      <Vox kind="wool" position={at(PLACE.room, 0, 1.4, 4.9)} size={[9, 3.2, 0.2]} tint="#cfc6b4" />
      {/* the window: night outside, so the room stays cold */}
      <Block position={at(PLACE.room, 4.2, 1.9, -1.2)} size={[0.08, 1.1, 1.6]} color="#0b1430" emissive="#1b2a5c" emissiveIntensity={0.5} castShadow={false} />
      {/* the bed he never gets into */}
      <Vox kind="wool" position={at(PLACE.room, -2.7, 0.3, 1.9)} size={[2.2, 0.4, 1.4]} tint="#4a6ea8" />
      <Vox kind="wool" position={at(PLACE.room, -3.6, 0.62, 1.9)} size={[0.5, 0.35, 1.3]} tint="#e6e2d8" />
      {/* the poster a twelve-year-old put up: the dragon he has never beaten */}
      <Block position={at(PLACE.room, -4.15, 1.85, -1.4)} size={[0.06, 1.2, 1.0]} color="#241a33" castShadow={false} />
      <Block position={at(PLACE.room, -4.1, 2.05, -1.4)} size={[0.02, 0.3, 0.5]} color="#8a4fe0" emissive="#6a2ec0" emissiveIntensity={0.7} castShadow={false} />
    </Zone>

    {/* ---- shaft: four hundred blocks straight down ---- */}
    <Zone name="shaft">
      {/* the ground, in four slabs: the hole in the middle is the whole point of the set */}
      <Vox kind="grass" position={at(PLACE.shaft, -4.15, -0.1, 0)} size={[5.7, 0.2, 14]} />
      <Vox kind="grass" position={at(PLACE.shaft, 4.15, -0.1, 0)} size={[5.7, 0.2, 14]} />
      <Vox kind="grass" position={at(PLACE.shaft, 0, -0.1, -4.15)} size={[2.6, 0.2, 5.7]} />
      <Vox kind="grass" position={at(PLACE.shaft, 0, -0.1, 4.15)} size={[2.6, 0.2, 5.7]} />
      <Vox kind="dirt" position={at(PLACE.shaft, -4.15, -0.5, 0)} size={[5.7, 0.6, 14]} />
      <Vox kind="dirt" position={at(PLACE.shaft, 4.15, -0.5, 0)} size={[5.7, 0.6, 14]} />
      <Vox kind="dirt" position={at(PLACE.shaft, 0, -0.5, -4.15)} size={[2.6, 0.6, 5.7]} />
      <Vox kind="dirt" position={at(PLACE.shaft, 0, -0.5, 4.15)} size={[2.6, 0.6, 5.7]} />
      <Shaft position={PLACE.shaft} depth={6} />
      <Tree position={at(PLACE.shaft, -4.2, 0, -3.4)} height={4.2} />
      <Tree position={at(PLACE.shaft, 4.6, 0, -2.2)} height={3.4} leaf="#3a6f28" />
      {/* the spoil heap: every block he took out, piled beside the hole */}
      <Vox kind="dirt" position={at(PLACE.shaft, 1.9, 0.35, 1.4)} size={[1.6, 0.7, 1.6]} />
      <Vox kind="dirt" position={at(PLACE.shaft, 2.6, 0.2, 2.4)} size={[1.1, 0.4, 1.1]} />
      <Vox kind="cobble" position={at(PLACE.shaft, 1.6, 0.25, -1.8)} size={[1.2, 0.5, 1.2]} />
      <Torch position={at(PLACE.shaft, -1.1, 0.2, 1.1)} light={5} seed={9} />
    </Zone>

    {/* ---- field: where the enderman is ---- */}
    <Zone name="field">
      <Vox kind="grass" position={at(PLACE.field, 0, -0.1, 0)} size={[16, 0.2, 16]} />
      <Tree position={at(PLACE.field, 3.4, 0, -3.2)} height={5.2} />
      <Tree position={at(PLACE.field, -3.8, 0, -2.4)} height={4.0} leaf="#37682a" />
      <Tree position={at(PLACE.field, 1.2, 0, 4.6)} height={3.6} leaf="#3f7f2d" />
      <Torch position={at(PLACE.field, -1.6, 0.2, -1.2)} light={6} seed={4} />
      <Torch position={at(PLACE.field, 2.2, 0.2, 0.8)} light={5} seed={7} />
    </Zone>

    {/* ---- stronghold: the portal room ---- */}
    <Zone name="stronghold">
      <Vox kind="stoneBrick" position={at(PLACE.stronghold, 0, -0.1, 0)} size={[11, 0.2, 11]} />
      <Vox kind="stoneBrick" position={at(PLACE.stronghold, 0, 1.8, -5.4)} size={[11, 4, 0.4]} />
      <Vox kind="stoneBrick" position={at(PLACE.stronghold, -5.4, 1.8, 0)} size={[0.4, 4, 11]} />
      <Vox kind="stoneBrick" position={at(PLACE.stronghold, 0, 3.7, 0)} size={[11, 0.3, 11]} />
      <Torch position={at(PLACE.stronghold, -4.9, 1.6, -3.4)} light={5} seed={2} />
      <Torch position={at(PLACE.stronghold, -4.9, 1.6, 3.4)} light={5} seed={5} />
      {/* the lava under the portal, the way the game builds it */}
      <Block position={at(PLACE.stronghold, 0, -0.02, -2.6)} size={[3.2, 0.05, 1.0]} color="#ff7a14" emissive="#ff5a00" emissiveIntensity={1.2} castShadow={false} />
      <Glow position={at(PLACE.stronghold, 0, 0.2, -2.6)} size={2.6} color="#ff8a2a" opacity={0.35} />
    </Zone>

    {/* ---- end: obsidian, endstone, and nothing else ---- */}
    <Zone name="end">
      <Vox kind="obsidian" position={at(PLACE.end, 0, -0.3, 0)} size={[16, 0.6, 16]} />
      <Vox kind="sand" position={at(PLACE.end, 0, 0.05, 0)} size={[13, 0.1, 13]} tint="#d8d6a0" />
      {[-4.2, -2.1, 0, 2.1, 4.2].map((x, i) => (
        <Vox key={i} kind="obsidian" position={at(PLACE.end, x, 2.4, -5.6)} size={[1.4, 4.8, 1.4]} />
      ))}
      <Glow position={at(PLACE.end, 0, 3.2, -6.2)} size={9} color="#6a3fc0" opacity={0.18} />
    </Zone>
  </>
);

export const World: React.FC = () => (
  <>
    <Clouds y={-14} center={[0, 0, -6]} span={200} opacity={0.85} />
    <Clouds y={40} center={[0, 0, -30]} span={240} />
    <Sets />

    {/* Atmosphere: dust where a light is, and a pool under every lamp. */}
    <Dust position={at(PLACE.room, 0, 1.4, 0)} area={[7, 3, 6]} count={34} size={0.04} color="#cfe6ff" opacity={0.35} seed={3} speed={0.18} />
    <Dust position={at(PLACE.shaft, 0, 1.2, 0)} area={[6, 4, 6]} count={30} size={0.05} color="#ffe2b0" opacity={0.4} seed={6} speed={0.24} />
    <Dust position={at(PLACE.field, 0, 1.6, 0)} area={[9, 4, 9]} count={40} size={0.05} color="#dfe8ff" opacity={0.32} seed={11} speed={0.2} />
    {/* A ray down the shaft: the only place in the film where light has a shape. */}
    <GodRay position={at(PLACE.shaft, 0, 3.2, 0)} rotation={[0, 0, 0]} width={2.4} height={9} color="#ffd9a0" opacity={0.09} />
    <LightPool position={at(PLACE.shaft, 0, 0.03, 0)} width={7} depth={7} color="#ffc078" opacity={0.14} />
    <LightPool position={at(PLACE.stronghold, 0, 0.03, 0)} width={8} depth={8} color="#8a6fe0" opacity={0.12} />
  </>
);
