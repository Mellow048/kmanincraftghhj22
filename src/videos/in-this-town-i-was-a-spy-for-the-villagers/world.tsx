import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, Moon, Stars, WatchTower, Well, Stall } from "../../../Topics/InThisTown";
import { Campfire, GATE_Z, PLACE, TOWER, WashLine } from "./kit";

/**
 * The places of the spy film.
 *
 *   town     The square: the bell in the middle, houses on both sides, the well, woods all round.
 *   outpost  The pillagers' camp in a clearing: a watch tower (front to +Z), a log wall with a gate to the south,
 *            the campfire and its ash, the washing line, a wall that stands by itself, the ravager's pen, tents.
 *   march    The dark fields between the two, with the lights of the town far off to the east.
 *
 * People, the gate's leaves, fire and rain are drawn by the scenes: they move.
 */

const ring = (n: number, r0: number, r1: number, seed: number, skip?: (x: number, z: number) => boolean) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.cos(a) * r, Math.sin(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  }).filter(([x, z]) => !skip?.(x, z));

const Town: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.town}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[70, 0.06, 4.4]} />
    <Vox kind="path" position={[0, 0.021, 1]} size={[12, 0.06, 11]} />
    <Bell position={[0, 0, -1.6]} />
    <Well position={[7.5, 0, 4.5]} />
    <Stall position={[-7.5, 0, 5]} />
    {night ? null : <GodRay position={[-4, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />}
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color={night ? "#ffd9a0" : "#fff2c8"} opacity={night ? 0.1 : 0.14} />
    <Glow position={[0, 2.3, -1.6]} size={1.5} color="#ffe08a" opacity={night ? 0.2 : 0.3} />
    <Dust position={[0, 2.2, 2]} area={[30, 4, 14]} count={60} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
    <Hut at={[-20, 0, -8]} w={7} windows={[-2, 2]} roof="#3f6b3a" lit={night} />
    <Hut at={[-10, 0, -9]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-1.8, 1.8]} lit={night} />
    <Hut at={[0, 0, -11]} w={9} d={6} h={4.6} roof="#8a3b2a" windows={[-3, 3]} lit={night} />
    <Hut at={[11, 0, -9]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} lit={night} />
    <Hut at={[21, 0, -8]} w={6} h={3.6} tint="#caa268" roof="#4a6a3a" lit={night} />
    <Hut at={[-14, 0, 12]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} lit={night} />
    <Hut at={[1, 0, 13]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} lit={night} />
    <Hut at={[15, 0, 12]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} lit={night} />
    {ring(46, 30, 62, 3).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#3f7f2d" : "#356430"} />
    ))}
    {([[-4.5, -5], [4.6, -5.5], [-16, 3.5], [17, 5], [-3, 8.5], [9, 8]] as Array<[number, number]>).map(([x, z], i) => (
      <Tree key={`t${i}`} position={[x, 0, z]} height={3.8 + (i % 3) * 0.5} spread={0.8} />
    ))}
    <Clouds y={46} center={[0, 0, 0]} />
  </group>
);

const WALL = 15;
const Outpost: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.outpost}>
    <Vox kind="grass" tint="#5f8a4a" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[26, 0.06, 22]} />
    <Vox kind="path" position={[0, 0.021, 34]} size={[4, 0.06, 40]} />
    <WatchTower position={TOWER} height={10} lamps={night} />
    {/* the log wall: every side but the gap of the gate */}
    {Array.from({ length: 60 }, (_, i) => {
      const k = i % 15;
      const side = Math.floor(i / 15);
      const u = -WALL + 1 + k * 2;
      const h = 3.1 + ((i * 7) % 3) * 0.25;
      if (side === 0 && Math.abs(u) < 2.2) return null;
      const p: [number, number, number] = side === 0 ? [u, h / 2, GATE_Z] : side === 1 ? [u, h / 2, -WALL] : side === 2 ? [-WALL, h / 2, u] : [WALL, h / 2, u];
      return <Vox key={i} kind="log" position={p} size={side < 2 ? [2, h, 0.5] : [0.5, h, 2]} />;
    })}
    {[-2.5, 2.5].map((x) => (
      <group key={x}>
        <Vox kind="log" position={[x, 2.1, GATE_Z]} size={[0.6, 4.2, 0.6]} />
        <Torch position={[x, 4.25, GATE_Z + 0.2]} light={night ? 1.2 : 0} seed={x} />
      </group>
    ))}
    <Vox kind="log" position={[0, 4.0, GATE_Z]} size={[5.6, 0.4, 0.5]} />
    <Vox kind="wool" tint="#b0302a" position={[0, 3.45, GATE_Z + 0.3]} size={[1.0, 0.9, 0.05]} />
    <Campfire position={[-7, 0, 4]} />
    <LightPool position={[-7, 0.06, 4]} width={6} depth={6} color="#ffb060" opacity={night ? 0.2 : 0.06} />
    <Glow position={[-7, 0.7, 4]} size={1.4} color="#ffb060" opacity={night ? 0.4 : 0.15} />
    {night ? null : <GodRay position={[5, 7, 2]} rotation={[0, 0, -0.45]} width={6} height={14} color="#fff0c8" opacity={0.05} />}
    <Dust position={[0, 2, 3]} area={[26, 4, 22]} count={60} size={0.045} color={night ? "#ffd9a0" : "#fff7d8"} opacity={0.5} seed={5} speed={0.2} />
    <WashLine position={[8, 0, 3]} taken />
    {/* a piece of wall that holds nothing up */}
    <Vox kind="cobble" position={[-10, 1.3, -5]} size={[0.6, 2.6, 3.4]} />
    {/* the ravager's pen */}
    {[0, 1, 2, 3].map((q) => (
      <group key={q} position={[9, 0, -8]} rotation={[0, (q * Math.PI) / 2, 0]}>
        {q === 3 ? null : <Vox kind="log" position={[0, 0.9, 2.8]} size={[5.6, 0.18, 0.18]} />}
        {q === 3 ? null : <Vox kind="log" position={[0, 0.45, 2.8]} size={[5.6, 0.14, 0.14]} />}
        <Vox kind="log" position={[2.8, 0.6, 2.8]} size={[0.28, 1.2, 0.28]} />
      </group>
    ))}
    {/* tents, crates, a kitchen under a roof */}
    {([[10.5, 9, "#4a3a30"], [-10.5, 9.5, "#3d3a40"], [-11, -10, "#52423a"]] as Array<[number, number, string]>).map(([x, z, c], i) => (
      <group key={i} position={[x, 0, z]}>
        <Vox kind="wool" tint={c} position={[0, 0.7, 0]} size={[2.6, 1.4, 2.8]} />
        <Vox kind="wool" tint={c} position={[0, 1.65, 0]} size={[1.5, 0.6, 2.8]} />
        <Vox kind="wool" tint="#15110f" position={[0, 0.6, 1.41]} size={[0.8, 1.2, 0.03]} />
      </group>
    ))}
    <Stall position={[-3, 0, 10.5]} />
    {([[4, 10.8], [4.9, 10.6], [4.4, 11.6], [12, -2]] as Array<[number, number]>).map(([x, z], i) => (
      <Vox key={`c${i}`} kind="planks" position={[x, 0.4, z]} size={[0.8, 0.8, 0.8]} />
    ))}
    {[[-13, 13], [13, 13], [-13, -13], [13, -13], [-6, 6.5], [6, -1]].map(([x, z], i) => (
      <Torch key={`to${i}`} position={[x, i < 4 ? 3.6 : 0, z]} light={night && i > 3 ? 1.4 : 0} seed={i + 3} />
    ))}
    {ring(70, 22, 58, 5, (x, z) => Math.abs(x) < 4 && z > 0).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 1.5} leaf={i % 2 ? "#2c5a22" : "#27501e"} spread={1.15} />
    ))}
    {night ? <Moon position={[-40, 60, -90]} radius={7} /> : <Clouds y={50} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

const March: React.FC = () => (
  <group position={PLACE.march}>
    <Vox kind="grass" tint="#4f7a45" position={[0, -0.5, 0]} size={[500, 1, 500]} />
    {ring(60, 44, 90, 8, (x) => x > 30).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#2c5a22" : "#27501e"} />
    ))}
    {([[-9, -7], [12, 9], [-15, 12], [6, -14], [22, -6], [-24, -3], [-4, 17]] as Array<[number, number]>).map(([x, z], i) => (
      <Vox key={`r${i}`} kind="cobble" position={[x, 0.25, z]} size={[0.9 + (i % 3) * 0.4, 0.5, 0.8]} />
    ))}
    {/* the town, far off to the east: every window dark but a few, and one of them brighter */}
    {Array.from({ length: 9 }, (_, i) => (
      <Hut key={`h${i}`} at={[78 + (i % 3) * 9, 0, -26 + i * 6.5]} w={6} h={3.6} roof={i % 2 ? "#8a3b2a" : "#3d5f9a"} windows={[-1.6, 1.6]} turn={-Math.PI / 2} lit={i % 2 === 0} />
    ))}
    <Vox kind="wool" tint="#ffd98a" position={[74.8, 1.6, 0.4]} size={[0.1, 1.1, 1.1]} />
    <Glow position={[74.6, 1.6, 0.4]} size={3} color="#ffd98a" opacity={0.35} />
    <Dust position={[0, 1.4, 0]} area={[40, 2.6, 30]} count={50} size={0.06} color="#e8f08a" opacity={0.8} seed={11} speed={0.3} />
    <Moon position={[30, 70, -120]} radius={8} />
    <Stars center={[0, 0, 0]} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night" || look === "forest-night";
  return (
    <>
      {/* the engine's night key comes from the north; the moon here lights the side the lens is on */}
      {night ? <directionalLight color="#a9c0ff" intensity={0.95} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#7088d0" intensity={0.3} /> : null}
      <Zone name="town">
        <Town night={night} />
      </Zone>
      <Zone name="outpost">
        <Outpost night={night} />
      </Zone>
      <Zone name="march">
        <March />
      </Zone>
    </>
  );
};
