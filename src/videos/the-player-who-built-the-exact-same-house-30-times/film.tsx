import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

export const film = defineFilm({
  id: "the-player-who-built-the-exact-same-house-30-times",
  title: "The Player Who Built the Exact Same House 30 Times",
  topic: "server-lore",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/the-player-who-built-the-exact-same-house-30-times/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["THIRTY", "OWNER", "COMPASS", "YELLOW", "FLOWER", "GRANDPA", "SAFE", "LODESTONE", "HOME", "FOUND", "SUBSCRIBE"],
    dangerWords: ["GRIEFER", "UGLY", "BANNED", "FADING", "LOST", "LAVA", "BURNED", "DARK", "NEVER", "SILENT"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
