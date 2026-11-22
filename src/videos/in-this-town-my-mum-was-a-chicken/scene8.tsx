import { cam, storyScene } from "../../engine";
import { GATE, Hero, MumChicken, SubscribeSign, WhiteEgg, timing } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Before It Hatches",
  shots: [
    {
      cue: "8.sub",
      ...cam.push({ on: [8.82, 5.78, -5.12], dist: 1.85, to: 1.48, yaw: 12, pitch: 8, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "CTA button in the rooftop nest: Hero holds up the Subscribe sign right next to the shaking cracked egg.",
      stage: () => (
        <>
          <MumChicken position={[8.45, GATE.roofTopY + 0.12, -5.02]} rotationY={0.65} lookAt={[8.75, 5.55, -5.32]} />
          <Hero position={[9.08, GATE.roofTopY + 0.12, -4.96]} rotationY={-0.15} mood="happy" armPitch={[-1.4, -0.3]} />
          <SubscribeSign position={[8.94, GATE.roofTopY + 0.78, -4.68]} rotationY={0.18} scale={0.62} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} wobble={1.25} cracked />
        </>
      ),
    },
  ],
});
