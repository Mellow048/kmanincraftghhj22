import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * Inflation Explained Using Minecraft
 *
 * Dual-lead Remastered Explainer: Miles (CitizenLead) works for bread while President Sterling
 * (EliteLead) turns on the emerald printer — doubling prices while goods stay flat.
 * Ends mid-clause on the exact Frame-0 price explosion for a seamless loop.
 */
export const film = defineFilm({
  id: "inflation-explained-using-minecraft",
  title: "Inflation Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: true },
  // Arena TTS step: record clips (`scripts/narration.py clips inflation-explained-using-minecraft`),
  // run `narration.py build ... --require-alignment`, `sound.py build ...`, then uncomment:
  // audio: { src: "audio/inflation-explained-using-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["INFLATION", "EMERALD", "EMERALDS", "STERLING", "MILES", "BREAD", "FOUR"],
    dangerWords: ["SHORT", "ZERO", "LESS", "WORTH", "CLIMB", "TEN", "BILLS"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
