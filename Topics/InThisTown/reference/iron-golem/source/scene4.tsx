import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bucket, Hero, IronGolem, Kid, SmallHouse, SnowGolem, WEST, beside, ease, jolt, ramp, timing, wordAt } from "./kit";

const WELL_SIDE: Vec3 = [-2.6, 0, 5.3];
const LIFT = wordAt("4.bucket", "lift");

/** THE MEASURE OF IT. What theirs can lift, and what mine cannot. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A house, a bucket",
  shots: [
    {
      cue: "4.house",
      ...cam.push({ on: [8.6, 3.7, 2.2], onTo: [7.9, 3.7, 2.2], dist: 14.5, to: 13, yaw: -80, pitch: -8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "'The other golems could lift a house': from low in the road, an iron golem walks at us with a whole small house over its head, garden and all. Its kid walks in front, not even looking.",
      stage: (t) => {
        const d = 1.05 * t;
        const g: Vec3 = [9.2 - d, 0, 2.2];
        return (
          <>
            <IronGolem position={g} rotationY={WEST} walk={d} armR={-2.95} armL={-2.95} />
            <SmallHouse position={[g[0] - 0.25, 3.86 + Math.abs(Math.sin(d * 2.4)) * 0.05, g[2]]} rotationY={WEST} tilt={Math.sin(d * 2.4) * 0.015} />
            <Kid n={2} position={[g[0] - 2.6, 0, 3.3]} rotationY={WEST} animation="walk" animDistance={d} face="smug" />
          </>
        );
      },
    },
    {
      cue: "4.bucket",
      ...cam.push({ on: [-2.6, 0.85, 5.5], dist: 4.3, to: 3.6, yaw: 30, pitch: 8, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Puddle could not lift a bucket': both his sticks hooked under the handle, he heaves, and the bucket stays where it is. The sticks slip off and he rocks back. The teller looks at us.",
      stage: (t) => {
        const heave = ramp(t, 0.1, LIFT) * (1 - ramp(t, LIFT + 0.12, LIFT + 0.2));
        const slip = ease(ramp(t, LIFT + 0.12, LIFT + 0.24));
        const arm = { raise: -0.3 + 0.06 * Math.sin(t * 40) * heave + 1.3 * slip, swing: 1.85 - 0.9 * slip };
        return (
          <>
            <SnowGolem position={WELL_SIDE} lean={-0.1 * heave - 0.16 * slip + jolt(t, LIFT + 0.2, 0.2)} headPitch={0.3 - 0.5 * slip} armR={arm} armL={arm} />
            <Bucket position={beside(WELL_SIDE, 0, 0, 0.5 + 0.03 * heave, 0.63)} />
            <Hero position={[-3.75, 0, 4.6]} rotationY={0.9} animation="idle" face="blank" headYaw={-0.6 * ease(ramp(t, LIFT + 0.15, LIFT + 0.4))} gaze={0} />
          </>
        );
      },
    },
  ],
});
