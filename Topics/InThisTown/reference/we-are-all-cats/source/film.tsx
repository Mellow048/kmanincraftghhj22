import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, We Are All Cats
 *
 * One village with a line of white blocks down the middle. West of it everyone is a cat: cat players, cat villagers,
 * a cat golem. East of it everyone is a dog. Every noon both sides walk up to the line and fight without touching:
 * the cats put their fur up, arch their backs and stand sideways, and the dogs bark. It goes on for generations,
 * until the cats are tired of it and carry the line away at night, block by block. In the morning nobody knows
 * where to bark or which grass is whose, so they walk up to each other, and it is weird, and then it is not.
 *
 * The owner's outline is the whole story (narration.md lists the few small things added). A whole story in one
 * film, by his word: no cliffhanger, no part two. An "In This Town" film (Topics/InThisTown): the recorded narration
 * is the clock.
 */
export const film = defineFilm({
  id: "in-this-town-we-are-all-cats",
  title: "In This Town, We Are All Cats",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-we-are-all-cats/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
