import { cam, storyScene } from "../../engine";
import { EchoTrace, Friend, GYM, Hero, NORTH, NightGym, SubscribeSign, timing, wordAt } from "./kit";

const HERO: [number, number, number] = GYM.at(-0.72, 0.88, -6.5);
const ELI: [number, number, number] = GYM.at(0.72, 0.88, -7.5);
const LAST_BLOCK: [number, number, number] = GYM.at(2.95, 1.35, -9.42);

/** The final goodbye belongs to the scene they choose to act, not to the narrator's fear. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "A goodbye, together",
  shots: [
    {
      cue: "14.scene",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.55, -6.9), dist: 4.0, to: 3.45, yaw: 5, pitch: 4, fov: 42 }),
      zone: "gym",
      note: "The two friends take their places in the stage light and act the play's goodbye together. Eli reads a line; the narrator answers it, both safely inside the scene they have chosen.",
      stage: (t) => (
        <>
          <Hero position={HERO} rotationY={NORTH - 0.35} animation="talk" face="brave" arms="talk" gaze={0} />
          <Friend position={ELI} rotationY={0.35} animation="talk" face="calm" arms="talk" gaze={0} />
        </>
      ),
    },
    {
      cue: "14.out",
      look: "overworld-night",
      ...cam.push({ on: [LAST_BLOCK[0], LAST_BLOCK[1] + 0.22, LAST_BLOCK[2]], dist: 3.25, to: 2.7, yaw: 0, pitch: 5, fov: 38 }),
      zone: "gym",
      note: "The same cool-blue square rings leave the brick on 'echo', but now both boys laugh in the soft stage light behind it. The power did not change; what the words mean did.",
      stage: (t) => (
        <>
          <NightGym air={0.45} spill={0.3} key={7} on={HERO} />
          <EchoTrace at={LAST_BLOCK} t={t - wordAt("14.out", "echo")} />
          <Hero position={HERO} rotationY={NORTH - 0.35} animation="laugh" face="laugh" />
          <Friend position={ELI} rotationY={0.35} animation="laugh" face="laugh" />
        </>
      ),
    },
    {
      cue: "14.sub",
      look: "overworld-night",
      ...cam.push({ on: [0, 2.2, GYM.at(0, 0, -5.7)[2]], dist: 3.6, to: 3.1, yaw: 0, pitch: 2, fov: 40 }),
      zone: "gym",
      note: "The red 3D subscribe sign replaces the echo block in the foreground. The boys stay together behind it, and the last picture answers the mistake: he listens to Eli rather than the walls.",
      stage: () => (
        <>
          <SubscribeSign position={[0, 2.0, GYM.at(0, 0, -5.7)[2]]} scale={0.95} tilt={-0.03} />
          <Hero position={HERO} rotationY={NORTH - 0.35} animation="idle" face="smile" />
          <Friend position={ELI} rotationY={0.35} animation="idle" face="grin" />
        </>
      ),
    },
  ],
});
