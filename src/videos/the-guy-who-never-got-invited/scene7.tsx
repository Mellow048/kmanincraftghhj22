import { Block, Sign, cam } from "../../engine";
import { Glow } from "../../engine";
import { Him, Mug, Poster, Record, Speaker, Turntable, stagedScene } from "./kit";

const DECKS: [number, number, number] = [-1.86, 0.9, 0.05];

/** The label he writes on every record: the tempo it is, in beats per minute. */
const Label: React.FC<{ position: [number, number, number]; rotationY?: number }> = ({ position, rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block size={[0.3, 0.01, 0.3]} color="#e7e2d4" />
    <Block position={[0, 0.008, 0]} size={[0.18, 0.004, 0.03]} color="#2b2f36" />
    <Block position={[0, 0.008, 0.04]} size={[0.12, 0.004, 0.03]} color="#2b2f36" />
    <Block position={[0.16, 0.02, 0.08]} size={[0.02, 0.02, 0.16]} color="#c8a24a" rotation={[0, 0.5, 0]} />
  </group>
);

/**
 * BEAT 7 — PRACTICE. Twenty seconds, twelve shots, one sound each.
 *
 * The montage is the film's engine: the same two hands, night after night, with the window going from
 * dark to dawn behind him. No dialogue, no captions. It has to feel like it cost him something.
 */
export const scene7 = stagedScene("scene7", [
  {
    id: "7.try1",
    ...cam.push({ on: DECKS, dist: 1.6, to: 1.25, fov: 32, pitch: 24, yaw: -16 }),
    zone: "bedroom",
    look: "warm-room",
    note: "One hand, one record, the needle down on the first beat: the first try, and it is wrong.",
    stage: () => (
      <>
        <Turntable position={DECKS} spin={4.4} arm={1} />
        <Him position={[-1.55, 0, 0.55]} rotationY={1.1} animation="reach" face="calm" headphones="ears" />
      </>
    ),
  },
  {
    id: "7.try2",
    ...cam.push({ on: DECKS, dist: 1.5, to: 1.15, fov: 30, pitch: 30, yaw: 24 }),
    zone: "bedroom",
    look: "warm-room",
    note: "The same try again, a hand's width closer: the hands are shaking and the record does not care.",
    stage: () => (
      <>
        <Turntable position={DECKS} spin={4.4} arm={1} />
        <Him position={[-1.55, 0, 0.55]} rotationY={1.1} animation="reach" face="uneasy" headphones="ears" />
      </>
    ),
  },
  {
    id: "7.label",
    ...cam.push({ on: [-1.5, 0.92, 0.55], dist: 1.5, to: 1.2, fov: 34, pitch: 34, yaw: 12 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Writing 84 on a label: he is not learning to play, he is building a system.",
    stage: () => (
      <>
        <Label position={[-1.5, 0.9, 0.55]} rotationY={0.4} />
        <Record position={[-1.72, 0.9, 0.2]} rotationY={0.2} tilt={1.5} />
        <Him position={[-1.2, 0, 1.05]} rotationY={0.6} animation="reach" face="calm" headphones="ears" />
      </>
    ),
  },
  {
    id: "7.teeth",
    ...cam.push({ on: [0, 1.42, 0.3], dist: 2.8, to: 2.3, fov: 38, yaw: -8, pitch: 3 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Counting beats while he brushes his teeth, head bobbing: the practice has escaped the room.",
    stage: (t) => (
      <>
        <Him
          position={[0, 0, 0.3]}
          rotationY={0}
          animation="idle"
          face="sleepy"
          headphones="neck"
          headPitch={0.06 + Math.sin(t * 9) * 0.04}
        />
        <Mug position={[0.28, 0.86, 0.62]} />
        <Block position={[-0.08, 1.16, 0.56]} size={[0.05, 0.05, 0.26]} color="#3a7fa8" rotation={[0, 0.2, 0.5]} />
      </>
    ),
  },
  {
    id: "7.window",
    ...cam.push({ on: [1.3, 1.52, -2.35], dist: 3.0, to: 2.4, fov: 42, yaw: 4, pitch: 1 }),
    zone: "bedroom",
    look: "warm-room",
    note: "The window at night, him working in the foreground: the town is asleep and one room is not.",
    stage: () => (
      <>
        <Him position={[1.3, 0, 0.55]} rotationY={Math.PI} animation="press" face="calm" headphones="ears" />
        <Speaker position={[0.85, 0.6, 1.0]} rotationY={0.3} tall={0.86} pulse={0.6} />
      </>
    ),
  },
  {
    id: "7.onehand",
    ...cam.push({ on: DECKS, dist: 1.8, to: 1.4, fov: 34, pitch: 20, yaw: -32 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Mixing with one hand behind his back: the trick that has no use in the world.",
    stage: () => (
      <>
        <Turntable position={DECKS} spin={5.2} arm={1} />
        <Him position={[-1.5, 0, 0.6]} rotationY={1.2} animation="reach" face="smile" headphones="ears" />
      </>
    ),
  },
  {
    id: "7.eyes",
    ...cam.push({ on: [0, 1.44, 0.3], dist: 2.7, to: 2.2, fov: 38, yaw: -10, pitch: 2 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Eyes closed, headphones on: he does not need to look at the records any more.",
    stage: () => <Him position={[0, 0, 0.3]} rotationY={0} animation="idle" face="calm" headphones="ears" />,
  },
  {
    id: "7.dark",
    ...cam.push({ on: [0.1, 1.3, 0.3], dist: 2.6, to: 2.1, fov: 40, yaw: 22, pitch: 6 }),
    zone: "bedroom",
    look: "overworld-night",
    note: "The room with the lamp off and only the mixer's lights: he has stopped needing to see.",
    stage: () => (
      <>
        <Him position={[0, 0, 0.3]} rotationY={0} animation="idle" face="calm" headphones="ears" />
        <Speaker position={[1.05, 0.6, 1.02]} rotationY={0.2} tall={0.86} pulse={1.1} />
        <Speaker position={[-1.02, 0.6, 1.05]} rotationY={-0.2} tall={0.86} pulse={1.1} />
        <Glow position={[0, 0.5, 0.3]} size={1.1} color="#7fd8ff" opacity={0.12} />
      </>
    ),
  },
  {
    id: "7.sign",
    ...cam.push({ on: [2.05, 1.5, 0.55], dist: 2.6, to: 2.1, fov: 38, yaw: -90, pitch: 2 }),
    zone: "bedroom",
    look: "warm-room",
    note: "A sheet of paper taped to the wall with one word on it: PRACTICE. Nobody is coming to read it.",
    stage: (t) => (
      <>
        <group position={[2.07, 1.5, 0.55]} rotation-y={-Math.PI / 2}>
          <Sign position={[0, 0, 0]} width={0.86} height={0.7} title="PRACTICE" bg="#e6dfcc" fg="#1b2028" />
        </group>
        <Block position={[2.16, 1.5, 0.02]} size={[0.02, 0.06, 0.06]} color="#c8c2b4" rotation={[0, 0, t * 0]} />
      </>
    ),
  },
  {
    id: "7.dawn",
    ...cam.push({ on: [0, 1.15, 0.4], dist: 3.0, to: 2.5, fov: 44, yaw: -14, pitch: 8 }),
    zone: "bedroom",
    look: "overworld-day",
    note: "Dawn through the window, and him asleep sitting up with the headphones still on, which is the whole cost.",
    stage: () => (
      <>
        <Him position={[0.35, 0, 0.5]} rotationY={0.6} animation="sleep" face="sleepy" headphones="ears" />
        <Speaker position={[-1.02, 0.6, 1.05]} rotationY={-0.2} tall={0.86} pulse={0.2} />
        <Speaker position={[1.05, 0.6, 1.02]} rotationY={0.2} tall={0.86} pulse={0.2} />
        <Turntable position={DECKS} spin={0} arm={0.6} lit={0.3} />
      </>
    ),
  },
  {
    id: "7.stack",
    ...cam.push({ on: [-1.4, 0.62, 1.3], dist: 2.3, to: 1.9, fov: 36, pitch: 12, yaw: -22 }),
    zone: "bedroom",
    look: "warm-room",
    note: "The stack of labelled records beside the speaker, waist high: time, counted in cardboard.",
    stage: () => (
      <>
        {Array.from({ length: 14 }, (_, i) => (
          <Record key={i} position={[-1.42, 0.12 + i * 0.035, 1.28]} rotationY={0.06 * (i % 3)} tilt={1.57} sleeve={i % 4 !== 0} />
        ))}
        <Poster position={[-1.2, 1.82, -2.54]} colour="#d94bff" shape="pulse" />
      </>
    ),
  },
  {
    id: "7.hit",
    ...cam.push({ on: [-0.9, 1.15, 0.6], dist: 3.0, to: 2.5, fov: 42, yaw: 18, pitch: 8 }),
    zone: "bedroom",
    look: "warm-room",
    note: "The record he drops lands right, and the room is finally loud: the practice has become a thing that works.",
    stage: (t) => (
      <>
        <Him position={[-0.55, 0, 0.5]} rotationY={0.9} animation="press" face="grin" headphones="ears" />
        <Turntable position={DECKS} spin={6.2} arm={1} lit={1} />
        <Speaker position={[0.55, 0.6, 1.0]} rotationY={-0.2} tall={0.9} pulse={Math.min(1, t * 2)} />
        <Glow position={[0, 1.0, 0.6]} size={2.0} color="#ffcf8a" opacity={0.14} />
      </>
    ),
  },
]);
