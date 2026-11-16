import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, PixelText, Vox, Zone } from "../../engine";
import type { Vec3 } from "../../engine";
import { Tray, ZONE_X } from "./kit";
import { BedBox, Room } from "../../../Topics/InThisTown";

/**
 * THE SCHOOL, in four zones. A shot names the zone it plays in; the other three are not drawn.
 *
 *   class  One classroom. The board is on the north wall, the windows east, six desks and the camera's corner.
 *   hall   The corridor between them: lockers north, doors south, strip lights, the prom banner.
 *   cafe   The cafeteria: the counter and the pudding hatch north, long tables, windows south.
 *   gym    The gym at prom: bunting, a ball of light, speakers, a punch table, and the plant he hides behind.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0. The numbers a scene stands in are in kit.tsx (P(), MY_DESK,
 * HER_DESK, HER_TABLE, DANCE, PLANT, MIRROR); this file builds those places. Walls do not cast shadows: the
 * rooms are lit by the scene's look, not by a sun outside the wall.
 */

const WALL = "#ddd5bf";
const WALL2 = "#c9d3d8";
const noShadow = { castShadow: false } as const;

// ----------------------------------------------------------------------------- classroom pieces

const Desk: React.FC<{ at: Vec3; rotationY?: number; scale?: number }> = ({ at, rotationY = 0, scale = 1 }) => (
  <group position={at} rotation={[0, rotationY, 0]} scale={scale}>
    {/* top, at a kid's height, and a shelf under it */}
    <Block position={[0, 0.72, 0]} size={[1.3, 0.06, 0.68]} color="#c99a5e" />
    <Block position={[0, 0.5, -0.02]} size={[1.18, 0.04, 0.56]} color="#a87b46" />
    {[[-0.58, -0.28], [0.58, -0.28], [-0.58, 0.28], [0.58, 0.28]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.36, z]} size={[0.06, 0.72, 0.06]} color="#8a6236" />
    ))}
    {/* a pencil and a book left on it */}
    <Block position={[0.28, 0.762, 0.06]} size={[0.34, 0.02, 0.05]} color="#e8c44a" />
    <Block position={[-0.3, 0.765, 0.02]} size={[0.3, 0.03, 0.22]} color="#4a7fc1" />
  </group>
);

const Chair: React.FC<{ at: Vec3; rotationY?: number }> = ({ at, rotationY = 0 }) => (
  <group position={at} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.45, 0]} size={[0.5, 0.06, 0.5]} color="#b98f56" />
    <Block position={[0, 0.74, -0.22]} size={[0.5, 0.5, 0.05]} color="#b98f56" />
    {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => (
      <Block key={i} position={[x, 0.22, z]} size={[0.05, 0.44, 0.05]} color="#8a6236" />
    ))}
  </group>
);

const Classroom: React.FC = () => {
  const X = ZONE_X.class;
  return (
    <group position={[X, 0, 0]}>
      <Vox kind="planks" position={[0, -0.05, 0]} size={[11.2, 0.1, 9.2]} tile={1} />
      <Vox kind="wool" tint="#e6e0d0" position={[0, 3.72, 0]} size={[11.2, 0.2, 9.2]} tile={1} {...noShadow} />
      {/* north wall + the board */}
      <Vox kind="wool" tint={WALL} position={[0, 1.86, -4.62]} size={[11.2, 3.9, 0.3]} tile={1} {...noShadow} />
      <Vox kind="darkPlanks" tint="#26442f" position={[0, 1.92, -4.42]} size={[4.6, 1.5, 0.08]} tile={1} />
      <Block position={[0, 2.7, -4.45]} size={[4.8, 0.14, 0.14]} color="#8a6236" />
      <Block position={[0, 1.13, -4.45]} size={[4.8, 0.1, 0.2]} color="#8a6236" />
      <Block position={[0, 1.12, -4.32]} size={[4.4, 0.05, 0.06]} color="#e8e2d4" {...noShadow} />
      <PixelText text="POP QUIZ" position={[0, 2.24, -4.36]} height={0.24} color="#f2f6ee" />
      <PixelText text="FRIDAY" position={[0, 1.86, -4.36]} height={0.18} color="#dfe8d8" />
      {/* clock, above the board */}
      <Block position={[0, 3.24, -4.44]} size={[0.5, 0.5, 0.08]} color="#f4f2ea" />
      <Block position={[0, 3.24, -4.39]} size={[0.06, 0.18, 0.02]} color="#2a2a2a" {...noShadow} />
      <Block position={[0.07, 3.27, -4.39]} size={[0.14, 0.035, 0.02]} color="#2a2a2a" {...noShadow} />
      {/* posters either side of the board */}
      <Block position={[-4.2, 2.2, -4.42]} size={[1.0, 1.3, 0.06]} color="#e8c44a" />
      <PixelText text="GO" position={[-4.2, 2.42, -4.37]} height={0.2} color="#2a2a2a" />
      <PixelText text="TEAM" position={[-4.2, 2.1, -4.37]} height={0.16} color="#2a2a2a" />
      <Block position={[4.2, 2.2, -4.42]} size={[1.0, 1.3, 0.06]} color="#4a7fc1" />
      <PixelText text="READ" position={[4.2, 2.34, -4.37]} height={0.16} color="#f2f6ee" />
      <PixelText text="BOOKS" position={[4.2, 2.02, -4.37]} height={0.14} color="#f2f6ee" />
      {/* south wall, behind the camera's corner, and west wall */}
      <Vox kind="wool" tint={WALL} position={[0, 1.86, 4.62]} size={[11.2, 3.9, 0.3]} tile={1} {...noShadow} />
      <Vox kind="wool" tint={WALL} position={[-5.62, 1.86, 0]} size={[0.3, 3.9, 9.2]} tile={1} {...noShadow} />
      {/* east wall: three tall windows and the daylight outside them */}
      <Vox kind="wool" tint={WALL} position={[5.62, 0.42, 0]} size={[0.3, 0.9, 9.2]} tile={1} {...noShadow} />
      <Vox kind="wool" tint={WALL} position={[5.62, 3.42, 0]} size={[0.3, 0.7, 9.2]} tile={1} {...noShadow} />
      {[-3.1, 0, 3.1].map((z) => (
        <group key={z}>
          <Vox kind="wool" tint={WALL} position={[5.62, 1.86, z + 1.72]} size={[0.3, 2.4, 0.34]} tile={1} {...noShadow} />
          <Block position={[5.72, 1.9, z]} size={[0.06, 2.3, 2.9]} color="#cfe6ff" emissive="#cfe6ff" emissiveIntensity={1.1} {...noShadow} />
          <Block position={[5.64, 1.9, z]} size={[0.06, 2.4, 0.08]} color="#f4f2ea" {...noShadow} />
          <Block position={[5.64, 1.9, z]} size={[0.06, 0.08, 2.9]} color="#f4f2ea" {...noShadow} />
        </group>
      ))}
      {/* six desks, two rows, all facing the board; his left, front; hers right, front */}
      {[
        [-3.0, 0.4],
        [0, 0.4],
        [3.0, 0.4],
        [-3.0, 2.5],
        [0, 2.5],
        [3.0, 2.5],
      ].map(([x, z], i) => (
        <group key={i}>
          <Desk at={[x, 0, z]} />
          <Chair at={[x, 0, z + 0.78]} />
        </group>
      ))}
      {/* the teacher's desk, and a globe */}
      <Desk at={[1.7, 0, -3.3]} scale={1.15} />
      <Chair at={[1.7, 0, -2.5]} rotationY={Math.PI} />
      <Block position={[-4.5, 0.95, -3.4]} size={[0.36, 0.36, 0.36]} color="#4a7fc1" />
      <Block position={[-4.5, 0.72, -3.4]} size={[0.06, 0.16, 0.06]} color="#8a6236" />
      {/* the classroom's air */}
      <LightPool position={[2.2, 0.07, 0.4]} width={4} depth={6} color="#fff2c8" opacity={0.14} />
      <Glow position={[0, 2.6, -1]} size={2.4} color="#fff0c0" opacity={0.16} />
      <GodRay position={[4.0, 2.6, 0.4]} rotation={[0, 0, 0.55]} width={3.0} height={7} color="#fff2c8" opacity={0.12} />
      <Dust position={[0, 2.2, 0]} area={[9, 3, 7]} count={55} size={0.03} color="#fff7d8" opacity={0.45} seed={4} speed={0.1} />
    </group>
  );
};

// ----------------------------------------------------------------------------- hallway pieces

const Locker: React.FC<{ at: Vec3; color?: string }> = ({ at, color = "#3f6f8a" }) => (
  <group position={at}>
    <Block position={[0, 0, 0]} size={[0.6, 1.28, 0.4]} color={color} />
    <Block position={[0, 0, 0.205]} size={[0.5, 1.16, 0.02]} color={color} {...noShadow} />
    {[0.3, -0.12, -0.42].map((y, i) => (
      <Block key={i} position={[0, y, 0.216]} size={[0.44, 0.02, 0.01]} color="#1e2a33" {...noShadow} />
    ))}
    <Block position={[0.2, 0.02, 0.22]} size={[0.05, 0.14, 0.03]} color="#d8d8d8" {...noShadow} />
  </group>
);

const StripLight: React.FC<{ at: Vec3; len?: number }> = ({ at, len = 1.7 }) => (
  <group position={at}>
    <Block size={[len, 0.06, 0.34]} color="#ffffff" emissive="#ffffff" emissiveIntensity={1.3} {...noShadow} />
    <Block position={[0, 0.08, 0]} size={[len + 0.1, 0.06, 0.44]} color="#c8ccd2" {...noShadow} />
    <Glow position={[0, -0.2, 0]} size={len * 1.3} color="#e8f4ff" opacity={0.2} />
  </group>
);

const Hallway: React.FC = () => {
  const X = ZONE_X.hall;
  return (
    <group position={[X, 0, 0]}>
      <Vox kind="stone" tint="#b9b4a6" position={[0, -0.05, 0]} size={[30, 0.1, 6.4]} tile={1} />
      {/* the floor's checker: one dark block every 1.5 m */}
      {Array.from({ length: 14 }).map((_, i) =>
        [-1.5, 0, 1.5].map((z) => (
          <Block key={`${i}-${z}`} position={[-13 + i * 2, 0.005, z]} size={[1.0, 0.02, 1.0]} color={i % 2 ? "#8a8578" : "#cfc9b8"} {...noShadow} />
        )),
      )}
      <Vox kind="wool" tint={WALL2} position={[0, 3.32, 0]} size={[30, 0.2, 6.4]} tile={1} {...noShadow} />
      <Vox kind="wool" tint={WALL2} position={[0, 1.66, -3.22]} size={[30, 3.3, 0.3]} tile={1} {...noShadow} />
      <Vox kind="wool" tint="#9aa8b0" position={[0, 1.66, 3.22]} size={[30, 3.3, 0.3]} tile={1} {...noShadow} />
      {/* lockers along the north wall */}
      {Array.from({ length: 19 }).map((_, i) => (
        <Locker key={i} at={[-11.6 + i * 0.63, 1.32, -2.94]} color={i % 3 === 0 ? "#8a5f3a" : i % 3 === 1 ? "#3f6f8a" : "#4a7f5a"} />
      ))}
      <Block position={[0, 2.06, -2.92]} size={[12.4, 0.08, 0.44]} color="#cfd3d8" {...noShadow} />
      <Block position={[0, 0.66, -2.92]} size={[12.4, 0.08, 0.44]} color="#cfd3d8" {...noShadow} />
      {/* doors on the south wall, and the trophy case between two of them */}
      {[-9, -3, 3, 9].map((x) => (
        <group key={x} position={[x, 0, 3.03]}>
          <Block position={[0, 1.1, 0]} size={[1.06, 2.2, 0.14]} color="#8a6236" />
          <Block position={[0, 2.25, 0.02]} size={[1.2, 0.1, 0.16]} color="#6a4a28" {...noShadow} />
          <Block position={[0.36, 1.05, 0.1]} size={[0.07, 0.16, 0.06]} color="#e8c44a" {...noShadow} />
          <Block position={[0, 1.55, 0.08]} size={[0.4, 0.5, 0.03]} color="#5a8aa8" opacity={0.55} transparent {...noShadow} />
        </group>
      ))}
      <group position={[6.2, 0, 2.96]}>
        <Block position={[0, 1.1, 0]} size={[2.2, 1.9, 0.3]} color="#8a6236" />
        <Block position={[0, 1.2, 0.17]} size={[1.9, 1.5, 0.04]} color="#bfe0ff" opacity={0.4} transparent {...noShadow} />
        {[-0.6, -0.1, 0.42].map((x, i) => (
          <group key={i} position={[x, 0.52, 0.14]}>
            <Block position={[0, 0.16, 0]} size={[0.2, 0.3, 0.2]} color="#e8c44a" metalness={0.6} roughness={0.3} />
            <Block position={[0, 0.36, 0]} size={[0.1, 0.14, 0.1]} color="#f2d86a" metalness={0.6} roughness={0.3} />
          </group>
        ))}
      </group>
      {/* the prom banner, high on the south wall, and bunting over the corridor */}
      <Block position={[0, 2.86, 3.0]} size={[5.4, 0.86, 0.06]} color="#e63a3a" {...noShadow} />
      <PixelText text="PROM FRIDAY" position={[0, 2.86, 3.04]} rotationY={Math.PI} height={0.34} />
      <Bunting from={[-13.5, 3.14, -2.6]} to={[13.5, 3.14, -2.6]} count={18} />
      <Bunting from={[-13.5, 3.14, 2.6]} to={[13.5, 3.14, 2.6]} count={18} colors={["#4a7fc1", "#e8c44a", "#8a5ad6", "#4aa88a"]} />
      {/* strip lights down the middle */}
      {[-12, -7.2, -2.4, 2.4, 7.2, 12].map((x) => (
        <StripLight key={x} at={[x, 3.2, 0]} />
      ))}
      <Dust position={[0, 1.8, 0]} area={[26, 3, 5]} count={60} size={0.028} color="#ffffff" opacity={0.35} seed={9} speed={0.14} />
    </group>
  );
};

// ----------------------------------------------------------------------------- cafetería pieces

const LongTable: React.FC<{ at: Vec3; len?: number }> = ({ at, len = 2.6 }) => (
  <group position={at}>
    <Block position={[0, 0.76, 0]} size={[len, 0.08, 1.1]} color="#d8c9a8" />
    <Block position={[0, 0.72, 0]} size={[len - 0.1, 0.04, 1.0]} color="#b8a888" {...noShadow} />
    {[-len / 2 + 0.24, len / 2 - 0.24].map((x, i) => (
      <Block key={i} position={[x, 0.36, 0]} size={[0.1, 0.72, 0.9]} color="#a8a196" />
    ))}
    {/* benches: one on each side */}
    {[-0.86, 0.86].map((z, i) => (
      <group key={i} position={[0, 0, z]}>
        <Block position={[0, 0.44, 0]} size={[len - 0.2, 0.07, 0.32]} color="#c99a5e" />
        {[-len / 2 + 0.3, len / 2 - 0.3].map((x2, j) => (
          <Block key={j} position={[x2, 0.22, 0]} size={[0.07, 0.44, 0.3]} color="#8a6236" />
        ))}
      </group>
    ))}
  </group>
);

const Cafeteria: React.FC = () => {
  const X = ZONE_X.cafe;
  return (
    <group position={[X, 0, 0]}>
      <Vox kind="wool" tint="#d8cfb8" position={[0, -0.05, 0.5]} size={[16.4, 0.1, 11.4]} tile={1} />
      {Array.from({ length: 6 }).map((_, i) =>
        [-2.2, 0.9, 4].map((z) => (
          <Block key={`${i}-${z}`} position={[-6.6 + i * 2.6, 0.005, z]} size={[1.2, 0.02, 1.2]} color="#c4b89c" {...noShadow} />
        )),
      )}
      <Vox kind="wool" tint="#e2dccc" position={[0, 3.92, 0.5]} size={[16.4, 0.2, 11.4]} tile={1} {...noShadow} />
      {/* north wall and the serving counter in front of it */}
      <Vox kind="wool" tint={WALL} position={[0, 1.96, -5.12]} size={[16.4, 4, 0.3]} tile={1} {...noShadow} />
      <Vox kind="stoneBrick" tint="#c8c2b0" position={[0, 0.52, -4.2]} size={[13, 1.04, 1.0]} tile={1} />
      <Block position={[0, 1.08, -4.2]} size={[13.2, 0.08, 1.14]} color="#e8e2d4" />
      <Block position={[0, 1.72, -4.68]} size={[13, 0.5, 0.06]} color="#cfe6ff" opacity={0.42} transparent {...noShadow} />
      {Array.from({ length: 7 }).map((_, i) => (
        <Block key={i} position={[-5.4 + i * 1.8, 1.35, -4.2]} size={[0.08, 0.54, 0.9]} color="#d8d4c8" {...noShadow} />
      ))}
      {/* the hatch behind the counter, and the menu above it */}
      <Block position={[0, 2.1, -5.0]} size={[8, 1.4, 0.1]} color="#3a3a44" />
      <Block position={[0, 3.1, -5.0]} size={[9, 1.1, 0.1]} color="#2a2a32" />
      <PixelText text="MENU" position={[0, 3.24, -4.93]} height={0.26} />
      <PixelText text="PUDDING" position={[0, 2.92, -4.93]} height={0.16} color="#f2d86a" />
      {/* trays of pudding on the counter, and the last one standing alone */}
      <Tray position={[-2.2, 1.12, -4.1]} pudding={5} rotationY={0.2} />
      <Tray position={[1.4, 1.12, -4.2]} pudding={2} rotationY={-0.15} />
      {/* south wall with the big windows onto the field */}
      <Vox kind="wool" tint={WALL} position={[0, 0.5, 6.12]} size={[16.4, 1, 0.3]} tile={1} {...noShadow} />
      <Vox kind="wool" tint={WALL} position={[0, 3.5, 6.12]} size={[16.4, 1, 0.3]} tile={1} {...noShadow} />
      {[-5.4, -1.8, 1.8, 5.4].map((x) => (
        <Block key={x} position={[x, 2, 6.16]} size={[3.0, 2.0, 0.06]} color="#cfe6ff" emissive="#cfe6ff" emissiveIntensity={1.0} {...noShadow} />
      ))}
      {[-7.2, -3.6, 0, 3.6, 7.2].map((x) => (
        <Vox key={x} kind="wool" tint={WALL} position={[x, 2, 6.14]} size={[0.36, 3, 0.3]} tile={1} {...noShadow} />
      ))}
      {/* the side walls */}
      <Vox kind="wool" tint={WALL} position={[-8.22, 1.96, 0.5]} size={[0.3, 4, 11.4]} tile={1} {...noShadow} />
      <Vox kind="wool" tint={WALL} position={[8.22, 1.96, 0.5]} size={[0.3, 4, 11.4]} tile={1} {...noShadow} />
      {/* tables: hers is the one by the window, east and north of the middle */}
      <LongTable at={[-4.6, 0, 0.6]} />
      <LongTable at={[4.6, 0, 0.6]} />
      <LongTable at={[-4.6, 0, 3.6]} />
      <LongTable at={[0.3, 0, 3.6]} />
      <LongTable at={[4.6, 0, 3.6]} />
      {/* trays abandoned on the near table, the way a lunch room looks */}
      <Tray position={[0.3, 0.8, 3.6]} rotationY={0.3} />
      <Tray position={[0.6, 0.8, 3.6]} pudding={1} rotationY={-0.4} />
      <LightPool position={[1.5, 0.07, 2.2]} width={7} depth={5} color="#fff2c8" opacity={0.15} />
      <Glow position={[0, 3.2, 0.5]} size={3} color="#fff0c8" opacity={0.14} />
      <Dust position={[0, 2.2, 1]} area={[14, 3.4, 9]} count={55} size={0.03} color="#fff7d8" opacity={0.4} seed={6} speed={0.12} />
    </group>
  );
};

// ----------------------------------------------------------------------------- gym pieces

const Bunting: React.FC<{ from: Vec3; to: Vec3; count?: number; colors?: string[] }> = ({
  from,
  to,
  count = 14,
  colors = ["#e63a3a", "#e8c44a", "#4a7fc1", "#4aa88a", "#8a5ad6"],
}) => (
  <group>
    {Array.from({ length: count }).map((_, i) => {
      const k = (i + 0.5) / count;
      const x = from[0] + (to[0] - from[0]) * k;
      const y = from[1] + (to[1] - from[1]) * k - Math.sin(k * Math.PI) * 0.35;
      const z = from[2] + (to[2] - from[2]) * k;
      return (
        <group key={i} position={[x, y, z]} rotation={[0, 0, 0]}>
          <Block size={[0.24, 0.34, 0.02]} color={colors[i % colors.length]} {...noShadow} />
          <Block position={[0, 0.2, 0]} size={[0.02, 0.06, 0.02]} color="#e8e2d4" {...noShadow} />
        </group>
      );
    })}
  </group>
);

const Speaker: React.FC<{ at: Vec3; rotationY?: number }> = ({ at, rotationY = 0 }) => (
  <group position={at} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.9, 0]} size={[0.9, 1.8, 0.8]} color="#22222a" />
    <Block position={[0, 1.2, 0.41]} size={[0.62, 0.62, 0.04]} color="#3a3a44" {...noShadow} />
    <Block position={[0, 0.5, 0.41]} size={[0.42, 0.42, 0.04]} color="#3a3a44" {...noShadow} />
    <Glow position={[0, 1.4, 0.1]} size={1.6} color="#c9a8ff" opacity={0.18} />
  </group>
);

const Gym: React.FC = () => {
  const X = ZONE_X.gym;
  return (
    <group position={[X, 0, 0]}>
      <Vox kind="planks" tint="#c99a5e" position={[0, -0.05, 0]} size={[18.4, 0.1, 14.4]} tile={1} />
      {/* the lines painted on the floor, and confetti that fell early */}
      <Block position={[0, 0.005, 0]} size={[12, 0.02, 0.09]} color="#c9483a" {...noShadow} />
      <Block position={[0, 0.005, 0]} size={[0.09, 0.02, 10]} color="#c9483a" {...noShadow} />
      {Array.from({ length: 26 }).map((_, i) => (
        <Block
          key={i}
          position={[-6.5 + ((i * 37) % 130) / 10, 0.012, -4.5 + ((i * 53) % 100) / 10]}
          size={[0.08, 0.01, 0.08]}
          color={["#e63a3a", "#e8c44a", "#4a7fc1", "#8a5ad6"][i % 4]}
          {...noShadow}
        />
      ))}
      <Vox kind="wool" tint="#2a2a3a" position={[0, 6.1, 0]} size={[18.4, 0.3, 14.4]} tile={2} {...noShadow} />
      {/* the walls: dark panelled, with the school colours on them */}
      <Vox kind="wool" tint="#31404a" position={[0, 3.05, -7.12]} size={[18.4, 6.1, 0.3]} tile={1} {...noShadow} />
      <Vox kind="wool" tint="#31404a" position={[0, 3.05, 7.12]} size={[18.4, 6.1, 0.3]} tile={1} {...noShadow} />
      <Vox kind="wool" tint="#31404a" position={[-9.12, 3.05, 0]} size={[0.3, 6.1, 14.4]} tile={1} {...noShadow} />
      <Vox kind="wool" tint="#31404a" position={[9.12, 3.05, 0]} size={[0.3, 6.1, 14.4]} tile={1} {...noShadow} />
      <Block position={[0, 4.6, -6.94]} size={[6.4, 1.0, 0.06]} color="#e63a3a" {...noShadow} />
      <PixelText text="PROM" position={[0, 4.6, -6.88]} height={0.46} />
      {/* the stage at the north end, with the DJ table on it */}
      <Block position={[0, 0.28, -6.2]} size={[11, 0.56, 2.2]} color="#4a3a2a" />
      <Block position={[0, 0.58, -6.2]} size={[11, 0.06, 2.2]} color="#6a5236" />
      <Block position={[-0.4, 1.12, -6.2]} size={[1.8, 0.1, 0.7]} color="#22222a" />
      <Block position={[-0.4, 1.0, -6.2]} size={[0.12, 0.24, 0.12]} color="#3a3a44" {...noShadow} />
      {[-1.2, 0.4].map((x, i) => (
        <Block key={i} position={[x, 1.24, -6.4]} size={[0.5, 0.16, 0.36]} color="#c9a8ff" emissive="#8a5ad6" emissiveIntensity={0.8} {...noShadow} />
      ))}
      {/* the ball of light, and its chain */}
      <Block position={[0, 5.62, 0.3]} size={[0.03, 1.0, 0.03]} color="#8a8a92" {...noShadow} />
      <Block position={[0, 4.86, 0.3]} size={[0.56, 0.56, 0.56]} color="#dfe6f2" metalness={0.9} roughness={0.15} />
      <Glow position={[0, 4.8, 0.3]} size={3.6} color="#c9b8ff" opacity={0.4} />
      <LightPool position={[0, 0.08, 0.3]} width={9} depth={8} color="#c9a8ff" opacity={0.22} />
      {/* bunting, criss-crossed over the floor */}
      <Bunting from={[-8.6, 5.4, -3.4]} to={[8.6, 5.0, 3.0]} count={22} />
      <Bunting from={[-8.6, 5.0, 3.0]} to={[8.6, 5.4, -3.4]} count={22} colors={["#4aa88a", "#e8c44a", "#8a5ad6", "#4a7fc1", "#e63a3a"]} />
      <Bunting from={[-8.6, 5.2, 0]} to={[8.6, 5.2, 0]} count={20} colors={["#e8c44a", "#8a5ad6", "#4aa88a"]} />
      {/* speakers, one each side of the stage */}
      <Speaker at={[-6.4, 0, -5.4]} rotationY={0.35} />
      <Speaker at={[6.4, 0, -5.4]} rotationY={-0.35} />
      {/* the punch table, east: a bowl, cups, and a sign */}
      <group position={[6.4, 0, 3.0]}>
        <Block position={[0, 0.44, 0]} size={[2.4, 0.08, 1.1]} color="#e8e2d4" />
        <Block position={[0, 0.22, 0]} size={[2.2, 0.44, 0.9]} color="#cfc9b8" />
        <Block position={[0, 0.62, -0.1]} size={[0.62, 0.28, 0.62]} color="#e04a4a" />
        <Block position={[0, 0.78, -0.1]} size={[0.5, 0.04, 0.5]} color="#f26a6a" {...noShadow} />
        {[-0.55, -0.3].map((x, i) => (
          <Block key={i} position={[x, 0.55, 0.3]} size={[0.12, 0.2, 0.12]} color="#ffffff" {...noShadow} />
        ))}
        <Block position={[0.7, 0.62, 0.15]} size={[0.7, 0.28, 0.05]} color="#e63a3a" {...noShadow} />
        <PixelText text="PUNCH" position={[0.7, 0.62, 0.19]} rotationY={Math.PI} height={0.13} />
      </group>
      {/* the plant he hides behind: a big one, in a pot */}
      <group position={[-5.4, 0, 2.6]}>
        <Block position={[0, 0.26, 0]} size={[0.9, 0.52, 0.9]} color="#a8543a" />
        <Block position={[0, 0.54, 0]} size={[0.76, 0.06, 0.76]} color="#3a2a1a" {...noShadow} />
        <Block position={[0, 0.9, 0]} size={[0.12, 0.7, 0.12]} color="#4a3a22" />
        {[
          [0, 1.5, 0, 0.9, 0.5, 0.9],
          [-0.42, 1.36, 0.12, 0.7, 0.36, 0.7],
          [0.4, 1.42, -0.1, 0.74, 0.4, 0.72],
          [0.06, 1.82, 0.06, 0.6, 0.36, 0.6],
        ].map(([x, y, z, w, h, d], i) => (
          <Block key={i} position={[x, y, z]} size={[w, h, d]} color={i % 2 ? "#3f7f3d" : "#4a8f42"} />
        ))}
      </group>
      {/* the mirror on the east wall, and the hall's chairs stacked along the west */}
      <Block position={[8.94, 2.0, -3.2]} size={[0.06, 2.0, 2.8]} color="#b8c6d8" metalness={0.9} roughness={0.08} {...noShadow} />
      <Block position={[8.9, 2.0, -3.2]} size={[0.04, 2.2, 3.0]} color="#8a6236" {...noShadow} />
      {[-5.6, -4.9, -4.2].map((x, i) => (
        <Block key={i} position={[x, 0.5 + i * 0.02, 5.6]} size={[0.6, 1.0, 0.55]} color={i % 2 ? "#3a4a5a" : "#4a5a6a"} />
      ))}
      {/* coloured light: magenta west, cyan east, and the smoke machine's haze */}
      <Glow position={[-6.6, 2.6, 3.6]} size={4.5} color="#ff6ad5" opacity={0.22} />
      <Glow position={[6.6, 2.4, 3.4]} size={4.5} color="#5ad5ff" opacity={0.2} />
      <Glow position={[-6.2, 1.2, -3.6]} size={3} color="#ffe08a" opacity={0.14} />
      <LightPool position={[3.0, 0.09, 4.4]} width={4} depth={3} color="#5ad5ff" opacity={0.16} />
      <GodRay position={[2.6, 3.2, 1.4]} rotation={[0, 0, 0.5]} width={3.4} height={6} color="#c9a8ff" opacity={0.1} />
      <Dust position={[0, 2.6, 0]} area={[16, 4.4, 12]} count={80} size={0.05} color="#e8e0ff" opacity={0.4} seed={11} speed={0.16} />
      <Dust position={[0, 0.8, 0]} area={[14, 1.4, 10]} count={40} size={0.07} color="#cfe0ff" opacity={0.22} seed={5} speed={0.06} />
    </group>
  );
};

export const World: React.FC = () => (
  <>
    <Zone name="class">
      <Classroom />
    </Zone>
    <Zone name="hall">
      <Hallway />
    </Zone>
    <Zone name="cafe">
      <Cafeteria />
    </Zone>
    <Zone name="gym">
      <Gym />
    </Zone>
    <Zone name="room">
      <group position={[ZONE_X.room, 0, 0]}>
        <Room at={[0, 0, 0]} night />
        <BedBox position={[-1.0, 0, -1.2]} />
        <LightPool position={[0.6, 0.07, 1.2]} width={4} depth={4} color="#a9c2ff" opacity={0.18} />
        <Glow position={[-1, 2.4, -1.6]} size={2.4} color="#9fb8ff" opacity={0.18} />
        <Dust position={[0, 1.6, 0.5]} area={[5, 2.6, 6]} count={30} size={0.03} color="#cfe0ff" opacity={0.3} seed={7} speed={0.1} />
      </group>
    </Zone>
  </>
);
