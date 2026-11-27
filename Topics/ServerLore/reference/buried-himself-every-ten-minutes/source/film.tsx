import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";

/**
 * The Player Who Buried Himself Every Ten Minutes
 *
 * Wholesome 7-beat Server Lore story: every 10 minutes Milo buries himself in a 3-block dirt hole —
 * bullies pour lava on top until the Server Owner discovers Milo is rocking his crying baby sister
 * while Mom works night shifts, rallying the whole server to build Iron-Golem Safe Booths overnight.
 */
export const film = defineFilm({
  id: "the-player-who-buried-himself-every-ten-minutes",
  title: "The Player Who Buried Himself Every Ten Minutes",
  topic: "server-lore",
  audio: { src: "audio/the-player-who-buried-himself-every-ten-minutes/mix.mp3" },
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  captions: {
    words: timing.words,
    y: 0.72,
    motion: "on-beat",
    highlightWords: ["MILO", "TEN", "MINUTES", "OWNER", "SAFE", "BOOTHS", "GOLEM", "HEARTS", "SUBSCRIBE"],
    dangerWords: ["BULLY", "LAVA", "LOST", "CRYING", "SORRY", "FROZE"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4],
});
