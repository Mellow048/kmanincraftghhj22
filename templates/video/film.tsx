import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__ — template film.
 *
 * The scaffold starts with one 3.6s beat so it compiles. Build the rest:
 *   1. Add scene2.tsx, scene3.tsx… (copy scene1.tsx).
 *   2. Import them and add them to `scenes` in order.
 *   3. Match the camera across every scene boundary.
 *   4. Keep the total at 18–20.5 seconds.
 *
 * Render only with the user's permission:
 *   npm run render -- __ID__ out/__ID__.mp4
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "hospital-night",
  post: { exposure: 1.16, bloom: 1.3 },
  fadeIn: 0.45,
  fadeOut: 0.7,
  World,
  scenes: [scene1],
});
