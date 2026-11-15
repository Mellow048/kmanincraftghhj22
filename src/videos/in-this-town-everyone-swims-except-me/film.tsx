import { defineFilm } from "../../engine";
import type { SceneDef, Shot, Vec3 } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";
import { scene8 } from "./scene8";

/**
 * FRAMING HYGIENE. A body is 1.8 m tall; at fov 38 a 2 m lens only sees a chest, so a shot
 * aimed low crops heads and legs off and the film reads as a pile of elbows. Every shot that
 * is not deliberately a macro (a ring, a phone, a hand, a button) is lifted to eye line and
 * pushed back until the whole subject fits. Macros keep their own framing.
 */
const MACRO =
  /button|hands|number|phone|title|cold|morning|hand$|hand\d|problem|dare|glint|feel|looked|luck|trophy|toes|cup|worm|seventh|tiles/;

const EYE = 1.1;
const MIN_DIST = 3.9;

const frame = (shot: Shot): Shot => {
  if (MACRO.test(shot.cue ?? "")) return shot;
  if (shot.target[1] < -1.4) return shot; // genuinely under the water, at the bottom

  const ty = Math.min(EYE, Math.max(shot.target[1], EYE));
  const dy = ty - shot.target[1];
  const lift = (p: Vec3): Vec3 => [p[0], p[1] + dy, p[2]];
  const back = (from: Vec3, target: Vec3): Vec3 => {
    const v: Vec3 = [from[0] - target[0], from[1] - target[1], from[2] - target[2]];
    const d = Math.hypot(v[0], v[1], v[2]);
    if (d >= MIN_DIST || d === 0) return from;
    const k = MIN_DIST / d;
    return [target[0] + v[0] * k, target[1] + v[1] * k, target[2] + v[2] * k];
  };

  const target: Vec3 = [shot.target[0], ty, shot.target[2]];
  const targetTo: Vec3 | undefined = shot.targetTo
    ? [shot.targetTo[0], Math.min(EYE, Math.max(shot.targetTo[1], EYE)), shot.targetTo[2]]
    : undefined;
  return {
    ...shot,
    target,
    targetTo,
    from: back(lift(shot.from), target),
    to: shot.to ? back(lift(shot.to), targetTo ?? target) : undefined,
    path: shot.path ? shot.path.map(lift) : undefined,
    targetPath: shot.targetPath ? shot.targetPath.map(lift) : undefined,
  };
};

const clean = (scene: SceneDef): SceneDef => ({ ...scene, shots: scene.shots.map(frame) });


/**
 * In This Town, Everyone Swims Except Me
 *
 * A kid who cannot swim trains for the town's summer race, because the trophy is as big as his head.
 * A silent stranger in the woods gives him a ring with three buttons. He presses one and becomes fast —
 * fast enough for second place, which is exactly when he sees the ring on the winner's hand.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-everyone-swims-except-me",
  title: "In This Town, Everyone Swims Except Me",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-everyone-swims-except-me/mix.mp3" },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-everyone-swims-except-me/mix.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-everyone-swims-except-me/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8].map(clean),
});
