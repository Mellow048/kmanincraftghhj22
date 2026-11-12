import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Room, Stall, Well } from "../../../Topics/InThisTown";
import { FRIEND_WINDOW, PLACE } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  One street, west–east (x). House fronts on the north side face south, at the camera.
 *            The square is at x = 0. The well is south-west of it: the film begins and ends there.
 *            By day it is the town he liked. At night (a shot whose look is "overworld-night") the same
 *            street has a moon over it, and that is the film's THIRD place: nothing new is built, the
 *            thing the rule was hiding was standing in the street the whole time.
 *   room     The teller's room. No south wall: that is where the camera lives.
 *
 * The parts come from the topic's pack (Topics/InThisTown/places.tsx). 1 unit = 1 block = 1 metre. Ground is y = 0.
 *
 * North side, west to east (fronts at z = -5, facing south):
 *   x = -21  a house           x = -10  the oldest woman's, with the raised porch
 *   x =   0  the big house, set back to z = -7, behind the bell
 *   x =  10  HOME (window at x = 11.5)      x = 20  his FRIEND's (low bay window at x = 18.4)
 * South side (fronts at z = 11 to 12.5, facing north): x = -13, 1.5, 15.
 */

/** His friend's window: a low bay a kid can stand in, with glazing bars in front of her. */
const Bay: React.FC = () => {
  const [x, y, z] = FRIEND_WINDOW;
  return (
    <group position={[x, y, z]}>
      <Block position={[0, 0, 0.03]} size={[1.5, 1.5, 0.1]} color="#10141f" castShadow={false} />
      <Vox kind="darkPlanks" position={[0, -0.86, 0.36]} size={[1.7, 0.22, 0.8]} />
      <Vox kind="darkPlanks" position={[0, 0.86, 0.36]} size={[1.7, 0.22, 0.8]} />
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * 0.78, 0, 0.36]} size={[0.16, 1.5, 0.8]} />
      ))}
      <Block position={[0, 0, 0.72]} size={[1.4, 0.06, 0.04]} color="#5c3f24" castShadow={false} />
      <Block position={[0, 0, 0.72]} size={[0.06, 1.5, 0.04]} color="#5c3f24" castShadow={false} />
    </group>
  );
};

const Village: React.FC<{ night: boolean }> = ({ night }) => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Vox kind="path" position={[-5, 0.022, 5.5]} size={[5, 0.06, 5]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* A raised porch: whoever stands on it looks down at a kid, and the two stack in a tall frame. */}
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={PLACE.friend} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} />
    <Bay />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {/* The pumpkin patch behind the stall: where every face in town was grown. */}
    {(
      [
        [-17.5, -1.2, 0.3],
        [-16.6, -0.4, -0.4],
        [-18.3, -0.2, 0.9],
        [-17.2, 0.6, 2.1],
        [26.2, 5.6, 0.2],
        [27.1, 6.4, -0.7],
      ] as Array<[number, number, number]>
    ).map(([x, z, r], i) => (
      <group key={i} position={[x, 0.24, z]} rotation={[0, r, 0]}>
        <Block size={[0.5, 0.48, 0.5]} color="#e07f1c" />
        <Block position={[0, 0.28, 0]} size={[0.09, 0.09, 0.09]} color="#5a7a2a" />
        <Vox kind="leaves" position={[0.42, -0.18, 0.1]} size={[0.5, 0.1, 0.4]} />
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
        [31, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />

    {night ? (
      <>
        {/* The full moon he waited for, low in the north, over the roofs. It is the key light's excuse. */}
        <Block position={[-22, 62, -110]} size={[11, 11, 1]} color="#f4f7ff" emissive="#e6eeff" emissiveIntensity={1.6} castShadow={false} />
        <Glow position={[-22, 62, -108]} size={46} color="#9fb8ff" opacity={0.3} />
        <Clouds y={52} center={[0, 0, 0]} color="#3a4674" opacity={0.35} />
        <GodRay position={[-6.5, 5, 3.5]} rotation={[0, 0, 0.42]} width={3.2} height={11} color="#a9c2ff" opacity={0.07} />
        <LightPool position={[-5, 0.07, 5.5]} width={6} depth={6} color="#8fb0ff" opacity={0.2} />
        <Glow position={[5.2, 2.4, 6.6]} size={1.8} color="#ffb066" opacity={0.3} />
        <Dust position={[-3, 2.2, 3]} area={[26, 4, 14]} count={60} size={0.04} color="#cfe0ff" opacity={0.5} seed={8} speed={0.12} />
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

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village night={night} />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
