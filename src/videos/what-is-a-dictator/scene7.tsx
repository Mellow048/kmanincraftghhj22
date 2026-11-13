import type React from "react";
import { HOME, KID, No, STOPS, SubscribeSign, clock, ease, flightScene, pop, ramp, timing, useNow } from "./kit";
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

/** The NO grows out of the slot, tail first. */
const SPOKEN = T.say - 0.05;
const BIG = 1.32;

export const Exhibit7: React.FC = () => {
  const now = useNow();
  const grown = pop(now, SPOKEN, 0.34);
  // It answers when it is named again ('or say no'), and once more on the last word.
  const again = (at: number) => (now > at && now < at + 0.4 ? Math.sin(((now - at) / 0.4) * Math.PI) * 0.14 : 0);
  const size = BIG * grown * (1 + again(T.no - 0.03) + again(T.can - 0.03));
  const you = lastSpot(now);
  const sub = now - T.subscribe;
  const sign: [number, number, number] = [you[0], you[1] + 1.56 * KID + 0.62, you[2] - 0.1];
  return (
    <>
      <No position={[HOME.slot[0], HOME.slot[1] + 0.56 * size, HOME.slot[2]]} scale={size} rotationY={0.1} tilt={grown < 1 ? (1 - grown) * 0.2 : 0} tail={-1} />
      <SubscribeSign
        position={sign}
        scale={0.72 * pop(sub, -0.02, 0.26) * (1 + again(T.here - 0.03) * 0.6)}
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
      note: "Home, across the sky, to you at the vote box with one stone in your hand. It goes in on 'how you', and on 'say no' a red NO as big as you are grows out of the slot. Behind it the judge is still at the bench, and the hat is on the head your village picked.",
    },
    {
      cue: "7.sub",
      to: STOPS.sub,
      note: "In on you. On 'subscribe' you step back with the red sign over your head; on 'or say no' the NO beside you answers. You look at it, up at the sign, and then at whoever is watching: here, either one is yours to say.",
    },
  ],
});
