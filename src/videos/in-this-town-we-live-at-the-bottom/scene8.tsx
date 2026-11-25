import { cam, storyScene } from "../../engine";
import { EAST, Healer, Hero, Mum, NORTH, WEST, room, timing } from "./kit";

/**
 * 08 — The decision. Three short shots, and the film's whole engine starts here.
 *
 * He asks where the apple is, somebody points up, and a kid decides to do the thing the town has agreed is impossible.
 */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "She pointed up",
  shots: [
    {
      cue: "8.where",
      ...cam.push({ on: room(0.4, 1.35, -1.8), dist: 3.9, to: 3.5, yaw: -16, pitch: 2, fov: 38 }),
      zone: "room",
      look: "warm-room",
      note: "He asks. She has been asked this before and her hands are already still: the answer is going to be a gesture, not a sentence.",
      stage: () => (
        <>
          <Hero position={room(-0.3, 0, -1.5)} rotationY={EAST} animation="talk" face="uneasy" headPitch={-0.1} />
          <Healer position={room(0.9, 0, -1.3)} rotationY={WEST} hmm={0.3} lookAt={room(-0.3, 1.4, -1.5)} />
        </>
      ),
    },
    {
      cue: "8.point",
      ...cam.push({ on: room(0.9, 1.75, -1.3), dist: 3.9, to: 4.5, yaw: 6, pitch: -10, fov: 32 }),
      zone: "room",
      look: "warm-room",
      note: "Her finger, up. The window in the top of frame has the mountain in it, so the gesture points out of the house and out of the frame: the apple is not here.",
      stage: () => (
        <>
          <Healer position={room(0.9, 0, -1.3)} rotationY={WEST} strain={0.7} lookAt={room(0, 3, -2.9)} />
        </>
      ),
    },
    {
      cue: "8.decide",
      ...cam.push({ on: [1.2, 2.2, -9.8], dist: 5.6, to: 4.6, yaw: 0, pitch: 12, fov: 44 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "He stands at the foot of the ladder in the rain and looks up all nine thousand steps. On 'see the top' one hand takes the first rung.",
      stage: (t) => (
        <>
          <Hero position={[1.2, 0, -9.6]} rotationY={NORTH} animation={t > 1.6 ? "reachUp" : "idle"} face="brave" headPitch={-0.5} lookAt={[1.2, 22, -30]} />
          <Mum position={[2.6, 0, -8.6]} rotationY={0} animation="idle" face="sad" headPitch={0.2} />
        </>
      ),
    },
  ],
});
