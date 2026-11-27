import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

export const film = defineFilm({
  id: "the-player-who-only-built-in-grey-wool",
  title: "The Player Who Only Built In Grey Wool",
  topic: "server-lore",
  audio: { src: "audio/the-player-who-only-built-in-grey-wool/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["COLOR", "OWNER", "GALLERY", "CHEST", "BRICK", "SUBSCRIBE"],
    dangerWords: ["GREY", "UGLIEST", "BORING", "COLORBLIND", "PINK", "QUIET", "GONE"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
