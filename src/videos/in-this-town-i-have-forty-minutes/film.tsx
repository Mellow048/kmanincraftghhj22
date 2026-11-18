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

/**
 * In This Town, I Have Forty Minutes
 *
 * The wandering trader tells it. He has forty minutes in every town before he vanishes, has been to nine hundred
 * towns, and has never sold a thing: this town is all salesmen, and the one real customer takes his llamas. With three
 * minutes left a kid buys the dead bush for one emerald; he spends it, and the one emerald goes round the whole town.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-i-have-forty-minutes",
  title: "In This Town, I Have Forty Minutes",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-i-have-forty-minutes/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
