import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * What If You Could See How Long You Had
 *
 * A boy can see a clock over anybody's head, counting down to the moment that person loses their temper. He uses
 * it to get through a week without being surprised, and never once has a conversation. Then he looks up at his own
 * clock, and finds out the power never measured time: it measured who had nobody to talk to.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-you-could-see-how-long-you-had",
  title: "What If You Could See How Long You Had",
  topic: "what-if",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  audio: { src: "audio/what-if-you-could-see-how-long-you-had/mix.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/what-if-you-could-see-how-long-you-had/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
