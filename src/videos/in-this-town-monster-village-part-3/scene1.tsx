import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  ARMTREE, ARM_HIDE, ARM_PEEK, AimSword, Arm, ArmTree, Army, BLADE, Bits, DAY, DUSK, DustRing, EAST, Glint, HELM, Hero, IronHelmet, KNEEL, Mo, NIGHT, NORTH, Puffs,
  Raider, SPOT, Sack, Streaks, WEST, Z3, ease, faceOf, hop, jolt, manFace, mix, ramp, timing, toward, wordAt,
} from "./kit";

/** What Mo left in the street. */
const Left: React.FC<{ helmet?: boolean }> = ({ helmet = true }) => (
  <>
    <ArmTree />
    <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
    {helmet ? <IronHelmet position={HELM} rotation={[0.2, 0.5, 1.35]} /> : null}
  </>
);
/** He kneels with his back to the tree. */
const AWAY = toward(ARMTREE, KNEEL);
/** Where the arm gets to before it stops. */
const HALF: Vec3 = mix(ARM_PEEK, KNEEL, 0.5);
const TO_BOY = toward(ARM_PEEK, KNEEL);
/** The players come from the east end of the street. */
const gang = (i: number): Vec3 => [KNEEL[0] + 2.2 + (i % 5) * 1.25 + (i > 4 ? 0.6 : 0), 0, KNEEL[2] - 1.5 + Math.floor(i / 5) * 2.6 + ((i * 7) % 3) * 0.35];

/** THE STREET: what Mo left, what was behind the boy, and who came for him. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "What was behind me",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [-2.8, 0.5, 3.8], dist: 3.6, to: 3.0, yaw: -25, pitch: 3, fov: 52 }),
      zone: Z3.street,
      look: DUSK,
      note: "FRAME ONE IS THE PREMISE: a skeleton's arm, on its own, stands up on its elbow in the grass right in front of the lens and its fingers work. Past it, small, a boy in yellow kneels in an empty monster street over a sword and a helmet. From the ground.",
      stage: (t) => (
        <>
          <Left />
          <Hero position={KNEEL} rotationY={AWAY} animation="crouch" face="fear" headPitch={0.35} />
          <Arm position={[-3.3, 0, 5.2]} rotationY={TO_BOY} rear={ease(ramp(t, 0, 0.35))} talk={t} turn={0.3 * Math.sin(t * 3)} />
        </>
      ),
    },
    {
      cue: "1.friend",
      ...cam.push({ on: [SPOT[0] - 2.5, 1.5, SPOT[2]], dist: 5.2, to: 4.2, yaw: 78, pitch: -6, fov: 56 }),
      zone: Z3.night,
      look: NIGHT,
      note: "Last night, from behind Mo's knees: one man with a sword, and the whole hill in front of him coming down with torches.",
      stage: (t) => (
        <>
          <Mo position={SPOT} rotationY={WEST} animation="idle" arms="hold" face="brave" scarf={0}>
            <AimSword position={[0, 0.1, 0.1]} yaw={0} pitch={-1.2} />
          </Mo>
          <Army t={t} from={-9.5} rows={12} cols={7} adv={1.6 * t} />
          <pointLight position={[-12, 3, 2]} color="#ff9040" intensity={60} distance={22} decay={2} />
        </>
      ),
    },
    {
      cue: "1.found",
      ...cam.top({ on: [SPOT[0], 0, SPOT[2]], height: 5.2, to: 3.3, spin: [-25, 8], fov: 44 }),
      zone: Z3.street,
      look: DUSK,
      note: "Straight down, turning: a sword and a helmet on the cobbles and nobody. A yellow boy walks in at the edge and stops.",
      stage: (t) => {
        const sword = wordAt("1.found", "sword");
        const helmet = wordAt("1.found", "helmet");
        const k = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Left />
            <Hero position={mix([KNEEL[0] + 1.6, 0, KNEEL[2] - 1.4], [KNEEL[0] + 0.5, 0, KNEEL[2] - 0.5], k)} rotationY={toward([KNEEL[0] + 1.6, 0, KNEEL[2] - 1.4], HELM)} animation={k < 1 ? "walk" : "idle"} animDistance={1.6 * k} face="fear" headPitch={0.5} />
            <Glint position={[BLADE[0], 0.3, BLADE[2]]} t={t - sword} size={1.2} />
            <Glint position={[HELM[0], 0.4, HELM[2]]} t={t - helmet} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "1.pick",
      ...cam.push({ on: faceOf([KNEEL[0], -0.42, KNEEL[2]]), dist: 2.5, to: 2.0, yaw: 142, pitch: 4, fov: 40 }),
      zone: Z3.street,
      look: DUSK,
      note: "His face, close, the helmet coming up in his hands. Over his shoulder, small and soft, the tree: and at its foot something thin and white stands up.",
      stage: (t) => {
        const behind = wordAt("1.pick", "behind");
        const up = ease(ramp(t, 0.15, 0.7));
        return (
          <>
            <ArmTree />
            <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
            <Hero position={KNEEL} rotationY={AWAY} animation="crouch" arms="hold" face="frown" headPitch={0.3}>
              <IronHelmet position={[-0.12, 0.05 + 0.1 * up, 0.2]} rotation={[0.2, 0.2, 0]} scale={0.9} />
            </Hero>
            <Arm position={ARM_PEEK} rotationY={TO_BOY} rear={ease(ramp(t, behind - 0.1, behind + 0.25))} talk={t > behind ? t : 0} scale={1.5} />
            <Glint position={[ARM_PEEK[0], 0.7, ARM_PEEK[2]]} t={t - behind} size={1.4} />
          </>
        );
      },
    },
    {
      cue: "2.tree",
      ...cam.orbit({ on: [ARM_PEEK[0], 0.6, ARM_PEEK[2]], dist: 2.4, yaw: 150, yawTo: 112, pitch: 10, pitchTo: 6, fov: 40 }),
      zone: Z3.street,
      look: DUSK,
      note: "Round the foot of the tree, at the height of a mouse: a skeleton's arm, standing on its elbow, drumming its fingers.",
      stage: (t) => {
        const followed = wordAt("2.tree", "followed");
        return (
          <>
            <Left />
            <Hero position={KNEEL} rotationY={AWAY} animation="crouch" face="frown" headPitch={0.4} />
            <Arm position={ARM_PEEK} rotationY={TO_BOY} rear={1} talk={t} finger={ease(ramp(t, followed, followed + 0.2))} />
            <pointLight position={[ARM_PEEK[0] + 1, 1.2, ARM_PEEK[2] - 0.6]} color="#cfd8ff" intensity={6} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "2.watch",
      ...cam.push({ on: [ARM_PEEK[0] + 0.1, 0.8, ARM_PEEK[2]], dist: 2.0, to: 1.6, yaw: 128, pitch: 2, fov: 34 }),
      zone: Z3.street,
      look: DUSK,
      note: "From the boy's side, tight: the hand leans out past the trunk and tips, like a head on one side. It has no eyes. It is watching.",
      stage: (t) => {
        const how = wordAt("2.watch", "how");
        return (
          <>
            <ArmTree />
            <Arm position={[ARM_PEEK[0] + 0.15 * ease(ramp(t, 0, 0.5)), 0, ARM_PEEK[2]]} rotationY={TO_BOY} rear={1} turn={0.7 * Math.sin(t * 2.6) + jolt(t, how, 0.5)} talk={t * 0.4} scale={1.1} />
          </>
        );
      },
    },
    {
      cue: "2.crawl",
      ...cam.truck({ on: [ARM_PEEK[0] + 0.3, 0.12, ARM_PEEK[2] - 0.2], dist: 2.1, yaw: -60, pitch: 3, fov: 46, by: [HALF[0] - ARM_PEEK[0], 0, HALF[2] - ARM_PEEK[2]] }),
      zone: Z3.street,
      look: DUSK,
      note: "The camera slides along the ground beside it: the arm walks on four fingers, the elbow dragging, towards a yellow back that does not turn.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 2.2));
        const at = mix(ARM_PEEK, HALF, k);
        return (
          <>
            <Left />
            <Hero position={KNEEL} rotationY={AWAY} animation="crouch" arms="hold" face="frown" headPitch={0.4}>
              <IronHelmet position={[-0.12, 0.12, 0.2]} rotation={[0.2, 0.2, 0]} scale={0.9} />
            </Hero>
            <Arm position={at} rotationY={TO_BOY} crawl={k * 2.2} />
            <Puffs position={[at[0], 0.05, at[2] - 0.3]} color="#8a7a66" count={3} rise={0.2} spread={0.15} size={0.05} speed={1.6} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "2.hide",
      ...cam.push({ on: [-2.9, 0, 3.9], dist: 6.6, to: 5.8, yaw: 70, pitch: 52, fov: 44 }),
      zone: Z3.street,
      look: DUSK,
      note: "From high up: the boy, the arm halfway to him, the tree. The arm stops dead, spins round and goes back behind the trunk twice as fast. A long shadow comes into the east edge of the frame.",
      stage: (t) => {
        const stopped = wordAt("2.hide", "stopped");
        const back = wordAt("2.hide", "back");
        const k = ease(ramp(t, back - 0.1, back + 0.45));
        const at = mix(HALF, ARM_HIDE, k);
        return (
          <>
            <Left />
            <Hero position={KNEEL} rotationY={AWAY} animation="crouch" arms="hold" face="frown" headPitch={0.4}>
              <IronHelmet position={[-0.12, 0.12, 0.2]} rotation={[0.2, 0.2, 0]} scale={0.9} />
            </Hero>
            <Arm position={[at[0], hop(t, stopped, 0.25, 0.2), at[2]]} rotationY={TO_BOY + Math.PI * ease(ramp(t, stopped + 0.1, back))} crawl={t < stopped ? t * 2 : k * 5} rear={t > stopped && t < back ? 0.6 : 0} scale={1.3} />
            <DustRing position={[HALF[0], 0.05, HALF[2]]} t={t - back} size={0.7} color="#b9a98a" />
            <pointLight position={[HALF[0], 2.5, HALF[2]]} color="#cfd8ff" intensity={14} distance={8} decay={2} />
            <Raider who={0} position={[KNEEL[0] + 7.2 - 1.4 * t, 0, KNEEL[2] - 0.4]} rotationY={WEST} animation="walk" animDistance={1.4 * t} face="angry" />
          </>
        );
      },
    },
    {
      cue: "2.player",
      ...cam.push({ on: [KNEEL[0] + 2.8, 1.0, KNEEL[2] - 1.2], dist: 4.4, to: 3.7, yaw: -84, pitch: 2, fov: 50 }),
      zone: Z3.street,
      look: DUSK,
      note: "From behind the boy's head, low: he looks up and round, and a player twice his size is walking straight at him down the middle of the street with a sword.",
      stage: (t) => {
        const seen = wordAt("2.player", "seen");
        return (
          <>
            <AimSword position={BLADE} yaw={1.1} pitch={0} scale={1.15} />
            <Hero position={KNEEL} rotationY={AWAY + (EAST - AWAY) * ease(ramp(t, seen - 0.2, seen + 0.2))} animation={t > seen ? "scared" : "crouch"} arms="hold" face="fear">
              <IronHelmet position={[-0.12, 0.12, 0.2]} rotation={[0.2, 0.2, 0]} scale={0.9} />
            </Hero>
            <Raider who={0} position={[KNEEL[0] + 5.6 - 1.3 * t, 0, KNEEL[2] - 0.4]} rotationY={WEST} animation="walk" animDistance={1.3 * t} face="angry" />
          </>
        );
      },
    },
    {
      cue: "2.more",
      ...cam.orbit({ on: [KNEEL[0] + 2.5, 0.9, KNEEL[2]], dist: 6.5, distTo: 10.5, yaw: 20, yawTo: -12, pitch: 14, pitchTo: 24, fov: 50 }),
      zone: Z3.street,
      look: DUSK,
      note: "The camera backs off and swings as they keep coming out between the houses: two, then ten, in every colour, and one small yellow boy in the middle of them.",
      stage: (t) => {
        const two = wordAt("2.more", "two");
        const ten = wordAt("2.more", "ten");
        return (
          <>
            <Left helmet={false} />
            <Hero position={KNEEL} rotationY={EAST} animation="scared" arms="hold" face="fear" headYaw={Math.sin(t * 7) * 0.8}>
              <IronHelmet position={[-0.12, 0.12, 0.2]} rotation={[0.2, 0.2, 0]} scale={0.9} />
            </Hero>
            {Array.from({ length: 10 }, (_, i) => {
              const at = i === 0 ? 0 : i === 1 ? two - 0.15 : ten - 0.25 + i * 0.03;
              const k = ease(ramp(t, at, at + 0.4));
              const to = gang(i);
              return t > at ? <Raider key={i} who={i} position={[to[0] + 4 * (1 - k), 0, to[2]]} rotationY={toward(to, KNEEL)} animation="walk" animDistance={4 * k + t} face="angry" torch={i % 4 === 3} /> : null;
            })}
          </>
        );
      },
    },
    {
      cue: "2.grab",
      ...cam.push({ on: faceOf(KNEEL), dist: 2.9, to: 2.4, yaw: 100, pitch: -8, fov: 42 }),
      zone: Z3.street,
      look: DUSK,
      note: "His face, from below. Two big hands come in from the sides; a brown sack comes down over the lens side of his head and that is the last of the daylight. The helmet hits the cobbles.",
      stage: (t) => {
        const grabbed = wordAt("2.grab", "grabbed");
        const sack = wordAt("2.grab", "sack");
        const k = ease(ramp(t, grabbed - 0.15, grabbed + 0.1));
        const on = t > sack;
        const fall = ease(ramp(t, sack, sack + 0.3));
        return (
          <>
            <Hero position={[KNEEL[0] + jolt(t, grabbed, 0.08), 0, KNEEL[2]]} rotationY={EAST} animation={on ? "panic" : "scared"} face="fear" head={on ? <Sack /> : undefined} />
            <Raider who={0} position={[KNEEL[0] + 0.1, 0, KNEEL[2] - 1.6 + 0.85 * k]} rotationY={0} animation="idle" arms="reach" face="angry" sword={false} />
            <Raider who={2} position={[KNEEL[0] + 0.1, 0, KNEEL[2] + 1.6 - 0.85 * k]} rotationY={NORTH} animation="idle" arms="reach" face="angry" sword={false} />
            {on ? null : <group position={[KNEEL[0], faceOf(KNEEL)[1] + 1.2 - 1.2 * ease(ramp(t, sack - 0.25, sack)), KNEEL[2]]}><Sack /></group>}
            <IronHelmet position={[KNEEL[0] + 0.7, 0.9 * (1 - fall), KNEEL[2] + 0.2]} rotation={[0.2 + 3 * fall, 0.5, 1.35 * fall]} />
            <Bits position={[KNEEL[0] + 0.7, 0.1, KNEEL[2] + 0.2]} t={t - sack - 0.3} color="#b9a98a" count={6} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "2.help",
      ...cam.truck({ on: [ARM_HIDE[0] + 0.6, 0.15, ARM_HIDE[2] - 0.3], dist: 1.9, yaw: -55, pitch: 4, fov: 52, by: [KNEEL[0] + 1.3 - ARM_HIDE[0], 0, KNEEL[2] + 0.6 - ARM_HIDE[2]] }),
      zone: Z3.street,
      look: DUSK,
      note: "The fastest thing in the film so far: the arm comes out from behind the tree flat out, the camera flying along the cobbles beside it, through a forest of boots, and it clamps on one.",
      stage: (t) => {
        const ankle = wordAt("2.help", "ankle");
        const k = ease(ramp(t, 0.15, ankle - 0.1));
        const foot: Vec3 = [KNEEL[0] + 1.3, 0, KNEEL[2] + 0.9];
        const at = mix(ARM_HIDE, [foot[0] - 0.25, 0, foot[2] - 0.05], k);
        return (
          <>
            <ArmTree />
            <Arm position={[at[0], k >= 1 ? 0.08 : 0, at[2]]} rotationY={toward(ARM_HIDE, foot)} crawl={k * 6} finger={0} scale={1.2} />
            <Streaks position={[at[0], 0.25, at[2]]} yaw={toward(foot, ARM_HIDE)} t={t} n={8} spread={0.7} speed={12} />
            <Raider who={1} position={[foot[0], hop(t, ankle, 0.35, 0.3), foot[2]]} rotationY={EAST} animation={t > ankle ? "panic" : "walk"} animDistance={t} face={t > ankle ? "surprised" : "angry"} />
            {[0, 3, 4, 5].map((i) => (
              <Raider key={i} who={i} position={[KNEEL[0] + 0.4 + i * 0.55, 0, KNEEL[2] - 1.1 + (i % 2) * 2.6]} rotationY={EAST} animation="walk" animDistance={t * 1.2} face="angry" />
            ))}
            <Hero position={[KNEEL[0] + 2.0, 0.75, KNEEL[2]]} rotationY={EAST} animation="panic" face="fear" head={<Sack />} />
            <DustRing position={[foot[0] - 0.2, 0.05, foot[2]]} t={t - ankle} size={0.8} color="#b9a98a" />
          </>
        );
      },
    },
    {
      cue: "2.many",
      ...cam.top({ on: [KNEEL[0] + 3.2, 0, KNEEL[2]], height: 9.5, to: 11.5, spin: [6, -6], fov: 46 }),
      zone: Z3.street,
      look: DUSK,
      note: "Straight down, rising: ten players in a block walking east with a yellow shape held over their heads, and a thin white arm shaken off behind them, left lying on the cobbles.",
      stage: (t) => {
        const go = wordAt("2.many", "let");
        const walk = 1.6 * t;
        const off = ease(ramp(t, go - 0.1, go + 0.25));
        return (
          <>
            <Left helmet={false} />
            <IronHelmet position={[KNEEL[0] + 0.7, 0, KNEEL[2] + 0.2]} rotation={[3.2, 0.5, 1.35]} />
            {Array.from({ length: 10 }, (_, i) => (
              <Raider key={i} who={i} position={[KNEEL[0] + 1.2 + (i % 5) * 1.0 + walk, 0, KNEEL[2] - 0.7 + Math.floor(i / 5) * 1.4]} rotationY={EAST} animation="walk" animDistance={walk} face="angry" torch={i % 4 === 3} />
            ))}
            <Hero position={[KNEEL[0] + 3.2 + walk, 1.75, KNEEL[2]]} rotationY={EAST} animation="lie" face="fear" head={<Sack />} />
            <Arm position={[KNEEL[0] + 0.9 + walk * (1 - off) - 0.6 * off, 0.5 * Math.sin(off * Math.PI), KNEEL[2] + 0.9 + 0.7 * off]} rotationY={EAST + 2.4 * off} crawl={t * (1 - off)} scale={1.5} />
          </>
        );
      },
    },
    {
      cue: "2.later",
      ...cam.push({ on: [KNEEL[0] + 0.5, 0.3, KNEEL[2] + 1.5], dist: 3.0, to: 4.4, yaw: -100, pitch: 5, fov: 50 }),
      zone: Z3.street,
      look: DUSK,
      note: "On the ground behind the arm, pulling back: it stands up on its elbow in an empty street and watches the last of them go, very small, at the far end. Then it turns round.",
      stage: (t) => {
        const later = wordAt("2.later", "later");
        const turn = ease(ramp(t, later - 0.3, later + 0.2));
        const at: Vec3 = [KNEEL[0] + 0.3, 0, KNEEL[2] + 1.6];
        return (
          <>
            <IronHelmet position={[KNEEL[0] + 0.7, 0, KNEEL[2] + 0.2]} rotation={[3.2, 0.5, 1.35]} />
            <Arm position={at} rotationY={EAST + 0.9 * turn} rear={1 - 0.7 * turn} turn={0.3 * Math.sin(t * 3)} scale={1.3} />
            {Array.from({ length: 6 }, (_, i) => (
              <Raider key={i} who={i} position={[KNEEL[0] + 9 + (i % 3) * 0.9 + 1.5 * t, 0, KNEEL[2] - 0.5 + Math.floor(i / 3) * 1.2]} rotationY={EAST} animation="walk" animDistance={1.5 * t} />
            ))}
            <Hero position={[KNEEL[0] + 10 + 1.5 * t, 1.75, KNEEL[2]]} rotationY={EAST} animation="lie" head={<Sack />} />
          </>
        );
      },
    },
  ],
});
void manFace;
