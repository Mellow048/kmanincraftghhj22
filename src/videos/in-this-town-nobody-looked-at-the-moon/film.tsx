import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * In This Town, Nobody Looked at the Moon
 *
 * A kid tells it. His village lives by night and nobody is allowed to look at the moon; nobody knows why.
 * He looks at it in the water of the well, and it looks back: the moon is an eye, and its stare was the only
 * thing holding the scarecrows in the fields still.
 *
 * A remake of the 19.6-second "Never Look at the Moon" (Topics/InThisTown/reference/moon-20-seconds).
 * STATUS: the script is a draft and is not approved. Only the starter's scene exists. See narration.md.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-nobody-looked-at-the-moon",
  title: "In This Town, Nobody Looked at the Moon",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-nobody-looked-at-the-moon/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-nobody-looked-at-the-moon/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
