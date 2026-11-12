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
 * IN THIS TOWN, EVERYONE HAD THE SAME FACE EXCEPT ME
 *
 * A boy raised by villagers tunnels past the one hill he is forbidden to climb,
 * to learn why he alone has hands. On the other side he finds his own kind,
 * burning a village like the one that raised him. One of them waves.
 *
 * A story film (Topics/InThisTown): the recorded narration is the clock, and
 * every line of narration.md is one shot. Read docs/STORY-FILMS.md first.
 * It is the topic's short cut (`cut: "short"`): 14 beats, 1:45. The owner asked for one to two minutes.
 */
export const film = defineFilm({
  id: "in-this-town-same-face",
  title: "In This Town, Everyone Had the Same Face Except Me",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-same-face/narration.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7,
    scene8, scene9, scene10, scene11, scene12, scene13, scene14,
  ],
});
