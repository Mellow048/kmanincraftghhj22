import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

export const film = defineFilm({
  id: "in-this-town-you-cant-drop-your-torch",
  title: "In This Town, You Can't Drop Your Torch",
  topic: "in-this-town",
  cut: "short",
  audio: { src: "audio/in-this-town-you-cant-drop-your-torch/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["TORCH", "PIP", "FIREFLY", "GLOW", "FIFTY", "MOM", "SUBSCRIBE"],
    dangerWords: ["SHADOWS", "DARK", "HUNDRED", "TWO", "WINDSTORM", "OUT"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
