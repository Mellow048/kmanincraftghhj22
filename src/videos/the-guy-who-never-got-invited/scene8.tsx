import { cam } from "../../engine";
import { Booth, ClubSign, Friend, Him, Owner, stagedScene } from "./kit";

/**
 * BEAT 8 — THE JOB. THE DOOR, the club the whole town queues at.
 *
 * The queue outside is the party he was never let into; four years later he is on the other side of
 * that door, in the black shirt, and the owner tells him he is the best he has had. He says thank you,
 * and then he lets himself smile for exactly one second.
 */
export const scene8 = stagedScene("scene8", [
  {
    id: "8.out",
    ...cam.push({ on: [0, 2.35, 9.0], dist: 5.8, to: 4.6, fov: 46, pitch: 6 }),
    zone: "club",
    look: "overworld-night",
    note: "The queue at THE DOOR, seen from across the street: the same party, and he is not in the queue.",
    stage: () => (
      <>
        <Friend v={0} position={[0.85, 0, 7.3]} rotationY={Math.PI} animation="idle" face="grin" />
        <Friend v={1} position={[1.2, 0, 7.9]} rotationY={Math.PI + 0.2} animation="idle" face="laugh" />
        <Friend v={2} position={[0.4, 0, 8.1]} rotationY={Math.PI - 0.2} animation="idle" face="neutral" />
        <ClubSign position={[0, 3.0, 8.6]} />
      </>
    ),
  },
  {
    id: "8.booth",
    ...cam.push({ on: [-1.0, 1.42, -2.9], dist: 3.3, to: 2.7, fov: 42, yaw: -8, pitch: 5 }),
    zone: "club",
    look: "prom-night",
    note: "Him behind the booth in the black shirt, headphones round his neck, looking at the room instead of the records.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={4.2} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0} animation="press" face="calm" headphones="neck" />
      </>
    ),
  },
  {
    id: "8.owner",
    ...cam.push({ on: [-0.5, 1.45, -2.5], dist: 2.9, to: 2.4, fov: 38, yaw: -36, pitch: 3 }),
    zone: "club",
    look: "prom-night",
    note: "The owner leans in over the booth and says it in his ear: the first time an adult in this town calls him good.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={4.2} />
        <Owner position={[-0.5, 0, -2.55]} rotationY={-1.4} face="blank" />
        <Him position={[-1.05, 0, -2.98]} rotationY={0.35} animation="idle" face="calm" headphones="neck" headPitch={0.05} />
      </>
    ),
  },
  {
    id: "8.thanks",
    ...cam.push({ on: [-1.0, 1.44, -2.98], dist: 2.9, to: 2.4, fov: 38, yaw: -14, pitch: 2 }),
    zone: "club",
    look: "prom-night",
    note: "Two words back, flat, no smile: he has practised this answer as long as he practised the rest.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={4.2} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0.1} animation="talk" face="blank" headphones="neck" />
      </>
    ),
  },
  {
    id: "8.smile",
    ...cam.push({ on: [-1.0, 1.46, -2.98], dist: 2.7, to: 2.2, fov: 38, yaw: 9, pitch: 2 }),
    zone: "club",
    look: "prom-night",
    note: "The one smile, two frames of it, then gone: the only crack in him in the whole film.",
    stage: (t) => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={4.2} />
        <Him
          position={[-1.0, 0, -2.98]}
          rotationY={0}
          animation="idle"
          face={t < 0.9 ? "smile" : "blank"}
          headphones="neck"
        />
      </>
    ),
  },
]);
