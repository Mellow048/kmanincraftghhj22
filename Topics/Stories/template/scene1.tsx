import { cam, storyScene } from '../../engine';
import type { Vec3 } from '../../engine';
import { Hero, Villager, ROBE, ease, ramp, timing, wordAt } from './kit';

// A two-shot rehearsal, NOT a script to repeat. Keep both sides of the edit in
// the same physical queue: first his signal, then what lowering the hand does.
const me: Vec3 = [-.42, .051, 2.65];
const queue: Vec3[] = [[.28, .051, 1.68], [.12, .051, .5], [.28, .051, -.64]];
const Queue = ({ bow }: { bow: number }) => <>{queue.map((p, i) =>
  <Villager key={i} position={p} robe={[ROBE.white, ROBE.brown, ROBE.friend][i]} lean={.64 * bow} nod={.22 * bow} phase={i * .6} />
)}</>;
const hand = wordAt('1.hand', 'hand'), bow = wordAt('1.hand', 'bowed');
const down = wordAt('1.me', 'lowered'), up = wordAt('1.me', 'stood');
export const scene1 = storyScene(timing, {
  id: 'scene1', title: 'The queue and the signal',
  shots: [
    {
      cue: "1.hand",
      ...cam.orbit({ on: [0, 1.18, 2.1], dist: 4.3, yaw: -7, yawTo: 9, pitch: 10, fov: 42 }),
      zone: 'village',
      note: 'Look along the queue, not across a row of extras. His hand goes up; the folded-sleeve bodies tip towards him.',
      stage: t => <>
        <Hero position={me} rotationY={.5} animation="reachUp" blendTo="talk" blend={ease(ramp(t, hand - .32, hand))} time={t} />
        <Queue bow={ease(ramp(t, bow - .12, bow + .14))} />
      </>,
    },
    {
      cue: "1.me",
      ...cam.push({ on: [.17, 1.34, 1.62], dist: 3.0, to: 2.65, yaw: 41, pitch: 2, fov: 38 }),
      zone: 'village',
      note: 'Leave the hand in the edge of the reverse. Its owner drops it, and the first villager straightens up on stood.',
      stage: t => <>
        <Hero position={me} rotationY={.5} animation="reachUp" blendTo="idle" blend={1 - ease(ramp(t, down, down + .22))} time={t} />
        <Queue bow={1 - ease(ramp(t, up, up + .22))} />
      </>,
    },
  ],
});
