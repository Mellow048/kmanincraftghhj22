import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Bot, Butler, Cleaner, Crate, DAY, Dad, Hero, Massager, Mate, Mum, STEP, SmartBot, ZONE,
  ease, faceOf, hop, jolt, l, pop, ramp, timing, wordAt,
} from "./kit";

/** Where mum and dad sit, and where their robots are. */
const MUM: Vec3 = l(-0.55, 0, -1.55);
const DAD: Vec3 = l(0.65, 0, -1.55);
const BUTLER: Vec3 = l(-1.5, 0, -0.75);
const PAD: Vec3 = l(0.65, 0, -0.85);

/** A cup, for a hand that is holding one in front of a chest. */
const Cup: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.12, 0.1, 0.12]} />
      <meshStandardMaterial color="#f4f1ea" />
    </mesh>
    <mesh position={[0, 0.045, 0]}>
      <boxGeometry args={[0.09, 0.02, 0.09]} />
      <meshStandardMaterial color="#8a4a1e" />
    </mesh>
  </group>
);

/** THE RULE, and the two robots at home. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A robot at eighteen",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [2, 1.25, 2.4], dist: 7.4, to: 6.2, yaw: 0, pitch: 5, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "The teller, in red, walking up the street at us. Either side of him somebody his age with a robot: a tin man on two legs behind one, a floating cube over the other. On 'robot' both robots jump.",
      stage: (t, { p }) => {
        const robot = wordAt("1.town", "robot");
        const z = 0.6 + 2.2 * p;
        return (
          <>
            <Hero position={[2, 0, z + 0.4]} animation="walk" animDistance={2.2 * p} face="smile" />
            <Mate n={0} position={[0.75, 0, z - 1.5]} animation="walk" animDistance={2.2 * p} face="grin" />
            <Bot position={[0.95, hop(t, robot, 0.4), z - 0.2]} s={1.45} color="#d9c36a" eye="#ffd24a" />
            <Mate n={2} position={[3.05, 0, z - 0.5]} animation="walk" animDistance={2.2 * p} face="grin" />
            <SmartBot position={[3.3, 2.0 + hop(t, robot + 0.08, 0.3), z - 0.6]} t={t} text=":)" />
          </>
        );
      },
    },
    {
      cue: "1.crate",
      ...cam.push({ on: [STEP[0], 0.9, STEP[2]], dist: 6.6, to: 5.0, yaw: 0, pitch: 9, fov: 44 }),
      zone: ZONE.town,
      look: DAY,
      note: "A front door. On 'lands' a wooden crate comes down out of the sky onto the step, hard. Dust. On 'inside' the lid lifts and two lit eyes come up out of it.",
      impacts: [{ at: 1.25, amp: 0.07, dur: 0.35 }],
      stage: (t) => {
        const lands = wordAt("1.crate", "lands");
        const inside = wordAt("1.crate", "inside");
        const fall = ramp(t, lands - 0.45, lands);
        const y = 9 * (1 - fall * fall);
        const lid = ease(ramp(t, inside - 0.1, inside + 0.35));
        return (
          <>
            <Crate position={[STEP[0], y, STEP[2]]} s={1.1} lid={lid} />
            <Bits position={[STEP[0], 0.2, STEP[2] + 0.3]} t={t - lands} color="#c9b48a" count={16} power={2.6} />
            {lid > 0.2 ? <Bot position={[STEP[0], -0.55 + 0.75 * ease(ramp(t, inside + 0.1, inside + 0.7)), STEP[2]]} s={1.5} color="#8fd0c8" /> : null}
          </>
        );
      },
    },
    {
      cue: "2.mum",
      ...cam.push({ on: l(-0.95, 1.05, -1.2), dist: 5.0, to: 4.2, yaw: 0, pitch: 6, fov: 44 }),
      zone: ZONE.living,
      look: DAY,
      note: "Mum on the sofa with a cup. Beside her a robot in a black coat and a bow tie, with a moustache, bows, and on 'poured' tips a teapot into her cup. She does not look up from it.",
      stage: (t) => {
        const poured = wordAt("2.mum", "poured");
        const pour = ease(ramp(t, poured - 0.2, poured + 0.2)) * (1 - ease(ramp(t, poured + 1.2, poured + 1.5)));
        return (
          <>
            <Mum position={MUM} animation="sit" arms="hold" face="smile" headPitch={0.15} />
            <Cup position={[MUM[0] - 0.05, 0.98, MUM[2] + 0.42]} />
            <Butler position={[BUTLER[0] + 0.25, 0, BUTLER[2] + 0.15]} rotationY={0.5} pour={pour} bow={0.5 * Math.sin(Math.PI * ramp(t, 0.1, 0.9))} />
          </>
        );
      },
    },
    {
      cue: "2.dad",
      ...cam.push({ on: l(0.65, 0.75, -1.2), dist: 4.2, to: 3.4, yaw: 0, pitch: 10, fov: 44 }),
      zone: ZONE.living,
      look: DAY,
      note: "Dad, at the other end of the sofa, with both feet on a grey box with two blue pads. That is his robot.",
      stage: (t) => {
        const m = wordAt("2.dad", "foot");
        return (
          <>
            <Dad position={DAD} animation="sit" face="bearded" />
            <Massager position={PAD} buzz={t > m ? 1 : 0} t={t} />
            <Bits position={[PAD[0], 0.3, PAD[2] + 0.2]} t={t - m} color="#bfe2ff" count={6} power={1} />
          </>
        );
      },
    },
  ],
});
