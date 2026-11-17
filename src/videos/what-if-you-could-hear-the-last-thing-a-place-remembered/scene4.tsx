import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { Hero, G, S, B, EAST, NORTH, SOUTH, WEST, timing, wordAt } from "./kit";
import { Rings } from "./scene1";

/**
 * SCENE 4 — "The wall with no windows". Where the film turns.
 *
 * The gym wall has been a joke twice already (`2.gym`, `2.gymb`): it is the only surface in the film that gives him
 * nothing, and he has decided it is broken. This scene is the same wall, the same height, the same flat hand — and
 * one sentence. He does not get an answer about a stranger this time. He gets his own name, in his mother's voice,
 * in a room she has never been in.
 *
 * It plays as two shots of silence and then three of a boy not moving, because the cut is what costs him: he has been
 * enjoying the power for twenty seconds of film and now it is pointed at him.
 */

const CANNOT = wordAt("4.one", "could");
const SILENT = wordAt("4.gym", "Silent");
const TOUCH = wordAt("4.touch", "hand");
const NAME = wordAt("4.name", "name");
const BEFORE = wordAt("4.before", "born");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The wall with no windows",
  shots: [
    {
      // The same bare end of the gym, but from further off and emptier than the joke version: the mats, the bars,
      // and one surface with nothing on it.
      cue: "4.one",
      ...cam.push({ on: G(-3.60, 1.20, 0.30), dist: 5.2, to: 4.3, yaw: 104, pitch: 6, fov: 50 }),
      zone: "gym",
      look: "overworld-day",
      note: "The whole gym from the mats to the bare west wall, with him standing at the end of it: one surface in the film that has never said anything.",
      stage: () => (
        <>
          <Hero position={G(-6.90, 0, 0.30)} rotationY={WEST + 0.5} animation="idle" face="frown" />
        </>
      ),
    },
    {
      // Flat on the wall with nothing happening: the film holds on a boy and some plaster for two seconds, which is
      // the silence he has been knocking at since the gym.
      cue: "4.gym",
      ...cam.push({ on: G(-7.85, 1.18, 0.30), dist: 2.75, to: 2.20, yaw: 74, pitch: 0, fov: 44 }),
      zone: "gym",
      look: "overworld-day",
      note: "His flat hand and his ear on the plaster of the silent wall, and no rings and no light and nothing at all coming out of it.",
      stage: () => (
        <>
          <Hero position={G(-7.20, 0, 0.30)} rotationY={WEST + 0.06} animation="press" face="uneasy" headYaw={0.18} />
        </>
      ),
    },
    {
      // The power goes off like a flashbulb. One frame of the gym's hard light and the rings going the wrong way —
      // into him, not out of the wall.
      cue: "4.touch",
      ...cam.push({ on: G(-7.10, 1.40, 0.30), dist: 2.05, to: 1.55, yaw: 42, pitch: 2, fov: 40 }),
      zone: "gym",
      look: "overworld-day",
      note: "The sentence arriving in his face rather than leaving the wall: rings going the wrong way and his eyes going wide at arm's length from the plaster.",
      stage: (t) => (
        <>
          <Hero position={G(-7.20, 0, 0.30)} rotationY={WEST + 0.12} animation="press" face="fear" />
          <Rings at={G(-7.60, 1.22, 0.30)} t={t} from={TOUCH} />
          <Block size={[0.5, 0.5, 0.5]} position={G(-7.60, 1.22, 0.30)} color="#fff3c4" emissive="#ffe9a8" emissiveIntensity={2.4} castShadow={false} />
        </>
      ),
    },
    {
      // The line lands and he does not move. Shot from the side with the empty length of the gym behind him, so the
      // room looks as big as the sentence does.
      cue: "4.name",
      // From the middle of the floor looking north-west: his face at 0.00, the bare wall at -0.91, and the whole
      // empty length of the gym behind his shoulder. (The old lens faced the wall the room has no fourth side for.)
      ...cam.push({ on: G(-7.20, 1.28, 0.30), dist: 3.00, to: 2.50, yaw: 26, pitch: 4, fov: 46 }),
      zone: "gym",
      look: "overworld-day",
      note: "Him standing against the wall with the whole empty gym in front of him, his hand still on the plaster and his face doing nothing: the room the voice has never been in.",
      stage: (t) => (
        <>
          <Hero position={G(-7.20, 0, 0.30)} rotationY={WEST + 0.22} animation="idle" face="wow" headPitch={0.1} />
          <Rings at={G(-7.90, 1.20, 0.30)} t={t} from={NAME - 0.3} />
        </>
      ),
    },
    {
      // Close, and the smallest thing in the film: his mouth not moving, and the sentence older than he is. This is
      // the cut that makes the last act work, so it is the only shot in the film that is a face and nothing else.
      cue: "4.before",
      ...cam.push({ on: G(-7.05, 1.56, 0.30), dist: 1.45, to: 1.18, yaw: 26, pitch: 1, fov: 34 }),
      zone: "gym",
      look: "overworld-day",
      note: "His face filling the frame and going still: a sentence said before he existed, in a room with no windows, and he is only now old enough to be frightened of it.",
      stage: () => (
        <>
          <Hero position={G(-7.20, 0, 0.30)} rotationY={WEST + 0.3} animation="idle" face="fear" headPitch={0.05} gaze={0} />
        </>
      ),
    },
  ],
});

void S;
void B;
void EAST;
void NORTH;
void SOUTH;
