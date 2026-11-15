import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Black, EAST, Fill, HIDE, HTREE, Helmet, Hero, KID, KIDSPOT, NIGHT, NewKid, SubscribeSign, Tentacle, WEST, at, ease, faceOf, kidHead, mix, ramp, timing, toward,
  wordAt,
} from "./kit";
import { PEEK } from "./scene3";
import { POV } from "./scene4";

const K: Vec3 = at(KIDSPOT, 0, 0, -0.32);
/** Where the helmet fell, and where he stands to pick it up. */
const FELL: Vec3 = at(KIDSPOT, 1.0, 0.25, 1.3);
const PICK: Vec3 = at(KIDSPOT, 0.72, 0, 0.75);
/** One step back from the edge of the trunk, and the stick that is there. */
const STEP: Vec3 = at(PEEK, 0.5, 0, -0.12);
const STICK: Vec3 = at(STEP, 0.06, 0.035, 0.05);
const PURPLE = "#b25ad0";
/** The helmet in his two hands, in front of his chest. */
const held = (p: Vec3, yaw: number, t: number): Vec3 => [p[0] + Math.sin(yaw) * 0.3 + Math.sin(t * 43) * 0.008, 0.82 + Math.sin(t * 37) * 0.008, p[2] + Math.cos(yaw) * 0.3];
const LooseHelmet: React.FC<{ position: Vec3; rotation?: Vec3 }> = ({ position, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation} scale={KID}>
    <Helmet />
  </group>
);
/** The one arm that comes looking: out of the hole, up, and over towards the tree. `g` 0–1 is how far it has come. */
const Seeker: React.FC<{ g: number; t: number; tip: Vec3; from?: Vec3; thick?: number }> = ({ g, t, tip, from = at(kidHead(PICK), 0, 0, 0.1), thick = 0.26 }) => (
  <Tentacle from={from} to={tip} k={g} t={t * 0.5} thick={thick} seed={2} bend={0.55} n={44} />
);

/**
 * ACT 5. It is quiet. He picks up his helmet. A stick snaps. Something comes round the tree.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "It heard me",
  shots: [
    {
      cue: "5.quiet",
      ...cam.top({ on: at(KIDSPOT, 0.3, 0, 0.5), height: 5.8, to: 5.0, spin: [10, 0], fov: 46 }),
      zone: "woods",
      look: NIGHT,
      note: "Straight down on the clearing: one kid, one lamp, a helmet on the ground. Nobody else. Three seconds ago there were four.",
      stage: () => (
        <>
          <NewKid position={K} animation="idle" bare holeGlow={0.5} breath={0.3} />
          <LooseHelmet position={FELL} rotation={[0.2, 0.7, 1.2]} />
        </>
      ),
    },
    {
      cue: "5.pick",
      ...cam.push({ on: at(FELL, -0.15, 0.7, -0.3), dist: 3.4, to: 2.9, yaw: 100, pitch: 6, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "From the side: he walks to the helmet, bends, and lifts it in both hands. The hole is in profile, a black edge and no more. The helmet rattles in his hands.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.7));
        const picked = wordAt("5.pick", "picked");
        const up = ease(ramp(t, picked + 0.1, picked + 0.7));
        const p = mix(K, PICK, walk);
        const yaw = toward(PICK, FELL);
        return (
          <>
            <NewKid position={p} rotationY={yaw} animation={walk < 1 ? "walk" : up < 1 ? "crouch" : "idle"} arms={walk >= 1 ? "hold" : undefined} animDistance={walk * 0.9} bare holeGlow={0.4} />
            <LooseHelmet position={mix(FELL, held(PICK, yaw, t), up)} rotation={[0.2 * (1 - up), 0.7 * (1 - up) + yaw * up, 1.2 * (1 - up)]} />
            <Fill position={at(FELL, 0.6, 1.2, -1.4)} power={5} color="#ffd9a0" />
          </>
        );
      },
    },
    {
      cue: "5.step",
      ...cam.push({ on: at(STEP, -0.2, 0.18, 0), dist: 1.5, to: 1.3, yaw: 128, pitch: 10, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "His feet, at the foot of the tree: one goes back, slowly. There is a dry stick behind it.",
      stage: (t) => {
        const k = ease(ramp(t, wordAt("5.step", "step") - 0.35, wordAt("5.step", "step") + 0.25));
        return (
          <>
            <Hero position={mix(PEEK, STEP, k * 0.8)} rotationY={WEST} animation="creep" animDistance={-k * 0.5} face="fear" />
            <Black position={STICK} size={[0.5, 0.045, 0.045]} color="#6a4a2c" />
            <Fill position={at(STEP, 0.6, 0.6, 0.9)} power={3.5} />
          </>
        );
      },
    },
    {
      cue: "5.stick",
      ...cam.push({ on: at(STICK, 0, 0, 0), dist: 1.15, to: 0.9, yaw: 100, pitch: 52, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "Down on the stick: the heel comes down on it and it breaks in two. The loudest thing in the film.",
      stage: (t) => {
        const snap = wordAt("5.stick", "snapped");
        const k = ease(ramp(t, snap - 0.3, snap));
        const broke = t > snap;
        return (
          <>
            <Hero position={mix(at(PEEK, 0.4, 0, -0.1), STEP, k)} rotationY={WEST} animation="creep" animDistance={-0.5 - k * 0.3} face="fear" />
            {broke ? (
              <>
                <group position={at(STICK, -0.14, 0.02, 0)} rotation={[0, 0.3, 0.35]}>
                  <Black position={[0, 0, 0]} size={[0.24, 0.045, 0.045]} color="#6a4a2c" />
                </group>
                <group position={at(STICK, 0.14, 0.02, 0)} rotation={[0, -0.2, -0.4]}>
                  <Black position={[0, 0, 0]} size={[0.24, 0.045, 0.045]} color="#6a4a2c" />
                </group>
                <Bits position={at(STICK, 0, 0.05, 0)} t={t - snap} color="#c9a36a" count={10} power={1.6} />
              </>
            ) : (
              <Black position={STICK} size={[0.5, 0.045, 0.045]} color="#6a4a2c" />
            )}
            <Fill position={at(STEP, 0.5, 0.8, 0.8)} power={4} />
          </>
        );
      },
    },
    {
      cue: "5.stop",
      ...cam.push({ on: at(kidHead(PICK), 0, -0.2, 0), dist: 5.2, to: 5.0, yaw: 70, pitch: 2, fov: 24 }),
      zone: "woods",
      look: NIGHT,
      note: "Long lens from the tree: the kid, the helmet halfway up to his head, and he has stopped. Nothing in the frame moves at all.",
      stage: () => {
        const yaw = toward(PICK, FELL);
        return (
          <>
            <NewKid position={PICK} rotationY={yaw} animation="idle" arms="hold" bare holeGlow={0.9} breath={0} weightShift={0} time={0} />
            <LooseHelmet position={at(held(PICK, yaw, 0), 0, 0.22, 0)} rotation={[0, yaw, 0]} />
          </>
        );
      },
    },
    {
      cue: "5.turn",
      ...cam.push({ on: at(POV.on, 0.4, 0.5, -0.4), dist: 8.6, to: 7.6, yaw: 70, pitch: POV.pitch, fov: 34 }),
      zone: "woods",
      look: NIGHT,
      note: "From the tree again. He does not turn round. One arm comes up out of him instead, on its own, and swings slowly until the end of it is pointing straight down the lens.",
      stage: (t, { dur }) => {
        const yaw = toward(PICK, FELL);
        const out = ease(ramp(t, 0.1, 1.2));
        const point = ease(ramp(t, wordAt("5.turn", "slowly") - 0.2, wordAt("5.turn", "pointed") + 0.5));
        const h = kidHead(PICK);
        const tip: Vec3 = mix(at(h, -0.6, 1.9, -0.4), at(h, 3.3, 0.5, 1.25), point);
        return (
          <>
            <NewKid position={PICK} rotationY={yaw} animation="idle" arms="hold" bare holeGlow={1.2} breath={0} weightShift={0} time={0} />
            <LooseHelmet position={at(held(PICK, yaw, 0), 0, 0.22, 0)} rotation={[0, yaw, 0]} />
            <Seeker g={out} t={t} tip={tip} />
            <Hero position={HIDE} rotationY={WEST} animation="peek" face="fear" />
            <Fill position={at(h, 0.3, 0.4, 0.4)} power={8 + 6 * (t / dur)} color={PURPLE} reach={5} />
          </>
        );
      },
    },
    {
      cue: "5.breath",
      ...cam.push({ on: faceOf(HIDE), dist: 1.7, to: 1.4, yaw: 97, pitch: 0, fov: 36 }),
      zone: "woods",
      look: NIGHT,
      note: "The other side of the tree: his back flat against the bark, eyes wide, mouth shut. Purple light creeps round both edges of the trunk.",
      stage: (t) => (
        <>
          <Hero position={at(HIDE, 0.02, 0, 0)} rotationY={EAST} animation="idle" face="fear" gaze={0} blink={false} breath={0} weightShift={0} />
          <Fill position={at(HIDE, 1.2, 1.3, 0.5)} power={4.5} />
          <Fill position={at(HTREE, -0.9, 1.4, 1.0)} power={5 + 4 * ease(ramp(t, 0, 1.6))} color={PURPLE} reach={4} />
        </>
      ),
    },
    {
      cue: "5.closer",
      ...cam.push({ on: at(HIDE, 0, 1.2, 0.2), dist: 2.4, to: 1.9, yaw: 102, pitch: 1, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "A little wider, held for the longest shot of the film: the end of the arm comes round the trunk beside his head, feeling its way, and on 'bark' it lays itself on the wood a hand from his cheek. His eyes go to it. Nothing else of him moves.",
      stage: (t) => {
        const touch = wordAt("5.closer", "touched");
        const g = 0.72 + 0.28 * ease(ramp(t, 0.1, touch + 0.3));
        const tip: Vec3 = mix(at(HTREE, -0.2, 1.5, 1.2), at(HTREE, 0.52, 1.24, 0.56), ease(ramp(t, 0.4, touch + 0.3)));
        return (
          <>
            <Hero position={at(HIDE, 0.02, 0, 0)} rotationY={EAST} animation="idle" face="fear" gaze={t > touch - 0.4 ? -1 : 0} blink={false} breath={0} weightShift={0} />
            <Seeker g={g} t={t} tip={tip} from={at(HTREE, -6.2, 1.2, -2.2)} thick={0.5} />
            <Fill position={at(HIDE, 1.2, 1.3, 0.6)} power={4.5} />
            <Fill position={at(HTREE, 0.2, 1.4, 1.2)} power={7} color={PURPLE} reach={4} />
          </>
        );
      },
    },
    {
      cue: "9.sub",
      ...cam.push({ on: at(HIDE, 0, 1.3, 0.2), dist: 1.9, to: 1.75, yaw: 102, pitch: 1, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "The same frame. The end of the arm lifts off the bark and turns, slowly, to his face. The sign comes up over his head; in the last frames the picture goes black.",
      stage: (t, { dur }) => {
        const k = ease(ramp(t, 0.1, dur - 0.3));
        const tip: Vec3 = mix(at(HTREE, 0.52, 1.24, 0.56), at(HIDE, 0.05, 1.22, 0.32), k);
        return (
          <>
            <Hero position={at(HIDE, 0.02, 0, 0)} rotationY={EAST} animation="idle" face="fear" gaze={-1} blink={false} breath={0} weightShift={0} />
            <Seeker g={1} t={t} tip={tip} from={at(HTREE, -6.2, 1.2, -2.2)} thick={0.5} />
            <SubscribeSign position={at(HIDE, 0.34, 1.52, 0.12)} rotationY={EAST} scale={0.21 * ease(ramp(t, 0.1, 0.4))} />
            <Fill position={at(HIDE, 1.2, 1.3, 0.6)} power={4.5} />
            <Fill position={at(HTREE, 0.2, 1.4, 1.2)} power={7} color={PURPLE} reach={4} />
            {t > dur - 0.12 ? <Black position={at(HIDE, 1.2, 1.25, 0.4)} size={[0.1, 4, 4]} /> : null}
          </>
        );
      },
    },
  ],
});
