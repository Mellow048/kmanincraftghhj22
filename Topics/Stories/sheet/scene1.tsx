import { flightScene, stop, timing } from "./kit";

const X = (n: number) => n * 14;
const S = [
  stop([X(0) + 0.6, 2.4, 0], 12.5, 26, 6, 46),
  stop([X(1), 0.95, 0.2], 4.0, 0, 13, 40),
  stop([X(2), 0.55, 0.3], 3.7, 0, 20, 40),
  stop([X(3), 0.7, 0.2], 3.7, 6, 14, 40),
  stop([X(4), 1.95, 0.1], 6.0, 0, 5, 42),
  stop([X(5), 1.85, 0], 5.6, 0, 6, 42),
  stop([X(6), 0.75, 0.2], 4.0, 0, 15, 42),
  stop([X(7), 2.0, 0.2], 5.6, 0, 4, 42),
];
const NOTE = "Parts test: every part of the Explainer pack, one group at a time.";

export const scene1 = flightScene(timing, {
  id: "scene1",
  title: "Parts",
  from: stop([X(0), 1.2, 0], 13, 30, 22, 46),
  shots: S.map((to, i) => ({ cue: `p.${i + 1}`, to, note: NOTE })),
});
