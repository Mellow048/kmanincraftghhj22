import type React from "react";
import { HOME, No, STOPS, SubscribeSign, clock, ease, flightScene, pop, ramp, timing, useNow } from "./kit";
import { lastSpot } from "./scene1";

/**
 * BEAT 7 — YOU. Why any of it matters to somebody who is nine, and the subscribe line.
 *
 * This exhibit is the two things you may say at the end: the NO that comes out of the box when your vote goes in,
 * as big as you are, and the red sign. (You yourself are Exhibit1's.)
 */

const T = {
  say: clock.at("7.you", "say"),
  subscribe: clock.at("7.sub", "subscribe"),
  or: clock.at("7.sub", "or"),
  no: clock.at("7.sub", "no"),
  here: clock.at("7.sub", "here"),
  can: clock.at("7.sub", "can"),
};

/** The NO grows out of the slot, tail first. It is nearly as big as you are. */
const SPOKEN = T.say - 0.05;
const BIG = 1.12;

export const Exhibit7: React.FC = () => {
  const now = useNow();
  const grown = pop(now, SPOKEN, 0.34);
  // It answers when it is named again ('or say no'), and once more on the last word.
  const again = (at: number) => (now > at && now < at + 0.4 ? Math.sin(((now - at) / 0.4) * Math.PI) * 0.12 : 0);
  const size = BIG * grown * (1 + again(T.no - 0.03) + again(T.can - 0.03));
  const you = lastSpot(now);
  const sub = now - T.subscribe;
  // The sign is over your head, its stick in the hand nearer the box: so it is over the NO as well, and the two
  // things you may say are stacked in one tall picture.
  const sign: [number, number, number] = [you[0] + 0.24, you[1] + 2.28, you[2] - 0.02];
  return (
    <>
      <No position={[HOME.slot[0] + 0.16, HOME.slot[1] + 0.52 * size, HOME.slot[2]]} scale={size} rotationY={0.1} tilt={grown < 1 ? (1 - grown) * 0.2 : 0} tail={-1} />
      <SubscribeSign
        position={sign}
        scale={0.72 * pop(sub, -0.02, 0.26) * (1 + again(T.here - 0.03) * 0.5)}
        tilt={sub > 0 ? Math.sin(sub * 9) * 0.07 * Math.exp(-sub * 2.4) : 0}
      />
    </>
  );
};
void ease;
void ramp;
void T.or;

export const scene7 = flightScene(timing, {
  id: "scene7",
  title: "Yours to say",
  from: STOPS.answer,
  shots: [
    {
      cue: "7.you",
      to: STOPS.home,
      note: "Home, across the sky, to you at the vote box with one stone in your hand. It goes in on 'how you', and on 'say no' a red NO nearly as big as you are grows out of the slot. Nobody else is in the picture: this one is yours.",
    },
    {
      cue: "7.sub",
      to: STOPS.sub,
      note: "Round to your other side. On 'subscribe' you turn to us and the red sign goes up over your head; on 'or say no' the NO beside you answers. You look at it, up at the sign, and then at whoever is watching: here, either one is yours to say.",
    },
  ],
});
