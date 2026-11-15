import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * In This Town, Every Kid Got an Iron Golem
 *
 * A boy is ashamed of his snow golem in a town where every other kid has an iron one. Then fire flies out of
 * the old gate on the hill, the iron golems go down one by one, and the snow golem puts the fire out and
 * melts doing it. Part one of a series: it ends with the gate open again and snow starting to fall.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-every-kid-got-an-iron-golem",
  title: "In This Town, Every Kid Got an Iron Golem",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // The voice alone for now. When the sound is built (scripts/sound.py build) this becomes audio/…/mix.mp3:
  // a finished film plays the mix, and `npm run check` fails one that does not.
  audio: { src: "audio/in-this-town-every-kid-got-an-iron-golem/narration.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
