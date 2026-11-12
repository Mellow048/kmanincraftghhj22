import { clamp01, lerp } from "../../engine";

/**
 * CUE SHEET — the whole film's set in one place.
 *
 * The bedroom set is mounted once for the film, so anything that changes over
 * the whole 19.6 seconds (curtains, street lights, the moon's gaze, the blink)
 * is driven by the FILM clock here rather than per-scene. Scenes only own the
 * camera and the boy. If a cue and a scene disagree, the cue wins: the world is
 * the single source of truth for what the set is doing.
 */

/** Film second at which each scene starts. Keep in sync with film.tsx. */
export const SCENE_AT = {
  scene1: 0,
  scene2: 3.2,
  scene3: 6.8,
  scene4: 10.2,
  scene5: 16.0,
} as const;

export const FILM_SECONDS = 19.6;

const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
/** Smooth 0→1 between a and b. */
export const ramp = (t: number, a: number, b: number) => {
  const x = seg(t, a, b);
  return x * x * (3 - 2 * x);
};

/** Street windows go dark one at a time, left to right, before the curtains shut. */
export function houseLevel(t: number, index: number): number {
  const start = 0.1 + index * 0.13;
  return 1 - ramp(t, start, start + 0.22);
}

export type Cues = {
  /** Right-hand curtain: 0 = drawn shut, 1 = gathered at the rail edge. */
  curtainRight: number;
  curtainLeft: number;
  /** Moon-eye: 0 open, 1 shut. */
  lid: number;
  /** Where the eye is looking. +yaw looks to +X. */
  eyeYaw: number;
  eyePitch: number;
  /** 0.25 pinprick .. 1 dilated. */
  pupil: number;
  eyeGlow: number;
  /** The white-blind flash when the gaze snaps onto the window. */
  flash: number;
  /** The shaft of light falling out of the eye onto the town. */
  beam: number;
  /** How much cold moonlight makes it into the bedroom. */
  roomMoon: number;
  /** The final blade finding the empty half of the bed. */
  bedBlade: number;
  /** The moon's position, nudged so its blade creeps across the bedroom floor. */
  moonX: number;
  moonY: number;
};

export function cues(t: number): Cues {
  const close = ramp(t, 0.5, 1.8);
  const closeLeft = ramp(t, 0.62, 1.92);
  const peek = ramp(t, 8.55, 9.45);

  // The lid shuts for a beat at 15.6 and the whole town goes dark with it.
  const shut = ramp(t, 15.42, 15.58);
  const reopen = ramp(t, 15.68, 15.98);
  const lid = shut * (1 - reopen);

  // The eye spends the first half of the film looking away, so the hook is a
  // moon with something wrong about it rather than a face. Then it turns over:
  // it sweeps the roofs once, and on the second beat it snaps onto the window.
  const yaw = 1.5 * (1 - ramp(t, 12.6, 13.35)) + 0.42 * ramp(t, 13.4, 14.02) * (1 - ramp(t, 14.12, 14.36));
  const pitch = -0.16 + 0.16 * ramp(t, 12.6, 14.36);

  const flash = ramp(t, 14.28, 14.44) * (1 - ramp(t, 14.5, 15.3));

  // The shaft: faint while it searches, harder when it locks on, and back for
  // the button as it comes to the window.
  const search = ramp(t, 12.7, 13.05) * (1 - ramp(t, 14.2, 14.45));
  const arrive = ramp(t, 18.0, 19.0);
  const beam = (0.06 + 0.11 * search + 0.13 * arrive) * (1 - lid) * (1 - flash * 0.6);

  return {
    curtainRight: lerp(lerp(0.92, 0.03, close), 0.8, peek),
    curtainLeft: lerp(0.9, 0.03, closeLeft),
    lid,
    eyeYaw: yaw,
    eyePitch: pitch,
    pupil: lerp(lerp(0.2, 0.78, ramp(t, 12.3, 13.1)), 0.56, ramp(t, 18.15, 19.05)),
    eyeGlow: 1 - 0.95 * lid,
    flash,
    beam,
    roomMoon: 1 - 0.92 * lid,
    bedBlade: ramp(t, 18.3, 19.3),
    // The moon drifts a hand's width across the sky while the boy stands there,
    // so the blade of light on his floor is never quite still.
    moonX: lerp(-0.45, -0.95, ramp(t, 3.2, 8.2)),
    // Low enough that the eye sits in the band of sky a bedroom window sees
    // over the roofs. At 30 m the horizon is everything: a moon at 12 degrees
    // is above the window head and the ceiling, and the boy never sees it.
    moonY: 4.6,
  };
}
