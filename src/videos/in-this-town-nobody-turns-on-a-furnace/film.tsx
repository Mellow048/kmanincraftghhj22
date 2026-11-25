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
 * In This Town, Nobody Turns On a Furnace (Snow Golem Parents)
 *
 * Bright daylight Frame-1 Snow Golem hook -> 100% vanilla mechanics comedy ->
 * daytime summer bakery blaze -> selfless melting rescue & joyful rebuild.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-turns-on-a-furnace",
  title: "In This Town, Nobody Turns On a Furnace",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: true },
  // Arena TTS step: record clips (`scripts/narration.py clips in-this-town-nobody-turns-on-a-furnace`),
  // run `narration.py build ... --require-alignment`, `sound.py build ...`, then uncomment:
  // audio: { src: "audio/in-this-town-nobody-turns-on-a-furnace/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["SNOW", "FURNACE", "DAD", "MUM", "PUMPKIN", "SAVE", "SNOWBALL", "GRINS"],
    dangerWords: ["ZERO", "FROST", "FIRE", "TRAP", "MELTING", "FLAMES", "VANISH", "HURT"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
