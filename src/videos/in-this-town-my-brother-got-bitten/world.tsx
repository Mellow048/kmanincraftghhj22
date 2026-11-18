import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { ForestEdge, Hut, Moon, Stars } from "../../../Topics/InThisTown";
import { PLACE, WALL } from "./kit";

/**
 * Where it happens.
 *
 *   town    The ground, the roads, the other houses, the woods beyond the wall. Our house, the old lady's, the stall, the wall and its
 *           gate change (doors open, windows lit, the apple gone), so the scenes draw them (kit.tsx: `TownSet`).
 *   room    Our room, drawn by the scenes (`OurRoom`): this zone is only the dark round it.
 *   cellar  The room under the house, drawn by the scenes (`Cellar`): this zone is only the dark round it.
 *   woods   The road to the witch, at night.
 *
 * Night, sunset and day are the shot's `look`. The sky itself is the look's (src/engine/Look.tsx).
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.sin(a) * r, Math.cos(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

const Night: React.FC = () => (
  <>
    <Moon position={[-18, 46, -90]} radius={6} />
    <Stars center={[0, 0, 0]} />
  </>
);

const Town: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* the square, the street in front of the houses, the road to the gate and out into the woods */}
    <Vox kind="path" position={[0, 0.02, 0]} size={[6, 0.06, 9]} />
    <Vox kind="path" position={[0, 0.021, -4.2]} size={[26, 0.06, 2.8]} />
    <Vox kind="path" position={[0, 0.022, 16]} size={[2.8, 0.06, 26]} />
    {/* the other houses: west, and two with their backs to the usual lens */}
    <Hut at={[-13.5, 0, -6]} w={5.5} h={3.4} tint="#d8c49a" roof="#3d5f9a" windows={[-1.6, 1.6]} lit={night} />
    <Hut at={[14.5, 0, -6]} w={5} h={3.4} tint="#c8a878" roof="#3f6b3a" windows={[-1.5]} door={1.2} lit={night} />
    <Hut at={[-11, 0, 7]} w={5} h={3.4} wall="cobble" roof="#8a3b2a" windows={[-1.5, 1.5]} turn={Math.PI / 2} lit={night} />
    <Hut at={[13.5, 0, 8.5]} w={5} h={3.4} tint="#d8c49a" roof="#5a4a6a" windows={[-1.5, 1.5]} turn={-Math.PI / 2} lit={night} />
    {Array.from({ length: 40 }, (_, i) => {
      const a = i * 2.399;
      const r = 4 + ((i * 53) % 100) / 7;
      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r;
      if (Math.abs(x) < 3.2 || z < -3 || (Math.abs(x - PLACE.field[0]) < 4 && Math.abs(z - PLACE.field[2]) < 3.6)) return null;
      const c = ["#f2d24a", "#ffffff", "#e8566a", "#6a9be8"][i % 4];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    <ForestEdge from={[-46, 0, WALL.z + 13]} to={[-2.6, 0, WALL.z + 13]} back={[0, 0, 1]} depth={12} count={40} seed={3} />
    <ForestEdge from={[2.6, 0, WALL.z + 13]} to={[46, 0, WALL.z + 13]} back={[0, 0, 1]} depth={12} count={40} seed={5} />
    {ring(60, 26, 58, 3).map(([x, z, h], i) => (z > 10 ? null : <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />))}
    {night ? null : <GodRay position={[-4, 7, 1]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.1 : 0.05} />}
    <LightPool position={[0, 0.05, 0]} width={10} depth={10} color={night ? "#ffcf8a" : "#fff2c0"} opacity={night ? 0.16 : 0.1} />
    <Dust position={[0, 2.2, 1]} area={[20, 4, 22]} count={50} size={0.045} color={night ? "#ffe6c0" : "#fff7d8"} opacity={0.5} seed={3} speed={0.2} />
    {night ? <Night /> : null}
  </group>
);

const Woods: React.FC = () => (
  <group>
    <Vox kind="grass" tint="#4f6f3a" position={[0, -0.5, 0]} size={[300, 1, 300]} />
    <Vox kind="path" position={[0, 0.02, -10]} size={[2.4, 0.06, 60]} />
    <ForestEdge from={[-2.6, 0, 8]} to={[-2.6, 0, -40]} back={[-1, 0, 0]} depth={14} count={46} seed={2} />
    <ForestEdge from={[2.6, 0, 8]} to={[2.6, 0, -40]} back={[1, 0, 0]} depth={14} count={46} seed={7} />
    {/* the witch's hut, far up the road: one purple window */}
    <Hut at={[0, 0, -30]} w={4} h={3} wall="darkPlanks" roof="#3a2a4a" windows={[1.1]} door={-0.9} />
    <Block position={[1.1, 1.75, -29.94]} size={[0.8, 0.8, 0.04]} color="#b070ff" emissive="#b070ff" emissiveIntensity={1.6} castShadow={false} />
    <Glow position={[1.1, 1.75, -29.6]} size={5} color="#b070ff" opacity={0.4} />
    <Dust position={[0, 1.6, -4]} area={[8, 3, 16]} count={40} size={0.04} color="#cfe0ff" opacity={0.5} seed={5} speed={0.2} />
    <Night />
  </group>
);

/** Under a roof there is no sky: a dark box far outside the set, so nothing of the look's sky shows through a gap. */
const Dark: React.FC<{ color?: string }> = ({ color = "#07060a" }) => (
  <mesh>
    <boxGeometry args={[70, 50, 70]} />
    <meshBasicMaterial color={color} side={1} fog={false} />
  </mesh>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night";
  return (
    <>
      <Zone name="town">
        <Town night={night} warm={look === "overworld-sunset"} />
      </Zone>
      <Zone name="room">
        <Dark color="#0b0a10" />
      </Zone>
      <Zone name="cellar">
        <Dark />
      </Zone>
      <Zone name="woods">
        <Woods />
      </Zone>
    </>
  );
};
