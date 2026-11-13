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
 * What If You Could See Who Had a Crush on You
 *
 * One morning a boy can see a pink heart over the head of anybody who has a crush, and a heart grows when the one it
 * is for comes close. He uses it to find out whether Mia's small heart is for him, and twice he watches it swell with
 * him standing right behind her: in the lunch line, and at the dance. Both times it was for the tall kid standing
 * behind HIM. The biggest heart in the school was his best friend Jo's, and it had never been big: it had only ever
 * been near him.
 *
 * The rule that every picture keeps: a heart changes size only when the one it is for moves. Jo's is `joHeart(metres
 * from him)` in every shot she is in (kit.tsx), so the answer is on screen from the first second.
 *
 * A "WHAT IF" film (Topics/WhatIf): a kid gets one impossible power and tells what happened. The recorded
 * narration is the clock, and every line of narration.md is one shot. Read Topics/WhatIf/README.md before
 * changing anything here.
 *
 * This is the one-to-two-minute film. `cut: "long"` is the three-minute one.
 */
export const film = defineFilm({
  id: "what-if-you-could-see-who-had-a-crush-on-you",
  title: "What If You Could See Who Had a Crush on You",
  topic: "what-if",
  look: "overworld-day",
  // Voice, music, the air of each place and an effect for each thing that happens: sound.json, built by
  // `python3 scripts/sound.py build what-if-you-could-see-who-had-a-crush-on-you`. Change a word or a cut: build it again.
  audio: { src: "audio/what-if-you-could-see-who-had-a-crush-on-you/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11, scene12, scene13, scene14],
});
