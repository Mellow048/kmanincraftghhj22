import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

export const film = defineFilm({
  id: "the-player-who-never-left-the-spawn-bench",
  title: "The Player Who Never Left The Spawn Bench",
  topic: "server-lore",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["BENCH", "MAYA", "WELCOME", "FORTY", "LANTERNS", "HOME"],
    dangerWords: ["TNT", "BOOM", "SORRY", "SHAKE", "CRATER", "SILENT"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
