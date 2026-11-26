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

/** Sunlit multi-story Quartz & Gold Villa/Mansion crowning the rich cliff ledge — unmistakable visual proof of wealth. */
const RichMansion: React.FC<{ position: Vec3; lit: boolean }> = ({ position, lit }) => (
  <group position={position}>
    {/* Marble terrace floor & golden balustrade */}
    <Vox kind="stoneBrick" tint="#f5f0e6" position={[0, -0.35, 1.4]} size={[18, 0.7, 6.2]} />
    <Vox kind="wool" tint="#e8b828" position={[0, 0.08, 4.35]} size={[18, 0.16, 0.35]} />
    {[-8, -5, -2, 2, 5, 8].map((x) => (
      <Vox key={x} kind="wool" tint="#f0c83a" position={[x, 0.55, 4.35]} size={[0.32, 0.85, 0.32]} />
    ))}
    <Vox kind="wool" tint="#e8b828" position={[-5.2, 0.96, 4.35]} size={[6.6, 0.14, 0.24]} />
    <Vox kind="wool" tint="#e8b828" position={[5.2, 0.96, 4.35]} size={[6.6, 0.14, 0.24]} />
    {/* Royal red terrace carpet + gold chest & emerald stack */}
    <Vox kind="wool" tint="#a8262e" position={[0, 0.03, 2.2]} size={[3.0, 0.06, 4.4]} castShadow={false} />
    <Vox kind="cobble" tint="#f4c430" emissive="#c48a10" emissiveIntensity={0.22} position={[-3.4, 0.45, 2.2]} size={[0.9, 0.9, 0.9]} />
    <Vox kind="cobble" tint="#2fd868" emissive="#1a8e42" emissiveIntensity={0.25} position={[3.6, 0.4, 2.3]} size={[0.8, 0.8, 0.8]} />
    {/* Ground & upper white-quartz mansion wings */}
    <Vox kind="stoneBrick" tint="#f6f1e7" position={[0, 2.6, -3.2]} size={[15.5, 5.2, 5.6]} />
    <Vox kind="stoneBrick" tint="#f9f5ec" position={[0, 6.9, -3.6]} size={[10.5, 3.6, 4.6]} />
    {/* Gold corner & arcade columns */}
    {[-7.2, -3.4, 3.4, 7.2].map((x) => (
      <Vox key={x} kind="wool" tint="#f2c438" position={[x, 2.6, -0.3]} size={[0.72, 5.2, 0.72]} />
    ))}
    {[-4.8, 4.8].map((x) => (
      <Vox key={`u${x}`} kind="wool" tint="#f2c438" position={[x, 6.9, -1.2]} size={[0.62, 3.6, 0.62]} />
    ))}
    {/* Ornate double doors + warm glowing arched windows */}
    <Vox kind="darkPlanks" tint="#58341e" position={[0, 1.75, -0.32]} size={[2.8, 3.5, 0.18]} />
    <Block position={[-0.6, 1.75, -0.2]} size={[0.16, 0.22, 0.06]} color="#f8d24c" />
    <Block position={[0.6, 1.75, -0.2]} size={[0.16, 0.22, 0.06]} color="#f8d24c" />
    {[-5.2, 5.2].map((x) => (
      <group key={`w1${x}`} position={[x, 2.8, -0.32]}>
        <Block size={[1.8, 2.2, 0.16]} color="#f0c83a" />
        <Block position={[0, 0, 0.04]} size={[1.4, 1.85, 0.12]} color="#ffe9a6" emissive="#ffd060" emissiveIntensity={lit ? 1.1 : 0.75} castShadow={false} />
      </group>
    ))}
    {[-2.4, 0, 2.4].map((x) => (
      <group key={`w2${x}`} position={[x, 7.0, -1.25]}>
        <Block size={[1.45, 1.75, 0.16]} color="#f0c83a" />
        <Block position={[0, 0, 0.04]} size={[1.1, 1.4, 0.12]} color="#fff0b8" emissive="#ffd874" emissiveIntensity={lit ? 1.15 : 0.85} castShadow={false} />
      </group>
    ))}
    {/* Pitched emerald-teal & gold tiered mansion roofs */}
    <Vox kind="wool" tint="#1f5e50" position={[0, 5.45, -3.1]} size={[17.2, 0.75, 7.0]} />
    <Vox kind="wool" tint="#267362" position={[0, 9.0, -3.5]} size={[12.2, 0.7, 6.0]} />
    <Vox kind="wool" tint="#2e8874" position={[0, 9.75, -3.5]} size={[8.4, 0.8, 4.4]} />
    <Vox kind="wool" tint="#f4c430" position={[0, 10.45, -3.5]} size={[1.1, 0.9, 1.1]} emissive="#f4c430" emissiveIntensity={0.35} />
    {/* Banners & warm balcony lanterns */}
    {[-3.4, 3.4].map((x) => (
      <group key={`b${x}`}>
        <Vox kind="wool" tint="#1c7a4e" position={[x, 3.5, 0.15]} size={[0.55, 1.6, 0.08]} castShadow={false} />
        <Vox kind="wool" tint="#ffd452" position={[x, 4.2, 0.18]} size={[0.62, 0.22, 0.1]} castShadow={false} />
      </group>
    ))}
    <Glow position={[0, 4.2, 1.6]} size={5.2} color="#ffe398" opacity={0.28} />
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
    <RichMansion position={[6.4, 5.85, -33.2]} lit={lit > 0} />
    <Vox kind="stoneBrick" position={[-9.5, 9.4, -31.6]} size={[5.0, 0.4, 2.4]} />
    {/* the ladder: rails and rungs, going up out of the top of frame */}
    <Vox kind="darkPlanks" position={[LADDER_X - 0.42, 6.6, -31.9]} size={[0.12, 13.2, 0.12]} />
    <Vox kind="darkPlanks" position={[LADDER_X + 0.42, 6.6, -31.9]} size={[0.12, 13.2, 0.12]} />
    {Array.from({ length: 12 }, (_, i) => (
      <Vox key={i} kind="darkPlanks" position={[LADDER_X, 0.9 + i * 1.02, -31.9]} size={[0.9, 0.1, 0.1]} castShadow={false} />
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
    {/* the boat, tied at the jetty's side */}
    <Vox kind="darkPlanks" position={[2.9, 0.1, 10.4]} size={[1.7, 0.2, 3.6]} />
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
