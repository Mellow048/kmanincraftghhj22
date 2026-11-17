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
 * What If Every Lie Added a Netherite Block?
 *
 * One block joins the teller's private pack every time he lies, and its weight is real. When his friend needs him
 * to save their parade lantern, truth is what lets them work together.
 *
 * This is one complete What If story, told in 14 beats and 48 narration-timed shots.
 */
export const film = defineFilm({
  id: "what-if-every-lie-added-a-netherite-block",
  title: "What If Every Lie Added a Netherite Block?",
  topic: "what-if",
  look: "overworld-day",
  audio: { src: "audio/what-if-every-lie-added-a-netherite-block/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14],
});
