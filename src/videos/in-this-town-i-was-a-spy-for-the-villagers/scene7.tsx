import { cam, storyScene } from "../../engine";
import { Hero, Pillager, PLACE, SunMarker, TargetTower, timing } from "./kit";

/** The painted sunrise tells the spy when the bell will be hit. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The dawn plan",
  shots: [
    {
      cue: "7.sign",
      ...cam.push({ on: [74, 1.45, 1.0], dist: 3.2, to: 2.2, yaw: 5, pitch: 3, fov: 36 }),
      zone: "camp",
      look: "overworld-day",
      note: "A push to the rough wooden sign reveals the painted sun beside the practice village.",
      stage: () => <><SunMarker position={[74, 0, 0.6]} /><Hero position={[67, 0, 8]} masked animation="crouch" face="uneasy" /></>,
    },
    {
      cue: "7.sun",
      ...cam.top({ on: [74, 1.2, 0.8], height: 4.6, to: 3.4, spin: [0, 11], fov: 38 }),
      zone: "camp",
      look: "overworld-day",
      note: "An odd top-down angle isolates the rising sun symbol, a simple visual clue instead of a list of plans.",
      stage: (t) => <><SunMarker position={[74, 0, 0.6]} /><Pillager position={[72.3, 0, -0.1]} n={0} walk={t * 0.1} /></>,
    },
    {
      cue: "7.point",
      ...cam.pan({ from: [78, 2.7, 7], on: [75, 1.35, 3], onTo: [70, 2.4, 3.6], fov: 39 }),
      zone: "camp",
      look: "overworld-day",
      note: "The lens pans from the leader's pointing hand to the target tower and its tiny gold bell.",
      stage: (t) => (
        <>
          <SunMarker position={[74, 0, 0.6]} />
          <TargetTower position={[70, 0, 3.6]} scale={0.94} />
          <Pillager position={[76, 0, 4.8]} n={0} chief armR={-1.4} turn={Math.sin(t * 2) * 0.04} />
          <Hero position={[67.2, 0, 7.2]} masked animation="crouch" face="worried" />
        </>
      ),
    },
    {
      cue: "7.dawn",
      ...cam.push({ on: [75.9, 2.2, 4.7], dist: 3.5, to: 2.8, yaw: -22, pitch: 7, fov: 36 }),
      zone: "camp",
      look: "overworld-day",
      note: "The chief taps the sunrise mark, then points toward the bell as the spy watches from behind a post.",
      stage: (t) => (
        <>
          <SunMarker position={[74, 0, 0.6]} />
          <Pillager position={[76, 0, 4.8]} n={0} chief armR={-1.45} armL={-1.0} talk={0.35} />
          <Hero position={[67.3, 0, 7.1]} masked animation="peek" face="worried" headYaw={Math.sin(t * 3) * 0.08} />
        </>
      ),
    },
    {
      cue: "7.warn",
      ...cam.orbit({ on: [67.5, 1.3, 7.3], dist: 2.6, yaw: -18, yawTo: 20, pitch: 2, fov: 35 }),
      zone: "camp",
      look: "overworld-day",
      note: "A tight orbit holds on the spy's eyes as the threat turns into a decision to get home.",
      stage: (t) => <Hero position={[67.3, 0, 7.1]} masked animation="crouch" face="fear" headYaw={-0.18 + t * 0.08} />,
    },
  ],
});

void PLACE;
