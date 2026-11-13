import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, I Live in a Monster Village, part 2.
 *
 * The monsters run to the hideout Mo dug for them, which from outside is a wrecked pig farm and a square of mud.
 * Under the mud is a home, and a doubt: why would a player give himself up for monsters, unless it is a trap?
 * Mo's diary answers it, and the boy goes back up alone to find him. He finds a sword and a helmet.
 *
 * The owner's own outline, beat for beat. It reuses part one's village and kit (../in-this-town-monster-village).
 * `cut: "middle"` is in Topics/InThisTown/topic.json: his story runs two minutes, between the short and long cuts.
 */
export const film = defineFilm({
  id: "in-this-town-monster-village-part-2",
  title: "In This Town, I Live in a Monster Village Part 2",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-night",
  audio: { src: "audio/in-this-town-monster-village-part-2/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
