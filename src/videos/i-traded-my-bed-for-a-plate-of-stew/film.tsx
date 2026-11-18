import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scenes } from "./scenes";

/**
 * I TRADED MY BED FOR A PLATE OF STEW
 *
 * A DEADPAN film (Topics/Deadpan). In this village a trade is binding for both sides, and anything that touched the
 * traded item is part of the deal. He traded his bed for a cold plate of stew; by Saturday the villager owned his
 * arm, his legs and his mouth. The receipt he never read buys it all back — and hands over his debt.
 *
 * The camera rule of the topic: the camera goes to the noun. `look()` points it at a prop, `face()` at the teller.
 */
export const film = defineFilm({
  id: "i-traded-my-bed-for-a-plate-of-stew",
  title: "I Traded My Bed For A Plate Of Stew",
  topic: "deadpan",
  look: "warm-room",
  post: { shaders: { bloom: 0.16, threshold: 1.9 }, exposure: 1.02 },
  captions: { words: timing.words },
  audio: { src: "audio/i-traded-my-bed-for-a-plate-of-stew/mix.mp3" },
  World,
  scenes: [scenes],
});
