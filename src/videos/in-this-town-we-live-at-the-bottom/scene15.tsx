import { cam, storyScene } from "../../engine";
import { Gate, Hero, Jar, Keeper, SOUTH, ease, ramp, top, timing } from "./kit";

export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "Just a street",
  shots: [
    {
      cue: "15.sit",
      ...cam.push({ on: top(0.2, 1.1, -297.6), dist: 5.2, to: 3.6, yaw: -24, pitch: 8, fov: 42, screenOffset: [0, 0.08] }),
      zone: "top",
      look: "overworld-day",
      note: "Hero slumps exhausted onto top stone step beside jar as gate wall looms behind.",
      stage: (t) => {
        const slump = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Gate position={top(0, 0, -300)} />
            <Hero position={top(-1.2, 0, -297.8 + slump * 0.15)} rotationY={SOUTH} animation={t < 0.6 ? "sitDown" : "sit"} face="sad" headPitch={0.25} time={t} />
            <Jar position={top(-0.6, 0.05, -297.6)} fill={1} scale={0.9} />
          </>
        );
      },
    },
    {
      cue: "15.street",
      ...cam.orbit({ on: top(0, 1.6, -305.5), dist: 7.5, distTo: 5.4, yaw: -16, yawTo: 18, pitch: 6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "top",
      look: "overworld-day",
      note: "Keeper walks away alone past empty stone bench and plaster lamp along quiet sterile street.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, -300)} />
          <Keeper position={top(-0.4, 0, -301.5 - t * 1.4)} rotationY={Math.PI} animation="walk" animDistance={t * 1.6} face="blank" />
          <Hero position={top(-1.2, 0, -298.2)} rotationY={Math.PI} animation="lookAround" face="uneasy" time={t} />
        </>
      ),
    },
  ],
});
