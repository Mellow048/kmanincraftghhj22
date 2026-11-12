import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, Fill, Hero, IronGolem, KNEEL, NORTH, PLACE, SOUTH, WEST, ease, faceOf, ramp, stride, timing, wordAt } from "./kit";

const W = PLACE.well;
const STOOD: Vec3 = [4.2, 0, 2.9];
const NEAR: Vec3 = [W[0] + 1.2, 0, W[2] + 2.6];
const KNELT = wordAt("10.knelt", "knelt");

/** THE WALK TO THE WELL. Quiet, slow, and everything he passes is asleep. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "I pulled it off",
  shots: [
    {
      cue: "10.street",
      ...cam.push({ on: [6.5, 1.3, 2.4], dist: 7.2, to: 6.4, yaw: -82, pitch: 7, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "The whole street, end to end, blue with moonlight and empty, and one small figure creeping down the middle of it towards us.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([9.4, 0, 2.2], [7.6, 0, 2.5], p)} animation="creep" carve="wow" />
          <Fill at={[4, 2.5, 4]} power={16} />
        </>
      ),
    },
    {
      cue: "10.golem",
      ...cam.push({ on: [3.5, 1.4, 2.2], dist: 4.6, to: 3.9, yaw: -24, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "The golem trudges past, twice his height, looking at nothing but its own feet. He stands frozen and turns his pumpkin to watch it go.",
      stage: (t, { p }) => (
        <>
          <IronGolem position={[1.6 + p * 2.6, 0, 1.3]} rotationY={EAST} walk={p * 2.6} headPitch={0.6} />
          <Hero position={STOOD} rotationY={WEST} animation="idle" headYaw={-0.9 + 1.5 * p} headPitch={-0.25} carve="wow" />
          <Fill at={[3, 2.2, 6]} power={16} />
        </>
      ),
    },
    {
      cue: "10.holes",
      ...cam.push({ on: faceOf(STOOD), dist: 1.5, to: 0.8, yaw: -70, pitch: 0, fov: 32 }),
      zone: "village",
      look: "overworld-night",
      note: "A long slow push into his pumpkin until the two carved eye holes are all there is: small, black, and all he has ever had to see through.",
      stage: () => (
        <>
          <Hero position={STOOD} rotationY={WEST} animation="idle" carve="flat" />
          <Fill at={[1.8, 1.4, 3.6]} power={7} />
        </>
      ),
    },
    {
      cue: "10.look",
      ...cam.orbit({ on: faceOf(NEAR), dist: 2.1, yaw: -40, pitch: 2, yawTo: -22 }),
      zone: "village",
      look: "overworld-night",
      note: "By the well now. He stops and turns his pumpkin back over his shoulder, towards the houses, one last time.",
      stage: (t, { p }) => (
        <>
          <Hero position={NEAR} rotationY={WEST} animation="idle" headYaw={-1.1 * ease(ramp(p, 0.1, 0.6))} carve="wow" />
          <Fill at={[NEAR[0] - 2, 1.6, NEAR[2] + 2]} power={8} />
        </>
      ),
    },
    {
      cue: "10.asleep",
      ...cam.truck({ on: [4, 2.3, -5], dist: 10.5, yaw: -28, pitch: 3, by: [3.2, 0, 0] }),
      zone: "village",
      look: "overworld-night",
      note: "What he sees: the row of house fronts, sliding by, every window dark. Nothing moves. As far as he can tell, nothing is there.",
      stage: () => <Fill at={[4, 4, 2]} power={18} />,
    },
    {
      cue: "10.knelt",
      ...cam.push({ on: [W[0], 0.8, W[2] + 1.5], dist: 3.2, to: 2.6, yaw: 105, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "Side on: he walks the last steps to the rim and goes down on his knees at it. His shoulders rise with one big breath.",
      stage: (t) => {
        const k = ramp(t, 0, KNELT + 0.2);
        return (
          <>
            <Hero {...stride([W[0], 0, W[2] + 2.5], KNEEL, k)} rotationY={NORTH} animation={k < 1 ? "walk" : "crouch"} headPitch={0.25} carve="flat" />
            <Fill at={[W[0] + 3, 1.6, W[2] + 2.5]} power={10} />
          </>
        );
      },
    },
    {
      cue: "10.off",
      ...cam.push({ on: [KNEEL[0], 1.0, KNEEL[2]], dist: 2.4, to: 2.0, yaw: 22, pitch: 12, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "From behind him. Both hands up, and one hard pull: the pumpkin comes clean off, and for the first time in the film there is the back of a real head. We do not see the face yet.",
      stage: (t, { p }) => (
        <>
          <Hero position={KNEEL} rotationY={NORTH} animation="crouch" arms="lift" raise={0.75 * ease(ramp(p, 0.15, 0.9))} carve="flat" />
          <Fill at={[KNEEL[0] + 1.5, 1.6, KNEEL[2] + 2.5]} power={10} />
        </>
      ),
    },
  ],
});
