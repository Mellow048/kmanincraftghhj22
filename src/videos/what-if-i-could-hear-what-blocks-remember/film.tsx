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
 * What if I could hear a block's last phrase, but never its speaker or its context?
 * I used it to learn why Eli had gone quiet, then mistook his play rehearsal for a goodbye.
 * The power gave me true words and no way to know who they were for; I nearly lost my friend to that guess.
 */
export const film = defineFilm({
  id: "what-if-i-could-hear-what-blocks-remember",
  title: "What If I Could Hear What Blocks Remember",
  topic: "what-if",
  look: "overworld-day",
  audio: { src: "audio/what-if-i-could-hear-what-blocks-remember/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14],
});
