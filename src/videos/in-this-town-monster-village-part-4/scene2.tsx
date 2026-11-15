import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Axe, Boom, Bubble, CLASH, EAST, Fill, GATE, HOLE, Hero, HordeBlocks, IronGolem, LOOK, ME, NIGHT4, NORTH, Pillager, Puffs, Raider, Ravager, SpyMask, Spyglass, TNT, VGuard, Vex,
  WEST, Witch, Z, dur, ease, f, hd, manFace, ramp, timing,
} from "./kit";
import { Block } from "../../engine";
import { G, Yard, bump, clamp, up, w } from "./shared";

/** What the spyglass sees: a camera at `eye` looking north, as still as a hand holds a spyglass. */
const north = (eye: Vec3): Vec3 => [eye[0], eye[1], eye[2] - 40];
const E1: Vec3 = hd(-15, 3.2, 10);
const E2: Vec3 = hd(1, 3.2, 10);
const E3: Vec3 = hd(14, 3.2, 10);
const E4: Vec3 = hd(0, 2.6, 12);
/** The lookout, on his feet at the north edge of the tower top. */
const WATCH: Vec3 = up(LOOK, 0);
const WATCH_N: Vec3 = [LOOK[0], LOOK[1], LOOK[2] - 1.2];
/** Where the golem stands when it is first seen. */
const GOUT: Vec3 = f(0, 0, -7.6);

/** THE ATTACK: the lookout, the spyglass, the wall, the golem, the ravager. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The wall",
  shots: [
    {
      cue: "4.tower",
      ...cam.push({ on: up(WATCH, 0.9), dist: 6.5, to: 4.2, yaw: 32, pitch: 12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The top of the lookout tower, high over the lit castle. One player sits against the flagpole with his chin on his chest, a spyglass in his lap, fast asleep.",
      stage: (t) => (
        <>
          <Yard t={t} plug hero="sleep" sleeper patrol />
          <Spyglass position={[WATCH[0] + 0.35, WATCH[1] + 0.35, WATCH[2] + 0.3]} yaw={1.2} />
          <Bubble text="Z" position={[WATCH[0] + 0.5, WATCH[1] + 1.5 + ((t * 0.4) % 1) * 0.8, WATCH[2] + 0.2]} rotationY={0.5} scale={0.5} />
          <Fill on={up(WATCH, 1)} yaw={32} power={8} d={2.4} />
        </>
      ),
    },
    {
      cue: "4.glass",
      ...cam.orbit({ on: up(WATCH_N, 1.45), dist: 3.6, yaw: 118, yawTo: 152, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From out in the air beyond the wall, looking back at him: he jerks awake, stands, wipes his mouth and puts a brass spyglass to his eye. It points just past us.",
      stage: (t) => {
        const upk = ease(ramp(t, 0.15, 0.6));
        const glass = ease(ramp(t, w("4.glass", "spyglass", 1.6) - 0.2, w("4.glass", "spyglass", 1.6) + 0.3));
        return (
          <>
            <Yard t={t} plug hero="sleep" patrol />
            <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], WATCH[2] - 1.2 * upk]} rotationY={NORTH} animation={upk < 0.5 ? "sit" : "idle"} face={upk < 0.5 ? "surprised" : "neutral"} />
            {glass > 0.05 ? <Spyglass position={[WATCH_N[0] - 0.12, WATCH_N[1] + 1.2 + 0.4 * glass, WATCH_N[2] - 0.22]} yaw={NORTH} /> : null}
            <Fill on={up(WATCH_N, 1.5)} yaw={150} power={8} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "4.trees",
      ...cam.pan({ from: E1, on: north(E1), onTo: north(E1), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "THROUGH THE SPYGLASS: a round picture in black. Trees.",
      stage: () => <SpyMask eye={E1} />,
    },
    {
      cue: "4.trees",
      cut: 0.8,
      ...cam.pan({ from: E2, on: north(E2), onTo: north(E2), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass jumps along the forest. More trees.",
      stage: () => <SpyMask eye={E2} />,
    },
    {
      cue: "4.trees",
      cut: 1.55,
      ...cam.pan({ from: E3, on: north(E3), onTo: north(E3), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "It jumps again. More trees. It stops. Between the trunks, torches: grey shapes are walking out of the forest.",
      stage: (t) => (
        <>
          <SpyMask eye={E3} />
          <HordeBlocks position={hd(14, 0, -15)} t={t} rows={7} cols={9} width={11} adv={ramp(t, 0.5, 1.7) * 7} />
        </>
      ),
    },
    {
      cue: "4.pill",
      ...cam.pan({ from: E4, on: north(E4), onTo: north(E4), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass, lower and nearer: a whole field of pillagers coming straight at it, rows and rows, torches and banners over their heads.",
      stage: (t) => (
        <>
          <SpyMask eye={E4} />
          <HordeBlocks position={hd(0, 0, -5)} t={t} rows={16} cols={14} width={14} adv={1 + t * 1.6} />
        </>
      ),
    },
    {
      cue: "4.gers",
      ...cam.push({ on: hd(-4.2, 1.35, 2), onTo: hd(4.6, 1.2, 2), dist: 3.9, to: 3.9, yaw: 4, pitch: 3 }),
      zone: Z.horde,
      look: NIGHT4,
      note: "Down among them, sliding along the front row as it marches at us: one with an axe, one in a dark coat with his arms up, a witch in a pointed hat, and last a very small one carrying a banner three times his size.",
      stage: (t) => {
        const z = 0.6 + t * 0.3;
        return (
          <>
            <HordeBlocks position={hd(0, 0, -3.5)} t={t} rows={10} cols={14} width={18} adv={t * 0.3} />
            <Pillager position={hd(-4.4, 0, z)} walk={t * 1.6} armR={-0.9 + Math.sin(t * 5) * 0.2} mad={1} n={1}>
              <Axe />
            </Pillager>
            <Pillager position={hd(-1.6, 0, z + 0.3)} walk={t * 1.6} chief armR={-2.6} armL={-2.6} n={2} />
            <Puffs position={hd(-1.6, 2.3, z + 0.3)} color="#b98cff" count={5} rise={0.8} size={0.12} />
            <Witch position={hd(1.4, 0, z)} walk={t * 1.6} />
            <Pillager position={hd(4.4, 0, z + 0.2)} scale={0.55} walk={t * 3} armR={-1.5} n={3}>
              <Block position={[0, 1.6, 0.1]} size={[0.1, 4.4, 0.1]} color="#5c3f24" />
              <Block position={[0, 3.0, 0.5]} size={[0.06, 1.5, 0.9]} color="#e2dccb" emissive="#e2dccb" emissiveIntensity={0.2} />
            </Pillager>
            <Ravager position={hd(8.5, 0, -1.5 + t * 0.3)} walk={t * 1.2} scale={1.2} />
            <pointLight position={hd(0, 2.2, 5)} color="#e6ecff" intensity={40} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "4.vex",
      ...cam.pan({ from: E2, on: north(E2), onTo: north(E2), fov: 30 }),
      shake: 0.004,
      zone: Z.horde,
      look: NIGHT4,
      note: "The spyglass again, on the army. A pale blue dot lifts out of it, gets bigger, bigger, and fills the round picture: a small winged thing with red eyes and a sword.",
      stage: (t) => {
        const k = ease(ramp(t, 0.3, w("4.vex", "vex", 2.5)));
        return (
          <>
            <SpyMask eye={E2} />
            <HordeBlocks position={hd(1, 0, -6)} t={t} rows={14} cols={14} width={14} adv={2} />
            <Vex position={[E2[0] + Math.sin(t * 6) * 0.3 * (1 - k), E2[1] + 0.6 * (1 - k) - 0.02, E2[2] - 16 + 14.2 * k]} t={t} />
            <pointLight position={[E2[0], E2[1], E2[2] - 0.6]} color="#cfe6ff" intensity={3 * k} distance={4} decay={2} />
          </>
        );
      },
    },
    {
      cue: "4.face",
      ...cam.push({ on: up(WATCH, 1.3), dist: 5.2, to: 4.6, yaw: 86, pitch: 6 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.25, amp: 0.05, dur: 0.3 }],
      note: "Side on to the tower top: the blue thing hits him in the face. The spyglass spins away and he staggers backwards, step by step, towards the edge.",
      stage: (t) => {
        const back = ease(ramp(t, 0.25, dur("4.face")));
        const z = WATCH_N[2] + 2.9 * back;
        return (
          <>
            <Yard t={t} plug hero="sleep" patrol />
            <Raider who={5} sword={false} position={[WATCH[0], WATCH[1], z]} rotationY={NORTH} animation="stagger" face="scared" />
            <Vex position={[WATCH[0], WATCH[1] + 1.55, z - 0.35 - 3 * (1 - clamp(t / 0.25))]} t={t} rotationY={0} scale={1.1} />
            <Spyglass position={[WATCH[0] + 0.4 + t, WATCH[1] + 1.6 + t * 2 - 3 * t * t, WATCH_N[2] - t]} yaw={t * 9} pitch={t * 6} />
            <Fill on={[WATCH[0], WATCH[1] + 1.5, z]} yaw={86} power={8} d={2.4} />
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
      ...cam.push({ on: f(-5.6, 2.9, -1.2), dist: 4.6, to: 4.3, yaw: 15, pitch: -20, fov: 62 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "THE JOKE. Low, in front of the cage: the boy rubs his eyes and yawns at us. Far behind and above him, small, a man goes backwards off the lookout tower, arms going round, and drops out of sight behind a roof. A puff of dust. The boy has not turned his head.",
      stage: (t) => {
        const go = w("5.fell", "fell", 1.0) - 0.45;
        const k = clamp((t - go) / 1.15);
        const y = LOOK[1] - (LOOK[1] - 0.2) * k * k;
        const z = LOOK[2] + 1.9 + 1.8 * k;
        return (
          <>
            <Yard t={t} plug hero="sit" heroFace={t < 1.2 ? "sleepy" : "calm"} />
            {k < 1 ? (
              <group position={[LOOK[0], y, z]}>
                <group rotation={[-k * 5.5, 0, 0]}>
                  <Raider who={5} sword={false} animation="panic" face="scared" rotationY={NORTH} />
                </group>
              </group>
            ) : null}
            {k < 1 ? <Vex position={[LOOK[0] + 0.3, y + 1.9, z - 0.3]} t={t} scale={1.1} /> : null}
            {k >= 1 && t < go + 2.3 ? <Puffs position={[LOOK[0], 0.3, z]} count={12} rise={3.2} spread={1.5} size={0.7} color="#b9b9c0" /> : null}
            <Fill on={up(ME, 0.8)} yaw={15} power={7} />
          </>
        );
      },
    },
    {
      cue: "5.boom",
      ...cam.push({ on: up(HOLE, 3), dist: 19, to: 15, yaw: -78, pitch: 7 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 1.05, amp: 0.16, dur: 0.7 }],
      note: "The east wall, from across the yard, lit windows above it. It bursts inwards in fire: blocks of stone fly at us and bounce, and where the wall was there is a hole full of smoke with grey figures in it, two of them carrying red boxes.",
      stage: (t) => {
        const b = w("5.boom", "boom", 1.25) - 0.2;
        return (
          <>
            <Yard t={t} plug={t < b} hero="none" smoke={t > b + 0.3} />
            <Boom position={HOLE} t={t - b} size={6} dir={[-1, 0]} stones={24} />
            {t > b + 1.0
              ? [-1.4, 0, 1.5].map((z, i) => (
                  <group key={z}>
                    <Pillager position={[HOLE[0] + 1.2 - (t - b - 1) * 0.5, 0.3, HOLE[2] + z]} rotationY={WEST} walk={t * 1.4} mad={1} n={i} crossbow={i === 1} armR={i === 1 ? -1.3 : undefined} />
                    {i !== 1 ? <TNT position={[HOLE[0] + 0.5 - (t - b - 1) * 0.5, 0.9, HOLE[2] + z]} scale={0.6} fuse={i ? t : 0} /> : null}
                  </group>
                ))
              : null}
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
                  <Block key={x} position={f(x, 4.2, -11.62)} size={[0.3, 0.16, 0.04]} color="#000000" emissive="#ff3020" emissiveIntensity={3 * ease(ramp(t, out - 0.5, out))} castShadow={false} />
                ))
              : null}
          </>
        );
      },
    },
    {
      cue: "5.golem",
      ...cam.push({ on: up(GOUT, 3.6), dist: 11, to: 8.5, yaw: 14, pitch: -16 }),
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
      ...cam.push({ on: f(-1.5, 2.6, -2.6), dist: 5.6, to: 5.3, yaw: -38, pitch: -2 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.35, amp: 0.07, dur: 0.3 }, { at: 0.95, amp: 0.07, dur: 0.3 }, { at: 1.55, amp: 0.07, dur: 0.3 }, { at: 2.1, amp: 0.07, dur: 0.25 }],
      note: "From behind the boy, inside his bars: he holds on with both hands. Past the bars the golem walks across the yard into the smoke, and at every step the whole picture jumps and the boy with it.",
      stage: (t) => {
        const j = Math.max(bump(t, 0.35, 0.25), bump(t, 0.95, 0.25), bump(t, 1.55, 0.25), bump(t, 2.1, 0.25)) * 0.06;
        const gx = 0.5 + t * 2.2;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <group position={[ME[0], ME[1] + j, ME[2] - 0.9]}>
              <group rotation={[0, Math.PI - 0.5, 0]}>
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
            <pointLight position={[HOLE[0] - 4, 2.5, HOLE[2]]} color="#e6ecff" intensity={45} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.ravager",
      ...cam.push({ on: [HOLE[0] - 3, 2.0, HOLE[2]], dist: 6.2, to: 4.6, yaw: -70, pitch: -10 }),
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
      ...cam.push({ on: up(CLASH, 2.6), dist: 17, to: 12.5, yaw: 3, pitch: 5 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 1.3, amp: 0.14, dur: 0.5 }, { at: 2.2, amp: 0.1, dur: 0.4 }, { at: 2.9, amp: 0.12, dur: 0.5 }],
      note: "Wide, side on, through the row of cages with Mo lying in the last one: the golem from the left and the ravager from the right run at each other and meet in the middle. A fist comes down, a jaw comes up, and dust goes out in a ring.",
      stage: (t) => {
        const hit = w("5.clash", "fist", 1.3);
        const k = ease(ramp(t, 0, hit));
        const swing = bump(t, hit - 0.25, 0.6);
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(CLASH, 3)} heroFace="wow" />
            <IronGolem position={[CLASH[0] - 9 + 7.2 * k, 0, CLASH[2]]} rotationY={EAST} scale={G} walk={t < hit ? t * 5 : hit * 5} armR={-2.9 + 1.6 * swing} bow={0.25 * swing} />
            <Ravager position={[CLASH[0] + 11 - 8.2 * k + 0.5 * bump(t, hit, 0.5), 0, CLASH[2]]} rotationY={WEST} walk={t < hit ? t * 6 : hit * 6} jaw={clamp((t - hit + 0.4) * 2)} head={-0.4 * swing} scale={1.35} />
            {t > hit && t < hit + 1.6 ? <Puffs position={up(CLASH, 0.3)} count={14} rise={2.5} spread={3.5} size={0.8} color="#b9b9c0" /> : null}
            <pointLight position={[CLASH[0], 5, CLASH[2] + 4]} color="#e6ecff" intensity={80} distance={20} decay={2} />
          </>
        );
      },
    },
    {
      cue: "5.again",
      ...cam.top({ on: [CLASH[0] + 3, 0, CLASH[2]], height: 19, to: 15 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 2.1, amp: 0.1, dur: 0.4 }],
      note: "Straight down on the yard: the golem holds its ground and the ravager slides backwards away from it, ten steps, leaving two lines in the dirt. It shakes its head. Then it runs back in.",
      stage: (t) => {
        const back = ease(ramp(t, 0, 1.1));
        const again = ease(ramp(t, w("5.again", "came", 1.7) - 0.1, dur("5.again")));
        const x = CLASH[0] + 2.8 + 7.5 * back - 7.2 * again;
        return (
          <>
            <Yard t={t} smoke hero="stand" />
            <IronGolem position={[CLASH[0] - 1.8, 0, CLASH[2]]} rotationY={EAST} scale={G} armR={-1.5} armL={-1.5} />
            <Ravager position={[x, 0, CLASH[2]]} rotationY={WEST + Math.sin(t * 22) * 0.12 * bump(t, 1.0, 0.7)} walk={again > 0 ? t * 6 : 0} jaw={again} scale={1.35} />
            {[-0.8, 0.8].map((z) => (
              <Block key={z} position={[CLASH[0] + 4 + 3.75 * back, 0.07, CLASH[2] + z]} size={[7.5 * back + 0.01, 0.02, 0.3]} color="#4a3a28" castShadow={false} />
            ))}
            <pointLight position={[CLASH[0] + 4, 7, CLASH[2]]} color="#e6ecff" intensity={120} distance={22} decay={2} />
          </>
        );
      },
    },
  ],
});

/** The teller from behind, holding his bars: drawn here because the shot looks over his shoulder. */
const Yellow: React.FC = () => <Hero animation="reach" face="fear" />;
void manFace;
