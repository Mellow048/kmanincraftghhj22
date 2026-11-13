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
 * In This Town, Everyone Gets a Robot at 18
 *
 * The teller turns eighteen in a town where a crate lands on your doorstep with your robot for life in it. His
 * is a head, and nothing else. The head is a helmet, the helmet is a suit, and the first person to come for it
 * is the one this town threw out. Part one of two.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 */
export const film = defineFilm({
  id: "in-this-town-robot-at-18",
  title: "In This Town, Everyone Gets a Robot at 18",
  topic: "in-this-town",
  cut: "extended",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-robot-at-18/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
