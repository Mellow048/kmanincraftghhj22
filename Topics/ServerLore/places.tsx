import type React from "react";
import { useMemo } from "react";
import {
  Bed,
  Block,
  Carpet,
  CeilingLight,
  Door,
  DoorFrame,
  ExitSign,
  Glow,
  Locker,
  Monitor,
  VisitorChair,
  WardWall,
  plankTex,
  wetFloorTex,
  wordBitmap,
  wordTexture,
} from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Clock3AM, WritableBook } from "./props";

/**
 * SERVER LORE REAL-WORLD CUTAWAY SETS — Grounded 3D IRL locations
 * (`DeskSetup`, `HospitalCorridor`, `ClassroomRoom`) built for 9:16 vertical shots.
 * Zero empty void boxes; open along +Z so cameras push, orbit, and crane cleanly.
 */

/** Detailed real-world student/gamer desk setup (`position` is floor center; monitor faces +Z toward chair). */
export const DeskSetup: React.FC<{
  position?: Vec3;
  rotationY?: number;
  screenText?: string;
  screenColor?: string;
  clockText?: string;
  alarm?: number;
  lampOn?: boolean;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  screenText = "MC SERVER",
  screenColor = "#4be08a",
  clockText = "3:00 AM",
  alarm = 0,
  lampOn = true,
}) => {
  const screenTex = useMemo(() => wordTexture(screenText), [screenText]);
  const screenW = Math.min(0.95, Math.max(0.45, (wordBitmap(screenText).width / 11) * 0.14));

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Dark warm oak tabletop on 4 matte steel legs */}
      <Block position={[0, 0.76, 0]} size={[1.85, 0.08, 0.92]} map={plankTex("#5c3f27")} />
      {[
        [-0.84, -0.38],
        [0.84, -0.38],
        [-0.84, 0.38],
        [0.84, 0.38],
      ].map(([x, z], i) => (
        <Block key={i} position={[x!, 0.36, z!]} size={[0.07, 0.72, 0.07]} color="#1f232c" metalness={0.35} roughness={0.45} />
      ))}

      {/* Wide PC Monitor + base stand + glowing screen */}
      <Block position={[0, 0.88, -0.26]} size={[0.14, 0.18, 0.1]} color="#1c202a" />
      <Block position={[0, 0.81, -0.24]} size={[0.42, 0.03, 0.24]} color="#1c202a" />
      <Block position={[0, 1.24, -0.24]} size={[1.22, 0.68, 0.06]} color="#181c24" />
      <Block position={[0, 1.24, -0.205]} size={[1.12, 0.58, 0.015]} color="#0d1820" emissive={screenColor} emissiveIntensity={0.75} castShadow={false} />
      <mesh position={[0, 1.24, -0.194]}>
        <planeGeometry args={[screenW, 0.16]} />
        <meshBasicMaterial map={screenTex} color="#ffffff" transparent alphaTest={0.5} toneMapped={false} fog={false} />
      </mesh>
      <Glow position={[0, 1.24, -0.1]} size={1.6} color={screenColor} opacity={0.18} />
      <pointLight position={[0, 1.25, 0.15]} color={screenColor} intensity={1.8} distance={3.2} decay={2} />

      {/* Mechanical RGB keyboard & mousepad + mouse */}
      <Block position={[-0.08, 0.81, 0.12]} size={[0.76, 0.015, 0.34]} color="#1a1d24" castShadow={false} />
      <Block position={[-0.12, 0.828, 0.12]} size={[0.56, 0.025, 0.2]} color="#262b36" emissive="#5ea8ff" emissiveIntensity={0.35} />
      <Block position={[0.42, 0.822, 0.12]} size={[0.11, 0.03, 0.16]} color="#2b313e" />

      {/* Digital bedside/desk clock */}
      <Clock3AM text={clockText} alarm={alarm} position={[-0.65, 0.8, -0.2]} rotationY={0.28} scale={0.72} />

      {/* Articulated warm brass desk lamp on right corner */}
      <group position={[0.7, 0.8, -0.22]}>
        <Block position={[0, 0.02, 0]} size={[0.2, 0.04, 0.2]} color="#262932" />
        <Block position={[0.02, 0.28, -0.02]} rotation={[0.12, 0, -0.18]} size={[0.04, 0.52, 0.04]} color="#b8923a" metalness={0.4} roughness={0.35} />
        <Block position={[-0.06, 0.54, 0.04]} rotation={[0.3, 0, 0.2]} size={[0.22, 0.14, 0.22]} color="#d6b44b" emissive={lampOn ? "#ffcf70" : "#000000"} emissiveIntensity={lampOn ? 0.65 : 0} />
        {lampOn ? <pointLight position={[-0.08, 0.44, 0.08]} color="#ffd585" intensity={3.0} distance={4.5} decay={2} /> : null}
      </group>

      {/* Gaming / study chair tucked slightly forward at +Z */}
      <group position={[0, 0, 0.82]}>
        <Block position={[0, 0.45, 0]} size={[0.56, 0.08, 0.54]} color="#283142" />
        <Block position={[0, 0.84, 0.23]} size={[0.56, 0.72, 0.08]} color="#283142" />
        <Block position={[0, 0.84, 0.185]} size={[0.18, 0.56, 0.02]} color="#4276b8" castShadow={false} />
        <Block position={[0, 0.21, 0]} size={[0.09, 0.42, 0.09]} color="#171b22" />
        <Block position={[0, 0.04, 0]} size={[0.5, 0.06, 0.5]} color="#171b22" />
      </group>
    </group>
  );
};

/** Real-world night-shift hospital hallway opening towards +Z for deep 9:16 perspective framing. */
export const HospitalCorridor: React.FC<{
  position?: Vec3;
  rotationY?: number;
  length?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, length = 12 }) => {
  const half = length / 2;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Institutional wet-sheen tile floor & overhead beam ceiling */}
      <Block position={[0, -0.15, 0]} size={[5.2, 0.3, length]} map={wetFloorTex()} />
      <Block position={[0, 3.65, 0]} size={[5.2, 0.3, length]} color="#cfd8e2" />
      <Carpet position={[0, 0.014, 0]} width={1.6} length={length - 0.8} tone="#284c6b" />

      {/* Left & right ward walls */}
      <WardWall position={[-2.35, 1.75, 0]} size={[0.45, 3.5, length]} color="#3a5d75" repeat={[4, 2]} />
      <WardWall position={[2.35, 1.75, 0]} size={[0.45, 3.5, length]} color="#3a5d75" repeat={[4, 2]} />

      {/* Far end wall + double hospital doors + glowing EXIT sign */}
      <WardWall position={[0, 1.75, -half + 0.2]} size={[5.1, 3.5, 0.4]} color="#2d4c63" repeat={[2, 2]} />
      <DoorFrame position={[0, 0, -half + 0.44]} width={1.85} height={2.35} color="#1e3142" />
      <Door position={[-0.92, 0, -half + 0.44]} width={0.9} height={2.3} color="#284256" />
      <Door position={[0.92, 0, -half + 0.44]} rotationY={Math.PI} width={0.9} height={2.3} color="#284256" />
      <ExitSign position={[0, 2.7, -half + 0.52]} />

      {/* Ceiling fluorescent lights down corridor */}
      {[-half * 0.65, 0, half * 0.65].map((z, i) => (
        <CeilingLight key={i} position={[0, 3.45, z]} intensity={6.5} distance={8} />
      ))}

      {/* Practicals along corridor walls */}
      <Locker position={[-1.88, 0, -1.6]} rotationY={Math.PI / 2} />
      <Monitor position={[-1.78, 0, 1.2]} rotationY={Math.PI / 2} />
      <VisitorChair position={[1.76, 0, -0.8]} rotationY={-Math.PI / 2} coat="#3c6e8a" />
      <VisitorChair position={[1.76, 0, 0.8]} rotationY={-Math.PI / 2} coat="#4d5260" />
    </group>
  );
};

/** School classroom cutaway set: framed green chalkboard front wall + grid of oak student desks & textbooks. */
export const ClassroomRoom: React.FC<{
  position?: Vec3;
  rotationY?: number;
  boardText?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, boardText = "CLASSROOM" }) => {
  const boardTex = useMemo(() => wordTexture(boardText), [boardText]);
  const boardW = Math.min(2.9, Math.max(0.9, (wordBitmap(boardText).width / 11) * 0.24));

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block position={[0, -0.15, 0]} size={[10, 0.3, 10]} map={plankTex("#9a7246", [5, 5])} />
      <WardWall position={[0, 2.1, -4.4]} size={[10, 4.2, 0.4]} color="#e3dcc8" repeat={[3, 2]} />
      <WardWall position={[-4.8, 2.1, 0]} size={[0.4, 4.2, 10]} color="#dbd3be" repeat={[3, 2]} />

      {/* Framed green chalkboard */}
      <Block position={[0, 2.1, -4.15]} size={[3.8, 1.65, 0.08]} color="#593a1e" />
      <Block position={[0, 2.1, -4.1]} size={[3.5, 1.4, 0.04]} color="#17402a" />
      <mesh position={[0, 2.15, -4.07]}>
        <planeGeometry args={[boardW, 0.24]} />
        <meshBasicMaterial map={boardTex} color="#edf5ec" transparent alphaTest={0.5} toneMapped={false} fog={false} />
      </mesh>
      <pointLight position={[0, 3.4, -2.5]} color="#fff3dc" intensity={5} distance={9} decay={2} />

      {/* 2 rows x 3 columns of student desks + chairs */}
      {[-2.2, 0, 2.2].map((x, ci) =>
        [-1.3, 1.2].map((z, ri) => (
          <group key={`${ci}-${ri}`} position={[x, 0, z]}>
            <Block position={[0, 0.72, 0]} size={[1.15, 0.06, 0.7]} map={plankTex("#a87b48")} />
            {[
              [-0.48, -0.26],
              [0.48, -0.26],
              [-0.48, 0.26],
              [0.48, 0.26],
            ].map(([lx, lz], k) => (
              <Block key={k} position={[lx!, 0.34, lz!]} size={[0.05, 0.68, 0.05]} color="#2b303a" />
            ))}
            <WritableBook position={[0.05, 0.76, -0.02]} rotation={[0, 0.1 * (ci - 1), 0]} cover="#2f5fa8" glow={0} />
            <Block position={[0, 0.42, 0.62]} size={[0.48, 0.06, 0.44]} color="#8b5e36" />
            <Block position={[0, 0.66, 0.81]} size={[0.48, 0.44, 0.06]} color="#8b5e36" />
          </group>
        )),
      )}
    </group>
  );
};

/** Grounded IRL bedroom cutaway: Bed (mattress top at y=0.56 so `animation="sleep"` rests flush), nightstand + Clock3AM, doorway for parent peek. */
export const BedroomSet: React.FC<{
  position?: Vec3;
  rotationY?: number;
  clockText?: string;
  alarm?: number;
  doorOpen?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, clockText = "3:00 AM", alarm = 0, doorOpen = 0.45 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, -0.15, 0]} size={[6.5, 0.3, 6.5]} map={plankTex("#8c653e", [4, 4])} />
    <WardWall position={[0, 1.75, -2.6]} size={[6.5, 3.5, 0.35]} color="#1d5f8a" repeat={[3, 2]} />
    <WardWall position={[-3.0, 1.75, 0]} size={[0.35, 3.5, 6.5]} color="#174e73" repeat={[3, 2]} />
    {/* Doorway in back wall for parent/friend entrance */}
    <DoorFrame position={[1.4, 0, -2.38]} width={1.05} height={2.25} color="#4e321b" />
    <Door position={[0.88, 0, -2.38]} rotationY={-doorOpen * 1.2} width={1.0} height={2.2} color="#6b4423" />
    {/* Bed placed left-center; mattress top sits cleanly at y=0.56 */}
    <Bed position={[-1.15, 0, -0.8]} width={1.2} length={2.15} blanket="#2f7fd4" />
    {/* Nightstand + alarm clock */}
    <Block position={[0.1, 0.32, -1.55]} size={[0.62, 0.64, 0.56]} map={plankTex("#6e4928")} />
    <Clock3AM text={clockText} alarm={alarm} position={[0.1, 0.64, -1.52]} rotationY={0.18} scale={0.85} />
    <pointLight position={[0.1, 2.4, -0.6]} color="#cbe0ff" intensity={3.8} distance={8} decay={2} />
  </group>
);
