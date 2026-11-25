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
  title: "Ten Thousand Printed Bills & Celebration",
  shots: [
    {
      cue: "5.print",
      ...cam.orbit({
        on: on(PLACE.hall, 0, 1.15, 0.8),
        dist: 3.8,
        yaw: -16,
        yawTo: 12,
        pitch: 12,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling cranks emerald Printer to max speed while glowing +10,000 rises cleanly.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0.35, 0, 0.8)} rotationY={-0.25} running out={t * 8} sign="E" />
          <EliteLead variant="pres" position={on(PLACE.hall, -0.48, 0, 0.9)} rotationY={0.75} animation="press" face="grin" time={t} />
          <FloatingNumber text="+10,000" color="#3fd46a" position={on(PLACE.hall, 0.35, 1.65 + ease(ramp(t, 0.2, 1.2)) * 0.25, 0.8)} height={0.3 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "5.chat",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.5, 0.75),
        dist: 2.9,
        to: 2.4,
        yaw: 8,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "hall",
      note: "Tight centered server broadcast ChatToast +10,000 Emeralds while Printer pours notes.",
      stage: (t) => (
        <>
          <Printer position={on(PLACE.hall, 0, 0, 0.7)} running out={t * 9} sign="E" />
          <ChatToast text="[Treasury] +10,000 Cash" position={on(PLACE.hall, 0, 1.85, 0.85)} height={0.13 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.cheer",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.15, 0.5),
        dist: 4.5,
        fromPitch: 6,
        toPitch: 19,
        yaw: -12,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Depth-stacked citizen crowd cheers joyfully around gold-and-emerald open Chest.",
      stage: (t) => (
        <>
          <Chest position={on(PLACE.bakery, 0, 0, 0.2)} open={1} gold={1} kind="emerald" />
          <ExplainerCrowd
            positions={[
              on(PLACE.bakery, -0.68, 0, 0.3),
              on(PLACE.bakery, 0.68, 0, 0.35),
              on(PLACE.bakery, -0.38, 0, 1.15),
              on(PLACE.bakery, 0.42, 0, 1.1),
            ]}
            rotationY={0.1}
            animation="cheer"
            seed={5}
          />
          <FloatingNumber text="+EMERALDS" color="#ffd84d" position={on(PLACE.bakery, 0, 1.55, 0.25 + t * 0.01)} height={0.3 * pop(t, 0.1)} />
        </>
      ),
    },
    {
      cue: "5.miles2",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, 0.4),
        dist: 2.9,
        to: 2.35,
        yaw: -14,
        pitch: 6,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles scoops up a thick stacked bundle of fresh green banknotes beaming.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, 0, 0, 0.4)} rotationY={0.2} animation="lift" face="grin" time={t}>
          <BillStack position={[0, -0.04, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
    {
      cue: "5.sprint",
      ...cam.truck({
        on: on(PLACE.bakery, -0.2, 1.2, 0.8),
        dist: 3.5,
        yaw: 14,
        pitch: 8,
        by: [0.85, 0, 0],
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles sprints eagerly back toward the bakery counter carrying his green cash.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.35 + t * 0.9, 0, 0.9)} rotationY={0.45} animation="run" animDistance={t * 2.2} face="happy">
          <BillStack position={[0, -0.05, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
  ],
});
