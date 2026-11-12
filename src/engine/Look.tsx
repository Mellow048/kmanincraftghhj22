import { createContext, useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
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
  "town-night": {
    bg: "#050a16",
    fog: "#0b1428",
    fogDensity: 0.014,
    ambient: { color: "#22334f", intensity: 0.3 },
    hemi: { sky: "#2b4570", ground: "#04060b", intensity: 0.32 },
    // A whisper of a key only: the film places the real moon light itself so it
    // can be dimmed when the eye shuts. A second shadow-caster here would fight it.
    key: { color: "#c3d8ff", intensity: 0.3, position: [1.4, 11, -26], shadow: false },
    fills: [],
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

export const Look: React.FC<{ preset?: LookPreset; post?: PostSettings }> = ({
  preset = "hospital-night",
  post,
}) => {
  const look = LOOKS[preset] ?? LOOKS["hospital-night"];

  return (
    <>
      <color attach="background" args={[look.bg]} />
      <fogExp2 attach="fog" args={[look.fog, look.fogDensity]} />
      <Exposure value={post?.exposure ?? 1.05} />

      <ambientLight color={look.ambient.color} intensity={look.ambient.intensity} />
      <hemisphereLight color={look.hemi.sky} groundColor={look.hemi.ground} intensity={look.hemi.intensity} />

      {look.key && (
        <directionalLight
          color={look.key.color}
          intensity={look.key.intensity}
          position={look.key.position}
          castShadow={look.key.shadow}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
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
