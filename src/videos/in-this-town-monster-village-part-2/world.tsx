import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox, Zone } from "../../engine";
import { Blaze, FireLight, Lantern, Pine, StrawHat } from "../../../Topics/InThisTown";
import { World as Village } from "../in-this-town-monster-village/world";
import { Chicken, Cow, FARM, HALL, HIDE, MOROOM, PEN_X, Pig, SHELF_X, TREE } from "./kit";

/**
 * PART TWO'S WORLD: part one's village (zones "village", "day", "night"), and what is new.
 *
 *   farm     The wrecked pig farm east of the village, past the pond: mud, a broken fence, half a shed. The door in
 *            the mud is drawn by the shots (kit: MudDoor), because it opens.
 *   hide     The hideout's big room, far off to the north. Wood floor, a well, shelves of food to the roof, a hearth,
 *            three pens, the ladder. No south wall: that is where the camera lives.
 *   hall     The corridor of rooms, a name over every door but the last.
 *   moroom   Mo's room. "moroomN" is its north wall (behind the bed) and "moroomS" its south wall with the doorway:
 *            a shot shows the one that is not behind its camera.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const MUD = "#5b4331";
const MUD_DARK = "#463225";
const WOOD = "#7a5632";

const Farm: React.FC = () => (
  <>
    <Vox kind="path" position={[39.5, 0.02, 2.6]} size={[15, 0.06, 3]} />
    <Vox kind="path" position={[48, 0.021, 5]} size={[3, 0.06, 6]} />
    <Tree position={TREE} height={5} leaf="#3f7f2d" />
    <group position={FARM}>
      <Block position={[0, 0.03, 0]} size={[11.5, 0.06, 8.5]} color={MUD} castShadow={false} />
      {[[-3.6, -2.2, 2.2, 1.4], [2.8, -1.4, 1.8, 1.2], [-1.6, 2.2, 2.4, 1.3], [3.9, 2.6, 1.6, 1.5], [-4.4, 1.0, 1.3, 1.1], [0.6, -3.1, 1.5, 0.9]].map(([x, z, w, d], i) => (
        <Block key={i} position={[x, 0.05, z]} size={[w, 0.03, d]} color={MUD_DARK} castShadow={false} />
      ))}
      {/* The fence: some of it standing, most of it not. */}
      {[-5.6, -4.2, -1.4, 1.6, 4.4, 5.6].map((x, i) => (
        <Block key={`p${i}`} position={[x, 0.5, -4.1]} rotation={[0, 0, i % 3 === 1 ? 0.35 : 0]} size={[0.18, 1.0, 0.18]} color={WOOD} />
      ))}
      <Block position={[-4.9, 0.7, -4.1]} size={[1.4, 0.12, 0.1]} color={WOOD} />
      <Block position={[5.0, 0.7, -4.1]} size={[1.2, 0.12, 0.1]} color={WOOD} />
      <Block position={[-2.6, 0.32, -4.0]} rotation={[0, 0.2, 0.42]} size={[2.6, 0.12, 0.1]} color={WOOD} />
      <Block position={[0.2, 0.09, -3.7]} rotation={[0, -0.3, 0]} size={[2.4, 0.12, 0.1]} color={WOOD} />
      {[-5.6, 5.6].map((x) => [-1.5, 1.5, 4.1].map((z) => <Block key={`${x}${z}`} position={[x, 0.5, z]} rotation={[z > 3 ? 0.3 : 0, 0, 0]} size={[0.18, 1.0, 0.18]} color={WOOD} />))}
      <Block position={[-5.6, 0.7, 0]} size={[0.1, 0.12, 3]} color={WOOD} />
      <Block position={[5.6, 0.25, 2.8]} rotation={[0.35, 0, 0]} size={[0.1, 0.12, 2.6]} color={WOOD} />
      {/* The broken length the camera passes first, and the empty trough with its sign. */}
      <Block position={[-2.3, 0.45, -1.5]} rotation={[0, 0, 0.5]} size={[0.18, 1.0, 0.18]} color={WOOD} />
      <Block position={[-2.0, 0.12, -1.3]} rotation={[0, 0.5, 0]} size={[1.7, 0.12, 0.1]} color={WOOD} />
      <Block position={[-2.9, 0.5, -1.6]} rotation={[0, 0, -0.25]} size={[1.2, 0.12, 0.1]} color={WOOD} />
      <Block position={[-1.2, 0.22, -1.6]} size={[1.5, 0.3, 0.6]} color={WOOD} />
      <Block position={[-1.2, 0.36, -1.6]} size={[1.3, 0.05, 0.4]} color="#2a1d14" castShadow={false} />
      <Block position={[-0.2, 0.6, -1.9]} rotation={[0, 0, 0.12]} size={[0.1, 1.2, 0.1]} color={WOOD} />
      <Block position={[-0.2, 1.15, -1.86]} rotation={[0, 0, 0.12]} size={[0.9, 0.42, 0.06]} color="#c9a877" />
      <PixelText text="PIGS" position={[-0.2, 1.15, -1.82]} rotation={[0, 0, 0.12]} height={0.3} maxWidth={0.8} color="#3a2a1c" />
      {/* Half a shed. */}
      <Vox kind="planks" position={[3.6, 0.9, -3.0]} size={[2.6, 1.8, 0.2]} />
      <Vox kind="planks" position={[4.9, 0.6, -2.1]} size={[0.2, 1.2, 1.8]} />
      <Vox kind="darkPlanks" position={[3.3, 1.3, -2.2]} size={[2.8, 0.14, 1.9]} />
      <Block position={[2.2, 0.7, -1.7]} rotation={[0.5, 0, 0.6]} size={[0.16, 2.2, 0.16]} color={WOOD} />
      <pointLight position={[0, 5, 4]} color="#b4c2ff" intensity={50} distance={17} decay={2} />
      <pointLight position={[-3, 4, -1]} color="#b4c2ff" intensity={26} distance={12} decay={2} />
    </group>
    <Pine position={[59.5, 0, 3]} height={6.5} />
    <Pine position={[57, 0, 13.5]} height={7} />
    <Pine position={[45, 0, 14]} height={6} />
    <Pine position={[60, 0, 10]} height={7.4} />
    {/* Light along the road he runs back on. */}
    <pointLight position={[31, 4.4, 5]} color="#b4c2ff" intensity={30} distance={15} decay={2} />
    <pointLight position={[40, 4.4, 5]} color="#b4c2ff" intensity={30} distance={15} decay={2} />
  </>
);

const FOOD = ["#c8892e", "#c23a2e", "#e07a2e", "#5aa63a", "#e0b83a", "#b5523a", "#f1ece0", "#8a5a2a"];

const Hideout: React.FC = () => (
  <group position={HIDE}>
    <Vox kind="planks" position={[1, -0.1, 3.5]} size={[26, 0.2, 22]} />
    <Vox kind="darkPlanks" position={[1, 5.3, 3.5]} size={[26, 0.2, 22]} castShadow={false} />
    <Vox kind="planks" tint="#b89868" position={[1, 2.6, -7.3]} size={[26, 5.2, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#b09060" position={[-12.1, 2.6, 3.5]} size={[0.2, 5.2, 22]} castShadow={false} />
    <Vox kind="planks" tint="#b09060" position={[14.1, 2.6, 3.5]} size={[0.2, 5.2, 22]} castShadow={false} />
    {[-10, -4.6, 5.6].map((x) => (
      <Vox key={x} kind="log" position={[x, 2.6, -6.2]} size={[0.5, 5.2, 0.5]} />
    ))}
    {[-6.5, 1, 8.5].map((x) => (
      <Vox key={`b${x}`} kind="log" position={[x, 5.0, 3.5]} size={[0.4, 0.4, 22]} castShadow={false} />
    ))}
    <Block position={[0, 0.012, 0.4]} size={[5.4, 0.02, 3.6]} color="#9a3a30" castShadow={false} />
    <Block position={[0, 0.016, 0.4]} size={[4.6, 0.02, 2.8]} color="#c9a44a" castShadow={false} />

    {/* The well of clean water. */}
    <group position={[-7, 0, -2.4]}>
      {[[0, -0.95, 2.2, 0.3], [0, 0.95, 2.2, 0.3], [-0.95, 0, 0.3, 1.6], [0.95, 0, 0.3, 1.6]].map(([x, z, w, d], i) => (
        <Vox key={i} kind="cobble" position={[x, 0.4, z]} size={[w, 0.8, d]} />
      ))}
      <Block position={[0, 0.62, 0]} size={[1.6, 0.06, 1.6]} color="#4f9be8" emissive="#2a6ac0" emissiveIntensity={0.35} castShadow={false} />
    </group>

    {/* Shelves of food, right up to the roof. */}
    <group position={[SHELF_X, 0, -6.9]}>
      {[-2.1, 0, 2.1].map((x) => (
        <Block key={x} position={[x, 2.6, 0]} size={[0.14, 5.2, 0.6]} color="#5c3f24" />
      ))}
      {[0.7, 1.55, 2.4, 3.25, 4.1, 4.95].map((y, row) => (
        <group key={y} position={[0, y, 0]}>
          <Block size={[4.3, 0.08, 0.6]} color="#7a5632" />
          {[-1.75, -1.25, -0.75, -0.3, 0.3, 0.75, 1.25, 1.75].map((x, i) => (
            <Block key={i} position={[x, 0.22, 0.02]} size={[0.36, (i + row) % 3 === 0 ? 0.26 : 0.36, 0.36]} color={FOOD[(i * 3 + row * 5) % FOOD.length]} />
          ))}
        </group>
      ))}
    </group>

    {/* The hearth, and a bed by it. */}
    <group position={[0.9, 0, -5.6]}>
      {[[0, -0.55, 1.4, 0.3], [0, 0.55, 1.4, 0.3], [-0.55, 0, 0.3, 0.8], [0.55, 0, 0.3, 0.8]].map(([x, z, w, d], i) => (
        <Vox key={i} kind="cobble" position={[x, 0.2, z]} size={[w, 0.4, d]} />
      ))}
      <Blaze position={[0, 0.2, 0]} size={0.5} height={0.9} count={10} seed={3} />
      <FireLight position={[0, 0.9, 0.3]} power={1.6} reach={11} seed={3} />
    </group>
    <group position={[3.0, 0, -5.4]}>
      <Block position={[0, 0.25, 0]} size={[1.2, 0.5, 2.2]} color="#6b4a2a" />
      <Block position={[0, 0.54, 0.2]} size={[1.1, 0.1, 1.6]} color="#5a8f6a" castShadow={false} />
      <Block position={[0, 0.58, -0.75]} size={[0.8, 0.16, 0.5]} color="#f1ece0" castShadow={false} />
    </group>

    {/* Three pens along the back wall: chickens, cows, the pigs. */}
    {[6.5, 8.7, 10.9, 13.2].map((x) => (
      <group key={x}>
        <Block position={[x, 0.5, -4.9]} size={[0.12, 1.0, 4.4]} color="#7a5632" />
      </group>
    ))}
    <Block position={[9.85, 0.75, -2.7]} size={[6.8, 0.12, 0.1]} color="#7a5632" />
    <Block position={[9.85, 0.35, -2.7]} size={[6.8, 0.12, 0.1]} color="#7a5632" />
    <Block position={[9.85, 0.02, -4.9]} size={[6.6, 0.03, 4.3]} color="#c9a44a" castShadow={false} />
    <Chicken position={[PEN_X[0] - 0.5, 0, -3.6]} rotationY={0.3} phase={0.4} />
    <Chicken position={[PEN_X[0] + 0.4, 0, -4.2]} rotationY={-0.6} phase={1.7} />
    <Chicken position={[PEN_X[0] - 0.1, 0, -5.2]} rotationY={0.9} phase={2.9} />
    <Chicken position={[PEN_X[0] + 0.5, 0, -3.3]} rotationY={-0.1} phase={3.8} />
    <Cow position={[PEN_X[1] - 0.35, 0, -4.0]} rotationY={0.25} />
    <Cow position={[PEN_X[1] + 0.4, 0, -5.4]} rotationY={-0.5} scale={0.9} />
    <Pig position={[PEN_X[2] - 0.45, 0, -3.7]} rotationY={0.3} />
    <Pig position={[PEN_X[2] + 0.4, 0, -4.4]} rotationY={-0.4} />
    <Pig position={[PEN_X[2] - 0.1, 0, -5.5]} rotationY={0.1} scale={0.75} />

    {/* The ladder up to the door, with the frame of the door in the roof. */}
    <group position={[3, 0, 2]}>
      <Block position={[-0.36, 2.6, 0]} size={[0.09, 5.2, 0.09]} color="#5c3f24" />
      <Block position={[0.36, 2.6, 0]} size={[0.09, 5.2, 0.09]} color="#5c3f24" />
      {Array.from({ length: 12 }, (_, i) => (
        <Block key={i} position={[0, 0.35 + i * 0.42, 0]} size={[0.72, 0.07, 0.07]} color="#7a5632" />
      ))}
      {[[0, -0.35, 2, 0.16], [0, 1.55, 2, 0.16], [-0.92, 0.6, 0.16, 2], [0.92, 0.6, 0.16, 2]].map(([x, z, w, d], i) => (
        <Block key={`f${i}`} position={[x, 5.08, z]} size={[w, 0.3, d]} color="#5c3f24" castShadow={false} />
      ))}
    </group>

    <Lantern position={[-6, 4.6, -0.6]} chain={0.5} light={16} reach={13} seed={1} />
    <Lantern position={[0, 4.6, 0.4]} chain={0.5} light={18} reach={13} seed={2} />
    <Lantern position={[6.5, 4.6, -0.6]} chain={0.5} light={16} reach={13} seed={3} />
    <Lantern position={[10.5, 4.6, -3.6]} chain={0.5} light={14} reach={12} seed={4} />
    <Lantern position={[-2.4, 4.6, -5.2]} chain={0.5} light={14} reach={12} seed={5} />
    <Lantern position={[3, 4.6, 4.6]} chain={0.5} light={14} reach={12} seed={6} />
    <GodRay position={[3, 3.4, 2.6]} rotation={[0, 0, 0.12]} width={1.6} height={5} color="#ffe6b8" opacity={0.05} />
    <LightPool position={[0, 0.03, 0.4]} width={7} depth={5} color="#ffe2b0" opacity={0.14} />
    <LightPool position={[-6, 0.03, -0.6]} width={5} depth={4} color="#ffe2b0" opacity={0.1} />
    <Glow position={[0.9, 0.9, -5.2]} size={2.4} color="#ff9a4a" opacity={0.22} />
    <Dust position={[1, 2.4, 0]} area={[24, 4, 12]} count={60} size={0.04} color="#ffe9c4" opacity={0.5} seed={5} speed={0.15} />
    <pointLight position={[0, 3.2, 7]} color="#ffd9a8" intensity={40} distance={18} decay={2} />
    <pointLight position={[-7, 3.2, 3]} color="#ffd9a8" intensity={22} distance={13} decay={2} />
    <pointLight position={[9, 3.2, 1]} color="#ffd9a8" intensity={26} distance={13} decay={2} />
  </group>
);

const NAMES = ["ZOMBIES", "BONES", "HISS", "POST"];

const Hall: React.FC = () => (
  <group position={HALL}>
    <Vox kind="planks" position={[5, -0.1, 1.5]} size={[17, 0.2, 7]} />
    <Vox kind="darkPlanks" position={[5, 3.5, 1.5]} size={[17, 0.2, 7]} castShadow={false} />
    <Vox kind="planks" tint="#b89868" position={[5, 1.7, -1.7]} size={[17, 3.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#b09060" position={[12.6, 1.7, 1.5]} size={[0.2, 3.4, 7]} castShadow={false} />
    <Block position={[5, 0.012, -0.3]} size={[15, 0.02, 1.4]} color="#9a3a30" castShadow={false} />
    {NAMES.map((name, i) => (
      <group key={name} position={[i * 2.5, 0, -1.58]}>
        <Block position={[0, 1.0, 0]} size={[1.0, 2.0, 0.08]} color="#6b4a2a" castShadow={false} />
        <Block position={[0.34, 1.0, 0.05]} size={[0.08, 0.08, 0.06]} color="#e0b83a" castShadow={false} />
        <Block position={[0, 2.42, 0]} size={[1.5, 0.46, 0.06]} color="#e6d2a4" castShadow={false} />
        <PixelText text={name} position={[0, 2.42, 0.05]} height={0.3} maxWidth={1.36} color="#3a2a1c" />
      </group>
    ))}
    {/* The last door has a board over it like the others, and nothing written on the board. The door is the shot's. */}
    <Block position={[10, 2.42, -1.58]} size={[1.5, 0.46, 0.06]} color="#e6d2a4" castShadow={false} />
    <Block position={[10, 1.0, -1.66]} size={[1.0, 2.0, 0.04]} color="#000000" emissive="#ffb868" emissiveIntensity={1} castShadow={false} />
    <Lantern position={[1.25, 3.0, -0.3]} chain={0.3} light={14} reach={10} seed={7} />
    <Lantern position={[6.25, 3.0, -0.3]} chain={0.3} light={14} reach={10} seed={8} />
    <Lantern position={[10.9, 3.0, -0.3]} chain={0.3} light={12} reach={9} seed={9} />
    <pointLight position={[5, 2.4, 3.5]} color="#ffd9a8" intensity={30} distance={14} decay={2} />
  </group>
);

const MoRoom: React.FC = () => (
  <group position={MOROOM}>
    <Vox kind="planks" position={[0, -0.1, 0.4]} size={[6.2, 0.2, 8]} />
    <Vox kind="darkPlanks" position={[0, 3.5, 0.4]} size={[6.2, 0.2, 8]} castShadow={false} />
    <Vox kind="planks" tint="#b09060" position={[-3.1, 1.7, 0.4]} size={[0.2, 3.4, 8]} castShadow={false} />
    <Vox kind="planks" tint="#b09060" position={[3.1, 1.7, 0.4]} size={[0.2, 3.4, 8]} castShadow={false} />
    {/* The bed along the north wall, the pillow at its west end. */}
    <Block position={[-0.9, 0.25, -1.95]} size={[2.3, 0.5, 1.1]} color="#6b4a2a" />
    <Block position={[-0.55, 0.54, -1.95]} size={[1.6, 0.1, 1.0]} color="#d9b84a" castShadow={false} />
    <Block position={[-1.7, 0.6, -1.95]} size={[0.6, 0.16, 0.8]} color="#f1ece0" castShadow={false} />
    <Block position={[0, 0.012, 0]} size={[2.6, 0.02, 1.8]} color="#9a3a30" castShadow={false} />
    {/* A table, and the lamp he read by. */}
    <Block position={[2.2, 0.7, -1.8]} size={[1.0, 0.08, 0.8]} color="#7a5632" />
    <Block position={[2.2, 0.35, -1.8]} size={[0.12, 0.7, 0.12]} color="#5c3f24" />
    <Lantern position={[2.2, 1.25, -1.8]} chain={0} light={12} reach={8} seed={11} />
    <Lantern position={[-0.6, 3.0, 0.2]} chain={0.3} light={16} reach={9} seed={12} />
    <pointLight position={[0, 2.4, 1.6]} color="#ffd9a8" intensity={24} distance={10} decay={2} />
  </group>
);
const MoRoomNorth: React.FC = () => (
  <group position={MOROOM}>
    <Vox kind="planks" tint="#b89868" position={[0, 1.7, -2.6]} size={[6.2, 3.4, 0.2]} castShadow={false} />
    {/* The spare straw hat, on its peg. */}
    <Block position={[0.9, 1.9, -2.44]} size={[0.08, 0.08, 0.2]} color="#5c3f24" />
    <StrawHat position={[0.9, 1.78, -2.36]} width={0.92} rotation={[Math.PI / 2, 0, 0]} />
  </group>
);
const MoRoomSouth: React.FC = () => (
  <group position={MOROOM}>
    <Vox kind="planks" tint="#b89868" position={[-2.1, 1.7, 2.6]} size={[2.2, 3.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#b89868" position={[2.1, 1.7, 2.6]} size={[2.2, 3.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#b89868" position={[0, 2.95, 2.6]} size={[2.0, 0.9, 0.2]} castShadow={false} />
  </group>
);

export const World: React.FC = () => (
  <>
    <Village />
    <Zone name="farm">
      <Farm />
    </Zone>
    <Zone name="hide">
      <Hideout />
    </Zone>
    <Zone name="hall">
      <Hall />
    </Zone>
    <Zone name="moroom">
      <MoRoom />
    </Zone>
    <Zone name="moroomN">
      <MoRoomNorth />
    </Zone>
    <Zone name="moroomS">
      <MoRoomSouth />
    </Zone>
  </>
);
