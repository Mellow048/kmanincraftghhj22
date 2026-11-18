import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import words from "./captions.json";

export const film = defineFilm({
  id: "popcorn-training-arc",
  title: "Popcorn Training Arc",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "warm-room",
  post: { exposure: 1.08, bloom: 0.95 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
  captions: { words, y: 0.785, size: 1.0 },
  audio: { src: "audio/popcorn-training-arc/mix.mp3" },
});
