import { cam, storyScene } from "../../engine";
import {
  HookWall,
  Hero,
  IronGolem,
  IronHeap,
  PLACE,
  ROBE,
  Rose,
  SOUTH,
  SubscribeSign,
  Villager,
  golemHand,
  timing,
  wordAt,
} from "./kit";

const WELL = PLACE.well;
const HEAP = [-1.2, 0, 3.4] as [number, number, number];
const ROSE_ON_RIM = [WELL[0] + 1.02, 0.82, WELL[2] + 0.34] as [number, number, number];
const MINE = wordAt("14.mine", "mine");

/**
 * BEAT 14 — the truth, then the button.
 *
 * The answer is a count of things the audience has already seen: the wall of hooks, the pot, the
 * anvil, the bucket. Then the reason, then the rose, then four words.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "What they used",
  shots: [
    {
      cue: "14.hooks",
      ...cam.push({ on: [PLACE.forge[0] + 0.2, 1.5, PLACE.forge[2] + 0.1], dist: 4.2, to: 3.5, yaw: 8, pitch: 0, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'The hooks on the wall were empty': five iron hooks with nothing hanging on them. The tools were there in the tour; the audience has seen them there.",
      stage: () => (
        <>
          <HookWall position={PLACE.forge} rotationY={0} filled={false} />
          <Hero position={[PLACE.forge[0] + 1.5, 0, PLACE.forge[2] + 1.9]} rotationY={SOUTH + 0.5} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "14.pot",
      ...cam.push({ on: [10.0, 1.15, -4.9], dist: 3.0, to: 2.4, yaw: 6, pitch: 8, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'My mother's pot was gone from the kitchen': a shelf by the door with dust on it and one clean ring where the pot stood. That is the whole shot, and it is the most personal one in the film.",
      stage: () => (
        <>
          <mesh position={[10.0, 1.02, -4.92]} receiveShadow>
            <boxGeometry args={[1.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#6d4a2c" roughness={1} />
          </mesh>
          <mesh position={[10.0, 1.065, -4.9]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.19, 24]} />
            <meshStandardMaterial color="#a9b6bd" roughness={1} />
          </mesh>
          <mesh position={[9.55, 1.12, -4.92]}>
            <boxGeometry args={[0.12, 0.14, 0.12]} />
            <meshStandardMaterial color="#8a6a3a" roughness={1} />
          </mesh>
        </>
      ),
    },
    {
      cue: "14.iron",
      ...cam.push({ on: [HEAP[0], 0.9, HEAP[2]], dist: 5.6, to: 4.8, yaw: 20, pitch: 12, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Every piece of iron in this town was in the square': the heap — an anvil, two pots, a plough blade, a door hinge — in the middle of the square, with the whole town standing round it at a distance. Wide, high, so it reads as a pile and not as a prop.",
      stage: () => (
        <>
          <IronHeap position={HEAP} />
          <Villager position={[2.4, 0, 5.4]} rotationY={SOUTH - 1.9} robe={ROBE.brown} phase={1.4} />
          <Villager position={[-4.6, 0, 5.8]} rotationY={SOUTH - 1.4} robe={ROBE.blue} phase={3.4} />
          <Villager position={[-4.0, 0, 0.2]} rotationY={SOUTH + 2.1} robe={ROBE.farmer} hat="straw" phase={0.9} />
        </>
      ),
    },
    {
      cue: "14.built",
      ...cam.push({ on: [-1.2, 1.7, 1.4], dist: 7.0, to: 6.0, yaw: -18, pitch: -8, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'In the night, the whole village had built it again': the golem standing over its own raw material. From below so it is a tower, with the heap at its feet like a shed skin.",
      stage: () => (
        <>
          <IronGolem position={HEAP} rotationY={SOUTH + 0.2} headPitch={0.22} />
          <IronHeap position={[HEAP[0] + 1.7, 0, HEAP[2] + 0.9]} />
          <Hero position={[1.6, 0, 4.6]} rotationY={SOUTH + 0.4} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "14.afraid",
      ...cam.push({ on: [-4.0, 1.75, 0.2], dist: 4.2, to: 3.4, yaw: 30, pitch: 0, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Not because they loved it. Because they were afraid': one face at the edge of the square, looking at the golem and not at the boy. Nobody in this frame is smiling.",
      stage: () => (
        <>
          <Villager position={[-4.0, 0, 0.2]} rotationY={SOUTH + 0.53} robe={ROBE.farmer} hat="straw" phase={0.9} hmm={0.5} />
        </>
      ),
    },
    {
      cue: "14.giveback",
      ...cam.push({ on: [WELL[0] + 0.3, 0.7, WELL[2] + 0.2], dist: 5.6, to: 4.8, yaw: 8, pitch: 30, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'And because the well gives back what you put in it': from high above the rim, looking down into the black of it, the flowers at the edge of the frame and the lid pushed off to one side. The hole is the last thing the eye finds.",
      stage: () => (
        <>
          <Rose position={ROSE_ON_RIM} scale={1.45} turn={0.6} />
        </>
      ),
    },
    {
      cue: "14.flowers",
      ...cam.pan({
        from: [WELL[0] + 2.6, 1.9, WELL[2] + 3.2],
        on: [WELL[0] + 0.9, 0.95, WELL[2] + 0.3],
        onTo: [WELL[0] - 0.9, 0.95, WELL[2] + 0.2],
        fov: 36,
      }),
      zone: "village",
      look: "overworld-day",
      note: "'Every flower on that well was somebody we had lost': a slow sweep along the rim, one flower after another after another, and no faces. Let the count do the work.",
      stage: () => <></>,
    },
    {
      cue: "14.ours",
      ...cam.push({ on: [WELL[0] - 0.3, 1.4, WELL[2] - 0.6], dist: 6.0, to: 5.0, yaw: 60, pitch: 10, fov: 48 }),
      zone: "village",
      look: "overworld-day",
      note: "'The golem had been handing us our own flowers': the golem giving a flower to a child again, exactly as in the tour, seen from much further away and past the boy's shoulder. Same action, new meaning.",
      stage: () => (
        <>
          <IronGolem position={[WELL[0] - 1.2, 0, WELL[2] - 1.6]} rotationY={SOUTH + 0.6} armR={-1.15} headPitch={0.4} />
          <Villager position={[WELL[0] - 0.2, 0, WELL[2] + 1.2]} rotationY={SOUTH + 0.3} robe={ROBE.friend} scale={0.7} kid phase={2.9} />
          <Hero position={[WELL[0] + 2.4, 0, WELL[2] + 2.4]} rotationY={SOUTH - 0.6} animation="idle" face="frown" gaze={0} />
        </>
      ),
    },
    {
      cue: "14.held",
      ...cam.push({ on: [WELL[0] + 0.3, 1.2, WELL[2] + 1.3], dist: 2.6, to: 2.2, yaw: 20, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Then it held one out to me': the iron hand, open, with the rose lying across it, at a kid's chest height. Nothing else in the frame but the hand and the flower.",
      stage: () => (
        <>
          <IronGolem position={[WELL[0] - 0.6, 0, WELL[2] + 0.3]} rotationY={SOUTH + 1.35} armR={-1.2} headPitch={0.34} headYaw={-0.2} />
          <Rose position={[WELL[0] + 0.55, 1.18, WELL[2] + 1.5]} scale={1.5} turn={0.9} />
        </>
      ),
    },
    {
      cue: "14.mine",
      ...cam.push({ on: [WELL[0] + 0.55, 1.18, WELL[2] + 1.5], dist: 2.8, to: 2.3, yaw: 14, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'It was mine. The rose I had left on the well': as close as the lens goes to anything in the film, on the flower in the iron hand, and his fingers arriving at the edge of the frame on the word.",
      stage: (t) => (
        <>
          <Rose position={[WELL[0] + 0.55, 1.18, WELL[2] + 1.5]} scale={1.5} turn={0.9} />
          <Hero position={[WELL[0] + 0.1, 0, WELL[2] + 2.35]} rotationY={SOUTH + 0.4} animation="reach" face="brave" gaze={0} />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [0, 1.42, 2.2], dist: 3.4, to: 2.9, yaw: 0, pitch: 2, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Subscribe before I keep it': the red sign held up to the lens, the way every film of this topic ends, and the golem standing behind it with a flower in its hand. The last thing in the picture is the iron that came back.",
      stage: () => (
        <>
          <Hero position={[0.75, 0, 3.4]} rotationY={SOUTH} animation="idle" face="uneasy" gaze={0} />
          <SubscribeSign position={[0, 1.62, 2.05]} rotationY={0} scale={0.62} tilt={0.05} />
          <IronGolem position={[-1.9, 0, 1.2]} rotationY={SOUTH + 0.2} flower headPitch={0.16} />
        </>
      ),
    },
  ],
});

void golemHand;
void MINE;
