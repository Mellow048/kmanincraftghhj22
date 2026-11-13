import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp, ease, FearGhost, Cart, SubscribeSign } from "./kit";

const STAND: Vec3 = [6.4, 0, -1.2];
const FEAR_AT: Vec3 = [6.9, 0, -1.0];
const FRIEND: Vec3 = [5.6, 0, -0.6];
const INCH = wordAt("14.seen", "inch");
const SHAKING = wordAt("14.waved", "shaking");

/** THE BUTTON — friend stops cart an inch from stand, both shaking, subscribe. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The button",
  shots: [
    {
      cue: "14.seen",
      ...cam.push({ on: [5.9, 1.05, 2.8], dist: 3.4, to: 2.7, yaw: -62, pitch: -6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Then my friend pulled the cart and it stopped an inch from my stand': from low behind stall — friend diving at cart, hands on side, wheels locked inches from stall leg.",
      stage: (t) => {
        const s = ramp(t, INCH - 0.45, INCH);
        return (
          <>
            <Cart position={[4.0 - s * 2.1, 0, 3.0]} />
            <Villager position={[4.4 - s * 2.1, 0, 2.6]} scale={0.7} kid robe={ROBE.friend} rotationY={-1.9} walk={s * 2.1} phase={1.1} />
            <Hero position={STAND} animation="idle" face="fear" gaze={0} />
            <FearGhost position={FEAR_AT} rotationY={-1.1} />
          </>
        );
      },
    },
    {
      cue: "14.waved",
      ...cam.push({ on: [5.85, 1.08, -0.4], dist: 1.9, to: 1.55, yaw: 14, pitch: 4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'She was shaking. I was finally shaking with her': two-shot — both shaking, his fear now back in his chest where it belongs.",
      stage: (t) => (
        <>
          <Hero position={[6.4, 0, -1.1]} animation="idle" face="fear" gaze={0} headPitch={0.08 + Math.sin(t * 9) * 0.04} />
          <Villager position={FRIEND} scale={0.7} kid robe={ROBE.friend} rotationY={2.0} lookAt={[6.4, 1.0, -1.1]} phase={1.1} />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [6.4, 1.45, -1.2], dist: 2.4, to: 1.95, yaw: -6, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Subscribe before you sell the feeling that keeps you alive': him centre, fear now beside him not separate — red sign behind, stall and cart frozen inches apart.",
      stage: (t) => (
        <>
          <Hero position={STAND} animation="idle" face="brave" gaze={0} />
          <FearGhost position={[6.95, 0, -1.05]} rotationY={-0.2} />
          <SubscribeSign position={[6.4, 1.85, -2.8]} rotationY={0} scale={0.34} tilt={Math.sin(t * 12) * 0.015} />
          <Cart position={[1.9, 0, 3.0]} />
        </>
      ),
    },
  ],
});
