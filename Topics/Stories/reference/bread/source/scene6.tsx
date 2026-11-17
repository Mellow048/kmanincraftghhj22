import type React from "react";
import { COIN, Coin, CoinStack, LATER, NOW, clock, ease, flightScene, ramp, timing } from "./kit";

/**
 * BEAT 6 — THE ANSWER. Home, to the loaf the film started with. It has not changed. There is more money, and each
 * coin buys less: the loaf comes apart, half over each of its two coins. (The loaf itself is Exhibit2's.)
 */
// Coins fall past the counter on both sides of the loaf, never in front of it.
const RAIN = Array.from({ length: 10 }, (_, i) => ({
  x: (i % 2 === 0 ? -1 : 1) * (0.62 + ((i * 37) % 5) * 0.09),
  z: 0.7 + ((i * 29) % 7) * 0.1,
  at: 0.03 + i * 0.075 + ((i * 17) % 5) * 0.012,
}));

export const Exhibit6: React.FC = () => {
  const more = clock.useSince("6.answer", "more");
  const grow = ease(ramp(more, 0, 0.75));
  return (
    <>
      {/* "There is more money": two stacks rise at the ends of the counter, and coins fall past in front of it. */}
      {more > 0 ? (
        <>
          <CoinStack position={[NOW.loaf[0] - 0.7, NOW.stall[1] + 1.0, NOW.stall[2] + 0.2]} count={11 * grow} radius={0.16} seed={3} />
          <CoinStack position={[NOW.loaf[0] + 0.7, NOW.stall[1] + 1.0, NOW.stall[2] + 0.2]} count={9 * grow} radius={0.16} seed={5} />
        </>
      ) : null}
      {RAIN.map((drop, i) => {
        const t = more - drop.at;
        if (t <= 0) return null;
        // It falls 4.4 m in half a second and then lies where it landed.
        const k = Math.min(1, t / 0.5);
        const y = NOW.stall[1] + 4.4 * (1 - k * k);
        return k < 1 ? (
          <Coin key={i} position={[NOW.loaf[0] + drop.x, y + COIN / 2, NOW.stall[2] + drop.z]} size={COIN * 0.9} spin={t * 13 + i} glow={0.2} />
        ) : (
          <CoinStack key={i} position={[NOW.loaf[0] + drop.x, NOW.stall[1], NOW.stall[2] + drop.z]} count={1} radius={0.13} seed={i + 1} />
        );
      })}
    </>
  );
};

export const scene6 = flightScene(timing, {
  id: "scene6",
  title: "The answer",
  from: LATER.totem,
  shots: [
    {
      cue: "6.answer",
      to: LATER.answer,
      travel: 1.4,
      note: "Home: up out of 1923, past the stall where your mom paid one, to today's loaf. It is the loaf of the first ten seconds, unchanged. Coins pile up beside it on 'more money', and on 'buys less' it comes apart: half a loaf for each coin.",
    },
  ],
});
