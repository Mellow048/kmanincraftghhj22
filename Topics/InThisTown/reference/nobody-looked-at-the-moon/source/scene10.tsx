import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, EAST, Folk, Guard, HAT_BACK, Hero, IronGolem, KID, LOOSE_HAT, PLACE, Pole, ROBE, StrawHat, Walker, ease, ramp, slabAt, timing, wordAt } from "./kit";

const ME = PLACE.atWell;
const OFF = wordAt("10.hat", "off");
const HANDS = wordAt("10.stone", "hands");
const WELL = PLACE.well;
const railAt = (slab: number) => WELL[2] - 1.05 + slab - 1.5;

/** The hat in his hands, over his head. */
const HELD: Vec3 = [ME[0], 1.8 * KID, ME[2]];

/** THE EDGE. The last shove, one look back at everything he has, and then the hat comes off. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The edge",
  shots: [
    {
      cue: "10.gap",
      ...cam.top({ on: [0, 0.8, 1.7], height: 4.7, to: 3.9, spin: [-4, 3], fov: 42 }),
      zone: "village",
      note: "'Just wide enough for a moon': straight down on the well. A hat at the top of the frame, a rail coming out from under it, and the slab grinding the last hand's width. Between stone and stone a black slot opens, with water at the bottom of it.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, railAt(slabAt("10.gap", t))]} animation="push" face="brave" gaze={0}>
            <Pole />
          </Hero>
          <Guard />
        </>
      ),
    },
    {
      cue: "10.town",
      ...cam.pan({ from: [0.75, 1.3, 3.3], on: [-0.3, 1.2, -1.5], onTo: [-8.4, 1.7, -4.4], fov: 46 }),
      zone: "village",
      note: "'Behind me: hats, lanterns, open doors': he looks over his shoulder, and the lens goes where he looks. Everything he has: the hats, the lantern lines, a door standing open with the light of a kitchen in it.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="idle" face="uneasy" gaze={0} headYaw={1.05 * ease(ramp(t, 0, 0.5))} headPitch={0.05} />
          <Guard />
          <Walker from={[-1.6, 0, -2.2]} to={[-5.5, 0, 0.6]} t={t + 0.3} speed={0.8} robe={ROBE.blue} phase={3.4} />
          <Walker from={[-5.2, 0, -0.6]} to={[-1.5, 0, -3.4]} t={t} speed={0.75} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[-6.6, 0, -1.4]} to={[-9.0, 0, -4.2]} t={t} speed={0.9} robe={ROBE.white} phase={1.9} />
          <Folk position={[-8.1, 0, -3.3]} rotationY={0.6} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
          <IronGolem position={[-11.5 + t * 0.6, 0, -2.6]} rotationY={EAST} walk={t * 0.6} headPitch={0.28} hat />
        </>
      ),
    },
    {
      cue: "10.nobody",
      ...cam.top({ on: [0, 0, 1.2], height: 11, to: 9.6, spin: [-5, 4], fov: 44 }),
      zone: "village",
      note: "'Nobody looked up': straight down again, the way the moon sees it. Hats. His hat, at the edge of a black slot in the well. Her hat, beside it. Not one of them tips.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="idle" face="uneasy" gaze={0} />
          <Guard />
          <Walker from={[-3.4, 0, -1.2]} to={[3.6, 0, -1.4]} t={t + 2.4} speed={0.9} robe={ROBE.brown} phase={0.3} />
          <Walker from={[3.2, 0, 4.6]} to={[-3.6, 0, 4.4]} t={t + 1.8} speed={0.95} robe={ROBE.blue} phase={3.4} />
          <Walker from={[2.5, 0, -3.2]} to={[2.7, 0, 6]} t={t + 3.2} speed={0.85} robe={ROBE.white} phase={1.9} />
          <Walker from={[-3.2, 0, 5.8]} to={[-3.0, 0, -2]} t={t + 1.4} speed={0.8} robe={ROBE.farmer} phase={2.7} />
        </>
      ),
    },
    {
      cue: "10.hat",
      ...cam.push({ on: [0, 1.2, ME[2]], dist: 2.25, to: 1.9, yaw: 4, pitch: 4, fov: 40 }),
      zone: "village",
      note: "'I took off my hat': from over the well. Both hands go up, and on 'off' the hat lifts clear. It is the first time in the film we have seen all of his face, and the first bare head this town has seen in years.",
      stage: (t) => {
        const up = ease(ramp(t, OFF, OFF + 0.34));
        return (
          <>
            <Hero position={ME} animation="idle" blendTo="lift" blend={1 - ease(ramp(t, 0.02, OFF))} face="brave" gaze={0} hat={t < OFF ? "on" : "off"} />
            {t < OFF ? null : <StrawHat position={[HELD[0], HELD[1] + 0.3 * up, HELD[2] + 0.06]} rotation={[HAT_BACK - 0.2 * up, 0, 0]} width={LOOSE_HAT} crown={0.4} />}
            <Guard />
          </>
        );
      },
    },
    {
      cue: "10.stone",
      ...cam.push({ on: [0, 0.98, 1.0], dist: 1.55, to: 1.3, yaw: 0, pitch: 4, fov: 40 }),
      zone: "village",
      note: "'Put my hands on the cold stone': from over the slot, at the height of the wall. On 'hands' two white sleeves come down flat on the stone, and his face comes down after them, bare. Under the lens the slot is black.",
      stage: (t) => <Hero position={ME} animation="idle" blendTo="leanOver" blend={1 - ease(ramp(t, HANDS - 0.25, HANDS + 0.1))} face="brave" gaze={0} hat="off" />,
    },
    {
      cue: "10.lean",
      ...cam.push({ on: [0, 1.0, 1.1], dist: 3.4, to: 3.0, yaw: 55, pitch: 16, fov: 42 }),
      zone: "village",
      note: "'And leaned over': the whole of it in one picture, from above. A boy with no hat, bent over a black hole in the middle of his town, under the bell that is rung to wake it.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="leanOver" face="brave" gaze={0} hat="off" headPitch={0.22 * ease(ramp(t, 0.1, 0.55))} />
          <Guard />
        </>
      ),
    },
  ],
});
