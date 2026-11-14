import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, I Live in a Monster Village, Part 3
 *
 * The boy is taken by the players, and only dad's arm sees it. The arm crawls home and tells the village; the boy
 * wakes in a cage in a village with a castle wall round it, and Mo is in the last cage. Meanwhile mum knocks on the
 * pillagers' door. The owner's own outline (Topics/InThisTown/outlines/monster-village-part-3.md).
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"`: his story runs about 2:20, between the short and the long cut.
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
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
