import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, LongTable, Room, Stall, Well } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/**
 * THE TOWN AND THE DEN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   street   One street, west–east (x). House fronts on the north side face south, at the camera.
 *            The BOY'S HOUSE is the one with the sill at `PLACE.sill`: that is where the cup is.
 *   den      The foxes' den, in the roots of an old tree outside the town wall. No south wall: the camera lives
 *            there. A hole of a door, a dirt floor, and the pile of everything the family took.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0. The parts come from the topic's pack (Topics/InThisTown).
 */

const Street: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />

    {/* North side, west to east. Fronts face south. The boy's house is the middle one. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[PLACE.boyHouse[0], 0, PLACE.boyHouse[2]]} w={6} h={3.4} tint="#d8c49a" roof="#8a3b2a" door={-1.4} windows={[1.5]} lit />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#caa268" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {(
      [
        [-28, -12, 4.6],
        [-15.5, -13.5, 4],
        [6, -15.5, 4.4],
        [27, -11, 4.6],
        [-25, 14, 4],
        [8, 17, 4.4],
        [-33, 1, 4.8],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[PLACE.bell[0], PLACE.bell[1] + 2.3, PLACE.bell[2]]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

/**
 * The den: the inside of a hollow under an old tree. The roots are the walls, the floor is dirt, and one wall is the
 * family's pile — everything they ever took, stacked where the camera can read it in one shot.
 */
const Den: React.FC = () => {
  const o = PLACE.den;
  return (
    <group position={o}>
      <Vox kind="dirt" position={[0, -0.5, 0]} size={[11, 1, 8]} />
      {/* the back wall of roots, and the two side walls */}
      <Vox kind="log" position={[0, 2.2, -3.2]} size={[11, 5.4, 1.2]} tint="#4a3524" />
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * 5.2, 2.0, 0]} size={[1.2, 5, 8]} tint="#3f2c1e" />
      ))}
      {/* roots hanging into the roof, so it reads as underground and not as a room */}
      {[-3, -1.2, 0.6, 2.4, 3.8].map((x, i) => (
        <Vox
          key={i}
          kind="log"
          tint="#4a3524"
          position={[x, 3.6 + (i % 2) * 0.4, -2.6 + i * 0.9]}
          rotation={[0.3, 0.4 * i, 0.5]}
          size={[0.4, 3.2, 0.4]}
        />
      ))}
      {/* the hole of a door, with the night outside it */}
      <Vox kind="grass" position={[3.4, 0.01, 3.4]} size={[3.2, 0.06, 2.4]} />
      <Glow position={[3.4, 0.6, 3.6]} size={1.5} color="#7f8fd0" opacity={0.3} />
      <LightPool position={[0.4, 0.05, 1.2]} width={7} depth={5} color="#ffd9a0" opacity={0.1} />
      <Dust position={[0, 1.4, 0]} area={[8, 3, 5]} count={40} size={0.04} color="#ffe6b8" opacity={0.4} seed={5} speed={0.12} />
    </group>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="street">
        <Street />
      </Zone>
      <Zone name="den">
        <Den />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
