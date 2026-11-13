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
import { scene9 } from "./scene9";
import { scene10 } from "./scene10";

/**
 * In This Town, I Live in a Monster Village
 *
 * A boy in yellow is the only human in a village of monsters, who lock him in every night. His one friend is Mo,
 * a silent zombie in a straw hat who eats bread, carries a lantern and sneezes. The night players come to clear
 * the village, the boy stands in front of his mum, and Mo catches the sword in his hand, bleeds red, and wipes
 * the green off his face: "I am human too."
 *
 * The players had come for Mo, not the village. While they stare at him the monsters take them from behind and
 * they run; the village gathers and takes Mo as he is; then the forest fills with players, Mo sends everybody
 * east to a hideout he dug years ago, and stays behind alone in iron. Part two is his.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. The monsters are the pack's (Topics/InThisTown/monsters.tsx).
 */
export const film = defineFilm({
  id: "in-this-town-monster-village",
  title: "In This Town, I Live in a Monster Village",
  topic: "in-this-town",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-monster-village/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10],
});
