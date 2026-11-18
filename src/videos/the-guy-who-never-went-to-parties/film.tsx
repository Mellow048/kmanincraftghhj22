import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * The Guy Who Never Went To Parties
 *
 * A kid in a town where everybody parties every night and nobody has ever eaten cooked food. He
 * wants to be a cook; the reason nobody else does is that you cannot want a thing you have never had.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * This is the three-minute cut (18 beats): no `cut:` line, so the topic's `film` limits apply (150-178 s).
 * 668 words at 255 a minute is 2:37, and 76 shots is a cut every 1.7 s - the montage carries the pace.
 */
export const film = defineFilm({
  id: "the-guy-who-never-went-to-parties",
  title: "The Guy Who Never Went To Parties",
  topic: "in-this-town",
  look: "overworld-day",
  // The delivered first render was 75/76 shots of near-black night; the rebuild is three bright
  // colour acts. 0.82 brings them back to the reference film's exposure instead of blowing the
  // warm kitchen walls to white.
  post: { exposure: 0.82 },
  // THE VOICE. Timed from the real audio (scripts/narration.py build). Swapped for the mix once
  // scripts/sound.py build has made it.
  audio: { src: "audio/the-guy-who-never-went-to-parties/mix.mp3" },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/the-guy-who-never-went-to-parties/mix.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/the-guy-who-never-went-to-parties/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
