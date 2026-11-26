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
  wordAt,
} from "./kit";

const zeroWord = wordAt("3.empty", "zero");
const pinWord = wordAt("4.charter", "pins");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Drought Crisis & President Sterling's Order",
  shots: [
    {
      cue: "3.crisis",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.15, 0.2),
        dist: 4.8,
        toDist: 3.4,
        fromPitch: 4,
        toPitch: 20,
        yaw: -16,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      look: "overworld-golden",
      note: "Citizens pace restlessly throwing hands up beside empty chests as -SUPPLY surges upward.",
      stage: (t) => {
        const pace = ease(ramp(t, 0, 1.4));
        return (
          <>
            <Chest position={on(PLACE.bakery, -0.62, 0, 0.15)} open={0.4 + pace * 0.55} gold={0} kind="emerald" />
            <Chest position={on(PLACE.bakery, 0.62, 0, 0.15)} open={0.4 + pace * 0.55} gold={0} kind="emerald" />
            <CitizenLead position={on(PLACE.bakery, -0.55, 0, 0.85)} rotationY={0.4} animation="shrug" face="frown" time={t} />
            <ExplainerCrowd
              positions={[on(PLACE.bakery, 0.55, 0, 0.9)]}
              animation="lookAround"
              phaseStep={0.4 + t}
              seed={2}
            />
            <FloatingNumber text="-SUPPLY" color="#ff8e2b" position={on(PLACE.bakery, 0, 1.75 + pace * 0.25, 0.35)} height={0.28 * pop(t, 0.15)} />
          </>
        );
      },
    },
    {
      cue: "3.empty",
      ...cam.push({
        on: on(PLACE.bakery, -0.1, 0.9, 0.4),
        dist: 3.8,
        to: 2.45,
        yaw: 18,
        pitch: 14,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: zeroWord, amp: 0.022, dur: 0.24 }],
      look: "overworld-golden",
      zone: "bakery",
      note: "Miles leans forward ripping emerald chest lid open and reels backward as 0 EMERALDS bursts red.",
      stage: (t) => {
        const open = ease(ramp(t, 0.05, Math.max(0.25, zeroWord)));
        const step = ease(ramp(t, zeroWord, zeroWord + 0.45));
        return (
          <>
            <Chest position={on(PLACE.bakery, 0.2, 0, 0.3)} open={open} gold={0} kind="emerald" />
            <CitizenLead
              position={on(PLACE.bakery, -0.42 - step * 0.32, 0, 0.45 + step * 0.25)}
              rotationY={0.75}
              animation={step > 0.25 ? "cower" : "reach"}
              face={step > 0.25 ? "ouch" : "worried"}
              time={t}
            />
            <FloatingNumber text="0 EMERALDS" color="#ff4f42" position={on(PLACE.bakery, 0.15, 1.45 + step * 0.25, 0.3)} height={0.3 * pop(t, zeroWord)} />
          </>
        );
      },
    },
    {
      cue: "3.count",
      ...cam.pan({
        from: on(PLACE.bakery, 0.9, 2.2, 3.8),
        on: on(PLACE.bakery, -0.65, 0.6, 0.9),
        onTo: on(PLACE.bakery, 0.65, 0.6, -1.1),
        fov: 42,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-golden",
      zone: "bakery",
      note: "Sweeping pan across empty chests snapping open one after another past trudging Miles.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, -0.45, 0, -0.6)} open={ease(ramp(t, 0.4, 1.0))} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, 0.45, 0, 0.15)} open={ease(ramp(t, 0.2, 0.8))} gold={0} kind="emerald" />
          <Chest position={on(PLACE.bakery, -0.35, 0, 0.85)} open={ease(ramp(t, 0.0, 0.6))} gold={0} kind="emerald" />
          <CitizenLead position={on(PLACE.bakery, 0.15, 0, 1.05 - t * 0.85)} rotationY={Math.PI} animation="walk" animDistance={t * 1.4} face="frown" />
          <FloatingNumber text="EMPTY" color="#ff4f42" position={on(PLACE.bakery, 0, 1.45 + t * 0.18, 0.15)} height={0.28 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "4.sterling",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.35, -2.0),
        dist: 4.3,
        to: 2.75,
        yaw: -16,
        pitch: 5,
        fov: 40,
        screenOffset: [0, 0.04],
      }),
      zone: "hall",
      note: "President Sterling strides forward from throne dais adjusting suit confidently for camera.",
      stage: (t) => {
        const step = ease(ramp(t, 0, 0.95));
        return (
          <EliteLead
            variant="pres"
            nameTag="Sterling"
            position={on(PLACE.hall, 0, 0, -2.55 + step * 0.65)}
            rotationY={0.12}
            animation={step < 0.7 ? "walk" : "talk"}
            animDistance={step * 0.75}
            face="smug"
            time={t}
          />
        );
      },
    },
    {
      cue: "4.promise",
      ...cam.orbit({
        on: on(PLACE.hall, 0, 1.25, -1.8),
        dist: 3.8,
        distTo: 2.75,
        yaw: -26,
        yawTo: 24,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling gestures boldly slamming gold ingots onto pedestal while floating emerald stacks rise.",
      stage: (t) => {
        const act = ease(ramp(t, 0, 1.2));
        return (
          <>
            <EliteLead
              variant="pres"
              position={on(PLACE.hall, -0.35, 0, -1.9)}
              rotationY={0.45}
              animation={act < 0.45 ? "point" : "cheer"}
              face="smile"
              time={t}
            />
            <IngotStack position={on(PLACE.hall, 0.55, act * 0.06, -1.7)} count={5 + Math.round(act * 4)} kind="gold" />
          </>
        );
      },
    },
    {
      cue: "4.rules",
      ...cam.truck({
        on: on(PLACE.hall, 0, 1.25, 0.2),
        by: [0, 0, -1.65],
        dist: 3.6,
        yaw: 16,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling marches rapidly down crimson council hall carpet flanked by bookshelves.",
      stage: (t) => (
        <EliteLead variant="pres" position={on(PLACE.hall, 0, 0, 0.3 - t * 1.45)} rotationY={Math.PI} animation="walk" animDistance={t * 2.1} face="smug" />
      ),
    },
    {
      cue: "4.charter",
      ...cam.push({
        on: on(PLACE.hall, 0.05, 1.65, -1.6),
        dist: 3.9,
        to: 2.55,
        yaw: 16,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      impacts: [{ at: pinWord, amp: 0.025, dur: 0.22 }],
      zone: "hall",
      note: "Sterling slams crisp golden charter onto RuleBoard as NEW RULE bursts upward on pins.",
      stage: (t) => {
        const pin = ease(ramp(t, Math.max(0.05, pinWord - 0.25), pinWord + 0.12));
        return (
          <>
            <RuleBoard position={on(PLACE.hall, 0.35, 1.95 - (1 - pin) * 0.25, -2.0)} rotationY={-0.12} mode={pin > 0.35 ? "order" : "chaos"} />
            <EliteLead
              variant="pres"
              position={on(PLACE.hall, -0.55 + pin * 0.25, 0, -1.2 - pin * 0.2)}
              rotationY={0.55}
              animation={pin < 0.7 ? "press" : "point"}
              face="smile"
              time={t}
            />
            <FloatingNumber text="NEW RULE" color="#ffd84d" position={on(PLACE.hall, 0.35, 2.7, -1.9)} height={0.3 * pop(t, pinWord)} />
          </>
        );
      },
    },
  ],
});
