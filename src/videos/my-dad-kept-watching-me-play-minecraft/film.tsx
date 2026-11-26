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

export const film = defineFilm({
  id: "my-dad-kept-watching-me-play-minecraft",
  title: "My Dad Kept Watching Me Play Minecraft",
  topic: "server-lore",
  look: "overworld-golden",
  post: { shaders: true },
  audio: { src: "audio/my-dad-kept-watching-me-play-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["DAD", "MINECRAFT", "LAUGHING", "LAPTOP", "WOOD", "SHIELD", "BLOCKED", "SUBSCRIBE"],
    dangerWords: ["CREEPER", "BOOM!", "DIED", "CRATER", "HOUSE", "TORN", "SORRY"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
