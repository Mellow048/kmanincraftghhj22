import { Glow, cam, storyScene } from "../../engine";
import {
  Bits,
  Creeper,
  EAST,
  Hero,
  IronGolem,
  PLACE,
  SOUTH,
  Smoke,
  ease,
  jolt,
  ramp,
  timing,
  wordAt,
} from "./kit";

const FELL = PLACE.fell;
const BOOM = wordAt("9.boom", "exploded");

/**
 * BEATS 8 and 9 — the creeper, and the explosion.
 *
 * The mistake is a matter of distance, and the cut has to show the distance: shot one is the creeper
 * behind the golem's shoulder, shot three is a wide from where he stands with the two of them small
 * in it. Then the flash, and then one long look at what is left.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The creeper",
  shots: [
    {
      cue: "8.behind",
      ...cam.push({ on: [22.3, 1.0, 1.35], dist: 5.8, to: 5.1, yaw: -52, pitch: 8, fov: 46 }),
      zone: "gate",
      look: "lantern-night",
      note: "'There was a creeper behind the golem': we see it over the golem's shoulder, its face lit low and green, and the golem's back filling the left of the frame. It is close. That is the whole shot.",
      stage: (t) => (
        <>
          <IronGolem position={[20.4, 0, 2.2]} rotationY={SOUTH + 1.6} />
          <Creeper position={[22.4, 0, 1.2]} rotationY={SOUTH - 1.1} fuse={0.2} />
          {/* Its face is the only green light in the town, and the golem is standing in front of it. */}
          <pointLight position={[22.3, 0.75, 1.25]} color="#9dff62" intensity={9} distance={5} decay={2} />
          <Glow position={[22.35, 0.55, 1.15]} size={0.85} color="#a8ff70" opacity={0.3} />
        </>
      ),
    },
    {
      cue: "8.shout",
      ...cam.push({ on: [19.0, 1.34, 2.0], dist: 2.0, to: 1.6, yaw: 404, pitch: 1, fov: 34 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I should have shouted': his face, open-mouthed, lit from the front by the gate lantern — the moment he understands. No cut on the word; the camera just keeps coming.",
      stage: (t) => (
        <>
          <Hero position={[19.0, 0, 2.0]} rotationY={EAST} animation="panic" face="scared" gaze={0} />
        </>
      ),
    },
    {
      cue: "8.late",
      ...cam.push({ on: [19.6, 1.5, 2.0], dist: 11.0, to: 9.2, yaw: -80, pitch: 4, fov: 50 }),
      zone: "gate",
      look: "lantern-night",
      note: "'But I was too far away, and it was too late': the wide that makes the excuse true. He is at the left edge; the golem and the creeper are two small shapes at the far end of the light, and the ground between them is empty.",
      stage: (t) => (
        <>
          <Hero position={[19.0, 0, 2.0]} rotationY={EAST} animation="panic" face="scared" gaze={0} />
          <IronGolem position={[22.6, 0, 2.2]} rotationY={SOUTH + 1.4} />
          <Creeper position={[23.7, 0, 1.1]} rotationY={SOUTH - 2.0} fuse={0.35} />
        </>
      ),
    },
    {
      cue: "9.boom",
      ...cam.push({ on: [22.4, 1.5, 2.0], dist: 4.2, to: 3.9, yaw: 86, pitch: 3, fov: 44 }),
      zone: "gate",
      look: "lantern-night",
      note: "'It exploded': the flash on the word — a white core where the creeper was, iron shards going out, smoke. The camera takes one jolt and no more, and the golem is still standing inside the light.",
      stage: (t) => {
        const k = ramp(t, BOOM - 0.06, BOOM + 0.1);
        const s = pop_scale(t, BOOM);
        return (
          <>
            <IronGolem position={[22.4, 0, 2.2]} rotationY={SOUTH + 1.5} />
            <Creeper position={[23.5, 0, 1.1]} rotationY={SOUTH - 2.0} fuse={0.4 + 0.6 * k} />
            {/* the core of it */}
            <mesh position={[23.2, 1.0, 1.4]} scale={s} visible={t > BOOM - 0.06}>
              <sphereGeometry args={[0.55, 12, 10]} />
              <meshBasicMaterial color="#fff6e0" transparent opacity={Math.max(0, 0.95 - ramp(t, BOOM + 0.05, BOOM + 0.4))} />
            </mesh>
            <Bits position={[23.0, 1.1, 1.3]} t={t - BOOM} color="#c8ccd2" count={22} power={2.2} />
            <Bits position={[23.0, 0.8, 1.3]} t={t - BOOM * 0.9} color="#3f6b3a" count={10} power={1.5} />
            <Smoke position={[22.8, 0.2, 1.4]} count={18} rise={3.6} spread={2.6} size={0.4} opacity={0.75} lean={0.2} />
          </>
        );
      },
    },
    {
      cue: "9.dust",
      ...cam.push({ on: [FELL[0], 0.4, FELL[2]], dist: 3.6, to: 5.8, yaw: -70, pitch: 16, fov: 46 }),
      zone: "gate",
      look: "lantern-night",
      note: "'When the dust settled, our protector was gone': a pull OUT, away from the scorch on the ground, so the empty place gets bigger. One iron hand's worth of debris and nothing else. Smoke still going up.",
      stage: (t) => (
        <>
          <Smoke position={[FELL[0], 0, FELL[2]]} count={16} rise={4.2} spread={2.8} size={0.34} opacity={0.6} lean={0.3} />
          <Bits position={[FELL[0], 0.7, FELL[2]]} t={t + 3} color="#4a4f56" count={14} power={0.35} />
          <Hero position={[19.2, 0, 2.0]} rotationY={EAST} animation="idle" face="fear" gaze={0} />
        </>
      ),
    },
  ],
});

/** 0 until `at`, then a hard flash that is gone in a third of a second. */
function pop_scale(t: number, at: number): number {
  const x = t - at;
  if (x < -0.06) return 0.001;
  return Math.max(0.001, 1 + x * 2.2) * (1 - Math.max(0, ramp(t, at + 0.05, at + 0.45)));
}

