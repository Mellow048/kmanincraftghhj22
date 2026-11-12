import { createContext, useContext, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { pulse, wobble } from "./math";
import type { Vec3 } from "./math";
import type { LookPreset, PostSettings } from "./types";

type Preset = {
  bg: string;
  fog: string;
  fogDensity: number;
  ambient: { color: string; intensity: number };
  hemi: { sky: string; ground: string; intensity: number };
  key?: { color: string; intensity: number; position: Vec3; shadow?: boolean };
  fills: Array<{ color: string; intensity: number; position: Vec3; distance?: number }>;
  /**
   * Outdoor looks: the key light is a sun. It keeps its direction but follows
   * the shot's subject, so a town 60 m across still gets shadows everywhere.
   * `key.position` is then an offset from the subject, not a world position.
   */
  follow?: boolean;
  /** Half-width of the shadow frustum in metres. Default 9. */
  shadowSpan?: number;
};

/**
 * Lighting presets. These are deliberately contrasty: a cool key, a warm
 * practical, one cool kicker. A scene lit by one light looks like a test scene.
 */
export const LOOKS: Record<LookPreset, Preset> = {
  "hospital-night": {
    bg: "#030913",
    fog: "#071426",
    fogDensity: 0.07,
    ambient: { color: "#22395f", intensity: 0.55 },
    hemi: { sky: "#2a4a77", ground: "#05080f", intensity: 0.55 },
    key: { color: "#a9c9ff", intensity: 2.6, position: [7, 5, 1.5], shadow: true },
    fills: [
      { color: "#ff9a45", intensity: 12, position: [1.7, 0.6, 2.7], distance: 7 },
      { color: "#ffb066", intensity: 5, position: [-0.8, 1.1, -2.1], distance: 4 },
      { color: "#5e86c8", intensity: 6, position: [-2.2, 2.2, -1.5], distance: 5 },
    ],
  },
  "hallway-night": {
    bg: "#02080b",
    fog: "#04130f",
    fogDensity: 0.055,
    ambient: { color: "#1b3d35", intensity: 0.45 },
    hemi: { sky: "#2c5a4c", ground: "#030706", intensity: 0.45 },
    key: { color: "#9fc6ff", intensity: 2.4, position: [0, 4, 14], shadow: true },
    fills: [
      { color: "#d6e8ff", intensity: 9, position: [0.4, 2.55, 4.6], distance: 6 },
      { color: "#ff5b3a", intensity: 3.5, position: [0, 0.5, 8.5], distance: 4 },
    ],
  },
  /**
   * A children's ward at night. The room wants cold moon and one warm
   * bedside lamp; the corridor wants warm fluorescent panels with a cold
   * window at the end. A single global key can only be one of those, so this
   * preset keeps the global light almost neutral and lets the world-local
   * practicals do the colour work.
   */
  "ward-night": {
    bg: "#040810",
    fog: "#081019",
    fogDensity: 0.052,
    ambient: { color: "#26303f", intensity: 0.3 },
    hemi: { sky: "#33445c", ground: "#080a10", intensity: 0.32 },
    key: { color: "#cfe0f5", intensity: 0.9, position: [4, 6, -3], shadow: true },
    fills: [{ color: "#ffc98a", intensity: 4, position: [1.5, 0.7, 2.4], distance: 6 }],
  },
  "forest-night": {
    bg: "#020812",
    fog: "#061426",
    fogDensity: 0.085,
    ambient: { color: "#17324a", intensity: 0.4 },
    hemi: { sky: "#1e3f5e", ground: "#03070b", intensity: 0.4 },
    key: { color: "#9dc0ff", intensity: 2.0, position: [-4, 6, 8], shadow: true },
    fills: [{ color: "#77aaff", intensity: 5, position: [3, 1.5, -2], distance: 7 }],
  },
  "street-day": {
    bg: "#b9d7ee",
    fog: "#cfe4f4",
    fogDensity: 0.018,
    ambient: { color: "#cfe6ff", intensity: 1.3 },
    hemi: { sky: "#dff0ff", ground: "#4d5a63", intensity: 1.4 },
    key: { color: "#fff3d6", intensity: 3.4, position: [6, 9, 4], shadow: true },
    fills: [{ color: "#bfe0ff", intensity: 2.4, position: [-4, 3, -3], distance: 12 }],
  },
  "town-day": {
    bg: "#a9cde0",
    fog: "#d6e6d8",
    fogDensity: 0.009,
    ambient: { color: "#d6e7e1", intensity: 0.65 },
    hemi: { sky: "#d6eeef", ground: "#6c8073", intensity: 0.78 },
    key: { color: "#ffe1aa", intensity: 2.6, position: [-6, 9, -3], shadow: true },
    fills: [{ color: "#9bc6d9", intensity: 2.5, position: [4, 2.7, 9], distance: 12 }],
  },
  /** Minecraft noon: saturated sky, hard warm sun, cool bounce. Built for phone screens. */
  "overworld-day": {
    bg: "#79a8ff",
    fog: "#bcd6ff",
    fogDensity: 0.0085,
    ambient: { color: "#ffffff", intensity: 0.62 },
    hemi: { sky: "#d2e6ff", ground: "#7d9a5e", intensity: 0.95 },
    key: { color: "#fff0cf", intensity: 3.3, position: [-7, 12, 6], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /** Minecraft night: deep blue, a cold moon for shape. Torches in the world do the warm work. */
  "overworld-night": {
    bg: "#0a1230",
    fog: "#101a3c",
    fogDensity: 0.02,
    ambient: { color: "#5f78c9", intensity: 0.5 },
    hemi: { sky: "#5a78d6", ground: "#141c2c", intensity: 0.55 },
    key: { color: "#a9c2ff", intensity: 1.25, position: [6, 11, -5], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /** The sky has gone wrong: bruise-purple above, and a low warm light from the west picks out whatever stands over the town. */
  "overworld-storm": {
    bg: "#1d1830",
    fog: "#2a2140",
    fogDensity: 0.011,
    ambient: { color: "#8f8ac4", intensity: 0.6 },
    hemi: { sky: "#7672b8", ground: "#2c2436", intensity: 0.75 },
    key: { color: "#ffc79a", intensity: 2.0, position: [-8, 8, 5], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /**
   * A town that lives by lantern light. The night is nearly black and the moon gives only a thin cold
   * edge from the south: the lanterns in the world (point lights, pools, glows) do the lighting.
   */
  "lantern-night": {
    bg: "#060a1c",
    fog: "#0a1028",
    fogDensity: 0.016,
    ambient: { color: "#5468b8", intensity: 0.42 },
    hemi: { sky: "#4a62c0", ground: "#2a1c12", intensity: 0.45 },
    key: { color: "#9fb8ff", intensity: 0.55, position: [-4, 11, 8], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /** The moon is staring at this place: hard white-blue light from the south, and long shadows. */
  "moon-stare": {
    bg: "#0a1232",
    fog: "#121c44",
    fogDensity: 0.013,
    ambient: { color: "#6f88dc", intensity: 0.5 },
    hemi: { sky: "#7f9cf0", ground: "#141c2c", intensity: 0.55 },
    key: { color: "#d6e2ff", intensity: 2.7, position: [-4, 11, 8], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /** The moon has looked away from here. No key to speak of: shapes, and whatever small light the world gives them. */
  moonless: {
    bg: "#03050e",
    fog: "#060918",
    fogDensity: 0.024,
    ambient: { color: "#34407e", intensity: 0.34 },
    hemi: { sky: "#2c3a7a", ground: "#050505", intensity: 0.34 },
    key: { color: "#7f95d8", intensity: 0.16, position: [-4, 11, 8], shadow: false },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  /** Beside lava: smoke for a sky, and the ground is the lamp. */
  "lava-shore": {
    bg: "#34130b",
    fog: "#5a2210",
    fogDensity: 0.012,
    ambient: { color: "#ffb48c", intensity: 0.5 },
    hemi: { sky: "#7a3320", ground: "#ff6a1e", intensity: 1.15 },
    key: { color: "#ffd9b4", intensity: 2.1, position: [-6, 10, 5], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
  },
  "warm-room": {
    bg: "#120b06",
    fog: "#2a1a0e",
    fogDensity: 0.05,
    ambient: { color: "#6b4a2e", intensity: 0.65 },
    hemi: { sky: "#8a5f36", ground: "#1b0f07", intensity: 0.55 },
    key: { color: "#ffcf9a", intensity: 2.4, position: [3, 3.5, 2], shadow: true },
    fills: [{ color: "#ff9b4a", intensity: 10, position: [-1.5, 1.4, -1], distance: 5 }],
  },
  void: {
    bg: "#000000",
    fog: "#000000",
    fogDensity: 0.001,
    ambient: { color: "#20304a", intensity: 0.3 },
    hemi: { sky: "#22334d", ground: "#000000", intensity: 0.3 },
    key: { color: "#dceaff", intensity: 2.6, position: [4, 5, 4], shadow: true },
    fills: [],
  },
};

const GlowContext = createContext(1);
export const GlowProvider = GlowContext.Provider;
export const useGlowScale = () => useContext(GlowContext);

const Exposure: React.FC<{ value: number }> = ({ value }) => {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.toneMappingExposure = value;
  }, [gl, value]);
  return null;
};

export const Look: React.FC<{ preset?: LookPreset; post?: PostSettings; focus?: Vec3 }> = ({
  preset = "hospital-night",
  post,
  focus,
}) => {
  const look = LOOKS[preset] ?? LOOKS["hospital-night"];
  const span = look.shadowSpan ?? 9;
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const follow = look.follow && focus ? focus : null;
  const keyPosition: Vec3 =
    follow && look.key
      ? [follow[0] + look.key.position[0], follow[1] + look.key.position[1], follow[2] + look.key.position[2]]
      : (look.key?.position ?? [0, 0, 0]);

  // A directional light aims at its `target`, which is not in the scene graph,
  // so its matrix has to be refreshed by hand when the sun follows a subject.
  useFrame(() => {
    const light = keyRef.current;
    if (!light) return;
    if (follow) light.target.position.set(follow[0], follow[1], follow[2]);
    else light.target.position.set(0, 0, 0);
    light.target.updateMatrixWorld();
  });

  return (
    <>
      <color attach="background" args={[look.bg]} />
      <fogExp2 attach="fog" args={[look.fog, look.fogDensity]} />
      <Exposure value={post?.exposure ?? 1.05} />

      <ambientLight color={look.ambient.color} intensity={look.ambient.intensity} />
      <hemisphereLight color={look.hemi.sky} groundColor={look.hemi.ground} intensity={look.hemi.intensity} />

      {look.key && (
        <directionalLight
          ref={keyRef}
          color={look.key.color}
          intensity={look.key.intensity}
          position={keyPosition}
          castShadow={look.key.shadow}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-span}
          shadow-camera-right={span}
          shadow-camera-top={span}
          shadow-camera-bottom={-span}
          shadow-camera-near={0.5}
          shadow-camera-far={40 + span}
          shadow-bias={-0.0006}
          shadow-normalBias={0.02}
        />
      )}

      {look.fills.map((fill, i) => (
        <pointLight
          key={i}
          color={fill.color}
          intensity={fill.intensity}
          position={fill.position}
          distance={fill.distance}
          decay={2}
        />
      ))}
    </>
  );
};

/** Deterministic light flicker, driven by the film clock. */
export const useFlicker = (base: number, windows: Array<[number, number]>, seed = 1): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let amount = 1;
  for (const [a, b] of windows) {
    const env = pulse(t, a, b);
    if (env > 0) {
      const n = 0.5 + 0.5 * wobble(t * 26 + seed * 3, seed);
      amount = Math.min(amount, 1 - env * (1 - n) * 1.15);
    }
  }
  return Math.max(0.02, base * amount);
};
