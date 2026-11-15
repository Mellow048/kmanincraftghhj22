import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Anvil,
  Bits,
  Bucket,
  EAST,
  Fence,
  Hero,
  IronGolem,
  PLACE,
  ROBE,
  Rim,
  SOUTH,
  Villager,
  ease,
  golemHand,
  ramp,
  timing,
  wordAt,
} from "./kit";

const WELL = PLACE.well;
const TAKE = wordAt("3.take", "flower");
const GIVE = wordAt("3.child", "child");
const HAMMER = wordAt("3.anvil", "anvil");
const GIVE_AT: Vec3 = [WELL[0] + 1.5, 0, WELL[2] + 1.9];

/**
 * BEATS 3 and 4 — how the town worked, remembered after the golem is gone.
 *
 * This block used to open the film and it is the reason the film had no opening: five facts and no
 * story, before the audience knew anybody. It is now the middle, where the question "what did they
 * build it out of?" is already in the audience's mouth, and every shot in it is a thing in motion:
 * a walk, a hammer, a hand closing on a flower, a bucket rolling away.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "How it worked",
  shots: [
    {
      cue: "3.wall",
      ...cam.truck({ on: [17.0, 1.9, 2.0], dist: 6.4, yaw: -104, pitch: -2, by: [3.4, 0, 0], fov: 42 }),
      shake: 0.012,
      zone: "gate",
      look: "overworld-day",
      note: "'It had guarded that wall since before I was born': a travelling shot going the way it walks, the wall sliding past behind it, its arm swinging, one villager crossing the other way.",
      stage: (t, { p }) => (
        <>
          <IronGolem position={[16.2 + 3.4 * p, 0, 2.0]} rotationY={EAST} />
          <Villager position={[20.4 - t * 1.2, 0, 4.4]} rotationY={SOUTH + 2.6} robe={ROBE.farmer} hat="straw" phase={1.2} />
        </>
      ),
    },
    {
      cue: "3.take",
      ...cam.push({ on: [WELL[0] + 0.2, 1.0, WELL[2] - 0.8], dist: 4.2, to: 2.5, yaw: 4, pitch: 20, fov: 40 }),
      shake: 0.008,
      impacts: [{ at: TAKE, amp: 0.025, dur: 0.2 }],
      zone: "village",
      look: "overworld-day",
      note: "'Every morning it took one flower off the well': the iron hand comes down into a rim full of flowers, closes on one, and lifts it out. The camera is on the rim with them.",
      stage: (t) => {
        const down = ease(ramp(t, TAKE - 0.55, TAKE));
        const up = ease(ramp(t, TAKE + 0.05, TAKE + 0.6));
        return (
          <>
            <Rim gap={[4, 5]} />
            <IronGolem
              position={[WELL[0] + 0.1, 0, WELL[2] - 2.2]}
              rotationY={SOUTH}
              armR={-0.5 - down * 0.55 + up * 0.5}
              headPitch={0.32 - up * 0.1}
            />
            <mesh position={[WELL[0] + 1.12, 0.86 + up * 0.35, WELL[2] - 0.35]} rotation={[0, 0.4, 0.3]}>
              <boxGeometry args={[0.16, 0.12, 0.16]} />
              <meshStandardMaterial color="#b4402f" roughness={1} />
            </mesh>
          </>
        );
      },
    },
    {
      cue: "3.child",
      ...cam.push({ on: [GIVE_AT[0], 1.05, GIVE_AT[2]], dist: 3.6, to: 2.2, yaw: -30, pitch: 3, fov: 38 }),
      shake: 0.01,
      zone: "village",
      look: "overworld-day",
      note: "'And gave it to a child': the child runs in from the edge and takes it with both hands, and the golem's arm goes back up. The handover happens inside the shot.",
      stage: (t) => {
        const run = ease(ramp(t, 0, GIVE));
        return (
          <>
            <Villager
              position={[GIVE_AT[0] + 1.2 - run * 1.2, 0, GIVE_AT[2] + 0.6 - run * 0.6]}
              rotationY={SOUTH + 0.35}
              robe={ROBE.friend}
              scale={0.7}
              kid
              phase={2.9}
             
              lookAt={golemHand([GIVE_AT[0] - 1.2, 0, GIVE_AT[2] - 0.9], SOUTH, -1.1)}
            />
            <IronGolem
              position={[GIVE_AT[0] - 1.5, 0, GIVE_AT[2] - 1.4]}
              rotationY={SOUTH + 0.7}
              armR={-1.2 + 0.3 * ease(ramp(t, GIVE, GIVE + 0.8))}
              headPitch={0.44}
            />
          </>
        );
      },
    },
    {
      cue: "3.anvil",
      ...cam.push({ on: [PLACE.anvil[0], 0.6, PLACE.anvil[2]], dist: 4.0, to: 2.3, yaw: -52, pitch: 14, fov: 38 }),
      shake: 0.014,
      impacts: [{ at: HAMMER, amp: 0.05, dur: 0.3 }],
      zone: "village",
      look: "overworld-day",
      note: "'The blacksmith had an anvil. My mother had a pot': the hammer comes down on the word and the sparks go up, and the anvil fills the bottom of the frame.",
      stage: (t) => {
        const up = 1 - ease(ramp(t, HAMMER - 0.35, HAMMER));
        return (
          <>
            <Anvil position={PLACE.anvil} rotationY={0.3} />
            <mesh position={[PLACE.anvil[0] + 0.1, 1.05 + up * 0.5, PLACE.anvil[2] - 0.3]} rotation={[0.9 - up * 1.6, 0, 0]} castShadow>
              <boxGeometry args={[0.1, 0.1, 0.5]} />
              <meshStandardMaterial color="#6b5340" roughness={0.9} />
            </mesh>
            <Villager position={[PLACE.anvil[0] - 0.8, 0, PLACE.anvil[2] - 1.5]} rotationY={SOUTH + 0.2} robe={ROBE.smith} phase={1.4} lean={0.3 + up * 0.25} />
            <Bits position={[PLACE.anvil[0] + 0.05, 0.72, PLACE.anvil[2]]} t={t - HAMMER} color="#ffcf6a" count={12} power={1.3} />
          </>
        );
      },
    },
    {
      cue: "3.bucket",
      ...cam.orbit({ on: [6.9, 0.32, 6.3], dist: 3.2, yaw: 12, yawTo: 54, pitch: 6, distTo: 2.4, fov: 40 }),
      shake: 0.01,
      zone: "village",
      look: "overworld-day",
      note: "'My father had a bucket with a hole in it': from grass level. It is kicked on the first syllable and rolls away from the lens, and the lens follows it round.",
      stage: (t, { p }) => (
        <>
          <Fence from={[5.4, 0, 5.6]} to={[9.2, 0, 5.6]} height={1.1} gap={1.1} />
          <Bucket position={[6.9 + p * 1.5, 0.3, 6.3 + p * 0.5]} scale={0.9} handle swing={0.6} />
        </>
      ),
    },
    {
      cue: "3.remember",
      ...cam.push({ on: [-9.4, 1.7, -4.2], dist: 3.8, to: 2.1, yaw: 20, pitch: 3, fov: 38 }),
      shake: 0.01,
      zone: "village",
      look: "overworld-day",
      note: "'He said iron remembers the shape you give it': his father, saying the answer without knowing it, and the boy already turning away to something else.",
      stage: (t) => (
        <>
          <Villager position={[-9.4, 0, -4.6]} rotationY={SOUTH + 0.5} robe={ROBE.brown} nod={0.1 + 0.1 * Math.sin(t * 3)} phase={1.4} lean={0.05} />
          <Hero position={[-8.2, 0, -3.0]} rotationY={SOUTH - 0.9 - ease(ramp(t, 1.4, 2.2)) * 0.9} animation="idle" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "3.good",
      ...cam.push({ on: [0.4, 2.0, 1.4], dist: 16.0, to: 11.0, yaw: 6, pitch: 30, fov: 52 }),
      shake: 0.008,
      handheld: 0.008,
      zone: "village",
      look: "overworld-day",
      note: "'It was a good life. The town had not lost anyone since it came': the one wide of the whole town in daylight, and the lens is still coming down into it while everybody walks.",
      stage: (t) => (
        <>
          <Villager position={[-3.4 + t * 1.4, 0, 1.2]} rotationY={EAST} robe={ROBE.blue} phase={3.4} />
          <Villager position={[4.6 - t * 1.1, 0, 0.6]} rotationY={SOUTH - 1.6} robe={ROBE.farmer} hat="straw" phase={0.9} />
          <Villager position={[1.2, 0, -1.6]} rotationY={EAST} robe={ROBE.white} phase={2.2} />
          <Hero position={[2.2 + t * 0.5, 0, 4.2]} rotationY={SOUTH + 0.3} animation="walk" face="smile" gaze={0} />
          <IronGolem position={[-1.4, 0, -0.6]} rotationY={SOUTH + 2.4} armR={-1.0 - 0.2 * Math.sin(t * 1.6)} flower />
        </>
      ),
    },
    {
      cue: "4.protect",
      ...cam.truck({ on: [19.0, 1.4, 2.2], dist: 5.2, yaw: -122, pitch: 4, by: [2.0, 0, -0.4], fov: 44 }),
      shake: 0.012,
      zone: "gate",
      look: "overworld-day",
      note: "'But the golem protected all of us': it walks the gate line and the lens goes with it, and the wall goes past behind, and the town is somewhere off-frame that it is between.",
      stage: (t, { p }) => (
        <>
          <IronGolem position={[19.6 + 2.0 * p, 0, 2.2 - 0.4 * p]} rotationY={EAST + 0.1} headYaw={-0.25} />
          <Hero position={[18.0 + 1.2 * p, 0, 3.6]} rotationY={EAST + 0.5} animation="walk" face="smile" gaze={0} />
        </>
      ),
    },
    {
      cue: "4.need",
      ...cam.push({ on: [20.0, 1.1, 2.4], dist: 5.4, to: 3.0, yaw: 22, pitch: 6, fov: 40 }),
      shake: 0.012,
      zone: "gate",
      look: "overworld-day",
      note: "'I wanted it to need me': his back, small, and the golem going away up the street without turning round. He is the one looking.",
      stage: (t, { p }) => (
        <>
          <Hero position={[19.4, 0, 2.4]} rotationY={EAST - 0.1} animation="idle" face="frown" gaze={0} headPitch={-0.06} />
          <IronGolem position={[21.4 + p * 1.0, 0, 1.6]} rotationY={EAST} headYaw={0.1} />
        </>
      ),
    },
  ],
});
