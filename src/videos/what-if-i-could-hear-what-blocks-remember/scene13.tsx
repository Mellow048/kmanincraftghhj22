import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { EchoTrace, Figure, Friend, GYM, Hero, NORTH, timing, ramp, wordAt } from "./kit";

const ECHO_A: [number, number, number] = GYM.at(-1.6, 1.35, -9.42);
const ECHO_B: [number, number, number] = GYM.at(1.6, 1.35, -9.42);
const ECHO_SIDE: [number, number, number] = GYM.at(-7.72, 1.4, -4.3);
const HERO: [number, number, number] = GYM.at(-1.05, 0.88, -6.1);
const ELI: [number, number, number] = GYM.at(0.95, 0.88, -7.65);

/** A broad rehearsal page, with writing visible only when the camera is close enough to read it. */
const ScriptLeaf: React.FC<{ position: [number, number, number]; line?: boolean }> = ({ position, line = false }) => (
  <group position={position} rotation={[0, 0.08, 0]}>
    <Block size={[0.78, 0.88, 0.035]} color="#f7f0df" />
    {[-0.25, -0.1, 0.05, 0.2, 0.34].map((y, i) => (
      <Block key={y} position={[-0.03, y, 0.025]} size={[0.51 - (i % 2) * 0.1, 0.012, 0.008]} color="#858e98" castShadow={false} />
    ))}
    {line ? <Figure text="STAY" position={[0, 0.04, 0.065]} height={0.2} maxWidth={0.54} color="#243044" outline /> : null}
  </group>
);

/** The premise clicks into place: a real play, real words, one missing label. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The missing context",
  shots: [
    {
      cue: "13.practice",
      look: "overworld-night",
      ...cam.push({ on: [ELI[0], ELI[1] + 0.56, ELI[2]], dist: 3.35, to: 2.85, yaw: 0, pitch: 3, fov: 38 }),
      zone: "gym",
      note: "Under the AUDITIONS banner, Eli has the page open and is quietly practising by himself. Nothing about the school or the rehearsal requires an explanation; the picture supplies the context the stone could not.",
      stage: () => (
        <>
          <Friend position={ELI} rotationY={0} animation="talk" arms="hold" face="calm" headPitch={0.24} />
          <ScriptLeaf position={[ELI[0], ELI[1] + 0.85, ELI[2] + 0.27]} line />
        </>
      ),
    },
    {
      cue: "13.opening",
      look: "overworld-night",
      ...cam.push({ on: [ECHO_A[0], 1.55, ECHO_A[2]], dist: 5.2, to: 4.55, yaw: 2, pitch: 4, fov: 46 }),
      zone: "gym",
      note: "A blue ring leaves the stage brick on 'first echo' while Eli's open script sits in warm focus behind it. It is the same first phrase, now visibly attached to the play and its opening page.",
      stage: (t) => (
        <>
          <EchoTrace at={ECHO_A} t={t - wordAt("13.opening", "echo")} />
          <Friend position={ELI} rotationY={0} animation="hold" arms="hold" face="calm" headPitch={0.26} />
          <ScriptLeaf position={[ELI[0], ELI[1] + 0.84, ELI[2] + 0.27]} line />
        </>
      ),
    },
    {
      cue: "13.heard",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.65, -8.1), dist: 6.2, to: 5.35, yaw: 0, pitch: 5, fov: 48 }),
      zone: "gym",
      note: "Several ordinary wall blocks ring in the one familiar blue, spaced across the school stage. The camera sees the same memory's sound at different places; none of them carries a voice, date or direction.",
      stage: (t) => {
        const start = wordAt("13.heard", "rehearsed");
        return (
          <>
            <EchoTrace at={ECHO_A} t={t - start} />
            <EchoTrace at={ECHO_B} t={t - start - 0.18} />
            <EchoTrace at={ECHO_SIDE} t={t - start - 0.36} rotationY={-Math.PI / 2} />
            <Friend position={ELI} rotationY={0} animation="talk" face="calm" headPitch={0.24} arms="hold" />
          </>
        );
      },
    },
    {
      cue: "13.limit",
      look: "overworld-night",
      ...cam.push({ on: [ECHO_B[0], ECHO_B[1] + 0.18, ECHO_B[2]], dist: 2.8, to: 2.25, yaw: 0, pitch: 6, fov: 36 }),
      zone: "gym",
      note: "The same square echo rings leave a blank block in an empty patch of stage. The missing frame around them is the limit: no speaker, no moment, and no meaning arrives with the words.",
      stage: (t) => <EchoTrace at={ECHO_B} t={t - wordAt("13.limit", "words")} />,
    },
    {
      cue: "13.mistake",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.25, 1.42, -6.7), dist: 5.6, to: 5.0, yaw: 0, pitch: 4, fov: 56 }),
      zone: "gym",
      note: "The two friends occupy one frame again. Eli holds the script open without accusation; the narrator's gaze drops to the page, finally seeing that he nearly left over a guess.",
      stage: () => (
        <>
          <Hero position={HERO} rotationY={1.05} animation="idle" face="fear" headPitch={0.24} gaze={0} />
          <Friend position={ELI} rotationY={0.45} animation="hold" arms="hold" face="uneasy" lookAt={[HERO[0], HERO[1] + 1.0, HERO[2]]} />
          <ScriptLeaf position={[ELI[0] - 0.32, ELI[1] + 0.82, ELI[2] + 0.2]} line />
        </>
      ),
    },
    {
      cue: "13.reader",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.15, 1.34, -6.5), dist: 3.1, to: 2.65, yaw: 3, pitch: 5, fov: 40 }),
      zone: "gym",
      note: "The boy reaches for the script rather than another block and asks to read. Eli holds it steady for him; the open hand is the first thing in the film that can answer back.",
      stage: () => (
        <>
          <Hero position={HERO} rotationY={0.45} animation="reach" arms="reach" face="brave" gaze={0} />
          <Friend position={ELI} rotationY={-0.35} animation="hold" arms="hold" face="calm" />
          <ScriptLeaf position={[ELI[0] - 0.28, ELI[1] + 0.84, ELI[2] + 0.22]} />
        </>
      ),
    },
    {
      cue: "13.smile",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0.1, 1.48, -6.9), dist: 2.8, to: 2.4, yaw: 0, pitch: 3, fov: 36 }),
      zone: "gym",
      note: "Eli smiles on the cut and puts the open page into his friend's hands. Keep both faces and the cream script in the warm pool; the blue echo is gone from this close-up.",
      stage: (t) => {
        const hand = ramp(t, wordAt("13.smile", "handed"), wordAt("13.smile", "script"));
        return (
          <>
            <Hero position={HERO} rotationY={0.45} animation="hold" arms="hold" face="smile" gaze={0} />
            <Friend position={ELI} rotationY={-0.35} animation="reach" arms="reach" face="grin" />
            <ScriptLeaf position={[ELI[0] - 0.36 - 0.48 * hand, ELI[1] + 0.78, ELI[2] + 0.22]} line />
          </>
        );
      },
    },
  ],
});
