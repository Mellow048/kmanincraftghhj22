import type React from "react";
import { Arrow, Mom, NOW, ROBE, STOPS, ShopGoods, THEN, Villager, clock, ease, flightScene, pop, ramp, timing } from "./kit";

/**
 * BEAT 3 — IT WAS NOT ALWAYS SO. The same stall when your mom was your age: the same loaf, one coin.
 *
 * `then` hangs below `now`, so the camera goes DOWN into the past, and the arrow between the two prices points UP.
 */
export const Exhibit3: React.FC = () => {
  const mom = clock.useSince("3.mom");
  const cost = clock.useSince("3.mom", "cost");
  const one = clock.useSince("3.mom", "one");
  const bread = clock.useSince("3.same", "bread");
  const oven = clock.useSince("3.same", "oven");
  const price = clock.useSince("3.same", "price");
  const moved = clock.useSince("3.same", "moved");
  // The two loaves hop together a beat after 'bread', when the camera has both of them: the full stop of "Same bread."
  const hop = pop(bread, 0.28, 0.3) * (1 - ease(ramp(bread, 0.58, 0.88)));
  const flare = pop(oven, 0, 0.2) * (1 - ease(ramp(oven, 0.5, 1.2)));
  const swell = ease(ramp(price, 0, 0.25)) * (1 - ease(ramp(price, 1.6, 2.2)));
  return (
    <>
      <ShopGoods at={THEN} price="1" tagSince={cost} coinsSince={[one]} hop={hop} fire={0.8 + flare * 1.6} swell={swell} />
      {/* Your mom, at your age, in your shirt. She has just put her one coin down. */}
      <Mom position={THEN.kid} rotationY={-0.55} animation="idle" blendTo="cheer" blend={1 - 0.55 * pop(one, 0.05, 0.3) * (1 - ease(ramp(one, 0.6, 1.1)))} face={one > 0 ? "grin" : "smile"} headYaw={0.5} saccade={false} gaze={0} />
      <Villager position={THEN.baker} rotationY={0.12} robe={ROBE.white} nod={0.1 + Math.sin(mom * 1.7 + 1) * 0.05} turn={0.3} />
      {/* The only thing that moved: from the price below to the price above. */}
      <Arrow position={[NOW.tag[0], THEN.stall[1] + 3.2, 5.0]} dir="up" length={1.9} thick={0.34} grow={ease(ramp(moved, -0.05, 0.3))} color="#ff4a2a" glow={0.6} />
    </>
  );
};

export const scene3 = flightScene(timing, {
  id: "scene3",
  title: "It was not always so",
  from: STOPS.loaf,
  shots: [
    {
      cue: "3.mom",
      to: STOPS.then,
      note: "Over the edge of the island and down, to the same stall thirty years below it: drier grass, the same oven, a girl in your shirt. Her tag swings round on 'cost': one.",
    },
    {
      cue: "3.same",
      to: STOPS.both,
      travel: 0.62,
      note: "Back until both stalls are in one frame, then above now: two loaves that hop together, two ovens that flare together, and two prices that do not match, with an arrow from the one to the two.",
    },
  ],
});
