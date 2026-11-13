import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import type { BlockKind, Vec3 } from "../../engine";
import { Bell, Fire, Hut, LampPost, Room, Stall, SteppedHill, Tunnel, Well } from "../../../Topics/InThisTown";
import { Blaze, HILL, PLACE, Smoke } from "./kit";

/**
 * THE VALLEY, in five zones. A shot names the zone it plays in.
 *
 *   village  The town. One street, west–east (x); house fronts on the north side face south, at the camera.
 *            The square is at x = 0. The burned house is at the west end.
 *   hill     Only the ground and the hill: for shots on the slope where neither village matters.
 *   valley2  The other side of the hill: a village like ours, on fire. From x = 63 east.
 *   room     The hero's room. No south wall: that is where the camera lives. Lens north, east or west.
 *   tunnel   Under the hill. It runs along x and has no end wall: the camera is where the dirt would be.
 *
 * The ground and the hill belong to every outdoor zone. 1 unit = 1 block = 1 metre. Ground is y = 0.
 *
 * The parts (houses, bell, well, stall, hill, room, tunnel) come from the topic's pack, Topics/InThisTown/places.tsx.
 * This file is only where they stand.
 */

/** The ground, the hill that closes the valley, and the ridges along it. In every outdoor shot. */
const Terrain: React.FC<{ smoke: boolean }> = ({ smoke }) => (
  <>
    <Vox kind="grass" position={[30, -0.5, 0]} size={[190, 1, 104]} />
    <SteppedHill x={HILL.x} layers={HILL.layers} width={HILL.width} length={76} step={HILL.step} />
    {/* Rocks and flowers on the slopes, off the line the story climbs (z = 0). */}
    {(
      [
        [36.4, 3, 5.5, "cobble"],
        [40.1, 6, -6.5, "mossy"],
        [42.4, 8, 9, "cobble"],
        [38.9, 5, -12, "mossy"],
        [58.2, 4, 7, "cobble"],
        [55.8, 6, -8, "mossy"],
      ] as Array<[number, number, number, BlockKind]>
    ).map(([x, y, z, kind], i) => (
      <Vox key={i} kind={kind} position={[x, y + 0.35, z]} rotationY={i * 0.6} size={[1.1, 0.7, 0.9]} />
    ))}
    {(
      [
        [35.2, 2, 3.2, "#f2d23a"],
        [37.6, 4, -4.2, "#e8433a"],
        [41.2, 7, 4.4, "#f2f2f2"],
        [43.6, 9, -3.4, "#f2d23a"],
        [36.4, 3, -8.6, "#e85a9a"],
      ] as Array<[number, number, number, string]>
    ).map(([x, y, z, color], i) => (
      <group key={i} position={[x, y, z]}>
        <Block position={[0, 0.12, 0]} size={[0.04, 0.24, 0.04]} color="#3f8a35" />
        <Block position={[0, 0.27, 0]} size={[0.14, 0.1, 0.14]} color={color} />
      </group>
    ))}
    {(
      [
        [38.2, 4, -17, 3.4],
        [41.8, 7, 15, 3],
        [36.9, 3, 20, 3.6],
        [43, 8, -24, 3.2],
        [57.6, 4, -18, 3.4],
        [54.2, 7, 19, 3],
      ] as Array<[number, number, number, number]>
    ).map(([x, y, z, height], i) => (
      <Tree key={i} position={[x, y, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#356e27"} spread={0.8} />
    ))}
    {[-1, 1].map((s) => (
      <group key={s}>
        <Vox kind="grass" tint="#5a9a3a" position={[30, 1.5, s * 40]} size={[190, 3, 14]} />
        <Vox kind="grass" tint="#538f36" position={[30, 4.5, s * 44]} size={[190, 3, 8]} />
        {[-38, -20, -4, 13, 29, 70, 86, 102].map((x, i) => (
          <Tree key={x} position={[x + (i % 3), 3, s * (36.5 + (i % 2) * 2)]} height={3.6 + (i % 3) * 0.6} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
        ))}
      </group>
    ))}
    <Clouds y={48} center={[30, 0, 0]} color={smoke ? "#6b4a3c" : "#ffffff"} opacity={smoke ? 0.55 : 0.92} />
  </>
);

const Village: React.FC = () => (
  <>
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Vox kind="path" position={[-10, 0.021, -2.6]} size={[3, 0.06, 4.6]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={PLACE.black} w={7} d={6} h={3.8} windows={[-2, 2]} burnt />
    <Hut at={[-10, 0, -5]} w={6} d={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* Her porch is raised, so she looks down at a kid and the two of them stack in a tall frame. */}
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} d={6} h={3.8} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} d={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} d={6} h={3.8} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} d={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} d={6} h={3.8} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {/* The grass round the burned house never grew back. */}
    <Block position={[-21, 0.012, -3.6]} size={[9.5, 0.02, 4.4]} color="#2c2a22" castShadow={false} />
    <Block position={[-17.4, 0.014, -1.6]} size={[2.2, 0.02, 1.6]} color="#34322a" castShadow={false} />

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
        [29.5, -6, 3.6],
        [-33, 1, 4.8],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <Vox kind="hay" position={[-3.4, 0.4, -3.4]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="hay" position={[-2.5, 0.4, -3.6]} rotationY={0.3} size={[0.8, 0.8, 0.8]} />
    {/* Flower beds along the street. */}
    {[-7.5, -2.2, 3.4, 13.5, 17.2, 22.5].map((x, i) => (
      <group key={x} position={[x, 0, -0.9 + (i % 2) * 0.3]}>
        <Vox kind="leaves" position={[0, 0.14, 0]} size={[1.1, 0.28, 0.5]} />
        <Block position={[-0.3, 0.33, 0.05]} size={[0.14, 0.14, 0.14]} color={i % 2 ? "#e8433a" : "#f2d23a"} />
        <Block position={[0.25, 0.33, -0.05]} size={[0.14, 0.14, 0.14]} color={i % 3 ? "#f2f2f2" : "#e85a9a"} />
      </group>
    ))}

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const OTHER_HUTS: Array<{ at: Vec3; w: number; turn: number; roof: string; tint?: string }> = [
  { at: [77, 0, -5], w: 6, turn: 0, roof: "#8a3b2a", tint: "#caa268" },
  { at: [86, 0, -7.5], w: 7, turn: 0, roof: "#3d5f9a" },
  { at: [94.5, 0, -3], w: 6, turn: -0.5, roof: "#3f6b3a", tint: "#d8c49a" },
  { at: [79, 0, 9.5], w: 6, turn: Math.PI, roof: "#5a4a6a", tint: "#d8c49a" },
  { at: [90, 0, 10.5], w: 7, turn: Math.PI, roof: "#8a3b2a" },
];
/** The middle of a hut's roof, in the world. */
const roofOf = (hut: { at: Vec3; turn: number }, up = 5): Vec3 => [hut.at[0] - Math.sin(hut.turn) * 3, up, hut.at[2] - Math.cos(hut.turn) * 3];

/** The village on the other side: the same houses, the same bell, and every roof on fire. */
const OtherVillage: React.FC = () => (
  <>
    <Vox kind="path" position={[84, 0.02, 1]} size={[30, 0.06, 4.6]} />
    <Vox kind="path" position={[84, 0.021, 1]} size={[11, 0.06, 11]} />
    <Bell position={[84, 0, -1.8]} fallen />
    {OTHER_HUTS.map((hut, i) => {
      const r = roofOf(hut);
      return (
        <group key={i}>
          <Hut at={hut.at} w={hut.w} roof={hut.roof} tint={hut.tint} windows={[-1.7, 1.7]} turn={hut.turn} ablaze />
          <Blaze position={[r[0] - 1.1, 4.3, r[2]]} size={2.1} height={7} count={24} seed={i * 2 + 1} />
          <Blaze position={[r[0] + 1.5, 4.7, r[2] - 0.4]} size={1.5} height={5.5} count={16} seed={i * 2 + 2} />
          <Fire from={[r[0] - 0.2, 4.6, r[2] + 0.8]} to={[r[0] + 0.3, 8.2, r[2] + 1]} width={1.2} count={16} seed={i + 3} />
          <Glow position={[r[0], 6.6, r[2]]} size={16} color="#ff6a1e" opacity={0.6} />
          <Smoke position={[r[0], 8, r[2]]} rise={17} spread={2.2} size={6.5} count={11} speed={0.09} lean={0.12} seed={30 + i} />
        </group>
      );
    })}
    <pointLight position={[82, 4.5, 0.5]} color="#ff7a2a" intensity={80} distance={30} decay={2} />
    <pointLight position={[90, 4.5, 2]} color="#ff7a2a" intensity={60} distance={26} decay={2} />
    <pointLight position={[69, 4, 0]} color="#ff8a3a" intensity={55} distance={22} decay={2} />
    {/* What the fire has already had: scorched ground, a cart, a field. */}
    {(
      [
        [80, 3.5, 5, 3.4],
        [87, -3, 4.4, 3],
        [75, 2, 3, 4.2],
        [92, 4.5, 3.6, 2.6],
        [84, 6.5, 2.6, 2.2],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, d], i) => (
      <Block key={i} position={[x, 0.03 + i * 0.002, z]} rotationY={i * 0.5} size={[w, 0.02, d]} color="#1c1612" castShadow={false} />
    ))}
    <Vox kind="hay" tint="#3a2a18" position={[81, 0.4, 5.5]} size={[0.9, 0.8, 0.9]} />
    <Vox kind="hay" tint="#2a1e12" position={[81.9, 0.4, 6]} rotationY={0.4} size={[0.9, 0.8, 0.9]} />
    <Fire from={[81.4, 0.8, 5.7]} to={[81.6, 2.6, 5.8]} width={0.5} count={12} seed={41} />
    <Tree position={[71, 0, -12]} height={4} leaf="#4a3a22" />
    <Tree position={[97, 0, 6]} height={4.4} leaf="#3a2c1a" />

    <LightPool position={[84, 0.06, 1]} width={26} depth={22} color="#ff7a2a" opacity={0.3} />
    <GodRay position={[84, 6, -3]} rotation={[0, 0.3, 0.2]} width={7} height={13} color="#ff8a3c" opacity={0.08} />
    <Dust position={[82, 4, 1]} area={[34, 9, 28]} count={120} size={0.08} color="#ffb347" opacity={0.95} seed={17} speed={0.7} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  const smoke = look === "lava-shore";
  return (
    <>
      <Zone name="hill" with={["village", "valley2"]}>
        <Terrain smoke={smoke} />
      </Zone>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="valley2">
        <OtherVillage />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
      <Zone name="tunnel">
        <Tunnel at={PLACE.tunnel} />
      </Zone>
    </>
  );
};
