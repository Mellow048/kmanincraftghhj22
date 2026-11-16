import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * What If Your Shadow Did What You Were Thinking
 *
 * A boy's shadow stops copying him and starts telling the truth about him. He uses it to be honest without ever
 * having to say anything, and for a week it is the funniest thing that has ever happened to him. Then it starts
 * leaving - to a house he has never been in, to a window, to a bedroom where his dead brother's name is on the door.
 *
 * One look for the power: a flat black pawn, always the same, on a wall or a floor, doing what he is thinking.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-your-shadow-did-what-you-were-thinking",
  title: "What If Your Shadow Did What You Were Thinking",
  topic: "what-if",
  look: "overworld-day",
  // The finished mix: voice, music and every effect, built by scripts/sound.py build.
  audio: { src: "audio/what-if-your-shadow-did-what-you-were-thinking/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3],
});
