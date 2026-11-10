import {
  Bed,
  BedsideTable,
  Block,
  Carpet,
  CeilingLight,
  CeilingMobile,
  CeilingTiles,
  CeilingVent,
  ChildDrawing,
  Curtains,
  Door,
  DoorFrame,
  DoorPlate,
  ExitSign,
  Footprints,
  Glow,
  GodRay,
  IVStand,
  LightPool,
  Locker,
  MopBucket,
  Monitor,
  MoonWindow,
  NoticeBoard,
  Pipes,
  Puddle,
  Radiator,
  Sign,
  TeddyBear,
  ToyBlocks,
  VisitorChair,
  WallChart,
  WallClock,
  WardWall,
  WetFloorSign,
  Wheelchair,
} from "../../engine";
import { Dust, FogCard } from "../../engine/fx";
import { floorTex } from "../../engine/textures";

/**
 * THE HALLWAY — world.
 *
 * One continuous location: a children's ward room at night, and the corridor
 * outside it. Built once and shared by every scene.
 *
 *   ROOM      x -2.6 .. 2.6   z -3.0 .. 3.0   bed left, moon window in back
 *   DOOR      x  1.15 .. 2.15 at z = 3.0      swings into the hall
 *   HALLWAY   x -2.2 .. 2.2   z  3.0 .. 13.0  runner, wheelchair, mop bucket,
 *                                             fire exit, The Figure at z 10.15
 *
 * The camera must never teleport through these walls. If a scene is in the
 * hallway, the previous scene's camera needs a path through the door.
 *
 * STORY DETAILS — every one of these is a reason the room belongs to a child:
 * the crayon drawing of a tall black figure (the hook), the ceiling mobile,
 * the teddy on the pillow, toy blocks, the visitor's coat on the chair, the
 * patient chart, the taped timetable. The corridor carries the wet floor, the
 * footprints, the missing poster and the fire exit that nobody uses.
 */

/** Where the corridor lamp above the figure finally gives up. */
const LAMP_DEATH = 16.3;

const FLICKER: Array<[number, number]> = [
  [7.15, 8.25],
  [9.9, 10.35],
  [12.3, 14.1],
  [15.0, 15.6],
];

export const World: React.FC = () => {
  return (
    <group>
      {/* ───────────────────────── ROOM ─────────────────────────
          A child's ward bed under a moonlit window. Everything soft is at
          child height; everything hard is institutional. */}
      <group>
        <Block position={[0, -0.05, 0]} size={[5.2, 0.1, 6]} map={floorTex("#46555e", [13, 15])} />
        <Block position={[0, 3.06, 0]} size={[5.2, 0.12, 6]} color="#0c1422" />
        <CeilingTiles position={[0, 2.995, 0]} size={[5.2, 6]} />

        {/* back wall, split around the moon window (x -2.4 .. -1.1, y 1.2 .. 2.5) */}
        <WardWall position={[-2.5, 1.5, -3.06]} size={[0.2, 3, 0.12]} color="#3d5c74" repeat={[1, 2]} />
        <WardWall position={[0.75, 1.5, -3.06]} size={[3.7, 3, 0.12]} color="#3d5c74" repeat={[3, 2]} />
        <WardWall position={[-1.75, 0.6, -3.06]} size={[1.3, 1.2, 0.12]} color="#3d5c74" repeat={[1, 1]} />
        <WardWall position={[-1.75, 2.75, -3.06]} size={[1.3, 0.5, 0.12]} color="#3d5c74" repeat={[1, 1]} />
        <Block position={[0, 0.55, -2.99]} size={[5.2, 1.1, 0.04]} color="#2c4658" />
        <Block position={[0, 0.05, -2.98]} size={[5.2, 0.1, 0.05]} color="#1b2c3a" />

        {/* the hero window: moon, stars, rooftops, directly over the bed */}
        <MoonWindow position={[-1.75, 1.85, -2.98]} width={1.3} height={1.3} />
        <Curtains position={[-1.75, 1.95, -2.88]} width={2.4} height={1.85} color="#2b4a7a" gap={1.35} />

        {/* the moon itself: the only shadow-caster in the room */}
        <directionalLight
          color="#a9c9ff"
          intensity={2.1}
          position={[-1.8, 4.5, -8]}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-camera-near={0.5}
          shadow-camera-far={26}
          shadow-bias={-0.0006}
          shadow-normalBias={0.02}
        />
        <pointLight position={[-1.75, 2.3, -1.9]} color="#bcd8ff" intensity={6} distance={7} decay={2} />
        {/* warm fill from the doorway so the boy is not a silhouette */}
        <pointLight position={[1.3, 1.55, 1.6]} color="#ffd0a0" intensity={5.5} distance={6.5} decay={2} />
        {/* cool rim behind the boy, separating him from the headboard */}
        <pointLight position={[-2.5, 1.7, -1.1]} color="#7fb0ff" intensity={4.5} distance={3.6} decay={2} />
        <Glow position={[-1.75, 1.9, -2.66]} size={2.8} color="#9fc6ff" opacity={0.26} />
        <GodRay position={[-1.75, 1.4, -1.5]} rotation={[0, 0, -0.3]} width={1.1} height={4.6} color="#a9c9ff" opacity={0.1} />
        <GodRay position={[-1.45, 1.2, -0.9]} rotation={[0, 0.2, -0.42]} width={1.5} height={4.2} color="#8fb6ee" opacity={0.08} />
        <LightPool position={[-1.4, 0.015, -0.85]} width={2.6} depth={2.0} color="#5f8fd6" opacity={0.14} />

        {/* left wall — carries the drawing */}
        <WardWall position={[-2.66, 1.5, 0]} size={[0.12, 3, 6]} color="#3a5a72" repeat={[4, 2]} />
        <Block position={[-2.59, 0.55, 0]} size={[0.04, 1.1, 6]} color="#2c4658" />
        <Block position={[-2.58, 0.05, 0]} size={[0.05, 0.1, 6]} color="#1b2c3a" />

        {/* right wall — solid now, so the room has a place to hang things */}
        <WardWall position={[2.66, 1.5, 0]} size={[0.12, 3, 6]} color="#3a5a72" repeat={[4, 2]} />
        <Block position={[2.59, 0.55, 0]} size={[0.04, 1.1, 6]} color="#2c4658" />
        <Block position={[2.58, 0.05, 0]} size={[0.05, 0.1, 6]} color="#1b2c3a" />
        <Radiator position={[2.5, 0, -1.7]} rotationY={-Math.PI / 2} width={1.3} />

        {/* front wall around the door */}
        <WardWall position={[-0.725, 1.5, 3.06]} size={[3.75, 3, 0.12]} color="#3a5a72" repeat={[3, 2]} />
        <WardWall position={[2.375, 1.5, 3.06]} size={[0.45, 3, 0.12]} color="#3a5a72" repeat={[1, 2]} />
        <WardWall position={[1.65, 2.6, 3.06]} size={[1.0, 0.8, 0.12]} color="#3a5a72" repeat={[1, 1]} />
        <Block position={[-0.725, 0.55, 2.99]} size={[3.75, 1.1, 0.04]} color="#2c4658" />
        <Block position={[2.375, 0.55, 2.99]} size={[0.45, 1.1, 0.04]} color="#2c4658" />
        <Block position={[-0.725, 0.05, 2.98]} size={[3.75, 0.1, 0.05]} color="#1b2c3a" />
        <Block position={[2.375, 0.05, 2.98]} size={[0.45, 0.1, 0.05]} color="#1b2c3a" />

        {/* door frame, door, plate, threshold */}
        <Block position={[1.11, 1.12, 3.03]} size={[0.1, 2.25, 0.18]} color="#2c374c" />
        <Block position={[2.19, 1.12, 3.03]} size={[0.1, 2.25, 0.18]} color="#2c374c" />
        <Block position={[1.65, 2.24, 3.03]} size={[1.18, 0.1, 0.18]} color="#2c374c" />
        {/* Hinged on the left jamb and swung 180° so the leaf stands flat
            against the room's side wall. The opening itself is never blocked,
            from inside the room or from the corridor. */}
        <Door position={[1.15, 0, 3.03]} width={1.0} height={2.18} open={Math.PI} color="#22352d" />
        <DoorPlate position={[2.34, 2.34, 2.99]} rotationY={Math.PI} label="9" width={0.24} />

        {/* the bed — rails up, teddy on the pillow, blanket folded */}
        <Bed position={[-1.8, 0, -1.75]} length={2.2} width={1.15} sheet="#c3d7e8" blanket="#163c5e" rails />
        <Block position={[-1.8, 0.596, -0.78]} size={[1.21, 0.022, 0.22]} color="#e6eef6" />
        <Block position={[-1.8, 0.585, -1.02]} size={[1.19, 0.02, 0.06]} color="#8fb4d2" />
        <TeddyBear position={[-2.06, 0.6, -2.42]} rotationY={0.55} scale={1.15} />

        {/* hanging mobile above the bed */}
        <CeilingMobile position={[-1.8, 2.98, -1.85]} scale={1.15} speed={0.1} />

        {/* nightstand, lamp, monitor, IV */}
        <BedsideTable position={[-0.55, 0, -2.55]} />
        <Block position={[-0.55, 0.72, -2.55]} size={[0.06, 0.24, 0.06]} color="#1c2431" />
        <Block position={[-0.55, 0.86, -2.55]} size={[0.26, 0.14, 0.26]} color="#ffcf9a" emissive="#ffb066" emissiveIntensity={0.9} />
        <Glow position={[-0.55, 0.88, -2.5]} size={1.1} color="#ffb066" opacity={0.4} />
        <pointLight position={[-0.55, 0.92, -2.45]} color="#ffb066" intensity={4} distance={4} decay={2} />
        <LightPool position={[-0.7, 0.02, -2.25]} width={1.4} depth={1.2} color="#ffb066" opacity={0.1} />

        <Monitor position={[-0.28, 0, -2.32]} rotationY={0.25} />
        <Glow position={[-0.26, 0.53, -2.19]} size={0.9} color="#54e08a" opacity={0.4} />

        <IVStand position={[-0.62, 0, -1.78]} rotationY={0.2} bag="#dce9f5" />

        {/* wall dressing: chart, notice board, timetable, clock, locker */}
        <WallChart position={[2.56, 1.5, -1.55]} rotationY={-Math.PI / 2} width={0.4} />
        <NoticeBoard position={[2.56, 1.9, 0.5]} rotationY={-Math.PI / 2} width={0.85} seed={3} />
        <Sign
          position={[2.56, 1.95, 1.85]}
          rotationY={-Math.PI / 2}
          width={1.1}
          height={0.9}
          title="MY TIMETABLE"
          bg="#e8e1cd"
          fg="#26303c"
          accent="#3963a8"
          grid
          lit={0.28}
        />
        <WallClock position={[2.56, 2.5, -0.45]} rotationY={-Math.PI / 2} radius={0.17} />
        <Locker position={[1.95, 0, -2.62]} width={0.8} height={1.85} depth={0.42} doors={2} />

        {/* visitor chair with a coat, toy blocks on the floor */}
        <VisitorChair position={[0.42, 0, -2.35]} rotationY={0.4} />
        <ToyBlocks position={[-0.9, 0, 0.6]} count={8} seed={4} />

        {/* the crayon drawing — the hook. It hangs on the LEFT wall just past
            the foot of the bed, at child height, exactly where a boy sitting up
            in bed would look. The camera sees it in the establishing shot and
            the insert shot pushes straight into it. */}
        <ChildDrawing position={[-2.57, 1.72, -0.2]} rotationY={Math.PI / 2} width={0.68} kind="shadow" seed={5} />
        {/* a dim plug night-light washes the drawing so the hook is readable */}
        <pointLight position={[-2.2, 1.95, -0.2]} color="#b9c9e8" intensity={2.2} distance={2.6} decay={2} />
        <Glow position={[-2.44, 1.72, -0.2]} size={1.5} color="#8ea6cc" opacity={0.12} />

        {/* light above the door, the one that starts misbehaving */}
        <CeilingLight position={[1.55, 2.9, 2.45]} size={[0.34, 0.14]} color="#ffe9c9" lightColor="#ffdfae" intensity={4.2} distance={8} flicker={FLICKER} />
        <LightPool position={[1.55, 0.02, 2.35]} width={1.5} depth={1.6} color="#ff9a45" opacity={0.1} />
        <GodRay position={[1.35, 1.5, 2.6]} rotation={[0, 0.2, -0.35]} width={0.85} height={3.1} color="#8fb6ee" opacity={0.07} />

        <Pipes position={[2.05, 2.78, 0]} rotationY={Math.PI / 2} length={5.2} count={2} />
        <CeilingVent position={[-1.0, 2.96, 1.2]} size={0.5} />

        <Dust position={[0, 1.45, 0]} area={[4.6, 2.6, 5.2]} count={150} size={0.026} color="#bcd8ff" opacity={0.3} seed={4} speed={0.35} />
      </group>

      {/* ──────────────────────── HALLWAY ───────────────────────
          The same institutional bones, but everything a child would notice:
          footprints, a wet floor sign, a wheelchair abandoned mid-corridor,
          a fire exit, and a missing poster. */}
      <group>
        <Block position={[0, -0.05, 8]} size={[4.4, 0.1, 10]} map={floorTex("#3f4d55", [11, 25])} />
        <Block position={[0, 3.06, 8]} size={[4.4, 0.12, 10]} color="#0a0f14" />
        <CeilingTiles position={[0, 2.995, 8]} size={[4.4, 10]} />

        <WardWall position={[-2.26, 1.5, 8]} size={[0.12, 3, 10]} color="#2f5147" repeat={[6, 2]} />
        <WardWall position={[2.26, 1.5, 8]} size={[0.12, 3, 10]} color="#2f5147" repeat={[6, 2]} />
        <Block position={[-2.19, 0.5, 8]} size={[0.04, 1.0, 10]} color="#23403a" />
        <Block position={[2.19, 0.5, 8]} size={[0.04, 1.0, 10]} color="#23403a" />
        <Block position={[-2.18, 0.05, 8]} size={[0.05, 0.1, 10]} color="#16282a" />
        <Block position={[2.18, 0.05, 8]} size={[0.05, 0.1, 10]} color="#16282a" />

        {/* end wall + window */}
        <WardWall position={[0, 1.5, 13.06]} size={[4.4, 3, 0.12]} color="#26453c" repeat={[4, 2]} />
        <MoonWindow position={[0, 1.85, 12.98]} rotationY={Math.PI} width={1.6} height={1.3} dim={0.3} />
        <Curtains position={[0, 1.9, 12.88]} rotationY={Math.PI} width={2.5} height={1.7} color="#274b3f" gap={1.5} />
        <pointLight position={[0, 2.05, 12.2]} color="#9fc6ff" intensity={2.6} distance={5} decay={2} />
        <Glow position={[0, 1.95, 12.75]} size={2.2} color="#8fb6ee" opacity={0.07} />
        <GodRay
          position={[0, 1.55, 11.4]}
          rotation={[Math.PI / 2, 0, 0]}
          width={1.9}
          height={3.6}
          color="#8fb6ee"
          opacity={0.06}
        />

        <Carpet position={[0, 0.012, 8]} width={1.65} length={9.6} tone="#5e1a24" />

        {/* far window light pooling on the floor */}
        <LightPool position={[0, 0.02, 11.7]} width={3.2} depth={3.2} color="#6f9fe0" opacity={0.12} />

        {/* side doors with plates */}
        <DoorFrame position={[2.19, 0, 5.5]} rotationY={-Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[2.19, 0, 9.0]} rotationY={-Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[-2.19, 0, 6.8]} rotationY={Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[-2.19, 0, 10.6]} rotationY={Math.PI / 2} color="#0d241f" />
        <Door position={[2.17, 0, 5.5]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={-0.12} color="#1b3730" />
        <Door position={[2.17, 0, 9.0]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={-0.08} color="#1b3730" />
        <Door position={[-2.17, 0, 6.8]} rotationY={Math.PI / 2} width={1.0} height={2.15} open={-0.1} color="#1b3730" />
        <Door position={[-2.17, 0, 10.6]} rotationY={Math.PI / 2} width={1.0} height={2.15} open={-0.06} color="#1b3730" />
        <DoorPlate position={[2.14, 2.3, 4.85]} rotationY={-Math.PI / 2} label="8" width={0.2} />
        <DoorPlate position={[2.14, 2.3, 9.65]} rotationY={-Math.PI / 2} label="10" width={0.2} />
        <DoorPlate position={[-2.14, 2.3, 6.15]} rotationY={Math.PI / 2} label="7" width={0.2} />

        {/* fire exit */}
        <DoorFrame position={[2.19, 0, 11.6]} rotationY={-Math.PI / 2} color="#3a1d1d" />
        <Door position={[2.17, 0, 11.6]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={0} color="#4a2020" />
        <ExitSign position={[2.13, 2.36, 11.6]} rotationY={-Math.PI / 2} width={0.55} lit={0.55} />
        <ExitSign position={[0, 2.62, 12.9]} rotationY={Math.PI} width={0.7} lit={0.5} />

        {/* abandoned wheelchair */}
        <Wheelchair position={[1.55, 0, 6.35]} rotationY={-0.45} />

        {/* wet floor: bucket, sign, puddle, footprints heading away */}
        <MopBucket position={[-1.62, 0, 7.5]} rotationY={0.3} />
        <WetFloorSign position={[-1.02, 0, 7.95]} rotationY={0.25} />
        <Puddle position={[-0.55, 0.016, 8.35]} rotationY={0.12} width={1.25} depth={0.8} opacity={0.45} />
        <Footprints position={[0.15, 0.018, 9.4]} rotationY={0.1} length={3.4} />

        {/* wall seams, rail, vents */}
        {[4.0, 6.2, 8.4, 10.6, 12.4].map((z) => (
          <group key={z}>
            <Block position={[-2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
            <Block position={[2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
          </group>
        ))}
        <Block position={[-2.18, 1.02, 8]} size={[0.04, 0.07, 9.6]} color="#0c211c" />
        <Block position={[2.18, 1.02, 8]} size={[0.04, 0.07, 9.6]} color="#0c211c" />
        <Block position={[-2.18, 2.25, 6.0]} size={[0.04, 0.5, 0.72]} color="#0b1d19" />
        {[0, 1, 2, 3].map((i) => (
          <Block key={i} position={[-2.155, 2.06 + i * 0.12, 6.0]} size={[0.03, 0.03, 0.62]} color="#1d3a33" />
        ))}
        <Block position={[-2.08, 0.62, 7.7]} size={[0.12, 0.5, 0.26]} color="#7d1420" />
        <Block position={[-2.08, 0.86, 7.7]} size={[0.06, 0.1, 0.06]} color="#2b2f36" />

        {/* ceiling bones */}
        {[5.8, 8.6, 11.2].map((z) => (
          <Block key={z} position={[0, 2.93, z]} size={[4.4, 0.14, 0.2]} color="#0a1216" />
        ))}
        <Pipes position={[-1.62, 2.86, 8]} length={9.6} count={3} />
        <CeilingVent position={[1.2, 2.96, 5.6]} size={0.5} />
        <CeilingVent position={[-1.0, 2.96, 9.4]} size={0.45} rotationY={0.4} />

        {/* posters, notice board, missing poster */}
        <Sign
          position={[2.14, 1.82, 4.05]}
          rotationY={-Math.PI / 2}
          width={0.72}
          height={0.92}
          title="KEEP"
          subtitle="OUT"
          lines={["WARD 9", "AFTER 22:00"]}
          bg="#ded8c4"
          fg="#1a2230"
          accent="#2c4fa3"
          lit={0.35}
        />
        <Sign
          position={[2.14, 1.28, 4.82]}
          rotationY={-Math.PI / 2}
          width={0.66}
          height={0.86}
          title="99 NIGHTS"
          lines={["IN THE", "FOREST"]}
          bg="#14243c"
          fg="#e8c76a"
          accent="#e8c76a"
          lit={0.3}
        />
        <NoticeBoard position={[2.14, 1.8, 7.6]} rotationY={-Math.PI / 2} width={0.8} seed={7} />
        <Sign
          position={[-2.14, 1.9, 8.9]}
          rotationY={Math.PI / 2}
          width={0.62}
          height={0.82}
          title="MISSING"
          subtitle="WARD 9"
          lines={["LAST SEEN", "FIRE EXIT"]}
          bg="#e2d9c2"
          fg="#1a2230"
          accent="#a8322a"
          lit={0.34}
        />
        <ChildDrawing position={[-2.14, 1.86, 9.9]} rotationY={Math.PI / 2} width={0.5} kind="family" seed={9} />

        {/* ceiling lights — warm fluorescent panels, the one over the figure
            dies for good. Each panel drops a warm pool so the corridor reads
            as a run of lit bays rather than one blue tube. */}
        <CeilingLight position={[0, 2.98, 4.35]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdca8" intensity={9} distance={8} flicker={FLICKER} />
        <CeilingLight position={[0, 2.98, 7.2]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdca8" intensity={9} distance={8} flicker={FLICKER} />
        <CeilingLight
          position={[0, 2.98, 9.9]}
          size={[0.9, 0.2]}
          color="#ffe9c9"
          lightColor="#ffdca8"
          intensity={10}
          distance={8}
          flicker={FLICKER}
          dieAt={LAMP_DEATH}
        />
        <CeilingLight position={[0, 2.98, 12.2]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdca8" intensity={8} distance={7} flicker={FLICKER} />

        {/* warm pools under the panels, so the floor has a light rhythm */}
        <LightPool position={[0, 0.02, 4.5]} width={2.6} depth={2.4} color="#ffb469" opacity={0.14} />
        <LightPool position={[0, 0.02, 7.2]} width={2.6} depth={2.4} color="#ffb469" opacity={0.14} />
        <LightPool position={[0, 0.02, 9.9]} width={2.8} depth={2.6} color="#ffb469" opacity={0.16} />
        <LightPool position={[0, 0.02, 12.1]} width={2.4} depth={2.2} color="#ffb469" opacity={0.1} />

        {/* the figure's little world of light: a cold eye-light and a warm
            backlight, so the silhouette separates from the warm corridor */}
        <Glow position={[0.3, 1.25, 10.5]} size={2.4} color="#6f9fd8" opacity={0.16} />
        <Glow position={[0.3, 1.66, 10.6]} size={1.15} color="#a9c9ff" opacity={0.26} />
        <Glow position={[0.3, 1.66, 10.64]} size={0.52} color="#d6e8ff" opacity={0.18} />
        <pointLight position={[1.05, 1.7, 10.32]} color="#8fb6ee" intensity={5.5} distance={2.2} decay={2} />
        <pointLight position={[-0.45, 1.55, 10.32]} color="#7fa8ee" intensity={4.5} distance={2.2} decay={2} />
        <pointLight position={[0.3, 1.42, 9.35]} color="#6f93c9" intensity={0.9} distance={2.4} decay={2} />
        {/* warm rim from behind — the corridor panels read as the light source */}
        <pointLight position={[0.3, 2.05, 11.1]} color="#ffc07a" intensity={4.5} distance={2.6} decay={2} />
        <pointLight position={[-1.15, 1.45, 9.6]} color="#7fa8ee" intensity={3.5} distance={2.6} decay={2} />
        <LightPool position={[0.3, 0.02, 10.2]} width={1.8} depth={2.0} color="#ff8a4a" opacity={0.08} />

        {/* empty gurney, far end, tucked against the left wall */}
        <Bed
          position={[-1.7, 0, 12.0]}
          rotationY={Math.PI / 2}
          width={0.95}
          length={1.95}
          sheet="#d8e2ec"
          blanket="#dfe7ef"
          pillow={false}
        />

        <FogCard position={[0, 1.5, 12.5]} width={4.2} height={2.9} color="#08151b" opacity={0.45} />
        <Dust position={[0, 1.55, 8]} area={[4, 2.7, 9]} count={220} size={0.03} color="#a9c9ff" opacity={0.32} seed={21} speed={0.5} />
      </group>

      <Dust position={[0, 1.45, 0]} area={[4.6, 2.6, 5.2]} count={150} size={0.026} color="#bcd8ff" opacity={0.3} seed={4} speed={0.35} />
    </group>
  );
};
