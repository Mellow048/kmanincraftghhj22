import { cam, storyScene } from "../../engine";
import { timing, go, w, vMix, Shutter } from "./kit";
import { Kid, DateA, DateB, Partners, pose } from "./cast";
import { CameraBox } from "./sets";
import { Rep, OUT, finger } from "./action";
import { LiftPrint, PIC } from "./paper";
const cross = w("7.reps", "hus", 1) - 0.041,
  print = w("7.reps", "hus", 2) + 0.19;
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Just the two of us",
  shots: [
    {
      cue: "7.couple",
      ...cam.truck({ on: [-0.21, 1.2, 1.15], by: [0.25, 0.05, 0], dist: 4.44, yaw: 3, pitch: 2, fov: 45 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "An ordinary handoff. The coral-shirted guest passes the old camera across to the kid; her partner waits behind her.",
      stage: (t) => {
        const q = go(t, 0.2, w("7.couple", "camera") + 0.16);
        return (
          <>
            <DateA position={[-1.12, 0, 0.69]} rotationY={0.46} time={t} />
            <DateB position={[-0.58, 0, 1.02]} rotationY={1.45} pose={pose({ armL: [-1.22 + 0.37 * q, 0, -0.04] })} face="smile" time={t} />
            <Kid
              position={[0.64, 0.006, 1.03]}
              rotationY={-1.43}
              pose={pose({ armR: [-0.74 - 0.59 * q, 0, 0.035] })}
              lookAt={[0, 1.13, 1.35]}
              face="calm"
              time={t}
            />
            <CameraBox position={vMix([-0.23, 1.12, 1.28], [0.13, 1.17, 1.37], q)} scale={0.87} turn={-0.75 + 0.74 * q} />
          </>
        );
      },
    },
    {
      cue: "7.us",
      ...cam.orbit({ on: [0, 1.29, 1.12], dist: 4.93, yaw: -7, yawTo: 2, pitch: 2, fov: 44, distTo: 4.634 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "“Could you take one of just the two of us?” The outstretched free arm and their joined hands specify the intended portrait.",
      stage: (t) => <Partners ask t={t} />,
    },
    {
      cue: "7.sure",
      ...cam.push({ on: [0.18, 1.4, 1.22], dist: 2.76, to: 2.48, yaw: 9, pitch: 1, fov: 40 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "A perfectly sincere nod. His finger is already going to the self-timer, not the shutter.",
      stage: (t) => (
        <Kid
          position={[0.12, 0.01, 1.11]}
          headPitch={0.03 + 0.25 * Math.sin(Math.PI * go(t, 0.12, 0.67))}
          face="smile"
          pose={pose({ armR: [-1.13, 0, -0.12] })}
          time={t}
        >
          <CameraBox position={[0, -0.05, 0.02]} scale={0.78} turn={0.1} />
        </Kid>
      ),
    },
    {
      cue: "7.reps",
      ...cam.push({ on: finger(OUT), dist: 1.93, to: 1.76, yaw: -130, pitch: 17, fov: 40 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Reflex one, on breath one: set the timer, in the same insert as the sofa drill.",
      stage: (t) => <Rep t={t} cue="7.reps" kind="pair" />,
    },
    {
      cue: "7.reps",
      cut: cross,
      ...cam.push({ on: [0.44, 1.18, 1.26], onTo: [0.12, 1.32, 1.03], dist: 6.08, to: 5.28, yaw: 5, pitch: 4, fov: 45 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "Reflex two: cut across behind the joined hands. Reflex three: square up in the one gap and give that trained smile.",
      stage: (t) => <Rep t={t + cross} cue="7.reps" kind="pair" />,
    },
    {
      cue: "7.reps",
      cut: print,
      ...cam.push({ on: PIC, dist: 3.38, to: 3.24, yaw: -1, pitch: 0, fov: 43 }),
      zone: "yard",
      look: "overworld-sunset",
      note: "End on the evidence, not his reaction. Two holding hands, and one unwanted, delighted third face between them. No CTA.",
      stage: (t) => (
        <>
          <LiftPrint name="bomb" t={t + 0.11} roll={0.029} label="JUST THE TWO OF US" />
          <Shutter t={t} />
        </>
      ),
    },
  ],
});
