import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * In This Town, I Live in a Monster Village, Part 3
 *
 * TODO: the film in three sentences. Who tells it, the rule nobody explains, what the rule was hiding.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-monster-village-part-3",
  title: "In This Town, I Live in a Monster Village, Part 3",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-monster-village-part-3/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-monster-village-part-3/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
