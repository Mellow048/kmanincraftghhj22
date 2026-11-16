import { cam, storyScene } from "../../engine";
import { Enders, Fill, Hero, Hunter, Knocked, NORTH, PumpkinView, SIX, SOUTH, SoundRings, Zap, hop, timing, tw, w } from "./kit";
import { Six, TownAtNight } from "./scene4";

/** 05 — He knocks the pumpkins off. */
const N = "overworld-night" as const;
/** The order he knocks them off in: the back row first. */
const ORDER = [4, 5, 2, 3, 0, 1];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "All six",
  shots: [
    {
      cue: "5.small",
      ...cam.push({ on: [0.03, 1.0, 8.8], dist: 7.0, to: 6.2, yaw: 180, pitch: 1, fov: 44 }),
      zone: "town",
      look: N,
      note: "Between two players with swords, who fill both sides of the picture: far behind them, tiny, the kid steps out into the street. He puts up two small fists, looks at them, and lets them drop.",
      stage: (t) => {
        const a = w("5.small", "cannot");
        return (
          <>
            <Hunter who={4} position={[-0.56, 0, 4.7]} rotationY={NORTH} animation="guard" />
            <Hunter who={5} position={[0.6, 0, 4.85]} rotationY={NORTH} animation="guard" />
            <Hero position={[0.03, 0, 8.8]} rotationY={NORTH} animation={t < a ? "guard" : "idle"} face={t < a ? "brave" : "uneasy"} headPitch={t < a ? 0 : 0.4} />
            <Fill at={[0, 2.4, 7]} power={12} reach={8} />
            <Fill at={[0, 2.4, 2.6]} power={8} reach={6} />
          </>
        );
      },
    },
    {
      cue: "5.holes",
      ...cam.push({ on: [0, 2.3, -4.3], dist: 5.9, to: 5.9, yaw: 0, pitch: 0, fov: 46 }),
      zone: "town",
      look: N,
      note: "From inside a pumpkin: the whole picture is dark except two small holes, and in them a little of the town. The holes slide left and right as the head turns. That is all a player can see.",
      stage: (t) => (
        <>
          <PumpkinView camera={[0, 2.3, 1.6]} fov={46} sway={Math.sin(t * 2.6) * 0.03} />
          <TownAtNight t={t} />
          <Fill at={[0, 3.4, -0.2]} power={30} reach={14} color="#f0e4ff" />
        </>
      ),
    },
    {
      cue: "5.kid",
      ...cam.push({ on: [0, 1.0, 5.2], dist: 6.3, to: 5.5, yaw: 0, pitch: 9, fov: 46 }),
      zone: "town",
      look: N,
      note: "From behind the six, who all face the town: at the bottom of the picture the kid tiptoes up behind the back row. Nobody turns.",
      stage: (t) => (
        <>
          <TownAtNight t={t} />
          <Six t={t} />
          <Hero position={[-0.5, 0, 8.6 - t * 1.2]} rotationY={NORTH} animation="creep" />
          <Fill at={[0, 3, 7.5]} power={12} reach={9} />
        </>
      ),
    },
    {
      cue: "5.ran",
      ...cam.push({ on: [-0.9, 1.35, 5.5], dist: 5.3, to: 4.6, yaw: -82, pitch: 3, fov: 46 }),
      zone: "town",
      look: N,
      note: "Side on: he runs at the back of the last player, jumps as high as he can and swats. On 'knocked' the pumpkin flies off the head and tumbles away, and there is a very surprised face under it.",
      stage: (t) => {
        const tk = w("5.ran", "knocked") - 0.05;
        const tj = tk - 0.2;
        const run = tw(t, 0, tj);
        return (
          <>
            <Hunter who={4} position={[-0.9, 0, 5.0]} rotationY={NORTH} on={t < tk} animation={t < tk ? "guard" : "scared"} face="wow" headPitch={t > tk ? 0.25 : 0} />
            <Hunter who={5} position={[1.0, 0, 5.1]} rotationY={NORTH} animation="guard" />
            <Hunter who={2} position={[-1.6, 0, 4.0]} rotationY={NORTH} animation="guard" />
            <Knocked from={[-0.9, 1.62, 5.0]} t={t - tk} v={[0.2, 2.4, -2.8]} />
            <Hero position={[-0.9, hop(t, tj, 0.85, 0.5), 7.3 - run * 1.6]} rotationY={NORTH} animation={t < tj ? "run" : "reachUp"} face="brave" />
            <Fill at={[-3.5, 2.5, 5.5]} power={14} reach={9} />
          </>
        );
      },
    },
    {
      cue: "5.count",
      ...cam.push({ on: [0, 1.5, 4.1], dist: 7.2, to: 6.3, yaw: 180, pitch: 5, fov: 50 }),
      zone: "town",
      look: N,
      note: "The six from the front. Behind them a small yellow shape hops, and a pumpkin pops off: one. It hops again: two. Then it runs along the row and the last three go one after another. Six bare, startled heads.",
      stage: (t) => {
        const at = [-1, w("5.count", "One") - 0.05, w("5.count", "Two") - 0.05, w("5.count", "All") - 0.08, w("5.count", "All") + 0.14, w("5.count", "six") + 0.02];
        const off = (i: number) => at[ORDER.indexOf(i)];
        let cur = ORDER.length - 1;
        for (let k = 1; k < ORDER.length; k++) {
          if (t < at[k] + 0.14) {
            cur = k;
            break;
          }
        }
        const [kx, kz] = SIX[ORDER[cur]];
        return (
          <>
            {SIX.map(([x, z], i) => (
              <group key={i}>
                <Hunter who={i} position={[x, 0, z]} rotationY={NORTH} on={t < off(i)} animation={t < off(i) ? "guard" : "scared"} face="wow" />
                <Knocked from={[x, 1.62, z]} t={t - off(i)} v={[x * 0.35, 2.5, -1.3 - (i % 3) * 0.35]} seed={i} />
              </group>
            ))}
            <Hero position={[kx, hop(t, at[cur] - 0.2, 0.85, 0.42), kz + 0.7]} rotationY={NORTH} animation="reachUp" face="brave" />
            <Fill at={[0, 2.6, 0.6]} power={14} reach={9} />
          </>
        );
      },
    },
    {
      cue: "5.staring",
      ...cam.push({ on: [0, 2.0, -2.3], dist: 11, to: 9.6, yaw: 0, pitch: 9, fov: 50 }),
      zone: "town",
      look: N,
      note: "Over six bare heads: every enderman in the square has stopped tipping its head. Every one of them is looking straight at the players, and they have started to shake.",
      stage: (t) => (
        <>
          <TownAtNight t={t} lookAt={[0, 1.7, 4]} mood="angry" shake={tw(t, 0.3, 1.7) * 0.55} tilt={0} />
          <Six t={t} on={() => false} animation="scared" face="fear" />
          <Fill at={[0, 3, 6.5]} power={10} reach={9} />
        </>
      ),
    },
    {
      cue: "5.heads",
      ...cam.push({ on: [0.02, 1.5, 3.2], dist: 3.7, to: 3.1, yaw: 180, pitch: -4, fov: 46 }),
      zone: "town",
      look: N,
      note: "The front two, close: no pumpkins, eyes as wide as they go, looking up at something much taller than they are.",
      stage: (t) => (
        <>
          <Six t={t} on={() => false} animation="scared" face="fear" headPitch={-0.3} />
          <Fill at={[0, 2.2, 0.8]} power={12} reach={8} />
        </>
      ),
    },
    {
      cue: "5.scream",
      ...cam.push({ on: [0, 1.95, -2.0], dist: 8.8, to: 7.6, yaw: 0, pitch: -3, fov: 50 }),
      shake: 0.035,
      zone: "town",
      look: N,
      note: "The whole town, front on, all at once: every jaw down, every one shaking, rings off every head, and every block they were holding hits the ground.",
      stage: (t) => (
        <>
          <TownAtNight t={t} lookAt={[0, 1.7, 5]} mood="angry" jaw={1} shake={1} drop={t + 0.02} />
          {[[-0.95, -0.5], [1.0, 0], [0.1, -1.9]].map(([x, z], i) => (
            <SoundRings key={i} position={[x, 2.85, z + 0.4]} t={(t + i * 0.19) % 0.7} color="#e9b8ff" reach={1.1} />
          ))}
        </>
      ),
    },
    {
      cue: "5.fast",
      ...cam.truck({ on: [0, 1.2, 8.5], dist: 6.5, yaw: 0, pitch: 5, fov: 48, by: [0, 0, 7.4] }),
      ease: "linear" as const,
      zone: "town",
      look: N,
      note: "The six come down the street straight at us, flat out, arms everywhere, swords gone. Behind them endermen pop in, and pop in again nearer, jaws down.",
      stage: (t) => {
        const step = Math.floor(t / 0.42);
        const st = t - step * 0.42;
        const z0 = 3.2 + step * 2.3;
        return (
          <>
            {SIX.map(([x, z], i) => (
              <Hunter key={i} who={i} on={false} sword={false} position={[x * 0.9, 0, z + 2.6 + t * (5.0 + (i % 3) * 0.25)]} rotationY={SOUTH} animation={i % 2 ? "panic" : "run"} face="fear" />
            ))}
            <Enders spots={[[-1.3, z0], [1.2, z0 - 0.9], [0, z0 - 2.2]]} t={t} face={SOUTH} jaw={1} shake={0.7} mood="angry" hold={false} first={3} />
            {[[-1.3, z0], [1.2, z0 - 0.9], [0, z0 - 2.2]].map(([x, z], i) => (
              <Zap key={i} position={[x, 0, z]} t={st + 0.02} seed={step * 3 + i} />
            ))}
            <Fill at={[0, 3, 9 + t * 4.4]} power={16} reach={11} />
            <Fill at={[0, 3.5, z0 + 1]} power={10} reach={9} color="#d9b8ff" />
          </>
        );
      },
    },
  ],
});
