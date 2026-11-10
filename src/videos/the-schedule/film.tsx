import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * THE SCHEDULE — 20.2 seconds, 9:16, 30fps.
 * One room, one hallway, one continuous world. The camera never teleports.
 *
 *   render:  npm run render -- the-schedule
 *   preview: npm run studio
 */
export const film = defineFilm({
  id: "the-schedule",
  title: "The Schedule",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "hospital-night",
  post: { exposure: 1.18, bloom: 1.35 },
  fadeIn: 0.5,
  fadeOut: 0.8,
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
