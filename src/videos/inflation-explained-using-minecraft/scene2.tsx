import {
  Chest,
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  IngotStack,
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
  title: "Drought Crisis & President Sterling's Order",
  shots: [
    {
      cue: "3.crisis",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.15, 0.2),
        dist: 4.6,
        fromPitch: 6,
        toPitch: 17,
        yaw: -12,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Dry summer hits plaza: shrugging citizens stacked in depth between open empty chests.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, -0.58, 0, 0.15)} open={0.9} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, 0.58, 0, 0.15)} open={0.9} gold={0} kind="emerald" />
          <ExplainerCrowd
            positions={[on(PLACE.bakery, -0.5, 0, 0.95), on(PLACE.bakery, 0.52, 0, 0.9)]}
            animation="shrug"
            phaseStep={0.4 + t * 0.001}
            seed={2}
          />
          <FloatingNumber text="-SUPPLY" color="#ff8e2b" position={on(PLACE.bakery, 0, 1.85, 0.35)} height={0.28 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "3.empty",
      ...cam.push({
        on: on(PLACE.bakery, -0.1, 0.9, 0.4),
        dist: 3.4,
        to: 2.75,
        yaw: 14,
        pitch: 14,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Miles opens his own emerald chest and recoils at red 0 EMERALDS inside.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, 0.2, 0, 0.3)} open={ease(ramp(t, 0.05, 0.7))} gold={0} kind="emerald" />
          <CitizenLead position={on(PLACE.bakery, -0.55, 0, 0.55)} rotationY={0.75} animation="cower" face="worried" time={t} />
          <FloatingNumber text="0 EMERALDS" color="#ff4f42" position={on(PLACE.bakery, 0.15, 1.45, 0.3)} height={0.28 * pop(t, 0.3)} />
        </>
      ),
    },
    {
      cue: "3.count",
      ...cam.pan({
        from: on(PLACE.bakery, 0.9, 2.2, 3.6),
        on: on(PLACE.bakery, -0.3, 0.6, 0.6),
        onTo: on(PLACE.bakery, 0.3, 0.6, -0.8),
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Panning sweep past a row of empty open chests along the square.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, -0.45, 0, -0.6)} open={0.95} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, 0.45, 0, 0.15)} open={0.95} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, -0.35, 0, 0.85)} open={0.95} gold={0} kind="emerald" />
          <FloatingNumber text="EMPTY" color="#ff4f42" position={on(PLACE.bakery, 0, 1.35 + t * 0.12, 0.15)} height={0.28 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.sterling",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.35, -2.1),
        dist: 3.9,
        to: 3.15,
        yaw: -14,
        pitch: 5,
        fov: 40,
        screenOffset: [0, 0.03],
      }),
      zone: "hall",
      note: "Introduce Character 2 (President Sterling) centered before RoyalThrone and torches with full NameTag headroom.",
      stage: (t) => (
        <EliteLead variant="pres" nameTag="Sterling" position={on(PLACE.hall, 0, 0, -2.1)} rotationY={0.12} animation="talk" face="smug" time={t} />
      ),
    },
    {
      cue: "4.promise",
      ...cam.orbit({
        on: on(PLACE.hall, 0, 1.25, -1.8),
        dist: 3.2,
        yaw: -14,
        yawTo: 14,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Confident Sterling gestures beside stacked treasury emerald ingots promising an instant fix.",
      stage: (t) => (
        <>
          <EliteLead variant="pres" position={on(PLACE.hall, -0.25, 0, -1.9)} rotationY={0.35} animation="point" face="smile" time={t} />
          <IngotStack position={on(PLACE.hall, 0.55, 0, -1.7)} count={8} kind="gold" />
        </>
      ),
    },
    {
      cue: "4.rules",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.25, -0.5),
        onTo: on(PLACE.hall, 0, 1.35, -1.3),
        dist: 3.6,
        to: 2.85,
        yaw: 12,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling marches down the council carpet past banners and bookshelves.",
      stage: (t) => (
        <EliteLead variant="pres" position={on(PLACE.hall, 0, 0, 0.1 - t * 0.9)} rotationY={Math.PI} animation="walk" animDistance={t * 1.6} face="smug" />
      ),
    },
    {
      cue: "4.charter",
      ...cam.push({
        on: on(PLACE.hall, 0.05, 1.65, -1.6),
        dist: 3.5,
        to: 2.85,
        yaw: 14,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling pins bold printed emerald charter on RuleBoard inside frame.",
      stage: (t) => (
        <>
          <RuleBoard position={on(PLACE.hall, 0.35, 1.95, -2.0)} rotationY={-0.12} mode="order" />
          <EliteLead variant="pres" position={on(PLACE.hall, -0.42, 0, -1.3)} rotationY={0.5} animation="point" face="smile" time={t} />
          <FloatingNumber text="NEW RULE" color="#ffd84d" position={on(PLACE.hall, 0.35, 2.7, -1.9)} height={0.28 * pop(t, 0.25)} />
        </>
      ),
    },
  ],
});
