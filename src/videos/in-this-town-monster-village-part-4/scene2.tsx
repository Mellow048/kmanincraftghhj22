import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Axe, Boom, Bubble, CLASH, EAST, Fill, Flat, GATE, HOLE, HandBanner, Hero, Horde, IronGolem, LOOK, ME, NIGHT4, NORTH, Pillager, Puffs, Raider, Ravager, SpyMask, Spyglass,
  TNT, VGuard, Vex, WEST, Witch, Z, dur, ease, f, hd, ramp, spyLook, spyglassAt, spyglassPose, timing,
} from "./kit";
import { Block } from "../../engine";
import { G, Yard, bump, clamp, up, w } from "./shared";

/** What the spyglass sees: a camera at `eye`, looking north and a little down, as still as a hand holds a spyglass. */
const DOWN = 0.2;
/** For the three looks at the trees the glass is nearly level: trunks and leaves, not grass. */
const LEVEL = 0.1;
const E1: Vec3 = hd(-15, 4.5, 10);
const E2: Vec3 = hd(1, 4.5, 10);
const E3: Vec3 = hd(14, 4.5, 10);
const E4: Vec3 = hd(0, 5, 12);
/** The lookout, on his feet at the north edge of the tower top. */
const WATCH: Vec3 = up(LOOK, 0);
const WATCH_N: Vec3 = [LOOK[0], LOOK[1], LOOK[2] - 1.2];
/** Where the golem stands when it is first seen. */
const GOUT: Vec3 = f(0, 0, -7.6);
/** The fight: the golem's feet and the ravager's, when they are locked together. */
const GFIGHT: Vec3 = [CLASH[0] - 1.9, 0, CLASH[2]];
const RFIGHT: Vec3 = [CLASH[0] + 3.3, 0, CLASH[2]];

/** The two sides, watching the fight: pillagers in the hole shouting, the castle's guards on the other side. */
const Sides: React.FC<{ t: number; jump?: number }> = ({ t, jump = 0 }) => (
  <>
    {[-2.6, -1.3, 0, 1.3, 2.6].map((z, i) => (
      <Pillager key={z} position={[HOLE[0] - 2.2 - (i % 2) * 0.9, 0.05 + jump * (i % 2 ? 0.5 : 0.3), HOLE[2] + z]} rotationY={WEST} n={i} mad={1} cheer={0.5 + 0.5 * Math.sin(t * 7 + i * 2)} crossbow={i === 2} phase={i} />
    ))}
    {[-5.6, -4.2, -6.6, -3.4].map((z, i) => (
      <VGuard key={z} position={f(-1.6 - (i % 2) * 1.1, jump * (i % 2 ? 0.3 : 0.5), z)} rotationY={EAST} n={i} lookAt={up(CLASH, 3)} lean={-0.12 * jump} />
    ))}
  </>
);

/** THE ATTACK: the lookout, the spyglass, the wall, the golem, the ravager. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The wall",
  shots: [
    {
      cue: "4.tower",
      from: f(-0.5, 2.0, -6.5),
      to: f(-2.5, 9.6, -8.5),
      target: f(-9, 4.0, -14.2),
      targetTo: up(WATCH, 0.5),
      fov: 46,
      zone: Z.fort,
      look: NIGHT4,
      note: "The lookout tower from the yard. The camera climbs it floor by floor: a store room with a barrel, a room with a bed, an open floor with a ladder and a lamp, and on the top one player sits against the flagpole with a spyglass in his lap, fast asleep.",
      stage: (t) => (
        <>
          <Yard t={t} plug hero="sleep" sleeper patrol />
          <Spyglass position={[WATCH[0] + 0.35, WATCH[1] + 0.35, WATCH[2] + 0.3]} yaw={1.2} />
          <Bubble text="Z" position={[WATCH[0] + 0.5, WATCH[1] + 1.5 + ((t * 0.4) % 1) * 0.8, WATCH[2] + 0.2]} rotationY={0.5} scale={0.5} />
          <pointLight position={[WATCH[0] + 1.5, WATCH[1] + 1.4, WATCH[2] + 2]} color="#e6ecff" intensity={9} distance={7} decay={2} />
        </>
      ),
    },
    {
      cue: "4.glass",
      from: [WATCH_N[0] - 2.4, WATCH_N[1] + 1.75, WATCH_N[2] - 3.0],
      to: [WATCH_N[0] - 2.0, WATCH_N[1] + 1.65, WATCH_N[2] - 2.2],
      target: [WATCH_N[0], WATCH_N[1] + 1.3, WATCH_N[2]],
      targetTo: [WATCH_N[0], WATCH_N[1] + 1.4, WATCH_N[2]],
      fov: 42,
      zone: Z.fort,
      look: NIGHT4,
      note: "From out in the air beyond the wall, looking back at him: he jerks awake and is on his feet before the words are out. Both arms come up and he holds a brass spyglass to his eye, one hand on each end. It points just past us.",
      stage: (t) => {
        // every move starts a beat BEFORE its words: the picture leads, the caption never waits for it
        const upk = ease(ramp(t, 0, 0.4));
        const picked = w("4.glass", "picked", 0.94);
        const glass = ease(ramp(t, picked - 0.25, picked + 0.3));
        const scan = ease(ramp(t, w("4.glass", "looked", 2.28) - 0.2, dur("4.glass")));
        return (
          <>
            <Yard t={t} plug hero="sleep" patrol />
            {upk < 0.5 ? (
              <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], WATCH[2] - 1.2 * upk]} rotationY={NORTH} animation="sit" face="surprised" />
            ) : (
              <>
                <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], WATCH[2] - 1.2 * upk]} rotationY={NORTH + 0.3 - 0.6 * scan} pose={spyglassPose(t, glass)} face={glass > 0.6 ? "neutral" : "surprised"} />
                <Spyglass position={spyglassAt([WATCH[0], WATCH[1], WATCH[2] - 1.2 * upk], NORTH + 0.3 - 0.6 * scan, glass)} yaw={NORTH + 0.3 - 0.6 * scan} pitch={-0.9 * (1 - glass)} scale={1.35} />
              </>
            )}
            <pointLight position={[WATCH_N[0] - 1, WATCH_N[1] + 1.8, WATCH_N[2] - 2]} color="#e6ecff" intensity={10} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "4.trees",
      ...cam.pan({ from: E1, on: spyLook(E1, LEVEL), onTo: spyLook(E1, LEVEL), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "THROUGH THE SPYGLASS: a round picture in black with a brass rim. Trees.",
      stage: () => <SpyMask eye={E1} down={LEVEL} />,
    },
    {
      cue: "4.trees",
      cut: 0.7,
      ...cam.pan({ from: E2, on: spyLook(E2, LEVEL), onTo: spyLook(E2, LEVEL), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass jumps along the forest, on the word. More trees.",
      stage: () => <SpyMask eye={E2} down={LEVEL} />,
    },
    {
      cue: "4.trees",
      cut: 1.4,
      ...cam.pan({ from: E3, on: spyLook(E3, LEVEL), onTo: spyLook(E3, LEVEL), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "It jumps again, on the word. More trees. Then between the trunks, torches: pillagers are walking out of the forest, every one of them with a face.",
      stage: (t) => (
        <>
          <SpyMask eye={E3} down={LEVEL} />
          <Horde position={hd(14, 0, -24)} t={t} rows={7} cols={7} width={9} adv={ease(ramp(t, 0.55, 1.8)) * 9} seed={1} />
        </>
      ),
    },
    {
      cue: "4.pill",
      ...cam.pan({ from: E4, on: spyLook(E4, 0.22), onTo: spyLook(E4, 0.22), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass on the field: pillagers from the bottom of the glass to the top, row behind row, crossbows, axes, torches, banners, evokers with their arms up, and ravagers among them. All coming this way.",
      stage: (t) => (
        <>
          <SpyMask eye={E4} down={0.22} />
          <Horde position={hd(0, 0, -2)} t={t} rows={15} cols={9} width={10.5} fan={0.035} adv={1 + t * 1.6} beasts={2} seed={2} />
        </>
      ),
    },
    {
      cue: "4.gers",
      ...cam.push({ on: hd(-5.4, 1.45, 2.2), dist: 3.7, to: 3.0, yaw: -14, pitch: 2, fov: 44 }),
      zone: Z.horde,
      look: NIGHT4,
      note: "VINDICATORS. Down among them, in front of the front row: three in grey coats with iron axes over their heads, chopping the air as they march at us, the whole army behind them.",
      stage: (t) => <Army t={t} since={0} />,
    },
    {
      cue: "4.gers",
      cut: 0.98,
      ...cam.push({ on: hd(-1.8, 1.7, 2.2), dist: 3.6, to: 3.0, yaw: 10, pitch: -4, fov: 44 }),
      zone: Z.horde,
      look: NIGHT4,
      note: "EVOKERS. One in a dark coat with gold on it, both arms up, purple sparks pouring off his hands, and two small blue vexes going round his head.",
      stage: (t) => <Army t={t + 0.98} since={0.98} />,
    },
    {
      cue: "4.gers",
      cut: 1.8,
      ...cam.push({ on: hd(1.95, 1.7, 2.4), dist: 4.9, to: 4.3, yaw: -8, pitch: 0, fov: 44 }),
      zone: Z.horde,
      look: NIGHT4,
      note: "WITCHES. Two in purple with tall black hats, each holding out a bottle that glows.",
      stage: (t) => <Army t={t + 1.8} since={1.8} />,
    },
    {
      cue: "4.gers",
      cut: 2.88,
      ...cam.push({ on: hd(5.5, 0.6, 2.9), onTo: hd(6.3, 1.9, 1.6), dist: 2.7, to: 5.6, yaw: -6, pitch: 0, fov: 48 }),
      zone: Z.horde,
      look: NIGHT4,
      note: "AND THE ONES WITH NO NAME. A very small one, carrying a banner three times his size, marching with his chin up. The camera lifts off him: behind him a ravager as big as a cart opens its jaw.",
      stage: (t) => <Army t={t + 2.88} since={2.88} />,
    },
    {
      cue: "4.vex",
      ...cam.pan({ from: E2, on: spyLook(E2, DOWN), onTo: spyLook(E2, DOWN), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass again, on the army. A pale blue dot lifts out of it, gets bigger, bigger, and fills the round picture: a small winged thing with red eyes and a sword.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, w("4.vex", "spyglass", 1.62) + 0.1));
        const d = 22 - 19.9 * k;
        return (
          <>
            <SpyMask eye={E2} down={DOWN} />
            <Horde position={hd(1, 0, -3)} t={t} rows={12} cols={8} width={10} fan={0.03} adv={2 + t} beasts={2} seed={3} />
            <Vex position={[E2[0] + Math.sin(t * 6) * 0.5 * (1 - k), E2[1] - Math.sin(DOWN) * d + 0.5 * (1 - k) - 0.2, E2[2] - Math.cos(DOWN) * d]} t={t} />
            <pointLight position={[E2[0], E2[1], E2[2] - 0.2]} color="#cfe6ff" intensity={3 * k} distance={4} decay={2} />
          </>
        );
      },
    },
    {
      cue: "4.face",
      from: [WATCH_N[0] + 2.6, WATCH_N[1] + 2.1, WATCH_N[2] - 2.0],
      to: [WATCH_N[0] + 2.9, WATCH_N[1] + 2.0, WATCH_N[2] - 0.6],
      target: [WATCH_N[0], WATCH_N[1] + 1.35, WATCH_N[2] + 0.2],
      targetTo: [WATCH_N[0], WATCH_N[1] + 1.3, WATCH_N[2] + 2.6],
      fov: 48,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.2, amp: 0.07, dur: 0.3 }],
      note: "On the tower top, close, the camera going with him: the blue thing hits him square in the face. The spyglass spins out of his hands and he goes backwards across the planks, arms going round, towards the edge.",
      stage: (t) => {
        const back = ease(ramp(t, 0.2, dur("4.face")));
        const z = WATCH_N[2] + 2.7 * back;
        const hitk = clamp(t / 0.2);
        return (
          <>
            <Yard t={t} plug hero="sleep" patrol />
            {t < 0.2 ? (
              <>
                <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], z]} rotationY={NORTH} pose={spyglassPose(t, 1)} face="surprised" />
                <Spyglass position={spyglassAt([WATCH[0], WATCH[1], z], NORTH)} yaw={NORTH} scale={1.35} />
              </>
            ) : (
              <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], z]} rotationY={NORTH} animation="panic" face="scared" />
            )}
            <Vex position={[WATCH[0], WATCH[1] + 1.6, z - 0.4 - 3.5 * (1 - hitk)]} t={t} rotationY={0} scale={1.2} />
            {t >= 0.2 ? <Spyglass position={[WATCH[0] - 0.3 - (t - 0.2) * 1.5, WATCH[1] + 1.6 + (t - 0.2) * 3 - 4 * (t - 0.2) * (t - 0.2), WATCH_N[2] - 0.3 - (t - 0.2)]} yaw={t * 9} pitch={t * 6} /> : null}
            <pointLight position={[WATCH[0] + 1.6, WATCH[1] + 1.8, z - 1]} color="#e6ecff" intensity={12} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.woke",
      ...cam.push({ on: f(-4.95, 0.75, 0.3), dist: 2.5, to: 2.2, yaw: -8, pitch: 12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy in his cage, close: he sits up off the floor with his hair on end and one eye still shut, and looks straight at us.",
      stage: (t) => (
        <>
          <Yard t={t} plug hero="sit" heroFace={t < 0.4 ? "sleepy" : "uneasy"} />
          <Fill on={up(ME, 0.8)} yaw={-8} power={7} />
        </>
      ),
    },
    {
      cue: "5.fell",
      from: f(-4.4, 11.0, -13.8),
      to: f(-4.9, 10.9, -13.2),
      target: [LOOK[0], LOOK[1] + 1.2, LOOK[2] + 1.9],
      fov: 46,
      zone: Z.fort,
      look: NIGHT4,
      note: "On the tower top, level with him: the man is at the very edge with his heels over nothing, the vex on his face, both arms going round like a windmill. He tips.",
      stage: (t) => {
        const tip = ease(ramp(t, 0.1, 0.85));
        return (
          <>
            <Yard t={t} plug hero="sit" />
            <group position={[LOOK[0], LOOK[1], LOOK[2] + 1.95 + 0.25 * tip]}>
              <group rotation={[-0.75 * tip, 0, 0]}>
                <Raider who={5} sword={false} animation="panic" animSpeed={1.6} face="scared" rotationY={NORTH} />
              </group>
            </group>
            <Vex position={[LOOK[0], LOOK[1] + 1.6 - 0.25 * tip, LOOK[2] + 1.55 + 1.2 * tip]} t={t} scale={1.2} />
            <pointLight position={[LOOK[0] + 2, LOOK[1] + 1.8, LOOK[2] + 1]} color="#e6ecff" intensity={12} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.fell",
      cut: 0.8,
      ...cam.pan({ from: f(-3.6, 1.0, 5.6), on: f(-9, 4.9, -14.2), onTo: f(-9, 4.6, -14.2), fov: 40 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "THE JOKE. The boy in his cage fills the bottom half of the picture, rubbing his eyes and yawning at us. Over his head, on the lit tower behind him, the man goes backwards off the top, turning over and over with the blue thing after him, all the way down behind a roof. A puff of dust. The boy has not turned his head.",
      stage: (t) => {
        const k = clamp((t - 0.05) / 1.5);
        const y = LOOK[1] - (LOOK[1] - 0.2) * k * k;
        const z = LOOK[2] + 2.3 + 2.2 * k;
        return (
          <>
            <Yard t={t} plug hero="none" />
            <Hero position={f(-4.95, 0.08, 0.6)} rotationY={0.3} animation="idle" face={t < 1.0 ? "sleepy" : "calm"} headPitch={0.1} />
            {k < 1 ? (
              <group position={[LOOK[0], y + 0.9, z]} scale={1.35}>
                <group rotation={[-0.75 - k * 7, 0, 0]}>
                  <Raider who={5} sword={false} position={[0, -0.9, 0]} animation="panic" animSpeed={1.6} face="scared" rotationY={NORTH} />
                </group>
              </group>
            ) : null}
            {k < 1 ? <Vex position={[LOOK[0] + 0.5, y + 2.3, z - 0.3]} t={t} scale={1.3} /> : null}
            {k < 1 ? <pointLight position={[LOOK[0] + 1, y + 1, z + 2.5]} color="#e6ecff" intensity={30} distance={9} decay={2} /> : null}
            {k >= 1 ? <Puffs position={[LOOK[0], 0.3, z]} count={14} rise={5} spread={2} size={0.9} color="#b9b9c0" /> : null}
            <Fill on={f(-4.95, 1.1, 0.6)} yaw={25} power={7} />
          </>
        );
      },
    },
    {
      cue: "5.boom",
      from: f(8.4, 1.9, -0.3),
      to: f(9.6, 1.7, -0.7),
      target: [HOLE[0], 2.5, HOLE[2]],
      fov: 50,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 1.0, amp: 0.2, dur: 0.8 }],
      note: "INSIDE THE YARD, facing the east wall, torches on it: a guard is leaning on it, half asleep. A hiss, a red glow in the cracks between the stones. He looks round. BOOM: the wall comes in on us in fire, bricks fly past the lens, the guard is thrown flat, and where there was wall there is a hole with the night and torches in it.",
      stage: (t) => {
        const b = w("5.boom", "boom", 1.22) - 0.2;
        const thrown = ease(ramp(t, b, b + 0.45));
        const gp: Vec3 = [HOLE[0] - 1.6 - 4.2 * thrown, 0, HOLE[2] + 1.1];
        return (
          <>
            <Yard t={t} plug={t < b} hero="none" smoke={t > b + 0.5} />
            {t < b ? (
              <>
                <VGuard position={gp} rotationY={WEST + 0.5} n={2} lookAt={t > 0.45 ? [HOLE[0], 1.4, HOLE[2]] : undefined} nod={t > 0.45 ? 0 : 0.45} />
                {/* the fuse, seen through the cracks: lines of red that get brighter */}
                {[[0.9, -1.2], [1.9, 0.4], [2.9, -0.5], [1.3, 1.5], [3.6, 1.0], [0.5, 0.2]].map(([y, z], i) => (
                  <Block key={i} position={[HOLE[0] - 0.82, y, HOLE[2] + z]} size={[0.02, i % 2 ? 0.06 : 0.5, i % 2 ? 0.9 : 0.06]} color="#000000" emissive="#ff5a20" emissiveIntensity={4 * ramp(t, 0.15, b) * (0.7 + 0.3 * Math.sin(t * 50 + i))} castShadow={false} />
                ))}
                <pointLight position={[HOLE[0] - 1.6, 1.6, HOLE[2]]} color="#ff6a30" intensity={30 * ramp(t, 0.15, b)} distance={7} decay={2} />
                {t > 0.3 ? <Bubble text="SSSSS" position={[HOLE[0] - 1.2, 4.2, HOLE[2] - 0.6]} rotationY={-1.3} scale={0.55} /> : null}
              </>
            ) : (
              <Flat position={gp} rotationY={EAST} k={thrown}>
                <VGuard position={[0, 0, 0]} n={2} sword={false} />
              </Flat>
            )}
            <Boom position={[HOLE[0], 0, HOLE[2]]} t={t - b} size={5} dir={[-1, 0]} stones={30} smoke={0.14} puffs={26} />
            {t > b ? <pointLight position={[HOLE[0] - 3, 2.5, HOLE[2]]} color="#ffb060" intensity={60 * Math.max(0.25, 1 - (t - b))} distance={14} decay={2} /> : null}
            {t > b + 0.3 ? <Horde position={[HOLE[0] + 5, 0, HOLE[2] + 4.5]} t={t} rows={4} cols={3} width={4} gap={1.4} seed={5} /> : null}
          </>
        );
      },
    },
    {
      cue: "5.boom",
      cut: 1.85,
      from: f(10.6, 1.3, -1.1),
      to: f(9.6, 1.5, -1.3),
      target: [HOLE[0] - 1.0, 1.95, HOLE[2]],
      fov: 50,
      zone: Z.fort,
      look: NIGHT4,
      note: "THE HOLE, close and low, torch light in the smoke: pillagers climb in over the broken stone. The two in front carry red blocks of TNT over their heads with the fuses spitting sparks, a chief between them points his crossbow at us, and behind them the gap is full of more.",
      stage: (t) => {
        const adv = t * 0.7;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            {[-1.05, 1.05].map((z, i) => (
              <group key={z}>
                <Pillager position={[HOLE[0] - 0.6 - adv, 0.2, HOLE[2] + z]} rotationY={WEST} walk={adv * 2 + i} mad={1} n={i + 1} armR={-2.95} armL={-2.95} phase={i} />
                <TNT position={[HOLE[0] - 0.75 - adv, 2.02 + Math.abs(Math.sin((adv * 2 + i) * 5.2)) * 0.03, HOLE[2] + z]} scale={0.72} fuse={t + i + 1} />
                <pointLight position={[HOLE[0] - 1.2 - adv, 2.9, HOLE[2] + z]} color="#ffd070" intensity={8} distance={4} decay={2} />
              </group>
            ))}
            <Pillager position={[HOLE[0] - 1.5 - adv, 0.15, HOLE[2]]} rotationY={WEST} walk={adv * 2} mad={1} chief crossbow armR={-1.35} phase={2} />
            <Horde position={[HOLE[0] + 1.2 - adv, 0.25, HOLE[2] + 2.6]} t={t} rows={5} cols={4} width={4.6} gap={1.3} seed={6} adv={0} />
            <TNT position={[HOLE[0] - 2.6, 0.02, HOLE[2] + 2.3]} scale={0.7} />
            <TNT position={[HOLE[0] - 2.5, 0.58, HOLE[2] + 2.35]} scale={0.7} fuse={t} />
            <pointLight position={[HOLE[0] - 3.5, 2.4, HOLE[2] - 0.5]} color="#e6ecff" intensity={40} distance={10} decay={2} />
            <pointLight position={[HOLE[0] + 1.5, 2.5, HOLE[2]]} color="#ffa040" intensity={50} distance={10} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.ran",
      ...cam.push({ on: f(0, 1.6, -6.5), dist: 15, to: 10.5, yaw: -6, pitch: 34 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From above the yard: five villagers in robes run. Not for the hole: up the path to the big dark gate in the north tower. They stop each side of it. In the black of the gateway two red eyes come on, high up.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, w("5.ran", "gate", 2.6)));
        const out = w("5.ran", "out", 3.6);
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={GATE} />
            {[-1.9, -1.1, 1.1, 1.9, 2.7].map((x, i) => (
              <VGuard key={x} position={f(x + (i - 2) * 1.2 * (1 - k), 0, 2.5 - 12.4 * k + i * 0.3 * (1 - k))} rotationY={k < 1 ? NORTH : x < 0 ? EAST : WEST} n={i} walk={k < 1 ? t * 4 : undefined} />
            ))}
            {t > out - 0.5
              ? [-0.42, 0.42].map((x) => (
                  <Block key={x} position={f(x, 3.0, -11.6)} size={[0.3, 0.16, 0.04]} color="#000000" emissive="#ff3020" emissiveIntensity={3 * ease(ramp(t, out - 0.5, out))} castShadow={false} />
                ))
              : null}
          </>
        );
      },
    },
    {
      cue: "5.golem",
      ...cam.push({ on: up(GOUT, 3.3), dist: 6.4, to: 5.4, yaw: 14, pitch: -22, fov: 56 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.3, amp: 0.05, dur: 0.3 }, { at: 1.2, amp: 0.05, dur: 0.3 }],
      note: "From the ground, looking up: the iron golem, out of the gate, head level with the roof of the hut beside it. A villager by its foot comes up to its knee. It looks down the yard.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="stand" />
          <IronGolem position={[GOUT[0], 0, GOUT[2] - 1.6 + t * 0.75]} rotationY={0} scale={G} walk={t * 0.9} headYaw={-0.5 * ease(ramp(t, 0.8, 1.6))} />
          <VGuard position={f(-2.6, 0, -6.4)} rotationY={EAST} n={1} lookAt={up(GOUT, 5)} />
          <VGuard position={f(2.8, 0, -5.6)} rotationY={WEST} n={3} lookAt={up(GOUT, 5)} />
          <pointLight position={f(0.5, 4, -3)} color="#e6ecff" intensity={60} distance={16} decay={2} />
        </>
      ),
    },
    {
      cue: "5.steps",
      ...cam.push({ on: f(-1.6, 2.6, -3.6), onTo: f(2.6, 2.6, -3.6), dist: 8.4, to: 8.0, yaw: 196, pitch: -6, fov: 50 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.35, amp: 0.07, dur: 0.3 }, { at: 0.95, amp: 0.07, dur: 0.3 }, { at: 1.55, amp: 0.07, dur: 0.3 }, { at: 2.1, amp: 0.07, dur: 0.25 }],
      note: "From the yard, low: the golem walks across the picture into the smoke, and behind its legs the boy is at the back bars of his cage, holding on. At every step the whole picture jumps and the boy with it.",
      stage: (t) => {
        const j = Math.max(bump(t, 0.35, 0.25), bump(t, 0.95, 0.25), bump(t, 1.55, 0.25), bump(t, 2.1, 0.25)) * 0.06;
        const gx = -1.6 + t * 2.2;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <group position={[ME[0], ME[1] + j, ME[2] - 1.0]}>
              <group rotation={[0, Math.PI, 0]}>
                <Yellow />
              </group>
            </group>
            <IronGolem position={f(gx, 0, -5.4 + t * 0.5)} rotationY={EAST - 0.2} scale={G} walk={t * 2.4} />
            <pointLight position={f(4, 4, -2)} color="#e6ecff" intensity={50} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.angry",
      ...cam.push({ on: [HOLE[0] - 1.5, 1.5, HOLE[2]], dist: 8, to: 5.6, yaw: -84, pitch: 5 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The hole in the wall, from inside: a row of pillagers stands on the rubble with their brows down and their crossbows up. Then they step apart, left and right, and something as wide as the hole is coming through the smoke behind them.",
      stage: (t) => {
        const open = ease(ramp(t, w("5.angry", "opened", 2.2) - 0.3, w("5.angry", "opened", 2.2) + 0.5));
        return (
          <>
            <Yard t={t} smoke hero="none" />
            {[-1.8, -0.9, 0, 0.9, 1.8].map((z, i) => (
              <Pillager key={z} position={[HOLE[0] - 1.6 + Math.abs(z) * 0.2, 0.25, HOLE[2] + z + Math.sign(z || (i % 2 ? 1 : -1)) * open * (1.6 - Math.abs(z) * 0.3)]} rotationY={WEST} mad={1} crossbow armR={-1.3} n={i} chief={i === 2} lean={0.1} />
            ))}
            <Ravager position={[HOLE[0] + 7 - open * 3.5, 0, HOLE[2]]} rotationY={WEST} walk={t * 1.5} scale={1.35} />
            <group rotation={[0, 0, 0]}>
              <Horde position={[HOLE[0] + 6, 0, HOLE[2] + 5.5]} t={t} rows={3} cols={4} width={5} gap={1.4} seed={4} />
            </group>
            <pointLight position={[HOLE[0] - 4, 2.5, HOLE[2]]} color="#e6ecff" intensity={45} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.ravager",
      ...cam.push({ on: [HOLE[0] - 3, 2.2, HOLE[2]], dist: 9.5, to: 7.2, yaw: -70, pitch: -8 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.4, amp: 0.05, dur: 0.3 }, { at: 1.3, amp: 0.05, dur: 0.3 }],
      note: "Low, in its way: a ravager. A grey beast the size of a cart, horns, small eyes, walking out of the smoke at us with its jaw coming open, and a pillager sitting on its back with a crossbow.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Ravager position={[HOLE[0] + 2.5 - t * 2.1, 0, HOLE[2]]} rotationY={WEST} walk={t * 2.1} jaw={0.9 * bump(t, 0.6, 1.4)} scale={1.35} />
          <pointLight position={[HOLE[0] - 5, 2.5, HOLE[2] + 1]} color="#e6ecff" intensity={55} distance={12} decay={2} />
        </>
      ),
    },
    {
      cue: "5.clash",
      from: f(10.6, 1.0, -1.9),
      to: f(9.8, 1.0, -1.9),
      target: f(4, 3.4, -2.5),
      fov: 56,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.1, amp: 0.06, dur: 0.2 }, { at: 0.38, amp: 0.06, dur: 0.2 }],
      note: "THEY RAN AT EACH OTHER. From the ground, in its way: the golem coming at us at a run, a house on legs, arms pumping, the ground jumping at every step and dirt flying off its feet.",
      stage: (t) => {
        const x = CLASH[0] - 10 + t * 9.5;
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(CLASH, 3)} heroFace="wow" />
            <IronGolem position={[x, 0, CLASH[2]]} rotationY={EAST} scale={G} walk={x * 0.55} bow={0.22} headPitch={0.15} />
            <Puffs position={[x - 0.8, 0.2, CLASH[2]]} count={8} rise={1.6} spread={1.6} size={0.5} color="#8a7a5a" />
            <pointLight position={f(7, 3, -1)} color="#e6ecff" intensity={70} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.clash",
      cut: 0.5,
      from: f(4.2, 0.9, -3.1),
      to: f(5.0, 0.9, -3.1),
      target: f(10.5, 2.2, -2.5),
      fov: 56,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.1, amp: 0.06, dur: 0.2 }, { at: 0.32, amp: 0.06, dur: 0.2 }],
      note: "The other way: the ravager coming at us flat out, head down, horns first, jaw dropping open, its rider hanging on, pillagers cheering it on in the hole behind.",
      stage: (t) => {
        const x = CLASH[0] + 12.5 - t * 12;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Sides t={t} />
            <Ravager position={[x, 0, CLASH[2]]} rotationY={WEST} walk={-x * 0.9} jaw={clamp(t * 2.2)} head={0.25} scale={1.35} />
            <Puffs position={[x + 1.5, 0.2, CLASH[2]]} count={8} rise={1.6} spread={1.6} size={0.5} color="#8a7a5a" />
            <pointLight position={f(8, 3, -4)} color="#e6ecff" intensity={70} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.clash",
      cut: 0.95,
      from: f(8.3, 5.4, 7.2),
      to: f(7.9, 4.9, 6.4),
      target: f(6.9, 2.6, -2.5),
      fov: 64,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.42, amp: 0.2, dur: 0.5 }],
      note: "THE GOLEM'S FIST. Side on, from over the cages, both of them whole in the picture: they meet. The iron fist goes up over its head and comes down on the ravager's skull like a hammer. The beast's chin hits the dirt, its back legs come off the ground, and stones jump.",
      stage: (t) => {
        const hit = w("5.clash", "fist", 1.34) - 0.95 + 0.05;
        const wind = ease(ramp(t, 0, hit - 0.12));
        const down = ease(ramp(t, hit - 0.12, hit));
        const after = clamp((t - hit) / 0.5);
        const arm = -1.2 - 1.9 * wind + 2.25 * down;
        const sunk = down * (1 - 0.6 * after);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <IronGolem position={GFIGHT} rotationY={EAST} scale={G} armR={arm} armL={-0.9} bow={0.3 * down} headPitch={0.3} />
            <group position={[RFIGHT[0] + 0.3 * sunk, -0.25 * sunk, RFIGHT[2]]}>
              <Ravager position={[0, 0, 0]} rotationY={WEST} jaw={0.9 * (1 - down)} head={0.75 * sunk} scale={1.35} roll={0.05 * Math.sin(t * 40) * sunk} />
            </group>
            {t > hit ? (
              <>
                <Puffs position={[CLASH[0] + 0.6, 0.2, CLASH[2] + 0.6]} count={16} rise={3} spread={3} size={0.7} color="#b9b9c0" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const tt = t - hit;
                  return <Block key={i} position={[CLASH[0] + 0.5 + Math.cos(i * 0.8) * tt * (3 + (i % 3)), Math.max(0.1, 0.3 + tt * (5 + (i % 4)) - 9 * tt * tt), CLASH[2] + 0.4 + Math.sin(i * 0.8) * tt * 3]} size={[0.3, 0.3, 0.3]} color={i % 2 ? "#77777a" : "#5c4a34"} />;
                })}
                {t < hit + 0.12 ? <pointLight position={[CLASH[0] + 0.5, 3.2, CLASH[2] + 1]} color="#ffffff" intensity={300} distance={12} decay={2} /> : null}
              </>
            ) : null}
            <pointLight position={f(7, 4, 0.5)} color="#e6ecff" intensity={80} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.clash",
      cut: 1.82,
      from: f(2.6, 4.6, 6.2),
      to: f(3.2, 4.3, 5.4),
      target: f(6.3, 3.0, -2.5),
      fov: 50,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.45, amp: 0.12, dur: 0.4 }],
      note: "THE RAVAGER'S JAW. Nearer, from the other end of the cages: the beast's head comes up under the arm, the jaw opens as wide as a door and shuts on the golem's iron arm. It shakes it like a dog with a stick, and the golem is pulled off one foot.",
      stage: (t) => {
        const bite = w("5.clash", "jaw", 2.25) - 1.82 + 0.05;
        const open = ease(ramp(t, 0, bite - 0.1));
        const shut = ease(ramp(t, bite - 0.1, bite));
        const worry = t > bite ? Math.sin((t - bite) * 26) : 0;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <group position={GFIGHT} rotation={[0, 0, -0.1 * shut + 0.05 * worry * shut]}>
              <IronGolem position={[0, 0, 0]} rotationY={EAST} scale={G} armR={-1.0 + 0.12 * worry} armL={-2.6 * shut} headPitch={0.4} bow={0.15 * shut} />
            </group>
            <Ravager position={[RFIGHT[0] - 0.5 * open, 0, RFIGHT[2] + 0.25 * worry * shut]} rotationY={WEST + 0.16 * worry * shut} jaw={open * (1 - 0.55 * shut)} head={-0.55 * open} scale={1.35} />
            {t > bite ? <Puffs position={[CLASH[0] + 0.4, 0.2, CLASH[2] - 0.5]} count={10} rise={2} spread={2.4} size={0.5} color="#b9b9c0" /> : null}
            {t > bite
              ? [0, 1, 2, 3, 4].map((i) => (
                  <Block key={i} position={[CLASH[0] + 0.3 + Math.cos(i * 1.3 + t * 20) * 0.5, 3.4 + Math.sin(i * 2 + t * 30) * 0.5, CLASH[2] - 0.7]} size={[0.1, 0.1, 0.1]} color="#000000" emissive="#ffd060" emissiveIntensity={3} castShadow={false} />
                ))
              : null}
            <pointLight position={f(5, 4, -5.5)} color="#e6ecff" intensity={80} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.clash",
      cut: 2.7,
      ...cam.push({ on: up(CLASH, 1.6), dist: 15, to: 16.5, yaw: -38, pitch: 36, fov: 46 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.05, amp: 0.16, dur: 0.6 }],
      note: "THE GROUND SHOOK. From over the roofs: the two of them locked together in the middle of the yard, a ring of dust going out from their feet, and on both sides everybody is thrown into the air: pillagers by the hole, guards by the path.",
      stage: (t) => {
        const ring = ramp(t, 0, 0.6);
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(CLASH, 3)} heroFace="wow" />
            <IronGolem position={GFIGHT} rotationY={EAST} scale={G} armR={-1.3} armL={-1.5} bow={0.2} />
            <Ravager position={[RFIGHT[0] - 0.4, 0, RFIGHT[2]]} rotationY={WEST + Math.sin(t * 24) * 0.08} jaw={0.4} head={-0.4} scale={1.35} />
            <Sides t={t} jump={bump(t, 0.03, 0.55)} />
            {Array.from({ length: 20 }, (_, i) => {
              const a = (i / 20) * Math.PI * 2;
              const rr = 2.5 + ring * 6.5;
              return <Block key={i} position={[CLASH[0] + 0.7 + Math.cos(a) * rr, 0.25 + 0.3 * Math.sin(ring * Math.PI), CLASH[2] + Math.sin(a) * rr]} size={[0.9 * (1 - ring * 0.6), 0.5 * (1 - ring * 0.6), 0.9 * (1 - ring * 0.6)]} color={i % 2 ? "#b9b9c0" : "#9a8a6a"} castShadow={false} />;
            })}
            <pointLight position={[CLASH[0], 6, CLASH[2] + 3]} color="#e6ecff" intensity={110} distance={22} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.again",
      from: f(5, 6, 7.5),
      to: f(5.6, 5.6, 7.2),
      target: f(8.2, 1.8, -2.5),
      targetTo: f(11.6, 1.8, -2.5),
      fov: 52,
      zone: Z.fort,
      look: NIGHT4,
      note: "From over the cages, going with it: the golem shoves and the beast slides backwards across the yard on locked legs, ten steps, its feet ploughing up the dirt in waves. It stops. It shakes its head and paws the ground.",
      stage: (t) => {
        const back = ease(ramp(t, 0, 1.0));
        const x = RFIGHT[0] + 6.2 * back;
        const paw = bump(t, 1.0, 0.4);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <IronGolem position={[GFIGHT[0] + 1.2 * ease(ramp(t, 0, 0.3)), 0, GFIGHT[2]]} rotationY={EAST} scale={G} armR={-1.5} armL={-1.5} bow={0.2 * (1 - back)} />
            <Ravager position={[x, 0, CLASH[2]]} rotationY={WEST + Math.sin(t * 24) * 0.14 * paw} walk={paw * 1.2} jaw={0.3 + 0.5 * paw} head={0.3 * (1 - back) + 0.35 * paw} roll={0.04 * Math.sin(t * 30) * (1 - back)} scale={1.35} />
            {back < 1 ? <Puffs position={[x + 0.6, 0.2, CLASH[2] + 0.9]} count={12} rise={1.8} spread={2.2} size={0.6} color="#8a7a5a" /> : null}
            {[-0.85, 0.85].map((z) => (
              <Block key={z} position={[RFIGHT[0] + 3.1 * back + 0.6, 0.07, CLASH[2] + z]} size={[6.2 * back + 0.01, 0.03, 0.45]} color="#4a3a28" castShadow={false} />
            ))}
            <Sides t={t} />
            <pointLight position={f(12, 3.5, 0)} color="#e6ecff" intensity={80} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.again",
      cut: 1.42,
      from: f(1.3, 5.7, -0.1),
      to: f(2.0, 5.5, -0.2),
      target: f(10, 1.8, -2.5),
      fov: 58,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.2, amp: 0.05, dur: 0.2 }, { at: 0.45, amp: 0.07, dur: 0.2 }, { at: 0.7, amp: 0.1, dur: 0.2 }],
      note: "THEN IT CAME AGAIN. Over the golem's shoulder: it sets its feet and opens its arms, and past it the ravager comes down the yard at a gallop, jaw open, bigger every step, straight at the two of us.",
      stage: (t) => {
        const k = ramp(t, 0, dur("5.again") - 1.42);
        const x = RFIGHT[0] + 6.2 - 5.4 * k * k;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <IronGolem position={[GFIGHT[0] + 1.2, 0, GFIGHT[2]]} rotationY={EAST} scale={G} armR={-1.2 - 0.5 * k} armL={-1.2 - 0.5 * k} bow={0.15 + 0.15 * k} />
            <Ravager position={[x, 0, CLASH[2]]} rotationY={WEST} walk={-x * 0.9} jaw={0.4 + 0.6 * k} head={0.1} scale={1.35} />
            <Puffs position={[x + 1.6, 0.2, CLASH[2]]} count={10} rise={1.8} spread={1.8} size={0.55} color="#8a7a5a" />
            <Sides t={t} />
            <pointLight position={f(7, 4, -1)} color="#e6ecff" intensity={90} distance={18} decay={2} />
          </>
        );
      },
    },
  ],
});

/**
 * THE ARMY, UP CLOSE. The whole army marching south (+z) at the camera, and in front of the front row the four kinds
 * the line names, each in its own place so a cut can go from one to the next (`since` is when this cut began: every
 * cut starts with the front row at the same z, so one camera distance works for all four): vindicators (x -5.4), an evoker
 * (x -1.8), witches (x 1.9), and a very small one with a banner beside a ravager (x 5.6). `t` is seconds into the line.
 */
const Army: React.FC<{ t: number; since: number }> = ({ t, since }) => {
  const z = 2.0 + (t - since) * 0.35;
  const walk = t * 1.5;
  return (
    <>
      <Horde position={hd(0, 0, 0.2 + (t - since) * 0.35)} t={t} rows={6} cols={11} width={17} gap={1.45} seed={7} />
      {[-6.3, -5.4, -4.5].map((x, i) => (
        <Pillager key={x} position={hd(x, 0, z + (i === 1 ? 0.5 : 0))} walk={walk + i} n={i + 1} mad={1} armR={-2.5 + Math.max(0, Math.sin(t * 9 + i * 2.1)) * 1.3} lean={0.08} phase={i}>
          <Axe />
        </Pillager>
      ))}
      <Pillager position={hd(-1.8, 0, z + 0.4)} walk={walk} chief armR={-2.75 + Math.sin(t * 8) * 0.12} armL={-2.75 - Math.sin(t * 8) * 0.12} n={2} nod={-0.2} />
      <Puffs position={hd(-1.5, 2.45, z + 0.5)} color="#b98cff" count={7} rise={0.9} spread={0.3} size={0.12} />
      <Puffs position={hd(-2.1, 2.45, z + 0.5)} color="#d0a0ff" count={7} rise={0.9} spread={0.3} size={0.12} />
      {[0, 1].map((i) => (
        <Vex key={i} position={hd(-1.8 + Math.cos(t * 5 + i * Math.PI) * 0.9, 2.5 + i * 0.25, z + 0.5 + Math.sin(t * 5 + i * Math.PI) * 0.6)} t={t + i} rotationY={0} scale={0.8} />
      ))}
      <pointLight position={hd(-1.8, 2.6, z + 1.2)} color="#b98cff" intensity={10} distance={4} decay={2} />
      <Witch position={hd(1.4, 0, z + 0.5)} walk={walk} potion />
      <Witch position={hd(2.5, 0, z + 0.1)} walk={walk + 2} potion scale={0.94} />
      <pointLight position={hd(1.9, 1.3, z + 1.3)} color="#c060f0" intensity={8} distance={4} decay={2} />
      <Pillager position={hd(5.5, 0, z + 0.9)} scale={0.5} walk={t * 3.2} armR={-1.5} n={3} nod={-0.3}>
        <HandBanner t={t} />
      </Pillager>
      <Ravager position={hd(6.9, 0, z - 1.7)} walk={walk} scale={1.25} jaw={ease(ramp(t, 3.4, 4.1))} head={-0.15} />
      <pointLight position={hd(0, 2.4, 6)} color="#e6ecff" intensity={45} distance={18} decay={2} />
      <pointLight position={hd(-5, 2.4, 5.5)} color="#e6ecff" intensity={30} distance={12} decay={2} />
      <pointLight position={hd(5.5, 2.4, 5.5)} color="#e6ecff" intensity={30} distance={12} decay={2} />
    </>
  );
};

/** The teller from behind, holding his bars: drawn here because the shot looks over his shoulder. */
const Yellow: React.FC = () => <Hero animation="reach" face="fear" />;
void GATE;
void ME;
