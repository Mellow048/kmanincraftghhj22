import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Water, Zone, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hut, LampPost, PLACE, RICH_TERRACE, Rain, Stall, rich, room, top } from "./kit";

/**
 * Three places, and the lens never sees two of them at once.
 *
 *   bottom  The foot of the mountain: a wet lane of huts, a stall, a wooden jetty out into grey water,
 *           one boat with a hole in it, and a colossal Eiffel-scale mountain rising behind with the
 *           Rich Mansion high atop its sheer cliff terrace above the lower clouds.
 *   room    One bed, one shelf, one jar, enclosed with a ceiling. Its own zone, far from the water.
 *   top     The gate: stone wall seamless with <Gate>, toll counter, exterior stoop steps, and behind
 *           the gate an enriched upper-town street corridor of quartz townhouses, lamps, hedges & cobble.
 */

const GATE_X = PLACE.firstStep[0];

/** Lit arched window with a stepped gold frame. */
const ArchWindow: React.FC<{ x: number; y: number; z?: number; w?: number; h?: number; lit: boolean }> = ({
  x,
  y,
  z = -0.16,
  w = 1.15,
  h = 1.7,
  lit,
}) => (
  <group position={[x, y, z]}>
    <Block size={[w + 0.3, h + 0.3, 0.14]} color="#f2c438" />
    <Block position={[0, h / 2 + 0.22, 0]} size={[w * 0.64, 0.32, 0.14]} color="#f2c438" />
    <Block position={[0, h / 2 + 0.48, 0]} size={[w * 0.3, 0.26, 0.14]} color="#f2c438" />
    <Block position={[0, 0, 0.02]} size={[w + 0.1, h + 0.1, 0.08]} color="#8a5a12" castShadow={false} />
    <Block position={[0, 0, 0.05]} size={[w, h, 0.1]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={lit ? 0.9 : 0.65} castShadow={false} />
    <Block position={[0, 0, 0.11]} size={[0.07, h, 0.05]} color="#b8861a" castShadow={false} />
    <Block position={[0, h * 0.14, 0.11]} size={[w, 0.07, 0.05]} color="#b8861a" castShadow={false} />
    <Block position={[0, h / 2 - 0.14, 0.09]} size={[w, 0.18, 0.05]} color="#c98a2a" castShadow={false} />
  </group>
);

/** Three gold blocks and an emerald on the terrace: loose, spendable wealth at the kids' feet. */
const GoldStack: React.FC<{ x: number; z: number }> = ({ x, z }) => (
  <group position={[x, 0, z]}>
    {([[-0.4, 0.35], [0.4, 0.35], [0, 1.05]] as Array<[number, number]>).map(([dx, y], i) => (
      <Vox key={i} kind="cobble" tint="#f4c430" emissive="#c48a10" emissiveIntensity={0.28} position={[dx, y, 0]} size={[0.72, 0.7, 0.72]} />
    ))}
    <Block position={[0, 1.62, 0]} size={[0.5, 0.5, 0.5]} color="#2fd868" emissive="#1a8e42" emissiveIntensity={0.3} castShadow={false} />
  </group>
);

/**
 * Sunlit multi-storey Quartz & Gold palace crowning the high cliff terrace (y = 62m).
 */
const RichMansion: React.FC<{ position: Vec3; lit: boolean }> = ({ position, lit }) => (
  <group position={position}>
    {/* Marble terrace floor, royal-red carpet with gold borders */}
    <Vox kind="stoneBrick" tint="#f7f2e8" position={[0, -0.35, 1.6]} size={[18.4, 0.7, 6.8]} />
    <Vox kind="wool" tint="#a8262e" position={[0, 0.03, 2.2]} size={[3.2, 0.06, 5.0]} castShadow={false} />
    <Vox kind="wool" tint="#f0c83a" position={[-1.8, 0.04, 2.2]} size={[0.14, 0.07, 5.0]} castShadow={false} />
    <Vox kind="wool" tint="#f0c83a" position={[1.8, 0.04, 2.2]} size={[0.14, 0.07, 5.0]} castShadow={false} />
    {/* Low gold balustrade */}
    <Vox kind="wool" tint="#e8b828" position={[0, 0.6, 4.7]} size={[18.4, 0.14, 0.3]} />
    <Vox kind="wool" tint="#e8b828" position={[0, 0.26, 4.7]} size={[18.4, 0.12, 0.22]} />
    {[-8.8, -7.3, -5.8, -4.3, -2.8, -1.3, 1.3, 2.8, 4.3, 5.8, 7.3, 8.8].map((x) => (
      <Vox key={x} kind="wool" tint="#f0c83a" position={[x, 0.38, 4.7]} size={[0.15, 0.46, 0.38]} />
    ))}
    {[-8.8, 8.8].map((x) => (
      <group key={`post${x}`}>
        <Vox kind="wool" tint="#f2c438" position={[x, 0.85, 4.7]} size={[0.5, 1.1, 0.5]} />
        <Block position={[x, 1.5, 4.7]} size={[0.3, 0.3, 0.3]} color="#ffe08a" emissive="#ffcf6a" emissiveIntensity={1} castShadow={false} />
      </group>
    ))}
    {/* Central palace */}
    <Vox kind="stoneBrick" tint="#fbf7ee" position={[0, 3.8, -3.1]} size={[8.0, 7.9, 5.8]} />
    {[0.3, 2.35, 4.95, 7.45].map((y) => (
      <Vox key={y} kind="wool" tint="#f2c438" position={[0, y, -0.14]} size={[8.3, 0.22, 0.44]} />
    ))}
    {[-1.9, 1.9].map((x) => (
      <Vox key={`pil${x}`} kind="wool" tint="#f2c438" position={[x, 3.7, -0.16]} size={[0.24, 7.4, 0.4]} />
    ))}
    {/* Projecting entrance bay */}
    <Vox kind="stoneBrick" tint="#fdf9f0" position={[0, 1.35, 0.3]} size={[4.7, 2.7, 0.62]} />
    <Vox kind="wool" tint="#f2c438" position={[0, 2.78, 0.33]} size={[5.0, 0.26, 0.74]} />
    <Vox kind="wool" tint="#c9971a" position={[0, 2.63, 0.36]} size={[5.0, 0.08, 0.76]} />
    {[-2.2, 2.2].map((x) => (
      <Vox key={`baypil${x}`} kind="wool" tint="#f2c438" position={[x, 1.35, 0.58]} size={[0.26, 2.7, 0.26]} />
    ))}
    {/* Double doors */}
    <Vox kind="darkPlanks" tint="#5a3520" position={[0, 1.1, 0.62]} size={[2.5, 2.2, 0.18]} />
    {[-0.55, 0.55].map((x) => (
      <Block key={`pane${x}`} position={[x, 1.15, 0.73]} size={[0.95, 1.6, 0.06]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={lit ? 0.85 : 0.65} castShadow={false} />
    ))}
    <Block position={[0, 1.15, 0.77]} size={[0.12, 1.9, 0.1]} color="#f2c438" castShadow={false} />
    {[-0.22, 0.22].map((x) => (
      <Block key={`h${x}`} position={[x, 1.15, 0.79]} size={[0.08, 0.16, 0.08]} color="#f8d24c" castShadow={false} />
    ))}
    {[-1.55, 1.55].map((x) => (
      <group key={`sconce${x}`}>
        <Block position={[x, 2.15, 0.66]} size={[0.22, 0.42, 0.18]} color="#ffe08a" emissive="#ffcf6a" emissiveIntensity={1.1} castShadow={false} />
        <Block position={[x, 2.4, 0.64]} size={[0.3, 0.08, 0.22]} color="#b8861a" castShadow={false} />
        <Block position={[x, 1.9, 0.64]} size={[0.3, 0.08, 0.22]} color="#b8861a" castShadow={false} />
      </group>
    ))}
    <ArchWindow x={-1.35} y={3.7} lit={lit} />
    <ArchWindow x={1.35} y={3.7} lit={lit} />
    <ArchWindow x={-0.95} y={6.25} w={1.0} h={1.5} lit={lit} />
    <ArchWindow x={0.95} y={6.25} w={1.0} h={1.5} lit={lit} />
    {[-1.65, 1.65].map((x) => (
      <group key={`banner${x}`}>
        <Vox kind="wool" tint="#1c7a4e" position={[x, 6.2, -0.08]} size={[0.42, 1.5, 0.06]} castShadow={false} />
        <Vox kind="wool" tint="#ffd452" position={[x, 6.85, -0.05]} size={[0.5, 0.2, 0.08]} castShadow={false} />
      </group>
    ))}
    {/* Tiered emerald-teal roof with gold finial */}
    <Vox kind="wool" tint="#1f5e50" position={[0, 7.85, -3.1]} size={[9.4, 0.55, 7.0]} />
    <Vox kind="wool" tint="#267362" position={[0, 8.65, -3.1]} size={[7.0, 1.0, 5.2]} />
    <Vox kind="wool" tint="#2e8874" position={[0, 9.6, -3.1]} size={[4.2, 0.9, 3.4]} />
    <Vox kind="wool" tint="#f4c430" position={[0, 10.35, -3.1]} size={[1.0, 0.9, 1.0]} emissive="#f4c430" emissiveIntensity={0.35} />
    {/* Side pavilions */}
    {[-1, 1].map((s) => (
      <group key={`wing${s}`}>
        <Vox kind="stoneBrick" tint="#f7f3ea" position={[s * 7.2, 3.1, 0.4]} size={[5.4, 6.2, 5.0]} />
        <Vox kind="wool" tint="#f2c438" position={[s * 7.2, 6.15, 0.85]} size={[5.7, 0.3, 0.4]} />
        <Vox kind="wool" tint="#f2c438" position={[s * 7.2, 0.35, 0.85]} size={[5.7, 0.55, 0.4]} />
        <ArchWindow x={s * 7.2} y={3.0} z={2.86} w={1.5} h={1.9} lit={lit} />
        <Vox kind="wool" tint="#1f5e50" position={[s * 7.2, 6.55, 0.4]} size={[6.0, 0.6, 5.6]} />
        <Vox kind="wool" tint="#267362" position={[s * 7.2, 7.2, 0.4]} size={[3.8, 0.7, 3.8]} />
      </group>
    ))}
    <GoldStack x={-2.6} z={1.8} />
    <GoldStack x={2.6} z={1.8} />
    <Glow position={[0, 3.7, 1.2]} size={2.6} color="#ffe398" opacity={0.16} />
    <Glow position={[0, 6.25, 1.1]} size={2.2} color="#ffe398" opacity={0.11} />
  </group>
);

/**
 * Towering Eiffel-scale Minecraft mountain (`y = 0..116m` within `z = -36..-102`) with sheer cliff
 * monoliths supporting `RichMansion` at `RICH_TERRACE` (`y = 62m`), flush snow-capped spires, and
 * clean gatehouse wings at the foot.
 */
const Mountain: React.FC<{ lit: number }> = ({ lit }) => (
  <group>
    {/* Broad rocky foothills & mossy shelves (z = -38..-78) */}
    <Vox kind="mossy" position={[0, 0.4, -33.2]} size={[116, 1.2, 3.0]} tile={3} />
    <Vox kind="stone" position={[-34, 8, -42]} size={[56, 16, 12]} tile={4} />
    <Vox kind="stone" position={[34, 8, -42]} size={[56, 16, 12]} tile={4} />
    <Vox kind="grass" position={[-34, 16.4, -42]} size={[56, 0.8, 12]} tile={3} />
    <Vox kind="grass" position={[34, 16.4, -42]} size={[56, 0.8, 12]} tile={3} />

    <Vox kind="stone" position={[-30, 14, -62]} size={[66, 28, 30]} tile={6} />
    <Vox kind="mossy" position={[-30, 28.4, -62]} size={[64, 0.9, 28]} tile={4} />
    <Vox kind="stone" position={[36, 13, -60]} size={[60, 26, 28]} tile={6} />
    <Vox kind="mossy" position={[36, 26.4, -60]} size={[58, 0.9, 26]} tile={4} />

    {/* Monumental cliff spur supporting RICH_TERRACE (y = 62, z = -46) cleanly clear of stepPos(0..27) */}
    <Vox kind="stone" position={[4.5, 11, -50]} size={[42, 22, 20]} tile={5} />
    <Vox kind="stone" position={[6.0, 33, -48.5]} size={[30, 22, 16]} tile={6} />
    <Vox kind="stone" position={rich(0, -9.4, -2.2)} size={[22, 17.6, 12]} tile={5} />
    <Vox kind="mossy" position={rich(0, -0.7, -0.2)} size={[20.5, 0.5, 8.6]} tile={3} />
    <Vox kind="stoneBrick" position={rich(0, -0.35, 0.6)} size={[19.2, 0.7, 7.6]} />
    <RichMansion position={RICH_TERRACE} lit={lit > 0} />

    {/* Mid-mountain crags (y = 26..72m) */}
    <Vox kind="stone" position={[-24, 44, -76]} size={[52, 36, 28]} tile={7} />
    <Vox kind="stone" position={[2, 48, -84]} size={[68, 44, 30]} tile={7} />
    <Vox kind="stone" position={[32, 40, -78]} size={[48, 32, 26]} tile={7} />

    {/* Towering Eiffel-scale upper spires & snow-capped peaks (y = 66..116m, ZERO air gaps) */}
    <Vox kind="stone" position={[-6, 80, -86]} size={[44, 30, 24]} tile={8} />
    <Vox kind="stone" position={[-6, 100, -86]} size={[28, 12, 16]} tile={6} />
    <Vox kind="wool" tint="#f2f6ff" position={[-6, 108.5, -86]} size={[20, 5, 13]} tile={4} />
    <Vox kind="wool" tint="#f6f9ff" position={[-6, 113.5, -86]} size={[11, 5, 8]} tile={3} />

    {/* Secondary flanking peaks */}
    <Vox kind="stone" position={[28, 70, -82]} size={[30, 28, 20]} tile={7} />
    <Vox kind="wool" tint="#eef3fc" position={[28, 86.5, -82]} size={[19, 5, 14]} tile={4} />
    <Vox kind="stone" position={[-34, 68, -80]} size={[32, 24, 20]} tile={7} />
    <Vox kind="wool" tint="#eef3fc" position={[-34, 82.5, -80]} size={[20, 5, 14]} tile={4} />

    {/* Mountain Entrance Gatehouse flanking buttresses & toll booth (clear of <Gate> pillars at ±2.9) */}
    <group position={[GATE_X, 0, -10.8]}>
      <Vox kind="stoneBrick" position={[-4.2, 1.9, 0]} size={[2.0, 3.8, 1.1]} tile={2} />
      <Vox kind="stoneBrick" position={[4.2, 1.9, 0]} size={[2.0, 3.8, 1.1]} tile={2} />
      <Vox kind="darkPlanks" position={[-2.1, 0.55, 1.0]} size={[1.3, 1.1, 0.75]} />
      <Block position={[-2.1, 1.25, 1.0]} size={[0.4, 0.4, 0.4]} color="#2fd868" emissive="#1a8e42" emissiveIntensity={0.35} castShadow={false} />
      <Vox kind="planks" position={[3.6, 2.2, 0.65]} size={[1.5, 0.9, 0.1]} />
      <Block position={[3.6, 2.2, 0.72]} size={[1.1, 0.25, 0.04]} color="#f4c430" castShadow={false} />
    </group>

    {/* Long winding stone mountain staircase (0..27) + upper rocky continuation into cliff */}
    {Array.from({ length: 28 }, (_, i) => {
      const z = -12.0 - i * 0.8;
      const y = 0.25 + i * 0.48;
      const xShift = Math.sin(i * 0.28) * 1.4;
      return (
        <group key={`step${i}`}>
          <Vox kind="cobble" position={[GATE_X + xShift, y, z]} size={[3.2, 0.55, 0.82]} />
          <Vox kind="stone" position={[GATE_X + xShift, y - 0.5, z]} size={[3.6, 0.8, 0.84]} />
        </group>
      );
    })}
    {/* Upper cliff steps continuing upward toward the terrace cliff face (stops cleanly at z > -40) */}
    {Array.from({ length: 7 }, (_, i) => {
      const idx = 28 + i;
      const z = -12.0 - idx * 0.8;
      const y = 0.25 + idx * 0.48;
      const xShift = Math.sin(idx * 0.28) * 1.4 + i * 0.25;
      return (
        <Vox key={`ustep${i}`} kind="cobble" position={[GATE_X + xShift, y, z]} size={[3.0, 0.55, 0.82]} />
      );
    })}

    <Torch position={[GATE_X + 2.2, 0, -9.8]} light={lit} seed={7} />
    <Torch position={[GATE_X - 2.2, 0, -9.8]} light={lit} seed={9} />
    {lit > 0 ? <LightPool position={[GATE_X, 0.1, -12]} width={6} depth={7} color="#ffcf8a" opacity={0.18} /> : null}
  </group>
);

const Bottom: React.FC<{ night: boolean; warm: boolean; rain: boolean }> = ({ night, warm, rain }) => {
  const t = useFilmTime();
  return (
    <group>
      {/* ground: a wet lane, and grass either side */}
      <Vox kind="grass" position={[0, -0.5, -34]} size={[240, 1, 74]} />
      <Vox kind="path" position={[0, 0.02, -2.5]} size={[34, 0.06, 7.5]} />
      <Vox kind="sand" position={[0, 0.015, 3.4]} size={[34, 0.06, 3.0]} />
      {/* the animated water, and the shallow shelf where they fish */}
      <Water position={[0, -0.06, 24]} size={[240, 0.3, 40]} tint={night ? "#1a3c6e" : "#2b78d6"} opacity={0.82} flowSpeed={[0.14, 0.08]} />
      <Vox kind="sand" position={[0, -0.12, 8.6]} size={[240, 0.3, 12]} />
      {/* the jetty */}
      <Vox kind="planks" position={[PLACE.jetty[0], PLACE.jetty[1] - 0.09, PLACE.jetty[2]]} size={[2.6, 0.18, 16]} />
      {[3.2, 6.4, 9.6, 12.8, 15.8].map((z, i) => (
        <group key={z}>
          <Vox kind="log" position={[-1.2, 0.2, z]} size={[0.22, 1.6, 0.22]} />
          <Vox kind="log" position={[1.2, 0.2, z]} size={[0.22, 1.6, 0.22]} />
          {i === 4 ? (
            <>
              <Vox kind="log" position={[-1.2, 0.95, z]} size={[0.26, 0.45, 0.26]} />
              <Vox kind="log" position={[1.2, 0.95, z]} size={[0.26, 0.45, 0.26]} />
            </>
          ) : null}
        </group>
      ))}
      {/* the stall, and the price board */}
      <Stall position={PLACE.stall} />
      <Block position={[PLACE.stall[0] + 2.3, 1.1, PLACE.stall[2] + 0.2]} size={[0.9, 0.7, 0.08]} color="#e6dcc4" castShadow={false} />
      {/* the lane of huts, north side, clear of the center mountain gate corridor */}
      {[-14.5, -8.2, 9.2, 15.2].map((x, i) => (
        <Hut key={x} at={[x, 0, -11.2 - (i % 2) * 2.2]} w={5} d={4.6} h={3.4} />
      ))}
      <Hut at={[PLACE.door[0] + 0.4, 0, PLACE.door[2] - 1.4]} w={5.2} d={4.8} h={3.6} />
      {/* nets and floats on the sand */}
      {[[-3.2, 2.2], [2.6, 1.8], [-6.4, 2.6], [5.6, 2.4]].map(([x, z], i) => (
        <group key={i} position={[x, 0.1, z]}>
          <Vox kind="wool" tint="#cfc6a8" size={[1.5, 0.06, 0.9]} />
          {[-0.5, 0, 0.5].map((k) => (
            <Vox key={k} kind="wool" tint="#f2d24a" position={[k, 0.09, 0.3]} size={[0.14, 0.14, 0.14]} castShadow={false} />
          ))}
        </group>
      ))}
      {/* crates moved clear of the lane stall approach */}
      {[[-6.0, -5.2], [0.6, -4.2], [3.2, -4.8]].map(([x, z], i) => (
        <Vox key={i} kind="darkPlanks" position={[x, 0.32, z]} size={[0.8, 0.64, 0.8]} />
      ))}
      {[-6.2, 8.4].map((x) => (
        <Torch key={x} position={[x, 0, -5.2]} light={night ? 1.4 : 0} seed={x} />
      ))}
      {[-14.5, -6.5, 6.5, 14.5].map((x) => (
        <Tree key={`t${x}`} position={[x, 0, -14.5]} height={3.6 + (Math.abs(x) % 3) * 0.4} spread={0.8} />
      ))}
      {/* Sun shafts illuminating the towering summit and palace */}
      {night ? null : (
        <>
          <GodRay position={[-26, 76, -68]} rotation={[0, 0, 0.32]} width={24} height={64} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.22 : 0.18} />
          <GodRay position={[14, 72, -44]} rotation={[0, 0, 0.12]} width={14} height={48} color="#fff6d8" opacity={0.12} />
          <LightPool position={[0, 0.04, -2.5]} width={22} depth={6} color="#d8e6c0" opacity={0.1} />
        </>
      )}
      <Glow position={[0, 2.6, 6]} size={3.2} color={night ? "#c9a0ff" : "#fff0c0"} opacity={0.14} />
      {/* Rich harbor overlook bridge shoreward/east of jetty rods */}
      <group position={[5.4, 0, 5.0]}>
        <Vox kind="stoneBrick" tint="#f4efe2" position={[0, 1.0, 0]} size={[3.2, 2.0, 3.0]} tile={2} />
        <Vox kind="wool" tint="#f2c438" position={[-1.45, 2.25, 0]} size={[0.18, 0.5, 3.0]} />
        <Vox kind="wool" tint="#f2c438" position={[0, 2.25, 1.4]} size={[3.0, 0.5, 0.18]} />
      </group>
      <Dust position={[0, 2.2, 2]} area={[30, 4, 26]} count={60} size={0.04} color={night ? "#e0c8ff" : "#fff7d8"} opacity={0.5} seed={5} speed={0.18} />
      {/* Lower cloud deck below RichMansion + upper clouds above summit */}
      {night ? null : (
        <>
          <Clouds y={44} center={[0, 0, -48]} span={120} opacity={0.42} />
          <Clouds y={124} center={[0, 0, -40]} span={160} opacity={0.9} />
        </>
      )}
      {rain ? <Rain center={[0, 0, 8]} t={t} area={[26, 24]} count={120} /> : null}
    </group>
  );
};

const Room: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.room}>
    <pointLight position={[0, 2.5, 0.5]} color={night ? "#ffd49a" : "#fff4dc"} intensity={1.8} distance={9} />
    <Vox kind="planks" position={[0, -0.05, 0]} size={[7, 0.1, 6]} />
    {/* Enclosed ceiling so upward shots never show black void */}
    <Vox kind="darkPlanks" position={[0, 3.35, 0]} size={[7.2, 0.2, 6.2]} castShadow={false} />
    <Vox kind="wool" tint="#cfc3a8" position={[0, 1.6, -3.05]} size={[7, 3.2, 0.2]} />
    <Vox kind="wool" tint="#c4b79c" position={[-3.5, 1.6, 0]} size={[0.2, 3.2, 6]} />
    <Vox kind="wool" tint="#c4b79c" position={[3.5, 1.6, 0]} size={[0.2, 3.2, 6]} />
    <Vox kind="darkPlanks" position={[0, 1.4, 3.0]} size={[2.2, 2.6, 0.16]} />
    {/* Mountain-view window */}
    <Vox kind="stone" position={[1.9, 1.9, -3.0]} size={[1.5, 1.2, 0.12]} />
    <Vox kind="wool" tint="#ffe9b0" position={[1.9, 1.9, -3.02]} size={[1.4, 1.1, 0.06]} emissive="#ffe9b0" emissiveIntensity={night ? 0.25 : 0.4} castShadow={false} />
    {/* Long timber shelf spanning x = -3.6..-0.4, top y = 1.57 */}
    <Vox kind="darkPlanks" position={[-2.0, 1.5, -2.7]} size={[3.2, 0.14, 0.6]} />
    {/* Decorative apothecary bottles on far left of shelf */}
    <Vox kind="wool" tint="#8ab8a8" position={[-3.1, 1.72, -2.7]} size={[0.22, 0.3, 0.22]} opacity={0.75} castShadow={false} />
    <Vox kind="wool" tint="#d8b878" position={[-2.75, 1.67, -2.65]} size={[0.18, 0.2, 0.18]} castShadow={false} />
    {night ? <LanternIn position={[-2.4, 2.5, -2.7]} /> : null}
    <LightPool position={[0, 0.02, 0]} width={6} depth={4} color={night ? "#ffcf8a" : "#fff2c0"} opacity={0.12} />
  </group>
);

const LanternIn: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Vox kind="wool" tint="#ffd98a" size={[0.3, 0.4, 0.3]} emissive="#ffcf6a" emissiveIntensity={0.9} castShadow={false} />
  </group>
);

const Top: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    <Vox kind="stoneBrick" position={top(0, -0.5, -8)} size={[46, 1, 44]} tile={2} />
    {/* Cobblestone street strip down center behind the gate */}
    <Vox kind="cobble" tint="#9ea4ae" position={top(0, 0.02, -13)} size={[5.4, 0.06, 26]} tile={2} />
    {/* Gate wall seamless with <Gate> pillars at x = ±2.9 */}
    <Vox kind="stoneBrick" position={top(-8.1, 3, 0)} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={top(8.1, 3, 0)} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={top(0, 5.0, 0)} size={[6.4, 2.2, 1.2]} tile={2} />

    {/* Exterior stone stoop steps on +Z landing (z = 1.9..4.9) for 15.sit */}
    <Vox kind="stoneBrick" position={top(0, 0.24, 2.4)} size={[6.6, 0.48, 1.0]} />
    <Vox kind="stoneBrick" position={top(0, 0.12, 3.4)} size={[6.6, 0.24, 1.0]} />
    <Vox kind="stoneBrick" position={top(0, 0.04, 4.4)} size={[6.6, 0.08, 1.0]} />

    {/* Stone & dark-oak toll counter just inside gate (yTop = 0.94, clear of center walkway) */}
    <Vox kind="stoneBrick" position={top(1.2, 0.43, -0.65)} size={[1.25, 0.86, 0.62]} />
    <Vox kind="darkPlanks" position={top(1.2, 0.9, -0.65)} size={[1.38, 0.08, 0.74]} />

    {/* Street lamps clear of benches */}
    {[-3.2, 3.2].map((lx) =>
      [-3.2, -10.5, -18.0].map((lz) => (
        <group key={`lamp${lx}_${lz}`}>
          <LampPost position={top(lx, 0, lz)} seed={Math.abs(lz)} />
          {night ? <LightPool position={top(lx, 0.05, lz)} width={4.5} depth={4.5} color="#ffd58a" opacity={0.22} /> : null}
        </group>
      )),
    )}

    {/* Clean timber bench on left side, well clear of lamps, walkway, and hedges */}
    <group position={top(-3.05, 0, -6.2)}>
      <Vox kind="planks" position={[0, 0.45, 0]} size={[0.65, 0.12, 2.1]} />
      <Vox kind="planks" position={[0, 0.22, -0.8]} size={[0.5, 0.44, 0.14]} />
      <Vox kind="planks" position={[0, 0.22, 0.8]} size={[0.5, 0.44, 0.14]} />
    </group>

    {/* Planter boxes / hedges & ornamental trees lining the upper street (zero overlap with bench or trees) */}
    {[-4.1, 4.1].map((hx) =>
      [-6.2, -13.0].map((hz) => (
        <group key={`hedge${hx}_${hz}`} position={top(hx, 0, hz)}>
          <Vox kind="darkPlanks" position={[0, 0.25, 0]} size={[0.9, 0.5, 1.6]} />
          <Vox kind="leaves" tint="#3f7f2d" position={[0, 0.68, 0]} size={[0.8, 0.45, 1.45]} />
        </group>
      )),
    )}
    <Tree position={top(3.35, 0, -9.2)} height={3.4} spread={0.35} />
    <Tree position={top(-3.35, 0, -16.2)} height={3.6} spread={0.35} />

    {/* Multi-storey Quartz & Gold townhouses lining BOTH sides of the upper-town street */}
    {[-1, 1].map((side) =>
      [-6.5, -13.0, -19.5].map((tz, i) => (
        <group key={`house${side}_${tz}`} position={top(side * 7.2, 0, tz)}>
          <Vox kind="stoneBrick" tint={i % 2 === 0 ? "#f4efe2" : "#e8e2d4"} position={[0, 3.2, 0]} size={[5.2, 6.4, 5.4]} tile={2} />
          <Vox kind="wool" tint="#f2c438" position={[-side * 2.62, 3.1, 0]} size={[0.14, 0.24, 5.5]} />
          <Vox kind="wool" tint="#f2c438" position={[-side * 2.62, 6.2, 0]} size={[0.18, 0.3, 5.6]} />
          <Vox kind="wool" tint="#1f5e50" position={[0, 6.8, 0]} size={[5.8, 0.8, 5.8]} />
          <Vox kind="wool" tint="#267362" position={[0, 7.55, 0]} size={[3.6, 0.7, 3.8]} />
          {/* Lit upper-town windows facing street */}
          {[-1.3, 1.3].map((wz) => (
            <group key={wz}>
              <Block position={[-side * 2.64, 2.0, wz]} size={[0.1, 1.3, 0.95]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={night ? 0.95 : 0.55} castShadow={false} />
              <Block position={[-side * 2.64, 4.6, wz]} size={[0.1, 1.3, 0.95]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={night ? 0.95 : 0.55} castShadow={false} />
            </group>
          ))}
        </group>
      )),
    )}

    {/* Distant upper plaza archway & gold fountain monument closing the horizon at z = -25 */}
    <group position={top(0, 0, -25)}>
      <Vox kind="stoneBrick" tint="#f4efe2" position={[-3.2, 3.0, 0]} size={[1.4, 6.0, 1.4]} />
      <Vox kind="stoneBrick" tint="#f4efe2" position={[3.2, 3.0, 0]} size={[1.4, 6.0, 1.4]} />
      <Vox kind="stoneBrick" tint="#f4efe2" position={[0, 6.4, 0]} size={[8.4, 1.2, 1.5]} />
      <Vox kind="wool" tint="#f2c438" position={[0, 7.2, 0]} size={[5.2, 0.4, 1.6]} />
    </group>

    <LightPool position={top(0, 0.05, -5)} width={8} depth={8} color={night ? "#cfe0ff" : "#fff2c8"} opacity={0.14} />
    {night ? null : <GodRay position={top(3, 9, -3)} rotation={[0, 0, 0.4]} width={6} height={14} color="#fff0c8" opacity={0.08} />}
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  const rain = look === "overworld-rain" || look === "overworld-storm";
  const warm = look === "overworld-sunset" || look === "overworld-golden";
  return (
    <>
      {night ? <directionalLight color="#b9c4ff" intensity={1.05} position={[-6, 10, 12]} /> : null}
      {night ? <ambientLight color="#8a90d8" intensity={0.4} /> : null}
      <Zone name="bottom">
        <Bottom night={night} warm={warm} rain={rain} />
        <Mountain lit={night ? 1.5 : 0} />
      </Zone>
      <Zone name="room">
        <Room night={night} />
      </Zone>
      <Zone name="top">
        <Top night={night} />
      </Zone>
    </>
  );
};
