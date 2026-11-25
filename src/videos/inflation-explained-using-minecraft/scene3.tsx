import {
  BillStack,
  ChatToast,
  Chest,
  CitizenLead,
  EliteLead,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  Printer,
  cam,
  ease,
  on,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Printing Ten Thousand Notes",
  shots: [
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
      note: "Sterling cranks on the emerald Printer pouring fresh banknotes across the carpet.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0.35, 0, 0.8)} rotationY={-0.25} running out={t * 7} sign="E" />
          <EliteLead variant="pres" position={on(PLACE.hall, -0.85, 0, 0.9)} rotationY={0.75} animation="press" face="grin" time={t} />
          <FloatingNumber text="+10,000" color="#3fd46a" position={on(PLACE.hall, 0.4, 1.65 + ease(ramp(t, 0.25, 1.3)) * 0.3, 0.8)} height={0.58 * pop(t, 0.25)} />
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
      note: "Sub-cut insert on server ChatToast broadcasting +10,000 Emeralds while Printer runs.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0, 0, 0.7)} running out={t * 9} sign="E" />
          <ChatToast text="[Treasury] +10,000 Emeralds" position={on(PLACE.hall, 0.15, 1.75, 0.85)} height={0.26 * pop(t, 0.08)} />
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
      note: "Town crowd cheers around overflowing gold-and-emerald open chests.",
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
          <FloatingNumber text="+EMERALDS" color="#ffd84d" position={on(PLACE.bakery, 0, 1.5, 0.2 + t * 0.01)} height={0.56 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.miles2",
      ...cam.push({
        on: on(PLACE.bakery, -0.2, 1.25, 0.8),
        dist: 3.7,
        to: 3.0,
        yaw: 16,
        pitch: 8,
        fov: 40,
      }),
      zone: "bakery",
      note: "Miles sprints toward the bakery excitedly carrying a stacked emerald bundle.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.8 + t * 0.85, 0, 1.1)} rotationY={0.45} animation="run" animDistance={t * 2.2} face="happy">
          <BillStack position={[0, -0.05, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
  ],
});
