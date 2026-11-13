import { Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, EAST, FireLight, Hero, IronGolem, PLACE, ROBE, Raider, SOUTH, SmokeBank, Strangers, Villager, WEST, climb, ramp, timing, wordAt } from "./kit";

const LIP = PLACE.lip;
const SHOULDER: Vec3 = [LIP[0], LIP[1], 1.08];
const FOUND = PLACE.found;
const BURNED = wordAt("13.black", "burned");
const LENS: Vec3 = [0, 2.0, 8.5];

/** THE REVEAL. The picture in one short sentence, then the reason, and the reason is his own first sentence. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "What the hands were doing",
  shots: [
    {
      cue: "13.clear",
      from: [48.6, 14.3, 1.3],
      to: [49.2, 13.9, 1.3],
      target: [69, 2.6, 0],
      targetTo: [80, 2.6, 0],
      fov: 46,
      fovTo: 36,
      ease: "inOutSine",
      zone: "valley2",
      look: "lava-shore",
      note: "'When the smoke cleared': over his shoulder, his arm still up. The smoke parts like a curtain, the arm comes slowly down, and behind the people every roof is burning.",
      stage: (t) => (
        <>
          <Hero position={SHOULDER} rotationY={EAST} animation="idle" blendTo="wave" blend={ramp(t, 0.7, 1.9)} face="wow" />
          <SmokeBank x={74} amount={1 - ramp(t, 0.3, 1.9)} part={ramp(t, 0.3, 1.9)} t={t} />
          <Strangers />
          <FireLight position={[LIP[0] + 1.6, 12.2, 0.4]} power={10} reach={6} />
        </>
      ),
    },
    {
      cue: "13.burn",
      ...cam.push({ on: [84, 4.2, -7], dist: 15, to: 12.2, yaw: 14, pitch: -7, fov: 54 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'They were burning a village': the wide, down among it. Three houses in a row, every roof alight, and the strangers under them with their torches up.",
      stage: (t) => (
        <>
          <Raider who={4} position={[79.2, 0, -2.6]} rotationY={-2.9} animation="reachUp" torch light={6} />
          <Raider who={6} position={[81.4 + t * 1.6, 0, 0.6]} rotationY={EAST} animation="run" animDistance={t * 1.6} torch />
          <Raider who={9} position={[86.6, 0, -4.4]} rotationY={-3.0} animation="cheer" torch />
          <Raider who={1} position={[84.2, 0, -1.4]} rotationY={2.9} animation="reachUp" torch />
          <Raider who={10} position={[90.4 - t * 1.4, 0, 0.2]} rotationY={WEST} animation="run" animDistance={t * 1.4} torch />
          <Raider who={7} position={[88.9, 0, -2.2]} rotationY={-2.4} animation="cheer" torch />
          <Villager position={[83.4 - t * 1.5, 0, 2.3]} rotationY={WEST} walk={t * 1.5} robe={ROBE.brown} phase={0.3} />
          <Villager position={[84.8 - t * 1.5, 0, 3.0]} rotationY={WEST} walk={t * 1.5} robe={ROBE.white} phase={1.9} />
        </>
      ),
    },
    {
      cue: "13.noses",
      ...cam.truck({ on: [84.2, 1.25, 1.3], dist: 4.0, yaw: -72, pitch: 7, by: [-2.4, 0, 0], fov: 40 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'Long noses and folded arms, just like mine': travel with the people who live here as they run. The same face as his whole town, and they cannot even lift an arm.",
      stage: (t) => {
        const run = t * 0.88;
        return (
          <>
            <Villager position={[84.3 - run, 0, 1.25]} rotationY={WEST} walk={run * 1.5} robe={ROBE.brown} lean={0.12} phase={0.3} />
            <Villager position={[83.5 - run, 0, 1.95]} rotationY={WEST} walk={run * 1.7} scale={CHILD} kid robe={ROBE.friend} lean={0.1} phase={1.1} />
            <Villager position={[85.5 - run, 0, 0.55]} rotationY={WEST} walk={run * 1.5} robe={ROBE.white} lean={0.12} phase={1.9} />
            <Villager position={[86.5 - run, 0, 1.8]} rotationY={WEST} walk={run * 1.5} robe={ROBE.blue} lean={0.12} hat="straw" phase={3.4} />
            <Raider who={3} position={[89.2 - t * 1.25, 0, 1.1]} rotationY={WEST} animation="run" animDistance={t * 1.25} torch />
          </>
        );
      },
    },
    {
      cue: "13.black",
      ...cam.push({ on: [-21, 2.2, -6], dist: 9.2, to: 7.2, yaw: -12, pitch: -4, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Who had burned the black house': home again, daylight, the black house and nobody near it. On 'burned' its windows remember the fire for a moment.",
      stage: (t) => {
        const flash = ramp(t, BURNED - 0.15, BURNED + 0.1) * (1 - ramp(t, BURNED + 0.35, BURNED + 0.95));
        return (
          <>
            <Glow position={[-23, 2.15, -4.85]} size={3.2} color="#ff7a1e" opacity={0.95 * flash} />
            <Glow position={[-19, 2.15, -4.85]} size={3.2} color="#ff7a1e" opacity={0.95 * flash} />
            <Glow position={[-21, 1.1, -4.85]} size={2.8} color="#ff5a14" opacity={0.8 * flash} />
          </>
        );
      },
    },
    {
      cue: "13.from",
      from: [26.3, 0.5, 6.6],
      to: [26.9, 0.5, 6.6],
      target: [33, 1.75, 6.7],
      fov: 50,
      ease: "inOutSine",
      zone: "village",
      look: "lava-shore",
      note: "'Where I had come from': the same small him in the same grass, but this time we see the rest. Firelight on his face, and behind him the ones who brought him, leaving over the hill with their torches.",
      stage: (t, { p }) => (
        <>
          <Hero position={FOUND} rotationY={WEST} scale={0.45} animation="idle" face="fear" gaze={0} />
          <Raider who={0} position={climb(1, 1, p, 5.2)} rotationY={EAST} animation="run" animDistance={p * 2} torch />
          <Raider who={2} position={climb(3, 1, p, 7.6)} rotationY={EAST} animation="run" animDistance={p * 2} torch />
          <Raider who={1} position={climb(2, 1, p, 8.6)} rotationY={EAST} animation="run" animDistance={p * 2} />
          <Raider who={6} position={climb(4, 1, p, 6.0)} rotationY={EAST} animation="run" animDistance={p * 2} torch />
          <FireLight position={[27.2, 1.1, 7.2]} power={14} reach={7} />
        </>
      ),
    },
    {
      cue: "13.known",
      ...cam.push({ on: [0, 1.5, 3.0], dist: 6.4, to: 5.6, yaw: 0, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'My town had always known what I was': all of them, looking at us. The oldest in front, the friend, the neighbours, the golem behind. They knew.",
      stage: () => (
        <>
          <IronGolem position={[0, 0, 1.4]} rotationY={SOUTH} headPitch={0.28} />
          <Villager position={[0, 0, 3.7]} robe={ROBE.elder} lookAt={LENS} phase={2.2} />
          <Villager position={[-0.62, 0, 4.4]} scale={CHILD} kid robe={ROBE.friend} lookAt={LENS} phase={1.1} />
          <Villager position={[0.68, 0, 4.05]} robe={ROBE.white} lookAt={LENS} phase={1.9} />
          <Villager position={[-0.85, 0, 2.95]} robe={ROBE.brown} lookAt={LENS} phase={0.3} />
          <Villager position={[0.9, 0, 2.85]} robe={ROBE.blue} lookAt={LENS} phase={3.4} />
        </>
      ),
    },
    {
      cue: "13.hoped",
      ...cam.push({ on: [0.15, 1.2, 3.5], dist: 3.9, to: 3.2, yaw: 5, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'They had hoped I would grow up to be something else': him in a row of villagers, arms folded like theirs, trying to be one. He glances sideways to check he is doing it right.",
      stage: (t) => (
        <>
          <Villager position={[-0.66, 0, 3.5]} robe={ROBE.brown} phase={0.3} />
          <Hero position={[0.15, 0, 3.5]} animation="hug" face="smile" headYaw={Math.sin(t * 2.6) * 0.5} />
          <Villager position={[0.96, 0, 3.5]} robe={ROBE.white} phase={1.9} />
          <Villager position={[0.5, 0, 2.5]} robe={ROBE.blue} phase={3.4} />
        </>
      ),
    },
  ],
});
