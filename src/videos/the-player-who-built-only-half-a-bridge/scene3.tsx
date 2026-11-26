import { cam, storyScene } from "../../engine";
import { OakPlankItem } from "./bridge";
import {
  NORTH,
  PLACE,
  SOUTH,
  ServerPlayer,
  WEST,
  ease,
  on,
  ramp,
  timing,
  walkSegment,
  wordAt,
} from "./kit";

const CUT_BEDROOM = wordAt("3.cut", "bedroom");
const CUT_DADS = wordAt("3.sister", "Dad's");
const CUT_TOBY = wordAt("3.desk", "Toby");
const CUT_MIDDLE = wordAt("3.promise", "middle");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "IRL Secret",
  shots: [
    {
      cue: "3.cut",
      ...cam.push({ on: on(PLACE.irl, -0.4, 1.25, -1.2), dist: 5.4, to: 4.1, yaw: 16, pitch: 10, fov: 46 }),
      zone: "irl",
      look: "warm-room",
      note: "Hard cutaway out of Minecraft into Toby's real bedroom as he walks to his glowing PC desk beside Maya's empty dark desk.",
      stage: (t) => {
        const tobyWalk = walkSegment(on(PLACE.irl, -2.5, 0, 0.7), on(PLACE.irl, -1.25, 0, -0.45), t, 0, 1.25);
        return (
          <ServerPlayer {...tobyWalk} role="hero" face="uneasy" time={t} />
        );
      },
    },
    {
      cue: "3.cut",
      cut: CUT_BEDROOM,
      ...cam.orbit({ on: on(PLACE.irl, -1.25, 1.25, -1.05), dist: 4.2, distTo: 3.1, yaw: 24, yawTo: -16, pitch: 10, fov: 44 }),
      zone: "irl",
      look: "warm-room",
      note: "Warm desk lamp highlights Toby leaning anxiously toward WAITING FOR MAYA on his bright screen.",
      stage: (t) => (
        <ServerPlayer
          position={on(PLACE.irl, -1.25, 0, -0.5)}
          rotationY={NORTH}
          role="hero"
          animation="leanOver"
          face="frown"
          headPitch={-0.14}
          time={t}
        />
      ),
    },
    {
      cue: "3.sister",
      ...cam.truck({ on: on(PLACE.irl, -0.4, 1.15, -0.7), by: [1.85, 0, 0], dist: 4.8, yaw: -12, pitch: 12, fov: 46 }),
      zone: "irl",
      look: "warm-room",
      note: "Toby walks over beside Maya's unlit dark OFFLINE second desk and empty chair in the bedroom.",
      stage: (t) => {
        const walk = walkSegment(on(PLACE.irl, -1.25, 0, -0.35), on(PLACE.irl, 0.2, 0, -0.35), t, 0, 1.3);
        return (
          <ServerPlayer {...walk} role="hero" face="uneasy" time={t} />
        );
      },
    },
    {
      cue: "3.sister",
      cut: CUT_DADS,
      ...cam.push({ on: on(PLACE.irl, 1.45, 1.15, -1.35), dist: 4.4, to: 3.2, yaw: -18, pitch: 12, fov: 44 }),
      zone: "irl",
      look: "overworld-night",
      note: "Unobstructed view onto the dark WEEKEND clock and powered-off monitor on Maya's empty desk.",
      stage: (t) => (
        <ServerPlayer
          position={on(PLACE.irl, 0.2, 0, -0.35)}
          rotationY={NORTH + 0.55}
          role="hero"
          animation="lookAround"
          tears={0.35}
          face="frown"
          time={t}
        />
      ),
    },
    {
      cue: "3.desk",
      ...cam.push({ on: on(PLACE.irl, 16.0, 1.2, -1.0), dist: 5.0, to: 3.7, yaw: -20, pitch: 10, fov: 46 }),
      zone: "irl",
      look: "overworld-night",
      note: "Cut across town to Maya's cold moonlit room where she walks to her dark NO SIGNAL monitor and weeps.",
      stage: (t) => {
        const mayaStep = walkSegment(on(PLACE.irl, 16.6, 0, 0.2), on(PLACE.irl, 16.0, 0, -0.55), t, 0, 1.05);
        return (
          <ServerPlayer {...mayaStep} role="friendC" tears={0.75} face="crying" time={t} />
        );
      },
    },
    {
      cue: "3.desk",
      cut: CUT_TOBY,
      ...cam.orbit({ on: on(PLACE.irl, -1.25, 1.2, -0.7), dist: 4.3, distTo: 3.1, yaw: -22, yawTo: 16, pitch: 10, fov: 44 }),
      zone: "irl",
      look: "warm-room",
      note: "Back to Toby alone under the brass desk lamp looking down in silent hurt.",
      stage: (t) => (
        <ServerPlayer
          position={on(PLACE.irl, -1.25, 0, -0.5)}
          rotationY={NORTH}
          role="hero"
          animation="cower"
          tears={0.7}
          face="hurt"
          time={t}
        />
      ),
    },
    {
      cue: "3.promise",
      ...cam.push({ on: on(PLACE.irl, -1.25, 1.25, -0.5), dist: 3.9, to: 2.8, yaw: 18, pitch: 6, fov: 42 }),
      zone: "irl",
      look: "warm-room",
      note: "Clean chest-up push on Toby holding his oak plank up firmly in a pinky promise.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.8));
        return (
          <ServerPlayer position={on(PLACE.irl, -1.25, 0, -0.5)} rotationY={SOUTH - 0.2} role="hero" animation="hold" face="brave" time={t}>
            <OakPlankItem position={[0, 0.22 + 0.12 * lift, 0.22]} scale={0.26} />
          </ServerPlayer>
        );
      },
    },
    {
      cue: "3.promise",
      cut: CUT_MIDDLE,
      ...cam.orbit({ on: on(PLACE.irl, 16.0, 1.25, -0.45), dist: 3.9, distTo: 2.8, yaw: 20, yawTo: -18, pitch: 6, fov: 42 }),
      zone: "irl",
      look: "overworld-night",
      note: "Match cut to Maya across town holding the second matching oak plank toward the camera with a hopeful smile.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, 0.8));
        return (
          <ServerPlayer position={on(PLACE.irl, 16.0, 0, -0.45)} rotationY={SOUTH - 0.25 + reach * 0.2} role="friendC" animation="hold" face="smile" time={t}>
            <OakPlankItem position={[0, 0.25, 0.22]} scale={0.26} />
          </ServerPlayer>
        );
      },
    },
  ],
});
