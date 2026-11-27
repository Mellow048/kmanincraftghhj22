import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * A REMASTERED EXPLAINER FILM (Topics/Explainer):
 * Read Topics/Explainer/STUDY-NAPOLEON-EXPLAINER.md before adding scenes.
 *
 * Core pillars:
 *   1. Distinct channel cast: CitizenLead (Miles) vs EliteLead (Sterling) — NEVER InThisTown Hero/Villager.
 *   2. Fast story cuts (`storyScene`, ~1.1–1.9s median cut) across grounded detailed <Zone> sets.
 *   3. Composite multi-part props (DetailedBookshelf, RuleBoard, Crown, BallotBox, StoneBillboard) — zero bare box props.
 *   4. Cold-open climax (Frame 0) -> 8 beats -> seamless mid-sentence loop ("..., and that's").
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "__TOPIC__",
  look: "overworld-day",
  post: { shaders: true },
  // Sound, in two steps:
  //   voice recorded (scripts/narration.py build __ID__): audio: { src: "audio/__ID__/narration.mp3" },
  //   sound mix built (scripts/sound.py build __ID__):    audio: { src: "audio/__ID__/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["CROWN", "VOTE", "POWER", "EMERALD", "KING", "EMPEROR"],
    dangerWords: ["EMPTY", "WAR", "BROKE", "TRAP", "NEVER", "ZERO", "CHAOS"],
  },
  World,
  scenes: [scene1],
});
