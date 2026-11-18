import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { pulse, wobble } from "./math";
import type { Vec3 } from "./math";
import type { LookPreset, PostSettings, SkySettings } from "./types";
import { Sky } from "./shaders";

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
  /** A painted sky for outdoor looks. Without it the background is a flat colour. */
  sky?: SkySettings;
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
    sky: {
      top: "#5ea2dd", horizon: "#dcecf8", bottom: "#9fb0bd",
      sun: "#fff3d6", sunSize: 260, sunPower: 0.8, haze: 0.6,
      clouds: 0.45, cloudScale: 1.05, cloudCover: 0.50, cloudHeight: 9, cloudShade: "#e8eef5",
    },
  },
  "town-day": {
    bg: "#a9cde0",
    fog: "#d6e6d8",
    fogDensity: 0.009,
    ambient: { color: "#d6e7e1", intensity: 0.65 },
    hemi: { sky: "#d6eeef", ground: "#6c8073", intensity: 0.78 },
    key: { color: "#ffe1aa", intensity: 2.6, position: [-6, 9, -3], shadow: true },
    fills: [{ color: "#9bc6d9", intensity: 2.5, position: [4, 2.7, 9], distance: 12 }],
    sky: {
      top: "#4f97d4", horizon: "#e6f2ea", bottom: "#8ea08f",
      sun: "#fff0cf", sunSize: 240, sunPower: 0.8, haze: 0.62,
      clouds: 0.50, cloudScale: 1.05, cloudCover: 0.48, cloudHeight: 9, cloudShade: "#eef3f8",
    },
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
    sky: {
      top: "#0a3fbe", horizon: "#7cb6f2", bottom: "#6f8ca6",
      sun: "#fff4d6", sunDir: [-0.25, 0.42, -1], sunSize: 180, sunPower: 1.0, haze: 0.22,
      clouds: 0.55, cloudScale: 1.00, cloudCover: 0.46, cloudHeight: 9, cloudShade: "#ffffff",
    },
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
    sky: {
      top: "#030820", horizon: "#1b2a5c", bottom: "#040814",
      sun: "#dbe6ff", sunSize: 1500, sunPower: 0.45, haze: 0.4,
      clouds: 0.38, cloudScale: 0.90, cloudCover: 0.52, cloudHeight: 10, cloudShade: "#2a3554",
    },
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
    sky: {
      top: "#241d3a", horizon: "#6b5f8e", bottom: "#171226",
      sun: "#ffc79a", sunSize: 90, sunPower: 0.5, haze: 0.85,
      clouds: 0.90, cloudScale: 0.70, cloudCover: 0.30, cloudHeight: 6, cloudShade: "#3a3450",
    },
  },
  /** Rain by day: the blue gone out of the sky, grey cloud from edge to edge, soft cool light and hardly a shadow. */
  "overworld-rain": {
    bg: "#8f9aa8",
    fog: "#9ea9b6",
    fogDensity: 0.015,
    ambient: { color: "#e2e8f2", intensity: 0.85 },
    hemi: { sky: "#d2dbe8", ground: "#60725a", intensity: 0.95 },
    key: { color: "#e8eef6", intensity: 1.25, position: [-6, 12, 5], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
    sky: {
      top: "#5d6979", horizon: "#aeb8c4", bottom: "#707a86",
      sun: "#eef2f8", sunDir: [-0.25, 0.42, -1], sunSize: 30, sunPower: 0.12, haze: 0.9,
      clouds: 0.9, cloudScale: 0.8, cloudCover: 0.86, cloudHeight: 7, cloudShade: "#687280",
    },
  },
  /** The last of the sun: an orange sky, a low hard warm key, long shadows. Bright enough for a fight. */
  "overworld-sunset": {
    bg: "#f2a66e",
    fog: "#e9a276",
    fogDensity: 0.012,
    ambient: { color: "#ffe0cc", intensity: 0.62 },
    hemi: { sky: "#ffc9a0", ground: "#5c6a48", intensity: 0.9 },
    key: { color: "#ffbe84", intensity: 3.0, position: [-9, 7, 6], shadow: true },
    fills: [],
    follow: true,
    shadowSpan: 13,
    sky: {
      top: "#152a70", horizon: "#ffb87e", bottom: "#5c4250",
      sun: "#ffd9a0", sunDir: [-0.2, 0.16, -1], sunSize: 90, sunPower: 2.2, haze: 0.55,
      clouds: 0.62, cloudScale: 0.85, cloudCover: 0.42, cloudHeight: 10, cloudShade: "#9a86a8",
    },
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
    sky: {
      top: "#020615", horizon: "#14224a", bottom: "#040810",
      sun: "#cfe0ff", sunSize: 2000, sunPower: 0.35, haze: 0.35,
      clouds: 0.42, cloudScale: 0.90, cloudCover: 0.58, cloudHeight: 10, cloudShade: "#1a2440",
    },
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
    sky: {
      top: "#2a1008", horizon: "#a3441a", bottom: "#180804",
      sun: "#ffb070", sunSize: 70, sunPower: 0.8, haze: 0.9,
      clouds: 0.70, cloudScale: 0.80, cloudCover: 0.45, cloudHeight: 5, cloudShade: "#3a1a10",
    },
  },
  /** A school gym at prom: dark room, but lit enough to read faces, and the colour comes from the decorations. */
  "prom-night": {
    bg: "#0a0c1a",
    fog: "#141630",
    fogDensity: 0.03,
    ambient: { color: "#8b90d0", intensity: 0.95 },
    hemi: { sky: "#9a9ada", ground: "#2a2434", intensity: 0.95 },
    key: { color: "#ffd8f0", intensity: 1.9, position: [2, 7, 5], shadow: true },
    fills: [{ color: "#b48aff", intensity: 6, position: [-3, 3.4, 2], distance: 9 }],
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
  // Presets are stable: a fresh vector here would rebuild the sky material on every film frame.
  const sunDir = useMemo(() => new THREE.Vector3(...(look.sky?.sunDir ?? look.key?.position ?? [6, 10, 4])), [look]);
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
      {look.sky ? (
        <Sky
          sky={look.sky}
          sunDir={sunDir}
        />
      ) : null}
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
