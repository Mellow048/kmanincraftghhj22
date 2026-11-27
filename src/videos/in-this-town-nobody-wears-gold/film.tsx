import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * In This Town, Nobody Wears Gold
 *
 * A kid wearing Grandpa's dented gold helmet lives in a village ruled by a greedy Mayor who banned gold
 * and sells overpriced iron armor against Piglin raids — until Toby opens the gold vault and proves
 * vanilla Minecraft Piglin lore saves the entire town.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-wears-gold",
  title: "In This Town, Nobody Wears Gold",
  topic: "in-this-town",
  cut: "short",
  audio: { src: "audio/in-this-town-nobody-wears-gold/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["GOLD", "HELMET", "GRANDPA", "TRADE", "PEARLS", "BOOTS", "SUBSCRIBE"],
    dangerWords: ["PIGLINS", "CURSED", "FIFTY", "HUNDRED", "TWENTY", "VANISHED", "TWO", "BLOCKS"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
