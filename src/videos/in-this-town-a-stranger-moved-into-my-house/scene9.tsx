import { cam, storyScene } from "../../engine";
import { BedBox, Bubble, Fill, Green, Lying, Me, MyRoom, NORTH, PLACE, SOUTH, Stranger, SubscribeSign, Town, pop, timing, tw, w } from "./kit";
import { NOW } from "./scene1";
import { Crew } from "./scene5";

/** 09 — This morning he came back with a boat, and somebody very green in it. */
const RAIDED = { ...NOW, arrows: true };
const BED = PLACE.bed;

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Half my floor",
  shots: [
    {
      cue: "9.back",
      ...cam.push({ on: [0, 1.0, 10.6], dist: 7.6, to: 6.8, yaw: 180, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Morning, from inside the gate. A boat comes in through it over the grass, the stranger rowing, somebody sitting in the front.",
      stage: (t, { dur }) => <><Town {...RAIDED} /><Crew t={t} position={[0, 0, 15 - (t / dur) * 4.6]} rotationY={NORTH} green /></>,
    },
    {
      cue: "9.in",
      ...cam.push({ on: [0, 1.05, 5.4], dist: 4.2, to: 3.5, yaw: 186, pitch: 5, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "The one in the front of the boat, close. The face, the eyebrow, the nose: green. He looks left, and right, and at us, chewing nothing.",
      stage: (t) => <><Town {...RAIDED} /><Crew t={t} position={[0, 0, 5.8]} rotationY={NORTH} green still turn={t < 0.6 ? 0.7 : t < 1.2 ? -0.7 : 0} /></>,
    },
    {
      cue: "9.knock",
      ...cam.push({ on: [-0.1, 1.1, -0.9], dist: 5.6, to: 5.1, yaw: 6, pitch: 11, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "The teller's room. The green one walks in through the hole where the door was, over the door, and stops in the middle of the floor. The teller watches him do it.",
      stage: (t, { dur }) => {
        const k = tw(t, 0, dur * 0.85);
        return (
          <>
            <MyRoom door="flat" desk={1} torches={4} />
            <Green position={[-0.6 + 0.5 * k, 0, -2.6 + 2.0 * k]} rotationY={SOUTH} walk={k * 2} k={0.15} />
            <Me position={[0.95, 0, 0.2]} rotationY={-1.9} lookAt={[-0.6 + 0.5 * k, 1.5, -2.6 + 2.0 * k]} />
          </>
        );
      },
    },
    {
      cue: "9.floor",
      ...cam.push({ on: [0.4, 1.4, -0.2], dist: 4.8, to: 4.4, yaw: 0, pitch: 5, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "The two of them face to face in the room, one white, one green. The teller says the only thing there is to say: HMM.",
      stage: (t) => {
        const say = w("9.floor", "hmm") - 0.1;
        return (
          <>
            <MyRoom door="flat" desk={1} torches={4} />
            <Green position={[-0.15, 0, -0.5]} rotationY={1.2} k={0.15} />
            <Me position={[0.95, 0, -0.1]} rotationY={-1.4} hmm={t > say ? 1 : 0} />
            <Bubble text="HMM" position={[0.95, 2.25, 0]} scale={0.5 * pop(t, say, 0.14)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "9.floor",
      cut: w("9.floor", "Then") - 0.06,
      ...cam.push({ on: [0.55, 0.2, BED[2] + 0.1], dist: 5.0, to: 4.5, yaw: 0, pitch: 60, fov: 46 }),
      zone: "room",
      look: "overworld-night",
      note: "Night, from above. The pale mark where the bed was, and two villagers lying on their backs on the bare boards, side by side, one on the mark and one beside it.",
      stage: (t) => (
        <>
          <MyRoom door="flat" night desk={1} torches={3} />
          <Lying position={[BED[0], 0.16, BED[2] + 0.95]}>
            <Green position={[0, 0, 0]} k={0.15} nod={Math.sin(t * 2) * 0.03} />
          </Lying>
          <Lying position={[BED[0] - 1.15, 0.16, BED[2] + 0.95]}>
            <Me position={[0, 0, 0]} turn={-0.5 * tw(t, 0.4, 0.9)} />
          </Lying>
        </>
      ),
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [0.55, 1.15, 4.4], dist: 6.6, to: 5.4, yaw: 0, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-night",
      note: "The first picture again, outside and at night: the bed, in the middle of the square in a ring of torches, with the stranger asleep in it with his boots on. The teller stands beside it and looks at us. Over the bed, the sign.",
      stage: (t) => (
        <>
          <Town {...RAIDED} light />
          <Fill at={[0.5, 4, 8]} power={40} reach={14} color="#c9d0ff" />
          <BedBox position={[1.15, 0, 4.2]} />
          <Stranger position={[1.15, 0.56 + Math.sin(t * 3) * 0.015, 4.35]} rotationY={SOUTH} animation="sleep" face="sleepy" time={t} />
          <Me position={[0.05, 0, 5.0]} rotationY={SOUTH} turn={t < 0.5 ? 0.9 : 0} nod={t < 0.5 ? 0.25 : 0} />
          <Bubble text="Z" position={[1.0, 1.3 + ((t * 0.3) % 0.5), 3.7]} scale={0.45} tail={-1} tilt={0.15} />
          <SubscribeSign position={[0.5, 2.75 + Math.sin(t * 8) * 0.06, 4.2]} scale={0.9 * pop(t, w("9.sub", "subscribe") - 0.2, 0.2)} tilt={Math.sin(t * 5) * 0.05} />
        </>
      ),
    },
  ],
});
