import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * What If Everybody Forgot You The Moment You Left The Room
 *
 * Nobody remembers him once he leaves a room. He uses it to get away with everything, and it is the best week of
 * his life, until he finds a piece of paper with his name on it and a number beside it. His mother has been paying
 * for every room he walks into since he was six.
 *
 * One look for the power: a DOOR, and the same door closing in every scene.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-everybody-forgot-you-the-moment-you-left-the-room",
  title: "What If Everybody Forgot You The Moment You Left The Room",
  topic: "what-if",
  look: "overworld-day",
  // The finished mix: voice, music and every effect, built by scripts/sound.py build.
  audio: { src: "audio/what-if-everybody-forgot-you-the-moment-you-left-the-room/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3],
});
