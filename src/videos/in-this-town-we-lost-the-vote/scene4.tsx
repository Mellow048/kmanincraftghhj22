import { cam, storyScene } from "../../engine";
import { Block, Cow, Flower, Gate, HOME, Letter, Mailbox, Mailboxes, NORTH, Neighbours, SOUTH, WEST, pop, timing, tw, w } from "./kit";

/** 04 — She tries to look real. Nothing comes. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Looking real",
  shots: [
    {
      cue: "4.tried",
      ...cam.push({ on: [0, 1.0, 2.9], dist: 3.9, to: 3.5, yaw: -8, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her, standing very straight, with a card hung under her chin that says REAL. She holds the pose. One ear twitches.",
      stage: (t) => (
        <>
          <Mailboxes />
          <Neighbours t={t} />
          <Cow position={[0, 0, 2.5]} rotationY={SOUTH} t={t} sign={t > w("4.tried", "tried") - 0.1 ? "REAL" : undefined} wide tilt={0.1 * Math.sin(tw(t, 1.0, 1.6) * Math.PI)} />
        </>
      ),
    },
    {
      cue: "4.flowers",
      ...cam.push({ on: [0, 1.3, -2.6], dist: 9.4, to: 8.8, yaw: -4, pitch: 13, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The street. Buttercups pop out of everything in a wave going away from her: every mailbox, the bush, the block of ice, the barrel. The bush is furious.",
      stage: (t) => {
        const f = (i: number) => pop(t, 0.15 + i * 0.12, 0.2);
        return (
          <>
            <Mailboxes flowers={f} />
            <Neighbours t={t} flower={f} />
            <Flower position={[HOME.ice.at[0], 2.75, HOME.ice.at[2]]} scale={1.6 * f(2)} />
            <Flower position={[HOME.hide.at[0], 0.9, HOME.hide.at[2]]} scale={1.6 * f(4)} />
            <Flower position={[-0.9, 0, 1.2]} scale={1.5 * f(0)} />
            <Flower position={[0.8, 0, 0.2]} scale={1.5 * f(1)} />
            <Flower position={[-0.5, 0, -2.4]} scale={1.5 * f(3)} />
            <Flower position={[0.4, 0, -5.4]} scale={1.5 * f(5)} />
            <Cow position={[0.3, 0, 0.9]} rotationY={SOUTH + 0.3} t={t} look={-0.3} />
          </>
        );
      },
    },
    {
      cue: "4.useful",
      ...cam.push({ on: [0.75, 1.1, 7.5], dist: 4.6, to: 4.2, yaw: 168, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Evening. She stands guard beside the shut gate, facing the town, as stiff as a post, with a bucket on her head for a helmet. Nothing is coming. She looks left. She looks right.",
      stage: (t) => (
        <>
          <Gate />
          <Cow position={[0.75, 0, 7.5]} rotationY={NORTH} t={t} wide look={0.7 * Math.sin(tw(t, 0.5, 1.6) * Math.PI * 2)}>
            <Block position={[0, 0.5, 0.2]} size={[0.5, 0.36, 0.44]} color="#9a9a9a" />
            <Block position={[0, 0.34, 0.2]} size={[0.54, 0.05, 0.48]} color="#6d6d72" castShadow={false} />
          </Cow>
        </>
      ),
    },
    {
      cue: "4.wrote",
      ...cam.push({ on: [0, 0.35, 3.5], dist: 3.5, to: 3.1, yaw: 0, pitch: 38, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "From above: a sheet of paper on the path, blank, and her front hoof held over it. On 'hoof print' the hoof comes down. It is lifted. That is the letter: one brown hoof print.",
      stage: (t) => {
        const h = w("4.wrote", "hoof");
        const down = tw(t, h - 0.3, h - 0.1) * (1 - tw(t, h + 0.15, h + 0.4));
        return (
          <>
            <Cow position={[0, 0, 2.3]} rotationY={SOUTH} t={t} nod={0.55} />
            <Letter position={[0, 0.03, 3.75]} rotation={[-Math.PI / 2, 0, 0]} scale={3.6} hoof={t > h - 0.1} text={t > h - 0.1 ? undefined : " "} />
            <group position={[0.25, 0.3 * (1 - down), 3.75]}>
              <Block position={[0, 0.4, 0]} size={[0.22, 0.7, 0.22]} color="#f2c81e" />
              <Block position={[0, 0.04, 0]} size={[0.23, 0.08, 0.23]} color="#6b4a2a" castShadow={false} />
            </group>
          </>
        );
      },
    },
    {
      cue: "4.nothing",
      ...cam.push({ on: [-1.5, 1.2, 3.4], dist: 3.1, to: 3.0, yaw: -15, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Her mailbox. The flag is down. Her nose is in the door. A leaf blows out of it.",
      stage: (t) => (
        <>
          <Mailboxes skip={["cow"]} />
          <Mailbox position={HOME.cow.box} side={-1} tint={HOME.cow.tint} flower={1} />
          <Cow position={[-0.3, 0, 3.4]} rotationY={WEST} t={t} sad={0.7} nod={0.15} />
          <Block position={[-1.5 + t * 0.9, 1.1 - t * 0.5, 3.2 - t * 0.4]} rotation={[t * 6, t * 4, 0]} size={[0.1, 0.02, 0.07]} color="#7a9a3a" castShadow={false} />
        </>
      ),
    },
  ],
});
