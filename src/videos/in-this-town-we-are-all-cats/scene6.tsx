import { cam, storyScene } from "../../engine";
import { Bone, EAST, Fish, Folk, GOLEM_Z, Guard, Hero, KID, LineBlock, Mixed, Pal, Pup, SOUTH, SubscribeSign, WEST, posed, timing, tw, w } from "./kit";

/** 06 — Weird, then less weird, then one village. */
const FOR = w("7.trade", "for") - 0.1;
const SPOT: [number, number, number] = [1.4, 0, -5.2];
const LENS: [number, number, number] = [0, 1.5, 12];
/** Where their two heads meet, on the block. They lie in a V: feet apart, heads together. */
const HEADS: [number, number, number] = [SPOT[0], 0, SPOT[2] - 0.6];
/** The engine's "sleep" lies at the height of a bed: this much lower is the grass. */
const FLOOR = -0.31;
/** Asleep on the back with the shoulders up on the block: the head end is raised and the legs stay on the grass. */
const propped = (t: number, side: number) => posed("sleep", t, { bodyPitch: -Math.PI / 2 + 0.3, legR: [-0.3, 0, 0.04], legL: [-0.3, 0, -0.04], head: [0.25, side * 0.2, side * 0.08] });
const Nap = ({ t, open = 0 }: { t: number; open?: number }) => (
  <>
    <LineBlock position={[HEADS[0], 0.08, HEADS[2] - 0.27]} />
    <Hero position={[HEADS[0] - 0.52, FLOOR, HEADS[2] + 0.6]} rotationY={-0.5} pose={propped(t, -1)} face={open > 0.5 ? "smile" : "sleepy"} noTail />
    <Pup position={[HEADS[0] + 0.52, FLOOR, HEADS[2] + 0.6]} rotationY={0.5} pose={propped(t + 1.4, 1)} face="sleepy" noTail />
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "No sides",
  shots: [
    {
      cue: "7.still",
      ...cam.orbit({ on: [0, 1.2, 6.3], dist: 4.5, yaw: 126, yawTo: 148, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The next day, in the middle: a cat villager and a dog villager bow to each other at the same moment and knock heads.",
      stage: (t) => {
        const bow = tw(t, 0.45, 0.8) - tw(t, 0.82, 1.0) * 1.25;
        return (
          <>
            <Folk kind="cat" who={2} position={[-0.62, 0, 6.3]} rotationY={EAST} lean={0.55 * bow} tailUp={0.5} />
            <Folk kind="dog" who={3} position={[0.62, 0, 6.3]} rotationY={WEST} lean={0.55 * bow} wag={0.3} />
            <Pal kind="cat" who={1} position={[-3.2, 0, 8.4]} rotationY={EAST} animation="idle" lookAt={[0, 1.3, 6.3]} face="uneasy" />
            <Pal kind="dog" who={2} position={[3.1, 0, 4.4]} rotationY={WEST} animation="idle" lookAt={[0, 1.3, 6.3]} face="uneasy" wag={0.1} />
          </>
        );
      },
    },
    {
      cue: "7.time",
      ...cam.truck({ on: [0, 1.2, 9.5], dist: 5.2, yaw: 12, pitch: 7, fov: 44, by: [0, 0, -5] }),
      zone: "village",
      look: "overworld-day",
      note: "Moving up the middle where the line was: cats crossing one way and dogs the other, passing close, a nod here, a tail wagging there.",
      stage: (t) => (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const cat = i % 2 === 0;
            const dir = cat ? 1 : -1;
            const z = 10.5 - i * 1.5;
            const s = t * 1.3;
            const x = -dir * (2.4 + (i % 3) * 0.6) + dir * s;
            return i % 4 === 1 || i % 4 === 2 ? (
              <Folk key={i} kind={cat ? "cat" : "dog"} who={i} position={[x, 0, z]} rotationY={cat ? EAST : WEST} walk={s + i} nod={Math.max(0, Math.sin(t * 3 + i)) * 0.3} wag={1} tailUp={0.8} />
            ) : (
              <Pal key={i} kind={cat ? "cat" : "dog"} who={1 + i} scale={i === 4 ? KID : 1} position={[x, 0, z]} rotationY={cat ? EAST : WEST} animation="walk" animDistance={s + i} face="smile" wag={1} tailUp={0.8} />
            );
          })}
        </>
      ),
    },
    {
      cue: "7.trade",
      ...cam.push({ on: [0, 1.1, 12], dist: 4.7, to: 4.0, yaw: 12, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Two villagers, sleeves to sleeves: the dog has a bone and the cat a fish, they lean in, and on the word the bone and the fish have changed sleeves.",
      stage: (t) => {
        const lean = tw(t, FOR - 0.35, FOR) - tw(t, FOR + 0.15, FOR + 0.5);
        const done = t > FOR;
        return (
          <>
            <Folk kind="dog" who={1} position={[0.62, 0, 12]} rotationY={WEST} lean={0.3 * lean} wag={done ? 1 : 0.3} carry={done ? <Fish /> : <Bone />} />
            <Folk kind="cat" who={3} position={[-0.62, 0, 12]} rotationY={EAST} lean={0.3 * lean} tailUp={done ? 1 : 0.4} carry={done ? <Bone /> : <Fish />} />
          </>
        );
      },
    },
    {
      cue: "7.sit",
      ...cam.push({ on: [0, 1.2, GOLEM_Z + 0.4], dist: 6.2, to: 5.4, yaw: 7, pitch: -3, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "The two golems, side by side now and facing us, sit down at the same time with their legs straight out. The grass is still on their feet.",
      stage: (t) => {
        const sit = tw(t, 0.2, 0.62);
        return (
          <>
            <Guard kind="cat" position={[-0.95, 0, GOLEM_Z]} rotationY={0.12} sit={sit} grass={sit > 0.2 ? 0 : 1} tailUp={0.6} headYaw={0.4 * sit} />
            <Guard kind="dog" position={[0.95, 0, GOLEM_Z]} rotationY={-0.12} sit={sit} grass={sit > 0.2 ? 0 : 1} wag={sit} headYaw={-0.4 * sit} />
          </>
        );
      },
    },
    {
      cue: "7.nap",
      ...cam.orbit({ on: [HEADS[0], 0.2, HEADS[2] + 0.35], dist: 4.0, yaw: 18, yawTo: 42, pitch: 52, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "From above, the patch of sun beside the well: the teller and the dog kid lie in it side by side, asleep, their heads on one white block.",
      stage: (t) => <Nap t={t} />,
    },
    {
      cue: "7.noline",
      ...cam.push({ on: [0, 0, -1], dist: 31, to: 37, yaw: 0, pitch: 35, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "The same high view as the one that showed the two sides, pulling back: no line, and cats and dogs standing anywhere they like.",
      stage: (t) => (
        <>
          <Mixed t={t} spread={1.25} />
          <Guard kind="cat" position={[-0.95, 0, GOLEM_Z]} rotationY={0.12} sit={1} />
          <Guard kind="dog" position={[0.95, 0, GOLEM_Z]} rotationY={-0.12} sit={1} wag={1} />
        </>
      ),
    },
    {
      cue: "7.safe",
      ...cam.push({ on: [0, 1.05, 9.4], dist: 4.9, to: 4.0, yaw: -6, pitch: 2, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "On the ground among them: the teller and the dog kid in front, waving, and a crowd of both kinds behind them hopping and wagging.",
      stage: (t) => (
        <>
          <Hero position={[-0.42, 0, 9.4]} rotationY={SOUTH} animation="wave" face="laugh" tailUp={1} />
          <Pup position={[0.42, 0, 9.4]} rotationY={SOUTH} animation="cheer" face="laugh" wag={1} />
          <Mixed t={t} cheer={1} lookAt={LENS} skip={[2, 3, 14, 15]} />
        </>
      ),
    },
    {
      cue: "7.block",
      ...cam.top({ on: [HEADS[0], 0.2, HEADS[2] + 0.22], height: 3.4, to: 2.5, spin: [-8, 4], fov: 40 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Straight down and close, in the evening sun: the last block of the line, and two heads on it. He opens his eyes, smiles, and shuts them again.",
      stage: (t) => <Nap t={t} open={tw(t, 1.0, 1.2) - tw(t, 2.2, 2.4)} />,
    },
    {
      cue: "8.sub",
      ...cam.push({ on: [0, 1.7, 6], dist: 7.4, to: 6.2, yaw: 0, pitch: 0, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Everybody, facing us: the two golems hold the subscribe sign up between them, and in front the teller and the dog kid jump with both villages.",
      stage: (t) => {
        const hop = Math.abs(Math.sin(t * 7)) * 0.2;
        return (
          <>
            <Guard kind="cat" position={[-1.75, 0, 5]} rotationY={0.1} armR={-2.9} armL={-0.2} tailUp={1} />
            <Guard kind="dog" position={[1.75, 0, 5]} rotationY={-0.1} armL={-2.9} armR={-0.2} wag={1} />
            <SubscribeSign position={[0, 3.55, 5.1]} scale={1.15} tilt={Math.sin(t * 3) * 0.04} />
            <Hero position={[-0.5, hop, 8.2]} rotationY={SOUTH} animation="cheer" face="laugh" tailUp={1} />
            <Pup position={[0.5, Math.abs(Math.sin(t * 7 + 1)) * 0.2, 8.2]} rotationY={SOUTH} animation="cheer" face="laugh" wag={1} />
            <Mixed t={t} cheer={1} lookAt={LENS} skip={[0, 1, 2, 3, 14, 15]} />
          </>
        );
      },
    },
  ],
});
