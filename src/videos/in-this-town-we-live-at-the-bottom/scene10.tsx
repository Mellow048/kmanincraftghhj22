import { cam, storyScene } from "../../engine";
import { Boat, Coin, FishPile, Hero, JettyLantern, Line, NORTH, Rod, SOUTH, Villager, timing } from "./kit";

/**
 * 10 — The grind.
 *
 * Night, rain, storm, and then he starts selling the things he needs to fish with. The rod goes before the boat,
 * because the rod is cheaper to be without and that is the kind of arithmetic this kid is now doing.
 */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Nine days",
  shots: [
    {
      cue: "10.night",
      ...cam.push({ on: [0, 1.2, 10], dist: 12.0, to: 10.2, yaw: -12, pitch: 6, fov: 46 }),
      zone: "bottom",
      look: "overworld-night",
      note: "One lantern on the jetty and a kid alone under it, the water black past the planks. The town is a line of dark roofs behind him.",
      stage: (t) => (
        <>
          <JettyLantern position={[-1.15, 0.5, 10.6]} lit={1.2} />
          <Hero position={[0, 0.5, 10]} rotationY={NORTH} animation="idle" face="blank" headPitch={0.2} />
          <Rod position={[0.35, 0.95, 9.9]} bend={0.3 + Math.sin(t * 2) * 0.06} />
          <Line position={[0.5, 0.9, 8.6]} length={1.2} bob={Math.sin(t * 3) * 0.03} />
        </>
      ),
    },
    {
      cue: "10.storm",
      ...cam.push({ on: [1.6, 1.2, 10.5], dist: 6.4, to: 5.6, yaw: 26, pitch: -4, fov: 46 }),
      zone: "bottom",
      look: "overworld-storm",
      note: "The storm: the boat bucking on the jetty's lee, the kid braced against the rail, rain going sideways. On 'storm' the rod bends flat and he does not let go.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={NORTH} animation="stagger" face="scared" headPitch={0.1} />
          <Rod position={[0.35, 0.95, 9.9]} bend={0.8} />
          <Line position={[0.6, 0.6, 8.2]} length={1.5} bob={Math.sin(t * 9) * 0.12} />
          <Boat position={[3.1, 0, 12.4]} rotationY={0.3 + Math.sin(t * 1.6) * 0.1} bail={0.6} />
        </>
      ),
    },
    {
      cue: "10.rod",
      ...cam.push({ on: [-0.4, 1.0, -4.4], dist: 3.4, to: 2.9, yaw: -20, pitch: 4, fov: 40 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "The rod goes over the stall counter, then the boat is pulled up the slip empty. Two things he needs, gone, in one line.",
      stage: (t) => (
        <>
          <Hero position={[-1.6, 0, -4.6]} rotationY={SOUTH} animation={t < 0.8 ? "reach" : "idle"} face="frown" />
          <Rod position={[-1.2, 1.0, -4.7]} bend={0.1} rotationY={1.2} />
          <Villager position={[-3.2, 0, -4.4]} rotationY={SOUTH} strain={0.3} />
          <Boat position={[3.1, 0, 12.4]} rotationY={0.6} hole bail={0.1} />
        </>
      ),
    },
    {
      cue: "10.count",
      ...cam.push({ on: [0, 1.05, 8.6], dist: 3.9, to: 3.4, yaw: -6, pitch: 42, fov: 36 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "On the planks: forty-one emeralds in a fish bucket, counted twice, and one gap in the pile that is nine hundred and fifty-nine coins wide.",
      stage: () => (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <Coin key={i} position={[0.05 * (i % 3) - 0.05, 0.56 + Math.floor(i / 3) * 0.03, 8.6 + 0.05 * (i % 3)]} spin={i} />
          ))}
          <FishPile position={[0.4, 0.52, 8.5]} n={3} seed={8} />
        </>
      ),
    },
  ],
});
