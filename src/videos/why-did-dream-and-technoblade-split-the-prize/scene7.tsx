import type React from "react";
import { Block, PLACE, ScoreText, STOPS, clock, flightScene, timing } from "./kit";

export const Exhibit7: React.FC = () => {
  const callback = clock.useSince("7.callback");
  const subscribe = clock.useSince("7.subscribe");
  const show = Math.max(0, Math.min(1, (callback + 0.2) / 0.45));
  return (
    <>
      {/* The finale returns to Exhibit1's original board, now 6–4, with the two 50K chests beneath it. */}
      <group scale={show}>
        {subscribe >= 0 && (
          <group scale={Math.min(1, Math.max(0, subscribe * 1.4))}>
            <Block position={[PLACE.arena[0], PLACE.arena[1] + 1.5, PLACE.arena[2] - 1.2]} size={[2.5, 0.58, 0.12]} color="#9b2830" emissive="#7d151d" emissiveIntensity={0.08} />
            <ScoreText at={[PLACE.arena[0], PLACE.arena[1] + 1.52, PLACE.arena[2] - 1.1]} text="SUBSCRIBE" height={0.29} color="#fff5e6" />
          </group>
        )}
      </group>
    </>
  );
};

export const scene7 = flightScene(timing, {
  id: "scene7",
  title: "The opening question, answered",
  from: STOPS.winner,
  shots: [
    { cue: "7.callback", to: STOPS.callback, note: "Return to the opening banner and scoreboard, now with the verified six-four result and the equal shares underneath." },
    { cue: "7.recap", to: STOPS.recap, note: "Hold the one composed answer: Technoblade won six-four, while the prize had already been split by agreement." },
    { cue: "7.reframe", to: STOPS.reframe, note: "The winner and pre-agreed split coexist; neither erases the other." },
    { cue: "7.subscribe", to: STOPS.subscribe, note: "Leave the final tableau quiet for the short end card." },
  ],
});
