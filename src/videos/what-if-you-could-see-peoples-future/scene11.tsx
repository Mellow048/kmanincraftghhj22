import { cam, storyScene } from "../../engine";
import {
  AstronautEcho,
  Classmate,
  Cup,
  Echo,
  Friend,
  GoldNecklace,
  Hero,
  LUNCH,
  NORTH,
  Ruby,
  ease,
  ramp,
  timing,
} from "./kit";

const BASE = LUNCH.at;
const MAX: [number, number, number] = [BASE[0] + 0.22, 0, BASE[2] + 0.28];
const TELLER: [number, number, number] = [BASE[0] - 0.95, 0, BASE[2] + 0.36];
const RUBY: [number, number, number] = [BASE[0] + 1.55, 0, BASE[2] - 0.15];
const FUTURE_MAX: [number, number, number] = [MAX[0] + 0.62, 0, MAX[2] - 0.85];
const FUTURE_RUBY: [number, number, number] = [RUBY[0] + 0.5, 0, RUBY[2] - 0.9];

export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The No, and the Silence After",
  shots: [
    {
      cue: "11.no",
      ...cam.push({ on: [BASE[0] + 0.35, 1.2, BASE[2] + 0.1], dist: 5.3, to: 4.8, yaw: -3, pitch: 7, fov: 44 }),
      zone: "lunch",
      note: "Ruby says no to Max with the room watching; her astronaut future stands behind her, and the necklace stays in Max's hands.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={0.15} animation="idle" face="uneasy" />
          <Friend position={[MAX[0], 0.58, MAX[2] + 0.12]} rotationY={0.05} animation="idle" arms="hold" face="uneasy" />
          <GoldNecklace position={[MAX[0] + 0.43, 1.45, MAX[2] + 0.22]} />
          <Ruby position={RUBY} rotationY={0.18} animation="idle" face="calm" headYaw={0.16 * Math.sin(t * 7)} />
          <AstronautEcho position={FUTURE_RUBY} rotationY={NORTH} scale={1.0} opacity={0.58} />
          <Echo position={FUTURE_MAX} rotationY={NORTH} scale={0.92} color="#8fd0ff" opacity={0.62} lean={0.65} reach={0.12} />
          <Cup position={[FUTURE_MAX[0], 0, FUTURE_MAX[2] + 0.23]} />
          <Classmate who={2} position={[BASE[0] - 0.58, 0, BASE[2] - 0.65]} rotationY={0} animation="sit" face="calm" />
          <Classmate who={5} position={[BASE[0] + 0.62, 0, BASE[2] - 0.62]} rotationY={0} animation="sit" face="calm" />
        </>
      ),
    },
    {
      cue: "11.worse",
      ...cam.push({ on: [BASE[0] + 0.12, 0.96, BASE[2] + 0.2], dist: 4.6, to: 4.1, yaw: -7, pitch: 4, fov: 42 }),
      zone: "lunch",
      note: "Max steps down and lowers the necklace; Ruby moves away, and every classmate stays quiet instead of laughing.",
      stage: (t) => {
        const stepsDown = ease(ramp(t, 0.08, 0.6));
        return (
          <>
            <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" headPitch={0.16} />
            <Friend position={[MAX[0], 0.58 - 0.48 * stepsDown, MAX[2] + 0.12]} rotationY={0.05} animation="idle" arms="hold" face="frown" headPitch={0.12 * stepsDown} />
            <GoldNecklace position={[MAX[0] + 0.43, 1.45 - 0.5 * stepsDown, MAX[2] + 0.22]} />
            <Ruby position={[RUBY[0] + Math.min(0.48, t * 0.24), 0, RUBY[2] - 0.1]} rotationY={0.1} animation="walk" animDistance={Math.min(0.5, t * 0.45)} face="calm" />
            <AstronautEcho position={[FUTURE_RUBY[0] + Math.min(0.48, t * 0.24), 0, FUTURE_RUBY[2] - 0.1]} rotationY={NORTH} scale={1.0} opacity={0.58} />
            <Echo position={FUTURE_MAX} rotationY={NORTH} scale={0.92} color="#8fd0ff" opacity={0.62} lean={0.65} />
            <Cup position={[FUTURE_MAX[0], 0, FUTURE_MAX[2] + 0.23]} />
            <Classmate who={2} position={[BASE[0] - 0.58, 0, BASE[2] - 0.65]} rotationY={0} animation="sit" face="calm" />
            <Classmate who={5} position={[BASE[0] + 0.62, 0, BASE[2] - 0.62]} rotationY={0} animation="sit" face="calm" />
        </>
        );
      },
    },
  ],
});
