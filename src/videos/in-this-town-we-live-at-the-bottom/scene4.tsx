import { cam, storyScene } from "../../engine";
import { Coin, FishPile, Hero, NORTH, RichKid, Rod, SOUTH, Villager, ease, ramp, tw, timing } from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "A good life, wet",
  shots: [
    {
      cue: "4.good",
      ...cam.orbit({ on: [0, 1.2, 9.6], dist: 12.2, distTo: 8.2, yaw: -24, yawTo: 18, pitch: 8, fov: 44, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Golden afternoon jetty buzzing with movement: Hero laughs bouncing beside proud kid reeling rod and neighbor hauling catch.",
      stage: (t) => {
        const sway = Math.sin(t * 3.5);
        return (
          <>
            <Hero position={[0, 0.5, 9.8]} rotationY={NORTH} animation="laugh" face="laugh" time={t * 1.4} />
            <FishPile position={[0.8, 0.5, 9.0]} n={11} seed={3} />
            <Villager position={[-1.4, 0.5, 9.2 - t * 0.2]} rotationY={SOUTH} hmm={0.4 + 0.2 * sway} walk={t * 0.5} />
            <Villager position={[1.6, 0.5, 10.6]} rotationY={NORTH} strain={0.3 + 0.2 * sway} kid />
            <Rod position={[1.9, 0.95, 10.5]} bend={0.2 + sway * 0.1} />
          </>
        );
      },
    },
    {
      cue: "4.care",
      ...cam.crane({ on: [0, 1.5, 9.6], onTo: [4.5, 5.2, -26], dist: 5.2, toDist: 8.5, yaw: 6, fromPitch: -18, toPitch: 4, fov: 44, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Crane surges skyward past gazing townsfolk right up to rich ledge where clean kids turn their backs.",
      stage: (t) => {
        const turn = ease(ramp(t, 0, 1.3));
        return (
          <>
            <Hero position={[0, 0.5, 10]} rotationY={SOUTH} animation="lookAround" headPitch={-0.5} face="neutral" lookAt={[6, 6.0, -31]} time={t} />
            <Villager position={[-1.2, 0.5, 9.4]} rotationY={NORTH} hmm={0.3 + turn * 0.2} />
            <RichKid position={[6.2 + turn * 0.3, 5.85, -31.4]} rotationY={NORTH} animation="walk" animDistance={turn * 0.4} face="blank" time={t} />
            <RichKid position={[7.2 - turn * 0.2, 5.85, -31.6]} rotationY={NORTH} animation="shrug" face="blank" time={t} />
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
