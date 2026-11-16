import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Zone, useActiveShot } from "../../engine";
import { CreeperHouse, Hut, Moon, Room, Stars, Well } from "../../../Topics/InThisTown";
import { CreeperFace, PLACE } from "./kit";

/**
 * Two places.
 *
 *   town  A street of creepers, running north to south. Every house is green on top and has the face over its door.
 *         His family's house is on the west side with the long table in its yard; the school closes the north end,
 *         with one big door and one small one; the square and the well are in front of it. Woods all round.
 *   room  The family's front room: far away, its own zone. One shot.
 *
 * The people, the table, the desks and everything that moves are drawn by the scenes.
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.cos(a) * r, Math.sin(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

/** A creeper's house at the street: `west` houses face east. */
const House: React.FC<{ west: boolean; x: number; z: number; w?: number; h?: number; n: number; lit: boolean }> = ({ west, x, z, w, h, n, lit }) => (
  <CreeperHouse position={[x, 0, z]} rotationY={west ? Math.PI / 2 : -Math.PI / 2} w={w} h={h} n={n} lit={lit} />
);

/** [x, z, width, height]: the same on both sides of the street. The first on the west side is home. */
const HOUSES: Array<[number, number, number, number]> = [
  [9.4, 8, 7, 4.2],
  [9.4, -7, 6, 3.8],
  [9.6, 19.5, 6, 3.6],
  [19.5, 1, 6, 3.8],
  [20, 13.5, 6.5, 4],
];

const Town: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the street, and the square in front of the school */}
    <Vox kind="path" position={[0, 0.02, 8]} size={[3.6, 0.06, 46]} />
    <Vox kind="path" position={[0, 0.021, PLACE.square[2] - 1]} size={[13, 0.06, 9]} />
    {[8, -7, 19.5].map((z) => (
      <group key={z}>
        <Vox kind="path" position={[-4.2, 0.019, z + 2.6]} size={[5.2, 0.06, 1.3]} />
        <Vox kind="path" position={[4.2, 0.019, z - 5.6]} size={[5.2, 0.06, 1.3]} />
      </group>
    ))}
    {HOUSES.map(([x, z, w, h], i) => (
      <group key={i}>
        <House west x={-x} z={z} w={w} h={h} n={i} lit={night} />
        <House west={false} x={x} z={z - 3} w={w} h={h} n={i + 3} lit={night} />
      </group>
    ))}
    {/* the school: wide, cobble, the face twice as big, a board on the wall, and a second, small door */}
    <Hut at={PLACE.school} w={12} h={4.8} wall="cobble" tint="#c9cdbf" roof="#2f7f3a" windows={[-4.2, 4.2]} lit={night} />
    <group position={[PLACE.school[0], 0, PLACE.school[2]]}>
      <group position={[0, 3.9, 0.36]}>
        <Vox kind="wool" tint="#58b84a" size={[1.5, 1.5, 0.08]} />
        <CreeperFace position={[0, 0, 0.05]} size={1.25} />
      </group>
      {/* the board */}
      <Vox kind="darkPlanks" position={[-2.3, 1.75, 0.22]} size={[2.3, 1.3, 0.08]} />
      <Block position={[-2.3, 1.75, 0.27]} size={[2.05, 1.05, 0.02]} color="#1f3a2a" castShadow={false} />
      {[0.25, 0, -0.25].map((y, i) => (
        <Block key={y} position={[-2.5 + i * 0.2, 1.75 + y, 0.285]} size={[1.1 - i * 0.3, 0.05, 0.01]} color="#e9efe6" castShadow={false} />
      ))}
      {/* his door: small, off to one side, a paw over it */}
      <Block position={[4.6, 0.55, 0.215]} size={[0.75, 1.1, 0.06]} color="#2a1c10" />
      <Vox kind="darkPlanks" position={[4.6, 1.16, 0.23]} size={[0.95, 0.12, 0.1]} />
      <Vox kind="wool" tint="#f7f1e4" position={[4.6, 1.62, 0.24]} size={[0.62, 0.62, 0.06]} />
      <Block position={[4.6, 1.56, 0.28]} size={[0.26, 0.2, 0.01]} color="#ee93a8" castShadow={false} />
      {[-0.17, 0, 0.17].map((x) => (
        <Block key={x} position={[4.6 + x, 1.76, 0.28]} size={[0.11, 0.11, 0.01]} color="#ee93a8" castShadow={false} />
      ))}
    </group>
    <Well position={PLACE.well} />
    {/* green things a creeper would plant: cactus in pots, and a lot of moss */}
    {([[-3.2, -1.5], [3.3, 3.6], [-3.1, 15.2], [3.2, 12.4], [-6.2, -9.2], [7.6, -1.4]] as Array<[number, number]>).map(([x, z], i) => (
      <group key={`c${i}`} position={[x, 0, z]}>
        <Block position={[0, 0.16, 0]} size={[0.5, 0.32, 0.5]} color="#a5583a" />
        <Block position={[0, 0.72, 0]} size={[0.32, 0.8, 0.32]} color="#3f8f36" />
        <Block position={[0.22, 0.75, 0]} size={[0.14, 0.34, 0.2]} color="#4aa53f" />
      </group>
    ))}
    {Array.from({ length: 46 }, (_, i) => {
      const s = i % 2 ? 1 : -1;
      const x = s * (2.4 + ((i * 37) % 55) / 10);
      const z = -12 + ((i * 53) % 330) / 10;
      const c = ["#f2d24a", "#ffffff", "#e8566a", "#b06ad8"][i % 4];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    {[-1, 1].map((s) =>
      [-10, 0.5, 11.5, 22].map((z) => <Torch key={`${s}${z}`} position={[s * 2.3, 0, z]} light={night ? 1.4 : 0} seed={z + s} />),
    )}
    {night ? null : <GodRay position={[-5, 7, 2]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.09 : 0.06} />}
    {night ? null : <GodRay position={[5, 7, -8]} rotation={[0, 0, 0.42]} width={5} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={0.05} />}
    <LightPool position={[0, 0.05, PLACE.square[2]]} width={11} depth={8} color={night ? "#a9c0ff" : "#fff2c0"} opacity={night ? 0.09 : 0.16} />
    <LightPool position={[0, 0.05, 10]} width={6} depth={20} color={night ? "#a9c0ff" : "#fff2c8"} opacity={night ? 0.07 : 0.1} />
    <Glow position={[0, 1.8, PLACE.square[2]]} size={2.4} color={night ? "#a9c0ff" : "#fff0c0"} opacity={0.16} />
    <Dust position={[0, 2.2, 3]} area={[26, 4, 34]} count={70} size={0.045} color={night ? "#cfe0ff" : "#fff7d8"} opacity={0.55} seed={3} speed={0.2} />
    {ring(64, 36, 72, 3).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />
    ))}
    {([[-17, -12], [-15.5, 26], [17, -15], [16, 24], [-12, -22], [12, -24], [-27, 7], [27, 6]] as Array<[number, number]>).map(([x, z], i) => (
      <Tree key={`t${i}`} position={[x, 0, z]} height={4 + (i % 3) * 0.5} spread={0.85} />
    ))}
    {night ? <Moon position={[-30, 62, -95]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  return (
    <>
      {/* the engine's night key comes from the north; this moon lights the side the lens is on */}
      {night ? <directionalLight color="#a9c0ff" intensity={1.0} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#7088d0" intensity={0.34} /> : null}
      <Zone name="town">
        <Town night={night} warm={look === "overworld-sunset"} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={false} />
      </Zone>
    </>
  );
};
