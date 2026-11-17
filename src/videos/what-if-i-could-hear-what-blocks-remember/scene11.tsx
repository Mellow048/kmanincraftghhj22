import type React from "react";
import { Block, cam, storyScene, stride } from "../../engine";
import { Friend, GYM, Hero, NORTH, timing, ramp, wordAt } from "./kit";

const ELI: [number, number, number] = GYM.at(0.2, 0.88, -7.75);

/** A small, open script held in the stage light. */
const OpenScript: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <Block position={[-0.18, 0, 0]} size={[0.38, 0.025, 0.42]} color="#eee6d2" rotationY={-0.08} />
    <Block position={[0.2, 0.015, 0]} size={[0.38, 0.025, 0.42]} color="#faf4e5" rotationY={0.08} />
    {[-0.12, -0.01, 0.1].map((y) => <Block key={y} position={[0.2, y, 0]} size={[0.23, 0.009, 0.012]} color="#8d99a0" castShadow={false} />)}
  </group>
);

/** From the mistaken goodbye to the person who can explain it. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "Behind the curtain",
  shots: [
    {
      cue: "11.enter",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.6, 1.35, -7.3), dist: 4.5, to: 3.75, yaw: 12, pitch: 7, fov: 42 }),
      zone: "gym",
      note: "From behind and a little to the side, the boy pushes the curtain apart and steps through the moving gap. The warm stage spot waits on the other side; the camera follows one step, not a teleport.",
      stage: (t) => {
        const step = stride(GYM.at(-1.55, 0.88, -6.65), GYM.at(-0.4, 0.88, -7.7), ramp(t, wordAt("11.enter", "stepped") - 0.2, wordAt("11.enter", "through")));
        return <Hero {...step} animation="walk" face="brave" />;
      },
    },
    {
      cue: "11.find",
      look: "overworld-night",
      ...cam.push({ on: [ELI[0], ELI[1] + 0.55, ELI[2]], dist: 3.25, to: 2.75, yaw: 0, pitch: 4, fov: 38 }),
      zone: "gym",
      note: "Eli is alone under the lamp, reading quietly from the open script. One page edge catches the warm light; the opened curtain and the audience rows stay soft and low behind him.",
      stage: () => (
        <>
          <Friend position={ELI} rotationY={0} animation="hold" arms="hold" face="calm" headPitch={0.3} gaze={0} />
          <OpenScript position={[ELI[0], ELI[1] + 0.85, ELI[2] + 0.26]} />
        </>
      ),
    },
    {
      cue: "11.stop",
      look: "overworld-night",
      ...cam.push({ on: [ELI[0], ELI[1] + 1.34, ELI[2]], dist: 2.25, to: 1.82, yaw: 8, pitch: 1, fov: 34 }),
      zone: "gym",
      note: "A close cut to the line Eli is reading; he hears the curtain, lifts his eyes and stops. His expression changes on this cut, not while the camera holds.",
      stage: (t) => (
        <>
          <Friend position={ELI} rotationY={0} animation="idle" arms="hold" face="uneasy" headPitch={0.28 * (1 - ramp(t, wordAt("11.stop", "stopped"), wordAt("11.stop", "aloud")))} gaze={0} />
          <OpenScript position={[ELI[0], ELI[1] + 0.82, ELI[2] + 0.27]} />
        </>
      ),
    },
  ],
});
