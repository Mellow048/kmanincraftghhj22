import { Block, cam, getPose, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BUSSPOT, Boom, Bubble, Bus, CLASH, Dad, EAST, Fill, Folk, HALL_LEN, Hero, Hiss, IronGolem, KEEPDOOR, Key, LOCK, ME, Mum, NIGHT4, NORTH, Postman, Puffs, Raider, Ravager,
  SubscribeSign, WEST, Z, dur, ease, f, faceOf, hw, mix, ramp, timing,
} from "./kit";
import { Battle, G, GSTAND, MoFlat, OUTBUS, T2, Yard, bump, clamp, up, w } from "./shared";

/** Mo on the ground, feet at MO0 and head to the west, and how far they drag him. */
const MO0: Vec3 = f(-4.4, 0.02, 7.0);
const DRAG = 2.4;
/**
 * MO AND THE TWO WHO HAVE HIM: `d` metres dragged west. HANDS THAT DRAG SOMEBODY TOUCH HIM: his arms are straight up
 * over his head, his shoulders are off the ground, and each guard walks with his inside arm back and down so that his
 * hand is ON Mo's wrist. The numbers below put the two hands in the same place; if you move one, move the other.
 */
const MOK = 0.83;
const Taken: React.FC<{ d: number; walk?: boolean; t?: number }> = ({ d, walk = false, t = 0 }) => (
  <>
    <MoFlat position={[MO0[0] - d, MO0[1], MO0[2]]} rotationY={EAST} k={MOK} armsUp />
    {[-1, 1].map((sd, i) => {
      // facing west, a guard's +X arm is on his south side: the north guard (sd −1) uses +X, the south one −X
      const back: Vec3 = [0.62, 0, 0];
      const base = walk ? getPose("walk", t * 1.2 + i * 0.4) : getPose("idle", t);
      return (
        <Raider
          key={sd} who={i ? 3 : 1} sword={false} position={[MO0[0] - d - 2.22, 0, MO0[2] + sd * 0.66]} rotationY={WEST}
          pose={{ ...base, bodyPitch: 0.12, ...(sd < 0 ? { armR: back } : { armL: back }) }} headYaw={sd * -0.5} headPitch={0.25} face="angry"
        />
      );
    })}
  </>
);
/** The family, where they have got to by the time the bus lands: south of the cages, out of the golem's way. */
const MUM: Vec3 = f(3.6, 0, 6.3);
const DAD: Vec3 = f(4.9, 0, 7.1);
const HISS: Vec3 = f(2.5, 0, 7.3);
type FMood = "calm" | "happy" | "sad" | "angry" | "scared";
/**
 * The family and two neighbours. `look` turns every head to a point; `mood` is the face they do it with (WORRIED is
 * "sad": he is running deeper into the castle, nobody is pleased). `flee` is seconds since they started to run for it:
 * they turn their backs on `from` and go, each at his own speed, arms up.
 */
const Family: React.FC<{ t: number; look?: Vec3; hiss?: boolean; mood?: FMood; flee?: number; from?: Vec3; reach?: number }> = ({ t, look, hiss = true, mood, flee = 0, from = f(11, 0, 4.5), reach = 0 }) => {
  const m: FMood = mood ?? "sad";
  const go = (p: Vec3, sp: number): { position: Vec3; rotationY: number; walk: number } => {
    if (flee <= 0) return { position: p, rotationY: WEST, walk: Math.sin(t * 2.4 + p[0]) * 0.06 };
    const dx = p[0] - from[0];
    const dz = p[2] - from[2] + 3;
    const l = Math.hypot(dx, dz);
    const dd = sp * flee * Math.min(1, flee * 3);
    return { position: [p[0] + (dx / l) * dd, 0, p[2] + (dz / l) * dd], rotationY: Math.atan2(dx, dz), walk: dd * 0.8 };
  };
  const lk = flee > 0 ? undefined : look;
  const md: FMood = flee > 0 ? "scared" : m;
  return (
    <>
      <Mum {...go(MUM, 3.6)} lookAt={lk} mood={md} turn={look || flee > 0 ? 0 : Math.sin(t * 2) * 0.7} arms={flee > 0 ? 1 : reach} lean={flee > 0 ? 0.25 : 0.08 * reach} />
      <Dad {...go(DAD, 4.4)} lookAt={lk} mood={md} jaw={flee > 0 ? 0.8 : m === "scared" ? 0.5 : 0.15 * reach} rattle={flee > 0 ? 0.6 : 0} lean={flee > 0 ? 0.25 : 0} />
      {hiss ? <Hiss {...go(HISS, 3.0)} lookAt={lk} mood={md} lean={flee > 0 ? 0.2 : 0} /> : null}
      <Folk kind="zombie" n={4} {...go(f(6.4, 0, 8.4), 3.9)} lookAt={lk} mood={md} arms={flee > 0 ? 1 : 0} lean={flee > 0 ? 0.25 : 0} />
      <Folk kind="spider" n={1} {...go(f(7.2, 0, 5.9), 5.2)} lookAt={lk} mood={md} />
    </>
  );
};
const busAt = (k: number): Vec3 => [BUSSPOT[0] + 21 * (1 - k), 13 * Math.sin(Math.PI * Math.min(1, 0.25 + 0.75 * k)) * (k < 1 ? 1 : 0) * (1 - k) * 1.6 + 0, BUSSPOT[2]];
/** The far end of the hallway. */
const END: Vec3 = hw(0, 0, -HALL_LEN + 4.2);
const EndOfHall: React.FC<{ turn?: number; d?: number }> = ({ turn = 0, d = 0 }) => (
  <>
    <MoFlat position={[END[0], 0.02, END[2] + 1.9 - d]} rotationY={0} />
    {[-0.45, 0.45].map((x, i) => (
      <Raider key={x} who={i ? 3 : 1} sword={false} position={[END[0] + x, 0, END[2] - 0.5 - d]} rotationY={NORTH + (i ? -1 : 1) * turn * 2.6} animation={turn > 0.5 ? "guard" : "walk"} face={turn > 0.5 ? "surprised" : "angry"} />
    ))}
  </>
);

/** THE BUS, MO, AND THE HALLWAY. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The hallway",
  shots: [
    {
      cue: "8.bus",
      ...cam.push({ on: f(15, 11.5, 3.4), onTo: f(-1.4, 1.4, 3.4), dist: 15, to: 9, yaw: 8, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 2.25, amp: 0.1, dur: 0.4 }],
      note: "A huge green slime sails over the top of the east wall with its face to the wind, comes down across the whole yard and lands in front of the cages. Splat: it goes flat as a plate and springs back up. Green drops everywhere.",
      stage: (t) => {
        const land = w("8.bus", "splat", 2.3) - 0.05;
        const k = ramp(t, 0.15, land);
        const sq = bump(t, land, 0.45);
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(BUSSPOT, 1)} teacher />
            <Battle t={t} />
            <Family t={t} />
            <Bus position={busAt(k)} rotationY={WEST} squash={sq} />
            {t > land && t < land + 1 ? <Puffs position={up(BUSSPOT, 0.2)} color="#7fd060" count={14} rise={1.6} spread={1.8} size={0.3} /> : null}
            <pointLight position={f(0, 4, 7)} color="#e6ecff" intensity={80} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.click",
      ...cam.push({ on: [LOCK[0] - 0.3, LOCK[1] + 0.1, LOCK[2]], dist: 2.9, to: 2.5, yaw: 24, pitch: 8 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The lock: the key goes in at last and turns. Click. The cage door swings out towards us and the boy is standing in the doorway with nothing between him and the yard.",
      stage: (t) => {
        const c = w("8.click", "click", 0.2);
        const open = ease(ramp(t, c + 0.15, c + 0.8));
        return (
          <>
            <Yard t={t} smoke hero="stand" door={open} heroFace={open > 0.3 ? "wow" : "uneasy"} />
            <Postman position={f(-6.7, 0, 1.9)} rotationY={NORTH - 0.7} nod={0.6} carry={1} />
            {open < 0.2 ? <Key position={[LOCK[0] + 0.1, LOCK[1], LOCK[2] + 0.12]} rotation={[0, Math.PI, 1.57 * clamp((t - c + 0.15) / 0.15)]} scale={1.3} /> : null}
            <Fill on={up(ME, 0.9)} yaw={24} power={7} />
          </>
        );
      },
    },
    {
      cue: "8.in",
      ...cam.push({ on: f(-2.1, 1.3, 2.6), dist: 9.4, to: 8.4, yaw: -22, pitch: 12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The enderman points a long arm at the slime. The boy runs out of the cage, takes off, and goes into the side of the bus head first. It wobbles round him. He floats in the middle of it, green, with his hair standing up.",
      stage: (t) => {
        const go = w("8.in", "got", 1.5);
        const k = ease(ramp(t, go - 0.5, go + 0.25));
        const inside = k >= 1;
        const p = mix(f(-5, 0.08, 0.9), [BUSSPOT[0], 0.35, BUSSPOT[2]], k);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} />
            <Battle t={t} n={5} />
            <Postman position={[T2[0] + 1.3, 0, T2[2] - 0.6]} rotationY={0.4} carry={1} jaw={t < go - 0.5 ? 0.8 : 0} />
            {t < go - 0.4 ? <Bubble text="GET IN!" position={[T2[0] + 1.3, 3.6, T2[2] - 0.5]} rotationY={-0.45} scale={0.5} /> : null}
            <Hero position={[p[0], p[1] + Math.sin(k * Math.PI) * 0.7, p[2]]} rotationY={0.9} scale={inside ? 0.85 : 1} animation={inside ? "idle" : k > 0 ? "jump" : "idle"} face={inside ? "ouch" : "brave"} />
            <Bus position={BUSSPOT} rotationY={WEST} squash={0.35 * bump(t, go + 0.2, 0.6)} />
            {inside && t < go + 1.3 ? <Puffs position={up(BUSSPOT, 1.2)} color="#7fd060" count={8} rise={1.2} spread={1.1} size={0.22} /> : null}
            <pointLight position={f(-3, 3, 6)} color="#e6ecff" intensity={50} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.mo",
      ...cam.push({ on: [BUSSPOT[0], 1.25, BUSSPOT[2]], dist: 2.9, to: 2.4, yaw: -62, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy's face inside the bus, seen through green jelly. He wipes at it with his hand, turns his head, and his eyes go wide.",
      stage: (t) => {
        const saw = w("8.mo", "saw", 1.5);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Hero position={[BUSSPOT[0], 0.35, BUSSPOT[2]]} rotationY={WEST + 0.5} scale={0.85} animation="reach" face={t > saw - 0.2 ? "fear" : "uneasy"} headYaw={0.6 * ease(ramp(t, 0.6, 1.2))} />
            <Bus position={BUSSPOT} rotationY={WEST} />
            <Fill on={[BUSSPOT[0], 1.5, BUSSPOT[2]]} yaw={-62} power={10} d={1.2} />
          </>
        );
      },
    },
    {
      cue: "8.down",
      ...cam.top({ on: [MO0[0] - 1.1, 0, MO0[2]], height: 5.2, to: 4.0 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Straight down: Mo on his back in the dirt. Straw hat, red scarf, eyes shut, arms out. He is not moving at all. Two guards stand at his head with a wrist of his each.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" door={1} mo={false} />
          <Taken d={0} t={t} />
          <pointLight position={[MO0[0] - 1, 3, MO0[2]]} color="#e6ecff" intensity={22} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "8.drag",
      ...cam.push({ on: [MO0[0] - 1.3, 0.9, MO0[2]], onTo: [MO0[0] - 1.3 - DRAG, 0.9, MO0[2]], dist: 7.0, to: 6.6, yaw: 12, pitch: 8 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Side on, moving with them: two guards walk off to the left, each with one arm back and a hand shut on one of his wrists, and Mo slides after them on his back, hat first, heels leaving two lines in the dirt. Behind them the fight goes on. No door, no building: only away.",
      stage: (t) => {
        const d = (DRAG * t) / dur("8.drag");
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Battle t={t} />
            <Taken d={d} walk t={t} />
            {[-0.2, 0.2].map((z) => (
              <Block key={z} position={[MO0[0] - d / 2, 0.06, MO0[2] + z]} size={[d + 0.01, 0.02, 0.1]} color="#4a3a28" castShadow={false} />
            ))}
            <Fill on={[MO0[0] - 2 - d, 0.5, MO0[2]]} yaw={12} power={8} d={2.5} />
          </>
        );
      },
    },
    {
      cue: "8.out",
      ...cam.push({ on: [BUSSPOT[0] - 0.7, 1.3, BUSSPOT[2] + 0.9], dist: 6.0, to: 5.4, yaw: -42, pitch: -4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From in front and below: the boy bursts out of the side of it in a spray of green, arms and legs wide, in the air.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.75));
        const p = mix([BUSSPOT[0], 0.35, BUSSPOT[2]], OUTBUS, k);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Bus position={BUSSPOT} rotationY={WEST} squash={0.3 * bump(t, 0, 0.5)} />
            <Hero position={[p[0], p[1] + Math.sin(k * Math.PI) * 1.0, p[2]]} rotationY={WEST + 0.4} animation={k < 1 ? "jump" : "run"} face="brave" />
            {t < 0.8 ? <Puffs position={[BUSSPOT[0] - 0.8, 1, BUSSPOT[2] + 0.8]} color="#7fd060" count={12} rise={1.4} spread={1.2} size={0.25} /> : null}
            <pointLight position={[BUSSPOT[0] - 2, 2.5, BUSSPOT[2] - 2]} color="#e6ecff" intensity={40} distance={10} decay={2} />
          </>
        );
      },
    },
    {
      cue: "8.look",
      ...cam.push({ on: f(4.2, 1.45, 6.6), dist: 7.6, to: 6.6, yaw: -76, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "What he sees: mum, dad, Hiss, a zombie, a spider, and every fighter behind them, all with their heads turned to look straight at us. Nobody is pleased: mum's brows go up in the middle and her arms come out to us, dad's jaw drops. He is going the wrong way.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" door={1} mo={false} />
          <Battle t={t} look={up(OUTBUS, 1.2)} />
          <Family t={t} look={up(OUTBUS, 1.2)} mood="sad" reach={ease(ramp(t, 0.5, 1.4))} />
          <Fill on={up(MUM, 1.6)} yaw={-76} power={9} d={3} />
        </>
      ),
    },
    {
      cue: "8.nobody",
      ...cam.push({ on: f(10, 4.6, 4.4), dist: 12.5, to: 10.5, yaw: -72, pitch: -12 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.5, amp: 0.06, dur: 0.3 }, { at: 1.1, amp: 0.06, dur: 0.3 }],
      note: "The same family, the same worried faces, from lower down, and behind them, over all their heads, the iron golem walks into the picture with its red eyes on something to our left.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" door={1} mo={false} />
          <Family t={t} look={up(OUTBUS, 1.2)} mood="sad" reach={1} />
          <Ravager position={f(14.5, 0, -3.5)} rotationY={0.4} roll={1.45} rider={false} scale={1.35} />
          <IronGolem position={f(13 - t * 2.6, 0, 3.7)} rotationY={WEST} scale={G} walk={t * 2.6} headPitch={0.25} />
          <pointLight position={f(8, 5, 8)} color="#e6ecff" intensity={90} distance={18} decay={2} />
        </>
      ),
    },
    {
      cue: "9.flick",
      ...cam.push({ on: [BUSSPOT[0] + 1.6, 2.6, BUSSPOT[2]], dist: 11.5, to: 10, yaw: 20, pitch: 7 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 1.3, amp: 0.12, dur: 0.4 }],
      note: "Side on: the golem runs at the bus, three strides, and flicks it with the back of one hand like a crumb off a table. The bus leaves the ground.",
      stage: (t) => {
        const fl = w("9.flick", "flick", 1.4) - 0.05;
        const k = ease(ramp(t, 0, fl - 0.15));
        const sw = bump(t, fl - 0.2, 0.5);
        const a = Math.max(0, t - fl);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} teacher />
            <Family t={t} look={up(GSTAND, 4)} mood="scared" />
            <Hero position={OUTBUS} rotationY={EAST} animation="scared" face="fear" lookAt={up(GSTAND, 4)} />
            <IronGolem position={[GSTAND[0] + 8.5 * (1 - k), 0, GSTAND[2]]} rotationY={WEST} scale={G} walk={t < fl ? t * 6 : fl * 6} armR={-0.4 - 1.6 * sw} bow={0.2 * sw} />
            <Bus position={[BUSSPOT[0] - a * 16, a * 15 - 6 * a * a, BUSSPOT[2] - a * 5]} rotationY={WEST + a * 8} squash={0.4 * bump(t, fl, 0.3)} />
            <pointLight position={f(0, 5, 9)} color="#e6ecff" intensity={90} distance={18} decay={2} />
          </>
        );
      },
    },
    {
      cue: "9.forest",
      ...cam.push({ on: f(-8, 12, -6), onTo: f(-30, 5, -12.5), dist: 26, to: 24, yaw: 62, pitch: 0, fov: 60 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Very wide: a small green ball goes up over the west wall of the castle against the stars, turning over and over, and comes down a long way off in the trees. A tree shakes. A little puff of leaves.",
      stage: (t) => {
        const k = ramp(t, 0, dur("9.forest") - 0.5);
        const kk = k * k * (3 - 2 * k);
        const p: Vec3 = f(-8 - 22 * kk, 12 + 4 * Math.sin(Math.PI * kk) - 7 * kk, -6 - 6.5 * kk);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} teacher />
            <Family t={t} look={p} mood="scared" />
            <Hero position={OUTBUS} rotationY={WEST} animation="scared" face="fear" lookAt={p} />
            <IronGolem position={GSTAND} rotationY={WEST} scale={G} headPitch={-0.3} />
            {k < 1 ? <Bus position={p} rotationY={t * 9} tilt={t * 5} scale={1.4} /> : <Puffs position={[p[0], 4, p[2]]} color="#3a7a31" count={12} rise={3} spread={2} size={0.7} />}
          </>
        );
      },
    },
    {
      cue: "9.fist",
      ...cam.push({ on: up(GSTAND, 4.3), dist: 8.8, to: 8.0, yaw: -58, pitch: -27, fov: 58 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.5, amp: 0.05, dur: 0.3 }],
      note: "From behind the boy's head, looking up: the golem's body turns, then its head, and two red eyes come down onto him. One iron fist goes up and up over it until it is in the stars.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.1, 0.9));
        const lift = ease(ramp(t, w("9.fist", "lifted", 1.3) - 0.2, dur("9.fist")));
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Hero position={OUTBUS} rotationY={EAST + 0.3} animation="cower" face="fear" lookAt={up(GSTAND, 5)} />
            <IronGolem position={GSTAND} rotationY={WEST + 0.3 * turn} scale={G} headPitch={0.55 * turn} armR={-0.2 - 2.8 * lift} />
            <pointLight position={[GSTAND[0] - 3, 4, GSTAND[2] + 2]} color="#e6ecff" intensity={70} distance={14} decay={2} />
          </>
        );
      },
    },
    {
      cue: "9.slam",
      ...cam.push({ on: f(3.2, 2.6, 4), onTo: f(8.5, 2.8, 4.3), dist: 15, to: 13.5, yaw: -8, pitch: 8 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.3, amp: 0.18, dur: 0.5 }, { at: 1.0, amp: 0.16, dur: 0.7 }],
      note: "SLAM. Wide, side on: the ravager comes in from the left at full gallop, past the boy so close his hair moves, and takes the golem in the ribs. The two of them go across the picture together and through the front of a stone hut. The hut goes up in dust and stones. Mum, dad, Hiss and the neighbours watch the golem go past their noses, heads turning with it, and then every one of them turns round and runs.",
      stage: (t) => {
        const hit = 0.3;
        const crash = 1.0;
        const k = ease(ramp(t, hit, crash));
        const rx = t < hit ? GSTAND[0] - 2.9 - (hit - t) * 26 : GSTAND[0] - 2.9 + 9.2 * k;
        const gone = t > crash + 0.25;
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Postman position={[T2[0] - Math.max(0, t - crash) * 3.2, 0, T2[2] + Math.max(0, t - crash) * 1.5]} rotationY={t > crash ? WEST : NORTH} walk={Math.max(0, t - crash) * 3} shake={0.5} lookAt={t > crash ? undefined : [GSTAND[0] + 9.2 * k, 3, GSTAND[2]]} jaw={0.7} mood="scared" />
            <Family t={t} look={[GSTAND[0] + 9.2 * k, 3, GSTAND[2]]} mood="scared" flee={t - crash - 0.15} />
            <Hero position={OUTBUS} rotationY={EAST} animation={t < hit ? "cower" : "stagger"} face="fear" />
            {!gone ? <Ravager position={[rx, 0, GSTAND[2]]} rotationY={EAST} walk={t * 9} jaw={1} head={-0.3} scale={1.35} /> : null}
            {!gone ? (
              <group position={[GSTAND[0] + 9.2 * k, 0.4 * Math.sin(k * Math.PI), GSTAND[2] + 0.5 * k]} rotation={[0, 0, -0.9 * k]}>
                <IronGolem rotationY={WEST + 0.3} scale={G} armR={-3 + 2 * k} armL={-1.5 * k} headPitch={-0.4 * k} />
              </group>
            ) : null}
            <Boom position={f(11.2, 0, 4.5)} t={t - crash} size={7} dir={[-0.3, 1]} stones={26} seed={5} />
            {t > hit && t < hit + 0.9 ? <Puffs position={up(GSTAND, 2)} count={10} rise={2} spread={2.2} size={0.6} color="#b9b9c0" /> : null}
            <pointLight position={f(5, 6, 10)} color="#e6ecff" intensity={110} distance={22} decay={2} />
          </>
        );
      },
    },
    {
      cue: "9.ran",
      ...cam.push({ on: [OUTBUS[0] - 1.2, 0.95, OUTBUS[2]], onTo: f(-8.4, 0.95, 6), dist: 4.4, to: 4.0, yaw: -52, pitch: 5 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy running at us, hard, arms pumping, and the camera backs away in front of him. Behind him, small, a green creeper comes round the corner of the cages after him on four very short legs.",
      stage: (t) => {
        const k = ramp(t, 0, dur("9.ran"));
        const p = mix(OUTBUS, f(-8.6, 0, 6), k);
        const hk = ramp(t, w("9.ran", "after", 1.2) - 0.3, dur("9.ran"));
        const hp = mix(HISS, f(-4.6, 0, 5.6), hk);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} teacher />
            <Battle t={t} />
            <Smoulder />
            <Hero position={p} rotationY={WEST} animation="run" face="brave" />
            <Hiss position={hp} rotationY={WEST} walk={t * 6} mood="angry" lean={0.2} />
            <Fill on={faceOf(p)} yaw={-52} power={8} d={2.4} />
          </>
        );
      },
    },
    {
      cue: "9.stay",
      ...cam.push({ on: up(T2, 2.35), dist: 5.2, to: 4.7, yaw: -22, pitch: -12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The enderman by the empty cage, from below: one long arm out, jaw dropped right open, shouting after them. STAY BACK! Then: BOTH OF YOU!",
      stage: (t) => {
        const both = w("9.stay", "both", 1.5);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            <Postman position={T2} rotationY={-0.8} jaw={0.6 + 0.4 * Math.abs(Math.sin(t * 9))} carry={1} lean={0.2} />
            <Bubble text={t < both - 0.15 ? "STAY BACK!" : "BOTH OF YOU!"} position={[T2[0] - 0.2, 3.4, T2[2] + 0.5]} rotationY={-0.38} scale={0.4} />
            <Fill on={up(T2, 2.6)} yaw={-22} power={9} d={2.4} />
          </>
        );
      },
    },
    {
      cue: "9.never",
      ...cam.push({ on: f(-4.8, 0.85, 5.6), onTo: f(-8.2, 0.85, 5.9), dist: 4.4, to: 4.0, yaw: 12, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Hiss, side on and close, going flat out: head down, brow down, little legs a blur, dust coming up behind him. He does not so much as look round.",
      stage: (t) => {
        const k = ramp(t, 0, dur("9.never"));
        const p = mix(f(-4.6, 0, 5.6), f(-8.2, 0, 5.9), k);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} teacher />
            <Battle t={t} />
            <Hiss position={[p[0], Math.abs(Math.sin(t * 14)) * 0.06, p[2]]} rotationY={WEST} walk={t * 8} mood="angry" lean={0.1} />
            <Puffs position={[p[0] + 0.7, 0.1, p[2]]} count={5} rise={0.5} spread={0.3} size={0.16} color="#b9b9c0" />
            <Fill on={up(p, 1)} yaw={12} power={8} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "9.door",
      ...cam.push({ on: up(KEEPDOOR, 2.2), dist: 11, to: 7.5, yaw: 84, pitch: 7 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The keep: a tall stone front, lit windows, and one door standing open with two torches by it and nothing but black inside. The boy runs away from us, straight at it, gets smaller, and the black takes him. Hiss is four steps behind.",
      stage: (t) => {
        const k = ramp(t, 0, w("9.door", "in", 1.6));
        const p = mix(f(-7.6, 0, 6), [KEEPDOOR[0] - 0.9, 0, KEEPDOOR[2]], k);
        const hk = ramp(t, 0.3, dur("9.door") + 0.5);
        const hp = mix(f(-5.4, 0, 6), [KEEPDOOR[0] - 0.9, 0, KEEPDOOR[2]], hk);
        return (
          <>
            <Yard t={t} smoke hero="none" door={1} mo={false} />
            {k < 0.97 ? <Hero position={p} rotationY={WEST} animation="run" face="brave" /> : null}
            <Hiss position={hp} rotationY={WEST} walk={t * 8} mood="angry" lean={0.2} />
          </>
        );
      },
    },
    {
      cue: "10.hall",
      ...cam.push({ on: hw(0, 1.5, -12), dist: 14.2, to: 12.4, yaw: 0, pitch: 3, fov: 52 }),
      zone: Z.hall,
      look: NIGHT4,
      note: "THE HALLWAY, for the first time. From just behind the boy: stone walls close on both sides, torches, a strip of red carpet running away into the dark, a door at the far end. He stops. He puts his own two arms out sideways (HIS arms: nothing is drawn on top of him) and his fingers are on both walls.",
      stage: (t) => {
        const arms = ease(ramp(t, w("10.hall", "touch", 3.0) - 0.7, w("10.hall", "touch", 3.0)));
        const p = hw(0, 0, -1.6 - 1.2 * ease(ramp(t, 0, 1.2)));
        return (
          <>
            <Hero
              position={p} rotationY={NORTH} face="uneasy" headYaw={0.7 * Math.sin(Math.PI * arms) * (t < w("10.hall", "touch", 3.0) ? 1 : 0)}
              pose={{ ...getPose(t < 1.2 ? "walk" : "idle", t), armR: [0, 0, 1.5 * arms], armL: [0, 0, -1.5 * arms] }}
            />
            <EndOfHall d={t * 0.25} />
          </>
        );
      },
    },
    {
      cue: "10.mo",
      ...cam.push({ on: [END[0], 1.0, END[2] + 0.6], dist: 6.5, to: 4.0, yaw: 0, pitch: 9, fov: 44 }),
      zone: Z.hall,
      look: NIGHT4,
      note: "The far end, the camera going down the hall to it: two guards with their backs to us, filling the hallway from wall to wall, and Mo on the floor between them on his back, hat by the carpet. He has not moved. The two heads turn round.",
      stage: (t) => {
        const turn = ease(ramp(t, w("10.mo", "between", 2.6) - 0.2, dur("10.mo") - 0.1));
        return (
          <>
            <EndOfHall d={1 + Math.min(t, 1.5) * 0.25} turn={turn} />
            <pointLight position={[END[0], 2.6, END[2] + 2.5]} color="#ffe2b0" intensity={8} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "10.run",
      ...cam.push({ on: hw(0, 0.95, -6), onTo: hw(0, 0.95, -9.5), dist: 3.4, to: 3.0, yaw: 180, pitch: 2 }),
      zone: Z.hall,
      look: NIGHT4,
      shake: 0.015,
      note: "The boy from the front, running straight at the lens down the thin hall with his teeth set, the walls going by on both sides, and Hiss's green head bobbing behind his shoulder.",
      stage: (t) => {
        const z = -6 - (3.5 * t) / dur("10.run");
        return (
          <>
            <Hero position={hw(0, 0, z)} rotationY={NORTH} animation="run" face="brave" />
            <Hiss position={hw(0.35, 0, z + 2.4)} rotationY={NORTH} walk={t * 8} mood="angry" lean={0.2} />
            <Fill on={faceOf(hw(0, 0, z))} yaw={180} power={8} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "11.sub",
      ...cam.push({ on: hw(0, 1.55, -14), dist: 7.6, to: 6.6, yaw: 0, pitch: 5, fov: 50 }),
      zone: Z.hall,
      look: NIGHT4,
      note: "THE LAST PICTURE. From behind them: the boy running away from us down the hallway at the two guards, who have turned to face him with Mo on the floor at their feet, Hiss running after the boy, and the red SUBSCRIBE sign hanging in the hallway over all of it.",
      stage: (t) => {
        const z = -10.2 - 3.0 * (t / dur("11.sub"));
        return (
          <>
            <EndOfHall d={1.4} turn={1} />
            <Hero position={hw(0, 0, z)} rotationY={NORTH} animation="run" face="brave" />
            <Hiss position={hw(-0.3, 0, z + 1.9)} rotationY={NORTH} walk={t * 8} mood="angry" lean={0.2} />
            <SubscribeSign position={hw(0, 2.75, -10.4)} scale={0.62 * ease(ramp(t, 0, 0.25))} tilt={Math.sin(t * 5) * 0.05} />
            <pointLight position={hw(0, 2.6, -8.6)} color="#fff0d0" intensity={9} distance={6} decay={2} />
          </>
        );
      },
    },
  ],
});

/** What is left of the hut the two of them went through: dust still coming up. */
const Smoulder: React.FC = () => <Puffs position={f(11.2, 1, 4.5)} count={10} rise={4} spread={2.4} size={0.9} color="#8a8a90" />;
void CLASH;
