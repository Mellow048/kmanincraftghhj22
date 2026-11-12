import { defineFilm } from "../../engine";
import { timing, unbroken } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * Why Does Bread Cost More Every Year
 *
 * TODO: the film in two sentences. The question, and the answer a nine-year-old could repeat.
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
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/why-does-bread-cost-more-every-year/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/why-does-bread-cost-more-every-year/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});

// The promise of the format, checked every time the film is loaded: the camera never teleports. This throws,
// naming the line, if a scene does not begin on the stop where the scene before it ended.
unbroken(film.scenes, { maxCuts: 2 });
