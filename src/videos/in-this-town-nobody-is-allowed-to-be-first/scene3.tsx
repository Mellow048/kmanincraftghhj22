import {
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

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Market Shove Gag & Sam Always Going Second",
  shots: [
    {
      cue: "3.try",
      ...cam.track({ from: at(V, 1.2, 0, 2.2), to: at(V, 4.8, 0, 2.2), sideDist: 5.2, lead: 1.0, height: 1.6, fov: 44 }),
      zone: "village",
      note: "Comedy attempt #1: Teller sprints full speed toward the market stall trying to be first.",
      stage: (t) => {
        const w = moveBetween(at(V, 1.2, 0, 2.2), at(V, 4.8, 0, 2.2), t, 0, 1.35);
        return <Teller position={w.position} rotationY={w.rotationY} animation="run" animDistance={w.animDistance} face="grin" time={t} />;
      },
    },
    {
      cue: "3.shove",
      ...cam.sweep({ on: at(V, 4.2, 1.2, 2.2), dist: 5.8, fromYaw: -22, toYaw: 20, pitch: 12, fov: 44 }),
      zone: "village",
      note: "Five neighbors sprint past him shoving to grab second place!",
      stage: (t) => {
        const w1 = moveBetween(at(V, 2.0, 0, 1.4), at(V, 5.2, 0, 1.4), t, 0, 1.2);
        const w2 = moveBetween(at(V, 1.8, 0, 3.0), at(V, 5.4, 0, 3.0), t, 0, 1.2);
        return (
          <>
            <Teller position={at(V, 3.8, 0, 2.2)} rotationY={Math.PI / 2} animation="stagger" face="surprised" time={t} />
            <Player who={1} scale={0.88} position={w1.position} rotationY={w1.rotationY} animation="run" animDistance={w1.animDistance} face="grin" time={t} />
            <Player who={3} scale={0.88} position={w2.position} rotationY={w2.rotationY} animation="run" animDistance={w2.animDistance} face="grin" time={t + 0.15} />
          </>
        );
      },
    },
    {
      cue: "3.last",
      ...cam.front({ actor: at(V, 2.6, 0, 2.2), dist: 4.6, fov: 42, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "Teller tumbles backward and somehow ends up dead last behind everyone.",
      stage: (t) => <Teller position={at(V, 2.6, 0, 2.2)} rotationY={0.2} animation="fall" face="ouch" time={t} />,
    },
    {
      cue: "3.laugh",
      ...cam.twoShot({ a: at(V, 3.6, 0, 1.2), b: at(V, 3.6, 0, 3.2), facing: -Math.PI / 2, dist: 5.4, height: 1.5, fov: 44 }),
      zone: "village",
      note: "Neighbors point and burst out laughing at Teller's muddy tumble.",
      stage: (t) => (
        <>
          <Player who={1} scale={0.88} position={at(V, 3.6, 0, 1.2)} rotationY={-0.6} animation="laugh" face="laugh" time={t} />
          <Player who={4} scale={0.88} position={at(V, 3.6, 0, 3.2)} rotationY={-1.0} animation="laugh" face="laugh" time={t + 0.2} />
        </>
      ),
    },
    {
      cue: "4.friend",
      ...cam.twoShot({ a: at(V, 0.5, 0, 2.2), b: at(V, 1.8, 0, 2.2), facing: 0, dist: 4.8, height: 1.5, fov: 42 }),
      zone: "village",
      note: "Best friend Sam walks up calmly without laughing once, offering a quiet smile.",
      stage: (t) => {
        const w = moveBetween(at(V, -0.6, 0, 2.2), at(V, 0.6, 0, 2.2), t, 0, 1.1);
        return (
          <>
            <Teller position={at(V, 1.9, 0, 2.2)} rotationY={-Math.PI / 2} animation="idle" face="smile" time={t} />
            <Sam position={w.position} rotationY={Math.PI / 2} animation={w.moving ? "walk" : "wave"} animDistance={w.animDistance} face="smile" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.behind",
      ...cam.twoShot({ a: at(V, 0, 0, -1.2), b: at(V, 0, 0, -2.5), facing: 0.45, dist: 5.0, height: 1.5, fov: 42 }),
      zone: "village",
      note: "Plant #1: Sam always stands quietly one step behind Teller at every doorway.",
      stage: (t) => (
        <>
          <Teller position={at(V, 0, 0, -1.2)} rotationY={0} animation="idle" face="neutral" time={t} />
          <Sam position={at(V, -0.4, 0, -2.4)} rotationY={0} animation="idle" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "4.sit",
      ...cam.sweep({ on: at(V, -5.2, 1.1, 2.2), dist: 4.8, fromYaw: 20, toYaw: -20, pitch: 10, fov: 42 }),
      zone: "village",
      note: "Plant #2: At lunch, Sam waits until Teller sits so he always sits second.",
      stage: (t) => (
        <>
          <Teller position={at(V, -5.8, 0, 3.1)} rotationY={Math.PI} animation="sit" face="smile" time={t} />
          <Sam position={at(V, -4.4, 0, 3.1)} rotationY={Math.PI} animation={t > 0.65 ? "sit" : "idle"} face="calm" time={t} />
        </>
      ),
    },
    {
      cue: "4.cross",
      ...cam.track({ from: at(B, -4.5, 0.25, 0), to: at(B, 2.5, 0.25, 0), sideDist: 5.6, lead: 1.0, height: 1.8, fov: 44 }),
      zone: "bridge",
      note: "Plant #3: Crossing the wooden river bridge, Sam carefully follows one step behind as second.",
      stage: (t) => {
        const w1 = moveBetween(at(B, -4.0, 0.25, 0), at(B, 2.8, 0.25, 0), t, 0, 1.5);
        const w2 = moveBetween(at(B, -5.4, 0.25, 0), at(B, 1.4, 0.25, 0), t, 0, 1.5);
        return (
          <>
            <Teller position={w1.position} rotationY={w1.rotationY} animation="walk" animDistance={w1.animDistance} face="smile" time={t} />
            <Sam position={w2.position} rotationY={w2.rotationY} animation="walk" animDistance={w2.animDistance} face="worried" time={t + 0.2} />
          </>
        );
      },
    },
    {
      cue: "4.race",
      ...cam.track({ from: at(V, -4.0, 0, 4.2), to: at(V, 3.5, 0, 4.2), sideDist: 5.4, lead: 1.0, height: 1.6, fov: 44 }),
      zone: "village",
      note: "Plant #4: Even in footraces, Sam deliberately slows down to finish second.",
      stage: (t) => {
        const w1 = moveBetween(at(V, -3.5, 0, 4.2), at(V, 3.6, 0, 4.2), t, 0, 1.45);
        const w2 = moveBetween(at(V, -4.2, 0, 3.2), at(V, 2.1, 0, 3.2), t, 0, 1.45);
        return (
          <>
            <Teller position={w1.position} rotationY={w1.rotationY} animation="run" animDistance={w1.animDistance} face="grin" time={t} />
            <Sam position={w2.position} rotationY={w2.rotationY} animation="walk" animDistance={w2.animDistance} face="calm" time={t} />
          </>
        );
      },
    },
    {
      cue: "4.shy",
      ...cam.front({ actor: at(V, 2.0, 0, 3.2), dist: 4.2, fov: 40, screenOffset: [0, 0.06] }),
      zone: "village",
      note: "Misread stated: Teller smiles thinking Sam is just the shyest kid in town.",
      stage: (t) => <Sam position={at(V, 2.0, 0, 3.2)} rotationY={0.15} animation="idle" face="uneasy" time={t} />,
    },
  ],
});
