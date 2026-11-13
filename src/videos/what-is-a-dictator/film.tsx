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
 * What Is a Dictator
 *
 * In your village the people pick their leader, a judge can tell him no, anyone can say he is doing it badly,
 * and he can be voted out. A dictator is a ruler nobody is allowed to tell no: not a judge, not the people, not a
 * vote. The word is Roman, and it used to be a job that was handed back after six months.
 *
 * An EXPLAINER (Topics/Explainer): one question, answered in under a minute. The recorded narration is the
 * clock, every line of narration.md is one place the camera comes to rest, and the camera FLIES from each
 * to the next: it never teleports. Read Topics/Explainer/README.md before changing anything here.
 */
export const film = defineFilm({
  id: "what-is-a-dictator",
  title: "What Is a Dictator",
  topic: "explainer",
  look: "overworld-day",
  // The voice alone, until the sound is built (scripts/sound.py build): then this is mix.mp3.
  audio: { src: "audio/what-is-a-dictator/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});

// The promise of the format, checked every time the film is loaded: the camera never teleports. This throws,
// naming the line, if a scene does not begin on the stop where the scene before it ended.
unbroken(film.scenes, { maxCuts: 2 });
