import type React from "react";
import { Block, Chest, Dream, PLACE, PixelText, ScoreText, STOPS, Technoblade, clock, flightScene, timing } from "./kit";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/** The players inspect the prize, sign the split, and move to their own half. */
export const Exhibit6: React.FC = () => {
  const whole = clock.useSince("6.whole");
  const agreement = clock.useSince("6.agreement");
  const pressure = clock.useSince("6.pressure");
  const winner = clock.useSince("7.winner");
  const show = clamp01((whole + 0.2) / 0.45);
  const equalShares = clamp01((agreement + 0.08) / 0.4);
  const singlePrize = 1 - equalShares;
  const opened = clamp01((agreement + 0.12) / 0.65);
  const approach = clamp01(Math.max(0, whole) / 1.1);
  const inspect = agreement >= 0 ? clamp01(agreement / 1.1) : 0;
  const dreamX = PLACE.prize[0] - 1.9 + approach * 0.35 + inspect * 0.2;
  const technoX = PLACE.prize[0] + 1.9 - approach * 0.35 - inspect * 0.2;
  const dreamZ = PLACE.prize[2] + 2.5 - approach * 0.4 - inspect * 0.35;
  const technoZ = PLACE.prize[2] + 2.5 - approach * 0.4 - inspect * 0.35;

  const dreamAnimation = winner >= 0 ? "point" : agreement < 0 ? (whole < 1 ? "walk" : "lookAround") : agreement < 0.8 ? "walk" : agreement < 1.8 ? "reach" : pressure >= 0 ? "talk" : "idle";
  const technoAnimation = winner >= 0 && winner < 0.9 ? "cheer" : agreement < 0 ? (whole < 1 ? "walk" : "point") : agreement < 0.8 ? "walk" : agreement < 1.8 ? "reach" : pressure >= 0 ? "talk" : "idle";

  return (
    <>
      <group scale={show}>
        <Block position={[PLACE.prize[0], PLACE.prize[1] + 0.06, PLACE.prize[2] + 1.3]} size={[6.4, 0.12, 3.6]} color="#35414a" />
        {/* One shared purse becomes two chests only when the prior agreement is revealed. */}
        <group scale={singlePrize}>
          <Chest position={[PLACE.prize[0], PLACE.prize[1] + 0.1, PLACE.prize[2] + 0.85]} scale={1.05} open={0} gold={1} kind="gold" />
          <ScoreText at={[PLACE.prize[0], PLACE.prize[1] + 1.35, PLACE.prize[2] + 0.85]} text="$100K" height={0.34} color="#ffe28b" />
        </group>
        <group scale={equalShares}>
          <Chest position={[PLACE.prize[0] - 1.1, PLACE.prize[1] + 0.08, PLACE.prize[2] + 0.85]} scale={0.74} open={opened} gold={1} kind="gold" />
          <Chest position={[PLACE.prize[0] + 1.1, PLACE.prize[1] + 0.08, PLACE.prize[2] + 0.85]} scale={0.74} open={opened} gold={1} kind="gold" />
          <ScoreText at={[PLACE.prize[0] - 1.1, PLACE.prize[1] + 1.15, PLACE.prize[2] + 0.85]} text="$50K" height={0.3} color="#ffe28b" />
          <ScoreText at={[PLACE.prize[0] + 1.1, PLACE.prize[1] + 1.15, PLACE.prize[2] + 0.85]} text="$50K" height={0.3} color="#ffe28b" />
        </group>
        <ScoreText at={[PLACE.prize[0], PLACE.prize[1] + 2.05, PLACE.prize[2] + 0.55]} text={agreement >= 0 ? "AGREED FIRST" : "ONE PRIZE"} height={0.3} color="#fff1c0" />
        {agreement >= 0 && (
          <group>
            <Block position={[PLACE.prize[0], PLACE.prize[1] + 1.3, PLACE.prize[2] + 1.65]} size={[1.35, 0.88, 0.1]} color="#e8ddb5" />
            <Block position={[PLACE.prize[0], PLACE.prize[1] + 0.82, PLACE.prize[2] + 1.65]} size={[0.18, 0.22, 0.18]} color="#765a39" />
            <PixelText text="50-50" position={[PLACE.prize[0], PLACE.prize[1] + 1.33, PLACE.prize[2] + 1.72]} height={0.26} maxWidth={1.1} color="#40362a" />
          </group>
        )}
        <Dream
          position={[dreamX, PLACE.prize[1] + 0.18, dreamZ]}
          rotationY={0.42}
          animation={dreamAnimation}
          face="calm"
          lookAt={agreement >= 0 ? [PLACE.prize[0], PLACE.prize[1] + 1.2, PLACE.prize[2] + 1.55] : [PLACE.prize[0], PLACE.prize[1] + 1, PLACE.prize[2] + 0.85]}
          time={Math.max(0, whole, agreement, winner)}
        />
        <Technoblade
          position={[technoX, PLACE.prize[1] + 0.18, technoZ]}
          rotationY={-0.42}
          animation={technoAnimation}
          face={winner >= 0 ? "smile" : "brave"}
          lookAt={agreement >= 0 ? [PLACE.prize[0], PLACE.prize[1] + 1.2, PLACE.prize[2] + 1.55] : [PLACE.prize[0], PLACE.prize[1] + 1, PLACE.prize[2] + 0.85]}
          time={Math.max(0, whole, agreement, winner)}
        />
      </group>
    </>
  );
};

export const scene6 = flightScene(timing, {
  id: "scene6",
  title: "A planned split, a different meaning",
  from: STOPS.whole,
  shots: [
    { cue: "6.agreement", to: STOPS.pressure, note: "The players step to the single chest, reveal a 50-50 agreement, and separate the prize into two equal shares." },
    { cue: "6.pressure", to: STOPS.winner, note: "They open their own chests and point to the signed split; the deal was already settled before the match." },
    { cue: "7.winner", to: STOPS.winner, note: "Techno celebrates the six-four win while Dream keeps his equal share; winning and splitting are both true." },
  ],
});
