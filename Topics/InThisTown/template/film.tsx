import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * TODO: the film in three sentences. Who tells it, the rule nobody explains, what the rule was hiding.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "__TOPIC__",
  __CUT_LINE__
  look: "overworld-day",
  // The shader chain (painted sky and sun, bloom, tone mapping, grade): the owner asked for it on every film from
  // 2026-11-17 on. Read "With the shaders on" in Topics/InThisTown/PACK.md before lighting a shot.
  post: { shaders: true },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/__ID__/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/__ID__/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1],
});
