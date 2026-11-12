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
import { scene9 } from "./scene9";
import { scene10 } from "./scene10";
import { scene11 } from "./scene11";
import { scene12 } from "./scene12";
import { scene13 } from "./scene13";
import { scene14 } from "./scene14";

/**
 * IN THIS TOWN, NOBODY LOOKED AT THE MOON
 *
 * A kid tells it. His village lives by night, under hats as wide as doors, and nobody is allowed to look at
 * the moon; nobody knows why. He pushes the lid off the well and looks at it in the water, and it looks back:
 * the moon is an eye, and its stare was the only thing holding the scarecrows in the fields still.
 *
 * A remake, at full length, of the 19.6-second "Never Look at the Moon" (Topics/InThisTown/reference/moon-20-seconds).
 * The owner approved the script on 2026-11-11: "yes go i trust you on making it" (see narration.md).
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 * It is the topic's short cut (`cut: "short"`): 14 beats, 63 shots, 1:52.
 *
 * Three things to know before touching a scene:
 *   1. The film lies on ONE LINE, north to south (PLACE in kit.tsx), and the moon is in the south.
 *   2. The sky is directed in ONE PLACE: `skyAt()` in kit.tsx says, for every shot, what the moon is staring at,
 *      which doors are open, how far the lid has been pushed and where the scarecrows are. world.tsx draws it.
 *   3. Under a hat as wide as a door, a face is only seen from below the brim. Keep the lens under the chin.
 */
export const film = defineFilm({
  id: "in-this-town-nobody-looked-at-the-moon",
  title: "In This Town, Nobody Looked at the Moon",
  topic: "in-this-town",
  cut: "short",
  look: "lantern-night",
  // Voice, music, air and effects, mixed by `python3 scripts/sound.py build` from sound.json.
  // narration.mp3 beside it is the voice alone: the mix is built from it, so never point this at it again.
  audio: { src: "audio/in-this-town-nobody-looked-at-the-moon/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7,
    scene8, scene9, scene10, scene11, scene12, scene13, scene14,
  ],
});
