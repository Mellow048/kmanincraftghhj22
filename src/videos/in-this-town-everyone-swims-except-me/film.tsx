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
 * REMASTER (2026-11-15): the script, the voice and the timing are the first build's; every shot is new.
 * The first build ran every shot through a wrapper that pushed the lens back to 3.9 m and up to eye line,
 * which is why it was a film of small figures in the middle of a pool. That wrapper is gone: each shot
 * here is framed by hand, on the thing the line is about.
 *
 * SECOND PASS (same day, the owner's notes): the stranger is a villager in a black suit, the size of a villager;
 * the loose ring is a plain gold ring, and WORN it is one yellow stripe on the arm with three dots; a small word
 * (MAX / MEDIUM / LOW) bounces up when a dot lights and is gone 1.2 s later; the arena has trees and roofs round it;
 * and the ending has his line "Well, at least I'm second. I've never been second.", then "This is going to be a
 * problem.", one second of air, and the subscribe line. The film's first voice was not the owner's chosen one, and
 * the new line could not be said in it, so the whole narration is re-recorded in `voice-03` (tempo 1.42).
 */
export const film = defineFilm({
  id: "in-this-town-everyone-swims-except-me",
  title: "In This Town, Everyone Swims Except Me",
  topic: "in-this-town",
  cut: "middle",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-everyone-swims-except-me/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8],
});
