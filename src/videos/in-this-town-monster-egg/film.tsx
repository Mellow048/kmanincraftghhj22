import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";

/** Broken Egg: one continuous neighborhood → school world, 20s @ 30fps. */
export const film = defineFilm({
  id: "in-this-town-monster-egg",
  title: "In This Town: The Broken Egg",
  fps: 30,
  width: 720,
  height: 1280,
  look: "town-day",
  post: { exposure: 1.09, bloom: 1.15 },
  fadeOut: 0.35,
  audio: { src: "audio/in-this-town-monster-egg/bed.mp3", volume: 0.8 },
  // One human-scale thought per cue; the sound bed is original procedural audio.
  // The raw takes vary by ~16 dB. Balance them here, not by making the bed
  // inaudible: all narration now targets ~-24 dBFS RMS over its full clip.
  audioCues: [
    { src: "audio/in-this-town-monster-egg/01-rule.mp3", at: 0.04, volume: 5 },
    { src: "audio/in-this-town-monster-egg/02-broken.mp3", at: 2.51, volume: 4 },
    { src: "audio/in-this-town-monster-egg/03-comparison-short.mp3", at: 4.02, volume: 0.75 },
    { src: "audio/in-this-town-monster-egg/05-rejection.mp3", at: 8.43, volume: 5 },
    { src: "audio/in-this-town-monster-egg/06-fire.mp3", at: 11.45, volume: 5 },
    { src: "audio/in-this-town-monster-egg/07-rescue.mp3", at: 13.68, volume: 0.8 },
    { src: "audio/in-this-town-monster-egg/08-stands.mp3", at: 17.20, volume: 5 },
  ],
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5],
});
