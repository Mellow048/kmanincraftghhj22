import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Block, PixelText } from "../../engine";
import { Bell, Hut, LampPost, Pine, Room, Stall, Well } from "../../../Topics/InThisTown";
import { CLASS, COLS, Desk, FOREST, LIVING, PLACE, ROWS } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  One street, west–east (x). House fronts on the north side face south, at the camera.
 *            The square is at x = 0.
 *   room     The teller's room. No south wall: that is where the camera lives. Lens north, east or west.
 *
 * This is a STARTER: the town of "Everyone Had the Same Face", without its hill. Change it to fit the story.
 * The story's THIRD place (what the rule was hiding: the other side, the bottom of the well, behind the wall)
 * is yours to build, as a third zone. See src/videos/in-this-town-same-face/world.tsx for a whole valley.
 *
 * The parts come from the topic's pack (Topics/InThisTown/places.tsx). 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* A raised porch: whoever stands on it looks down at a kid, and the two stack in a tall frame. */}
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    {/* The lunch bench and table in the square. */}
    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

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
    <Clouds y={48} center={[0, 0, 0]} />

    {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust in every zone. */}
    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

/** Mum and dad's sitting room: a sofa, a rug, a lamp, a picture of the three of them. Open to the south. */
const Living: React.FC = () => (
  <group position={LIVING}>
    <Vox kind="planks" position={[0, -0.1, 1]} size={[7, 0.2, 8]} />
    <Vox kind="planks" tint="#d8c098" position={[0, 2.2, -2.6]} size={[7, 4.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#cdb48a" position={[-3.5, 2.2, 1]} size={[0.2, 4.4, 8]} castShadow={false} />
    <Vox kind="planks" tint="#cdb48a" position={[3.5, 2.2, 1]} size={[0.2, 4.4, 8]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 4.5, 1]} size={[7.2, 0.2, 8]} castShadow={false} />
    <Vox kind="wool" tint="#b5523a" position={[0, 0.02, 0.2]} size={[3.6, 0.04, 2.6]} />
    {/* the sofa: seat top at y 0.5 */}
    <Block position={[0, 0.25, -1.7]} size={[2.9, 0.5, 0.9]} color="#3d6f8f" />
    <Block position={[0, 0.8, -2.2]} size={[2.9, 1.1, 0.3]} color="#35627f" />
    <Block position={[-1.55, 0.55, -1.7]} size={[0.3, 0.9, 0.9]} color="#35627f" />
    <Block position={[1.55, 0.55, -1.7]} size={[0.3, 0.9, 0.9]} color="#35627f" />
    {/* picture, window, lamp */}
    <Block position={[0, 2.6, -2.48]} size={[1.2, 0.8, 0.05]} color="#5c3f24" castShadow={false} />
    <Block position={[0, 2.6, -2.45]} size={[1.0, 0.6, 0.03]} color="#cfe6d0" castShadow={false} />
    <Block position={[-2.3, 2.3, -2.48]} size={[1.1, 1.1, 0.05]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={1} castShadow={false} />
    <Block position={[2.6, 0.9, -2.0]} size={[0.08, 1.8, 0.08]} color="#3a2a22" />
    <Block position={[2.6, 1.9, -2.0]} size={[0.4, 0.36, 0.4]} color="#000000" emissive="#ffd9a0" emissiveIntensity={1} castShadow={false} />
    <pointLight position={[2.4, 2.0, -1.6]} color="#ffdcae" intensity={10} distance={8} decay={2} />
    <pointLight position={[0, 2.6, 3]} color="#ffffff" intensity={26} distance={11} decay={2} />
    <pointLight position={[-2, 2.6, 0]} color="#fff0d8" intensity={10} distance={8} decay={2} />
    <GodRay position={[-2.1, 1.3, -1.4]} rotation={[0.5, 0, -0.1]} width={1.3} height={2.6} color="#fff0c8" opacity={0.12} />
    <LightPool position={[-1.6, 0.03, -0.3]} width={1.8} depth={1.6} color="#fff0c8" opacity={0.3} />
    <Glow position={[2.6, 1.9, -1.9]} size={1.0} color="#ffd9a0" opacity={0.3} />
    <Dust position={[0, 1.5, 0]} area={[6, 2.6, 4.6]} count={40} size={0.03} color="#fff3d0" opacity={0.6} seed={6} speed={0.15} />
  </group>
);

/** The classroom without its end walls: floor, side walls, roof, twelve desks facing north. */
const Classroom: React.FC = () => (
  <group position={CLASS}>
    <Vox kind="planks" position={[0, -0.1, 0]} size={[9, 0.2, 10]} />
    <Vox kind="planks" tint="#d9d2bd" position={[-4.5, 2, 0]} size={[0.2, 4, 10]} castShadow={false} />
    <Vox kind="planks" tint="#d9d2bd" position={[4.5, 2, 0]} size={[0.2, 4, 10]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 4.1, 0]} size={[9.2, 0.2, 10]} castShadow={false} />
    {ROWS.map((z) => COLS.map((x) => <Desk key={`${x}${z}`} position={[x, 0, z]} />))}
    <pointLight position={[0, 3.4, -2]} color="#ffffff" intensity={40} distance={14} decay={2} />
    <pointLight position={[0, 3.4, 3]} color="#fff4e0" intensity={40} distance={14} decay={2} />
    <pointLight position={[-3, 2.6, 0]} color="#fff0d8" intensity={14} distance={9} decay={2} />
    <GodRay position={[-2.6, 2, 1]} rotation={[0, 0, 0.5]} width={2.4} height={5} color="#fff0c8" opacity={0.07} />
    <LightPool position={[0, 0.03, 0.6]} width={6} depth={5} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 3.6, 0]} size={2} color="#fff0c8" opacity={0.15} />
    <Dust position={[0, 1.8, 0]} area={[8, 3, 8]} count={50} size={0.035} color="#fff7d8" opacity={0.6} seed={8} speed={0.15} />
  </group>
);
const ClassNorth: React.FC = () => (
  <group position={CLASS}>
    <Vox kind="planks" tint="#e2dcc8" position={[0, 2, -5]} size={[9, 4, 0.2]} castShadow={false} />
    <Block position={[0, 2.1, -4.86]} size={[4.6, 1.7, 0.08]} color="#5c3f24" castShadow={false} />
    <Block position={[0, 2.1, -4.82]} size={[4.3, 1.4, 0.04]} color="#27483a" castShadow={false} />
    <PixelText text="ROBOTICS" position={[0, 2.4, -4.78]} height={0.36} maxWidth={3.4} color="#e8f0e4" />
    <PixelText text="BRING YOUR ROBOT" position={[0, 1.85, -4.78]} height={0.22} maxWidth={3.6} color="#cfe0c8" />
    <Block position={[0, 0.45, -3.6]} size={[1.8, 0.9, 0.7]} color="#7a5632" />
  </group>
);
const ClassSouth: React.FC = () => (
  <group position={CLASS}>
    <Vox kind="planks" tint="#e2dcc8" position={[0, 2, 5]} size={[9, 4, 0.2]} castShadow={false} />
    {[-2.6, 0, 2.6].map((x) => (
      <group key={x} position={[x, 2.2, 4.86]}>
        <Block size={[1.6, 1.5, 0.08]} color="#5c3f24" castShadow={false} />
        <Block position={[0, 0, -0.03]} size={[1.36, 1.26, 0.04]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={1} castShadow={false} />
        <Block position={[0, 0, -0.06]} size={[0.06, 1.26, 0.03]} color="#5c3f24" castShadow={false} />
      </group>
    ))}
  </group>
);

/** The clearing: grass, a ring of pines, open to the south. The trees that get cut are the shots'. */
const Forest: React.FC = () => {
  const ring: Array<[number, number, number]> = [];
  for (let i = 0; i < 30; i++) {
    const a = -0.35 + (i / 29) * (Math.PI + 0.7);
    const r = 9.5 + ((i * 37) % 7) * 0.9;
    ring.push([Math.cos(a) * r * 1.15, -Math.sin(a) * r - 1, 6.5 + ((i * 13) % 5) * 0.8]);
  }
  return (
    <group position={FOREST}>
      <Vox kind="grass" position={[0, -0.5, 0]} size={[90, 1, 90]} />
      {ring.map(([x, z, hh], i) => (
        <Pine key={i} position={[x, 0, z]} height={hh} leaf={i % 2 ? "#1f3d2a" : "#27492f"} />
      ))}
      {([[-6.5, -6.5, 8], [6.8, -6, 7.4], [-8.5, -1, 7], [8.6, -0.5, 7.8], [0.5, -9.5, 8.4]] as Array<[number, number, number]>).map(([x, z, hh], i) => (
        <Pine key={`n${i}`} position={[x, 0, z]} height={hh} />
      ))}
      {[[-3.2, 0.03, -2.4, 0.5], [2.2, 0.03, 1.1, 0.4], [-0.8, 0.03, 2.6, 0.45]].map(([x, y, z, s], i) => (
        <Block key={`r${i}`} position={[x, y + s * 0.3, z]} size={[s, s * 0.6, s * 0.8]} color="#7d8188" />
      ))}
      <pointLight position={[0, 9, 4]} color="#dfe6ff" intensity={160} distance={30} decay={2} />
      <pointLight position={[-6, 4, 6]} color="#cfd8ff" intensity={50} distance={18} decay={2} />
      <pointLight position={[6, 4, 6]} color="#ffe6cc" intensity={50} distance={18} decay={2} />
      <GodRay position={[-2, 6, -3]} rotation={[0, 0, 0.4]} width={4} height={12} color="#dfe6ff" opacity={0.06} />
      <LightPool position={[0, 0.04, 0]} width={9} depth={7} color="#dfe6ff" opacity={0.1} />
      <Glow position={[0, 7, -8]} size={5} color="#cfd8ff" opacity={0.12} />
      <Dust position={[0, 2.4, 0]} area={[18, 5, 14]} count={60} size={0.04} color="#e6ecff" opacity={0.5} seed={9} speed={0.2} />
    </group>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
      <Zone name="living">
        <Living />
      </Zone>
      <Zone name="class">
        <Classroom />
      </Zone>
      <Zone name="classN">
        <ClassNorth />
      </Zone>
      <Zone name="classS">
        <ClassSouth />
      </Zone>
      <Zone name="forest">
        <Forest />
      </Zone>
    </>
  );
};
