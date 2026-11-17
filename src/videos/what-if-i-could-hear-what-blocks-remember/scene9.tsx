import { Block, cam, storyScene, stride } from "../../engine";
import { EchoTrace, Friend, GYM, Hero, NORTH, NightGym, ramp, timing, wordAt } from "./kit";

const BACKSTAGE: [number, number, number] = GYM.at(-3.2, 1.25, -9.34);
const SCRIPT_FLOOR: [number, number, number] = GYM.at(-1.85, 0.14, -6.95);

/** Eli catches him before the wrong interpretation turns into a goodbye. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Wait",
  shots: [
    {
      cue: "9.call",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(-0.8, 1.28, -5.0), dist: 4.5, to: 3.85, yaw: 8, pitch: 6, fov: 42 }),
      zone: "gym",
      note: "Eli comes around the curtain edge and calls after him. Keep the boy in orange in the foreground and Eli's teal shirt in the second plane, saying 'wait' with a raised hand, not as another ghost.",
      stage: (t) => {
        const approach = stride(GYM.at(-4.4, 0, -6.8), GYM.at(-2.15, 0, -6.15), ramp(t, wordAt("9.call", "wait") - 0.18, wordAt("9.call", "you")));
        return (
          <>
            <Hero position={GYM.at(-0.3, 0, -4.5)} rotationY={NORTH} animation="idle" face="fear" headYaw={0.2} />
            <Friend {...approach} animation="walk" arms="reach" face="uneasy" headPitch={0.08} />
          </>
        );
      },
    },
    {
      cue: "9.echo",
      look: "overworld-night",
      ...cam.push({ on: [BACKSTAGE[0], BACKSTAGE[1] + 0.2, BACKSTAGE[2]], dist: 3.2, to: 2.65, yaw: 0, pitch: 4, fov: 38 }),
      zone: "gym",
      note: "A new set of the same blue rings comes from behind the curtain. The source is another block, not Eli's mouth, so the boy keeps turning toward the wrong witness.",
      stage: (t) => (
        <>
          <NightGym air={0.5} spill={0.24} />
          <EchoTrace at={BACKSTAGE} t={t - wordAt("9.echo", "echo")} />
        </>
      ),
    },
    {
      cue: "9.script",
      look: "overworld-night",
      ...cam.push({ on: [SCRIPT_FLOOR[0], 0.42, SCRIPT_FLOOR[2]], dist: 2.8, to: 2.2, yaw: 0, pitch: 21, fov: 36 }),
      zone: "gym",
      note: "Eli drops the folded script onto the stage boards and follows the narrator around the curtain. The camera stays on the pages for the cut: the clue is literally at their feet.",
      stage: (t) => {
        const drop = ramp(t, wordAt("9.script", "dropped") - 0.12, wordAt("9.script", "script"));
        const walk = stride(GYM.at(-3.4, 0, -5.9), GYM.at(-1.0, 0, -4.4), ramp(t, wordAt("9.script", "followed") - 0.2, wordAt("9.script", "followed") + 0.5));
        return (
          <>
            <Block position={SCRIPT_FLOOR} size={[0.76, 0.045, 0.96]} color="#eee6d2" rotationY={-0.12} />
            <Block position={[SCRIPT_FLOOR[0] + 0.42, SCRIPT_FLOOR[1] + 0.018, SCRIPT_FLOOR[2] + 0.02]} size={[0.72, 0.04, 0.92]} color="#faf4e5" rotationY={0.1} />
            {[-0.22, -0.02, 0.18].map((z) => <Block key={z} position={[SCRIPT_FLOOR[0] - 0.2, SCRIPT_FLOOR[1] + 0.046, SCRIPT_FLOOR[2] + z]} size={[0.35, 0.008, 0.012]} color="#8d99a0" castShadow={false} />)}
            <Friend {...walk} animation="walk" face="uneasy" arms="reach" />
            <Hero position={GYM.at(-0.2, 0, -3.8 + 0.12 * drop)} rotationY={NORTH} animation="idle" face="fear" />
          </>
        );
      },
    },
  ],
});
