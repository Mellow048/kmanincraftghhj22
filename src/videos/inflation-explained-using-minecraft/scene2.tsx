import {
  Chest,
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  RuleBoard,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Shortage Crisis & President Sterling",
  shots: [
    {
      cue: "3.crisis",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.2, 0),
        dist: 4.8,
        fromPitch: 6,
        toPitch: 18,
        yaw: -14,
        fov: 42,
      }),
      zone: "bakery",
      note: "Dry summer shortage hits the square; empty open chests line the plaza.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, -1.0, 0, 0.2)} open={0.9} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, 1.0, 0, 0.2)} open={0.9} gold={0} kind="emerald" />
          <ExplainerCrowd
            positions={[on(PLACE.bakery, -1.4, 0, 1.2), on(PLACE.bakery, 1.3, 0, 1.1)]}
            animation="shrug"
            phaseStep={0.4 + t * 0.001}
            seed={2}
          />
        </>
      ),
    },
    {
      cue: "3.empty",
      ...cam.push({
        on: on(PLACE.bakery, 0, 0.8, 0.3),
        dist: 3.3,
        to: 2.65,
        yaw: 16,
        pitch: 15,
        fov: 40,
      }),
      zone: "bakery",
      note: "Miles opens his own chest to reveal 0 EMERALDS inside.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, 0, 0, 0.35)} open={ease(ramp(t, 0.05, 0.7))} gold={0} kind="emerald" />
          <CitizenLead position={on(PLACE.bakery, -1.1, 0, 0.6)} rotationY={0.75} animation="cower" face="worried" time={t} />
          <FloatingNumber text="0 EMERALDS" color="#ff4f42" position={on(PLACE.bakery, 0, 1.45, 0.35)} height={0.54 * pop(t, 0.35)} />
        </>
      ),
    },
    {
      cue: "4.sterling",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.35, -2.1),
        dist: 3.8,
        to: 2.95,
        yaw: -14,
        pitch: 5,
        fov: 40,
      }),
      zone: "hall",
      note: "Introduce Character 2 (President Sterling) in tailored navy suit ahead of RoyalThrone.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={on(PLACE.hall, 0, 0, -2.1)} rotationY={0.12} animation="talk" face="smug" time={t} />
      ),
    },
    {
      cue: "4.rules",
      ...cam.push({
        on: on(PLACE.hall, 0.4, 1.85, -1.5),
        dist: 3.4,
        to: 2.75,
        yaw: 16,
        pitch: 4,
        fov: 38,
      }),
      zone: "hall",
      note: "Sterling points at the framed RuleBoard charter authorizing emerald printing.",
      stage: (t) => (
        <>
          <RuleBoard position={on(PLACE.hall, 0.6, 2.0, -2.0)} rotationY={-0.15} mode="order" />
          <EliteLead variant="pres" position={on(PLACE.hall, -0.55, 0, -1.2)} rotationY={0.55} animation="point" face="smile" time={t} />
        </>
      ),
    },
  ],
});
