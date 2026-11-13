import type React from "react";
import { Block, CeilingLight, Door, DoorFrame, Dust, GodRay, LightPool, Locker, PixelText, Vox, WallClock, pixelTex } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * SCHOOL — where most "What if" stories happen, because that is where a kid with a power is seen by
 * everybody he knows. A classroom and a hallway of lockers.
 *
 * Part of the What If pack (PACK.md). 1 unit = 1 metre; a kid is 1.44 m tall (KID = 0.8).
 *
 * THE SOUTH WALL IS ONE-SIDED. In a classroom everybody faces the board, so half the shots look at faces from
 * the board (lens looking south, and there has to be a wall behind the class) and the other half look at the
 * board over the class (lens behind the back row, and there must be no wall in the way). So the south wall of
 * both sets, and what hangs on it, can be seen from INSIDE only: a lens behind it looks straight through.
 * The other three walls and the ceiling are solid. Keep the lens under 3.3 m, and inside the east and west walls.
 */

/** A wall, or a sheet of paper on one, that exists only for a lens in front of it. `facing` is the way its face points (rotationY). */
const OneSided: React.FC<{ position: Vec3; size: [number, number]; facing: number; color: string; grain?: boolean; glow?: number }> = ({ position, size, facing, color, grain = false, glow = 0 }) => (
  <mesh position={position} rotation={[0, facing, 0]} receiveShadow>
    <planeGeometry args={size} />
    <meshStandardMaterial color={grain ? "#ffffff" : color} map={grain ? pixelTex(color, [size[0] * 2, size[1] * 2], { jitter: 0.035 }) : null} roughness={1} emissive={color} emissiveIntensity={glow} />
  </mesh>
);

// ----------------------------------------------------------------------------- the classroom

/** Three columns of three desks. Column 0 is by the windows (west); row 0 is the front. */
const COLS = [-2.4, 0, 2.4];
const ROWS = [-0.9, 0.75, 2.4];

/**
 * Where things are in a classroom built at `at`. Stand and seat people with these; never type the numbers twice.
 *
 *   const SPOT = classroom(PLACE.class);
 *   <Hero position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" />     the middle desk
 *   <Teacher position={SPOT.teacher} />
 */
export function classroom(at: Vec3) {
  const p = (x: number, y: number, z: number): Vec3 => [at[0] + x, at[1] + y, at[2] + z];
  return {
    /** The floor under the chair of desk (col, row). A kid sits here facing NORTH (rotationY = Math.PI), `animation="sit"`. */
    seat: (col: number, row: number): Vec3 => p(COLS[col % 3], 0, ROWS[row % 3] + 0.5),
    /** The face of a kid sitting at desk (col, row): what a close-up looks at. (Sitting, a kid's face is 0.1 m lower than standing.) */
    face: (col: number, row: number): Vec3 => p(COLS[col % 3], 1.12, ROWS[row % 3] + 0.5),
    /** The middle of a desk's top: put a book, a note or a hand on it. */
    desk: (col: number, row: number): Vec3 => p(COLS[col % 3], 0.66, ROWS[row % 3]),
    /** Where the teacher stands, in front of the board, facing the class (rotationY = 0). */
    teacher: p(-0.6, 0, -2.9),
    /** The middle of the board: the lens looks here for "the lesson". */
    board: p(0, 1.95, -3.86),
    /** The floor just inside the door (east wall). Somebody coming in walks west from here. */
    door: p(3.6, 0, -2.6),
    /** The aisle between two columns of desks, at the back. Somebody walking to the front goes north from here. */
    aisle: p(1.2, 0, 3.2),
    /** Any point of the room, in room coordinates. */
    at: p,
  };
}

/** One desk and its chair, sized for a kid. `position` is the floor under the middle of the desk; the chair is on its south side. */
export const Desk: React.FC<{ position: Vec3; book?: string | null }> = ({ position, book = null }) => (
  <group position={position}>
    <Vox kind="planks" tint="#c9a06a" position={[0, 0.63, 0]} size={[0.9, 0.06, 0.56]} />
    {[-0.4, 0.4].flatMap((x) => [-0.23, 0.23].map((z) => <Block key={`${x}${z}`} position={[x, 0.3, z]} size={[0.06, 0.6, 0.06]} color="#59606b" />))}
    <Block position={[0, 0.5, 0]} size={[0.8, 0.04, 0.46]} color="#59606b" castShadow={false} />
    {/* the chair: seat at 0.44, the height a kid's `sit` fits */}
    <Vox kind="planks" tint="#b0803f" position={[0, 0.41, 0.5]} size={[0.46, 0.06, 0.44]} />
    <Vox kind="planks" tint="#b0803f" position={[0, 0.74, 0.7]} size={[0.46, 0.34, 0.05]} />
    {[-0.2, 0.2].flatMap((x) => [0.31, 0.69].map((z) => <Block key={`c${x}${z}`} position={[x, z > 0.5 ? 0.45 : 0.2, z]} size={[0.05, z > 0.5 ? 0.9 : 0.4, 0.05]} color="#59606b" />))}
    {book ? (
      <>
        <Block position={[-0.12, 0.675, 0.02]} size={[0.3, 0.03, 0.22]} color={book} />
        <Block position={[-0.12, 0.692, 0.02]} size={[0.26, 0.006, 0.18]} color="#f4efe0" castShadow={false} />
      </>
    ) : null}
  </group>
);

/** A chalkboard with one or two words on it. `position` is the middle of the board; it faces +Z. */
export const Chalkboard: React.FC<{ position: Vec3; text?: string; sub?: string; width?: number }> = ({ position, text = "", sub = "", width = 4.4 }) => (
  <group position={position}>
    <Vox kind="darkPlanks" position={[0, 0, -0.03]} size={[width + 0.24, 1.74, 0.08]} />
    <Block position={[0, 0, 0.02]} size={[width, 1.5, 0.04]} color="#2f5d45" roughness={0.95} />
    <Vox kind="planks" position={[0, -0.84, 0.1]} size={[width, 0.06, 0.16]} />
    {[-0.5, 0.1].map((x, i) => (
      <Block key={x} position={[x, -0.79, 0.12]} size={[0.16, 0.035, 0.035]} color={i ? "#f4efe0" : "#f2d23a"} castShadow={false} />
    ))}
    {text ? <PixelText text={text} position={[0, sub ? 0.22 : 0, 0.045]} height={0.5} maxWidth={width - 0.6} color="#f4f2e6" /> : null}
    {sub ? <PixelText text={sub} position={[0, -0.34, 0.045]} height={0.3} maxWidth={width - 0.8} color="#cfe6d6" /> : null}
  </group>
);

/**
 * A CLASSROOM: nine desks, a board, a teacher's desk, two windows on the west wall, a door on the east wall,
 * and a south wall that only a lens inside the room can see. `at` is the middle of the floor. It is 9.4 wide (x),
 * 8 deep (z) and 3.6 high.
 * `board` and `boardSub` are written on the board; `books` puts a book on some desks.
 * Find the places in it with `classroom(at)`.
 */
export const Classroom: React.FC<{ at: Vec3; board?: string; boardSub?: string; night?: boolean; doorOpen?: number; books?: boolean }> = ({ at, board = "", boardSub = "", night = false, doorOpen = 0, books = true }) => {
  const sky = night ? "#93a9ff" : "#fff0d0";
  const pane = night ? "#7fa8ff" : "#cfeaff";
  return (
    <group position={at}>
      {/* floor, walls, ceiling. The walls and the ceiling cast no shadow, so the look's sun still lights the room. */}
      <Vox kind="planks" tint="#b9925c" position={[0, -0.1, 0]} size={[9.4, 0.2, 8]} />
      <Vox kind="wool" tint="#e9e0c8" position={[0, 1.8, -4.1]} size={[9.4, 3.6, 0.2]} castShadow={false} />
      <Vox kind="wool" tint="#e3d9bf" position={[-4.8, 1.8, 0]} size={[0.2, 3.6, 8]} castShadow={false} />
      <Vox kind="wool" tint="#e3d9bf" position={[4.8, 1.8, 0]} size={[0.2, 3.6, 8]} castShadow={false} />
      <Vox kind="wool" tint="#f4efe0" position={[0, 3.7, 0]} size={[9.8, 0.2, 8]} castShadow={false} />
      {/* a painted band along the foot of each wall */}
      <Block position={[0, 0.45, -3.985]} size={[9.4, 0.9, 0.03]} color="#6fa7b8" castShadow={false} />
      <Block position={[-4.685, 0.45, 0]} size={[0.03, 0.9, 8]} color="#6fa7b8" castShadow={false} />
      <Block position={[4.685, 0.45, 0]} size={[0.03, 0.9, 8]} color="#6fa7b8" castShadow={false} />

      {/* the south wall and what hangs on it: seen from inside only (see the top of this file) */}
      <OneSided position={[0, 1.8, 4]} size={[9.4, 3.6]} facing={Math.PI} color="#e9e0c8" grain />
      <OneSided position={[0, 0.45, 3.99]} size={[9.4, 0.9]} facing={Math.PI} color="#6fa7b8" />
      {/* a map of somewhere, and four drawings */}
      <OneSided position={[-2.4, 2.25, 3.98]} size={[2.2, 1.4]} facing={Math.PI} color="#8fc7e8" />
      <OneSided position={[-2.75, 2.35, 3.97]} size={[0.8, 0.6]} facing={Math.PI} color="#7ab86a" />
      <OneSided position={[-1.95, 2.05, 3.97]} size={[0.6, 0.5]} facing={Math.PI} color="#d9c27a" />
      {[0.4, 1.3, 2.2, 3.1].map((x, i) => (
        <OneSided key={x} position={[x, 2.2 + (i % 2 ? 0.12 : -0.08), 3.98]} size={[0.62, 0.8]} facing={Math.PI} color={["#fff4d6", "#ffd9d2", "#d9f0d0", "#d6e6ff"][i]} />
      ))}
      {[0.4, 1.3, 2.2, 3.1].map((x, i) => (
        <OneSided key={`d${x}`} position={[x, 2.2 + (i % 2 ? 0.12 : -0.08), 3.97]} size={[0.34, 0.34]} facing={Math.PI} color={["#e8433a", "#3f6fb8", "#e8a21c", "#3f8a4f"][i]} />
      ))}
      {/* a row of pegs with a bag on each */}
      <OneSided position={[0.4, 1.32, 3.98]} size={[7.6, 0.08]} facing={Math.PI} color="#7a5a3a" />
      {[-3.0, -2.2, -1.4, -0.6, 0.2, 1.0, 1.8, 2.6, 3.4].map((x, i) => (
        <OneSided key={`b${x}`} position={[x + 0.4, 1.05, 3.97]} size={[0.4, 0.5]} facing={Math.PI} color={["#c8402f", "#3f6fb8", "#e8a21c", "#3f8a4f", "#6a4aa8", "#e85a9a", "#4ad6d0", "#8a6a44", "#59606b"][i]} />
      ))}

      <Chalkboard position={[0, 1.95, -3.9]} text={board} sub={boardSub} />
      <WallClock position={[3.2, 2.9, -3.97]} radius={0.24} />
      {/* a strip of paper letters over the board, the way every classroom has */}
      {["A", "B", "C", "D", "E", "F", "G"].map((letter, i) => (
        <group key={letter} position={[-1.8 + i * 0.6, 3.05, -3.97]}>
          <Block size={[0.42, 0.42, 0.02]} color={["#ffd24a", "#58a6ff", "#ff7a4a", "#58d66a", "#c77dff", "#ff5a8a", "#4ad6d0"][i]} castShadow={false} />
          <PixelText text={letter} position={[0, 0, 0.015]} height={0.3} />
        </group>
      ))}

      {/* the teacher's desk, and a globe on it */}
      <Vox kind="darkPlanks" position={[2.6, 0.4, -2.75]} size={[1.7, 0.8, 0.8]} />
      <Vox kind="planks" position={[2.6, 0.83, -2.75]} size={[1.9, 0.06, 0.95]} />
      <Block position={[3.1, 0.92, -2.8]} size={[0.08, 0.12, 0.08]} color="#5c3f24" />
      <Block position={[3.1, 1.1, -2.8]} size={[0.26, 0.26, 0.26]} color="#3f8fd6" />
      <Block position={[3.14, 1.14, -2.72]} size={[0.14, 0.12, 0.1]} color="#58c66a" castShadow={false} />
      <Block position={[2.2, 0.88, -2.7]} size={[0.3, 0.04, 0.22]} color="#c8402f" />

      {/* nine desks */}
      {COLS.flatMap((x, col) => ROWS.map((z, row) => <Desk key={`${col}-${row}`} position={[x, 0, z]} book={books && (col * 3 + row) % 2 === 0 ? ["#3f6fb8", "#c8402f", "#3f8a4f", "#e8a21c", "#6a4aa8"][(col + row) % 5] : null} />))}

      {/* two windows on the west wall: the light of the room */}
      {[-1.6, 1.6].map((z) => (
        <group key={z} position={[-4.68, 2.0, z]}>
          <Block size={[0.08, 1.7, 1.9]} color="#f4efe0" />
          <Block position={[0.03, 0, 0]} size={[0.06, 1.46, 1.66]} color={pane} emissive={pane} emissiveIntensity={night ? 1.3 : 1.1} castShadow={false} />
          <Block position={[0.07, 0, 0]} size={[0.03, 1.46, 0.07]} color="#f4efe0" castShadow={false} />
          <Block position={[0.07, 0, 0]} size={[0.03, 0.07, 1.66]} color="#f4efe0" castShadow={false} />
          <Block position={[0.16, -0.9, 0]} size={[0.3, 0.06, 2.0]} color="#f4efe0" />
          <GodRay position={[1.5, -0.8, 0]} rotation={[0, 0, 1.05]} width={1.6} height={3.6} color={sky} opacity={night ? 0.16 : 0.12} />
          <LightPool position={[2.3, -1.985, 0]} width={2.6} depth={1.9} color={sky} opacity={0.3} />
          <pointLight position={[1.0, 0.2, 0]} color={sky} intensity={night ? 7 : 9} distance={9} decay={2} />
        </group>
      ))}

      {/* the door, on the east wall, near the front */}
      <group position={[4.69, 0, -2.6]} rotation={[0, -Math.PI / 2, 0]}>
        <DoorFrame position={[0, 0, 0]} width={1.1} height={2.2} color="#7a5a3a" />
        <Door position={[-0.5, 0, 0.03]} width={1.0} height={2.15} open={-1.4 * doorOpen} color="#8a6a44" />
      </group>

      {/* a shelf of books at the back of the east wall */}
      <Vox kind="darkPlanks" position={[4.45, 0.7, 2.4]} size={[0.5, 1.4, 1.8]} />
      {[0.5, 1.0].map((y) =>
        [0, 1, 2, 3, 4, 5].map((i) => <Block key={`${y}${i}`} position={[4.2, y + 0.16, 1.7 + i * 0.27]} size={[0.2, 0.3, 0.2]} color={["#c8402f", "#3f6fb8", "#e8a21c", "#3f8a4f", "#6a4aa8", "#e85a9a"][(i + (y > 0.6 ? 2 : 0)) % 6]} />),
      )}

      {/* ceiling lamps, and a fill from the open side so that a face turned to the lens is never black */}
      <CeilingLight position={[-1.8, 3.58, -0.6]} size={[1.4, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={night ? 16 : 7} distance={8} />
      <CeilingLight position={[1.8, 3.58, 1.4]} size={[1.4, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={night ? 16 : 7} distance={8} />
      <pointLight position={[0, 2.4, 5.2]} color={night ? "#93a9ff" : "#ffffff"} intensity={night ? 30 : 14} distance={12} decay={2} />
      <Dust position={[-1.5, 1.6, 0]} area={[6, 2.6, 6]} count={55} size={0.03} color={night ? "#cfe0ff" : "#fff3d0"} opacity={0.55} seed={11} speed={0.14} />
    </group>
  );
};

// ----------------------------------------------------------------------------- the hallway

/**
 * A SCHOOL HALLWAY: lockers along the north wall, two classroom doors, a checked floor. It runs along x;
 * `at` is the middle of its floor. It is `length` long, 4 deep and 3.4 high. Its south wall is seen from
 * inside only (see the top of this file), so the lens can stand in the hall and look along it, or stand
 * outside it and look at the lockers. `sign` is the plate over the first door.
 *
 * People stand in front of the lockers at z = at[2] − 0.9, or walk the middle of the hall at z = at[2] + 0.3.
 */
export const SchoolHall: React.FC<{ at: Vec3; length?: number; sign?: string }> = ({ at, length = 16, sign = "ROOM 4" }) => {
  const half = length / 2;
  const tiles = Math.round(length);
  // Lockers fill the wall except where the two doors are.
  const doors = [-half * 0.45, half * 0.45];
  const slots: number[] = [];
  for (let x = -half + 0.6; x <= half - 0.6; x += 0.92) if (!doors.some((d) => Math.abs(x - d) < 1.15)) slots.push(x);
  const paint = ["#3f6fb8", "#c8402f", "#e8a21c", "#3f8a4f"];
  const lamps = Math.max(2, Math.round(length / 5));
  const panes = Math.max(2, Math.round(length / 4));
  return (
    <group position={at}>
      {/* a checked floor: two colours of tile, one block each */}
      {Array.from({ length: tiles }, (_, i) =>
        [0, 1, 2, 3].map((j) => <Block key={`${i}-${j}`} position={[-half + 0.5 + i, -0.05, -1.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#c2baa4" : "#7c95a0"} castShadow={false} />),
      )}
      <Vox kind="wool" tint="#e9e0c8" position={[0, 1.7, -2.1]} size={[length, 3.4, 0.2]} castShadow={false} />
      <Vox kind="wool" tint="#f4efe0" position={[0, 3.5, 0]} size={[length, 0.2, 4.4]} castShadow={false} />
      <OneSided position={[0, 1.7, 2]} size={[length, 3.4]} facing={Math.PI} color="#e9e0c8" grain />
      <OneSided position={[0, 2.55, 1.99]} size={[length, 0.16]} facing={Math.PI} color="#6fa7b8" />
      {/* windows along the south wall: the daylight of the hall, for a lens that looks along it */}
      {Array.from({ length: panes }, (_, i) => (
        <OneSided key={`w${i}`} position={[-half + (length * (i + 0.5)) / panes, 1.75, 1.98]} size={[1.5, 1.3]} facing={Math.PI} color="#cfeaff" glow={0.9} />
      ))}
      <Block position={[0, 2.55, -1.985]} size={[length, 0.16, 0.03]} color="#6fa7b8" castShadow={false} />

      {slots.map((x, i) => (
        <Locker key={i} position={[x, 0, -1.76]} width={0.9} height={1.95} depth={0.45} color={paint[i % paint.length]} doors={2} />
      ))}
      {doors.map((x, i) => (
        <group key={x} position={[x, 0, -1.99]}>
          <DoorFrame position={[0, 0, 0]} width={1.1} height={2.2} color="#7a5a3a" />
          <Door position={[-0.5, 0, 0.03]} width={1.0} height={2.15} color="#8a6a44" />
          <Block position={[0, 2.42, 0.03]} size={[0.9, 0.26, 0.03]} color="#2b3540" castShadow={false} />
          <PixelText text={i === 0 ? sign : "ROOM 5"} position={[0, 2.42, 0.05]} height={0.2} maxWidth={0.8} />
        </group>
      ))}
      {/* the two ends: a wall with a pair of doors and a lit sign, so a lens that looks along the hall sees where it goes */}
      {[-1, 1].map((end) => (
        <group key={end} position={[end * half, 0, 0]} rotation={[0, -end * (Math.PI / 2), 0]}>
          <Vox kind="wool" tint="#e3d9bf" position={[0, 1.7, -0.1]} size={[4.4, 3.4, 0.2]} castShadow={false} />
          {[-0.52, 0.52].map((x) => (
            <group key={x} position={[x, 0, 0.02]}>
              <Block position={[0, 1.08, 0]} size={[1.0, 2.16, 0.06]} color="#59788a" />
              <Block position={[0, 1.5, 0.035]} size={[0.6, 0.8, 0.01]} color="#cfeaff" emissive="#cfeaff" emissiveIntensity={0.8} castShadow={false} />
              <Block position={[x > 0 ? -0.36 : 0.36, 1.05, 0.05]} size={[0.06, 0.3, 0.04]} color="#d6dde2" metalness={0.2} roughness={0.5} />
            </group>
          ))}
          <Block position={[0, 2.5, 0.03]} size={[0.9, 0.3, 0.05]} color="#2f8a4a" emissive="#58d66a" emissiveIntensity={0.9} castShadow={false} />
          <PixelText text="EXIT" position={[0, 2.5, 0.06]} height={0.22} />
        </group>
      ))}
      {/* a notice board, and a bin: the things a real hallway collects */}
      <Vox kind="planks" tint="#b48d52" position={[0, 2.95, -1.98]} size={[2.2, 0.56, 0.05]} />
      {[-0.7, -0.2, 0.3, 0.75].map((x, i) => (
        <Block key={x} position={[x, 2.95 + (i % 2 ? 0.05 : -0.04), -1.945]} size={[0.3, 0.34, 0.01]} color={["#fff4d6", "#ffd9d2", "#d9f0d0", "#d6e6ff"][i]} castShadow={false} />
      ))}
      <Block position={[half - 0.7, 0.3, -1.6]} size={[0.4, 0.6, 0.4]} color="#59606b" />

      {Array.from({ length: lamps }, (_, i) => (
        <CeilingLight key={i} position={[-half + (length * (i + 0.5)) / lamps, 3.38, 0]} size={[1.5, 0.3]} color="#fff6dc" lightColor="#fff0d0" intensity={3} distance={7} />
      ))}
      {/* a fill from the south side, high, so that a face turned to the lens is never black and the floor is not burned */}
      <pointLight position={[0, 3.1, 3.4]} color="#ffffff" intensity={2.6} distance={12} decay={2} />
      <LightPool position={[0, 0.012, -0.4]} width={length * 0.7} depth={2.0} color="#fff0d0" opacity={0.07} />
      <GodRay position={[half * 0.2, 1.9, -0.6]} rotation={[0, 0, 0.3]} width={1.4} height={3.2} color="#fff0d0" opacity={0.07} />
      <Dust position={[0, 1.6, 0]} area={[length * 0.8, 2.4, 3]} count={50} size={0.03} color="#fff3d0" opacity={0.5} seed={17} speed={0.14} />
    </group>
  );
};
