import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * THE HALLWAY — 10.0 seconds, 9:16, 30fps.
 * A compact proof of the framework: room, threshold, reveal, button.
 *
 *   npm run check
 *   (render on GitHub Actions: Render short -> Run workflow)
 */
export const film = defineFilm({
  id: "the-hallway",
  title: "The Hallway",
  fps: 30,
  width: 720,
  height: 1280,
  look: "hospital-night",
  post: { exposure: 1.18, bloom: 1.35 },
  fadeIn: 0.35,
  fadeOut: 0.4,
  World,
  scenes: [scene1, scene2, scene3],
});
