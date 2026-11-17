import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * My Dad Tried To Beat The Dragon Before I Woke Up
 *
 * A dad who has never played promises to beat the Ender Dragon before his son wakes up, and digs
 * four hundred blocks straight down to do it — because the only way to the End is an ender pearl,
 * and a pearl only drops if you look one in the eye.
 *
 * A STORY (Topics/Stories), cut on the voice: 36 shots in 76 seconds, nine of them cut inside a
 * line so the median shot sits at 2.1s, which is where the reference film lives. The light changes
 * four times and each time it is because the night has moved on: monitor blue at midnight, torch
 * orange down the shaft, orange again when the lava finds him, and the first gold of morning on
 * the two shots that pay the film off.
 *
 * The first film made with the shader chain on (`post.shaders`): cloud in the sky, shafts, and the
 * grade that was tuned against the reference. Nothing already delivered changes — this film opts in.
 */
export const film = defineFilm({
  id: "my-dad-tried-to-beat-the-dragon-before-i-woke-up",
  title: "My Dad Tried To Beat The Dragon Before I Woke Up",
  topic: "stories",
  cut: "story",
  look: "overworld-night",
  post: {
    // Warm the highlights, let the shafts through, and keep the bloom off the captions.
    shaders: { warmth: 0.85, saturation: 1.3, shafts: 0.35, bloom: 0.6, lift: 0.05 },
  },
  // The mix: the recorded voice, music that follows the night, and one effect for everything that
  // happens on screen (scripts/sound.py build). Point this back at narration.mp3 to check a cut
  // against the bare voice.
  audio: { src: "audio/my-dad-tried-to-beat-the-dragon-before-i-woke-up/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
