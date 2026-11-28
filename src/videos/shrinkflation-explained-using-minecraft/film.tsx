import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * Shrinkflation, Explained Using Minecraft.
 *
 * 40 word-locked cuts (~75s), 3 distinct zones (bakery, workshop, market),
 * Felint & Tycoon Sterling, shrinking 7->5->3->1 MinecraftCake, ShinyCakeBox,
 * CompareChestPair, Balance scale, GroceryShelf, and seamless Frame-0 loop.
 */
export const film = defineFilm({
  id: "shrinkflation-explained-using-minecraft",
  title: "Shrinkflation, Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/shrinkflation-explained-using-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["SHRINKFLATION", "FELINT", "STERLING", "FIVE", "SEVEN", "CAKE", "BOX"],
    dangerWords: ["ONE", "EIGHT", "ZERO", "FIFTEEN", "STOLEN", "HIDE"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
