import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Water, Zone, useActiveShot } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hut, LampPost, Rain, Stall } from "./kit";
import { PLACE, room, top } from "./kit";

/**
 * Three places, and the lens never sees two of them at once.
 *
 *   bottom  The foot of the mountain: a wet lane of huts, a stall, a wooden jetty out into grey water, one boat with a
 *           hole in it, and the mountain going up out of frame with a ladder on its face. Everything here is grey,
 *           green and brown — the only brightness is the sun, and the sun is on the top of the mountain.
 *   room    One bed, one shelf, one jar. Its own zone, far from the water.
 *   top     The gate: stone, bars, a keeper, and behind him a street with a lamp, a bin and a bench. It is the only
 *           place in the film with clean lines, and it is deliberately dull.
 */

const LADDER_X = PLACE.firstStep[0];

/**
 * A lit arched window with a stepped gold frame. The 9:16 hook only sees the middle ~5 m of the palace, so this
 * window is the repeating unit that proves "multi-storey quartz and gold" inside that narrow slice.
 */
const ArchWindow: React.FC<{ x: number; y: number; z?: number; w?: number; h?: number; lit: boolean }> = ({
  x,
  y,
  z = -0.16,
  w = 1.15,
  h = 1.7,
  lit,
}) => (
  <group position={[x, y, z]}>
    {/* gold surround + stepped arch head */}
    <Block size={[w + 0.3, h + 0.3, 0.14]} color="#f2c438" />
    <Block position={[0, h / 2 + 0.22, 0]} size={[w * 0.64, 0.32, 0.14]} color="#f2c438" />
    <Block position={[0, h / 2 + 0.48, 0]} size={[w * 0.3, 0.26, 0.14]} color="#f2c438" />
    {/* dark reveal line between gold and glass: reads as a recessed window, not a painted panel */}
    <Block position={[0, 0, 0.02]} size={[w + 0.1, h + 0.1, 0.08]} color="#8a5a12" castShadow={false} />
    {/* warm pane + mullions */}
    <Block position={[0, 0, 0.05]} size={[w, h, 0.1]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={lit ? 0.9 : 0.65} castShadow={false} />
    <Block position={[0, 0, 0.11]} size={[0.07, h, 0.05]} color="#b8861a" castShadow={false} />
    <Block position={[0, h * 0.14, 0.11]} size={[w, 0.07, 0.05]} color="#b8861a" castShadow={false} />
    {/* transom shadow under the arch */}
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
 * Sunlit multi-storey Quartz & Gold palace crowning the rich cliff ledge — the wealth proof the hook lives on.
 * Everything important is compressed into the centre 5 m so the narrow 9:16 hook reads "rich" instantly:
 * lit arched windows on two floors, gold pilasters and cornices, a low gold balustrade at knee height, and the
 * emerald-teal roof rising above the frame line behind the kids.
 */
const RichMansion: React.FC<{ position: Vec3; lit: boolean }> = ({ position, lit }) => (
  <group position={position}>
    {/* Marble terrace floor, royal-red carpet with gold borders */}
    <Vox kind="stoneBrick" tint="#f7f2e8" position={[0, -0.35, 1.6]} size={[18.4, 0.7, 6.8]} />
    <Vox kind="wool" tint="#a8262e" position={[0, 0.03, 2.2]} size={[3.2, 0.06, 5.0]} castShadow={false} />
    <Vox kind="wool" tint="#f0c83a" position={[-1.8, 0.04, 2.2]} size={[0.14, 0.07, 5.0]} castShadow={false} />
    <Vox kind="wool" tint="#f0c83a" position={[1.8, 0.04, 2.2]} size={[0.14, 0.07, 5.0]} castShadow={false} />
    {/* Low gold balustrade: top rail at knee height so it never cuts a RichKid's face */}
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
    {/* Central palace: quartz block with gold plinth, cornices and pilasters */}
    <Vox kind="stoneBrick" tint="#fbf7ee" position={[0, 3.8, -3.1]} size={[8.0, 7.9, 5.8]} />
    {[0.3, 2.35, 4.95, 7.45].map((y) => (
      <Vox key={y} kind="wool" tint="#f2c438" position={[0, y, -0.14]} size={[8.3, 0.22, 0.44]} />
    ))}
    {[-1.9, 1.9].map((x) => (
      <Vox key={`pil${x}`} kind="wool" tint="#f2c438" position={[x, 3.7, -0.16]} size={[0.24, 7.4, 0.4]} />
    ))}
    {/* Projecting entrance bay: the one depth plane the narrow 9:16 hook can see */}
    <Vox kind="stoneBrick" tint="#fdf9f0" position={[0, 1.35, 0.3]} size={[4.7, 2.7, 0.62]} />
    <Vox kind="wool" tint="#f2c438" position={[0, 2.78, 0.33]} size={[5.0, 0.26, 0.74]} />
    <Vox kind="wool" tint="#c9971a" position={[0, 2.63, 0.36]} size={[5.0, 0.08, 0.76]} />
    {[-2.2, 2.2].map((x) => (
      <Vox key={`baypil${x}`} kind="wool" tint="#f2c438" position={[x, 1.35, 0.58]} size={[0.26, 2.7, 0.26]} />
    ))}
    {/* Double doors on the bay: dark wood, gold frame, warm glass spilling out */}
    <Vox kind="darkPlanks" tint="#5a3520" position={[0, 1.1, 0.62]} size={[2.5, 2.2, 0.18]} />
    {[-0.55, 0.55].map((x) => (
      <Block key={`pane${x}`} position={[x, 1.15, 0.73]} size={[0.95, 1.6, 0.06]} color="#ffe9a6" emissive="#ffcf6a" emissiveIntensity={lit ? 0.85 : 0.65} castShadow={false} />
    ))}
    <Block position={[0, 1.15, 0.77]} size={[0.12, 1.9, 0.1]} color="#f2c438" castShadow={false} />
    {[-0.22, 0.22].map((x) => (
      <Block key={`h${x}`} position={[x, 1.15, 0.79]} size={[0.08, 0.16, 0.08]} color="#f8d24c" castShadow={false} />
    ))}
    {/* Two gold lanterns flanking the entrance: the facade glows back at the terrace */}
    {[-1.55, 1.55].map((x) => (
      <group key={`sconce${x}`}>
        <Block position={[x, 2.15, 0.66]} size={[0.22, 0.42, 0.18]} color="#ffe08a" emissive="#ffcf6a" emissiveIntensity={1.1} castShadow={false} />
        <Block position={[x, 2.4, 0.64]} size={[0.3, 0.08, 0.22]} color="#b8861a" castShadow={false} />
        <Block position={[x, 1.9, 0.64]} size={[0.3, 0.08, 0.22]} color="#b8861a" castShadow={false} />
      </group>
    ))}
    {/* Two floors of lit arched windows — the readable "rich" motif */}
    <ArchWindow x={-1.35} y={3.7} lit={lit} />
    <ArchWindow x={1.35} y={3.7} lit={lit} />
    <ArchWindow x={-0.95} y={6.25} w={1.0} h={1.5} lit={lit} />
    <ArchWindow x={0.95} y={6.25} w={1.0} h={1.5} lit={lit} />
    {/* Banners hanging from gold rods, either side of the upper windows */}
    {[-1.65, 1.65].map((x) => (
      <group key={`banner${x}`}>
        <Vox kind="wool" tint="#1c7a4e" position={[x, 6.2, -0.08]} size={[0.42, 1.5, 0.06]} castShadow={false} />
        <Vox kind="wool" tint="#ffd452" position={[x, 6.85, -0.05]} size={[0.5, 0.2, 0.08]} castShadow={false} />
      </group>
    ))}
    {/* Tiered emerald-teal roof with a gold finial, rising behind the frame line */}
    <Vox kind="wool" tint="#1f5e50" position={[0, 7.85, -3.1]} size={[9.4, 0.55, 7.0]} />
    <Vox kind="wool" tint="#267362" position={[0, 8.65, -3.1]} size={[7.0, 1.0, 5.2]} />
    <Vox kind="wool" tint="#2e8874" position={[0, 9.6, -3.1]} size={[4.2, 0.9, 3.4]} />
    <Vox kind="wool" tint="#f4c430" position={[0, 10.35, -3.1]} size={[1.0, 0.9, 1.0]} emissive="#f4c430" emissiveIntensity={0.35} />
    {/* Side pavilions, so wide shots read as a palace and not a single slab */}
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
    {/* Loose gold and an emerald on the terrace */}
    <GoldStack x={-2.6} z={1.8} />
    <GoldStack x={2.6} z={1.8} />
    {/* The window light that proves wealth even at phone size */}
    <Glow position={[0, 3.7, 1.2]} size={2.6} color="#ffe398" opacity={0.16} />
    <Glow position={[0, 6.25, 1.1]} size={2.2} color="#ffe398" opacity={0.11} />
  </group>
);

/** The mountain: a wall of stone at the north end, with a ladder on its face, steps cut into the rock, and the Rich Mansion up on the sunlit cliff. */
const Mountain: React.FC<{ lit: number }> = ({ lit }) => (
  <group>
    <Vox kind="stone" position={[0, 6.5, -38]} size={[104, 13, 8]} tile={3} />
    <Vox kind="stone" position={[-8, 12, -62]} size={[82, 24, 14]} tile={6} />
    <Vox kind="mossy" position={[-8, 24.4, -62]} size={[82, 1.2, 14]} tile={3} />
    <Vox kind="mossy" position={[0, 13.2, -38]} size={[104, 0.8, 8]} tile={2} />
    <Vox kind="grass" position={[0, 13.8, -42]} size={[104, 1.0, 12]} tile={3} />
    <Vox kind="mossy" position={[0, 0.4, -32.2]} size={[104, 1.2, 2.6]} tile={2} />
    {/* the mountain proper: closer steep sunlit upper peaks behind the cliff */}
    <Vox kind="stone" position={[-22, 18, -96]} size={[95, 36, 26]} tile={8} />
    <Vox kind="stone" position={[34, 15, -92]} size={[72, 30, 22]} tile={8} />
    <Vox kind="grass" position={[-22, 36.4, -96]} size={[92, 1.2, 24]} tile={5} />
    <Vox kind="wool" tint="#f2f6ff" position={[-22, 41.0, -96]} size={[32, 4, 18]} tile={5} />
    {/* the rich terrace & gleaming Quartz+Gold Mansion overlooking the town */}
    <Vox kind="stoneBrick" position={[6.4, 5.4, -31.8]} size={[18.2, 0.8, 6.8]} />
    {/* the cliff spur under the terrace: the rich live on rock, not on a floating slab */}
    <Vox kind="stone" position={[6.4, 2.55, -31.4]} size={[19.2, 5.1, 6.6]} tile={4} />
    <Vox kind="mossy" position={[6.4, 5.12, -31.4]} size={[19.5, 0.45, 6.9]} tile={2} />
    <RichMansion position={[6.4, 5.85, -33.2]} lit={lit > 0} />
    <Vox kind="stoneBrick" position={[-9.5, 9.4, -31.6]} size={[5.0, 0.4, 2.4]} />
    {/* the ladder: rails and rungs, mounted cleanly on front face of cliff spur going up out of the top of frame */}
    <Vox kind="darkPlanks" position={[LADDER_X - 0.42, 6.6, -27.85]} size={[0.12, 13.2, 0.12]} />
    <Vox kind="darkPlanks" position={[LADDER_X + 0.42, 6.6, -27.85]} size={[0.12, 13.2, 0.12]} />
    {Array.from({ length: 12 }, (_, i) => (
      <Vox key={i} kind="darkPlanks" position={[LADDER_X, 0.9 + i * 1.02, -27.85]} size={[0.9, 0.1, 0.1]} castShadow={false} />
    ))}
    {/* steps cut into the rock at the foot: the first twenty of nine thousand */}
    {Array.from({ length: 12 }, (_, i) => (
      <Vox key={`s${i}`} kind="cobble" position={[LADDER_X, 0.25 + i * 0.5, -11 - i * 0.9]} size={[2.6, 0.5, 1.0]} />
    ))}
    <Torch position={[LADDER_X + 1.9, 0, -10.6]} light={lit} seed={7} />
    {lit > 0 ? <LightPool position={[LADDER_X, 0.1, -12]} width={5} depth={6} color="#ffcf8a" opacity={0.16} /> : null}
  </group>
);

const Bottom: React.FC<{ night: boolean; warm: boolean; rain: boolean }> = ({ night, warm, rain }) => (
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
    {/* dynamic Boat is staged by each scene */}
    {/* the stall, and the price board */}
    <Stall position={PLACE.stall} />
    <Block position={[PLACE.stall[0] + 2.3, 1.1, PLACE.stall[2] + 0.2]} size={[0.9, 0.7, 0.08]} color="#e6dcc4" castShadow={false} />
    {/* the lane of huts, north side, doors facing the water */}
    {[-13.6, -7.4, 2.6, 9.4].map((x, i) => (
      <Hut key={x} at={[x, 0, -11.2 - (i % 2) * 2.2]} w={5} d={4.6} h={3.4} />
    ))}
    {/* home is the bigger one, second from the east */}
    <Hut at={[PLACE.door[0] + 0.4, 0, PLACE.door[2] - 1.4]} w={5.2} d={4.8} h={3.6} />
    {/* nets and floats on the sand: it is a fishing town */}
    {[[-3.2, 2.2], [2.6, 1.8], [-6.4, 2.6], [5.6, 2.4]].map(([x, z], i) => (
      <group key={i} position={[x, 0.1, z]}>
        <Vox kind="wool" tint="#cfc6a8" size={[1.5, 0.06, 0.9]} />
        {[-0.5, 0, 0.5].map((k) => (
          <Vox key={k} kind="wool" tint="#f2d24a" position={[k, 0.09, 0.3]} size={[0.14, 0.14, 0.14]} castShadow={false} />
        ))}
      </group>
    ))}
    {/* buckets and crates */}
    {[[-1.4, -4.6], [0.6, -4.2], [3.2, -4.8]].map(([x, z], i) => (
      <Vox key={i} kind="darkPlanks" position={[x, 0.32, z]} size={[0.8, 0.64, 0.8]} />
    ))}
    {[-6.2, 8.4].map((x) => (
      <Torch key={x} position={[x, 0, -5.2]} light={night ? 1.4 : 0} seed={x} />
    ))}
    {[-14.5, -6.5, 6.5, 14.5].map((x) => (
      <Tree key={`t${x}`} position={[x, 0, -14.5]} height={3.6 + (Math.abs(x) % 3) * 0.4} spread={0.8} />
    ))}
    {/* the sun's attention: a shaft on the mountain top, not on the town */}
    {night ? null : (
      <>
        <GodRay position={[-44, 40, -146]} rotation={[0, 0, 0.3]} width={22} height={40} color={warm ? "#ffd9a0" : "#fff0c8"} opacity={warm ? 0.22 : 0.18} />
        <GodRay position={[12, 22, -60]} rotation={[0, 0, 0.1]} width={12} height={34} color="#fff6d8" opacity={0.08} />
        <LightPool position={[0, 0.04, -2.5]} width={22} depth={6} color={night ? "#a9c0ff" : "#d8e6c0"} opacity={night ? 0.1 : 0.1} />
      </>
    )}
    <Glow position={[0, 2.6, 6]} size={3.2} color={night ? "#c9a0ff" : "#fff0c0"} opacity={0.14} />
    <Dust position={[0, 2.2, 2]} area={[30, 4, 26]} count={60} size={0.04} color={night ? "#e0c8ff" : "#fff7d8"} opacity={0.5} seed={5} speed={0.18} />
    {night ? null : <Clouds y={52} center={[0, 0, 0]} />}
    {rain ? <Rain center={[0, 0, 8]} t={0.4} area={[26, 24]} count={120} /> : null}
  </group>
);

const Room: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.room}>
    <Vox kind="planks" position={[0, -0.05, 0]} size={[7, 0.1, 6]} />
    <Vox kind="wool" tint="#cfc3a8" position={[0, 1.6, -3.05]} size={[7, 3.2, 0.2]} />
    <Vox kind="wool" tint="#c4b79c" position={[-3.5, 1.6, 0]} size={[0.2, 3.2, 6]} />
    <Vox kind="wool" tint="#c4b79c" position={[3.5, 1.6, 0]} size={[0.2, 3.2, 6]} />
    <Vox kind="darkPlanks" position={[0, 1.4, 3.0]} size={[2.2, 2.6, 0.16]} />
    {/* one window, on the mountain wall: you can see the sun on the top from the bed */}
    <Vox kind="stone" position={[1.9, 1.9, -3.0]} size={[1.5, 1.2, 0.12]} />
    <Vox kind="wool" tint="#ffe9b0" position={[1.9, 1.9, -3.02]} size={[1.4, 1.1, 0.06]} emissive="#ffe9b0" emissiveIntensity={night ? 0.25 : 0.4} castShadow={false} />
    {/* the shelf, and a second, smaller jar */}
    <Vox kind="darkPlanks" position={[-2.4, 1.5, -2.7]} size={[2.4, 0.14, 0.6]} />
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
    <Vox kind="stoneBrick" position={top(0, -0.5, -6)} size={[44, 1, 38]} tile={2} />
    {/* the wall the gate is set in */}
    <Vox kind="stoneBrick" position={top(-9.5, 3, 0)} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={top(9.5, 3, 0)} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={top(0, 5.6, 0)} size={[9, 1.2, 1.2]} tile={2} />
    {/* the street behind the gate: a lamp, a bin, a bench, one thin tree */}
    <LampPost position={top(-2.4, 0, -4.5)} />
    <Vox kind="darkPlanks" position={top(2.2, 0.5, -5.6)} size={[0.9, 1.0, 0.9]} />
    <Vox kind="planks" position={top(-2.6, 0.45, -4.4)} size={[2.2, 0.12, 0.6]} />
    <Vox kind="planks" position={top(-3.4, 0.22, -4.4)} size={[0.14, 0.5, 0.5]} />
    <Vox kind="planks" position={top(-1.8, 0.22, -4.4)} size={[0.14, 0.5, 0.5]} />
    <Tree position={top(5.5, 0, -9)} height={3.2} spread={0.7} />
    {/* more street, going away: clean, plain, nobody in it */}
    {[-7.6, -9.4].map((x, i) => (
      <Vox key={i} kind="stoneBrick" position={top(x, 2.4, -10 - i * 3)} size={[4.5, 4.8, 5]} tile={2} />
    ))}
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
