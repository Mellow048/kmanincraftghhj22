import { cam, storyScene } from "../../engine";
import { Boat, EAST, Hero, Line, NORTH, PLACE, RichKid, Rod, SOUTH, Villager, WEST, timing } from "./kit";

/**
 * 01 — Hook. Bright frame one, and the whole shape of the film in three lines.
 *
 * The lens stands on the water, south of the jetty, and looks north up the mountain, so the sun on the top of the
 * mountain is in the same frame as the people it has not reached yet.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "We live at the bottom",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.2, 8.6], dist: 17.5, to: 14.6, yaw: 3, pitch: 6, fov: 46 }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Frame one: wet planks, four rods, grey water, and the mountain filling the top of frame with the sun already on it. He is the orange shirt in the middle, and he is not looking at the fish.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={NORTH} animation="idle" headPitch={0.2} face="smile" />
          <Rod position={[0.35, 0.95, 9.9]} rotationY={0.1} bend={0.3 + Math.sin(t * 2) * 0.05} />
          <Line position={[0.5, 0.9, 8.6]} length={1.2} bob={Math.sin(t * 3) * 0.03} />
          {[[-1.4, 7.6], [1.5, 8.4], [-1.2, 11.2]].map(([x, z], i) => (
            <group key={i}>
              <Villager position={[x, 0.5, z]} rotationY={NORTH} walk={0} lookAt={[0, 0.6, z + 3]} />
              <Rod position={[x + 0.3, 0.95, z - 0.1]} rotationY={0.2 * (i - 1)} bend={0.25} />
            </group>
          ))}
          <Boat position={[3.1, 0, 12.4]} rotationY={0.15} bail={0.3} />
        </>
      ),
    },
    {
      cue: "1.above",
      ...cam.push({ on: [6.4, 9.6, -31.6], dist: 15, to: 12.6, yaw: -8, pitch: 6, fov: 40 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "On 'up there', cut to the ledge a third of the way up the mountain: three people in clean clothes in full sun, and the town a long way below them in shadow.",
      stage: () => (
        <>
          <RichKid position={[5.6, 9.25, -31.2]} rotationY={0.2} animation="idle" face="blank" />
          <RichKid position={[7.4, 9.25, -31.4]} rotationY={-0.3} animation="idle" face="smug" />
          <Villager position={[6.5, 9.25, -32.0]} rotationY={0.1} robe="#f2f2ee" hat="none" />
        </>
      ),
    },
    {
      cue: "1.going",
      ...cam.truck({ on: [0, 1.1, 9.4], dist: 4.4, yaw: -30, pitch: 2, fov: 42, by: [0.9, 0, -1.2] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Round to his face with the mountain behind it. On 'join them' he tips his head back at the top and the rod dips, forgotten.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={NORTH} animation="idle" headPitch={-0.45} face={t > 1.1 ? "smile" : "neutral"} lookAt={[6, 30, -31]} />
          <Rod position={[0.35, 0.95, 9.9]} rotationY={0.1} bend={0.55} />
        </>
      ),
    },
  ],
});
