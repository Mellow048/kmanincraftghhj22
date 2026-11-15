import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, clamp01, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bell, Hut, LampPost, Moon, Room, Stall, Stars, SteppedHill, Well } from "../../../Topics/InThisTown";
import { Blaze, GATE, Gate, HILL, PLACE, ROAD_Z, Smoke, clock } from "./kit";

/**
 * THE TOWN, in two zones. A shot names the zone it plays in, and the other is not drawn.
 *
 *   village  One street, west–east (x). House fronts on the north side face south, at the camera.
 *            The square is at x = 0. The street ends at the HILL (x = 30 to 54), and on top of the hill,
 *            across the road, stands the GATE. Everything outdoors is this one zone.
 *   room     The teller's room. No south wall: that is where the camera lives.
 *
 * The world keeps the film's clock for three things that outlive a shot: when the gate is lit, when the roofs
 * are burning, and whether it is night. Everything else is put on stage by the shots.
 *
 * The parts come from the topic's pack (Topics/InThisTown/places.tsx). 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

/** Every year: it lights in daylight for the three lines that tell what it is for. */
const T_YEARLY = clock.at("2.lit", "lit") - 0.05;
const T_YEARLY_END = clock.end("2.gate");
const T_LIT = clock.at("8.night", "lit");
const T_ROOFS = clock.at("9.roofs", "roofs");
const T_QUIET = clock.at("12.quiet");
const T_AGAIN = clock.at("13.gate", "lit");
const T_BIGGER = clock.at("13.gate", "bigger");

/** The three houses that burn: [the middle of the roof, how big the fire is]. */
const BURNING: Array<{ at: Vec3; turn: number }> = [
  { at: [20, 0, -5], turn: 0 },
  { at: [15, 0, 11], turn: Math.PI },
  { at: [-10, 0, -5], turn: 0 },
];
const roofOf = (hut: { at: Vec3; turn: number }): Vec3 => [hut.at[0] - Math.sin(hut.turn) * 3, 4.4, hut.at[2] - Math.cos(hut.turn) * 3];

const Village: React.FC<{ night: boolean; fire: number; lit: number; eyes: number }> = ({ night, fire, lit, eyes }) => (
  <>
    <Vox kind="grass" position={[10, -0.5, 0]} size={[150, 1, 100]} />
    <Vox kind="path" position={[3, 0.02, ROAD_Z]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" lit={night} />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} ablaze={fire > 0} lit={night && fire <= 0} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} lit={night} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} lit={night} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} ablaze={fire > 0} lit={night && fire <= 0} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} lit={night} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} lit={night} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} ablaze={fire > 0} lit={night && fire <= 0} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {/* THE HILL, and the gate on it. Steps of path up the west slope: the road goes on, whatever people say. */}
    <SteppedHill x={HILL.x} layers={HILL.layers} width={HILL.width} length={64} step={HILL.step} />
    {Array.from({ length: HILL.layers }, (_, i) => (
      <Vox key={i} kind="path" position={[HILL.stepAt(i)[0], i + 1.01, ROAD_Z]} size={[HILL.step, 0.04, 3.4]} />
    ))}
    <Vox kind="path" position={[GATE[0], 6.01, ROAD_Z]} size={[6, 0.04, 3.4]} />
    <Gate at={GATE} lit={lit} eyes={eyes} />
    {/* Nothing grows near it. */}
    <Block position={[GATE[0] - 1.6, 6.03, ROAD_Z]} size={[2.4, 0.02, 5]} color="#3a3530" castShadow={false} />
    <Vox kind="cobble" position={[40.2, 6.3, -1.9]} rotationY={0.4} size={[0.9, 0.6, 0.8]} />
    <Vox kind="mossy" position={[40.6, 6.25, 5.6]} rotationY={0.9} size={[0.8, 0.5, 0.7]} />
    <Tree position={[41, 6, -12]} height={3.2} leaf="#3a3d2a" spread={0.7} />
    <Tree position={[43, 6, 17]} height={3.6} leaf="#3a3d2a" spread={0.7} />

    {/* Ridges north and south close the valley, so there is never a bare horizon. */}
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="grass" tint="#5a9a3a" position={[10, 1.5, s * 40]} size={[150, 3, 14]} />
        <Vox kind="grass" tint="#538f36" position={[10, 4.5, s * 45]} size={[150, 3, 8]} />
        {[-44, -28, -12, 5, 21, 36].map((x, i) => (
          <Tree key={x} position={[x + (i % 3), 3, s * (36.5 + (i % 2) * 2)]} height={3.6 + (i % 3) * 0.6} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
        ))}
      </group>
    ))}

    {(
      [
        [-28, -12, 4.6],
        [-15.5, -13.5, 4],
        [6, -15.5, 4.4],
        [15, -13, 3.8],
        [27, -11, 4.6],
        [-25, 14, 4],
        [8, 17, 4.4],
        [25, 13, 4],
        [-33, 1, 4.8],
        [27.5, 8, 4.2],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <LampPost position={[24.5, 0, 5.2]} seed={6} />
    <Vox kind="hay" position={[-3.4, 0.4, -3.4]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="hay" position={[-2.5, 0.4, -3.6]} rotationY={0.3} size={[0.8, 0.8, 0.8]} />
    {[-7.5, 3.4, 13.5, 17.2, 22.5].map((x, i) => (
      <group key={x} position={[x, 0, -0.9 + (i % 2) * 0.3]}>
        <Vox kind="leaves" position={[0, 0.14, 0]} size={[1.1, 0.28, 0.5]} />
        <Block position={[-0.3, 0.33, 0.05]} size={[0.14, 0.14, 0.14]} color={i % 2 ? "#e8433a" : "#f2d23a"} />
        <Block position={[0.25, 0.33, -0.05]} size={[0.14, 0.14, 0.14]} color={i % 3 ? "#f2f2f2" : "#e85a9a"} />
      </group>
    ))}

    {night ? (
      <>
        <Stars center={[10, 0, 0]} radius={150} count={170} seed={4} />
        <Moon position={[-40, 46, -70]} radius={6} glow={0.5} />
      </>
    ) : (
      <Clouds y={48} center={[10, 0, 0]} />
    )}

    {/* The roofs that burn, from the second the line says so. After the last one is put out they only smoke. */}
    {fire > 0
      ? BURNING.map((hut, i) => {
          const r = roofOf(hut);
          return (
            <group key={i}>
              {fire > 0.3 ? (
                <>
                  <Blaze position={[r[0] - 1, 4.0, r[2]]} size={1.9 * fire} height={6 * fire} count={20} seed={i * 2 + 1} />
                  <Blaze position={[r[0] + 1.4, 4.3, r[2] - 0.3]} size={1.3 * fire} height={4.6 * fire} count={12} seed={i * 2 + 2} />
                  <Glow position={[r[0], 6, r[2]]} size={14 * fire} color="#ff6a1e" opacity={0.55 * fire} />
                  <pointLight position={[r[0], 5.5, r[2] + (hut.turn ? -4 : 4)]} color="#ff7a2a" intensity={70 * fire} distance={26} decay={2} />
                </>
              ) : null}
              <Smoke position={[r[0], 6.5, r[2]]} rise={15} spread={2} size={5.5} count={9} speed={0.09} lean={-0.12} seed={30 + i} opacity={0.55 + 0.2 * fire} />
            </group>
          );
        })
      : null}

    {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust in every zone. */}
    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color={night ? "#9fb8ff" : "#fff0c8"} opacity={night ? 0.04 : 0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color={fire > 0.3 ? "#ff8a3a" : night ? "#9fb8ff" : "#fff2c8"} opacity={fire > 0.3 ? 0.22 : 0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust
      position={[4, 3, 1]}
      area={[40, 6, 18]}
      count={fire > 0.3 ? 120 : 70}
      size={fire > 0.3 ? 0.07 : 0.045}
      color={fire > 0.3 ? "#ffb347" : night ? "#cfe0ff" : "#fff7d8"}
      opacity={fire > 0.3 ? 0.9 : 0.6}
      seed={3}
      speed={fire > 0.3 ? 0.6 : 0.2}
    />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const t = useFilmTime();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  // The roofs: full fire from the line that says so, down to embers once the last flier is out.
  const fire = t < T_ROOFS ? 0 : t < T_QUIET ? clamp01((t - T_ROOFS) / 0.35 + 0.35) : 0.25;
  // The gate: dark, lit, dark again when the last one is out, and then lit harder than before.
  const yearly = t >= T_YEARLY && t < T_YEARLY_END ? clamp01((t - T_YEARLY) / 0.2) : 0;
  const lit = yearly > 0 ? yearly : t < T_LIT ? 0 : t < T_QUIET - 0.25 ? clamp01((t - T_LIT) / 0.2) : t < T_AGAIN ? clamp01((T_QUIET - t) / 0.25) : 1.5 * clamp01((t - T_AGAIN) / 0.15 + 0.2);
  const eyes = t < T_BIGGER ? 0 : clamp01((t - T_BIGGER) / 0.9);
  return (
    <>
      <Zone name="village">
        <Village night={night} fire={fire} lit={lit} eyes={eyes} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
