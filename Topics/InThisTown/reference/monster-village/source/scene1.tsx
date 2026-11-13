import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Basket, Bits, Bus, DAY, Dad, Folk, Hero, Hiss, Mum, NORTH, PLACE, Parcel, Postman, Puffs, ZONE, ease, faceOf, hop, jolt, monsterFace, pop, ramp, timing, wordAt } from "./kit";

/** Under the market hall, at its sunny edge. */
const ME: Vec3 = [-3.5, 0, 0.5];
const MUM: Vec3 = [-4.35, 0, -1.3];
const DAD: Vec3 = [-2.65, 0, -1.3];
const HISS: Vec3 = [-3.5, 0, -2.3];
const POST: Vec3 = [-3.5, 0, -3.3];
const LENS: Vec3 = [-3.5, 1.6, 6];
const CL = PLACE.classroom;
/** Who sits where in class, apart from him (front row, middle): kind, x, z, which one. */
const SEATS: Array<["zombie" | "creeper", number, number, number]> = [
  ["zombie", -1, 0, 0],
  ["creeper", 1, 0, 1],
  ["zombie", -1, 1.6, 4],
  ["creeper", 0, 1.6, 3],
  ["zombie", 1, 1.6, 2],
];

/** HOOK and the jokes: who lives here. Everything is under the hall roof, out of the sun, and he is not. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The only one who was not a monster",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [-3.5, 1.35, -0.6], dist: 6.4, to: 5.3, yaw: 0, pitch: 5, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "The premise in one picture: a boy in yellow in the sun, waving, and behind him, in the shade, a zombie, a skeleton, a creeper and an enderman pop up one after another.",
      stage: (t) => (
        <>
          <Hero position={[ME[0], hop(t, 0.05, 0.25, 0.35), ME[2]]} animation="wave" face="grin" gaze={0} />
          <Mum position={MUM} scale={pop(t, 0.25)} wave={1} mood="happy" lookAt={LENS} />
          <Dad position={DAD} scale={pop(t, 0.5)} wave={1} mood="happy" lookAt={LENS} />
          <Hiss position={HISS} scale={pop(t, 0.75)} mood="happy" lookAt={LENS} />
          <Postman position={POST} scale={pop(t, 1.0)} lookAt={LENS} />
          {/* And the rest of the village, further back in the shade. */}
          <Folk kind="zombie" n={0} position={[-5.35, 0, -2.7]} scale={pop(t, 1.15)} wave={1} mood="happy" lookAt={LENS} />
          <Folk kind="skeleton" n={1} position={[-1.65, 0, -2.7]} scale={pop(t, 1.3)} wave={1} mood="happy" lookAt={LENS} />
          <Folk kind="creeper" n={2} position={[-5.0, 0, -3.9]} scale={pop(t, 1.45)} mood="happy" lookAt={LENS} />
          <Folk kind="zombie" n={4} position={[-2.0, 0, -4.0]} scale={pop(t, 1.6)} mood="happy" lookAt={LENS} />
          <Folk kind="enderman" n={1} position={[-4.4, 0, -4.3]} scale={pop(t, 1.75)} lookAt={LENS} />
          <Folk kind="skeleton" n={3} position={[-2.7, 0, -4.4]} scale={pop(t, 1.9)} mood="happy" lookAt={LENS} />
        </>
      ),
    },
    {
      cue: "1.mum",
      ...cam.push({ on: monsterFace("zombie", MUM), dist: 2.9, to: 2.3, yaw: 12, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Mum: a zombie with a bow and a pink scarf. She leans down and waves at us.",
      stage: (t) => <Mum position={MUM} rotationY={0.2} wave={1} mood="happy" lean={0.18 * ease(ramp(t, 0, 0.4))} tilt={jolt(t, 0.3, 0.5)} lookAt={LENS} />,
    },
    {
      cue: "1.dad",
      ...cam.push({ on: monsterFace("skeleton", DAD), dist: 2.9, to: 2.3, yaw: -12, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Dad: a skeleton in a blue scarf. He rattles when he waves.",
      stage: (t) => <Dad position={DAD} rotationY={-0.2} wave={1} rattle={0.6 + 0.4 * Math.sin(t * 9)} mood="happy" tilt={jolt(t, 0.35, 0.6)} lookAt={LENS} />,
    },
    {
      cue: "1.me",
      ...cam.push({ on: [-3.5, 0.45, -1.0], dist: 3.6, to: 2.6, yaw: 0, pitch: 28, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "The basket, years ago: it drops onto the ground between them, the baby in yellow in it, and the two of them bend over it.",
      impacts: [{ at: 0.42, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const y = t < 0.4 ? 2.2 * (1 - (t / 0.4) ** 2) : Math.abs(Math.sin((t - 0.4) * 11)) * 0.12 * Math.exp(-(t - 0.4) * 6);
        const bend = 0.45 * ease(ramp(t, 0.45, 0.9));
        return (
          <>
            <Basket position={[-3.5, y, -1.0]} rotationY={0.15 + jolt(t, 0.4, 0.3)} baby />
            <Mum position={[-4.25, 0, -1.2]} rotationY={1.1} lean={bend} nod={0.5 * bend} mood="happy" />
            <Dad position={[-2.75, 0, -1.2]} rotationY={-1.1} lean={bend} nod={0.5 * bend} mood="happy" rattle={jolt(t, 0.42, 3)} />
          </>
        );
      },
    },
    {
      cue: "2.hiss",
      ...cam.push({ on: [-3.9, 1.05, -2.5], dist: 5.6, to: 5.0, yaw: 52, pitch: 6, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Hiss comes down the hall for a hug, beaming. On 'hugs' the family jump back out of reach, one after another. On 'nobody' he stops and droops.",
      stage: (t) => {
        const hug = wordAt("2.hiss", "hugs");
        const no = wordAt("2.hiss", "Nobody");
        const go = ease(ramp(t, 0.1, hug + 0.25));
        const x = -7.2 + 3.0 * go;
        const flee = (at: number) => ease(ramp(t, at, at + 0.3));
        return (
          <>
            <Hiss position={[x, 0, -2.5]} rotationY={Math.PI / 2} walk={3.0 * go} mood={t > no ? "sad" : "happy"} lean={t > no ? 0.2 * ease(ramp(t, no, no + 0.3)) : -0.06} />
            <Mum position={[-3.3 + 1.5 * flee(hug - 0.1), hop(t, hug - 0.1, 0.35, 0.3), -2.0]} rotationY={-Math.PI / 2} mood="scared" walk={flee(hug - 0.1)} />
            <Dad position={[-2.8 + 1.7 * flee(hug), hop(t, hug, 0.4, 0.3), -3.1]} rotationY={-Math.PI / 2} mood="scared" rattle={flee(hug)} />
            <Hero position={[-3.0 + 1.6 * flee(hug + 0.1), hop(t, hug + 0.1, 0.3, 0.3), -1.4]} rotationY={-Math.PI / 2} animation={t > hug ? "scared" : "idle"} face={t > hug ? "fear" : "smile"} />
          </>
        );
      },
    },
    {
      cue: "2.post",
      ...cam.push({ on: monsterFace("enderman", [-3.5, 0, -1.6]), dist: 4.6, to: 3.2, yaw: -8, pitch: -14, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "From down low: the postman strides at us with a parcel, three metres of him. On 'look' he snaps his head down at the lens, jaw open, shaking.",
      impacts: [{ at: 1.7, amp: 0.05, dur: 0.4 }],
      stage: (t) => {
        const look = wordAt("2.post", "look");
        const go = ease(ramp(t, 0, look));
        const mad = ramp(t, look, look + 0.15);
        return (
          <Postman position={[-3.5, 0, -3.9 + 2.3 * go]} walk={2.3 * go} carry={1} jaw={mad} shake={mad} nod={0.5 * mad} mood={mad > 0 ? "angry" : "calm"}>
            <Parcel />
          </Postman>
        );
      },
    },
    {
      cue: "2.sign",
      ...cam.push({ on: [-3.3, 1.15, -1.9], dist: 5.0, to: 4.4, yaw: 28, pitch: 5, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "The family in a queue in front of him, every head turned away, eyes shut, each scribbling blind. The boy signs the postman's leg.",
      stage: (t) => {
        const scribble = Math.sin(t * 22) * 0.06;
        return (
          <>
            <Postman position={[-5.0, 0, -2.0]} rotationY={Math.PI / 2} carry={1} nod={0.35}>
              <Parcel />
            </Postman>
            <Hero position={[-4.15 + scribble * 0.5, 0, -1.5]} rotationY={-Math.PI / 2} animation="reach" face="calm" headYaw={-1.1} />
            <Mum position={[-3.2, 0, -2.2]} rotationY={-Math.PI / 2} arms={1} turn={-1.1} mood="scared" lean={0.1 + scribble} />
            <Dad position={[-2.4, 0, -2.6]} rotationY={-Math.PI / 2} wave={0.5 + scribble * 3} turn={-1.2} mood="scared" rattle={0.5} />
            <Block position={[-4.62, 0.62 + scribble, -1.62]} size={[0.035, 0.035, 0.26]} color="#2a2a2a" castShadow={false} />
          </>
        );
      },
    },
    {
      cue: "2.bus",
      ...cam.push({ on: [-5.0, 1.0, -2.4], dist: 6.0, to: 5.4, yaw: 24, pitch: 7, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "The bus is a slime as big as a shed. On 'in' he runs and jumps into its side and it swallows him. On 'out' it spits him back, and he lands soaked.",
      impacts: [{ at: 2.0, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const inn = wordAt("2.bus", "in");
        const out = wordAt("2.bus", "out");
        const BUS: Vec3 = [-6.2, 0, -2.4];
        const run = ease(ramp(t, inn - 0.45, inn));
        const spit = ramp(t, out, out + 0.4);
        const inside = t >= inn && t < out;
        const x = t < out ? -3.3 - 2.3 * run : -5.6 + 2.6 * (1 - (1 - spit) ** 2);
        const y = t < out ? hop(t, inn - 0.3, 0.7, 0.3) : 0.9 * 4 * spit * (1 - spit) + 0.5 * (1 - spit);
        const gulp = t >= inn ? Math.sin((t - inn) * 16) * Math.exp(-(t - inn) * 4) * 0.25 : 0;
        const burp = t >= out ? Math.sin((t - out) * 18) * Math.exp(-(t - out) * 5) * 0.3 : 0;
        return (
          <>
            <Bus position={BUS} rotationY={Math.PI / 2} squash={gulp - burp} mood={inside ? "happy" : "calm"} />
            {inside ? null : (
              <Hero position={[x, y, -2.4]} rotationY={t < out ? -Math.PI / 2 : Math.PI / 2} animation={t < inn ? "run" : spit < 1 ? "fall" : "shrug"} animDistance={2.3 * run} face={t < inn ? "grin" : "ouch"} />
            )}
            <Bits position={[-5.3, 1.0, -2.4]} t={t - inn} color="#8fe07a" count={10} power={2.4} />
            <Bits position={[-5.3, 1.0, -2.4]} t={t - out} color="#8fe07a" count={16} power={3.6} toward={[1, 0.4, 0.3]} />
            {t > out + 0.4 ? <Puffs position={[-3.0, 0.9, -2.4]} color="#8fe07a" count={5} rise={-0.7} spread={0.25} size={0.07} speed={1.4} opacity={0.9} /> : null}
          </>
        );
      },
    },
    {
      cue: "2.school",
      ...cam.push({ on: [CL[0], 1.05, CL[2] + 0.7], dist: 7.5, to: 6.7, yaw: 180, pitch: 12, fov: 42 }),
      zone: "class+classS+day",
      look: DAY,
      note: "The classroom from the board: six desks. He is in the middle of the front row in yellow. On 'zombies' three zombie kids wave. On 'creepers' the two creepers swell and hiss hello, and he leans away.",
      stage: (t) => {
        const zom = wordAt("2.school", "zombies");
        const cre = wordAt("2.school", "creepers");
        const fuse = t > cre ? 0.55 * Math.exp(-(t - cre) * 2.2) * (0.6 + 0.4 * Math.sin((t - cre) * 30)) : 0;
        return (
          <>
            <Hero position={[CL[0], hop(t, 0.05, 0.2, 0.3), CL[2]]} rotationY={NORTH} animation={t < cre ? "wave" : "idle"} face={t > cre ? "fear" : "grin"} headYaw={t > cre ? -0.5 * ease(ramp(t, cre, cre + 0.2)) : 0} gaze={0} />
            {SEATS.map(([kind, sx, sz, n], i) => (
              <Folk
                key={i}
                kind={kind}
                n={n}
                position={[CL[0] + sx, kind === "zombie" ? hop(t, zom + i * 0.07, 0.22, 0.3) : 0, CL[2] + sz]}
                rotationY={NORTH}
                scale={(sz > 0 ? 0.82 : 0.76) * (kind === "creeper" ? 1 + 0.12 * fuse : 1)}
                wave={kind === "zombie" && t > zom ? 1 : 0}
                fuse={kind === "creeper" ? fuse : 0}
                mood="happy"
                lookAt={[CL[0], 1.6, CL[2] - 7]}
              />
            ))}
            {t > cre && t < cre + 0.9 ? <Puffs position={[CL[0] - 0.5, 1.2, CL[2] + 0.2]} color="#e8ffe0" count={6} rise={0.8} spread={0.5} size={0.08} speed={1.4} opacity={0.7} /> : null}
          </>
        );
      },
    },
    {
      cue: "2.board",
      ...cam.push({ on: [CL[0] + 0.1, 1.75, CL[2] - 1.3], dist: 7.8, to: 7.0, yaw: 0, pitch: 7, fov: 42 }),
      zone: "class+classN+day",
      look: DAY,
      note: "From the back of the class: the board says LOOK HERE and the teacher, an enderman, turns round from it. Every head in the room snaps away to the side. He peeks; the teacher's jaw drops; he ducks.",
      impacts: [{ at: 2.46, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const turn = wordAt("2.board", "enderman") - 0.15;
        const k = ease(ramp(t, turn, turn + 0.3));
        const peek = wordAt("2.board", "looked");
        const caught = peek + 0.3;
        const pk = ease(ramp(t, peek - 0.1, peek + 0.1)) * (1 - ease(ramp(t, caught, caught + 0.12)));
        return (
          <>
            <Folk kind="enderman" n={0} position={[CL[0] + 1.3, 0, CL[2] - 2.5]} rotationY={NORTH * (1 - k)} jaw={t > caught ? 1 : 0} shake={t > caught ? 1 : 0} />
            <Hero position={[CL[0], hop(t, caught, 0.25, 0.25), CL[2]]} rotationY={NORTH} animation="idle" face={t > caught ? "fear" : "uneasy"} headYaw={-1.3 * k * (1 - pk)} headPitch={t > caught ? 0.7 : 0.1} gaze={0} />
            {SEATS.map(([kind, sx, sz, n], i) => (
              <Folk key={i} kind={kind} n={n} position={[CL[0] + sx, 0, CL[2] + sz]} rotationY={NORTH} scale={sz > 0 ? 0.82 : 0.76} turn={(sx < 0 || (sx === 0 && sz > 0) ? 1.35 : -1.35) * k} nod={0.25 * k} mood={k > 0.5 ? "scared" : "calm"} />
            ))}
          </>
        );
      },
    },
  ],
});
