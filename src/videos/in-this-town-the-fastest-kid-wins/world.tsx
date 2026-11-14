import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, DarkOak, Hut, LampPost, Moon, Room, Stall, Stars, Well } from "../../../Topics/InThisTown";
import { CUP, DESERT, FINISH, FOREST, FPOND, HILL, LINE_X, OAK, PLACE, POND, RIVER, STAND, START_X, STUMP, Stand, Stump, WTREE } from "./kit";

/**
 * THE RACE'S WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  The town: one street, west–east (x). The start line is across it. A hill at the west end, a pond.
 *   room     The teller's room, with the empty shelf.
 *   forest   The forest at night: the stump, the witch's tree, a pond.
 *   river    Stretch two of the race: two rivers across the track, a bridge over each.
 *   desert   Stretch three: sand, cactus, rock.
 *   oak      Stretch four: the dark oak forest.
 *   finish   The last village: the finish line and the trophy.
 *
 * In every zone the track runs west to east along z = 2 (kit: LANE), and the camera lives south of it.
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const WATER = "#3f7fd6";
const Water: React.FC<{ position: [number, number, number]; size: [number, number] }> = ({ position, size }) => (
  <>
    <Block position={[position[0], position[1] + 0.03, position[2]]} size={[size[0], 0.06, size[1]]} color={WATER} emissive="#2a5fb0" emissiveIntensity={0.25} roughness={0.2} castShadow={false} />
    <Block position={[position[0] - size[0] * 0.2, position[1] + 0.065, position[2] + size[1] * 0.15]} size={[size[0] * 0.25, 0.01, 0.12]} color="#bfe2ff" castShadow={false} />
    <Block position={[position[0] + size[0] * 0.15, position[1] + 0.065, position[2] - size[1] * 0.2]} size={[size[0] * 0.2, 0.01, 0.12]} color="#bfe2ff" castShadow={false} />
  </>
);
/** Posts and a banner over the track at x. */
const Gate: React.FC<{ x: number; z: number; text?: boolean }> = ({ x, z, text = false }) => (
  <group position={[x, 0, z]}>
    {[-2.6, 2.6].map((dz) => (
      <Block key={dz} position={[0, 2, dz]} size={[0.25, 4, 0.25]} color="#5c3f24" />
    ))}
    <Block position={[0, 3.7, 0]} size={[0.1, 0.7, 5.3]} color="#f4f4f4" />
    {Array.from({ length: 10 }, (_, i) => (
      <Block key={i} position={[-0.06, 3.52 + (i % 2) * 0.35, -2.34 + i * 0.52]} size={[0.02, 0.35, 0.52]} color="#15151a" castShadow={false} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <Block key={i} position={[0, 0.07, -2.2 + i * 0.55]} size={[0.5, 0.02, 0.275]} color={i % 2 ? "#15151a" : "#f4f4f4"} castShadow={false} />
    ))}
    {text ? null : null}
  </group>
);

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 90]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[90, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />
    <Hut at={[-13, 0, 11.5]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />
    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />
    <Stand position={STAND} />
    <Gate x={START_X} z={2} />
    {/* The hill at the west end: three steps of grass. */}
    <Vox kind="grass" position={[HILL[0], 0.5, HILL[2]]} size={[9, 1, 9]} />
    <Vox kind="grass" position={[HILL[0] - 0.5, 1.5, HILL[2]]} size={[6, 1, 6]} />
    <Vox kind="grass" position={[HILL[0] - 1, 2.5, HILL[2]]} size={[3, 1, 3]} />
    <Water position={[POND[0], 0.02, POND[2]]} size={[6.5, 3.8]} />
    {(
      [
        [-28, -12, 4.6], [-15.5, -13.5, 4], [6, -15.5, 4.4], [15, -13, 3.8], [27, -11, 4.6], [-27, 15, 4], [8, 18, 4.4], [25, 13, 4], [-33, -6, 4.8], [31, -8, 4.4],
        [-46, -6, 4.4], [-47, 9, 4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <Clouds y={48} center={[0, 0, 0]} />
    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[STAND[0], 1.7, STAND[2]]} size={1.6} color="#ffe08a" opacity={0.4} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const FOREST_TREES: Array<[number, number, number]> = [
  [-8, -3, 5], [-5, -6, 4.4], [3, -4, 5.2], [7, -2.5, 4.6], [11, -5, 5], [15, -3, 4.4], [22, -4.5, 5], [27, -2, 4.6], [-12, -5, 4.8], [-16, -2, 5.2],
  [-10, 9, 4.6], [-3, 11, 5], [6, 10, 4.4], [13, 12, 5], [24, 10, 4.6], [-18, 8, 5], [0, -9, 5.4], [9, -10, 5], [18, -9, 4.8], [-7, -11, 5], [30, -7, 5], [33, 8, 4.6],
];
const Forest: React.FC = () => (
  <group position={FOREST}>
    <Vox kind="grass" tint="#3f7a36" position={[5, -0.5, 0]} size={[110, 1, 70]} />
    {FOREST_TREES.map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#2f6a2a" : "#387a30"} />
    ))}
    <Tree position={[WTREE[0] - FOREST[0], 0, WTREE[2] - FOREST[2]]} height={5.4} leaf="#2a5a26" />
    <Stump position={[STUMP[0] - FOREST[0], 0, STUMP[2] - FOREST[2]]} />
    <Water position={[FPOND[0] - FOREST[0], 0.02, FPOND[2] - FOREST[2]]} size={[9, 5]} />
    {/* Fallen leaves. */}
    {Array.from({ length: 40 }, (_, i) => (
      <Block key={i} position={[-14 + ((i * 7.3) % 40), 0.02, -3 + ((i * 3.7) % 9)]} size={[0.18, 0.02, 0.14]} color={["#b8642a", "#c98a2e", "#8a5a22"][i % 3]} castShadow={false} />
    ))}
    <Stars center={[0, 0, 0]} radius={150} count={260} seed={5} />
    <Moon position={[18, 46, -90]} radius={7} rotation={[0.3, -0.2, 0]} glow={0.6} />
    {[-12, -2, 8, 18, 28].map((x) => (
      <pointLight key={x} position={[x, 6, 6]} color="#b4c2ff" intensity={55} distance={22} decay={2} />
    ))}
    <GodRay position={[0, 7, -1]} rotation={[0, 0, 0.35]} width={4} height={13} color="#cfd8ff" opacity={0.07} />
    <LightPool position={[1, 0.07, 1]} width={8} depth={6} color="#cfd8ff" opacity={0.12} />
    <Glow position={[-2, 2.2, -0.5]} size={2.4} color="#9a6fff" opacity={0.12} />
    <Dust position={[2, 2.2, 1]} area={[30, 4, 12]} count={60} size={0.04} color="#cfd8ff" opacity={0.5} seed={7} speed={0.15} />
  </group>
);

const River: React.FC = () => (
  <group position={RIVER}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    {[-7, 9].map((x) => (
      <group key={x}>
        <Block position={[x, -0.2, 0]} size={[5.4, 0.5, 80]} color="#2a4f8a" castShadow={false} />
        <Water position={[x, 0, 0]} size={[5, 80]} />
        <Vox kind="planks" position={[x, 0.04, 2]} size={[6.4, 0.12, 3.6]} />
        {[-1.8, 1.8].map((dz) => (
          <Vox key={dz} kind="log" position={[x, 0.6, 2 + dz]} size={[6.4, 0.2, 0.2]} />
        ))}
        {[-11, -6, 8, 13].map((z, i) => (
          <Block key={z} position={[x + (i % 2 ? 2.8 : -2.8), 0.7, z]} size={[0.14, 1.4, 0.14]} color="#4f8f3a" />
        ))}
      </group>
    ))}
    {([[-20, -6, 4.4], [-13, -9, 4], [1, -7, 4.6], [17, -6, 4.2], [26, -9, 4.8], [-24, 11, 4], [2, 12, 4.4], [20, 12, 4], [34, -5, 4.4], [-34, -7, 4.6]] as Array<[number, number, number]>).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#4a9a36" : "#57a83e"} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[1, 6.5, -2]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[1, 0.08, 2]} width={12} depth={5} color="#fff2c8" opacity={0.12} />
    <Glow position={[9, 1, 2]} size={4} color="#bfe2ff" opacity={0.12} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={13} speed={0.2} />
  </group>
);

const Cactus: React.FC<{ position: [number, number, number]; h?: number }> = ({ position, h = 2.4 }) => (
  <group position={position}>
    <Block position={[0, h / 2, 0]} size={[0.6, h, 0.6]} color="#4f8f3a" />
    <Block position={[0.5, h * 0.55, 0]} size={[0.5, 0.3, 0.3]} color="#4f8f3a" />
    <Block position={[0.65, h * 0.72, 0]} size={[0.3, 0.6, 0.3]} color="#4f8f3a" />
    <Block position={[-0.45, h * 0.4, 0]} size={[0.4, 0.3, 0.3]} color="#478236" />
  </group>
);
const Desert: React.FC = () => (
  <group position={DESERT}>
    <Vox kind="sand" position={[0, -0.5, 0]} size={[150, 1, 90]} />
    <Block position={[0, 0.02, 2]} size={[150, 0.04, 4.4]} color="#e9d79a" castShadow={false} />
    {([[-14, -4, 2.6], [-6, -7, 2], [3, -3.6, 3], [12, -6, 2.2], [20, -4, 2.8], [28, -8, 2.4], [-22, -6, 3], [-9, 9, 2.4], [9, 11, 2.8], [24, 9, 2.2], [36, -4, 2.6], [-32, -4, 2.4]] as Array<[number, number, number]>).map(([x, z, h], i) => (
      <Cactus key={i} position={[x, 0, z]} h={h} />
    ))}
    {([[-18, -12, 9, 5], [6, -14, 12, 7], [30, -13, 8, 4], [-40, -10, 10, 6]] as Array<[number, number, number, number]>).map(([x, z, w, h], i) => (
      <group key={i}>
        <Vox kind="sand" tint="#d9a05a" position={[x, h / 2, z]} size={[w, h, 5]} />
        <Vox kind="sand" tint="#c98a4a" position={[x + 1, h + 0.75, z]} size={[w * 0.5, 1.5, 3.4]} />
      </group>
    ))}
    {[-10, 0, 15, 26].map((x) => (
      <Block key={x} position={[x, 0.2, -1.2]} size={[0.5, 0.4, 0.5]} color="#8a6a3a" />
    ))}
    <GodRay position={[2, 7, -3]} rotation={[0, 0, 0.5]} width={6} height={13} color="#fff0c8" opacity={0.08} />
    <LightPool position={[0, 0.08, 2]} width={14} depth={6} color="#fff2c8" opacity={0.16} />
    <Glow position={[10, 9, -20]} size={10} color="#fff0b0" opacity={0.3} />
    <Dust position={[0, 1.6, 1]} area={[34, 3, 14]} count={90} size={0.05} color="#f4e2a8" opacity={0.6} seed={17} speed={0.5} />
  </group>
);

const OAKS: Array<[number, number, number]> = [
  [-22, -2.4, 5], [-17, -4, 5.4], [-12, -2, 4.8], [-7, -3.6, 5.2], [-2, -2.2, 5], [3, -4, 5.4], [8, -2.4, 4.8], [13, -3.6, 5.2], [18, -2, 5], [23, -4, 5.4], [28, -2.6, 5],
  [-20, -8, 5.6], [-10, -8.5, 5.2], [0, -8, 5.6], [10, -8.6, 5.2], [20, -8, 5.6], [30, -8, 5.2],
  [-21, 7.4, 5.2], [-14, 8.6, 5], [-6, 7.6, 5.4], [2, 8.8, 5], [10, 7.6, 5.2], [17, 8.6, 5.4], [25, 7.6, 5], [-26, 12, 5.4], [-2, 13, 5.2], [14, 13, 5.4], [33, 8, 5.2], [-30, -3, 5.2], [36, -3, 5],
];
const Oak: React.FC = () => (
  <group position={OAK}>
    <Vox kind="grass" tint="#3c6b2e" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Vox kind="path" tint="#8a7a52" position={[0, 0.02, 2]} size={[130, 0.06, 4]} />
    {OAKS.map(([x, z, height], i) => (
      <DarkOak key={i} position={[x, 0, z]} height={height} n={i} />
    ))}
    {[-15, -3, 9, 21].map((x, i) => (
      <group key={x}>
        <Block position={[x, 0.2, -0.9 - (i % 2) * 0.4]} size={[0.3, 0.4, 0.3]} color="#b0302a" />
        <Block position={[x, 0.45, -0.9 - (i % 2) * 0.4]} size={[0.6, 0.2, 0.6]} color="#c23a2e" />
      </group>
    ))}
    {[-10, 4, 18].map((x) => (
      <GodRay key={x} position={[x, 6, 1]} rotation={[0, 0, 0.4]} width={2.4} height={12} color="#e8ffd0" opacity={0.08} />
    ))}
    <LightPool position={[2, 0.08, 2]} width={10} depth={4} color="#e8ffd0" opacity={0.12} />
    <Glow position={[2, 3, 2]} size={5} color="#d8ffb0" opacity={0.1} />
    <Dust position={[0, 2.2, 1]} area={[34, 4, 10]} count={70} size={0.04} color="#e8ffd0" opacity={0.6} seed={19} speed={0.15} />
  </group>
);

const Finish: React.FC = () => (
  <group position={FINISH}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[130, 1, 80]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[130, 0.06, 4.6]} />
    <Hut at={[4, 0, -5]} w={7} windows={[-2, 2]} roof="#8a3b2a" tint="#d8c49a" />
    <Hut at={[14, 0, -5.5]} w={6.5} h={4} wall="cobble" roof="#3d5f9a" windows={[-1.8]} door={1.2} />
    <Hut at={[24, 0, -5]} w={7} tint="#caa268" roof="#3f6b3a" windows={[2]} door={-1.2} />
    <Hut at={[-8, 0, -5.5]} w={6} h={3.6} roof="#5a4a6a" windows={[1.6]} door={-1} />
    <Hut at={[8, 0, 12]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[22, 0, 12]} w={6} wall="cobble" roof="#3f6b3a" windows={[1.5]} turn={Math.PI} />
    <Gate x={LINE_X} z={2} />
    <Stand position={[CUP[0] - FINISH[0], 0, CUP[2] - FINISH[2]]} />
    {([[-20, -8, 4.4], [-14, 10, 4], [32, -8, 4.6], [34, 9, 4.2], [-28, -4, 4.6]] as Array<[number, number, number]>).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
    <GodRay position={[15, 6.5, 0]} rotation={[0, 0, 0.4]} width={4} height={12} color="#fff0c8" opacity={0.1} />
    <LightPool position={[16, 0.08, 2]} width={6} depth={5} color="#fff2c8" opacity={0.2} />
    <Glow position={[CUP[0] - FINISH[0], 1.7, CUP[2] - FINISH[2]]} size={2.6} color="#ffe08a" opacity={0.45} />
    <Dust position={[10, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={23} speed={0.2} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
        {/* The shelf over where a trophy would go. It is empty. */}
        <group position={[PLACE.room[0] - 1.1, 0, PLACE.room[2] - 2.36]}>
          <Block position={[0, 1.7, 0.16]} size={[1.5, 0.08, 0.34]} color="#7a5632" />
          <Block position={[-0.6, 1.56, 0.1]} size={[0.08, 0.22, 0.2]} color="#5c3f24" />
          <Block position={[0.6, 1.56, 0.1]} size={[0.08, 0.22, 0.2]} color="#5c3f24" />
        </group>
      </Zone>
      <Zone name="forest">
        <Forest />
      </Zone>
      <Zone name="river">
        <River />
      </Zone>
      <Zone name="desert">
        <Desert />
      </Zone>
      <Zone name="oak">
        <Oak />
      </Zone>
      <Zone name="finish">
        <Finish />
      </Zone>
    </>
  );
};
