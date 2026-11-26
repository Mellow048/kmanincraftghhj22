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
 * Inflation Explained Using Minecraft
 *
 * Remastered on restored `74ba75f` engine: 37 word-synced visual cuts (~2.0s median),
 * depth-stacked 9:16 composition, distinct Explainer channel cast (Miles & Sterling),
 * mandatory explainer_bgm_loop.wav under narration, and seamless loop payoff.
 */
export const film = defineFilm({
  id: "inflation-explained-using-minecraft",
  title: "Inflation Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: true },
  // audio track synthesized & mixed cleanly on GitHub Actions (`en-US-GuyNeural` +10%)
  audio: { src: "audio/inflation-explained-using-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["INFLATION", "EMERALD", "EMERALDS", "STERLING", "MILES", "BREAD", "FOUR", "1971"],
    dangerWords: ["LESS", "DROUGHT", "ZERO", "EMPTY", "TEN", "HALF", "HUNDRED", "BILLS"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
