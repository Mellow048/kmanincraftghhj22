import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Torch, Vox, Zone, useActiveShot } from "../../engine";
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

/** The mountain: a wall of stone at the north end, with a ladder on its face and steps cut into the rock. */
const Mountain: React.FC<{ lit: number }> = ({ lit }) => (
  <group>
    <Vox kind="stone" position={[0, 6.5, -36]} size={[104, 13, 8]} tile={3} />
    <Vox kind="stone" position={[-6, 17, -47]} size={[86, 30, 10]} tile={5} />
    <Vox kind="mossy" position={[-6, 32.4, -47]} size={[86, 1.2, 10]} tile={3} />
    <Vox kind="mossy" position={[0, 13.2, -36]} size={[104, 0.8, 8]} tile={2} />
    <Vox kind="grass" position={[0, 13.8, -40]} size={[104, 1.0, 12]} tile={3} />
    <Vox kind="mossy" position={[0, 0.4, -32.2]} size={[104, 1.2, 2.6]} tile={2} />
    {/* the mountain proper: a long way off, so it is a shape with sky over it, not a wall behind the town */}
    <Vox kind="stone" position={[-46, 15, -150]} size={[120, 30, 30]} tile={10} />
    <Vox kind="stone" position={[54, 11, -142]} size={[76, 22, 26]} tile={9} />
    <Vox kind="grass" position={[-46, 30.4, -150]} size={[118, 1.2, 28]} tile={6} />
    <Vox kind="stone" position={[-46, 38, -150]} size={[40, 16, 22]} tile={8} />
    <Vox kind="wool" tint="#f2f6ff" position={[-46, 47.5, -150]} size={[28, 3, 18]} tile={5} />
    {/* the ledge the rich kid stands on, a third of the way up */}
    <Vox kind="stoneBrick" position={[6.4, 5.6, -31.6]} size={[6.0, 0.4, 2.4]} />
    <Vox kind="stoneBrick" position={[-7.5, 9.4, -31.6]} size={[5.0, 0.4, 2.4]} />
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
    {/* the water, and the shallow shelf where they fish */}
    <Vox kind="water" position={[0, -0.06, 24]} size={[240, 0.3, 40]} tile={5} />
    <Vox kind="sand" position={[0, -0.12, 8.6]} size={[240, 0.3, 12]} />
    {/* the jetty */}
    <Vox kind="planks" position={[PLACE.jetty[0], PLACE.jetty[1] - 0.09, PLACE.jetty[2]]} size={[2.6, 0.18, 16]} />
    {[3.2, 6.4, 9.6, 12.8, 15.8].map((z, i) => (
      <group key={z}>
        <Vox kind="log" position={[-1.2, 0.2, z]} size={[0.22, 1.6, 0.22]} />
        <Vox kind="log" position={[1.2, 0.2, z]} size={[0.22, 1.6, 0.22]} />
        {i === 4 ? <Vox kind="log" position={[0, 1.24, z]} size={[2.6, 0.16, 1.4]} /> : null}
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
  <group position={PLACE.gate}>
    <Vox kind="stoneBrick" position={[0, -0.5, -6]} size={[40, 1, 34]} tile={2} />
    {/* the wall the gate is set in */}
    <Vox kind="stoneBrick" position={[-9.5, 3, 0]} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={[9.5, 3, 0]} size={[10, 6, 1.2]} tile={2} />
    <Vox kind="stoneBrick" position={[0, 5.6, 0]} size={[9, 1.2, 1.2]} tile={2} />
    {/* the street behind the gate: a lamp, a bin, a bench, one thin tree */}
    <LampPost position={top(-2.4, 0, -4.5)} />
    <Vox kind="darkPlanks" position={[top(0, 0, -5.6)[0] + 2.2, 0.5, top(0, 0, -5.6)[2]]} size={[0.9, 1.0, 0.9]} />
    <Vox kind="planks" position={[top(0, 0, -5.6)[0] - 2.6, 0.45, top(0, 0, -5.6)[2] + 1.2]} size={[2.2, 0.12, 0.6]} />
    <Vox kind="planks" position={[top(0, 0, -5.6)[0] - 3.4, 0.22, top(0, 0, -5.6)[2] + 1.2]} size={[0.14, 0.5, 0.5]} />
    <Vox kind="planks" position={[top(0, 0, -5.6)[0] - 1.8, 0.22, top(0, 0, -5.6)[2] + 1.2]} size={[0.14, 0.5, 0.5]} />
    <Tree position={[top(0, 0, -6)[0] + 5.5, 0, top(0, 0, -6)[2] - 3]} height={3.2} spread={0.7} />
    {/* more street, going away: clean, plain, nobody in it */}
    {[-7.6, -9.4].map((x, i) => (
      <Vox key={i} kind="stoneBrick" position={[top(0, 0, -6)[0] + x, 2.4, top(0, 0, -6)[2] - 4 - i * 3]} size={[4.5, 4.8, 5]} tile={2} />
    ))}
    <LightPool position={[top(0, 0.05, -5)[0], 0.06, top(0, 0, -5)[2]]} width={8} depth={8} color={night ? "#cfe0ff" : "#fff2c8"} opacity={0.14} />
    {night ? null : <GodRay position={[top(3, 9, -3)[0], 9, top(3, 0, -3)[2]]} rotation={[0, 0, 0.4]} width={6} height={14} color="#fff0c8" opacity={0.08} />}
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
