import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scenes } from "./scenes";

/**
 * WHAT IF YOU COULD HEAR EVERY UNSAID THING?
 *
 * Since he was nine, the teller hears every sentence a person decides not to say, in their own voice, and only if
 * it was meant for him. His father has stood in his doorway every night for six years deciding not to say the same
 * four words. He assumed he knew what they were.
 *
 * A WHAT IF film (Topics/WhatIf): a kid, one impossible power, and what it cost. The recorded narration is the
 * clock. Read Topics/MASTERPROMPT-01.md before changing anything here.
 */
export const film = defineFilm({
  id: "what-if-you-could-hear-every-unsaid-thing",
  title: "What If You Could Hear Every Unsaid Thing?",
  topic: "what-if",
  look: "overworld-day",
  post: { shaders: { bloom: 0.18, threshold: 1.9 }, exposure: 1.0 },
  captions: { words: timing.words, y: 0.72 },
  audio: { src: "audio/what-if-you-could-hear-every-unsaid-thing/mix.mp3" },
  World,
  scenes: [scenes],
});
