import { cam, storyScene } from "../../engine";
import {
  Echo,
  EchoBoots,
  EchoCoat,
  Friend,
  HALL,
  Hero,
  NORTH,
  Ruby,
  Wrench,
  ease,
  ramp,
  timing,
  wordAt,
} from "./kit";

const BASE = HALL.at;
const MAX: [number, number, number] = [BASE[0] + 0.35, 0, BASE[2] + 0.18];
const TELLER: [number, number, number] = [BASE[0] - 0.82, 0, BASE[2] + 0.42];
const RUBY: [number, number, number] = [BASE[0] + 1.5, 0, BASE[2] + 0.2];
const FUTURE: [number, number, number] = [MAX[0] + 0.32, 0, MAX[2] - 0.9];
const LOCKER_MAX: [number, number, number] = [BASE[0] + 0.45, 0, BASE[2] - 0.78];
const SHOES = wordAt("8.shoes", "shoes");

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The Lie and Its Cost",
  shots: [
    {
      cue: "8.lie",
      ...cam.push({ on: [BASE[0], 1.05, BASE[2] + 0.05], dist: 4.8, to: 4.3, yaw: -5, pitch: 5, fov: 42 }),
      zone: "hall",
      note: "The teller leans in and lies to Max; Ruby is nowhere near the whisper, and the future still has a ragged coat and bare feet.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.18} animation="reach" arms="reach" face="uneasy" lookAt={[MAX[0], 1.0, MAX[2]]} />
          <Friend position={MAX} rotationY={-0.2} animation="idle" face="uneasy" headPitch={0.12} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.53} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.9} ragged />
        </>
      ),
    },
    {
      cue: "8.day",
      ...cam.push({ on: [LOCKER_MAX[0], 0.92, LOCKER_MAX[2] + 0.12], dist: 4.7, to: 4.2, yaw: 0, pitch: 14, fov: 44 }),
      zone: "hall",
      note: "While the day passes Max quietly fixes a locker; his future is still shoeless, but it is no longer losing anything.",
      stage: (t) => (
        <>
          <Hero position={[LOCKER_MAX[0] - 1.0, 0, LOCKER_MAX[2] + 0.45]} rotationY={0.1} animation="idle" face="calm" />
          <Friend position={LOCKER_MAX} rotationY={NORTH} animation="crouch" arms="reach" face="calm" />
          <Wrench position={[LOCKER_MAX[0] + 0.36, 0.62, LOCKER_MAX[2] + 0.22]} rotationZ={-0.85} scale={0.68} />
          <Echo position={[LOCKER_MAX[0] + 0.42, 0, LOCKER_MAX[2] - 0.78]} rotationY={NORTH} scale={1.0} color="#8fd0ff" opacity={0.52} lean={0.18} />
          <EchoCoat position={[LOCKER_MAX[0] + 0.42, 0, LOCKER_MAX[2] - 0.78]} color="#59636b" opacity={0.86} ragged />
        </>
      ),
    },
    {
      cue: "8.shoes",
      ...cam.push({ on: [LOCKER_MAX[0] + 0.08, 0.72, LOCKER_MAX[2] - 0.25], dist: 3.9, to: 3.45, yaw: -2, pitch: 17, fov: 40 }),
      zone: "hall",
      note: "The bare feet fill the lower part of the frame as boots appear on the future exactly when Max uses the wrench.",
      stage: (t) => {
        const arrive = ease(ramp(t, SHOES - 0.14, SHOES + 0.22));
        return (
          <>
            <Friend position={LOCKER_MAX} rotationY={NORTH} animation="crouch" arms="reach" face="calm" />
            <Wrench position={[LOCKER_MAX[0] + 0.36, 0.62, LOCKER_MAX[2] + 0.22]} rotationZ={-0.85} scale={0.68} />
            <Echo position={[LOCKER_MAX[0] + 0.42, 0, LOCKER_MAX[2] - 0.78]} rotationY={NORTH} scale={1.0} color="#8fd0ff" opacity={0.6} lean={0.18} />
            <EchoCoat position={[LOCKER_MAX[0] + 0.42, 0, LOCKER_MAX[2] - 0.78]} color="#59636b" opacity={0.86} ragged />
            <EchoBoots position={[LOCKER_MAX[0] + 0.42, 0, LOCKER_MAX[2] - 0.78]} color="#49372a" opacity={0.08 + 0.88 * arrive} />
          </>
        );
      },
    },
    {
      cue: "8.what",
      ...cam.push({ on: [BASE[0] + 0.38, 1.08, BASE[2] + 0.12], dist: 4.3, to: 3.85, yaw: 4, pitch: 4, fov: 40 }),
      zone: "hall",
      note: "Ruby turns to Max with a puzzled, steady look; the lie has to meet the person it was about.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={0.08} animation="idle" face="uneasy" />
          <Friend position={MAX} rotationY={0.25} animation="idle" face="wow" lookAt={[RUBY[0], 1.0, RUBY[2]]} />
          <Ruby position={RUBY} rotationY={-0.2} animation="idle" face="uneasy" headYaw={0.12 * Math.sin(t * 5)} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.48} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.82} ragged />
          <EchoBoots position={FUTURE} color="#49372a" opacity={0.8} />
        </>
      ),
    },
    {
      cue: "8.side",
      ...cam.push({ on: [BASE[0] - 0.12, 1.02, BASE[2] + 0.18], dist: 4.0, to: 3.55, yaw: -9, pitch: 3, fov: 40 }),
      zone: "hall",
      note: "Max faces the teller, hurt by the lie; Ruby walks away in the depth of the hall, while the future keeps its new shoes.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={0.12} animation="reach" arms="reach" face="uneasy" />
          <Friend position={MAX} rotationY={-0.28} animation="idle" face="frown" headPitch={0.12} />
          <Ruby position={[RUBY[0] + Math.min(0.75, t * 0.35), 0, RUBY[2] - 0.1]} rotationY={0.1} animation="walk" animDistance={Math.min(0.7, t * 0.5)} face="calm" />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.48} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.82} ragged />
          <EchoBoots position={FUTURE} color="#49372a" opacity={0.8} />
        </>
      ),
    },
  ],
});
