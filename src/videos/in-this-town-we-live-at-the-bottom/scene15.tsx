import { cam, storyScene, walkSegment } from "../../engine";
import { Gate, Hero, Jar, Keeper, NORTH, SOUTH, ease, ramp, top, timing } from "./kit";

export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "Just a street",
  shots: [
    {
      cue: "15.sit",
      ...cam.push({ on: top(-0.15, 0.95, 2.5), dist: 5.2, to: 4.1, yaw: 22, pitch: 10, fov: 46, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-sunset",
      note: "Dusk settles as Hero sits uncropped on Stoop Step 1 front lip (z=2.75) with shins overhanging Step 2 cleanly beside grounded jar.",
      stage: (t) => {
        const slump = ease(ramp(t, 0, 0.8));
        return (
          <>
            <Gate position={top(0, 0, 0)} open={0} />
            <Hero position={top(-0.45, 0.13, 2.75)} rotationY={SOUTH} animation="sit" face="crying" headPitch={0.18 + slump * 0.1} time={t} />
            <Jar position={top(0.2, 0.48, 2.45)} fill={1} scale={0.9} />
          </>
        );
      },
    },
    {
      cue: "15.street",
      ...cam.push({ on: top(0.0, 1.25, -2.5), onTo: top(0.05, 1.35, -6.0), dist: 6.0, to: 3.4, yaw: 0, pitch: 4, fov: 54, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-night",
      note: "Starting behind/beside Hero's shoulder looking through bars, camera pushes into the lamp-lit quartz townhouse street as Keeper walks away.",
      stage: (t) => {
        const keeperWalk = walkSegment(top(0.15, 0, -2.0), top(0.15, 0, -6.0), t, 0, 3.6, { endYaw: NORTH });
        return (
          <>
            <Gate position={top(0, 0, 0)} open={0} />
            <Keeper {...keeperWalk} face="blank" time={t} />
            <Hero position={top(-0.12, 0, 0.65)} rotationY={NORTH + 0.12} animation="peek" face="uneasy" time={t} />
          </>
        );
      },
    },
  ],
});
