import type React from "react";
import {
  ChiefFlint,
  FireflySwarm,
  Kai,
  Mom,
  PipFirefly,
  Puddle,
  ShadowCreature,
  Sign,
  Smoke,
  SubscribeSign,
  Townie,
  WindStreaks,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 4 (10 shots): Chief Flint's lantern blows out, he falls in the mud,
 * fireflies chase shadows away, all 30 townsfolk + Mom return, shop closes, joyful CTA!
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Scene 4",
  shots: [
    {
      cue: "7.flint2",
      look: "lantern-night",
      note: "Tracking camera follows furious Chief Flint marching out yelling bugs aren't legal light.",
      ...cam.track({ from: [4.2, 0, -2.5], to: [1.4, 0, 0.2], sideDist: 4.8, side: 1, height: 1.55, fov: 44 }),
      stage: (t) => {
        const m = moveBetween([4.2, 0, -2.5], [1.4, 0, 0.2], t, 0, 1.8);
        return (
          <>
            <FireflySwarm center={[0, 2.2, 0]} count={28} spread={10} t={t} />
            <ChiefFlint position={m.position} rotationY={m.rotationY} animation={m.moving ? "walk" : "point"} animDistance={m.animDistance} face="angry" torch light={3.2} time={t} />
          </>
        );
      },
    },
    {
      cue: "7.gust",
      look: "lantern-night",
      note: "Low dramatic shot as a fierce gust of wind blows Chief Flint's fancy lantern straight out.",
      ...cam.heroLow({ on: [1.4, 0, 0.2], dist: 4.6, yaw: -22, fov: 42 }),
      stage: (t) => (
        <>
          <FireflySwarm center={[0, 2.2, 0]} count={26} spread={10} t={t} />
          <WindStreaks t={t} center={[1.4, 1.8, 0.2]} />
          <ChiefFlint position={[1.4, 0, 0.2]} rotationY={-0.3} animation="cower" face="surprised" time={t} />
          <Smoke position={[1.4, 1.3, 0.4]} count={12} />
        </>
      ),
    },
    {
      cue: "7.mud",
      look: "lantern-night",
      note: "Comedic sweep around Chief Flint sprawled in a mud puddle while Kai laughs beside him.",
      ...cam.sweep({ on: [1.0, 0.9, 0.8], dist: 5.0, fromYaw: 34, toYaw: -28, pitch: 12, fov: 42 }),
      stage: (t) => (
        <>
          <FireflySwarm center={[0, 2.2, 0]} count={26} spread={10} t={t} />
          <Puddle position={[1.5, 0.02, 0.6]} size={[2.2, 1.6]} />
          <ChiefFlint position={[1.5, 0, 0.6]} rotationY={-0.4} animation="fall" face="ouch" time={t} />
          <Kai position={[-0.8, 0, 1.4]} rotationY={0.8} animation="laugh" face="laugh" time={t} />
        </>
      ),
    },
    {
      cue: "7.chase",
      look: "lantern-night",
      note: "Fast tracking shot following our glowing firefly swarm chasing every shadow back into the trees.",
      ...cam.track({ from: [0, 0, -2.5], to: [0, 0, -12.5], sideDist: 5.2, side: -1, height: 2.0, fov: 46 }),
      stage: (t) => {
        const flee = moveBetween([0, 0, -2.5], [0, 0, -13.5], t, 0, 2.2);
        return (
          <>
            <ShadowCreature position={[flee.position[0] - 1.8, 0, flee.position[2]]} rotationY={Math.PI} t={t} />
            <ShadowCreature position={[flee.position[0] + 1.8, 0, flee.position[2] - 0.6]} rotationY={Math.PI} t={t} />
            <FireflySwarm center={[flee.position[0], 2.0, flee.position[2] + 2.4]} count={28} spread={6.8} t={t} seed={91} />
          </>
        );
      },
    },
    {
      cue: "7.return",
      look: "overworld-golden",
      note: "Golden-hour tracking camera follows all thirty missing townsfolk walking safely out of the woods.",
      ...cam.track({ from: [0, 0, -11.0], to: [0, 0, -2.2], sideDist: 6.0, side: -1, height: 2.6, fov: 44 }),
      stage: (t) => {
        const a = moveBetween([-1.6, 0, -11.0], [-1.4, 0, -2.2], t, 0, 2.2);
        const b = moveBetween([1.6, 0, -11.5], [1.4, 0, -2.5], t, 0, 2.2);
        const c = moveBetween([0, 0, -12.6], [0, 0, -3.8], t, 0, 2.2);
        return (
          <>
            <FireflySwarm center={[0, 2.4, -5.0]} count={24} spread={9} t={t} />
            <Townie who={1} position={a.position} rotationY={a.rotationY} animation={a.moving ? "walk" : "cheer"} animDistance={a.animDistance} face="happy" time={t} />
            <Townie who={3} position={b.position} rotationY={b.rotationY} animation={b.moving ? "walk" : "cheer"} animDistance={b.animDistance} face="grin" time={t} />
            <Townie who={5} position={c.position} rotationY={c.rotationY} animation={c.moving ? "walk" : "cheer"} animDistance={c.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.momback",
      look: "overworld-golden",
      note: "Emotional tracking shot glides beside Mom stepping into the golden light toward cheering Kai.",
      ...cam.track({ from: [0, 0, -6.5], to: [0, 0, 0.5], sideDist: 4.6, side: 1, height: 1.55, fov: 42 }),
      stage: (t) => {
        const m = moveBetween([0, 0, -6.5], [0, 0, 0.5], t, 0, 2.1);
        return (
          <>
            <FireflySwarm center={[0, 2.2, 0]} count={24} spread={9} t={t} />
            <Mom position={m.position} rotationY={m.rotationY} animation={m.moving ? "walk" : "wave"} animDistance={m.animDistance} face="happy" time={t} />
            <Kai position={[0, 0, 2.2]} rotationY={Math.PI} animation="cheer" face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "7.hug",
      look: "overworld-golden",
      note: "Warm golden arc circling Mom and Kai reuniting while Pip dances brightly around them.",
      ...cam.sweep({ on: [0, 1.35, 1.1], dist: 4.6, fromYaw: -34, toYaw: 34, pitch: 8, fov: 40 }),
      stage: (t) => (
        <>
          <Mom position={[-0.32, 0, 1.1]} rotationY={1.35} animation="cheer" face="happy" time={t} />
          <Kai position={[0.32, 0, 1.1]} rotationY={-1.35} animation="cheer" face="happy" time={t} />
          <PipFirefly position={[Math.cos(t * 3.8) * 1.1, 1.85 + Math.sin(t * 5) * 0.25, 1.1 + Math.sin(t * 3.8) * 1.1]} scale={1.3} t={t} />
        </>
      ),
    },
    {
      cue: "7.closed",
      look: "overworld-day",
      note: "Daylight sweep across Chief Flint's coal shop boarded up with a bold CLOSED sign.",
      ...cam.sweep({ on: [3.6, 1.5, -2.5], dist: 5.2, fromYaw: -38, toYaw: -102, pitch: 8, fov: 42 }),
      stage: (t) => (
        <>
          <Sign title="CLOSED" position={[4.05, 1.5, -2.5]} rotationY={-Math.PI / 2} width={2.2} height={0.62} />
          <ChiefFlint position={[2.6, 0, -2.2]} rotationY={-1.4} animation="shrug" face="sad" time={t} />
        </>
      ),
    },
    {
      cue: "7.free",
      look: "overworld-day",
      note: "Joyful daytime crane gliding over the bright happy town square celebrating together.",
      ...cam.streetOverview({ from: [-2.4, 0, 11.2], to: [1.8, 0, 6.0], height: 4.8, fov: 46 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.4]} animation="wave" face="happy" time={t} />
          <Mom position={[-1.2, 0, 1.2]} rotationY={0.25} animation="cheer" face="happy" time={t} />
          <Townie who={1} position={[2.4, 0, 1.6]} rotationY={-0.4} animation="cheer" face="grin" time={t} />
          <Townie who={3} position={[-2.8, 0, 2.2]} rotationY={0.5} animation="wave" face="happy" time={t} />
          <PipFirefly position={[0.65 + Math.cos(t * 3.2) * 0.35, 1.75 + Math.sin(t * 4.2) * 0.18, 1.55]} scale={1.35} t={t} />
        </>
      ),
    },
    {
      cue: "7.cta",
      look: "overworld-golden",
      note: "Warm golden sweep framing Kai, Mom, and dancing Pip under the wooden Subscribe sign.",
      ...cam.sweep({ on: [0, 1.65, 1.2], dist: 5.4, distTo: 6.4, fromYaw: 24, toYaw: -24, pitch: 8, fov: 42 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.4]} animation="wave" face="happy" time={t} />
          <Mom position={[-1.2, 0, 1.2]} rotationY={0.25} animation="cheer" face="happy" time={t} />
          <Townie who={1} position={[2.4, 0, 1.6]} rotationY={-0.4} animation="cheer" face="grin" time={t} />
          <Townie who={3} position={[-2.8, 0, 2.2]} rotationY={0.5} animation="wave" face="happy" time={t} />
          <PipFirefly position={[0.65 + Math.cos(t * 3.2) * 0.35, 1.75 + Math.sin(t * 4.2) * 0.18, 1.55]} scale={1.35} t={t} />
          <SubscribeSign position={[0, 2.75, 0.8]} />
        </>
      ),
    },
  ],
});
