import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { ASIDE, BedBox, Bits, EAST, HOLE, Hero, Hole, NightLight, PLACE, SOUTH, WEST, ease, ramp, room, timing, wordAt } from "./kit";

const UNDER = wordAt("8.under", "under");
const PUSHED = wordAt("8.bed", "pushed");
const HOLE_WORD = wordAt("8.bed", "hole");
const T = PLACE.tunnel;
const DIGGER: Vec3 = [T[0] + 0.2, 0, T[2]];
const PUNCH = 0.55;

/** ATTEMPT TWO. Not over: under. Weeks of digging, in three pictures. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "He goes under it",
  shots: [
    {
      cue: "8.under",
      ...cam.push({ on: [HOLE[0], 0.5, HOLE[2] - 0.25], dist: 2.9, to: 2.4, yaw: 14, pitch: 26, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "The word is 'under': at night, by one torch, the bed pushed aside, he puts his fist through his own floor. The boards break on the word.",
      stage: (t) => (
        <>
          <BedBox position={ASIDE} />
          <NightLight />
          <Hero position={room(-1.2, 0, -2.04)} rotationY={SOUTH} animation="crouch" arms="press" time={t - UNDER + 0.25} face="brave" headPitch={0.25} />
          {t >= UNDER ? <Hole position={HOLE} size={0.95} rim="#8a6a40" /> : null}
          <Bits position={[HOLE[0], 0.1, HOLE[2]]} t={t - UNDER} color="#b48d52" count={12} seed={3} />
        </>
      ),
    },
    {
      cue: "8.night",
      ...cam.push({ on: [DIGGER[0], 0.98, DIGGER[2]], dist: 2.6, to: 2.05, yaw: 90, pitch: 4, fov: 42 }),
      zone: "tunnel",
      look: "warm-room",
      note: "'Every night, I dug': inside the tunnel, from where the dirt still is. He punches at us and the earth flies past the lens.",
      stage: (t) => {
        const n = Math.floor(t / PUNCH);
        const since = t - n * PUNCH;
        return (
          <>
            <Hero position={DIGGER} rotationY={EAST} animation="press" time={since} face="brave" gaze={0} />
            <Bits position={[DIGGER[0] + 0.75, 0.95, DIGGER[2] + 0.12]} t={since - 0.22} color="#7a5536" count={10} seed={n + 1} power={0.8} toward={[1.6, 0, 0]} />
            <pointLight position={[DIGGER[0] + 1.6, 1.3, DIGGER[2] + 0.5]} color="#ffc890" intensity={5} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.bed",
      from: [-0.15, 4.2, 78.9],
      to: [-0.55, 3.9, 78.9],
      target: [-0.15, 0.3, 78.8],
      targetTo: [-0.55, 0.3, 78.8],
      fov: 56,
      ease: "inOutSine",
      zone: "room",
      look: "overworld-day",
      note: "'I pushed the bed back over the hole': straight down, in the morning, sliding with the bed. He shoves it and the black square is gone by the word 'hole'.",
      stage: (t) => {
        const k = ease(ramp(t, PUSHED - 0.15, HOLE_WORD - 0.05));
        const x = ASIDE[0] + (HOLE[0] - ASIDE[0]) * k;
        return (
          <>
            <Hole position={HOLE} size={0.95} rim="#8a6a40" />
            <BedBox position={[x, 0, HOLE[2]]} />
            <Hero position={[x + 0.86, 0, HOLE[2] + 0.1]} rotationY={WEST} animation="walk" animDistance={k * 1.2} arms="hold" face="brave" />
          </>
        );
      },
    },
  ],
});
