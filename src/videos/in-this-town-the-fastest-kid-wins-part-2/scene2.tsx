import { Block, cam, getPose, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BLUE, Baby, Bits, Board, Brush, Bubble, Card, DAY, Drone, DustRing, GATE_X, Glint, HIDE, LANE, Me, PLACE, PaintTin, Pal, Place, Player, Puffs, R, ROBE, Rival, SHOE, ShoePair, Streaks, Sweat, TREE,
  Villager, dur, ease, faceOf, hop, pop, ramp, room, timing, w,
} from "./kit";
import { E, bump, clamp, tint, up } from "./cast";
import { TRIO } from "./scene1";

/** Behind the tree, seen from the north: he is on the left, first place comes round the trunk on the right. */
const MEAT: Vec3 = HIDE;
const HIM: Vec3 = [HIDE[0] + 1.55, 0, HIDE[2] + 0.2];
const MRY = E + 0.55;
const NYAW = 176;
const NRY = Math.PI;
/** The box he sits on at home, and where his feet are. */
const BOX: Vec3 = room(0.1, 0, 0.2);
const FEET: Vec3 = [BOX[0], 0.12, BOX[2] + 0.5];

/** THE PAINT, AND THE EXCUSE. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Blue",
  shots: [
    {
      cue: "3.idea",
      ...cam.push({ on: faceOf(MEAT), dist: 2.0, to: 1.6, yaw: 118, pitch: 0, fov: 40 }),
      zone: "river",
      look: DAY,
      note: "His face, close, against the bark. The fear goes out of it. One eyebrow, then a grin, and a small yellow light pops on over his head.",
      stage: (t) => (
        <>
          <Me blue={false} position={MEAT} rotationY={2.25} animation="idle" face={t > 0.45 ? "grin" : "fear"} headPitch={-0.15 * ease(ramp(t, 0.4, 0.7))} gaze={0} />
          <group position={[MEAT[0], 1.95, MEAT[2]]} scale={pop(t, 0.45)}>
            <Block size={[0.16, 0.18, 0.16]} color="#000000" emissive="#ffe070" emissiveIntensity={2.5} castShadow={false} />
            <Block position={[0, -0.13, 0]} size={[0.08, 0.07, 0.08]} color="#9aa3ad" castShadow={false} />
          </group>
          <Glint position={[MEAT[0], 1.95, MEAT[2]]} t={t - 0.45} size={0.9} />
        </>
      ),
    },
    {
      cue: "3.press",
      ...cam.push({ on: [MEAT[0] + 0.02, 0.17, MEAT[2]], dist: 1.25, to: 0.95, yaw: 92, pitch: 9, fov: 38 }),
      zone: "river",
      look: DAY,
      note: "His shoe in the grass, close, the three buttons at us, the third one lit. A finger comes down on the FIRST. It goes green, the label LIGHT SPEED comes up, and the whole shoe lights.",
      stage: (t) => {
        const first = w("3.press", "first", 0.7);
        const on = t > first ? 0 : 2;
        const fy = 0.42 - 0.26 * ease(ramp(t, first - 0.3, first)) + 0.1 * ease(ramp(t, first + 0.1, first + 0.4));
        return (
          <>
            <ShoePair one position={[MEAT[0], 0, MEAT[2]]} rotation={[0, 0, 0]} scale={1.5} glow={t > first ? 1 : 0.4} on={on} />
            <Block position={[MEAT[0] + 0.19, fy, MEAT[2] + 0.1]} size={[0.05, 0.2, 0.05]} color="#dba47c" castShadow={false} />
            <Block position={[MEAT[0] + 0.19, fy + 0.25, MEAT[2] + 0.1]} size={[0.12, 0.3, 0.12]} color="#e8a21c" castShadow={false} />
            <Board post={false} position={[MEAT[0] + 0.2, 0.52, MEAT[2] + 0.05]} rotationY={E} text="LIGHT SPEED" scale={0.17 * pop(t, first + 0.05)} color="#15151a" ink="#4dff6a" />
            <Glint position={[MEAT[0] + 0.15, 0.16, MEAT[2] + 0.1]} t={t - first} size={0.6} />
          </>
        );
      },
    },
    {
      cue: "3.home",
      ...cam.truck({ on: [-9, 1.0, LANE], dist: 8.5, yaw: 12, pitch: 7, fov: 54, by: [15, 0, 0] }),
      ease: "linear",
      zone: "village",
      look: DAY,
      note: "LIGHT SPEED. The village street, and nothing in it moves: a villager with one foot off the ground, a baby in the middle of a hop, a player half way through a wave. Through all of them, left to right, a yellow streak with white lines behind it, to the door of his house.",
      stage: (t) => {
        const k = clamp(t / (dur("3.home") - 0.15));
        const x = -17 + 26.5 * k;
        return (
          <>
            <Me blue={false} position={[x, 0, LANE + 0.4 - 4.6 * ease(ramp(k, 0.8, 1))]} rotationY={E - 1.0 * ease(ramp(k, 0.8, 1))} animation="run" animDistance={x * 1.2} face="brave" shoeGlow={1} blink={false} />
            <Streaks position={[x - 0.5, 0.6, LANE + 0.4]} yaw={E} t={(t * 3) % 1} n={9} spread={0.5} speed={16} />
            <Streaks position={[x - 2.5, 0.9, LANE + 0.4]} yaw={E} t={(t * 3 + 0.5) % 1} n={7} spread={0.6} speed={16} />
            <Villager position={[-8, 0, LANE - 0.8]} rotationY={-E} walk={0.35} robe={ROBE.farmer} />
            <Baby position={[-3.5, 0.32, LANE + 1.5]} rotationY={E} walk={0.3} />
            <Player who={5} position={[1.5, 0, LANE - 1.3]} rotationY={0.3} animation="wave" time={0.4} face="smile" blink={false} />
            <Villager position={[5.5, 0, LANE + 1.2]} rotationY={-E} walk={0.9} robe={ROBE.white} />
            <Bits position={[-3.5, 0.2, LANE + 1.5]} t={0.18} color="#b79d63" count={6} power={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.brush",
      ...cam.orbit({ on: [FEET[0], 0.3, FEET[2] - 0.1], dist: 2.5, yaw: -24, yawTo: 14, pitch: 16, fov: 44 }),
      zone: "room",
      look: DAY,
      note: "His room. He sits on a box with a tin of blue paint by his feet and a brush going backwards and forwards over his shoes as fast as a brush can go. The red goes under the blue, toe to heel. Blue drops fly.",
      stage: (t) => {
        const k = ease(ramp(t, w("3.brush", "painted", 1.3) - 0.5, dur("3.brush") - 0.15));
        const s = Math.sin(t * 22);
        return (
          <>
            <Block position={[BOX[0], 0.25, BOX[2]]} size={[0.7, 0.5, 0.6]} color="#8a6a3a" />
            <Me position={[BOX[0], 0.1, BOX[2] + 0.2]} rotationY={0} shoes={tint(SHOE, BLUE, k * 1.15)} shoeGlow={0.2} face="brave" headPitch={0.55}
              pose={{ ...getPose("sit", t), bodyPitch: 0.45, armR: [-0.35, 0, -0.25 + 0.2 * s], armL: [-0.2, 0, 0.2] }} />
            <Brush position={[FEET[0] + 0.14 * s, 0.33, FEET[2] + 0.1]} rotation={[1.2, 0.3 * s, 0]} scale={1.3} />
            <PaintTin position={[FEET[0] + 0.55, 0, FEET[2] - 0.05]} />
            <Bits position={[FEET[0], 0.25, FEET[2] + 0.1]} t={(t % 0.45)} color={BLUE} count={5} power={1.3} seed={3} />
            <Bits position={[FEET[0], 0.25, FEET[2] + 0.1]} t={((t + 0.22) % 0.45)} color={BLUE} count={4} power={1.1} seed={7} />
            <Block position={[FEET[0] - 0.3, 0.006, FEET[2] + 0.3]} size={[0.14 * k, 0.01, 0.1 * k]} color={BLUE} castShadow={false} />
            <Block position={[FEET[0] + 0.2, 0.006, FEET[2] + 0.42]} size={[0.09 * k, 0.01, 0.12 * k]} color={BLUE} castShadow={false} />
            <pointLight position={[BOX[0] + 0.5, 1.8, BOX[2] + 1.6]} color="#fff2d8" intensity={7} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "3.why",
      ...cam.push({ on: R(GATE_X + 3.3, 1.05, 0.6), dist: 8.6, to: 7.6, yaw: 9, pitch: 8, fov: 48 }),
      zone: "river",
      look: DAY,
      note: "What he is thinking: a race official bent double with his nose to three pairs of red shoes, a camera drone over them with its red light going, the three with their hands up. And off to the side, the boy, hands behind his back, whistling, in blue shoes that nobody looks at.",
      stage: (t) => {
        const found = w("3.why", "found", 0.7);
        return (
          <>
            <Villager position={R(GATE_X + 1.8, 0, 0.9)} rotationY={E} robe={ROBE.white} lean={0.5 + 0.1 * Math.sin(t * 5)} nod={0.4} hmm={1} />
            <Rival position={TRIO[1]} rotationY={0} animation="scared" face="fear" />
            <Pal n={0} position={TRIO[0]} rotationY={0.25} animation="panic" face="fear" />
            <Pal n={1} position={TRIO[2]} rotationY={-0.25} animation="scared" face="fear" />
            <Drone position={R(GATE_X + 3.0, 3.0, 1.6)} yaw={Math.PI} tilt={0.9} t={t} scale={1.3} />
            <Place text="OUT!" position={R(GATE_X + 3.0, 2.35, 0.3)} scale={0.55 * pop(t, found)} />
            <Me position={R(GATE_X + 4.9, 0, 1.6)} rotationY={-0.2} animation="idle" face="smile" headYaw={-0.7} headPitch={-0.25} />
            <Glint position={R(GATE_X + 4.9, 0.15, 1.95)} t={t - w("3.why", "mine", 1.9)} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "3.back",
      ...cam.push({ on: [MEAT[0] + 0.2, 0.7, MEAT[2]], dist: 5.2, to: 3.2, yaw: 104, pitch: 9, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The tree again. White streaks, a ring of dust, and he is standing behind it as if he had never left, in BLUE shoes. He looks left and right, bends down and presses the third button: JUST RIGHT.",
      stage: (t) => {
        const land = 0.55;
        const third = w("3.back", "third", 3.0);
        const k = clamp((t - 0.25) / (land - 0.25));
        const x = MEAT[0] - 22 * (1 - k);
        const bend = ease(ramp(t, third - 0.6, third - 0.25));
        return (
          <>
            <Me position={[x, 0, MEAT[2]]} rotationY={E} animation={k < 1 ? "run" : bend > 0.5 ? "crouch" : "lookAround"} animDistance={x} face={k < 1 ? "brave" : "uneasy"} shoeGlow={k < 1 ? 1 : 0.5} />
            {t < land + 0.3 ? <Streaks position={[x - 0.6, 0.6, MEAT[2]]} yaw={E} t={t - 0.2} n={9} spread={0.5} speed={16} /> : null}
            <DustRing position={[MEAT[0], 0.05, MEAT[2]]} t={t - land} size={1.5} color="#8a9a5a" />
            <Board post={false} position={[MEAT[0] + 0.35, 0.75, MEAT[2] - 0.5]} rotationY={1.8} text="JUST RIGHT" scale={0.3 * pop(t, third)} color="#15151a" ink="#6fb8ff" />
            <Glint position={[MEAT[0] + 0.25, 0.15, MEAT[2] - 0.2]} t={t - third} size={0.7} />
          </>
        );
      },
    },
    {
      cue: "4.hey",
      ...cam.push({ on: [MEAT[0] + 0.8, 1.05, MEAT[2] + 0.1], dist: 4.4, to: 3.7, yaw: NYAW, pitch: 4, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "He stands up, and the runner in black is right there, come round the trunk, an arm's length away, head on one side. HEY. The boy leaves the ground.",
      stage: (t) => {
        const hey = w("4.hey", "hey", 1.0);
        const k = ease(ramp(t, 0.1, hey - 0.15));
        return (
          <>
            <Me position={[MEAT[0], hop(t, hey, 0.22, 0.3), MEAT[2]]} rotationY={MRY} animation={t > hey ? "scared" : "idle"} face={t > hey ? "wow" : "smile"} lookAt={t > hey ? faceOf(HIM) : undefined} />
            <Rival position={[HIM[0] + 2.4 * (1 - k), 0, HIM[2] + 0.9 * (1 - k)]} rotationY={-E - 0.3} animation={k < 1 ? "walk" : "idle"} animDistance={k * 2.6} face="calm" headRoll={0.2 * ease(ramp(t, hey, hey + 0.3))} lookAt={faceOf(MEAT)} />
            <Bubble text="HEY." position={[HIM[0] - 0.35, 2.1, HIM[2]]} rotationY={NRY} scale={0.5 * pop(t, hey)} />
          </>
        );
      },
    },
    {
      cue: "4.froze",
      ...cam.push({ on: faceOf(MEAT), dist: 1.9, to: 1.45, yaw: 150, pitch: 0, fov: 38 }),
      zone: "river",
      look: DAY,
      shake: 0.004,
      note: "His face, close, and nothing on it moves: eyes wide, mouth shut, one drop of sweat going down past his ear. He has not got an answer.",
      stage: (t) => (
        <>
          <Me position={MEAT} rotationY={MRY + 0.35} animation="idle" breath={0} weightShift={0} face="fear" blink={false} gaze={0} saccade={false} />
          <Block position={[MEAT[0] + 0.02, faceOf(MEAT)[1] + 0.12 - 0.12 * t, MEAT[2] - 0.24]} size={[0.035, 0.06, 0.035]} color="#7fd0ff" castShadow={false} />
        </>
      ),
    },
    {
      cue: "4.poop",
      ...cam.push({ on: [MEAT[0] + 0.7, 1.05, MEAT[2] + 0.1], dist: 3.9, to: 3.6, yaw: NYAW, pitch: 4, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The two of them. The boy shrugs with both hands, as if it was the most ordinary thing in the world, and the word comes up over his head: POOPING.",
      stage: (t) => (
        <>
          <Me position={MEAT} rotationY={MRY} animation="shrug" face="smile" lookAt={faceOf(HIM)} />
          <Rival position={HIM} rotationY={-E - 0.3} animation="idle" face="calm" lookAt={faceOf(MEAT)} />
          <Bubble text="POOPING." position={[MEAT[0] + 0.6, 2.0, MEAT[2]]} rotationY={NRY} scale={0.36 * pop(t, 0.25)} />
        </>
      ),
    },
    {
      cue: "4.wow",
      ...cam.push({ on: faceOf(MEAT), dist: 2.3, to: 1.9, yaw: 168, pitch: 0, fov: 40 }),
      zone: "river",
      look: DAY,
      note: "The boy looks away from him and straight into the lens, flat, for a second. Then he shuts his eyes.",
      stage: (t) => (
        <>
          <Me position={MEAT} rotationY={NRY - 0.1} animation="idle" face={t > 0.95 ? "sleepy" : "calm"} gaze={0} saccade={false} blink={false} headPitch={0.12 * ease(ramp(t, 0.9, 1.2))} />
          <Card text="GREAT EXCUSE" position={[MEAT[0], 2.02, MEAT[2]]} yaw={NRY} height={0.16} width={1.5} />
        </>
      ),
    },
    {
      cue: "4.river",
      ...cam.push({ on: [MEAT[0] + 0.8, 1.05, MEAT[2] + 0.1], dist: 4.2, to: 3.8, yaw: NYAW - 8, pitch: 4, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The runner in black points a thumb at the water behind him: IN THE RIVER? The boy nods, a lot, with a smile that is all teeth.",
      stage: (t) => {
        const nod = w("4.river", "nodded", 1.5) - 0.2;
        return (
          <>
            <Me position={MEAT} rotationY={MRY} animation="idle" face="grin" headPitch={t > nod ? 0.3 * Math.abs(Math.sin((t - nod) * 11)) : 0} />
            <Rival position={HIM} rotationY={-E - 0.3 + 1.1 * bump(t, 0.2, 1.3)} animation="point" face="uneasy" headYaw={-0.6 * bump(t, 0.2, 1.3)} />
            <Bubble text="IN THE RIVER?" position={[HIM[0] - 0.55, 2.15, HIM[2]]} rotationY={NRY} scale={0.32 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "4.weird",
      ...cam.push({ on: [HIM[0], 1.3, HIM[2]], dist: 3.0, to: 2.4, yaw: 196, pitch: 2, fov: 42 }),
      zone: "river",
      look: DAY,
      note: "The runner in black, on his own: he looks at the river, looks at the boy, scratches the back of his head. 1st comes up over him. He shrugs: he has better things to think about.",
      stage: (t) => {
        const first = w("4.weird", "first", 1.9);
        return (
          <>
            <Rival position={HIM} rotationY={NRY + 0.5} animation={t < first ? "lookAround" : "shrug"} face={t < first ? "uneasy" : "calm"} headRoll={t < first ? 0.18 * Math.sin(t * 3) : 0} />
            <Place text="1st" position={[HIM[0], 2.08, HIM[2]]} rotationY={NRY} scale={0.5 * pop(t, first)} />
            <Glint position={[HIM[0], 2.25, HIM[2] - 0.1]} t={t - first} size={1.0} />
          </>
        );
      },
    },
    {
      cue: "4.blue",
      ...cam.push({ on: [MEAT[0] + 0.3, 0.3, MEAT[2] + 0.1], dist: 2.6, to: 2.1, yaw: 214, pitch: 7, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "Low, by the boy's ankles: two BLUE shoes in the grass, close. Behind them the runner in black bends his head and looks at them for a long second. Then he turns round and walks off towards his two friends.",
      stage: (t) => {
        const then = w("4.blue", "then", 1.7);
        const go = Math.max(0, t - then);
        return (
          <>
            <Me position={MEAT} rotationY={MRY} animation="idle" face="uneasy" />
            <Rival position={[HIM[0] + go * 1.5, 0, HIM[2] + go * 1.9]} rotationY={go > 0 ? 0.65 : -E - 0.3} animation={go > 0 ? "walk" : "idle"} animDistance={go * 2.4} face="calm" headPitch={go > 0 ? 0 : 0.6 * ease(ramp(t, 0.15, 0.6))} />
            <Glint position={[MEAT[0] + 0.15, 0.15, MEAT[2] - 0.25]} t={t - w("4.blue", "blue", 1.2)} size={0.9} />
            <Pal n={0} position={TRIO[0]} rotationY={0.9} animation="talk" face="grin" />
            <Pal n={1} position={TRIO[2]} rotationY={-0.9} animation="laugh" face="laugh" />
          </>
        );
      },
    },
    {
      cue: "4.sigh",
      ...cam.push({ on: up(MEAT, 1.0), dist: 2.8, to: 2.3, yaw: 160, pitch: 2, fov: 42 }),
      zone: "river",
      look: DAY,
      note: "The boy lets all his breath out at once: his shoulders drop, his head goes back against the bark, a little white cloud leaves his mouth. Behind him, a long way off and out of focus, three people in red shoes who are not looking.",
      stage: (t) => {
        const out = ease(ramp(t, 0.15, 0.7));
        return (
          <>
            <Me position={[MEAT[0], -0.06 * out, MEAT[2]]} rotationY={NRY - 0.25} face={t > 0.9 ? "smile" : "uneasy"} pose={{ ...getPose("idle", t), bodyPitch: 0.12 * out, head: [-0.3 * out, 0, 0], armR: [0, 0, 0.12], armL: [0, 0, -0.12] }} />
            {t > 0.2 && t < 1.3 ? <Puffs position={[MEAT[0] - 0.05, 1.25, MEAT[2] - 0.35]} color="#ffffff" count={4} rise={0.35} spread={0.25} size={0.09} opacity={0.6} /> : null}
            <Rival position={TRIO[1]} rotationY={0.3} animation="talk" face="grin" />
            <Pal n={0} position={TRIO[0]} rotationY={0.9} animation="talk" face="grin" />
            <Pal n={1} position={TRIO[2]} rotationY={-0.9} animation="laugh" face="laugh" />
          </>
        );
      },
    },
  ],
});
void PLACE;
void TREE;
void ShoePair;
