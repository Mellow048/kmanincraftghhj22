import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BUSH, Bubble, Bush, CLASH, Dad, EAST, Fill, Flat, HOLE, Hero, IronGolem, ME, NIGHT4, NORTH, Pillager, Puffs, Raider, Ravager, Sheep, WEST, Z, dur, ease, f, faceOf, manFace, o, r, ramp, timing,
} from "./kit";
import { G, Yard, bump, clamp, up, w } from "./shared";

/** Where the guard stops to breathe, on the path outside the wall. */
const GS: Vec3 = o(0, 0, 3.6);
/** Where he ends up, a sword's length from the bush. */
const GB: Vec3 = o(1.55, 0, 3.5);
/** Dad, standing up in the middle of the bush. */
const DADUP: Vec3 = [BUSH[0], 0.25, BUSH[2]];
/** The fight, for the hook: where the golem and the ravager stand when they are locked together. */
const GF: Vec3 = [CLASH[0] - 1.9, 0, CLASH[2]];
const RF: Vec3 = [CLASH[0] + 3.3, 0, CLASH[2]];
/**
 * The guard's own sword hand, as he sees it: for a camera at eye height at x = `x` on his path, looking east.
 * A sleeve, a fist, and the sword out in front, shaking.
 */
const Hand: React.FC<{ x: number; t: number }> = ({ x, t }) => {
  const sh = Math.sin(t * 38) * 0.008;
  return (
    <group position={[x, 1.6 + Math.abs(Math.sin(t * 4.2)) * 0.015, GS[2] - 0.02]}>
      <Block position={[0.42, -0.3, 0.09]} size={[0.5, 0.13, 0.13]} color="#3f7f3a" castShadow={false} />
      <Block position={[0.7, -0.27 + sh, 0.09]} size={[0.13, 0.15, 0.15]} color="#8d5a3b" castShadow={false} />
      <AimSword position={[0.7, -0.24 + sh, 0.09]} yaw={EAST - 0.06} pitch={0.3 + sh * 3} scale={0.8} />
    </group>
  );
};

/** THE NIGHT: a cage, a castle asleep, one guard who cannot sleep, and a bush. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A bush moved",
  shots: [
    {
      cue: "1.town",
      from: f(8.3, 5.4, 7.2),
      to: f(7.9, 4.9, 6.4),
      target: f(6.9, 2.6, -2.5),
      fov: 64,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.42, amp: 0.2, dur: 0.5 }],
      note: "THE HOOK, from later tonight, with no warning: an iron golem as tall as a house brings its fist down on the skull of a ravager. The beast's chin hits the dirt, stones jump, the picture jumps. These are the monsters the line is talking about.",
      stage: (t) => {
        const hit = 0.42;
        const wind = ease(ramp(t, 0, hit - 0.12));
        const down = ease(ramp(t, hit - 0.12, hit));
        const after = clamp((t - hit) / 0.6);
        const sunk = down * (1 - 0.6 * after);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <IronGolem position={GF} rotationY={EAST} scale={G} armR={-1.2 - 1.9 * wind + 2.25 * down} armL={-0.9} bow={0.3 * down} headPitch={0.3} />
            <group position={[RF[0] + 0.3 * sunk, -0.25 * sunk, RF[2]]}>
              <Ravager position={[0, 0, 0]} rotationY={WEST} jaw={0.9 * (1 - down) + 0.6 * after} head={0.75 * sunk - 0.3 * after} scale={1.35} roll={0.05 * Math.sin(t * 40) * sunk} />
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
            <pointLight position={f(14, 3, -1.5)} color="#ff9040" intensity={60} distance={14} decay={2} />
          </>
        );
      },
    },
    {
      cue: "1.town",
      cut: 1.25,
      from: f(1.3, 5.7, -0.1),
      to: f(2.2, 5.5, -0.2),
      target: f(10, 1.8, -2.5),
      fov: 58,
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.2, amp: 0.06, dur: 0.2 }, { at: 0.5, amp: 0.08, dur: 0.2 }, { at: 0.8, amp: 0.1, dur: 0.2 }, { at: 1.1, amp: 0.12, dur: 0.2 }],
      note: "Over the golem's shoulder: the ravager comes back down the yard at a gallop with its jaw open and a pillager on its back, straight at us, bigger every step, pillagers cheering in a hole in the wall behind it.",
      stage: (t) => {
        const k = ramp(t, 0, 1.25);
        const x = RF[0] + 7 - 6.4 * k * k;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <IronGolem position={[GF[0] + 1.2, 0, GF[2]]} rotationY={EAST} scale={G} armR={-1.2 - 0.5 * k} armL={-1.2 - 0.5 * k} bow={0.15 + 0.15 * k} />
            <Ravager position={[x, 0, CLASH[2]]} rotationY={WEST} walk={-x * 0.9} jaw={0.4 + 0.6 * k} head={0.1} scale={1.35} />
            <Puffs position={[x + 1.6, 0.2, CLASH[2]]} count={10} rise={1.8} spread={1.8} size={0.55} color="#8a7a5a" />
            {[-2.6, -1.3, 0, 1.3, 2.6].map((z, i) => (
              <Pillager key={z} position={[HOLE[0] - 2.2 - (i % 2) * 0.9, 0.05, HOLE[2] + z]} rotationY={WEST} n={i} mad={1} cheer={0.5 + 0.5 * Math.sin(t * 7 + i * 2)} phase={i} />
            ))}
            <pointLight position={f(7, 4, -1)} color="#e6ecff" intensity={90} distance={18} decay={2} />
            <pointLight position={f(14, 3, -1.5)} color="#ff9040" intensity={60} distance={14} decay={2} />
          </>
        );
      },
    },
    {
      cue: "1.town",
      cut: 2.5,
      ...cam.push({ on: f(-5, 1.3, 0.8), dist: 3.3, to: 2.6, yaw: 12, pitch: 3, fov: 44 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.25, amp: 0.08, dur: 0.3 }, { at: 0.75, amp: 0.08, dur: 0.3 }],
      note: "AND I WAS IN A CAGE. The boy in the yellow top, on his feet, both hands on the bars, eyes wide, looking past us at the fight. Behind his cage two iron legs as thick as trees walk by, and the fire light jumps on his face.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Hero position={f(-5, 0.08, 0.72)} rotationY={0} animation="reach" face="fear" headYaw={-0.25} />
          <IronGolem position={f(-8.5 + t * 2.6, 0, -3.4)} rotationY={EAST} scale={G} walk={t * 2.6} />
          <Fill on={f(-5, 1.5, 0.8)} yaw={12} power={7} />
          <pointLight position={f(-2.5, 1.6, 2.6)} color="#ff9040" intensity={10 + 6 * Math.sin(t * 23)} distance={7} decay={2} />
        </>
      ),
    },
    {
      cue: "1.night",
      ...cam.orbit({ on: f(0, 3, -3), dist: 36, yaw: 24, yawTo: 6, pitch: 30 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From high up, swinging round: the whole castle village in the dark. A wall, towers, huts, a row of cages, and not one window lit.",
      stage: (t) => <Yard t={t} plug lit={0} hero="sleep" sleeper patrol />,
    },
    {
      cue: "1.shift",
      ...cam.push({ on: f(-7, 1.3, 3.2), onTo: f(-5.6, 1.3, 3.2), dist: 4.2, to: 4.2, yaw: -35, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "At walking height: a villager guard with a sword in his belt plods past a lantern, yawning. Behind him a player with a torch walks the other way.",
      stage: (t) => <Yard t={t + 3} plug lit={0} hero="sleep" sleeper patrol />,
    },
    {
      cue: "1.asleep",
      ...cam.push({ on: f(-5.05, 0.35, 0.3), dist: 3.5, to: 2.9, yaw: -24, pitch: 34 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Down through the bars: the boy flat out asleep on the cage floor, mouth open. A small Z drifts up from him.",
      stage: (t) => (
        <>
          <Yard t={t} plug lit={0} hero="sleep" sleeper />
          <Fill on={f(-5, 0.4, 0.3)} yaw={-24} power={6} />
          <Bubble text="Z" position={f(-5.2, 0.8 + ((t * 0.35) % 1) * 0.9, 0.5)} rotationY={-0.4} scale={0.5 + ((t * 0.35) % 1) * 0.3} />
        </>
      ),
    },
    {
      cue: "2.guard",
      ...cam.push({ on: r(-1.0, 0.9, -1.1), dist: 3.9, to: 3.3, yaw: 28, pitch: 26 }),
      zone: Z.room,
      look: NIGHT4,
      note: "A small stone room with one torch. A player lies in a red bed under a window full of stars. His eyes are wide open. He sits half up.",
      stage: (t) => {
        const k = 1 - 0.45 * ease(ramp(t, 0.5, 1.0));
        return (
          <>
            <Flat position={r(-1.2, 0.5, -0.25)} rotationY={0} k={k}>
              <Raider who={2} sword={false} animation="idle" face={t < 0.45 ? "sleepy" : "blank"} blink={t > 0.5} />
            </Flat>
            <pointLight position={r(0.2, 2.2, 0.4)} color="#ffd9a0" intensity={7} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "2.sheep",
      ...cam.top({ on: r(-1.2, 0.7, -1.3), height: 3.0, to: 2.7 }),
      zone: Z.room,
      look: NIGHT4,
      note: "Straight down on his face on the pillow, eyes open. Little white sheep hop over his chest one after another. On 'did not work' the last sheep stops and looks at him.",
      stage: (t) => {
        const no = w("2.sheep", "work", 2.0);
        return (
          <>
            <Flat position={r(-1.2, 0.5, -0.25)} rotationY={0}>
              <Raider who={2} sword={false} animation="idle" face={t > no - 0.2 ? "sad" : "blank"} blink={false} />
            </Flat>
            {[0, 1, 2, 3].map((i) => {
              const k = clamp((t - 0.25 - i * 0.5) / 0.7);
              const last = i === 3;
              const kk = last ? Math.min(k, 0.5) : k;
              return k > 0 && (kk < 1 || last) ? <Sheep key={i} position={r(-2.0 + 1.6 * kk, 0.95 + Math.sin(kk * Math.PI) * 0.3, -0.9)} scale={0.6} /> : null;
            })}
            <pointLight position={r(-1.2, 2.4, -1.2)} color="#ffe2b0" intensity={6} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "2.air",
      ...cam.push({ on: o(0.2, 1.3, 2.2), dist: 8.5, to: 7.2, yaw: 32, pitch: 9 }),
      zone: Z.out,
      look: NIGHT4,
      note: "Outside the castle wall. A small door opens and the guard walks out along the path in his socks, sword on his hip, past a big bush.",
      stage: (t) => {
        const k = ramp(t, 0.2, dur("2.air") - 0.1);
        return (
          <>
            <Bush position={BUSH} />
            <Raider who={2} position={[GS[0], 0, o(0, 0, 0.4)[2] + (GS[2] - o(0, 0, 0.4)[2]) * k]} rotationY={0} animation="walk" face="sleepy" />
          </>
        );
      },
    },
    {
      cue: "2.stars",
      ...cam.push({ on: up(GS, 1.75), dist: 2.7, to: 2.3, yaw: 78, pitch: -30 }),
      zone: Z.out,
      look: NIGHT4,
      note: "From down by his knees, looking up: his face against the stars and the moon. He shuts his eyes, lifts his chin and breathes in until his chest is out.",
      stage: (t) => {
        const b = ease(ramp(t, w("2.stars", "took", 1.5) - 0.2, dur("2.stars")));
        return (
          <>
            <Bush position={BUSH} />
            <group position={GS} scale={[1 + 0.08 * b, 1 + 0.03 * b, 1 + 0.12 * b]}>
              <Raider who={2} sword={false} animation="idle" face="happy" headPitch={-0.35 - 0.25 * b} headYaw={0.7} blink={b < 0.3} />
            </group>
            <Fill on={manFace(GS)} yaw={78} power={6} />
          </>
        );
      },
    },
    {
      cue: "3.bush",
      ...cam.push({ on: up(BUSH, 0.8), dist: 3.4, to: 2.8, yaw: -24, pitch: 6 }),
      zone: Z.out,
      look: NIGHT4,
      note: "The bush, filling the frame. It shivers. Two leaves fall off it.",
      stage: (t) => (
        <>
          <Bush position={BUSH} shake={t > 0.15 ? t : 0} />
          {[0, 1].map((i) => (
            <Block key={i} position={[BUSH[0] - 0.6 + i * 1.1, Math.max(0.05, 1.5 - (t - 0.2 - i * 0.15) * 2.2), BUSH[2] + 0.8]} size={[0.12, 0.03, 0.12]} color="#3a7a31" castShadow={false} />
          ))}
          <pointLight position={[BUSH[0] - 1, 1.5, BUSH[2] + 2]} color="#cfd8ff" intensity={6} distance={6} decay={2} />
        </>
      ),
    },
    {
      cue: "3.who",
      ...cam.push({ on: o(1.5, 1.35, 3.5), dist: 8.0, to: 7.4, yaw: -52, pitch: 6 }),
      zone: Z.out,
      look: NIGHT4,
      note: "Side on, the two of them: the guard on the left, turned to the bush on the right, a speech bubble WHO IS THERE? over him. Then three dots over the bush.",
      stage: (t) => {
        const said = w("3.who", "said", 1.0);
        return (
          <>
            <Bush position={BUSH} shake={t > said + 0.5 ? t : 0} />
            <Raider who={2} position={GS} rotationY={EAST} animation="guard" face="worried" />
            {t < said + 0.2 ? <Bubble text="WHO IS THERE?" position={[GS[0] + 1.2, 2.55, GS[2]]} rotationY={-0.9} scale={0.62 * ease(ramp(t, 0, 0.15))} /> : null}
            {t > said + 0.35 ? <Bubble text="..." position={up(BUSH, 2.3)} rotationY={-0.9} scale={0.6} tail={1} /> : null}
            <Fill on={manFace(GS)} yaw={-52} power={6} d={2.4} />
          </>
        );
      },
    },
    {
      cue: "3.sword",
      ...cam.push({ on: up(BUSH, 1.3), dist: 6.4, to: 5.6, yaw: -76, pitch: 8 }),
      zone: Z.out,
      look: NIGHT4,
      note: "From behind the guard, over his shoulder: the sword comes out and up, shining, and he starts towards the dark bush on tiptoe.",
      stage: (t) => {
        const k = ramp(t, w("3.sword", "walked", 1.1), dur("3.sword"));
        const p: Vec3 = [GS[0] + (GB[0] - GS[0]) * 0.45 * k, 0, GS[2]];
        return (
          <>
            <Bush position={BUSH} shake={Math.floor(t * 2)} />
            <Raider who={2} position={p} rotationY={EAST} animation={k > 0 ? "creep" : "guard"} face="worried" />
          </>
        );
      },
    },
    {
      cue: "3.slow",
      from: [GS[0] - 0.6, 1.6, GS[2] - 0.05],
      to: [GS[0] + 0.9, 1.56, GS[2] - 0.08],
      target: up(BUSH, 1.2),
      fov: 60,
      zone: Z.out,
      look: NIGHT4,
      shake: 0.006,
      note: "THROUGH THE GUARD'S EYES. We are him: his sword sticks out in front of us, shaking, his fist on it at the bottom of the picture, and the dark bush comes nearer one small step at a time. It twitches. We keep going.",
      stage: (t) => {
        const k = ramp(t, 0, dur("3.slow"));
        const ex = GS[0] - 0.6 + 1.5 * (0.5 - 0.5 * Math.cos(Math.PI * k));
        return (
          <>
            <Bush position={BUSH} shake={t > 0.9 && t < 1.15 ? t : 0} />
            <Hand x={ex} t={t} />
            <pointLight position={[BUSH[0] - 1.2, 1.6, BUSH[2] + 1.2]} color="#cfd8ff" intensity={7} distance={6} decay={2} />
          </>
        );
      },
    },
    {
      cue: "3.bam",
      from: [GS[0] + 0.9, 1.56, GS[2] - 0.08],
      to: [GS[0] + 0.5, 1.6, GS[2] - 0.05],
      target: [BUSH[0] - 0.75, 1.72, BUSH[2]],
      fov: 60,
      zone: Z.out,
      look: NIGHT4,
      impacts: [{ at: 0.06, amp: 0.22, dur: 0.5 }],
      note: "THE JUMPSCARE, still through his eyes. BAM: a skull comes up out of the bush and straight into our face, black eye holes, teeth, a blue scarf, leaves everywhere, bony arms thrown wide. The sword goes spinning out of the bottom of the picture. Then it waves. It is Dad.",
      stage: (t) => {
        const upk = ease(ramp(t, 0.03, 0.15));
        const at: Vec3 = [BUSH[0] - 1.25 * upk, -1.5 + 1.72 * upk, BUSH[2]];
        return (
          <>
            <Bush position={BUSH} shake={t < 0.7 ? t : 0} />
            <Dad position={at} rotationY={WEST} wave={t > 0.6 ? 1 : 0} raise={t < 0.6 ? 1 : 0.2} mood={t < 0.55 ? "angry" : "happy"} jaw={t < 0.55 ? 0.55 * upk : 0.12} rattle={t < 0.5 ? 1 : 0} />
            {t < 0.9
              ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <Block key={i} position={[BUSH[0] - 0.9 + Math.cos(i * 0.8) * t * 1.6, 1.4 + t * (2.5 + (i % 3)) - 5 * t * t, BUSH[2] + Math.sin(i * 0.8) * t * 1.5]} rotation={[t * 9, i, t * 5]} size={[0.13, 0.03, 0.13]} color={i % 2 ? "#3a7a31" : "#2f6a2a"} castShadow={false} />
                ))
              : null}
            {t < 0.5 ? <AimSword position={[GS[0] + 1.6, 1.3 - t * 2.4, GS[2] + 0.15]} yaw={EAST + t * 6} pitch={0.3 + t * 5} scale={0.9} /> : null}
            <pointLight position={[BUSH[0] - 1.6, 1.9, BUSH[2] + 0.5]} color="#e6ecff" intensity={9} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "3.bam",
      cut: 1.5,
      from: [BUSH[0] - 2.9, 1.75, BUSH[2] + 1.25],
      to: [BUSH[0] - 2.6, 1.7, BUSH[2] + 1.05],
      target: [BUSH[0] - 1.22, 1.6, BUSH[2]],
      fov: 46,
      zone: Z.out,
      look: NIGHT4,
      impacts: [{ at: 0.42, amp: 0.05, dur: 0.25 }],
      note: "HIS JAW. Very close on the skull, a little from the side: on the word the whole lower jaw comes off its hinges and swings down, clack, until it hangs on his scarf, with a row of teeth on it and the black inside of his head showing. He does not notice.",
      stage: (t) => {
        const j = w("3.bam", "jaw", 1.85) - 1.5;
        const jaw = 0.12 + 0.88 * ease(ramp(t, j - 0.05, j + 0.2)) + 0.06 * bump(t, j + 0.2, 0.25);
        return (
          <>
            <Bush position={BUSH} />
            <Dad position={[BUSH[0] - 1.25, 0.22, BUSH[2]]} rotationY={WEST} wave={1} raise={0.2} mood="happy" jaw={jaw} />
            <pointLight position={[BUSH[0] - 1.7, 1.9, BUSH[2] + 0.9]} color="#e6ecff" intensity={9} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "3.scream",
      ...cam.push({ on: manFace(GB), dist: 2.3, to: 9, yaw: 28, pitch: 6, fov: 50 }),
      zone: Z.out,
      look: NIGHT4,
      shake: 0.02,
      note: "The guard, mouth wide, sword in the air, screaming. The camera pulls back and back and he is still screaming: a bubble of AAAAA grows until it is wider than he is.",
      stage: (t) => {
        const k = ramp(t, 0, dur("3.scream"));
        return (
          <>
            <Bush position={BUSH} />
            <Dad position={DADUP} rotationY={WEST} raise={0.4} lookAt={manFace(GB)} jaw={1} />
            <Raider who={2} position={GB} rotationY={0.5} animation="panic" face="scared" />
            <AimSword position={[GB[0] - 0.4, 0.06, GB[2] + 0.5]} yaw={2} pitch={0} />
            <Bubble text={"A".repeat(3 + Math.floor(k * 9))} position={up(GB, 2.5 + k * 0.4)} rotationY={0.45} scale={0.45 + k * 0.5} />
            <Fill on={manFace(GB)} yaw={28} power={7} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "3.sorry",
      ...cam.push({ on: o(2.3, 1.0, 3.8), dist: 6.4, to: 5.6, yaw: -64, pitch: 15 }),
      zone: Z.out,
      look: NIGHT4,
      note: "The guard is flat on his back in the grass, fainted. Dad stands in the bush over him, pushes his own jaw shut with one hand, and a small bubble says SORRY.",
      stage: (t) => {
        const back = w("3.sorry", "back", 2.0);
        const sorry = w("3.sorry", "sorry", 2.5);
        const jaw = 1 - ease(ramp(t, back - 0.5, back));
        return (
          <>
            <Bush position={BUSH} />
            <Dad position={DADUP} rotationY={WEST} raise={jaw < 1 && t < sorry ? 1 : 0} nod={0.5} mood={t > sorry ? "sad" : "calm"} jaw={jaw} />
            <Flat position={[GB[0] + 0.1, 0, GB[2] + 0.4]} rotationY={EAST} k={ease(ramp(t, -0.2, 0.25))}>
              <Raider who={2} sword={false} animation="idle" face="dizzy" blink={false} />
            </Flat>
            <AimSword position={[GB[0] - 0.4, 0.06, GB[2] + 1.1]} yaw={2} pitch={0} />
            {t > sorry - 0.1 ? <Bubble text="SORRY" position={up(DADUP, 2.55)} rotationY={-1.1} scale={0.5 * ease(ramp(t, sorry - 0.1, sorry + 0.05))} tail={1} /> : null}
            <Fill on={up(DADUP, 1.6)} yaw={-64} power={6} d={2.4} />
          </>
        );
      },
    },
    {
      cue: "3.lights",
      ...cam.orbit({ on: f(-4, 5, -3), dist: 31, yaw: -12, yawTo: 8, pitch: 9 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The castle from the open side, wide and dark. One window goes yellow. Then another, and another, all round the wall and up the keep, until every one is lit.",
      stage: (t) => <Yard t={t} plug lit={ease(ramp(t, 0.5, dur("3.lights") - 0.2))} hero="sleep" sleeper patrol />,
    },
  ],
});
// kept for the shots that follow, so they need not be worked out twice
export const GUARD_DOWN: Vec3 = [GB[0] + 0.1, 0, GB[2] + 0.4];
export const DAD_BUSH = DADUP;
void NORTH;
void faceOf;
