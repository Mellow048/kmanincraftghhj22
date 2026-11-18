import { cam, storyScene } from "../../engine";
import { timing, w, go } from "./kit";
import { Kid, pose } from "./cast";
import { DressChair, Tape } from "./sets";
import { Chairs, Rep } from "./action";
const right = w("5.reps", "hus", 3) - 0.018;
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Stand-ins",
  shots: [
    {
      cue: "5.chairs",
      ...cam.truck({ on: [1.04, 0.91, -0.7], by: [-0.24, 0, -0.25], dist: 4.4, yaw: 23, pitch: 13, fov: 44 }),
      zone: "room",
      note: "New training partners. The second wooden chair scrapes into line with the first, pushed by the kid, not by an edit.",
      stage: (t) => {
        const q = go(t, 0.06, 1.52);
        return (
          <>
            <Chairs left={0} right={0} slide={q} />
            <Kid
              position={[1.52 + 0.38 * (1 - q), 0.013, -1.04 + 0.68 * (1 - q)]}
              rotationY={-2.62}
              animation="walk"
              arms="push"
              animDistance={0.79 * q}
              plantFeet
              time={t}
              face="brave"
            />
          </>
        );
      },
    },
    {
      cue: "5.glasses",
      ...cam.push({ on: [0.13, 1.35, -1.46], dist: 2.73, to: 2.48, yaw: -18, pitch: 4, fov: 38 }),
      zone: "room",
      note: "A purple coat over the seat-back and Gran’s square frames settling onto a block of wood. Let the empty chair legs remain underneath.",
      stage: (t) => (
        <>
          <DressChair position={[0.13, 0, -1.36]} hat="specs" wear={go(t, 0.24, w("5.glasses", "glasses"))} />
          <Kid
            position={[-0.64, 0.013, -1.1]}
            rotationY={1.58}
            pose={pose({ armL: [-2 + 0.38 * go(t, 0.2, 0.95), 0, -0.05] })}
            lookAt={[0.13, 1.46, -1.54]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "5.uncle",
      ...cam.orbit({ on: [1.23, 1.39, -1.48], dist: 2.89, yaw: 22, yawTo: 6, pitch: 6, fov: 39, distTo: 2.717 }),
      zone: "room",
      note: "Match cut to the orange coat and broad straw brim. The same hat and glasses will identify their owners at the party.",
      stage: (t) => (
        <>
          <DressChair position={[0.13, 0, -1.36]} hat="specs" />
          <DressChair position={[1.23, 0, -1.34]} hat="hat" wear={go(t, 0.11, w("5.uncle", "hat"))} />
          <Kid
            position={[1.93, 0.015, -1.26]}
            rotationY={-1.48}
            pose={pose({ armR: [-2.2 + 0.36 * go(t, 0.09, 0.94), 0, 0.11] })}
            lookAt={[1.23, 1.67, -1.5]}
            time={t}
          />
        </>
      ),
    },
    {
      cue: "5.count",
      ...cam.push({ on: [0.72, 1.26, -1.27], dist: 4.65, to: 4.18, yaw: 0, pitch: 2, fov: 43 }),
      zone: "room",
      note: "From the test camera: he steps in front of the brim and blots it out. He backs out again when it doesn’t count.",
      stage: (t) => {
        const q = go(t, 0.1, 0.58) * (1 - go(t, 1.67, 2.37));
        return (
          <>
            <Chairs />
            <Kid
              position={[1.94 - 0.81 * q, 0.025, -0.65]}
              headRoll={0.045}
              animation="walk"
              animDistance={0.81 * q}
              plantFeet
              time={t}
              face={q > 0.77 ? "frown" : "brave"}
            />
          </>
        );
      },
    },
    {
      cue: "5.middle",
      ...cam.truck({ on: [0.69, 0.27, -0.58], by: [0, 0, -0.71], dist: 2.81, yaw: 3, pitch: 61, fov: 49 }),
      zone: "room",
      note: "At floor level the solution is a different target: leave the old X and find the seam behind the two chair backs.",
      stage: (t) => (
        <>
          <Chairs />
          <Tape pos={[0.68, 0.029, -1.55]} width={0.39} color="#72d4ac" />
          <Kid
            position={[0.69, 0.047, -0.54 - 1.01 * go(t, 0.18, 1.22)]}
            rotationY={3.08}
            animation="walk"
            animDistance={1.01 * go(t, 0.18, 1.22)}
            plantFeet
            time={t}
          />
        </>
      ),
    },
    {
      cue: "5.hats",
      ...cam.orbit({ on: [0.68, 1.39, -1.49], dist: 4.51, yaw: -7, yawTo: 1, pitch: 1, fov: 42, distTo: 4.36 }),
      zone: "room",
      note: "In the right slot his face, the glasses, and the brim make three separate shapes. He checks left and then right.",
      stage: (t) => (
        <>
          <Chairs />
          <Kid position={[0.68, 0.015, -1.55]} face="calm" headYaw={-0.38 + 0.8 * go(t, 0.48, 1.09)} headRoll={-0.07} time={t} />
        </>
      ),
    },
    {
      cue: "5.reps",
      ...cam.orbit({ on: [0.33, 1.02, -0.36], dist: 6.0, yaw: 14, yawTo: 2, pitch: 13, fov: 47, distTo: 5.64 }),
      zone: "room",
      note: "First full-speed chair drill on three measured breaths: set the dial, run round the end chair, slot into the gap.",
      stage: (t) => <Rep t={t} cue="5.reps" kind="chairs" />,
    },
    {
      cue: "5.reps",
      cut: right,
      ...cam.push({ on: [0.47, 1.14, -0.64], dist: 5.74, to: 5.07, yaw: -8, pitch: 6, fov: 46 }),
      zone: "room",
      note: "Faster repeat from the portrait side. He does not block the borrowed glasses or the hat on landing.",
      stage: (t) => <Rep t={t + right} cue="5.reps" kind="chairs" />,
    },
  ],
});
