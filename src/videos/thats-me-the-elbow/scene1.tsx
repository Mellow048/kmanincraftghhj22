import { cam, storyScene } from "../../engine";
import { timing, w, Shutter } from "./kit";
import { PartyStart } from "./action";
import { LiftPrint, PIC } from "./paper";
const click = w("1.left", "left") + 0.14;
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Already too late",
  shots: [
    {
      cue: "1.left",
      ...cam.push({ on: [0.03, 1.38, -0.23], onTo: [0.12, 1.42, -0.25], dist: 5.24, to: 4.35, yaw: -5, pitch: 3, fov: 43 }),
      zone: "yard",
      note: "Mid-dance, Gran and his green-shirted friend swing together for the lens. No title, no empty street.",
      stage: (t) => <PartyStart t={t} />,
    },
    {
      cue: "1.left",
      cut: click,
      ...cam.push({ on: PIC, dist: 3.6, to: 3.34, yaw: 1, pitch: 0, fov: 43 }),
      zone: "kitchen",
      note: "The flash makes the moving party a piece of paper. The only blue is a sleeve crossing its left border.",
      stage: (t) => (
        <>
          <LiftPrint name="elbow" t={t} label="LAST BIRTHDAY" />
          <Shutter t={t} />
        </>
      ),
    },
    {
      cue: "1.elbow",
      ...cam.push({ on: [0.13, 1.57, 0.6], onTo: [-0.22, 1.54, 0.6], dist: 3.27, to: 2.54, yaw: -2, pitch: 0, fov: 43 }),
      zone: "kitchen",
      note: "Leave the boy in green on “not him”; slide left on the paper, to the bit of sweater he is claiming.",
      stage: (t) => <LiftPrint name="elbow" t={t + 1} label="LAST BIRTHDAY" />,
    },
  ],
});
