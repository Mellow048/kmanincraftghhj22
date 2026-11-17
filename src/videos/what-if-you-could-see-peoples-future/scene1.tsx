import { cam, storyScene } from "../../engine";
import { Echo, EchoCoat, FlowerBouquet, Friend, Hero, HALL, NORTH, timing } from "./kit";

const BASE = HALL.at;
const MAX: [number, number, number] = [BASE[0] + 0.35, 0, BASE[2] + 0.18];
const TELLER: [number, number, number] = [BASE[0] - 0.82, 0, BASE[2] + 0.42];
const FUTURE: [number, number, number] = [MAX[0] + 0.32, 0, MAX[2] - 0.92];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Question",
  shots: [
    {
      cue: "1.what",
      ...cam.push({ on: [BASE[0] - 0.28, 1.15, BASE[2]], dist: 5.2, to: 4.65, yaw: -4, pitch: 3, fov: 46 }),
      zone: "hall",
      note: "The opening picture plants the whole story: Max carries flowers while a coat-worn, shoeless future stands behind him.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.08} animation="walk" animDistance={0.35} face="wow" lookAt={[FUTURE[0], 1.1, FUTURE[2]]} />
          <Friend position={MAX} rotationY={0.04} animation="hold" arms="hold" face="grin" />
          <FlowerBouquet position={[MAX[0] + 0.08, 0.52, MAX[2] + 0.24]} scale={0.9} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.56} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.88} ragged />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [BASE[0] - 0.32, 1.2, BASE[2] + 0.05], dist: 4.6, to: 4.15, yaw: 4, pitch: 2, fov: 40 }),
      zone: "hall",
      note: "The teller turns from the echo to camera; the shoeless grown-up stays directly behind Max as the rule appears.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={-0.3 + 0.25 * Math.sin(t * 2)} animation="idle" face="wow" gaze={0} />
          <Friend position={MAX} rotationY={0.04} animation="hold" arms="hold" face="grin" />
          <FlowerBouquet position={[MAX[0] + 0.08, 0.52, MAX[2] + 0.24]} scale={0.9} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.56} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.88} ragged />
        </>
      ),
    },
  ],
});
