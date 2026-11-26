import { cam, storyScene, walkSegment } from "../../engine";
import { EAST, Friend, Gate, Guard, Hero, Jar, NORTH, SOUTH, WEST, ease, ramp, tw, timing } from "./kit";

export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "What if there is nothing",
  shots: [
    {
      cue: "12.walk",
      ...cam.truck({ on: [0, 1.1, -7.4], dist: 8.2, yaw: 44, pitch: 6, fov: 50, by: [0, 0, -2.2], screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Side-front 3/4 view: Hero and Friend walk quietly down the lane toward Guard at unified Mountain Entrance Gate.",
      stage: (t) => {
        const hWalk = walkSegment([0.45, 0, -6.2], [0.45, 0, -8.4], t, 0, 1.9, { endYaw: NORTH });
        const fWalk = walkSegment([-0.45, 0, -6.0], [-0.45, 0, -8.2], t, 0, 1.9, { endYaw: NORTH });
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Guard position={[0, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
            <Hero {...hWalk} face="uneasy" time={t} />
            <Friend {...fWalk} face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.q",
      ...cam.push({ on: [0.05, 1.38, -8.8], dist: 5.2, to: 4.3, yaw: 20, pitch: 2, fov: 48, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Friend faces Hero 3/4 pointing smoothly upward at the towering mountain peak.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.4, 1.4));
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Guard position={[0.6, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
            <Friend position={[-0.45, 0, -8.2]} rotationY={EAST - 0.35 + turn * 0.15} animation={t > 0.65 ? "talk" : "point"} face="worried" headPitch={t > 1.2 ? 0.08 : -0.38} time={t} />
            <Hero position={[0.35, 0, -8.6]} rotationY={WEST + 0.35} animation="idle" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.a",
      ...cam.push({ on: [-0.35, 1.35, -9.55], dist: 6.8, to: 6.1, yaw: -20, pitch: 4, fov: 54, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Side-front 3/4 view: Hero sets town's jar on the Guard's toll counter as the mountain gate swings open.",
      stage: (t) => {
        const pay = tw(t, 0.45, 1.35);
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={pay} />
            <Guard position={[0.65, 0, -9.8]} rotationY={-0.35} animation={pay > 0.5 ? "talk" : "guard"} lookAt={[-0.85, 1.1, -9.4]} face="blank" time={t} />
            <Hero position={[-0.85, 0, -9.4]} rotationY={WEST + 0.45} animation={t < 0.7 ? "talk" : "reach"} face={pay > 0.5 ? "brave" : "frown"} time={t} />
            <Jar position={[-1.55, 1.1, -9.75]} fill={1} scale={0.9} />
          </>
        );
      },
    },
  ],
});
