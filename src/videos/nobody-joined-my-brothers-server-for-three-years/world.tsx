import type React from "react";
import { Block, Clouds, Dust, GodRay, Glow, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import { PLACE, at } from "./kit";

/**
 * THE WORLD: three sets, far apart, one for each place the story sits.
 *
 *   room   his bedroom. The player list is on the desk, and it has said one player for three years.
 *   hill   the castle on the hill, half finished, and the wall he fills in one block a night.
 *   spawn  the spawn point, where he leaves things his brother may never read.
 *
 * The sets are mounted for the whole film (the world does not cut, the camera does). The hill is
 * the film: everything else is a room with a screen in it.
 */
const Sets: React.FC = () => (
  <>
    {/* ---- room: where he logs on every night ---- */}
    <Zone name="room">
      <Vox kind="planks" position={at(PLACE.room, 0, -0.1, 0)} size={[9, 0.2, 8]} />
      <Vox kind="planks" position={at(PLACE.room, 0, 1.4, -3.6)} size={[9, 3.2, 0.2]} />
      <Vox kind="planks" position={at(PLACE.room, -4.3, 1.4, 0)} size={[0.2, 3.2, 8]} />
      <Vox kind="wool" position={at(PLACE.room, 0, 1.4, 3.9)} size={[9, 3.2, 0.2]} tint="#cfc6b4" />
      {/* the window: night outside, so the room stays cold and the screen stays the only light */}
      <Block position={at(PLACE.room, 4.2, 1.9, -1.2)} size={[0.08, 1.1, 1.6]} color="#0b1430" emissive="#1b2a5c" emissiveIntensity={0.5} castShadow={false} />
      {/* the bed he does not sleep in */}
      <Vox kind="wool" position={at(PLACE.room, -2.7, 0.3, 1.9)} size={[2.2, 0.4, 1.4]} tint="#3f6a9e" />
      <Vox kind="wool" position={at(PLACE.room, -3.6, 0.62, 1.9)} size={[0.5, 0.35, 1.3]} tint="#e6e2d8" />
      {/* three years of a life, pinned to the wall: a map of the hill, drawn by hand */}
      <Block position={at(PLACE.room, -4.15, 1.9, -1.2)} size={[0.06, 1.1, 0.9]} color="#e8e2cf" castShadow={false} />
      <Block position={at(PLACE.room, -4.1, 2.05, -1.2)} size={[0.02, 0.36, 0.42]} color="#6a8f52" castShadow={false} />
      <Block position={at(PLACE.room, -4.1, 1.7, -1.35)} size={[0.02, 0.2, 0.2]} color="#8a7a5a" castShadow={false} />
    </Zone>

    {/* ---- hill: the castle, half finished ---- */}
    <Zone name="hill">
      <Vox kind="grass" position={at(PLACE.hill, 0, -1.6, 0)} size={[46, 0.4, 46]} />
      <Vox kind="dirt" position={at(PLACE.hill, 0, -2.1, 0)} size={[40, 0.8, 40]} />
      <Tree position={at(PLACE.hill, -11.5, 0, 6.4)} height={4.6} />
      <Tree position={at(PLACE.hill, 12.2, 0, -5.2)} height={5.4} leaf="#37682a" />
      <Tree position={at(PLACE.hill, -8.6, 0, -9.4)} height={3.8} leaf="#3f7f2d" />
      <Tree position={at(PLACE.hill, 9.4, 0, 9.8)} height={4.2} leaf="#3a6f28" />
      {/* the path he has walked a thousand times, worn into the grass */}
      <Vox kind="path" position={at(PLACE.hill, 0, 0.15, 12)} size={[2.4, 0.1, 12]} />
      <Vox kind="path" position={at(PLACE.hill, -6, 0.15, 12)} size={[12, 0.1, 2.4]} />
      {/* torches up the path: the lights he keeps on */}
      <Torch position={at(PLACE.hill, -1.6, 0.3, 8.2)} light={6} seed={21} />
      <Torch position={at(PLACE.hill, -1.6, 0.3, 2.4)} light={6} seed={22} />
      <Torch position={at(PLACE.hill, 1.8, 0.3, -3.2)} light={5} seed={23} />
    </Zone>

    {/* ---- spawn: where he leaves things ---- */}
    <Zone name="spawn">
      <Vox kind="grass" position={at(PLACE.spawn, 0, -0.1, 0)} size={[18, 0.2, 18]} />
      <Vox kind="path" position={at(PLACE.spawn, 0, 0.05, 0)} size={[6, 0.08, 6]} />
      {/* the spawn plateau, and the torch that has been lit since the day he made the world */}
      <Vox kind="cobble" position={at(PLACE.spawn, 0, 0.2, -2.4)} size={[3.2, 0.5, 0.6]} />
      <Torch position={at(PLACE.spawn, 0, 0.7, -2.4)} light={7} seed={31} />
      <Tree position={at(PLACE.spawn, 6.4, 0, -5.2)} height={4.4} />
      <Tree position={at(PLACE.spawn, -7.2, 0, 4.6)} height={3.6} leaf="#37682a" />
      {/* a small house he built at spawn, ages ago, both of them */}
      <Vox kind="planks" position={at(PLACE.spawn, -5.6, 1.4, -5.2)} size={[4.2, 2.8, 4.2]} tint="#8a5f36" />
      <Vox kind="planks" position={at(PLACE.spawn, -5.6, 3.1, -5.2)} size={[4.6, 0.3, 4.6]} tint="#6a4728" />
      <Block position={at(PLACE.spawn, -5.6, 1.8, -3.05)} size={[1.4, 0.06, 0.06]} color="#ffd27a" emissive="#ffb347" emissiveIntensity={0.7} castShadow={false} />
    </Zone>
  </>
);

export const World: React.FC = () => (
  <>
    <Clouds y={-14} center={[0, 0, -6]} span={200} opacity={0.85} />
    <Clouds y={40} center={[0, 0, -30]} span={240} />
    <Sets />

    {/* Atmosphere: dust where a light is, and a pool under every lamp. */}
    <Dust position={at(PLACE.room, 0, 1.4, 0)} area={[7, 3, 6]} count={30} size={0.04} color="#cfe6ff" opacity={0.3} seed={3} speed={0.18} />
    <Dust position={at(PLACE.hill, 0, 3.2, 0)} area={[16, 6, 16]} count={54} size={0.05} color="#ffe2b0" opacity={0.26} seed={8} speed={0.16} />
    <Dust position={at(PLACE.spawn, 0, 1.6, 0)} area={[10, 3, 10]} count={30} size={0.05} color="#dfe8ff" opacity={0.24} seed={15} speed={0.2} />
    {/* A shaft of moonlight on the hill: the castle is the only thing standing in it. */}
    <GodRay position={at(PLACE.hill, 0, 9, -2)} rotation={[0, 0, 0.12]} width={7} height={18} color="#cfe0ff" opacity={0.07} />
    <LightPool position={at(PLACE.hill, 0, 0.4, 4)} width={16} depth={16} color="#ffc078" opacity={0.1} />
    <LightPool position={at(PLACE.spawn, 0, 0.3, -2.4)} width={6} depth={6} color="#ffc078" opacity={0.14} />
    <Glow position={at(PLACE.hill, 0, 8, 0)} size={6} color="#cfe0ff" opacity={0.08} />
  </>
);
