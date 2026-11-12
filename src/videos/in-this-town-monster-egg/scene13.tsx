import type React from "react";
import { Torch, cam, lerp, storyScene, stride } from "../../engine";
import { EAST, Friend, HeroEgg, ease, faceOf, ramp, timing } from "./kit";

const HERO: [number, number, number] = [25.6, 0, 1.3];
const FRIEND: [number, number, number] = [24.3, 0, 0.9];
const ARRIVES = 1.25;

/** The best friend, out of breath, with the torch he grabbed on the way. */
const FriendWithTorch: React.FC<{ t: number; face: "fear" | "frown" }> = ({ t, face }) => {
  const torch = (
    <group rotation={[1.55, 0, 0]}>
      <Torch position={[0, -0.25, 0]} light={2.2} seed={5} />
    </group>
  );
  return t < ARRIVES ? (
    <Friend {...stride([21.6, 0, 0.5], FRIEND, t / ARRIVES)} animation="run" arms="reach" face={face}>
      {torch}
    </Friend>
  ) : (
    <Friend position={FRIEND} rotationY={EAST} animation="idle" arms="reach" face={face} lookAt={faceOf(HERO)}>
      {torch}
    </Friend>
  );
};

/** THE FRIEND. The last person who could stop him, and the line the film is about. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The friend",
  shots: [
    {
      cue: "13.beg",
      ...cam.push({ on: [25.2, 1.1, 1.1], dist: 4.5, to: 3.7, yaw: -78, pitch: 0 }),
      zone: "town",
      look: "overworld-night",
      note: "Night at the gate. He is nearly through when his friend runs in from behind us with a torch, and he turns.",
      stage: (t) => (
        <>
          <HeroEgg position={HERO} rotationY={lerp(EAST, EAST + Math.PI, ease(ramp(t, 1.0, 1.7)))} carry="hug" pack face="uneasy" />
          <FriendWithTorch t={t} face="fear" />
        </>
      ),
    },
    {
      cue: "13.what",
      ...cam.push({ on: faceOf(FRIEND), dist: 2.0, to: 1.5, yaw: 76, pitch: 2, fov: 38 }),
      zone: "town",
      look: "overworld-night",
      note: "'What if something bad comes out?': the friend's face in his own torchlight. He is scared for the hero, not of him.",
      stage: () => <FriendWithTorch t={99} face="fear" />,
    },
    {
      cue: "13.alone",
      ...cam.push({ on: [HERO[0], 1.02, HERO[2]], dist: 2.1, to: 1.6, yaw: -80, pitch: 0, fov: 38 }),
      zone: "town",
      look: "overworld-night",
      note: "'Then at least it won't hatch alone': the answer, with a small smile, the egg in his arms and the forbidden gate behind him.",
      stage: () => (
        <>
          <HeroEgg position={HERO} rotationY={EAST + Math.PI} carry="hug" pack face="smile" />
          <pointLight position={[24.2, 1.5, 1.0]} color="#ffb060" intensity={3} distance={8} decay={2} />
        </>
      ),
    },
  ],
});
