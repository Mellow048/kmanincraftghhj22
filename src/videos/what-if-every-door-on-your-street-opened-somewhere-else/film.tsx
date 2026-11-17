import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * What If Every Door On Your Street Opened Somewhere Else
 *
 * Every door on his street opens somewhere else at night, and he learns the whole map by heart. He uses it for a
 * month to be never late and never seen — until he finds a hallway with his own handwriting on the wall, and a
 * tally that has outgrown his own, and understands that his mother has been walking the long way all along.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-every-door-on-your-street-opened-somewhere-else",
  title: "What If Every Door On Your Street Opened Somewhere Else",
  topic: "what-if",
  look: "overworld-night",
  // The finished mix: the voice, the music, the beds and 79 effects (scripts/sound.py build).
  audio: { src: "audio/what-if-every-door-on-your-street-opened-somewhere-else/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3],
});
