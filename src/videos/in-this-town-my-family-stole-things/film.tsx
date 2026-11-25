import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, My Family Stole Things
 *
 * A fox kid tells how he took one red flower out of a cup on a windowsill — the one thing in that town that was a
 * present — and found out the boy in the window had been buying his town back from the family, a berry at a time. The
 * rule nobody explains is the family's own: take one thing, and nothing anybody is holding. What it was hiding is that
 * a gift is the one thing a thief can never put back.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-my-family-stole-things",
  title: "In This Town, My Family Stole Things",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // Remastered shader chain, per the owner's instruction of 2026-11-17: `true` keeps the cinematic defaults.
  post: { shaders: true },
  audio: { src: "audio/in-this-town-my-family-stole-things/mix.mp3" },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-my-family-stole-things/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-my-family-stole-things/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  // Captions sit at y=0.67 (high enough to clear phone UI; flash danger/hook words in red & gold).
  // Use dangerWords + highlightWords tailored to your story's stakes!
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["FLOWER", "PRESENT", "TRADING", "BERRY", "BOOTS"],
    dangerWords: ["DOGS", "NOON", "RAN", "WORST"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
