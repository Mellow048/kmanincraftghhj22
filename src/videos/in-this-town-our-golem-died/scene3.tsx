import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Anvil,
  Bucket,
  EAST,
  Fence,
  Hero,
  IronGolem,
  PLACE,
  ROBE,
  SOUTH,
  Villager,
  ease,
  golemHand,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

const WELL = PLACE.well;
const TAKE = wordAt("3.take", "flower");
const GIVE = wordAt("3.child", "child");
const GIVE_AT: Vec3 = [WELL[0] + 1.5, 0, WELL[2] + 1.9];

/**
 * BEAT 3 — the tour. How the town worked while the golem was alive.
 *
 * The walking shot, the wide, the insert on the anvil and the shot from the ground by the bucket are
 * the environment / travelling / odd-angle set that OWNER.md asks every scene to have.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "How it worked",
  shots: [
    {
      cue: "3.wall",
      ...cam.truck({ on: [17.2, 1.95, 2.0], dist: 6.2, yaw: -108, pitch: -3, by: [2.6, 0, 0], fov: 42 }),
      zone: "gate",
      look: "lantern-night",
      note: "'It had guarded that wall since before I was born': a travelling shot, the lens going the way it walks, the wall going past behind it. Its arm swings; nothing else in the frame moves.",
      stage: (t, { p }) => (
        <>
          <IronGolem position={[16.4 + 2.6 * p, 0, 2.0]} rotationY={EAST} walk={p * 2.6} />
        </>
      ),
    },
    {
      cue: "3.gate",
      ...cam.push({ on: [20.4, 2.1, 2.0], dist: 10.0, to: 8.6, yaw: -114, pitch: 6, fov: 48 }),
      zone: "gate",
      look: "overworld-day",
      note: "'At dawn, it stood at the gate': the whole gate in one frame, the wall, the open gate, the wheat behind, and the golem in the middle of the opening, small, because he wants us to see how much wall it had to hold.",
      stage: () => <IronGolem position={[20.0, 0, 2.0]} rotationY={EAST - 0.15} headYaw={0.2} />,
    },
    {
      cue: "3.take",
      ...cam.push({ on: [WELL[0] + 0.2, 1.05, WELL[2] - 0.9], dist: 3.6, to: 2.9, yaw: 6, pitch: 18, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Then it took one flower off the well': the iron hand comes down onto the rim on the word, and closes. The flowers are the only colour in the frame.",
      stage: (t) => {
        const down = ease(ramp(t, TAKE - 0.5, TAKE));
        return (
          <>
            <IronGolem position={[WELL[0], 0, WELL[2] - 2.5]} rotationY={SOUTH} armR={-0.55 - down * 0.62} headPitch={0.3} />
            <mesh position={[WELL[0] + 0.2, 1.02 + (1 - pop(t, TAKE)) * 0.0, WELL[2] - 0.62]} scale={pop(t, TAKE) * 0.6 + 1e-3}>
              <boxGeometry args={[0.1, 0.3, 0.06]} />
              <meshStandardMaterial color="#b24a3a" roughness={1} />
            </mesh>
          </>
        );
      },
    },
    {
      cue: "3.child",
      ...cam.push({ on: [GIVE_AT[0], 1.1, GIVE_AT[2]], dist: 3.1, to: 2.5, yaw: -26, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'And gave it to a child': a kid holding a flower up with both hands, the golem's arm still down at their height, filling the left of the frame.",
      stage: (t) => (
        <>
          <Villager position={GIVE_AT} rotationY={SOUTH + 0.35} robe={ROBE.friend} scale={0.7} kid phase={2.9} lookAt={golemHand([GIVE_AT[0] - 1.2, 0, GIVE_AT[2] - 0.9], SOUTH, -1.1)} />
          <IronGolem position={[GIVE_AT[0] - 1.5, 0, GIVE_AT[2] - 1.4]} rotationY={SOUTH + 0.7} armR={-1.15 + 0.25 * ease(ramp(t, GIVE, GIVE + 0.8))} headPitch={0.42} />
        </>
      ),
    },
    {
      cue: "3.none",
      ...cam.push({ on: [2.2, 1.35, 2.6], dist: 4.6, to: 4.0, yaw: 14, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Nobody asked how. Nobody asked why': two villagers walk past the golem with a flower in its hand and neither of them looks at it. The golem is the still thing in a moving frame.",
      stage: (t) => (
        <>
          <Villager position={[-1.8 + t * 1.3, 0, 2.4]} rotationY={EAST} walk={t * 1.3} robe={ROBE.brown} phase={0.3} />
          <Villager position={[-2.6 + t * 1.3, 0, 3.6]} rotationY={EAST} walk={t * 1.3} robe={ROBE.blue} phase={3.4} />
          <IronGolem position={[1.6, 0, 0.4]} rotationY={SOUTH + 0.4} flower headPitch={0.2} />
        </>
      ),
    },
    {
      cue: "3.lid",
      ...cam.top({ on: [WELL[0] + 0.5, 0.95, WELL[2] + 0.3], height: 5.4, to: 4.4, spin: [8, -3], fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'The well had a stone lid. It was never on': straight down on the lid, hanging off the rim, the black square of the well open beside it. No lid, no explanation.",
      stage: () => <></>,
    },
    {
      cue: "3.anvil",
      ...cam.push({ on: [PLACE.anvil[0], 0.62, PLACE.anvil[2]], dist: 3.6, to: 3.0, yaw: -46, pitch: 16, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'The blacksmith had an anvil': a low insert, the anvil filling the bottom of the frame with the smith's legs behind it. The object is already the answer to a question he has not asked yet.",
      stage: (t) => (
        <>
          <Anvil position={PLACE.anvil} rotationY={0.3} />
          <Villager position={[PLACE.anvil[0] - 0.9, 0, PLACE.anvil[2] - 1.7]} rotationY={SOUTH + 0.3} robe={ROBE.brown} phase={1.4} hmm={0.2} />
        </>
      ),
    },
    {
      cue: "3.bucket",
      ...cam.push({ on: [6.9, 0.34, 6.3], dist: 2.0, to: 1.7, yaw: -24, pitch: -6, fov: 32 }),
      zone: "village",
      look: "overworld-day",
      note: "'My father had a bucket with a hole in it': from grass level, the bucket on its side, the hole toward the lens. Small thing, seen small, and it is on the list of what the town owns.",
      stage: () => (
        <>
          <Fence from={[5.4, 0, 5.6]} to={[9.2, 0, 5.6]} height={1.1} gap={1.1} />
          <Bucket position={[6.9, 0.02, 6.3]} scale={0.9} handle swing={0.5} />
        </>
      ),
    },
    {
      cue: "3.remember",
      ...cam.push({ on: [-9.4, 1.72, -4.2], dist: 3.4, to: 2.8, yaw: 24, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'He said iron remembers the shape you give it': his father's face, saying a thing he does not know is important. The boy's shoulder is at the edge, the wrong way round — he is not listening.",
      stage: () => (
        <>
          <Villager position={[-9.4, 0, -4.6]} rotationY={SOUTH + 0.5} robe={ROBE.brown} nod={0.12} phase={1.4} />
          <Hero position={[-8.2, 0, -3.0]} rotationY={SOUTH - 0.9} animation="idle" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "3.good",
      ...cam.push({ on: [0.5, 2.2, 1.6], dist: 15.5, to: 13.5, yaw: 6, pitch: 28, fov: 52 }),
      zone: "village",
      look: "overworld-day",
      note: "'It was a good life. Nobody had been hurt in years': the only wide of the town in daylight — the square, the bell, the well, the lanterns, people going about. This is the picture the last act has to take away.",
      stage: (t) => (
        <>
          <Villager position={[-3.4, 0, 1.2]} rotationY={EAST} walk={t * 0.9} robe={ROBE.blue} phase={3.4} />
          <Villager position={[4.6, 0, 0.6]} rotationY={SOUTH - 1.6} robe={ROBE.farmer} hat="straw" phase={0.9} />
          <Hero position={[2.2, 0, 4.2]} rotationY={SOUTH + 0.3} animation="idle" face="smile" gaze={0} />
          <IronGolem position={[-1.4, 0, -0.6]} rotationY={SOUTH + 2.4} />
        </>
      ),
    },
  ],
});
