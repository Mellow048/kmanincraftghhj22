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
  | "lantern-night"
  | "lava-shore"
  | "warm-room"
  | "void";

export type PostSettings = {
  /** Tone-mapping exposure. 1.0 is neutral. */
  exposure?: number;
  /** Multiplier on every 3D glow card in the film. This is our bloom. */
  bloom?: number;
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
