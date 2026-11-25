import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, Nobody Turns On a Furnace
 *
 * Snow Golem Parents: bright daylight Frame-1 snow trails & carved pumpkin parents;
 * 100% vanilla snow-golem mechanics (melting near furnaces/fire, 0-damage snowballs);
 * fresh daytime bakery fire rescue climax instead of a night-raider repeat.
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
    highlightWords: ["SNOW", "FURNACE", "DAD", "MUM", "PUMPKIN", "SAVE", "SNOWBALL"],
    dangerWords: ["ZERO", "FROST", "FIRE", "TRAP", "MELTING", "BLAZING", "VANISH"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
