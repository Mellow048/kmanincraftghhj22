import { cam, storyScene, walkSegment } from "../../engine";
import { Basket, FishPile, FishingVillager, Hero, Jar, JETTY_CROWD, Keeper, SOUTH, ease, ramp, stepPos, timing } from "./kit";

export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "A year of fish",
  shots: [
    {
      cue: "16.dawn",
      ...cam.truck({ on: stepPos(18), dist: 6.4, yaw: 62, pitch: 8, fov: 46, by: [0, -1.8, 2.8], screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Front view: first dawn light catches Hero descending stone mountain steps with feet flush clutching jar.",
      stage: (t) => {
        const p = stepPos(Math.max(4, 18 - t * 4.2));
        return (
          <>
            <Hero position={p} rotationY={SOUTH} animation="walk" animDistance={t * 1.9} face="uneasy" time={t} />
            <Jar position={[p[0] + 0.35, p[1] + 0.7, p[2] - 0.15]} fill={1} scale={0.85} />
          </>
        );
      },
    },
    {
      cue: "16.jetty",
      ...cam.orbit({ on: [0, 1.2, 9], dist: 14.5, distTo: 9.8, yaw: -22, yawTo: 16, pitch: 10, fov: 46, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Every neighbour packs the soaked wooden jetty hauling rods continuously in heavy dawn rain.",
      stage: (t) => (
        <>
          {JETTY_CROWD.map(([x, z], i) => renderVillagerRod(x, z, i, t))}
          <FishPile position={[1.6, 0.5, 12.2]} n={14} seed={11} />
        </>
      ),
    },
    {
      cue: "16.allnight",
      ...cam.push({ on: [0, 1.3, 11.4], dist: 4.5, to: 2.9, yaw: 22, pitch: 4, fov: 40, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Soaked exhausted neighbours heave straining rods up without stopping even a second as Hero pauses behind.",
      stage: (t) => (
        <>
          {renderVillagerRod(-0.8, 11.6, 0, t * 1.4, true)}
          {renderVillagerRod(0.9, 12.0, 1, t * 1.4 + 0.5, true)}
          <FishPile position={[0.1, 0.5, 11.0]} n={8 + Math.round(Math.min(1, t) * 4)} seed={13} />
          <Hero position={[0, 0.5, 10.1 + ease(ramp(t, 0, 1.2)) * 0.45]} rotationY={SOUTH} animation="walk" animDistance={t * 0.7} face="crying" time={t} />
        </>
      ),
    },
    {
      cue: "16.basket",
      ...cam.push({ on: [0, 1.2, 15], dist: 6.4, to: 4.4, yaw: -16, pitch: 6, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Wooden basket drops swinging right onto planks with Keeper standing upright as Hero rushes closer.",
      stage: (t) => {
        const heroWalk = walkSegment([0.2, 0.5, 11.8], [0.2, 0.5, 13.0], t, 0, 1.2);
        return (
          <>
            <Basket position={[0, 0.5 + 0.08 * Math.sin(t * 3.2), 15]} rope={2.4 + 0.08 * Math.sin(t * 3.2 + 1)} swing={Math.sin(t * 3) * 0.35} />
            <Keeper position={[0, 0.5 + 0.08 * Math.sin(t * 3.2), 15]} rotationY={SOUTH} animation="talk" face="blank" time={t} />
            <Hero {...heroWalk} face="surprised" headPitch={-0.2} time={t} />
          </>
        );
      },
    },
    {
      cue: "16.year",
      ...cam.push({ on: [0, 1.45, 14.8], dist: 4.0, to: 2.55, yaw: 14, pitch: 2, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Keeper turns head calculatingly sideways toward growing mountain of wet silver fish.",
      stage: (t) => (
        <>
          <Keeper position={[0, 0.5, 15]} rotationY={SOUTH - Math.min(0.45, t * 0.35)} animation={t < 1.2 ? "talk" : "point"} face="blank" headPitch={0.15} time={t} />
          <FishPile position={[-1.4, 0.5, 14.2]} n={16 + Math.round(Math.min(1, t) * 4)} seed={17} />
        </>
      ),
    },
  ],
});

/** A villager with a rod held cleanly, actively reeling. */
function renderVillagerRod(x: number, z: number, i: number, t: number, tired = false) {
  return (
    <FishingVillager
      key={i}
      position={[x, 0.5, z + Math.sin(t * 2 + i) * 0.08]}
      rotationY={x < 0 ? SOUTH - 0.3 : SOUTH + 0.3}
      strain={tired ? 0.65 + 0.15 * Math.sin(t * 3) : 0.4 + 0.2 * Math.sin(t * 3 + i)}
      bend={0.3 + Math.sin(t * 4 + i) * 0.1}
    />
  );
}
