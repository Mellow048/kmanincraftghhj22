import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Zone, useActiveShot } from "../../engine";
import { BlockPile as Pile, EnderHouse, Moon, Stars } from "../../../Topics/InThisTown";
import { PLACE, PURPLE } from "./kit";

/**
 * Two places.
 *
 *   town   An overworld town of endermen: one street, north to south. Dark houses with purple roofs, and beside every
 *          one a pile of the blocks its people have carried home. Home closes the north end: bigger, flower pots along
 *          the wall, the yard and the dinner table in front, the kitchen floor east of the door. Woods all round.
 *   photo  A painted wall to stand in front of. Its own zone, far away. Two shots.
 *
 * The people, the table, the kitchen and everything that moves are drawn by the scenes.
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.cos(a) * r, Math.sin(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

/** [x of the front wall, z, width, height]: the west side. The east side is the same, three metres north. */
const HOUSES: Array<[number, number, number, number]> = [
  [8.6, 4, 6.5, 4.4],
  [8.8, 15, 6, 4.2],
  [8.6, 26, 6.5, 4.4],
  [18.5, 9, 6, 4.2],
];

const Town: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the street, the square, the yard */}
    <Vox kind="path" position={[0, 0.02, 12]} size={[4.2, 0.06, 40]} />
    <Vox kind="path" position={[0, 0.021, PLACE.square[2]]} size={[11, 0.06, 9]} />
    <Vox kind="path" position={[0, 0.022, -12.2]} size={[7.6, 0.06, 7.6]} />
    {HOUSES.map(([x, z, w, h], i) => (
      <group key={i}>
        <EnderHouse at={[-x, 0, z]} turn={Math.PI / 2} w={w} h={h} windows={[-1.8, 1.8]} lit={night} />
        <EnderHouse at={[x, 0, z - 3]} turn={-Math.PI / 2} w={w} h={h} windows={[-1.8, 1.8]} lit={night} />
        <Pile at={[-x + 1.3, z + w / 2 + 1.2]} n={i} />
        <Pile at={[x - 1.3, z - 3 - w / 2 - 1.2]} n={i + 4} wide={1} high={3} />
      </group>
    ))}
    {/* home */}
    <EnderHouse at={PLACE.home} w={11} h={5.2} d={7} windows={[-3.4]} lit={night} open={night} />
    {/* two blocks dad has already taken out of the wall */}
    <Block position={[-4.6, 2.5, PLACE.home[2] + 0.02]} size={[1, 1, 0.06]} color="#1a1422" castShadow={false} />
    <Block position={[1.9, 4.1, PLACE.home[2] + 0.02]} size={[1, 1, 0.06]} color="#1a1422" castShadow={false} />
    {/* the flowers he brings home: a row of pots along the wall */}
    {[-4.8, -4.1, -3.4, -2.7, -2.0, -1.3].map((x, i) => (
      <group key={x} position={[x, 0, PLACE.home[2] + 0.55]}>
        <Block position={[0, 0.16, 0]} size={[0.4, 0.32, 0.4]} color="#a5583a" />
        <Block position={[0, 0.47, 0]} size={[0.04, 0.3, 0.04]} color="#3f8a34" castShadow={false} />
        <Block position={[0, 0.66, 0]} size={[0.2, 0.16, 0.2]} color={["#e23a3a", "#f2d24a", "#5a8fe8", "#ffffff", "#e8566a", "#b06ad8"][i]} castShadow={false} />
      </group>
    ))}
    {/* the kitchen floor */}
    <Vox kind="planks" position={[PLACE.kitchen[0], 0.04, PLACE.kitchen[2] + 0.35]} size={[3.6, 0.06, 2.0]} />
    {/* the piles in the street: the one he hides behind, and the town's */}
    <Pile at={[PLACE.pile[0] - 0.9, PLACE.pile[2] - 0.6]} n={2} />
    <Pile at={[4.4, -7.4]} n={5} wide={2} high={3} />
    <Pile at={[-4.6, -1.2]} n={7} wide={1} high={2} />
    <Pile at={[3.6, 12.5]} n={3} wide={1} high={2} />
    {/* purple flags over the doors */}
    {HOUSES.slice(0, 3).map(([x, z], i) => (
      <group key={`b${i}`}>
        <Block position={[-x + 0.3, 3.3, z]} size={[0.06, 1.0, 0.7]} color={PURPLE} castShadow={false} />
        <Block position={[x - 0.3, 3.3, z - 3]} size={[0.06, 1.0, 0.7]} color={PURPLE} castShadow={false} />
      </group>
    ))}
    {Array.from({ length: 40 }, (_, i) => {
      const s = i % 2 ? 1 : -1;
      const x = s * (2.8 + ((i * 37) % 50) / 10);
      const z = -6 + ((i * 53) % 300) / 10;
      const c = ["#f2d24a", "#ffffff", "#e8566a", "#b06ad8"][i % 4];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    {[-1, 1].map((s) => [-8.6, 1.5, 11.5, 21].map((z) => <Torch key={`${s}${z}`} position={[s * 2.7, 0, z]} light={night ? 1.5 : 0} seed={z + s} />))}
    {night ? null : <GodRay position={[-5, 7, 2]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.1 : 0.06} />}
    {night ? null : <GodRay position={[4, 7, -9]} rotation={[0, 0, 0.42]} width={5} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={0.05} />}
    <LightPool position={[0, 0.05, PLACE.square[2]]} width={10} depth={8} color={night ? "#a9c0ff" : "#fff2c0"} opacity={night ? 0.1 : 0.16} />
    <LightPool position={[0, 0.05, 8]} width={6} depth={20} color={night ? "#a9c0ff" : "#fff2c8"} opacity={night ? 0.08 : 0.1} />
    <LightPool position={[0, 0.05, -12.5]} width={5} depth={6} color={night ? "#ffcf8a" : "#fff2c8"} opacity={night ? 0.2 : 0.1} />
    <Glow position={[0, 1.8, PLACE.square[2]]} size={2.4} color={night ? "#c9a0ff" : "#fff0c0"} opacity={0.16} />
    <Dust position={[0, 2.2, 3]} area={[22, 4, 34]} count={70} size={0.045} color={night ? "#e0c8ff" : "#fff7d8"} opacity={0.55} seed={3} speed={0.2} />
    {ring(64, 36, 72, 3).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />
    ))}
    {([[-16, -10], [-15.5, 21], [17, -13], [16, 32], [-12, -24], [12, -25], [-27, 7], [27, 6], [-6.8, -19], [7.2, -19.5]] as Array<[number, number]>).map(([x, z], i) => (
      <Tree key={`t${i}`} position={[x, 0, z]} height={4 + (i % 3) * 0.5} spread={0.85} />
    ))}
    {night ? <Moon position={[18, 60, -95]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

const Photo: React.FC = () => (
  <group position={PLACE.photo}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[40, 1, 40]} />
    {/* the painted wall: a sky, a hill and a sun */}
    <Block position={[0, 4, -2.6]} size={[16, 9, 0.2]} color="#aee0f7" castShadow={false} />
    <Block position={[-1.6, 0.9, -2.48]} size={[9, 1.8, 0.06]} color="#6fbf4a" castShadow={false} />
    <Block position={[2.6, 1.4, -2.47]} size={[5, 2.8, 0.06]} color="#5aa83e" castShadow={false} />
    <Block position={[1.55, 4.6, -2.47]} size={[0.9, 0.9, 0.06]} color="#ffe27a" emissive="#ffe27a" emissiveIntensity={0.4} castShadow={false} />
    <Block position={[-1.3, 4.1, -2.47]} size={[1.3, 0.4, 0.06]} color="#ffffff" castShadow={false} />
    <LightPool position={[0, 0.05, -0.6]} width={5} depth={4} color="#fff2c0" opacity={0.18} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  return (
    <>
      {/* the engine's night key comes from the north; this moon lights the side the lens is on */}
      {night ? <directionalLight color="#b9c4ff" intensity={1.15} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#8088e0" intensity={0.42} /> : null}
      <Zone name="town">
        <Town night={night} warm={look === "overworld-sunset"} />
      </Zone>
      <Zone name="photo">
        <Photo />
      </Zone>
    </>
  );
};
