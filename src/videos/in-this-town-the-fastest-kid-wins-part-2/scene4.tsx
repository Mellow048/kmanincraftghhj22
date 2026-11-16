import { cam, gaitPose, getPose, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BabyInVan, Board, Bubble, Card, Cup, DAY, DS, Drone, DustRing, END2, Glint, LANE, Me, Pal, Place, Player, Puffs, Rival, Streaks, SubscribeSign, Sweat, TABLE2, Van,
  dur, ease, faceOf, hop, jolt, pop, ramp, timing, w,
} from "./kit";
import { E, ME_Z, Pack, bump, up } from "./cast";
import { Driver, GAIT, TIRED, X0 } from "./scene3";

/** The three in front: first place in the middle, a friend a step behind on each side. */
const Three: React.FC<{ x: number; t: number; back?: number; face?: "ouch" | "wow" | "uneasy" | "calm"; rival?: boolean; run?: boolean }> = ({ x, t, back = 0, face = "ouch", rival = true, run = false }) => (
  <>
    {rival ? <Rival position={DS(x, 0, ME_Z)} rotationY={E} animation={run ? "run" : "run"} animDistance={GAIT + (x)} face={face} headYaw={2.0 * back} /> : null}
    <Pal n={0} position={DS(x - 1.1, 0, ME_Z - 1.1)} rotationY={E} animation={run ? "run" : "run"} animDistance={GAIT + (x + 1)} face={face} headYaw={-2.0 * back} />
    <Pal n={1} position={DS(x - 1.4, 0, ME_Z + 1.1)} rotationY={E} animation={run ? "run" : "run"} animDistance={GAIT + (x + 2)} face={face} headYaw={2.0 * back} />
    <Sweat position={DS(x - 1.1, 1.6, ME_Z - 1.1)} t={t} much={0.6} />
  </>
);
const VJ = 4.4;
/** Where he stands at the water table at the end of stage two: south of it, facing north. */
const ATT: Vec3 = [TABLE2[0], 0, TABLE2[2] + 0.85];
const LOG: Vec3 = DS(END2 + 9, 0, -1.8);

/** CATCHING UP, AND THE END OF STAGE TWO. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Fourth",
  shots: [
    {
      cue: "8.catch",
      ...cam.truck({ on: DS(X0.catch + 1.5, 1.3, ME_Z), dist: 5.6, yaw: 68, pitch: 6, fov: 48, by: [TIRED * 3.17, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "From in front of the three leaders, who are dragging their feet. Behind them, between their shoulders, a yellow shirt is getting bigger. One head turns round, then all three. Three mouths open.",
      stage: (t) => {
        const fx = X0.catch + TIRED * t;
        const look = w("8.catch", "looked", 1.6);
        const x = fx - 9 + 6 * ease(ramp(t, 0, dur("8.catch")));
        return (
          <>
            <Three x={fx} t={t} back={ease(ramp(t, look - 0.2, look + 0.2))} face={t > look + 0.2 ? "wow" : "ouch"} />
            <Me position={DS(x, 0, ME_Z + 0.3)} rotationY={E} animation="run" animDistance={GAIT + (x * 1.3)} face="brave" />
            <Puffs position={DS(x - 0.6, 0.1, ME_Z + 0.3)} color="#e2cf9a" count={5} rise={0.4} spread={0.4} size={0.14} speed={2} opacity={0.6} />
            <Bubble text="!" position={DS(fx, 2.3, ME_Z)} rotationY={1.2} scale={0.5 * pop(t, look + 0.25)} />
          </>
        );
      },
    },
    {
      cue: "8.feet",
      ...cam.truck({ on: DS(X0.feet, 0.3, ME_Z + 0.3), dist: 3.3, yaw: 24, pitch: 7, fov: 44, by: [VJ * 3.27, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "His two shoes in the sand, running: BLUE. The lens comes back and up: the two grey friends, running next to him now, look down at the blue, look at each other, and shrug.",
      stage: (t) => {
        const x = X0.feet + VJ * t;
        const not = w("8.feet", "friends", 2.2);
        return (
          <>
            <Me position={DS(x, 0, ME_Z + 0.3)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="calm" />
            <Glint position={DS(x + 0.1, 0.2, ME_Z + 0.6)} t={t - w("8.feet", "blue", 1.3)} size={0.9} />
            <Pal n={0} position={DS(x + 1.5, 0, ME_Z - 1.0)} rotationY={E} animation="run" animDistance={GAIT + (x)} face={t > not ? "calm" : "uneasy"} headYaw={t > not ? -0.2 : 1.4} headPitch={t > not ? 0 : 0.35} />
            <Pal n={1} position={DS(x + 2.4, 0, ME_Z + 1.3)} rotationY={E} animation={t > not ? "shrug" : "run"} animDistance={GAIT + (x)} face={t > not ? "calm" : "uneasy"} headYaw={t > not ? -1.0 : 2.2} />
            <Bubble text="?" position={DS(x + 1.5, 2.3, ME_Z - 1.0)} scale={0.45 * pop(t, 0.9) * (t < not ? 1 : 0)} />
          </>
        );
      },
    },
    {
      cue: "8.maybe",
      ...cam.truck({ on: DS(X0.maybe, 1.45, ME_Z - 0.2), dist: 2.9, yaw: 58, pitch: 1, fov: 42, by: [VJ * 3.03, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "The runner in black, close, running, his head turned right round to the boy behind his shoulder. His eyes go down to the shoes and up again, and narrow. HE PAINTED THEM.",
      stage: (t) => {
        const x = X0.maybe + VJ * t;
        const say = w("8.maybe", "maybe", 0.9);
        return (
          <>
            <Rival position={DS(x, 0, ME_Z - 0.5)} rotationY={E} animation="run" animDistance={GAIT + (x)} face={t > say ? "angry" : "uneasy"} headYaw={-1.2} headPitch={0.3 * bump(t, 0.1, 0.8)} />
            <Me position={DS(x - 1.5, 0, ME_Z + 0.7)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="smile" headYaw={-0.5} />
            <Bubble text="HE PAINTED THEM." position={DS(x - 0.25, 2.35, ME_Z - 0.1)} rotationY={1.0} scale={0.2 * pop(t, say)} />
          </>
        );
      },
    },
    {
      cue: "8.boom",
      ...cam.truck({ on: DS(X0.boom, 1.1, ME_Z), dist: 7.5, yaw: 14, pitch: 8, fov: 52, by: [VJ * 3.13, 0, 0] }),
      ease: "linear",
      shake: 0.012,
      zone: "desert",
      look: DAY,
      note: "Side on. The runner in black drops to one knee in the middle of running, hits the side of his shoe with his fist, and on BOOM he is a white line across the desert and a wall of sand. The two friends and the boy are blown back a step, arms over their faces.",
      stage: (t) => {
        const x = X0.boom + VJ * t;
        const boom = w("8.boom", "boom", 1.9);
        const pr = w("8.boom", "pressed", 1.1);
        const d = Math.max(0, t - boom);
        const stopx = X0.boom + VJ * Math.min(t, pr - 0.3) + 1.5;
        const rx = d > 0 ? stopx + d * 60 : t > pr - 0.3 ? stopx : x + 1.5;
        const hit = bump(t, boom, 0.7);
        return (
          <>
            <Rival position={DS(rx, 0, ME_Z - 0.5)} rotationY={E} animation={d > 0 ? "run" : t > pr - 0.3 ? "crouch" : "run"} animDistance={GAIT + (rx)} face="angry" shoeGlow={t > pr ? 1 : 0.5} />
            {d > 0 ? <Streaks position={DS(stopx + Math.min(d * 60, 14), 0.7, ME_Z - 0.5)} yaw={E} t={d} n={11} spread={0.6} speed={20} /> : null}
            <DustRing position={DS(stopx, 0.05, ME_Z - 0.5)} t={d > 0 ? d : -1} size={4.5} color="#e2cf9a" />
            {d > 0 && d < 1.2 ? <Puffs position={DS(stopx + 1, 0.3, ME_Z - 0.5)} color="#e2cf9a" count={14} rise={1.6} spread={2.2} size={0.3} speed={2} opacity={0.7} /> : null}
            <Me position={DS(x - 1.2 - hit, 0, ME_Z + 0.9)} rotationY={E} animation={hit > 0.05 ? "scared" : "run"} animDistance={GAIT + (x)} face={d > 0 ? "wow" : "uneasy"} />
            <Pal n={0} position={DS(x - 0.2 - hit, 0, ME_Z - 1.6)} rotationY={E} animation={hit > 0.05 ? "scared" : "run"} animDistance={GAIT + (x)} face={d > 0 ? "wow" : "ouch"} />
            <Pal n={1} position={DS(x + 0.3 - hit, 0, ME_Z + 2.0)} rotationY={E} animation={hit > 0.05 ? "scared" : "run"} animDistance={GAIT + (x)} face={d > 0 ? "wow" : "ouch"} />
            <Place text="BOOM!" position={DS(stopx + 1.5, 3.0, ME_Z)} scale={0.9 * pop(t, boom)} />
          </>
        );
      },
    },
    {
      cue: "8.behind",
      ...cam.truck({ on: DS(X0.behind, 1.2, ME_Z), dist: 6.4, yaw: 30, pitch: 8, fov: 50, by: [VJ * 4.0, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "The two friends, running side by side, red shoes, looking up the empty track where he went. The boy's hand goes half way to his own shoe, and comes back. He drops in a step behind the two of them, and stays there, a blue-shoed runner minding his own business.",
      stage: (t) => {
        const x = X0.behind + VJ * t;
        const stay = w("8.behind", "stayed", 2.4);
        const k = bump(t, 0.9, 1.1);
        const mx = x + 0.6 - 2.3 * ease(ramp(t, stay - 0.4, stay + 0.4));
        return (
          <>
            <Pal n={0} position={DS(x, 0, ME_Z - 0.7)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="ouch" />
            <Pal n={1} position={DS(x + 0.4, 0, ME_Z + 0.9)} rotationY={E} animation="run" animDistance={GAIT + (x + 1)} face="ouch" />
            <Me position={DS(mx, 0, ME_Z + 0.1)} rotationY={E} face={t > stay ? "calm" : "uneasy"} headPitch={0.3 * k} pose={{ ...gaitPose("run", GAIT + mx), ...(k > 0.3 ? { armR: [-0.4 + 0.9 * k, 0, 0.1] as Vec3 } : {}) }} />
            <Drone position={DS(x + 3, 3.2, ME_Z + 1.4)} yaw={-E} tilt={0.7} t={t} scale={1.4} />
            <Streaks position={DS(x + 9, 0.7, ME_Z)} yaw={E} t={t + 0.6} n={6} spread={0.5} speed={14} />
          </>
        );
      },
    },
    {
      cue: "9.van",
      ...cam.truck({ on: DS(X0.van2, 1.25, ME_Z - 1.4), dist: 6.2, yaw: 6, pitch: 6, fov: 48, by: [VJ * 3.13, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "The white van again, driving along next to him. In the back of it, through the open side, sits the baby villager with his feet not reaching the floor. QUIT? is on the van under him. The boy's head goes round.",
      stage: (t) => {
        const x = X0.van2 + VJ * t;
        const baby = w("9.van", "baby", 1.4);
        return (
          <>
            <Me position={DS(x - 0.4, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face={t > baby ? "wow" : "calm"} headYaw={0.9 * ease(ramp(t, baby - 0.3, baby))} />
            <Van position={DS(x + 0.2, 0, ME_Z - 2.5)} d={x} driver={<Driver />} inside={<BabyInVan t={t} />} />
            <Place text="QUIT!" position={DS(x - 0.3, 2.95, ME_Z - 2.4)} scale={0.55 * pop(t, w("9.van", "quit", 2.6))} />
          </>
        );
      },
    },
    {
      cue: "9.ice",
      ...cam.truck({ on: DS(X0.van2 + VJ * 3.13 - 0.3, 1.45, ME_Z - 2.2), dist: 2.7, yaw: 12, pitch: 2, fov: 42, by: [VJ * 1.93, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "Close on the back of the van: the baby villager has an ice cream as big as his head, pink and white, and licks it, looking straight at the boy. In the corner of the frame the boy, running in the heat, watches it go up and down.",
      stage: (t) => {
        const x = X0.van2 + VJ * (3.13 + t);
        return (
          <>
            <Van position={DS(x + 0.2, 0, ME_Z - 2.5)} d={x} driver={<Driver />} inside={<BabyInVan t={t} lick={Math.abs(Math.sin(t * 4))} />} />
            <Me position={DS(x - 1.5, 0, ME_Z - 1.1)} rotationY={E} animation="run" animDistance={GAIT + (x)} face={t > 1 ? "frown" : "wow"} headYaw={1.2} />
            <Sweat position={DS(x - 1.5, 1.6, ME_Z - 1.1)} t={t} much={0.8} />
          </>
        );
      },
    },
    {
      cue: "9.later",
      ...cam.push({ on: DS(END2 + 0.5, 1.3, LANE), dist: 7.5, to: 6.6, yaw: 26, pitch: 8, fov: 50 }),
      zone: "desert",
      look: DAY,
      note: "SEVEN MINUTES LATER. The line at the end of stage two, under its gate. The boy runs over it with his arms hanging, and 4th comes up over him.",
      stage: (t) => {
        const cross = w("9.later", "fourth", 1.2) - 0.25;
        const x = END2 + (t - cross) * VJ;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="ouch" />
            <Sweat position={DS(x, 1.6, ME_Z)} t={t} much={0.8} />
            <Place text="4th" position={DS(x, 2.35, ME_Z)} rotationY={0.3} scale={0.65 * pop(t, cross + 0.2)} />
            <Card text="7 MINUTES LATER" position={DS(END2 + 0.5, 4.9, LANE)} yaw={0.45} height={0.42} width={5} />
          </>
        );
      },
    },
    {
      cue: "9.places",
      ...cam.push({ on: [LOG[0] - 0.7, 1.1, LOG[2]], dist: 7.2, to: 6.4, yaw: 8, pitch: 6, fov: 50 }),
      zone: "desert",
      look: DAY,
      note: "The rest camp. The two grey friends are flat out on the log, one sitting with his head between his knees, one lying along it: 2nd and 3rd over them. Next to the log, on his feet, not even breathing hard, the runner in black: 1st.",
      stage: (t) => {
        const ws = [w("9.places", "second", 1.0), w("9.places", "third", 1.5), w("9.places", "first", 2.7)];
        return (
          <>
            <Pal n={0} position={[LOG[0] - 0.7, 0.05, LOG[2] + 0.1]} rotationY={0} animation="sit" face="ouch" headPitch={0.6} />
            <Pal n={1} position={[LOG[0] + 0.6, 0.05, LOG[2] + 0.1]} rotationY={0} animation="sit" face="ouch" headPitch={-0.5} />
            <Sweat position={[LOG[0] - 0.7, 1.4, LOG[2]]} t={t} much={0.6} />
            <Rival position={[LOG[0] - 2.0, 0, LOG[2] + 0.6]} rotationY={0.3} animation="idle" face="smug" />
            <Place text="2nd" position={[LOG[0] - 0.7, 1.9, LOG[2]]} scale={0.5 * pop(t, ws[0])} />
            <Place text="3rd" position={[LOG[0] + 0.6, 1.9, LOG[2]]} scale={0.5 * pop(t, ws[1])} />
            <Place text="1st" position={[LOG[0] - 2.0, 2.35, LOG[2] + 0.6]} scale={0.6 * pop(t, ws[2])} />
            <Glint position={[LOG[0] - 2.0, 2.35, LOG[2] + 0.7]} t={t - ws[2]} size={1} />
            <Player who={2} position={DS(END2 + 2, 0, ME_Z + 1.5)} rotationY={E} animation="ache" face="ouch" />
          </>
        );
      },
    },
    {
      cue: "9.drink",
      ...cam.push({ on: [ATT[0] - 0.6, 1.1, ATT[2] + 0.3], dist: 4.6, to: 3.6, yaw: 150, pitch: 5, fov: 46 }),
      zone: "desert",
      look: DAY,
      note: "The boy comes in under the red sun shade on legs that hardly work, gets both hands on the edge of the water table, and takes a cup.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 1.4));
        const p: Vec3 = [ATT[0] - 2.6 * (1 - k), 0, ATT[2] + 1.8 * (1 - k)];
        return (
          <>
            <Me position={p} rotationY={Math.PI - 0.9 * (1 - k)} animation={k < 1 ? "stagger" : "leanOver"} animDistance={GAIT + (k * 3)} face="ouch" />
            <Sweat position={up(p, 1.6)} t={t} much={0.8} />
            <Cup position={[TABLE2[0] + 0.15, 0.86, TABLE2[2] + 0.2]} />
          </>
        );
      },
    },
    {
      cue: "9.walk",
      ...cam.push({ on: [ATT[0] + 0.3, 1.3, ATT[2]], dist: 3.6, to: 2.9, yaw: 172, pitch: 2, fov: 46 }),
      zone: "desert",
      look: DAY,
      note: "From the other side of the table: the boy with a cup tipped up over his face, eyes shut. Over his shoulder, out of the white light behind him, the runner in black walks up, slowly, and stops right behind him. The boy's eyes open over the rim of the cup.",
      stage: (t) => {
        const k = ease(ramp(t, 0.3, dur("9.walk") - 0.6));
        const seen = t > dur("9.walk") - 0.5;
        return (
          <>
            <Me position={ATT} rotationY={Math.PI} face={seen ? "fear" : "sleepy"} blink={false} pose={{ ...getPose("idle", t), armR: [-2.2, 0, -0.35] as Vec3, head: [seen ? -0.1 : -0.35, 0, 0] as Vec3 }} />
            <Cup position={[ATT[0] - 0.3, 1.5, ATT[2] - 0.42]} tip={1} />
            <Rival position={[ATT[0] + 0.75, 0, ATT[2] + 4.2 - 3.3 * k]} rotationY={Math.PI} animation={k < 1 ? "walk" : "idle"} animDistance={GAIT + (k * 3.3)} face="calm" lookAt={faceOf(ATT)} />
          </>
        );
      },
    },
    {
      cue: "10.sub",
      ...cam.push({ on: [ATT[0] + 0.3, 1.3, ATT[2]], dist: 2.9, to: 2.6, yaw: 172, pitch: 2, fov: 46 }),
      zone: "desert",
      look: DAY,
      note: "The same. The boy, cup still at his mouth, looks straight at us. Behind him the runner in black folds his head on one side. The red sign comes up over the two of them.",
      stage: (t) => (
        <>
          <Me position={ATT} rotationY={Math.PI} face="fear" gaze={0} blink={false} pose={{ ...getPose("idle", t), armR: [-1.9, 0, -0.35] as Vec3 }} />
          <Cup position={[ATT[0] - 0.3, 1.42, ATT[2] - 0.42]} tip={0.6} />
          <Rival position={[ATT[0] + 0.75, 0, ATT[2] + 0.9]} rotationY={Math.PI} animation="idle" face="calm" headRoll={0.2 * ease(ramp(t, 0.2, 0.6))} lookAt={faceOf(ATT)} />
          <SubscribeSign position={[ATT[0] + 0.35, 2.25, ATT[2] - 0.2]} rotationY={Math.PI} scale={0.6 * pop(t, 0.25)} tilt={jolt(t, 0.3, 0.1)} />
        </>
      ),
    },
  ],
});
void Board;
void hop;
void Pack;
