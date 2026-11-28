import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";

/**
 * The Player Who Never Sleeps (ServerLore)
 *
 * 31 word-locked cuts (~68s), 3 zones (CherryCabinMap, HouseLivingRoomMap,
 * FiftyBedsHall), PhantomMob, DiamondSword, MinecraftBed, dual Up score.
 */
export const film = defineFilm({
  id: "the-player-who-never-sleeps",
  title: "The Player Who Never Sleeps",
  topic: "server-lore",
  look: "lantern-night",
  post: { shaders: "moonlight" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/the-player-who-never-sleeps/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["HUNDRED", "BROTHER", "FIFTY", "BEDS", "ALONE", "SLEPT", "SUBSCRIBE"],
    dangerWords: ["VAMPIRE", "PHANTOMS", "DARK", "SCARED", "MONSTERS", "LEFT"],
  },
  World,
  scenes: [scene1, scene2, scene3],
});
