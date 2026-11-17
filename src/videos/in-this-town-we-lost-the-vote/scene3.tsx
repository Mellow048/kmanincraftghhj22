import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bush, Cow, Crab, Flower, Gate, Glow, Golem, HOME, IceThrower, Letter, Mailbox, Mailboxes, NORTH, Neighbours, Penguin, PixelText, SOUTH, Stone, WEST, hop, pop, timing, tw, w } from "./kit";

/** 03 — Her best friend. He waited four years, went green, and got a letter. */
const G = HOME.golem.at;
const BOX = HOME.golem.box;
const Bird: React.FC<{ position: Vec3; t: number }> = ({ position, t }) => (
  <group position={position} rotation={[0, 0.6, 0]}>
    <Block position={[0, 0.07, 0]} size={[0.14, 0.12, 0.2]} color="#c8322a" castShadow={false} />
    <Block position={[0, 0.16 + Math.abs(Math.sin(t * 5)) * 0.01, 0.08]} size={[0.11, 0.1, 0.11]} color="#c8322a" castShadow={false} />
    <Block position={[0, 0.15, 0.15]} size={[0.04, 0.03, 0.05]} color="#f2c81e" castShadow={false} />
  </group>
);

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The letter",
  shots: [
    {
      cue: "3.friend",
      ...cam.push({ on: [0.35, 1.0, 2.9], dist: 4.7, to: 4.2, yaw: -26, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Before. A small bright orange golem with a big nose and a rod on his head, next to her. He presses the air, twice. On 'any button' he presses her nose. Her eyes go wide.",
      stage: (t) => {
        const a = w("3.friend", "Any");
        const air = Math.max(0, Math.sin((t - w("3.friend", "pressed")) * 9)) * (t > w("3.friend", "pressed") && t < a - 0.25 ? 1 : 0);
        const nose = tw(t, a - 0.15, a + 0.05);
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} />
            <Cow position={[-0.45, 0, 2.2]} rotationY={0.6} t={t} wide={nose > 0.5} look={-0.5} />
            <Golem position={[0.95, 0, 2.65]} rotationY={-1.0} t={t} press={Math.max(air * 0.8, nose)} />
          </>
        );
      },
    },
    {
      cue: "3.wait",
      ...cam.push({ on: [1.3, 1.05, 1.3], dist: 3.9, to: 3.3, yaw: -18, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He stands beside his mailbox looking at the flag. The shadows swing round him as the days go, and he turns from orange to green from the feet up, until a red bird lands on his head and he does not notice.",
      stage: (t, { dur }) => {
        const g = tw(t, 0.5, dur - 0.5);
        return (
          <>
            <Mailboxes />
            <Golem position={G} rotationY={0.25} t={t} green={g} look={0.5} />
            {g > 0.8 ? <Bird position={[G[0], 1.92 + (1 - pop(t, dur - 0.75, 0.2)) * 2, G[2]]} t={t} /> : null}
          </>
        );
      },
    },
    {
      cue: "3.thought",
      ...cam.push({ on: [0.75, 0.85, 1.6], dist: 5.0, to: 4.7, yaw: -10, pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "A green statue with a bird on it. She puts one of her flowers down at his feet, and bows her head. The stone one holds another flower. Nobody speaks.",
      stage: (t) => (
        <>
          <Mailboxes />
          <Golem position={G} rotationY={0.25} t={t} green={1} look={0.5} />
          <Bird position={[G[0], 1.92, G[2]]} t={t} />
          <Flower position={[G[0] - 0.1, 0, G[2] + 0.55]} scale={1.6 * pop(t, 0.25, 0.2)} />
          <Cow position={[-0.55, 0, 0.7]} rotationY={0.9} t={t} sad={0.9} flowers={2} />
          <Stone position={[1.75, 0, 2.35]} rotationY={-0.7} t={t}>
            <Flower position={[0, 0, 0]} scale={1.6} />
          </Stone>
        </>
      ),
    },
    {
      cue: "3.flag",
      ...cam.push({ on: [1.5, 1.3, 1.35], dist: 3.0, to: 2.7, yaw: -22, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Dawn. His flag snaps up, red. The bird takes off. In the green face two eyes open.",
      stage: (t) => {
        const up = tw(t, 0.12, 0.3);
        return (
          <>
            <Mailboxes skip={["golem"]} />
            <Mailbox position={BOX} side={1} tint={HOME.golem.tint} flag={up} letter />
            <Golem position={G} rotationY={0.25} t={t} green={up > 0.6 ? 0.85 : 1} look={0.5} />
            <Bird position={[G[0] + up * 1.5, 1.92 + up * up * 3, G[2]]} t={t} />
            <Glow position={[BOX[0], 1.5, BOX[2] + 0.3]} size={1.6} color="#ff6a5a" opacity={0.35 * up} />
          </>
        );
      },
    },
    {
      cue: "3.read",
      ...cam.push({ on: [G[0], 0.62, G[2] + 0.4], dist: 3.2, to: 2.9, yaw: 0, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "He holds the letter up in front of himself, so we read it before he does: YOU ARE IN. Over the top of the paper his eyes are open, and the green is running off him like water.",
      stage: (t, { dur }) => (
        <>
          <Mailboxes />
          <Golem position={G} rotationY={SOUTH} t={t} green={0.85 * (1 - tw(t, 0.5, dur))} nod={0.25} />
          <group position={[G[0], 0.72 + hop(t, 0.1, 0.1, 0.25), G[2] + 0.55]} scale={pop(t, 0.05, 0.2)}>
            <Block size={[1.25, 0.86, 0.03]} color="#f6f1e2" castShadow={false} />
            <PixelText text="YOU" position={[0, 0.2, 0.02]} height={0.26} color="#2a2a30" />
            <PixelText text="ARE IN" position={[0, -0.14, 0.02]} height={0.26} color="#2f9a3a" />
          </group>
        </>
      ),
    },
    {
      cue: "3.gate",
      ...cam.push({ on: [0, 1.15, 4.6], dist: 6.4, to: 5.9, yaw: 0, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Sunset. The whole street walks toward us down the path in one bunch: him in front, orange and shining, with the letter; her beside him; the hood, the bush, the stone one, the crab and the penguin behind.",
      stage: (t, { dur }) => {
        const d = (t / dur) * 1.4;
        return (
          <>
            <Mailboxes />
            <Golem position={[0.35, 0, 5.4 + d]} rotationY={SOUTH} t={t} walk={d}>
              <Letter position={[0, 0.1, 0.06]} scale={1.3} />
            </Golem>
            <Cow position={[-0.8, 0, 4.7 + d]} rotationY={SOUTH} t={t} walk={d} look={0.4} />
            <IceThrower position={[1.35, 0, 3.6 + d]} rotationY={SOUTH} t={t} walk={d} ice={0} />
            <Bush position={[-0.2, 0, 2.6 + d]} rotationY={SOUTH} t={t} />
            <Stone position={[0.75, 0, 2.9 + d]} rotationY={SOUTH} t={t} />
            <Crab position={[-1.3, 0, 2.4 + d]} rotationY={SOUTH} t={t} wave={1} />
            <Penguin position={[1.55, 0, 1.9 + d]} rotationY={SOUTH} t={t} flap={0.6} />
          </>
        );
      },
    },
    {
      cue: "3.button",
      ...cam.push({ on: [2.45, 1.0, 7.6], dist: 3.3, to: 3.0, yaw: -74, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The post by the gate, from the side: a grey button, and his copper arm coming up to it. He presses it. It goes orange. He has waited four years to press this one.",
      stage: (t) => {
        const p = tw(t, w("3.button", "pressed") - 0.2, w("3.button", "pressed") + 0.05);
        return (
          <>
            <Gate press={p} open={tw(t, w("3.button", "pressed") + 0.1, w("3.button", "pressed") + 0.7)} glow />
            <Golem position={[2.5, 0, 7.18]} rotationY={SOUTH} t={t} press={p} />
          </>
        );
      },
    },
    {
      cue: "3.dot",
      ...cam.push({ on: [0, 1.1, 12], dist: 7.2, to: 7.0, yaw: 180, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Through the open gate, the road going away into the evening. He walks backwards down it, waving, getting smaller. In the gateway her back and the others', not moving.",
      stage: (t, { dur }) => {
        const k = t / dur;
        return (
          <>
            <Gate open={1} press={1} glow />
            <Golem position={[0, 0, 12 + k * k * 22]} rotationY={NORTH} t={t} wave={1} walk={k * 8} />
            <Cow position={[-0.55, 0, 7.5]} rotationY={SOUTH} t={t} nod={-0.1} />
            <Stone position={[0.75, 0, 7.3]} rotationY={SOUTH} t={t} />
            <Crab position={[0.1, 0, 7.9]} rotationY={SOUTH} t={t} wave={1} />
          </>
        );
      },
    },
    {
      cue: "3.can",
      ...cam.push({ on: [0, 1.05, 3.0], dist: 3.5, to: 3.1, yaw: 10, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her, next morning, eyes wide, a letter popping up over her head like an idea. Behind her, up the street, every head turns to look at her.",
      stage: (t) => {
        const told = tw(t, w("3.can", "told") - 0.1, w("3.can", "told") + 0.2);
        return (
          <>
            <Mailboxes />
            <Neighbours t={t} turn={0} />
            <Cow position={[0, hop(t, w("3.can", "can") - 0.1, 0.16, 0.25), 2.5]} rotationY={SOUTH} t={t} wide look={-0.25 + 0.5 * told} />
            <Letter position={[0.45, 2.15, 2.9]} scale={1.5 * pop(t, w("3.can", "can") - 0.15, 0.2)} rotation={[0, 0, 0.15]} />
          </>
        );
      },
    },
  ],
});
