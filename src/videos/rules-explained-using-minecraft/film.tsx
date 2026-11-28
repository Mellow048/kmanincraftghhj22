import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * Rules, Explained Using Minecraft.
 *
 * 35 word-locked cuts (~66s), 2 distinct zones (Spawn Plaza + Open-Roof SchoolCampusMap),
 * Felint, Griefer & Mods, RuleBoard 1->100, SpawnChest, LockedChestGrid, BanHammer,
 * CommandBoard, Balance scale, PaperAirplane, and seamless Frame-0 loop.
 */
export const film = defineFilm({
  id: "rules-explained-using-minecraft",
  title: "Rules, Explained Using Minecraft",
  topic: "explainer",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/rules-explained-using-minecraft/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["RULES", "HUNDRED", "MODS", "LOCKS", "TEACHERS", "BOARD"],
    dangerWords: ["GRIEFER", "BREAK", "SMASHED", "LOSE", "LAVA", "BANNED"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
