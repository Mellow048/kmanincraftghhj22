import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, IronGolem, ROBE, SOUTH, Villager, golemHand, pop, ramp, timing } from "./kit";

const POST: Vec3 = [0, 0, 0];
/** The arm is out at this angle to hold a flower down to a hand. */
const GIVE = -0.9;

/**
 * BEAT 1 — the hook. Placeholder staging: two shots, enough for the film to
 * check and render while the script waits for the owner's yes.
 *
 * Rule A (Topics/InThisTown/OWNER.md): frame one is the strange thing itself,
 * with the person it is strange for, in one frame — the golem's hand, the
 * rose, the villager taking it, and the boy small at the edge of the picture.
 * Not a wide shot of the town.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The hook",
  shots: [
    {
      cue: "1.flower",
      ...cam.push({ on: golemHand(POST, SOUTH, GIVE, 1, 1), dist: 3.2, to: 2.6, yaw: 14, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The premise in one picture: a hand of iron holding a rose out, a villager's hand under it, and the boy who is going to ask about it at the edge of the frame.",
      stage: (t) => (
        <>
          <IronGolem position={POST} rotationY={SOUTH} armR={GIVE} headPitch={0.28} />
          <Villager position={[0.28, 0, 1.32]} rotationY={SOUTH - 0.3} robe={ROBE.white} lean={0.18} lookAt={golemHand(POST, SOUTH, GIVE)} phase={0.4} />
          <Hero position={[-1.62, 0, 1.5]} rotationY={SOUTH + 0.55} animation="idle" face="calm" gaze={1} />
        </>
      ),
    },
    {
      cue: "1.every",
      ...cam.push({ on: [-1.62, 1.2, 1.5], dist: 2.0, to: 1.5, yaw: 10, pitch: 3, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Cut in to the teller: he is watching the flower go to somebody else. The face carries 'every single morning, to somebody new'.",
      stage: (t) => (
        <>
          <Hero position={[-1.62, 0, 1.5]} rotationY={SOUTH + 0.55} animation="idle" face={t < 0.9 ? "calm" : "frown"} gaze={1} />
          <IronGolem position={POST} rotationY={SOUTH} armR={0.1} />
        </>
      ),
    },
  ],
});

void pop;
void ramp;
