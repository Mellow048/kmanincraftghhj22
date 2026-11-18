import { Block, cam, storyScene } from '../../engine';
import type { Vec3 } from '../../engine';
import { Hero, Poppy, ease, jolt, ramp, timing, wordAt } from './kit';
import { route, tableAt, tabletop } from './marks';

// Disposable blocking study. Replace the PREMISE, keep the craft: action → travel → consequence.
// The rooted stem bends, not the pot. The lens and the reaching hand share its mark.
const root: Vec3 = [tableAt[0], tabletop + .21, tableAt[2]];
const flower: Vec3 = [root[0], root[1] + .35, root[2]];
const FlinchingFlower = ({ bend }: { bend: number }) => <>
  <Block position={[root[0], tabletop + .105, root[2]]} size={[.24, .21, .24]} color="#ae603e" />
  <Poppy position={root} rotation={[0, 0, bend]} scale={1.12} />
</>;
const flinch = wordAt('1.town', 'flinched'), other = wordAt('1.turn', 'other');
// Start mid-attempt: the stem is already edging away on “In this town”. It peeks
// upright as the hand pauses, then recoils fully on the measured word.
const wary = (t: number) => (.38 + .22 * ease(ramp(t, 0, .28))) * (1 - ease(ramp(t, flinch * .36, flinch * .78)));

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Even the flower was shy",
  shots: [
    {
      cue: "1.town",
      ...cam.orbit({ on: [-.34, 1.18, 0], dist: 3.85, distTo: 3.55, yaw: 47, yawTo: 59, pitch: 8, fov: 41 }),
      zone: 'village',
      note: 'See the hand, the face and the flower together. The hand starts forward; on flinched the stem recoils away from it.',
      stage: (t) => <>
        <Hero position={route(0).position} rotationY={1.38} animation="reach" blendTo="talk" blend={Math.max(wary(t), ease(ramp(t, flinch - .48, flinch)))} time={t} face={t < flinch ? 'smile' : 'wow'} lookAt={flower} />
        <FlinchingFlower bend={-wary(t) - .78 * ease(ramp(t, flinch, flinch + .17)) + jolt(t, flinch, .15)} />
      </>,
    },
    {
      cue: "1.around",
      ...cam.truck({ on: [-.8, .38, 1.22], by: [1.6, 0, 0], dist: 5.6, yaw: 4, pitch: 39, fov: 44 }),
      zone: 'village',
      note: 'Track from high above the table so the audience sees the path. His feet go around its front, not through the wood.',
      stage: (t, { p }) => <>
        <Hero {...route(ease(p))} animation="walk" plantFeet time={t} face="uneasy" lookAt={flower} />
        <FlinchingFlower bend={-.78 * (1 - ease(p))} />
      </>,
    },
    {
      cue: "1.turn",
      ...cam.push({ on: [.34, 1.20, 0], dist: 3.4, to: 3.12, yaw: -51, pitch: 9, fov: 43 }),
      zone: 'village',
      note: 'Reverse to the second attempt. This time the red head bends the OTHER way while the reaching arm drops.',
      stage: (t) => <>
        <Hero position={route(1).position} rotationY={-1.38} animation="reach" blendTo="shrug" blend={1 - ease(ramp(t, other, other + .34))} time={t} face={t < other ? 'brave' : 'frown'} lookAt={flower} />
        <FlinchingFlower bend={.78 * ease(ramp(t, other, other + .18)) - jolt(t, other, .15)} />
      </>,
    },
  ],
});
