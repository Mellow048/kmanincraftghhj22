import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * In This Town, the Fastest Kid Wins, Part 2
 *
 * The owner's own story (Topics/InThisTown/outlines/race-part-2.md), part 2. The boy who came second has the same
 * shoes as the runner who came first, and so do first place's two friends. He hides, paints his own blue, and
 * runs stage two in the bunch until a van offers to let him quit. He finishes fourth, and first place walks up to him.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-the-fastest-kid-wins-part-2",
  title: "In This Town, the Fastest Kid Wins, Part 2",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-the-fastest-kid-wins-part-2/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
