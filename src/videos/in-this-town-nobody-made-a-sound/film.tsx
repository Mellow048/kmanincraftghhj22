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
 * In This Town, Nobody Made a Sound
 *
 * A town floored in wool, a school that is only signs, and a bell nobody is allowed to ring. The one kid who cannot
 * stop hiccupping is sure the silence is for his sake. It is not: the town rings the bell every night so that the
 * thing under it knows the town is still here — and he is the one it hears best.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut. The voice is recorded and built (86.5 s, 51 shots, 244 words a minute).
 */
export const film = defineFilm({
  id: "in-this-town-nobody-made-a-sound",
  title: "In This Town, Nobody Made a Sound",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  // The shader chain (painted sky and sun, bloom, tone mapping, grade): the owner asked for it on every film from
  // 2026-11-17 on. Read "With the shaders on" in Topics/InThisTown/PACK.md before lighting a shot.
  post: { shaders: true },
  // The voice, until the sound is built (scripts/sound.py build): then this line becomes the mix, and `npm run check`
  // holds the finished film to its mix.
  audio: { src: "audio/in-this-town-nobody-made-a-sound/narration.mp3" },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [
    scene1,
    scene2,
    scene3,
    scene4,
    scene5,
    scene6,
    scene7,
    scene8,
    scene9,
    scene10,
    scene11,
    scene12,
    scene13,
    scene14,
  ],
});
