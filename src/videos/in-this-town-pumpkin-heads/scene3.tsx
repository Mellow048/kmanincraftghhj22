import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bowl, EAST, Fill, Hero, IronGolem, KID, Loose, PLACE, SOUTH, Shoes, Spoon, Townie, WEST, jolt, timing, wordAt } from "./kit";

const EATER: Vec3 = [8.7, 0, -2.6];
const BOWL: Vec3 = [7.35, 1.0, -2.6];
const KNOCK = wordAt("3.knock", "knocking");
const TWICE = wordAt("3.knock", "twice");
const CARVED = wordAt("3.carve", "carved");
const P = PLACE.porch;

/** THE TOUR. How a town lives when nobody has a face. Every picture here is a rule the ending uses. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "How we lived",
  shots: [
    {
      cue: "3.soup",
      ...cam.push({ on: [8.05, 1.12, -2.6], dist: 2.6, to: 2.1, yaw: -32, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "At the end of the market stall: a bowl on the counter and a spoon as long as the kid is tall, going in and out of the carved mouth.",
      stage: (t) => {
        const sip = 0.5 + 0.5 * Math.sin(t * 5.2);
        return (
          <>
            <Hero position={EATER} rotationY={WEST} animation="idle" arms="hold" headPitch={0.08 * sip} carve="grin" />
            <Bowl position={BOWL} />
            <Spoon from={[BOWL[0] + 0.02, 1.13 + 0.1 * sip, -2.6]} to={[EATER[0] - 0.3 + 0.1 * (1 - sip), 1.13, -2.6]} />
            <Townie who={3} position={[6.4, 0, -3.5]} rotationY={SOUTH} animation="idle" carve="glad" />
          </>
        );
      },
    },
    {
      cue: "3.shoes",
      ...cam.truck({ on: [-0.2, 0.3, 1.2], dist: 1.9, yaw: 0, pitch: 4, by: [1.3, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "Down at the ground, sliding along a row of feet. Every pair of shoes is a different colour. One pair is small and blue.",
      stage: () => (
        <>
          {(
            [
              [1, -1.5, "#d8362e", 1],
              [2, -0.75, "#f2c230", 1],
              [7, 0.75, "#38a04a", 1],
              [8, 1.5, "#a04ad0", 1],
            ] as Array<[number, number, string, number]>
          ).map(([who, x, color]) => (
            <group key={who}>
              <Townie who={who} position={[x, 0, 1.2]} rotationY={SOUTH} animation="idle" carve="grin" />
              <Shoes position={[x, 0, 1.2]} color={color} />
            </group>
          ))}
          <Hero position={[0, 0, 1.2]} rotationY={SOUTH} animation="idle" carve="grin" />
          <Shoes position={[0, 0, 1.2]} color="#2f6bff" scale={KID} />
        </>
      ),
    },
    {
      cue: "3.knock",
      ...cam.push({ on: [0, 1.05, 2], dist: 2.5, to: 2.0, yaw: 0, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Two kids face to face, side on. His best friend, in yellow, raps on his pumpkin: once on 'knocking', once on 'twice'. His head bobs each time. Remember it: this is how the town says hello.",
      stage: (t) => (
        <>
          <Townie who={5} scale={KID} position={[-0.42, 0, 2]} rotationY={EAST} animation="idle" arms="press" time={t < TWICE ? t - KNOCK : t - TWICE} carve="glad" />
          <Hero position={[0.42, 0, 2]} rotationY={WEST} animation="idle" headPitch={-jolt(t, KNOCK + 0.2, 0.25) - jolt(t, TWICE + 0.2, 0.25)} carve="grin" />
          <Bits position={[0.1, 1.25, 2]} t={t - KNOCK - 0.2} color="#f4b04a" count={5} seed={2} power={0.4} />
          <Bits position={[0.1, 1.25, 2]} t={t - TWICE - 0.2} color="#f4b04a" count={5} seed={4} power={0.4} />
        </>
      ),
    },
    {
      cue: "3.carve",
      ...cam.push({ on: [P[0] + 0.1, 1.45, P[2] + 0.4], dist: 3.5, to: 2.8, yaw: 10, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The oldest woman on her raised porch, in a pumpkin gone brown with age, cutting a face into a fresh one. Three tiny finished pumpkins wait in a row on the step. Chips fly on 'carved'.",
      stage: (t) => (
        <>
          <Townie who={6} old position={[P[0] - 0.45, P[1], P[2]]} rotationY={0.35} animation="idle" arms="press" time={(t % 0.6)} headPitch={0.25} carve="flat" />
          <Loose position={[P[0] + 0.35, P[1] + 0.3, P[2] + 0.3]} rotation={[0, -0.3, 0]} carve={t < CARVED ? "sleep" : "grin"} />
          <Bits position={[P[0] + 0.3, P[1] + 0.45, P[2] + 0.65]} t={t - CARVED} color="#e07f1c" count={12} seed={7} />
          {[-0.55, 0, 0.55].map((x, i) => (
            <Loose key={x} position={[P[0] + x, 0.39, P[2] + 1.02]} scale={0.45} rotation={[0, (i - 1) * 0.25, 0]} carve={(["glad", "wow", "grin"] as const)[i]} />
          ))}
        </>
      ),
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-1.4, 1.5, 2], dist: 5.6, to: 4.8, yaw: -18, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "Night, the same street, empty. The iron golem walks down the middle of it alone, head bowed.",
      stage: (t) => (
        <>
          <IronGolem position={[-2.6 + t * 0.9, 0, 2]} rotationY={EAST} walk={t * 0.9} headPitch={0.55} />
          <Fill at={[-2, 3, 6]} power={14} />
        </>
      ),
    },
    {
      cue: "3.ground",
      ...cam.push({ on: [0.2, 2.25, 2], dist: 2.5, to: 2.0, yaw: 40, pitch: -16, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "Close under the golem's face, looking up at it. It stares at its own feet and will not raise its eyes. It knows what is up there.",
      stage: (t) => (
        <>
          <IronGolem position={[-0.3 + t * 0.35, 0, 2]} rotationY={EAST} walk={2 + t * 0.35} headPitch={0.6} />
          <Fill at={[2, 1.2, 4]} power={10} />
        </>
      ),
    },
  ],
});
