import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Army, Bits, Dad, DustRing, EAST, FARM, FarFire, Fill, Folk, Hero, Hiss, MudDoor, Mo, Mum, NIGHT, NORTH, Postman, Puffs, Runners, Streaks, Sword, WARM, WEST, ZONES,
  ease, faceOf, h, hop, jolt, monsterFace, ramp, timing, wordAt,
} from "./kit";

const MID: Vec3 = [-4.4, 0, 2.4];
const [FX, , FZ] = FARM;
/** The bottom of the hole, built for one shot a long way from anything. */
const PIT: Vec3 = [0, 0, -220];

/** WHERE WE LEFT OFF, the farm that is only mud, and the mud that eats dad. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A wrecked pig farm",
  shots: [
    {
      cue: "1.town",
      ...cam.truck({ on: [8.5, 1.15, 2.4], dist: 4.6, yaw: 62, pitch: 4, fov: 42, by: [4.5, 0, 0] }),
      ease: "linear",
      shake: 0.02,
      zone: ZONES.night,
      look: NIGHT,
      note: "The boy in yellow running east down the street at night, his mum and dad behind him. On 'not a monster' he looks back over his shoulder, at what they are running from.",
      stage: (t, { p }) => {
        const x = 8.5 + 4.5 * p;
        const back = ease(ramp(t, 1.3, 1.7));
        return (
          <>
            <Fill on={faceOf([x, 0, 2.4])} yaw={62} power={8} d={2} />
            <Hero position={[x, 0, 2.4]} rotationY={EAST} animation="run" animDistance={4.5 * p} face="fear" headYaw={-1.3 * back} gaze={0} />
            <Mum position={[x - 1.5, 0, 1.5]} rotationY={EAST} walk={4.5 * p} mood="scared" lean={0.2} />
            <Dad position={[x - 2.3, 0, 3.1]} rotationY={EAST} walk={4.5 * p} mood="scared" rattle={0.6} lean={0.2} />
            <Hiss position={[x - 3.3, 0, 2.2]} rotationY={EAST} walk={4.5 * p} mood="scared" />
            <FarFire k={0.6} />
          </>
        );
      },
    },
    {
      cue: "1.left",
      ...cam.push({ on: [-4.4, 1.5, 2.4], dist: 7.6, to: 6.0, yaw: 90, pitch: 6, fov: 42 }),
      zone: ZONES.night,
      look: NIGHT,
      note: "What he sees: Mo, in an iron helmet and chestplate, sword out, alone in the street with his back to us, and the hill beyond him covered in torches coming down.",
      stage: (t, { p }) => (
        <>
          <FarFire k={0.8} />
          <Army t={t} from={-23.5} rows={9} cols={7} adv={2 * p} />
          <pointLight position={[-4.4, 3.6, 4.4]} color="#cdd6ff" intensity={30} distance={9} decay={2} />
          <Mo position={MID} rotationY={WEST} animation="idle" arms="point" hat={false} helmet={1} chest scarf={0} wiped={1} face="brave">
            <Sword />
          </Mo>
        </>
      ),
    },
    {
      cue: "1.ran",
      ...cam.truck({ on: [11.5, 1.35, 2.4], dist: 7.2, yaw: 0, pitch: 7, fov: 44, by: [6.5, 0, 0] }),
      ease: "linear",
      shake: 0.02,
      zone: ZONES.night,
      look: NIGHT,
      note: "Side on, running with the whole village east along the street, the pond going by in front of us: the boy, mum, dad, Hiss, the bus bouncing, the postman, the small ones.",
      stage: (t, { p }) => {
        const cx = 11.5 + 6.5 * p;
        return (
          <>
            <pointLight position={[cx, 3.2, 6]} color="#cdd6ff" intensity={46} distance={13} decay={2} />
            <Runners x={cx - 0.25 + 0.7 * p} d={7.2 * p} t={t} dir={EAST} />
            <Streaks position={[cx, 1.4, 3.6]} yaw={WEST} t={t} n={10} spread={2.2} speed={15} />
          </>
        );
      },
    },
    {
      cue: "1.farm",
      ...cam.push({ on: [FX, 1.1, FZ + 2.2], dist: 9.6, to: 8.2, yaw: 0, pitch: 17, fov: 46 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "They stop, in a row with their backs to us, and beyond them is all there is: a square of mud, a fence that has fallen over, half a shed. On 'all we found' their heads go down.",
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.9));
        const z = FZ + 5.4 - 1.2 * walk;
        const droop = 0.4 * ease(ramp(t, 1.2, 1.6));
        return (
          <>
            <Hero position={[FX, 0, z]} rotationY={NORTH} animation={walk < 1 ? "walk" : "idle"} animDistance={1.2 * walk} face="uneasy" headPitch={droop} />
            <Mum position={[FX - 1.2, 0, z + 0.1]} rotationY={NORTH} walk={1.2 * walk} nod={droop} arms={1 - walk * 0.7} />
            <Dad position={[FX + 1.2, 0, z + 0.2]} rotationY={NORTH} walk={1.2 * walk} nod={droop} />
            <Hiss position={[FX - 2.4, 0, z + 0.4]} rotationY={NORTH} walk={1.2 * walk} nod={droop} />
            <Postman position={[FX + 2.5, 0, z + 0.5]} rotationY={NORTH} walk={1.2 * walk} nod={droop} />
            <Folk kind="zombie" n={2} position={[FX + 0.5, 0, z + 1.0]} rotationY={NORTH} walk={1.2 * walk} scale={0.76} nod={droop} />
            <pointLight position={[FX, 3.4, z + 2.6]} color="#cdd6ff" intensity={60} distance={12} decay={2} />
            <MudDoor />
          </>
        );
      },
    },
    {
      cue: "1.mud",
      ...cam.truck({ on: [FX - 2.8, 0.7, FZ - 0.5], dist: 4.6, yaw: 0, pitch: 14, fov: 42, by: [5.2, 0, 0] }),
      ease: "linear",
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Low along the farm, left to right, one thing per word: the broken fence, the empty trough under a sign that says PIGS, and then mud, with the boy in it up to his ankles pulling one foot out, and Hiss sliding.",
      stage: (t) => {
        const mud = wordAt("1.mud", "mud");
        const lot = wordAt("1.mud", "lot");
        const pull = Math.max(0, Math.sin((t - mud) * 6)) * (t > mud ? 1 : 0);
        const slip = ease(ramp(t, lot, lot + 0.5));
        return (
          <>
            <pointLight position={[FX, 2.2, FZ + 2.6]} color="#cdd6ff" intensity={30} distance={10} decay={2} />
            <Hero position={[FX + 0.5, -0.1 + 0.12 * pull, FZ - 0.6]} rotationY={0.2} animation="idle" face={t > mud ? "ouch" : "uneasy"} headPitch={0.4} />
            {t > mud ? <Puffs position={[FX + 0.5, 0.15, FZ - 0.5]} color="#5b4331" count={5} rise={0.4} spread={0.3} size={0.08} speed={1.6} opacity={0.9} /> : null}
            <Hiss position={[FX + 2.0 + 0.6 * slip, 0, FZ - 0.9]} rotationY={-0.3} lean={-0.45 * Math.sin(slip * Math.PI)} mood="scared" />
            <MudDoor />
          </>
        );
      },
    },
    {
      cue: "2.nothing",
      ...cam.push({ on: monsterFace("zombie", [FX - 1.4, 0, FZ + 1.6]), dist: 3.1, to: 2.6, yaw: 10, pitch: 2, fov: 38 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Mum, close, shaking her head. Behind her, dad is still walking.",
      stage: (t) => (
        <>
          <Fill on={monsterFace("zombie", [FX - 1.4, 0, FZ + 1.6])} yaw={10} power={9} d={2} />
          <Mum position={[FX - 1.4, 0, FZ + 1.6]} rotationY={0.15} turn={t < 1.0 ? 0.55 * Math.sin(t * 10) : 0} mood="sad" arms={0.3} />
          <Dad position={[FX - 2.4 + 0.9 * (t / 1.6), 0, FZ + 0.1]} rotationY={EAST} walk={0.9 * (t / 1.6)} mood="sad" />
          <MudDoor />
        </>
      ),
    },
    {
      cue: "2.step",
      ...cam.push({ on: [FX - 0.4, 1.0, FZ], dist: 6.2, to: 5.4, yaw: 12, pitch: 9, fov: 42 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Dad walks across the mud. On 'step' his foot comes down on one patch of it, and on 'ate' he goes straight down through it and is gone. Mud flies. Mum and the boy jump.",
      impacts: [{ at: 1.82, amp: 0.07, dur: 0.35 }],
      stage: (t) => {
        const step = wordAt("2.step", "step");
        const ate = wordAt("2.step", "ate");
        const walk = ease(ramp(t, 0, step + 0.1));
        const drop = ramp(t, ate - 0.05, ate + 0.22);
        return (
          <>
            <Fill on={[FX - 0.2, 1.5, FZ]} yaw={12} power={10} d={2.8} />
            <Dad position={[FX - 1.5 + 1.5 * walk, -3.0 * drop * drop, FZ]} rotationY={EAST} walk={1.5 * walk} mood={drop > 0 ? "scared" : "sad"} wave={drop > 0 ? 1 : 0} rattle={drop > 0 ? 1 : 0} />
            <MudDoor k={drop > 0.5 ? 0.02 + 1.3 * ease(ramp(t, ate + 0.1, ate + 0.3)) : 0} />
            {drop > 0.3 ? <Block position={[FX, 0.07, FZ]} size={[1.6, 0.03, 1.6]} color="#070504" castShadow={false} /> : null}
            <Bits position={[FX, 0.3, FZ]} t={t - ate} color="#5b4331" count={18} power={3.4} />
            <DustRing position={[FX, 0.06, FZ]} t={t - ate} size={1.8} color="#5b4331" />
            <Mum position={[FX - 2.2, hop(t, ate + 0.1, 0.3, 0.3), FZ + 1.2]} rotationY={1.0} mood={t > ate ? "scared" : "sad"} lookAt={[FX, 0.5, FZ]} />
            <Hero position={[FX - 1.3, hop(t, ate + 0.16, 0.3, 0.3), FZ + 1.7]} rotationY={0.9} animation="idle" face={t > ate ? "wow" : "uneasy"} lookAt={[FX, 0.5, FZ]} />
          </>
        );
      },
    },
    {
      cue: "2.hole",
      ...cam.push({ on: [PIT[0], 4.4, PIT[2]], dist: 4.3, to: 3.7, yaw: 0, pitch: -78, fov: 46 }),
      zone: ZONES.pit,
      look: NIGHT,
      note: "From the bottom of the hole, straight up: a square of night sky, and four heads coming in over its edges one after another. Mum, the boy, Hiss, a zombie.",
      stage: (t) => {
        const P = (x: number, y: number, z: number): Vec3 => [PIT[0] + x, PIT[1] + y, PIT[2] + z];
        const in1 = ease(ramp(t, 0.0, 0.3));
        const in2 = ease(ramp(t, 0.15, 0.45));
        const in3 = ease(ramp(t, 0.3, 0.6));
        const in4 = ease(ramp(t, 0.45, 0.75));
        return (
          <>
            <Block position={P(0, 4.3, -4)} size={[10, 0.6, 6]} color="#3a2a1e" />
            <Block position={P(0, 4.3, 4)} size={[10, 0.6, 6]} color="#3a2a1e" />
            <Block position={P(-3, 4.3, 0)} size={[4, 0.6, 2]} color="#3a2a1e" />
            <Block position={P(3, 4.3, 0)} size={[4, 0.6, 2]} color="#3a2a1e" />
            <Block position={P(0, 2, -1.75)} size={[3.7, 4.6, 0.2]} color="#6b4a2a" castShadow={false} />
            <Block position={P(0, 2, 1.75)} size={[3.7, 4.6, 0.2]} color="#6b4a2a" castShadow={false} />
            <Block position={P(-1.75, 2, 0)} size={[0.2, 4.6, 3.7]} color="#5c3f24" castShadow={false} />
            <Block position={P(1.75, 2, 0)} size={[0.2, 4.6, 3.7]} color="#5c3f24" castShadow={false} />
            <pointLight position={P(0, 3.2, 0)} color="#ffc890" intensity={26} distance={6} decay={2} />
            <Mum position={P(0, 4.6, -2.3 + 0.75 * in1)} rotationY={0} lean={0.95 * in1} mood="scared" arms={0.2} />
            <Hero position={P(0.1, 4.6, 2.2 - 0.75 * in2)} rotationY={NORTH} animation="leanOver" face="wow" />
            <Hiss position={P(2.3 - 0.75 * in3, 4.6, 0)} rotationY={WEST} lean={0.85 * in3} mood="scared" />
            <Folk kind="zombie" n={0} position={P(-2.3 + 0.75 * in4, 4.6, 0.1)} rotationY={EAST} lean={0.95 * in4} mood="scared" arms={0.2} />
          </>
        );
      },
    },
    {
      cue: "2.wave",
      ...cam.push({ on: h(3, 0.95, 2.9), dist: 4.3, to: 3.6, yaw: 90, pitch: 56, fov: 42 }),
      zone: ZONES.hide,
      look: WARM,
      note: "Looking down from where they are: dad, at the foot of a ladder on a clean wooden floor, in a pool of lamplight, with mud all round him, waving up at us and rattling.",
      stage: (t) => {
        const both = wordAt("2.wave", "both");
        return (
          <>
            <pointLight position={h(3, 2.6, 3.4)} color="#ffe2b0" intensity={26} distance={7} decay={2} />
            <Dad position={h(3, 0, 2.9)} rotationY={EAST} wave={1} rattle={0.5 + 0.5 * Math.sin(t * 8)} mood="happy" nod={-0.95} tilt={jolt(t, both, 0.5)} />
            {[[-0.7, 0.5], [0.8, 0.3], [0.2, 1.1], [-0.4, -0.3], [0.9, 1.0], [-0.9, 1.2]].map(([x, z], i) => (
              <Block key={i} position={h(3 + x, 0.03, 2.9 + z)} size={[0.28 - (i % 3) * 0.06, 0.05, 0.22]} color="#5b4331" castShadow={false} />
            ))}
            <DustRing position={h(3, 0.05, 2.9)} t={t} size={1.4} color="#5b4331" />
          </>
        );
      },
    },
    {
      cue: "2.door",
      ...cam.push({ on: [FX - 0.3, 0.55, FZ + 0.1], dist: 5.4, to: 4.6, yaw: 62, pitch: 20, fov: 42 }),
      zone: ZONES.farmNight,
      look: NIGHT,
      note: "Close on the patch of mud. On 'door' it lifts on a hinge: mud on top, clean planks underneath, lamplight coming up through the gap. The boy knocks on it. Wood.",
      stage: (t) => {
        const door = wordAt("2.door", "door");
        const knock = wordAt("2.door", "painted");
        const k = 0.7 * ease(ramp(t, door - 0.15, door + 0.35));
        return (
          <>
            <pointLight position={[FX - 1, 1.6, FZ + 2]} color="#cdd6ff" intensity={18} distance={7} decay={2} />
            <MudDoor k={k} glow={5 * k} />
            <Hero position={[FX - 1.35, 0, FZ + 0.35]} rotationY={EAST} animation="leanOver" arms={t > knock - 0.1 ? "reach" : undefined} face="wow" headPitch={jolt(t, knock, 0.4) + jolt(t, knock + 0.25, 0.4)} />
            <Bits position={[FX, 0.2, FZ + 0.6]} t={t - door} color="#5b4331" count={8} power={1.4} />
          </>
        );
      },
    },
  ],
});
