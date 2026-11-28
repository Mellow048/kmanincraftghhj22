import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * The Player Who Kept Asking Where His House Was (ServerLore)
 *
 * 39 word-locked cuts (~78s), 3 zones (SpawnHubMap, ComputerRoomMap, Cabin),
 * BlueRoofCottage, LodestoneBlock,
 * EnchantedCompass, BlueLanternRoad, OpenBookPage, ChestGridUI, and dual Up score.
 */
export const film = defineFilm({
  id: "the-player-who-kept-asking-where-his-house-was",
  title: "The Player Who Kept Asking Where His House Was",
  topic: "server-lore",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/the-player-who-kept-asking-where-his-house-was/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["FORTY", "BLUE", "SAM", "LODESTONE", "HOME", "FOUND", "SUBSCRIBE"],
    dangerWords: ["TROLL", "FAKE", "PRANK", "COBBLE", "SORRY", "LEFT", "QUIET"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
