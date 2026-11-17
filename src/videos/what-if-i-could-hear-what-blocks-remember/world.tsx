import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Zone, useActiveShot } from "../../engine";
import { Classroom, Gym, LunchRoom, PLACE, SchoolHall, pop, wordAt } from "./kit";

/** A small, detailed school stage at the north end of the gym. `at` is the gym floor centre. */
const SchoolStage: React.FC<{ at: readonly [number, number, number]; night: boolean; opening: number; lit: number }> = ({ at, night, opening, lit }) => (
  <group position={at}>
    {/* timber deck, dark front fascia, and two shallow steps */}
    <Block position={[0, 0.42, -8.2]} size={[7.8, 0.84, 2.5]} color="#60432f" />
    <Block position={[0, 0.87, -8.15]} size={[7.5, 0.08, 2.24]} color="#9a6b45" />
    <Block position={[0, 0.19, -6.72]} size={[3.8, 0.38, 0.66]} color="#785136" />
    <Block position={[0, 0.38, -7.08]} size={[4.4, 0.26, 0.62]} color="#876044" />
    {/* red curtains, pleats, tie-backs, and a timber rail */}
    <Block position={[0, 5.12, -9.72]} size={[8.6, 0.36, 0.42]} color="#392a31" />
    <Block position={[-2.2 - opening * 2.1, 3.02, -9.7]} size={[3.85, 4.0, 0.34]} color={night ? "#5b263d" : "#77324a"} />
    <Block position={[2.2 + opening * 2.1, 3.02, -9.7]} size={[3.85, 4.0, 0.34]} color={night ? "#5b263d" : "#77324a"} />
    {[-3.8, -3.1, -2.4, -1.7, -1, 1, 1.7, 2.4, 3.1, 3.8].map((x, i) => (
      <Block key={x} position={[x + Math.sign(x) * opening * 2.1, 3.0, -9.49]} size={[0.09, 3.82, 0.06]} color={i % 2 ? "#9c4661" : "#482b3b"} castShadow={false} />
    ))}
    {[-4.05, 4.05].map((x) => (
      <group key={x}>
        <Block position={[Math.sign(x) * (Math.abs(x) + opening * 2.1), 3.12, -9.38]} size={[0.16, 0.36, 0.46]} color="#d2a66d" />
        <Block position={[Math.sign(x) * (Math.abs(x) + opening * 2.1), 2.5, -9.45]} size={[0.12, 0.08, 0.08]} color="#e3bc82" castShadow={false} />
      </group>
    ))}
    <Block position={[0, 5.34, -9.55]} size={[8.8, 0.26, 0.64]} color="#6f3a48" />
    {/* four warm practical lamps, with a cool back rim to separate the actor from the curtain */}
    {[-2.8, -0.9, 0.9, 2.8].map((x) => (
      <group key={x} position={[x, 5.45, -7.1]}>
        <Block size={[0.34, 0.2, 0.34]} color="#3a414c" />
        <Block position={[0, -0.15, 0.02]} size={[0.22, 0.08, 0.22]} color="#ffe5a6" emissive="#ffd071" emissiveIntensity={1.2} castShadow={false} />
      </group>
    ))}
    <pointLight position={[0, 4.9, -6.6]} color="#ffe2a0" intensity={(night ? 34 : 22) * lit} distance={9} decay={2} />
    <pointLight position={[0, 2.4, -10.2]} color="#83bfff" intensity={night ? 16 : 7} distance={8} decay={2} />
  </group>
);

/**
 * THE WORLD, in zones. Only the zone named by a shot is visible. The school sets are all from the What If pack;
 * the one story-specific addition is the little curtained stage where Eli rehearses.
 */
export const World: React.FC = () => {
  const active = useActiveShot();
  const cue = active?.shot.cue ?? "";
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  const afterCurtain = ["11", "12", "13", "14"].some((beat) => cue.startsWith(`${beat}.`));
  const curtainOpen = cue === "11.enter" ? pop(active?.t ?? 0, wordAt("11.enter", "curtain"), 0.65) : afterCurtain ? 1 : 0;
  const stageLit = cue === "8.stage"
    ? pop(active?.t ?? 0, wordAt("8.stage", "light"), 0.35)
    : ["8.goodbye", "8.stone", "9.call", "9.echo", "9.script"].includes(cue) || afterCurtain ? 1 : 0;
  const emptyDoor = cue === "7.empty" ? pop(active?.t ?? 0, 0.18, 0.45) : 0;
  return (
    <>
      <Zone name="class">
        <Classroom at={PLACE.class} board="BUILD NIGHT" boardSub="FRIDAY" night={night} doorOpen={emptyDoor} />
        <GodRay position={[PLACE.class[0] - 2.6, 1.9, PLACE.class[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.08} />
        <LightPool position={[PLACE.class[0], 0.02, PLACE.class[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.12} />
        <Glow position={[PLACE.class[0], 3.2, PLACE.class[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.class[0], 1.6, PLACE.class[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>
      <Zone name="hall">
        <SchoolHall at={PLACE.hall} length={16} />
        <GodRay position={[PLACE.hall[0] + 4.8, 1.8, PLACE.hall[2] + 1.5]} rotation={[0, 0, 0.3]} width={1.4} height={4.4} color="#cfe6ff" opacity={night ? 0.035 : 0.075} />
        <LightPool position={[PLACE.hall[0], 0.025, PLACE.hall[2]]} width={12} depth={3.2} color="#dceaff" opacity={night ? 0.06 : 0.11} />
        <Glow position={[PLACE.hall[0] - 5.8, 2.9, PLACE.hall[2] - 1.5]} size={1.5} color={night ? "#8bbcff" : "#fff0c8"} opacity={0.22} />
        <Dust position={[PLACE.hall[0], 1.7, PLACE.hall[2]]} area={[13, 2.5, 3]} count={32} size={0.025} color="#e5edff" opacity={0.35} seed={8} speed={0.11} />
      </Zone>
      <Zone name="lunch">
        <LunchRoom at={PLACE.lunch} sign="CAFETERIA" />
        <LightPool position={[PLACE.lunch[0], 0.025, PLACE.lunch[2] + 1]} width={11} depth={8} color="#ffe5bd" opacity={0.1} />
        <Glow position={[PLACE.lunch[0] - 4.8, 3.0, PLACE.lunch[2] - 4.3]} size={1.35} color="#ffe0a1" opacity={0.2} />
        <Dust position={[PLACE.lunch[0], 1.6, PLACE.lunch[2]]} area={[10, 2.5, 8]} count={35} size={0.025} color="#fff0dc" opacity={0.32} seed={14} speed={0.1} />
      </Zone>
      <Zone name="gym">
        <Gym at={PLACE.gym} night={night} banner="AUDITIONS" />
        <SchoolStage at={PLACE.gym} night={night} opening={curtainOpen} lit={stageLit} />
        {cue === "8.gym" ? <pointLight position={[PLACE.gym[0], PLACE.gym[1] + 4.5, PLACE.gym[2] - 6.8]} color="#9bbaff" intensity={22} distance={16} decay={2} /> : null}
        <GodRay position={[PLACE.gym[0] - 5.4, 2.5, PLACE.gym[2] + 1]} rotation={[0, 0, 0.78]} width={2.5} height={5.3} color="#fff0ce" opacity={night ? 0.025 : 0.08} />
        <LightPool position={[PLACE.gym[0], 0.03, PLACE.gym[2] - 5.3]} width={7.2} depth={5.4} color="#ffd987" opacity={(night ? 0.12 : 0.1) * stageLit} />
        <Glow position={[PLACE.gym[0], 5.4, PLACE.gym[2] - 7.1]} size={2.8} color="#ffe0a1" opacity={(night ? 0.32 : 0.2) * stageLit} />
        <Dust position={[PLACE.gym[0], 2.1, PLACE.gym[2] - 4]} area={[12, 3.4, 10]} count={50} size={0.03} color="#fff0d0" opacity={0.4} seed={21} speed={0.13} />
      </Zone>
    </>
  );
};
