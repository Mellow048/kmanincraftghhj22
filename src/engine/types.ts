import type React from "react";
import type { EaseName, Vec3 } from "./math";

/**
 * A SHOT is a single, motivated camera move inside a scene.
 * Every shot must fill in `note` with the storytelling reason for the move.
 */
export type Shot = {
  /** Seconds into the scene when this shot begins. 0 for the first shot. */
  at: number;
  /** Duration of this shot in seconds. */
  dur: number;

  /** Camera start position (world units, 1 unit = 1 metre). */
  from: Vec3;
  /** Camera end position. Omit for a locked-off shot. */
  to?: Vec3;
  /**
   * Optional multi-point flight path. Overrides `to`.
   * The camera travels smoothly through every point. Use this for fly-throughs
   * between rooms and reveals.
   */
  path?: Vec3[];

  /** What the camera is looking at on the first frame. */
  target: Vec3;
  /** What it is looking at on the last frame. Omit to hold the same subject. */
  targetTo?: Vec3;
  /** Multi-point look path, for panning from one subject to another during a move. */
  targetPath?: Vec3[];

  /** Vertical field of view, degrees. Default 38. Ignored when `focalLength` is set. */
  fov?: number;
  fovTo?: number;

  /**
   * Lens focal length in millimetres (full-frame 24mm sensor height).
   * Overrides `fov`/`fovTo` when present. 24 = wide, 35 = natural,
   * 50 = portrait compression, 85 = threat. Matches docs/CAMERA-BIBLE.md.
   */
  focalLength?: number;
  /** End focal length for a slow zoom. Defaults to `focalLength`. */
  focalLengthTo?: number;

  /** Easing for the move. Default "inOutCubic". Use "linear" for constant tracking. */
  ease?: EaseName;

  /** Sideways bow in metres, useful for orbiting arcs. Ignored when `path` is set. */
  arc?: number;
  /** Handheld instability, in metres. Keep 0.005–0.03. Never shake everything. */
  shake?: number;
  /**
   * Low-frequency handheld drift in metres. Much slower and smaller than `shake`;
   * this is the breathing of the operator, not the impact of a footstep.
   */
  handheld?: number;
  /** Timed impact impulses: a short burst of shake at a specific second. */
  impacts?: Array<{ at: number; amp: number; dur?: number }>;
  /** Camera roll in radians. */
  roll?: number;
  /** End roll in radians. The roll eases from `roll` to `rollTo` (a rotating top-down shot). */
  rollTo?: number;
  /** Raise/lower the look point, for headroom in the 9:16 frame. */
  aim?: number;

  /** Lighting preset for this shot only. Falls back to the film's `look`. */
  look?: LookPreset;
  /** World zone this shot plays in. `<Zone name>` groups in the world hide when another zone is on. */
  zone?: string;
  /** Narration cue this shot is cut to. Set by `storyScene`; see docs in Topics/. */
  cue?: string;

  /** Deliberately lock the lens (e.g. the family photograph). Explain the hold in `note`. */
  locked?: true;
  /** The storytelling purpose of this shot. REQUIRED for reviewability. */
  note: string;
};

/** One spoken word and when it is heard, in film seconds. */
export type CaptionWord = { w: string; s: number; e: number };

/** One-word captions. Engine-owned: scenes never draw text over the picture themselves. */
export type CaptionSettings = {
  words: CaptionWord[];
  /** Vertical position, 0 = top of frame, 1 = bottom. Default 0.72. */
  y?: number;
  /** New productions: snap the entry accent to the spoken frame; omit to keep the legacy cut. */
  motion?: "on-beat";
  /** Size multiplier. Default 1. */
  size?: number;
  /** "upper" (default) or "lower". */
  letterCase?: "upper" | "lower";
};

export type SceneDef = {
  /** Stable, unique id inside the film: "scene1", "scene2"... */
  id: string;
  /** Human-readable beat name, shown in the Remotion timeline. */
  title: string;
  /** Exactly how long this beat lasts, in seconds. */
  duration: number;
  /** All camera moves in this beat. Cuts are allowed between shots, nowhere else. */
  shots: Shot[];
  /** The actors / props / actions in this beat. */
  Component: React.FC;
  /** Optional, read-only rehearsal of the same stage used on screen; never invokes a child component. */
  sampleStage?: (shot: number, seconds: number) => React.ReactNode;
};

export type LookPreset =
  | "hospital-night"
  | "hallway-night"
  | "ward-night"
  | "forest-night"
  | "street-day"
  | "town-day"
  | "overworld-day"
  | "overworld-night"
  | "overworld-storm"
  | "overworld-rain"
  | "overworld-sunset"
  | "lantern-night"
  | "lava-shore"
  | "warm-room"
  | "prom-night"
  | "void";

/**
 * A painted sky: vertical gradient, a horizon haze band and a sun disc bright
 * enough for the bloom pass. Given to a look preset, this replaces the flat
 * background colour. Colours are plain hex, so a preset stays readable.
 */
export type SkySettings = {
  /** Straight up. */
  top: string;
  /** At the horizon line — the haze colour. */
  horizon: string;
  /** Below the horizon, if the camera ever tilts down that far. */
  bottom?: string;
  /** Sun / moon colour. */
  sun?: string;
  /** Direction of the sun from the camera, in world space. Defaults to the key light's position. */
  sunDir?: [number, number, number];
  /** Falloff of the halo: higher is a tighter halo. */
  sunSize?: number;
  /** Halo strength. */
  sunPower?: number;
  /** How much the haze band eats the gradient, 0–1. */
  haze?: number;
  /** Cloud cover, 0 is a clear sky and 1 is overcast. 0.4–0.7 looks like weather. */
  clouds?: number;
  /** Size of the cloud layer: smaller numbers are bigger, softer clouds. */
  cloudScale?: number;
  /** Where the noise is cut into cloud: higher is a clearer sky. */
  cloudCover?: number;
  /** How far away the cloud layer sits, in sky units. Bigger is higher and calmer. */
  cloudHeight?: number;
  /** The colour of cloud in shade. The sun lights the rest. */
  cloudShade?: string;
  /** Noise added to the gradient so a wide sky cannot band on an 8-bit frame. */
  dither?: number;
};

/** The post-processing controls exposed to a film. */
export type ShaderSettings = {
  enabled?: boolean;
  /** Bloom strength. 0.4–0.8 is a warm sunny day; 1.0+ starts to look like a game. */
  bloom?: number;
  /** Luminance above which pixels bloom. Lower = more of the sky glows. */
  threshold?: number;
  /** Bloom spread. */
  radius?: number;
  /** Darkening at the corners, 0–1. */
  vignette?: number;
  /** Colour saturation, 1 is neutral. */
  saturation?: number;
  /** Contrast around mid-grey, 1 is neutral. */
  contrast?: number;
  /** Warm highlights / cool shadows. 0 is neutral, 1 is a golden hour. */
  warmth?: number;
  /** Film grain, 0–0.03. */
  grain?: number;
  /** Lens fringing at the frame edges, 0–1. */
  aberration?: number;
  /** Highlight diffusion: the glow a real lens spreads around anything bright. 0–0.4. */
  diffusion?: number;
  /** Veiling glare: light the whole frame picks up from the lens. It lifts the shadows. */
  veil?: number;
  /** Black lift. Film does not reach black, it reaches a dark grey. */
  lift?: number;
  /** Highlight shoulder: how far bright things roll off instead of clipping. */
  shoulder?: number;
  /** How much the deepest shadows are cooled against the warm midtones, 0–1. */
  coolShadow?: number;
  /** Volumetric shafts from the sun, 0–1. Needs a look with a sky. */
  shafts?: number;
};

export type PostSettings = {
  /** Tone-mapping exposure. 1.0 is neutral. */
  exposure?: number;
  /** Multiplier on every 3D glow card in the film. This is our fake bloom. */
  bloom?: number;
  /** Real post: bloom, grade, vignette, grain. `true` for the defaults. */
  shaders?: ShaderSettings | boolean;
};

export type FilmConfig = {
  /** Remotion composition id, kebab-case. Also the output filename. */
  id: string;
  /**
   * Topic id, e.g. "in-this-town". A topic is a folder under Topics/ with its
   * own rules; `npm run check` lints the film against that topic's profile.
   */
  topic?: string;
  /**
   * A named cut of the topic, e.g. "short". The topic's topic.json lists its cuts;
   * a cut's length and word limits replace the topic's when `npm run check` runs.
   */
  cut?: string;
  /** Human title. The folder is the slug of this title. */
  title: string;
  fps?: number;
  width?: number;
  height?: number;
  look?: LookPreset;
  post?: PostSettings;
  /** Optional full-film music / voiceover file inside /public. */
  audio?: { src: string; volume?: number };
  /** Timed voice or sound-design clips inside /public. `at` and `duration` are seconds. */
  audioCues?: Array<{ src: string; at: number; duration?: number; volume?: number }>;
  /** One-word captions timed to the narration. Only for topics whose rules ask for them. */
  captions?: CaptionSettings;
  /** Fade the video in/out of black, in seconds. */
  fadeIn?: number;
  fadeOut?: number;
  /** Static geometry and anything that exists for the whole film. */
  World?: React.FC;
  /** Ordered beats. Total runtime = sum of durations. */
  scenes: SceneDef[];
};
