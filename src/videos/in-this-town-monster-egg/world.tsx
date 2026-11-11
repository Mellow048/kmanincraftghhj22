import type React from "react";
import {
  Block,
  Clouds,
  Dust,
  Glow,
  GodRay,
  LightPool,
  PixelText,
  Torch,
  Tree,
  Vox,
  Zone,
  clamp01,
  smoothstep,
  useActiveShot,
} from "../../engine";
import type { BlockKind, Vec3 } from "../../engine";
import { Dragon, MonsterEgg, Puffs } from "../../../Topics/InThisTown/creatures";
import { PLACE } from "./kit";

/**
 * THE TOWN, in three zones. A shot names the zone it plays in.
 *
 *   town     One street, running west–east (x). Shops on the north side face
 *            south, at the camera. West end: the stone nest. East end: the gate.
 *   bedroom  The hero's room. It has no south wall: that is where the camera
 *            lives. Keep the lens pointing north, east or west.
 *   lake     Outside the east wall: basalt shore, then lava from x = 42.
 *
 * The wall and its gate belong to no zone. They are in every outdoor shot.
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

/** A village house. `at` is the middle of its front wall, at ground level. It faces south unless `flip`. */
const House: React.FC<{
  at: Vec3;
  w: number;
  d: number;
  h: number;
  wall: BlockKind;
  tint?: string;
  roof: string;
  door?: number;
  windows?: number[];
  sign?: string;
  signX?: number;
  flip?: boolean;
  lit?: boolean;
}> = ({ at, w, d, h, wall, tint, roof, door = 0, windows = [], sign, signX, flip = false, lit = false }) => {
  const layers = Math.ceil((w + 1) / 1.8);
  const signW = sign ? Math.min(w - 1, sign.length * 0.42 + 0.5) : 0;
  return (
    <group position={at} rotation={[0, flip ? Math.PI : 0, 0]}>
      <Vox kind={wall} tint={tint} position={[0, (h + 1) / 2, -d / 2]} size={[w, h - 1, d]} />
      <Vox kind="cobble" position={[0, 0.5, -d / 2]} size={[w + 0.12, 1, d + 0.12]} />
      {[-1, 1].map((s) => (
        <Vox key={s} kind="log" position={[s * (w / 2), h / 2, 0.06]} size={[0.5, h, 0.5]} />
      ))}
      <Vox kind="log" position={[0, h + 0.05, 0.06]} size={[w + 0.5, 0.4, 0.5]} />
      {Array.from({ length: layers }, (_, i) => {
        const lw = w + 1 - i * 1.8;
        return lw < 0.9 ? null : (
          <Vox key={i} kind="darkPlanks" tint={roof} position={[0, h + 0.55 + i * 0.6, -d / 2]} size={[lw, 0.6, d + 1]} />
        );
      })}

      <Vox kind="darkPlanks" position={[door, 1.05, 0.06]} size={[1.1, 2.1, 0.14]} />
      <Block position={[door + 0.36, 1.05, 0.15]} size={[0.08, 0.08, 0.06]} color="#e8c44a" />
      <Vox kind="stone" position={[door, 0.06, 0.62]} size={[1.5, 0.12, 0.9]} />

      {windows.map((x) => (
        <group key={x} position={[x, 2.15, 0.02]}>
          <Block size={[1.3, 1.3, 0.12]} color="#5c3f24" />
          <Block
            position={[0, 0, 0.03]}
            size={[1.02, 1.02, 0.1]}
            color={lit ? "#ffd27a" : "#a8d8f0"}
            emissive={lit ? "#ffb347" : "#6fb6e0"}
            emissiveIntensity={lit ? 1.7 : 0.25}
            castShadow={false}
          />
          <Block position={[0, 0, 0.09]} size={[1.02, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
          <Block position={[0, 0, 0.09]} size={[0.07, 1.02, 0.03]} color="#5c3f24" castShadow={false} />
          <Vox kind="leaves" position={[0, -0.84, 0.18]} size={[1.3, 0.3, 0.32]} />
          <Block position={[-0.32, -0.64, 0.22]} size={[0.15, 0.15, 0.15]} color="#e8433a" />
          <Block position={[0.26, -0.64, 0.24]} size={[0.15, 0.15, 0.15]} color="#f2d23a" />
        </group>
      ))}

      {sign ? (
        <group position={[signX ?? door, 3.05, 0.2]}>
          <Vox kind="planks" size={[signW, 0.62, 0.1]} />
          <PixelText text={sign} position={[0, 0, 0.056]} height={0.46} maxWidth={signW - 0.16} />
        </group>
      ) : null}
    </group>
  );
};

const LampPost: React.FC<{ position: Vec3; light?: number; seed?: number }> = ({ position, light = 0, seed = 1 }) => (
  <group position={position}>
    <Vox kind="log" position={[0, 1.1, 0]} size={[0.22, 2.2, 0.22]} />
    <Torch position={[0, 2.2, 0]} light={light} seed={seed} />
  </group>
);

/** The old stone nest: a ring of mossy stones round a bed of straw. Eggs are put in by the scenes. */
const StoneNest: React.FC = () => (
  <group position={PLACE.nest}>
    <Vox kind="hay" position={[0, 0.08, 0]} size={[3.6, 0.16, 3.6]} />
    {Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2;
      const tall = i % 3 === 0;
      return (
        <Vox
          key={i}
          kind={i % 2 ? "mossy" : "cobble"}
          position={[Math.cos(a) * 2.4, tall ? 0.6 : 0.4, Math.sin(a) * 2.4]}
          rotationY={-a}
          size={[1.1, tall ? 1.2 : 0.8, 1.5]}
        />
      );
    })}
    <Vox kind="mossy" position={[-3.4, 1.7, -2.2]} size={[1.2, 3.4, 1.2]} />
    <Vox kind="cobble" position={[3.2, 1.3, -2.8]} size={[1.1, 2.6, 1.1]} />
    <Vox kind="mossy" position={[-0.4, 2.1, -3.8]} size={[1.3, 4.2, 1.2]} />
  </group>
);

/** The old well. It lost its roof long ago. It is full, and not with water. */
const OldWell: React.FC = () => (
  <group position={PLACE.well}>
    {[
      [0, 0.45, 0.95, 2.4, 0.5],
      [0, 0.45, -0.95, 2.4, 0.5],
      [0.95, 0.45, 0, 0.5, 1.4],
      [-0.95, 0.45, 0, 0.5, 1.4],
    ].map(([x, y, z, w, d], i) => (
      <Vox key={i} kind="mossy" position={[x, y, z]} size={[w, 0.9, d]} />
    ))}
    <Block position={[0, 0.03, 0]} size={[1.4, 0.06, 1.4]} color="#0c0a10" castShadow={false} />
    <Vox kind="log" position={[-1.05, 1.1, 0.9]} size={[0.3, 2.2, 0.3]} />
    <Vox kind="log" position={[1.05, 0.7, -0.9]} rotation={[0.2, 0, 0.3]} size={[0.3, 1.5, 0.3]} />
    {[
      [-1.9, 0.5, 0.3, 0.4],
      [1.7, 1.2, 1.9, -0.5],
      [0.4, 1.9, 4.0, 0.9],
    ].map(([x, z, rot, tilt], i) => (
      <group key={i} position={[x, 0, z]} rotation={[tilt, rot, 0]}>
        <Block position={[0, 0.07, 0]} size={[0.44, 0.14, 0.44]} color="#8f9197" />
        <Block position={[0.14, 0.18, 0]} size={[0.16, 0.12, 0.44]} color="#85878d" />
      </group>
    ))}
  </group>
);

const Town: React.FC<{ night: boolean; storm: boolean }> = ({ night, storm }) => {
  const lit = night || storm;
  const lamp = night ? 16 : storm ? 8 : 0;
  return (
    <>
      <Vox kind="grass" side="dirt" position={[-10.5, -0.5, -4]} size={[79, 1, 60]} />
      <Vox kind="path" position={[-4, 0.02, 1]} size={[64, 0.06, 5]} />
      <Vox kind="path" position={[17, 0.021, 5.6]} size={[8, 0.06, 6]} />
      <Vox kind="path" position={[-31, 0.021, 1]} size={[9, 0.06, 9]} />

      {/* North side of the street, west to east. Every front is at z = -3.2. */}
      <House at={PLACE.school} w={10} d={8} h={4.6} wall="bricks" roof="#5c3f24" door={0} windows={[-3.2, 3.2]} sign="SCHOOL" lit={lit} />
      <Vox kind="bricks" position={[-20, 8.6, -7.2]} size={[2, 2.6, 2]} />
      <Block position={[-20, 8.5, -6.1]} size={[0.6, 0.7, 0.3]} color="#e8c44a" metalness={0.4} roughness={0.5} />
      <Vox kind="darkPlanks" position={[-20, 10.2, -7.2]} size={[2.8, 0.6, 2.8]} />

      <House at={PLACE.mail} w={6} d={6} h={4} wall="planks" tint="#e4d8be" roof="#3d5f9a" door={-1} windows={[1.4]} sign="MAIL" signX={-1} lit={lit} />
      <Vox kind="log" position={[-4.9, 1.6, -1.9]} size={[0.24, 3.2, 0.24]} />
      <Vox kind="log" position={[-4.9, 3.2, -1.9]} size={[1.6, 0.2, 0.2]} />
      <Vox kind="log" position={[-11.6, 0.5, -2.3]} size={[0.2, 1, 0.2]} />
      <Vox kind="wool" tint="#3d5f9a" position={[-11.6, 1.25, -2.3]} size={[0.6, 0.55, 0.45]} />
      <Block position={[-11.6, 1.3, -2.06]} size={[0.36, 0.05, 0.02]} color="#111827" castShadow={false} />

      <House at={PLACE.bakery} w={8} d={7} h={4.2} wall="planks" roof="#8a3b2a" door={-0.6} windows={[-2.8]} sign="BAKERY" signX={-1.6} lit={lit} />
      {/* The oven is built out from the bakery wall. Its mouth is PLACE.oven. */}
      <Vox kind="stoneBrick" position={[3.1, 1.3, -2.55]} size={[2.6, 2.6, 1.4]} />
      <Vox kind="bricks" position={[3.1, 4.6, -2.75]} size={[1.1, 4.2, 1]} />
      <Block position={[3.1, 1.15, -1.86]} size={[1.3, 0.9, 0.06]} color="#140a06" castShadow={false} />
      <Block position={[3.1, 0.95, -1.84]} size={[1.0, 0.4, 0.06]} color="#ff9a2e" emissive="#ff6a14" emissiveIntensity={2.2} castShadow={false} />
      <Glow position={[3.1, 1.15, -1.6]} size={2.4} color="#ff8a2e" opacity={0.5} />
      <LightPool position={[3.1, 0.07, -0.7]} width={2.6} depth={2.2} color="#ffb060" opacity={0.42} />
      <Puffs position={[3.1, 6.8, -2.75]} count={8} rise={3.2} spread={0.5} size={0.5} speed={0.3} opacity={0.5} seed={2} />
      <Vox kind="planks" position={[-2.2, 0.5, -2.3]} size={[2.4, 1, 0.8]} />
      {[-2.9, -2.2, -1.5].map((x, i) => (
        <group key={x} position={[x, 1.0, -2.3]} rotation={[0, i * 0.5 - 0.4, 0]}>
          <Block position={[0, 0.08, 0]} size={[0.44, 0.16, 0.2]} color="#c98a3a" />
        </group>
      ))}

      <House at={PLACE.home} w={6.5} d={6} h={3.8} wall="planks" tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} lit={lit} />
      <House at={PLACE.elder} w={6} d={6} h={3.6} wall="cobble" roof="#5a4a6a" door={1.6} windows={[-1.3]} lit={lit} />
      <Vox kind="mossy" position={[17.2, 1.5, -3.1]} size={[1.4, 1.4, 0.3]} />
      {/* Her porch is raised, so she looks down at a kid and the two of them stack in a tall frame. */}
      <Vox kind="cobble" position={[19.3, 0.25, -2.5]} size={[2.6, 0.5, 1.4]} />
      <Vox kind="stone" position={[19.3, 0.12, -1.6]} size={[1.4, 0.24, 0.5]} />
      <Vox kind="planks" position={[19.3, 0.725, -2.75]} size={[1.8, 0.45, 0.5]} />

      {/* South side: two houses with their backs to the camera's usual place, and the plaza with the old well. */}
      <House at={[-16, 0, 13]} w={7} d={6} h={3.8} wall="planks" tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} flip lit={lit} />
      <House at={[-2, 0, 13]} w={6} d={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} flip lit={lit} />
      <OldWell />
      <StoneNest />

      {(
        [
          [-26, -9, 4.5],
          [-13.5, -13, 5],
          [-4.5, -12, 4.2],
          [6.2, -13, 5.2],
          [15, -12, 4.4],
          [24.5, -10, 5],
          [-36, -4, 5.4],
          [-37, 6, 4.6],
          [-25, 9, 4.8],
          [-9, 10, 4.4],
          [6, 12, 5],
          [22.5, 11, 4.6],
          [9.5, 8.5, 4],
        ] as Array<[number, number, number]>
      ).map(([x, z, h], i) => (
        <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 3 === 0 ? "#4c8f34" : i % 3 === 1 ? "#3f7f2d" : "#356d28"} />
      ))}

      <LampPost position={[-14.2, 0, -2.4]} seed={1} />
      <LampPost position={[-4.2, 0, 3.9]} light={lamp} seed={2} />
      <LampPost position={[6.3, 0, -2.4]} seed={3} />
      <LampPost position={[13.5, 0, 3.9]} light={lamp} seed={4} />
      <LampPost position={[22.8, 0, 3.9]} light={lamp} seed={5} />
      <LampPost position={[-27.5, 0, 3.6]} light={lamp} seed={6} />

      {/* A green dragon lives on the school roof. It has for years; nobody looks up any more. */}
      <Dragon position={[-17.2, 7.4, -7.2]} rotationY={0.5} scale={0.9} color="#4f9a3a" belly="#d8e6a0" bow={0.55} phase={2} />

      <Clouds y={46} center={[-6, 0, -12]} color={storm ? "#3a3350" : night ? "#27314f" : "#ffffff"} />

      <GodRay position={[-9, 4.2, 4.5]} rotation={[0, 0.3, -0.5]} width={5} height={10} color="#fff3c4" opacity={lit ? 0 : 0.1} />
      <GodRay position={[8, 4.2, 5]} rotation={[0, -0.2, -0.5]} width={4} height={10} color="#fff3c4" opacity={lit ? 0 : 0.09} />
      <LightPool position={[-4.2, 0.07, 3.9]} width={5} depth={5} color="#ffb060" opacity={lit ? 0.4 : 0} />
      <LightPool position={[13.5, 0.07, 3.9]} width={5} depth={5} color="#ffb060" opacity={lit ? 0.4 : 0} />
      <LightPool position={[22.8, 0.07, 3.9]} width={5} depth={5} color="#ffb060" opacity={lit ? 0.4 : 0} />
      <Dust position={[-4, 2.4, 1.5]} area={[62, 4.4, 12]} count={150} size={0.05} color={lit ? "#ffcf8a" : "#fffbe0"} opacity={0.7} seed={11} speed={0.25} />
    </>
  );
};

/** The town wall on the east side, and the gate no kid may pass. In every outdoor shot. */
const Wall: React.FC<{ lit: boolean }> = ({ lit }) => (
  <>
    <Vox kind="stoneBrick" position={[28.5, 3, -17.75]} size={[2, 6, 32.5]} />
    <Vox kind="stoneBrick" position={[28.5, 3, 14.75]} size={[2, 6, 22.5]} />
    <Vox kind="stoneBrick" position={[28.5, 5, 1]} size={[2, 2, 5]} />
    {Array.from({ length: 15 }, (_, i) => (
      <Vox key={i} kind="stoneBrick" position={[28.5, 6.4, -13 + i * 2]} size={[2.2, 0.8, 1]} />
    ))}
    <Vox kind="stoneBrick" position={[-10.5, 3, -20]} size={[80, 6, 2]} />
    <Vox kind="stoneBrick" position={[-49.5, 3, -4]} size={[2, 6, 60]} />

    <Vox kind="darkPlanks" position={[27.85, 2, -0.25]} size={[0.3, 4, 2.5]} />
    <Vox kind="darkPlanks" position={[27.85, 2, 2.25]} size={[0.3, 4, 2.5]} />
    {[0.6, 3.6].map((y) => (
      <Block key={y} position={[27.68, y, 1]} size={[0.06, 0.22, 4.9]} color="#2f3138" metalness={0.5} roughness={0.6} />
    ))}
    <group position={[27.62, 2.2, 1]} rotation={[0, -Math.PI / 2, 0]}>
      <Vox kind="planks" size={[2.1, 1.8, 0.1]} />
      <Block position={[0, 0.93, 0]} size={[2.2, 0.08, 0.14]} color="#5c3f24" />
      <Block position={[0, -0.93, 0]} size={[2.2, 0.08, 0.14]} color="#5c3f24" />
      <PixelText text="NO" position={[0, 0.42, 0.056]} height={0.74} color="#ff6a5a" />
      <PixelText text="KIDS" position={[0, -0.4, 0.056]} height={0.74} maxWidth={1.9} color="#ffffff" />
    </group>
    <Torch position={[27.3, 2.3, -2.2]} light={lit ? 18 : 0} seed={7} />
    <Torch position={[27.3, 2.3, 4.2]} light={lit ? 18 : 0} seed={8} />
  </>
);

/** The hero's room. Origin PLACE.room. The bed's mattress top is y = 0.55; the bedside table top is y = 0.6. */
const Bedroom: React.FC = () => (
  <group position={PLACE.room}>
    {/* Walls and ceiling cast no shadow, so the moon lights the room as if through the roof. */}
    <Vox kind="planks" position={[0, -0.1, 1.5]} size={[5.4, 0.2, 8]} />
    <Vox kind="planks" tint="#c8a878" position={[0, 2.3, -2.5]} size={[5.4, 4.6, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#c0a070" position={[-2.7, 2.3, 1.5]} size={[0.2, 4.6, 8]} castShadow={false} />
    <Vox kind="planks" tint="#c0a070" position={[2.7, 2.3, 1.5]} size={[0.2, 4.6, 8]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 4.7, 1.5]} size={[5.6, 0.2, 8]} castShadow={false} />
    <Vox kind="log" position={[0, 3.1, -2.35]} size={[5.4, 0.3, 0.3]} />

    <Vox kind="planks" position={[-1.2, 0.2, -1.25]} size={[1.2, 0.4, 2.3]} />
    <Vox kind="darkPlanks" position={[-1.2, 0.6, -2.36]} size={[1.2, 1, 0.1]} />
    <Vox kind="wool" position={[-1.2, 0.475, -1.25]} size={[1.1, 0.15, 2.2]} />
    <Vox kind="wool" tint="#f6f6f6" position={[-1.2, 0.6, -2.0]} size={[0.8, 0.1, 0.45]} />

    <Vox kind="darkPlanks" position={[-0.25, 0.3, -1.95]} size={[0.6, 0.6, 0.6]} />

    <group position={[1.3, 1.85, -2.39]}>
      <Block size={[1.5, 1.5, 0.08]} color="#5c3f24" />
      <Block position={[0, 0, 0.03]} size={[1.2, 1.2, 0.06]} color="#a9c6ff" emissive="#7fa8ff" emissiveIntensity={1.5} castShadow={false} />
      <Block position={[0.25, 0.25, 0.065]} size={[0.34, 0.34, 0.02]} color="#f4f7ff" emissive="#ffffff" emissiveIntensity={2.2} castShadow={false} />
      <Block position={[0, 0, 0.07]} size={[1.2, 0.07, 0.03]} color="#5c3f24" castShadow={false} />
      <Block position={[0, 0, 0.07]} size={[0.07, 1.2, 0.03]} color="#5c3f24" castShadow={false} />
    </group>
    <GodRay position={[1.1, 1.2, -1.35]} rotation={[0.55, 0, 0.12]} width={1.5} height={2.8} color="#a9c6ff" opacity={0.2} />
    <LightPool position={[0.95, 0.012, -0.55]} width={1.9} depth={1.7} color="#a9c6ff" opacity={0.34} />
    <pointLight position={[1.2, 2.1, -1.5]} color="#8fb4ff" intensity={9} distance={7} decay={2} />
    {/* Fill from the open side, where the camera lives. Without it a face turned to the lens at night is black. */}
    <pointLight position={[0.4, 2.3, 2.9]} color="#93a9ff" intensity={34} distance={11} decay={2} />

    <Vox kind="wool" tint="#3f6fb8" position={[0.8, 0.02, 0.7]} size={[2.6, 0.04, 2]} />
    <Vox kind="darkPlanks" position={[2.15, 0.35, -1.7]} size={[0.8, 0.7, 1.1]} />
    <Block position={[1.74, 0.42, -1.7]} size={[0.04, 0.12, 0.14]} color="#e8c44a" />
    <Vox kind="planks" position={[2.5, 1.5, 0.6]} size={[0.24, 0.08, 1.4]} />
    <Block position={[2.46, 1.66, 0.9]} size={[0.2, 0.24, 0.2]} color="#e8433a" />
    <Block position={[2.46, 1.64, 0.55]} size={[0.2, 0.2, 0.2]} color="#f2d23a" />
    <Block position={[2.46, 1.62, 0.24]} size={[0.16, 0.16, 0.16]} color="#3f8fe8" />
    <Torch position={[-2.5, 1.5, 0.9]} light={3.5} seed={4} />
    <Dust position={[0, 1.4, -0.2]} area={[4.6, 2.4, 4.2]} count={45} size={0.03} color="#cfe0ff" opacity={0.6} seed={5} speed={0.15} />
  </group>
);

/** Outside the wall. `heat` 1 = a lake of fire; 0 = black crust. `crust` 0..1 spreads the dark from where the egg sank. */
const Lake: React.FC<{ heat: number; crust: number }> = ({ heat, crust }) => (
  <>
    <Vox kind="basalt" position={[35.5, -0.5, -4]} size={[13, 1, 60]} />
    <Vox kind="lava" tile={2} position={[86, -0.8, -4]} size={[90, 1, 110]} emissive="#ffffff" emissiveIntensity={0.06 + heat * 0.5} />
    {crust > 0.001 ? (
      <mesh position={[42.6, -0.2, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[crust * 95, 40]} />
        <meshBasicMaterial color="#120d10" />
      </mesh>
    ) : null}

    {(
      [
        [41.6, -3.2, 1.6, 0.7, 1.8, "basalt"],
        [42.2, -1.2, 1.1, 0.4, 1.3, "magma"],
        [41.8, 3.3, 1.5, 0.6, 1.6, "basalt"],
        [42.3, 5.6, 1.2, 0.9, 1.5, "magma"],
        [41.7, -6.5, 1.4, 1.1, 2.0, "basalt"],
        [42.1, 8.8, 1.5, 0.5, 1.8, "basalt"],
        [41.9, -10.5, 1.3, 0.8, 1.7, "magma"],
        [37.5, -5.5, 1.6, 1.3, 1.4, "basalt"],
        [34.2, 6.2, 2.0, 1.7, 1.8, "basalt"],
        [38.6, 9.5, 1.3, 0.9, 1.2, "magma"],
        [32.4, -8.4, 1.8, 2.2, 1.6, "basalt"],
      ] as Array<[number, number, number, number, number, BlockKind]>
    ).map(([x, z, w, h, d, kind], i) => (
      <Vox
        key={i}
        kind={kind}
        position={[x, h / 2 - 0.15, z]}
        rotationY={i * 0.7}
        size={[w, h, d]}
        emissive={kind === "magma" ? "#ffffff" : undefined}
        emissiveIntensity={kind === "magma" ? 0.9 * heat : 0}
      />
    ))}
    {(
      [
        [49, -7, 2.2, 4.5],
        [55, 6, 3, 7],
        [63, -3, 2.4, 5.5],
        [58, -16, 3.4, 9],
        [70, 12, 4, 11],
        [78, -8, 5, 14],
      ] as Array<[number, number, number, number]>
    ).map(([x, z, w, h], i) => (
      <group key={i}>
        <Vox kind="basalt" tile={2} position={[x, h / 2 - 0.5, z]} rotationY={i * 0.5} size={[w, h, w]} />
        <Vox kind="magma" position={[x, 0.1, z]} rotationY={i * 0.5} size={[w + 0.5, 1, w + 0.5]} emissive="#ffffff" emissiveIntensity={0.9 * heat} />
      </group>
    ))}

    <Glow position={[60, 4, 1]} size={80} color="#ff5a1e" opacity={0.45 * heat} />
    <Glow position={[46, 0.4, 1]} size={12} color="#ff8a2e" opacity={0.2 * heat} />
    <LightPool position={[39.5, 0.02, 1]} width={7} depth={22} color="#ff7a2a" opacity={0.35 * heat} />
    <pointLight position={[44.5, 1.4, 1]} color="#ff7a2a" intensity={90 * heat} distance={26} decay={2} />
    <Dust position={[47, 2.6, 1]} area={[22, 5.4, 26]} count={90} size={0.07} color={heat > 0.5 ? "#ffb347" : "#8a8f9a"} opacity={0.9} seed={17} speed={0.6} />
    <GodRay position={[45, 4, -3]} rotation={[0, 0.4, 0.2]} width={5} height={9} color="#ff8a3c" opacity={0.1 * heat} />
    <Puffs position={[50, 0, -4]} count={7} rise={7} spread={1.6} size={1.1} speed={0.16} opacity={0.4} color={heat > 0.5 ? "#5a3a34" : "#5d6270"} seed={21} />
    <Puffs position={[57, 0, 8]} count={7} rise={8} spread={2} size={1.3} speed={0.13} opacity={0.4} color={heat > 0.5 ? "#5a3a34" : "#5d6270"} seed={22} />
    <Puffs position={[46, 0, 9]} count={6} rise={5} spread={1.2} size={0.8} speed={0.2} opacity={0.35} color={heat > 0.5 ? "#5a3a34" : "#5d6270"} seed={23} />
    {/* One column tall enough to be seen from inside the town, over the wall. */}
    <Puffs position={[45, 2, -5]} count={9} rise={20} spread={2.6} size={2.4} speed={0.11} opacity={0.5} color={heat > 0.5 ? "#4a2e2a" : "#5d6270"} seed={24} />
  </>
);

/**
 * Eggs in the old well. "Like all the others." They lie on their backs, so
 * from above every crack shows. `glow` 1 = each one is still calling.
 */
export const WellEggs: React.FC<{ glow: number; t: number }> = ({ glow, t }) => (
  <>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((i % 3) - 1) * 0.43 + (i % 2) * 0.05;
      const z = (Math.floor(i / 3) - 1) * 0.45 + 0.2;
      const beat = Math.max(0, Math.sin(t * 5 + i * 1.7)) ** 3;
      return (
        <group
          key={i}
          position={[PLACE.well[0] + x, 0.26 + (i % 3) * 0.04, PLACE.well[2] + z]}
          rotation={[-Math.PI / 2 + ((i * 7) % 5) * 0.06 - 0.12, 0, ((i * 5) % 7) * 0.12 - 0.36]}
        >
          <MonsterEgg scale={0.56} cracked halo={false} glow={glow * (0.35 + beat * 0.65)} tilt={beat * glow * 0.1 * (i % 2 ? 1 : -1)} />
        </group>
      );
    })}
  </>
);

/** Lake shots that play after the fire has gone out. */
const DEAD_LAKE = new Set(["15.swallow", "15.shake", "15.split", "15.worm", "15.rank"]);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const cue = active?.shot.cue ?? "";
  const p = active ? clamp01(active.t / Math.max(0.001, active.shot.dur)) : 0;
  const night = look === "overworld-night";
  const storm = look === "overworld-storm";
  const crust = cue === "15.dark" ? smoothstep(clamp01(p * 1.25)) : DEAD_LAKE.has(cue) ? 1 : 0;
  const heat = DEAD_LAKE.has(cue) ? 0 : 1 - crust * 0.85;
  return (
    <>
      <Zone name="town">
        <Town night={night} storm={storm} />
      </Zone>
      <Zone name="lake">
        <Lake heat={heat} crust={crust} />
      </Zone>
      <Zone name="bedroom">
        <Bedroom />
      </Zone>
      <Zone name="wall" with={["town", "lake"]}>
        <Wall lit={night || storm} />
      </Zone>
    </>
  );
};
