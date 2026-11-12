import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * TODO: the film in three sentences. The power, what the teller used it for, and what it was really doing.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "what-if",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/__ID__/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/__ID__/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
