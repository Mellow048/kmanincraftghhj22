import { cam, storyScene } from "../../engine";
import type { AnimName, FaceName } from "../../engine";
import { EAST, FireLight, Hero, PLACE, Raider, timing, stepEast, wordAt } from "./kit";

const LIP = PLACE.lip;
const SECOND_I = wordAt("12.strange", "i", 1);

/**
 * Five strangers on the first five steps of the hill, one above the other: [who, face, z].
 * A stack of faces, like the wall that opened the film, except that no two of these are the same.
 */
const STEPS: Array<[number, FaceName, number]> = [
  [3, "grin", -0.3],
  [6, "laugh", 0.32],
  [8, "smug", -0.28],
  [7, "happy", 0.34],
  [5, "grin", -0.3],
];
const OnSteps = ({ clip }: { clip: AnimName }) => (
  <>
    {STEPS.map(([who, face, z], i) => (
      <Raider key={i} who={who} face={face} position={stepEast(i, z)} rotationY={EAST} animation={clip} torch={i % 2 === 0} light={i === 2 ? 6 : 0} phase={i * 1.7} />
    ))}
  </>
);

/** THE WAIT. One more beat before the answer, and it is the wrong answer: he thinks he has found home. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "Far from home",
  shots: [
    {
      cue: "12.faces",
      ...cam.push({ on: [60.1, 3.75, 0], dist: 7.6, to: 6.6, yaw: 90, pitch: -5, fov: 34 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'Not one face was the same': five of them up the steps of the hill, one above the other. A stack of faces like the wall that opened the film, and every one is different.",
      stage: () => (
        <>
          <OnSteps clip="idle" />
          <FireLight position={[65, 4, 0]} power={60} reach={16} />
        </>
      ),
    },
    {
      cue: "12.hands",
      ...cam.push({ on: [60.6, 4.3, 0], dist: 6.6, to: 5.8, yaw: 90, pitch: -22, fov: 44 }),
      zone: "valley2",
      look: "lava-shore",
      note: "The word is 'hands': from below, every arm goes up at once. Hands and torches all the way up the frame. Nobody in his town could do this.",
      stage: () => (
        <>
          <OnSteps clip="cheer" />
          <FireLight position={[65, 3, 0]} power={60} reach={16} />
        </>
      ),
    },
    {
      cue: "12.strange",
      ...cam.push({ on: [LIP[0], 12.2, 0], dist: 2.2, to: 1.6, yaw: 76, pitch: -3, fov: 36 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'I wasn't strange. I was just far from home': his face, warm in the firelight, and the smile comes. He has it exactly wrong.",
      stage: (t) => (
        <>
          <Hero position={LIP} rotationY={EAST} animation="idle" face={t < SECOND_I ? "smile" : "grin"} gaze={0} />
          <FireLight position={[LIP[0] + 2.0, 11.9, 0.9]} power={18} reach={7} />
        </>
      ),
    },
    {
      cue: "12.shout",
      ...cam.push({ on: [LIP[0], 12.3, -0.22], dist: 3.0, to: 2.55, yaw: 102, pitch: -15, fov: 40 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'About to shout hello': from below, his arm goes up to wave and his mouth is open. The sentence is not finished, and neither is the picture.",
      stage: () => (
        <>
          <Hero position={LIP} rotationY={EAST} animation="wave" face="laugh" gaze={0} />
          <FireLight position={[LIP[0] + 2.0, 11.9, -0.9]} power={18} reach={7} />
        </>
      ),
    },
  ],
});
