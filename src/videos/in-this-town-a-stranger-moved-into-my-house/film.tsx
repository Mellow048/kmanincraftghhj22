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

/**
 * In This Town, a Stranger Moved Into My House
 *
 * A villager who sells books lists everything a rude player has done to his town in thirty days: slept in his bed and
 * pocketed it, took the bell, dug straight down, broke his desk forty one times, put torches on his floor, built a wall.
 * He gets every reason wrong. Then a raid comes, and the bell, the wall and the hole are what save them: the stranger
 * built the town, brought each of them by boat and cured the teller with a golden apple. He moved into the stranger's house.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-a-stranger-moved-into-my-house",
  title: "In This Town, a Stranger Moved Into My House",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-a-stranger-moved-into-my-house/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9],
});
