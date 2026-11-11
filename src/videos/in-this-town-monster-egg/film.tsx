import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/** Broken Egg: one continuous neighborhood → school world, 20s @ 30fps. */
export const film = defineFilm({
  id: "in-this-town-monster-egg",
  title: "In This Town: The Broken Egg",
  fps: 30,
  width: 720,
  height: 1280,
  look: "town-day",
  post: { exposure: 1.09, bloom: 1.15 },
  fadeOut: 0.35,
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
