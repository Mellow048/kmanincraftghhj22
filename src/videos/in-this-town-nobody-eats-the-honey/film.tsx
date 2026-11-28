import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, Nobody Eats the Honey.
 *
 * 48 word-locked cuts (~91s), 4 distinct zones (hall, village, school, meadow),
 * custom zero-z-fighting BeeMob, HoneyJarWall, BeeHiveBox, WoodenSpoon, PoppyFlower,
 * and FlowerRallyRows props, crisp 2D non-blooming captions, and seamless Frame-0 loop.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-eats-the-honey",
  title: "In This Town, Nobody Eats the Honey",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/in-this-town-nobody-eats-the-honey/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["HONEY", "400", "FIRST", "SORRY", "SPOON", "HOME", "FLOWERS", "SUBSCRIBE"],
    dangerWords: ["SWARM", "ANGRY", "STUNG", "POISON", "ONE", "STOPPED", "EMPTY"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
