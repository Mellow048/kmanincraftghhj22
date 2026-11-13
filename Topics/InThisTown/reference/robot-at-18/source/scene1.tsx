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
      cue: "1.kinds",
      ...cam.push({ on: [0.1, 1.7, 2], dist: 10.5, to: 9.4, yaw: 0, pitch: 3, fov: 46 }),
      zone: ZONE.town,
      look: DAY,
      note: "Three robots in a row in the square, each arriving on its word: one as tall as a house, one that comes up to its ankle, one with a cape and both fists in the air.",
      impacts: [{ at: 0.45, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const huge = wordAt("1.kinds", "huge");
        const tiny = wordAt("1.kinds", "tiny");
        const hero = wordAt("1.kinds", "hero");
        return (
          <>
            <group scale={pop(t, huge - 0.05)}>
              <Bot position={[-1.15, 0, 1.6]} s={3.6} color="#8d96a3" eye="#ff8a2a" rotationY={0.2} />
            </group>
            <Bits position={[-1.15, 0.2, 2.2]} t={t - huge} color="#c9b48a" count={14} power={3} />
            {t > tiny - 0.05 ? <Bot position={[0.35, hop(t, tiny, 0.35, 0.3), 2.6]} s={0.42} color="#f0d24a" eye="#ffffff" /> : null}
            {t > hero - 0.05 ? <Bot position={[1.35, hop(t, hero, 0.5, 0.45), 2.2]} s={1.75} color="#d5322b" eye="#ffffff" cape="#2f4fd0" arms={ease(ramp(t, hero, hero + 0.3))} rotationY={-0.2} /> : null}
          </>
        );
      },
    },
    {
      cue: "1.cleaner",
      ...cam.push({ on: [0.3, 0.3, 3.2], dist: 2.9, to: 2.4, yaw: 14, pitch: 12, fov: 42 }),
      zone: ZONE.town,
      look: DAY,
      note: "Low on the street: a small white cleaner rolls up to one ball of dust, pokes it with its brush, and on 'loses' the dust wins. The cleaner is on its back.",
      stage: (t) => {
        const loses = wordAt("1.cleaner", "loses");
        const roll = ease(ramp(t, 0, loses - 0.15));
        const flip = ease(ramp(t, loses - 0.05, loses + 0.25));
        return (
          <>
            <group position={[-0.5 + 0.55 * roll - 0.3 * flip, 0.28 * Math.sin(flip * Math.PI) + 0.2 * flip, 3.2]}>
              <Cleaner position={[0, 0, 0]} rotationY={Math.PI / 2} tilt={Math.PI * flip} />
            </group>
            <group position={[0.55, 0.14 + 0.03 * Math.sin(t * 9), 3.2]} scale={1 + 0.5 * jolt(t, loses, 0.4)}>
              <mesh>
                <boxGeometry args={[0.24, 0.2, 0.22]} />
                <meshStandardMaterial color="#8a8478" />
              </mesh>
              <mesh position={[0.1, 0.1, 0.05]}>
                <boxGeometry args={[0.12, 0.1, 0.12]} />
                <meshStandardMaterial color="#9a9488" />
              </mesh>
            </group>
            <Bits position={[0.3, 0.2, 3.2]} t={t - loses} color="#9a9488" count={10} power={1.6} />
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
    {
      cue: "2.whole",
      ...cam.push({ on: l(0.65, 0.95, -1.3), dist: 3.4, to: 4.4, yaw: -10, pitch: 8, fov: 44 }),
      zone: ZONE.living,
      look: DAY,
      note: "The box buzzes. Dad's whole body buzzes with it, his head back and his eyes shut. On 'best' he puts both arms up.",
      stage: (t) => {
        const best = wordAt("2.whole", "best");
        const b = 0.012 * Math.sin(t * 60);
        return (
          <>
            <Dad position={[DAD[0] + b, 0, DAD[2]]} animation={t > best ? "cheer" : "sit"} arms={t > best ? "cheer" : undefined} face="bearded" headPitch={-0.3} />
            <Massager position={PAD} buzz={1.6} t={t} />
            <Mum position={MUM} animation="sit" arms="hold" face="calm" headYaw={-0.5 * ease(ramp(t, best, best + 0.4))} />
            <Cup position={[MUM[0] - 0.05, 0.98, MUM[2] + 0.42]} />
          </>
        );
      },
    },
    {
      cue: "2.hear",
      ...cam.push({ on: faceOf([MUM[0], -0.42, MUM[2]]), dist: 2.5, to: 2.1, yaw: 6, pitch: 3, fov: 40 }),
      zone: ZONE.living,
      look: DAY,
      note: "Mum, close, drinking her tea and looking very hard at the wall. Behind her the butler looks at the wall too.",
      stage: (t) => (
        <>
          <Mum position={MUM} animation="sit" arms="hold" face="calm" headYaw={0.45} gaze={1} />
          <Cup position={[MUM[0] - 0.05, 1.0 + 0.12 * ease(ramp(t, 0.1, 0.5)), MUM[2] + 0.42]} />
          <Butler position={[BUTLER[0] + 0.25, 0, BUTLER[2] - 0.5]} rotationY={0.9} />
        </>
      ),
    },
  ],
});
