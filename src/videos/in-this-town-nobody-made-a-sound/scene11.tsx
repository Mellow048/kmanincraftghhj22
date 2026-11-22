import { Block, cam, storyScene } from "../../engine";
import { Bits, Granny, Hero, HungBell, NORTH, PLACE, Rope, SOUTH, ease, jolt, ramp, timing, wordAt } from "./kit";
import { TOWER } from "./marks";

const HER = PLACE.grannyAt;
const LOUD = wordAt("11.loud", "Loud");
const ONE = wordAt("11.one", "One");
const THREE = wordAt("11.one", "Three");
const ANSWERED = wordAt("11.answer", "answered");
const GAP: [number, number, number] = [PLACE.tower[0] - 1.2, TOWER.floorTop, PLACE.tower[2] - 1.2];

/**
 * THE RING. He does the forbidden thing on the word — three pulls, the bell going wider each time — and the answer
 * does not come from the street. It comes up through the floor.
 */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "And I rang it",
  shots: [
    {
      cue: "11.loud",
      ...cam.push({ on: [PLACE.bellAt[0], PLACE.bellAt[1] - 1.0, PLACE.bellAt[2] + 0.4], dist: 5.4, to: 4.2, yaw: -12, pitch: -3, fov: 42 }),
      zone: "tower",
      look: "overworld-night",
      note: "On 'Loud' the rope comes down hard and the bell throws itself out over the room. Wide enough to see the bell, the boy and the open night behind them.",
      stage: (t) => {
        const pull = ease(ramp(t, LOUD - 0.2, LOUD + 0.1));
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={0.46 * pull * Math.sin(t * 7.4)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35 + pull * 0.6} pull={pull * 0.5} />
            <Hero position={[PLACE.ropeFoot[0] + 0.1, PLACE.towerIn, PLACE.ropeFoot[2] + 0.5]} rotationY={NORTH + 0.1} animation="hold" arms="reachUp" time={t} face="brave" headPitch={-0.1} />
            <Granny position={[HER[0] + 0.8, PLACE.towerIn, HER[2] + 0.6]} rotationY={SOUTH - 1.1} nod={0.1} lean={0.05} />
          </>
        );
      },
    },
    {
      cue: "11.one",
      ...cam.orbit({ on: [PLACE.bellAt[0], PLACE.bellAt[1] - 0.9, PLACE.bellAt[2]], dist: 4.9, distTo: 4.2, yaw: -22, yawTo: 12, pitch: -2, fov: 40 }),
      zone: "tower",
      look: "overworld-night",
      note: "One, two, three: the lens circles the bell and every count lands on a wider swing, so the sound is a thing we can see moving. He is counting on his fingers in the corner of the frame.",
      stage: (t) => {
        const count = Math.floor(ramp(t, ONE - 0.1, THREE + 0.2) * 3);
        return (
          <>
            <HungBell at={PLACE.bellAt} swing={(0.28 + count * 0.13) * Math.sin(t * 6.6 + count)} />
            <Rope at={PLACE.ropeFoot} from={5.86} to={3.35 + 0.4 * Math.min(1, count)} pull={0.35} />
            <Hero position={[PLACE.ropeFoot[0] + 0.5, PLACE.towerIn, PLACE.ropeFoot[2] + 0.9]} rotationY={NORTH - 0.4} animation="cheer" time={t} face="grin" headPitch={-0.14} />
            <Bits position={[PLACE.bellAt[0], PLACE.bellAt[1] - 1.6, PLACE.bellAt[2]]} t={t} color="#ffe9a8" count={14} power={0.6} seed={5} />
          </>
        );
      },
    },
    {
      cue: "11.answer",
      ...cam.push({ on: GAP, dist: 2.6, to: 1.9, yaw: -14, pitch: 26, fov: 40 }),
      zone: "tower",
      look: "overworld-night",
      note: "On 'answered' the light under the floorboards comes up through the gap and the wool dust jumps off the boards: the sound went down, and something down there heard it.",
      stage: (t) => {
        const up = ease(ramp(t, ANSWERED - 0.3, ANSWERED + 0.35));
        return (
          <>
            <Block position={[GAP[0], GAP[1] + 0.03, GAP[2]]} size={[1.5, 0.05, 1.2]} color="#08080a" />
            <Block position={[GAP[0], GAP[1] - 0.02, GAP[2]]} size={[1.42, 0.05, 1.12]} color="#8ef2de" emissive="#4fd8c0" emissiveIntensity={3.4 * up} opacity={0.4 + up * 0.6} transparent />
            <Bits position={[GAP[0], GAP[1] + 0.1, GAP[2]]} t={t + jolt(t, ANSWERED, 0.2)} color="#cfe8e2" count={22} power={1.1 * up} seed={9} toward={[GAP[0], GAP[1] + 1.6, GAP[2]]} />
            <Hero position={[GAP[0] + 1.0, PLACE.towerIn, GAP[2] + 1.3]} rotationY={SOUTH + 0.5} animation="idle" time={t} face="wow" headPitch={0.5} />
          </>
        );
      },
    },
  ],
});
