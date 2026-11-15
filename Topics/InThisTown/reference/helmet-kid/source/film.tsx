import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, the New Kid Never Took Off His Helmet
 *
 * A horror short, on the owner's outline (Topics/InThisTown/outlines/helmet-kid.md). Kids go missing, and every one
 * of them had been mean to the new kid, who never takes off his helmet. The teller follows him into the woods at
 * night and sees three bullies pull it off: there is no face under it, and what comes out takes all three. Then it
 * hears him. Part 1.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-the-new-kid-never-took-off-his-helmet",
  title: "In This Town, the New Kid Never Took Off His Helmet",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-the-new-kid-never-took-off-his-helmet/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
