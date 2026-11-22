import { cam, storyScene } from "../../engine";
import { GATE, Hero, MumChicken, SubscribeSign, WhiteEgg, timing } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Before It Hatches",
  shots: [
    {
      cue: "8.sub",
      ...cam.push({ on: [8.8, 5.78, -5.05], dist: 2.1, to: 1.65, yaw: 16, pitch: 10, fov: 40 }),
      look: "overworld-night",
      zone: "village",
      note: "CTA button in the rooftop nest: Hero holds up the Subscribe sign right next to the shaking cracked egg.",
      stage: () => (
        <>
          <MumChicken position={[8.42, GATE.roofTopY + 0.12, -5.02]} rotationY={0.65} lookAt={[8.75, 5.55, -5.32]} />
          <Hero position={[9.12, GATE.roofTopY + 0.12, -4.96]} rotationY={-0.15} mood="happy" armPitch={[-1.4, -0.3]} />
          <SubscribeSign position={[8.96, GATE.roofTopY + 0.85, -4.62]} rotationY={0.18} scale={0.62} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} wobble={1.25} cracked />
        </>
      ),
    },
  ],
});
