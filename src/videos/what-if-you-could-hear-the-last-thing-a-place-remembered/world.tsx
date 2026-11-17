import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, PixelText, Vox, Zone } from "../../engine";
import type { Vec3 } from "../../engine";
import { SchoolHall, Room } from "./kit";
import { Classroom, K, Kitchen, PLACE, S } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   street   The street at midnight: a pavement, a road, the bus shelter, the shop behind it, the bench outside
 *            the shop, and one lamp. This film's power is heard, so the street is built to be QUIET: one light,
 *            no traffic, nothing moving but dust.
 *   kitchen  The kitchen at home: the sink his dad talks to, the table, the door to the hall.
 *   class    The classroom whose wall plays the teacher's worst joke.
 *   gym      A gym with a climbing frame, a stack of mats, and one wall at the west end that remembers nothing.
 *   bath     The bathroom: tiles, a mirror, a basin, and a lot of hard surfaces for a voice to live in.
 *
 * 1 unit = 1 metre. Ground is y = 0.
 *
 * THE ONE THING EVERY ZONE SHARES: a wall. The power works on walls, so every set ends in one, and the lens is
 * always within arm's length of a surface the teller can put his hand on.
 */

/** A flat surface the power works on: a wall, a bench, a mirror, a sink. */
const Surface: React.FC<{ position: Vec3; size: [number, number, number]; color: string; rotation?: Vec3 }> = ({
  position,
  size,
  color,
  rotation,
}) => <Block position={position} size={size} color={color} rotation={rotation} castShadow={false} />;

export const World: React.FC = () => {
  return (
    <>
      {/* THE STREET AT MIDNIGHT. The bus shelter, the shop, the bench, and one lamp. */}
      <Zone name="street">
        <group position={PLACE.street}>
          <Block size={[60, 0.2, 40]} position={[0, -0.1, 4]} color="#3a4a34" />
          {/* the pavement, the kerb, and the road the lens stands on */}
          <Block size={[60, 0.22, 3.0]} position={[0, -0.02, 0]} color="#6a6770" castShadow={false} />
          <Block size={[60, 0.3, 0.2]} position={[0, 0.03, 1.6]} color="#8a8790" castShadow={false} />
          <Block size={[60, 0.24, 9.0]} position={[0, -0.05, 6.6]} color="#23232b" castShadow={false} />
          {[-22, -16, -10, -4, 2, 8, 14, 20].map((x) => (
            <Block key={x} size={[2.4, 0.03, 0.22]} position={[x, 0.08, 6.6]} color="#c9c2a8" castShadow={false} />
          ))}
          {/* the shop, behind the pavement: a lit window and a door it is too late to use */}
          <group position={[-7.0, 0, -2.0]}>
            <Block size={[11, 5.2, 4.0]} position={[0, 2.6, -1.0]} color="#8a7460" castShadow={false} />
            <Block size={[11.4, 0.4, 4.4]} position={[0, 5.3, -1.0]} color="#4a3a30" castShadow={false} />
            <Block size={[1.6, 1.4, 0.1]} position={[-2.4, 2.4, 1.02]} color="#ffd79a" emissive="#ffc478" emissiveIntensity={1.4} castShadow={false} />
            <Block size={[1.6, 1.4, 0.1]} position={[2.4, 2.4, 1.02]} color="#141a2c" emissive="#0e1424" emissiveIntensity={0.1} castShadow={false} />
            <Block size={[1.2, 2.3, 0.12]} position={[0, 1.15, 1.02]} color="#3f5a44" />
            <Block size={[1.3, 2.5, 0.2]} position={[0, 1.25, 0.96]} color="#2a3a30" castShadow={false} />
            <PixelText text="SHOP" position={[0, 3.3, 1.06]} height={0.4} color="#fff2cf" />
          </group>
          {/* the bench outside it, with its slats and its arm: the one that says OW */}
          <group position={[-4.2, 0, -0.2]}>
            <Block size={[2.2, 0.08, 0.5]} position={[0, 0.45, 0]} color="#8a6a44" />
            <Block size={[2.2, 0.28, 0.06]} position={[0, 0.66, -0.24]} color="#7a5c3a" castShadow={false} />
            {[-0.95, 0.95].map((x) => (
              <Block key={x} size={[0.09, 0.45, 0.44]} position={[x, 0.22, 0]} color="#3a3a42" />
            ))}
            {[-0.95, 0.95].map((x) => (
              <Block key={`a${x}`} size={[0.08, 0.3, 0.5]} position={[x, 0.62, 0]} color="#3a3a42" castShadow={false} />
            ))}
          </group>
          {/* THE BUS SHELTER: glass on three sides, a lit timetable, a bench nobody sits on */}
          <group position={[2.0, 0, -0.6]}>
            <Block size={[3.0, 2.0, 0.06]} position={[0, 1.3, -0.7]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.16} opacity={0.3} transparent castShadow={false} />
            {[-1.5, 1.5].map((x) => (
              <Block key={x} size={[0.1, 2.5, 0.1]} position={[x, 1.25, -0.7]} color="#333940" />
            ))}
            <Block size={[3.2, 0.14, 1.6]} position={[0, 2.55, -0.1]} color="#2b3138" castShadow={false} />
            <Block size={[3.0, 0.08, 0.42]} position={[0, 0.95, -0.62]} color="#8a6a44" castShadow={false} />
            {/* the timetable, lit from inside */}
            <group position={[-1.16, 1.72, -0.62]}>
              <Block size={[0.9, 0.62, 0.05]} color="#1e2b3a" castShadow={false} />
              {[0.18, 0.06, -0.06, -0.18].map((y) => (
                <Block key={y} size={[0.74, 0.07, 0.02]} position={[0, y, 0.04]} color="#f2efe0" emissive="#fff8e0" emissiveIntensity={0.5} castShadow={false} />
              ))}
            </group>
            <pointLight position={[0, 2.2, -0.2]} color="#cfe0ff" intensity={5} distance={6} decay={2} />
          </group>
          {/* one lamp on the road, and the bus stop sign on its pole */}
          <group position={[5.4, 0, 0.9]}>
            <Block size={[0.18, 3.6, 0.18]} position={[0, 1.8, 0]} color="#2f333a" />
            <Block size={[0.16, 0.16, 0.9]} position={[0, 3.5, -0.4]} color="#2f333a" castShadow={false} />
            <Block size={[0.46, 0.22, 0.38]} position={[0, 3.42, -0.8]} color="#3a3f47" castShadow={false} />
            <Block size={[0.4, 0.1, 0.3]} position={[0, 3.29, -0.8]} color="#fff2c8" emissive="#ffe9a8" emissiveIntensity={2.6} castShadow={false} />
            <pointLight position={[0, 3.2, -0.8]} color="#ffe4b0" intensity={22} distance={13} decay={2} />
          </group>
          {/* the bus stop sign, a red roundel on a post */}
          <group position={[1.9, 0, 1.2]}>
            <Block size={[0.1, 2.6, 0.1]} position={[0, 1.3, 0]} color="#3a3f47" />
            <Block size={[0.62, 0.62, 0.06]} position={[0, 2.7, 0]} color="#c8322a" />
            <Block size={[0.34, 0.16, 0.02]} position={[0, 2.7, 0.04]} color="#fff2cf" castShadow={false} />
          </group>
          <LightPool position={[5.4, 0.02, 0.5]} width={6} depth={4} color="#ffe4b0" opacity={0.2} />
          <LightPool position={[2.0, 0.02, -0.2]} width={4} depth={3} color="#cfe0ff" opacity={0.16} />
          <Glow position={[5.4, 3.2, 0.2]} size={2.6} color="#ffe4b0" opacity={0.22} />
          <GodRay position={[5.4, 2.4, 0.4]} rotation={[0, 0, 0.08]} width={0.8} height={3.2} color="#ffe4b0" opacity={0.1} />
          {/* A fill from the road, where every lens in this film lives. Without it a face turned to the camera at
              midnight is a black box: the lamps light the pavement, and the camera is never on the pavement. */}
          <pointLight position={[1.6, 2.6, 6.2]} color="#b9c8ff" intensity={26} distance={16} decay={2} />
          <pointLight position={[-4.2, 2.4, 2.6]} color="#c9d6ff" intensity={14} distance={9} decay={2} />
          <Dust position={[2, 1.9, 0.4]} area={[18, 3, 6]} count={40} size={0.03} color="#ffe9c8" opacity={0.3} seed={7} speed={0.09} />
        </group>
      </Zone>

      {/* THE KITCHEN AT HOME: the sink his dad talks to. */}
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
        <Glow position={K(-0.2, 2.4, -2.0)} size={2.4} color="#fff0c8" opacity={0.2} />
        <LightPool position={K(-0.2, 0.02, -0.4)} width={5.6} depth={4.4} color="#fff2c8" opacity={0.14} />
        <GodRay position={K(-2.3, 2.1, -2.6)} rotation={[0.1, 0, 0.05]} width={1.3} height={2.2} color="#fff0c8" opacity={0.12} />
        <Dust position={K(-0.2, 1.6, -0.4)} area={[5.6, 2.4, 4.6]} count={34} size={0.03} color="#fff3d0" opacity={0.46} seed={19} speed={0.12} />
      </Zone>

      {/* THE CLASSROOM: the wall that plays the teacher's worst joke. */}
      <Zone name="class">
        <Classroom at={PLACE.class} board="TODAY" boardSub="A TEST" night={false} />
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.1} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.13} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={36} size={0.03} color="#fff7d8" opacity={0.46} seed={3} speed={0.14} />
      </Zone>

      {/* THE GYM: the climbing frame, the mats, and the wall at the west end that remembers nothing. */}
      <Zone name="gym">
        <group position={PLACE.gym}>
          <Block size={[16, 0.24, 20]} position={[0, -0.12, 0]} color="#b09060" />
          <Vox kind="wool" tint="#d8cba8" position={[0, 3.0, -10.1]} size={[16, 6, 0.2]} castShadow={false} />
          {/* the silent wall: bare, scrubbed, with nothing hung on it and no scuff on it at all */}
          <Vox kind="wool" tint="#cfc2a0" position={[-8.1, 3.0, 0]} size={[0.2, 6, 20]} castShadow={false} />
          <Vox kind="wool" tint="#c8bb98" position={[8.1, 3.0, 0]} size={[0.2, 6, 20]} castShadow={false} />
          <Vox kind="wool" tint="#efe6cc" position={[0, 6.1, 0]} size={[16.4, 0.2, 20.4]} castShadow={false} />
          {/* the climbing frame: wall bars, eight high, in the middle of the floor */}
          {[-2.6, -1.3, 0, 1.3, 2.6].map((x) =>
            [0.6, 1.2, 1.8, 2.4].map((y) => (
              <Block key={`${x}${y}`} size={[2.9, 0.08, 0.08]} position={[x * 0.1 + 3.4, y, -6.4 + x]} color="#a88a5a" castShadow={false} />
            )),
          )}
          {[1.6, 5.2].map((x) => (
            <Block key={x} size={[0.14, 3.0, 0.14]} position={[3.4, 1.5, -6.4 + x - 1.6]} color="#8a6a44" />
          ))}
          {/* the mats, stacked, and the painted lines of a court nobody is playing on */}
          {[0, 1, 2].map((i) => (
            <Block key={i} size={[2.0, 0.16, 1.0]} position={[-4.6, 0.08 + i * 0.16, 2.4]} color={i % 2 ? "#3f5f8a" : "#2f4a6a"} />
          ))}
          <Block size={[12, 0.02, 0.1]} position={[0, 0.02, 2.0]} color="#d8cba8" castShadow={false} />
          <Block size={[0.1, 0.02, 8]} position={[0, 0.02, 0]} color="#d8cba8" castShadow={false} />
          {/* one fluorescent strip, and the shadow it throws along the silent wall */}
          {[-4.0, 0, 4.0].map((x) => (
            <Block key={x} size={[1.6, 0.1, 0.3]} position={[x, 5.9, -3.0]} color="#fff6dc" emissive="#fff0d0" emissiveIntensity={1.4} castShadow={false} />
          ))}
          <pointLight position={[0, 5.5, -3.0]} color="#fff0d0" intensity={16} distance={16} decay={2} />
          <LightPool position={[0, 0.03, -2.0]} width={12} depth={10} color="#fff2c8" opacity={0.1} />
          <GodRay position={[-7.0, 5.4, -3.0]} rotation={[0, 0.15, 0.5]} width={2.4} height={8} color="#fff6dc" opacity={0.08} />
          <Dust position={[0, 2.4, -2]} area={[14, 4, 14]} count={40} size={0.035} color="#fff7d8" opacity={0.3} seed={23} speed={0.1} />
        </group>
      </Zone>

      {/* THE CORRIDOR: the school hall, where a sentence follows him out of a doorway. */}
      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={14} sign="ROOM 9" />
        <LightPool position={[PLACE.hall[0], 0.03, PLACE.hall[2] + 1.0]} width={7} depth={3.4} color="#fff2c8" opacity={0.12} />
        <Dust position={[PLACE.hall[0], 1.7, PLACE.hall[2] + 0.6]} area={[9, 2.4, 3.2]} count={30} size={0.03} color="#fff7d8" opacity={0.4} seed={37} speed={0.12} />
      </Zone>

      {/* HIS BEDROOM: the floor the list is written on, and the wall he cannot hear. */}
      <Zone name="room">
        <Room at={PLACE.room} night />
        <Dust position={[PLACE.room[0], 1.5, PLACE.room[2] + 0.4]} area={[4.4, 2.2, 5.6]} count={26} size={0.028} color="#a9c6ff" opacity={0.4} seed={41} speed={0.1} />
      </Zone>

      {/* THE BATHROOM: hard tiles, a mirror, a basin, and his mother's voice in all of it. */}
      <Zone name="bath">
        <group position={PLACE.bath}>
          {Array.from({ length: 4 }, (_, i) =>
            Array.from({ length: 3 }, (_, j) => (
              <Block key={`${i}${j}`} size={[1.2, 0.1, 1.2]} position={[-1.8 + i * 1.2, -0.05, -0.6 + j * 1.2]} color={(i + j) % 2 ? "#d6e2e4" : "#bcd0d4"} castShadow={false} />
            )),
          )}
          {/* tiled walls, half aqua, half white, and the mirror on the east wall */}
          <Vox kind="wool" tint="#cfe0e2" position={[0, 1.6, -1.3]} size={[4.8, 3.2, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#c7d8da" position={[-2.5, 1.6, 0]} size={[0.2, 3.2, 3.0]} castShadow={false} />
          <Vox kind="wool" tint="#c7d8da" position={[2.5, 1.6, 0]} size={[0.2, 3.2, 3.0]} castShadow={false} />
          <Vox kind="wool" tint="#f2f6f4" position={[0, 3.25, 0]} size={[4.9, 0.2, 3.1]} castShadow={false} />
          <Block size={[1.3, 1.5, 0.06]} position={[0, 1.85, -1.16]} color="#8fb4c0" emissive="#bfe2ff" emissiveIntensity={0.28} opacity={0.7} transparent castShadow={false} />
          <Block size={[1.4, 0.08, 0.1]} position={[0, 2.63, -1.11]} color="#8a9096" castShadow={false} />
          <Block size={[1.4, 0.08, 0.1]} position={[0, 1.07, -1.11]} color="#8a9096" castShadow={false} />
          {/* the basin, the tap, the toothbrushes: a room somebody lives in */}
          <Block size={[1.3, 0.2, 0.6]} position={[0, 0.86, -1.0]} color="#f4f8f6" />
          <Block size={[1.36, 0.06, 0.66]} position={[0, 0.98, -1.0]} color="#ffffff" castShadow={false} />
          <Block size={[0.08, 0.3, 0.08]} position={[0, 1.1, -1.24]} color="#c9d2d4" />
          <Block size={[0.06, 0.26, 0.06]} position={[-0.42, 1.18, -1.14]} color="#e8433a" castShadow={false} />
          <Block size={[0.06, 0.24, 0.06]} position={[-0.26, 1.17, -1.14]} color="#3f8a4f" castShadow={false} />
          <Block size={[0.62, 0.5, 0.06]} position={[1.68, 1.7, -1.14]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.4} castShadow={false} />
          <Block size={[1.5, 0.1, 0.7]} position={[1.55, 1.9, -0.6]} color="#8fa8ac" />
          <Block size={[1.48, 1.6, 0.06]} position={[1.55, 1.0, -0.94]} color="#eef6f4" opacity={0.4} transparent castShadow={false} />
          <Block size={[1.1, 0.06, 0.34]} position={[0, 2.6, -0.2]} color="#fff6dc" emissive="#fff0d0" emissiveIntensity={1.6} castShadow={false} />
          <pointLight position={[0, 2.4, -0.1]} color="#e8f4ff" intensity={7} distance={6} decay={2} />
          <LightPool position={[0, 0.02, -0.2]} width={3.2} depth={2.2} color="#cfe0ff" opacity={0.22} />
          <Glow position={[0, 2.3, -1.0]} size={2.0} color="#e8f4ff" opacity={0.2} />
          <Dust position={[0, 1.4, -0.2]} area={[3.6, 2.2, 2.4]} count={22} size={0.026} color="#eaf6ff" opacity={0.4} seed={27} speed={0.1} />
        </group>
      </Zone>
    </>
  );
};

void Surface;
