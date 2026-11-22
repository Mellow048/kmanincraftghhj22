import { cam, storyScene } from "../../engine";
import { GATE, Hero, MumChicken, SubscribeSign, WhiteEgg, timing } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Before It Hatches",
  shots: [
    {
      cue: "8.sub",
      ...cam.push({ on: [8.8, 5.88, -5.0], dist: 2.65, to: 2.25, yaw: 14, pitch: 8, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "CTA button in the rooftop nest: Hero holds up the Subscribe sign right beside the shaking cracked egg.",
      stage: () => (
        <>
          <MumChicken position={[8.38, GATE.roofTopY + 0.12, -5.02]} rotationY={0.65} lookAt={[8.75, 5.55, -5.32]} />
          <Hero position={[9.18, GATE.roofTopY + 0.12, -4.96]} rotationY={-0.15} mood="happy" armPitch={[-1.4, -0.3]} />
          <SubscribeSign position={[8.86, GATE.roofTopY + 1.02, -4.76]} rotationY={0.14} scale={0.42} />
          <WhiteEgg position={[8.72, GATE.roofTopY + 0.13, -5.32]} wobble={1.25} cracked />
        </>
      ),
    },
  ],
});
