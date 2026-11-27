import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

export const film = defineFilm({
  id: "taxes-explained-using-minecraft",
  title: "Taxes Explained Using Minecraft",
  topic: "explainer",
  audio: { src: "audio/taxes-explained-using-minecraft/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["TAXES", "DIAMONDS", "TWENTY", "WALL", "SAFE", "GOOD"],
    dangerWords: ["CREEPERS", "BOOM", "SIX", "STATUE", "BAD", "ZERO"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
