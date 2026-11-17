import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/**
 * In This Town, I Had Never Seen the Sun
 *
 * A zombie kid lives in a town under the trees where everybody goes to bed at sunrise and nobody looks. He runs out
 * once and comes back on fire. Then he finds a dented iron hat, and he has one day in colour, with a bar over his
 * head that only goes down. The hat breaks, he is stuck in a pond at noon, and the rain lets him out: the thing his
 * grandpa always called the good weather. The kid from the day town has never seen the stars, for the same reason.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of narration.md is
 * one shot. The story, the hooks and what is planted are in narration.md; the pictures are in STORYBOARD.md.
 *
 * `post: { shaders: true }` is the owner's instruction of 2026-11-17 for every film from this one on
 * (Topics/Shared/SHADERS.md): the painted sky and its sun, bloom, and the grade.
 */
export const film = defineFilm({
  id: "in-this-town-i-had-never-seen-the-sun",
  title: "In This Town, I Had Never Seen the Sun",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-night",
  post: { shaders: true },
  audio: { src: "audio/in-this-town-i-had-never-seen-the-sun/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
