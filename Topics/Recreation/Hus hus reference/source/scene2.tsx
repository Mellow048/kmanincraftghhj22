import { cam, storyScene } from "../../engine";
import { timing, w, go } from "./kit";
import { BOX } from "./sets";
import { Rep, TimerInsert, finger } from "./action";
import { Kid, pose } from "./cast";
import { BIG, DoorPhotos } from "./paper";
const b = w("2.drill", "hus", 1) - 0.046,
  c = w("2.drill", "hus", 3) - 0.026;
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "A place on the fridge",
  shots: [
    {
      cue: "2.drill",
      ...cam.push({ on: finger(BOX), dist: 1.99, to: 1.82, yaw: 126, pitch: 17, fov: 39 }),
      zone: "room",
      note: "Smash to the thumb hitting the brass button on the first breath. Sleeve fills the same edge.",
      stage: (t) => <Rep t={t} cue="2.drill" />,
    },
    {
      cue: "2.drill",
      cut: b,
      ...cam.orbit({ on: [0.12, 1.13, -0.19], dist: 5.23, yaw: 4, yawTo: 14, pitch: 5, fov: 45, distTo: 4.916 }),
      zone: "room",
      note: "Second breath clears the sofa arm, third hits the yellow X. The jump has a takeoff, apex and landing.",
      stage: (t) => <Rep t={t + b} cue="2.drill" />,
    },
    {
      cue: "2.drill",
      cut: c,
      ...cam.push({ on: [0.09, 1.0, -0.12], dist: 5.6, to: 5.2, yaw: 28, pitch: 26, fov: 44 }),
      zone: "room",
      note: "A whole second rep from the opposite scale: press, cross, grin. Not six breaths over a held pose.",
      stage: (t) => <Rep t={t + c} cue="2.drill" />,
    },
    {
      cue: "2.timer",
      ...cam.orbit({ on: [0, 1.23, -0.1], dist: 2.32, yaw: -26, yawTo: 7, pitch: 9, fov: 36, distTo: 2.181 }),
      zone: "room",
      note: "The old red instant camera, its square lens and the brass three-second dial; he hovers over it like a race official.",
      stage: (t) => (
        <>
          <TimerInsert t={t} />
          <Kid position={[0.35, 0.02, -0.63]} headPitch={0.38} pose={pose({ armL: [-0.73, 0, -0.13] })} face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "2.fridge",
      ...cam.push({ on: [0, 1.31, -0.88], onTo: [-0.035, 1.54, -0.88], dist: 5.15, to: 4.45, yaw: 8, pitch: 4, fov: 43 }),
      zone: "kitchen",
      note: "Six real paper pictures at three heights on the mint refrigerator; the large one has the same blue edge.",
      stage: () => <DoorPhotos />,
    },
    {
      cue: "2.four",
      ...cam.truck({ on: [-0.24, 1.48, -0.88], by: [0.21, 0.22, 0], dist: 3.32, yaw: -7, pitch: 0, fov: 42 }),
      zone: "kitchen",
      note: "Move along the birthday prints. In four years he has managed no more than a piece of the same sleeve.",
      stage: () => <DoorPhotos />,
    },
    {
      cue: "2.blue",
      ...cam.orbit({ on: [-0.02, 1.34, -0.1], dist: 3.95, yaw: -17, yawTo: 7, pitch: 3, fov: 39, distTo: 3.713 }),
      zone: "kitchen",
      note: "Match the cuff to the evidence. He holds his real blue arm up beside the print, glancing between them.",
      stage: (t) => (
        <>
          <DoorPhotos />
          <Kid
            position={[0.36, 0.018, 0.01]}
            rotationY={-0.52}
            face="calm"
            pose={pose({ armL: [-1.01 - 0.42 * go(t, 0.6, w("2.blue", "blue")), 0, -0.35] })}
            headYaw={-0.39 * go(t, 0.35, 1.04)}
            headPitch={0.18}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "2.face",
      ...cam.push({ on: [-0.3, 1.41, -0.5], onTo: [-0.05, 1.52, -0.84], dist: 3.48, to: 2.84, yaw: 16, pitch: 5, fov: 39 }),
      zone: "kitchen",
      note: "Over the shoulder to the magnet. His finger wants the big spot, not the four smaller ones.",
      stage: (t) => (
        <>
          <DoorPhotos />
          <Kid
            position={[-0.65, 0.01, -0.18]}
            rotationY={2.66}
            face="brave"
            pose={pose({ armL: [-1.12 - 0.66 * go(t, 0.33, 0.98), 0, -0.09] })}
            lookAt={BIG}
            time={t}
          />
        </>
      ),
    },
  ],
});
