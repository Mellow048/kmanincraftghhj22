import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, pop, ramp, HelmetChair, Bottle } from "./kit";

const PLINK = wordAt("7.plink", "plink");
const DROP_YELLOW = wordAt("7.plink", "yellow");

/** THE HELMET — fear drops yellow, and he feels light. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The helmet",
  shots: [
    {
      cue: "7.helmet",
      ...cam.push({ on: [0, 1.45, 60.4], dist: 2.9, to: 2.4, yaw: 18, pitch: -6, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "'The next morning I sat under the humming helmet': from beside, him settling under helmet, witch's hands adjusting it, hum stronger.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 59.2]} rotationY={0} animation="idle" face="brave" headPitch={0.12} />
          <HelmetChair position={[0, 0, 60]} hum={t} />
          <Villager position={[-1.6, 0, 60.5]} rotationY={1.0} robe={ROBE.elder} lookAt={[0, 1.3, 60]} phase={2.2} />
        </>
      ),
    },
    {
      cue: "7.plink",
      ...cam.push({ on: [0.15, 0.55, 60.2], dist: 2.0, to: 1.7, yaw: -6, pitch: 22, fov: 36 }),
      zone: "shop",
      look: "warm-room",
      note: "'My fear dropped with a plink — yellow': low on the bottle shelf, yellow drop falls on 'plink', he doesn't flinch — face stays brave, wrong-brave.",
      stage: (t) => {
        const k = pop(t, PLINK, 0.2);
        const y = 0.95 - ramp(t, PLINK - 0.15, PLINK) * 0.55;
        return (
          <>
            <HelmetChair position={[0, 0, 60]} />
            <Hero position={[0, 0, 59.2]} rotationY={0} animation="idle" face="brave" gaze={0} />
            {/* bottle forming */}
            <group position={[0.18, 0.35, 60.5]} scale={ramp(t, PLINK, PLINK + 0.3) }>
              <Bottle position={[0, 0, 0]} color="#ffe66b" />
            </group>
            {/* falling drop */}
            <Block position={[0.18, y, 60.5]} size={[0.11, 0.11, 0.11]} color="#ffe66b" emissive="#ffe66b" emissiveIntensity={0.55} />
            {/* flash on plink */}
            {t >= PLINK && t < PLINK + 0.15 ? <Block position={[0.18, 0.45, 60.5]} size={[0.35, 0.02, 0.35]} color="#fff8c0" emissive="#fff2a0" emissiveIntensity={1.2} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.home",
      ...cam.truck({ on: [-3, 1.15, 60.4], dist: 2.8, yaw: 0, pitch: 4, by: [3.5, 0, 0], fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "'I carried the bottle to her shelf and walked home light': tracking with him carrying tiny yellow bottle to shelf, steps lighter each time.",
      stage: (t) => (
        <>
          <Hero position={[-1.0 + t * 1.6, 0, 60.6]} rotationY={1.57} animation="walk" animDistance={t * 1.6} face="smile" />
          <group position={[-0.25, 0.62, 60.55]}>
            <Bottle position={[0, 0, 0]} color="#ffe66b" />
          </group>
        </>
      ),
    },
    {
      cue: "7.laugh",
      ...cam.push({ on: [0, 1.3, 1.6], dist: 4.2, to: 3.6, yaw: 0, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'The whole square hummed that day and I hummed with them': wide of square — everyone humming, him centre humming too, but his hum is a second fast.",
      stage: () => (
        <>
          <Hero position={[0, 0, 1.6]} animation="idle" face="grin" />
          <Villager position={[-2.1, 0, 1.2]} robe={ROBE.brown} hmm={0.3} phase={0.3} />
          <Villager position={[2.2, 0, 1.4]} robe={ROBE.white} hmm={0.25} phase={1.9} />
          <Villager position={[-0.6, 0, 0.4]} robe={ROBE.blue} hmm={0.28} phase={1.2} />
          <Villager position={[1.1, 0, 0.2]} robe={ROBE.farmer} hmm={0.22} phase={2.7} hat="straw" />
        </>
      ),
    },
  ],
});
