import { storyScene } from "../../engine";
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
          <Car position={SHOP} hood={0.15} color="#3d6ad4" />
          <Hero position={[SHOP[0] + 0.8, 0, SHOP[2] + 1.5]} rotationY={-0.4} face="calm" animation="reach" />
        </>
      ),
      from: [SHOP[0] + 2.2, 1.6, SHOP[2] + 2.6],
      to: [SHOP[0] + 1.4, 1.4, SHOP[2] + 2],
      target: [SHOP[0], 1, SHOP[2] + 0.8],
      fov: 36,
    },
    {
      cue: "6.blink",
      note: "It starts. The owner just blinks. The car is the proof.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} running={1} light={1} color="#3d6ad4" />
          <Pal shirt="#c9a227" position={[SHOP[0] + 1.6, 0, SHOP[2] + 2.6]} rotationY={Math.PI} face="wow" animation="idle" />
        </>
      ),
      from: [SHOP[0] + 2.6, 1.5, SHOP[2] + 4],
      to: [SHOP[0] + 2, 1.4, SHOP[2] + 3.4],
      target: [SHOP[0] + 1.4, 1.3, SHOP[2] + 2.2],
      fov: 34,
    },
    {
      cue: "6.boss",
      note: "The boss, close, looking over. Nothing left to fix.",
      zone: "village",
      stage: () => <Boss position={[0, 0, 0]} rotationY={0.2} face="calm" animation="idle" />,
      from: [0.7, 1.6, 2.6],
      to: [0.3, 1.55, 2.1],
      target: [0, 1.5, 0],
      fov: 32,
    },
    {
      cue: "7.push",
      note: "Night. Three of them in party clothes, pushing a dead car.",
      zone: "village",
      look: "overworld-night",
      stage: () => (
        <>
          <Car position={[-1, 0, 1]} color="#d23b6e" />
          <Pal shirt="#d23b6e" position={[-1.7, 0, -0.7]} rotationY={0.2} face="uneasy" animation="push" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[-0.3, 0, -0.8]} rotationY={0.1} face="worried" animation="push" />
          <Pal shirt="#2f9a62" position={[-1, 0, -1.5]} rotationY={0.15} face="uneasy" animation="push" />
        </>
      ),
      from: [2.4, 1.7, 3.4],
      to: [0.6, 1.5, 2.4],
      target: [-1, 1, 0.2],
      fov: 40,
    },
    {
      cue: "7.dress",
      note: "Still dressed for the party. The clothes are the joke.",
      zone: "village",
      stage: () => (
        <>
          <Pal shirt="#d23b6e" position={[-0.7, 0, 0]} rotationY={0.3} face="uneasy" animation="walk" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0.6, 0, 0.2]} rotationY={-0.2} face="worried" animation="walk" />
        </>
      ),
      from: [1.6, 1.5, 2.8],
      to: [0.4, 1.4, 2.2],
      target: [0, 1.2, 0.1],
      fov: 36,
    },
    {
      cue: "7.stop",
      note: "The dead car stops at his feet. He is already there.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} color="#d23b6e" />
          <Hero position={[SHOP[0] + 0.2, 0, SHOP[2] + 2.4]} rotationY={Math.PI} face="calm" animation="idle" />
        </>
      ),
      from: [SHOP[0] + 2, 1.5, SHOP[2] + 4.2],
      to: [SHOP[0] + 0.8, 1.3, SHOP[2] + 3.4],
      target: [SHOP[0], 0.8, SHOP[2] + 1],
      fov: 38,
    },
    {
      cue: "7.wait",
      note: "Her face. Wait. Is that him.",
      zone: "village",
      stage: () => <Pal shirt="#d23b6e" position={[0, 0, 0]} rotationY={0.1} face="wow" animation="idle" />,
      from: [0.5, 1.45, 2.3],
      to: [0.15, 1.4, 1.9],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "7.how",
      note: "The question, close. How did you get so good.",
      zone: "village",
      stage: () => <Pal shirt="#3d6ad4" hair="#1d1a18" position={[0, 0, 0]} rotationY={0} face="surprised" animation="talk" />,
      from: [-0.4, 1.4, 2.2],
      to: [-0.1, 1.35, 1.8],
      target: [0, 1.4, 0],
      fov: 30,
    },
    {
      cue: "7.train",
      note: "Training. He does not smile. The face is the whole answer.",
      zone: "village",
      stage: () => <Hero position={[0, 0, 0]} rotationY={0.05} face="calm" animation="idle" />,
      from: [0.2, 1.45, 2.2],
      to: [0, 1.4, 1.8],
      target: [0, 1.4, 0],
      fov: 28,
    },
    {
      cue: "7.quiet",
      note: "The car, and nothing else. One second of a dead engine.",
      zone: "village",
      stage: () => <Car position={SHOP} color="#d23b6e" />,
      from: [SHOP[0] + 1.4, 1.3, SHOP[2] + 2.8],
      to: [SHOP[0] + 0.6, 1.15, SHOP[2] + 2.2],
      target: [SHOP[0], 0.8, SHOP[2] + 0.4],
      fov: 34,
    },
    {
      cue: "7.up",
      note: "He looks up and the wrench comes up with him.",
      zone: "village",
      stage: () => (
        <>
          <Hero position={[0, 0, 0]} rotationY={0.1} face="grin" animation="reachUp" />
          <Wrench position={[0.25, 1.7, 0.3]} spin={2} />
        </>
      ),
      from: [0.7, 1.2, 2.2],
      to: [0.3, 1.45, 1.8],
      target: [0.1, 1.5, 0.1],
      fov: 30,
    },
    {
      cue: "7.hus",
      note: "The last chant, faster than the hook. The wrench is a blur again.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} hood={1} color="#d23b6e" />
          <Hero position={[SHOP[0] + 0.4, 0, SHOP[2] + 1.5]} rotationY={Math.PI} face="grin" animation="reach" />
          <Wrench position={[SHOP[0], 1.3, SHOP[2] + 1]} spin={28} />
          <Pal shirt="#d23b6e" position={[SHOP[0] - 1.4, 0, SHOP[2] - 1.4]} rotationY={0.4} face="wow" animation="idle" />
        </>
      ),
      from: [SHOP[0] + 1.4, 1.4, SHOP[2] + 2.6],
      to: [SHOP[0] + 0.5, 1.3, SHOP[2] + 2.1],
      target: [SHOP[0], 1.15, SHOP[2] + 0.6],
      fov: 36,
    },
    {
      cue: "7.catch",
      note: "It catches before they let go. Their hands are still on the bumper.",
      zone: "village",
      stage: () => (
        <>
          <Car position={SHOP} running={1} light={1} color="#d23b6e" />
          <Pal shirt="#3d6ad4" hair="#1d1a18" position={[SHOP[0] - 0.7, 0, SHOP[2] - 1.7]} rotationY={0.2} face="surprised" animation="scared" />
          <Pal shirt="#2f9a62" position={[SHOP[0] + 0.5, 0, SHOP[2] - 1.8]} rotationY={-0.1} face="wow" animation="scared" />
        </>
      ),
      from: [SHOP[0] + 1.6, 1.4, SHOP[2] - 3.2],
      to: [SHOP[0] + 0.6, 1.3, SHOP[2] - 2.6],
      target: [SHOP[0], 0.9, SHOP[2] - 1],
      fov: 36,
    },
    {
      cue: "7.end",
      note: "He faces the lens. The subscribe sign is with him, not instead of him.",
      zone: "village",
      look: "overworld-day",
      stage: () => (
        <>
          <Hero position={[0, 0, 0.4]} rotationY={0} face="smile" animation="wave" />
          <SubscribeSign position={[0, 1.7, 1.1]} scale={0.5} />
        </>
      ),
      from: [0.3, 1.6, 3],
      to: [0, 1.55, 2.5],
      target: [0, 1.4, 0.6],
      fov: 34,
    },
  ],
});
