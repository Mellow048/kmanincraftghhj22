import { cam, storyScene } from "../../engine";
import { A, Card, Classmate, Hero, Mum, NORTH, SPOT, Toast, timing, fit } from "./kit";

/**
 * THE WAIT AND THE REVEAL. Nine shots, the longest beat after the rule.
 *
 * The card in his mum's hand re-reads everything: every lie in the building was about the same Sunday, and
 * every one of them was kindness. Then the last plant pays: he could never smell his own.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The card",
  shots: [
    {
      cue: "12.mum",
      ...cam.push(fit({ on: SPOT.at(2.2, 1.45, -2.2), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-night",
      note: "His mum in the classroom doorway, in her coat, holding a card. She came to school on his birthday.",
      stage: () => (
        <>
          <Mum position={SPOT.at(2.4, 0, -2.4)} rotationY={Math.PI * 0.95} animation="idle" face="sad" />
          <Card position={SPOT.at(2.3, 1.05, -2.0)} rotation={[-0.5, 0.3, 0]} text="SORRY" written={5} />
        </>
      ),
    },
    {
      cue: "12.read",
      ...cam.push(fit({ on: SPOT.at(2.2, 1.1, -2.0), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-night",
      note: "The card, close enough to read. One word on it, and the word is the whole story.",
      stage: () => <Card position={SPOT.at(2.25, 1.12, -2.05)} rotation={[-0.4, 0.25, 0]} text="SORRY" written={5} scale={1.4} />,
    },
    {
      cue: "12.room",
      ...cam.push(fit({ on: SPOT.at(0, 1.15, 0.2), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "class",
      look: "overworld-night",
      note: "The whole room, thick with smoke, and everybody in it looking at the card and not at him.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="idle" face="fear" />
          <Mum position={SPOT.at(2.4, 0, -2.4)} rotationY={Math.PI * 0.95} animation="idle" face="sad" />
          <Toast at={SPOT.at(2.4, 0, -2.4)} n={10} seed={2} />
          {[[-1.6, -0.2], [0.6, -0.6]].map(([x, z], i) => (
            <Classmate key={i} who={i + 3} position={SPOT.at(x, 0, z)} rotationY={Math.PI} animation="idle" face="sad" />
          ))}
        </>
      ),
    },
    {
      cue: "13.all",
      ...cam.push(fit({ on: SPOT.at(-0.8, 1.4, 0.2), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-night",
      note: "Two of them, saying it to him gently: they all knew, they had known for weeks.",
      stage: () => (
        <>
          <Classmate who={4} position={SPOT.at(-1.2, 0, 0.0)} rotationY={Math.PI} animation="talk" face="sad" />
          <Classmate who={8} position={SPOT.at(0.4, 0, -0.3)} rotationY={Math.PI} animation="idle" face="sad" />
          <Toast at={SPOT.at(-1.2, 0, 0.0)} n={7} seed={5} />
        </>
      ),
    },
    {
      cue: "13.back",
      ...cam.push(fit({ on: SPOT.at(0, 1.15, 0.7), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-night",
      note: "Back on him, standing on the chair, with the smoke of twenty-eight kindnesses around him.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="idle" face="ouch" />
          <Toast at={SPOT.at(-1.4, 0, 0.2)} n={8} seed={7} />
          <Toast at={SPOT.at(1.4, 0, 0.2)} n={8} seed={4} />
        </>
      ),
    },
    {
      cue: "13.not",
      ...cam.push(fit({ on: SPOT.at(2.1, 1.1, -2.1), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-night",
      note: "His mum, still in the door, still holding it. Nobody was lying to hurt him.",
      stage: () => <Mum position={SPOT.at(2.4, 0, -2.4)} rotationY={Math.PI * 0.95} animation="talk" face="sad" />,
    },
    {
      cue: "13.mine",
      ...cam.push(fit({ on: A("kitchen", -0.9, 1.0, 0.3), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "kitchen",
      look: "overworld-night",
      note: "The mirror again, the same frame as the limit in act one. Nothing off his own mouth, ever.",
      stage: () => <Hero position={A("kitchen", -0.9, 0, 0.3)} rotationY={0} animation="idle" face="ouch" />,
    },
    {
      cue: "13.mum",
      ...cam.push(fit({ on: A("kitchen", 0.4, 1.45, -1.8), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "kitchen",
      look: "overworld-night",
      note: "Her, in the kitchen, saying I am fine again — and for the first time he hears what it costs.",
      stage: () => <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0} animation="idle" face="calm" />,
    },
    {
      cue: "13.det",
      ...cam.push(fit({ on: SPOT.at(0, 1.5, 0.9), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-night",
      note: "His face, the penny dropping: it was never a lie detector.",
      stage: () => <Hero position={SPOT.at(0, 0.46, 0.9)} rotationY={0} animation="idle" face="wow" />,
    },
  ],
});
