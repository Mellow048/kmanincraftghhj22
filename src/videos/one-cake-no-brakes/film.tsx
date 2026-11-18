import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { FRAMES } from "./rail";
import words from "./captions.json";

export const film = defineFilm({
  id: "one-cake-no-brakes",
  title: "One Cake, No Brakes",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "overworld-day",
  post: { exposure: .91, bloom: .91 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
  captions: { words, y: .822, size: 1.03 },
  audio: { src: "audio/one-cake-no-brakes/mix.mp3" },
});

if (film.durationInFrames !== FRAMES) throw new Error("Cake edit and foley clock diverged");
