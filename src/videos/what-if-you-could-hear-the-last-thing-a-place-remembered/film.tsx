import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * What If You Could Hear The Last Thing A Place Remembered
 *
 * A boy can hear the last thing a wall heard, once, and then the wall is spent. He spends a week of other people's
 * sentences on himself, finds one wall that will not answer him, and then hears his own name in his mother's voice
 * in a room she has never been in. Every wall he emptied was a sentence he took; the one that mattered was his
 * father's, said to a sink every morning for nineteen years, to a son who was never up early enough to be in it.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-you-could-hear-the-last-thing-a-place-remembered",
  title: "What If You Could Hear The Last Thing A Place Remembered",
  topic: "what-if",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/what-if-you-could-hear-the-last-thing-a-place-remembered/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/what-if-you-could-hear-the-last-thing-a-place-remembered/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
