import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BUSH, Bubble, Bush, Dad, EAST, Fill, Flat, Hero, ME, NIGHT4, NORTH, Raider, Sheep, WEST, Z, dur, ease, f, faceOf, manFace, o, r, ramp, timing,
} from "./kit";
import { Yard, bump, clamp, up, w } from "./shared";

/** Where the guard stops to breathe, on the path outside the wall. */
const GS: Vec3 = o(0, 0, 3.6);
/** Where he ends up, a sword's length from the bush. */
const GB: Vec3 = o(1.55, 0, 3.5);
/** Dad, standing up in the middle of the bush. */
const DADUP: Vec3 = [BUSH[0], 0.25, BUSH[2]];
/** Dad's jaw: it hangs open by `k` (0–1). He faces west. */
const Jaw: React.FC<{ at: Vec3; k: number }> = ({ at, k }) => (
  <group position={[at[0] - 0.02, at[1] + 1.5 - 0.3 * k, at[2]]}>
    <Block size={[0.34, 0.09, 0.36]} color="#e8e6dc" />
    {k > 0.1 ? <Block position={[-0.12, 0.05 + 0.15 * k, 0]} size={[0.06, 0.3 * k, 0.26]} color="#0a0a0c" castShadow={false} /> : null}
  </group>
);

/** THE NIGHT: a cage, a castle asleep, one guard who cannot sleep, and a bush. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "A bush moved",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: up(ME, 0.75), dist: 4.2, to: 2.7, yaw: 14, pitch: 7 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "THE PREMISE. Night. A boy in a yellow top sits on the floor of an iron cage, knees up, looking out through the bars at us. The camera goes in to him.",
      stage: (t) => (
        <>
          <Yard t={t} plug lit={0} hero="sit" heroFace="uneasy" sleeper patrol />
          <Fill on={up(ME, 0.8)} yaw={14} power={7} />
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
      ...cam.push({ on: manFace(GB), dist: 2.5, to: 2.2, yaw: 52, pitch: 4 }),
      zone: Z.out,
      look: NIGHT4,
      note: "His face, very close, from the bush's side: eyes huge, the sword point trembling in front of his nose. He comes one tiny step at a time.",
      stage: (t) => {
        const k = ramp(t, 0, dur("3.slow"));
        const p: Vec3 = [GS[0] + (GB[0] - GS[0]) * (0.45 + 0.55 * k), 0, GS[2]];
        return (
          <>
            <Bush position={BUSH} />
            <Raider who={2} position={[p[0], 0, p[2] + Math.sin(t * 40) * 0.006]} rotationY={EAST} animation="creep" animSpeed={0.5} face="scared" />
            <Fill on={manFace(GB)} yaw={52} power={7} />
          </>
        );
      },
    },
    {
      cue: "3.bam",
      ...cam.push({ on: up(DADUP, 1.55), dist: 4.4, to: 2.5, yaw: -62, pitch: 2 }),
      zone: Z.out,
      look: NIGHT4,
      impacts: [{ at: 0.12, amp: 0.09, dur: 0.35 }],
      note: "BAM. A skeleton in a blue scarf shoots up out of the middle of the bush, leaves flying, arms out, and his jaw drops open to his chest. The camera rushes at him.",
      stage: (t) => {
        const upk = ease(ramp(t, 0.02, 0.2));
        const jaw = ease(ramp(t, w("3.bam", "jaw", 1.9) - 0.5, w("3.bam", "jaw", 1.9)));
        const at: Vec3 = [DADUP[0], -1.5 + 1.75 * upk, DADUP[2]];
        return (
          <>
            <Bush position={BUSH} shake={t < 0.6 ? t : 0} />
            <Dad position={at} rotationY={WEST} wave={t * 6} raise={1} mood="happy" />
            <Jaw at={at} k={Math.max(jaw, 0.3 * upk)} />
            {t < 0.9
              ? [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <Block key={i} position={[BUSH[0] + Math.cos(i * 0.8) * t * 2.4, 1.3 + t * (3 + (i % 3)) - 5 * t * t, BUSH[2] + Math.sin(i * 0.8) * t * 2.4]} size={[0.14, 0.04, 0.14]} color={i % 2 ? "#3a7a31" : "#2f6a2a"} castShadow={false} />
                ))
              : null}
            <Raider who={2} position={GB} rotationY={EAST} animation="scared" face="scared" />
            <Fill on={up(DADUP, 1.6)} yaw={-62} power={9} d={2.2} />
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
            <Dad position={DADUP} rotationY={WEST} raise={0.4} lookAt={manFace(GB)} />
            <Jaw at={DADUP} k={1} />
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
            <Dad position={DADUP} rotationY={WEST} raise={jaw < 1 && t < sorry ? 1 : 0} nod={0.5} mood={t > sorry ? "sad" : "calm"} />
            <Jaw at={DADUP} k={jaw} />
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
