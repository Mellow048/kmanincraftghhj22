import { cam } from "../../engine";
import { Booth, Friend, Him, stagedScene } from "./kit";

/**
 * BEAT 10 — THE WORD. The whole film is built to sell one word.
 *
 * The mix drops away so it can be heard, he says "Bedroom." without looking at them, and the needle
 * comes down and the room explodes — they cheer for the music, never for the answer, and he does not
 * smile. That is the meme, in eight seconds.
 */
export const scene10 = stagedScene("scene10", [
  {
    id: "10.word",
    ...cam.push({ on: [-1.0, 1.46, -2.98], dist: 2.8, to: 2.3, fov: 36, yaw: -12, pitch: 2 }),
    zone: "club",
    look: "prom-night",
    note: "Half his face lit, eyes on the record and not on them: the word is not a boast, it is a fact he has decided to share.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={1.2} arm={0.8} lit={0.5} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0.12} animation="talk" face="blank" headphones="neck" headPitch={0.12} />
      </>
    ),
  },
  {
    id: "10.slam",
    ...cam.push({ on: [-0.25, 1.05, 0.35], dist: 5.4, to: 4.3, fov: 52, yaw: 22, pitch: 12 }),
    zone: "club",
    look: "prom-night",
    note: "The needle comes down hard and the whole room goes up: the answer is buried instantly under the thing he is actually good at.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={6.4} arm={1} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0} animation="cheer" face="blank" headphones="neck" />
        <Friend v={0} position={[0.9, 0, 1.0]} rotationY={2.4} animation="cheer" face="laugh" />
        <Friend v={1} position={[1.6, 0, 1.7]} rotationY={-2.2} animation="cheer" face="laugh" />
        <Friend v={2} position={[-0.2, 0, 2.2]} rotationY={3.0} animation="laugh" face="laugh" />
      </>
    ),
  },
  {
    id: "10.noface",
    ...cam.push({ on: [-1.0, 1.42, -2.9], dist: 3.0, to: 2.5, fov: 38, yaw: 15, pitch: 4 }),
    zone: "club",
    look: "prom-night",
    note: "Alone in the booth with the room going off around him, and no smile at all: he won the argument nobody knew they were having.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={6.0} arm={1} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0.25} animation="idle" face="blank" headphones="neck" />
      </>
    ),
  },
]);
