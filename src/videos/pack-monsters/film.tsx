import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/** A preview of the pack's monsters. Not a film: delete when the stills are taken. */
export const film = defineFilm({
  id: "pack-monsters",
  title: "Pack Monsters",
  fps: 30,
  width: 720,
  height: 1280,
  look: "overworld-day",
  post: { exposure: 1.05, bloom: 1.0 },
  fadeIn: 0,
  fadeOut: 0,
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
