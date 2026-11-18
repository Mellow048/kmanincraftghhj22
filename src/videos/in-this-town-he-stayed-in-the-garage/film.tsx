import { defineFilm } from "../../engine";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { timing } from "./kit";
import { World } from "./world";

/**
 * In This Town, He Stayed in the Garage
 *
 * The "while they were out partying" reel, as a mechanic. HUS HUS HUS is the first line, and the wrench is already
 * moving. A real garage, a real party, a real job. Minecraft is the coat.
 */
export const film = defineFilm({
  id: "in-this-town-he-stayed-in-the-garage",
  title: "In This Town, He Stayed in the Garage",
  topic: "in-this-town",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-he-stayed-in-the-garage/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
