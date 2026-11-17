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
import { scene8 } from "./scene8";

/**
 * In This Town, Being Scared Is My Job
 *
 * A villager works in an iron farm in the sky: his job is to be scared of a zombie in a boat, so that iron men appear.
 * After two years he and the zombie, Kevin, are friends, and nothing comes out when he screams. The boss comes with a
 * new zombie and a bucket of lava for the old one, and the villager finds one real scream: for Kevin, not at him.
 * Part 1. It ends at the edge of the platform, two hundred blocks up.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "middle"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-being-scared-is-my-job",
  title: "In This Town, Being Scared Is My Job",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  audio: { src: "audio/in-this-town-being-scared-is-my-job/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
