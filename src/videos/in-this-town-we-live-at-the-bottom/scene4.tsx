import { cam, storyScene } from "../../engine";
import { Coin, EAST, FishPile, Hero, NORTH, RichKid, Rod, SOUTH, Villager, ease, ramp, tw, timing } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A good life, wet",
  shots: [
    {
      cue: "4.good",
      ...cam.orbit({ on: [0, 1.2, 9.6], dist: 8.6, distTo: 5.4, yaw: -24, yawTo: 22, pitch: 8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Golden afternoon jetty buzzing with movement: Hero walks laughing past kid reeling angled rod and neighbor hauling catch.",
      stage: (t) => {
        const sway = Math.sin(t * 3.5);
        return (
          <>
            <Hero position={[0, 0.5, 10.4 - t * 0.9]} rotationY={NORTH} animation="walk" animDistance={t * 1.0} face="laugh" time={t * 1.4} />
            <FishPile position={[0.7, 0.52, 9.0]} n={11} seed={3} />
            <Villager position={[-1.0, 0.5, 9.2 - t * 0.6]} rotationY={SOUTH} hmm={0.4 + 0.2 * sway} walk={t * 0.9} />
            <Villager position={[0.9, 0.5, 10.6]} rotationY={EAST} strain={0.3 + 0.2 * sway} kid />
            <Rod position={[1.15, 0.96, 10.6]} rotationY={EAST} bend={0.32 + sway * 0.14} />
          </>
        );
      },
    },
    {
      cue: "4.care",
      ...cam.crane({ on: [0, 1.5, 9.6], onTo: [5.5, 6.8, -30.5], dist: 5.2, toDist: 8.2, yaw: 6, fromPitch: -18, toPitch: 2, fov: 44 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Crane surges skyward past gazing townsfolk right up to Quartz Mansion terrace where rich kids strut and shrug carelessly.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[0, 0.5, 10]} rotationY={SOUTH} animation="lookAround" headPitch={-0.5} face="neutral" lookAt={[6, 6.0, -31]} time={t} />
            <Villager position={[-1.1, 0.5, 9.4]} rotationY={NORTH} hmm={0.3 + turn * 0.2} />
            <RichKid position={[5.4 + turn * 1.1, 5.85, -30.4]} rotationY={NORTH} animation="walk" animDistance={turn * 1.1} face="blank" time={t} />
            <RichKid position={[7.4 - turn * 0.8, 5.85, -30.6]} rotationY={NORTH} animation="shrug" face="blank" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.coin",
      ...cam.push({ on: [0.2, 1.05, 10.6], dist: 4.1, to: 2.6, yaw: -12, pitch: -8, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Spinning gold coin drops straight past Hero's startled face splashing beside jetty planks.",
      stage: (t) => {
        const fall = Math.min(1, t / 1.3);
        const y = 7.5 - fall * fall * 7.4;
        return (
          <>
            <Coin position={[0.5, y, 11.2]} spin={t * 10} />
            <Hero position={[0, 0.5, 10.6]} rotationY={SOUTH} animation={t > 1.0 ? "cower" : "lookAround"} face={t > 1.0 ? "surprised" : "neutral"} headPitch={t > 1.0 ? 0.4 : -0.2} lookAt={[0.5, Math.max(0.1, y), 11.2]} time={t} />
            <RichKid position={[6.0, 5.85, -31.3]} rotationY={SOUTH} animation="wave" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.want",
      ...cam.push({ on: [0, 1.42, 10.6], dist: 3.9, to: 2.35, yaw: 14, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Push tight into Hero clenching wet fists upward gazing unblinkingly toward peak.",
      stage: (t) => {
        const resolve = tw(t, 0.35, 1.0);
        return (
          <Hero position={[0, 0.5, 10.6 - resolve * 0.2]} rotationY={NORTH} animation={resolve > 0.5 ? "point" : "idle"} headPitch={-0.55} face={resolve > 0.5 ? "brave" : "uneasy"} lookAt={[2, 30, -31]} time={t} />
        );
      },
    },
  ],
});
