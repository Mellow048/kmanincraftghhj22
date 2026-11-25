import { cam, storyScene } from "../../engine";
import { Jar, JETTY_CROWD, Hero, NORTH, SOUTH, Villager, ease, ramp, timing } from "./kit";

/**
 * 11 — The vote.
 *
 * The town meets on the jetty at night and does not vote for the top. It votes for his mum, and then it puts eleven
 * years in his bag. This is the emotional centre of the film; every shot is faces, not scenery.
 */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "They voted for my mum",
  shots: [
    {
      cue: "11.meet",
      from: [0, 4.6, 21],
      to: [0, 2.2, 17],
      target: [0, 1.2, 10],
      fov: 46,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "The whole jetty by torchlight, every family standing on planks that are too narrow for them. Thirty people in a queue, and no one has spoken yet.",
      stage: () => (
        <>
          {JETTY_CROWD.map(([x, z], i) => (
            <Villager key={i} position={[x, 0.5, z]} rotationY={NORTH} kid={i % 4 === 0} />
          ))}
          <Hero position={[0, 0.5, 12.4]} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "11.vote",
      ...cam.push({ on: [0, 1.3, 11.2], dist: 4.4, to: 3.8, yaw: -16, pitch: 2, fov: 40 }),
      zone: "bottom",
      look: "overworld-night",
      note: "Hands, and no hands. On 'not for the top' a few go up; on the next line every hand on the jetty is up, and he is the only one with his down.",
      stage: (t) => (
        <>
          {JETTY_CROWD.slice(0, 5).map(([x, z], i) => (
            <Villager key={i} position={[x, 0.5, z]} rotationY={NORTH} strain={ease(ramp(t, 0.2 + i * 0.1, 1.0 + i * 0.1)) * 0.5} kid={i % 2 === 0} />
          ))}
          <Hero position={[0.6, 0.5, 11.6]} rotationY={NORTH} animation="idle" face="surprised" headPitch={-0.1} />
        </>
      ),
    },
    {
      cue: "11.mum",
      ...cam.push({ on: [-0.6, 1.35, 9.2], dist: 3.0, to: 2.6, yaw: 14, pitch: 1, fov: 38 }),
      zone: "bottom",
      look: "overworld-night",
      note: "Two neighbours he has known his whole life, saying her name. Neither of them looks at him while they do it, which is how you know it is a kindness.",
      stage: () => (
        <>
          <Villager position={[-1.1, 0.5, 9.4]} rotationY={SOUTH} hmm={0.4} />
          <Villager position={[0.1, 0.5, 9.7]} rotationY={SOUTH} hat="straw" kid />
          <Hero position={[0.9, 0.5, 10.4]} rotationY={NORTH} animation="idle" face="crying" headPitch={0.1} />
        </>
      ),
    },
    {
      cue: "11.jar",
      ...cam.push({ on: [0, 1.15, 10.6], dist: 2.2, to: 1.9, yaw: -8, pitch: 8, fov: 36 }),
      zone: "bottom",
      look: "overworld-night",
      note: "The jar, handed through four pairs of hands into his bag. The label faces the lens the whole way: THE TOP, in his mum's handwriting.",
      stage: (t) => {
        const k = Math.min(1, t / 1.6);
        return (
          <>
            <Villager position={[-0.9, 0.5, 10.8]} rotationY={SOUTH} strain={0.4} />
            <Villager position={[0.3, 0.5, 11.2]} rotationY={SOUTH} kid />
            <group position={[-0.9 + k * 1.0, 1.05, 10.5 - k * 0.2]}>
              <Jar position={[0, 0, 0]} fill={1} />
            </group>
            <Hero position={[1.2, 0.5, 10.6]} rotationY={SOUTH} animation={t > 1.4 ? "hold" : "idle"} face="crying" />
          </>
        );
      },
    },
    {
      cue: "11.eleven",
      ...cam.push({ on: [0, 1.3, 11], dist: 5.0, to: 4.2, yaw: 4, pitch: -6, fov: 44 }),
      zone: "bottom",
      look: "overworld-night",
      note: "Him holding a jar that is worth eleven years of a whole town, and every one of them standing there watching him take it. The weight is the shot.",
      stage: () => (
        <>
          <Hero position={[0, 0.5, 11]} rotationY={SOUTH} animation="hold" face="crying" headPitch={0.2} />
          <Jar position={[0, 0.95, 11.3]} fill={1} scale={1.05} />
          {JETTY_CROWD.map(([x, z], i) => (
            <Villager key={i} position={[x, 0.5, z]} rotationY={NORTH} kid={i % 5 === 0} />
          ))}
        </>
      ),
    },
  ],
});
