import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, LAST_BLINKS, MOON, SubscribeSign, blinkAt, timing } from "./kit";

/** Where he stands for the last picture: a few steps out of his own door, with his back to the square. */
const ME: Vec3 = [0, 0, 5.95];
const BLINK = LAST_BLINKS["14.sub"];

/** THE BUTTON. It knows him now. Every night it finds his house, and every time it blinks they take one step. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The button",
  shots: [
    {
      cue: "14.knows",
      ...cam.push({ on: MOON, dist: 84, to: 74, yaw: 180, pitch: -37, fov: 24 }),
      zone: "village",
      note: "'But it knows me now': the eye, filling the frame, looking down at one roof out of all the roofs. It does not need the well any more.",
      stage: () => null,
    },
    {
      cue: "14.blinks",
      ...cam.push({ on: [0, 4.6, 9], dist: 11.4, to: 10.4, yaw: 180, pitch: -19, fov: 56 }),
      zone: "village",
      note: "'It finds my house and blinks': his house, some later night, white with it. Scarecrows stand in the square with their backs to us, facing his door. On 'blinks' the eye shuts, the white goes out, and each of them takes one step.",
      stage: () => null,
    },
    {
      cue: "14.step",
      ...cam.push({ on: [0.2, 1.6, 4.4], dist: 3.5, to: 3.9, yaw: 0, pitch: -12, fov: 50 }),
      zone: "village",
      note: "'One step closer to my door': the same square from his doorstep. Now they are facing us, all the way back up the lane. On 'one' it blinks again. One step.",
      stage: () => null,
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [0, 1.52, ME[2]], dist: 3.3, to: 3.05, yaw: 0, pitch: -9, fov: 46 }),
      zone: "village",
      note: "'Subscribe before it blinks again': him, with the red sign, and the square behind his back. On 'blinks' the light goes. When it comes back the nearest one is at his shoulder, and its head goes slowly over on one side.",
      stage: (t) => {
        const after = t > BLINK + 0.2;
        return (
          <>
            <Hero position={ME} animation="hold" face={after ? "fear" : "uneasy"} gaze={after ? 1 : 0} saccade={false} headYaw={after ? 0.12 : 0} />
            <SubscribeSign position={[ME[0], 0.64, ME[2] + 0.34]} scale={0.62} tilt={Math.sin(t * 17) * 0.02 + (after ? Math.sin(t * 31) * 0.025 : 0)} />
          </>
        );
      },
    },
  ],
});

void blinkAt;
