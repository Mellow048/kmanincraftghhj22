import { cam } from "../../engine";
import { Friend, Him, RecordCrate, stagedScene } from "./kit";

/**
 * BEAT 11 — BUTTON. Back outside the same house, in the present.
 *
 * The hush again, and this time he walks past them with a crate of records and nods. They nod back,
 * vaguely, the way you nod at staff. He keeps walking into the dark and we cut on it.
 */
export const scene11 = stagedScene("scene11", [
  {
    id: "11.hush",
    ...cam.push({ on: [0, 1.42, -3.1], dist: 4.5, to: 3.6, fov: 44, pitch: 3 }),
    zone: "street",
    look: "overworld-night",
    note: "The same three heads together in the same doorway, and him in the foreground with the crate: the film ends where it started, one shirt later.",
    stage: () => (
      <>
        <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.2} animation="talk" face="grin" headPitch={-0.12} />
        <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.1} animation="talk" face="smug" headPitch={-0.1} />
        <Friend v={2} position={[0.86, 0, -2.96]} rotationY={-0.35} animation="idle" face="grin" headPitch={-0.08} />
        <Him position={[-0.3, 0, 1.4]} rotationY={Math.PI} animation="idle" face="calm" headphones="neck" />
        <RecordCrate position={[-0.3, 0.72, 0.95]} />
      </>
    ),
  },
  {
    id: "11.pass",
    ...cam.push({ on: [0, 1.25, -0.5], dist: 4.3, to: 3.7, fov: 46, pitch: 2 }),
    zone: "street",
    look: "overworld-night",
    note: "He crosses the lit doorway with the crate, nods at them, and they nod back without quite placing him.",
    stage: (t) => {
      const walked = -2.7 + Math.min(5.1, t * 1.9);
      return (
        <>
          <Him position={[walked, 0, -0.55]} rotationY={Math.PI / 2} animation="walk" arms="hold" face="blank" headphones="neck" />
          <RecordCrate position={[walked, 0.72, -0.55]} rotationY={Math.PI / 2} />
          <Friend v={0} position={[-0.62, 0, -3.05]} rotationY={0.35} animation="idle" face="neutral" headPitch={-0.1} />
          <Friend v={1} position={[0.2, 0, -3.42]} rotationY={-0.05} animation="idle" face="blank" headPitch={-0.06} />
          <Friend v={2} position={[0.86, 0, -2.96]} rotationY={-0.4} animation="idle" face="neutral" />
        </>
      );
    },
  },
  {
    id: "11.dark",
    ...cam.push({ on: [1.15, 1.22, 4.7], dist: 6.2, to: 5.4, fov: 42, yaw: 180, pitch: 4 }),
    zone: "street",
    look: "overworld-night",
    note: "He keeps walking, away from the door and the light, out of the town and into the dark: no applause, no look back, cut.",
    stage: (t) => {
      const walked = -0.55 + Math.min(6.0, t * 1.5);
      return (
        <>
          <Him position={[1.15, 0, walked]} rotationY={0} animation="walk" arms="hold" face="calm" headphones="neck" />
          <RecordCrate position={[1.15, 0.72, walked]} />
        </>
      );
    },
  },
]);
