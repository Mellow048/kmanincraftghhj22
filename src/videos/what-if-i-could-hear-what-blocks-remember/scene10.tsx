import type React from "react";
import { Block, Glow, cam, storyScene, stride } from "../../engine";
import { EchoTrace, Figure, GYM, Hero, NORTH, NightGym, SoundRings, ramp, timing, wordAt } from "./kit";

const TOUCH_BRICK: [number, number, number] = GYM.at(2.7, 0.46, -8.05);
const CLOCK: [number, number, number] = GYM.at(7.78, 4.35, -2.0);

/** A clock on the gym wall: the bell is heard before the audience is given another chance to choose. */
const SchoolClock: React.FC<{ t: number }> = ({ t }) => (
  <group position={CLOCK} rotation={[0, -Math.PI / 2, 0]}>
    <Block size={[0.88, 0.88, 0.16]} color="#323d4a" />
    <Block position={[0, 0, 0.09]} size={[0.72, 0.72, 0.045]} color="#e8dfc8" castShadow={false} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <Block key={i} position={[Math.sin(a) * 0.27, Math.cos(a) * 0.27, 0.12]} size={[0.045, 0.045, 0.025]} color="#43505b" castShadow={false} />;
    })}
    <Block position={[0, 0.075, 0.135]} size={[0.035, 0.28, 0.025]} color="#374858" rotation={[0, 0, -0.8 + 0.06 * Math.sin(t * 3)]} castShadow={false} />
    <Block position={[0.045, 0, 0.14]} size={[0.22, 0.035, 0.025]} color="#c8402f" rotation={[0, 0, 0.9 + t * 0.9]} castShadow={false} />
    <Figure text="3:00" position={[0, -0.43, 0.15]} rotationY={0} height={0.18} maxWidth={0.72} color="#243044" shadow={false} />
    <SoundRings position={[0, 0.55, 0.08]} t={t - wordAt("10.bell", "bell")} rotationY={0} color="#ffe2a0" reach={0.7} />
    <Glow position={[0, 0.22, 0.2]} size={0.9} color="#ffe2a0" opacity={0.2 * Math.max(0, 1 - Math.abs(t - wordAt("10.bell", "bell")))} />
  </group>
);

/** Six deliberately slower cuts before the choice. The answer is physically one curtain away. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The edge",
  shots: [
    {
      cue: "10.dark",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.55, -6.8), dist: 3.8, to: 3.2, yaw: -7, pitch: 5, fov: 40 }),
      zone: "gym",
      note: "Closed curtains swallow the stage; one faint blue edge light catches the boy at the steps. The room around him is still, and the next cut will go closer than this one.",
      stage: () => (
        <>
          <NightGym air={0.8} spill={0.34} key={10} on={GYM.at(0.3, 0, -5.9)} />
          <Hero position={GYM.at(0.3, 0, -5.9)} rotationY={NORTH} animation="idle" face="fear" headPitch={0.16} />
        </>
      ),
    },
    {
      cue: "10.touch",
      look: "overworld-night",
      ...cam.push({ on: [TOUCH_BRICK[0], TOUCH_BRICK[1] + 0.08, TOUCH_BRICK[2]], dist: 2.25, to: 1.75, yaw: 0, pitch: 24, fov: 36 }),
      zone: "gym",
      note: "His fingers press the loose stage-side brick. The camera stays on the contact, and the ringing does not begin until the next line; touch is the cause, not the answer.",
      stage: () => (
        <>
          <NightGym air={0.5} spill={0.24} on={GYM.at(2.2, 0, -6.15)} />
          <Hero position={GYM.at(2.2, 0, -6.15)} rotationY={NORTH + 0.45} animation="reach" arms="reach" face="uneasy" />
          <Block position={TOUCH_BRICK} size={[0.62, 0.4, 0.62]} color="#68737c" metalness={0.16} roughness={0.86} />
        </>
      ),
    },
    {
      cue: "10.last",
      look: "overworld-night",
      ...cam.push({ on: [TOUCH_BRICK[0], TOUCH_BRICK[1] + 0.22, TOUCH_BRICK[2]], dist: 2.15, to: 1.72, yaw: 0, pitch: 9, fov: 34 }),
      zone: "gym",
      note: "The exact same blue square rings bloom from the brick on 'repeated'. Do not show text or a speaker above it; the image is only the phrase stripped of its who and when.",
      stage: (t) => (
        <>
          <NightGym air={1.15} spill={0.46} />
          <EchoTrace at={TOUCH_BRICK} t={t - wordAt("10.last", "repeated")} />
        </>
      ),
    },
    {
      cue: "10.breath",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(2.0, 1.28, -5.25), dist: 2.05, to: 1.7, yaw: 176, pitch: 2, fov: 34 }),
      zone: "gym",
      note: "A close, moving face: his jaw locks and his hand stays raised beside the brick. No echo is drawn over him; he cannot pretend he did not hear it.",
      stage: () => (
        <>
          <NightGym air={0.55} spill={0.26} key={11} on={GYM.at(2.0, 0, -5.25)} />
          <Hero position={GYM.at(2.0, 0, -5.25)} rotationY={NORTH} animation="scared" face="fear" headPitch={0.12} gaze={0} />
        </>
      ),
    },
    {
      cue: "10.bell",
      look: "overworld-night",
      ...cam.push({ on: [CLOCK[0], CLOCK[1], CLOCK[2]], dist: 2.55, to: 2.1, yaw: -90, pitch: 0, fov: 36 }),
      zone: "gym",
      note: "The high wall clock shivers as the final school bell rings; its red second hand swings through the painted three. The sound cuts across the quiet before he has to choose.",
      stage: (t) => <SchoolClock t={t} />,
    },
    {
      cue: "10.choice",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0.5, 1.25, -6.5), dist: 4.4, to: 3.7, yaw: 12, pitch: 7, fov: 42 }),
      zone: "gym",
      note: "He hovers between the silent exit and the blue echo by the curtain. On 'follow' he takes one step toward the stage-side gap, choosing the sound over the friend who could answer him.",
      stage: (t) => {
        const move = stride(GYM.at(1.8, 0, -5.5), GYM.at(3.65, 0, -7.25), ramp(t, wordAt("10.choice", "follow"), wordAt("10.choice", "echo")));
        return (
          <>
            <NightGym air={0.7} spill={0.3} key={9} on={move.position} />
            <Hero {...move} animation="walk" face="uneasy" arms="reach" headPitch={0.12} />
            <EchoTrace at={TOUCH_BRICK} t={t - 0.06} />
          </>
        );
      },
    },
  ],
});
