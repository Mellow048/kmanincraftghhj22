import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * NEVER LOOK AT THE MOON — 19.6 seconds, 9:16, 30fps. "In This Town", episode 1.
 *
 * A boy who lives in a town where nobody looks at the moon peeks through his
 * curtains anyway. The moon is an eye. It finds his window, and then it comes
 * to look at him.
 *
 * One room, one continuous camera, five beats, no cuts. The camera leaves the
 * bedroom through the window and comes back through it, so the last image is
 * the first image with the meaning turned over.
 *
 *   npm run typecheck && npm run check
 *   npm run still -- never-look-at-the-moon out/frames/120.png --frame=120
 */
export const film = defineFilm({
  id: "never-look-at-the-moon",
  title: "Never Look at the Moon",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "town-night",
  post: { exposure: 1.13, bloom: 1.2 },
  fadeIn: 0.4,
  fadeOut: 0.55,
  // One teller, six lines, no score: a fifth-interval drone under everything and
  // a single low hit when the pupil locks on. Silence everywhere else.
  audio: [
    { src: "audio/never-look-at-the-moon/bed.mp3", at: 0, volume: 0.55 },
    { src: "audio/never-look-at-the-moon/line1.mp3", at: 0.35, volume: 1 },
    { src: "audio/never-look-at-the-moon/line2.mp3", at: 3.9, volume: 1 },
    { src: "audio/never-look-at-the-moon/line3.mp3", at: 7.4, volume: 1 },
    { src: "audio/never-look-at-the-moon/line4.mp3", at: 11.7, volume: 1 },
    { src: "audio/never-look-at-the-moon/line5.mp3", at: 14.4, volume: 1 },
    { src: "audio/never-look-at-the-moon/boom.mp3", at: 14.18, volume: 0.5 },
    { src: "audio/never-look-at-the-moon/line6.mp3", at: 16.95, volume: 1 },
  ],
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
