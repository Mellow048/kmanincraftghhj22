import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bo, Bread, DAY, Folk, Hero, Mira, NORTH, North, PLACE, SOUTH, SoundRings, Tip, WEST, EAST, Wisps, ZONE, ease, hop, ramp, timing, villagerFace, wordAt } from "./kit";

const U = PLACE.under;
const BELL = wordAt("7.bo", "bell");
const JUMP = wordAt("7.jump", "jump");
const WARM = wordAt("7.mira", "warm");
const NORTHW = wordAt("7.tip", "north");
const LOAF: Vec3 = [7.45, 1.0, -2.6];

/** THE FRIENDS GET THEIRS. Three small powers. Each one comes back. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Bo, Mira and Tip",
  shots: [
    {
      cue: "7.bo",
      ...cam.push({ on: villagerFace(U), dist: 3.2, to: 2.5, yaw: -12, pitch: -4, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Bo, in green, under the bell. On 'bell' it rings, and green sparks burst round him.",
      stage: (t) => (
        <>
          <Bo position={U} rotationY={SOUTH} nod={-0.2} />
          <SoundRings position={[0, 2.7, -2.2]} t={t - BELL} color="#ffe08a" reach={2.4} />
          <Bits position={[U[0], 1.8, U[2] + 0.2]} t={t - BELL - 0.2} color="#8dff7a" count={14} seed={2} power={0.8} />
        </>
      ),
    },
    {
      cue: "7.jump",
      ...cam.push({ on: [0, 1.9, 3], dist: 5.6, to: 5.2, yaw: 6, pitch: -2, fov: 44 }),
      zone: ZONE.day,
      look: DAY,
      note: "Bo and another villager side by side. On 'jump' both jump. The other goes up one block. Bo goes up two. That is all.",
      stage: (t) => (
        <>
          <Folk n={1} position={[-0.8, hop(t, JUMP, 1.0, 0.7), 3]} rotationY={SOUTH} />
          <Bo position={[0.8, hop(t, JUMP, 2.0, 0.95), 3]} rotationY={SOUTH} />
          <Bits position={[0.8, 0.1, 3]} t={t - JUMP} color="#d8c89a" count={8} seed={5} power={0.5} />
        </>
      ),
    },
    {
      cue: "7.mira",
      ...cam.push({ on: [7.85, 1.2, -2.6], dist: 2.8, to: 2.2, yaw: -32, pitch: 7, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Mira, in blue, bends over a cold loaf at the end of the market stall. On 'warm' it glows orange and starts to steam.",
      stage: (t) => {
        const k = ease(ramp(t, WARM, WARM + 0.5));
        return (
          <>
            <Mira position={[8.45, 0, -2.6]} rotationY={WEST} lean={0.3} nod={0.2} />
            <Bread position={LOAF} warm={k} />
            {k > 0 ? <Wisps position={[LOAF[0], 1.45, LOAF[2]]} t={t} count={5} reach={0.6} size={0.16} opacity={0.5} color="#ffffff" dir={[0, 1, 0]} seed={3} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.tip",
      ...cam.push({ on: [-2, 0.8, 2.5], dist: 4.8, to: 4.2, yaw: 0, pitch: 28, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "From above: Tip, in yellow, spins on the spot and stops dead facing up the street. On 'north' a red arrow appears on the ground in front of him, pointing the same way.",
      stage: (t) => {
        const k = ease(ramp(t, 0, NORTHW));
        return (
          <>
            <Tip position={[-2, 0, 3]} rotationY={NORTH + (1 - k) * 5} />
            {t >= NORTHW ? <North position={[-1.1, 0.04, 2.3]} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.told",
      ...cam.push({ on: [0, 1.5, 3], dist: 2.5, to: 2.1, yaw: 0, pitch: 0, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Side on: Tip nose to nose with the young man in red, telling him again. The young man's face says he has heard it.",
      stage: () => (
        <>
          <Tip position={[-0.42, 0, 3]} rotationY={EAST} hmm={1} />
          <Hero position={[0.42, 0, 3]} rotationY={WEST} animation="idle" face="frown" />
        </>
      ),
    },
  ],
});
