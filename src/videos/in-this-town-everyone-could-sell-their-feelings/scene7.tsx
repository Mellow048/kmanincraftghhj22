import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, pop, ramp, HelmetChair, Bottle } from "./kit";

const PLINK = wordAt("7.plink", "plink");

/** THE HELMET — raised, zoomed out so you read the head, the helmet above it, and the bottle drop. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The helmet",
  shots: [
    {
      cue: "7.helmet",
      ...cam.push({ on: [0, 1.45, 60.2], dist: 3.4, to: 2.8, yaw: 16, pitch: -2, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "'The next morning I sat under the humming helmet': wider — you see his whole body in chair, raised helmet clearly above his head, witch quarter-off adjusting, helmet humming with cables.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 60]} rotationY={SOUTH} animation="idle" face="brave" headPitch={0.08} />
          <HelmetChair position={[0, 0, 60]} hum={t} />
          <Villager position={[-1.7, 0, 60.6]} rotationY={0.9} robe={ROBE.elder} lookAt={[0, 1.45, 60]} phase={2.2} lean={0.06} />
        </>
      ),
    },
    {
      cue: "7.plink",
      ...cam.push({ on: [0.35, 1.25, 60.35], dist: 2.8, to: 2.3, yaw: -12, pitch: 10, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "'My fear dropped with a plink — yellow': zoomed out to show visor to bottle — yellow cube falls on 'plink' from raised visor to bottle at chest height, flash, he doesn't flinch.",
      stage: (t) => {
        const k = pop(t, PLINK, 0.2);
        const y = 1.22 - ramp(t, PLINK - 0.2, PLINK) * 0.62;
        return (
          <>
            <HelmetChair position={[0, 0, 60]} hum={t} />
            <Hero position={[0, 0, 60]} rotationY={SOUTH} animation="idle" face="brave" gaze={0} />
            <group position={[0.35, 0.38, 60.55]} scale={k}>
              <Bottle position={[0, 0, 0]} color="#ffe66b" />
            </group>
            <Block position={[0.35, y, 60.5]} size={[0.12, 0.12, 0.12]} color="#ffe66b" emissive="#ffe66b" emissiveIntensity={0.55} />
            {t >= PLINK && t < PLINK + 0.14 ? <Block position={[0.35, 0.48, 60.5]} size={[0.42, 0.02, 0.42]} color="#fff8c0" emissive="#fff2a0" emissiveIntensity={1.1} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.home",
      ...cam.truck({ on: [-1.2, 1.15, 60.4], dist: 3.0, yaw: 0, pitch: 6, by: [2.4, 0, 0], fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "'I carried the bottle to her shelf and walked home light': truck with him — bottle in hands, lighter walk (stride faster), shelf coming into frame.",
      stage: (t) => (
        <>
          <Hero position={[-0.6 + t * 1.1, 0, 60.6]} rotationY={EAST} animation="walk" animDistance={t * 1.9} face="smile" />
          <Bottle position={[-0.35 + t * 1.1, 0.62, 60.6]} color="#ffe66b" />
        </>
      ),
    },
    {
      cue: "7.laugh",
      ...cam.orbit({ on: [0, 1.3, 1.6], dist: 4.6, distTo: 4.0, yaw: -18, yawTo: 12, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'The whole square hummed that day and I hummed with them': orbit around square — everyone hmming with walk, he centre with extra bounce, camera arcs to show the square is alive.",
      stage: (t, { p }) => (
        <>
          <Hero position={[0, 0, 1.6]} animation="idle" face="grin" />
          <Villager position={[-2.1, 0, 1.2]} robe={ROBE.brown} hmm={0.28} phase={0.3} walk={t * 0.4} />
          <Villager position={[2.2, 0, 1.4]} robe={ROBE.white} hmm={0.25} phase={1.9} walk={t * 0.35} />
          <Villager position={[-0.6, 0, 0.4]} robe={ROBE.blue} hmm={0.22} phase={1.2} />
          <Villager {...stride([-3, 0, 0.8], [-0.5, 0, 1.0], p)} walk={t * 0.9} robe={ROBE.farmer} hat="straw" phase={2.7} />
        </>
      ),
    },
  ],
});

import { SOUTH, EAST } from "./kit";
