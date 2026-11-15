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
import { scene11 } from "./scene11";
import { scene12 } from "./scene12";
import { scene13 } from "./scene13";
import { scene14 } from "./scene14";

/**
 * IN THIS TOWN, I WAS A SPY FOR THE VILLAGERS
 *
 * A masked villager slips into the pillagers' mansion, learns they will smash the village bell at dawn, and
 * warns the town. The ram's poor turning circle becomes the villagers' defence; the spy's disguise still gets
 * one last laugh. Short cut, 14 beats. The script is owner-approved.
 */
export const film = defineFilm({
  id: "in-this-town-i-was-a-spy-for-the-villagers",
  title: "In This Town, I Was a Spy for the Villagers",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-i-was-a-spy-for-the-villagers/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7,
    scene8, scene9, scene10, scene11, scene12, scene13, scene14,
  ],
});
