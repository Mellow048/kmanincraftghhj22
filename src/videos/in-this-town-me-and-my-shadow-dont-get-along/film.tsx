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
 * In This Town, Me and My Shadow Don't Get Along
 *
 * In this town every shadow copies its owner, and his does everything: it answers in class, walks the wall in the
 * hallway, and takes what he is too scared to ask for. It is not brave, it is him with the fear taken out. On prom
 * night he asks the girl himself, and the shadow goes back under his shoes, where it belonged.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). The owner's outline: one film, no parts.
 */
export const film = defineFilm({
  id: "in-this-town-me-and-my-shadow-dont-get-along",
  title: "In This Town, Me and My Shadow Don't Get Along",
  topic: "in-this-town",
  cut: "short",
  look: "town-day",
  audio: { src: "audio/in-this-town-me-and-my-shadow-dont-get-along/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9],
});
