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
 * In This Town, I Have Never Seen My Mum's Face
 *
 * An overworld town of endermen and one kid, carried home as a baby by his enderman dad. If he looks his mum in the
 * eyes she screams; she cannot help it. So he knows her by her knees, looks at his shoes in the family photo, and has
 * drawn her face from two purple dots and a guess. Then six players come at night for ender pearls, with carved
 * pumpkins on their heads, and stare straight at the town without setting anyone off. He cannot fight six players.
 * But a pumpkin has very small eye holes: he runs up behind them and knocks all six off, the whole town screams, and
 * the players run. He puts one of the pumpkins on, walks home, finds her knees and looks up. Half a second with
 * nothing said. His mum has purple eyes, and she was already looking at him.
 *
 * Built on the Monster Village recipe (Topics/InThisTown/reference/monster-village/README.md): famous mobs in frame
 * one, "I" in line one, the family by second ten, players as the danger, and true Minecraft facts as the jokes and
 * the plot. A whole story in one film, cut to the shape of "Everyone Runs Away From Me": no cliffhanger, no part two.
 * An "In This Town" film: the recorded narration is the clock.
 */
export const film = defineFilm({
  id: "in-this-town-i-have-never-seen-my-mums-face",
  title: "In This Town, I Have Never Seen My Mum's Face",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-i-have-never-seen-my-mums-face/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
