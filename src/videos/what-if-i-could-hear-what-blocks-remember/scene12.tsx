import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { Figure, Friend, GYM, Hero, timing, ramp, wordAt } from "./kit";

const HERO: [number, number, number] = GYM.at(-0.95, 0.88, -6.0);
const ELI: [number, number, number] = GYM.at(0.95, 0.88, -7.65);

/** The script page turned toward the camera, with the quoted line in large, readable cubes. */
const RevealPage: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position} rotation={[0, 0.12, 0]}>
    <Block size={[0.92, 1.12, 0.04]} color="#f7f0df" />
    <Block position={[0, 0.48, 0.03]} size={[0.62, 0.05, 0.025]} color="#7e8791" castShadow={false} />
    <Figure text="VILLAIN" position={[0, 0.35, 0.045]} height={0.15} maxWidth={0.72} color="#34435a" outline />
    <Figure text="I CAN'T" position={[0, 0.05, 0.045]} height={0.23} maxWidth={0.72} color="#243044" outline />
    <Figure text="STAY" position={[0, -0.27, 0.045]} height={0.25} maxWidth={0.62} color="#243044" outline />
  </group>
);

/** The question is asked out loud; the answer is a page from a play. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "A line from the play",
  shots: [
    {
      cue: "12.ask",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.55, -6.65), dist: 4.6, to: 4.0, yaw: 4, pitch: 5, fov: 44 }),
      zone: "gym",
      note: "The boy asks Eli directly, face to face, for the first time. Eli does not answer with a mysterious echo; he turns the script around so the page itself can answer.",
      stage: () => (
        <>
          <Hero position={HERO} rotationY={-0.72} animation="talk" face="uneasy" gaze={0} />
          <Friend position={ELI} rotationY={0.55} animation="hold" arms="hold" face="calm" gaze={0} />
          <RevealPage position={[ELI[0] - 0.28, ELI[1] + 1.02, ELI[2] + 0.24]} />
        </>
      ),
    },
    {
      cue: "12.script",
      look: "overworld-night",
      ...cam.push({ on: [ELI[0] - 0.28, ELI[1] + 1.02, ELI[2] + 0.28], dist: 2.05, to: 1.65, yaw: 0, pitch: 3, fov: 34 }),
      zone: "gym",
      note: "A hard cut to the page filling the vertical frame: VILLAIN above I CAN'T / STAY. Eli's hand holds its edge; the clue was a line being rehearsed, not a message to his friend.",
      stage: (t) => {
        const show = ramp(t, wordAt("12.script", "showed") - 0.15, wordAt("12.script", "page"));
        const page: [number, number, number] = [ELI[0] - 0.95 + 0.67 * show, ELI[1] + 0.78 + 0.24 * show, ELI[2] + 0.24];
        return (
          <>
            <RevealPage position={page} />
            <Block position={[page[0] - 0.51, page[1] - 0.37, page[2]]} size={[0.14, 0.62, 0.11]} color="#8a5a3c" />
          </>
        );
      }, 
    },
    {
      cue: "12.role",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.25, 1.45, -6.8), dist: 5.6, to: 5.0, yaw: 0, pitch: 2, fov: 56 }),
      zone: "gym",
      note: "Back to both faces: Eli points to the line and gives the boy the missing label, the villain's goodbye. His expression is matter-of-fact; the narrator's is realizing how badly he guessed.",
      stage: () => (
        <>
          <Friend position={ELI} rotationY={0.6} animation="talk" arms="point" face="calm" lookAt={[HERO[0], HERO[1] + 1.1, HERO[2]]} />
          <Hero position={HERO} rotationY={-0.7} animation="idle" face="wow" headPitch={0.12} gaze={0} />
          <RevealPage position={[0.02, 1.95, GYM.at(0, 0, -6.8)[2] + 0.1]} />
        </>
      ),
    },
  ],
});
