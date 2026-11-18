import { cam, storyScene } from "../../engine";
import { timing, go } from "./kit";
import { Kid, Pal, pose } from "./cast";
import { Testers, Timer, Rep } from "./action";
import { LiftPrint, Print } from "./paper";
import { MARK } from "./sets";
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A very good portrait of precisely one person",
  shots: [
    {
      cue: "4.friends",
      ...cam.truck({ on: [0.59, 1.15, 0.14], by: [0.2, 0, -0.38], dist: 4.46, yaw: -18, pitch: 3, fov: 47 }),
      zone: "room",
      note: "The two volunteers step in together, then part for the mark: green shirt on one side, pink on the other.",
      stage: (t) => {
        const q = go(t, 0.08, 1.47);
        return (
          <>
            <Pal
              n={0}
              position={[0.29 - 0.21 * q, 0.04, 0.91 - 1.96 * q]}
              rotationY={2.94 - 2.82 * q}
              animation="walk"
              animDistance={1.98 * q}
              plantFeet
              time={t}
            />
            <Pal
              n={1}
              position={[1.28, 0.02, 1.0 - 2.39 * q]}
              rotationY={-2.95 + 2.79 * q}
              animation="walk"
              animDistance={2.4 * q}
              plantFeet
              time={t + 0.36}
            />
          </>
        );
      },
    },
    {
      cue: "4.tape",
      ...cam.orbit({ on: [0.68, 0.68, -0.89], dist: 3.81, yaw: 17, yawTo: -12, pitch: 37, fov: 49, distTo: 3.581 }),
      zone: "room",
      note: "Look down between their shoes: the X is empty in front; they have left him a perfectly good space.",
      stage: (t) => (
        <>
          <Testers t={t} />
          <Timer />
          <Kid position={[-0.25, 0.04, 0.65]} rotationY={2.58} pose={pose({ armR: [-0.99, 0, 0.13] })} lookAt={MARK} time={t} />
        </>
      ),
    },
    {
      cue: "4.run",
      ...cam.push({ on: [0.34, 1.05, -0.2], dist: 5.87, to: 5.31, yaw: 12, pitch: 14, fov: 46 }),
      zone: "room",
      note: "One continuous test rep on three breaths. As he lands closer to the lens, the witnesses tip their heads in behind his.",
      stage: (t) => <Rep cue="4.run" kind="test" t={t} />,
    },
    {
      cue: "4.best",
      ...cam.push({ on: [0, 1.57, 0.6], dist: 1.78, to: 2.02, yaw: 0, pitch: 1, fov: 36 }),
      zone: "room",
      note: "Show only the middle of the new print: a terrific, symmetrical portrait of the blue kid. Hold back its edges.",
      stage: (t) => <LiftPrint name="four" label="FRIDAY" t={t + 0.3} roll={0.008} />,
    },
    {
      cue: "4.taken",
      ...cam.orbit({ on: [0.42, 1.39, -0.37], dist: 2.93, yaw: -15, yawTo: 8, pitch: 4, fov: 40, distTo: 2.754 }),
      zone: "room",
      note: "He admires it at arm’s length. Neither of the two faces beyond his shoulders is as impressed.",
      stage: (t) => (
        <>
          <Pal n={0} position={[-0.18, 0.01, -1.46]} face="uneasy" time={t} />
          <Pal n={1} position={[1.11, 0.01, -1.63]} face="calm" time={t + 0.32} />
          <Kid
            position={[0.43, 0.047, -0.42]}
            headPitch={0.24}
            pose={pose({ armR: [-0.97, 0, -0.04], armL: [-0.89, 0, 0.03] })}
            face="smile"
            time={t}
          />
          <Print name="four" position={[0.46, 1.05, 0.05]} width={0.51} turn={2.71} roll={0.17} />
        </>
      ),
    },
    {
      cue: "4.ears",
      ...cam.push({ on: [0, 1.6, 0.6], dist: 2.13, to: 3.22, yaw: 0, pitch: 0, fov: 42 }),
      zone: "room",
      note: "Pull out to all four ears: one pair higher and lighter, one lower and darker. No eyes belonging to either friend.",
      stage: (t) => <LiftPrint name="four" t={t + 0.52} roll={0.015} label="FRIDAY" />,
    },
    {
      cue: "4.almost",
      ...cam.orbit({ on: [0.22, 1.42, -0.48], dist: 4.27, yaw: 1, yawTo: -8, pitch: 1, fov: 46, distTo: 4.014 }),
      zone: "room",
      note: "Reverse the print. The two missing friends crane into the real frame from either side, once on each “almost.”",
      stage: (t) => {
        const a = go(t, 0.6, 0.88),
          b = go(t, 1.36, 1.71);
        return (
          <>
            <Kid position={[0.2, 0.04, -0.39]} face="uneasy" headPitch={0.11 + 0.08 * Math.sin(t * 7)} time={t} />
            <Pal n={0} position={[-0.62 + 0.19 * a, 0.01, -0.93]} headRoll={-0.22 * a} face="calm" time={t + 0.68} />
            <Pal n={1} position={[1.05 - 0.25 * b, 0.012, -0.92]} headRoll={0.22 * b} face="uneasy" time={t + 0.48} />
            <Print name="four" position={[0.22, 1.03 - 0.15 * a, 0.01]} width={0.68} turn={2.56} roll={-0.05 - 0.11 * b} />
          </>
        );
      },
    },
  ],
});
