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
import { scene12 } from "./scene12";
import { scene13 } from "./scene13";
import { scene14 } from "./scene14";
import { scene15 } from "./scene15";
import { scene16 } from "./scene16";
import { scene17 } from "./scene17";
import { scene18 } from "./scene18";

/**
 * In This Town, We Live at the Bottom
 *
 * A fishing town at the foot of a mountain saves for a gate at the top whose price goes up every year, so nobody at
 * the bottom ever gets up there. Then the teller's mum gets sick, the cure is one golden apple worth eight gold, and
 * there is no gold at the bottom of a mountain. He fishes the town flat, climbs nine thousand steps with eleven years
 * of the town's savings in his bag, and the gate takes the money and refuses the apple. He comes home to find the
 * whole town has fished all night, and the man in the clean coat has bought a year of their catch for one apple —
 * because a year of fish is worth more than an apple. The top did not save his mum. The bottom did.
 *
 * Full cut (18 beats, ~2:40). The narration is the clock: every shot is cut to a line of narration.md, timed by
 * scripts/narration.py. Owner's premise, 2026-11-25; script approved at 2:45 max.
 */
export const film = defineFilm({
  id: "in-this-town-we-live-at-the-bottom",
  title: "In This Town, We Live at the Bottom",
  topic: "in-this-town",
  look: "overworld-day",
  post: { shaders: true },
  audio: { src: "audio/in-this-town-we-live-at-the-bottom/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["TOP", "APPLE", "FISH", "MUM", "GATE", "BOTTOM", "NINE"],
    dangerWords: ["GOLD", "EIGHT", "UP", "SHUT", "NOTHING", "NOBODY"],
  },
  World,
  scenes: [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9,
    scene10, scene11, scene12, scene13, scene14, scene15, scene16, scene17, scene18,
  ],
});
