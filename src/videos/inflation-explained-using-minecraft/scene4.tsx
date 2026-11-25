import {
  Bill,
  BillStack,
  Bread,
  BreadShelf,
  CitizenLead,
  CompareChestPair,
  ExplainerCrowd,
  FloatingNumber,
  PLACE,
  PriceTag,
  cam,
  on,
  pop,
  storyScene,
  timing,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Ten Times Money, Same Four Loaves",
  shots: [
    {
      cue: "6.same",
      ...cam.push({
        on: on(PLACE.bakery, -0.05, 1.25, -0.3),
        dist: 3.3,
        to: 2.75,
        yaw: -14,
        pitch: 9,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Miles slaps thick stack of 10 emerald notes confidently onto the Plinth.",
      stage: (t) => (
        <>
          <BillStack position={on(PLACE.bakery, 0.12, 0.96, -0.55)} count={10} />
          <CitizenLead position={on(PLACE.bakery, -0.5, 0, -0.15)} rotationY={0.85} animation="reach" face="grin" time={t} />
        </>
      ),
    },
    {
      cue: "6.smile",
      ...cam.push({
        on: on(PLACE.bakery, -0.45, 1.32, -0.15),
        dist: 2.35,
        to: 1.85,
        yaw: 14,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      zone: "bakery",
      note: "Close optimistic grin on Miles right before the brutal math twist.",
      stage: (t) => (
        <CitizenLead position={on(PLACE.bakery, -0.45, 0, -0.15)} rotationY={0.25} animation="cheer" face="grin" time={t} />
      ),
    },
    {
      cue: "6.problem",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.0, 0.3),
        dist: 4.9,
        to: 4.2,
        yaw: -8,
        pitch: 14,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Twin CompareChestPair YESTERDAY vs TODAY cleanly framed inside 9:16 width.",
      stage: (t) => (
        <>
          <CompareChestPair position={on(PLACE.bakery, 0, 0, 0.3)} leftLabel="YESTERDAY" rightLabel="TODAY" leftCount={4} rightCount={4} />
          <FloatingNumber text="SAME 4 LOAVES" color="#ffd84d" position={on(PLACE.bakery, 0, 2.25, 0.25 + t * 0.01)} height={0.52 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "6.ovens",
      ...cam.orbit({
        on: on(PLACE.bakery, 0, 1.2, -1.1),
        dist: 3.4,
        yaw: -14,
        yawTo: 14,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Orbit across BreadShelf holding strictly the exact same 4 warm bread loaves.",
      stage: (t) => (
        <>
          <BreadShelf position={on(PLACE.bakery, 0, 0, -1.15)} count={4} />
          <FloatingNumber text="STILL 4" color="#ffd84d" position={on(PLACE.bakery, 0, 2.05 + t * 0.08, -1.0)} height={0.5 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "6.bid",
      ...cam.whip({
        from: on(PLACE.bakery, -1.9, 1.6, 3.3),
        on: on(PLACE.bakery, -0.4, 1.25, -0.3),
        onTo: on(PLACE.bakery, 0.3, 1.25, -0.45),
        fov: 42,
      }),
      screenOffset: [0, 0.12],
      zone: "bakery",
      note: "Whip pan across rich depth-stacked crowd buyers waving emerald notes around 1 bread loaf.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, 0, 0.96, -0.55)} scale={1.7} />
          <ExplainerCrowd
            positions={[
              on(PLACE.bakery, -0.68, 0, 0.15),
              on(PLACE.bakery, 0.68, 0, 0.2),
              on(PLACE.bakery, -0.42, 0, 0.95),
              on(PLACE.bakery, 0.45, 0, 0.95),
            ]}
            rotationY={Math.PI}
            animation="reachUp"
            seed={8}
          />
          <Bill position={on(PLACE.bakery, -0.35, 1.4 + Math.sin(t * 7) * 0.07, -0.1)} rotation={[0.4, 0.2, 0]} />
          <Bill position={on(PLACE.bakery, 0.38, 1.4 + Math.cos(t * 7) * 0.07, -0.1)} rotation={[0.4, -0.2, 0]} />
        </>
      ),
    },
    {
      cue: "6.jump",
      ...cam.push({
        on: on(PLACE.bakery, 0, 1.35, -0.45),
        dist: 3.4,
        to: 2.75,
        yaw: -10,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "PriceTag flips 1->10 in shock beside Miles staring up at red 10x PRICE.",
      stage: (t) => (
        <>
          <Bread position={on(PLACE.bakery, -0.1, 0.96, -0.55)} scale={1.7} />
          <PriceTag text={t > 0.75 ? "10" : "1"} position={on(PLACE.bakery, -0.1, 1.9, -0.5)} scale={1.25} swing={Math.sin(t * 9) * 0.16} />
          <CitizenLead position={on(PLACE.bakery, 0.52, 0, 0.15)} rotationY={-0.6} animation="scared" face="wow" time={t} />
          <FloatingNumber text="10x PRICE" color="#ff4f42" position={on(PLACE.bakery, -0.35, 2.0, -0.35)} height={0.55 * pop(t, 0.75)} />
        </>
      ),
    },
  ],
});
