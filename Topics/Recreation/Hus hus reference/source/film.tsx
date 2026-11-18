import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";
/** A three-second timer, a blue elbow, and a photograph worth a spot on Grandma's refrigerator. */
export const film = defineFilm({
  id: "thats-me-the-elbow",
  title: "That's Me. The Elbow.",
  topic: "recreation",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/thats-me-the-elbow/mix.mp3" },
  captions: { words: timing.words, y: 0.8, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
