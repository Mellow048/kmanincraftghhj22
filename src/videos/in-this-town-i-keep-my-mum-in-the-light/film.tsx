import { defineFilm } from "../../engine";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";
import { World } from "./world";
import { timing } from "./shared";

/**
 * IN THIS TOWN, I KEEP MY MUM IN THE LIGHT — 91.5 seconds, 1080×1920, 30 fps, 46 shots.
 *
 * Her name is not in the film because nobody in the town uses it. He keeps his mum in the light because in this town
 * a spider in the light does nothing at all, and in the dark it does what it likes. He tries candles, a lantern on a
 * string and a block of glowstone he trades everything for, and the light costs him three nights of sleep. Then the
 * phantoms come, the street goes dark, and he does the one thing that was never on his list: he stands still.
 *
 * The voice is the clock: narration.md → narration.mp3 → timing.json → storyScene(). Sound sheet: sound.json,
 * built to mix.mp3 by scripts/sound.py.
 */
export const film = defineFilm({
  id: "in-this-town-i-keep-my-mum-in-the-light",
  title: "In This Town I Keep My Mum in the Light",
  fps: 30,
  width: 1080,
  height: 1920,
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: true },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  audio: { src: "audio/in-this-town-i-keep-my-mum-in-the-light/mix.mp3" },
  fadeIn: 0.35,
  fadeOut: 0.7,
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
