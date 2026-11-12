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
 * In This Town, Everyone Wore a Pumpkin on Their Head
 *
 * A kid in a town where nobody has ever taken their pumpkin off wants to see his own face, once.
 * Nobody can tell him why it is forbidden, so he does it alone, at the well, under a full moon.
 * The pumpkins were never hiding faces: they were keeping everyone from looking at what stands beside every house.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-pumpkin-heads",
  title: "In This Town, Everyone Wore a Pumpkin on Their Head",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-pumpkin-heads/mix.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-pumpkin-heads/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  audio: { src: "audio/in-this-town-pumpkin-heads/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7,
    scene8, scene9, scene10, scene11, scene12, scene13, scene14,
  ],
});
