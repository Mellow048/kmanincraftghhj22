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
  /** Raise/lower the look point, for headroom in the 9:16 frame. */
  aim?: number;

  /** The storytelling purpose of this shot. REQUIRED for reviewability. */
  note: string;
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
  | "warm-room"
  | "town-night"
  | "void";

export type PostSettings = {
  /** Tone-mapping exposure. 1.0 is neutral. */
  exposure?: number;
  /** Multiplier on every 3D glow card in the film. This is our bloom. */
  bloom?: number;
};

export type AudioTrack = {
  /** Path inside /public, e.g. "audio/line1.mp3". */
  src: string;
  volume?: number;
  /** Seconds into the film where this cue starts. Default 0. */
  at?: number;
};

export type FilmConfig = {
  /** Remotion composition id, kebab-case. Also the output filename. */
  id: string;
  /** Human title. The folder is the slug of this title. */
  title: string;
  fps?: number;
  width?: number;
  height?: number;
  look?: LookPreset;
  post?: PostSettings;
  /**
   * Optional music / voiceover inside /public. One track, or a list of cues:
   * each cue starts at `at` seconds into the film, so a narration line can land
   * on its beat without re-timing the whole film.
   */
  audio?: AudioTrack | AudioTrack[];
  /** Synthesiser-free ambience generated at build time lives here too. */

  /** Fade the video in/out of black, in seconds. */
  fadeIn?: number;
  fadeOut?: number;
  /** Static geometry and anything that exists for the whole film. */
  World?: React.FC;
  /** Ordered beats. Total runtime = sum of durations. */
  scenes: SceneDef[];
};
