import { cam, storyScene } from "../../engine";
import { Boss, Car, Hero, Pal, PLACE, SubscribeSign, Wrench, timing } from "./kit";

const SHOP: [number, number, number] = [PLACE.shop[0], 0, PLACE.shop[2] + 1.2];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The friends come back",
  shots: [
    {
      cue: "6.hood",
      note: "The hood comes down. His hand is already going for the key.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Car position={SHOP} hood={0.2} color="#3d6ad4" />
          <Hero position={[SHOP[0] + 0.95, 0, SHOP[2] + 1.2]} rotationY={-0.45} face="calm" animation="reach" />
        </>
      ),
      ...cam.push({ on: [SHOP[0] + 0.3, 1.1, SHOP[2] + 0.5], dist: 4.2, to: 3.5, yaw: 48, pitch: 12, fov: 38 }),
    },
    {
      cue: "6.blink",
      note: "It starts. The owner just blinks. The car is the proof.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} running={1} light={1} color="#3d6ad4" />
          <Pal shirt="#c9a227" position={[SHOP[0] + 1.5, 0, SHOP[2] + 2.4]} rotationY={Math.PI} face="wow" animation="idle" />
        </>
      ),
      ...cam.push({ on: [SHOP[0] + 0.6, 1.15, SHOP[2] + 1.2], dist: 4.8, to: 4.0, yaw: 36, pitch: 10, fov: 40 }),
    },
    {
      cue: "6.boss",
      note: "The boss, close, looking over. Nothing left to fix.",
      zone: "village",
      stage: () => <Boss position={[0, 0, 0]} rotationY={0.08} face="calm" animation="idle" />,
      ...cam.push({ on: [0, 1.5, 0], dist: 2.7, to: 2.3, yaw: 10, pitch: 4, fov: 32 }),
    },
    {
      cue: "7.push",
      note: "Night. Three of them in party clothes, pushing a dead car.",
      zone: "village",
      look: "overworld-night",
      stage: () => (
        <>
          <Car position={[0, 0, 0.6]} color="#d23b6e" />
          <Pal shirt="#d23b6e" position={[-0.7, 0, -1.1]} rotationY={0.15} face="uneasy" animation="push" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0.7, 0, -1.15]} rotationY={-0.1} face="worried" animation="push" />
          <Pal shirt="#2f9a62" position={[0, 0, -1.8]} rotationY={0.05} face="uneasy" animation="push" />
        </>
      ),
      ...cam.push({ on: [0, 1.05, -0.2], dist: 5.6, to: 4.6, yaw: 24, pitch: 12, fov: 42 }),
    },
    {
      cue: "7.dress",
      note: "Still dressed for the party. The clothes are the joke.",
      zone: "village",
      stage: () => (
        <>
          <Pal shirt="#d23b6e" position={[-0.6, 0, 0]} rotationY={0.2} face="uneasy" animation="walk" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0.7, 0, 0.15]} rotationY={-0.15} face="worried" animation="walk" />
        </>
      ),
      ...cam.push({ on: [0.05, 1.25, 0.05], dist: 3.8, to: 3.1, yaw: 12, pitch: 6, fov: 36 }),
    },
    {
      cue: "7.stop",
      note: "The dead car stops at his feet. He is already there.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#d23b6e" />
          <Hero position={[SHOP[0] + 0.3, 0, SHOP[2] + 2.5]} rotationY={Math.PI} face="calm" animation="idle" />
        </>
      ),
      ...cam.push({ on: [SHOP[0], 1.0, SHOP[2] + 1.2], dist: 5.2, to: 4.3, yaw: 30, pitch: 12, fov: 40 }),
    },
    {
      cue: "7.wait",
      note: "Her face. Wait. Is that him.",
      zone: "village",
      stage: () => <Pal shirt="#d23b6e" position={[0, 0, 0]} rotationY={0.05} face="wow" animation="idle" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.5, to: 2.15, yaw: 8, pitch: 2, fov: 30 }),
    },
    {
      cue: "7.how",
      note: "The question, close. How did you get so good.",
      zone: "village",
      stage: () => <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0, 0, 0]} rotationY={0} face="surprised" animation="talk" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.5, to: 2.15, yaw: -8, pitch: 2, fov: 30 }),
    },
    {
      cue: "7.train",
      note: "Training. He does not smile. The face is the whole answer.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.02} face="calm" animation="idle" />,
      ...cam.push({ on: [0, 1.42, 0], dist: 2.4, to: 2.1, yaw: 4, pitch: 1, fov: 28 }),
    },
    {
      cue: "7.quiet",
      note: "The car, and nothing else. One second of a dead engine.",
      zone: "village",
      stage: () => <Car position={SHOP} color="#d23b6e" />,
      ...cam.push({ on: [SHOP[0], 0.9, SHOP[2] + 0.3], dist: 4.4, to: 3.7, yaw: 16, pitch: 10, fov: 38 }),
    },
    {
      cue: "7.up",
      note: "He looks up and the wrench comes up with him.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0, 0, 0]} rotationY={0.08} face="grin" animation="reachUp" />
          <Wrench position={[0.55, 1.65, 0.25]} spin={3} />
        </>
      ),
      ...cam.push({ on: [0.15, 1.45, 0.05], dist: 2.7, to: 2.3, yaw: 14, pitch: -4, fov: 32 }),
    },
    {
      cue: "7.hus",
      note: "The last chant, faster than the hook. The wrench is a blur again.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} color="#d23b6e" />
          <Hero position={[SHOP[0] + 0.2, 0, SHOP[2] + 1.25]} rotationY={0.4} face="grin" animation="reach" />
          <Wrench position={[SHOP[0] + 0.75, 1.4, SHOP[2] + 0.8]} spin={28} />
          <Pal shirt="#d23b6e" position={[SHOP[0] - 1.6, 0, SHOP[2] + 1.8]} rotationY={0.6} face="wow" animation="idle" />
        </>
      ),
      ...cam.push({ on: [SHOP[0] + 0.2, 1.2, SHOP[2] + 0.5], dist: 3.8, to: 3.1, yaw: 34, pitch: 10, fov: 38 }),
    },
    {
      cue: "7.catch",
      note: "It catches before they let go. Their hands are still on the bumper.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} running={1} light={1} color="#d23b6e" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[SHOP[0] - 0.7, 0, SHOP[2] - 1.55]} rotationY={0.15} face="surprised" animation="scared" />
          <Pal shirt="#2f9a62" position={[SHOP[0] + 0.65, 0, SHOP[2] - 1.6]} rotationY={-0.1} face="wow" animation="scared" />
        </>
      ),
      ...cam.push({ on: [SHOP[0], 1.0, SHOP[2] - 0.8], dist: 4.6, to: 3.8, yaw: 160, pitch: 10, fov: 38 }),
    },
    {
      cue: "7.end",
      note: "He faces the lens. The subscribe sign is with him, not instead of him.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Hero position={[0, 0, 0]} rotationY={0} face="smile" animation="wave" />
          <SubscribeSign position={[1.15, 1.7, 0.35]} rotationY={-0.3} scale={0.42} />
        </>
      ),
      ...cam.push({ on: [0.15, 1.4, 0.1], dist: 3.0, to: 2.55, yaw: -6, pitch: 4, fov: 34 }),
    },
  ],
});
