import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Puffs } from "../../../Topics/InThisTown/creatures";
import { Bits, CHILD, EAST, Hero, Hole, IronGolem, PLACE, ROBE, Smoke, Villager, WEST, Wisps, climb, ease, golemHand, ramp, stepAt, timing } from "./kit";

/** Where the tunnel comes out: the last step below the top, on the side the town can see. */
const OUT: Vec3 = stepAt(9);
const HALF_IN: Vec3 = [OUT[0], OUT[1] - 0.55, OUT[2]];
const POST = PLACE.post;

/** The town from the hill: [x, z, robe, phase, speed]. Everyone faces east, so we can see that it is one face. */
const TOWN: Array<[number, number, string, number, number]> = [
  [6.0, 3.1, ROBE.brown, 0.3, 0.9],
  [1.3, 3.7, ROBE.white, 1.9, 0],
  [0.3, -0.7, ROBE.blue, 3.4, 0],
  [-1.9, 2.3, ROBE.farmer, 2.7, 0.8],
  [-3.2, 4.1, ROBE.red, 0.9, 0],
  [-3.0, 0.2, ROBE.elder, 2.2, 0],
  [-5.4, 1.9, ROBE.smith, 1.3, 0.7],
  [-6.9, 3.4, ROBE.brown, 3.0, 0],
  [-7.6, 0.5, ROBE.white, 0.6, 0],
];

/** The town going about its morning. Used from close, and from the top of the hill. */
const Morning = ({ t, p }: { t: number; p: number }) => (
  <>
    <IronGolem position={POST} rotationY={EAST} bow={0.42} armR={-0.92} headPitch={0.35} flower />
    <Villager position={[POST[0] + 2.2, 0, POST[2] - 0.69]} rotationY={WEST} scale={CHILD} kid robe={ROBE.friend} lookAt={golemHand(POST, EAST, -0.92)} phase={1.1} />
    {TOWN.map(([x, z, robe, phase, speed], i) =>
      speed > 0 ? (
        <Villager key={i} {...stride([x - speed * 1.6, 0, z], [x + speed * 1.6, 0, z], p)} walk={t * speed} robe={robe} hat={robe === ROBE.farmer ? "straw" : "none"} phase={phase} />
      ) : (
        <Villager key={i} position={[x, 0, z]} rotationY={EAST + (i % 2 ? 0.25 : -0.2)} robe={robe} turn={Math.sin(t * 0.9 + i) * 0.3} phase={phase} />
      ),
    )}
    <Puffs position={[10, 6.6, -8]} count={7} rise={3.4} spread={0.5} size={0.55} speed={0.3} opacity={0.5} seed={2} />
    <Puffs position={[-10, 6.2, -8]} count={7} rise={3.4} spread={0.5} size={0.55} speed={0.27} opacity={0.5} seed={3} />
  </>
);

/** THE EDGE. He comes up just below the top, smells smoke, and looks back at everything from the tour. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The edge",
  shots: [
    {
      cue: "10.out",
      ...cam.push({ on: [OUT[0], 10.5, 0], dist: 2.8, to: 2.3, yaw: -90, pitch: -8, fov: 40 }),
      zone: "hill",
      look: "overworld-day",
      note: "'I came up just below the top': a block of the hillside breaks and his head and one arm come up out of it, into daylight.",
      stage: (t) => (
        <>
          {t >= 0.2 ? <Hole position={OUT} size={0.95} rim="#6b4a2e" /> : null}
          <Bits position={[OUT[0], 10.1, 0]} t={t - 0.2} color="#5fa03c" count={12} seed={5} />
          <Hero position={[OUT[0], 10 - 1.5 + 0.95 * ease(ramp(t, 0.22, 0.95)), 0]} rotationY={WEST} animation="reachUp" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "10.smell",
      ...cam.orbit({ on: [OUT[0], 10.5, 0], dist: 1.75, yaw: -62, yawTo: -22, pitch: -2, fov: 36 }),
      zone: "hill",
      look: "overworld-day",
      note: "'The air smelled like smoke': close on his face as it changes, and grey smoke comes over the top of the hill and past him.",
      stage: (t) => (
        <>
          <Hole position={OUT} size={0.95} rim="#6b4a2e" />
          <Hero position={HALF_IN} rotationY={WEST} animation="lookAround" face="uneasy" headPitch={-0.22} />
          <Wisps position={[OUT[0] + 0.2, 11.0, 0.3]} t={t + 2} count={16} reach={4.2} size={0.85} opacity={0.6} color="#6f6862" dir={[-1, -0.1, 0.12]} />
        </>
      ),
    },
    {
      cue: "10.look",
      from: [46.9, 12.7, 0.3],
      to: [46.2, 12.45, 0.3],
      target: [6, 1.5, 1.5],
      fov: 30,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-day",
      note: "'I looked back one more time': over the top of his head, a long lens down the whole valley to his town, with every roof he knows in it.",
      stage: (t, { p }) => (
        <>
          <Hero position={[44.2, 10, 0.72]} rotationY={WEST} animation="idle" face="calm" />
          <Morning t={t} p={p} />
        </>
      ),
    },
    {
      cue: "10.oneface",
      ...cam.push({ on: [0.2, 1.0, 1.7], dist: 15.5, to: 12.4, yaw: 90, pitch: 25, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'A whole town with one face was waking up without me': the square from above, as he sees it. Chimneys, the golem and its flower, and the same face nine times.",
      stage: (t, { p }) => <Morning t={t} p={p} />,
    },
    {
      cue: "10.steps",
      ...cam.push({ on: [45.8, 11.5, 0], dist: 4.6, to: 3.8, yaw: -90, pitch: -14, fov: 42 }),
      zone: "hill",
      look: "overworld-day",
      note: "'I climbed the last few steps': from below and behind, he hops up onto the top and walks to the far edge, and dark smoke stands up beyond it.",
      stage: (t, { p }) => {
        const hop = ramp(p, 0, 0.42);
        const at: Vec3 = hop < 1 ? climb(9, 1, hop) : [45.6 + 2.1 * ramp(p, 0.42, 1), 11, 0];
        return (
          <>
            <Hole position={OUT} size={0.95} rim="#6b4a2e" />
            <Hero position={at} rotationY={EAST} animation="run" animDistance={p * 3.4} face="brave" />
            <Smoke position={[57, 8, -5]} rise={16} spread={2.4} size={6.5} count={14} color="#2e2622" opacity={0.95} speed={0.12} lean={-0.1} seed={11} />
            <Smoke position={[60, 7.5, 5.5]} rise={17} spread={2.6} size={7} count={14} color="#2a2320" opacity={0.95} speed={0.1} lean={-0.08} seed={12} />
            <Smoke position={[55.5, 9, 0.5]} rise={14} spread={2.2} size={6} count={13} color="#3a302b" opacity={0.92} speed={0.13} lean={-0.12} seed={13} />
          </>
        );
      },
    },
  ],
});
