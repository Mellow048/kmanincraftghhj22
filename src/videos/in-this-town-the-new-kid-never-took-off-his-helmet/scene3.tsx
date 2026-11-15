import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  DAY, Drips, EAST, EDGE, Fill, HTREE, Hero, NIGHT, NewKid, Posters, WEST, WOODS, YARD, at, ease, faceOf, kidHead, mix, ramp, timing, toward, wordAt,
} from "./kit";

/** Behind the tree in the yard, and where he peeks round the fat tree in the woods (the south side of its trunk). */
const SPY: Vec3 = at(YARD, -12.3, 0, 5.95);
export const PEEK: Vec3 = at(HTREE, 0.6, 0, 0.66);

/**
 * ACT 3. He watches the new kid: into the woods every day, back every morning with a wet helmet. One night he follows.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Following",
  shots: [
    {
      cue: "3.watch",
      ...cam.push({ on: faceOf(SPY), dist: 2.0, to: 1.6, yaw: -128, pitch: 2, fov: 38 }),
      zone: "yard",
      look: DAY,
      note: "The teller's face coming round a tree trunk in the yard. He is the one watching now.",
      stage: (t) => (
        <>
          <Hero position={at(SPY, -0.25 * (1 - ease(ramp(t, 0, 0.5))), 0, 0)} rotationY={toward(SPY, at(YARD, -18, 0, 1.5))} animation="peek" face="brave" gaze={0} />
          <Posters n={7} />
        </>
      ),
    },
    {
      cue: "3.woods",
      ...cam.push({ on: at(YARD, -18.5, 1.3, 1.5), dist: 9.5, to: 8.2, yaw: 68, pitch: 6, fov: 40 }),
      zone: "yard",
      look: DAY,
      note: "Wide, the environment shot: the road, the wall of black pines, and one small grey kid walking into it without slowing down.",
      stage: (t) => (
        <>
          <NewKid position={at(YARD, -15.5 - 1.5 * t, 0, 1.5)} rotationY={WEST} animation="walk" animDistance={1.5 * t} />
          <Hero position={SPY} rotationY={toward(SPY, at(YARD, -18, 0, 1.5))} animation="peek" face="uneasy" />
        </>
      ),
    },
    {
      cue: "3.wet",
      ...cam.push({ on: at(YARD, -17.4, 1.2, 1.5), dist: 2.8, to: 1.5, yaw: 82, pitch: -5, fov: 38 }),
      zone: "yard",
      look: DAY,
      note: "Morning, low and close in front of him as he walks out of the trees at the lens: the helmet shines, and water runs off it.",
      stage: (t) => {
        const x = -20.4 + 1.25 * t;
        const p = at(YARD, x, 0, 1.5);
        return (
          <>
            <NewKid position={p} rotationY={EAST} animation="walk" animDistance={1.25 * t} wet />
            <Drips position={at(kidHead(p), 0, 0.18, 0)} t={t} n={7} />
          </>
        );
      },
    },
    {
      cue: "3.know",
      ...cam.push({ on: at(EDGE, 2, 1.25, 0), dist: 4.6, to: 4.0, yaw: 104, pitch: 4, fov: 40 }),
      zone: "yard",
      look: DAY,
      note: "Over the teller's shoulder: he stands in the road and looks at where the road goes into the dark.",
      stage: () => <Hero position={at(EDGE, 4.2, 0, -0.2)} rotationY={WEST} animation="idle" face="brave" />,
    },
    {
      cue: "3.follow",
      ...cam.truck({ on: at(YARD, -15, 1.0, 1.7), dist: 6.6, yaw: 60, pitch: 7, fov: 42, by: [-2.0, 0, 0] }),
      zone: "yard",
      look: NIGHT,
      note: "Night, from behind and to one side, moving with them: the helmet walking into the trees, and a long way behind it a kid in green, bent low.",
      stage: (t) => (
        <>
          <NewKid position={at(YARD, -16.2 - 1.4 * t, 0, 1.5)} rotationY={WEST} animation="walk" animDistance={1.4 * t} />
          <Hero position={at(YARD, -13.2 - 1.3 * t, 0, 2.1)} rotationY={WEST} animation="creep" animDistance={1.3 * t} face="brave" />
          <Fill position={at(YARD, -11 - 1.3 * t, 1.6, 4)} power={8} />
        </>
      ),
    },
    {
      cue: "3.far",
      ...cam.push({ on: at(WOODS, 20.5, 1.1, 1.6), dist: 5.2, to: 4.2, yaw: -84, pitch: 2, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "In the woods, the lens on the path in front of him: the helmet walks straight at us, and far behind, small, the teller slips from one pine to the next.",
      stage: (t) => {
        const hero: Vec3 = at(WOODS, 28 - 1.25 * t, 0, 2.5 - 0.5 * Math.sin(t * 1.4));
        return (
          <>
            <NewKid position={at(WOODS, 20.4 - 1.3 * t, 0, 1.6)} rotationY={WEST} animation="walk" animDistance={1.3 * t} />
            <Hero position={hero} rotationY={WEST} animation="creep" animDistance={1.25 * t} face="fear" />
            <Fill position={at(WOODS, 16.5, 1.5, 2.6)} power={5} />
          </>
        );
      },
    },
    {
      cue: "3.hid",
      ...cam.push({ on: at(HTREE, 0.3, 1.0, 0.5), dist: 4.2, to: 3.3, yaw: -74, pitch: 3, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "From the clearing, looking back at the fat tree: he runs up behind it, bent low, and one eye comes round the trunk. The lamp light is on his face.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 1.2));
        const p = mix(at(HTREE, 3.4, 0, 0.2), PEEK, k);
        return (
          <>
            <Hero position={p} rotationY={WEST} animation={k < 1 ? "creep" : "peek"} animDistance={k * 3} face="fear" gaze={0} />
            <Fill position={at(HTREE, -1.6, 1.3, 1.6)} power={6} color="#ffd9a0" />
          </>
        );
      },
    },
  ],
});
void wordAt;
