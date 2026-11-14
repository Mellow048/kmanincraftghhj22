import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import {
  Anvil,
  Bell,
  ForestEdge,
  HookWall,
  Hut,
  IronGolem,
  LanternLine,
  LampPost,
  Moon,
  Moonlight,
  PLACE,
  Pine,
  Rim,
  Room,
  Scarecrow,
  Stars,
  Stall,
  Well,
  WellLid,
  Wheat,
} from "./kit";
import { Villager, ROBE } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  One street, west–east (x). House fronts on the north side face south, at the camera.
 *            The square is at x = 0. The well, with its flowers, is south of it; the forge is west.
 *   gate     The east end: the stone wall, the gate in it, and the wheat and the forest beyond —
 *            which is where the monsters come from, and where the golem falls.
 *   room     The teller's room, a long way off. No south wall: the camera lives there.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[2, 0.02, 2]} size={[58, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.6]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-11, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* A raised porch: the oldest woman stands on it and looks down at a kid. */}
    <Vox kind="cobble" position={[-11, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-11, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} roof={false} />
    <WellLid position={PLACE.well} slide={1.5} turn={0.35} />
    {/* The rim of the well is full of flowers, and has been for as long as anyone remembers. */}
    <Rim count={15} gap={[0, 1]} />
    <Stall position={PLACE.stall} />

    {/* The forge: the hut, the anvil in front of it, and the wall of hooks inside. */}
    <HookWall position={PLACE.forge} rotationY={0} filled />
    <Anvil position={PLACE.anvil} rotationY={0.3} />

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
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    {/* The square at night: one light over the bell, one over the well, so the rim is never black. */}
    <pointLight position={[0, 3.4, -2.2]} color="#ffc484" intensity={34} distance={16} decay={2} />
    <pointLight position={[PLACE.well[0], 2.6, PLACE.well[2] + 0.6]} color="#ffd0a0" intensity={30} distance={14} decay={2} />
    <LanternLine from={[-6, 4.4, -3.2]} to={[6, 4.4, -3.2]} count={7} sag={0.7} lit={[0, 3]} light={3} seed={5} />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.6]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[-4.6, 1.1, 4.2]} size={1.4} color="#ffd9a0" opacity={0.22} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={60} size={0.045} color="#fff7d8" opacity={0.5} seed={3} speed={0.2} />
  </>
);

/**
 * THE GATE. A cobble wall across the east end of the street, a wooden gate in it that is never
 * shut, and beyond it the wheat, the forest and the dark. Two lanterns, both real lights, because
 * this is where the fight happens and the faces have to be readable.
 */
const Gate: React.FC = () => (
  <>
    <Vox kind="grass" position={[30, -0.5, 2]} size={[60, 1, 80]} />
    <Vox kind="path" position={[26, 0.02, 2]} size={[22, 0.06, 4.2]} />

    {/* The wall, with the gate's opening between its two ends. */}
    <Vox kind="cobble" position={[22, 1.5, -5.2]} size={[1.2, 3, 12]} />
    <Vox kind="cobble" position={[22, 1.5, 9.2]} size={[1.2, 3, 12]} />
    <Vox kind="cobble" position={[22, 1.1, 0.6]} size={[1.2, 2.2, 0.9]} />
    <Vox kind="cobble" position={[22, 1.1, 3.6]} size={[1.2, 2.2, 0.9]} />
    <Vox kind="planks" position={[22, 2.85, 2.1]} size={[1.5, 0.5, 4.2]} />
    {/* The gate itself, standing open against the wall. */}
    <Vox kind="planks" position={[22.9, 1.05, -0.9]} size={[0.14, 2, 2.6]} />

    <LampPost position={[21.4, 0, -0.4]} seed={7} />
    <LampPost position={[21.4, 0, 4.6]} seed={8} />
    {/* The two gate lanterns are the only light on the fight: without them a face is a dark shape. */}
    <pointLight position={[21.4, 2.95, -0.4]} color="#ffb060" intensity={45} distance={20} decay={2} />
    <pointLight position={[21.4, 2.95, 4.6]} color="#ffb060" intensity={45} distance={20} decay={2} />

    <Wheat position={[34, 0, 2]} size={[18, 16]} height={0.95} glow={0.12} sway={0.45} seed={7} />
    <Scarecrow position={[30.5, 0, -4.2]} eyes={0.55} lean={0.05} headTurn={0.4} shirt="#6a6f4a" />
    <ForestEdge from={[47, 0, -14]} to={[47, 0, 18]} back={[-1, 0, 0]} depth={9} count={24} seed={11} />
    {(
      [
        [28, 11],
        [36, -10],
        [43, 14],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Pine key={i} position={[x, 0, z]} height={6 + i} spread={2.2} />
    ))}

    <Moon position={[40, 31, 48]} radius={2.8} rotation={[0, -Math.PI / 2 + 0.18, 0]} glow={0.75} />
    <Stars center={[10, 0, 0]} radius={150} count={220} seed={4} />
    <Moonlight on={[23, 0, 2]} from={[40, 31, 48]} radius={11} power={1} strength={3.2} />
    <Clouds y={52} center={[26, 0, 2]} />
    <Glow position={[21.4, 3.2, 2.1]} size={1.6} color="#ffcf8a" opacity={0.3} />
    <Dust position={[24, 1.6, 2]} area={[16, 3, 12]} count={50} size={0.04} color="#cfe0ff" opacity={0.35} seed={9} speed={0.14} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "lantern-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="gate">
        <Gate />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};

/** Kept for the scenes that need a villager standing somewhere: one import, one face. */
export const TownVillager = Villager;
export const ROBES = ROBE;
export const TheGolem = IronGolem;
