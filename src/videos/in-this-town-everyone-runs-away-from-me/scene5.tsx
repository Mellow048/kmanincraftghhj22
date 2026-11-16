import { cam, storyScene } from "../../engine";
import { BEHIND, Bubble, Creeper, Creeps, DAD_AT, Dad, Fill, Hero, Lantern, MUM_AT, Mum, NORTH, Puffs, Raider, SIX, SOUTH, SQUARE, Sack, Shoe, Sword, bolt, timing, tw, w } from "./kit";

/** 05 — The one thing he is very, very good at. */
const WATCH: [number, number, number] = [-4.6, 0, 6.6];
/** The stampede is one move over four shots: seconds since he said it. */
const RUN = { ran: 0, through: 1.15, boom: 2.4 };

const Town: React.FC<{ t: number; since: number; fuse?: number }> = ({ t, since, fuse = 0 }) => {
  const m = bolt(MUM_AT, BEHIND, since, 0, 1, 8.5, SOUTH);
  const d = bolt(DAD_AT, BEHIND, since, 0, 2, 8.5, SOUTH);
  return (
    <>
      <Creeps spots={SQUARE} t={since} face={SOUTH} cat={BEHIND} at={0} speed={8.5} fuse={fuse} mood={fuse > 0 ? "angry" : "scared"} shake={fuse > 0 ? 0.012 : 0} />
      <Mum position={m.position} rotationY={m.rotationY} walk={m.walk} lean={m.lean} mood={m.gone ? "scared" : "angry"} fuse={m.gone ? 0 : fuse} />
      <Dad position={d.position} rotationY={d.rotationY} walk={d.walk} lean={d.lean} mood={d.gone ? "scared" : "angry"} fuse={d.gone ? 0 : fuse} />
    </>
  );
};

/** The six, as the town reaches them: each is knocked into a spin and runs for the trees. `since` as above. */
const Six: React.FC<{ since: number }> = ({ since }) => (
  <>
    {SIX.map(([x, z], i) => {
      const hit = 1.25 + i * 0.07;
      const k = Math.max(0, since - hit);
      const side = x < 0 ? -1 : 1;
      return k <= 0 ? (
        <Raider key={i} who={i} position={[x, 0, z + Math.max(0, since - 0.5) * 0.9]} rotationY={NORTH} animation={since > 0.5 ? "scared" : "idle"} arms={since > 0.5 ? undefined : "hold"} face={since > 0.3 ? "scared" : "smug"} />
      ) : (
        <Raider key={i} who={i} hand={false} position={[x + side * k * 1.6, Math.sin(Math.min(1, k / 0.45) * Math.PI) * 0.7, z + 0.6 + k * 7.5]} rotationY={NORTH + Math.min(1, k / 0.45) * Math.PI * 3} animation={k > 0.45 ? "run" : "panic"} animDistance={k * 7.5} face="scared" />
      );
    })}
  </>
);

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Hello",
  shots: [
    {
      cue: "5.small",
      ...cam.push({ on: [-3.5, 1.0, 7.6], dist: 4.4, to: 3.8, yaw: -62, pitch: -8, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "From low down: he stands by his own gate, as tall as a player's belt. Behind him two of them go by with swords and do not even look down.",
      stage: (t) => (
        <>
          <Hero position={WATCH} rotationY={SOUTH - 0.9} animation="idle" face="worried" tailUp={0.1} lookAt={[0, 1.0, 0]} />
          <Raider who={4} position={[-2.9, 0, 9.4 - t * 0.5]} rotationY={NORTH} animation="walk" animDistance={t * 0.5} arms="hold" face="smug" />
          <Raider who={2} position={[-1.6, 0, 8.6 - t * 0.5]} rotationY={NORTH} animation="walk" animDistance={t * 0.5} arms="hold" face="smug" />
          <Fill at={[-5.4, 1.6, 8.6]} power={9} reach={7} />
        </>
      ),
    },
    {
      cue: "5.good",
      ...cam.push({ on: [WATCH[0], 1.02, WATCH[2]], dist: 2.6, to: 1.7, yaw: -30, pitch: 0, fov: 36 }),
      zone: "town",
      look: "overworld-night",
      note: "Close on his face. He looks at the players, then at his town, then at his own paw. On the second 'very' a slow grin, and his tail goes straight up.",
      stage: (t) => {
        const got = t > w("5.good", "very", 0, 1);
        return (
          <>
            <Hero position={WATCH} rotationY={SOUTH - 0.5} animation="idle" arms={t > w("5.good", "one") ? "hold" : undefined} face={got ? "grin" : "neutral"} headPitch={got ? 0 : 0.25} tailUp={got ? 1 : 0.2} />
            <Fill at={[-5.2, 1.5, 8.4]} power={8} reach={6} />
          </>
        );
      },
    },
    {
      cue: "5.behind",
      ...cam.push({ on: [0, 1.0, -6.5], dist: 7.5, to: 6.2, yaw: 180, pitch: 14, fov: 48 }),
      zone: "town",
      look: "overworld-night",
      note: "From behind the town, looking south: his ears and tail walk into the frame behind thirty flashing backs. Past them, at the end of the street, the six players and their lantern. Nobody has seen him.",
      stage: (t) => (
        <>
          <Hero position={[BEHIND[0], 0, BEHIND[2] - 2.6 * (1 - tw(t, 0, 1.6))]} rotationY={SOUTH} animation={t < 1.6 ? "creep" : "idle"} animDistance={t * 1.6} tailUp={1} />
          <Town t={t} since={-1} fuse={0.45 + 0.4 * Math.sin(t * 10)} />
          <Six since={-1} />
          <Lantern position={[0.3, 0.75, 9.0]} />
          <Fill at={[0, 3, -8]} power={14} reach={11} />
          <Fill at={[0.3, 1.4, 8.4]} power={9} reach={7} />
        </>
      ),
    },
    {
      cue: "5.said",
      ...cam.push({ on: [0, 1.05, BEHIND[2]], dist: 2.6, to: 2.3, yaw: 0, pitch: 0, fov: 38 }),
      zone: "town",
      look: "overworld-night",
      note: "His face, full frame, a huge grin, one paw up. HELLO.",
      stage: (t) => (
        <>
          <Hero position={BEHIND} rotationY={SOUTH} animation="wave" face="grin" tailUp={1} />
          <Bubble text="HELLO!" position={[0.75, 2.05, BEHIND[2]]} scale={tw(t, 0.1, 0.3) * 0.9} tail={-1} />
          <Fill at={[0.6, 1.5, -7.2]} power={9} reach={6} />
        </>
      ),
    },
    {
      cue: "5.ran",
      ...cam.push({ on: [0, 1.0, 1.5], dist: 15, to: 16, yaw: 28, pitch: 32, fov: 48 }),
      zone: "town",
      look: "overworld-night",
      note: "From above: thirty heads turn, thirty creepers jump, and the whole town goes down the street in one green wave, away from one small cat with his paw still up, straight at the six players.",
      stage: (t) => (
        <>
          <Hero position={BEHIND} rotationY={SOUTH} animation="wave" face="grin" tailUp={1} />
          <Town t={t} since={t + RUN.ran} />
          <Six since={t + RUN.ran} />
          <Lantern position={[0.3, 0.75, 9.0]} />
          <Fill at={[0, 4, 2]} power={20} reach={18} />
          <Fill at={[0.3, 1.4, 8.4]} power={9} reach={7} />
        </>
      ),
    },
    {
      cue: "5.through",
      ...cam.push({ on: [0, 1.0, 9.6], dist: 5.5, to: 6.5, yaw: 0, pitch: 2, fov: 50 }),
      zone: "town",
      look: "overworld-night",
      note: "From behind the players, at knee height: a wall of creepers hits them. Players spin into the air, swords and sacks fly, and the town runs out past the lens on both sides.",
      stage: (t) => {
        const since = t + RUN.through;
        return (
          <>
            <Town t={t} since={since} />
            <Six since={since} />
            {SIX.map(([x, z], i) => {
              const k = Math.max(0, since - 1.25 - i * 0.07);
              const land = Math.min(1, k / 0.6);
              return k <= 0 ? null : i % 2 === 0 ? (
                <Sword key={i} position={[x - 0.4 * land, 0.9 + Math.sin(land * Math.PI) * 1.8 - 0.86 * land, z - 0.3]} rotation={[land * 9, i, 0.4]} />
              ) : (
                <Sack key={i} position={[x + 0.4 * land, 1.0 + Math.sin(land * Math.PI) * 1.5 - 0.7 * land, z - 0.2]} rotation={[land * 6, i, 0]} />
              );
            })}
            <Lantern position={[0.3, 0.75, 9.0]} />
            <Fill at={[0, 2, 12]} power={16} reach={12} />
          </>
        );
      },
    },
    {
      cue: "5.boom",
      ...cam.push({ on: [0, 0.9, 2], dist: 9, to: 8, yaw: 0, pitch: 12, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The street, empty and whole: every house standing, dust settling, a lantern on its side. At the far end, one small cat with his paw still in the air.",
      stage: (t) => (
        <>
          <Hero position={BEHIND} rotationY={SOUTH} animation={t < 0.8 ? "wave" : "idle"} face="wow" tailUp={0.6} />
          {[[-2, 4], [1.5, 2], [-0.5, 6.5], [2.4, 7.5], [-2.6, 0], [0.4, -2]].map(([x, z], i) => (
            <Puffs key={i} position={[x, 0.2, z]} seed={i * 3} color="#cfc8a8" opacity={0.5 * (1 - tw(t, 0.4, 1.6))} />
          ))}
          <Lantern position={[0.3, 0.2, 7.2]} />
          <Sword position={[-1.2, 0.04, 6.2]} rotation={[0, 0.7, 0]} />
          <Sack position={[1.6, 0.12, 5.4]} rotation={[-Math.PI / 2, 0.4, 0]} />
          <Fill at={[0.3, 1.4, 6.4]} power={12} reach={9} />
          <Fill at={[0, 2.5, -7]} power={10} reach={8} />
        </>
      ),
    },
    {
      cue: "5.cant",
      ...cam.truck({ on: [0, 1.15, 22], dist: 4.4, yaw: 62, pitch: 2, fov: 42, by: [0, 0, 8.5 * 2.2] }),
      ease: "linear",
      zone: "town",
      look: "overworld-night",
      note: "The camera runs beside them out of town: creepers going flat out, plain green, not one of them flashing, mouths wide open. In front of them, one player, running harder than any of them.",
      stage: (t) => {
        const z = 22 + t * 8.5;
        return (
          <>
            {[[-0.9, 0.3], [0.5, -0.6], [-0.2, -1.8], [1.1, -2.6], [-1.3, -3.2], [0.2, 1.3]].map(([x, dz], i) => (
              <Creeper key={i} position={[x, Math.abs(Math.sin(t * 9 + i)) * 0.06, z + dz]} rotationY={0} walk={t * 8.5 + i} lean={0.3} mood="scared" scarf={i % 3 === 0 ? "#7a4fb0" : i % 3 === 1 ? "#e07a2e" : undefined} hat={i === 3 ? "straw" : "none"} scale={i === 4 ? 0.62 : 0.97} phase={i} />
            ))}
            <Raider who={3} hand={false} position={[0.9, 0, z + 3.4]} rotationY={0} animation="run" animDistance={t * 8.5} face="scared" />
            <Fill at={[2.5, 1.8, z]} power={14} reach={9} />
          </>
        );
      },
    },
    {
      cue: "5.left",
      ...cam.push({ on: [0.2, 0.3, 6.6], dist: 3.6, to: 2.8, yaw: 20, pitch: 30, fov: 42 }),
      zone: "town",
      look: "overworld-night",
      note: "On the ground by the fallen lantern, word by word: swords, sacks, and on 'one shoe' he walks in, picks up a single red shoe and holds it up to look at it.",
      stage: (t) => {
        const shoe = w("5.left", "one");
        const k = tw(t, shoe - 0.7, shoe);
        const up = tw(t, shoe, shoe + 0.25);
        return (
          <>
            <Sword position={[-0.9, 0.04, 6.4]} rotation={[0, 0.7, 0]} />
            <Sword position={[-0.2, 0.04, 7.3]} rotation={[0, -1.1, 0]} />
            <Sack position={[1.2, 0.12, 6.1]} rotation={[-Math.PI / 2, 0.4, 0]} />
            <Sack position={[0.5, 0.12, 5.6]} rotation={[-Math.PI / 2, -0.7, 0]} />
            <Lantern position={[1.5, 0.2, 7.3]} />
            <Hero position={[0.2, 0, 5.2 + k * 1.0]} rotationY={SOUTH} animation={k < 1 ? "walk" : "idle"} animDistance={k} arms={up > 0.5 ? "hold" : undefined} face="neutral" headPitch={0.35} tailUp={0.8}>
              {up > 0.5 ? <Shoe position={[0, 0.02, 0.1]} /> : null}
            </Hero>
            {up > 0.5 ? null : <Shoe position={[0.25, 0, 6.85]} rotation={[0, 0.5, 0]} />}
            <Fill at={[1.2, 1.2, 7.6]} power={12} reach={8} />
          </>
        );
      },
    },
  ],
});
