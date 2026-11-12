import {
  Bed,
  BedsideTable,
  Block,
  Carpet,
  CeilingMobile,
  ChildDrawing,
  Curtains,
  Door,
  DoorFrame,
  DoorPlate,
  Dust,
  GlassWindow,
  Glow,
  GodRay,
  LightPool,
  MoonEye,
  Radiator,
  Sign,
  SkyBoard,
  StarField,
  TeddyBear,
  TownHouse,
  ToyBlocks,
  VisitorChair,
  WallClock,
  useFilmTime,
  woodTexture,
  pixelTex,
} from "../../engine";
import { cues, houseLevel } from "./cues";

/**
 * NEVER LOOK AT THE MOON — the set.
 *
 *   BEDROOM   x -2.1 .. 2.1   z -2.4 .. 2.4   ceiling 2.6
 *   WINDOW    x -1.0 .. 1.0   y 0.75 .. 2.35  in the wall at z = -2.4
 *   DOOR      left wall, z 1.0 .. 1.95        warm hall light leaking under it
 *   BED       x 1.0 .. 2.0    z -2.0 .. 0.0   head under the window wall
 *   STREET    z -3.6 .. -14   five houses, a lamp, a hedge
 *   MOON      far above the rooftops, 30 m out, radius 6.4 — it is an eye
 *
 * The bedroom is the whole film's stage; the boy never leaves it. Everything
 * that moves over the 19.6 seconds (the curtains, the street going dark, the
 * eye's gaze, the blink) is driven by the film clock in cues.ts so no scene can
 * disagree with another about what the town is doing.
 *
 * Light jobs: the moon through the window is the key and the only shadow caster;
 * the bedside lamp is the warm practical; a cool kicker sits just outside the
 * glass so the boy's silhouette separates from the curtain. The street lamp is a
 * second practical that keeps the outside from going flat.
 */

/** Moonshine through the window: the key every shadow in the room comes from. */
const MOON_Z = -30;
const MOON_R = 6.4;

const WOOD = woodTexture("#3b2a1d", [5, 6]);

/** Glow-in-the-dark stars stuck on the wall over the window: x, y, size. */
const STICKERS: [number, number, number][] = [
  [-0.78, 2.44, 0.075],
  [-0.42, 2.56, 0.055],
  [-0.05, 2.38, 0.09],
  [0.31, 2.52, 0.06],
  [0.62, 2.42, 0.07],
  [0.86, 2.56, 0.05],
  [-0.2, 2.58, 0.045],
];

export const World: React.FC = () => {
  // The film clock, not a scene clock: the set keeps running across cuts.
  const clock = useFilmTime();
  const c = cues(clock);
  return (
    <group>
      {/* ═════════════════════ OUTSIDE ═════════════════════ */}
      <SkyBoard position={[0, 22, -74]} width={260} height={120} color="#0f1b38" />
      <StarField position={[0, 14, -50]} area={[170, 44, 14]} count={330} size={0.75} seed={11} />
      <StarField position={[0, 14, -46]} area={[130, 40, 10]} count={70} size={1.5} seed={29} opacity={1} />

      {/* ground, road, kerb, the near hedge that frames the view from the bed */}
      <Block position={[0, -0.5, -9]} size={[70, 1, 26]} color="#0d1a1f" />
      <Block position={[0, 0.01, -5.1]} size={[70, 0.02, 2.2]} color="#161b26" />
      <Block position={[0, 0.02, -3.9]} size={[70, 0.04, 0.5]} color="#20262f" />
      <Block position={[0, 0.02, -6.4]} size={[70, 0.04, 0.5]} color="#20262f" />
      <Block position={[0, 0.34, -3.35]} size={[7.2, 0.68, 0.5]} color="#101f20" />
      <Block position={[0, 0.52, -3.3]} size={[7.2, 0.2, 0.42]} color="#162a24" />

      {/* the town across the street */}
      {[-7.6, -3.7, 0.4, 4.5, 8.6].map((x, i) => (
        <TownHouse
          key={x}
          position={[x, 0, -8.6]}
          width={3.1 + (i % 2) * 0.3}
          depth={2.6}
          height={1.55 + (i % 3) * 0.12}
          roofHeight={0.55 + (i % 2) * 0.1}
          wall={["#26304a", "#22304a", "#2a3040", "#243246", "#262c44"][i]}
          roof="#1a2331"
          lit={i === 1 ? 0.42 : houseLevel(clock, i)}
          chimney={i % 2 === 0}
          seed={i + 3}
        />
      ))}
      {/* a second row, smaller, so the street has depth and the roofs overlap */}
      {[-11.5, -5.6, 1.2, 7.0, 12.4].map((x, i) => (
        <TownHouse
          key={`far-${x}`}
          position={[x, 0, -13.4]}
          width={3.4}
          depth={3}
          height={1.9}
          roofHeight={0.7}
          wall="#1d2637"
          roof="#111825"
          lit={0.25}
          chimney={i % 2 === 0}
          seed={20 + i}
        />
      ))}
      <Block position={[0, 1.1, -16.5]} size={[70, 2.2, 1.2]} color="#0a1220" />

      {/* street lamp: the warm practical outside */}
      <Block position={[-4.6, 2.1, -6.6]} size={[0.14, 4.2, 0.14]} color="#1b2330" />
      <Block position={[-4.6, 4.24, -6.6]} size={[0.34, 0.18, 0.34]} color="#232d3d" />
      <Block
        position={[-4.6, 4.12, -6.6]}
        size={[0.3, 0.08, 0.3]}
        color="#ffd9a0"
        emissive="#ffc07a"
        emissiveIntensity={1.6}
        castShadow={false}
      />
      <Glow position={[-4.6, 4.1, -6.6]} size={2.6} color="#ffc07a" opacity={0.34} />
      <pointLight position={[-4.6, 4.0, -6.6]} color="#ffc07a" intensity={7} distance={9} decay={2} />
      {/* cool spill from the far side of the street, so the facades across the
          road are shapes with window frames in them instead of a black bar. */}
      <pointLight position={[3.2, 3.4, -4.6]} color="#6c8dc4" intensity={16} distance={13} decay={2} />

      {/* two bare trees, blocky on purpose */}
      {[
        { x: -9.4, z: -7.4, h: 3.4 },
        { x: 6.9, z: -7.9, h: 2.9 },
      ].map((tree) => (
        <group key={tree.x} position={[tree.x, 0, tree.z]}>
          <Block position={[0, tree.h / 2, 0]} size={[0.26, tree.h, 0.26]} color="#1a1a20" />
          <Block position={[0.4, tree.h * 0.82, 0.1]} size={[1.5, 0.16, 0.16]} color="#1a1a20" />
          <Block position={[-0.35, tree.h * 0.95, 0]} size={[0.14, 1.2, 0.14]} color="#1a1a20" />
          <Block position={[0.7, tree.h * 0.9, 0.1]} size={[0.14, 0.9, 0.14]} color="#1a1a20" />
        </group>
      ))}
      <Block position={[0, 0.42, -7.1]} size={[16, 0.84, 0.5]} color="#0f1a1c" />
      <Block position={[0, 0.9, -7.1]} size={[3.2, 0.5, 0.44]} color="#12211f" />

      {/* ── THE MOON. It is an eye. ── */}
      <MoonEye
        position={[c.moonX, c.moonY, MOON_Z]}
        radius={MOON_R}
        lid={c.lid}
        yaw={c.eyeYaw}
        pitch={c.eyePitch}
        pupil={c.pupil}
        glow={c.eyeGlow}
        flash={c.flash}
      />
      {/* the shaft of light it is casting over the town */}
      <GodRay
        position={[c.moonX * 0.8, 4.3, -16]}
        rotation={[1.02, c.eyeYaw * 0.7, 0]}
        width={3.4}
        height={34}
        color="#bcd8ff"
        opacity={c.beam}
      />
      {/* where the shaft lands on the rooftops */}
      <LightPool
        position={[-1.5, 0.03, -8.6]}
        width={9}
        depth={5}
        color="#7fa8e8"
        opacity={0.05 + c.beam * 0.25}
      />

      {/* ═════════════════════ BEDROOM ═════════════════════ */}
      <group>
        {/* floor, ceiling, shell */}
        <Block position={[0, -0.06, 0]} size={[4.2, 0.12, 4.8]} map={WOOD} />
        <Block position={[0, 2.66, 0]} size={[4.2, 0.14, 4.8]} color="#0d1421" />
        {/* back wall, cut around the window */}
        <Block position={[-1.55, 1.3, -2.4]} size={[1.1, 2.6, 0.2]} map={pixelTex("#2c4363", [2, 4])} />
        <Block position={[1.55, 1.3, -2.4]} size={[1.1, 2.6, 0.2]} map={pixelTex("#2c4363", [2, 4])} />
        <Block position={[0, 0.375, -2.4]} size={[2.0, 0.75, 0.2]} map={pixelTex("#2c4363", [3, 1])} />
        <Block position={[0, 2.475, -2.4]} size={[2.0, 0.25, 0.2]} map={pixelTex("#2c4363", [3, 1])} />
        {/* left wall, solid: the bed goes here */}
        <Block position={[-2.1, 1.3, 0]} size={[0.2, 2.6, 4.8]} map={pixelTex("#293f5d", [6, 4])} />
        {/* right wall, cut around the hall door */}
        <Block position={[2.1, 1.3, -0.6]} size={[0.2, 2.6, 3.6]} map={pixelTex("#293f5d", [4, 4])} />
        <Block position={[2.1, 1.3, 2.275]} size={[0.2, 2.6, 0.25]} map={pixelTex("#293f5d", [1, 4])} />
        <Block position={[2.1, 2.375, 1.675]} size={[0.2, 0.45, 0.95]} map={pixelTex("#293f5d", [1, 1])} />
        <Block position={[0, 1.3, 2.4]} size={[4.2, 2.6, 0.2]} map={pixelTex("#293f5d", [6, 4])} />

        {/* skirting, picture rail, a painted stripe at child height */}
        {[
          { p: [-2.0, 0.055, 0] as [number, number, number], s: [0.03, 0.11, 4.8] as [number, number, number] },
          { p: [2.0, 0.055, 0] as [number, number, number], s: [0.03, 0.11, 4.8] as [number, number, number] },
          { p: [0, 0.055, 2.31] as [number, number, number], s: [4.2, 0.11, 0.03] as [number, number, number] },
          { p: [0, 0.055, -2.31] as [number, number, number], s: [4.2, 0.11, 0.03] as [number, number, number] },
          { p: [0, 1.02, 2.3] as [number, number, number], s: [4.2, 0.05, 0.02] as [number, number, number] },
          { p: [-1.99, 1.02, 0] as [number, number, number], s: [0.02, 0.05, 4.8] as [number, number, number] },
        ].map((trim, i) => (
          <Block key={i} position={trim.p} size={trim.s} color="#1e2c40" castShadow={false} />
        ))}

        {/* the window itself */}
        <GlassWindow position={[0, 1.55, -2.38]} width={2.0} height={1.6} />
        <Curtains
          position={[0, 1.45, -2.26]}
          width={2.5}
          height={1.9}
          gap={0.1}
          color="#1b3358"
          pullLeft={c.curtainLeft}
          pullRight={c.curtainRight}
        />
        <Radiator position={[0, 0, -2.28]} width={1.15} />

        {/* the bed: head under the window wall, teddy against the pillow */}
        <Bed position={[-1.55, 0, 0.45]} width={1.0} length={2.0} sheet="#c3d2ea" blanket="#2c6aa8" pillow />
        <TeddyBear position={[-1.8, 0.62, -0.15]} rotationY={0.6} scale={1.1} />
        <Block position={[-1.55, 0.6, -0.55]} size={[0.9, 0.05, 0.3]} color="#e8eef7" />

        {/* bedside table and the warm lamp that keeps the room from going black */}
        <BedsideTable position={[-0.82, 0, -0.78]} />
        <Block position={[-0.82, 0.72, -0.78]} size={[0.07, 0.22, 0.07]} color="#1b2330" />
        <Block
          position={[-0.82, 0.86, -0.78]}
          size={[0.24, 0.16, 0.24]}
          color="#ffd9a8"
          emissive="#ffbe78"
          emissiveIntensity={1.5}
          castShadow={false}
        />
        <Glow position={[-0.82, 0.87, -0.76]} size={1.15} color="#ffbe78" opacity={0.3} />
        {/* stars stuck on the wall over the window. Still faintly holding light,
            and the one thing in the room that answers the sky outside. */}
        {STICKERS.map(([x, y, s], i) => (
          <Glow key={i} position={[x, y, -2.24]} size={s * 1.5} color="#dcecff" opacity={0.62} />
        ))}
        <pointLight position={[-0.82, 0.9, -0.7]} color="#ffbe78" intensity={3.6} distance={4.2} decay={2} />
        {/* the lamp's warm puddle on the wall and the bed */}
        <LightPool position={[-0.8, 0.02, -0.3]} width={2.0} depth={1.8} color="#ff9b52" opacity={0.1} />

        {/* rug, toys, chair, shelves */}
        <Carpet position={[0.2, 0.014, 1.0]} width={1.9} length={2.3} tone="#2b4467" />
        <ToyBlocks position={[0.8, 0, 1.4]} count={9} seed={7} />
        <VisitorChair position={[-1.28, 0, -1.45]} rotationY={0.5} color="#3f5f8c" coat="#4a3a2c" />
        <Sign
          position={[2.0, 1.75, -0.9]}
          rotationY={-Math.PI / 2}
          width={0.72}
          height={0.96}
          title="HOUSE RULES"
          lines={["1  LIGHTS OUT", "2  NO PEEKING", "3  NEVER LOOK", "AT THE MOON"]}
          bg="#e8e1cd"
          fg="#26303c"
          accent="#8f2f2a"
          lit={0.12}
        />
        <ChildDrawing position={[-1.98, 1.62, -0.35]} rotationY={Math.PI / 2} width={0.55} kind="family" seed={4} />
        <WallClock position={[1.98, 2.05, 0.4]} rotationY={-Math.PI / 2} radius={0.15} />
        <CeilingMobile position={[-1.5, 2.46, 0.15]} scale={0.62} speed={0.09} />

        {/* bookshelf against the front wall */}
        <group position={[-0.8, 0, 2.22]}>
          <Block position={[0, 0.9, 0]} size={[1.5, 1.8, 0.34]} color="#2a2333" />
          {[0.06, 0.5, 0.94, 1.38].map((y, i) => (
            <Block key={i} position={[0, y, 0.18]} size={[1.44, 0.05, 0.34]} color="#3b3048" />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <Block
              key={i}
              position={[-0.62 + (i % 7) * 0.2, 0.16 + Math.floor(i / 7) * 0.44, 0.2]}
              size={[0.13, 0.26 + (i % 3) * 0.05, 0.2]}
              color={["#8f3b34", "#3c5f8f", "#c2a13c", "#3f7a54", "#6b4a8a"][i % 5]}
            />
          ))}
        </group>

        {/* the door to the hall, open a hand's width, warm light under it */}
        <DoorFrame position={[2.1, 0, 1.675]} rotationY={-Math.PI / 2} width={0.95} height={2.15} color="#2a3346" />
        <Door position={[2.08, 0, 1.2]} rotationY={-Math.PI / 2} width={0.95} height={2.15} open={-0.42} color="#2f4038" />
        <DoorPlate position={[2.02, 2.2, 1.2]} rotationY={-Math.PI / 2} label="7" width={0.2} />
        <Block position={[2.28, 1.2, 1.675]} size={[0.06, 2.2, 0.9]} color="#f0c98a" emissive="#ffbe78" emissiveIntensity={0.18} castShadow={false} />
        <pointLight position={[2.5, 1.35, 1.675]} color="#ffb066" intensity={4.5} distance={5} decay={2} />
        <LightPool position={[1.65, 0.02, 1.675]} width={1.5} depth={1.1} color="#ff9b52" opacity={0.1} />

        {/* ── LIGHTS ── */}
        {/* 1. key: the moon, straight through the glass. The only shadow caster. */}
        <directionalLight
          color="#c3d8ff"
          intensity={3.4 * c.roomMoon}
          position={[c.moonX, c.moonY, -26]}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-camera-near={0.5}
          shadow-camera-far={44}
          shadow-bias={-0.0005}
          shadow-normalBias={0.02}
        />
        {/* 4. moon fill: no shadow, no shadow-map cost. Gives the roofs outside a
            cold edge instead of leaving the lower third of the wide shot black. */}
        <directionalLight color="#93b6ec" intensity={0.32 * (0.55 + 0.45 * c.roomMoon)} position={[c.moonX, c.moonY, -26]} />
        {/* 2. practical is the bedside lamp above. 3. cool kicker off the glass so
            the boy's shoulders separate from the curtain behind him. */}
        <pointLight position={[0.3, 1.9, -2.15]} color="#a9c9ff" intensity={3.2 * c.roomMoon} distance={3.4} decay={2} />
        {/* bounce off the far wall: lifts the boy's back just enough to read as a body */}
        <pointLight position={[1.15, 1.72, 0.8]} color="#a9c4e6" intensity={2.2 * c.roomMoon} distance={4.6} decay={2} />

        {/* atmosphere: the shaft, the pool it makes, and dust in the shaft */}
        <GodRay position={[0, 1.15, -0.6]} rotation={[1.18, 0, 0]} width={1.85} height={5.0} color="#a9c9ff" opacity={0.095 * c.roomMoon} />
        <LightPool position={[-0.1, 0.016, 0.2]} width={2.6} depth={2.4} color="#5f8fd6" opacity={0.14 * c.roomMoon} />
        <Glow position={[0, 1.55, -2.3]} size={2.6} color="#9fc6ff" opacity={0.16 * c.roomMoon} />
        {/* the last beat: the moonlight finds the empty half of the bed */}
        <LightPool position={[-1.55, 0.63, 0.55]} width={1.0} depth={1.4} color="#9fc6ff" opacity={0.42 * c.bedBlade} rotation={[-Math.PI / 2, 0, 0.2]} />
        <Dust position={[0, 1.4, 0]} area={[3.8, 2.3, 4.2]} count={130} size={0.024} color="#bcd8ff" opacity={0.26} seed={6} speed={0.3} />
      </group>
    </group>
  );
};
