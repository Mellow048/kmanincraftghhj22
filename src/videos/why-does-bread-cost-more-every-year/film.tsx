import { defineFilm } from "../../engine";
import { timing, unbroken } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";

/**
 * Why Does Bread Cost More Every Year
 *
 * The question: why does a loaf cost two coins today when it cost your mom one? The answer a nine-year-old could
 * repeat: there is more money every year but not much more bread, so each coin buys a little less.
 *
 * An EXPLAINER (Topics/Explainer): one question, answered in under a minute. The recorded narration is the
 * clock, every line of narration.md is one place the camera comes to rest, and the camera FLIES from each
 * to the next: it never teleports. Read Topics/Explainer/README.md before changing anything here.
 */
export const film = defineFilm({
  id: "why-does-bread-cost-more-every-year",
  title: "Why Does Bread Cost More Every Year",
  topic: "explainer",
  look: "overworld-day",
  audio: { src: "audio/why-does-bread-cost-more-every-year/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});

// The promise of the format, checked every time the film is loaded: the camera never teleports. This throws,
// naming the line, if a scene does not begin on the stop where the scene before it ended.
unbroken(film.scenes, { maxCuts: 2 });
