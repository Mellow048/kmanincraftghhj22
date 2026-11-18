import { Block, cam, storyScene } from "../../engine";
import { timing, go, w } from "./kit";
import { MARK, MARK_WIDTH, Tape, CameraBox } from "./sets";
import { Kid, pose } from "./cast";
import { LiftPrint, Print, PIC } from "./paper";
import { Trials, Rep } from "./action";
const shoes = w("3.tape", "shoes");
const shoot = w("3.ear", "print");
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Contact sheet",
  shots: [
    {
      cue: "3.tape",
      ...cam.orbit({ on: [0.63, 0.42, -0.45], dist: 2.9, yaw: 50, yawTo: 36, pitch: 37, fov: 43, distTo: 2.726 }),
      zone: "room",
      note: "Crouched next to the rug, he smooths one strip across another. The tape goes ON before the shoes come down.",
      stage: (t) => (
        <>
          <Kid position={[0.37, 0.02, -0.76]} animation="crouch" time={t + 0.55} headPitch={0.52} face="brave" />
          <group position={MARK}>
            {[-1, 1].map((s, i) => (
              <Block
                key={s}
                rotation={[0, s * 0.78, 0]}
                size={[MARK_WIDTH * (0.03 + 0.97 * go(t, i * 0.2 - 0.05, i * 0.2 + 0.39)), 0.014, 0.064]}
                color="#ffbc43"
              />
            ))}
          </group>
        </>
      ),
    },
    {
      cue: "3.tape",
      cut: shoes,
      ...cam.push({ on: [0.7, 0.24, -0.54], dist: 1.75, to: 1.54, yaw: 27, pitch: 21, fov: 45 }),
      zone: "room",
      note: "At shoe height: the toes of the brass-yellow trainers meet the two ends of the X.",
      stage: (t) => (
        <>
          <Tape />
          <Kid
            position={[0.7, 0.053, -0.54 + 0.39 * (1 - go(t, 0.055, 0.64))]}
            animation="walk"
            animDistance={0.39 * go(t, 0.055, 0.64)}
            plantFeet
            time={t}
            face="calm"
          />
        </>
      ),
    },
    {
      cue: "3.ear",
      ...cam.push({ on: [0.02, 1.16, 0.27], dist: 1.85, to: 1.6, yaw: 20, pitch: 6, fov: 38 }),
      zone: "room",
      note: "The crank feeds paper out of the slot. Cut on “print” to what it exposed.",
      stage: (t) => (
        <>
          <CameraBox position={[0, 1.18, 0]} scale={1.48} />
          <Print name="ear" position={[0, 1.056 - 0.23 * go(t, 0, 0.44), 0.21]} width={0.37} roll={-0.045} />
        </>
      ),
    },
    {
      cue: "3.ear",
      cut: shoot,
      ...cam.push({ on: PIC, dist: 3.46, to: 3.04, yaw: -3, pitch: 0, fov: 43 }),
      zone: "room",
      note: "Mostly empty wallpaper. A single ear and a blue shoulder get through the left border.",
      stage: (t) => <LiftPrint name="ear" label="TRY 01" t={t} />,
    },
    {
      cue: "3.brow",
      ...cam.orbit({ on: PIC, dist: 3.43, yaw: 7, yawTo: -3, pitch: 1, fov: 43, distTo: 3.224 }),
      zone: "room",
      note: "A second print lands crooked over the first; now the TOP of his head just breaks the bottom edge.",
      stage: (t) => (
        <>
          <Print name="ear" position={[-0.19, 1.38, 0.5]} width={1.21} roll={0.103} label="TRY 01" />
          <LiftPrint name="brow" label="TRY 02" t={t} roll={-0.046} />
        </>
      ),
    },
    {
      cue: "3.mine",
      ...cam.truck({ on: [0.07, 1.47, -1.79], by: [0.44, 0.12, 0], yaw: 6, pitch: 2, dist: 3.9, fov: 39 }),
      zone: "room",
      note: "His elbow, ear and brow form a little record wall. He checks his actual eyebrows with a perfectly straight face.",
      stage: (t) => (
        <>
          <Trials />
          <Kid
            position={[0.22, 0, -1.86]}
            headRoll={-0.06}
            face="calm"
            pose={pose({ armR: [-1.58 - 0.43 * go(t, 0.05, 0.43), 0.06, -0.31] })}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "3.reps",
      ...cam.orbit({ on: [0.08, 1.04, -0.15], dist: 5.55, yaw: 21, yawTo: 5, pitch: 12, fov: 44, distTo: 5.217 }),
      zone: "room",
      note: "Back to the real course. Button, an airborne knee over green upholstery, heels together on the tape.",
      stage: (t) => (
        <>
          <Rep cue="3.reps" t={t} />
          <Trials />
        </>
      ),
    },
  ],
});
