import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block } from "../../engine";
import { BED, BedBox, Bits, Burst, CHAOS, DOOR, DOWN, FireLight, Folk, Hero, IN_BED, NORTH, PLACE, SOUTH, Tip, Wisps, ZONE, faceOf, flat, ramp, room, timing, waddle, wordAt } from "./kit";

const BOOM = wordAt("11.boom", "exploded");
const WINDOW = room(1.3, 1.85, -2.3);

/** THE MORNING IT ALL GOES. Smoke, screaming, no mother, and then the house. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "My house exploded",
  shots: [
    {
      cue: "11.woke",
      ...cam.top({ on: room(-0.9, 0.5, -1.5), height: 3.3, to: 2.9, spin: [-10, 8], fov: 44 }),
      zone: ZONE.room,
      look: CHAOS,
      note: "Straight down on his bed. His eyes snap open. The light on him is orange, and it is moving.",
      stage: (t) => (
        <>
          <BedBox position={BED} />
          <Hero position={IN_BED} animation="lie" face={t < 0.35 ? "calm" : "scared"} headYaw={t < 0.35 ? 0 : Math.sin(t * 9) * 0.5} gaze={0} />
          <FireLight position={room(1.2, 2, -1.3)} power={16} reach={8} seed={2} />
        </>
      ),
    },
    {
      cue: "11.street",
      ...cam.push({ on: [WINDOW[0], 1.6, WINDOW[2]], dist: 3.4, to: 3.0, yaw: -6, pitch: 6, fov: 42 }),
      zone: ZONE.room,
      look: CHAOS,
      note: "He is at his window. The glass is solid orange, and smoke is crawling in round the frame.",
      stage: (t) => (
        <>
          <BedBox position={BED} />
          <Hero position={room(1.3, 0, -1.55)} rotationY={NORTH} animation="scared" />
          <Block position={[WINDOW[0], WINDOW[1], WINDOW[2] - 0.02]} size={[1.06, 1.06, 0.04]} color="#ff8a2a" emissive="#ff7a1e" emissiveIntensity={0.3} castShadow={false} />
          <Wisps position={[WINDOW[0], 1.9, WINDOW[2] + 0.5]} t={t + 3} count={10} reach={2.4} size={0.6} opacity={0.55} color="#4a403a" dir={[-1, 0.2, 0.4]} seed={4} />
          <FireLight position={room(1.3, 1.9, -1.6)} power={18} reach={8} seed={3} />
        </>
      ),
    },
    {
      cue: "11.tip",
      ...cam.push({ on: [7.2, 1.35, 2.4], dist: 6.2, to: 5.4, yaw: 22, pitch: 3, fov: 42 }),
      zone: ZONE.fire,
      look: CHAOS,
      note: "Outside. Every roof is burning. Tip, in yellow, pelts down the street past us shouting, and for once his power means something. Others run the other way.",
      stage: (t, { p }) => (
        <>
          <Tip {...waddle([4.2, 0, 2.3], [10.4, 0, 2.6], p)} hmm={1} lean={0.25} />
          <Folk n={1} {...waddle([11, 0, 1.4], [6.5, 0, 1.6], p)} lean={0.25} />
          <Folk n={4} {...waddle([9.5, 0, 0.6], [4.5, 0, 0.9], p)} lean={0.25} />
          <Wisps position={[7, 1.6, 1.6]} t={t} count={12} reach={6} size={0.8} opacity={0.5} color="#4a403a" dir={[1, 0.1, 0.3]} seed={7} />
        </>
      ),
    },
    {
      cue: "11.mom",
      ...cam.push({ on: faceOf(DOOR), dist: 2.4, to: 1.9, yaw: 14, pitch: 0, fov: 36 }),
      zone: ZONE.fire,
      look: CHAOS,
      note: "Him in his own doorway, looking every way at once. She is not there.",
      stage: (t) => (
        <>
          <Hero position={DOOR} rotationY={SOUTH} animation="lookAround" face="worried" />
          <FireLight position={[DOOR[0] - 2, 2, DOOR[2] + 2.5]} power={12} reach={8} seed={5} />
          <Wisps position={[DOOR[0], 1.6, DOOR[2] + 0.8]} t={t + 1} count={8} reach={3} size={0.6} opacity={0.45} color="#4a403a" dir={[1, 0.1, 0]} seed={8} />
        </>
      ),
    },
    {
      cue: "11.boom",
      ...cam.push({ on: [9.2, 1.9, -3.2], dist: 9.6, to: 8.6, yaw: 8, pitch: 6, fov: 42 }),
      zone: ZONE.fire,
      look: CHAOS,
      note: "The whole front of his house, him small in the doorway. On 'exploded' it goes: a ball of fire where the house was, and he comes flying out of it towards us.",
      stage: (t) => {
        const k = ramp(t, BOOM, BOOM + 0.55);
        const pos: Vec3 = [DOOR[0] + (DOWN[0] - DOOR[0]) * k, Math.sin(k * Math.PI) * 2.2, DOOR[2] + (DOWN[2] - DOOR[2]) * k];
        return (
          <>
            <Hero position={pos} rotationY={SOUTH} animation={t < BOOM ? "lookAround" : "fall"} face={t < BOOM ? "worried" : "scared"} />
            <Burst position={[PLACE.home[0], 1.6, PLACE.home[2] - 2.2]} t={t - BOOM} size={5.2} seed={1} />
            <Burst position={[PLACE.home[0] - 1.6, 2.6, PLACE.home[2] - 0.6]} t={t - BOOM - 0.12} size={3.6} seed={5} />
            <Burst position={[PLACE.home[0] + 1.8, 3.4, PLACE.home[2] - 1.6]} t={t - BOOM - 0.22} size={3.2} seed={9} />
            <Bits position={[PLACE.home[0] - 1, 2, PLACE.home[2] + 0.4]} t={t - BOOM} color="#caa268" count={16} seed={3} power={1.6} toward={[0, 0, 2]} />
          </>
        );
      },
    },
    {
      cue: "11.ground",
      ...cam.top({ on: [DOWN[0], 0.2, DOWN[2] - 0.3], height: 3.1, to: 2.6, spin: [12, -6], fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Straight down: flat on his back in the road, bits of his house landing round him. His eyes are going round.",
      stage: (t) => (
        <>
          <Hero position={flat(DOWN)} animation="lie" face="dizzy" headYaw={Math.sin(t * 5) * 0.2} gaze={0} />
          <Bits position={[DOWN[0] + 0.6, 0.4, DOWN[2] - 0.6]} t={t + 0.1} color="#caa268" count={10} seed={6} power={0.7} />
          <Bits position={[DOWN[0] - 0.7, 0.4, DOWN[2] + 0.3]} t={t - 0.3} color="#5c3f24" count={8} seed={8} power={0.6} />
        </>
      ),
    },
  ],
});
