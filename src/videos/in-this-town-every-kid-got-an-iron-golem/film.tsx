import { defineFilm } from "../../engine";
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
import { scene9 } from "./scene9";
import { scene10 } from "./scene10";
import { scene11 } from "./scene11";
import { scene12 } from "./scene12";
import { scene13 } from "./scene13";
import { scene14 } from "./scene14";

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
 * This film plays the MIDDLE cut (two minutes to two and a half): the owner found the short cut of it too fast
 * to follow (2026-11-15), so the voice runs slower and there is air between the beats.
 */
export const film = defineFilm({
  id: "in-this-town-every-kid-got-an-iron-golem",
  title: "In This Town, Every Kid Got an Iron Golem",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  // The voice alone for now. When the sound is built (scripts/sound.py build) this becomes audio/…/mix.mp3:
  // a finished film plays the mix, and `npm run check` fails one that does not.
  audio: { src: "audio/in-this-town-every-kid-got-an-iron-golem/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14],
});
