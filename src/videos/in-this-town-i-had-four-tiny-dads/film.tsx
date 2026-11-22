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

/**
 * In This Town, I Had Four Tiny Dads
 *
 * In a swamp village where every kid has one giant two-block slime dad, one human boy grows up raised by four
 * knee-high tiny slimes who are all the same guy. He believes his dad split from clumsy accidents—and makes them
 * wait out of sight at school—until he unbars the old swamp bridge at sunset and wakes the towering iron golem on
 * the far side. Twice his dad took that golem's fist to save him as a baby, leaving zero splits left, yet all four
 * still stack in front of his shoes—before their secret nine-slimeball Slime Block saves them both and gives him
 * the four-way hug a big slime could never give without hurting him.
 */
export const film = defineFilm({
  id: "in-this-town-i-had-four-tiny-dads",
  title: "In This Town, I Had Four Tiny Dads",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/in-this-town-i-had-four-tiny-dads/mix.mp3" },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
