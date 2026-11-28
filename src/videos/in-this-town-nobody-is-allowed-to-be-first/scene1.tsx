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

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The Doorway Threshold Hook",
  shots: [
    {
      cue: "1.door",
      ...cam.front({ actor: at(V, 0, 0, -1.2), dist: 4.8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "Frame-0 hook: Teller stands right at the wooden doorway threshold while Sam and villagers wait nervously behind him.",
      stage: (t) => {
        const w = moveBetween(at(V, 0, 0, -0.4), at(V, 0, 0, -1.3), t, 0, 1.0);
        return (
          <>
            <Teller position={w.position} rotationY={0} animation={w.moving ? "walk" : "idle"} animDistance={w.animDistance} face="uneasy" time={t} />
            <Sam position={at(V, -1.1, 0, -2.5)} rotationY={0.15} animation="idle" face="worried" time={t} />
            <Player who={1} scale={0.85} position={at(V, 1.2, 0, -2.7)} rotationY={-0.15} animation="idle" face="worried" time={t} />
            <Player who={3} scale={0.85} position={at(V, 0.1, 0, -3.5)} rotationY={0} animation="idle" face="uneasy" time={t} />
          </>
        );
      },
    },
    {
      cue: "1.line",
      ...cam.streetOverview({ from: at(V, 0, 0, 7.5), to: at(V, 0, 0, 3.2), on: at(V, 0, 1.2, -2.4), height: 4.4, fov: 44 }),
      zone: "village",
      note: "High crane revealing the entire dark-oak village lined up behind the doorway, refusing to step first.",
      stage: (t) => (
        <>
          <Teller position={at(V, 0, 0, -1.2)} rotationY={0} animation="shrug" face="uneasy" time={t} />
          <Sam position={at(V, -1.1, 0, -2.5)} rotationY={0.1} animation="idle" face="worried" time={t} />
          <Player who={1} scale={0.85} position={at(V, 1.1, 0, -2.6)} rotationY={-0.1} animation="idle" face="worried" time={t} />
          <Player who={4} scale={0.85} position={at(V, -1.4, 0, -4.0)} rotationY={0.1} animation="idle" face="uneasy" time={t} />
          <Player who={5} scale={0.85} position={at(V, 1.4, 0, -4.2)} rotationY={-0.1} animation="idle" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "1.who",
      ...cam.twoShot({ a: at(V, -1.0, 0, 1.4), b: at(V, 1.0, 0, 1.4), dist: 5.0, height: 1.5, fov: 42 }),
      zone: "village",
      note: "Villagers shrug and shake their heads—nobody knows who invented the rule.",
      stage: (t) => (
        <>
          <Player who={1} scale={0.9} position={at(V, -1.1, 0, 1.4)} rotationY={0.4} animation="shrug" face="uneasy" time={t} />
          <Player who={3} scale={0.9} position={at(V, 1.1, 0, 1.4)} rotationY={-0.4} animation="shrug" face="worried" time={t + 0.25} />
        </>
      ),
    },
    {
      cue: "1.what",
      ...cam.sweep({ on: at(V, 0, 1.3, -11.5), dist: 6.4, fromYaw: -20, toYaw: 20, pitch: 10, fov: 44 }),
      zone: "village",
      note: "Foreshadowing sweep toward the dark timber cave mouth at the edge of the dark oak woods.",
      stage: (t) => (
        <Teller position={at(V, 0, 0, -7.8)} rotationY={Math.PI} animation="idle" face="uneasy" time={t} />
      ),
    },
    {
      cue: "1.old",
      ...cam.front({ actor: at(V, -1.4, 0, 2.2), dist: 4.4, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "The silver-haired Oldest Man stands quietly at the very back of the village path.",
      stage: (t) => (
        <Elder position={at(V, -1.4, 0, 2.2)} rotationY={0.15} animation="idle" time={t} />
      ),
    },
  ],
});
