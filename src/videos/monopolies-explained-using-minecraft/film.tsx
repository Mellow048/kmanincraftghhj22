import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

export const film = defineFilm({
  id: "monopolies-explained-using-minecraft",
  title: "Monopolies Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["MONOPOLY", "EMERALDS", "BREAD", "COMPETE", "MODS", "FAIR"],
    dangerWords: ["FIFTEEN", "STALE", "CRUMBS", "ZERO", "CRUSHES", "TRAP", "QUIT"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
