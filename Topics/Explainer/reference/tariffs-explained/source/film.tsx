import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * Tariffs, Explained Using Minecraft
 *
 * Two Minecraft villages connected by one wooden bridge explain tariffs, border taxes,
 * who really pays at checkout, and retaliatory trade wars — ending on a seamless Frame-0 loop.
 */
export const film = defineFilm({
  id: "tariffs-explained-using-minecraft",
  title: "Tariffs, Explained Using Minecraft",
  topic: "explainer",
  audio: { src: "audio/tariffs-explained-using-minecraft/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["TARIFFS", "TARIFF", "FIVE", "TWELVE", "FIFTEEN", "EMERALDS", "BLUE", "RED", "LOCAL"],
    dangerWords: ["TAX", "TEN", "REVENGE", "WAR", "EMPTY", "HIGHER", "BLOCK"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
