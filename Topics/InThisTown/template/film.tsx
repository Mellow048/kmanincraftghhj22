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
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // The film is silent until its sound exists. When public/audio/__ID__/mix.mp3 has been built
  // (voice, then `python3 scripts/sound.py build __ID__`), put this line back:
  // audio: { src: "audio/__ID__/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
