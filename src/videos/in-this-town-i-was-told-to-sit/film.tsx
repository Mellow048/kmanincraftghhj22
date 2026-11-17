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

/**
 * In This Town, I Was Told to Sit
 *
 * A dog sits on one spot in the middle of a town. His owner said one word four hundred days ago and walked into the
 * forest, and the town was built round the dog since: a farmer puts a loaf on his head every morning, a creeper stands
 * next to him at night, a parrot does the creeper's hiss, and there is a sign he cannot read and we can. His owner
 * left a bed, a chest of bones, a ring of torches and a bad roof, and the dog thinks he was forgotten with them. On
 * day four hundred two players walk in, open the chest and lift an axe over the bed. A sitting dog does not bite. So
 * he stands up, for the first time, on legs that have forgotten how; the parrot's hiss fools nobody; the real creeper
 * behind them does. Then the bed lights up and his owner is standing on it with nothing: the only way a player comes
 * back. The bed was how he got home, and "sit" was to keep the dog out of where he was going. The sign says: do not
 * move him, he is waiting. It ends on the word he has waited four hundred days for.
 *
 * Built on what Monster Village part 1 does (Topics/InThisTown/reference/monster-village/README.md, "Studied again"):
 * a first shot that keeps changing, a teller who is wrong out loud, the viewer ahead of him, players arriving at 40%,
 * the clues said back as a list, a second truth, and an ending that opens. None of its story is used.
 * An "In This Town" film: the recorded narration is the clock, and every line of narration.md is one shot.
 */
export const film = defineFilm({
  id: "in-this-town-i-was-told-to-sit",
  title: "In This Town, I Was Told to Sit",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-i-was-told-to-sit/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10],
});
