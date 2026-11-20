import type React from "react";
import { Board, Block, Dream, Glow, PLACE, STOPS, Technoblade, VoxelSword, clock, flightScene, timing } from "./kit";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const hit = (t: number, start: number, span: number) => {
  const p = (t - start) / span;
  return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p);
};

/** The score doesn't just change: the fighters trade momentum as the match tightens. */
export const Exhibit5: React.FC = () => {
  const show = clamp01((clock.useSince("5.rule") + 0.2) / 0.45);
  const rule = clock.useSince("5.rule");
  const tie = clock.useSince("5.tie");
  const four = clock.useSince("5.four");
  const next = clock.useSince("5.next");
  const final = clock.useSince("5.final");
  const finish = clock.useSince("5.finish");
  const title = finish >= 0 ? "FINAL RESULT" : final >= 0 ? "POSSIBLE SCORES" : next >= 0 ? "MATCH POINT?" : four >= 0 ? "TWO ROUNDS LEFT" : tie >= 0 ? "SCORE LEVEL" : "FIRST TO SIX WINS";
  const score = finish >= 0 ? "6-4" : final >= 0 ? "5-4 / 5-5" : next >= 0 ? "4-4" : four >= 0 ? "4-4" : tie >= 0 ? "3-3" : rule >= 0 ? "2-1" : "";
  const dreamStrike = tie >= 0 ? hit(tie, 0.18, 0.64) : next >= 0 ? hit(next, 0.95, 0.55) : final >= 0 ? hit(final, 0.28, 0.64) : 0;
  const technoStrike = next >= 0 ? hit(next, 0.18, 0.62) : final >= 0 ? hit(final, 1.35, 0.58) : 0;
  const dreamRecoil = Math.max(technoStrike, finish >= 0 ? hit(finish, 0.16, 0.72) : 0);
  const technoRecoil = Math.max(dreamStrike, finish >= 0 ? hit(finish, 0.16, 0.72) : 0);
  const redBeat = finish >= 0 ? Math.sin(Math.max(0, finish) * 9) * 0.12 : 0;
  const dreamX = PLACE.score[0] - 1.45 + dreamStrike * 0.34 - technoStrike * 0.38;
  const technoX = PLACE.score[0] + 1.45 - technoStrike * 0.34 + dreamStrike * 0.38;
  const dreamZ = PLACE.score[2] + 1.45 + technoStrike * 0.2;
  const technoZ = PLACE.score[2] + 1.45 + dreamStrike * 0.2;
  const clash = Math.max(dreamStrike * technoRecoil, technoStrike * dreamRecoil);

  const dreamAnimation = finish >= 0 ? "stagger" : dreamStrike > 0.18 ? "reach" : dreamRecoil > 0.18 ? "stagger" : tie >= 0 && tie < 0.7 ? "run" : four >= 0 && four < 0.65 ? "walk" : "talk";
  const technoAnimation = finish >= 0 ? "cheer" : technoStrike > 0.18 ? "reach" : technoRecoil > 0.18 ? "stagger" : next >= 0 && next < 0.8 ? "run" : four >= 0 && four < 0.65 ? "walk" : "point";

  return (
    <>
      <group scale={show}>
        <Block position={[PLACE.score[0], PLACE.score[1] + 0.1, PLACE.score[2] + 1.2]} size={[6.6, 0.2, 4.0]} color="#404e59" />
        <Block position={[PLACE.score[0], PLACE.score[1] + 0.24, PLACE.score[2] + 1.2]} size={[0.09, 0.08, 4.0]} color="#c8a04c" />
        <Board at={[PLACE.score[0], PLACE.score[1] + 2.35 + redBeat, PLACE.score[2] - 1.5]} title={title} score={score} width={4.5} glow={finish >= 0 ? 0.25 : 0} />
        <Dream
          position={[dreamX, PLACE.score[1] + 0.2, dreamZ]}
          rotationY={0.42}
          animation={dreamAnimation}
          animDistance={Math.max(0, tie, four, next, final) * 0.22}
          face={dreamRecoil > 0.18 ? "hurt" : "brave"}
          lookAt={[technoX, PLACE.score[1] + 1.4, technoZ]}
          time={Math.max(0, tie, four, next, final, finish)}
          children={<VoxelSword blade="#d9e6ee" grip="#249847" />}
        />
        <Technoblade
          position={[technoX, PLACE.score[1] + 0.2, technoZ]}
          rotationY={-0.42}
          animation={technoAnimation}
          animDistance={Math.max(0, tie, four, next, final) * 0.22}
          face={technoRecoil > 0.18 ? "hurt" : finish >= 0 ? "smile" : "brave"}
          lookAt={[dreamX, PLACE.score[1] + 1.4, dreamZ]}
          time={Math.max(0, tie, four, next, final, finish)}
          children={<VoxelSword blade="#d6e3e9" grip="#7f2635" />}
        />
        {clash > 0.04 && (
          <group position={[PLACE.score[0], PLACE.score[1] + 1.65, PLACE.score[2] + 1.45]} scale={clash}>
            <Block size={[0.8, 0.08, 0.08]} rotation={[0, 0, 0.65]} color="#fff0a7" emissive="#ffd35c" emissiveIntensity={0.8} />
            <Block size={[0.8, 0.08, 0.08]} rotation={[0, 0, -0.65]} color="#eaf7ff" emissive="#91d9ff" emissiveIntensity={0.75} />
            <Glow size={0.7} color="#ffe58a" opacity={0.8} />
          </group>
        )}
      </group>
    </>
  );
};

export const scene5 = flightScene(timing, {
  id: "scene5",
  title: "Tight scores and the finish",
  from: STOPS.rule,
  shots: [
    { cue: "5.tie", to: STOPS.four, note: "Dream attacks to tie the match; the board and the fighters move together." },
    { cue: "5.four", to: STOPS.next, note: "At four-all both players circle the center line; neither has won yet." },
    { cue: "5.next", to: STOPS.final, note: "Techno lunges for match point, but the board marks it as a possibility, not a result." },
    { cue: "5.final", to: STOPS.final, note: "Dream counters while the score paths show five-four or five-all." },
    { cue: "5.finish", to: STOPS.finish, note: "Techno wins the last two points: Dream recoils, the score locks at six-four, and Techno raises his sword." },
    { cue: "6.whole", to: STOPS.whole, note: "The winner lowers his sword as the camera follows the duel's prize toward the next reveal." },
  ],
});
