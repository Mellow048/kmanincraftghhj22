import type React from "react";
import { Bread, CHEST, Chest, Glow7, HOME_KID, KID, LATER, PriceTag, Puffs, SubscribeSign, TOWER, clock, ease, flightScene, pop, ramp, swung, timing } from "./kit";

/**
 * BEAT 7 — YOU. What the answer means for the coins you already have, and the subscribe line.
 *
 * Your chest is full and stays full. What shrinks is the stack of bread beside it: what those coins would buy.
 * (You yourself are Exhibit1's.)
 */
const SLICE = 0.28;

export const Exhibit7: React.FC = () => {
  const chest = clock.useSince("7.chest", "chest");
  const little = clock.useSince("7.chest", "little");
  const less = clock.useSince("7.chest", "less");
  const year = clock.useSince("7.chest", "year");
  const subscribe = clock.useSince("7.sub", "subscribe");
  const costs = clock.useSince("7.sub", "costs");
  // It opens on 'chest', and shuts again when the sign goes up: the last picture is you, not your savings.
  const open = ease(ramp(chest, -0.12, 0.3)) * (1 - ease(ramp(subscribe, -0.35, 0.05)));
  const gone = [year, less, little];
  const turned = swung(costs / 0.36);
  // The sign stands just behind the middle of your head, so its stick runs down your back and not across your face.
  const sign: [number, number, number] = [HOME_KID[0], HOME_KID[1] + 1.56 * KID + 0.62, HOME_KID[2] - 0.1];
  return (
    <>
      <Chest position={CHEST} scale={1.3} open={open} gold={0.92} />
      <Glow7 at={[CHEST[0], CHEST[1] + 1.0, CHEST[2] + 0.2]} power={open} />
      {/* What the coins would buy: six loaves. The top three go, one at a time, and nothing leaves the chest. */}
      {Array.from({ length: 6 }, (_, i) => {
        const since = i >= 3 ? gone[5 - i] : -1;
        const here = pop(chest, 0.2 + i * 0.05, 0.2) * (since > 0 ? 1 - ease(ramp(since, 0, 0.16)) : 1);
        return (
          <group key={i}>
            <Bread position={[TOWER[0] + (i % 2 ? 0.03 : -0.03), TOWER[1] + i * SLICE + (since > 0 ? since * 1.2 : 0), TOWER[2]]} rotationY={(i % 2 ? 0.08 : -0.06)} scale={1.2 * here} />
            {since > 0 && since < 0.5 ? <Puffs position={[TOWER[0], TOWER[1] + i * SLICE + 0.1, TOWER[2]]} color="#f4efe0" count={5} rise={0.5} spread={0.25} size={0.16} speed={1.6} opacity={0.6 * (1 - since / 0.5)} seed={i} /> : null}
          </group>
        );
      })}

      {/* The last picture: the red sign over your head, and what it costs. */}
      <SubscribeSign position={sign} scale={0.74 * pop(subscribe, -0.02, 0.26)} tilt={subscribe > 0 ? Math.sin(subscribe * 9) * 0.07 * Math.exp(-subscribe * 2.4) : 0} />
      <PriceTag text="0" position={[sign[0] - 0.46, sign[1] - 0.18, sign[2] + 0.2]} rotationY={Math.PI * (1 - turned)} scale={1.3 * pop(subscribe, 0.18, 0.24)} swing={costs > 0 ? Math.sin(costs * 11) * 0.16 * Math.exp(-costs * 2.2) : 0.04} />
    </>
  );
};

export const scene7 = flightScene(timing, {
  id: "scene7",
  title: "Your chest",
  from: LATER.answer,
  shots: [
    {
      cue: "7.chest",
      to: LATER.chest,
      note: "Along the island to your own door, and what the answer means for you. The chest opens on 'chest', full; beside it stands the bread those coins would buy. On 'a little less every year' the stack loses three loaves, and not one coin has moved.",
    },
    {
      cue: "7.sub",
      to: LATER.sub,
      note: "In to you. The red sign goes up over your head on 'subscribe', and the tag on it swings round on 'costs': 0. The one price in the film that has not gone up.",
    },
  ],
});
