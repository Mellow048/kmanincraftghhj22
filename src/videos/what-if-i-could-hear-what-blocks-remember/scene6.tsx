import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EchoTrace, Figure, Friend, Hero, NORTH, SPOT, timing, wordAt } from "./kit";

const PAGES = SPOT.desk(1, 1);
const WRITING: Vec3 = [PAGES[0], PAGES[1] + 0.09, PAGES[2] - 0.05];
const WALL = SPOT.at(0.5, 1.42, -3.67);

/** A folded-open, two-page rehearsal script. The quoted words are cubes, not tiny painted type. */
const ScriptPages: React.FC<{ showLine?: boolean }> = ({ showLine = false }) => (
  <group>
    <Block position={[-0.38, 0, -0.02]} size={[0.76, 0.035, 0.92]} color="#eee6d2" rotationY={-0.06} />
    <Block position={[0.38, 0.008, -0.02]} size={[0.76, 0.035, 0.92]} color="#faf4e5" rotationY={0.05} />
    {[-0.56, -0.39, -0.22, -0.05, 0.12].map((z, i) => (
      <Block key={z} position={[-0.39, 0.023, z]} size={[0.44 - (i % 2) * 0.06, 0.009, 0.012]} color="#8d99a0" castShadow={false} />
    ))}
    {[-0.57, -0.39, -0.21, -0.03, 0.15].map((z, i) => (
      <Block key={z} position={[0.38, 0.033, z]} size={[0.48 - (i % 2) * 0.08, 0.009, 0.012]} color="#8d99a0" castShadow={false} />
    ))}
    {showLine ? (
      <>
        <Figure text="I CAN'T" position={[0.38, 0.075, -0.21]} rotation={[-Math.PI / 2, 0, 0]} height={0.24} maxWidth={0.66} color="#243044" outline />
        <Figure text="STAY" position={[0.38, 0.075, 0.12]} rotation={[-Math.PI / 2, 0, 0]} height={0.24} maxWidth={0.58} color="#243044" outline />
      </>
    ) : null}
  </group>
);

/** He has the clue in his hand and on the wall; he chooses the wall. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The words were there",
  shots: [
    {
      cue: "6.pages",
      ...cam.push({ on: [WRITING[0], 1.05, WRITING[2]], dist: 3.6, to: 2.9, yaw: 177, pitch: 12, fov: 40 }),
      zone: "class",
      note: "The open pages lie beside the narrator's desk, with Eli bent over them. A dog-eared script, not a message addressed to the narrator, is the planted object in the frame.",
      stage: () => (
        <>
          <group position={WRITING}><ScriptPages /></group>
          <Friend position={SPOT.seat(2, 1)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.28} arms="hold" />
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "6.line",
      ...cam.push({ on: [WRITING[0] + 0.46, 1.4, WRITING[2] + 0.72], dist: 3.15, to: 2.65, yaw: 8, pitch: 6, fov: 40 }),
      zone: "class",
      note: "Eli looks up just long enough to say the plain explanation. The open script remains between them, while the boy's gaze slips past him to the wall.",
      stage: () => (
        <>
          <group position={WRITING}><ScriptPages /></group>
          <Friend position={SPOT.seat(1, 1)} rotationY={NORTH} animation="talk" face="calm" headPitch={-0.12} arms="talk" lookAt={[SPOT.seat(1, 2)[0], 1.1, SPOT.seat(1, 2)[2]]} />
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="uneasy" headYaw={0.45} gaze={1} />
        </>
      ),
    },
    {
      cue: "6.ignore",
      ...cam.push({ on: [WALL[0], WALL[1] + 0.18, WALL[2]], dist: 2.7, to: 2.2, yaw: 0, pitch: 4, fov: 36 }),
      zone: "class",
      note: "The camera abandons Eli's face and lands on the wall. The same cool square echo rings open at 'can't stay'; the boy in orange turns away from the person who has just tried to reassure him.",
      stage: (t) => (
        <>
          <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="sit" face="fear" headYaw={0.55} gaze={1} />
          <EchoTrace at={WALL} t={t - wordAt("6.ignore", "can't")} />
        </>
      ),
    },
    {
      cue: "6.words",
      ...cam.push({ on: [WRITING[0] + 0.38, WRITING[1], WRITING[2]], dist: 2.35, to: 1.9, yaw: 178, pitch: 27, fov: 36 }),
      zone: "class",
      note: "The words are visibly on the page: two bold voxel lines, I CAN'T and STAY, with the blue block echoing them beside the paper. The physical clue was never hidden; only its context was.",
      stage: (t) => (
        <>
          <group position={WRITING}><ScriptPages showLine /></group>
          <EchoTrace at={[WRITING[0] + 1.08, WRITING[1] + 0.32, WRITING[2] - 0.22]} t={t - wordAt("6.words", "words")} rotationY={0} />
        </>
      ),
    },
  ],
});
