import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Beam, Bits, Bubble, Bush, Cannon, CutTree, DUSK, Fill, Hero, Katana, Mate, Nora, OldMan, PLACE, Shield, Smoke, SubscribeSign, ZONE,
  ease, f, front, hop, jolt, lerp, lerp3, pop, ramp, timing, toward, wordAt,
} from "./kit";
import { BUSH, TREE } from "./scene5";

const OLD: Vec3 = f(2.7, 0, -1.2);

/** The fight: him on the left, the old man on the right, a tree behind him for the blade. */
const ME: Vec3 = f(0.6, 0, -0.7);
const TREE2: Vec3 = f(-0.9, 0, -1.5);
const SHE: Vec3 = f(1.3, 0, -0.35);
const RED = "#ff3b2e";
const toMe = toward(OLD, ME);
const toHim = toward(ME, OLD);
/** The cannon is his left arm: where it starts, and what it points at. */
const GUN: Vec3 = [OLD[0] - 0.25, 1.2, OLD[2] + 0.42];
const AIM: Vec3 = [ME[0], 1.15, ME[2]];
/** Her shield, between the two of them. */
const WALL: Vec3 = [SHE[0] + 0.55, 1.2, SHE[2] - 0.2];

const Woods: React.FC<{ cut2?: number; shake?: number; t?: number }> = ({ cut2 = 0, shake = 0, t = 0 }) => (
  <>
    <CutTree position={TREE} cut={1} dir={-1} />
    <CutTree position={TREE2} cut={cut2} at={1.75} dir={-1} />
    <Bush position={BUSH} shake={shake} t={t} />
  </>
);

/** THE OLD MAN, the katana, the cannon, and Nora. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The one this town threw out",
  shots: [
    {
      cue: "12.suit",
      ...cam.push({ on: [OLD[0], 1.2, OLD[2]], dist: 4.4, to: 3.6, yaw: -12, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The old man stops shaking. He stands up straight. Dark metal snaps shut over him from the feet up, and where his face was there is a helmet with two red eyes.",
      impacts: [{ at: 1.1, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const not = wordAt("12.suit", "not");
        const on = t > not;
        return (
          <>
            <OldMan position={[OLD[0] + (on ? 0 : Math.sin(t * 42) * 0.015), 0, OLD[2]]} rotationY={toMe * 0.5} animation={on ? "guard" : t > not - 0.5 ? "idle" : "ache"} suit={on ? 1 : 0} />
            <Bits position={[OLD[0], 1.0, OLD[2] + 0.3]} t={t - not} color={RED} count={18} power={2.6} />
            <Bits position={[OLD[0], 0.3, OLD[2] + 0.3]} t={t - not} color="#34343e" count={10} power={2} />
            {on ? <pointLight position={[OLD[0], 1.6, OLD[2] + 0.9]} color={RED} intensity={6 + 20 * jolt(t, not, 0.5)} distance={5} decay={2} /> : null}
            <Fill on={[OLD[0], 1.3, OLD[2]]} yaw={-12} power={5} />
          </>
        );
      },
    },
    {
      cue: "12.katana",
      ...cam.push({ on: f(1.65, 1.35, -1.0), dist: 7.6, to: 6.8, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Both of them, side on. A long thin blade slides out of the old man's right arm. On 'jumped' he is off the ground and coming across the clearing at the teller, blade first.",
      stage: (t) => {
        const k = wordAt("12.katana", "katana");
        const j = wordAt("12.katana", "jumped");
        const go = ease(ramp(t, j - 0.1, j + 0.55));
        const at: Vec3 = [lerp(OLD[0], ME[0] + 1.0, go), hop(t, j - 0.1, 0.9, 0.65), lerp(OLD[2], ME[2], go)];
        return (
          <>
            <Hero position={ME} rotationY={toHim} animation={go > 0.1 ? "scared" : "idle"} suit={1} />
            <OldMan position={at} rotationY={toMe} animation={go > 0.05 ? "point" : "guard"} suit={1}>
              <Katana out={ease(ramp(t, k - 0.15, k + 0.2))} />
            </OldMan>
            <Bits position={[OLD[0], 0.1, OLD[2]]} t={t - j + 0.1} color="#8aa070" count={12} power={2.2} />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.duck",
      ...cam.push({ on: [ME[0], 1.8, ME[2]], dist: 3.0, to: 2.6, yaw: 20, pitch: 0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "His helmet, close. The eyes flash, and one word comes up beside them: DUCK.",
      stage: (t) => {
        const d = wordAt("12.duck", "duck");
        return (
          <>
            <Hero position={ME} rotationY={toHim * 0.5} animation="scared" suit={1} eyes={1 + 2 * jolt(t, d, 0.5)} />
            <group scale={pop(t, d - 0.1)}>
              <Bubble text="DUCK" position={[ME[0], 2.3, ME[2]]} rotationY={0.3} scale={0.55} dark />
            </group>
            <Fill on={[ME[0], 1.5, ME[2]]} yaw={20} power={4} />
          </>
        );
      },
    },
    {
      cue: "12.ducked",
      ...cam.push({ on: f(0.1, 1.2, -1.0), dist: 5.8, to: 5.2, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "He drops. The old man and the blade go over the top of him, and the blade goes clean through the tree behind. The top of the tree slides off.",
      impacts: [{ at: 1.6, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const tree = wordAt("12.ducked", "tree");
        const over = ease(ramp(t, 0.25, tree));
        const at: Vec3 = [lerp(ME[0] + 1.0, TREE2[0] + 0.85, over), 0.9 * Math.sin(Math.PI * Math.min(1, over * 1.1)), lerp(ME[2], TREE2[2] + 0.5, over)];
        return (
          <>
            <Hero position={ME} rotationY={toHim} animation="crouch" suit={1} />
            <OldMan position={at} rotationY={-Math.PI / 2} animation="point" suit={1}>
              <Katana out={1} />
            </OldMan>
            <Bits position={[TREE2[0], 1.75, TREE2[2] + 0.3]} t={t - tree} color="#ffb060" count={14} power={2.4} />
            <Woods cut2={ease(ramp(t, tree, tree + 0.8))} />
          </>
        );
      },
    },
    {
      cue: "13.more",
      ...cam.push({ on: [OLD[0], 1.4, OLD[2]], dist: 3.4, to: 2.8, yaw: -20, pitch: -3, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The old man, back where he started, his back to us. His helmet turns, slowly, and the red eyes find us over his shoulder.",
      stage: (t) => (
        <>
          <OldMan position={OLD} rotationY={Math.PI * (1 - 0.75 * ease(ramp(t, 0.2, 1.2)))} animation="idle" suit={1}>
            <Katana out={1 - ease(ramp(t, 0.6, 1.1))} />
          </OldMan>
          <pointLight position={[OLD[0] - 0.4, 1.6, OLD[2] + 0.9]} color={RED} intensity={6} distance={4} decay={2} />
          <Fill on={[OLD[0], 1.3, OLD[2]]} yaw={-20} power={4} />
        </>
      ),
    },
    {
      cue: "13.cannon",
      ...cam.push({ on: [OLD[0] - 0.4, 1.25, OLD[2]], dist: 3.6, to: 3.0, yaw: -28, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "His other arm comes up, and the plates of it unfold, one after another, into the barrel of a cannon as long as he is tall.",
      stage: (t) => {
        const o = wordAt("13.cannon", "folded");
        return (
          <>
            <OldMan position={OLD} rotationY={toMe} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={ease(ramp(t, o - 0.1, o + 0.9))} />
            <Bits position={GUN} t={t - o} color="#8a8a96" count={8} power={1.4} />
            <Fill on={[OLD[0], 1.3, OLD[2]]} yaw={-28} power={5} />
          </>
        );
      },
    },
    {
      cue: "13.fired",
      ...cam.push({ on: lerp3(AIM, GUN, 0.75), dist: 3.8, to: 2.8, yaw: toward(OLD, ME) * 57.3, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Down the barrel, from where the teller stands. The inside of it goes from dark to orange to white.",
      stage: (t) => {
        const lit = wordAt("13.fired", "lit");
        const ch = ease(ramp(t, 0.3, lit + 0.3));
        return (
          <>
            <OldMan position={OLD} rotationY={toMe} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={ch} />
            <pointLight position={lerp3(GUN, AIM, 0.6)} color="#ffb060" intensity={40 * ch} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "13.fast",
      ...cam.push({ on: [ME[0], 1.5, ME[2]], dist: 2.8, to: 1.9, yaw: 24, pitch: 0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Him, visor up, frozen, eyes wide, the light on his face getting brighter and brighter and the blast crawling towards him.",
      stage: (t) => {
        const k = ramp(t, 0.1, 3.1);
        const tip = lerp3(GUN, AIM, 0.25 + 0.4 * k);
        return (
          <>
            <Hero position={ME} rotationY={toHim * 0.6} animation="scared" suit={1} visor={1} face="fear" />
            <Beam from={lerp3(GUN, AIM, 0.2)} to={tip} width={0.3} color="#ff8a2a" core="#fff2c0" />
            <pointLight position={tip} color="#ffb060" intensity={3 + 12 * k} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "14.bush",
      ...cam.push({ on: [BUSH[0] + 0.4, 1.0, BUSH[2]], dist: 4.2, to: 3.6, yaw: 0, pitch: 6, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "A bush at the edge of the clearing. It shakes. On 'jumped' somebody in teal comes out of the top of it with leaves in her hair, already running.",
      stage: (t) => {
        const j = wordAt("14.bush", "jumped");
        const out = 0.6 * ease(ramp(t, j - 0.1, j + 0.5));
        return (
          <>
            <Bush position={BUSH} shake={t < j + 0.2 ? 1 : 0} t={t} />
            {t > j - 0.1 ? <Nora position={[BUSH[0] + 1.5 * out, hop(t, j - 0.1, 1.1, 0.6), BUSH[2] - 0.5 * out]} rotationY={1.2} animation="run" animDistance={2 * out} face="brave" /> : null}
            <Bits position={[BUSH[0], 0.9, BUSH[2] + 0.3]} t={t - j + 0.1} color="#3a7d34" count={16} power={2.4} />
          </>
        );
      },
    },
    {
      cue: "14.nora",
      ...cam.push({ on: [SHE[0] + 0.05, 1.3, SHE[2]], dist: 4.6, to: 4.0, yaw: 0, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Nora, in front of him, feet planted, one hand out. Her little drone snaps a square of blue light open between them and the cannon.",
      stage: (t) => {
        const s = wordAt("14.nora", "shield");
        return (
          <>
            <Hero position={ME} rotationY={toHim} animation="scared" suit={1} visor={1} face="wow" />
            <Nora position={SHE} rotationY={toHim * 0.6} animation="guard" face="brave" />
            <Shield position={WALL} rotationY={toHim * 0.6} on={ease(ramp(t, s - 0.25, s))} hit={jolt(t, s, 0.3)} r={1.2} />
            <Fill on={[SHE[0], 1.4, SHE[2]]} yaw={24} power={5} />
          </>
        );
      },
    },
    {
      cue: "14.blast",
      ...cam.push({ on: f(1.7, 2.6, -1.0), dist: 8.4, to: 9.4, yaw: 0, pitch: -8, fov: 46 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Wide. The cannon fires: a bar of orange light from the old man to the shield. It hits, the shield goes white, and the whole blast turns and goes straight up out of the forest into the sky.",
      impacts: [{ at: 0.5, amp: 0.1, dur: 0.5 }],
      stage: (t) => {
        const hit = wordAt("14.blast", "hit");
        const on = t > hit - 0.1 && t < hit + 1.3;
        const w = 0.34 + 0.06 * Math.sin(t * 60);
        const P: Vec3 = [WALL[0] + 0.25, 1.2, WALL[2]];
        return (
          <>
            <Hero position={ME} rotationY={toHim * 0.5} animation="scared" suit={1} />
            <Nora position={SHE} rotationY={toHim * 0.6} animation="guard" face="brave" />
            <Shield position={WALL} rotationY={toHim * 0.6} on={1} hit={on ? 1 : 0} r={1.2} />
            <OldMan position={OLD} rotationY={toMe} animation="guard" suit={1} />
            <Cannon position={GUN} to={AIM} open={1} charge={on ? 1 : 0.5} />
            {on ? <Beam from={lerp3(GUN, AIM, 0.25)} to={P} width={w} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <Beam from={P} to={[P[0] - 0.6, 30, P[2] - 2]} width={w * 1.2} color="#ff8a2a" core="#fff2c0" /> : null}
            {on ? <pointLight position={[P[0], 1.6, P[2] + 1]} color="#ffb060" intensity={120} distance={14} decay={2} /> : null}
            <Bits position={P} t={t - hit + 0.1} color="#fff2c0" count={20} power={3.4} />
            <Woods cut2={1} />
          </>
        );
      },
    },
    {
      cue: "14.gone",
      ...cam.push({ on: [OLD[0], 1.3, OLD[2]], dist: 3.8, to: 3.2, yaw: -10, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The cannon folds away. The red eyes turn to her. Then to him. Then there is a puff of black smoke where the old man was, and nothing else.",
      stage: (t) => {
        const her = wordAt("14.gone", "her");
        const me = wordAt("14.gone", "me");
        const gone = wordAt("14.gone", "gone");
        const yaw = -0.5 * ease(ramp(t, her - 0.3, her)) + 1.0 * ease(ramp(t, me - 0.3, me));
        return (
          <>
            {t < gone - 0.1 ? <OldMan position={OLD} rotationY={toMe * 0.5} animation="idle" suit={1} headYaw={yaw} /> : null}
            {t < her ? <Cannon position={GUN} to={AIM} open={1 - ease(ramp(t, 0, her))} /> : null}
            {t > gone - 0.1 ? <Smoke position={[OLD[0], 0.9, OLD[2]]} /> : null}
            <Bits position={[OLD[0], 1.0, OLD[2]]} t={t - gone + 0.1} color="#22222a" count={18} power={2.6} />
            <Fill on={[OLD[0], 1.3, OLD[2]]} yaw={-10} power={4} />
          </>
        );
      },
    },
    {
      cue: "15.who",
      ...cam.push({ on: [ME[0] + 0.4, 1.45, ME[2]], dist: 4.4, to: 3.9, yaw: 0, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The two of them. He has his visor up and both hands out: WHY ME? She is still looking at the place where the old man was.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={0.5} animation="shrug" suit={1} visor={1} face="worried" />
          <Nora position={SHE} rotationY={0.9} animation="idle" face="uneasy" />
          <Shield position={[SHE[0] + 0.5, 1.9, SHE[2] - 0.3]} rotationY={toHim} on={0} />
          <group scale={pop(t, wordAt("15.who", "why") - 0.1)}>
            <Bubble text="WHY ME?" position={[ME[0] + 0.1, 2.45, ME[2]]} scale={0.4} dark />
          </group>
          <Fill on={[ME[0] + 0.4, 1.4, ME[2]]} yaw={-8} power={5} />
        </>
      ),
    },
    {
      cue: "15.threw",
      ...cam.push({ on: [SHE[0], 1.5, SHE[2]], dist: 2.5, to: 2.1, yaw: -16, pitch: 0, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Nora, close, turning to him. She is not smiling.",
      stage: (t) => (
        <>
          <Nora position={SHE} rotationY={0.9 - 1.3 * ease(ramp(t, 0.1, 0.7))} animation="talk" face="uneasy" />
          <Fill on={[SHE[0], 1.5, SHE[2]]} yaw={-16} power={5} />
        </>
      ),
    },
    {
      cue: "15.broke",
      ...cam.push({ on: [0.4, 1.6, 1.0], dist: 8.2, to: 7.2, yaw: 0, pitch: 4, fov: 44 }),
      zone: ZONE.town,
      look: DUSK,
      note: "What she is telling him, a long time ago: the square under a dark sky. A young man in a dark suit of armor with red eyes, and on 'break' a red beam from his hand across the square into the bell. Two villagers run.",
      impacts: [{ at: 2.6, amp: 0.07, dur: 0.35 }],
      stage: (t, { p }) => {
        const br = wordAt("15.broke", "break");
        const on = t > br - 0.1;
        const HE: Vec3 = [1.1, 0, 3.4];
        const yaw = toward(HE, PLACE.bell);
        return (
          <>
            <OldMan position={HE} rotationY={yaw} animation={t > br - 0.6 ? "point" : "idle"} suit={1} />
            {on ? <Beam from={front(HE, yaw, 0.7, 1.25)} to={[PLACE.bell[0], 2.0, PLACE.bell[2]]} width={0.2} color={RED} core="#ffd0c0" /> : null}
            {on ? <pointLight position={[0.8, 2, 1]} color={RED} intensity={60} distance={12} decay={2} /> : null}
            <Bits position={[PLACE.bell[0], 2.0, PLACE.bell[2] + 0.4]} t={t - br + 0.1} color="#ffb060" count={22} power={3.4} />
            <Mate n={1} position={[-2.2 - 1.6 * p, 0, 2.4]} rotationY={-Math.PI / 2} animation="run" animDistance={1.6 * p} face="fear" />
            <Mate n={2} position={[-1.0 - 1.4 * p, 0, 4.0]} rotationY={-Math.PI / 2} animation="run" animDistance={1.4 * p} face="fear" />
          </>
        );
      },
    },
    {
      cue: "15.took",
      ...cam.push({ on: [0.2, 1.5, 2.6], dist: 5.4, to: 4.6, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.town,
      look: DUSK,
      note: "The same square. He is on his knees in his own clothes, and his dark helmet with the red eyes is lifted away from him, up and out of the top of the frame. He reaches after it.",
      stage: (t) => {
        const away = wordAt("15.took", "away");
        const k = ease(ramp(t, away - 0.3, away + 1.2));
        return (
          <>
            <OldMan position={[0.2, 0, 2.6]} animation="reachUp" hair="#5a4a3a" headPitch={-0.4} />
            <group position={[0.2, 2.3 + 2.6 * k, 2.6]} rotation={[0.4, 0, 0]}>
              <group scale={1}>
                <mesh>
                  <boxGeometry args={[0.52, 0.52, 0.52]} />
                  <meshStandardMaterial color="#34343e" metalness={0.5} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.03, 0.262]}>
                  <boxGeometry args={[0.36, 0.08, 0.02]} />
                  <meshBasicMaterial color={RED} />
                </mesh>
              </group>
            </group>
            <Mate n={3} position={[-1.5, 0, 1.8]} rotationY={0.7} animation="idle" face="angry" />
            <Mate n={4} position={[1.9, 0, 1.8]} rotationY={-0.7} animation="idle" face="angry" />
            <Fill on={[0.2, 1.4, 2.6]} yaw={0} power={5} />
          </>
        );
      },
    },
    {
      cue: "15.helmet",
      ...cam.push({ on: [ME[0] + 0.4, 1.45, ME[2]], dist: 3.6, to: 2.9, yaw: 0, pitch: 0, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Back in the forest. She looks at his helmet. Her mouth shuts. The visor has come down by itself, and for one blink its blue eyes are red.",
      stage: (t) => {
        const st = wordAt("15.helmet", "stopped");
        const red = t > st + 0.35 && t < st + 0.6;
        return (
          <>
            <Hero position={ME} rotationY={0.5} animation="idle" suit={1} visor={1 - ease(ramp(t, 0.5, st))} face="worried" glow={red ? RED : undefined} eyes={red ? 2 : 1} />
            <Nora position={SHE} rotationY={-0.7} animation="idle" face={t > st - 0.2 ? "fear" : "uneasy"} headPitch={-0.1} />
            <Fill on={[ME[0] + 0.4, 1.4, ME[2]]} yaw={-8} power={5} />
          </>
        );
      },
    },
    {
      cue: "15.sub",
      ...cam.push({ on: [ME[0] + 0.45, 1.7, ME[2]], dist: 5.0, to: 4.6, yaw: 0, pitch: 2, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The two of them in the clearing, him in the suit, her with the drone over her shoulder. A sign comes up out of the grass between them: like, and subscribe.",
      stage: (t) => {
        const sub = wordAt("15.sub", "subscribe");
        return (
          <>
            <Hero position={[ME[0] - 0.35, 0, ME[2]]} rotationY={0.2} animation="wave" suit={1} visor={1} face="smile" />
            <Nora position={[SHE[0] + 0.45, 0, SHE[2]]} rotationY={-0.2} animation="idle" face="smile" />
            <Shield position={[SHE[0] + 1.0, 1.95, SHE[2] - 0.3]} on={0} />
            <group position={[ME[0] + 0.45, 2.75, ME[2]]} scale={pop(t, sub - 0.2)}>
              <SubscribeSign position={[0, 0, 0]} rotationY={0} scale={0.55} />
              <mesh position={[0, -1.55, -0.04]}>
                <boxGeometry args={[0.07, 2.4, 0.05]} />
                <meshStandardMaterial color="#5c3f24" />
              </mesh>
            </group>
            <Bits position={[ME[0] + 0.45, 2.75, ME[2]]} t={t - sub + 0.2} color="#6a8a4a" count={10} power={1.8} />
            <Fill on={[ME[0] + 0.45, 1.4, ME[2]]} yaw={0} power={5} />
          </>
        );
      },
    },
  ],
});
