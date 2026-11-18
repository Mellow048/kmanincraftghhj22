import { defineFilm } from "../../engine";
import { World } from "./world";
import { timing } from "./action";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";

/** An original real-life training parody, performed by block people. */
export const film = defineFilm({
  id: "still-rushing-the-third-one",
  title: "Still Rushing the Third One",
  topic: "recreation",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/still-rushing-the-third-one/mix.mp3" },
  captions: { words: timing.words, y: 0.735, size: 0.89, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
