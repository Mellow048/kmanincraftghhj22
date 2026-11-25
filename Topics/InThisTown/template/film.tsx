import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * TODO: the film in three sentences. Who tells it, the rule nobody explains, what the rule was hiding.
 *
 * An "In This Town" film (Topics/InThisTown): the recorded narration is the clock, and every line of
 * narration.md is one shot. Read Topics/InThisTown/README.md before changing anything here.
 *
 * `cut: "short"` is the one-to-two-minute cut (14 beats). Delete the line for the three-minute cut (18 beats).
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "__TOPIC__",
  __CUT_LINE__
  look: "overworld-day",
  // Remastered shader chain: `true` uses the remastered `cinematic` defaults (painted sky, vibrance, bloom,
  // aspect-safe vignette). Or pass a preset: "vibrant-day" | "warm-sunset" | "moonlight" | "horror-noir".
  post: { shaders: true },
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/__ID__/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/__ID__/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  // Captions sit at y=0.67 (high enough to clear phone UI; flash danger/hook words in red & gold).
  // Use dangerWords + highlightWords tailored to your story's stakes!
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["CREEPER", "ENDERMAN", "SECRET", "SAVE"],
    dangerWords: ["ALONE", "BURN", "RUN", "TRAP", "NEVER", "ZERO"],
  },
  World,
  scenes: [scene1],
});
