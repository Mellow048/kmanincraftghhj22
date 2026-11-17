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
 * IN THIS TOWN, THE BELL RANG AND NOBODY WAS ALLOWED TO LOOK UP
 * A law, a kid who breaks it, and the thing the law was keeping out of their eyes.
 */
export const film = defineFilm({
  id: "in-this-town-the-bell-rang-and-nobody-was-allowed-to-look-up",
  title: "In This Town, The Bell Rang And Nobody Was Allowed To Look Up",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-the-bell-rang-and-nobody-was-allowed-to-look-up/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9],
});
