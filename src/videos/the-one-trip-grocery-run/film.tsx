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

/**
 * The One-Trip Grocery Run
 * One kid turns a grocery carry into a dead-serious sport. His load helps a neighbour; the trunk keeps one tiny
 * item for the last joke. All props are ordinary real-world objects. The standard block-avatar head stays simple:
 * there are no ears, photo prints, or ear gags in this film.
 */
export const film = defineFilm({
  id: "the-one-trip-grocery-run",
  title: "The One-Trip Grocery Run",
  topic: "recreation",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/the-one-trip-grocery-run/mix.mp3" },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
