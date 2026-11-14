import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * In This Town, the Fastest Kid Wins
 *
 * The owner's own story (Topics/InThisTown/outlines/README.md), part 1. Every year the fastest kid in town wins a
 * trophy, and the teller is the slowest. A witch in the forest gives him a pair of shoes for nothing; they run at the
 * speed of light until he finds the third button. In the race he climbs from fifteenth to second, and the runner in
 * first place is wearing the same shoes.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-the-fastest-kid-wins",
  title: "In This Town, the Fastest Kid Wins",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-the-fastest-kid-wins/narration.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
