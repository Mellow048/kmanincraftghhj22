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
 * In This Town, I Live in a Monster Village
 *
 * A boy in yellow is the only human in a village of monsters, who lock him in every night. His one friend is Mo,
 * a silent zombie in a straw hat who eats bread, carries a lantern and sneezes. The night players come to clear
 * the village, the boy stands in front of his mum, and Mo catches the sword in his hand, bleeds red, and wipes
 * the green off his face: "I am human too."
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
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
