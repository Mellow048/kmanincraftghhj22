import { cam, storyScene, stride } from "../../engine";
import { Hero, Villager, ROBE, timing, LemonadeStall } from "./kit";
import type { Vec3 } from "../../engine";

const STALL: Vec3 = [6.4, 0, -2.6];

/** THE STAND — every morning he builds, shouts, mis-counts, and sells out feeling nothing. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The stand",
  shots: [
    {
      cue: "8.stand",
      ...cam.push({ on: [6.4, 0.75, -1.4], dist: 2.9, to: 2.4, yaw: -18, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Every morning I built my stand and never looked for traffic': time-lapse — stand parts snapping up, his eyes never leaving lemons, road behind him out of focus.",
      stage: (t, { p }) => (
        <>
          <Hero position={[6.4, 0, -1.2]} animation="idle" face="grin" />
          <LemonadeStall position={STALL} />
          {/* traffic ghost blurred */}
          <Villager {...stride([10, 0, 3.8], [7, 0, 3.8], p)} walk={t * 0.8} robe={ROBE.smith} phase={1.4} />
        </>
      ),
    },
    {
      cue: "8.line",
      ...cam.truck({ on: [6.8, 1.15, -1.0], dist: 3.0, yaw: 65, pitch: 4, by: [ -2.0, 0, 0], fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Every day I shouted louder and never counted change right': tracking with shouting, coins spilling wrong — he grins through it.",
      stage: (t) => (
        <>
          <Hero position={[6.4, 0, -1.1]} animation="talk" face="laugh" />
          <Villager position={[5.1, 0, -0.3]} robe={ROBE.brown} lookAt={[6.4, 1.2, -1.1]} phase={0.3} />
          {/* spilled coins */}
          <Block position={[6.6, 0.02, -0.9]} size={[0.22, 0.02, 0.22]} color="#e8c44a" />
          <Block position={[6.75, 0.02, -0.82]} size={[0.18, 0.02, 0.18]} color="#e8c44a" />
        </>
      ),
    },
    {
      cue: "8.money",
      ...cam.push({ on: [6.8, 1.05, -1.9], dist: 2.1, to: 1.8, yaw: 28, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'I sold out by noon and felt nothing': close on empty pitcher tipped, his face pleased but eyes flat — nothing behind it.",
      stage: () => (
        <>
          <Hero position={[6.4, 0, -1.1]} animation="idle" face="smile" gaze={0} />
          <Block position={[5.85, 0.68, -2.5]} size={[0.22, 0.32, 0.22]} color="#ffd44a" />
        </>
      ),
    },
  ],
});

import { Block } from "../../engine";
