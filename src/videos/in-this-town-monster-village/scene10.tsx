import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Army, Bits, Bubble, Burst, Bus, Crowd, Dad, DustRing, Fill, Folk, Hero, Hiss, Mo, Mum, NIGHT, Postman, Raider, Streaks, StrawHat, SubscribeSign, Sword, ZONE,
  dur, ease, faceOf, hillY, hop, jolt, manFace, pop, ramp, timing, wordAt,
} from "./kit";
import { MID } from "./scene9";

const E = Math.PI / 2;
const W = -Math.PI / 2;
const MO_FACE = manFace(MID);
/** Where he stops and looks back: in the street, level with Mo's house, the last one before the school. */
const BACK: Vec3 = [24, 0, 2.4];

/** The glow of a lot of torches behind the hill, and the light it throws down the street. */
const FarFire: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <>
    <Glow position={[-40, 7, 2]} size={22} color="#ff7a2a" opacity={0.3 * k} />
    <pointLight position={[-30, 7.5, 2]} color="#ffa050" intensity={90 * k} distance={24} decay={2} />
    <pointLight position={[-39, 7.5, 2]} color="#ffa050" intensity={90 * k} distance={24} decay={2} />
  </>
);

/**
 * THE SECOND LOT, and Mo alone. Something blows up in the forest, the trees fill with players, Mo sends the whole
 * village east to a hideout he dug years ago, and when the boy looks back Mo has not come. Helmet, chestplate, sword.
 */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Mo stays",
  shots: [
    {
      cue: "21.boom",
      ...cam.push({ on: [-30, 4.6, 2], dist: 19.5, to: 18, yaw: 90, pitch: -8, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Over the shoulders of two villagers, west along the street to the hill and the pines on it. On 'blew' the forest behind the hill goes up: a ball of fire, and the trees black against it. The two of them jump.",
      impacts: [{ at: 0.78, amp: 0.09, dur: 0.5 }],
      stage: (t) => {
        const boom = wordAt("21.boom", "blew");
        const x = t - boom;
        const flash = x > 0 ? Math.max(0, 1 - x / 0.5) : 0;
        return (
          <>
            <Burst position={[-38, 6.5, 2]} t={x} size={7} seed={2} />
            <Burst position={[-41, 7.5, 5]} t={x - 0.12} size={5} seed={5} />
            <Burst position={[-40, 7, -1]} t={x - 0.22} size={5} seed={8} />
            {x > 0 ? <Glow position={[-40, 7, 2]} size={26} color="#ff7a2a" opacity={0.25 + 0.5 * flash} /> : null}
            <pointLight position={[-32, 8, 2]} color="#ffa050" intensity={x > 0 ? 80 + 500 * flash : 0} distance={34} decay={2} />
            <Folk kind="zombie" n={0} position={[-15.2, hop(t, boom + 0.12, 0.3, 0.3), 1.45]} rotationY={W} mood={x > 0 ? "scared" : "calm"} arms={x > 0 ? 0.3 : 1} />
            <Folk kind="skeleton" n={1} position={[-15.0, hop(t, boom + 0.18, 0.3, 0.3), 2.75]} rotationY={W} mood={x > 0 ? "scared" : "calm"} rattle={x > 0 ? 0.8 : 0} />
          </>
        );
      },
    },
    {
      cue: "21.army",
      ...cam.push({ on: [-31, 3.4, 2], dist: 15.5, to: 12.5, yaw: 90, pitch: 12, fov: 44 }),
      shake: 0.025,
      zone: ZONE.night,
      look: NIGHT,
      note: "The top of the hill, from the village. It is full. A column of players as deep as the frame is tall, torches all the way back into the pines, coming over the edge and down the steps. Not six of them this time.",
      stage: (t, { p }) => {
        const adv = 4.6 * p;
        return (
          <>
            <FarFire />
            <Army t={t} from={-27.4} rows={19} cols={7} adv={adv} />
            {[0, 1, 2, 3, 4].map((i) => {
              const x = -25.6 - (i % 2) * 0.9 + adv;
              return <Raider key={i} who={i + 1} position={[x, hillY(x) + hop(t, 0.2 + i * 0.21, 0.2, 0.25), 0.3 + i * 0.85]} rotationY={E} animation="run" arms={i % 2 ? "reachUp" : "point"} torch={i === 2} animDistance={adv} face="angry" />;
            })}
          </>
        );
      },
    },
    {
      cue: "21.order",
      ...cam.push({ on: [-4.3, 1.5, 2.5], dist: 4.7, to: 3.9, yaw: 30, pitch: 2, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Mo does not wait. He throws one arm out to the east and gives the order, looking round at all of them. The firelight from the hill is on one side of his face. On 'hideout' they go, all at once, past him and out of frame.",
      impacts: [{ at: 0.2, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const run = wordAt("21.order", "run");
        const go = wordAt("21.order", "hideout") - 0.1;
        const k = ease(ramp(t, go, go + 1.3));
        const d = 7 * k * k;
        const face = k > 0 ? E : 0.6;
        const flick = 0.8 + 0.2 * Math.sin(t * 17);
        return (
          <>
            <Fill on={MO_FACE} yaw={30} power={8} d={2.2} />
            <pointLight position={[-7.6, 2.2, 3.4]} color="#ff9040" intensity={16 * flick} distance={8} decay={2} />
            <Mo position={MID} rotationY={0.95} animation="idle" arms="point" scarf={0} wiped={1} face="brave" headYaw={-0.9 + 1.2 * ease(ramp(t, run + 0.5, go))} saccade={false} gaze={0} />
            <Bubble text="RUN!" position={[-4.25, 2.62, 2.7]} rotationY={0.5} scale={0.5 * pop(t, run - 0.05) * (1 - ease(ramp(t, run + 1.1, run + 1.3)))} tail={-1} />
            <Hero position={[-3.45 + d * 0.9, 0, 3.2]} rotationY={k > 0.1 ? E : W + 0.6} animation={k > 0.1 ? "run" : "idle"} animDistance={d} face="fear" lookAt={k > 0.1 ? undefined : MO_FACE} />
            <Mum position={[-5.7 + d, 0, 1.5]} rotationY={face} walk={d} mood="scared" lookAt={k > 0 ? undefined : MO_FACE} />
            <Dad position={[-5.0 + d, 0, 0.7]} rotationY={face} walk={d} mood="scared" rattle={k > 0 ? 0.6 : 0} lookAt={k > 0 ? undefined : MO_FACE} />
            <Hiss position={[-3.7 + d, 0, 0.5]} rotationY={face} walk={d} mood="scared" lookAt={k > 0 ? undefined : MO_FACE} />
            <Folk kind="zombie" n={0} position={[-6.5 + d, 0, 0.6]} rotationY={face} walk={d} mood="scared" lookAt={k > 0 ? undefined : MO_FACE} />
            <Folk kind="skeleton" n={1} position={[-6.2 + d, 0, -0.4]} rotationY={face} walk={d} mood="scared" lookAt={k > 0 ? undefined : MO_FACE} />
            <Folk kind="enderman" n={1} position={[-4.4 + d, 0, -0.5]} rotationY={face} walk={d} lookAt={k > 0 ? undefined : MO_FACE} />
            <Folk kind="creeper" n={2} position={[-7.2 + d, 0, 1.6]} rotationY={face} walk={d} mood="scared" scale={0.8} />
          </>
        );
      },
    },
    {
      cue: "21.ran",
      ...cam.truck({ on: [3.2, 1.35, 2.4], dist: 7.2, yaw: 0, pitch: 7, fov: 44, by: [6.5, 0, 0] }),
      ease: "linear",
      shake: 0.02,
      zone: ZONE.night,
      look: NIGHT,
      note: "Side on, running with them, east along the street: the boy in front, mum, dad, Hiss, the bus bouncing, the postman's long legs, the small ones from school. Everybody.",
      stage: (t, { p }) => {
        const cx = 3.2 + 6.5 * p;
        const d = 7.2 * p;
        const at = (dx: number): number => cx - 0.25 + dx + 0.7 * p;
        return (
          <>
            <pointLight position={[cx, 3.2, 6]} color="#cdd6ff" intensity={46} distance={13} decay={2} />
            <Hero position={[at(1.15), hop(t, 0.3, 0.12, 0.2), 3.3]} rotationY={E} animation="run" animDistance={d} face="fear" />
            <Mum position={[at(0.35), 0, 2.3]} rotationY={E} walk={d} mood="scared" lean={0.2} />
            <Dad position={[at(-0.45), 0, 3.5]} rotationY={E} walk={d} mood="scared" rattle={0.6} lean={0.2} />
            <Hiss position={[at(-0.95), 0, 1.7]} rotationY={E} walk={d} mood="scared" lean={0.15} />
            <Postman position={[at(0.75), 0, 0.9]} rotationY={E} walk={d} lean={0.15} />
            <Bus position={[at(-1.2), Math.abs(Math.sin(t * 9)) * 0.5, 0.2]} rotationY={E} squash={Math.sin(t * 18) * 0.15} mood="scared" size={1.5} />
            <Folk kind="zombie" n={2} position={[at(1.25), hop(t, 0.5, 0.15, 0.2), 2.5]} rotationY={E} walk={d} scale={0.76} mood="scared" />
            <Folk kind="creeper" n={3} position={[at(-0.1), 0, 1.2]} rotationY={E} walk={d} scale={0.78} mood="scared" />
            <Folk kind="skeleton" n={3} position={[at(-0.2), 0, 4.2]} rotationY={E} walk={d} mood="scared" rattle={0.5} />
            <Folk kind="zombie" n={4} position={[at(-1.1), 0, 2.9]} rotationY={E} walk={d} mood="scared" lean={0.2} />
            <Streaks position={[cx, 1.4, 3.6]} yaw={W} t={t} n={10} spread={2.2} speed={15} />
          </>
        );
      },
    },
    {
      cue: "22.back",
      ...cam.push({ on: faceOf(BACK), dist: 4.6, to: 3.0, yaw: -90, pitch: 0, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From behind him as he runs. He slows, stops, and turns round to face us and the street he has come down. The others keep going, away into the dark behind him. His face when he sees who is not there.",
      stage: (t) => {
        const looked = wordAt("22.back", "looked");
        const stop = Math.max(0.5, looked - 0.25);
        const run = ease(ramp(t, 0, stop));
        const turn = ease(ramp(t, stop, stop + 0.35));
        const gone = wordAt("22.back", "mo");
        const far = 7.5 * ramp(t, 0, dur("22.back"));
        return (
          <>
            <Fill on={faceOf(BACK)} yaw={-90} power={8} d={2} />
            <Hero position={[BACK[0] - 2.2 * (1 - run), 0, BACK[2]]} rotationY={E - Math.PI * turn} animation={run < 1 ? "run" : "idle"} animDistance={2.2 * run} face={t > gone ? "fear" : "uneasy"} headPitch={-0.05} gaze={0} />
            <Mum position={[26.0 + far, 0, 1.4]} rotationY={E} walk={far} mood="scared" lean={0.2} />
            <Dad position={[26.8 + far, 0, 3.4]} rotationY={E} walk={far} mood="scared" lean={0.2} />
            <Hiss position={[25.6 + far, 0, 3.1]} rotationY={E} walk={far} mood="scared" />
            <Folk kind="zombie" n={2} position={[27.4 + far, 0, 2.2]} rotationY={E} walk={far} scale={0.76} />
            <Folk kind="enderman" n={1} position={[28.2 + far, 0, 1.2]} rotationY={E} walk={far} />
            <DustRing position={[BACK[0], 0.05, BACK[2]]} t={t - stop} size={0.9} />
          </>
        );
      },
    },
    {
      cue: "22.alone",
      ...cam.push({ on: [-4.4, 1.5, 2.4], dist: 12.5, to: 10.5, yaw: 90, pitch: 7, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "What he sees. The whole empty street, dropped swords on it, and one man in a straw hat standing in the middle with his back to us. Past him, the hill, on fire with torches, and they are coming down it.",
      stage: (t, { p }) => (
        <>
          <FarFire k={0.8} />
          <Army t={t} from={-23.5} rows={9} cols={7} adv={1.6 * p} />
          <Mo position={MID} rotationY={W} animation="idle" scarf={0} wiped={1} face="neutral" />
          <pointLight position={[-4.4, 3.6, 4.4]} color="#cdd6ff" intensity={30} distance={9} decay={2} />
          <group position={[-2.6, 0.07, 3.3]} rotation={[0, 0.7, 0]}>
            <Sword />
          </group>
          <group position={[-6.4, 0.07, 1.2]} rotation={[0, -1.9, 0]}>
            <Sword />
          </group>
          <group position={[-1.2, 0.07, 1.5]} rotation={[0, 2.6, 0]}>
            <Sword />
          </group>
        </>
      ),
    },
    {
      cue: "22.armor",
      ...cam.push({ on: [-4.45, 1.42, 2.4], dist: 4.0, to: 3.2, yaw: -66, pitch: -6, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From in front of him and low. On 'helmet' the straw hat goes off backwards and an iron helmet is on his head. On 'chestplate' his chest is iron. On 'sword' his arm comes up with one in it, pointed at the hill. Firelight on all of it.",
      impacts: [
        { at: 0.68, amp: 0.04, dur: 0.25 },
        { at: 1.56, amp: 0.04, dur: 0.25 },
        { at: 2.6, amp: 0.06, dur: 0.3 },
      ],
      stage: (t) => {
        const h = wordAt("22.armor", "helmet") - 0.1;
        const c = wordAt("22.armor", "chestplate") - 0.1;
        const s = wordAt("22.armor", "sword") - 0.12;
        const fly = t - h;
        const flick = 0.8 + 0.2 * Math.sin(t * 17);
        return (
          <>
            <Fill on={MO_FACE} yaw={-66} power={8} d={2.2} />
            <pointLight position={[-7.4, 1.9, 1.4]} color="#ff9040" intensity={18 * flick} distance={8} decay={2} />
            <Mo position={MID} rotationY={W} animation="idle" arms={t > s ? "point" : undefined} hat={t < h} helmet={t >= h ? pop(t, h, 0.2) : 0} chest={t >= c} scarf={0} wiped={1} face={t > s ? "brave" : "neutral"} headPitch={jolt(t, h, 0.3) + jolt(t, c, 0.15)} saccade={false} gaze={0}>
              {t > s ? <Sword /> : null}
            </Mo>
            {fly > 0 && fly < 1.4 ? <StrawHat position={[MID[0] + 2.6 * fly, 1.8 + 3.2 * fly - 3.4 * fly * fly, MID[2] - 0.9 * fly]} width={0.92} rotation={[fly * 5, fly * 3, 0.3]} /> : null}
            <Bits position={[MID[0], 1.75, MID[2]]} t={t - h} color="#dfe6ee" count={8} power={2} />
            <Bits position={[MID[0] - 0.2, 1.15, MID[2]]} t={t - c} color="#dfe6ee" count={12} power={2.4} />
            <Bits position={[MID[0] - 0.7, 1.35, MID[2] - 0.3]} t={t - s} color="#ffffff" count={8} power={2} />
            <DustRing position={[MID[0], 0.05, MID[2]]} t={t - c} size={1.4} />
          </>
        );
      },
    },
    {
      cue: "22.sub",
      ...cam.push({ on: [-4.5, 1.2, 2.95], dist: 5.4, to: 4.8, yaw: -80, pitch: 3, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "One man in iron between a village and an army, sword out, and the sign.",
      stage: (t) => {
        const flick = 0.8 + 0.2 * Math.sin(t * 17);
        return (
          <>
            <Fill on={[-4.5, 1.4, 2.9]} yaw={-80} power={10} d={2.6} />
            <pointLight position={[-7.6, 1.9, 1.4]} color="#ff9040" intensity={16 * flick} distance={8} decay={2} />
            <Mo position={MID} rotationY={W} animation="idle" arms="point" hat={false} helmet={1} chest scarf={0} wiped={1} face="brave" saccade={false} gaze={0}>
              <Sword />
            </Mo>
            <group position={[-4.75, 0, 3.55]} rotation={[0, W, 0]} scale={pop(t, 0.1)}>
              <SubscribeSign position={[0, 0.95, 0]} rotationY={0} scale={0.42} />
              <Block position={[0, 0.45, -0.03]} size={[0.05, 0.9, 0.05]} color="#5c3f24" />
            </group>
          </>
        );
      },
    },
  ],
});
