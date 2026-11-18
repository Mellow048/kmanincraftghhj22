import type React from "react";
import {
  COIN, Coin, FigureBubble, Loaf, PLACE, PriceTag, RACKS, RACK_BAKER, RACK_LOAF, RACK_TOP, ROBE, STOPS, Villager,
  clock, dropped, ease, flightScene, on, pop, rackCoin, rackFoot, rackLoaf, ramp, swung, timing,
} from "./kit";
import type { Vec3 } from "../../engine";

/**
 * BEAT 4 — THE CAUSE, STEP BY STEP. A tiny village: ten loaves, ten coins. Then ten more coins, and no more bread.
 *
 * The whole argument is one rack. Each loaf lies on a step with its price in coins standing under it, as in the
 * shop: one coin, then two, and then the loaf comes apart in the middle, half over each coin.
 */

/** A coin on its way from `a` to `b` in an arc, `k` 0 → 1. */
const arc = (a: Vec3, b: Vec3, k: number, lift = 0.9): Vec3 => {
  const e = ease(k);
  return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e + Math.sin(e * Math.PI) * lift, a[2] + (b[2] - a[2]) * e + Math.sin(e * Math.PI) * 0.5];
};

const SIZE = COIN * 0.78;

export const Exhibit4: React.FC = () => {
  const loaves = clock.useSince("4.ten", "ten");
  const coins = clock.useSince("4.ten", "ten", 1);
  const each = clock.useSince("4.one", "each");
  const one = clock.useSince("4.one", "one");
  const hand = clock.useSince("4.more", "hand");
  const still = clock.useSince("4.still", "still");
  const ten = clock.useSince("4.still", "ten");
  const two = clock.useSince("4.two");
  const each2 = clock.useSince("4.two", "each");
  const sells = clock.useSince("4.two", "sells");
  const nobody = clock.useSince("4.nobody");
  const buys = clock.useSince("4.nobody", "buys");
  const walk = clock.useSince("4.village");

  // The big tag over the rack: "1" on 'one'; it spins once on 'sells' and comes round as "2".
  const flip = swung(sells / 0.42);
  const price = sells > 0.21 ? "2" : "1";
  // "Each coin just buys less": every loaf comes apart, and its two coins move out with the halves, one under each.
  const apart = ease(ramp(buys, 0, 0.32));
  const split = 0.2 * apart;

  return (
    <>
      {Array.from({ length: 10 }, (_, i) => {
        // Ten loaves, counted on to the rack one by one. They hop again, one by one, when the baker counts them.
        const born = loaves - i * 0.05;
        const counted = still - i * 0.085;
        const hop = pop(counted, 0, 0.16) * (1 - ease(ramp(counted, 0.12, 0.3)));
        const at = rackLoaf(i);
        // The first coin of this loaf: it waits at the foot, then flies up under it. When the second comes, it makes room.
        const up1 = ramp(each - i * 0.045, 0, 0.42);
        const up2 = ramp(each2 - i * 0.045, 0, 0.42);
        const n = 1 + ease(up2);
        const out = 0.125 * apart;
        const first = arc(rackFoot(i), rackCoin(i, 0, n), up1);
        const second = arc(rackFoot(i), rackCoin(i, 1, 2), up2);
        first[0] -= out;
        second[0] += out;
        const fell1 = coins - i * 0.055;
        const fell2 = hand - i * 0.06;
        return (
          <group key={i}>
            <Loaf position={[at[0], at[1] + hop * 0.09, at[2]]} scale={RACK_LOAF * pop(born, 0, 0.2) * (1 + hop * 0.06)} split={split} />
            {fell1 >= 0 ? <Coin position={[first[0], first[1] + SIZE / 2 + (up1 <= 0 ? dropped(fell1, 3.2) : 0), first[2]]} size={SIZE} spin={up1 > 0 && up1 < 1 ? up1 * Math.PI * 2 : Math.max(0, 0.2 - fell1) * 14} glow={0.2} /> : null}
            {fell2 >= 0 ? <Coin position={[second[0], second[1] + SIZE / 2 + (up2 <= 0 ? dropped(fell2, 6) : 0), second[2]]} size={SIZE} spin={up2 > 0 && up2 < 1 ? up2 * Math.PI * 2 : Math.max(0, 0.2 - fell2) * 14} glow={0.2} /> : null}
          </group>
        );
      })}

      <PriceTag text={price} position={[RACK_TOP[0], RACK_TOP[1] + 1.56, RACK_TOP[2] + 0.4]} rotationY={one < 0 ? 0 : sells > 0 ? Math.PI * 2 * flip : 0} scale={2.2 * (sells > 0 ? 1 : pop(one, 0, 0.26))} swing={one > 0 ? Math.sin(one * 9) * 0.1 * Math.exp(-one * 2) : 0} />

      {/* The baker, beside his rack. He counts it with his head on 'still', and says what he finds. */}
      <Villager
        position={RACK_BAKER}
        rotationY={still > 0 && nobody < 0 ? -0.9 : -0.35}
        robe={ROBE.white}
        nod={still > 0 && ten < 0.3 ? -0.35 + ramp(still, 0, 0.85) * 0.7 : 0.08 + Math.sin(walk * 1.6) * 0.05}
        turn={nobody > 0 ? Math.sin(nobody * 7) * 0.4 * (1 - ease(ramp(nobody, 1.2, 1.8))) : 0}
      />
      <FigureBubble text="10" position={[RACK_BAKER[0] + 0.31, RACK_BAKER[1] + 2.38, RACK_BAKER[2] + 0.2]} rotationY={0.4} scale={1.25 * pop(ten, -0.05, 0.22) * (1 - ease(ramp(two, 0, 0.25)))} tail={-1} />

      {/* The one who buys his bread here. He stands at the rack's other post, so he and the baker are in every
          picture of the whole rack and in none of the close ones: anybody nearer the lens would stand in front of it.
          He looks up at the new coins, and shakes his head when the price doubles. */}
      <Villager
        position={on(PLACE.village, -1.23, 0, -0.42)}
        rotationY={1.15}
        robe={ROBE.farmer}
        hat="straw"
        nod={0.02 + Math.sin(walk * 1.3) * 0.05 - (hand > 0.3 && hand < 1.4 ? 0.5 * Math.sin(ramp(hand, 0.3, 1.4) * Math.PI) : 0)}
        turn={nobody > 0.1 ? Math.sin(nobody * 7) * 0.42 * (1 - ease(ramp(nobody, 1.3, 1.9))) : 0}
      />
    </>
  );
};

export const scene4 = flightScene(timing, {
  id: "scene4",
  title: "A tiny village",
  from: STOPS.both,
  shots: [
    {
      cue: "4.village",
      to: STOPS.village,
      note: "Away from the two prices and down to the west, to a place small enough to count: three huts, a baker, a farmer who buys from him, and one empty rack between them.",
    },
    {
      cue: "4.ten",
      to: STOPS.rack,
      note: "Square on to the rack, the way a chart is read. Ten loaves pop on to it, two across and five up, on 'ten loaves'; ten coins drop in two rows at its foot on 'ten coins'. Nothing else is in the frame.",
    },
    {
      cue: "4.one",
      to: RACKS.one,
      note: "Round to the left, as each coin flies up from the ground and lands under its own loaf: one coin, one loaf, ten times. The big tag over the rack pops on 'one'.",
    },
    {
      cue: "4.more",
      to: RACKS.more,
      note: "Round to the other side and a step back, with sky over the rack, because that is where the new money comes from: ten more coins fall into the frame and land where the first ten waited. The farmer looks up.",
    },
    {
      cue: "4.still",
      to: RACKS.still,
      note: "To the baker, close, with the rack behind his shoulder. He counts it with his head, each loaf hopping as he gets to it, and says what he finds: 10. More money has not baked one loaf.",
    },
    {
      cue: "4.two",
      to: RACKS.two,
      note: "The whole rack again, from the left: the ten new coins fly up, every first coin makes room, and now two stand under each loaf. The tag spins once on 'sells' and comes round as 2.",
    },
    {
      cue: "4.nobody",
      to: RACKS.nobody,
      travel: 2.1,
      lift: 0,
      note: "One slow push in, the length of the first sentence, from the whole rack to eight of its loaves. On the way the farmer and the baker shake their heads: the same ten loaves as before. It lands for 'each coin', and on 'buys less' every loaf comes apart down the middle, half a loaf over each of its two coins.",
    },
  ],
});
