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

/**
 * In This Town, I Was a Spy for the Villagers (part one)
 *
 * The pillagers raid the town every month, so the town sends a spy: the one boy who did not step back. He gets
 * into the outpost, takes a coat off the washing line, rolls in the ash of the fire to go grey, and stands in
 * their line. He finds the plan (tomorrow, before sunrise, the bell first), is caught climbing out, and is not
 * punished but handed the banner: he must lead the raid on his own town. So he turns left all night, and at
 * sunrise the pillagers wreck their own outpost. Then it rains, the ash runs off his face, and he runs.
 *
 * The owner's outline is the first lines and the sneaking in; everything after it is listed at the top of
 * narration.md. An "In This Town" film (Topics/InThisTown): the recorded narration is the clock.
 *
 * The cues are numbered by the 14 beats of the script; the scene files group them by place.
 */
export const film = defineFilm({
  id: "in-this-town-i-was-a-spy-for-the-villagers",
  title: "In This Town, I Was a Spy for the Villagers",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-i-was-a-spy-for-the-villagers/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
