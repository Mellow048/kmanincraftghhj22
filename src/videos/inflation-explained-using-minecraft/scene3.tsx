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
        on: on(PLACE.hall, 0, 1.15, 0.8),
        dist: 4.3,
        distTo: 3.1,
        yaw: -26,
        yawTo: 22,
        pitch: 12,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "hall",
      note: "Sterling steps up cranking roaring Printer to max speed as green bills erupt beside +10,000.",
      stage: (t) => {
        const fly = (t * 2.2) % 1;
        return (
          <>
            <Printer position={on(PLACE.hall, 0.35, 0, 0.8)} rotationY={-0.25} running out={t * 10} sign="E" />
            <Bill position={on(PLACE.hall, 0.35, 1.05 + fly * 0.9, 1.0)} rotation={[0.3, fly * 2, 0]} />
            <EliteLead variant="pres" position={on(PLACE.hall, -0.58 + Math.min(0.18, t * 0.2), 0, 0.9)} rotationY={0.75} animation="press" face="grin" time={t * 1.5} />
            <FloatingNumber text="+10,000" color="#3fd46a" position={on(PLACE.hall, 0.35, 1.65 + ease(ramp(t, 0.15, 1.2)) * 0.32, 0.8)} height={0.3 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "5.chat",
      ...cam.push({
        on: on(PLACE.hall, 0, 1.5, 0.75),
        dist: 3.5,
        to: 2.35,
        yaw: 14,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      impacts: [{ at: dropWord, amp: 0.022, dur: 0.2 }],
      zone: "hall",
      note: "Fast push into spewing Printer shedding falling cash bills around +10,000 Cash ChatToast.",
      stage: (t) => {
        const fly = (t * 2.5) % 1;
        return (
          <>
            <Printer position={on(PLACE.hall, 0, 0, 0.7)} running out={t * 11} sign="E" />
            <Bill position={on(PLACE.hall, -0.3, 1.6 - fly * 0.7, 0.9)} rotation={[0.5, fly * 3, 0.3]} />
            <Bill position={on(PLACE.hall, 0.32, 1.5 - ((fly + 0.5) % 1) * 0.7, 0.9)} rotation={[-0.4, fly * 2, -0.3]} />
            <ChatToast text="[Treasury] +10,000 Cash" position={on(PLACE.hall, 0, 1.85, 0.85)} height={0.13 * pop(t, Math.min(0.25, dropWord))} />
          </>
        );
      },
    },
    {
      cue: "5.cheer",
      ...cam.crane({
        on: on(PLACE.bakery, 0, 1.15, 0.5),
        dist: 4.8,
        toDist: 3.5,
        fromPitch: 4,
        toPitch: 22,
        yaw: -18,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Jubilant crowd hops forward waving cash around bursting chest while emerald notes fly overhead.",
      stage: (t) => {
        const cheer = ease(ramp(t, 0, 1.2));
        return (
          <>
            <Chest position={on(PLACE.bakery, 0, 0, 0.2)} open={0.4 + cheer * 0.6} gold={1} kind="emerald" />
            <CitizenLead position={on(PLACE.bakery, -0.68, 0, 0.45 - cheer * 0.2)} rotationY={0.35} animation="jump" animDistance={cheer * 0.5} face="grin" time={t * 1.4} />
            <ExplainerCrowd
              positions={[
                on(PLACE.bakery, 0.68, 0, 0.35),
                on(PLACE.bakery, -0.38, 0, 1.15),
                on(PLACE.bakery, 0.42, 0, 1.1),
              ]}
              rotationY={0.1}
              animation="cheer"
              seed={5}
            />
            <FloatingNumber text="+EMERALDS" color="#ffd84d" position={on(PLACE.bakery, 0, 1.55 + cheer * 0.25, 0.25)} height={0.3 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "5.miles2",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.25, 0.4),
        dist: 3.4,
        to: 2.2,
        yaw: -18,
        pitch: 7,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles bends to scoop up a towering BillStack and raises it triumphantly into frame.",
      stage: (t) => {
        const hoist = ease(ramp(t, Math.max(0.05, scoopWord - 0.15), scoopWord + 0.35));
        return (
          <CitizenLead
            position={on(PLACE.bakery, -0.25 + hoist * 0.25, 0, 0.4)}
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
        on: on(PLACE.bakery, -0.45, 1.2, 0.8),
        by: [1.55, 0, 0],
        dist: 3.7,
        yaw: 14,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles sprints full tilt right toward bakery counter clutching his fresh thick green cash stack.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.65 + t * 1.45, 0, 0.9)} rotationY={0.45} animation="run" animDistance={t * 2.6} face="happy">
          <BillStack position={[0, -0.05, 0.2]} count={10} />
        </CitizenLead>
      ),
    },
  ],
});
