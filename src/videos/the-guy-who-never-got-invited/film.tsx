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

/**
 * THE GUY WHO NEVER GOT INVITED — 1:52, 1080x1920, 30 fps.
 *
 * A recreation of the "while they're out partying" / sigma-grindset meme, built on the owner's own
 * reel skeleton: HUS HUS HUS, rewind, the party he is not at, the dream, the egg, the montage, the
 * job, the friends walking in, one word, button.
 *
 * He is a kid in a country town who has never once been let into a party, and who spends four years
 * learning to mix records in his bedroom because a kid told him to put on his phone instead. Nobody
 * in the film ever sees him practise. When the three boys who never invited him walk into the club he
 * now runs, one of them shouts how good the DJ is and asks him how he got this good. He says one word:
 * "Bedroom." They cheer for the music and never for the answer, and he does not smile.
 *
 * Not a story film: there is no narrator. Eight lines of dialogue, placed by
 * scripts/dialogue-timing.py inside a cut of my own, and the joke is the size of the answer.
 */
export const film = defineFilm({
  id: "the-guy-who-never-got-invited",
  title: "The Guy Who Never Got Invited",
  topic: "meme-shorts",
  look: "overworld-night",
  post: { shaders: true },
  audio: { src: "audio/the-guy-who-never-got-invited/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11],
});
