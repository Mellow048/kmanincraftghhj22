import type React from "react";
import { Board, Block, Chest, Dream, Glow, PixelText, PLACE, ScoreText, STOPS, Technoblade, VoxelSword, clock, flightScene, timing } from "./kit";

const cueAfter = (cue: string) => clock.useSince(cue);
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const beat = (t: number, start: number, span: number) => {
  const p = (t - start) / span;
  return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p);
};

/** Opening, first match exchange, and finale callback share one persistent arena set. */
export const Exhibit1: React.FC = () => {
  const now = cueAfter("1.question");
  const event = cueAfter("2.event");
  const first = cueAfter("4.first");
  const answer = cueAfter("4.answer");
  const rule = cueAfter("5.rule");
  const tied = cueAfter("5.tie");
  const four = cueAfter("5.four");
  const final = cueAfter("5.final");
  const finish = cueAfter("5.finish");
  const agreed = cueAfter("6.agreement");
  const callback = cueAfter("7.callback");

  const score = finish >= 0 ? "6-4" : final >= 0 ? "5-4?" : four >= 0 ? "4-4" : tied >= 0 ? "3-3" : rule >= 0 ? "2-1" : answer >= 0 ? "1-1" : first >= 0 ? "1-0" : "";
  const reveal = clamp01((agreed + 0.12) / 0.42);
  const technoStrike = Math.max(first >= 0 ? beat(first, 0.12, 0.68) : 0, rule >= 0 ? beat(rule, 0.18, 0.6) : 0);
  const dreamStrike = answer >= 0 ? beat(answer, 0.08, 0.68) : 0;
  const dreamHit = first >= 0 ? beat(first, 0.55, 0.36) : rule >= 0 ? beat(rule, 0.6, 0.35) : 0;
  const technoHit = answer >= 0 ? beat(answer, 0.48, 0.38) : 0;
  const introWalk = event < 0 ? 0 : clamp01(event / 2.7);
  const dreamX = PLACE.arena[0] - 1.1 - technoStrike * 0.42 + dreamStrike * 0.48;
  const technoX = PLACE.arena[0] + 1.1 - technoStrike * 0.48 + dreamStrike * 0.42;
  const footwork = Math.max(0, first, answer) * 0.35;
  const dreamZ = PLACE.arena[2] + 0.9 + introWalk * 0.95 + (callback >= 0 ? clamp01(callback / 0.9) * 0.65 : 0) + dreamHit * 0.16;
  const technoZ = PLACE.arena[2] + 0.9 + introWalk * 0.95 + (callback >= 0 ? clamp01(callback / 0.9) * 0.65 : 0) + technoHit * 0.16;
  const showingPlayers = now < 8.9 || (first >= 0 && rule < 0) || callback >= 0;
  const inMatch = first >= 0 && rule < 0;
  const roundsComplete = finish >= 0 ? 10 : final >= 0 ? 8 : four >= 0 ? 8 : tied >= 0 ? 6 : rule >= 0 ? 3 : answer >= 0 ? 2 : first >= 0 ? 1 : 0;
  const impact = Math.max(technoStrike * dreamHit, dreamStrike * technoHit);
  const dreamAnimation = callback >= 0
    ? callback < 0.9 ? "walk" : callback < 1.7 ? "reach" : "idle"
    : inMatch
      ? dreamHit > 0.2 ? "stagger" : dreamStrike > 0.2 ? "reach" : "walk"
      : event >= 0 ? event < 2.7 ? "walk" : "point"
        : now < 1.4 ? "point" : "talk";
  const technoAnimation = callback >= 0
    ? callback < 0.9 ? "walk" : cueAfter("7.winner") >= 0 && cueAfter("7.winner") < 1.2 ? "cheer" : "idle"
    : inMatch
      ? technoHit > 0.2 ? "stagger" : technoStrike > 0.2 ? "reach" : "walk"
      : event >= 0 ? event < 2.7 ? "walk" : "point"
        : now < 1.4 ? "lookAround" : "talk";

  return (
    <>
      {/* The board, players, and round track are physical things in the arena—not a screen overlay. */}
      <Block position={[PLACE.arena[0], PLACE.arena[1] + 4.7, PLACE.arena[2] - 3.8]} size={[4.4, 0.62, 0.14]} color="#8d6328" />
      <PixelText text="100,000 DOLLAR DUEL" position={[PLACE.arena[0], PLACE.arena[1] + 4.7, PLACE.arena[2] - 3.71]} height={0.38} maxWidth={4.12} color="#ffdf77" />
      <Board at={[PLACE.arena[0], PLACE.arena[1] + 3.4, PLACE.arena[2] - 3.55]} title="TECHNO   DREAM" score={score} width={4.8} glow={finish >= 0 ? 0.25 : 0} />

      {showingPlayers && (
        <>
          <Dream
            position={[dreamX, PLACE.arena[1], dreamZ]}
            animation={dreamAnimation}
            animDistance={introWalk * 1.6 + footwork}
            rotationY={0.42}
            lookAt={[technoX, PLACE.arena[1] + 1.45, technoZ]}
            face={dreamHit > 0.2 ? "hurt" : answer >= 0 ? "brave" : "calm"}
            time={Math.max(0, now)}
            children={inMatch ? <VoxelSword blade="#d9e6ee" grip="#249847" /> : undefined}
          />
          <Technoblade
            position={[technoX, PLACE.arena[1], technoZ]}
            animation={technoAnimation}
            animDistance={introWalk * 1.6 + footwork}
            rotationY={-0.42}
            lookAt={[dreamX, PLACE.arena[1] + 1.45, dreamZ]}
            face={technoHit > 0.2 ? "hurt" : finish >= 0 || callback >= 0 ? "smile" : "brave"}
            time={Math.max(0, now)}
            children={inMatch ? <VoxelSword blade="#d6e3e9" grip="#7f2635" /> : undefined}
          />
          {impact > 0.04 && (
            <group position={[PLACE.arena[0], PLACE.arena[1] + 1.65, PLACE.arena[2] + 1.0]} scale={impact}>
              <Block size={[0.75, 0.08, 0.08]} rotation={[0, 0, 0.65]} color="#fff0a7" emissive="#ffd35c" emissiveIntensity={0.8} />
              <Block size={[0.75, 0.08, 0.08]} rotation={[0, 0, -0.65]} color="#eaf7ff" emissive="#91d9ff" emissiveIntensity={0.75} />
              <Glow size={0.7} color="#ffe58a" opacity={0.8} />
            </group>
          )}
        </>
      )}

      {/* Ten pavers light in order as rounds are completed, instead of being lit before the match starts. */}
      {Array.from({ length: 10 }, (_, i) => {
        const lit = i < roundsComplete;
        const last = i === roundsComplete - 1;
        const pulse = last ? 0.5 + 0.5 * Math.sin(Math.max(0, now) * 8) : 0;
        return (
          <group key={i} position={[PLACE.arena[0] - 4.6 + i * 1.02, PLACE.arena[1] + 0.09, PLACE.arena[2] + 4.0]}>
            <Block size={[0.72, 0.16, 0.72]} color={i % 2 ? "#435060" : "#59636d"} />
            <PixelText text={`${i + 1}`} position={[0, 0.12, 0.37]} height={0.17} maxWidth={0.52} color="#f5e8c4" />
            <Block position={[0, 0.15 + (lit ? 0.08 : 0), 0]} size={[0.16, 0.08, 0.16]} color={lit ? "#f4ca5e" : "#546170"} emissive={lit ? "#d49a31" : undefined} emissiveIntensity={lit ? 0.28 + pulse * 0.55 : 0} />
          </group>
        );
      })}
      <Block position={[PLACE.arena[0], PLACE.arena[1] + 0.02, PLACE.arena[2] + 4.0]} size={[10.8, 0.04, 1.05]} color="#232b31" />

      {/* The opening payoff returns as two equal shares beneath the confirmed score. */}
      <group position={[PLACE.arena[0], PLACE.arena[1], PLACE.arena[2] + 1.7]} scale={reveal}>
        <Chest position={[-0.72, 0.05, 0]} scale={0.78} open={clamp01((agreed - 0.18) * 1.5)} gold={1} kind="gold" />
        <Chest position={[0.72, 0.05, 0]} scale={0.78} open={clamp01((agreed - 0.18) * 1.5)} gold={1} kind="gold" />
        <ScoreText at={[-0.72, 0.78, 0.2]} text="50K" height={0.22} color="#fff0a8" />
        <ScoreText at={[0.72, 0.78, 0.2]} text="50K" height={0.22} color="#fff0a8" />
      </group>
    </>
  );
};

export const scene1 = flightScene(timing, {
  id: "scene1",
  title: "The question and the event",
  from: STOPS.open,
  shots: [
    { cue: "1.question", to: STOPS.question, note: "Open on the two competitors confronting the prize; Dream points to the hundred-thousand-dollar board before they head to the start line." },
    { cue: "2.event", to: STOPS.event, note: "The players walk onto the ten-round paver track; its lights stay dark until each duel is played." },
  ],
});
