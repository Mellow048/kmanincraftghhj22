import { cam } from "../../engine";
import { Booth, Friend, Him, stagedScene } from "./kit";

/**
 * BEAT 9 — THEY WALK IN. The same three, four years older, same jackets, same volume.
 *
 * They do not recognise him and they do not look up at the booth. One of them shouts for the whole
 * room to hear that whoever is playing is sick, and then asks, at his back, how he got this good.
 */
export const scene9 = stagedScene("scene9", [
  {
    id: "9.in",
    ...cam.push({ on: [0, 1.4, 3.0], dist: 3.2, to: 2.6, fov: 44, yaw: 180, pitch: 4 }),
    zone: "club",
    look: "prom-night",
    note: "They push in through the door of the club they queue at every weekend, still talking to each other, already loud.",
    stage: (t) => {
      const walked = Math.min(1.9, t * 1.3);
      return (
        <>
          <Friend v={0} position={[0.05, 0, 3.15 - walked]} rotationY={Math.PI} animation="walk" face="grin" />
          <Friend v={1} position={[0.55, 0, 3.4 - walked * 0.9]} rotationY={Math.PI - 0.15} animation="walk" face="laugh" />
          <Friend v={2} position={[-0.5, 0, 3.5 - walked * 0.85]} rotationY={Math.PI + 0.2} animation="walk" face="neutral" />
        </>
      );
    },
  },
  {
    id: "9.bar",
    ...cam.push({ on: [2.15, 1.4, 0.7], dist: 2.9, to: 2.35, fov: 40, yaw: -70, pitch: 4 }),
    zone: "club",
    look: "prom-night",
    note: "One of them leans on the bar and shouts at the ceiling, to nobody, that the guy playing is sick — never once looking at the booth.",
    stage: () => (
      <>
        <Friend v={0} position={[2.1, 0, 0.15]} rotationY={Math.PI / 2 + 0.4} animation="talk" face="laugh" headPitch={-0.2} />
        <Friend v={1} position={[2.25, 0, 0.95]} rotationY={Math.PI / 2 - 0.2} animation="cheer" face="laugh" />
        <Friend v={2} position={[1.95, 0, 1.5]} rotationY={Math.PI / 2 + 0.7} animation="idle" face="grin" />
      </>
    ),
  },
  {
    id: "9.back",
    from: [-0.35, 1.62, -1.15],
    to: [-0.15, 1.58, -0.85],
    target: [2.2, 1.32, 0.8],
    targetTo: [2.05, 1.3, 0.9],
    fov: 42,
    zone: "club",
    look: "prom-night",
    note: "From behind his shoulder at the three of them: the other one asks how he got this good, still talking to his back.",
    stage: () => (
      <>
        <Him position={[-0.9, 0, -1.2]} rotationY={0.35} animation="idle" face="blank" headphones="neck" />
        <Friend v={0} position={[2.1, 0, 0.15]} rotationY={Math.PI / 2 + 0.5} animation="talk" face="grin" />
        <Friend v={1} position={[2.25, 0, 0.95]} rotationY={Math.PI / 2} animation="idle" face="smile" />
        <Friend v={2} position={[1.95, 0, 1.5]} rotationY={Math.PI / 2 + 0.6} animation="idle" face="neutral" />
      </>
    ),
  },
  {
    id: "9.decks",
    ...cam.push({ on: [-1.0, 1.16, -2.32], dist: 2.1, to: 1.75, fov: 34, pitch: 24, yaw: -18 }),
    zone: "club",
    look: "prom-night",
    note: "His hands change the record while the question is still in the air: he does not turn round.",
    stage: () => (
      <>
        <Booth position={[-1.0, 0, -2.35]} spin={5.4} arm={0.4} />
        <Him position={[-1.0, 0, -2.98]} rotationY={0} animation="reach" face="blank" headphones="neck" />
      </>
    ),
  },
  {
    id: "9.faces",
    ...cam.push({ on: [1.5, 1.42, 0.5], dist: 3.2, to: 2.7, fov: 42, yaw: 24, pitch: 4 }),
    zone: "club",
    look: "prom-night",
    note: "Their faces, having the night of their lives, lit by a rig he built: they are happy and they still do not know who he is.",
    stage: () => (
      <>
        <Friend v={0} position={[2.0, 0, 0.2]} rotationY={Math.PI / 2 + 0.9} animation="cheer" face="laugh" headPitch={-0.15} />
        <Friend v={1} position={[2.2, 0, 0.95]} rotationY={Math.PI / 2} animation="cheer" face="grin" />
        <Friend v={2} position={[1.9, 0, 1.45]} rotationY={Math.PI / 2 + 0.3} animation="laugh" face="laugh" />
      </>
    ),
  },
]);
