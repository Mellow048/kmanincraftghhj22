import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

export const film = defineFilm({
  id: "the-stock-market-explained-using-minecraft",
  title: "The Stock Market, Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/the-stock-market-explained-using-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["STOCK", "MARKET", "EMERALDS", "TICKET", "TICKETS", "FORGE", "IRON", "TWENTY", "THIRTY", "HOPE", "CALM"],
    dangerWords: ["BROKE", "RUMOR", "DRY", "PANIC", "PANICS", "CRASH", "CRASHES", "LOSS", "FEAR", "SCARED"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
