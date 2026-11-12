import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block } from "../../engine";
import { CLOSE, EAST, Fill, Hero, KID, KNEEL, Loose, PLACE, PUT, SOUTH, SubscribeSign, Tall, Townie, Watchers, ease, faceOf, ramp, stride, timing, wordAt } from "./kit";

const W = PLACE.well;
const BLINKED = wordAt("14.blink", "blinked");
const LOOK = wordAt("14.sub", "look");
/** Where he is standing now. */
const BESIDE: Vec3 = [PUT[0] + 0.95, 0, PUT[2] - 0.25];

/** The morning after: his pumpkin, his best friend standing over it, his mother coming. */
const Finders = () => (
  <>
    <Loose position={PUT} rotation={[0, 0.45, 0]} carve="flat" />
    <Townie who={5} scale={KID} position={[PUT[0] - 0.85, 0, PUT[2] - 0.1]} rotationY={EAST} animation="idle" headPitch={0.5} carve="fear" />
    <Townie who={4} position={[PUT[0] - 1.5, 0, PUT[2] - 1.5]} rotationY={0.6} animation="lookAround" carve="fear" />
    <Townie who={1} position={[PUT[0] + 2.6, 0, PUT[2] - 2.6]} rotationY={-0.6} animation="lookAround" carve="wow" />
  </>
);

/** THE END. He blinks. Then the morning after: the town looks for him, finds a pumpkin, and cannot see who is standing beside it. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "Neither have I",
  shots: [
    {
      cue: "14.looked",
      ...cam.push({ on: faceOf(KNEEL), dist: 1.7, to: 1.35, yaw: -14, pitch: -2, fov: 34 }),
      zone: "village",
      look: "overworld-night",
      note: "His bare face, close, eyes as wide as they go. A second ago he was grinning.",
      stage: () => (
        <>
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" face="fear" gaze={0} blink={false} />
          <Fill at={[KNEEL[0] - 0.8, 1.5, KNEEL[2] + 1.8]} power={7} color="#cfdcff" />
        </>
      ),
    },
    {
      cue: "14.turned",
      from: [-31, 1.7, -1.0],
      to: [-30, 1.7, -1.1],
      target: [-8, 2.3, -4.1],
      fov: 44,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-night",
      note: "The line of them down the street again. The nearest head swings away from its window to face the well, and its eyes come on. Then the next. Then the next.",
      stage: (t, { dur }) => (
        <>
          <Watchers toward={KNEEL} turned={(i) => ease(ramp(t, 0.1 + i * (dur - 0.7) * 0.2, 0.5 + i * (dur - 0.7) * 0.2))} />
          <Fill at={[-22, 3, 0]} power={46} color="#c9b8ff" />
          <Fill at={[-10, 3, 0]} power={46} color="#c9b8ff" />
        </>
      ),
    },
    {
      cue: "14.still",
      ...cam.push({ on: [KNEEL[0], 1.25, KNEEL[2] + 0.5], dist: 5.0, to: 4.7, yaw: 16, pitch: 3, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "From behind the closest one: its back fills one side of the frame, and past it, small, the kid stands at the well staring up at it. Neither moved. The camera barely does.",
      stage: () => (
        <>
          <Tall position={CLOSE} rotationY={Math.PI} headPitch={0.35} eyes={1} />
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" headPitch={-0.45} face="fear" gaze={0} blink={false} />
          <Fill at={[KNEEL[0] + 0.8, 1.6, KNEEL[2] + 1.4]} power={8} color="#cfdcff" />
        </>
      ),
    },
    {
      cue: "14.blink",
      ...cam.push({ on: faceOf(KNEEL), dist: 1.25, to: 1.0, yaw: 6, pitch: -4, fov: 32 }),
      zone: "village",
      look: "overworld-night",
      note: "His eyes, as close as we have been. On 'blinked' the picture shuts like an eyelid: black, top to bottom, in three frames.",
      stage: (t) => {
        const k = ease(ramp(t, BLINKED, BLINKED + 0.1));
        const f = faceOf(KNEEL);
        return (
          <>
            <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" face="fear" gaze={0} blink={false} />
            <Fill at={[KNEEL[0] - 0.8, 1.5, KNEEL[2] + 1.8]} power={7} color="#cfdcff" />
            {k > 0 ? <Block position={[f[0], f[1] + 3.2 * (1 - k), f[2] + 0.55]} size={[5, 3.2, 0.02]} color="#000000" castShadow={false} /> : null}
          </>
        );
      },
    },
    {
      cue: "14.day",
      ...cam.push({ on: [PUT[0], PUT[1] + 0.1, PUT[2]], dist: 1.25, to: 1.5, yaw: 26, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "A hard cut to bright morning, and the same spot by the well. His pumpkin is lying where he put it down. Nothing else is there.",
      stage: () => <Loose position={PUT} rotation={[0, 0.45, 0]} carve="flat" />,
    },
    {
      cue: "14.search",
      ...cam.truck({ on: [W[0] + 2.6, 1.35, W[2] + 2.2], dist: 4.6, yaw: 14, pitch: 4, by: [-1.0, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "The whole town is out. His mother turns on the spot calling, the others hurry past each other across the square, pumpkins swinging left and right. None of them can see far.",
      stage: (t, { p }) => (
        <>
          <Townie who={4} position={[W[0] + 2.4, 0, W[2] + 2.6]} rotationY={0.2} animation="lookAround" carve="fear" />
          <Townie who={1} {...stride([W[0] + 5.2, 0, W[2] + 0.6], [W[0] + 3.4, 0, W[2] + 0.4], p)} animation="run" carve="wow" />
          <Townie who={7} {...stride([W[0] + 0.6, 0, W[2] - 0.6], [W[0] + 2.2, 0, W[2] - 0.9], p)} animation="run" carve="frown" />
          <Townie who={6} old position={[W[0] + 4.3, 0, W[2] - 1.6]} rotationY={-0.4} animation="lookAround" carve="frown" />
          <Townie who={9} position={[W[0] + 1.2, 0, W[2] - 2.6]} rotationY={0.5} animation="wave" carve="wow" />
        </>
      ),
    },
    {
      cue: "14.found",
      ...cam.push({ on: [PUT[0], 0.5, PUT[2]], dist: 1.7, to: 3.3, yaw: 26, pitch: 12, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Back on the pumpkin, and the camera backs away from it. His best friend, in yellow, is standing over it looking down. There is no kid in blue anywhere.",
      stage: () => <Finders />,
    },
    {
      cue: "14.here",
      ...cam.push({ on: [PUT[0] + 0.3, 0.8, PUT[2] - 0.1], dist: 3.3, to: 4.6, yaw: 26, pitch: 15, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The same move, still backing away, and now something is standing beside the pumpkin that was not there a frame ago: thin, black, no taller than a child. His friend is looking straight through it.",
      stage: () => (
        <>
          <Finders />
          <Tall position={BESIDE} rotationY={0.45} scale={0.52} headPitch={0.3} />
          <Watchers />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [BESIDE[0] - 0.25, 1.0, BESIDE[2]], dist: 4.6, to: 3.6, yaw: 26, pitch: 8, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "We stop backing away and start coming in. A SUBSCRIBE sign is stuck in the ground by the pumpkin. On 'look' the small black thing lifts its head to us, and two pale eyes open.",
      stage: (t) => {
        const k = ease(ramp(t, LOOK - 0.25, LOOK + 0.15));
        return (
          <>
            <Finders />
            <Tall position={BESIDE} rotationY={0.45} scale={0.52} headPitch={0.3 * (1 - k)} eyes={k} />
            <SubscribeSign position={[BESIDE[0] - 0.5, 1.0, BESIDE[2] + 0.3]} rotationY={0.45} scale={0.3} tilt={Math.sin(t * 19) * 0.02} />
            <Block position={[BESIDE[0] - 0.5, 0.4, BESIDE[2] + 0.29]} size={[0.035, 0.8, 0.03]} color="#5c3f24" />
            <Watchers />
          </>
        );
      },
    },
  ],
});
