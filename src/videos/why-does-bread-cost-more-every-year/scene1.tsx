import type React from "react";
import { Bread, LOAF, MINT, PriceTag, Printer, SAM, STOPS, Sam, clock, ease, flightScene, pop, ramp, timing } from "./kit";

/**
 * THE QUESTION. One person, one thing everybody knows the price of, and the question the film answers.
 *
 * One scene file per BEAT of the script (Topics/Explainer/SCRIPT.md). A scene file holds two things:
 *
 *   ExhibitN   what the beat SHOWS. It is mounted by world.tsx for the whole film, because a camera that
 *              flies away from a thing still sees it. It is driven by the film's clock: it waits in its first
 *              state until its word is said, and keeps its last state afterwards.
 *   sceneN     where the camera GOES: one stop for each line of narration.md, flown to as the line begins.
 *
 * Copy this file to scene2.tsx, scene3.tsx…, add each scene to film.tsx and each exhibit to world.tsx.
 * `npm run check` tells you the next line that has no stop.
 */
export const Exhibit1: React.FC = () => {
  // Seconds since a word was said. Negative before it: so `pop(…, 0)` is 0 until the word, and 1 after.
  const price = clock.useSince("2.loaf", "costs");
  const asks = clock.useSince("1.ask");
  // The machine on the next island is already running when the camera gets there.
  const printing = clock.useSince("1.ask");
  return (
    <>
      <Sam position={SAM} rotationY={0.5} animation="idle" blendTo="shrug" blend={1 - ease(ramp(asks, 0.3, 0.7))} face={price > 0 ? "wow" : "uneasy"} lookAt={price > 0 ? [LOAF[0], LOAF[1] + 0.3, LOAF[2]] : undefined} />
      <Bread position={LOAF} rotationY={-0.3} scale={2} />
      <PriceTag text="2" position={[LOAF[0] + 0.1, LOAF[1] + 1.5, LOAF[2] + 0.1]} rotationY={-0.2} scale={pop(price, 0) * 1.25} swing={Math.sin(price * 5) * 0.12 * Math.exp(-Math.max(0, price) * 1.5)} />
      <Printer position={MINT} rotationY={0.35} out={Math.max(0, printing) * 3} />
    </>
  );
};

export const scene1 = flightScene(timing, {
  id: "scene1",
  title: "The question",
  // Scene 1 opens the film: `from` is where the first frame is. For scene 2 it is the LAST stop of scene 1.
  from: STOPS.open,
  shots: [
    {
      cue: "1.ask",
      to: STOPS.sam,
      note: "TODO. The question, on the face of the person it is a problem for. Fly in from the whole island to Sam: small world, then one man.",
    },
    {
      cue: "2.loaf",
      to: STOPS.loaf,
      note: "TODO. The one thing everybody knows the price of, and its price, popping on as the word is said. Every later number is measured against this one.",
    },
  ],
});
