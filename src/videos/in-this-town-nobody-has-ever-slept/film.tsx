import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { scene7 } from "./scene7";
import { scene8 } from "./scene8";
import { scene9 } from "./scene9";
import { scene10 } from "./scene10";
import { scene11 } from "./scene11";

/**
 * In This Town, Nobody Has Ever Slept
 *
 * Everybody works nonstop in a Nether basalt lane under eternal amber glowstone until a kid discovers
 * beds explode here—only to learn from Old Wick that an extinguished Overworld portal is why everyone
 * forgot how to stop.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-has-ever-slept",
  title: "In This Town, Nobody Has Ever Slept",
  topic: "in-this-town",
  cut: "short",
  look: "lava-shore",
  post: { shaders: true },
  audio: { src: "audio/in-this-town-nobody-has-ever-slept/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["SLEEP", "BED", "GLOWSTONE", "LAVA", "PORTAL", "DOOR", "STOPPED", "MORNING"],
    dangerWords: ["LOCKED", "EXPLODE", "BURNT", "ROOF", "ASH", "COLD", "ALONE", "NEVER"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11],
});
