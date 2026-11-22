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
 * In This Town, My Mum Was a Chicken
 *
 * A baby zombie ashamed of his tiny chicken mum learns why she always perched on the highest roof
 * and stood underneath him when a cliff bridge snaps before sunrise and she glides eleven kids to safety.
 */
export const film = defineFilm({
  id: "in-this-town-my-mum-was-a-chicken",
  title: "In This Town, My Mum Was a Chicken",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-night",
  post: { shaders: true },
  audio: { src: "audio/in-this-town-my-mum-was-a-chicken/mix.mp3" },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
