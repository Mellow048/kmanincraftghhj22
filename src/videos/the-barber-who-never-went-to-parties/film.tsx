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

/**
 * The Barber Who Never Went to Parties
 *
 * A boy skips every party in town for a year to learn to cut hair, on mops, a hedge, the dog and his dad. Then the
 * friends who called him weird fall through the door of the busiest barbershop in town an hour before a party, with
 * a head only he can fix. The film opens on that haircut, and goes back.
 *
 * A "Recreation" film (Topics/Recreation): real life, played by block people. Nothing in it is from the game. The
 * recorded voices are the clock, and every line of narration.md is one shot, or several with `cut:`.
 */
export const film = defineFilm({
  id: "the-barber-who-never-went-to-parties",
  title: "The Barber Who Never Went to Parties",
  topic: "recreation",
  look: "overworld-day",
  // The shader chain: the owner asked for it on every film from 2026-11-17 on.
  post: { shaders: true },
  audio: { src: "audio/the-barber-who-never-went-to-parties/mix.mp3" },
  captions: { words: timing.words, y: 0.72, motion: "on-beat" },
  World,
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6, scene7],
});
