import { cam, storyScene } from "../../engine";
import { Hero, timing } from "./kit";
/** Beat 4: The question. The recorded words, not hand-set seconds, own every cut. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The question",
  shots: [
    {
      cue: "4.itch",
      ...cam.push({ on: [-12, 1.2, -2.8], dist: 3.2, to: 2.7, yaw: 8, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Put the empty doorstep above the teller shoulder. His glance back makes the closed house the cause of his question.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-12, 0, -2.8]} animation="idle" face="uneasy" headYaw={-0.6} time={t + 0.8} />
      </>),
    },
    {
      cue: "4.who",
      ...cam.push({ on: [-12, 1.23, -2.8], dist: 1.95, to: 1.6, yaw: 4, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Four plain words, one close face. He wants to know who rings the bell, not win a contest or escape his home.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[-12, 0, -2.8]} animation="shrug" face="frown" time={t + 0.8} />
      </>),
    },
  ],
});
