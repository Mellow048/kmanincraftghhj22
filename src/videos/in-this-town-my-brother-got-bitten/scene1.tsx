import { cam, storyScene } from "../../engine";
import {
  BRO_ROBE, Bars, Bits, Block, Bro, Bubble, Cellar, EAST, Fill, GateWall, HandLantern, KID, Lady, Life, Loaf, Lying, ME_ROBE, Me, NORTH, OurRoom, PLACE, POST, Price, Priest, Puffs, ROBE,
  SOUTH, SoundRings, TEEN, TownSet, Villager, WEST, WoodSword, bonk, chest, face, pop, timing, tw, w,
} from "./kit";

/** 01 — He was bitten. They said he was gone. He was in the cellar. And the town had one rule. */
const ME: [number, number, number] = [-0.32, 0, 1.7];
const BRO: [number, number, number] = [0.42, 0, 1.05];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "My brother got bitten",
  shots: [
    {
      cue: "1.bitten",
      ...cam.push({ on: [0.05, 1.0, 1.4], dist: 4.5, to: 3.7, yaw: 0, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The hook, and it keeps changing: the kid looks at the lens with his wooden sword. His big brother stands behind him. A zombie's arm reaches in from the edge; a red flash on the brother's sleeve; his skin goes green from the arm up, his eyes go red, and his arms come out of his sleeves. The kid turns to look.",
      stage: (t) => {
        // Rule A: the premise is on screen inside the first second. He is bitten at 0.45 s and green by 0.8 s.
        const bite = 0.45;
        const g = tw(t, bite, bite + 0.35);
        return (
          <>
            <TownSet />
            <Life t={t} n={3} />
            <Me position={ME} rotationY={SOUTH} lookAt={t > bite ? face(BRO, TEEN) : undefined} carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
            <Bro position={BRO} rotationY={SOUTH} green={g} out={g > 0.55} bitten={t > bite} nod={g * 0.15} />
            {/* the arm that did it: a zombie's, in from the edge of the frame */}
            {t > bite - 0.45 && t < bite + 0.25 ? (
              <group position={[1.55 - tw(t, bite - 0.45, bite - 0.05) * 0.55, 1.05, 1.1]} rotation={[0, 0, 0]}>
                <Block position={[0, 0, 0]} size={[0.7, 0.2, 0.2]} color="#3f8f7a" />
                <Block position={[-0.42, 0, 0]} size={[0.16, 0.2, 0.2]} color="#4f8a3f" />
              </group>
            ) : null}
            {t > bite ? <Bits position={[BRO[0] + 0.3, 1.0, BRO[2] + 0.2]} t={t - bite} color="#e3261c" count={10} power={1.4} /> : null}
            <Bubble text="!" position={[ME[0] - 0.15, 1.75, ME[2]]} scale={0.62 * pop(t, bite + 0.12, 0.14)} tail={1} tilt={-0.1} />
          </>
        );
      },
    },
    {
      cue: "1.gone",
      ...cam.push({ on: [0.1, 1.15, 0.2], dist: 6.4, to: 5.8, yaw: 8, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Where he stood there is a puff of dust and nobody, and the kid is looking at the empty place. Behind him, three grown-ups turn their backs, one after the other, and one says GONE.",
      stage: (t) => (
        <>
          <TownSet />
          <Me position={ME} rotationY={SOUTH + 0.5} lookAt={[BRO[0], 0.9, BRO[2]]} carry={<WoodSword position={[0, 0.03, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={0.8} />} />
          <Puffs position={[BRO[0], 0.2, BRO[2]]} count={7} spread={0.7} size={0.26} rise={0.9} speed={1.6} color="#e9e2d0" />
          {([[-1.25, -0.9, ROBE.brown], [0.35, -1.5, ROBE.farmer], [1.55, -0.7, ROBE.red]] as Array<[number, number, string]>).map(([x, z, robe], i) => (
            <Villager key={i} position={[x, 0, z]} rotationY={SOUTH + tw(t, 0.15 + i * 0.22, 0.4 + i * 0.22) * Math.PI} robe={robe} phase={i * 2 + 1} nod={0.2} />
          ))}
          <Bubble text="GONE." position={[0.35, 2.4, -1.3]} scale={0.8 * pop(t, 0.3, 0.14)} tail={-1} />
        </>
      ),
    },
    {
      cue: "1.cellar",
      ...cam.push({ on: [-0.2, 1.3, -0.85], dist: 3.5, to: 3.1, yaw: 12, pitch: 4, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "The cellar. He is behind iron bars, green, with his arms through them, and his face is between two bars. A lantern on the floor.",
      stage: (t) => (
        <>
          <Cellar />
          <Bro position={PLACE.bro} rotationY={SOUTH} green={1} out bitten nod={Math.sin(t * 2) * 0.05} />
          <HandLantern position={[0.75, 0, 0.2]} light={16} />
          <Fill at={[0.4, 2.0, 1.6]} power={14} />
        </>
      ),
    },
    {
      cue: "1.knock",
      ...cam.push({ on: [POST[0] - 0.2, 1.4, POST[2] + 0.1], dist: 3.2, to: 2.8, yaw: 34, pitch: -3, fov: 44 }),
      zone: "cellar",
      look: "lantern-night",
      note: "He turns to the post that holds up the floor and knocks on it with his fist, twice. Dust comes down each time.",
      stage: (t) => {
        const a = w("1.knock", "knocked");
        const k = bonk(t, a, 0.2) + bonk(t, a + 0.3, 0.2);
        const p: [number, number, number] = [POST[0] - 0.64, 0, POST[2] + 0.12];
        return (
          <>
            <Cellar />
            <Bro position={p} rotationY={EAST} green={1} bitten arms={{ l: -1.8 + k * 0.5, r: -1.5 }} />
            {[a + 0.1, a + 0.4].map((at, i) => (t > at ? <Puffs key={i} position={[POST[0], 2.9, POST[2]]} count={5} spread={0.4} size={0.14} rise={-0.9} speed={1.5} color="#cfc6b4" /> : null))}
            {t > a + 0.08 ? <SoundRings position={[POST[0], 1.55, POST[2] + 0.25]} t={t - a - 0.08} color="#ffe6b0" reach={0.9} /> : null}
            <HandLantern position={[0.75, 0, 0.2]} light={16} />
            <Fill at={[0.4, 2.0, 1.6]} power={14} />
          </>
        );
      },
    },
    {
      cue: "2.rule",
      ...cam.push({ on: [0, 1.5, 12.4], dist: 7.5, to: 6.9, yaw: 180, pitch: 3, fov: 48 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The gate, from inside the town, before the sun is up. The two doors swing open by themselves.",
      stage: (t) => (
        <>
          <TownSet gate={tw(t, 0.1, 0.8)} />
        </>
      ),
    },
    {
      cue: "2.gate",
      ...cam.push({ on: [0, 1.3, 12.2], dist: 7.2, to: 6.2, yaw: 172, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Somebody green walks out through it alone, arms out in front, towards the trees. Nobody is with him.",
      stage: (t) => (
        <>
          <TownSet gate={1} />
          <Villager position={[0, 0, 9.6 + t * 1.5]} rotationY={SOUTH} robe={ROBE.brown} skin="#5f9a4e" eyes="#d82a1e" walk={t * 1.5} arms={{ l: -1.5, r: -1.45 }} phase={2} />
          <Fill at={[0, 3, 7]} power={40} />
        </>
      ),
    },
    {
      cue: "2.watch",
      ...cam.push({ on: [0.2, 1.2, -3.6], dist: 6.4, to: 5.8, yaw: -10, pitch: 8, fov: 48 }),
      zone: "town",
      look: "overworld-sunset",
      note: "The street. Every grown-up stands with his face to his own wall and his back to the gate. One kid peeks over his shoulder, and snaps back.",
      stage: (t) => {
        const peek = Math.sin(tw(t, 0.35, 1.25) * Math.PI);
        return (
          <>
            <TownSet />
            {([[-1.5, -4.6, ROBE.brown, 0.94], [0.2, -5.0, ROBE.white, 0.94], [1.7, -4.4, ROBE.farmer, 0.94]] as Array<[number, number, string, number]>).map(([x, z, robe, sc], i) => (
              <Villager key={i} position={[x, 0, z]} rotationY={NORTH} robe={robe} scale={sc} phase={i * 2} nod={0.25} />
            ))}
            <Villager position={[0.95, 0, -3.5]} rotationY={NORTH} robe={ROBE.friend} kid scale={KID} turn={peek * 1.15} phase={3} />
          </>
        );
      },
    },
    {
      cue: "2.priest",
      ...cam.push({ on: [PLACE.stall[0], 1.3, PLACE.stall[2] + 0.5], dist: 6.6, to: 5.8, yaw: 0, pitch: 15, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The priest's stall: bread on the counter and a golden apple under glass. Two customers with a loaf each, the priest between them. Two emeralds come up over the one on the left; one emerald over the one on the right.",
      stage: (t) => {
        const s = PLACE.stall;
        const half = w("2.priest", "half");
        return (
          <>
            <TownSet />
            <Priest position={[s[0] - 0.15, 0, s[2] - 0.85]} rotationY={SOUTH} lookAt={[s[0] + (t > half ? 0.8 : -0.8), 1.4, s[2] + 1.5]} />
            <Villager position={[s[0] - 0.8, 0, s[2] + 1.55]} rotationY={NORTH + 0.15} robe={ROBE.brown} phase={1} carry={<Loaf scale={0.7} />} />
            <Villager position={[s[0] + 0.8, 0, s[2] + 1.55]} rotationY={NORTH - 0.15} robe={ROBE.blue} phase={2} carry={<Loaf scale={0.7} />} />
            <Price position={[s[0] - 0.8, 2.3, s[2] + 1.55]} n={2} scale={0.9 * pop(t, 0.5, 0.16)} />
            <Price position={[s[0] + 0.8, 2.3, s[2] + 1.55]} n={1} scale={0.9 * pop(t, half, 0.16)} />
          </>
        );
      },
    },
    {
      cue: "2.why",
      ...cam.push({ on: face([PLACE.stall[0] - 0.15, 0, PLACE.stall[2] - 0.85], 0.96), dist: 2.5, to: 2.1, yaw: -14, pitch: 4, fov: 38 }),
      zone: "town",
      look: "overworld-day",
      note: "The priest, close. He shakes his head and looks away.",
      stage: (t) => {
        const s = PLACE.stall;
        return <><TownSet /><Priest position={[s[0] - 0.15, 0, s[2] - 0.85]} rotationY={SOUTH} turn={Math.sin(t * 9) * 0.3 * (1 - tw(t, 0.45, 0.7)) + tw(t, 0.45, 0.75) * 0.8} nod={0.1} /></>;
      },
    },
    {
      cue: "2.hat",
      ...cam.push({ on: [PLACE.lady[0] - 0.1, 1.35, PLACE.lady[2] + 1.5], dist: 4.9, to: 4.2, yaw: -12, pitch: 6, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "The old lady next door, outside her house, in a big purple hat with a flower on it. The kid walks past and looks up at the hat.",
      stage: (t) => {
        const L = PLACE.lady;
        const x = L[0] + 1.5 - t * 0.9;
        return (
          <>
            <TownSet />
            <Lady position={[L[0] - 0.35, 0, L[2] + 1.3]} rotationY={SOUTH + 0.2} hmm={0.3} />
            <Me position={[x, 0, L[2] + 2.5]} rotationY={WEST} walk={t * 0.9} lookAt={[L[0] - 0.35, 2.0, L[2] + 1.3]} />
          </>
        );
      },
    },
    {
      cue: "2.bed",
      ...cam.top({ on: [PLACE.myBed[0], 0.5, PLACE.myBed[2] - 0.1], height: 4.4, to: 4.0, fov: 42 }),
      zone: "room",
      look: "lantern-night",
      note: "From straight above, at night: she is in bed, flat on her back, and the hat is still on.",
      stage: (t) => (
        <>
          <OurRoom night />
          <Lying position={[PLACE.myBed[0], 0.62, PLACE.myBed[2] + 0.85]}>
            <Lady position={[0, 0, 0]} nod={-0.05 + Math.sin(t * 2) * 0.02} />
          </Lying>
          <Fill at={[0.8, 2.6, 0.2]} power={20} />
        </>
      ),
    },
    {
      cue: "2.bars",
      ...cam.push({ on: [0.2, 1.1, -1.1], dist: 6.4, to: 5.4, yaw: -8, pitch: 12, fov: 50 }),
      zone: "cellar",
      look: "lantern-night",
      note: "Under our house, before any of it: the room with nobody in it. Iron bars from wall to wall, a bed behind them, a bowl of water, a little window. The kid stands in front of the bars with a lantern, small.",
      stage: () => (
        <>
          <Cellar />
          <Me position={[0.7, 0, 0.6]} rotationY={NORTH + 0.3} carry={<HandLantern position={[0, 0, 0.04]} light={18} scale={0.85} />} lookAt={[1.1, 0.6, -1.8]} />
          <Fill at={[0, 2.4, 2.0]} power={16} />
        </>
      ),
    },
    {
      cue: "2.bad",
      ...cam.push({ on: face([0.17, 0, 0.1], KID), dist: 2.7, to: 2.3, yaw: 180, pitch: 0, fov: 40 }),
      zone: "cellar",
      look: "lantern-night",
      note: "From inside the cell, through the bars: the kid's face between two of them, looking in, with the lantern on the floor beside him. He swallows. A thought over his head: BAD KIDS?",
      stage: (t) => (
        <>
          <Cellar walls="ew" />
          <HandLantern position={[0.75, 0, 0.35]} light={9} />
          <Me position={[0.17, 0, 0.1]} rotationY={NORTH} nod={Math.sin(tw(t, 0.5, 0.9) * Math.PI) * 0.2} />
          <Bubble text="BAD KIDS?" position={[0.17, 1.62, -0.7]} rotationY={Math.PI} scale={0.3 * pop(t, 0.35, 0.16)} tail={1} />
          <Fill at={[0.2, 1.6, -1.6]} power={8} />
        </>
      ),
    },
  ],
});
