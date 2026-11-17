import { cam, storyScene, stride } from "../../engine";
import { EchoTrace, Friend, GYM, Hero, NORTH, NightGym, ramp, timing, wordAt } from "./kit";

const GYM_ECHO: [number, number, number] = GYM.at(3.1, 1.35, -9.42);
const FLOOR_ECHO: [number, number, number] = GYM.at(-1.4, 0.3, -5.95);

/** The boy stops checking what the echo means and starts chasing where it came from. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The echo points backstage",
  shots: [
    {
      cue: "8.gym",
      look: "overworld-night",
      ...cam.push({ on: [GYM_ECHO[0], GYM_ECHO[1] + 0.2, GYM_ECHO[2]], dist: 4.2, to: 3.55, yaw: 0, pitch: 4, fov: 40 }),
      zone: "gym",
      note: "The gym's dark red curtain fills the frame. Blue rings spread from a plain brick at its edge; the echo has no name, but the boy now treats it like a direction.",
      stage: (t) => (
        <>
          <NightGym air={0.88} spill={0.36} on={GYM.at(0.8, 0, -6.45)} />
          <Hero position={GYM.at(0.8, 0, -6.45)} rotationY={NORTH} animation="idle" face="fear" headPitch={0.22} />
          <EchoTrace at={GYM_ECHO} t={t - wordAt("8.gym", "tell")} />
        </>
      ),
    },
    {
      cue: "8.run",
      look: "overworld-night",
      ...cam.truck({ on: GYM.at(-4.7, 1.05, 3.4), dist: 5.2, yaw: 0, pitch: 10, fov: 46, by: [4.8, 0, -9.0] }),
      zone: "gym",
      note: "He runs past the basketball lines and the benches toward the back curtain. The lens travels with him; the last cool blue ripple stays ahead, a guide he has decided not to question.",
      stage: (t) => {
        const run = stride(GYM.at(-4.7, 0, 3.4), GYM.at(0.1, 0, -5.9), ramp(t, 0.03, 1.45));
        return (
          <>
            <Hero {...run} animation="run" face="uneasy" headPitch={0.08} />
            <EchoTrace at={GYM_ECHO} t={t - 0.18} />
          </>
        );
      },
    },
    {
      cue: "8.stage",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-2.1, 1.35, -6.2), dist: 5.0, to: 4.4, yaw: 0, pitch: 6, fov: 46 }),
      zone: "gym",
      note: "The stage is still closed. On the word 'light', one warm spotlight snaps on above the curtain and finds the boy at the steps; no person touches the switch in frame.",
      stage: (t) => (
        <>
          <NightGym air={0.45} spill={0.22} on={GYM.at(-2.4, 0, -5.7)} />
          <Hero position={GYM.at(-2.4, 0, -5.7)} rotationY={0.25} animation="idle" face="wow" headYaw={-0.35} />
          <EchoTrace at={GYM_ECHO} t={t - wordAt("8.stage", "light")} />
        </>
      ),
    },
    {
      cue: "8.goodbye",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.3, 1.15, -5.95), dist: 4.8, to: 4.25, yaw: 0, pitch: 8, fov: 48 }),
      zone: "gym",
      note: "The echo comes from one loose gray floor block by the stage steps. The same square rings repeat, while the boy's shadow falls long behind him; the words sound final because he makes them final.",
      stage: (t) => (
        <>
          <Hero position={GYM.at(0.75, 0, -5.9)} rotationY={NORTH} animation="idle" face="fear" headPitch={0.3} />
          <EchoTrace at={FLOOR_ECHO} t={t - wordAt("8.goodbye", "goodbye")} />
        </>
      ),
    },
    {
      cue: "8.stone",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.6, -1.4), dist: 8.8, to: 7.8, yaw: 8, pitch: 9, fov: 46 }),
      zone: "gym",
      note: "A visual of his fear, not a memory: in his mind Eli is already walking away without waving. The real Eli is not shown leaving; the stage light and the narrator's frozen face hold us in the guess.",
      stage: (t) => {
        const away = stride(GYM.at(-0.6, 0, -6.0), GYM.at(-0.6, 0, 6.8), ramp(t, wordAt("8.stone", "Eli"), wordAt("8.stone", "wave")));
        return (
          <>
            <Hero position={GYM.at(0.8, 0, -1.4)} rotationY={NORTH} animation="idle" face="fear" gaze={0} />
            <Friend {...away} animation="walk" face="calm" headPitch={0.16} />
            <EchoTrace at={FLOOR_ECHO} t={t - 0.08} />
          </>
        );
      },
    },
  ],
});
