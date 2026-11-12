import { Block, Vox, cam, storyScene } from "../../engine";
import { Friend, HayFailure, HayTower, Hero, ramp, timing } from "./kit";
/** Beat 9: The cheap failure. The recorded words, not hand-set seconds, own every cut. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The cheap failure",
  shots: [
    {
      cue: "9.hay",
      ...cam.push({ on: [7.5, 1.5, -13.5], dist: 5.0, to: 4.5, yaw: -22, pitch: 10, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "He has made a ladder out of hay. Show the bale in his arms and the growing stack behind, with the high wall still filling the background.",
      stage: (t, { p, dur }) => (<>
        <HayTower levels={4} /><Hero position={[8, 0, -12.9]} animation="hold" face="grin" time={t + 0.8} /><Vox kind="hay" position={[8, 0.63, -12.55]} size={[0.75, 0.7, 0.65]} />
      </>),
    },
    {
      cue: "9.high",
      ...cam.push({ on: [7, 8.35, -14.3], dist: 5.4, to: 4.7, yaw: 6, pitch: -8, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "At the top of his ridiculous lookout, the boy is almost eye level with the blue boards. Do not let the lens see over the wall yet.",
      stage: (t, { p, dur }) => (<>
        <HayTower levels={8} /><Hero position={[7, 7.2, -14.3]} animation="idle" face="grin" headPitch={-0.25} time={t + 0.8} />
      </>),
    },
    {
      cue: "9.lean",
      ...cam.push({ on: [7, 4.3, -14.3], dist: 11.4, to: 10.8, yaw: -22, pitch: 0, fov: 50 }),
      zone: "village",
      look: "overworld-day",
      note: "The whole tower leans before it falls. Keep the boy and his collapsing support in one moving view so the joke is physical, not hidden by a cut.",
      stage: (t, { p, dur }) => (<>
        <HayFailure t={t} dur={dur} />
      </>),
    },
    {
      cue: "9.bury",
      ...cam.push({ on: [7.4, 1.15, -14], dist: 5.3, to: 4.7, yaw: 14, pitch: 20, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The answer is two blue shoes sticking out of hay. Stack the laughing friend closer and lower rather than placing him beside a wide pile.",
      stage: (t, { p, dur }) => (<>
        <HayTower levels={8} fall={1} /><group position={[7, 1.7, -14.3]} rotation={[0, 0, Math.PI]}><Hero animation="idle" face="ouch" time={0.8} /></group><Friend position={[7.9, 0, -12.9]} animation="laugh" face="laugh" time={t + 0.8} />
      </>),
    },
    {
      cue: "9.laugh",
      ...cam.push({ on: [7.8, 1.2, -13.3], dist: 2.8, to: 2.35, yaw: 8, pitch: 7, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Return to his offended face, spitting little pieces of straw. The friend stays laughing behind him; the failure costs dignity, not injury.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[7.8, 0, -13.3]} animation="idle" face="frown" time={t + 0.8} /><Friend position={[8.2, 0, -15]} animation="laugh" face="laugh" time={t + 0.8} />{[0,1,2,3,4].map((i) => <Block key={i} position={[7.6 + i * 0.07, 1.28 - ramp(p, 0.2, 1) * (0.2 + i * 0.08), -13.01 + i * 0.014]} rotation={[0.2, i, 0.5]} size={[0.025, 0.14, 0.025]} color="#dfbf66" />)}
      </>),
    },
  ],
});
