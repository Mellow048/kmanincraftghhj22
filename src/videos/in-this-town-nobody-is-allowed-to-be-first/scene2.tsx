import {
  Elder,
  PLACE,
  Player,
  Sam,
  Teller,
  at,
  cam,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

const V = PLACE.village;
const B = PLACE.bridge;

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Town Rule Tour & Elder's Warning",
  shots: [
    {
      cue: "2.house",
      ...cam.twoShot({ a: at(V, -1.1, 0, -0.8), b: at(V, 1.1, 0, -0.8), dist: 5.0, height: 1.5, fov: 44 }),
      zone: "village",
      note: "Two neighbors politely wave each other ahead at a doorway—neither willing to enter first.",
      stage: (t) => (
        <>
          <Player who={1} scale={0.9} position={at(V, -1.1, 0, -0.8)} rotationY={0.8} animation="wave" face="uneasy" time={t} />
          <Player who={4} scale={0.9} position={at(V, 1.1, 0, -0.8)} rotationY={-0.8} animation="wave" face="uneasy" time={t + 0.3} />
        </>
      ),
    },
    {
      cue: "2.table",
      ...cam.sweep({ on: at(V, -5.2, 1.2, 2.2), dist: 5.2, fromYaw: -20, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "village",
      note: "OTS: Three villagers hover awkwardly beside the dinner table, nobody sitting down first.",
      stage: (t) => (
        <>
          <Player who={3} scale={0.88} position={at(V, -6.2, 0, 3.2)} rotationY={Math.PI} animation="shrug" face="uneasy" time={t} />
          <Player who={5} scale={0.88} position={at(V, -4.2, 0, 3.2)} rotationY={Math.PI} animation="idle" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "2.bridge",
      ...cam.sweep({ on: at(B, 0, 1.2, 0), dist: 7.4, fromYaw: -22, toYaw: 20, pitch: 14, fov: 46 }),
      zone: "bridge",
      note: "At the wooden river bridge between two grass islands, villagers stop dead at the first plank.",
      stage: (t) => (
        <>
          <Player who={1} scale={0.88} position={at(B, -5.4, 0, 0)} rotationY={Math.PI / 2} animation="idle" face="worried" time={t} />
          <Player who={3} scale={0.88} position={at(B, -6.6, 0, 0.8)} rotationY={Math.PI / 2} animation="shrug" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "2.last",
      ...cam.track({ from: at(V, -3.5, 0, 3.5), to: at(V, 0.5, 0, 3.5), sideDist: 5.2, lead: 0.9, height: 1.6, fov: 42 }),
      zone: "village",
      note: "The Oldest Man strolls calmly behind everyone else, always going dead last.",
      stage: (t) => {
        const w = moveBetween(at(V, -3.5, 0, 3.5), at(V, 0.5, 0, 3.5), t, 0, 1.5);
        return <Elder position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} time={t} />;
      },
    },
    {
      cue: "2.itch",
      ...cam.sweep({ on: at(V, 0, 1.1, -4.0), dist: 4.5, fromYaw: 110, toYaw: 145, pitch: 10, fov: 42 }),
      zone: "village",
      note: "Teller walks toward the edge of the trees, staring curiously toward the hills.",
      stage: (t) => {
        const w = moveBetween(at(V, 0, 0, -3.2), at(V, 0, 0, -4.8), t, 0, 1.2);
        return <Teller position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="uneasy" time={t} />;
      },
    },
    {
      cue: "2.cave",
      ...cam.heroLow({ on: at(V, 0, 2.0, -9.5), dist: 5.4, yaw: 18, fov: 44 }),
      zone: "village",
      note: "OTS low dramatic tilt up at the dark timber-framed cave mouth beyond the trees.",
      stage: (t) => <Teller position={at(V, -1.2, 0, -8.5)} rotationY={Math.PI} animation="idle" face="surprised" time={t} />,
    },
    {
      cue: "2.warn",
      ...cam.twoShot({ a: at(V, -1.0, 0, -8.2), b: at(V, 0.9, 0, -8.2), facing: 0.3, dist: 3.6, height: 1.5, fov: 42 }),
      zone: "village",
      hud: { chat: [{ sender: "Elder", text: "Never go first.", color: "#ffdd57" }] },
      note: "The Oldest Man steps up beside Teller and whispers a stark warning.",
      stage: (t) => (
        <>
          <Teller position={at(V, -1.0, 0, -8.2)} rotationY={1.0} animation="idle" face="surprised" time={t} />
          <Elder position={at(V, 0.9, 0, -8.2)} rotationY={-1.0} animation="point" time={t} />
        </>
      ),
    },
    {
      cue: "2.walk",
      ...cam.track({ from: at(V, 0.9, 0, -8.2), to: at(V, 3.8, 0, -6.2), sideDist: 5.0, lead: 0.9, height: 1.6, fov: 42 }),
      zone: "village",
      note: "Giving zero explanation, the Oldest Man turns and walks quietly away.",
      stage: (t) => {
        const w = moveBetween(at(V, 0.9, 0, -8.2), at(V, 3.8, 0, -6.2), t, 0, 1.4);
        return (
          <>
            <Teller position={at(V, -1.0, 0, -8.2)} rotationY={0.8} animation="idle" face="uneasy" time={t} />
            <Elder position={w.position} rotationY={w.rotationY} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} time={t} />
          </>
        );
      },
    },
    {
      cue: "2.decide",
      ...cam.front({ actor: at(V, -1.0, 0, -8.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "Teller clenches his fists with brave resolve—he decides to find out why everyone is scared.",
      stage: (t) => (
        <>
          <Teller position={at(V, -1.0, 0, -8.2)} rotationY={0} animation="point" face="brave" time={t} />
          <Sam position={at(V, -2.3, 0, -7.2)} rotationY={0.5} animation="idle" face="worried" time={t} />
        </>
      ),
    },
  ],
});
