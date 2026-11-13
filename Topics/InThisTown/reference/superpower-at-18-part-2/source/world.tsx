/** Part two is fought in the same town as part one: this is part one's world, copied, so the two films cannot break each other. */
import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bell, Blaze, FireLight, Hut, LampPost, Room, Smoke, Stall, Well } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zones it plays in, joined with "+" (kit.tsx: ZONE.day, ZONE.fire, ZONE.ruin).
 *
 *   village  The ground and everything that does not burn: street, bell, well, stall, pond, pig pen, the gate and the
 *            road north, the hills, and beyond the hills the village "that teaches boys to be kind".
 *   calm     The houses as they were.           fire  The same houses burning, and the smoke over the hills.
 *   home     His house, standing.               ruin  His house after it exploded.
 *   room     His room. No south wall: that is where the camera lives.
 *
 * A shot whose look is "overworld-night" gets the moon. 1 unit = 1 block = 1 metre. Ground is y = 0.
 *
 * North side, west to east (fronts at z = -5, facing south):
 *   x = -21  a house        x = -10  the BAKER's (the roof he fixes)       x = 0  the big house, behind the bell
 *   x =  10  HOME           x =  20  a house
 * The road north leaves the square at x = 5, through the GATE, and goes over the hills.
 * South side (fronts at z = 11 to 12.5, facing north): x = -21, 1.5, 15. The pig pen is at x = -10, z = 10.
 */

type H = { at: Vec3; w: number; d?: number; h?: number; wall?: "cobble"; tint?: string; roof: string; windows: number[]; door?: number; turn?: number };
const HOUSES: H[] = [
  { at: [-21, 0, -5], w: 7, roof: "#3f6b3a", windows: [-2, 2] },
  { at: PLACE.baker, w: 6, h: 3.6, wall: "cobble", roof: "#5a4a6a", windows: [-2, 2] },
  { at: [0, 0, -7], w: 8.4, d: 7, h: 4.6, roof: "#8a3b2a", windows: [-2.7, 2.7] },
  { at: [20, 0, -5], w: 6, h: 3.6, tint: "#d8c49a", roof: "#3d5f9a", windows: [-1.6], door: 1.2 },
  { at: [-21, 0, 11], w: 7, tint: "#d8c49a", roof: "#8a3b2a", windows: [-1.8, 1.8], turn: Math.PI },
  { at: [1.5, 0, 12.5], w: 6, h: 3.6, wall: "cobble", roof: "#3d5f9a", windows: [1.5], door: -1.2, turn: Math.PI },
  { at: [15, 0, 11], w: 6.5, tint: "#caa268", roof: "#5a4a6a", windows: [-1.6], door: 1.3, turn: Math.PI },
];
const HOME: H = { at: PLACE.home, w: 6.5, tint: "#caa268", roof: "#3f6b3a", windows: [1.5], door: -1.3 };

const House: React.FC<{ h: H; ablaze?: boolean; burnt?: boolean }> = ({ h, ablaze, burnt }) => (
  <Hut at={h.at} w={h.w} d={h.d} h={h.h} wall={h.wall} tint={h.tint} roof={h.roof} windows={h.windows} door={h.door} turn={h.turn} ablaze={ablaze} burnt={burnt} />
);
/** The middle of a house's roof. */
const roofOf = (h: H): Vec3 => [h.at[0], (h.h ?? 3.8) + 1.2, h.at[2] + (h.turn ? 1 : -1) * ((h.d ?? 6) / 2)];

const Fence: React.FC<{ at: Vec3; w: number; d: number }> = ({ at, w, d }) => (
  <group position={at}>
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="log" position={[0, 0.55, (s * d) / 2]} size={[w, 0.12, 0.1]} />
        <Vox kind="log" position={[0, 0.25, (s * d) / 2]} size={[w, 0.1, 0.1]} />
        <Vox kind="log" position={[(s * w) / 2, 0.55, 0]} size={[0.1, 0.12, d]} />
        <Vox kind="log" position={[(s * w) / 2, 0.25, 0]} size={[0.1, 0.1, d]} />
        {[-1, 1].map((q) => (
          <Vox key={q} kind="log" position={[(s * w) / 2, 0.4, (q * d) / 2]} size={[0.18, 0.8, 0.18]} />
        ))}
      </group>
    ))}
  </group>
);

const Ground: React.FC<{ night: boolean; burning: boolean }> = ({ night, burning }) => (
  <>
    <Vox kind="grass" position={[0, -0.5, -10]} size={[140, 1, 120]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[64, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Vox kind="path" position={[-5, 0.022, 5.5]} size={[5, 0.06, 5]} />
    {/* The road north: out of the square, through the gate, over the hills. */}
    <Vox kind="path" position={[5, 0.023, -22]} size={[2.6, 0.06, 40]} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="log" position={[PLACE.gate[0] + s * 1.6, 1.3, PLACE.gate[2]]} size={[0.4, 2.6, 0.4]} />
    ))}
    <Vox kind="darkPlanks" position={[PLACE.gate[0], 2.75, PLACE.gate[2]]} size={[4, 0.3, 0.5]} />
    {/* The hills. The road goes through the gap in the middle. */}
    {(
      [
        [-30, -44, 30, 7],
        [-12, -48, 22, 10],
        [22, -46, 26, 9],
        [44, -42, 26, 6],
        [-52, -40, 26, 5],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, h], i) => (
      <group key={i}>
        {[0, 1, 2, 3].map((k) => (
          <Vox key={k} kind="grass" tint={k % 2 ? "#5d9a45" : undefined} position={[x, (h * (k + 0.5)) / 4, z]} size={[w * (1 - k * 0.2), h / 4, 12 * (1 - k * 0.18)]} />
        ))}
      </group>
    ))}

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {/* The pond. */}
    <Block position={[PLACE.pond[0], 0.03, PLACE.pond[2]]} size={[4.6, 0.05, 3.6]} color="#3f7fd8" emissive="#2a5fb8" emissiveIntensity={0.35} castShadow={false} />
    <Vox kind="cobble" position={[PLACE.pond[0], 0.05, PLACE.pond[2] + 1.95]} size={[5, 0.14, 0.3]} />
    <Vox kind="cobble" position={[PLACE.pond[0], 0.05, PLACE.pond[2] - 1.95]} size={[5, 0.14, 0.3]} />
    <Vox kind="cobble" position={[PLACE.pond[0] + 2.45, 0.05, PLACE.pond[2]]} size={[0.3, 0.14, 3.6]} />
    <Vox kind="cobble" position={[PLACE.pond[0] - 2.45, 0.05, PLACE.pond[2]]} size={[0.3, 0.14, 3.6]} />

    {/* The pig pen: a fence round a square of mud. */}
    <Block position={[PLACE.pen[0], 0.03, PLACE.pen[2]]} size={[5.4, 0.06, 4.4]} color="#5a4030" castShadow={false} />
    <Block position={[PLACE.pen[0] + 0.9, 0.035, PLACE.pen[2] - 0.6]} size={[1.6, 0.06, 1.2]} color="#4a3324" castShadow={false} />
    <Fence at={PLACE.pen} w={5.6} d={4.6} />

    {(
      [
        [-32, -14, 4.6],
        [-15.5, -14.5, 4],
        [12, -17, 4.4],
        [27, -12, 4.6],
        [-30, 15, 4],
        [8, 19, 4.4],
        [25, 14, 4],
        [-36, 1, 4.8],
        [33, 4, 4.4],
        [-3, -24, 4.2],
        [11, -30, 4.6],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={burning && i % 3 === 0 ? "#3a3026" : i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />

    {night ? (
      <>
        <Block position={[14, 30, -60]} size={[5, 5, 0.5]} color="#f4f7ff" emissive="#e6eeff" emissiveIntensity={1.6} castShadow={false} />
        <Glow position={[14, 30, -59]} size={20} color="#9fb8ff" opacity={0.3} />
        <Clouds y={52} center={[0, 0, 0]} color="#3a4674" opacity={0.35} />
        <GodRay position={[4, 5, -6]} rotation={[0, 0, 0.3]} width={3.2} height={11} color="#a9c2ff" opacity={0.07} />
        <LightPool position={[5, 0.07, -7]} width={6} depth={6} color="#8fb0ff" opacity={0.2} />
        <Dust position={[2, 2.2, -2]} area={[26, 4, 16]} count={60} size={0.04} color="#cfe0ff" opacity={0.5} seed={8} speed={0.12} />
        <pointLight position={[5, 3, -5]} color="#a8bcff" intensity={16} distance={14} decay={2} />
      </>
    ) : burning ? (
      <>
        <Clouds y={40} center={[0, 0, 0]} color="#2a2422" opacity={0.7} />
        <GodRay position={[6, 6, 0]} rotation={[0, 0, 0.4]} width={5} height={12} color="#ff9a4a" opacity={0.07} />
        <LightPool position={[6, 0.07, 1.5]} width={12} depth={9} color="#ff8a3a" opacity={0.2} />
        <Dust position={[2, 3, 2]} area={[40, 8, 24]} count={130} size={0.07} color="#ffb347" opacity={0.95} seed={17} speed={0.7} />
      </>
    ) : (
      <>
        <Clouds y={48} center={[0, 0, 0]} />
        <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
        <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
        <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
        <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
      </>
    )}
  </>
);

/** The town on fire: every roof, and the smoke over the hills where the other village was. */
const Burning: React.FC = () => (
  <>
    {HOUSES.map((h, i) => (
      <group key={i}>
        <House h={h} ablaze />
        <Blaze position={roofOf(h)} size={1.5} height={5} count={9} seed={i + 2} />
        <Smoke position={[roofOf(h)[0], roofOf(h)[1] + 3, roofOf(h)[2]]} rise={15} spread={2.2} size={5.5} count={9} color="#2e2622" opacity={0.9} speed={0.12} lean={-0.1} seed={i + 11} />
      </group>
    ))}
    <Blaze position={[PLACE.stall[0], 1.2, PLACE.stall[2]]} size={0.9} height={3} count={6} seed={31} />
    <FireLight position={[-10, 5, -4]} power={26} reach={18} seed={1} />
    <FireLight position={[2, 5, 9]} power={26} reach={18} seed={2} />
    <FireLight position={[17, 5, 6]} power={22} reach={18} seed={3} />
    <FireLight position={[12, 3, -3]} power={22} reach={14} seed={4} />
    <Smoke position={[-6, 9, -66]} rise={30} spread={5} size={13} count={12} color="#2a2320" opacity={0.95} speed={0.06} lean={0.1} seed={41} />
    <Smoke position={[10, 9, -70]} rise={30} spread={5} size={14} count={12} color="#332a26" opacity={0.95} speed={0.05} lean={0.08} seed={42} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  const burning = look === "overworld-storm";
  return (
    <>
      <Zone name="village">
        <Ground night={night} burning={burning} />
      </Zone>
      <Zone name="calm">
        {HOUSES.map((h, i) => (
          <House key={i} h={h} />
        ))}
      </Zone>
      <Zone name="fire">
        <Burning />
      </Zone>
      <Zone name="home">
        <House h={HOME} />
      </Zone>
      <Zone name="ruin">
        <House h={HOME} burnt />
        <Blaze position={[PLACE.home[0] - 1, 1.2, PLACE.home[2] - 2.5]} size={1.3} height={4} count={8} seed={51} />
        <Smoke position={[PLACE.home[0], 3, PLACE.home[2] - 3]} rise={14} spread={2.4} size={6} count={10} color="#2a2320" opacity={0.92} speed={0.13} lean={-0.1} seed={52} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
