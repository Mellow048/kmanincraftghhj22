import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BRO, Brother, CHAOS, DOWN, FireLight, Hero, NORTH, SOUTH, Wisps, ZONE, chestOf, ease, faceOf, flat, ramp, timing } from "./kit";

/** Where the brother comes to, to offer his hand; and where the teller gets up. */
export const NEAR: Vec3 = [8.4, 0, 0.2];
export const STOOD: Vec3 = [8.4, 0, 1.6];

/** SOMEONE IN THE SMOKE. A black shirt, and his own face. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "A black shirt",
  shots: [
    {
      cue: "12.smoke",
      from: [8.5, 0.45, 2.3],
      to: [8.45, 0.6, 1.9],
      target: [8.4, 1.35, -1.3],
      fov: 44,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the ground, where he lies: smoke rolling across what is left of his house, and in it a figure, standing still, black against the fire.",
      stage: (t) => (
        <>
          <Brother position={BRO} rotationY={SOUTH} animation="idle" />
          <Wisps position={[8.4, 1.3, 0.2]} t={t} count={14} reach={5} size={1.0} opacity={0.6} color="#3a302b" dir={[1, 0.05, 0]} seed={3} />
          <Wisps position={[8.4, 0.9, -0.6]} t={t + 4} count={10} reach={5} size={0.8} opacity={0.5} color="#4a403a" dir={[-1, 0.1, 0]} seed={5} />
        </>
      ),
    },
    {
      cue: "12.shirt",
      ...cam.push({ on: [BRO[0], 1.05, BRO[2]], dist: 2.9, to: 2.4, yaw: -14, pitch: 0, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: the shirt. Black. And down by his side, his right hand is on fire and he does not mind.",
      stage: (t) => (
        <>
          <Brother position={BRO} rotationY={SOUTH} animation="idle" flame={t} />
          <FireLight position={[BRO[0] - 1.2, 1.6, BRO[2] + 1.6]} power={16} reach={7} seed={2} />
        </>
      ),
    },
    {
      cue: "12.brother",
      ...cam.push({ on: faceOf(BRO), dist: 1.8, to: 1.4, yaw: 8, pitch: -6, fov: 34 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "His face. It is the teller's face, ten years older than when we last saw it, lit from below by his own hand. He is smiling.",
      stage: (t) => (
        <>
          <Brother position={BRO} rotationY={SOUTH} animation="idle" face="grin" flame={t} gaze={0} />
          <FireLight position={[BRO[0] + 1.0, 1.4, BRO[2] + 1.6]} power={9} reach={6} seed={3} />
        </>
      ),
    },
    {
      cue: "12.hand",
      from: [8.75, 0.45, 1.7],
      to: [8.7, 0.5, 1.5],
      target: [8.4, 1.15, 0.2],
      fov: 42,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the ground again: he has walked up and is bending over us, holding one hand down. The fire is in the other.",
      stage: (t) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="reach" face="smile" headPitch={0.45} gaze={0} />
          <FireLight position={[NEAR[0] - 1.2, 1.2, NEAR[2] + 1.4]} power={8} reach={6} seed={4} />
          <Wisps position={[8.4, 1.6, -1]} t={t + 2} count={8} reach={4} size={0.8} opacity={0.45} color="#4a403a" dir={[1, 0.1, 0]} seed={6} />
        </>
      ),
    },
    {
      cue: "12.up",
      ...cam.push({ on: [8.4, 1.0, 0.9], dist: 3.8, to: 3.3, yaw: 58, pitch: 3, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on, the two of them: the same height, the same face, red and black. He gets to his feet on his own, and the offered hand is left hanging in the air.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0, 0.75));
        return (
          <>
            <Hero position={k < 0.3 ? flat(DOWN) : STOOD} rotationY={k < 0.3 ? 0 : NORTH} animation={k < 0.3 ? "lie" : "crouch"} blendTo="idle" blend={k < 0.3 ? 0 : ease(ramp(k, 0.3, 1))} face="angry" />
            <Brother position={NEAR} rotationY={SOUTH} animation="reach" face="smug" />
            <FireLight position={[9.8, 1.6, 1.6]} power={10} reach={7} seed={5} />
          </>
        );
      },
    },
  ],
});
