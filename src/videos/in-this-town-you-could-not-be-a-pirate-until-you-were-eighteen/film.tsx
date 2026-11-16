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
 * In This Town, You Could Not Be a Pirate Until You Were Eighteen
 *
 * A kid cannot have a boat until he is eighteen, because boats that pass the last buoy do not come back.
 * He finds a map as a child and sails the day the rule lets him, with two villagers and one player.
 * They are looking the wrong way when the thing the buoy was for comes up behind them.
 */
export const film = defineFilm({
  id: "in-this-town-you-could-not-be-a-pirate-until-you-were-eighteen",
  title: "In This Town, You Could Not Be a Pirate Until You Were Eighteen",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-you-could-not-be-a-pirate-until-you-were-eighteen/mix.mp3" },
  captions: { words: timing.words, y: 0.62 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
