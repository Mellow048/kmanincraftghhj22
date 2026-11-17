import type React from "react";
import { Block, cam, storyScene, stride } from "../../engine";
import { Friend, Hero, NORTH, SPOT, timing, wordAt, ramp } from "./kit";

const MODEL = SPOT.at(0, 0.69, 0.1);

/** Their shared block bridge: the missing top block is where they used to meet in the middle. */
const ProjectBuild: React.FC<{ placed: number }> = ({ placed }) => (
  <group position={MODEL}>
    <Block position={[0, 0, 0]} size={[1.35, 0.14, 0.38]} color="#6c737b" />
    {[-0.52, 0.52].map((x, i) => (
      <group key={x}>
        <Block position={[x, 0.24, 0]} size={[0.28, 0.36, 0.34]} color={i ? "#8b6548" : "#a9aeb2"} />
        <Block position={[x, 0.47, 0]} size={[0.33, 0.1, 0.39]} color={i ? "#8b6548" : "#a9aeb2"} />
      </group>
    ))}
    <Block position={[0, 0.31, 0]} size={[0.72, 0.12, 0.2]} color="#c89b5b" />
    {placed > 0 ? <Block position={[-0.13, 0.48 + 0.12 * placed, 0]} size={[0.25, 0.22, 0.24]} color="#88a5b2" /> : null}
    {placed > 0.65 ? <Block position={[0.14, 0.48 + 0.12 * placed, 0]} size={[0.25, 0.22, 0.24]} color="#88a5b2" /> : null}
  </group>
);

/** The wish underneath the story: keep the friend, not just the answer to a question. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "What I wanted",
  shots: [
    {
      cue: "5.want",
      ...cam.push({ on: SPOT.at(0, 1.23, 1.65), dist: 4.2, to: 3.55, yaw: 178, pitch: 5, fov: 42 }),
      zone: "class",
      note: "The boy watches Eli instead of the echo. Eli has gone quiet over his open pages, while the narrator waits for him to look up and answer a question he has not asked.",
      stage: () => (
        <>
          <Friend position={SPOT.seat(1, 1)} rotationY={NORTH} animation="sit" face="uneasy" headPitch={0.28} gaze={0} />
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="fear" gaze={0} arms="hold" />
        </>
      ),
    },
    {
      cue: "5.team",
      ...cam.push({ on: [MODEL[0], MODEL[1] + 0.15, MODEL[2]], dist: 3.5, to: 2.95, yaw: 8, pitch: 8, fov: 40 }),
      zone: "class",
      note: "A close view of the small bridge they built together: one of Eli's teal sleeves and one of the narrator's orange sleeves reach in from opposite sides, and the last two blocks meet in the middle on 'side by side'.",
      stage: (t) => {
        const placed = Math.max(0, Math.min(1, (t - wordAt("5.team", "side")) / 0.5));
        return (
          <>
            <Hero position={SPOT.at(-1.05, 0, 1.25)} rotationY={0.45} animation="reach" arms="reach" face="smile" />
            <Friend position={SPOT.at(1.05, 0, 1.25)} rotationY={-0.45} animation="reach" arms="reach" face="grin" />
            <ProjectBuild placed={placed} />
          </>
        );
      },
    },
    {
      cue: "5.fear",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.45, to: 1.9, yaw: 175, pitch: 4, fov: 36 }),
      zone: "class",
      note: "His face fills the frame while, over one shoulder, Eli gets up and moves toward the open side door with the script. The unfinished bridge stays on the desk between them; he is afraid it will be the last thing they build together.",
      stage: (t) => {
        const leaving = stride(SPOT.seat(2, 1), [SPOT.door[0] - 0.25, 0, SPOT.door[2] + 0.45], ramp(t, wordAt("5.fear", "lose") - 0.22, wordAt("5.fear", "teammate")));
        return (
          <>
            <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="fear" headPitch={0.2} gaze={0} />
            <Friend {...leaving} animation="walk" face="uneasy" headPitch={0.2} />
            <ProjectBuild placed={0.55} />
          </>
        );
      },
    },
  ],
});
