import type React from "react";
import { around } from "../../src/engine";
import type { LookPreset, SceneDef, Shot, Timing, Vec3 } from "../../src/engine";

/**
 * THE FLIGHT — the camera of an explainer.
 *
 * The camera grammar is the framework's own (docs/CAMERA-BIBLE.md): one continuous world, and a camera
 * that never teleports. What this file adds is the CLOCK. In a 20-second base film the times of a move
 * are typed by hand. Here the recorded voice is the clock, as in every narrated film: each line of
 * narration.md has one place the camera comes to rest, and the camera FLIES there as the line begins.
 *
 *   A STOP is a framing: what the lens looks at, from how far, from which side.
 *   A film's stops are its route. Name them once, in kit.tsx:
 *
 *     export const STOPS = {
 *       loaf: stop([0, 1.1, 0], 3.2, 20, 12),            // look at the loaf from 3.2 m, 20° round, 12° above
 *       tag: near(stop([0, 1.1, 0], 3.2, 20, 12), { closer: 1.4, on: [0.4, 1.3, 0] }),
 *       mint: stop([16, 1.4, -3], 4.5, -25, 14),
 *     };
 *
 *   A scene is a list of lines and the stop each one lands on:
 *
 *     export const scene2 = flightScene(timing, {
 *       id: "scene2",
 *       title: "One loaf, one emerald",
 *       from: STOPS.loaf,                                 // where scene 1 left the camera
 *       shots: [
 *         { cue: "2.price", to: STOPS.tag, note: "…why this picture, for these words…" },
 *         { cue: "2.mint", to: STOPS.mint, lift: 3, note: "…" },
 *       ],
 *     });
 *
 * For each line the camera flies from where it is to the new stop (half a second to a second, eased at
 * both ends), arriving a little short of it, and then keeps creeping in for the rest of the line. So it
 * is never still, and the thing being talked about is in the frame for most of its own sentence.
 *
 * WHAT THE CAMERA LOOKS AT IS NOT IN THE SHOT. With hard cuts, a shot's `stage` can appear on the cut and
 * vanish on the next one. A camera that flies away from a thing still sees it. So everything an explainer
 * shows lives in the WORLD for the whole film, and is driven by the film's clock (`filmClock`, Shared):
 * it waits in its first state until its word is said, and stays in its last state afterwards.
 */

/** A framing the camera comes to rest on. Angles are degrees, as in `cam.*`: yaw 0 is the +Z side, pitch 20 looks down. */
export type Stop = { on: Vec3; dist: number; yaw: number; pitch: number; fov: number };

/** A stop: look at `on` from `dist` metres, `yaw` degrees round it and `pitch` degrees above it. */
export const stop = (on: Vec3, dist: number, yaw = 0, pitch = 10, fov = 42): Stop => ({ on, dist, yaw, pitch, fov });

/**
 * A second stop made from a first: closer, turned, raised, or looking at another point of the same thing.
 * Two lines about one exhibit are two stops: the camera has to keep moving.
 *
 *   near(STOPS.loaf, { closer: 1.2, turn: -25 })      // go in, and come round to its other side
 *   near(STOPS.loaf, { on: [0.4, 1.3, 0], closer: 2 })   // go in on the price tag
 */
export const near = (s: Stop, change: { closer?: number; turn?: number; raise?: number; on?: Vec3; fov?: number }): Stop => ({
  on: change.on ?? s.on,
  dist: Math.max(0.3, s.dist - (change.closer ?? 0)),
  yaw: s.yaw + (change.turn ?? 0),
  pitch: s.pitch + (change.raise ?? 0),
  fov: change.fov ?? s.fov,
});

/** Where the lens is when the camera is on a stop (`back` metres further out along the same line). */
export const eyeOf = (s: Stop, back = 0): Vec3 => around(s.on, s.dist + back, s.yaw, s.pitch);

export type FlightShot = {
  /** Id of the narration line this move is flown to. */
  cue: string;
  /** Where the camera comes to rest for this line. */
  to: Stop;
  /** Seconds the flight takes. Default: by distance, 0.5–1.2 s. Never more than 55% of the line. */
  travel?: number;
  /** Points to fly through on the way: round a tree, over a roof, down a chimney. */
  via?: Vec3[];
  /** Metres to rise above the straight line at the middle of the flight. Default: a tenth of the distance, at most 3. 0 flies straight. */
  lift?: number;
  /** Metres the camera keeps creeping in after it arrives. Default: 6% of the stop's distance, at most 0.6. */
  drift?: number;
  /** A hard cut to this stop instead of a flight. Rare: the topic allows only a few a film. Say why in the note. */
  cut?: boolean;
  /** Handheld shake while it rests, in metres. 0.005–0.03, and only on an impact. */
  shake?: number;
  /** Lighting preset for this line only. */
  look?: LookPreset;
  zone?: string;
  /** Why this picture, for these words. */
  note: string;
};

export type FlightSceneDef = {
  id: string;
  title: string;
  /** Where the camera is when this scene begins: the last stop of the scene before it. (For scene 1: where the film opens.) */
  from: Stop;
  shots: FlightShot[];
  /** Optional: things that exist only during this scene. Most of an explainer belongs in the world instead. */
  Component?: React.FC;
};

const gap = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const Nothing: React.FC = () => null;

/** An engine shot that begins with a declared hard cut. `unbroken` lets it jump. */
type FlownShot = Shot & { cutIn?: boolean };

/** Build an engine scene whose camera FLIES from stop to stop, one stop for each narration line. */
export function flightScene(timing: Timing, def: FlightSceneDef): SceneDef {
  if (def.shots.length === 0) throw new Error(`[${def.id}] a flight scene needs at least one shot.`);
  const cueOf = (id: string) => {
    const cue = timing.cues.find((c) => c.id === id);
    if (!cue) throw new Error(`[${def.id}] shot cue "${id}" is not in timing.json. Is the line in narration.md, and did you rebuild the timing?`);
    return cue;
  };

  const start = cueOf(def.shots[0].cue).start;
  let cursor = start;
  let eye = eyeOf(def.from);
  let target = def.from.on;
  let fov = def.from.fov;
  const shots: FlownShot[] = [];

  for (const s of def.shots) {
    const cue = cueOf(s.cue);
    if (Math.abs(cue.start - cursor) > 1e-3) {
      throw new Error(
        `[${def.id}] cue "${s.cue}" starts at ${cue.start}s but the previous shot ends at ${cursor.toFixed(3)}s. ` +
          `Shots in a scene must follow narration.md line by line, with none skipped.`,
      );
    }
    cursor = cue.end;
    const at = cue.start - start;
    const dur = cue.end - cue.start;
    const drift = s.drift ?? Math.min(0.6, s.to.dist * 0.06);
    const arrive = eyeOf(s.to, drift);
    const rest = eyeOf(s.to);
    const common = { cue: s.cue, note: s.note, ...(s.look ? { look: s.look } : {}), ...(s.zone ? { zone: s.zone } : {}) };
    const resting = { ...common, from: arrive, to: rest, target: s.to.on, fov: s.to.fov, ease: "linear" as const, ...(s.shake ? { shake: s.shake } : {}) };

    if (s.cut) {
      shots.push({ ...resting, at, dur, cutIn: true });
    } else {
      const far = gap(eye, arrive);
      if (far < 0.05 && gap(target, s.to.on) < 0.05) {
        throw new Error(
          `[${def.id}] cue "${s.cue}": the camera is already on this stop, so it would stand still for the whole line. ` +
            `Give it somewhere to go: to: near(<the stop>, { closer: 0.6, turn: 15 }).`,
        );
      }
      const travel = Math.min(dur * 0.55, s.travel ?? clamp(0.45 + far * 0.05, 0.5, 1.2));
      const lift = s.lift ?? Math.min(3, far * 0.1);
      const middle: Vec3 = [(eye[0] + arrive[0]) / 2, (eye[1] + arrive[1]) / 2 + lift, (eye[2] + arrive[2]) / 2];
      const path = s.via && s.via.length > 0 ? [eye, ...s.via, arrive] : lift > 0.01 ? [eye, middle, arrive] : null;
      shots.push({
        ...common,
        at,
        dur: travel,
        from: eye,
        ...(path ? { path } : { to: arrive }),
        target,
        targetTo: s.to.on,
        fov,
        fovTo: s.to.fov,
        ease: "inOutCubic",
      });
      shots.push({ ...resting, at: at + travel, dur: dur - travel });
    }
    eye = rest;
    target = s.to.on;
    fov = s.to.fov;
  }

  return { id: def.id, title: def.title, duration: cursor - start, shots, Component: def.Component ?? Nothing };
}

/**
 * The promise of an explainer, checked: THE CAMERA NEVER TELEPORTS. Call it in film.tsx, on the film's scenes:
 *
 *   unbroken(film.scenes, { maxCuts: 2 });
 *
 * It throws, naming the line, if a shot does not begin where the one before it ended (6 cm, 0.75° of lens:
 * the same limits `npm run check` uses on a base film), unless that shot is a declared `cut: true`. It also
 * throws if the film has more declared cuts than `maxCuts`. The usual cause is a scene whose `from` is not
 * the last stop of the scene before it.
 */
export function unbroken(scenes: SceneDef[], limits: { maxCuts?: number } = {}): void {
  let before: { eye: Vec3; target: Vec3; fov: number; label: string } | null = null;
  let cuts = 0;
  for (const scene of scenes) {
    for (const shot of scene.shots as FlownShot[]) {
      const label = `${scene.id}${shot.cue ? ` [${shot.cue}]` : ""}`;
      const eye = shot.path?.[0] ?? shot.from;
      const target = shot.targetPath?.[0] ?? shot.target;
      const fov = shot.fov ?? 38;
      if (shot.cutIn) {
        cuts++;
      } else if (before) {
        const moved = gap(before.eye, eye);
        const aimed = gap(before.target, target);
        const lens = Math.abs(before.fov - fov);
        if (moved > 0.06 || aimed > 0.06 || lens > 0.75) {
          throw new Error(
            `The camera teleports going into ${label}: it jumps ${moved.toFixed(2)} m, its look point ${aimed.toFixed(2)} m and its lens ${lens.toFixed(1)}°, ` +
              `from where ${before.label} left it. In an explainer the camera flies. Make this scene's \`from\` the last stop of the scene before it, ` +
              `or, if a cut really is the point, give the shot \`cut: true\` and say why in its note.`,
          );
        }
      }
      before = {
        eye: shot.path?.[shot.path.length - 1] ?? shot.to ?? shot.from,
        target: shot.targetPath?.[shot.targetPath.length - 1] ?? shot.targetTo ?? shot.target,
        fov: shot.fovTo ?? fov,
        label,
      };
    }
  }
  if (limits.maxCuts !== undefined && cuts > limits.maxCuts) {
    throw new Error(`This film has ${cuts} hard cuts. An explainer allows ${limits.maxCuts}: the camera flies from one thing to the next.`);
  }
}
