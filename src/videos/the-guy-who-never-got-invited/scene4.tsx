import { cam } from "../../engine";
import { Him, Speaker, stagedScene } from "./kit";

/**
 * BEAT 4 — THE DREAM. His bedroom, night.
 *
 * Between two speakers on two crates, headphones on, eyes shut. He says the whole plan in five words.
 * No music under it, no joke: the sincerity is what makes the rest of the film work.
 */
export const scene4 = stagedScene("scene4", [
  {
    id: "4.room",
    ...cam.push({ on: [0, 1.0, 0.35], dist: 4.5, to: 3.4, fov: 48, yaw: 8, pitch: 7 }),
    zone: "bedroom",
    look: "warm-room",
    note: "The room and the two speakers, him sitting between them on the floor: the dream has a place and the place is very small.",
    stage: () => (
      <>
        <Him position={[-0.02, 0, 0.28]} rotationY={0} animation="sit" face="calm" headphones="ears" />
        <Speaker position={[-1.02, 0.6, 1.05]} rotationY={-0.2} tall={0.86} pulse={0.2} />
        <Speaker position={[1.05, 0.6, 1.02]} rotationY={0.2} tall={0.86} pulse={0.2} />
      </>
    ),
  },
  {
    id: "4.say",
    ...cam.push({ on: [0, 1.4, 0.25], dist: 1.55, to: 1.25, fov: 34, yaw: 6, pitch: 2 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Close on him saying it: eyes shut, headphones over his ears, no audience in the room at all.",
    stage: () => (
      <>
        <Him position={[-0.02, 0, 0.28]} rotationY={0} animation="sit" face="calm" headphones="ears" />
      </>
    ),
  },
  {
    id: "4.hand",
    ...cam.push({ on: [0.15, 1.35, 0.3], dist: 1.7, to: 1.3, fov: 36, yaw: 46, pitch: 6 }),
    zone: "bedroom",
    look: "warm-room",
    note: "Over the speaker's shoulder: the cabinet in the foreground, his face lit by the little green light, still not opening his eyes.",
    stage: (t) => (
      <>
        <Him position={[-0.02, 0, 0.28]} rotationY={0} animation="sit" face="calm" headphones="ears" />
        <Speaker position={[0.95, 0.6, 0.85]} rotationY={0.5} tall={0.86} pulse={0.7 + 0.3 * Math.sin(t * 3)} />
      </>
    ),
  },
]);
