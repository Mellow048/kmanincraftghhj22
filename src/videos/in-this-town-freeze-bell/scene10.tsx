import { Torch, Vox, cam, storyScene, stride } from "../../engine";
import { Hero, NORTH, timing } from "./kit";
/** Beat 10: Follow the rope instead. The recorded words, not hand-set seconds, own every cut. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Follow the rope instead",
  shots: [
    {
      cue: "10.nights",
      ...cam.truck({ on: [3, 1.15, -12], dist: 4.3, yaw: 105, pitch: 8, by: [0, 0, -2], fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "A new plan has a new colour: track beside him after dark, with a real torch lighting his face as he returns behind the tower.",
      stage: (t, { p, dur }) => (<>
        <Hero {...stride([3,0,-12], [3,0,-14], p)} animation="creep" face="brave" headYaw={-1} time={t + 0.8}><Torch position={[0,-0.02,0.06]} light={4} lean={[0.7,0,0]} /></Hero>
      </>),
    },
    {
      cue: "10.follow",
      ...cam.pan({ from: [4.5, 6.7, -11], on: [0, 6.05, -11.7], onTo: [0, 6.05, -16.7], fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "Travel along the rope itself rather than another climb. The move ends at the slot he noticed in daylight.",
      stage: (t, { p, dur }) => (<>

      </>),
    },
    {
      cue: "10.boards",
      ...cam.push({ on: [3.65, 1.03, -16.2], dist: 3.6, to: 3.0, yaw: 55, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "A diagonal angle keeps the reaching hands and a slice of his face visible. The loose boards part in the actual wall, revealing the gap.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[2.9, 0, -16.15]} rotationY={1.9} animation="reach" face="brave" time={t + 0.8} /><Torch position={[2.4,0,-15.8]} light={5} seed={22} />
      </>),
    },
    {
      cue: "10.wedge",
      ...cam.push({ on: [3.55, 0.94, -16.4], dist: 2.0, to: 1.65, yaw: 38, pitch: 20, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "Close on the little wooden wedge between the boards. The repeated nights are compressed into this practical improvement, not a new montage of failures.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[2.9, 0, -16.15]} rotationY={1.9} animation="reach" face="brave" time={0.8} /><Vox kind="planks" position={[3.45 + p * 0.12, 0.95, -16.3]} rotation={[0, 0.35, 0.2]} size={[0.3,0.12,0.08]} /><Torch position={[2.4,0,-15.8]} light={5} seed={22} />
      </>),
    },
    {
      cue: "10.fit",
      ...cam.push({ on: [4, 0.95, -16.05], dist: 3.2, to: 2.7, yaw: 70, pitch: 14, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "He fits through the real opening without pulling the bell rope. His sideways grin gives the successful test a face.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-15.95 - p * 0.55]} rotationY={NORTH} animation="crouch" face="grin" headYaw={-1.15} time={0.8} /><Torch position={[2.9,0,-15.7]} light={5} seed={22} />
      </>),
    },
  ],
});
