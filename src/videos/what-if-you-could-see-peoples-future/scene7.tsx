import { cam, storyScene } from "../../engine";
import {
  Echo,
  EchoCoat,
  Friend,
  GiantTeddyBear,
  Hero,
  HALL,
  NORTH,
  Overhead,
  Ruby,
  ToolBox,
  ease,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

const SOLD = wordAt("7.bear", "sold");
const BOUGHT = wordAt("7.bear", "bought");
const LOST_COAT = wordAt("7.coat", "coat");
const HALL_AT = HALL.at;
const MAX: [number, number, number] = [HALL_AT[0] + 0.05, 0, HALL_AT[2] + 0.25];
const FUTURE: [number, number, number] = [MAX[0] + 0.32, 0, MAX[2] - 0.9];
const TELLER: [number, number, number] = [HALL_AT[0] - 1.05, 0, HALL_AT[2] + 0.38];
const RUBY_POS: [number, number, number] = [HALL_AT[0] + 1.45, 0, HALL_AT[2] + 0.45];

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Max Hears the Warning, Then Misses It",
  shots: [
    {
      cue: "7.told",
      ...cam.push({ on: [HALL_AT[0], 1.1, HALL_AT[2]], dist: 4.8, to: 4.35, yaw: -7, pitch: 4, fov: 42 }),
      zone: "hall",
      note: "The teller finally points at the future Max cannot see; keep the bare feet in the same frame as Max's face.",
      stage: () => (
        <>
          <Hero position={TELLER} rotationY={0.15} animation="point" face="uneasy" lookAt={[FUTURE[0], 1.3, FUTURE[2]]} />
          <Friend position={MAX} rotationY={-0.2} animation="idle" face="uneasy" lookAt={[TELLER[0], 1.0, TELLER[2]]} />
          <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.54} />
          <EchoCoat position={FUTURE} color="#59636b" opacity={0.9} ragged />
        </>
      ),
    },
    {
      cue: "7.faster",
      ...cam.push({ on: [HALL_AT[0] + 0.45, 1.1, HALL_AT[2] + 0.15], dist: 4.8, to: 4.35, yaw: 8, pitch: 4, fov: 42 }),
      zone: "hall",
      note: "Max turns away from the warning and hurries toward Ruby; the teller reaches after him but does not block her.",
      stage: (t) => (
        <>
          <Hero position={[TELLER[0] - 0.1, 0, TELLER[2]]} rotationY={0.1} animation="reach" face="uneasy" />
          <Friend position={[MAX[0] + Math.min(1.0, t * 0.55), 0, MAX[2] + 0.12]} rotationY={0.4} animation="run" animDistance={Math.min(1.25, t * 1.4)} face="grin" />
          <Ruby position={RUBY_POS} rotationY={0.2} animation="idle" face="calm" />
          <Echo position={[FUTURE[0] + Math.min(0.35, t * 0.18), 0, FUTURE[2] - 0.7]} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} walk={Math.min(0.5, t * 0.3)} />
          <EchoCoat position={[FUTURE[0] + Math.min(0.35, t * 0.18), 0, FUTURE[2] - 0.7]} color="#59636b" opacity={0.88} ragged />
        </>
      ),
    },
    {
      cue: "7.bear",
      ...cam.push({ on: [HALL_AT[0] + 0.05, 1.05, HALL_AT[2] + 0.15], dist: 4.8, to: 4.25, yaw: -4, pitch: 3, fov: 40 }),
      zone: "hall",
      note: "The toolbox slides out as the bear appears nearly Max's height: this is the costly choice, not another hallway walk.",
      stage: (t) => {
        const sold = ease(ramp(t, SOLD - 0.16, SOLD + 0.24));
        const bear = pop(t, BOUGHT, 0.5);
        return (
          <>
            <Hero position={TELLER} rotationY={0.15} animation="idle" face="wow" />
            <Friend position={MAX} rotationY={0.05} animation="reach" arms={t < BOUGHT ? "reach" : "hold"} face="grin" />
            {1 - sold > 0.01 ? <ToolBox position={[MAX[0] - 0.82 * sold, 0, MAX[2] - 0.05]} rotationY={0.2} scale={1 - 0.25 * sold} /> : null}
            {bear > 0.01 ? <GiantTeddyBear position={[MAX[0] + 0.92, 0, MAX[2] - 0.05]} scale={4.1 * bear} rotationY={-0.1} /> : null}
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.52} />
            <EchoCoat position={FUTURE} color="#59636b" opacity={0.88} ragged />
          </>
        );
      },
    },
    {
      cue: "7.twelve",
      ...cam.push({ on: [HALL_AT[0] + 0.75, 1.15, HALL_AT[2] + 0.25], dist: 4.7, to: 4.2, yaw: 0, pitch: 3, fov: 40 }),
      zone: "hall",
      note: "Ruby says no once, clearly; her sign belongs over her, while Max and the narrator stay small behind her.",
      stage: (t) => (
        <>
          <Hero position={TELLER} rotationY={0.1} animation="idle" face="uneasy" />
          <Friend position={MAX} rotationY={0.2} animation="idle" face="uneasy" headPitch={0.16} />
          <Ruby position={RUBY_POS} rotationY={0.05} animation="idle" face="frown" headYaw={0.12 * Math.sin(t * 7)} />
          <Overhead over={RUBY_POS} text="NO" t={t} size={0.48} color="#f25152" rotationY={0} />
          <GiantTeddyBear position={[MAX[0] + 1.0, 0, MAX[2] - 0.05]} scale={4.1} rotationY={-0.1} />
        </>
      ),
    },
    {
      cue: "7.coat",
      ...cam.push({ on: [HALL_AT[0] + 0.1, 1.05, HALL_AT[2] - 0.05], dist: 4.7, to: 4.2, yaw: -8, pitch: 3, fov: 40 }),
      zone: "hall",
      note: "As the last coat fades from the future, Max holds the bear; let the empty blue outline carry the loss.",
      stage: (t) => {
        const remaining = 1 - 0.84 * ease(ramp(t, LOST_COAT - 0.08, LOST_COAT + 0.32));
        return (
          <>
            <Hero position={TELLER} rotationY={0.12} animation="idle" face="uneasy" />
            <Friend position={MAX} rotationY={0} animation="hold" face="calm" headPitch={0.1} />
            <GiantTeddyBear position={[MAX[0] + 0.93, 0, MAX[2] - 0.05]} scale={4.1} rotationY={-0.1} />
            <Echo position={FUTURE} rotationY={NORTH} scale={1.05} color="#8fd0ff" opacity={0.48} />
            <EchoCoat position={FUTURE} color="#59636b" opacity={remaining} ragged />
          </>
        );
      },
    },
  ],
});
