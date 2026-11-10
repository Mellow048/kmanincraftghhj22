import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * THE HALLWAY — 20.0 seconds, 9:16, 30fps.
 *
 * A boy in a children's ward at night. He is awake, and he is staring at a
 * crayon drawing of a tall black figure taped to his wall. He gets up, walks
 * out into the corridor, and the corridor is where the drawing is real.
 *
 *   npm run check
 *   (render stills on GitHub Actions: Render stills -> Run workflow)
 */
export const film = defineFilm({
  id: "the-hallway",
  title: "The Hallway",
  fps: 30,
  width: 720,
  height: 1280,
  look: "ward-night",
  post: { exposure: 1.12, bloom: 1.15 },
  fadeIn: 0.35,
  fadeOut: 0.4,
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
