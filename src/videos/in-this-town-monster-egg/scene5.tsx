import { cam, storyScene } from "../../engine";
import { Adult, EAST, HeroEgg, WEST, faceOf, timing } from "./kit";
import { WellEggs } from "./world";

const KID_AT: [number, number, number] = [13, 0, 4.6];
const ADULTS: Array<[number, number, number]> = [
  [14.8, 0, 4.6],
  [15.15, 0, 4.08],
  [15.15, 0, 5.12],
];
const LOOK = faceOf(KID_AT);

/** THE ADULTS SAY NO. He asks, they answer, and the answer is a well full of eggs. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The adults say no",
  shots: [
    {
      cue: "5.show",
      ...cam.push({ on: [13, 1.3, 4.6], dist: 2.3, to: 1.85, yaw: 90, pitch: 24 }),
      zone: "town",
      look: "overworld-day",
      note: "What the adults see: a kid holding his egg up as high as he can, grinning, sure they will be pleased.",
      stage: () => <HeroEgg position={KID_AT} rotationY={EAST} carry="lift" face="grin" />,
    },
    {
      cue: "5.dead",
      ...cam.push({ on: [14.95, 1.5, 4.6], dist: 3.0, to: 2.5, yaw: -90, pitch: -18, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The reverse, what he sees: three grown-ups looking down, the middle one talking. 'A dead egg.'",
      stage: () => (
        <>
          <Adult who={1} position={ADULTS[0]} rotationY={WEST} animation="talk" face="frown" lookAt={LOOK} />
          <Adult who={2} position={ADULTS[1]} rotationY={WEST} animation="idle" face="frown" lookAt={LOOK} />
          <Adult who={3} position={ADULTS[2]} rotationY={WEST} animation="shrug" face="neutral" lookAt={LOOK} />
        </>
      ),
    },
    {
      cue: "5.well",
      ...cam.top({ on: [17, 0.25, 6], height: 5.4, to: 2.9, spin: [-20, 12] }),
      zone: "town",
      look: "overworld-day",
      note: "'Like all the others': straight down into the old well, sinking, until the frame is nothing but grey cracked eggs.",
      stage: (t) => <WellEggs glow={0} t={t} />,
    },
    {
      cue: "5.hold",
      ...cam.push({ on: [13.15, 0.95, 4.6], dist: 2.1, to: 1.6, yaw: 60, pitch: 6, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "'Hold it tighter': the answer to the adults is a hug. Close, and he does not look sad any more.",
      stage: () => <HeroEgg position={KID_AT} rotationY={EAST} carry="hug" face="brave" />,
    },
  ],
});
