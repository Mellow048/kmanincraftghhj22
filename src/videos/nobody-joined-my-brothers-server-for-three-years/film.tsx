import { defineFilm } from "../../engine";
import { timing } from "./kit";
import { World } from "./world";
import { scene1 } from "./scene1";

/**
 * Nobody Joined My Brother's Server For Three Years
 *
 * A boy has kept his brother's Minecraft server alive for three years on his own — one block a
 * night on a castle nobody is building — and the film is about the Friday the list finally moves.
 *
 * A STORY (Topics/Stories), cut on the voice: 26 lines, cut into 34 shots, so the film cuts about
 * every two seconds. The hook is a number that does not make sense (one player online, for three
 * years, on a server nobody joins), and the payoff is not that the brother comes back — it is that
 * he had been watching the whole time, and says so, and finishes his own castle.
 *
 * The first film made with the shader chain on (`post.shaders`): bloom on the torches, shafts
 * through the dust. Nothing already delivered changes — this film opts in.
 */
export const film = defineFilm({
  id: "nobody-joined-my-brothers-server-for-three-years",
  title: "Nobody Joined My Brother's Server For Three Years",
  topic: "stories",
  cut: "story",
  look: "overworld-night",
  post: {
    // Cold moonlight on three years of night, and the warm grade only for the last two shots.
    shaders: { warmth: 0.85, saturation: 1.28, shafts: 0.3, bloom: 0.6, lift: 0.05 },
  },
  // The mix: the recorded voice, music, and one effect for everything that happens on screen
  // (scripts/sound.py build). Point this back at narration.mp3 to check a cut against the bare voice.
  audio: { src: "audio/nobody-joined-my-brothers-server-for-three-years/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1],
});
