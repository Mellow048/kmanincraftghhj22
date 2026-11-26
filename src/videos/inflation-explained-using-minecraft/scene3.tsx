import {
  Bill,
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
  wordAt,
} from "./kit";

const dropWord = wordAt("5.chat", "drop");
const scoopWord = wordAt("5.miles2", "packs");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Ten Thousand Printed Bills & Celebration",
  shots: [
    {
      cue: "5.print",
      ...cam.orbit({
        on: on(PLACE.hall, 0, 1.25, 0.8),
        dist: 5.2,
        distTo: 4.2,
        yaw: -22,
        yawTo: 18,
        pitch: 12,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      zone: "hall",
      note: "Sterling cranks roaring Printer inside Council Hall while +10,000 floats cleanly inside 9:16.",
      stage: (t) => {
        const fly = (t * 2.2) % 1;
        return (
          <>
            <Printer position={on(PLACE.hall, 0.55, 0, 0.8)} rotationY={-0.25} running out={t * 10} sign="E" />
            <Bill position={on(PLACE.hall, 0.55, 1.05 + fly * 0.8, 1.0)} rotation={[0.3, fly * 2, 0]} />
            <EliteLead variant="pres" position={on(PLACE.hall, -0.85, 0, 0.9)} rotationY={0.75} animation="press" face="grin" time={t * 1.5} />
            <FloatingNumber text="+10,000" color="#3fd46a" position={on(PLACE.hall, 0.1, 1.95 + ease(ramp(t, 0.15, 1.2)) * 0.2, 0.8)} height={0.2 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "5.chat",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.5, 0.75),
        dist: 4.8,
        to: 3.8,
        yaw: 14,
        pitch: 8,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      impacts: [{ at: dropWord, amp: 0.022, dur: 0.2 }],
      zone: "hall",
      note: "Printer spews falling cash bills around +10,000 Cash ChatToast with zero character blocking.",
      stage: (t) => {
        const fly = (t * 2.5) % 1;
        return (
          <>
            <Printer position={on(PLACE.hall, 0, 0, 0.7)} running out={t * 11} sign="E" />
            <Bill position={on(PLACE.hall, -0.3, 1.6 - fly * 0.7, 0.9)} rotation={[0.5, fly * 3, 0.3]} />
            <Bill position={on(PLACE.hall, 0.32, 1.5 - ((fly + 0.5) % 1) * 0.7, 0.9)} rotation={[-0.4, fly * 2, -0.3]} />
            <ChatToast text="[Treasury] +10,000" position={on(PLACE.hall, 0, 2.05, 0.85)} height={0.1 * pop(t, Math.min(0.25, dropWord))} />
          </>
        );
      },
    },
    {
      cue: "5.cheer",
      ...cam.crane({
        on: on(PLACE.history, 0, 1.2, 0.4),
        dist: 5.8,
        toDist: 4.6,
        fromPitch: 8,
        toPitch: 18,
        yaw: -16,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Wide sunlit Plaza celebration around bursting emerald chest as +EMERALDS pops cleanly.",
      stage: (t) => {
        const cheer = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Chest position={on(PLACE.history, 0, 0, 0.2)} open={0.4 + cheer * 0.6} gold={1} kind="emerald" />
            <CitizenLead position={on(PLACE.history, -1.05, 0, 0.45)} rotationY={0.4} animation="jump" animDistance={cheer * 0.5} face="grin" time={t * 1.4} />
            <ExplainerCrowd
              positions={[
                on(PLACE.history, 1.05, 0, 0.35),
                on(PLACE.history, -0.55, 0, 1.25),
                on(PLACE.history, 0.55, 0, 1.2),
              ]}
              rotationY={0.1}
              animation="cheer"
              seed={5}
            />
            <FloatingNumber text="+EMERALDS" color="#ffd84d" position={on(PLACE.history, 0, 2.05 + cheer * 0.2, 0.25)} height={0.2 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "5.miles2",
      ...cam.push({
        on: on(PLACE.history, 0, 1.25, 0.4),
        dist: 4.8,
        to: 3.9,
        yaw: -18,
        pitch: 10,
        fov: 45,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "In open Town Plaza, Miles scoops up a thick BillStack cleanly.",
      stage: (t) => {
        const hoist = ease(ramp(t, Math.max(0.05, scoopWord - 0.15), scoopWord + 0.35));
        return (
          <CitizenLead
            position={on(PLACE.history, -0.1, 0, 0.4)}
            rotationY={0.2}
            animation={hoist > 0.3 ? "lift" : "reach"}
            blendTo="crouch"
            blend={1 - hoist}
            face="grin"
            time={t}
          >
            <BillStack position={[0, -0.04, 0.2]} count={5 + Math.round(hoist * 6)} />
          </CitizenLead>
        );
      },
    },
    {
      cue: "5.sprint",
      ...cam.truck({
        on: on(PLACE.history, -0.45, 1.2, 0.7),
        by: [1.55, 0, 0],
        dist: 5.2,
        yaw: 14,
        pitch: 10,
        fov: 46,
        screenOffset: [0, 0.06],
      }),
      zone: "history",
      note: "Wide tracking shot down the Plaza road as Miles sprints toward the bakery clutching cash.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.history, -0.65 + t * 1.45, 0, 0.65 + t * 0.45)} rotationY={Math.atan2(1.45, 0.45)} animation="run" animDistance={t * 2.6} face="happy">
          <BillStack position={[0, -0.05, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
  ],
});
