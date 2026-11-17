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
 * In This Town, We Lost the Vote
 *
 * A yellow cow with flowers on tells it. Everybody in her town lost the Mob Vote, and every morning every one of them
 * checks the mail, because once a letter came: her best friend, the copper golem, was added after four years. Then the
 * stage is taken away. He comes back with a chest of every vote they ever got; and in the morning her flag is up.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"`: it runs 1:39, which is the short cut's length. The story has all seven steps of the master prompt.
 */
export const film = defineFilm({
  id: "in-this-town-we-lost-the-vote",
  title: "In This Town, We Lost the Vote",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-we-lost-the-vote/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
