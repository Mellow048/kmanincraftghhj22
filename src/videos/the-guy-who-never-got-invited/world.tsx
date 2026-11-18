import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
import { Hut, LampPost } from "../../../Topics/InThisTown";
import { Booth, Bottles, Cake, Chair, ClubSign, Crate, FairyLights, Poster, Rig, Speaker, Turntable, WarmLamp } from "./kit";
import type { Vec3 } from "../../engine";

/**
 * THE PLACES, in four zones. A shot names its zone and the other three are not drawn, so the
 * street, the bedroom, the yard and the club can all live at the origin.
 *
 *   street  One house on the north side of a road. The door and the lit window are the whole film's
 *           idea: everyone is inside, he is on the pavement. The camera lives on the road, south.
 *   bedroom 4.4 m by 5.2 m. The window is the only clock in it: night, then dawn, in the montage.
 *   yard    The cousin's birthday: a table, a cake, plastic chairs and fairy lights. Evening.
 *   club    THE DOOR: a booth, a bar, a dance floor, and the street outside it to the south.
 *
 * 1 unit = 1 metre, ground y = 0. A tall frame is a slit: everything is staged in depth.
 */

const bob = (frame: number, fps: number, phase: number, amount = 0.06) =>
  Math.max(0, Math.sin((frame / fps) * 6.2 + phase)) * amount;

// --------------------------------------------------------------------------- the street

const STREET = {
  door: [0, 0, -4.0] as Vec3,
  him: [-0.35, 0, 1.5] as Vec3,
  friends: [
    [-0.62, 0, -3.05] as Vec3,
    [0.2, 0, -3.42] as Vec3,
    [0.86, 0, -2.96] as Vec3,
  ],
  window: [2.6, 1.72, -4.0] as Vec3,
  lamp: [-3.35, 0, -0.5] as Vec3,
};

const Street: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <group>
      <Vox kind="grass" position={[0, -0.5, 0]} size={[70, 1, 46]} />
      <Vox kind="path" position={[0, 0.01, 1.2]} size={[5.2, 0.06, 17]} />
      <Vox kind="path" position={[0, 0.02, -2.2]} size={[2.4, 0.06, 4]} />

      {/* The house. Panels round a door and a window, so the warm light comes out of two holes. */}
      <Vox kind="planks" position={[-2.975, 1.6, -4.0]} size={[4.05, 3.2, 0.3]} tint="#b08d5e" />
      <Vox kind="planks" position={[1.375, 1.6, -4.0]} size={[0.85, 3.2, 0.3]} tint="#b08d5e" />
      <Vox kind="planks" position={[4.2, 1.6, -4.0]} size={[1.6, 3.2, 0.3]} tint="#b08d5e" />
      <Vox kind="planks" position={[2.6, 0.575, -4.0]} size={[1.6, 1.15, 0.3]} tint="#b08d5e" />
      <Vox kind="planks" position={[2.6, 2.75, -4.0]} size={[1.6, 0.9, 0.3]} tint="#b08d5e" />
      <Vox kind="darkPlanks" position={[0, 3.36, -4.0]} size={[10.6, 0.32, 0.9]} tint="#4a3320" />
      <Vox kind="cobble" position={[0, 0.06, -3.55]} size={[2.4, 0.12, 0.75]} />

      {/* Inside the door and behind the window: the party. Warm, and never quite in focus. */}
      <Block position={[0, 1.15, -4.42]} size={[1.86, 2.3, 0.06]} color="#f0b070" emissive="#ff9a4a" emissiveIntensity={0.34} />
      <Block position={[2.6, 1.72, -4.4]} size={[1.58, 1.13, 0.06]} color="#ffb877" emissive="#ffa85c" emissiveIntensity={0.4} />

      {/* Two shapes dancing behind the window. Nobody you can name yet. */}
      {[
        [2.2, 0],
        [2.95, 1.9],
      ].map(([x, phase], i) => (
        <group key={i} position={[x, 0.55 + bob(frame, fps, phase, 0.05), -4.55]}>
          <Block size={[0.34, 0.62, 0.22]} color="#2a1408" />
          <Block position={[0, 0.45, 0]} size={[0.26, 0.26, 0.24]} color="#2a1408" />
          <Block position={[0.22, 0.12 + bob(frame, fps, phase + 1, 0.16), 0]} size={[0.1, 0.3, 0.1]} color="#2a1408" />
        </group>
      ))}

      <LampPost position={STREET.lamp} seed={7} />
      <Hut at={[-8.5, 0, -1.5]} w={6} tint="#c2a477" roof="#3f4d6b" turn={0.25} lit windows={[-1.6]} />
      <Hut at={[9.5, 0, -2.2]} w={6.5} tint="#b59a70" roof="#5a3a2a" turn={-0.2} lit windows={[1.7, -1.2]} />
      <Tree position={[-7.2, 0, 2.6]} height={4.6} leaf="#2f5a28" />
      <Tree position={[8.4, 0, 3.2]} height={4.2} leaf="#356330" />

      {/* The step, the spill of the door, the air. */}
      <pointLight position={[0, 1.9, -4.3]} color="#ffb066" intensity={3.0} distance={9} decay={2} />
      <pointLight position={[2.6, 1.7, -4.3]} color="#ffa858" intensity={1.8} distance={6} decay={2} />
      <Glow position={[0, 1.2, -3.85]} size={2.2} color="#ffb469" opacity={0.2} />
      <LightPool position={[0, 0.08, -3.1]} width={3.6} depth={2.4} color="#ffb469" opacity={0.26} />
      <LightPool position={[2.6, 0.08, -3.2]} width={2.6} depth={2.0} color="#ffab5e" opacity={0.18} />
      <GodRay position={[0, 1.4, -3.8]} rotation={[0.2, 0, 0]} width={1.9} height={2.6} color="#ffb877" opacity={0.05} />
      <Dust position={[0, 1.6, -1.5]} area={[10, 3, 8]} count={50} size={0.04} color="#ffe0b0" opacity={0.5} seed={4} speed={0.15} />
      <Clouds y={44} center={[0, 0, 0]} opacity={0.5} />
    </group>
  );
};

// --------------------------------------------------------------------------- the bedroom

const ROOMBOX = { x: 2.2, z: 2.6, h: 2.55 };

const Bedroom: React.FC = () => (
  <group>
    <Vox kind="planks" position={[0, -0.1, 0]} size={[ROOMBOX.x * 2, 0.2, ROOMBOX.z * 2]} tint="#8a6134" />
    <Vox kind="planks" tint="#9c7448" position={[0, ROOMBOX.h, 0]} size={[ROOMBOX.x * 2 + 0.2, 0.2, ROOMBOX.z * 2]} castShadow={false} />
    <Vox kind="planks" tint="#8f6a40" position={[0, ROOMBOX.h / 2, -ROOMBOX.z]} size={[ROOMBOX.x * 2, ROOMBOX.h, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#876238" position={[-ROOMBOX.x, ROOMBOX.h / 2, 0]} size={[0.2, ROOMBOX.h, ROOMBOX.z * 2]} castShadow={false} />
    <Vox kind="planks" tint="#876238" position={[ROOMBOX.x, ROOMBOX.h / 2, 0]} size={[0.2, ROOMBOX.h, ROOMBOX.z * 2]} castShadow={false} />

    {/* The window: a hole in the north wall. Night outside, then dawn, in the montage. */}
    <Block position={[1.3, 1.66, -ROOMBOX.z - 0.09]} size={[1.25, 1.15, 0.04]} color="#2a3f7a" emissive="#31508f" emissiveIntensity={0.55} />
    <Block position={[1.3, 1.66, -ROOMBOX.z - 0.05]} size={[0.05, 1.15, 0.04]} color="#5c3f24" />
    <Block position={[1.3, 1.66, -ROOMBOX.z - 0.05]} size={[1.25, 0.05, 0.04]} color="#5c3f24" />
    <Block position={[1.3, 1.05, -ROOMBOX.z - 0.05]} size={[1.4, 0.08, 0.16]} color="#6b4a2a" />

    {/* The desk, the decks, the crate of records. */}
    <Block position={[-1.86, 0.86, 0.2]} size={[0.72, 0.08, 1.5]} color="#a37a45" />
    <Block position={[-2.1, 0.42, -0.4]} size={[0.08, 0.86, 0.08]} color="#7d5a31" />
    <Block position={[-2.1, 0.42, 0.8]} size={[0.08, 0.86, 0.08]} color="#7d5a31" />
    <Turntable position={[-1.86, 0.9, 0.05]} spin={2.2} arm={0.8} />
    <Crate position={[-1.62, 0, 1.35]} size={0.5} />

    {/* Two speakers on two crates, and him between them. */}
    <Crate position={[-1.05, 0, 1.05]} />
    <Speaker position={[-1.02, 0.6, 1.05]} rotationY={-0.2} tall={0.86} />
    <Crate position={[1.08, 0, 1.02]} />
    <Speaker position={[1.05, 0.6, 1.02]} rotationY={0.2} tall={0.86} />

    {/* A bed he does not use, and the wall he does: posters of rooms he has never been in. */}
    <group position={[1.55, 0, -1.7]}>
      <Vox kind="planks" position={[0, 0.24, 0]} size={[1.2, 0.22, 1.9]} tint="#8a5a3a" />
      <Block position={[0, 0.4, 0]} size={[1.05, 0.12, 1.75]} color="#c8c2b4" />
      <Block position={[0, 0.47, -0.62]} size={[0.8, 0.12, 0.42]} color="#e8e2d6" />
    </group>
    <Poster position={[-1.2, 1.82, -ROOMBOX.z + 0.06]} colour="#d94bff" shape="pulse" />
    <Poster position={[-0.35, 1.9, -ROOMBOX.z + 0.06]} colour="#3ac1c9" shape="bars" />
    <Poster position={[2.0, 2.0, -ROOMBOX.z + 0.06]} colour="#ffab5e" shape="sun" />

    <WarmLamp position={[0, 2.28, -0.3]} size={0.22} />
    <Dust position={[0, 1.4, 0.2]} area={[4, 2.4, 4.4]} count={38} size={0.03} color="#ffe0b0" opacity={0.45} seed={9} speed={0.1} />
  </group>
);

// --------------------------------------------------------------------------- the yard

const Yard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <group>
      <Vox kind="grass" position={[0, -0.5, 0]} size={[30, 1, 24]} />
      <Vox kind="path" position={[0, 0.01, -1.2]} size={[9, 0.06, 5]} />

      {/* The house the party belongs to: lit door, lit window, all of it behind his setup. */}
      <Vox kind="planks" tint="#c0a074" position={[-3.6, 1.6, -4.4]} size={[7.0, 3.2, 0.28]} />
      <Vox kind="planks" tint="#c0a074" position={[3.6, 1.6, -4.4]} size={[2.4, 3.2, 0.28]} />
      <Vox kind="planks" tint="#c0a074" position={[0, 2.95, -4.4]} size={[3.2, 0.5, 0.28]} />
      <Block position={[0, 1.2, -4.6]} size={[2.0, 2.4, 0.06]} color="#ffc07a" emissive="#ffab5e" emissiveIntensity={0.35} />

      {/* The table with the cake, the chairs, the kids' corner. */}
      <Block position={[1.0, 0.72, -1.6]} size={[1.9, 0.08, 1.1]} color="#e6dcc8" />
      {[
        [0.2, -2.1],
        [1.8, -2.1],
        [0.2, -1.1],
        [1.8, -1.1],
      ].map(([x, z], i) => (
        <Block key={i} position={[x, 0.36, z]} size={[0.07, 0.72, 0.07]} color="#c9bda6" />
      ))}
      <Cake position={[1.05, 0.8, -1.75]} candles={5} />
      <Chair position={[-0.15, 0, -0.7]} rotationY={0.4} />
      <Chair position={[2.2, 0, -0.5]} rotationY={-0.5} />
      <Chair position={[2.35, 0, -2.6]} rotationY={2.6} />

      {/* His corner: a borrowed table, one borrowed speaker, a chair for it to sit on. */}
      <Block position={[-2.2, 0.74, 0.6]} size={[1.1, 0.08, 0.8]} color="#d8cdb8" />
      <Block position={[-2.2, 0.37, 0.6]} size={[0.9, 0.74, 0.06]} color="#c2b7a0" />
      <Chair position={[-1.35, 0, 0.75]} rotationY={1.2} colour="#cfc7b4" />
      <Speaker position={[-1.3, 0.47, 0.75]} rotationY={0.9} tall={0.7} wide={0.5} />

      <FairyLights from={[-3.2, 2.5, -3.4]} to={[3.4, 2.4, -1.2]} bulbs={13} sag={0.42} />
      <FairyLights from={[-3.4, 2.4, 0.6]} to={[3.2, 2.6, 1.8]} bulbs={11} sag={0.5} colour="#ffd0a0" />

      <pointLight position={[-0.4, 2.3, -2.2]} color="#ffcf9a" intensity={3.2} distance={11} decay={2} />
      <pointLight position={[0.4, 1.6, -4.3]} color="#ffb066" intensity={2.4} distance={8} decay={2} />
      <LightPool position={[-2.2, 0.06, 0.5]} width={3.4} depth={2.6} color="#ffca92" opacity={0.16} />
      <Dust position={[0, 1.6, -0.6]} area={[7, 3, 6]} count={44} size={0.035} color="#ffe7c0" opacity={0.5} seed={12} speed={0.12} />
      <Tree position={[4.6, 0, -2.2]} height={4.4} leaf="#3f6b2c" />
      <Tree position={[-4.9, 0, -1.2]} height={4.0} leaf="#456f30" />
      <Glow position={[0.9, 0.95, -1.75]} size={1.0} color="#ffd08a" opacity={0.13} />
      {bob(frame, fps, 0, 0) ? null : null}
    </group>
  );
};


// --------------------------------------------------------------------------- the kitchen

const Kitchen: React.FC = () => (
  <group>
    <Vox kind="stoneBrick" position={[0, -0.1, 0]} size={[4.6, 0.2, 4.8]} tint="#8f8778" />
    <Vox kind="planks" tint="#c0a070" position={[0, 2.45, 0]} size={[4.8, 0.2, 5.0]} castShadow={false} />
    <Vox kind="planks" tint="#b89a68" position={[0, 1.2, -2.3]} size={[4.8, 2.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#b09262" position={[-2.3, 1.2, 0]} size={[0.2, 2.4, 4.8]} castShadow={false} />
    <Vox kind="planks" tint="#b09262" position={[2.3, 1.2, 0]} size={[0.2, 2.4, 4.8]} castShadow={false} />

    {/* Counter, sink, a kettle that has been on all evening. */}
    <Block position={[0, 0.46, -1.95]} size={[3.4, 0.92, 0.6]} color="#a98454" />
    <Block position={[0, 0.94, -1.95]} size={[3.5, 0.06, 0.7]} color="#cfc7b4" />
    <Block position={[-0.9, 0.99, -1.95]} size={[0.6, 0.1, 0.44]} color="#6e7a80" />
    <Block position={[0.9, 1.02, -1.95]} size={[0.3, 0.16, 0.3]} color="#8a939a" />
    <Block position={[0.9, 1.14, -1.95]} size={[0.08, 0.1, 0.08]} color="#5c666c" />

    {/* The table, the chairs pushed back, the cake on the floor. */}
    <Block position={[0, 0.78, 0.25]} size={[1.7, 0.08, 1.0]} color="#d8cdb8" />
    {[
      [-0.7, -0.2],
      [0.7, -0.2],
      [-0.7, 0.7],
      [0.7, 0.7],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.38, z]} size={[0.08, 0.76, 0.08]} color="#b9ae98" />
    ))}
    <Chair position={[-0.95, 0, 1.25]} rotationY={0.9} colour="#cfc7b4" />
    <Chair position={[1.0, 0, 1.3]} rotationY={-0.9} colour="#cfc7b4" />

    <WarmLamp position={[0, 2.16, 0.2]} size={0.2} />
    <pointLight position={[0.2, 1.9, 1.4]} color="#ffcf9a" intensity={2.6} distance={8} decay={2} />
    <GodRay position={[0.3, 2.1, 0.4]} rotation={[0.2, 0, 0.1]} width={1.6} height={2.4} color="#ffcf9a" opacity={0.08} />
    <LightPool position={[0, 0.06, 0.6]} width={3.2} depth={2.6} color="#ffcf9a" opacity={0.12} />
    <Dust position={[0, 1.2, 0.6]} area={[3.6, 2, 3]} count={26} size={0.03} color="#ffe7c0" opacity={0.4} seed={31} speed={0.08} />
  </group>
);

// --------------------------------------------------------------------------- the club

const CLUB = {
  booth: [-1.0, 0, -2.35] as Vec3,
  decks: [-1.0, 1.09, -2.3] as Vec3,
  him: [-1.0, 0, -2.95] as Vec3,
  owner: [-0.45, 0, -2.5] as Vec3,
  bar: [2.85, 0, 0.4] as Vec3,
  door: [0, 0, 3.4] as Vec3,
  outside: [0, 0, 9.0] as Vec3,
};

const DanceFloor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const people: Array<[number, number, number, string]> = [
    [0.4, 0.6, 0, "#2a2f3a"],
    [1.5, 1.2, 1.1, "#3a2a34"],
    [-1.9, 1.5, 2.2, "#2f3a2a"],
    [0.9, 2.2, 3.1, "#33303a"],
    [-0.9, 0.2, 4.2, "#2b2830"],
    [2.0, -0.3, 5.0, "#38303c"],
  ];
  return (
    <group>
      {people.map(([x, z, phase, colour], i) => (
        <group key={i} position={[x, bob(frame, fps, phase, 0.09), z]} rotation-y={Math.sin(frame / fps + phase) * 0.5}>
          <Block position={[0, 0.62, 0]} size={[0.36, 0.66, 0.22]} color={colour} />
          <Block position={[0, 1.08, 0]} size={[0.26, 0.26, 0.24]} color={colour} />
          <Block position={[-0.22, 0.78 + bob(frame, fps, phase + 2, 0.22), 0]} size={[0.1, 0.34, 0.1]} color={colour} />
          <Block position={[0.22, 0.78 + bob(frame, fps, phase + 3, 0.2), 0]} size={[0.1, 0.34, 0.1]} color={colour} />
        </group>
      ))}
    </group>
  );
};

const Club: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <group>
      {/* Inside: a black box with one idea in it. */}
      <Vox kind="darkPlanks" position={[0, -0.1, 0]} size={[7, 0.2, 7]} tint="#241a14" />
      <Vox kind="darkPlanks" position={[0, 3.4, 0]} size={[7, 0.2, 7]} tint="#120c08" castShadow={false} />
      <Vox kind="darkPlanks" position={[0, 1.7, -3.4]} size={[7, 3.4, 0.2]} tint="#1c1310" castShadow={false} />
      <Vox kind="darkPlanks" position={[-3.4, 1.7, 0]} size={[0.2, 3.4, 7]} tint="#1a120e" castShadow={false} />
      <Vox kind="darkPlanks" position={[3.4, 1.7, 0]} size={[0.2, 3.4, 7]} tint="#1a120e" castShadow={false} />
      {/* The south wall, with the door the whole town queues at. */}
      <Vox kind="darkPlanks" position={[-2.3, 1.7, 3.4]} size={[2.2, 3.4, 0.2]} tint="#1a120e" castShadow={false} />
      <Vox kind="darkPlanks" position={[2.3, 1.7, 3.4]} size={[2.2, 3.4, 0.2]} tint="#1a120e" castShadow={false} />
      <Vox kind="darkPlanks" position={[0, 3.0, 3.4]} size={[2.4, 0.8, 0.2]} tint="#1a120e" castShadow={false} />
      <Block position={[0, 1.3, 3.5]} size={[2.4, 2.6, 0.04]} color="#8a4ad8" emissive="#7a3ad0" emissiveIntensity={0.5} opacity={0.25} transparent />

      <Booth position={CLUB.booth} spin={4.2} />
      <Bottles position={[2.85, 1.05, 0.4]} rotationY={-1.57} count={10} />
      <Block position={[2.85, 0.55, 0.4]} size={[0.9, 1.1, 4.2]} color="#33241c" />
      <Block position={[2.85, 1.12, 0.4]} size={[1.0, 0.06, 4.4]} color="#5a4030" />
      <Block position={[3.25, 1.9, 0.4]} size={[0.12, 0.1, 3.6]} color="#6adf7a" emissive="#4be05f" emissiveIntensity={0.7} />

      <ClubSign position={[0, 3.0, -3.2]} />
      <Rig position={[-1.6, 3.1, -0.6]} colour="#d94bff" swing={Math.sin(frame / fps) * 0.4} />
      <Rig position={[1.7, 3.1, 0.8]} colour="#3ac1c9" swing={Math.cos(frame / fps) * 0.4} />
      <Rig position={[0, 3.1, 1.9]} colour="#ff7a5a" swing={Math.sin(frame / fps + 2) * 0.3} />

      {/* The air of a room with a hundred people in it, and no windows. */}
      <Dust position={[0, 1.6, 0]} area={[6, 3, 6]} count={70} size={0.04} color="#c88aff" opacity={0.4} seed={21} speed={0.18} />
      <GodRay position={[-1.6, 2.6, -0.6]} rotation={[0.15, 0, 0.2]} width={2.2} height={4.2} color="#b06aff" opacity={0.1} />
      <GodRay position={[1.7, 2.6, 0.8]} rotation={[0.15, 0, -0.2]} width={2.2} height={4.2} color="#5ad0d8" opacity={0.1} />
      <pointLight position={[-1.0, 2.6, -1.3]} color="#b06aff" intensity={4.0} distance={9} decay={2} />
      <pointLight position={[1.6, 2.4, 0.9]} color="#5ad0d8" intensity={3.0} distance={8} decay={2} />
      <pointLight position={[0, 1.9, 3.0]} color="#ff8a6a" intensity={2.2} distance={6} decay={2} />

      <DanceFloor />

      {/* Outside: the street, the queue, the sign. To the south. */}
      <Vox kind="path" position={[0, -0.01, 11]} size={[7, 0.06, 9]} />
      <Vox kind="cobble" position={[0, 0.02, 5.4]} size={[8.4, 0.08, 2.2]} />
      <Vox kind="darkPlanks" position={[-3.1, 2.0, 9.0]} size={[3.2, 4.0, 0.3]} tint="#2a2028" />
      <Vox kind="darkPlanks" position={[3.1, 2.0, 9.0]} size={[3.2, 4.0, 0.3]} tint="#2a2028" />
      <Vox kind="darkPlanks" position={[0, 3.7, 9.0]} size={[3.0, 0.6, 0.3]} tint="#2a2028" />
      <Block position={[0, 1.3, 8.9]} size={[2.6, 2.6, 0.05]} color="#6a2ab0" emissive="#5a1fa0" emissiveIntensity={0.4} />
      <ClubSign position={[0, 3.0, 8.6]} />
      <LampPost position={[-3.0, 0, 6.4]} seed={3} />
      <Tree position={[5.2, 0, 8.2]} height={4.2} leaf="#2f4a28" />
      <Glow position={[0, 1.4, 8.7]} size={2.6} color="#a05aff" opacity={0.35} />
      <LightPool position={[0, 0.06, 7.4]} width={4.2} depth={2.6} color="#a05aff" opacity={0.2} />
      <pointLight position={[0, 2.2, 8.4]} color="#a05aff" intensity={3.4} distance={9} decay={2} />
      {bob(frame, fps, 0, 0) ? null : null}
    </group>
  );
};

// --------------------------------------------------------------------------- the world

export const World: React.FC = () => (
  <>
    <Zone name="street">
      <Street />
    </Zone>
    <Zone name="bedroom">
      <Bedroom />
    </Zone>
    <Zone name="yard">
      <Yard />
    </Zone>
    <Zone name="kitchen">
      <Kitchen />
    </Zone>
    <Zone name="club">
      <Club />
    </Zone>
  </>
);

export { CLUB, STREET };
