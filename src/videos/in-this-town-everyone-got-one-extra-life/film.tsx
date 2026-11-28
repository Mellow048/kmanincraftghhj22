import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from "./scene3";
import { scene4 } from "./scene4";
import { scene5 } from "./scene5";
import { scene6 } from "./scene6";

/**
 * In This Town, Everyone Got One Extra Life — Except Me.
 *
 * 49 word-locked cuts (~95s), 4 distinct zones (village, home, shop, canyon),
 * zero-z-fighting custom props (TotemOfUndying, WaterBucket, ClockTower,
 * LavaFountain, MuddyPigPen, GlassJarWing), crisp 2D non-blooming captions,
 * and v11 deterministic actors/camera.
 */
export const film = defineFilm({
  id: "in-this-town-everyone-got-one-extra-life",
  title: "In This Town, Everyone Got One Extra Life — Except Me",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  post: { shaders: "vibrant-day" },
  // After running edge-tts + narration.py build --require-alignment --gap 0.42 + sound.py build:
  audio: { src: "audio/in-this-town-everyone-got-one-extra-life/mix.mp3" },
  captions: {
    words: timing.words,
    y: 0.7,
    motion: "on-beat",
    highlightWords: ["EXTRA", "TOTEMS", "BUCKET", "DAD", "WOOD", "POOL", "TRUST", "SUBSCRIBE"],
    dangerWords: ["ZERO", "FAKE", "LAVA", "CREEPER", "FALL", "ONE", "CLOSED"],
  },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
});
