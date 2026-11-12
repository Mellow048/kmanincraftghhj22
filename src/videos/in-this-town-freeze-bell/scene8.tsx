import { cam, storyScene } from "../../engine";
import { Hero, IN_BED, NightTorch, room, timing } from "./kit";
/** Beat 8: What did we look like?. The recorded words, not hand-set seconds, own every cut. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "What did we look like?",
  shots: [
    {
      cue: "8.awake",
      ...cam.top({ on: [-1.15, 0.6, 79.4], height: 3.9, to: 3.4, spin: [-5, 5], fov: 42 }),
      zone: "room",
      look: "overworld-night",
      note: "A slow overhead turn above his own bed. He practices the frozen pose while asking the question that the toy-box reveal will answer.",
      stage: (t, { p, dur }) => (<>
        <Hero position={IN_BED} animation="lie" face="uneasy" headYaw={0.2} time={0.8} breath={0.15} weightShift={0} /><NightTorch />
      </>),
    },
    {
      cue: "8.decide",
      ...cam.push({ on: [-1.15, 1.05, 80.35], dist: 2.7, to: 2.2, yaw: 8, pitch: 7, fov: 38 }),
      zone: "room",
      look: "overworld-night",
      note: "His feet come to the edge of the bed and his face changes on the cut. The decision is to see the ringer for himself.",
      stage: (t, { p, dur }) => (<>
        <Hero position={room(-1.15, 0.1, 0.35)} animation="sit" face="brave" time={t + 0.8} /><NightTorch />
      </>),
    },
  ],
});
