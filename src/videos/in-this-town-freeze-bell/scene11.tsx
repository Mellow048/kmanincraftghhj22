import { Torch, cam, storyScene, stride } from "../../engine";
import { Hero, TownPeople, timing } from "./kit";
/** Beat 11: The price of looking. The recorded words, not hand-set seconds, own every cut. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The price of looking",
  shots: [
    {
      cue: "11.cost",
      ...cam.push({ on: [3.6,1.15,-15.2], dist: 2.8, to: 2.35, yaw: 20, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "The successful gap looks less comforting at night. Push in as he admits that this test has never happened while anyone was watching.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[3.6,0,-15.2]} animation="idle" face="uneasy" time={t + 0.8}><Torch position={[0,-0.02,0.06]} light={4} /></Hero>
      </>),
    },
    {
      cue: "11.day",
      ...cam.push({ on: [3.6,1.15,-15.2], dist: 2.8, to: 2.35, yaw: 20, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "A daylight match cut answers the previous night frame. The same boy and the same gap must be there when the bell actually rings.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[3.6,0,-15.2]} animation="idle" face="frown" time={0.8} />
      </>),
    },
    {
      cue: "11.help",
      ...cam.push({ on: [4,1.05,-16.05], dist: 3.2, to: 2.7, yaw: 40, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Hold the opening around his shoulders, with his hand out toward us. The picture makes the cost concrete: nobody would move to pull him back.",
      stage: (t, { p, dur }) => (<>
        <Hero position={[4,0,-16.05]} animation="reach" face="fear" time={0.8} /><TownPeople frozen />
      </>),
    },
    {
      cue: "11.door",
      ...cam.truck({ on: [-10.5,1.15,-2.8], dist: 3.7, yaw: 8, pitch: 9, by: [-1.2,0,0], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Walk past the blue-roofed house again. The closed door is the price already paid by someone he knows, not a new threat.",
      stage: (t, { p, dur }) => (<>
        <Hero {...stride([-10.5,0,-2.8],[-11.7,0,-2.8],p)} animation="walk" face="uneasy" headYaw={0.7} />
      </>),
    },
  ],
});
