import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, DAD_AT, Dad, Drawing, EAST, Enders, Fill, Hero, Hunter, MUM_AT, Mum, NORTH, Pearl, PearlSign, SIX, SQUARE, SOUTH, Thing, timing, tw, w } from "./kit";

/** 04 — The players come, in pumpkins. */
const N = "overworld-night" as const;

/** The whole town in the square at night: mum with the drawing and dad with his flowers in front, the rest behind. */
export const TownAtNight: React.FC<{ t: number; lookAt?: Vec3; mood?: "calm" | "happy" | "angry" | "scared"; jaw?: number; shake?: number; drop?: number; tilt?: number }> = ({ t, lookAt, mood = "calm", jaw = 0, shake = 0, drop, tilt = 0.1 }) => {
  const let_go = drop !== undefined && drop > 0;
  return (
    <>
      <Enders spots={SQUARE} t={t} face={SOUTH} lookAt={lookAt} mood={mood} jaw={jaw} shake={shake} drop={drop} tilt={jaw ? 0 : tilt} />
      <Mum position={MUM_AT} rotationY={SOUTH} lookAt={lookAt} mood={mood === "calm" ? "happy" : mood} jaw={jaw} shake={shake} carry={1}>
        <Drawing position={[0, 0.1, 0]} rotation={[-0.2, 0, 0]} scale={1.15} />
      </Mum>
      <Dad position={DAD_AT} rotationY={SOUTH} lookAt={lookAt} mood={mood} jaw={jaw} shake={shake} carry={let_go ? 0 : 1}>
        {let_go ? null : <Thing kind={8} />}
      </Dad>
      {let_go ? <Thing kind={8} position={[DAD_AT[0], Math.max(0.25, 1.25 - 19 * (drop ?? 0) * (drop ?? 0)), DAD_AT[2] + 1.15]} /> : null}
      <Fill at={[0, 4.5, 1.5]} power={jaw ? 34 : 16} reach={16} color={jaw ? "#f0dcff" : "#d9c8ff"} />
      <Fill at={[0, 3.5, -5]} power={10} reach={12} color="#c9b0ff" />
    </>
  );
};

/** The six, standing where they stop. */
export const Six: React.FC<{ t: number; on?: (i: number) => boolean; animation?: "idle" | "guard" | "scared"; face?: "fear" | "wow" | "grin"; headPitch?: number; skip?: number[] }> = ({ on = () => true, animation = "guard", face = "grin", headPitch = 0, skip = [] }) => (
  <>
    {SIX.map(([x, z], i) => (skip.includes(i) ? null : <Hunter key={i} who={i} on={on(i)} position={[x, 0, z]} rotationY={NORTH} animation={animation} face={face} headPitch={headPitch} />))}
  </>
);

const CLOSE: Array<[number, number]> = [[0.5, 1.75], [1.55, 1.85], [1.05, 2.4]];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Pumpkins",
  shots: [
    {
      cue: "4.night",
      ...cam.push({ on: [0, 1.25, 15], dist: 7.4, to: 5.2, yaw: 180, pitch: 2, fov: 48 }),
      zone: "town",
      look: N,
      note: "Night. Up the dark street towards us come six players, two by two, swords out. Every one of them has a carved pumpkin where a head should be.",
      stage: (t) => (
        <>
          {SIX.map(([x, z], i) => (
            <Hunter key={i} who={i} position={[x, 0, z + 14.6 - t * 1.3]} rotationY={NORTH} animation="walk" />
          ))}
          <Fill at={[0, 3.2, 14.5 - t * 1.3]} power={18} reach={13} />
        </>
      ),
    },
    {
      cue: "4.six",
      ...cam.push({ on: [0, 0.95, 3.3], onTo: [0, 1.6, 3.3], dist: 3.9, to: 3.4, yaw: 172, pitch: -2, fov: 46 }),
      zone: "town",
      look: N,
      note: "Close on the front two, from the swords in their hands up to the pumpkins: carved eyes, a carved grin, and nothing to see behind them.",
      stage: (t) => (
        <>
          <Six t={t} />
          <Fill at={[0, 2.2, 0.8]} power={12} reach={9} />
        </>
      ),
    },
    {
      cue: "4.pearls",
      ...cam.push({ on: [0, 2.0, 0], dist: 10.6, to: 9.4, yaw: 0, pitch: 7, fov: 48 }),
      zone: "town",
      look: N,
      note: "From behind the six: the front one holds up a board with an ender pearl on it. Past them stands the whole town, holding its blocks; on the second 'pearls' a little pearl pops up over every enderman's head.",
      stage: (t) => {
        const a = w("4.pearls", "pearls") - 0.3;
        const b = w("4.pearls", "pearls", 0, 1) - 0.15;
        return (
          <>
            <TownAtNight t={t} />
            <Six t={t} />
            <PearlSign position={[-0.55, 2.65, 3.3]} scale={tw(t, a, a + 0.2) * 1.5} />
            {[...SQUARE.slice(0, 9), [MUM_AT[0], MUM_AT[2]], [DAD_AT[0], DAD_AT[2]]].map(([x, z], i) => (
              <Pearl key={i} position={[x as number, 3.45, z as number]} scale={tw(t, b + i * 0.05, b + i * 0.05 + 0.15) * 1.25} />
            ))}
            <Fill at={[0, 3, 6.5]} power={10} reach={9} />
          </>
        );
      },
    },
    {
      cue: "4.stare",
      ...cam.push({ on: [1.0, 1.85, 1.0], dist: 6.2, to: 5.5, yaw: 38, pitch: 0, fov: 46 }),
      zone: "town",
      look: N,
      note: "Three of them stand right under dad and stare straight up into his face. He looks down at three pumpkins, holding his flowers, and tips his head. A question mark comes up over him.",
      stage: (t) => {
        const q = w("4.stare", "did") - 0.1;
        return (
          <>
            <TownAtNight t={t} />
            {CLOSE.map(([x, z], i) => (
              <Hunter key={i} who={i} position={[x, 0, z]} rotationY={NORTH} animation="idle" headPitch={-0.62} />
            ))}
            <Bubble text="?" position={[1.0, 3.5, 0.3]} rotationY={0.66} scale={tw(t, q, q + 0.2) * 0.85} />
            <Fill at={[3.2, 2.6, 3.6]} power={14} reach={9} />
          </>
        );
      },
    },
    {
      cue: "4.trick",
      ...cam.push({ on: [-2.3, 1.0, 8.5], dist: 3.3, to: 2.6, yaw: 160, pitch: 3, fov: 42 }),
      zone: "town",
      look: N,
      note: "Behind them, at the corner of a heap of blocks: the kid peeks out, eyes wide. He has seen how it is done.",
      stage: () => (
        <>
          <Hero position={[-2.3, 0, 8.5]} rotationY={NORTH + 0.2} animation="peek" face="wow" />
          <Fill at={[-1.4, 2, 6.2]} power={10} reach={8} />
        </>
      ),
    },
    {
      cue: "4.pumpkin",
      ...cam.push({ on: [1.02, 1.6, 2.05], dist: 2.9, to: 1.9, yaw: 180, pitch: 30, fov: 40 }),
      zone: "town",
      look: N,
      note: "What dad sees when he looks down: three pumpkins tipped up at him. Carved eyes. No real ones. We push in on the nearest until its two black holes fill the picture.",
      stage: () => (
        <>
          {CLOSE.map(([x, z], i) => (
            <Hunter key={i} who={i} position={[x, 0, z]} rotationY={NORTH} animation="idle" headPitch={-0.62} />
          ))}
          <Fill at={[1, 3, 0.4]} power={12} reach={8} />
        </>
      ),
    },
    {
      cue: "4.stood",
      ...cam.push({ on: [0, 1.9, -2.3], dist: 11.6, to: 10, yaw: 0, pitch: 12, fov: 50 }),
      zone: "town",
      look: N,
      note: "Over the players' shoulders: the whole town in the square, each with a block or a flower pot in its arms, heads tipped, not one of them worried.",
      stage: (t) => (
        <>
          <TownAtNight t={t} tilt={0.16} />
          <Six t={t} />
          <Fill at={[0, 3, 6.5]} power={10} reach={9} />
        </>
      ),
    },
    {
      cue: "4.hunted",
      ...cam.push({ on: [-0.8, 2.0, -0.2], dist: 4.9, to: 4.2, yaw: -22, pitch: -8, fov: 44 }),
      zone: "town",
      look: N,
      note: "Low, behind one player: he lifts his sword over his head. In front of him mum stands smiling with the drawing in her arms, and has no idea.",
      stage: (t) => (
        <>
          <TownAtNight t={t} />
          <Hunter who={2} position={[-0.55, 0, 1.5]} rotationY={NORTH - 0.1} animation="reachUp" />
          <Fill at={[-2.5, 2, 3]} power={9} reach={8} />
        </>
      ),
    },
  ],
});
