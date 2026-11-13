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

/**
 * In This Town, Everyone Could Sell Their Feelings
 *
 * A kid who sells his fear to chase a lemonade dream learns fear wasn't stopping him — it was standing watch for him.
 * The witch's shop promised any feeling for a price; his yellow fear plinked into glass, and at close he found it still watching the road he never watched.
 * Greedy man warning: sell everything and you have no one left to copy.
 */
export const film = defineFilm({
  id: "in-this-town-everyone-could-sell-their-feelings",
  title: "In This Town, Everyone Could Sell Their Feelings",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-everyone-could-sell-their-feelings/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14],
});
