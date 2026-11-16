import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { ForestEdge, Moon, Stars } from "../../../Topics/InThisTown";
import { PLACE, TownParts } from "./kit";

/**
 * One spot, and what is round it.
 *
 *   meadow  The spot before there was a town: grass, the path south into the forest, woods all round. The dog and
 *           what his owner left are drawn by the scenes (kit.tsx, `Camp`), and so is a town that is still being built.
 *   town    The same ground with the town on it: nine houses, a bell, a well, lamps. North, east and west of the dog;
 *           the south is open, because that is where he is looking.
 *   deep    Somewhere a player might not come back from: a room of stone brick with a black square in the floor.
 *           Two shots.
 *
 * Night, rain and sunset are the shot's `look`.
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.sin(a) * r, Math.cos(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

const Ground: React.FC<{ night: boolean; warm: boolean; town: boolean }> = ({ night, warm, town }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the path his owner took: from the spot, south, into the trees */}
    <Vox kind="path" position={[0, 0.02, 22]} size={[2.4, 0.06, 38]} />
    {town ? (
      <>
        <Vox kind="path" position={[0, 0.021, -4.5]} size={[17, 0.06, 4]} />
        <Vox kind="path" position={[0, 0.022, -11]} size={[3, 0.06, 9]} />
        <Vox kind="path" position={[-7.6, 0.021, 3]} size={[2.6, 0.06, 19]} />
        <Vox kind="path" position={[7.6, 0.021, 3]} size={[2.6, 0.06, 19]} />
      </>
    ) : null}
    {/* the oak whose shade the creeper waits in */}
    <Tree position={[PLACE.shade[0] - 0.9, 0, PLACE.shade[2] - 0.6]} height={4.2} spread={1.1} />
    <Block position={[PLACE.shade[0], 0.03, PLACE.shade[2]]} size={[4.4, 0.02, 4.4]} color="#1e3a1a" opacity={night ? 0 : 0.45} transparent castShadow={false} />
    {/* flowers, thick round the spot: nobody has walked here for a long time */}
    {Array.from({ length: 70 }, (_, i) => {
      const a = i * 2.399;
      const r = 1.3 + ((i * 53) % 100) / 7;
      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r;
      if (Math.abs(x) < 1.3 && z > 2.6) return null;
      const c = ["#f2d24a", "#ffffff", "#e8566a", "#6a9be8"][i % 4];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    {/* the forest: a wall of pines across the south, and woods all round */}
    <ForestEdge from={[-46, 0, PLACE.forest[2]]} to={[-2.6, 0, PLACE.forest[2]]} back={[0, 0, 1]} depth={12} count={42} seed={3} />
    <ForestEdge from={[2.6, 0, PLACE.forest[2]]} to={[46, 0, PLACE.forest[2]]} back={[0, 0, 1]} depth={12} count={42} seed={5} />
    {ring(70, 30, 62, 3).map(([x, z, h], i) =>
      z > 10 ? null : <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />,
    )}
    {night ? null : <GodRay position={[-4, 7, 1]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.11 : 0.06} />}
    {night ? null : <GodRay position={[3.5, 7, -6]} rotation={[0, 0, 0.42]} width={5} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={0.05} />}
    <LightPool position={[0, 0.05, 0]} width={8} depth={8} color={night ? "#ffcf8a" : "#fff2c0"} opacity={night ? 0.26 : 0.16} />
    <Glow position={[0, 1.4, 0]} size={2.6} color={night ? "#ffcf8a" : "#fff0c0"} opacity={night ? 0.2 : 0.12} />
    <Dust position={[0, 2.2, 1]} area={[20, 4, 22]} count={70} size={0.045} color={night ? "#ffe6c0" : "#fff7d8"} opacity={0.55} seed={3} speed={0.2} />
    {night ? <Moon position={[-16, 58, -90]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

const Deep: React.FC = () => (
  <group position={PLACE.deep}>
    <Vox kind="stone" tint="#55585c" position={[0, -0.5, 0]} size={[30, 1, 30]} />
    <Vox kind="stone" tint="#3f4246" position={[0, 5, -7]} size={[30, 12, 1]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="stone" tint="#36393d" position={[s * 6.5, 5, 0]} size={[1, 12, 30]} />
    ))}
    {/* the square in the floor, and its frame */}
    <Block position={[0, 0.04, -2]} size={[3, 0.04, 3]} color="#050810" emissive="#0c3a34" emissiveIntensity={0.9} castShadow={false} />
    {Array.from({ length: 26 }, (_, i) => (
      <Block key={i} position={[-1.3 + ((i * 37) % 27) / 10, 0.07, -3.3 + ((i * 53) % 27) / 10]} size={[0.07, 0.01, 0.07]} color="#7fe0b0" emissive="#7fe0b0" emissiveIntensity={2} castShadow={false} />
    ))}
    {([[-1, -4], [0, -4], [1, -4], [-1, 0], [0, 0], [1, 0], [-2, -3], [-2, -2], [-2, -1], [2, -3], [2, -2], [2, -1]] as Array<[number, number]>).map(([x, z], i) => (
      <group key={i} position={[x, 0.3, z]}>
        <Block size={[0.98, 0.6, 0.98]} color="#d6d4a0" />
        <Block position={[0, 0.31, 0]} size={[0.7, 0.04, 0.7]} color="#3f7a66" castShadow={false} />
        <Block position={[0, 0.36, 0]} size={[0.4, 0.1, 0.4]} color="#1f6a52" emissive="#7fe0b0" emissiveIntensity={0.6} castShadow={false} />
      </group>
    ))}
    <pointLight position={[0, 1.6, -2]} color="#7fe0b0" intensity={16} distance={12} decay={2} />
    <pointLight position={[0, 3, 4]} color="#ffd9a8" intensity={7} distance={12} decay={2} />
    <Glow position={[0, 0.8, -2]} size={4.5} color="#3fd0a0" opacity={0.3} />
    <LightPool position={[0, 0.06, 1.6]} width={5} depth={4} color="#bfffe0" opacity={0.12} />
    <Dust position={[0, 2, -1]} area={[8, 4, 8]} count={40} size={0.05} color="#9ff0c8" opacity={0.6} seed={8} speed={0.25} />
    <GodRay position={[0, 4, -2]} rotation={[0, 0, 0]} width={3} height={8} color="#7fe0b0" opacity={0.07} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const zone = active?.shot.zone ?? "town";
  const night = look === "overworld-night";
  return (
    <>
      {/* the engine's night key comes from the north; this moon lights the side the lens is on */}
      {night && zone !== "deep" ? <directionalLight color="#b9c4ff" intensity={1.1} position={[-5, 9, 12]} /> : null}
      {night && zone !== "deep" ? <ambientLight color="#8088e0" intensity={0.4} /> : null}
      <Zone name="meadow" with={["town"]}>
        <Ground night={night} warm={look === "overworld-sunset"} town={zone === "town"} />
      </Zone>
      <Zone name="town">
        <TownParts lit={night} />
      </Zone>
      <Zone name="deep">
        <Deep />
      </Zone>
    </>
  );
};
