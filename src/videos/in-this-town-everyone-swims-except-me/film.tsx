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

/**
 * In This Town, Everyone Swims Except Me
 *
 * A kid who cannot swim trains for the town's summer race, because the trophy is as big as his head.
 * A silent stranger in the woods gives him a ring with three buttons. He presses one and becomes fast —
 * fast enough for second place, which is exactly when he sees the ring on the winner's hand.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "in-this-town-everyone-swims-except-me",
  title: "In This Town, Everyone Swims Except Me",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-everyone-swims-except-me/narration.mp3" },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/in-this-town-everyone-swims-except-me/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/in-this-town-everyone-swims-except-me/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
