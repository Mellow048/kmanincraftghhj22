import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * __TITLE__
 *
 * A SERVER LORE FILM (Topics/ServerLore):
 * Read Topics/ServerLore/README.md + docs/VIRAL-DIRECTION-MANUAL.md before expanding scenes.
 *
 * Pillars:
 *   1. 7-beat wholesome SMP mystery -> IRL secret reveal -> Owner (!) rally -> Minecraft fix -> story CTA.
 *   2. 3D world-space SMP UI (`ServerPlayer` nametags, `ServerChatBox`, `ScoreboardWall`, `Clock3AM`).
 *   3. Two-track Up soundtrack switching per mood section via `Topics/ServerLore/SOUND.md`:
 *      `up_happy.m4a` (trimmed cleanly past 0:01 -> 0:02+, boosted) & `up_sad.m4a` (boosted).
 */
export const film = defineFilm({
  id: "__ID__",
  title: "__TITLE__",
  topic: "__TOPIC__",
  look: "overworld-golden",
  post: { shaders: true },
  // Sound pipeline:
  //   1. `python3 scripts/narration.py build __ID__` -> audio: { src: "audio/__ID__/narration.mp3" }
  //   2. `python3 scripts/sound.py draft __ID__ && python3 scripts/sound.py build __ID__`
  //      -> audio: { src: "audio/__ID__/mix.mp3" }
  captions: {
    words: timing.words,
    y: 0.67,
    motion: "on-beat",
    highlightWords: ["OWNER", "HEART", "THREE", "LIGHT", "FRIEND", "SUBSCRIBE"],
    dangerWords: ["GRIEFER", "WORST", "LAVA", "GONE", "EMPTY", "QUIT"],
  },
  World,
  scenes: [scene1],
});
