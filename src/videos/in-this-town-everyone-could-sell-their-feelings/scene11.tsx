import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, pop, ramp, FearGhost, Cart } from "./kit";

const STAND: Vec3 = [6.4, 0, -1.2];
const FEAR_AT: Vec3 = [6.9, 0, -1.0];
const YELLOW_W = wordAt("11.yellow", "watching");
const SHAKE_W = wordAt("11.caught", "shook");

/** THE FEAR — yellow small watching the road he never watched. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The fear",
  shots: [
    {
      cue: "11.stand",
      ...cam.push({ on: [6.9, 0.55, -1.0], dist: 2.4, to: 1.95, yaw: -32, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Then I saw my fear standing at my stand': reveal — tiny yellow him at his stand corner, facing road. Not wave, not smile. Just standing.",
      stage: (t) => (
        <>
          <Hero position={STAND} rotationY={-0.2} animation="idle" face="wow" gaze={0} />
          <FearGhost position={FEAR_AT} rotationY={-1.1} shake={0} />
          <Cart position={[4.2, 0, 3.8]} />
        </>
      ),
    },
    {
      cue: "11.yellow",
      ...cam.push({ on: [6.9, 0.62, -1.0], dist: 1.75, to: 1.4, yaw: -38, pitch: 2, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'Yellow, small, watching the road I never watched': close on fear — colour is the emotion, size is the cost, eyes locked on road, not on him.",
      stage: (t) => (
        <>
          <FearGhost position={FEAR_AT} rotationY={-1.57} />
          {/* Road behind */}
          <Cart position={[3.4, 0, 3.8]} />
        </>
      ),
    },
    {
      cue: "11.caught",
      ...cam.push({ on: [6.88, 0.62, -1.0], dist: 1.85, to: 1.5, yaw: -42, pitch: 0, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'It didn't wave. It just stared at the cart and shook': fear's whole body shake on 'shook' — tiny tremor, not comedic, staying on road. He still doesn't get it.",
      stage: (t) => (
        <>
          <FearGhost position={FEAR_AT} rotationY={-1.57} shake={SHAKE_W} />
          <Cart position={[2.9 - ramp(t, SHAKE_W - 0.3, SHAKE_W + 0.6) * 0.8, 0, 3.8]} />
        </>
      ),
    },
    {
      cue: "11.cold",
      ...cam.push({ on: [6.35, 1.18, -1.0], dist: 1.85, to: 1.5, yaw: -12, pitch: -2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'And for the first time that week I felt cold': cut to his face — colour drains, smile gone. The town warm, him cold.",
      stage: () => <Hero position={STAND} animation="idle" face="frown" gaze={0} headPitch={0.08} />,
    },
  ],
});
