import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, Arm, Bits, Black, Bubble, Dad, DustRing, EAST, Folk, Glint, Hiss, IronGolem, NIGHT, Village, WARM, WEST, Z3, dadHand, dadSocket, ease, h, heldAt, hop, jolt, mix,
  monsterFace, pop, ramp, timing, wordAt,
} from "./kit";
import { DadAndArm } from "./scene2";

const D = AT.dad;
const D_ROT = 0.25;
const DFACE = monsterFace("skeleton", D);
const T = AT.teacher;
const TFACE = monsterFace("enderman", T);
/** What Hiss is talking about: a place in the dark, a long way from anywhere. */
const G: Vec3 = [300, 0, 0];

/** THE VILLAGERS, the golem, east, click, and the teacher's question. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "He went to the villagers",
  shots: [
    {
      cue: "5.moved",
      ...cam.push({ on: [dadHand(D, D_ROT)[0], dadHand(D, D_ROT)[1] + 0.55, dadHand(D, D_ROT)[2]], dist: 1.25, to: 1.0, yaw: -30, pitch: 0, fov: 30 }),
      zone: Z3.hide,
      look: WARM,
      note: "The hand fills the frame, the lamps soft behind it. One finger goes up. One finger goes down. That is the whole sentence.",
      stage: (t) => {
        const up = wordAt("5.moved", "up");
        const down = wordAt("5.moved", "down");
        return (
          <>
            <Village t={t} look={DFACE} />
            <DadAndArm t={t} finger={ease(ramp(t, up - 0.12, up + 0.05)) - ease(ramp(t, down - 0.12, down + 0.05))} turn={jolt(t, 0.3, 0.5)} />
          </>
        );
      },
    },
    {
      cue: "5.villagers",
      ...cam.push({ on: [DFACE[0], DFACE[1], DFACE[2]], dist: 3.0, to: 1.5, yaw: 4, pitch: -6, fov: 44 }),
      zone: Z3.hide,
      look: WARM,
      note: "A fast push into dad's skull as he says it, the jaw hanging.",
      stage: (t) => {
        const v = wordAt("5.villagers", "villagers");
        return (
          <>
            <Village t={t} look={DFACE} />
            <DadAndArm t={t} mood="scared" turn={0.4} y={jolt(t, v, 0.06)} />
            <Bubble text="VILLAGERS?!" position={[D[0] - 0.2, DFACE[1] + 0.55, D[2] + 0.5]} scale={0.2 * pop(t, v - 0.05)} tail={0} dark />
          </>
        );
      },
    },
    {
      cue: "5.scared",
      ...cam.push({ on: h(0, 1.4, -1), dist: 9.5, to: 8.6, yaw: -30, pitch: 14, fov: 56 }),
      zone: Z3.hide,
      look: WARM,
      note: "The whole room from up in a corner: the well, the shelves, the lamps, and every monster in the village leaving the floor at the same moment.",
      stage: (t) => (
        <>
          <Village t={t} look={DFACE} mood="scared" hopAt={0.25} />
          <DadAndArm t={t} mood="scared" y={hop(t, 0.25, 0.3, 0.3)} />
          <DustRing position={[D[0], 0.05, D[2] - 1]} t={t - 0.55} size={4} color="#b8894e" />
        </>
      ),
    },
    {
      cue: "5.hiss",
      ...cam.push({ on: monsterFace("creeper", AT.hiss), dist: 1.9, to: 1.5, yaw: -18, pitch: -14, fov: 40 }),
      zone: Z3.hide,
      look: WARM,
      note: "Hiss from under his chin, going white round the edges as he says it. A creeper who is scared is a thing to stand back from, and the ones behind him do.",
      stage: (t) => (
        <>
          <Village t={t} look={monsterFace("creeper", AT.hiss)} mood="scared" hiss={false} />
          <Hiss position={AT.hiss} rotationY={-0.3} mood="scared" fuse={0.35 + 0.3 * Math.sin(t * 12)} />
          <DadAndArm t={t} mood="scared" lookAt={monsterFace("creeper", AT.hiss)} />
        </>
      ),
    },
    {
      cue: "5.golem",
      ...cam.push({ on: [G[0], 1.7, G[2]], dist: 7.5, to: 5.6, yaw: 0, pitch: -10, fov: 52 }),
      zone: Z3.black,
      look: NIGHT,
      note: "What Hiss sees when he says it: in the dark, lit from one side, an iron golem as tall as a house walking at the lens, and four small monsters in front of it who have not run yet.",
      stage: (t) => {
        const wipe = wordAt("5.golem", "wipe");
        const sw = ease(ramp(t, wipe - 0.1, wipe + 0.2));
        return (
          <>
            <Black position={[G[0], 5, G[2] - 9]} size={[60, 30, 0.2]} color="#0b0a12" />
            <Black position={[G[0], -0.05, G[2]]} size={[60, 0.1, 40]} color="#16141c" />
            <pointLight position={[G[0] - 4, 4, G[2] + 3]} color="#ffd9a0" intensity={90} distance={16} decay={2} />
            <pointLight position={[G[0] + 4, 2, G[2] + 4]} color="#7f9cff" intensity={40} distance={14} decay={2} />
            <IronGolem position={[G[0], 0, G[2] - 2.6 + 1.1 * Math.min(t, wipe)]} scale={1.5} walk={Math.min(t, wipe) * 1.6} armR={-0.4 - 2.3 * Math.sin(sw * Math.PI)} headPitch={0.25} />
            {(["zombie", "skeleton", "creeper", "zombie"] as const).map((k, i) => {
              const f = ease(ramp(t, wipe + 0.05 + i * 0.03, wipe + 0.7));
              const x = G[0] - 1.5 + i;
              return <Folk key={i} kind={k} n={i + 3} position={[x + (i - 1.5) * 3.2 * f, 3.4 * Math.sin(f * Math.PI) + 2.5 * f, G[2] + 1.0 + 1.5 * f]} rotationY={Math.PI + 9 * f * (i % 2 ? 1 : -1)} mood="scared" scale={0.85} />;
            })}
            <Bits position={[G[0], 1.2, G[2] + 0.8]} t={t - wipe - 0.1} color="#d8d8d8" count={16} power={4} />
          </>
        );
      },
    },
    {
      cue: "5.golem",
      cut: wordAt("5.golem", "with") - 0.12,
      ...cam.push({ on: [G[0] + 0.5, 3.0, G[2]], dist: 3.6, to: 3.1, yaw: 28, pitch: -34, fov: 50 }),
      zone: Z3.black,
      look: NIGHT,
      note: "From its feet, looking straight up: the golem holds up the one arm that did it. Nothing else is left in the frame.",
      stage: (t) => {
        const one = wordAt("5.golem", "one") - wordAt("5.golem", "with") + 0.12;
        return (
          <>
            <Black position={[G[0], 5, G[2] - 9]} size={[60, 30, 0.2]} color="#0b0a12" />
            <Black position={[G[0], 14, G[2]]} size={[60, 0.2, 40]} color="#0b0a12" />
            <pointLight position={[G[0] - 4, 4, G[2] + 3]} color="#ffd9a0" intensity={90} distance={16} decay={2} />
            <pointLight position={[G[0] + 3, 1, G[2] + 3]} color="#7f9cff" intensity={50} distance={14} decay={2} />
            <IronGolem position={[G[0], 0, G[2]]} scale={1.5} armR={-2.9 * ease(ramp(t, one - 0.25, one))} headPitch={0.4} />
            <Glint position={[G[0] + 1.3, 5.2, G[2] + 0.3]} t={t - one} size={1.6} />
          </>
        );
      },
    },
    {
      cue: "5.down",
      ...cam.top({ on: [D[0], 0, D[2] - 0.9], height: 4.9, to: 4.4, spin: [0, 22], fov: 74 }),
      zone: Z3.hide,
      look: WARM,
      note: "Straight down from the beams, turning slowly: the tops of forty heads, all tipped at the red carpet. Nobody moves. A clock would be loud.",
      stage: (t) => {
        const k = ease(ramp(t, 0.15, 0.6));
        return (
          <>
            <Village t={t} nod={0.75 * k} mood="sad" />
            <DadAndArm t={t} mood="sad" nod={0.75 * k} raise={1 - 0.75 * k} />
          </>
        );
      },
    },
    {
      cue: "6.again",
      ...cam.orbit({ on: [D[0] + 0.15, DFACE[1] - 0.15, D[2] + 0.2], dist: 2.4, yaw: -85, yawTo: -50, pitch: 2, fov: 40 }),
      zone: Z3.hide,
      look: WARM,
      note: "In profile, the lens drifting round: one skull comes up while all the others stay down. He lifts the arm level with his eye sockets and asks it something, quietly.",
      stage: (t) => {
        const first = wordAt("6.again", "first");
        const arm = wordAt("6.again", "arm");
        const k = ease(ramp(t, first - 0.2, first + 0.2));
        return (
          <>
            <Village t={t} nod={0.75} mood="sad" />
            <DadAndArm t={t} nod={0.75 * (1 - k)} raise={0.25 + 0.75 * k} talk={t > arm} turn={0.5 * ease(ramp(t, arm, arm + 0.3))} />
          </>
        );
      },
    },
    {
      cue: "6.east",
      ...cam.pan({ from: [D[0] - 0.9, 1.75, D[2] + 2.0], on: [dadHand(D, D_ROT)[0], 1.6, dadHand(D, D_ROT)[2]], onTo: [D[0] + 5, 1.7, D[2] - 0.4], fov: 46 }),
      zone: Z3.hide,
      look: WARM,
      note: "Past dad's shoulder at the hand: it swings round like a compass needle and points, and the lens whips the way it points, across every face in the room, to the east wall.",
      stage: (t) => {
        const east = wordAt("6.east", "east");
        const k = ease(ramp(t, east - 0.25, east));
        return (
          <>
            <Village t={t} look={k > 0.5 ? h(13, 2, 0) : DFACE} nod={0.75 * (1 - k)} />
            <DadAndArm t={t} finger={k} turn={-1.3 * k} lookAt={k > 0.5 ? h(13, 2, 0) : undefined} />
            <Bubble text="EAST" position={[D[0] + 4.4, 2.5, D[2] - 0.6]} rotationY={-0.5} scale={0.9 * pop(t, east)} tail={0} />
          </>
        );
      },
    },
    {
      cue: "6.plug",
      ...cam.push({ on: dadSocket(D, D_ROT), dist: 2.3, to: 1.8, yaw: -42, pitch: 6, fov: 38 }),
      zone: Z3.hide,
      look: WARM,
      note: "The empty shoulder, close: a round socket. The good hand brings the arm round and pushes it home. Click, a spark, and the fingers on the end of it wriggle.",
      stage: (t) => {
        const click = wordAt("6.plug", "click");
        const k = ease(ramp(t, 0.2, click));
        const hand = dadHand(D, D_ROT, 1);
        const s = dadSocket(D, D_ROT);
        return (
          <>
            <Village t={t} look={s} />
            {t < click ? (
              <>
                <Dad position={D} rotationY={D_ROT} noArm raise={1 - 0.3 * k} mood="calm" turn={-0.7 * k} />
                <Arm position={mix(heldAt([hand[0], hand[1] - 0.1, hand[2]], D_ROT + Math.PI), [s[0] - 0.75 * (1 - k) - 0.02, s[1] - 0.6, s[2] + 0.1], k)} rotationY={D_ROT} rear={1} />
              </>
            ) : (
              <Dad position={[D[0] + jolt(t, click, 0.04), 0, D[2]]} rotationY={D_ROT} mood="happy" wave={0.5 + 0.3 * Math.sin((t - click) * 14)} />
            )}
            <Glint position={s} t={t - click} size={1.3} />
            <Bits position={s} t={t - click} color="#fff4c8" count={10} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "6.teacher",
      ...cam.push({ on: [TFACE[0], TFACE[1] - 0.3, TFACE[2]], dist: 3.4, to: 2.8, yaw: -22, pitch: -28, fov: 46 }),
      zone: Z3.hide,
      look: WARM,
      note: "The enderman teacher from down by his knees: three metres of black, and over his head a little picture of a golem that gets crossed out and turns into a question mark.",
      stage: (t) => {
        const stopped = wordAt("6.teacher", "stopped");
        return (
          <>
            <Village t={t} look={DFACE} teacher={false} />
            <Dad position={D} rotationY={D_ROT} mood="happy" wave={0.6 + 0.3 * Math.sin(t * 12)} />
            <Folk kind="enderman" n={0} position={T} rotationY={-0.8} lookAt={[D[0], 1.3, D[2]]} tilt={0.35 * ease(ramp(t, stopped, stopped + 0.3))} />
            <Bubble text={t > stopped ? "?" : "GOLEM"} position={[T[0] - 0.2, TFACE[1] + 0.8, T[2] + 0.3]} rotationY={-0.3} scale={0.6 * (t > stopped ? pop(t, stopped) : pop(t, 0.1))} tail={0} dark={t < stopped} />
          </>
        );
      },
    },
    {
      cue: "6.how",
      ...cam.push({ on: [D[0] + 0.3, 1.2, D[2]], dist: 3.6, to: 3.0, yaw: 62, pitch: 30, fov: 44 }),
      zone: Z3.hide,
      look: WARM,
      note: "Over the teacher's shoulder and down: he folds himself nearly in half to get his face level with dad's new arm, and dad, small under him, wiggles its fingers at him.",
      stage: (t) => {
        const how = wordAt("6.how", "how");
        const k = ease(ramp(t, 0.1, 0.6));
        const at = mix(T, [D[0] + 1.5, 0, D[2] + 0.1], k);
        return (
          <>
            <Village t={t} look={DFACE} teacher={false} />
            <Dad position={D} rotationY={0.9} mood="happy" wave={0.45} lookAt={[at[0], 2.2, at[2]]} />
            <Folk kind="enderman" n={0} position={at} rotationY={WEST} walk={1.6 * k} lean={0.75 * k} nod={0.3} jaw={t > how ? 0.5 + 0.5 * Math.sin(t * 14) : 0} />
            <Bubble text="HOW?" position={[D[0] + 0.6, 2.5, D[2] + 0.5]} rotationY={0.9} scale={0.3 * pop(t, how)} tail={1} dark />
          </>
        );
      },
    },
    {
      cue: "6.shrug",
      ...cam.push({ on: h(-0.2, 1.2, -0.6), dist: 7.6, to: 7.2, yaw: 0, pitch: 6, fov: 46 }),
      zone: Z3.hide,
      look: WARM,
      note: "Everybody, square on, for one second: they all look at each other and all go up and down once. Nobody knows.",
      stage: (t) => (
        <>
          <Village t={t} look={h(6 * Math.sin(t * 9), 1.5, 4)} hopAt={0.3} />
          <Dad position={[D[0], hop(t, 0.3, 0.2, 0.3), D[2]]} rotationY={D_ROT} wave={0.4} turn={0.6 * Math.sin(t * 9)} />
        </>
      ),
    },
  ],
});
void EAST;
