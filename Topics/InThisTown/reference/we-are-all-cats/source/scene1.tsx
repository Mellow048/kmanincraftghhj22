import { cam, storyScene } from "../../engine";
import { DEG, EAST, Fish, Folk, Guard, Hero, KID, Line, Pal, Pup, SOUTH, Side, WEST, timing, tw } from "./kit";

/** 01 — The town: we are all cats. And the other side of the line. */
const ME: [number, number, number] = [-4.5, 0, 6];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Cats, and a line",
  shots: [
    {
      cue: "1.cats",
      ...cam.push({ on: [-4.5, 1.05, 6], dist: 5.0, to: 3.7, yaw: 28, pitch: 4, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "The premise in the first second: the teller, a cat kid in a red shirt, in front; behind him a street where everybody has ears and a tail, under roofs with ears on them.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={28 * DEG} animation="idle" face="grin" tailUp={0.8} />
          <Folk kind="cat" who={1} position={[-6.6 + t * 0.5, 0, 3.6]} rotationY={EAST} walk={t * 0.5} carry={<Fish />} />
          <Folk kind="cat" who={3} position={[-2.9, 0, 3.0]} rotationY={-0.5} lookAt={[-4.5, 1.3, 6]} />
          <Pal kind="cat" who={2} position={[-7.4, 0, 6.6]} rotationY={0.9} animation="wave" face="grin" />
          <Pal kind="cat" who={3} scale={KID} position={[-2.6, 0, 6.9 - t * 0.9]} rotationY={Math.PI} animation="walk" animDistance={t * 0.9} />
          <Guard kind="cat" position={[-8.2, 0, 0.6]} rotationY={0.5} tailUp={0.7} />
          <Pal kind="cat" who={4} position={[-5.4, 0, 0.2 + t * 0.8]} rotationY={SOUTH} animation="walk" animDistance={t * 0.8} />
        </>
      ),
    },
    {
      cue: "1.folk",
      ...cam.orbit({ on: [-6, 1.25, 9], dist: 4.0, yaw: -58, yawTo: -40, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Two cat villagers nose to nose: robes, folded sleeves, one eyebrow, and ears, whiskers and tails. One has a fish on her sleeves.",
      stage: (t) => (
        <>
          <Folk kind="cat" who={1} position={[-6.6, 0, 9]} rotationY={EAST} carry={<Fish />} nod={Math.sin(t * 9) * 0.08} tailUp={0.6} />
          <Folk kind="cat" who={2} position={[-5.4, 0, 9]} rotationY={WEST} nod={0.25 + Math.sin(t * 7) * 0.06} tailUp={0.4} phase={2} />
        </>
      ),
    },
    {
      cue: "1.golem",
      ...cam.push({ on: [-7, 1.9, 0], dist: 5.2, to: 4.4, yaw: 16, pitch: -13, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "From a kitten's height, looking up: the iron golem of this side has ears, whiskers and a long iron tail that swings.",
      stage: (t) => (
        <>
          <Guard kind="cat" position={[-7, 0, 0]} rotationY={0.26} tailUp={0.75} headPitch={0.3} headYaw={Math.sin(t * 2) * 0.2} />
          <Pal kind="cat" who={5} scale={KID * 0.8} position={[-6.2, 0, 1.5]} rotationY={Math.PI + 0.5} lookAt={[-7, 2.4, 0]} face="wow" tailUp={0.9} />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.orbit({ on: [-4.5, 1.12, 6], dist: 2.4, yaw: -16, yawTo: 8, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Close on the teller: he waves a paw at us. Two more cat players behind him wave too.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={SOUTH} animation="wave" face="grin" tailUp={0.9} />
          <Pal kind="cat" who={1} position={[-5.8, 0, 4.2]} rotationY={0.2} animation="wave" face="grin" />
          <Pal kind="cat" who={2} position={[-3.3, 0, 3.9]} rotationY={-0.2} animation="wave" face="grin" phase={1.2} />
          <Folk kind="cat" who={4} position={[-4.4, 0, 2.2]} rotationY={SOUTH} />
        </>
      ),
    },
    {
      cue: "2.sides",
      ...cam.push({ on: [0, 0.5, -3], dist: 36, to: 30, yaw: 0, pitch: 25, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "From high up: one village, cut in two by a white line. Warm roofs with ears on the left, blue roofs on the right, the well on the line.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="cat" t={t} gap={3.6} />
          <Side kind="dog" t={t} gap={3.6} />
        </>
      ),
    },
    {
      cue: "2.line",
      ...cam.truck({ on: [0, 0.4, 7], dist: 3.2, yaw: 9, pitch: 7, fov: 44, by: [0, 0, -5.5] }),
      zone: "village",
      look: "overworld-day",
      note: "Down at the grass, moving along it: the line is a row of white blocks that runs right up to the well and on behind it.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="cat" t={t} gap={2.6} golem={false} />
          <Side kind="dog" t={t} gap={2.6} golem={false} />
        </>
      ),
    },
    {
      cue: "2.not",
      ...cam.push({ on: [-1.2, 1.1, 2.2], dist: 5.0, to: 4.4, yaw: 103, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "From the other side, over a shoulder that is not a cat's: two hanging ears close to the lens, and across the line the teller, looking.",
      stage: (t) => (
        <>
          <Line />
          <Hero position={[-1.35, 0, 3.0]} rotationY={EAST} animation="idle" face="uneasy" tailUp={0.5} />
          <Pup position={[1.5, 0, 1.3]} rotationY={WEST} animation="idle" wag={0.2} />
          <Side kind="cat" t={t} kid={false} golem={false} skip={[1, 7]} />
        </>
      ),
    },
    {
      cue: "2.dogs",
      ...cam.push({ on: [1.7, 1.2, 2], dist: 2.5, to: 1.7, yaw: -68, pitch: 0, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The reveal, hard: the dog kid's face fills the frame and barks. A snout, hanging ears, a blue shirt.",
      stage: (t) => (
        <>
          <Line />
          <Pup position={[1.7, 0, 2]} rotationY={WEST} animation="idle" bark={1} wag={1} face="angry" />
          <Side kind="dog" t={t} kid={false} bark={0.8} wag={0.8} />
        </>
      ),
    },
    {
      cue: "2.all",
      ...cam.truck({ on: [1.35, 1.3, 5.6], dist: 5.0, yaw: -38, pitch: 4, fov: 46, by: [0, 0, -8.4] }),
      zone: "village",
      look: "overworld-day",
      note: "Along their side of the line, from ours: dog players, then dog villagers in robes, and at the end the dog golem with a red collar.",
      stage: (t) => (
        <>
          <Line />
          <Side kind="dog" t={t} bark={0.5} wag={1} />
        </>
      ),
    },
    {
      cue: "2.knew",
      ...cam.orbit({ on: [0, 0.9, 9], dist: 5.6, yaw: 150, yawTo: 172, pitch: 27, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The oldest cat and the oldest dog, each on their side, look down at the line and then tip their heads: nobody knows.",
      stage: (t) => {
        const why = tw(t, 1.3, 1.6);
        return (
          <>
            <Line />
            <Folk kind="cat" who={1} old fur="#b9b6b0" position={[-0.8, 0, 9]} rotationY={EAST} nod={0.5 - why * 0.3} tilt={why * 0.3} lean={0.2} tailUp={0.1} />
            <Folk kind="dog" who={2} old fur="#cfc8bc" position={[0.8, 0, 9]} rotationY={WEST} nod={0.5 - why * 0.3} tilt={why * 0.3} lean={0.2} wag={0.1} />
            <Hero position={[-2.3, 0, 7.6]} rotationY={EAST} animation="idle" lookAt={[0, 0.2, 9]} face="uneasy" />
            <Side kind="cat" t={t} kid={false} skip={[2, 3, 9]} />
            <Side kind="dog" t={t} kid={false} skip={[2, 3, 9]} />
          </>
        );
      },
    },
  ],
});
