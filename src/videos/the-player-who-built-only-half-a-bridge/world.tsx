import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Water, Zone, plankTex, useActiveShot } from "../../engine";
import { DeskSetup, Hut, LampPost, PLACE, on } from "./kit";

/**
 * World for "The Player Who Built Only Half A Bridge":
 *   - `server`: West & East sunlit cliffs split by a deep 5.2m canyon river (`x: -2.6..+2.6`),
 *     with oak Spawn huts, trees, torches & lamp posts. Dynamic bridge states (`HalfBridge`,
 *     `CraterBridge`, `RebuiltBridge`), `ScoreboardWall`, `Sign`, and `OpeningChest` live per scene
 *     so they morph/explode cleanly without static duplicates.
 *   - `irl`: Toby's warm-lit bedroom with two desks (one glowing, Maya's weekend desk dark) at `x=0`,
 *     plus Maya's dark bedroom across town at `x=16`.
 */
export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-golden";
  const night = look === "overworld-night" || look === "lantern-night";

  return (
    <>
      <Zone name="server">
        {/* West Cliff (x: -22..-2.6, top at y=0) */}
        <Vox kind="grass" position={on(PLACE.server, -12.3, -0.5, 0)} size={[19.4, 1, 36]} />
        <Vox kind="stone" position={on(PLACE.server, -12.3, -6.5, 0)} size={[19.4, 11, 36]} tile={3} />
        <Vox kind="cobble" position={on(PLACE.server, -7.8, 0.02, 0)} size={[10.4, 0.06, 2.8]} />
        <Vox kind="cobble" position={on(PLACE.server, -9.5, 0.02, -5.5)} size={[10, 0.06, 9]} />

        {/* East Cliff (x: +2.6..+22, top at y=0) */}
        <Vox kind="grass" position={on(PLACE.server, 12.3, -0.5, 0)} size={[19.4, 1, 36]} />
        <Vox kind="stone" position={on(PLACE.server, 12.3, -6.5, 0)} size={[19.4, 11, 36]} tile={3} />
        <Vox kind="cobble" position={on(PLACE.server, 6.2, 0.02, 0)} size={[7.2, 0.06, 2.8]} />

        {/* Deep Canyon Floor + Flowing Blue River (y=-11) */}
        <Vox kind="stone" tint="#1c2029" position={on(PLACE.server, 0, -11.5, 0)} size={[9, 1, 40]} tile={2} />
        <Water position={on(PLACE.server, 0, -10.8, 0)} size={[6.4, 0.3, 38]} tint={night ? "#153d6e" : "#2876d4"} opacity={0.86} flowSpeed={[0.05, 0.22]} />

        {/* Spawn Town Cottages & Landmark Props */}
        <Hut at={on(PLACE.server, -11.5, 0, -7.0)} w={5.6} d={4.6} h={3.6} tint="#d8c49a" roof="#8a3b2a" door={1.2} windows={[-1.4]} lit={night} />
        <Hut at={on(PLACE.server, -5.8, 0, -8.5)} w={5.2} d={4.4} h={3.4} tint="#caa268" roof="#3d5f9a" door={-1.0} windows={[1.3]} lit={night} />
        <Hut at={on(PLACE.server, -12.0, 0, 7.2)} w={5.4} d={4.4} h={3.4} tint="#d8c49a" roof="#3f6b3a" windows={[-1.4, 1.4]} turn={Math.PI} lit={night} />
        <Hut at={on(PLACE.server, 8.6, 0, -5.8)} w={5.4} d={4.4} h={3.6} tint="#caa268" roof="#5a4a6a" door={-1.1} windows={[1.3]} lit={night} />

        {(
          [
            [-14.5, -2.5, 4.4],
            [-8.2, 6.4, 4.2],
            [-4.6, 8.2, 3.8],
            [6.4, 5.2, 4.3],
            [11.5, -2.8, 4.6],
            [12.0, 6.0, 4.1],
          ] as Array<[number, number, number]>
        ).map(([x, z, h], i) => (
          <Tree key={i} position={on(PLACE.server, x, 0, z)} height={h} leaf={i % 2 ? "#3f7f2d" : "#4d8e35"} />
        ))}

        {/* Warm bridge-head torches & spawn lamp posts (placed clear of Sign & ScoreboardWall lines of sight) */}
        <Torch position={on(PLACE.server, -2.9, 0, -2.1)} light={night ? 1.9 : 0.7} seed={1} />
        <Torch position={on(PLACE.server, -2.9, 0, 2.3)} light={night ? 1.9 : 0.7} seed={2} />
        <Torch position={on(PLACE.server, 2.9, 0, -2.1)} light={night ? 1.6 : 0.5} seed={3} />
        <Torch position={on(PLACE.server, 2.9, 0, 2.3)} light={night ? 1.6 : 0.5} seed={4} />
        <LampPost position={on(PLACE.server, -9.2, 0, -3.2)} seed={5} />
        <LampPost position={on(PLACE.server, -10.8, 0, 2.4)} seed={6} />
        <LampPost position={on(PLACE.server, 5.4, 0, -2.5)} seed={7} />

        {/* Lighting & Volumetric Atmosphere */}
        <GodRay position={on(PLACE.server, -2.0, 6.8, -1.2)} rotation={[0, 0, 0.28]} width={5.2} height={13} color={night ? "#8bb6ff" : "#fff1c8"} opacity={night ? 0.08 : 0.14} />
        <LightPool position={on(PLACE.server, -4.5, 0.06, 0)} width={8} depth={6} color={night ? "#ffcb7d" : "#fff4cf"} opacity={night ? 0.24 : 0.16} />
        <LightPool position={on(PLACE.server, 4.5, 0.06, 0)} width={6} depth={5} color={night ? "#ffd085" : "#fff4cf"} opacity={0.14} />
        <Glow position={on(PLACE.server, -2.6, 2.0, 0)} size={2.2} color={night ? "#ffd478" : "#fff0b8"} opacity={0.22} />
        <Dust position={on(PLACE.server, 0, 2.0, 0)} area={[16, 4.5, 12]} count={65} size={0.04} color={night ? "#ffdba0" : "#fff7d8"} opacity={0.55} seed={19} speed={0.18} />
        {night ? null : <Clouds y={42} center={[0, 0, 0]} />}
        <pointLight position={on(PLACE.server, -3.5, 4.2, 2.5)} color={night ? "#ffd89e" : "#fff5de"} intensity={night ? 4.8 : 6.0} distance={18} decay={1.5} />
      </Zone>

      <Zone name="irl">
        {/* Room A: Toby's Bedroom (`x = 0`, two desks side-by-side: glowing Toby + dark offline Maya) */}
        <Block position={on(PLACE.irl, 0, -0.2, 0)} size={[9.6, 0.4, 8.6]} map={plankTex("#6e4e32", [4, 4])} />
        <Block position={on(PLACE.irl, 0, 2.1, -3.4)} size={[9.6, 4.2, 0.4]} color="#232a38" />
        <Block position={on(PLACE.irl, -4.6, 2.1, 0)} size={[0.4, 4.2, 8.6]} color="#1d2330" />
        <Block position={on(PLACE.irl, 4.6, 2.1, 0)} size={[0.4, 4.2, 8.6]} color="#1d2330" />
        {/* Moonlit window on left wall */}
        <Block position={on(PLACE.irl, -3.2, 2.2, -3.18)} size={[1.6, 1.5, 0.08]} color="#9bc2ff" emissive="#7aaaff" emissiveIntensity={0.65} castShadow={false} />
        <GodRay position={on(PLACE.irl, -2.6, 2.2, -2.0)} rotation={[0.3, 0, -0.35]} width={1.8} height={4.4} color="#a9ccff" opacity={0.12} />

        <DeskSetup
          position={on(PLACE.irl, -1.25, 0, -1.55)}
          screenText="WAITING FOR MAYA"
          screenColor="#4be08a"
          clockText="4:15 PM"
          lampOn
        />
        <DeskSetup
          position={on(PLACE.irl, 1.55, 0, -1.55)}
          screenText="OFFLINE"
          screenColor="#1e2a3b"
          clockText="WEEKEND"
          lampOn={false}
        />
        <LightPool position={on(PLACE.irl, 0, 0.02, -0.5)} width={7.5} depth={5.5} color="#ffd796" opacity={0.16} />
        <pointLight position={on(PLACE.irl, -0.5, 3.0, 1.4)} color="#d9e8ff" intensity={5.0} distance={12} decay={2} />

        {/* Room B: Maya's Dark Bedroom Across Town (`x = 16`) */}
        <Block position={on(PLACE.irl, 16, -0.2, 0)} size={[8.6, 0.4, 8.6]} map={plankTex("#4e3a2c", [4, 4])} />
        <Block position={on(PLACE.irl, 16, 2.1, -3.4)} size={[8.6, 4.2, 0.4]} color="#161b26" />
        <Block position={on(PLACE.irl, 11.9, 2.1, 0)} size={[0.4, 4.2, 8.6]} color="#131822" />
        <Block position={on(PLACE.irl, 20.1, 2.1, 0)} size={[0.4, 4.2, 8.6]} color="#131822" />
        <Block position={on(PLACE.irl, 13.6, 2.2, -3.18)} size={[1.5, 1.4, 0.08]} color="#6f93cf" emissive="#4d73b8" emissiveIntensity={0.45} castShadow={false} />
        <DeskSetup
          position={on(PLACE.irl, 16.0, 0, -1.45)}
          screenText="NO SIGNAL"
          screenColor="#17202e"
          clockText="THU 7PM"
          lampOn={false}
        />
        <LightPool position={on(PLACE.irl, 16, 0.02, -0.4)} width={5.5} depth={5.0} color="#7ea6e8" opacity={0.14} />
        <pointLight position={on(PLACE.irl, 16.0, 3.0, 1.6)} color="#98b8f0" intensity={3.8} distance={10} decay={2} />
      </Zone>
    </>
  );
};
