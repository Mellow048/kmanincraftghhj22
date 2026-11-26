import { cam, storyScene } from "../../engine";
import { EAST, Hero, LavaBucket, Mum, OldWick, ROBE, SubscribeSign, Villager, ease, faceOf, pop, ramp, timing, wordAt } from "./kit";

export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The Button",
  shots: [
    {
      cue: "11.sub",
      ...cam.push({ on: [0, 0.75, 2.0], dist: 3.1, to: 1.75, yaw: 18, pitch: 18, fov: 36, screenOffset: [0, 0.05] }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero refuses to rise for bell, smiling lazily upward from cobbles lifting red SUBSCRIBE board straight to lens.",
      stage: (t) => {
        const SUB = wordAt("11.sub", "subscribe");
        return (
          <>
            <group position={[0, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation="wave" face="grin" time={t} />
            </group>
            <group position={[-1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <Mum position={[0, 0, 0]} carry={<LavaBucket position={[0, 0.42, 0]} scale={0.6} />} />
            </group>
            <group position={[1.4, 0.25, 2.0]} rotation={[-Math.PI / 2, 0, 0]}>
              <OldWick position={[0, 0, 0]} />
            </group>
            <SubscribeSign
              position={[0.1, 1.05 + ramp(t, SUB, SUB + 0.5) * 0.15, 2.35]}
              rotationY={0.25}
              tilt={0.08 * Math.sin(t * 4)}
              scale={0.72 * pop(t, SUB - 0.2)}
            />
          </>
        );
      },
    },
  ],
});
