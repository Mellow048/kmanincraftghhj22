import { cam, storyScene } from "../../engine";
import { Basket, Bucket, FishPile, Hero, Keeper, LANE_CROWD, NORTH, PLACE, SOUTH, Villager, timing } from "./kit";

/**
 * 06 — The man in the clean coat.
 *
 * He comes down once a year in a basket. He buys everything, touches nothing, and while he is here the whole town
 * stands up straight. Every one of these plants the turnaround in beat 16, when he comes back down for a year of fish.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Once a year",
  shots: [
    {
      cue: "6.basket",
      from: [0, 0.9, 21.5],
      to: [0, 2.4, 19.4],
      target: [0, 3.6, 15],
      targetTo: [0, 0.9, 15],
      fov: 46,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "The basket comes down the rope onto the end of the jetty, and the rope goes up out of frame. Nobody in this town has ever seen the other end of it.",
      stage: (t) => {
        const drop = Math.min(1, t / 2.2);
        const y = 6.5 - drop * 6.0;
        return (
          <>
            <Basket position={[0, 0.5 + y, 15]} rope={y + 6} swing={Math.sin(t * 1.4) * 0.4} />
            <Hero position={[0, 0.5, 12.6]} rotationY={NORTH} animation="idle" face="wow" headPitch={-0.4} lookAt={[0, 4, 15]} />
            <Villager position={[-1.4, 0.5, 12.2]} rotationY={NORTH} lookAt={[0, 3, 15]} />
          </>
        );
      },
    },
    {
      cue: "6.coat",
      ...cam.push({ on: [0, 1.5, 14.6], dist: 3.9, to: 3.4, yaw: 6, pitch: 0, fov: 36, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "The coat. White, dry, and about a metre from a town that smells of fish; the contrast is the entire class system in one frame.",
      stage: () => (
        <Keeper position={[0, 0.5, 15]} rotationY={SOUTH} animation="idle" face="blank" headPitch={0.1} />
      ),
    },
    {
      cue: "6.touch",
      ...cam.push({ on: [0.2, 1.15, 13.6], dist: 3.9, to: 3.4, yaw: -24, pitch: 2, fov: 38 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The fish go hand to hand to hand and stop before him: he steps back rather than touch one, and somebody else puts it in his basket.",
      stage: (t) => (
        <>
          <Keeper position={[0.5, 0.5, 15]} rotationY={SOUTH} animation={t > 0.8 ? "idle" : "walk"} face="blank" />
          <Villager position={[-0.9, 0.5, 13.4]} rotationY={NORTH} strain={0.4} />
          <Villager position={[0.2, 0.5, 12.8]} rotationY={NORTH} kid />
          <Bucket position={[-0.2, 1.0, 13.2]} scale={0.9} />
          <FishPile position={[1.1, 0.55, 14.2]} n={6} seed={9} />
        </>
      ),
    },
    {
      cue: "6.straight",
      ...cam.push({ on: [0, 1.3, -2.0], dist: 7.2, to: 6.2, yaw: 0, pitch: 3, fov: 46 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The lane: every single person standing straight, hands down, watching him walk past. The town's posture does the work; nobody says a word.",
      stage: () => (
        <>
          {LANE_CROWD.map(([x, z], i) => (
            <Villager key={i} position={[x, 0, z]} rotationY={i % 2 ? NORTH : SOUTH} kid={i % 3 === 0} />
          ))}
          <Keeper position={[0.4, 0, 1.6]} rotationY={SOUTH} animation="walk" />
          <Hero position={[2.9, 0, -1.4]} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
  ],
});
