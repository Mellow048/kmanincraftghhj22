import { cam, storyScene } from "../../engine";
import { Friend, Gate, Guard, Hero, Jar, NORTH, SOUTH, ease, ramp, tw, timing } from "./kit";

export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "What if there is nothing",
  shots: [
    {
      cue: "12.walk",
      ...cam.truck({ on: [0, 1.1, -6.4], dist: 4.8, yaw: 48, pitch: 4, fov: 44, by: [0, 0, -2.2], screenOffset: [0, 0.08] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "Hero and Friend walk quietly down the lane toward the guarded Mountain Entrance Gate.",
      stage: (t) => (
        <>
          <Gate position={[0, 0, -10.8]} open={0} />
          <Guard position={[0, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
          <Hero position={[0.45, 0, -6.2 - t * 1.1]} rotationY={NORTH} animation="walk" animDistance={t * 1.1} face="uneasy" time={t} />
          <Friend position={[-0.45, 0, -6.0 - t * 1.1]} rotationY={NORTH} animation="walk" animDistance={t * 1.1 + 0.4} face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "12.q",
      ...cam.push({ on: [-0.2, 1.38, -8.4], dist: 3.9, to: 2.45, yaw: 26, pitch: 2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Friend steps around facing Hero earnestly pointing upward at the tall stone mountain above the gate.",
      stage: (t) => {
        const turn = ease(ramp(t, 0.4, 1.4));
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={0} />
            <Guard position={[0.9, 0, -9.8]} rotationY={SOUTH} animation="guard" face="blank" time={t} />
            <Friend position={[-0.5 + turn * 0.15, 0, -8.2]} rotationY={SOUTH} animation={t > 0.5 ? "talk" : "point"} face="worried" headPitch={t > 1.2 ? 0.1 : -0.35} lookAt={[0.3, 1.4, -8.8]} time={t} />
            <Hero position={[0.3, 0, -8.8]} rotationY={SOUTH} animation="idle" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "12.a",
      ...cam.push({ on: [-0.2, 1.4, -9.2], dist: 4.0, to: 2.6, yaw: -22, pitch: -2, fov: 38, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Hero sets the town's jar on the Guard's toll counter to pay the lifetime entry fee as the mountain gate swings open.",
      stage: (t) => {
        const pay = tw(t, 0.45, 1.35);
        return (
          <>
            <Gate position={[0, 0, -10.8]} open={pay} />
            <Guard position={[1.1, 0, -9.8]} rotationY={-0.6} animation={pay > 0.5 ? "point" : "guard"} face="blank" time={t} />
            <Hero position={[0, 0, -9.0]} rotationY={NORTH} animation={t < 0.8 ? "talk" : "reach"} face={pay > 0.5 ? "brave" : "frown"} time={t} />
            <Jar position={[-1.9, 1.12, -9.9]} fill={1} scale={0.9} />
          </>
        );
      },
    },
  ],
});
