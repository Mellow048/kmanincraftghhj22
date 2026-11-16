import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Book, Bubble, Count, Emerald, Me, MyRoom, PLACE, Puffs, SOUTH, Stranger, WEST, hop, pop, posed, timing, tw, w } from "./kit";

/** 04 — The desk: put down, broken, put back, forty-one times, and then "Mending!". */
const DESK = PLACE.desk;
const BEHIND: Vec3 = [DESK[0], 0, DESK[2] - 0.8];
const HIM: Vec3 = [-0.2, 0, 0.75];
const swing = (t: number, at: number) => Math.sin(tw(t, at - 0.14, at + 0.1) * Math.PI);

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The desk",
  shots: [
    {
      cue: "4.desk",
      ...cam.push({ on: [-0.8, 1.15, 0.0], dist: 5.4, to: 5.0, yaw: 8, pitch: 14, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "The stranger puts a desk down in the villager's room, right in front of him. The second it lands, a red cap appears on the villager's head.",
      stage: (t) => {
        const at = 0.3;
        return (
          <>
            <MyRoom door="flat" desk={pop(t, at, 0.16)} />
            {t > at && t < at + 0.4 ? <Puffs position={[DESK[0], 0.3, DESK[2]]} count={6} spread={0.7} size={0.24} rise={0.6} speed={2} color="#e9d9c0" /> : null}
            <Me position={BEHIND} rotationY={SOUTH} cap={t > at + 0.12} nod={t > at ? 0.2 : 0} />
            <Stranger position={HIM} rotationY={WEST - 0.5} face="smile" pose={posed("idle", t, { armR: [-1.3 + swing(t, at) * 0.7, 0, 0] })} />
          </>
        );
      },
    },
    {
      cue: "4.broke",
      ...cam.push({ on: [-0.8, 1.1, 0.0], dist: 5.0, to: 4.6, yaw: 8, pitch: 10, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "He breaks it: the desk is gone, and so is the cap. He puts it back: desk, cap. He breaks it again. The villager's head goes down to where the desk was, and up, and down.",
      stage: (t) => {
        const a = w("4.broke", "broke") - 0.05;
        const b = w("4.broke", "put") - 0.05;
        const c = w("4.broke", "broke", 0, 1) - 0.05;
        const there = t < a || (t > b && t < c);
        const last = t > c ? c : t > b ? b : a;
        return (
          <>
            <MyRoom door="flat" desk={there ? 1 : 0} />
            {!there && t - last < 0.5 ? <Bits position={[DESK[0], 0.6, DESK[2]]} t={t - last} color="#a37a44" count={8} power={1.6} /> : null}
            <Me position={BEHIND} rotationY={SOUTH} cap={there} nod={0.4} />
            <Stranger position={HIM} rotationY={WEST - 0.5} face="neutral" pose={posed("idle", t, { armR: [-1.3 + (swing(t, a) + swing(t, b) + swing(t, c)) * 0.8, 0, 0] })} />
          </>
        );
      },
    },
    {
      cue: "4.times",
      ...cam.push({ on: [-0.95, 1.35, -0.1], dist: 5.0, to: 4.7, yaw: 8, pitch: 8, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "Faster and faster: desk, no desk, desk, no desk, the cap blinking on and off with it, and a number over the villager's head running up to 41.",
      stage: (t, { dur: len }) => {
        const n = Math.min(41, Math.floor(1 + (t / Math.max(0.2, len - 0.15)) * 41));
        const there = Math.floor(t * 18) % 2 === 0;
        return (
          <>
            <MyRoom door="flat" desk={there ? 1 : 0} />
            <Me position={BEHIND} rotationY={SOUTH} cap={there} nod={0.3} />
            <Stranger position={HIM} rotationY={WEST - 0.5} face="frown" pose={posed("idle", t, { armR: [-1.3 + Math.sin(t * 56) * 0.6, 0, 0] })} />
            <Count position={[BEHIND[0] + 0.1, 2.5, BEHIND[2]]} text={String(n)} scale={1 + 0.15 * Math.sin(t * 40)} rotationY={0.14} />
          </>
        );
      },
    },
    {
      cue: "4.sadder",
      ...cam.push({ on: [HIM[0], 1.58, HIM[2]], dist: 3.6, to: 3.0, yaw: -24, pitch: 2, fov: 40 }),
      zone: "room",
      look: "overworld-day",
      note: "The stranger's face, close, looking at the villager off screen. He is not angry. He is let down, and he gets more let down while we watch.",
      stage: (t, { dur: len }) => (
        <>
          <MyRoom door="flat" desk={1} />
          <Stranger position={HIM} rotationY={-0.5} face={t < len * 0.4 ? "frown" : t < len * 0.75 ? "sad" : "crying"} gaze={0} headPitch={0.1 + 0.2 * tw(t, 0.3, len)} animation="idle" />
        </>
      ),
    },
    {
      cue: "4.mending",
      ...cam.push({ on: [-0.75, 1.45, 0.1], dist: 6.3, to: 5.9, yaw: 6, pitch: 9, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "He jumps off the floor with both arms up: MENDING! Then green stones come out of him in a stream and pile up on the villager's sleeves. The villager looks at the pile.",
      stage: (t) => {
        const yell = w("4.mending", "Mending") - 0.1;
        const give = w("4.mending", "gave") - 0.05;
        return (
          <>
            <MyRoom door="flat" desk={1} />
            <Me
              position={BEHIND}
              rotationY={SOUTH}
              nod={t > give ? 0.5 : 0}
              carry={
                <>
                  {Array.from({ length: 6 }, (_, i) => (t > give + 0.25 + i * 0.07 ? <Emerald key={i} position={[-0.17 + (i % 3) * 0.17, 0.07 + (i > 2 ? 0.1 : 0), 0.02]} scale={0.55} /> : null))}
                </>
              }
            />
            <Stranger position={[HIM[0], hop(t, yell, 0.35, 0.4), HIM[2]]} rotationY={WEST - 0.5} face={t > yell ? "laugh" : "sad"} pose={t > yell && t < give ? posed("idle", t, { armR: [-2.9, 0, -0.3], armL: [-2.9, 0, 0.3] }) : posed("idle", t, { armR: [t > give ? -1.4 : 0, 0, 0] })} />
            <Bubble text="MENDING!" position={[-0.8, 2.5, 1.2]} scale={0.62 * pop(t, yell, 0.14) * (t > give + 0.3 ? 0 : 1)} tail={1} tilt={Math.sin(t * 40) * 0.03} />
            {Array.from({ length: 6 }, (_, i) => {
              const k = tw(t, give + i * 0.07, give + 0.25 + i * 0.07);
              return k > 0 && k < 1 ? <Emerald key={i} position={[HIM[0] + (BEHIND[0] - HIM[0]) * k, 1.2 + Math.sin(k * Math.PI) * 0.7, HIM[2] + (BEHIND[2] + 0.3 - HIM[2]) * k]} rotation={[0, t * 9, 0]} /> : null;
            })}
          </>
        );
      },
    },
    {
      cue: "4.hates",
      ...cam.push({ on: [DESK[0] + 0.1, 1.3, DESK[2] - 0.4], dist: 4.0, to: 3.6, yaw: 6, pitch: 5, fov: 42 }),
      zone: "room",
      look: "overworld-day",
      note: "The teller behind his desk with a heap of green stones on his sleeves, telling us what it meant. He is wrong. Behind him the stranger hops out of the door hugging a glowing book.",
      stage: (t) => (
        <>
          <MyRoom door="flat" desk={1} />
          <Me
            position={BEHIND}
            rotationY={SOUTH}
            nod={Math.sin(tw(t, 0.5, 1.1) * Math.PI) * 0.25}
            carry={
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <Emerald key={i} position={[-0.17 + (i % 3) * 0.17, 0.07 + (i > 2 ? 0.1 : 0), 0.02]} scale={0.55} />
                ))}
              </>
            }
          />
          <Stranger position={[0.05 - Math.min(t * 0.4, 0.6), Math.abs(Math.sin(t * 8)) * 0.3, -1.1 - t * 0.6]} rotationY={Math.PI + 0.5} face="grin" pose={posed("idle", t, { armR: [-2.6, 0, -0.2] })}>
            <Book glow rotation={[1.2, 0, 0]} />
          </Stranger>
        </>
      ),
    },
  ],
});
