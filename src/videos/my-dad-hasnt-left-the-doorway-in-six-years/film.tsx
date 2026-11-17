import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scenes } from "./scenes";

/**
 * MY DAD HASN'T LEFT THE DOORWAY IN SIX YEARS
 *
 * A mob will not path through a one-block gap with a player standing in it. So a man stood in his own front
 * door every night for six years, and his son grew up behind him. The thing he carries, and never spends, is a
 * wooden sword with one hit left.
 *
 * A STORIES film (Topics/Stories): the recorded narration is the clock, every line of narration.md is one shot,
 * cuts are fast and the camera is allowed to jump — that is what the reference does, and the reference is the
 * reason the topic exists. Read Topics/Stories/REFERENCE-STUDY.md before changing anything here.
 */
export const film = defineFilm({
  id: "my-dad-hasnt-left-the-doorway-in-six-years",
  title: "My Dad Hasn't Left The Doorway In Six Years",
  topic: "stories",
  look: "lantern-night",
  post: { shaders: { bloom: 0.42, threshold: 1.35 }, exposure: 1.16 },
  captions: { words: timing.words, y: 0.72 },
  audio: { src: "audio/my-dad-hasnt-left-the-doorway-in-six-years/mix.mp3" },
  World,
  scenes: [scenes],
});
