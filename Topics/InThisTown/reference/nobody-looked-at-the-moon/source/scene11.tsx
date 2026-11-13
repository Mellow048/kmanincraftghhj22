import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Friend, Guard, Hero, MoonEye, PLACE, ROBE, TO_HIM, Walker, blinkAt, ease, ramp, timing, wordAt } from "./kit";

const ME = PLACE.atWell;
const GUARD = PLACE.guard;
/** The moon in the well: a hand's width over the black water, in the middle of the gap. */
const WATER: Vec3 = [0, 0.56, 1.625];
const LOOK: Vec3 = [0, 0.55, 1.62];

const SHAKING = wordAt("11.moon", "shaking");
const BLINKED = wordAt("11.blink", "blinked");
const AND = wordAt("11.caught", "and");
const CAUGHT = wordAt("11.caught", "caught");
const UP = wordAt("11.up", "up");
const LOOKING = wordAt("11.seen", "looking");
const MOONLIGHT = wordAt("11.light", "moonlight");

/** Water that will not lie still: each row of the picture slides a little, and not with its neighbours. */
const ripple = (t: number, size: number) => (y: number) => size * Math.sin(y * 46 + t * 5.2) + size * 0.5 * Math.sin(y * 21 - t * 3.1);
/** Where the eye was looking when it opened: off to one side, at nothing. */
const ASIDE: [number, number] = [-0.85, -0.3];

/** His own two hands on the wall of the well, for the shots that are what he sees. */
const Hands = () => (
  <>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.3, 0.88, 0.98]} rotation={[0.12, -s * 0.16, 0]}>
        <Block size={[0.17, 0.17, 0.5]} color="#f1ece0" />
        <Block position={[0, 0, 0.3]} size={[0.17, 0.17, 0.12]} color="#dba47c" />
      </group>
    ))}
  </>
);

/** THE EYE. The moon in the water blinks. It is an eye, it finds him, and for one moment that is the best thing that ever happened to him. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The eye",
  shots: [
    {
      cue: "11.moon",
      ...cam.push({ on: LOOK, dist: 1.75, to: 1.4, yaw: 180, pitch: 57, fov: 46 }),
      zone: "village",
      note: "'It was only a moon, shaking a little in the water': his own eyes, his own two hands on the stone, and down in the slot, small and white on black water, the thing nobody is allowed to see. On 'shaking' the water shivers.",
      stage: (t) => (
        <>
          <Hands />
          <MoonEye position={WATER} radius={0.25} flat glow={0} shift={ripple(t, 0.008 + 0.02 * ramp(t, SHAKING - 0.2, SHAKING + 0.2))} />
        </>
      ),
    },
    {
      cue: "11.blink",
      ...cam.push({ on: LOOK, dist: 1.45, to: 1.32, yaw: 180, pitch: 64, fov: 44 }),
      zone: "village",
      note: "'Then it blinked': closer. On the word, two lids the colour of the night shut over the moon and open again. And now there is something in it.",
      stage: (t) => (
        <>
          <Hands />
          <MoonEye position={WATER} radius={0.25} flat glow={0} shift={ripple(t, 0.01)} lid={blinkAt(t, BLINKED, 0.1, 0.08)} eye={t > BLINKED + 0.13} look={ASIDE} />
        </>
      ),
    },
    {
      cue: "11.eye",
      ...cam.push({ on: LOOK, dist: 1.42, to: 1.3, yaw: 180, pitch: 78, fov: 40 }),
      zone: "village",
      note: "'It was an eye': as close as the water. A blue iris as big as a cartwheel, looking away at nothing in particular. It has not seen him yet.",
      stage: (t) => <MoonEye position={WATER} radius={0.25} flat glow={0} shift={ripple(t, 0.006)} eye look={ASIDE} />,
    },
    {
      cue: "11.caught",
      ...cam.push({ on: LOOK, dist: 1.5, to: 1.22, yaw: 180, pitch: 76, fov: 40 }),
      impacts: [{ at: CAUGHT + 0.06, amp: 0.02, dur: 0.3 }],
      zone: "village",
      note: "'It rolled, slowly, and caught me looking': the iris goes round the white, the long way, in no hurry. On 'caught' it stops dead in the middle, on us, and the pupil shuts down to a point.",
      stage: (t) => {
        const angle = (200 + 220 * ease(ramp(t, 0.16, AND))) * (Math.PI / 180);
        const out = 0.9 * (1 - ease(ramp(t, AND, CAUGHT + 0.06)));
        return <MoonEye position={WATER} radius={0.25} flat glow={0} shift={ripple(t, 0.005)} eye look={[Math.cos(angle) * out, Math.sin(angle) * out]} pupil={t > CAUGHT + 0.06 ? 0.8 : 1} />;
      },
    },
    {
      cue: "11.up",
      ...cam.push({ on: [0, 3.9, 7], dist: 9.4, to: 9.0, yaw: 179.2, pitch: -20, fov: 56 }),
      zone: "village",
      note: "'I looked up. I could not help it': from behind him. He comes up off the wall and his head goes back, all the way, with no hat on it. Over his roof the moon is an eye, and it is looking down at him.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.4));
        return <Hero position={ME} animation="leanOver" blendTo="idle" blend={1 - k} face="wow" gaze={0} hat="off" headPitch={0.22 * (1 - k) - 0.62 * ease(ramp(t, UP - 0.1, UP + 0.25))} />;
      },
    },
    {
      cue: "11.ground",
      ...cam.truck({ on: [0, 1.2, ME[2]], dist: 6.6, yaw: -56, pitch: 13, by: [0.5, 0, 0.4], fov: 42 }),
      zone: "village",
      note: "'A town that only looked at the ground': from across the square, over the hats. They go by with their brims down. Past them, by the well, one bare head is tipped right back.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="idle" face="wow" gaze={0} hat="off" headPitch={-0.62} />
          <Guard />
          <Walker from={[-4.9, 0, 1.6]} to={[-2.6, 0, 5.0]} t={t + 0.3} speed={0.9} robe={ROBE.brown} phase={0.3} />
          <Walker from={[-1.9, 0, 5.2]} to={[-3.9, 0, 1.2]} t={t - 0.2} speed={0.9} robe={ROBE.blue} phase={3.4} />
          <Walker from={[-2.7, 0, -1.2]} to={[-2.5, 0, 3.5]} t={t + 1.0} speed={0.8} robe={ROBE.white} phase={1.9} />
          <Walker from={[2.6, 0, 4.4]} to={[2.8, 0, -3]} t={t + 2.6} speed={0.8} robe={ROBE.farmer} phase={2.7} />
        </>
      ),
    },
    {
      cue: "11.seen",
      ...cam.push({ on: [0, 1.25, ME[2]], dist: 15, to: 9.5, yaw: 0, pitch: 40, fov: 40 }),
      zone: "village",
      note: "'Something was finally looking at me': what the moon sees. Down out of the sky at a square full of hats, and in the middle of them one face, turned up. On 'looking' he lifts his hand and waves.",
      stage: (t) => (
        <>
          <Hero position={ME} animation="idle" blendTo="wave" blend={1 - ease(ramp(t, LOOKING - 0.3, LOOKING))} face={t < LOOKING - 0.3 ? "wow" : "smile"} gaze={0} hat="off" lookAt={[0, 10, 11.5]} />
          <Guard />
          <Walker from={[-3.2, 0, -1.4]} to={[3.4, 0, -1.2]} t={t + 2.2} speed={0.9} robe={ROBE.brown} phase={0.3} />
          <Walker from={[3.0, 0, 4.9]} to={[-3.4, 0, 4.7]} t={t + 0.2} speed={0.9} robe={ROBE.blue} phase={3.4} />
          <Walker from={[-2.9, 0, 5.9]} to={[-2.7, 0, 0]} t={t + 0.6} speed={0.8} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[2.4, 0, -3.2]} to={[2.6, 0, 3]} t={t + 0.8} speed={0.85} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
        </>
      ),
    },
    {
      cue: "11.light",
      ...cam.push({ on: [0, 0, -9], dist: 31, to: 28, yaw: 0, pitch: 35, fov: 50 }),
      zone: "village",
      note: "'The moonlight came into town': from the sky. The white comes off the wheat and down the lane like a tide, and reaches the well. Every hat in the square runs for a door. Every door shuts. He stays.",
      stage: (t) => {
        const run = Math.max(0, t - MOONLIGHT);
        return (
          <>
            <Hero position={ME} animation="idle" face="smile" gaze={0} hat="off" lookAt={[0, 10, 11.5]} />
            <Friend position={[GUARD[0] - run * 3.3 * 0.83, 0, GUARD[2] - run * 3.3 * 0.55]} rotationY={run > 0 ? -2.15 : TO_HIM + Math.PI} walk={run * 3.3} nod={0.4} />
            <Walker from={[-3.0, 0, 3.6]} to={[-8.9, 0, 9.6]} t={run} speed={3.5} robe={ROBE.brown} phase={0.3} />
            <Walker from={[2.8, 0, -0.6]} to={[9.2, 0, -4.9]} t={run} speed={3.4} robe={ROBE.blue} phase={3.4} />
            <Walker from={[-2.2, 0, -1.8]} to={[-9.2, 0, -4.9]} t={run} speed={3.6} robe={ROBE.farmer} phase={2.7} />
            <Walker from={[3.2, 0, 4.8]} to={[8.9, 0, 9.6]} t={run} speed={3.8} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
            <Walker from={[0.9, 0, -3.4]} to={[9.2, 0, -4.9]} t={run} speed={3.2} robe={ROBE.white} phase={1.9} />
          </>
        );
      },
    },
  ],
});
