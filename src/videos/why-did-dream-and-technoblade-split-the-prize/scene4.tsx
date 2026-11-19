import type React from "react";
import { STOPS, flightScene, timing } from "./kit";

/** The exchange is animated on the opening arena's persistent avatars and scoreboard. */
export const Exhibit4: React.FC = () => null;

export const scene4 = flightScene(timing, {
  id: "scene4",
  title: "Opening exchange",
  from: STOPS.lead,
  shots: [
    { cue: "4.first", to: STOPS.answer, note: "The persistent arena avatars act out a stylized first exchange while the same diegetic scoreboard lights the point." },
    { cue: "4.answer", to: STOPS.rule, note: "Dream's answer brings the score level. Keep the arena and its physical scoreboard in the same continuous flight." },
    { cue: "5.rule", to: STOPS.rule, note: "Clarify the rule physically: ten pavers, first player to six wins." },
  ],
});
