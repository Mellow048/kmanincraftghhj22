import { cam, storyScene } from "../../engine";
import { Bucket, CHILD, Folk, Friend, IronGolem, LID_TOP, ROBE, Walker, ramp, scarecrowFace, timing, wordAt } from "./kit";

const BUMPED = wordAt("3.bump", "bumped") + 0.1;
const AGAIN = wordAt("3.bump", "all");
/** Where they bump: at the top of the square, with the lane behind them. */
const BUMP_Z = -1.2;

/** THE TOUR. How a town lives when it never looks up: hats, a lid on the well, and a moonlight that stays out of town. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.hats",
      ...cam.top({ on: [0, 0, 2.5], height: 15, to: 12.6, spin: [7, -5], fov: 48 }),
      zone: "village",
      note: "'A straw hat as wide as a door': straight down on the square. From up here the town has no people in it at all, only square hats, sliding round the well and round each other. This is how the moon sees them.",
      stage: (t) => (
        <>
          <Walker from={[-4.2, 0, 4.3]} to={[4.4, 0, 4.5]} t={t + 1.2} speed={1.0} robe={ROBE.blue} phase={3.4} />
          <Walker from={[4.2, 0, 5.7]} to={[-4.4, 0, 5.5]} t={t + 1.5} speed={0.9} robe={ROBE.white} phase={1.9} />
          <Walker from={[-1.95, 0, 8.6]} to={[-1.95, 0, -3]} t={t + 2.5} speed={0.85} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[2.25, 0, -3.4]} to={[2.25, 0, 9]} t={t + 1.6} speed={0.9} robe={ROBE.red} phase={0.9} />
          <Walker from={[-4.3, 0, -0.75]} to={[4.5, 0, -0.75]} t={t + 2.2} speed={0.95} robe={ROBE.brown} phase={0.3} />
          <Walker from={[4.0, 0, 7.1]} to={[-4.2, 0, 7.1]} t={t + 0.9} speed={1.7} robe={ROBE.friend} scale={CHILD} kid phase={1.1} />
          <Walker from={[-3.6, 0, 1.2]} to={[-3.2, 0, 8.4]} t={t + 1.0} speed={0.8} robe={ROBE.smith} phase={0.7} />
          <Walker from={[3.6, 0, 2.6]} to={[3.4, 0, -3.4]} t={t + 0.6} speed={0.85} robe={ROBE.elder} phase={2.2} />
        </>
      ),
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-2.8, 1.9, -0.5], dist: 5.5, to: 4.9, yaw: -14, pitch: -9, fov: 42 }),
      zone: "village",
      note: "'Even the iron golem wore one': from below, so it is as big as a house, under a hat as big as a barn door. A child walks along in the shade of the brim. The golem's head is down too.",
      stage: (t) => (
        <>
          <IronGolem position={[-2.8, 0, -0.9 + t * 0.4]} walk={t * 0.4} headPitch={0.28} hat />
          <Folk position={[-3.05, 0, 1.2 + t * 0.4]} walk={t * 0.4} robe={ROBE.blue} scale={CHILD} kid phase={3.4} />
        </>
      ),
    },
    {
      cue: "3.eyes",
      ...cam.push({ on: [0.1, 1.3, 4.7], dist: 2.5, to: 2.15, yaw: 0, pitch: -14, fov: 40 }),
      zone: "village",
      note: "'We kept our eyes on the ground': the lens is the ground. Three of them walk at it and over it, and the only way to see a face in this town is from down here, under the brim.",
      stage: (t) => (
        <>
          <Folk position={[-0.52, 0, 4.25 + t * 0.5]} walk={t * 0.5} nod={0.46} robe={ROBE.brown} phase={0.3} />
          <Folk position={[0.62, 0, 3.55 + t * 0.5]} walk={t * 0.5} nod={0.46} robe={ROBE.white} phase={1.9} />
          <Folk position={[0.02, 0, 5.0 + t * 0.5]} walk={t * 0.5} nod={0.42} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
        </>
      ),
    },
    {
      cue: "3.bump",
      ...cam.push({ on: [0, 1.4, BUMP_Z], dist: 5.2, to: 4.7, yaw: 0, pitch: -2, fov: 40 }),
      zone: "village",
      note: "'Bumped into each other all night': two of them walk into each other hat first. On 'bumped' the brims meet and both rock back on their heels. Both step the same way to get round. They bump again.",
      stage: (t) => {
        // Half the gap between them: they meet at 0.52 (brim to brim), bounce to 0.66, step aside, meet again.
        const gap =
          t < BUMPED
            ? 0.52 + (BUMPED - t) * 1.5
            : t < AGAIN
              ? 0.52 + 0.14 * ramp(t, BUMPED, BUMPED + 0.12) - 0.14 * ramp(t, AGAIN - 0.22, AGAIN)
              : 0.52 + 0.1 * ramp(t, AGAIN, AGAIN + 0.12);
        const aside = 0.45 * ramp(t, BUMPED + 0.25, AGAIN - 0.2);
        const rock = (at: number) => (t < at ? 0 : Math.exp(-(t - at) * 7));
        const back = Math.max(rock(BUMPED), rock(AGAIN));
        return (
          <>
            <Folk position={[-gap, 0, BUMP_Z - aside]} rotationY={Math.PI / 2} walk={t < BUMPED ? t * 1.5 : aside} robe={ROBE.blue} lean={-0.2 * back} nod={0.4 - 0.55 * back} phase={3.4} />
            <Folk position={[gap, 0, BUMP_Z - aside]} rotationY={-Math.PI / 2} walk={t < BUMPED ? t * 1.5 : aside} robe={ROBE.farmer} lean={-0.2 * back} nod={0.4 - 0.55 * back} phase={2.7} />
          </>
        );
      },
    },
    {
      cue: "3.lid",
      ...cam.push({ on: [0, 0.95, 2], dist: 4.5, to: 3.8, yaw: 28, pitch: 24, fov: 42 }),
      zone: "village",
      note: "'The well had a stone lid': the well, with a slab on it you could not lift with a horse. His best friend sits on it with her legs out, because it is the best seat in the square.",
      stage: () => (
        <>
          <Friend position={[-0.25, LID_TOP - 0.394, 2.2]} rotationY={0.4} sit nod={0.36} />
          <Bucket position={[0.62, LID_TOP + 0.35, 1.7]} scale={0.7} swing={0.5} />
        </>
      ),
    },
    {
      cue: "3.water",
      ...cam.push({ on: [0, 5.5, 9], dist: 11.8, to: 10.6, yaw: 180, pitch: -24, fov: 56 }),
      zone: "village",
      note: "'So the moon could not get into the water': the two of them in one frame. The moon up there, over his roof; the lid down here, between it and the water. She sits on it with her back to us.",
      stage: () => (
        <>
          <Friend position={[-0.25, LID_TOP - 0.394, 2.2]} rotationY={0.4} sit nod={0.36} />
          <Bucket position={[0.62, LID_TOP + 0.35, 1.7]} scale={0.7} swing={0.5} />
        </>
      ),
    },
    {
      cue: "3.light",
      ...cam.push({ on: [0, 1.9, -22], dist: 25, to: 14.5, yaw: 0, pitch: 2, fov: 46 }),
      zone: "village",
      note: "'It stayed out on the wheat': fly from the lantern light, over the well, up the lane, towards the end of it, where the light is another colour. The town is orange and the wheat is white, and the golem walks the line between them.",
      stage: (t) => (
        <>
          <Walker from={[-1.15, 0, -11.5]} to={[-1.35, 0, 2]} t={t + 1.5} speed={0.9} robe={ROBE.brown} phase={0.3} />
          <Walker from={[1.2, 0, -8]} to={[1.5, 0, 2]} t={t} speed={0.85} robe={ROBE.red} phase={0.9} />
        </>
      ),
    },
    {
      cue: "3.crows",
      ...cam.push({ on: scarecrowFace([-6.5, 0, -24]), dist: 4.5, to: 3.7, yaw: -18, pitch: -9, fov: 42 }),
      zone: "fields",
      note: "'With the scarecrows': out in the wheat, among them, looking up at one. A sack for a head, two buttons that do not match. It has feet. It is not on a pole.",
      stage: () => null,
    },
    {
      cue: "3.forest",
      ...cam.push({ on: [2.2, 3.0, -46], dist: 12.5, to: 10, yaw: 3, pitch: -5, fov: 46 }),
      zone: "fields",
      note: "'Nothing ever came out of the forest': push at the black between the trunks. One scarecrow stands right at the edge of the trees, half in and half out. Nobody says a word about it.",
      stage: () => null,
    },
  ],
});
