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
      ...cam.push({ on: on(PLACE.irl, -1.1, 1.2, -1.0), dist: 3.9, to: 2.65, yaw: 18, pitch: 8, fov: 42, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "warm-room",
      note: "Hard cutaway out of Minecraft into Toby's real bedroom as he walks to his glowing PC desk after school.",
      stage: (t) => {
        const tobyWalk = walkSegment(on(PLACE.irl, -2.3, 0, 0.6), on(PLACE.irl, -1.25, 0, -0.45), t, 0, 1.25, { yaw: NORTH + 0.45 });
        return (
          <ServerPlayer {...tobyWalk} role="hero" face="uneasy" time={t} />
        );
      },
    },
    {
      cue: "3.cut",
      cut: CUT_BEDROOM,
      ...cam.orbit({ on: on(PLACE.irl, -1.25, 1.15, -1.45), dist: 2.8, distTo: 2.0, yaw: 28, yawTo: -16, pitch: 6, fov: 38, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "warm-room",
      note: "Warm desk lamp highlights Toby leaning anxiously toward WAITING FOR MAYA on his bright screen.",
      stage: (t) => {
        const lean = ease(ramp(t, 0, 0.9));
        return (
          <ServerPlayer
            position={on(PLACE.irl, -1.25, 0, -0.45 - 0.14 * lean)}
            rotationY={NORTH + 0.08 * lean}
            role="hero"
            animation="leanOver"
            face="frown"
            headPitch={-0.08 - 0.16 * lean}
            time={t}
          />
        );
      },
    },
    {
      cue: "3.sister",
      ...cam.truck({ on: on(PLACE.irl, -0.4, 1.05, -1.2), by: [1.85, 0, 0], dist: 3.3, yaw: -12, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "warm-room",
      note: "Toby steps slowly toward Maya's unlit dark OFFLINE second desk and empty chair beside him.",
      stage: (t) => {
        const walk = walkSegment(on(PLACE.irl, -1.25, 0, -0.45), on(PLACE.irl, -0.25, 0, -0.45), t, 0, 1.3, { yaw: 0.75 });
        return (
          <ServerPlayer {...walk} role="hero" headYaw={-0.22 * ramp(t, 0.2, 0.9)} face="uneasy" time={t} />
        );
      },
    },
    {
      cue: "3.sister",
      cut: CUT_DADS,
      ...cam.push({ on: on(PLACE.irl, 1.55, 1.1, -1.3), dist: 3.1, to: 1.95, yaw: -16, pitch: 6, fov: 38, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "overworld-night",
      note: "Tight push into the dark empty WEEKEND clock and powered-off monitor on Maya's desk.",
      stage: (t) => {
        const glance = ease(ramp(t, 0.1, 0.9));
        return (
          <ServerPlayer
            position={on(PLACE.irl, -0.25, 0, -0.45)}
            rotationY={0.75 + 0.22 * glance}
            role="hero"
            animation="idle"
            headPitch={0.22 * glance}
            tears={0.35 * glance}
            face="frown"
            time={t}
          />
        );
      },
    },
    {
      cue: "3.desk",
      ...cam.push({ on: on(PLACE.irl, 16.0, 1.15, -1.35), dist: 3.7, to: 2.35, yaw: -22, pitch: 8, fov: 40, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "overworld-night",
      note: "Cut across town to Maya's cold moonlit room where she walks to her dark NO SIGNAL monitor and weeps.",
      stage: (t) => {
        const mayaStep = walkSegment(on(PLACE.irl, 16.55, 0, -0.05), on(PLACE.irl, 16.0, 0, -0.45), t, 0, 1.05, { yaw: NORTH + 0.2 });
        return (
          <ServerPlayer {...mayaStep} role="friendC" tears={0.55 + 0.4 * ease(ramp(t, 0.15, 0.95))} face="crying" time={t} />
        );
      },
    },
    {
      cue: "3.desk",
      cut: CUT_TOBY,
      ...cam.orbit({ on: on(PLACE.irl, -1.25, 1.15, -0.9), dist: 3.0, distTo: 2.05, yaw: -24, yawTo: 16, pitch: 6, fov: 38, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "warm-room",
      note: "Back to Toby alone under the brass desk lamp turning upward while wiping a tear.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 0.85));
        return (
          <ServerPlayer
            position={on(PLACE.irl, -1.25, 0, -0.5)}
            rotationY={NORTH - 0.18 + 0.3 * turn}
            role="hero"
            animation="idle"
            headPitch={0.18 - 0.24 * turn}
            tears={0.5 + 0.4 * turn}
            face="hurt"
            time={t}
          />
        );
      },
    },
    {
      cue: "3.promise",
      ...cam.push({ on: on(PLACE.irl, -1.25, 1.25, -0.5), dist: 2.9, to: 1.75, yaw: 18, pitch: 4, fov: 36, screenOffset: [0, 0.08] }),
      zone: "irl",
      look: "warm-room",
      note: "Intimate push on Toby's determined face as he raises his oak plank in a pinky promise.",
      stage: (t) => {
        const lift = ease(ramp(t, 0, 0.8));
        return (
          <ServerPlayer position={on(PLACE.irl, -1.25, 0, -0.5)} rotationY={SOUTH - 0.42 + 0.24 * lift} role="hero" animation="hold" face="brave" time={t}>
            <OakPlankItem position={[0, 0.21 + 0.14 * lift, 0.22]} scale={0.26} />
          </ServerPlayer>
        );
      },
    },
    {
      cue: "3.promise",
      cut: CUT_MIDDLE,
      ...cam.orbit({ on: on(PLACE.irl, 16.0, 1.2, -0.55), dist: 2.7, distTo: 1.7, yaw: 20, yawTo: -18, pitch: 4, fov: 36, screenOffset: [0, 0.08] }),
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
