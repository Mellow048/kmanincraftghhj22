import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Baker, Bits, DAY, Folk, Mom, PLACE, SOUTH, SoundRings, WEST, EAST, ZONE, pop, timing, villagerFace, waddle, wordAt } from "./kit";

const U = PLACE.under;
const EIGHTEEN = wordAt("1.day", "eighteen");
const RANG = wordAt("1.bell", "rang");

/** THE HOOK. A town where the bell gives you a power at eighteen. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A power at eighteen",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.5, -0.8], dist: 7.6, to: 6.4, yaw: 12, pitch: 8, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "The square in the sun, the bell in the middle of it, and the town going about its morning round it.",
      stage: (t, { p }) => (
        <>
          <Folk n={2} position={U} rotationY={SOUTH} />
          <Mom position={[-2.2, 0, 0.6]} rotationY={0.9} lookAt={[0, 2.5, -2.5]} />
          <Baker {...waddle([3.6, 0, 1.6], [1.8, 0, 1.2], p)} />
          <Folk n={0} position={[2.1, 0, -0.4]} rotationY={-0.9} lookAt={[0, 2.5, -2.5]} />
          <Folk n={3} {...waddle([-4.2, 0, 2.6], [-2.6, 0, 2.9], p)} />
          <Folk n={4} position={[-1.2, 0, 2.2]} rotationY={2.6} lookAt={[0, 2.5, -2.5]} />
        </>
      ),
    },
    {
      cue: "1.day",
      ...cam.push({ on: villagerFace(U), dist: 2.4, to: 1.8, yaw: -10, pitch: 0, fov: 36 }),
      zone: ZONE.day,
      look: DAY,
      note: "One villager under the bell, waiting. On 'eighteen' gold sparks burst round his head: that is a power arriving.",
      stage: (t) => (
        <>
          <Folk n={2} position={[U[0], pop(t, EIGHTEEN, 0.25) * 0.12, U[2]]} rotationY={SOUTH} nod={-0.15} />
          <Bits position={[U[0], 1.9, U[2] + 0.2]} t={t - EIGHTEEN} color="#ffd24a" count={14} seed={3} power={0.8} />
        </>
      ),
    },
    {
      cue: "1.bell",
      ...cam.push({ on: [0, 2.7, -2.5], dist: 3.6, to: 3.0, yaw: -22, pitch: -14, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The bell from below, against the sky. On 'rang' rings of sound go out from it.",
      stage: (t) => (
        <>
          <SoundRings position={[0, 2.7, -2.2]} t={t - RANG} color="#ffe08a" reach={2.6} />
          <Folk n={2} position={U} rotationY={SOUTH} nod={-0.4} />
        </>
      ),
    },
  ],
});
