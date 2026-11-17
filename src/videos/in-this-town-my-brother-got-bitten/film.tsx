import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, My Brother Got Bitten
 *
 * A kid's big brother is bitten pulling him in through the door, and by midnight he is green and dad carries him
 * out. The town's rule is that the bitten go out of the gate before sunrise; but he is in the cellar, behind iron bars,
 * and he still knocks twice. The room under the house was built for this: dad comes back with a golden apple and a
 * bottle from the witch, the kid keeps the sun off his brother with his own shadow, and half the town turns out to
 * have knocked on that floor once.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of narration.md is
 * one shot. The story, the hooks and what is planted are in narration.md; the pictures are in STORYBOARD.md.
 */
export const film = defineFilm({
  id: "in-this-town-my-brother-got-bitten",
  title: "In This Town, My Brother Got Bitten",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-my-brother-got-bitten/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
