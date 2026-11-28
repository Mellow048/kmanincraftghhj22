import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, My Dad Disappears Every Night
 *
 * A kid's Wandering Trader dad gets mocked all day for selling dead bushes for five emeralds, then drinks
 * an Invisibility Potion every sunset and vanishes. After finding patched roofs, warm loaves, and muddy
 * llama prints, the kid splashes a Milk Bucket on a floating torch and discovers Dad was acting useless by
 * day so greedy rich merchants would leave him alone while he helped struggling neighbors every night.
 */
export const film = defineFilm({
  id: "in-this-town-my-dad-disappears-every-night",
  title: "In This Town, My Dad Disappears Every Night",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: {
    exposure: 0.95,
    bloom: 0.5,
    shaders: { preset: "vibrant-day", bloom: 0.26, threshold: 0.92, diffusion: 0.06, veil: 0.04, shafts: 0.12 },
  },
  audio: { src: "audio/in-this-town-my-dad-disappears-every-night/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["DAD", "LLAMAS", "POTION", "MILK", "BUSH", "EMERALDS", "SUBSCRIBE"],
    dangerWords: ["DISAPPEARS", "VANISHES", "WORST", "EMPTY", "SHAME", "THIEF", "CRUSH"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
