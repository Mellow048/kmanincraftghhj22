import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scenes } from "./scenes";

/**
 * What If You Could See How Many Times You'll Talk to Someone Again
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
  id: "what-if-you-could-see-how-many-times-youll-talk-to-someone-again",
  title: "What If You Could See How Many Times You'll Talk to Someone Again",
  topic: "what-if",
  look: "overworld-day",
  post: { shaders: true },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/what-if-you-could-see-how-many-times-youll-talk-to-someone-again/mix.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/what-if-you-could-see-how-many-times-youll-talk-to-someone-again/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  audio: { src: "audio/what-if-you-could-see-how-many-times-youll-talk-to-someone-again/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scenes],
});
