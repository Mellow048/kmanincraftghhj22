import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, Nobody Is Allowed To Be First.
 *
 * 46 word-locked cuts (~90s), 3 distinct zones (DarkOakVillageMap, IslandBridge,
 * Founder Cave), custom FounderSkeleton, FounderCrest & HandTorch props, crisp 2D
 * non-blooming captions, and seamless Frame-0 loop.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-is-allowed-to-be-first",
  title: "In This Town, Nobody Is Allowed To Be First",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/in-this-town-nobody-is-allowed-to-be-first/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["FIRST", "SECOND", "SAM", "CREST", "FOUNDER", "TOGETHER", "SUBSCRIBE"],
    dangerWords: ["NOBODY", "NEVER", "CAVE", "SKELETON", "FEAR", "SCARED", "LAST"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
