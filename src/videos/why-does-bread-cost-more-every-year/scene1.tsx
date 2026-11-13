import type React from "react";
import { CHEST, HOME_KID, Icon, NOW, ROBE, STOPS, Villager, You, clock, ease, flightScene, ramp, timing } from "./kit";

/**
 * BEAT 1 — THE QUESTION. One kid, one stall, and the question the film answers.
 *
 * A scene file holds two things:
 *   ExhibitN   what the beat SHOWS. world.tsx mounts it for the whole film, because a camera that flies away from
 *              a thing still sees it. It is driven by the film's clock: it waits in its first state until its
 *              word is said, and keeps its last state afterwards.
 *   sceneN     where the camera GOES: one stop for each line of narration.md, flown to as the line begins.
 *
 * This exhibit is the two people of the stall: you, and the baker. Everything they do in the film is here.
 */
export const Exhibit1: React.FC = () => {
  const ask = clock.useSince("1.ask");
  const today = clock.useSince("2.loaf");
  const two = clock.useSince("2.loaf", "two");
  // The question mark is there on the first frame: that frame is the film's poster.
  const question = today < 0 ? 1 + 0.25 * Math.max(0, 1 - ask / 0.25) : 1 - ease(ramp(today, 0, 0.18));
  // He shrugs at the question, and lets the shrug go when the answer starts.
  const shrug = 1 - ease(ramp(today, 0.05, 0.4));
  // While the film is away (from the village on) he goes home: the answer finds him beside his chest.
  const away = clock.useSince("4.village");
  const chest = clock.useSince("7.chest", "chest");
  const less = clock.useSince("7.chest", "less");
  const subscribe = clock.useSince("7.sub", "subscribe");
  const lift = ease(ramp(subscribe, -0.05, 0.25));
  return (
    <>
      {away < 1 ? (
        <You
          position={NOW.kid}
          rotationY={0.3 - 0.55 * ease(ramp(today, 0.1, 0.5))}
          animation="idle"
          blendTo="shrug"
          blend={1 - shrug}
          face={two > 0 ? "wow" : today > 0.2 ? "calm" : "uneasy"}
          saccade={false}
          gaze={0}
          lookAt={today > 0.25 ? [NOW.loaf[0], NOW.loaf[1] + 0.6, NOW.loaf[2]] : undefined}
        />
      ) : (
        <You
          position={HOME_KID}
          rotationY={0.55 - 0.75 * lift}
          animation="idle"
          blendTo="lift"
          blend={1 - lift}
          face={subscribe > 0 ? "grin" : less > 0 ? "uneasy" : chest > 0 ? "smile" : "calm"}
          saccade={false}
          gaze={0}
          lookAt={chest > -0.2 && subscribe < 0 ? [CHEST[0] + (less > 0 ? 1.03 : 0), CHEST[1] + (less > 0 ? 1.0 : 0.7), CHEST[2] + 0.3] : undefined}
        />
      )}
      <Icon kind="question" position={[NOW.kid[0], NOW.kid[1] + 1.92 + Math.sin(ask * 5) * 0.03, NOW.kid[2]]} rotationY={0.25} height={0.44} color="#ffd24a" outline glow={0.25} scale={question} />
      {/* The baker: behind his counter the whole film. He nods at whoever is buying. */}
      <Villager position={NOW.baker} rotationY={0.12} robe={ROBE.white} nod={0.1 + Math.sin(ask * 1.7) * 0.05} turn={today > 0 ? 0.35 : 0.2} />
    </>
  );
};

export const scene1 = flightScene(timing, {
  id: "scene1",
  title: "The question",
  // Scene 1 opens the film: `from` is where the first frame is.
  from: STOPS.open,
  shots: [
    {
      cue: "1.ask",
      to: STOPS.you,
      travel: 0.85,
      note: "The question, on the face of the kid it is a problem for. The first frame is his whole world, a baker's stall on a rock in the sky; then in to him, shrugging, with the question over his head.",
    },
  ],
});
