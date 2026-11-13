import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** HE DOES NOT THINK. Both arms into the mud; roots; one giant leaf. The first time he uses it on purpose, and it is FAST. */
const SLAM = wordAt("3.fast", "arms");
const LEAFW = wordAt("3.leaf", "leaf");
const LEAF_CUE = timing.cues.find((c) => c.id === "3.leaf")!;
const CATCH = Math.min(LEAF_CUE.end - LEAF_CUE.start - 0.08, LEAFW + 0.3);
/** Where his feet are when his arms are in the mud: one lunge forward from where he stood. */
export const PLANT: Vec3 = ahead(HANDS, ROOTWAY, -1.25);
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Roots",
  shots: [
    {
      cue: "3.fast",
      ...cam.push({ on: [PLANT[0] + 0.5, 0.8, PLANT[2] - 0.2], dist: 4.6, to: 3.4, yaw: 19, pitch: 8, fov: 44 }),
      impacts: [{ at: SLAM, amp: 0.1, dur: 0.45 }],
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on. He looks up after Tip, lunges forward, throws both arms over his head, and on 'arms' drives them down into the mud up to the elbows. Mud and dust fly; green cracks shoot out across the ground.",
      stage: (t) => {
        const go = ramp(t, SLAM - 0.6, SLAM - 0.22);
        const k = ramp(t, SLAM - 0.2, SLAM) ** 2;
        return (
          <>
            {t < SLAM - 0.6 ? (
              <Hero position={MUD} rotationY={ROOTWAY} animation="idle" face="fear" headPitch={-0.6} gaze={0} />
            ) : (
              <Plunger position={lerp3(MUD, PLANT, ease(go))} yaw={ROOTWAY} k={k} lift={t < SLAM - 0.12 ? 1 : 0} t={t} shake={t > SLAM ? 1 : 0} />
            )}
            <Garden />
            <Bits position={HANDS} t={t - SLAM} color="#5a4030" count={22} seed={3} power={2.0} />
            <Bits position={HANDS} t={t - SLAM - 0.05} color="#5cbd48" count={12} seed={8} power={1.4} />
            <DustRing position={HANDS} t={t - SLAM} size={2.2} color="#6a5040" />
            <Veins position={HANDS} yaw={ROOTWAY} k={ease(ramp(t, SLAM, SLAM + 0.5))} reach={2.4} />
            <pointLight position={[HANDS[0], 0.6, HANDS[2]]} color="#9dff8a" intensity={4 * ramp(t, SLAM, SLAM + 0.3)} distance={6} decay={2} />
            <Lit at={PLANT} />
          </>
        );
      },
    },
    {
      cue: "3.green",
      ...cam.push({ on: [HANDS[0] - 0.3, 0.45, HANDS[2]], dist: 2.6, to: 1.9, yaw: 150, pitch: 14, fov: 42 }),
      shake: 0.03,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second, from in front: his arms buried in the mud, shaking, and green light running out of them along the cracks in the ground.",
      stage: (t, { p }) => (
        <>
          <Plunger position={PLANT} yaw={ROOTWAY} k={1} t={t} shake={2} />
          <Garden />
          <Veins position={HANDS} yaw={ROOTWAY} k={0.6 + 0.4 * p} reach={3.2} />
          <Bits position={HANDS} t={0.1 + t * 0.6} color="#8dff7a" count={10} seed={5} power={0.9} />
          <pointLight position={[HANDS[0], 0.5, HANDS[2]]} color="#9dff8a" intensity={2 + 3 * p} distance={6} decay={2} />
          <Lit at={PLANT} power={8} />
        </>
      ),
    },
    {
      cue: "3.roots",
      from: [-11.95, 2.3, 11.98],
      to: [-9.6, 1.7, 11.2],
      target: [-8.98, 0.4, 10.0],
      targetTo: [-2.5, 0.8, 7.8],
      fov: 52,
      ease: "inCubic",
      impacts: [{ at: 0.12, amp: 0.08, dur: 0.5 }],
      shake: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From over his shoulder: the ground bursts in front of his hands and roots as thick as his arm come boiling out, smash through the pen fence, and are GONE across the town, faster and faster. The camera lunges after them.",
      stage: (t, { p }) => (
        <>
          <Plunger position={PLANT} yaw={ROOTWAY} k={1} t={t} shake={1} />
          <Garden />
          <Roots from={HANDS} to={LEAF} k={0.01 + 0.44 * p * p} />
          <Veins position={HANDS} yaw={ROOTWAY} k={1} reach={3.2} />
          <Bits position={[HANDS[0] + 0.6, 0.2, HANDS[2] - 0.2]} t={t - 0.1} color="#5a4030" count={20} seed={5} power={2.0} />
          <Bits position={pathAt(0.1, 0.3)} t={t - 0.75} color="#6b4a2a" count={16} seed={9} power={1.8} />
          <Streaks position={pathAt(0.2, 0.9)} yaw={ROOTWAY} t={t} n={p > 0.4 ? 10 : 0} spread={1.6} speed={16} />
        </>
      ),
    },
    {
      cue: "3.chase",
      from: [-7.7, 1.3, 9.57],
      to: [0.37, 1.3, 6.77],
      target: [1.75, 3.0, 6.3],
      targetTo: [9.82, 3.0, 3.5],
      fov: 64,
      ease: "linear",
      shake: 0.035,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Low and flat out, right behind the front of the roots as they tear across the town, throwing up dirt, the well flashing past on the left; and up ahead in the sky a small yellow figure coming down. The roots are gaining.",
      stage: (t, { p }) => {
        const front = pathAt(0.45 + 0.49 * p, 0.3);
        return (
          <>
            <Roots from={HANDS} to={LEAF} k={0.45 + 0.49 * p} />
            <Bits position={front} t={(((t * 4) % 1) + 0.05) * 0.35} color="#8a7a66" count={10} seed={3} power={1.3} />
            <Bits position={pathAt(0.45 + 0.49 * p - 0.06, 0.3)} t={(((t * 4 + 0.5) % 1) + 0.05) * 0.35} color="#5a4030" count={8} seed={7} power={1.1} />
            <Streaks position={[front[0], 1.4, front[2]]} yaw={ROOTWAY} t={t} n={16} spread={2.4} speed={22} />
            <Tip position={pathAt(0.66 + 0.3 * p, 8.5 - 4 * p)} rotationY={t * 9} tilt={Math.sin(t * 8) * 0.9} strain={1} />
            <Streaks position={pathAt(0.66 + 0.3 * p, 9.5 - 4 * p)} yaw={0} pitch={-1.5708} t={t} n={6} spread={0.5} speed={16} color="#ffffff" />
          </>
        );
      },
    },
    {
      cue: "3.leaf",
      ...cam.push({ on: [LEAF[0], 2.5, LEAF[2]], dist: 8.4, to: 6.4, yaw: 0, pitch: 2, fov: 50 }),
      impacts: [{ at: CATCH, amp: 0.07, dur: 0.4 }],
      shake: 0.015,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The road. Tip is coming down head first, turning over. The roots slide in underneath him, rear up, and on 'leaf' snap open into a single green leaf the size of a cart, exactly as he arrives.",
      stage: (t) => {
        const fall = Math.min(1, t / CATCH);
        const y = 4.5 - 3.4 * fall * fall;
        const sag = t > CATCH ? 0.45 * ramp(t, CATCH, CATCH + 0.08) : 0;
        return (
          <>
            <Roots from={HANDS} to={LEAF} k={0.94 + 0.06 * ease(ramp(t, 0, 0.4))} />
            <BigLeaf position={LEAF} grow={Math.min(1.12, pop(t, LEAFW - 0.3, 0.3))} rotationY={0.3} dip={sag} />
            <Tip position={[LEAF[0], y - sag, LEAF[2]]} rotationY={t * 9 * (1 - fall * 0.5)} tilt={Math.sin(t * 8) * 0.9 * (1 - fall)} strain={1} />
            <Streaks position={[LEAF[0], y + 1.2, LEAF[2]]} yaw={0} pitch={-1.5708} t={t} n={t < CATCH ? 8 : 0} spread={0.5} speed={16} color="#ffffff" />
            <Bits position={[LEAF[0], 0.2, LEAF[2]]} t={t - 0.3} color="#8a7a66" count={14} seed={3} power={1.3} />
            <Bits position={[LEAF[0], 1.3, LEAF[2]]} t={t - CATCH} color="#5cbd48" count={16} seed={4} power={1.4} />
            <FireLight position={[LEAF[0] + 1.5, 2.4, LEAF[2] + 2.5]} power={16} reach={9} seed={5} />
          </>
        );
      },
    },
    {
      cue: "3.catch",
      ...cam.push({ on: [LEAF[0], 1.7, LEAF[2]], dist: 5.0, to: 3.6, yaw: 22, pitch: 12, fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The leaf sags right down under him, throws him back up, catches him again, twice, and folds round him. He sits there swaying, eyes going round. He is fine.",
      stage: (t) => {
        const up = tossed(t, 0.05, 1.0, 0.75);
        const dip = 0.45 * Math.max(0, 1 - t / 0.12) + (up < 0.02 && t > 0.1 ? 0.12 * Math.abs(Math.sin(t * 9)) * Math.exp(-t) : 0);
        const air = up > 0.05 ? 1 : 0;
        return (
          <>
            <Roots from={HANDS} to={LEAF} k={1} />
            <BigLeaf position={LEAF} rotationY={0.3} dip={dip} />
            <Tip position={[LEAF[0], 1.08 - dip + up, LEAF[2]]} rotationY={0.4 + up * 2} scale={0.94} tilt={air * Math.sin(t * 10) * 0.5} hmm={air ? 0 : 1} strain={air} />
            <Bits position={[LEAF[0], 1.3, LEAF[2]]} t={t} color="#5cbd48" count={12} seed={4} power={1.0} />
            <Bits position={[LEAF[0], 1.3, LEAF[2]]} t={t - 0.82} color="#5cbd48" count={8} seed={6} power={0.7} />
            <Lit at={[LEAF[0], 1, LEAF[2]]} />
          </>
        );
      },
    },
  ],
});
