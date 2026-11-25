import { cam, storyScene } from "../../engine";
import { Coin, FishPile, Hero, NORTH, RichKid, Rod, SOUTH, Villager, WEST, tw, timing } from "./kit";

/**
 * 04 — The itch.
 *
 * The good life, then the people above it not looking down. The coin is the only thing that ever comes down the
 * mountain in this film, and it is worth nothing.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A good life, wet",
  shots: [
    {
      cue: "4.good",
      ...cam.push({ on: [0, 1.2, 9.6], dist: 13.5, to: 11.6, yaw: -14, pitch: 6, fov: 46 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "The good version of the same jetty: fish, laughing, a kid with his sleeves wet. Everybody in this shot is enjoying themselves, which is why the rest of the film can hurt.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 9.8]} rotationY={NORTH} animation="laugh" face="laugh" />
          <FishPile position={[0.8, 0.5, 9.0]} n={11} seed={3} />
          <Villager position={[-1.4, 0.5, 9.2]} rotationY={SOUTH} hmm={0.4} />
          <Villager position={[1.6, 0.5, 10.6]} rotationY={NORTH} strain={0.3} kid />
          <Rod position={[1.9, 0.95, 10.5]} bend={0.2 + Math.sin(t * 2) * 0.05} />
        </>
      ),
    },
    {
      cue: "4.care",
      ...cam.push({ on: [0, 1.6, 10], dist: 4.4, to: 4.0, yaw: 0, pitch: -26, fov: 46 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Tilt up from the town to the ledge: the shot looks past four people at a group in clean clothes who do not look back. Nobody down here is even in their frame.",
      stage: () => (
        <>
          <Hero position={[0, 0.5, 10]} rotationY={SOUTH} animation="idle" headPitch={-0.5} face="neutral" lookAt={[6, 6.0, -31]} />
          <Villager position={[-1.2, 0.5, 9.4]} rotationY={NORTH} />
          <RichKid position={[6.2, 5.85, -31.4]} rotationY={NORTH} animation="idle" face="blank" />
          <RichKid position={[7.2, 5.85, -31.6]} rotationY={NORTH} animation="idle" face="blank" />
        </>
      ),
    },
    {
      cue: "4.coin",
      ...cam.push({ on: [0.2, 1.1, 10.6], dist: 3.9, to: 3.4, yaw: -4, pitch: -8, fov: 36 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "A coin comes down past the lens and hits the water beside the jetty. Above, a rich kid's arm is still out, and he is not looking at where it lands.",
      stage: (t) => {
        const fall = Math.min(1, t / 1.4);
        const y = 7.5 - fall * fall * 7.4;
        return (
          <>
            <Coin position={[0.5, y, 11.2]} spin={t * 9} />
            <Hero position={[0, 0.5, 10.6]} rotationY={SOUTH} animation="idle" face={t > 1.2 ? "surprised" : "neutral"} headPitch={t > 1.2 ? 0.4 : -0.2} lookAt={[0.5, Math.max(0.1, y), 11.2]} />
            <RichKid position={[6.0, 5.85, -31.3]} rotationY={SOUTH} animation="wave" />
          </>
        );
      },
    },
    {
      cue: "4.want",
      ...cam.push({ on: [0, 1.42, 10.6], dist: 3.9, to: 3.4, yaw: 10, pitch: 1, fov: 34, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "His face, wet from the spray, looking up at a mountain he is not allowed to climb. On 'just once' he does not smile, which keeps the wish honest.",
      stage: (t) => (
        <Hero position={[0, 0.5, 10.6]} rotationY={NORTH} animation="idle" headPitch={-0.55} face={tw(t, 0.4, 0.9) > 0.5 ? "brave" : "uneasy"} lookAt={[2, 30, -31]} />
      ),
    },
  ],
});
