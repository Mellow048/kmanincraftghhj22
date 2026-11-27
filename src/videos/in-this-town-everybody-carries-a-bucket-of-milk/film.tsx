import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

export const film = defineFilm({
  id: "in-this-town-everybody-carries-a-bucket-of-milk",
  title: "In This Town, Everybody Carries A Bucket Of Milk",
  topic: "in-this-town",
  cut: "short",
  audio: { src: "audio/in-this-town-everybody-carries-a-bucket-of-milk/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["MILK", "MOO", "COW", "INFINITE", "DAD", "SUBSCRIBE"],
    dangerWords: ["WITCH", "PURPLE", "FLOAT", "HUNDRED", "TWO", "EMPTY", "BARON"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
