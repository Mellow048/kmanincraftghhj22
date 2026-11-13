import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Aura, Beam, Classmate, Countdown, EAST, Echo, Friend, Hero, ME, NORTH, Overhead, PLACE, SOUTH, SPOT, Streaks, Swirl, Teacher, WEST, timing } from "./kit";

const NOTE = "Parts test: every part of the What If pack, one group at a time.";
const H = PLACE.hall;
const hall = (x: number, y: number, z: number): Vec3 => [H[0] + x, H[1] + y, H[2] + z];

const Class = () => (
  <>
    <Hero position={ME} rotationY={NORTH} animation="sit" face="wow" />
    {[0, 1, 2].flatMap((col) => [0, 1, 2].filter((row) => !(col === 1 && row === 2)).map((row) => <Classmate key={`${col}${row}`} who={col * 3 + row} position={SPOT.seat(col, row)} rotationY={NORTH} animation="sit" face={(col + row) % 3 ? "calm" : "smile"} headPitch={0.2} />))}
    <Teacher position={SPOT.teacher} animation="talk" face="calm" />
  </>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Parts",
  shots: [
    { cue: "p.1", ...cam.push({ on: SPOT.at(0, 1.35, -0.4), dist: 6.4, to: 5.6, yaw: 0, pitch: 13, fov: 46 }), zone: "class", note: NOTE, stage: (t) => (<><Class /><Overhead over={SPOT.seat(1, 0)} tall={1.34} kind="heart" size={0.4} t={t - 0.3} /></>) },
    { cue: "p.2", ...cam.push({ on: SPOT.at(0, 0.9, 1.7), dist: 5.3, to: 4.9, yaw: 180, pitch: 17, fov: 48 }), zone: "class", note: NOTE, stage: () => <Class /> },
    { cue: "p.3", ...cam.push({ on: SPOT.at(-0.3, 1.45, -2.6), dist: 4.6, to: 4.2, yaw: 38, pitch: 5, fov: 44 }), zone: "class", note: NOTE, stage: () => <Class /> },
    {
      cue: "p.4", ...cam.push({ on: hall(0, 1.3, -0.8), dist: 7.0, to: 6.2, yaw: 0, pitch: 6, fov: 46 }), zone: "hall", note: NOTE,
      stage: (t) => (
        <>
          <Hero position={hall(-0.5, 0, -0.9)} rotationY={SOUTH} animation="idle" face="smile" />
          <Friend position={hall(0.5, 0, -0.9)} rotationY={SOUTH} animation="talk" face="grin" />
          <Classmate who={2} position={hall(-1.6 + t * 0.9, 0, 0.4)} rotationY={EAST} animation="walk" animDistance={t * 0.9} />
        </>
      ),
    },
    {
      cue: "p.5", ...cam.push({ on: hall(2.5, 1.2, 0.1), dist: 6.0, to: 5.2, yaw: -90, pitch: 4, fov: 50 }), zone: "hall", note: NOTE,
      stage: (t) => (
        <>
          <Hero position={hall(1.5, 0, 0.2)} rotationY={WEST} animation="idle" face="uneasy" />
          <Classmate who={5} position={hall(4.5, 0, -0.9)} rotationY={SOUTH} animation="idle" />
          <Classmate who={8} position={hall(6.5 - t * 0.8, 0, 0.6)} rotationY={WEST} animation="walk" animDistance={t * 0.8} />
        </>
      ),
    },
    {
      cue: "p.6", ...cam.push({ on: hall(0, 1.45, -0.7), dist: 5.4, to: 5.0, yaw: 0, pitch: 14, fov: 44 }), zone: "hall", note: NOTE,
      stage: (t) => (
        <>
          {[0, 1, 2, 3].map((i) => <Classmate key={i} who={i + 1} position={hall(i % 2 ? 0.42 : -0.42, 0, i < 2 ? -0.2 : -1.2)} rotationY={SOUTH} animation="idle" />)}
          <Overhead over={hall(-0.42, 0, -0.2)} kind="heart" t={t} />
          <Overhead over={hall(0.42, 0, -0.2)} kind="skull" t={t - 0.1} />
          <Overhead over={hall(-0.42, 0, -1.2)} kind="clock" t={t - 0.2} tall={1.9} />
          <Overhead over={hall(0.42, 0, -1.2)} text="5" color="#ffd24a" t={t - 0.3} tall={1.9} />
        </>
      ),
    },
    {
      cue: "p.7", ...cam.push({ on: hall(0, 1.05, -0.3), dist: 5.6, to: 5.2, yaw: 0, pitch: 8, fov: 44 }), zone: "hall", note: NOTE,
      stage: (t) => (
        <>
          <Hero position={hall(-0.55, 0, 0.3)} rotationY={SOUTH} animation="idle" face="wow" />
          <Aura position={hall(-0.55, 0, 0.3)} t={t} />
          <Friend position={hall(0.5, 0, -1.0)} rotationY={SOUTH} animation="idle" face="fear" />
          <Swirl position={hall(0.5, 0, -1.0)} t={0.5 + t * 0.1} />
          <Echo position={hall(0.6, 0, 0.5)} rotationY={WEST} walk={0.4} reach={0.7} />
        </>
      ),
    },
    {
      cue: "p.8", ...cam.push({ on: hall(0, 1.45, -0.3), dist: 5.8, to: 5.4, yaw: 0, pitch: 14, fov: 44 }), zone: "hall", note: NOTE,
      stage: (t) => (
        <>
          <Hero position={hall(0.55, 0, -1.0)} rotationY={EAST} animation="run" animDistance={2 + t * 3} face="grin" />
          <Streaks position={hall(0.35, 0.85, -1.0)} heading={EAST} t={t + 1} />
          <Countdown position={hall(0, 2.75, -0.6)} t={2.3} />
          <Friend position={hall(-0.6, 0, 0.9)} rotationY={EAST} animation="idle" face="smile" />
          <Classmate who={6} position={hall(0.6, 0, 0.9)} rotationY={WEST} animation="idle" />
          <Beam from={hall(-0.45, 1.2, 0.9)} to={hall(0.45, 1.2, 0.9)} />
        </>
      ),
    },
  ],
});
