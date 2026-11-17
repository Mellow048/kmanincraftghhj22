import type React from "react";
import { NOW, STOPS, ShopGoods, clock, ease, flightScene, pop, ramp, timing } from "./kit";

/**
 * BEAT 2 — THE THING YOU KNOW. One loaf, and its price today: two coins.
 *
 * This exhibit is today's loaf and its price. Every later number in the film is measured against it, and the
 * film comes back to it for the answer (beat 6), where the loaf comes apart.
 */
export const Exhibit2: React.FC = () => {
  const costs = clock.useSince("2.loaf", "costs");
  const two = clock.useSince("2.loaf", "two");
  const coins = clock.useSince("2.loaf", "coins");
  // "Same bread. Same oven. Only the price moved": both shops answer at once (beat 3).
  const bread = clock.useSince("3.same", "bread");
  const oven = clock.useSince("3.same", "oven");
  const price = clock.useSince("3.same", "price");
  // The answer (beat 6): each coin buys less. The loaf comes apart, half over each coin.
  const buys = clock.useSince("6.answer", "buys");
  const hop = pop(bread, 0.28, 0.3) * (1 - ease(ramp(bread, 0.58, 0.88)));
  const flare = pop(oven, 0, 0.2) * (1 - ease(ramp(oven, 0.5, 1.2)));
  const swell = ease(ramp(price, 0, 0.25)) * (1 - ease(ramp(price, 1.6, 2.2)));
  return <ShopGoods at={NOW} price="2" tagSince={costs} coinsSince={[two, coins]} hop={hop} fire={0.8 + flare * 1.6} swell={swell} split={0.2 * ease(ramp(buys, 0, 0.3))} />;
};

export const scene2 = flightScene(timing, {
  id: "scene2",
  title: "One loaf, two coins",
  from: STOPS.you,
  shots: [
    {
      cue: "2.loaf",
      to: STOPS.loaf,
      note: "Past his shoulder to the one thing everybody knows the price of. Its tag has its back to us until 'costs'; then it swings round, and the two coins land under the loaf one after the other.",
    },
  ],
});
