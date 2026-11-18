import { cam, storyScene } from "../../engine";
import { Classmate, Echo, HALL, Hero, NORTH, timing } from "./kit";

const BASE = HALL.at;
const TELLER: [number, number, number] = [BASE[0] + 0.92, 0, BASE[2] + 0.42];
const KID_A: [number, number, number] = [BASE[0] - 0.42, 0, BASE[2] + 0.15];
const KID_B: [number, number, number] = [BASE[0] + 0.34, 0, BASE[2] - 0.32];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Every Kid, Thirty Years Older",
  shots: [
    {
      cue: "2.hall",
      ...cam.push({ on: [BASE[0], 1.12, BASE[2] + 0.08], dist: 5.6, to: 5.0, yaw: 0, pitch: 8, fov: 46 }),
      zone: "hall",
      note: "Two classmates stand at different depths, each with a blue grown-up behind them; the teller watches from the edge of the tall frame.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={NORTH} animation="walk" face="wow" />
          <Classmate who={5} position={KID_A} rotationY={NORTH} animation="idle" face="calm" />
          <Echo position={[KID_A[0], 0, KID_A[2] - 0.82]} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} />
          <Classmate who={2} position={KID_B} rotationY={NORTH} animation="idle" face="calm" />
          <Echo position={[KID_B[0], 0, KID_B[2] - 0.82]} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} />
        </>
      ),
    },
    {
      cue: "2.older",
      ...cam.push({ on: [KID_A[0], 1.08, KID_A[2] - 0.2], dist: 4.7, to: 4.2, yaw: -8, pitch: 5, fov: 42 }),
      zone: "hall",
      note: "A child and their future move together down the lockers, one small and one grown, so 'thirty years older' reads without a caption.",
      stage: (t) => (
        <>
          <Classmate who={5} position={[KID_A[0] + Math.min(0.5, t * 0.24), 0, KID_A[2] + 0.28]} rotationY={NORTH} animation="walk" animDistance={Math.min(0.6, t * 0.35)} face="calm" />
          <Echo position={[KID_A[0] + Math.min(0.5, t * 0.24), 0, KID_A[2] - 0.58]} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.54} walk={Math.min(0.55, t * 0.38)} />
          <Hero position={TELLER} rotationY={NORTH} animation="walk" face="grin" />
        </>
      ),
    },
  ],
});
