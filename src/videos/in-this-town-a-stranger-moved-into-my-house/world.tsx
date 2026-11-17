import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { ForestEdge, Hut, Moon, Stars } from "../../../Topics/InThisTown";
import { Houses, PLACE, WellAt } from "./kit";

/**
 * Where it happens.
 *
 *   field   The ground the town stands on, with nothing built: grass, the paths, the woods to the south. One shot
 *           (the stranger building the first house) and everything the town zone adds to.
 *   town    The same ground with the seven houses and the well. The bell, the hole, the wheat, the torches and the
 *           wall change during the film, so the scenes draw them (kit.tsx, `Town`).
 *   room    His room, drawn by the scenes (`MyRoom`): this zone is only the grass it stands on.
 *   wild    Where he was before the boat: open grass, dead trees, and a burnt hut.
 *
 * Night and sunset are the shot's `look`.
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.sin(a) * r, Math.cos(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

const Sky: React.FC<{ night: boolean }> = ({ night }) => (
  <>
    {night ? <Moon position={[-16, 58, -90]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </>
);

const Ground: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the square, the road to the gate, and the road out into the woods */}
    <Vox kind="path" position={[0, 0.02, 0]} size={[7, 0.06, 13]} />
    <Vox kind="path" position={[0, 0.021, -8]} size={[15, 0.06, 3.4]} />
    <Vox kind="path" position={[0, 0.022, 20]} size={[2.6, 0.06, 30]} />
    <Vox kind="path" position={[8, 0.021, 0.5]} size={[9, 0.06, 2.6]} />
    <Vox kind="path" position={[-9.2, 0.021, 5.4]} size={[2.4, 0.06, 2.6]} />
    {/* the wheat's soil */}
    <Vox kind="dirt" position={[PLACE.field[0], 0.03, PLACE.field[2]]} size={[5, 0.06, 5]} />
    {Array.from({ length: 46 }, (_, i) => {
      const a = i * 2.399;
      const r = 4.5 + ((i * 53) % 100) / 8;
      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r;
      if (Math.abs(x) < 3.6 || (Math.abs(x + 5.8) < 2.8 && Math.abs(z - 1.2) < 2.8)) return null;
      const c = ["#f2d24a", "#ffffff", "#e8566a", "#6a9be8"][i % 4];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    <ForestEdge from={[-46, 0, PLACE.woods[2]]} to={[-2.8, 0, PLACE.woods[2]]} back={[0, 0, 1]} depth={12} count={42} seed={3} />
    <ForestEdge from={[2.8, 0, PLACE.woods[2]]} to={[46, 0, PLACE.woods[2]]} back={[0, 0, 1]} depth={12} count={42} seed={5} />
    {ring(64, 30, 60, 3).map(([x, z, h], i) =>
      z > 14 ? null : <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />,
    )}
    {night ? null : <GodRay position={[-4, 7, 1]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.1 : 0.05} />}
    <LightPool position={[0, 0.05, 1]} width={10} depth={10} color={night ? "#ffcf8a" : "#fff2c0"} opacity={night ? 0.2 : 0.12} />
    <Glow position={[0, 1.6, -5.5]} size={3} color={night ? "#ffcf8a" : "#fff0c0"} opacity={night ? 0.16 : 0.08} />
    <Dust position={[0, 2.2, 1]} area={[20, 4, 22]} count={60} size={0.045} color={night ? "#ffe6c0" : "#fff7d8"} opacity={0.5} seed={3} speed={0.2} />
    <Sky night={night} />
  </group>
);

const RoomGround: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    <Vox kind="grass" position={[0, -0.6, 0]} size={[200, 1, 200]} />
    {ring(30, 18, 40, 7).map(([x, z, h], i) => (z > 4 ? null : <Tree key={i} position={[x, 0, z]} height={h + 1} />))}
    <LightPool position={[0, 0.02, 0.4]} width={4} depth={4} color="#fff2c0" opacity={night ? 0.2 : 0.12} />
    <Sky night={night} />
  </group>
);

const Wild: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    <Vox kind="grass" tint="#6f8f4a" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the hut he was found in */}
    <Hut at={[0, 0, -7]} w={5} h={3.5} burnt />
    {ring(26, 14, 44, 9).map(([x, z, h], i) =>
      Math.abs(x) < 5 && z > -4 ? null : (
        <group key={i} position={[x, 0, z]}>
          <Vox kind="log" position={[0, h * 0.35, 0]} size={[0.5, h * 0.7, 0.5]} />
          <Vox kind="log" position={[0.5, h * 0.55, 0]} size={[0.9, 0.24, 0.24]} />
          <Vox kind="log" position={[-0.4, h * 0.45, 0.1]} size={[0.7, 0.2, 0.2]} />
        </group>
      ),
    )}
    {ring(22, 26, 60, 4).map(([x, z, h], i) => (
      <Tree key={`t${i}`} position={[x, 0, z]} height={h + 1} leaf="#4f7a34" />
    ))}
    <LightPool position={[0, 0.05, 0]} width={9} depth={9} color={night ? "#b9c4ff" : "#ffe0b0"} opacity={0.14} />
    <Dust position={[0, 2, 0]} area={[16, 4, 16]} count={40} size={0.05} color="#fff0d0" opacity={0.5} seed={11} speed={0.2} />
    <Sky night={night} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  return (
    <>
      {night ? <directionalLight color="#b9c4ff" intensity={1.1} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#8088e0" intensity={0.4} /> : null}
      <Zone name="field" with={["town"]}>
        <Ground night={night} warm={look === "overworld-sunset"} />
      </Zone>
      <Zone name="town">
        <Houses lit={night} />
        <WellAt />
      </Zone>
      <Zone name="room">
        <RoomGround night={night} />
      </Zone>
      <Zone name="wild">
        <Wild night={night} />
      </Zone>
    </>
  );
};
