import { cam, storyScene } from "../../engine";
import { Berries, PLACE, RedFlower, SillCup, Sister, Sword, Teller, timing, wordAt } from "./kit";

const BERRY = wordAt("13.berry", "put");
const SUB = wordAt("14.sub", "Subscribe");

/**
 * Scene 6 — THE ANSWER, AND THE ASK.
 *
 * He answers with a berry in the empty cup, because that is the only thing he has ever had that is worth anything. The
 * family line comes back one last time, changed. Then the CTA, on the one question the film has deliberately left open.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "I put a berry in it",
  shots: [
    {
      cue: "13.berry",
      ...cam.push({ on: [-8.7, 1.48, -4.8], dist: 2.9, to: 2.6, yaw: 14, pitch: 4, fov: 38 }),
      zone: "street",
      look: "overworld-day",
      note: "'So I put a berry in it': his muzzle comes up to the empty cup and a single berry goes in. It is a small, badly-made, completely serious gesture. This is the payoff of the whole film, so the camera does not move much and does not look away.",
      stage: (t) => {
        const k = Math.min(1, Math.max(0, (t - BERRY + 0.1) / 0.35));
        return (
          <>
            <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.12]} berry={k >= 1} />
            <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
            <Teller position={[PLACE.sill[0] + 1.05, 0, PLACE.sill[2] + 0.95]} rotationY={-0.106} animation={k < 1 ? "reachUp" : "idle"} face={k < 1 ? "brave" : "smile"} tailUp={0.6} time={t} />
          </>
        );
      },
    },
    {
      cue: "13.bad",
      ...cam.push({ on: [-8.6, 0.85, -3.9], dist: 3.1, to: 2.85, yaw: 20, pitch: 0, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "'I'm a terrible thief': he looks straight at the lens for the only time in the film, and shrugs. A fox shrugging is the joke; a fox shrugging about giving something away is the ending.",
      stage: (t) => <Teller position={[PLACE.sill[0] + 1.05, 0, PLACE.sill[2] + 0.95]} rotationY={-0.001} animation="shrug" face="grin" tailUp={0.5} time={t} />,
    },
    {
      cue: "13.sister",
      ...cam.push({ on: [-9.4, 0.85, -3.7], dist: 3.1, to: 2.85, yaw: 40, pitch: 0, fov: 40 }),
      zone: "street",
      look: "overworld-day",
      note: "'My sister says it's the first thing I ever took worth anything': over her shoulder, her jaw empty for the first time in the film. She has nothing in her mouth. That is the whole gag, and it is also the approval.",
      stage: (t) => (
        <>
          <Teller position={[PLACE.sill[0] + 1.05, 0, PLACE.sill[2] + 0.95]} rotationY={0.348} animation="idle" face="smile" tailUp={0.55} time={t} />
          <Sister position={[PLACE.sill[0] - 0.6, 0, PLACE.sill[2] + 1.4]} rotationY={0.348} animation="talk" face="smile" tailUp={0.55} time={t} headPitch={0.08} />
        </>
      ),
    },
    {
      cue: "13.only",
      ...cam.push({ on: [-8.6, 1.45, -4.8], dist: 2.9, to: 2.6, yaw: 6, pitch: 4, fov: 38 }),
      zone: "street",
      look: "overworld-day",
      note: "'In this town my family stole things. I traded': both cups in frame, the flower and the berry, and the open window behind them. The family line comes back with one word changed, so it has to be the same shot as a wide of the sill, not a new idea.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
          <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.12]} berry t={t} />
          <Teller position={[PLACE.sill[0] + 0.7, 0, PLACE.sill[2] + 1.35]} rotationY={-0.245} animation="idle" face="calm" tailUp={0.45} time={t} />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [-8.8, 1.5, -4.8], dist: 2.9, to: 2.6, yaw: -10, pitch: 4, fov: 38 }),
      zone: "street",
      look: "overworld-golden",
      note: "'Subscribe before I find out what he wants for the sword': the sword comes back — Dad's sword, leaning against the sill next to the two cups, where the boy must have left it. The ask is a question the film really has not answered, so the question is in the frame, not just in the caption.",
      stage: (t) => (
        <>
          <SillCup position={[PLACE.sill[0] + 0.32, PLACE.sill[1], PLACE.sill[2] + 0.1]} flower />
          <SillCup position={[PLACE.sill[0] + 1.05, PLACE.sill[1], PLACE.sill[2] + 0.12]} berry t={t} />
          <Sword position={[PLACE.sill[0] + 1.65, PLACE.sill[1] + 0.02, PLACE.sill[2] + 0.2]} scale={0.62} rotation={[0, 0, 0.14]} />
        </>
      ),
    },
  ],
});
