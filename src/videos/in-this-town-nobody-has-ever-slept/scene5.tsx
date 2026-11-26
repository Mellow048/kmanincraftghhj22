import { Block, cam, storyScene } from "../../engine";
import {
  Bits,
  Bubble,
  BurntBed,
  CellarGate,
  EAST,
  ExplosionBurst,
  Hero,
  NORTH,
  PLACE,
  ROBE,
  SOUTH,
  Villager,
  WEST,
  ease,
  jolt,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Cellar Bed",
  shots: [
    {
      cue: "5.cellar",
      ...cam.truck({ on: [PLACE.cellar[0], 1.1, PLACE.cellar[2] + 1.2], by: [-1.8, 0, 0.4], dist: 4.1, yaw: -16, pitch: 8, fov: 40 }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero wrenches open cellar door dragging soot-blackened half-burnt red bed out toward street.",
      stage: (t) => {
        const BURNT = wordAt("5.cellar", "burnt");
        const pull = ease(ramp(t, 0.2, 2.0));
        return (
          <>
            <CellarGate position={[PLACE.cellar[0], 0, PLACE.cellar[2]]} open={ramp(t, 0, 0.6)} />
            <BurntBed position={[PLACE.cellar[0] - pull * 2.1, 0, PLACE.cellar[2] + 0.9 + pull * 1.1]} rotation={[0, 0.25, 0]} smoulder={t > BURNT ? 1.2 : 0.7} />
            <Hero
              position={[PLACE.cellar[0] - 0.6 - pull * 2.0, 0, PLACE.cellar[2] + 1.5 + pull * 1.1]}
              rotationY={WEST - 0.3}
              animation="walk"
              animDistance={t * 1.2}
              face="brave"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "5.crowd",
      ...cam.orbit({ on: [0, 1.1, 2], dist: 5.4, yaw: -30, yawTo: 25, pitch: 12, fov: 46 }),
      zone: "nether",
      look: "lava-shore",
      note: "Orbiting wide square as Hero drops scorched cellar bed at town center surrounded by dozens of stopping villagers.",
      stage: (t) => {
        const TOWN = wordAt("5.crowd", "town");
        return (
          <>
            <BurntBed position={[0, 0, 2]} rotation={[0, EAST, 0]} />
            <Hero
              position={[-1.4 + ease(ramp(t, 0, 1.1)) * 0.6, 0, 2.2]}
              rotationY={EAST}
              animation={t < TOWN ? "hold" : "point"}
              face="grin"
              time={t}
            />
            {[
              [-2.8, 0.2, ROBE.brown],
              [2.6, 0.4, ROBE.red],
              [2.9, 3.2, ROBE.white],
              [-2.5, 3.7, ROBE.elder],
              [0.3, -1.2, ROBE.farmer],
            ].map(([vx, vz, r], i) => (
              <Villager key={i} robe={r as string} position={[vx as number, 0, vz as number]} lookAt={[0, 1, 2]} walk={Math.min(1, t * 0.6) * 0.8} strain={0.25 * ramp(t, TOWN, TOWN + 0.5)} />
            ))}
          </>
        );
      },
    },
    {
      cue: "5.watch",
      ...cam.push({ on: [0, 1.05, 2], dist: 3.4, to: 1.95, yaw: 18, pitch: 6, fov: 36 }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero proudly throws hands wide presenting scorched cellar bed with huge triumphant smile.",
      stage: (t) => {
        const SLEEP = wordAt("5.watch", "sleeping");
        return (
          <>
            <BurntBed position={[0.45, 0, 2]} rotation={[0, EAST, 0]} />
            <Hero
              position={[-0.95, 0, 2.1]}
              rotationY={0.45}
              animation={t < SLEEP ? "talk" : "wave"}
              face="laugh"
              time={t}
            />
            <Bubble text="WATCH!" position={[-0.95, 1.8, 2.1]} dark rotationY={0.25} scale={pop(t, 0.2)} />
            <Villager robe={ROBE.brown} position={[2.2, 0, 1.4]} lookAt={[-0.9, 1, 2.1]} hmm={ramp(t, 0.4, 1)} />
          </>
        );
      },
    },
    {
      cue: "5.lie",
      ...cam.dollyZoom({ on: [0, 0.65, 2], dist: 3.5, to: 2.1, fov: 44, yaw: -22, pitch: 12 }),
      zone: "nether",
      look: "lava-shore",
      note: "Dramatic vertigo push-pull as Hero climbs atop scorched cellar pillow and stretches straight out.",
      stage: (t) => {
        const LAY = wordAt("5.lie", "lay");
        const k = ease(ramp(t, 0, LAY + 0.45));
        return (
          <>
            <BurntBed position={[0, 0, 2]} rotation={[0, EAST, 0]} smoulder={1.4 + k * 0.8} />
            <group position={[0.1, 0.68, 2]} rotation={[-k * (Math.PI / 2), 0, -k * (Math.PI / 2)]}>
              <Hero position={[0, 0, 0]} animation="idle" face={k > 0.6 ? "calm" : "grin"} time={t} />
            </group>
            <Block position={[0.4, 0.72, 2]} size={[0.3 + k * 0.3, 0.2, 0.3 + k * 0.3]} color="#ff8e2b" emissive="#ff5c0a" emissiveIntensity={k * 1.4} />
          </>
        );
      },
    },
    {
      cue: "5.boom",
      ...cam.whip({ from: [-1.8, 2.2, 7.0], on: [-1.2, 1.2, 2], onTo: [1.4, 1.4, 2], fov: 48 }),
      impacts: [{ at: 0.55, amp: 0.16, dur: 0.65 }],
      zone: "nether",
      look: "lava-shore",
      note: "Catastrophic Nether bed detonation blasts orange fireball cubes, Hero hurtling upward, and villagers reeling back.",
      stage: (t) => {
        const BOOM = wordAt("5.boom", "explode");
        const hit = Math.max(0, t - BOOM * 0.45);
        return (
          <>
            <ExplosionBurst position={[0, 0.4, 2]} elapsed={hit} count={28} />
            <Hero
              position={[hit * -1.4, Math.min(2.2, hit * 3.1), 2 + hit * 1.2]}
              rotationY={0.8 + hit * 4}
              animation="reachUp"
              face="ouch"
              time={t}
            />
            <Villager robe={ROBE.brown} position={[-2.9 - hit * 0.5, 0, 0.8]} lean={-0.35 * ramp(t, BOOM * 0.45, BOOM + 0.2)} lookAt={[0, 1, 2]} />
            <Villager robe={ROBE.red} position={[2.8 + hit * 0.5, 0, 1.5]} lean={-0.35 * ramp(t, BOOM * 0.45, BOOM + 0.2)} lookAt={[0, 1, 2]} />
          </>
        );
      },
    },
    {
      cue: "5.roof",
      ...cam.crane({ on: [PLACE.soupShed[0], 2.5, PLACE.soupShed[2] + 2], dist: 6.2, yaw: -22, fromPitch: 10, toPitch: 24, fov: 48 }),
      impacts: [{ at: 0.2, amp: 0.14, dur: 0.5 }],
      zone: "nether",
      look: "lava-shore",
      note: "Shockwave rips roof planking high into smoky crimson sky beside crumbling town soup shed.",
      stage: (t) => {
        const ROOF = wordAt("5.roof", "roof");
        const lift = ease(ramp(t, 0, ROOF + 1.1));
        return (
          <>
            <ExplosionBurst position={[PLACE.soupShed[0], 3.2, PLACE.soupShed[2] + 1.5]} elapsed={t} count={22} />
            <Block position={[PLACE.soupShed[0] - lift * 0.8, 3.8 + lift * 2.9, PLACE.soupShed[2] + 1.4]} rotation={[lift * 0.8, lift * 1.1, lift * 0.5]} size={[2.2, 0.28, 1.4]} color="#7c2824" />
            <Block position={[PLACE.soupShed[0] + 1.1 + lift * 1.2, 3.5 + lift * 3.4, PLACE.soupShed[2] + 0.8]} rotation={[-lift * 0.7, lift * 0.9, -lift * 0.4]} size={[1.8, 0.24, 1.2]} color="#5e3229" />
            <Bits position={[PLACE.soupShed[0], 3.0, PLACE.soupShed[2] + 2]} t={t} color="#52261e" count={18} power={1.8} />
            <Villager robe={ROBE.white} position={[PLACE.soupShed[0] + 2.8, 0, PLACE.soupShed[2] + 4.0]} rotationY={SOUTH} lean={-0.3} walk={t * 1.5} />
          </>
        );
      },
    },
  ],
});
