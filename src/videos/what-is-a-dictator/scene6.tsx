import type React from "react";
import type { Vec3 } from "../../engine";
import { BALCONY, BALCONY_FLOOR, Folk, GATE_X, GREY, Helmet, No, NoBits, ROBES, STOPS, Spear, clock, ease, flightScene, ramp, timing, useNow, walk } from "./kit";
import { LAST_BLOW, OUT } from "./scene3";

/**
 * BEAT 6 — THE ANSWER. Back up to the balcony, with the Roman cloak on him: a ruler nobody is allowed to tell no.
 *
 * This exhibit is the two guards beside him and the five NOs that come up from the square. The first four are met
 * by a spear before they reach the rail; the last gets as far as his face, and he puts the judge's hammer through it.
 */

const T = {
  dictator: clock.at("6.answer", "dictator"),
  ruler: clock.at("6.answer", "ruler"),
  nobody: clock.at("6.answer", "nobody"),
  allowed: clock.at("6.answer", "allowed"),
};

/** The guards stand at the two ends of the balcony, a spear's length from the middle. */
const GUARDS: Array<{ at: Vec3; side: number; out: number }> = [
  { at: [BALCONY[0] - 1.15, BALCONY_FLOOR, BALCONY[2] - 0.05], side: 1, out: OUT - 0.12 },
  { at: [BALCONY[0] + 1.15, BALCONY_FLOOR, BALCONY[2] - 0.05], side: -1, out: OUT + 0.14 },
];
/** How long a NO takes to float up from the square to where it is met. */
const RISE = 0.62;
/** Each NO: when it is broken, by which guard (-1 is the man himself), and how far along the balcony. */
const NOS: Array<{ broken: number; by: number; x: number }> = [
  { broken: T.dictator + 0.5, by: 0, x: -0.84 },
  { broken: T.ruler + 0.3, by: 1, x: 0.84 },
  { broken: T.nobody + 0.42, by: 0, x: -0.84 },
  { broken: T.allowed + 0.3, by: 1, x: 0.84 },
  { broken: LAST_BLOW, by: -1, x: 0.04 },
];
/** Where each one is broken: in front of the stone word for a spear, over the rail in front of his chest for the hammer. */
const breakAt = (n: { by: number; x: number }): Vec3 => (n.by < 0 ? [BALCONY[0] + n.x, BALCONY_FLOOR + 0.98, BALCONY[2] + 0.75] : GREY.p(GATE_X + n.x, 4.3, -1.5));

export const Exhibit6: React.FC = () => {
  const now = useNow();
  return (
    <>
      {GUARDS.map((g, i) => {
        if (now < g.out) return null;
        const come = walk([[g.at[0] + g.side * 0.75, g.at[1], g.at[2] - 0.95], g.at], now, g.out, 2.0);
        // A stab down over the rail for each NO that is his to stop.
        const jab = NOS.reduce((most, n) => (n.by === i ? Math.max(most, ease(ramp(now, n.broken - 0.13, n.broken)) * (1 - ease(ramp(now, n.broken + 0.05, n.broken + 0.3)))) : most), 0);
        return <Folk key={i} position={come.p} rotationY={come.going ? come.rot : 0} robe={ROBES.soldier} walk={come.walked} phase={i * 1.7 + 0.3} head={<Helmet />} hands={<Spear side={g.side} jab={2.2 * jab} />} />;
      })}
      {NOS.map((n, i) => {
        const to = breakAt(n);
        const k = (now - (n.broken - RISE)) / RISE;
        return (
          <group key={i}>
            {k > 0 && k < 1 ? <No position={[to[0] + Math.sin(k * 6 + i) * 0.05, to[1] - (1 - k) * (n.by < 0 ? 3.0 : 1.9), to[2]]} scale={n.by < 0 ? 0.78 : 0.66} rotationY={0.12} tail={i % 2 ? 1 : -1} /> : null}
            <NoBits position={to} t={now - n.broken} seed={20 + i} toward={[0, n.by < 0 ? -0.4 : 0.1, 1.3]} power={n.by < 0 ? 1.6 : 1.2} />
          </group>
        );
      })}
    </>
  );
};

export const scene6 = flightScene(timing, {
  id: "scene6",
  title: "The answer",
  from: STOPS.caesar,
  shots: [
    {
      cue: "5.now",
      to: STOPS.now,
      lift: 0,
      note: "Up, all the way back: out of Rome, through the cloud, to the balcony. The man on it has the judge's hammer in his arms, the word under his feet, and on his shoulders the purple cloak the last line left on Caesar.",
    },
    {
      cue: "6.answer",
      to: STOPS.answer,
      note: "Round to his other side for the answer in one picture. NO after NO floats up from the square; a guard's spear comes down over the rail and breaks each one against the stone word. The last gets as high as his face, and he puts the hammer through it himself.",
    },
  ],
});
