import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Zone, useActiveShot } from "../../engine";
import { Hut, Moon, Stall, Stars, Well } from "../../../Topics/InThisTown";
import { Bone, Fish, LINE_N, LINE_S, WELL } from "./kit";

/**
 * The one place of this film: a village that is two villages.
 *
 *   village  The line runs north to south along x = 0, and the well stands on it. West of it (-X) the cats: warm
 *            roofs with ears on them, a fish stall, balls of wool. East of it the dogs: blue roofs with a bone over
 *            every door, a bone stall, bowls. Woods all round.
 *
 * The line itself, the people, the golems and the weather are drawn by the scenes: they move, and the line goes.
 */

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.cos(a) * r, Math.sin(a) * r, 4.6 + ((i * 7 + seed) % 5) * 0.8] as [number, number, number];
  });

/** A house of one side. Its door faces the line. */
const House: React.FC<{ cat: boolean; x: number; z: number; w?: number; h?: number; roof: string; tint?: string; cobble?: boolean; lit: boolean }> = ({ cat, x, z, w = 6, h = 3.8, roof, tint, cobble = false, lit }) => {
  const top = h + 0.55 + (Math.ceil((w + 1) / 1.8) - 1) * 0.6 + 0.3;
  return (
    <group position={[x, 0, z]} rotation={[0, cat ? Math.PI / 2 : -Math.PI / 2, 0]}>
      <Hut at={[0, 0, 0]} w={w} h={h} wall={cobble ? "cobble" : "planks"} tint={tint} roof={roof} windows={[-1.8, 1.8]} lit={lit} />
      {cat ? (
        [-1, 1].map((s) => (
          <group key={s} position={[s * 1.25, top - 0.5, -0.9]}>
            <Vox kind="darkPlanks" tint={roof} position={[0, 0.45, 0]} size={[1.3, 0.9, 0.9]} />
            <Vox kind="darkPlanks" tint={roof} position={[0, 1.2, 0]} size={[0.7, 0.6, 0.8]} />
            <Block position={[0, 0.5, 0.46]} size={[0.6, 0.55, 0.02]} color="#ee93a8" castShadow={false} />
          </group>
        ))
      ) : (
        <group position={[0, h - 0.75, 0.36]}>
          <Vox kind="planks" tint="#3b2c1c" size={[2.3, 0.9, 0.08]} />
          <Bone position={[0, 0, 0.07]} scale={5} />
        </group>
      )}
    </group>
  );
};

const CAT_ROOFS = ["#a8412e", "#c9762a", "#b05a6e", "#8a3b2a", "#c08a2e", "#a04a34"];
const DOG_ROOFS = ["#2f5f9a", "#2f7f7a", "#4a4f9a", "#3a6fa8", "#2f6a5a", "#44608a"];
const HOUSES: Array<[number, number, number, number]> = [
  [9.6, -14, 6, 3.8],
  [10, -3.5, 7, 4.4],
  [9.6, 7.5, 6, 3.6],
  [10.2, 18, 6.5, 4],
  [20, -9, 6, 3.6],
  [21, 3, 7, 4.2],
  [20, 14, 6, 3.8],
];

const Village: React.FC<{ night: boolean; warm: boolean }> = ({ night, warm }) => (
  <group>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[400, 1, 400]} />
    {/* where the line stands the grass has never seen the sun */}
    <Block position={[0, 0.012, (LINE_N + LINE_S) / 2]} size={[0.5, 0.02, LINE_S - LINE_N]} color="#7fb552" castShadow={false} />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="path" position={[s * 7.6, 0.02, 2]} size={[2.4, 0.06, 44]} />
        {[-14, -3.5, 7.5, 18].map((z) => (
          <Vox key={z} kind="path" position={[s * 9.2, 0.021, z + (s < 0 ? 3 : -3)]} size={[1.2, 0.06, 1.6]} />
        ))}
      </group>
    ))}
    {HOUSES.map(([x, z, w, h], i) => (
      <group key={i}>
        <House cat x={-x} z={z + 3} w={w} h={h} roof={CAT_ROOFS[i % 6]} tint={i % 2 ? "#d8c49a" : "#caa268"} cobble={i === 4} lit={night} />
        <House cat={false} x={x} z={z - 3} w={w} h={h} roof={DOG_ROOFS[i % 6]} tint={i % 2 ? "#c9c2b0" : "#b9a78a"} cobble={i === 5} lit={night} />
      </group>
    ))}
    <Well position={WELL} />
    {/* the line goes over the roof of the well too */}
    <Vox kind="wool" tint="#f7f5ee" position={[WELL[0], 3.23, WELL[2]]} size={[0.5, 0.08, 1.5]} />
    {/* the cats' side: a fish stall, balls of wool, flowers the colour of a cat */}
    <Stall position={[-5.2, 0, 16.5]} />
    {[-0.7, 0, 0.7].map((x, i) => (
      <Fish key={i} position={[-5.2 + x, 1.08, 16.6]} rotation={[-Math.PI / 2, 0, 0.3 * (i - 1)]} scale={1.3} />
    ))}
    {([[-4.6, -1.5, "#e8566a"], [-6.3, 9.2, "#f2c84a"], [-3.9, 14.1, "#b06ad8"], [-9.8, -6, "#e8566a"]] as Array<[number, number, string]>).map(([x, z, c], i) => (
      <group key={`y${i}`} position={[x, 0.2, z]}>
        <Vox kind="wool" tint={c} size={[0.4, 0.4, 0.4]} />
        <Block position={[0.3, -0.18, 0.1]} size={[0.5, 0.03, 0.03]} color={c} castShadow={false} />
      </group>
    ))}
    {/* the dogs' side: a bone stall, bowls, a ball */}
    <Stall position={[5.2, 0, 16.5]} />
    {[-0.7, 0, 0.7].map((x, i) => (
      <Bone key={i} position={[5.2 + x, 1.06, 16.6]} rotation={[0, 0.4 * (i - 1), 0]} scale={1.3} />
    ))}
    {([[4.4, -1.2], [6.5, 8.6], [9.6, -6.4]] as Array<[number, number]>).map(([x, z], i) => (
      <group key={`b${i}`} position={[x, 0, z]}>
        <Block position={[0, 0.09, 0]} size={[0.5, 0.18, 0.5]} color="#b0302a" />
        <Block position={[0, 0.185, 0]} size={[0.38, 0.02, 0.38]} color="#6a4a2e" castShadow={false} />
      </group>
    ))}
    <Vox kind="wool" tint="#3f8fd8" position={[4.1, 0.17, 13.4]} size={[0.34, 0.34, 0.34]} />
    {Array.from({ length: 44 }, (_, i) => {
      const s = i % 2 ? 1 : -1;
      const x = s * (2.6 + ((i * 37) % 60) / 10);
      const z = -13 + ((i * 53) % 290) / 10;
      const c = s < 0 ? ["#f2a23a", "#e8566a", "#f2d24a"][i % 3] : ["#5a8fe8", "#ffffff", "#7a6ad8"][i % 3];
      return (
        <group key={`f${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.1, 0]} size={[0.04, 0.2, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.23, 0]} size={[0.13, 0.1, 0.13]} color={c} castShadow={false} />
        </group>
      );
    })}
    {[-1, 1].map((s) =>
      [-10, 2, 13].map((z) => <Torch key={`${s}${z}`} position={[s * 6.0, 0, z]} light={night ? 1.3 : 0} seed={z + s} />),
    )}
    {night ? null : <GodRay position={[-5, 7, -2]} rotation={[0, 0, 0.5]} width={6} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.09 : 0.06} />}
    {night ? null : <GodRay position={[6, 7, 6]} rotation={[0, 0, 0.42]} width={5} height={14} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={0.05} />}
    {/* the sunny spot by the well */}
    <LightPool position={[1.4, 0.05, -5.4]} width={5} depth={4} color={night ? "#a9c0ff" : "#fff2c0"} opacity={night ? 0.08 : 0.2} />
    <LightPool position={[0, 0.05, 4]} width={9} depth={20} color={night ? "#a9c0ff" : "#fff2c8"} opacity={night ? 0.07 : 0.1} />
    <Glow position={[0, 1.6, WELL[2]]} size={2.2} color={night ? "#a9c0ff" : "#fff0c0"} opacity={0.18} />
    <Dust position={[0, 2.2, 3]} area={[26, 4, 30]} count={70} size={0.045} color={night ? "#cfe0ff" : "#fff7d8"} opacity={0.55} seed={3} speed={0.2} />
    {ring(64, 34, 70, 3).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 1} leaf={i % 2 ? "#3f7f2d" : "#356430"} />
    ))}
    {([[-17, -9], [-18.5, 12.5], [17, -12], [18, 9.5], [-9.5, 22], [9.5, -19]] as Array<[number, number]>).map(([x, z], i) => (
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
      <Zone name="village">
        <Village night={night} warm={look === "overworld-sunset"} />
      </Zone>
    </>
  );
};
