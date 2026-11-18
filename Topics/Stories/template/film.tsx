import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * A __TOPIC__ film. The recorded narration is the clock. Read __TOPIC_FOLDER__/README.md
 * for the topic's script and cut; the shared staging study is not the premise.
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "__TOPIC__",
  __CUT_LINE__
  look: "overworld-day",
  // Sound, in two steps. Add the line when its file exists:
  //   the voice is recorded (scripts/narration.py build):   audio: { src: "audio/__ID__/narration.mp3" },
  //   the sound is built (scripts/sound.py build):          audio: { src: "audio/__ID__/mix.mp3" },
  // A finished film plays the mix. `npm run check` fails one that does not.
  post: { shaders: true },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1],
});
