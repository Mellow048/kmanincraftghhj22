import {
  ChatToast,
  Chest,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  Printer,
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
  title: "President Sterling & The Emerald Printer",
  shots: [
    {
      cue: "4.sterling",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.35, -2.1),
        dist: 3.8,
        to: 3.0,
        yaw: -14,
        pitch: 5,
        fov: 40,
      }),
      zone: "hall",
      note: "Introduce Character 2 (President Sterling) standing confidently ahead of the RoyalThrone.",
      stage: (t) => (
        <EliteLead
          variant="pres"
          nameTag="Sterling"
          position={on(PLACE.hall, 0, 0, -2.1)}
          rotationY={0.12}
          animation="talk"
          face="smug"
          time={t}
        />
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
      note: "Sterling gestures at the new RuleBoard order charter inside the council hall.",
      stage: (t) => (
        <>
          <RuleBoard position={on(PLACE.hall, 0.6, 2.0, -2.0)} rotationY={-0.15} mode="order" />
          <EliteLead
            variant="pres"
            position={on(PLACE.hall, -0.55, 0, -1.2)}
            rotationY={0.55}
            animation="point"
            face="smile"
            time={t}
          />
        </>
      ),
    },
    {
      cue: "5.print",
      ...cam.orbit({
        on: on(PLACE.hall, 0, 1.15, 0.8),
        dist: 3.7,
        yaw: -20,
        yawTo: 12,
        pitch: 12,
        fov: 40,
      }),
      zone: "hall",
      note: "Sterling fires up the emerald Printer, pouring notes across the hall carpet.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0.35, 0, 0.8)} rotationY={-0.25} running out={t * 7} sign="E" />
          <EliteLead
            variant="pres"
            position={on(PLACE.hall, -0.85, 0, 0.9)}
            rotationY={0.75}
            animation="press"
            face="grin"
            time={t}
          />
          <FloatingNumber
            text="+10,000"
            color="#3fd46a"
            position={on(PLACE.hall, 0.4, 1.65 + ease(ramp(t, 0.3, 1.4)) * 0.3, 0.8)}
            height={0.6 * pop(t, 0.3)}
          />
        </>
      ),
    },
    {
      cue: "5.print",
      cut: 1.5,
      ...cam.push({
        on: on(PLACE.hall, 0.2, 1.5, 0.7),
        dist: 2.7,
        to: 2.25,
        yaw: 8,
        pitch: 4,
        fov: 38,
      }),
      zone: "hall",
      note: "Hard insert on server ChatToast broadcasting +10,000 Emeralds while Printer keeps running.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0, 0, 0.7)} running out={t * 9} sign="E" />
          <ChatToast
            text="[Treasury] +10,000 Emeralds"
            position={on(PLACE.hall, 0.15, 1.75, 0.85)}
            height={0.26 * pop(t, 0.08)}
          />
        </>
      ),
    },
    {
      cue: "5.cheer",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.1, 0.4),
        dist: 4.5,
        fromPitch: 6,
        toPitch: 20,
        yaw: -14,
        fov: 42,
      }),
      zone: "bakery",
      note: "Town crowd cheers in the sunny square around an overflowing open emerald Chest.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, 0, 0, 0.2)} open={1} gold={1} kind="emerald" />
          <ExplainerCrowd
            positions={[
              on(PLACE.bakery, -1.6, 0, 0.4),
              on(PLACE.bakery, -1.0, 0, 1.5),
              on(PLACE.bakery, 1.2, 0, 1.3),
              on(PLACE.bakery, 1.7, 0, 0.3),
            ]}
            rotationY={0.1}
            animation="cheer"
            seed={5}
          />
          <FloatingNumber text="+EMERALDS" color="#ffd84d" position={on(PLACE.bakery, 0, 1.5, 0.2 + t * 0.01)} height={0.55 * pop(t, 0.1)} />
        </>
      ),
    },
  ],
});
