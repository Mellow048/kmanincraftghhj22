import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BIG, BIG_SCALE, Bits, Bubble, CATCH, Drops, Fill, Hero, MO_CATCH, Mo, NIGHT, Raider, STAND, Streaks, ZONE,
  ease, faceOf, handOf, jolt, manFace, pop, ramp, timing, wordAt,
} from "./kit";
import { MumDown } from "./scene6";

const E = Math.PI / 2;
const W = -Math.PI / 2;
const MOFACE = manFace(MO_CATCH);

/** The big player with the sword stopped where Mo caught it. `strain` shakes it. */
const Caught: React.FC<{ t: number; fall?: number }> = ({ t, fall = 1 }) => {
  const a = -2.6 + 0.7 * fall;
  const pitch = 2.6 - 2.28 * fall;
  const strain = fall >= 1 ? Math.sin(t * 31) * 0.012 : 0;
  const grip = handOf(BIG, E, a, BIG_SCALE);
  return (
    <>
      <Raider who={0} position={BIG} rotationY={E} animation="point" blendTo="reachUp" blend={0.78 * fall} sword={false} face="angry" headPitch={0.35} />
      <AimSword position={[grip[0], grip[1] + strain, grip[2]]} yaw={E} pitch={pitch} scale={BIG_SCALE} />
    </>
  );
};

/** THE REVEAL. The sword stops. The hand that stopped it bleeds red. Then the scarf, the green, and four words. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "I am human too",
  shots: [
    {
      cue: "15.clang",
      ...cam.push({ on: [CATCH[0] - 0.1, CATCH[1] - 0.25, CATCH[2]], dist: 3.4, to: 2.8, yaw: 24, pitch: -4, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The blade comes down and stops dead in the air, in a green hand that was not there a frame ago. Sparks.",
      impacts: [{ at: 0.2, amp: 0.14, dur: 0.45 }],
      stage: (t) => {
        const fall = Math.min(1, (t / 0.2) ** 2);
        const inn = 1 - (1 - ramp(t, 0, 0.2)) ** 2;
        const mo: Vec3 = [MO_CATCH[0] + 0.4 * (1 - inn), 0, MO_CATCH[2] + 2.4 * (1 - inn)];
        return (
          <>
            <Caught t={t} fall={fall} />
            <Mo position={mo} rotationY={E} animation="idle" arms="reachUp" face="angry" gaze={0} />
            <Hero position={STAND} rotationY={W} animation="guard" face="calm" headPitch={0.2} />
            {t < 0.25 ? <Streaks position={[mo[0], 1, mo[2]]} yaw={0} t={t} n={7} spread={0.8} speed={14} /> : null}
            <Bits position={CATCH} t={t - 0.2} color="#fff2b0" count={14} power={3.4} />
            <Fill on={MOFACE} yaw={24} power={7} />
            <Glow position={CATCH} size={1.6} color="#fff2b0" opacity={0.8 * Math.max(0, 1 - Math.abs(t - 0.22) / 0.14)} />
          </>
        );
      },
    },
    {
      cue: "15.mo",
      ...cam.orbit({ on: [-5.1, 1.5, 2.2], dist: 2.8, yaw: 50, pitch: 0, yawTo: 14, pitchTo: 6, distTo: 5.6, onTo: [-5.1, 1.25, 2.3], fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The camera swings out and there he is: the straw hat, the scarf, one arm up, holding a sword by the blade. The big man is pushing on it with both feet dug in, and it is not moving.",
      stage: (t) => {
        const open = t > wordAt("15.mo", "mo") + 0.1;
        return (
          <>
            <MumDown reach={0.4} />
            <Caught t={t} />
            <Mo position={[MO_CATCH[0], 0, MO_CATCH[2]]} rotationY={E} animation="idle" arms="reachUp" face="angry" gaze={0} />
            <Fill on={MOFACE} yaw={30} power={8} d={2.4} />
            <Hero position={STAND} rotationY={W} animation={open ? "idle" : "guard"} face={open ? "wow" : "calm"} lookAt={open ? CATCH : undefined} />
          </>
        );
      },
    },
    {
      cue: "15.red",
      ...cam.push({ on: [CATCH[0], CATCH[1] - 0.05, CATCH[2]], onTo: [CATCH[0], CATCH[1] - 0.3, CATCH[2]], dist: 1.7, to: 1.2, yaw: 172, pitch: -2, fov: 36 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The hand on the blade. Something runs down the wrist and drips. On 'red' we are close enough to see the colour.",
      stage: (t) => {
        const red = wordAt("15.red", "red");
        return (
          <>
            <Caught t={t} />
            <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" face="angry" gaze={0} />
            <Fill on={CATCH} yaw={172} power={4} d={1.4} />
            <Block position={[CATCH[0] + 0.02, CATCH[1] - 0.06, CATCH[2] - 0.115]} size={[0.07, 0.2 * ease(ramp(t, 0.1, 0.8)) + 0.02, 0.02]} color="#000000" emissive="#d8141c" emissiveIntensity={1} castShadow={false} />
            <Drops position={[CATCH[0] + 0.02, CATCH[1] - 0.15, CATCH[2] - 0.12]} t={t - 0.3} />
            <Glow position={[CATCH[0], CATCH[1] - 0.2, CATCH[2] - 0.2]} size={0.9} color="#ff2a2a" opacity={0.35 * Math.max(0, 1 - Math.abs(t - red - 0.1) / 0.3)} />
          </>
        );
      },
    },
    {
      cue: "15.zombie",
      ...cam.push({ on: faceOf(STAND), dist: 2.3, to: 1.7, yaw: -30, pitch: 6, fov: 36 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The boy, looking up at it. A red drop lands on his yellow shoulder. He knows what zombies bleed, and it is not that.",
      stage: (t) => (
        <>
          <Hero position={STAND} rotationY={W + 0.5} animation="idle" face="wow" headPitch={-0.45} headYaw={-0.3} />
          <Fill on={faceOf(STAND)} yaw={-30} />
          <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" face="angry" gaze={0} />
          <Drops position={[CATCH[0] + 0.02, CATCH[1] - 0.15, CATCH[2] + 0.12]} t={t + 1} />
          {t > 0.5 ? <Block position={[STAND[0] - 0.02, 1.085, STAND[2] + 0.2]} size={[0.07, 0.03, 0.07]} color="#000000" emissive="#d8141c" emissiveIntensity={1} castShadow={false} /> : null}
        </>
      ),
    },
    {
      cue: "16.scarf",
      ...cam.push({ on: MOFACE, dist: 2.4, to: 2.0, yaw: 56, pitch: 5, fov: 36 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Mo turns his head to the boy. On 'pulled' the scarf comes down off his face for the first time in the film.",
      stage: (t) => {
        const pull = wordAt("16.scarf", "pulled");
        const k = ease(ramp(t, pull, pull + 0.3));
        return (
          <>
            <Caught t={t} />
            <Fill on={MOFACE} yaw={56} power={6} />
            <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" scarf={1 - k} face="neutral" headYaw={-0.9 * (1 - ease(ramp(t, 0, 0.35)))} headPitch={0.1} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "16.paint",
      ...cam.push({ on: MOFACE, dist: 2.0, to: 1.6, yaw: 58, pitch: 5, fov: 32 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "His sleeve goes across his cheek, once, hard. Behind it the green is gone, and flakes of it are falling.",
      stage: (t) => {
        const wipe = wordAt("16.paint", "wiped");
        const came = wordAt("16.paint", "green");
        const k = ease(ramp(t, wipe, wipe + 0.55));
        return (
          <>
            <Fill on={MOFACE} yaw={58} power={6} />
            <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" scarf={0} sleeve={k > 0 && k < 1 ? k : undefined} wiped={k} face="neutral" headPitch={0.1} headRoll={-0.12 * Math.sin(k * Math.PI)} gaze={0} />
            <Bits position={[MOFACE[0] + 0.25, MOFACE[1] - 0.05, MOFACE[2] + 0.1]} t={t - came + 0.2} color="#5f9a4e" count={12} power={1.4} />
            <Bits position={[MOFACE[0] + 0.25, MOFACE[1] - 0.05, MOFACE[2] + 0.1]} t={t - wipe - 0.2} color="#5f9a4e" count={8} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "16.skin",
      ...cam.pan({ from: [-4.55, 1.4, 4.6], on: [MOFACE[0] + 0.1, MOFACE[1], MOFACE[2]], onTo: faceOf(STAND), fov: 24 }),
      ease: "inOutCubic",
      zone: ZONE.night,
      look: NIGHT,
      note: "The bare patch on his cheek: skin. Then across to the boy's face beside it. The same colour.",
      stage: (t) => (
        <>
          <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" scarf={0} wiped={1} face="neutral" headPitch={0.1} gaze={0} />
          <Hero position={STAND} rotationY={W + 1.2} animation="idle" face="wow" headPitch={-0.3} />
          <Fill on={[-4.8, 1.4, 2.4]} yaw={10} power={8} d={2.0} />
        </>
      ),
    },
    {
      cue: "16.say",
      ...cam.push({ on: MOFACE, dist: 2.8, to: 2.2, yaw: 54, pitch: 5, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Mo, hat pushed back, scarf down, one cheek clean, still holding the sword up without looking at it. He says it to the boy as if it were nothing.",
      impacts: [{ at: 1.9, amp: 0.05, dur: 0.4 }],
      stage: (t) => {
        const i = wordAt("16.say", "i");
        return (
          <>
            <Caught t={t} />
            <Mo position={MO_CATCH} rotationY={E} animation="idle" arms="reachUp" scarf={0} wiped={1} face={t > i ? "smile" : "neutral"} headPitch={0.12 + jolt(t, i, 0.1)} />
            <Bubble text="I am human too." position={[MOFACE[0] + 0.1, MOFACE[1] + 0.85, MOFACE[2] + 0.3]} rotationY={0.94} scale={0.42 * pop(t, i)} tail={-1} />
            <Fill on={MOFACE} yaw={30} power={6} />
          </>
        );
      },
    },
  ],
});
