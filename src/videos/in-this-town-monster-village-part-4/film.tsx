import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * In This Town, Monster Village Part 4
 *
 * Night in the castle village. A guard who cannot sleep meets dad in a bush; a lookout sees the pillagers coming
 * and a vex sees him; the wall goes up in TNT, the golem and a ravager meet in the yard, and the enderman teacher
 * turns up at the cage with a key (do not ask). The whole monster village comes through the hole, the bus comes over
 * the wall, and the boy is out. Then he sees Mo being dragged away, and runs after him into a thin hallway.
 * The owner's outline: Topics/InThisTown/outlines/monster-village-part-4.md.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * The full cut: about 2:50.
 */
export const film = defineFilm({
  id: "in-this-town-monster-village-part-4",
  title: "In This Town, I Live in a Monster Village, Part 4",
  topic: "in-this-town",
  look: "overworld-night",
  audio: { src: "audio/in-this-town-monster-village-part-4/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
