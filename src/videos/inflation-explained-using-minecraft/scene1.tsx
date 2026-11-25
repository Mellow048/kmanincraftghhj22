import type React from "react";
import {
  Bread,
  Chest,
  CitizenLead,
  Coin,
  EliteLead,
  FloatingNumber,
  PLACE,
  Pickaxe,
  PriceTag,
  Printer,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

/** Shared Frame-0 & Final-Loop Climax Stage (`1.hook` == `8.loop` for seamless replay). */
export const CLIMAX_HOOK_OPT = {
  on: on(PLACE.bakery, 0, 1.35, -0.5),
  dist: 3.8,
  to: 3.1,
  yaw: 14,
  pitch: 8,
  fov: 40,
};

export const InflationLoopStage: React.FC<{ t: number }> = ({ t }) => {
  const surge = ease(ramp(t, 0.15, 0.95));
  return (
    <>
      <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.7} />
      <PriceTag
        text={surge > 0.45 ? "100" : "1"}
        position={on(PLACE.bakery, 0, 1.9, -0.5)}
        scale={1.2 + surge * 0.25}
        swing={Math.sin(t * 6) * 0.14}
      />
      <Printer position={on(PLACE.bakery, -1.2, 0, -0.8)} rotationY={0.45} running out={t * 6} sign="E" />
      <CitizenLead
        position={on(PLACE.bakery, 1.05, 0, 0.1)}
        rotationY={-0.6}
        animation="panic"
        face="wow"
        lookAt={on(PLACE.bakery, 0, 1.2, -0.6)}
        time={t}
      />
      <EliteLead
        variant="pres"
        position={on(PLACE.bakery, -1.4, 0, 0.2)}
        rotationY={0.65}
        animation="cheer"
        face="smug"
        time={t}
      />
    </>
  );
};

const mineHit = wordAt("2.miles", "mines");
const dryWord = wordAt("3.crisis", "short");

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Cold Climax Hook & One-Emerald Bread",
  shots: [
    {
      cue: "1.hook",
      ...cam.push(CLIMAX_HOOK_OPT),
      zone: "bakery",
      note: "Frame-0 climax: bread price flips 1->100 while emerald printer runs between Miles and Sterling.",
      stage: (t) => <InflationLoopStage t={t} />,
    },
    {
      cue: "2.bread",
      ...cam.push({
        on: on(PLACE.bakery, 0.1, 1.25, -0.6),
        dist: 3.1,
        to: 2.55,
        yaw: -14,
        pitch: 10,
        fov: 38,
      }),
      zone: "bakery",
      note: "Clean anchor shot: one golden Bread loaf on the plinth with spinning emerald coin and PriceTag 1.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.6)} scale={1.8} />
          <PriceTag text="1" position={on(PLACE.bakery, 0, 1.85, -0.55)} scale={pop(t, 0.15) * 1.2} />
          <Coin position={on(PLACE.bakery, 0.72, 1.28, -0.4)} kind="emerald" spin={t * 3.5} size={0.44} />
        </>
      ),
    },
    {
      cue: "2.miles",
      ...cam.orbit({
        on: on(PLACE.mine, 0, 1.15, 0),
        dist: 3.6,
        yaw: -18,
        yawTo: 8,
        pitch: 8,
        fov: 40,
      }),
      zone: "mine",
      note: "Introduce Character 1 (Miles) swinging a Pickaxe outside the cobble mine.",
      stage: (t) => (
        <CitizenLead
          nameTag="Miles"
          position={on(PLACE.mine, -0.1, 0, 0.2)}
          rotationY={-0.35}
          animation="press"
          face="calm"
          time={t + mineHit}
        >
          <Pickaxe position={[0, -0.15, 0.22]} rotation={[1.2, 0, 0]} scale={0.9} />
        </CitizenLead>
      ),
    },
    {
      cue: "2.miles",
      cut: 1.5,
      ...cam.truck({
        on: on(PLACE.bakery, -0.3, 1.1, 0.4),
        dist: 3.4,
        yaw: 12,
        pitch: 8,
        by: [1.3, 0, 0],
        fov: 40,
      }),
      zone: "bakery",
      note: "Sub-cut to Miles walking happily back from the bakery holding his loaf.",
      stage: (t) => (
        <CitizenLead
          position={on(PLACE.bakery, -0.4 + t * 0.9, 0, 0.4)}
          rotationY={0.2}
          animation="walk"
          animDistance={t * 1.4}
          face="smile"
        >
          <Bread position={[0, -0.05, 0.2]} scale={0.75} />
        </CitizenLead>
      ),
    },
    {
      cue: "3.crisis",
      ...cam.push({
        on: on(PLACE.bakery, 0, 0.8, 0.3),
        dist: 3.4,
        to: 2.75,
        yaw: 18,
        pitch: 16,
        fov: 40,
      }),
      zone: "bakery",
      note: "Summer emerald shortage: chest lid swings open empty while red 0 EMERALDS pops overhead.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, 0, 0, 0.35)} open={ease(ramp(t, 0.1, dryWord + 0.3))} gold={0} kind="emerald" />
          <CitizenLead
            position={on(PLACE.bakery, -1.15, 0, 0.7)}
            rotationY={0.7}
            animation="shrug"
            face="worried"
            time={t}
          />
          <FloatingNumber
            text="0 EMERALDS"
            color="#ff4f42"
            position={on(PLACE.bakery, 0, 1.45, 0.35)}
            height={0.55 * pop(t, 0.45)}
          />
        </>
      ),
    },
  ],
});
