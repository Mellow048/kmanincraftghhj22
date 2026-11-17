import { cam, storyScene } from "../../engine";
import { AstronautEcho, Friend, GiantTeddyBear, Hero, LUNCH, NORTH, Ruby, timing } from "./kit";

const BASE = LUNCH.at;
const TELLER: [number, number, number] = [BASE[0] - 0.78, 0, BASE[2] + 0.42];
const MAX: [number, number, number] = [BASE[0] + 0.25, 0, BASE[2] + 0.35];
const RUBY: [number, number, number] = [BASE[0] + 1.35, 0, BASE[2] - 0.25];
const FUTURE_RUBY: [number, number, number] = [RUBY[0] + 0.5, 0, RUBY[2] - 0.9];

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Ruby's Own Future",
  shots: [
    {
      cue: "9.ruby",
      ...cam.push({ on: [BASE[0] + 0.1, 1.08, BASE[2] + 0.12], dist: 4.9, to: 4.4, yaw: -3, pitch: 5, fov: 42 }),
      zone: "lunch",
      note: "Ruby finds the teller alone and asks him to make Max hear her no; her face is calm, direct, and never played as a villain.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
          <Ruby position={RUBY} rotationY={-0.25} animation="idle" face="calm" headPitch={0.08} />
          <Friend position={[MAX[0] + 0.9, 0, MAX[2] - 0.65]} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "9.suit",
      ...cam.push({ on: [RUBY[0], 1.08, RUBY[2] - 0.18], dist: 4.0, to: 3.55, yaw: -4, pitch: 8, fov: 40 }),
      zone: "lunch",
      note: "A silver helmet and suit appear directly behind Ruby; keep her face in front so the future belongs to her, not Max.",
      stage: () => (
        <>
          <Hero position={[TELLER[0], 0, TELLER[2] + 0.25]} rotationY={0.15} animation="idle" face="wow" />
          <Ruby position={RUBY} rotationY={-0.2} animation="idle" face="calm" />
          <AstronautEcho position={FUTURE_RUBY} rotationY={NORTH} scale={1.05} opacity={0.62} />
        </>
      ),
    },
    {
      cue: "9.moon",
      ...cam.push({ on: [BASE[0] + 0.55, 1.0, BASE[2] + 0.05], dist: 5.0, to: 4.45, yaw: 2, pitch: 7, fov: 44 }),
      zone: "lunch",
      note: "Ruby walks toward the exit with the astronaut future behind her; Max's door-sized bear is left in the foreground and she does not turn back.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
          <Friend position={MAX} rotationY={0.2} animation="hold" face="uneasy" />
          <Ruby position={[RUBY[0] + Math.min(0.65, t * 0.32), 0, RUBY[2] - Math.min(0.45, t * 0.22)]} rotationY={0.12} animation="walk" animDistance={Math.min(0.75, t * 0.55)} face="calm" />
          <AstronautEcho position={[FUTURE_RUBY[0] + Math.min(0.65, t * 0.32), 0, FUTURE_RUBY[2] - Math.min(0.45, t * 0.22)]} rotationY={NORTH} scale={1.05} opacity={0.62} />
          <GiantTeddyBear position={[MAX[0] - 0.95, 0, MAX[2] - 0.5]} scale={2.7} rotationY={0.2} />
        </>
      ),
    },
  ],
});
