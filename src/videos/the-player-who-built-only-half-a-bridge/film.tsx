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
  id: "the-player-who-built-only-half-a-bridge",
  title: "The Player Who Built Only Half A Bridge",
  topic: "server-lore",
  look: "overworld-golden",
  post: { shaders: true },
  audio: { src: "audio/the-player-who-built-only-half-a-bridge/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["OWNER", "BRIDGE", "MAYA", "PLANK", "PLANKS", "HEARTS", "ONE", "SUBSCRIBE"],
    dangerWords: ["STOPPED", "ZERO", "SCARED", "TNT", "CRATER", "CRATERS", "LEFT", "ALONE", "DARK"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
