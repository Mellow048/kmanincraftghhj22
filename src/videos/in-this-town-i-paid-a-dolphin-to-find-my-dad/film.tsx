import { defineFilm } from "../../engine";
import { staticShaderSettings } from "../../engine/shaders";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/** A raw cod buys a trip to a shipwreck. The kid finds Dad himself, by the stripe he painted. */
export const film = defineFilm({
  id: "in-this-town-i-paid-a-dolphin-to-find-my-dad",
  title: "In This Town, I Paid a Dolphin to Find My Dad",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // Same topic shader chain; restrained glare so fish, hands and the dry cabin stay legible.
  post: { exposure: 1.0, bloom: 0.84, shaders: staticShaderSettings({ shafts: 0.035 }) },
  audio: { src: "audio/in-this-town-i-paid-a-dolphin-to-find-my-dad/mix.mp3" },
  captions: { words: timing.words, y: 0.755, size: 0.91 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
